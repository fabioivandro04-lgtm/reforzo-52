-- Security Fix: Enhanced profiles table protection (corrected version)

-- First, drop existing policies to rebuild them securely
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Create comprehensive, secure RLS policies for profiles table

-- 1. SELECT policies - Only authenticated users can view their own profiles or admins can view all
CREATE POLICY "Users can view only their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles  
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- 2. INSERT policies - Only authenticated users can create their own profiles
CREATE POLICY "Users can create only their own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id 
  AND auth.uid() IS NOT NULL
);

-- 3. UPDATE policies - Users can only update their own profiles, admins can update any
CREATE POLICY "Users can update only their own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id AND auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() = user_id AND auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update any profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 4. DELETE policies - Users can delete their own profiles (GDPR compliance)
CREATE POLICY "Users can delete only their own profile"
ON public.profiles
FOR DELETE
TO authenticated
USING (auth.uid() = user_id AND auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete any profile"
ON public.profiles
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- 5. Create audit table for sensitive data access logging
CREATE TABLE IF NOT EXISTS public.profile_access_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  accessed_profile_id uuid,
  action text NOT NULL CHECK (action IN ('SELECT', 'INSERT', 'UPDATE', 'DELETE')),
  ip_address inet,
  user_agent text,
  accessed_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on audit table
ALTER TABLE public.profile_access_log ENABLE ROW LEVEL SECURITY;

-- Only admins and the profile owner can view access logs
CREATE POLICY "Profile owners and admins can view access logs"
ON public.profile_access_log
FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id OR 
  auth.uid() = accessed_profile_id OR 
  has_role(auth.uid(), 'admin'::app_role)
);

-- Create function to prevent user_id changes (security constraint)
CREATE OR REPLACE FUNCTION public.prevent_user_id_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Prevent changing user_id after creation
  IF TG_OP = 'UPDATE' AND OLD.user_id != NEW.user_id THEN
    RAISE EXCEPTION 'Cannot change user_id after profile creation';
  END IF;
  
  -- Ensure user_id is not null
  IF NEW.user_id IS NULL THEN
    RAISE EXCEPTION 'user_id cannot be null';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to enforce user_id immutability
CREATE TRIGGER prevent_user_id_change_trigger
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_user_id_change();