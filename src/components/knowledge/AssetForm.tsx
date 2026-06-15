import { useState } from 'react';
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { useKnowledgeStore } from '@/store/knowledgeStore';
import type { AssetType } from '@/types';

interface AssetFormProps {
  open: boolean;
  onClose: () => void;
}

const typeOptions: { value: AssetType; label: string }[] = [
  { value: 'document', label: '文档' },
  { value: 'article', label: '文章' },
  { value: 'snippet', label: '片段' },
  { value: 'api-doc', label: 'API 文档' },
];

export function AssetForm({ open, onClose }: AssetFormProps) {
  const addAsset = useKnowledgeStore((s) => s.addAsset);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState('');
  const [type, setType] = useState<AssetType>('article');
  const [source, setSource] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addAsset({
      title: title.trim(),
      content: content.trim(),
      summary: summary.trim() || content.trim().slice(0, 100) + '...',
      tags: tags
        .split(/[,，]/)
        .map((t) => t.trim())
        .filter(Boolean),
      type,
      source: source.trim() || '用户创建',
    });

    setTitle('');
    setContent('');
    setSummary('');
    setTags('');
    setType('article');
    setSource('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} title="新增知识资产">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-400">标题 *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="输入资产标题"
            className="w-full rounded-lg border border-zinc-700/50 bg-zinc-800/50 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-amber-500/40"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-400">内容 *</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="输入资产内容"
            rows={5}
            className="w-full resize-none rounded-lg border border-zinc-700/50 bg-zinc-800/50 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-amber-500/40"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-400">摘要</label>
          <input
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="简短描述（可选，默认截取内容前100字）"
            className="w-full rounded-lg border border-zinc-700/50 bg-zinc-800/50 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-amber-500/40"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-400">类型</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as AssetType)}
              className="w-full rounded-lg border border-zinc-700/50 bg-zinc-800/50 px-3 py-2 text-sm text-zinc-200 outline-none transition-colors focus:border-amber-500/40"
            >
              {typeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-400">来源</label>
            <input
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="数据来源"
              className="w-full rounded-lg border border-zinc-700/50 bg-zinc-800/50 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-amber-500/40"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-400">标签</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="用逗号分隔多个标签"
            className="w-full rounded-lg border border-zinc-700/50 bg-zinc-800/50 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-amber-500/40"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" type="button" onClick={onClose}>
            取消
          </Button>
          <Button type="submit">添加资产</Button>
        </div>
      </form>
    </Dialog>
  );
}
