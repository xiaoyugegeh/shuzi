import { useState, useEffect, useRef } from 'react';
import type { ChatMessage as ChatMessageType } from '@/types';
import { CitationList } from './CitationList';
import { AgentTrace } from './AgentTrace';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const [displayedContent, setDisplayedContent] = useState(isUser ? message.content : '');
  const [isTyping, setIsTyping] = useState(!isUser);
  const contentRef = useRef<HTMLDivElement>(null);

  // 打字机效果
  useEffect(() => {
    if (isUser) return;

    let index = 0;
    const content = message.content;
    setDisplayedContent('');
    setIsTyping(true);

    const interval = setInterval(() => {
      if (index < content.length) {
        setDisplayedContent(content.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [message.id, isUser, message.content]);

  // 自动滚动
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [displayedContent]);

  return (
    <div ref={contentRef} className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* 头像 */}
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
          isUser
            ? 'bg-amber-500/15 text-amber-400'
            : 'bg-zinc-800 text-zinc-400 ring-1 ring-zinc-700/50'
        }`}
      >
        {isUser ? <User size={14} /> : <Bot size={14} />}
      </div>

      {/* 消息内容 */}
      <div className={`max-w-[80%] space-y-2 ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
            isUser
              ? 'bg-amber-500/15 text-amber-200/90'
              : 'bg-zinc-800/60 text-zinc-300 ring-1 ring-zinc-700/30'
          }`}
        >
          {isUser ? (
            <p>{message.content}</p>
          ) : (
            <div className="whitespace-pre-wrap">
              {renderContent(displayedContent)}
              {isTyping && <span className="animate-pulse text-amber-400">|</span>}
            </div>
          )}
        </div>

        {/* 引用来源 */}
        {!isUser && message.citations && message.citations.length > 0 && !isTyping && (
          <CitationList citations={message.citations} />
        )}

        {/* Agent Trace */}
        {!isUser && message.trace && !isTyping && (
          <AgentTrace trace={message.trace} />
        )}
      </div>
    </div>
  );
}

// 简单的 Markdown 渲染
function renderContent(content: string): React.ReactNode {
  const parts = content.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-zinc-100">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
