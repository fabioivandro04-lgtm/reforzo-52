import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    toast
  } = useToast();
  const welcomeMessage: Message = {
    id: 'welcome',
    role: 'assistant',
    content: 'Hello! I\'m your business consulting assistant. I can help you learn about Reforzo\'s services, our approach to operational excellence, and how we can help transform your business. What would you like to know?',
    timestamp: new Date()
  };
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke('chat-bot', {
        body: {
          message: userMessage.content,
          sessionId,
          conversationId
        }
      });
      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to send message');
      }
      if (data?.error) {
        throw new Error(data.error);
      }
      const assistantMessage: Message = {
        id: `assistant_${Date.now()}`,
        role: 'assistant',
        content: data.response || 'I apologize, but I encountered an issue. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      if (data.conversationId && !conversationId) {
        setConversationId(data.conversationId);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        role: 'assistant',
        content: 'I\'m sorry, I encountered an error. Please try again or contact our team directly.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  const quickReplies = ["What services do you offer?", "How does your consulting process work?", "Can you help improve our operations?", "Schedule a consultation"];
  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
  };
  const scrollToContact = () => {
    setIsOpen(false);
    const contactSection = document.getElementById('contact-info') || document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  if (!isOpen) {
    return <Button onClick={() => setIsOpen(true)} className="fixed bottom-6 left-6 z-50 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/20 hover:scale-105" size="icon" aria-label="Open chat support">
        <MessageSquare className="h-5 w-5" />
      </Button>;
  }
  return <Card className="fixed bottom-6 left-6 z-50 w-[400px] h-[600px] shadow-xl border border-border/20 bg-background backdrop-blur-md flex flex-col animate-scale-in">
      <CardHeader className="border-b border-border/10 bg-gradient-to-r from-primary/5 to-primary/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-sm">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Assistant</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-xs text-muted-foreground">Online • Reforzo Consulting</p>
              </div>
            </div>
          </div>
          <Button onClick={() => setIsOpen(false)} variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-background/50 rounded-full">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex flex-col h-full p-0">
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {messages.map((message, index) => <div key={message.id} className={`flex gap-3 animate-fade-in ${message.role === 'user' ? 'justify-end' : 'justify-start'}`} style={{
            animationDelay: `${index * 50}ms`
          }}>
                {message.role === 'assistant' && <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>}
                
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${message.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-md' : 'bg-muted/50 text-foreground rounded-bl-md border border-border/20'}`}>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
                
                {message.role === 'user' && <div className="w-8 h-8 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                    <User className="h-4 w-4 text-secondary-foreground" />
                  </div>}
              </div>)}
            
            {isLoading && <div className="flex gap-3 justify-start animate-fade-in">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="bg-muted/50 text-foreground rounded-2xl rounded-bl-md px-4 py-3 text-sm flex items-center gap-2 border border-border/20 shadow-sm">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-muted-foreground">Thinking...</span>
                </div>
              </div>}
            
            {messages.length === 1 && <div className="space-y-4 mt-8 animate-fade-in" style={{
            animationDelay: '300ms'
          }}>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                    Quick Questions
                  </Badge>
                </div>
                <div className="grid gap-3">
                  {quickReplies.map((reply, index) => <Button key={index} onClick={() => handleQuickReply(reply)} variant="outline" size="sm" className="justify-start text-left text-sm h-auto py-3 px-4 bg-background/50 hover:bg-muted/80 border-border/30 hover:border-primary/30 transition-all duration-200 hover:shadow-sm">
                      {reply}
                    </Button>)}
                </div>
              </div>}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="p-6 border-t border-border/10 bg-background/80 backdrop-blur-sm">
          <div className="flex gap-3 items-end mb-4">
            <div className="flex-1 relative">
              <Input value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyPress} placeholder="Type your message..." disabled={isLoading} className="bg-muted/30 border-border/30 focus:border-primary/50 focus:ring-primary/20 text-sm h-12 pr-12 rounded-xl resize-none" />
            </div>
            <Button onClick={sendMessage} disabled={!inputValue.trim() || isLoading} size="icon" className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-12 flex-shrink-0 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <Button onClick={scrollToContact} variant="link" size="sm" className="text-xs text-muted-foreground hover:text-primary h-auto p-0 font-normal transition-colors duration-200">
            Need to speak with a consultant? Contact our team →
          </Button>
        </div>
      </CardContent>
    </Card>;
};
export default ChatBot;