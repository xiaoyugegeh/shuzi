// 知识资产类型
export type AssetType = 'document' | 'article' | 'snippet' | 'api-doc';

export interface KnowledgeAsset {
  id: string;
  title: string;
  content: string;
  tags: string[];
  type: AssetType;
  source: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
}

// Agent 检索追踪步骤
export type TraceStepStatus = 'pending' | 'running' | 'completed';

export interface TraceStep {
  name: string;
  status: TraceStepStatus;
  detail: string;
  duration?: number;
}

export interface AgentTrace {
  steps: TraceStep[];
}

// 引用来源
export interface Citation {
  assetId: string;
  title: string;
  relevance: number;
  snippet: string;
}

// 聊天消息
export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  citations?: Citation[];
  trace?: AgentTrace;
  createdAt: string;
}
