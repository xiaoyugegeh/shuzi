import { useState, useRef, useEffect } from 'react';
import { SendHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  return (
    <div className="border-t border-zinc-200/60 bg-white/50 p-4">
      <div className="flex gap-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="向 Agent 提问..."
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none rounded-lg border border-zinc-200/50 bg-zinc-50/50 px-3 py-2.5 text-sm text-zinc-800 placeholder-zinc-400 outline-none transition-colors focus:border-sky-400/40 disabled:opacity-50"
        />
        <Button
          onClick={handleSubmit}
          disabled={disabled || !input.trim()}
          size="md"
          className="h-[42px] px-3"
        >
          <SendHorizontal size={16} />
        </Button>
      </div>
      <p className="mt-2 text-center text-[10px] text-zinc-400">
        Agent 基于知识库检索结果生成回答 · Enter 发送 · Shift+Enter 换行
      </p>
    </div>
  );
}
