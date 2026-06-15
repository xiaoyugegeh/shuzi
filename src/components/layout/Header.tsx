import { Database, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
  onAddAsset: () => void;
}

export function Header({ onAddAsset }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15">
            <Database size={18} className="text-amber-400" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-zinc-100">知识资产问答工作台</h1>
            <p className="text-[10px] text-zinc-500">Knowledge Asset Q&A Workbench</p>
          </div>
        </div>
        <Button size="sm" onClick={onAddAsset}>
          <Plus size={14} className="mr-1.5" />
          新增资产
        </Button>
      </div>
    </header>
  );
}
