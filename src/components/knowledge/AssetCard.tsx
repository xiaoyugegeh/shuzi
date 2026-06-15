import { Badge } from '@/components/ui/Badge';
import type { KnowledgeAsset, AssetType } from '@/types';
import { FileText, BookOpen, Code, FileCode, Clock } from 'lucide-react';

const typeConfig: Record<AssetType, { label: string; icon: typeof FileText; color: string }> = {
  document: { label: '文档', icon: FileText, color: 'text-blue-400' },
  article: { label: '文章', icon: BookOpen, color: 'text-emerald-400' },
  snippet: { label: '片段', icon: Code, color: 'text-purple-400' },
  'api-doc': { label: 'API', icon: FileCode, color: 'text-orange-400' },
};

interface AssetCardProps {
  asset: KnowledgeAsset;
  onClick?: () => void;
}

export function AssetCard({ asset, onClick }: AssetCardProps) {
  const config = typeConfig[asset.type];
  const Icon = config.icon;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  };

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4 transition-all duration-200 hover:border-zinc-700/80 hover:bg-zinc-800/40 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5"
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Icon size={14} className={config.color} />
          <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
            {config.label}
          </span>
        </div>
        <div className="flex items-center gap-1 text-zinc-600">
          <Clock size={10} />
          <span className="text-[10px]">{formatDate(asset.createdAt)}</span>
        </div>
      </div>

      <h3 className="mb-2 text-sm font-semibold text-zinc-200 transition-colors group-hover:text-amber-400/90 line-clamp-1">
        {asset.title}
      </h3>

      <p className="mb-3 text-xs leading-relaxed text-zinc-500 line-clamp-2">
        {asset.summary}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {asset.tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
