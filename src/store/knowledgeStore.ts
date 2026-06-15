import { create } from 'zustand';
import type { KnowledgeAsset, AssetType } from '@/types';
import { mockAssets } from '@/data/mockAssets';

interface KnowledgeState {
  assets: KnowledgeAsset[];
  searchQuery: string;
  selectedTags: string[];
  selectedType: AssetType | null;

  setSearchQuery: (query: string) => void;
  setSelectedTags: (tags: string[]) => void;
  setSelectedType: (type: AssetType | null) => void;
  addAsset: (asset: Omit<KnowledgeAsset, 'id' | 'createdAt' | 'updatedAt'>) => void;
  getFilteredAssets: () => KnowledgeAsset[];
  getAllTags: () => string[];
  getAssetById: (id: string) => KnowledgeAsset | undefined;
}

export const useKnowledgeStore = create<KnowledgeState>((set, get) => ({
  assets: [...mockAssets],
  searchQuery: '',
  selectedTags: [],
  selectedType: null,

  setSearchQuery: (query) => set({ searchQuery: query }),

  setSelectedTags: (tags) => set({ selectedTags: tags }),

  setSelectedType: (type) => set({ selectedType: type }),

  addAsset: (asset) => {
    const now = new Date().toISOString();
    const newAsset: KnowledgeAsset = {
      ...asset,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    };
    set((state) => ({ assets: [newAsset, ...state.assets] }));
  },

  getFilteredAssets: () => {
    const { assets, searchQuery, selectedTags, selectedType } = get();
    return assets.filter((asset) => {
      const matchesSearch =
        !searchQuery ||
        asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => asset.tags.includes(tag));

      const matchesType = !selectedType || asset.type === selectedType;

      return matchesSearch && matchesTags && matchesType;
    });
  },

  getAllTags: () => {
    const { assets } = get();
    const tagSet = new Set<string>();
    assets.forEach((asset) => asset.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  },

  getAssetById: (id) => {
    const { assets } = get();
    return assets.find((asset) => asset.id === id);
  },
}));
