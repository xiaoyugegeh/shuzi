# 知识资产问答工作台

Knowledge Asset Q&A Workbench — 企业级 AI Agent 与数字资产知识库平台

## 项目简介

知识资产问答工作台是一个基于 RAG（检索增强生成）架构的智能问答系统。用户可以管理知识资产（文档、文章、代码片段、API 文档等），通过 AI Agent 基于知识库检索结果进行智能问答，并查看完整的检索过程追踪（Agent Trace）。

### 核心功能

1. **知识资产列表** — 展示所有知识资产卡片，包含标题、摘要、标签、类型、时间戳
2. **新增知识资产** — 通过弹窗表单新增资产，支持标题、内容、标签、类型、来源等字段
3. **知识资产检索** — 支持关键词搜索、标签筛选、类型筛选，实时过滤
4. **Agent 智能问答** — 用户向 Agent 提问，Agent 自动执行 RAG 检索链路
5. **回答与引用来源** — 展示 Agent 回答内容，附带可折叠的引用来源面板
6. **Agent Trace** — 展示检索过程步骤时间线：问题解析 → 知识检索 → 结果排序 → 答案生成

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18 | 前端框架 |
| TypeScript | 5.8 | 类型安全 |
| Vite | 6 | 构建工具 |
| Tailwind CSS | 3 | 样式系统 |
| Zustand | 5 | 状态管理 |
| React Router DOM | 7 | 路由管理 |
| Lucide React | — | 图标库 |

## 项目结构

```
src/
├── components/
│   ├── layout/           # 布局组件
│   │   └── Header.tsx
│   ├── knowledge/        # 知识资产组件
│   │   ├── AssetCard.tsx
│   │   ├── AssetList.tsx
│   │   ├── AssetForm.tsx
│   │   └── SearchBar.tsx
│   ├── chat/             # Agent 问答组件
│   │   ├── ChatPanel.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── ChatInput.tsx
│   │   ├── CitationList.tsx
│   │   └── AgentTrace.tsx
│   └── ui/               # 通用 UI 组件
│       ├── Dialog.tsx
│       ├── Badge.tsx
│       └── Button.tsx
├── store/                # Zustand 状态管理
│   ├── knowledgeStore.ts
│   └── chatStore.ts
├── types/                # TypeScript 类型定义
│   └── index.ts
├── data/                 # Mock 数据
│   └── mockAssets.ts
├── pages/
│   └── Workbench.tsx     # 主工作台页面
├── App.tsx
├── main.tsx
└── index.css
```

## 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装与运行

```bash
# 克隆仓库
git clone <repository-url>
cd knowledge-qa-workbench

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

### 可用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（热更新） |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产版本 |
| `npm run check` | TypeScript 类型检查 |
| `npm run lint` | ESLint 代码检查 |

## 设计说明

### 视觉风格

- **主题**：深色主题（Zinc 色系），营造专业、克制的视觉氛围
- **强调色**：琥珀金（Amber），用于关键交互元素和状态高亮
- **布局**：左右分栏，左侧知识资产面板（可折叠），右侧 Agent 问答区
- **动效**：卡片 hover 上浮、Agent 回答打字机效果、Agent Trace 逐步展开

### RAG 检索模拟

由于本项目不依赖外部 AI 服务，Agent 问答采用模拟 RAG 流程：

1. **问题解析** — 提取关键词，过滤停用词
2. **知识检索** — 基于关键词在知识资产中进行多维度匹配（标题权重3、标签权重2、摘要权重2、内容权重1）
3. **结果排序** — 按相关度评分降序排列
4. **答案生成** — 基于检索结果拼接回答，附带引用来源

## License

MIT
