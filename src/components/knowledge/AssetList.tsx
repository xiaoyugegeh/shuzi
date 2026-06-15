import { useKnowledgeStore } from '@/store/knowledgeStore';
import { SearchBar } from './SearchBar';
import { AssetCard } from './AssetCard';
import { Badge } from '@/components/ui/Badge';
import type { AssetType } from '@/types';
import { FolderOpen } from 'lucide-react';

const typeFilters: { value: AssetType | null; label: string }[] = [
  { value: null, label: '全部' },
  { value: 'document', label: '文档' },
  { value: 'article', label: '文章' },
  { value: 'snippet', label: '片段' },
  { value: 'api-doc', label: 'API' },
];

export function AssetList() {
  const {
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    selectedTags,
    setSelectedTags,
    getFilteredAssets,
    getAllTags,
  } = useKnowledgeStore();

  const filteredAssets = getFilteredAssets();
  const allTags = getAllTags();

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* 搜索栏 */}
      <div className="border-b border-zinc-200/60 p-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* 类型筛选 */}
        <div className="mt-3 flex gap-1.5">
          {typeFilters.map((filter) => (
            <button
              key={filter.label}
              onClick={() => setSelectedType(filter.value)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                selectedType === filter.value
                  ? 'bg-sky-100 text-sky-500 ring-1 ring-sky-400/30'
                  : 'text-zinc-400 hover:bg-zinc-100 hover:text-zinc-400'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* 标签筛选 */}
        {allTags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {allTags.slice(0, 10).map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? 'sky' : 'outline'}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* 资产列表 */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredAssets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-zinc-400">
            <FolderOpen size={40} className="mb-3" />
            <p className="text-sm">未找到匹配的知识资产</p>
            <p className="mt-1 text-xs text-zinc-400">尝试调整搜索条件或新增资产</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">
              {filteredAssets.length} 个资产
            </p>
            {filteredAssets.map((asset, index) => (
              <div
                key={asset.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <AssetCard asset={asset} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
