
import React from 'react';
import { MessageType } from '../utils/chatApi';
import { cn } from '@/lib/utils';

interface ChatBubbleProps {
  message: MessageType;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div 
      className={cn(
        "flex mb-3 animate-fade-in",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      <div 
        className={cn(
          "max-w-[80%] py-2 px-4 rounded-2xl",
          isBot 
            ? "bg-secondary text-secondary-foreground rounded-tl-none" 
            : "bg-primary text-primary-foreground rounded-tr-none"
        )}
      >
        <p className="text-sm">{message.content}</p>
        <span className="text-xs opacity-60 mt-1 block">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default ChatBubble;
