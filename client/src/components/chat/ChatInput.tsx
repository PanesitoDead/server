import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const QUICK_SUGGESTIONS = [
  "¿Qué es la escucha activa?",
  "Técnicas de presentación",
  "Comunicación no verbal",
];

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 96); // Max 4 rows
      textareaRef.current.style.height = newHeight + 'px';
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && message.length <= 500) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    textareaRef.current?.focus();
  };

  const isDisabled = !message.trim() || message.length > 500 || isLoading;

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-4 sm:px-6">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu pregunta sobre comunicación..."
              className="w-full resize-none rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 pr-12 text-sm focus:border-chat-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-chat-primary/20 transition-colors"
              rows={1}
              maxLength={500}
              disabled={isLoading}
              data-testid="input-message"
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-400" data-testid="text-char-count">
              {message.length}/500
            </div>
          </div>
          {message.length > 500 && (
            <div className="text-red-500 text-xs mt-1" data-testid="text-error-length">
              El mensaje no puede exceder 500 caracteres.
            </div>
          )}
        </div>
        <Button
          type="submit"
          disabled={isDisabled}
          className="bg-chat-primary hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full p-3 transition-colors duration-200"
          data-testid="button-send"
        >
          <Send size={16} />
        </Button>
      </form>

      {/* Quick Suggestions */}
      <div className="mt-3 flex flex-wrap gap-2">
        {QUICK_SUGGESTIONS.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            disabled={isLoading}
            className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 text-xs px-3 py-2 rounded-full transition-colors"
            data-testid={`button-suggestion-${index}`}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
