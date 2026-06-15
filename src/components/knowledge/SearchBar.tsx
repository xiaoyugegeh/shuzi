import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="搜索知识资产..."
        className="w-full rounded-lg border border-zinc-200 bg-white/50 py-2 pl-9 pr-9 text-sm text-zinc-800 placeholder-zinc-400 outline-none transition-colors focus:border-sky-400/40 focus:ring-1 focus:ring-sky-400/20"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-400"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
