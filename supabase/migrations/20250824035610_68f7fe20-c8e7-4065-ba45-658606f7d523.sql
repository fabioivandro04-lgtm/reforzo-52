-- Create a media storage bucket for videos, images, etc.
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true);

-- Create RLS policies for the media bucket
CREATE POLICY "Media files are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'media');

CREATE POLICY "Anyone can upload media files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'media');

CREATE POLICY "Anyone can update media files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'media');

CREATE POLICY "Anyone can delete media files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'media');