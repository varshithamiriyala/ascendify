"use client";

import * as React from 'react';
import { Bot, MessageSquare, Send, User, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { aiChatAssistant } from '@/ai/flows/ai-chat-assistant';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export function ChatAssistant() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { response } = await aiChatAssistant({ query: input });
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
        const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: "Sorry, I couldn't process your request. Please try again.",
            sender: 'ai',
        };
        setMessages((prev) => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="h-7 w-7" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="flex h-[70vh] max-h-[70vh] w-[90vw] max-w-lg flex-col p-0">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle>AI Career Coach</DialogTitle>
            <DialogDescription>
              Ask for advice on your career, skills, or development plan.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
            <div className="space-y-4 py-4">
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                    Start a conversation! For example: "How can I improve my leadership skills?"
                </div>
              )}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex items-start gap-3',
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.sender === 'ai' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-[75%] rounded-lg p-3 text-sm',
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <div className="prose-sm" dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br>') }} />
                  </div>
                  {message.sender === 'user' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                 <div className="flex items-start gap-3 justify-start">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className='bg-muted rounded-lg p-3'>
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                 </div>
              )}
            </div>
          </ScrollArea>

          <DialogFooter className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
