import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { AssetList } from '@/components/knowledge/AssetList';
import { AssetForm } from '@/components/knowledge/AssetForm';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

export default function Workbench() {
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen flex-col bg-sky-50 text-zinc-800">
      <Header onAddAsset={() => setShowAssetForm(true)} />

      <div className="flex flex-1 overflow-hidden">
        {/* 左侧：知识资产面板 */}
        <div
          className={`border-r border-zinc-200/60 transition-all duration-300 ${
            sidebarOpen ? 'w-[380px]' : 'w-0'
          }`}
        >
          <div className="h-full w-[380px]">{sidebarOpen && <AssetList />}</div>
        </div>

        {/* 折叠按钮 */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex h-full w-6 items-center justify-center border-r border-zinc-200/40 bg-white/50 text-zinc-400 transition-colors hover:bg-sky-100 hover:text-zinc-400"
        >
          {sidebarOpen ? <PanelLeftClose size={14} /> : <PanelLeftOpen size={14} />}
        </button>

        {/* 右侧：Agent 问答区 */}
        <div className="flex-1">
          <ChatPanel />
        </div>
      </div>

      {/* 新增资产弹窗 */}
      <AssetForm open={showAssetForm} onClose={() => setShowAssetForm(false)} />
    </div>
  );
}
