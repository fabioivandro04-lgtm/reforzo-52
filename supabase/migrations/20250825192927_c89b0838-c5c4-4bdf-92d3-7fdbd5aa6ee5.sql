-- Security Fix: Enhance profiles table protection and add comprehensive policies

-- First, drop existing policies to rebuild them securely
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Create comprehensive, secure RLS policies for profiles table

-- 1. SELECT policies - strict access control
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

-- 2. INSERT policies - secure profile creation
CREATE POLICY "Users can create only their own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id 
  AND auth.uid() IS NOT NULL
);

-- 3. UPDATE policies - secure profile modification
CREATE POLICY "Users can update only their own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id AND auth.uid() IS NOT NULL)
WITH CHECK (
  auth.uid() = user_id 
  AND auth.uid() IS NOT NULL
  -- Prevent users from changing their user_id
  AND user_id = OLD.user_id
);

CREATE POLICY "Admins can update any profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 4. DELETE policies - allow users to delete their own profiles (GDPR compliance)
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
  accessed_profile_id uuid REFERENCES public.profiles(user_id),
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

-- Create function to log profile access (for future implementation)
CREATE OR REPLACE FUNCTION public.log_profile_access(
  accessed_profile_id uuid,
  action text,
  ip_address inet DEFAULT NULL,
  user_agent text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profile_access_log (
    user_id,
    accessed_profile_id,
    action,
    ip_address,
    user_agent
  )
  VALUES (
    auth.uid(),
    accessed_profile_id,
    action,
    ip_address,
    user_agent
  );
END;
$$;

-- Add constraint to ensure user_id cannot be null (security requirement)
ALTER TABLE public.profiles 
ALTER COLUMN user_id SET NOT NULL;