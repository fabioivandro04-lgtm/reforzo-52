-- Implement proper session-based security for anonymous chat conversations
-- Since Service Role Key bypasses RLS, we need a different approach

-- Drop the current policies that won't work with Service Role Key
DROP POLICY IF EXISTS "Users can view their own or session conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Users can create their own or session conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Users can update their own or session conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Users can view messages from their accessible conversations" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can create messages in their conversations" ON public.chat_messages;

-- Create simple but secure policies for authenticated users
CREATE POLICY "Authenticated users can view their own conversations" 
ON public.chat_conversations 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Authenticated users can create their own conversations" 
ON public.chat_conversations 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Authenticated users can update their own conversations" 
ON public.chat_conversations 
FOR UPDATE 
USING (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Authenticated users can view messages from their conversations" 
ON public.chat_messages 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM chat_conversations 
    WHERE chat_conversations.id = chat_messages.conversation_id 
    AND auth.uid() IS NOT NULL 
    AND chat_conversations.user_id = auth.uid()
  )
);

CREATE POLICY "Authenticated users can create messages in their conversations" 
ON public.chat_messages 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM chat_conversations 
    WHERE chat_conversations.id = chat_messages.conversation_id 
    AND auth.uid() IS NOT NULL 
    AND chat_conversations.user_id = auth.uid()
  )
);

-- Anonymous conversations will be handled by the edge function with Service Role Key
-- This ensures that only the edge function can access anonymous conversations
-- and session validation happens in the application logic

-- Add constraint to ensure session_id is provided for anonymous conversations
ALTER TABLE public.chat_conversations 
ADD CONSTRAINT check_anonymous_has_session 
CHECK (
  (user_id IS NOT NULL) OR 
  (user_id IS NULL AND session_id IS NOT NULL AND session_id != '')
);