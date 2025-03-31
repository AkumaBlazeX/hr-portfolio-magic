import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatBubble from './ChatBubble';
import { sendMessage, MessageType } from '../utils/chatApi';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Configuration options
  const headerTitle = "Chat with me";
  const welcomeMessage = "Hello! How can I help you today?";
  
  // Show tooltip notification at intervals
  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false);
      return;
    }
    
    const intervalId = setInterval(() => {
      setShowTooltip(true);
      const timeoutId = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
      return () => clearTimeout(timeoutId);
    }, 30000);
    
    const initialTooltipId = setTimeout(() => {
      setShowTooltip(true);
      setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
    }, 5000);
    
    return () => {
      clearInterval(intervalId);
      clearTimeout(initialTooltipId);
    };
  }, [isOpen]);
  
  // Initialize with welcome message
  useEffect(() => {
    setMessages([{
      id: '0',
      content: welcomeMessage,
      sender: 'bot',
      timestamp: new Date().toISOString()
    }]);
  }, []);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus input field when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);
  
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Create user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    
    // Add user message to UI
    setMessages((prev) => [...prev, userMessage]);
    
    // Clear input
    setInputMessage('');
    
    // Send to API and get response
    setIsLoading(true);
    try {
      const response = await sendMessage(userMessage.content);
      setMessages((prev) => [...prev, response]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: MessageType = {
        id: Date.now().toString(),
        content: "Sorry, I couldn't process your message. Please try again.",
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const toggleWidget = () => {
    setIsOpen((prev) => !prev);
    setShowTooltip(false);
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <TooltipProvider>
        <Tooltip open={showTooltip}>
          <TooltipTrigger asChild>
            <button
              onClick={toggleWidget}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90 transition-all"
              aria-label={isOpen ? "Close chat" : "Open chat"}
            >
              {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-secondary text-secondary-foreground font-medium p-3 max-w-[200px]">
            Need to know more about me? Let's chat!
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {isOpen && (
        <div className="glass-card absolute bottom-16 right-0 w-[350px] max-w-[90vw] h-[500px] max-h-[80vh] rounded-2xl shadow-xl flex flex-col overflow-hidden animate-scale-in">
          <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between">
            <h3 className="font-semibold">{headerTitle}</h3>
            <button 
              onClick={toggleWidget}
              className="text-primary-foreground/80 hover:text-primary-foreground"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-background/50 backdrop-blur-sm">
            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
            
            {isLoading && (
              <div className="flex justify-start mb-3">
                <div className="bg-secondary text-secondary-foreground py-2 px-4 rounded-2xl rounded-tl-none max-w-[80%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-current animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-current animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t bg-background">
            <div className="flex gap-2">
              <Input 
                ref={inputRef}
                type="text" 
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                size="icon"
                disabled={!inputMessage.trim() || isLoading}
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
