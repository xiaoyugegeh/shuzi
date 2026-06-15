import type { KnowledgeAsset } from '@/types';

export const mockAssets: KnowledgeAsset[] = [
  {
    id: '1',
    title: 'React 18 并发特性详解',
    content: `React 18 引入了并发渲染机制，包括 Automatic Batching、Transitions API 和 Suspense 的增强。Automatic Batching 将多个状态更新合并为一次重渲染，即使在 setTimeout、Promise 等 异步场景中也能生效。Transitions API 允许开发者标记非紧急更新，让紧急更新（如输入）优先响应。Suspense 增强支持了服务端渲染中的流式传输，配合 React.lazy 实现代码分割。

核心 API：
- startTransition: 标记非紧急状态更新
- useDeferredValue: 延迟更新非关键值
- useId: 生成唯一 ID，支持 SSR 一致性
- useSyncExternalStore: 订阅外部数据源

并发模式下的渲染策略采用可中断渲染，当有更高优先级更新时，React 可以中断当前渲染并重新开始。`,
    tags: ['React', '并发', '前端框架'],
    type: 'article',
    source: 'React 官方文档',
    summary: '深入解析 React 18 的并发渲染机制，包括 Automatic Batching、Transitions API 和 Suspense 增强',
    createdAt: '2025-05-20T10:30:00Z',
    updatedAt: '2025-05-20T10:30:00Z',
  },
  {
    id: '2',
    title: 'RAG 检索增强生成技术白皮书',
    content: `RAG（Retrieval-Augmented Generation）是一种将信息检索与大语言模型结合的技术架构。其核心流程为：用户提问 → 检索相关文档 → 将检索结果作为上下文注入 Prompt → LLM 生成回答。

关键技术环节：
1. 文档切分（Chunking）：将长文档按语义段落切分为合适大小的片段
2. 向量化（Embedding）：使用文本嵌入模型将文档片段转换为向量表示
3. 向量检索：使用 ANN（近似最近邻）算法在向量数据库中检索最相关片段
4. 上下文组装：将检索结果按相关度排序后组装为 Prompt 上下文
5. 答案生成：LLM 基于上下文生成回答，并标注引用来源

常见向量数据库：Pinecone、Weaviate、Milvus、Chroma
常见嵌入模型：OpenAI text-embedding-ada-002、BGE、E5

RAG 的优势在于减少幻觉、提供可追溯的引用来源、降低 LLM 训练成本。`,
    tags: ['RAG', 'LLM', '向量检索', 'AI'],
    type: 'document',
    source: 'AI 技术研究院',
    summary: 'RAG 技术架构详解，涵盖文档切分、向量化、检索、上下文组装和答案生成的完整流程',
    createdAt: '2025-05-18T14:00:00Z',
    updatedAt: '2025-05-19T09:15:00Z',
  },
  {
    id: '3',
    title: 'TypeScript 高级类型体操指南',
    content: `TypeScript 类型系统是图灵完备的，可以实现复杂的类型计算。以下是常用的高级类型技巧：

1. 条件类型（Conditional Types）：
type IsString<T> = T extends string ? true : false

2. 映射类型（Mapped Types）：
type Readonly<T> = { readonly [P in keyof T]: T[P] }

3. 模板字面量类型：
type EventName = \`on\${Capitalize<string>}\`

4. 递归类型：
type DeepReadonly<T> = { readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P] }

5. infer 关键字：
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any

6. 协变与逆变：
- 协变：子类型关系与泛型参数方向一致
- 逆变：函数参数类型是逆变的

实践建议：优先使用内置工具类型，避免过度复杂的类型体操影响可读性。`,
    tags: ['TypeScript', '类型系统', '前端'],
    type: 'article',
    source: 'TypeScript 深度解析',
    summary: 'TypeScript 高级类型技巧汇总，包括条件类型、映射类型、模板字面量类型、递归类型等',
    createdAt: '2025-05-15T08:45:00Z',
    updatedAt: '2025-05-15T08:45:00Z',
  },
  {
    id: '4',
    title: 'RESTful API 设计规范 v2.0',
    content: `本规范定义了企业级 RESTful API 的设计标准。

URL 设计：
- 使用名词复数：/api/v1/users, /api/v1/articles
- 嵌套资源：/api/v1/users/{id}/articles
- 查询参数：?page=1&size=20&sort=createdAt:desc

HTTP 方法：
- GET: 获取资源（幂等）
- POST: 创建资源
- PUT: 全量更新资源（幂等）
- PATCH: 部分更新资源
- DELETE: 删除资源（幂等）

状态码：
- 200: 成功
- 201: 创建成功
- 204: 删除成功（无返回体）
- 400: 请求参数错误
- 401: 未认证
- 403: 无权限
- 404: 资源不存在
- 422: 数据验证失败
- 500: 服务器内部错误

响应格式：
{
  "code": 0,
  "message": "success",
  "data": { ... },
  "meta": { "page": 1, "size": 20, "total": 100 }
}

分页、过滤、排序均通过查询参数实现。`,
    tags: ['API', 'REST', '后端', '规范'],
    type: 'api-doc',
    source: '技术架构组',
    summary: '企业级 RESTful API 设计规范，涵盖 URL 设计、HTTP 方法、状态码和响应格式',
    createdAt: '2025-05-12T16:20:00Z',
    updatedAt: '2025-05-14T11:30:00Z',
  },
  {
    id: '5',
    title: 'Zustand 状态管理最佳实践',
    content: `Zustand 是一个轻量级 React 状态管理库，核心优势是极简 API 和优秀的 TypeScript 支持。

基础用法：
import { create } from 'zustand'
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))

中间件：
- persist: 持久化到 localStorage/sessionStorage
- immer: 不可变更新语法
- devtools: Redux DevTools 集成
- subscribeWithSelector: 精确订阅

性能优化：
1. 使用 selector 避免不必要的重渲染
2. 拆分 store 按领域组织
3. 使用 shallow 比较函数

与 Context 对比：
- 无 Provider 嵌套问题
- 细粒度订阅，不会触发整棵树重渲染
- 支持外部订阅（非 React 组件中使用）

与 Redux 对比：
- 无 boilerplate（action types、reducers、dispatch）
- 更小的 bundle size（~1KB vs ~7KB）
- 更灵活的 store 组织方式`,
    tags: ['Zustand', 'React', '状态管理'],
    type: 'article',
    source: '前端工程化实践',
    summary: 'Zustand 状态管理库的核心用法、中间件、性能优化和与其他方案的对比',
    createdAt: '2025-05-10T09:00:00Z',
    updatedAt: '2025-05-10T09:00:00Z',
  },
  {
    id: '6',
    title: '向量数据库选型与性能基准测试',
    content: `本文对主流向量数据库进行了选型分析和性能基准测试。

测试环境：
- 数据集：1000 万条 768 维向量
- 硬件：64 核 CPU / 128GB RAM / NVMe SSD

测试结果（QPS / 召回率）：
| 数据库 | QPS | 召回率@10 | 延迟P99 |
|--------|-----|-----------|---------|
| Milvus | 12,000 | 98.5% | 15ms |
| Qdrant | 10,500 | 97.8% | 18ms |
| Weaviate | 8,200 | 96.2% | 22ms |
| Chroma | 5,100 | 94.5% | 35ms |
| Pinecone | 15,000 | 99.1% | 8ms |

选型建议：
- 大规模生产：Milvus（开源、高性能、生态完善）
- 中小规模：Qdrant（Rust 实现、性能优秀、API 友好）
- 快速原型：Chroma（轻量、Python 原生、易上手）
- 全托管：Pinecone（零运维、最高性能、按量付费）

索引类型选择：
- HNSW：高召回率、低延迟、内存占用大
- IVF_PQ：内存占用小、召回率略低、适合超大规模
- Flat：精确搜索、仅适合小规模数据`,
    tags: ['向量数据库', '性能测试', 'AI基础设施'],
    type: 'document',
    source: '基础架构团队',
    summary: '主流向量数据库的选型分析和性能基准测试，包含 Milvus、Qdrant、Weaviate 等的对比',
    createdAt: '2025-05-08T13:45:00Z',
    updatedAt: '2025-05-09T10:20:00Z',
  },
  {
    id: '7',
    title: 'Prompt Engineering 实战手册',
    content: `Prompt Engineering 是与大语言模型高效交互的关键技能。

核心策略：
1. 明确指令：清晰描述任务目标、输出格式和约束条件
2. Few-shot 示例：提供 2-5 个输入输出示例引导模型
3. Chain-of-Thought：要求模型逐步推理，提升复杂任务准确率
4. 角色设定：为模型设定专业角色，提升回答质量

高级技巧：
- 自我一致性（Self-Consistency）：多次采样取多数结果
- 思维树（Tree of Thoughts）：探索多条推理路径
- ReAct 模式：推理+行动交替进行
- RAG 增强：注入外部知识减少幻觉

结构化 Prompt 模板：
[角色] 你是一个专业的 {领域} 专家
[任务] {具体任务描述}
[上下文] {相关背景信息}
[约束] {输出格式、长度、语气等要求}
[示例] {输入输出示例}

常见陷阱：
- 指令模糊导致输出不一致
- 上下文过长导致注意力衰减
- 忽略安全边界导致有害输出`,
    tags: ['Prompt', 'LLM', 'AI应用'],
    type: 'snippet',
    source: 'AI 产品团队',
    summary: 'Prompt Engineering 核心策略和高级技巧，包含结构化模板和常见陷阱',
    createdAt: '2025-05-05T11:00:00Z',
    updatedAt: '2025-05-06T15:30:00Z',
  },
  {
    id: '8',
    title: '微前端架构设计指南',
    content: `微前端是一种将单体前端应用拆分为多个独立子应用的架构模式。

核心原则：
1. 技术栈无关：子应用可独立选择技术栈
2. 独立开发部署：各子应用独立仓库、独立 CI/CD
3. 运行时隔离：CSS 沙箱、JS 沙箱、DOM 隔离
4. 共享依赖：公共库抽取，减少重复加载

主流方案对比：
| 方案 | 原理 | 优势 | 劣势 |
|------|------|------|------|
| qiankun | HTML Entry + JS 沙箱 | 生态成熟、接入简单 | 基于 single-spa、有性能损耗 |
| Module Federation | Webpack 5 模块共享 | 原生支持、性能好 | 强依赖 Webpack |
| wujie | WebComponent + iframe | 完美隔离 | iframe 通信成本 |
| single-spa | 路由分发 | 灵活度高 | 配置复杂 |

通信机制：
- CustomEvent：事件总线
- Shared State：共享状态（如 zustand）
- URL 参数：路由传参
- postMessage：跨 iframe 通信

适用场景：大型团队协作、遗留系统渐进式迁移、多团队独立交付。`,
    tags: ['微前端', '架构', '前端工程化'],
    type: 'document',
    source: '架构设计委员会',
    summary: '微前端架构设计原则、方案对比和通信机制，适用于大型团队协作场景',
    createdAt: '2025-05-03T14:30:00Z',
    updatedAt: '2025-05-04T09:00:00Z',
  },
];
