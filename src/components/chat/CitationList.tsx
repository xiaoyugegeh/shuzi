import type { Citation } from '@/types';
import { ExternalLink, BookOpen } from 'lucide-react';
import { useState } from 'react';

interface CitationListProps {
  citations: Citation[];
}

export function CitationList({ citations }: CitationListProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200/30 bg-zinc-100/50">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-2 px-3 py-2 text-xs text-zinc-500 transition-colors hover:text-zinc-400"
      >
        <BookOpen size={12} />
        <span className="font-medium">引用来源 ({citations.length})</span>
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
        <div className="border-t border-zinc-200/30 px-3 py-2 space-y-2">
          {citations.map((citation, index) => (
            <div
              key={citation.assetId}
              className="flex items-start gap-2 rounded-md bg-white/60 p-2.5"
            >
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-sky-400/15 text-[10px] font-bold text-sky-400">
                {index + 1}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-xs font-medium text-zinc-700">
                    {citation.title}
                  </p>
                  <ExternalLink size={10} className="shrink-0 text-zinc-400" />
                </div>
                <p className="mt-0.5 text-[10px] text-zinc-400 line-clamp-2">
                  {citation.snippet}
                </p>
                <div className="mt-1 flex items-center gap-1">
                  <div className="h-1 flex-1 rounded-full bg-zinc-100">
                    <div
                      className="h-1 rounded-full bg-sky-400/60 transition-all"
                      style={{ width: `${Math.min(citation.relevance * 20, 100)}%` }}
                    />
                  </div>
                  <span className="text-[9px] text-zinc-400">
                    {Math.round(citation.relevance * 10) / 10}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
