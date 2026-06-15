import { create } from 'zustand';
import type { ChatMessage, Citation, AgentTrace, TraceStep, KnowledgeAsset } from '@/types';
import { useKnowledgeStore } from './knowledgeStore';

interface ChatState {
  messages: ChatMessage[];
  isProcessing: boolean;
  currentTrace: AgentTrace | null;

  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

interface SearchResult {
  asset: KnowledgeAsset;
  relevance: number;
}

// 模拟 Agent 检索服务
async function simulateAgentQuery(query: string): Promise<{
  answer: string;
  citations: Citation[];
  trace: AgentTrace;
}> {
  const { assets } = useKnowledgeStore.getState();

  const steps: TraceStep[] = [
    { name: '问题解析', status: 'pending', detail: '' },
    { name: '知识检索', status: 'pending', detail: '' },
    { name: '结果排序', status: 'pending', detail: '' },
    { name: '答案生成', status: 'pending', detail: '' },
  ];

  const trace: AgentTrace = { steps };

  // 步骤1: 问题解析
  trace.steps[0].status = 'running';
  trace.steps[0].detail = `正在解析用户问题: "${query}"`;
  await delay(600);
  const keywords = extractKeywords(query);
  trace.steps[0].status = 'completed';
  trace.steps[0].detail = `提取关键词: ${keywords.join(', ')}`;
  trace.steps[0].duration = 600;

  // 步骤2: 知识检索
  trace.steps[1].status = 'running';
  trace.steps[1].detail = `在 ${assets.length} 个知识资产中检索...`;
  await delay(800);
  const results = searchAssets(assets, keywords);
  trace.steps[1].status = 'completed';
  trace.steps[1].detail = `检索到 ${results.length} 个相关资产`;
  trace.steps[1].duration = 800;

  // 步骤3: 结果排序
  trace.steps[2].status = 'running';
  trace.steps[2].detail = '按相关度排序检索结果...';
  await delay(400);
  results.sort((a, b) => b.relevance - a.relevance);
  trace.steps[2].status = 'completed';
  trace.steps[2].detail = `排序完成，最相关资产: ${results[0]?.asset.title || '无'}`;
  trace.steps[2].duration = 400;

  // 步骤4: 答案生成
  trace.steps[3].status = 'running';
  trace.steps[3].detail = '基于检索结果生成回答...';
  await delay(700);
  const answer = generateAnswer(query, results);
  trace.steps[3].status = 'completed';
  trace.steps[3].detail = `回答生成完成，引用 ${results.length} 个来源`;
  trace.steps[3].duration = 700;

  const citations: Citation[] = results.slice(0, 3).map((r) => ({
    assetId: r.asset.id,
    title: r.asset.title,
    relevance: r.relevance,
    snippet: r.asset.summary,
  }));

  return { answer, citations, trace };
}

function extractKeywords(query: string): string[] {
  const stopWords = new Set(['的', '了', '是', '在', '有', '和', '与', '如何', '什么', '怎么', '为什么', '请', '能', '可以', '我', '你', '它', '这', '那', 'how', 'what', 'why', 'is', 'are', 'the', 'a', 'an', 'can', 'do']);
  return query
    .split(/[\s,，。？?！!、]+/)
    .filter((word) => word.length > 0 && !stopWords.has(word.toLowerCase()));
}

function searchAssets(assets: KnowledgeAsset[], keywords: string[]): SearchResult[] {
  const results: SearchResult[] = [];

  for (const asset of assets) {
    let relevance = 0;

    for (const keyword of keywords) {
      const kw = keyword.toLowerCase();
      if (asset.title.toLowerCase().includes(kw)) relevance += 3;
      if (asset.tags.some((t) => t.toLowerCase().includes(kw))) relevance += 2;
      if (asset.summary.toLowerCase().includes(kw)) relevance += 2;
      if (asset.content.toLowerCase().includes(kw)) relevance += 1;
    }

    if (relevance > 0) {
      results.push({ asset, relevance });
    }
  }

  // 如果没有匹配结果，返回最相关的几个资产
  if (results.length === 0) {
    return assets.slice(0, 2).map((asset) => ({ asset, relevance: 0.3 }));
  }

  return results;
}

function generateAnswer(_query: string, results: SearchResult[]): string {
  if (results.length === 0) {
    return '抱歉，我在知识库中未找到与您问题直接相关的内容。请尝试换一种方式提问，或先添加相关的知识资产。';
  }

  const topResults = results.slice(0, 3);
  let answer = `根据知识库检索，为您找到以下相关信息：\n\n`;

  for (let i = 0; i < topResults.length; i++) {
    const { asset, relevance } = topResults[i];
    answer += `**${i + 1}. ${asset.title}**（相关度: ${Math.round(relevance * 10) / 10}）\n`;
    answer += `${asset.summary}\n\n`;
  }

  answer += `以上信息来源于知识库中的 ${topResults.length} 个资产。如需更详细的内容，可以点击引用来源查看完整文档。`;

  return answer;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isProcessing: false,
  currentTrace: null,

  sendMessage: async (content) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      messages: [...state.messages, userMessage],
      isProcessing: true,
    }));

    try {
      const { answer, citations, trace } = await simulateAgentQuery(content);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: answer,
        citations,
        trace,
        createdAt: new Date().toISOString(),
      };

      set((state) => ({
        messages: [...state.messages, assistantMessage],
        isProcessing: false,
        currentTrace: trace,
      }));
    } catch {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '抱歉，处理您的问题时出现了错误，请稍后重试。',
        createdAt: new Date().toISOString(),
      };

      set((state) => ({
        messages: [...state.messages, errorMessage],
        isProcessing: false,
      }));
    }
  },

  clearMessages: () => set({ messages: [], currentTrace: null }),
}));
