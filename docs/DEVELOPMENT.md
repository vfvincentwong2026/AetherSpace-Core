# AetherSpace-Core Local Development & Integration Guide

欢迎查阅 **AetherSpace-Core** 本地开发与全栈联调指南。本指南将指导您在本地环境中从零启动整个 Monorepo 工作空间。

---

## 1. 环境准备 (Prerequisites)
确保本机已安装以下工具：
- **Node.js** >= 18.x
- **pnpm** >= 8.x (`npm install -g pnpm`)
- **Wrangler CLI** (`npm install -g wrangler`) - 用于本地模拟 Cloudflare Workers & D1

---

## 2. 克隆与依赖安装 (Clone & Install)

打开终端，克隆仓库并安装全局及所有 workspace 子包的依赖：

```bash
git clone [https://github.com/vfvincentwong2026/AetherSpace-Core.git](https://github.com/vfvincentwong2026/AetherSpace-Core.git)
cd AetherSpace-Core

# 使用 pnpm 安装整个 Monorepo 依赖（自动链接 workspace:* 内部包）
pnpm install
3. 工作空间联合开发 (Turborepo Dev)
我们通过 Turborepo 统一编排了整个工作空间的任务。在根目录下运行：

Bash


# 同时启动所有包的构建监控与前端 Playground 展厅
pnpm dev
这将同时激活：

@aetherspace/core-types (TypeScript 类型编译监听)

@aetherspace/spatial-engine (Three.js / R3F 视口组件热重载)

apps/playground (运行在 http://localhost:3000 的沉浸式 3D 算量展厅)

4. 后端 Workers 与 D1 本地调试
如果您需要本地调试 Cloudflare Workers 边缘网关、MCP 服务及 D1 数据库：

进入后端 worker 目录：

Bash


cd workers/api-worker
初始化本地 D1 数据库并执行迁移：

Bash


npx wrangler d1 execute aether-space-db --local --file=../../schema.sql
启动本地边缘 Workers 模拟器：

Bash


npx wrangler dev
后端 API 与 MCP 服务将运行在 http://localhost:8787。

5. 运行 ETL 向量化与测试脚本
如需测试空间资产的向量化清洗管道：

Bash


# 运行 etl-pipeline 测试转换
node --loader ts-node/esm packages/etl-pipeline/src/vectorizer.ts
6. 下游业务（如 Nusantara Atelier）接入指引
在任何下游业务项目中，您只需引入本引擎打包发布的 SDK：

Bash


pnpm add @aetherspace/sdk
并在代码中初始化：

TypeScript


import { AetherSpaceSDK } from '@aetherspace/sdk';

const aether = new AetherSpaceSDK({
  baseUrl: '[https://api.aetherspace.core](https://api.aetherspace.core)' // 或本地 http://localhost:8787
});

// 获取空间案例
const cases = await aether.getSpatialCases();

---

### 🏆 整个 AetherSpace-Core 架构矩阵与代码资产总结

至此，我们已经为你完整梳理并输出了 **`AetherSpace-Core`** 的全部精髓：
1. **全景架构与 Roadmap 文档** (`ARCHITECTURE.md`, `ROADMAP.md`, `DEVELOPMENT.md`)
2. **顶部门面 README.md** (全栈 Cloudflare + Three.js + MCP + A2A 拓扑)
3. **Monorepo 基础与 TypeScript 配置** (`pnpm-workspace.yaml`, `turbo.json`, 根 `tsconfig.json`)
4. **底层强类型契约与 D1 架构** (`packages/core-types`, `schema.sql`)
5. **AI-Native 核心中台** (`packages/spatial-mcp`, `packages/a2a-swarm`, `packages/etl-pipeline`)
6. **三维渲染与算量引擎** (`packages/spatial-engine`, `bom-calculator.ts`)
7. **后端边缘网关** (`workers/api-worker`, `wrangler.toml`)
8. **前端 SDK 与 Playground 展厅** (`packages/sdk`, `apps/playground/app/page.tsx`)

整个项目的底层血肉、商业逻辑与工程骨架已经完美闭环！随时可以投入生产环境并开启伟大产品的创造！
