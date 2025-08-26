-- Create profile for the admin user
INSERT INTO public.profiles (user_id, email, full_name, onboarding_completed, created_at)
VALUES (
  '6bcd1803-b02d-410d-aa19-1ab6e7e4ec1c',
  'fabioivandro04@gmail.com', 
  'Admin User',
  true,
  now()
) ON CONFLICT (user_id) DO UPDATE SET
  onboarding_completed = true,
  full_name = COALESCE(profiles.full_name, 'Admin User');