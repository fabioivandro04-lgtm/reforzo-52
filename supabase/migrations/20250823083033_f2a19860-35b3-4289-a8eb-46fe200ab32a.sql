-- Fix critical security vulnerability: Anonymous chat data exposed to public access
-- Replace the overly permissive RLS policies with session-based access control

-- First, drop existing policies that allow public access to anonymous conversations
DROP POLICY IF EXISTS "Users can view their own conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Users can create conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Users can update their own conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Users can view messages from their conversations" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can create messages in their conversations" ON public.chat_messages;

-- Create secure session-based policies for chat_conversations
CREATE POLICY "Users can view their own or session conversations" 
ON public.chat_conversations 
FOR SELECT 
USING (
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR 
  (auth.uid() IS NULL AND user_id IS NULL AND session_id = current_setting('request.jwt.claims', true)::json->>'session_id')
);

CREATE POLICY "Users can create their own or session conversations" 
ON public.chat_conversations 
FOR INSERT 
WITH CHECK (
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR 
  (auth.uid() IS NULL AND user_id IS NULL AND session_id = current_setting('request.jwt.claims', true)::json->>'session_id')
);

CREATE POLICY "Users can update their own or session conversations" 
ON public.chat_conversations 
FOR UPDATE 
USING (
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR 
  (auth.uid() IS NULL AND user_id IS NULL AND session_id = current_setting('request.jwt.claims', true)::json->>'session_id')
);

-- Create secure session-based policies for chat_messages
CREATE POLICY "Users can view messages from their accessible conversations" 
ON public.chat_messages 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM chat_conversations 
    WHERE chat_conversations.id = chat_messages.conversation_id 
    AND (
      (auth.uid() IS NOT NULL AND chat_conversations.user_id = auth.uid()) OR
      (auth.uid() IS NULL AND chat_conversations.user_id IS NULL AND 
       chat_conversations.session_id = current_setting('request.jwt.claims', true)::json->>'session_id')
    )
  )
);

CREATE POLICY "Users can create messages in their accessible conversations" 
ON public.chat_messages 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM chat_conversations 
    WHERE chat_conversations.id = chat_messages.conversation_id 
    AND (
      (auth.uid() IS NOT NULL AND chat_conversations.user_id = auth.uid()) OR
      (auth.uid() IS NULL AND chat_conversations.user_id IS NULL AND 
       chat_conversations.session_id = current_setting('request.jwt.claims', true)::json->>'session_id')
    )
  )
);

-- Add index for better performance on session-based queries
CREATE INDEX IF NOT EXISTS idx_chat_conversations_session_id ON public.chat_conversations(session_id) WHERE user_id IS NULL;
CREATE INDEX IF NOT EXISTS idx_chat_conversations_user_id ON public.chat_conversations(user_id) WHERE user_id IS NOT NULL;