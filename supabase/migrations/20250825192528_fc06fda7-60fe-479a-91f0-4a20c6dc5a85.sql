-- Fix critical security vulnerability: Restrict role management to admins only
-- Update grant_role_by_email function to require admin privileges
CREATE OR REPLACE FUNCTION public.grant_role_by_email(_email text, _role app_role)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
    target_user_id UUID;
BEGIN
    -- Check if current user is admin
    IF NOT has_role(auth.uid(), 'admin'::app_role) THEN
        RAISE EXCEPTION 'Only administrators can grant roles';
    END IF;
    
    -- Find user by email
    SELECT id INTO target_user_id
    FROM auth.users
    WHERE email = _email;
    
    IF target_user_id IS NULL THEN
        RETURN FALSE;
    END IF;
    
    -- Insert role (ON CONFLICT DO NOTHING to avoid duplicates)
    INSERT INTO public.user_roles (user_id, role, granted_by)
    VALUES (target_user_id, _role, auth.uid())
    ON CONFLICT (user_id, role) DO NOTHING;
    
    RETURN TRUE;
END;
$function$;

-- Update revoke_role_by_email function to require admin privileges
CREATE OR REPLACE FUNCTION public.revoke_role_by_email(_email text, _role app_role)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
    target_user_id UUID;
BEGIN
    -- Check if current user is admin
    IF NOT has_role(auth.uid(), 'admin'::app_role) THEN
        RAISE EXCEPTION 'Only administrators can revoke roles';
    END IF;
    
    -- Find user by email
    SELECT id INTO target_user_id
    FROM auth.users
    WHERE email = _email;
    
    IF target_user_id IS NULL THEN
        RETURN FALSE;
    END IF;
    
    -- Delete role
    DELETE FROM public.user_roles
    WHERE user_id = target_user_id AND role = _role;
    
    RETURN TRUE;
END;
$function$;

-- Fix storage security: Restrict media bucket write/delete access
-- Remove overly permissive policies if they exist
DROP POLICY IF EXISTS "Public can upload to media bucket" ON storage.objects;
DROP POLICY IF EXISTS "Public can delete from media bucket" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload to media bucket" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete from media bucket" ON storage.objects;

-- Create secure storage policies for media bucket
CREATE POLICY "Authenticated users can upload to media bucket"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');

CREATE POLICY "Authenticated users can update their own media files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'media' AND auth.uid()::text = (storage.foldername(name))[1])
WITH CHECK (bucket_id = 'media' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Authenticated users can delete their own media files"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'media' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Media files are publicly viewable"
ON storage.objects
FOR SELECT
USING (bucket_id = 'media');