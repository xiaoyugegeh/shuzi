import { useRef, useEffect } from 'react';
import { useChatStore } from '@/store/chatStore';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { MessageSquare, Trash2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ChatPanel() {
  const { messages, isProcessing, sendMessage, clearMessages } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-full flex-col">
      {/* 标题栏 */}
      <div className="flex items-center justify-between border-b border-zinc-200/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-sky-400" />
          <span className="text-sm font-medium text-zinc-800">Agent 问答</span>
        </div>
        {messages.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearMessages}>
            <Trash2 size={12} className="mr-1" />
            清空
          </Button>
        )}
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-zinc-400">
            <MessageSquare size={48} className="mb-4 text-zinc-400" />
            <p className="text-sm font-medium">向 Agent 提问</p>
            <p className="mt-1 text-xs text-zinc-400">
              Agent 将基于知识库检索结果为您生成回答
            </p>
            <div className="mt-6 space-y-2">
              {['RAG 技术的核心流程是什么？', 'React 18 有哪些新特性？', '如何选择向量数据库？'].map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => sendMessage(suggestion)}
                    className="block w-full rounded-lg border border-zinc-200/60 bg-zinc-100/50 px-4 py-2 text-left text-xs text-zinc-400 transition-all hover:border-zinc-300 hover:bg-zinc-50/50 hover:text-zinc-400"
                  >
                    {suggestion}
                  </button>
                )
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isProcessing && (
              <div className="flex gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 ring-1 ring-zinc-200/50">
                  <Sparkles size={14} className="animate-pulse" />
                </div>
                <div className="rounded-xl bg-zinc-100/60 px-4 py-2.5 ring-1 ring-zinc-200/30">
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-300" style={{ animationDelay: '0ms' }} />
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-300" style={{ animationDelay: '150ms' }} />
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-300" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* 输入框 */}
      <ChatInput onSend={sendMessage} disabled={isProcessing} />
    </div>
  );
}
