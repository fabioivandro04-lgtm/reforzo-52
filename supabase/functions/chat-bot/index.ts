import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, sessionId, conversationId } = await req.json();

    console.log('Received chat request:', { message, sessionId, conversationId });

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Initialize Supabase client (Service Role Key bypasses RLS for secure session handling)
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

    // Validate session ID for anonymous conversations
    if (!sessionId || sessionId.trim() === '') {
      throw new Error('Session ID is required for anonymous conversations');
    }

    // Get or create conversation with proper session validation
    let conversation = null;
    if (conversationId) {
      const { data } = await supabase
        .from('chat_conversations')
        .select('*')
        .eq('id', conversationId)
        .eq('session_id', sessionId) // Validate session ownership
        .maybeSingle();
      conversation = data;
    }

    if (!conversation) {
      const { data, error } = await supabase
        .from('chat_conversations')
        .insert({
          session_id: sessionId,
          user_id: null // Anonymous conversation
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating conversation:', error);
        throw new Error('Failed to create conversation');
      }
      conversation = data;
    }

    // Save user message
    await supabase
      .from('chat_messages')
      .insert({
        conversation_id: conversation.id,
        role: 'user',
        content: message
      });

    // Get conversation history for context (with session validation)
    const { data: messages } = await supabase
      .from('chat_messages')
      .select('role, content')
      .eq('conversation_id', conversation.id)
      .order('created_at', { ascending: true });

    // Build conversation context
    const conversationHistory = messages?.map(msg => ({
      role: msg.role,
      content: msg.content
    })) || [];

    // Enhanced system prompt for polished, professional responses
    const systemPrompt = `You are an expert business consulting advisor representing Reforzo, a premier operational excellence consultancy with 15+ years of proven success.

RESPONSE EXCELLENCE FRAMEWORK:
• Start with a confident, solution-focused opening
• Provide actionable insights with specific value propositions
• Include relevant metrics or success examples when possible
• End with a compelling next step that drives engagement

CORE EXPERTISE AREAS:
• Operational Excellence & Lean Process Optimization (20-40% cost reduction typical)
• Digital Transformation & Technology Integration (ROI average 300%+)
• Supply Chain Optimization & Logistics Excellence (15-25% efficiency gains)
• Change Management & Cultural Transformation (85% success rate)
• Performance Management & KPI Systems (measurable productivity gains)
• Quality Management Systems (ISO 9001, Lean Six Sigma certification)
• Strategic Planning & Business Process Reengineering

COMMUNICATION EXCELLENCE:
✓ Authoritative yet approachable tone - speak as the expert you are
✓ Solutions-oriented language that builds confidence
✓ Include specific benefits and outcomes (percentages, timeframes)
✓ Use power words: "optimize," "transform," "accelerate," "maximize"
✓ Keep responses focused but comprehensive (120-150 words)
✓ Structure with clear bullet points for easy scanning

PROVEN VALUE DELIVERY:
• Over 500 successful transformations across industries
• Average client ROI of 400% within 18 months
• 95% client retention rate demonstrates lasting partnerships
• Industry-leading methodologies combining Lean, Six Sigma, and digital innovation
• Rapid assessment and implementation (results visible in 90 days)

RESPONSE STRUCTURE:
1. Confident opening that addresses their need directly
2. 3-4 specific value points with benefits
3. Brief credibility statement or success metric
4. Clear, compelling call-to-action

PRICING STRATEGY: Emphasize value-based investment that pays for itself. Mention free initial consultation to remove barriers.

ESCALATION PATH: Guide users to schedule a complimentary strategic consultation for personalized solutions.`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...conversationHistory.slice(-10), // Keep last 10 messages for context
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error('Failed to get AI response');
    }

    const data = await response.json();
    let aiResponse = data.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    // Clean and format the AI response
    let cleanedResponse = aiResponse || '';

    // Remove markdown formatting
    cleanedResponse = cleanedResponse.replace(/\*\*(.*?)\*\*/g, '$1'); // Remove bold **text**
    cleanedResponse = cleanedResponse.replace(/\*(.*?)\*/g, '$1');     // Remove italic *text*
    cleanedResponse = cleanedResponse.replace(/__(.*?)__/g, '$1');     // Remove underline __text__
    cleanedResponse = cleanedResponse.replace(/`(.*?)`/g, '$1');       // Remove code `text`
    cleanedResponse = cleanedResponse.replace(/#{1,6}\s*/g, '');       // Remove headers # ## ###
    cleanedResponse = cleanedResponse.replace(/\[(.*?)\]\(.*?\)/g, '$1'); // Remove links [text](url)
    cleanedResponse = cleanedResponse.replace(/!\[(.*?)\]\(.*?\)/g, '$1'); // Remove images ![alt](url)
    
    // Remove bullet points and list formatting
    cleanedResponse = cleanedResponse.replace(/^\s*[-•*+]\s+/gm, ''); // Remove bullet points
    cleanedResponse = cleanedResponse.replace(/^\s*\d+\.\s+/gm, '');  // Remove numbered lists
    
    // Fix spacing and punctuation
    cleanedResponse = cleanedResponse.replace(/\s+/g, ' ');           // Multiple spaces to single space
    cleanedResponse = cleanedResponse.replace(/\s+([,.!?;:])/g, '$1'); // Fix spacing before punctuation
    cleanedResponse = cleanedResponse.replace(/([,.!?;:])\s*/g, '$1 '); // Ensure space after punctuation
    cleanedResponse = cleanedResponse.replace(/\s+\./g, '.');         // Fix spacing before periods
    
    // Clean up line breaks and create proper paragraphs
    cleanedResponse = cleanedResponse.replace(/\r?\n\s*\r?\n/g, '\n\n'); // Double line breaks for paragraphs
    cleanedResponse = cleanedResponse.replace(/\r?\n(?!\n)/g, ' ');      // Single line breaks to spaces
    cleanedResponse = cleanedResponse.replace(/\n\n+/g, '\n\n');         // Multiple paragraph breaks to double
    
    // Remove external quotes if present
    cleanedResponse = cleanedResponse.replace(/^"(.*)"$/, '$1');
    
    // Replace currency symbols
    cleanedResponse = cleanedResponse.replace(/R\$/g, 'reais');
    
    // Final cleanup
    cleanedResponse = cleanedResponse.trim();
    cleanedResponse = cleanedResponse.replace(/[\u0000-\u001F\u007F]+/g, ''); // Remove control characters
    
    // Ensure sentences end with proper punctuation
    if (cleanedResponse && !/[.!?]$/.test(cleanedResponse)) {
        cleanedResponse += '.';
    }

    // Use the cleaned response as the final response
    aiResponse = cleanedResponse;

    // Save AI response
    await supabase
      .from('chat_messages')
      .insert({
        conversation_id: conversation.id,
        role: 'assistant',
        content: aiResponse
      });

    console.log('Chat response sent successfully');

    return new Response(JSON.stringify({ 
      response: aiResponse,
      conversationId: conversation.id 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat-bot function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An error occurred processing your request' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});