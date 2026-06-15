import { useState } from 'react';
import type { AgentTrace as AgentTraceType } from '@/types';
import { Activity, CheckCircle2, Loader2, Circle } from 'lucide-react';

interface AgentTraceProps {
  trace: AgentTraceType;
}

export function AgentTrace({ trace }: AgentTraceProps) {
  const [expanded, setExpanded] = useState(false);

  const totalDuration = trace.steps.reduce((sum, step) => sum + (step.duration || 0), 0);

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200/30 bg-zinc-100/50">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-2 px-3 py-2 text-xs text-zinc-500 transition-colors hover:text-zinc-400"
      >
        <Activity size={12} />
        <span className="font-medium">Agent Trace</span>
        <span className="text-[10px] text-zinc-400">{totalDuration}ms</span>
        <svg
          className={`ml-auto h-3 w-3 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="border-t border-zinc-200/30 px-3 py-2">
          <div className="space-y-0">
            {trace.steps.map((step, index) => (
              <div key={index} className="flex gap-3">
                {/* 时间线 */}
                <div className="flex flex-col items-center">
                  <div className="flex h-5 w-5 items-center justify-center">
                    {step.status === 'completed' ? (
                      <CheckCircle2 size={14} className="text-emerald-400" />
                    ) : step.status === 'running' ? (
                      <Loader2 size={14} className="animate-spin text-sky-400" />
                    ) : (
                      <Circle size={14} className="text-zinc-400" />
                    )}
                  </div>
                  {index < trace.steps.length - 1 && (
                    <div className="w-px flex-1 bg-zinc-700/50" />
                  )}
                </div>

                {/* 内容 */}
                <div className="pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-zinc-700">{step.name}</span>
                    {step.duration && (
                      <span className="text-[10px] text-zinc-400">{step.duration}ms</span>
                    )}
                  </div>
                  <p className="mt-0.5 text-[10px] text-zinc-400">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
