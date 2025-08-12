import { useEffect, useRef } from "react";
import { Bot, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface MessagesAreaProps {
  messages: Message[];
  isLoading: boolean;
}

export default function MessagesArea({ messages, isLoading }: MessagesAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-6 sm:px-6" data-testid="messages-area">
      {messages.map((message) => (
        <div key={message.id} className="message-container mb-6" data-testid={`message-${message.role}-${message.id}`}>
          {message.role === "user" ? (
            <div className="flex items-start space-x-3 justify-end">
              <div className="bg-chat-user-bubble rounded-2xl rounded-tr-md shadow-sm p-4 max-w-xs sm:max-w-md">
                <p className="text-gray-800 text-sm leading-relaxed" data-testid="message-content">{message.content}</p>
                <span className="text-xs text-gray-500 mt-2 block text-right" data-testid="message-time">
                  {formatTime(message.timestamp)}
                </span>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="text-gray-600" size={14} />
              </div>
            </div>
          ) : (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-chat-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="text-white" size={14} />
              </div>
              <div className="bg-chat-ai-bubble rounded-2xl rounded-tl-md shadow-sm border border-gray-100 p-4 max-w-xs sm:max-w-md">
                <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap" data-testid="message-content">
                  {message.content}
                </div>
                <span className="text-xs text-gray-500 mt-2 block" data-testid="message-time">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="message-container mb-6" data-testid="typing-indicator">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-chat-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="text-white" size={14} />
            </div>
            <div className="bg-chat-ai-bubble rounded-2xl rounded-tl-md shadow-sm border border-gray-100 p-4">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
