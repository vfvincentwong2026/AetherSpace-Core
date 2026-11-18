# AetherSpace-Core

**AI-Native 空间智造底层引擎与多智能体协作中台**  
**AI-Native Spatial Intelligence Core & Multi-Agent Swarm Engine for Architecture, Interior Design & Automated Construction**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Rendering-Three.js%20%2F%20R3F-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![MCP](https://img.shields.io/badge/Protocol-MCP%20%2F%20Model%20Context-purple?style=flat-square)](https://modelcontextprotocol.io/)
[![A2A](https://img.shields.io/badge/Architecture-A2A%20Multi--Agent-green?style=flat-square)](https://github.com/vfvincentwong2026)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-Pages%20%2B%20Workers%20%2B%20R2-orange?style=flat-square&logo=cloudflare)](https://workers.cloudflare.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

🌐 **核心定位**：一个集成了多源空间资产、新材料知识图谱、**Three.js / R3F 空间实时渲染引擎**、**MCP（Model Context Protocol）**服务化标准与 **A2A（Agent-to-Agent）多智能体蜂群协作网络**的头部空间设计与算量引擎。采用 **Cloudflare 全栈架构（Pages + Workers + R2 + Vectorize）**，既可作为独立 SaaS 与开发者工具运行，亦可作为垂直业务（如高端别墅全案服务平台 *Nusantara Atelier*）的深度赋能大脑。

---

## 🏗️ 架构与全栈拓扑 · Architecture & Cloudflare Topology

```
+--------------------------------------------------------------------------+
|                     Cloudflare Pages (Frontend / Playground)             |
|          apps/playground (Next.js 14 + Three.js / R3F Web Viewport)     |
+--------------------------------------------------------------------------+
                                     │ (SDK / API Requests / MCP Protocol)
                                     ▼
+--------------------------------------------------------------------------+
|                     Cloudflare Workers (Backend API & MCP & A2A Broker)  |
|       workers/api-worker/ (Spatial API, Materials, A2A Swarm Broker)     |
+--------------------------------------------------------------------------+
                   │                   │                   │
                   ▼                   ▼                   ▼
+-------------------------+ +---------------------+ +--------------------+
| Cloudflare D1 Database  | | Cloudflare R2 Store | | Vectorize Vector   |
| (Cases, SKUs, Quotes)   | | (.jpg/webp, .splat) | | (Semantic RAG DB)  |
+-------------------------+ +---------------------+ +--------------------+
```

---

## ✨ 核心模块 · Core Modules

1. **多维专业分类矩阵（Taxonomy & Metadata）**
   - **空间体系**：商业空间（酒店、会所、零售）、住宅空间（独栋别墅、集合住宅）、公共空间（博物馆、学校、文旅驿站）。
   - **设计资产**：强绑定的实景照片、CAD/DXF 平面与剖面图、节点大样、真实品牌 SKU 与单方造价。
2. **A2A 多智能体蜂群网络（Agent-to-Agent Swarm）**
   - **Lead Architect Agent**：主导空间概念、布局规划与设计意图。
   - **Aesthetic & Style Agent**：负责美学意向、情绪板（Moodboard）及风格搭配。
   - **Material & Craft Agent**：结合区域气候特征（如热带高湿）校验新材料与工艺可行性。
   - **Cost & BOM Agent**：监控方案变动，触发 A2A 自动协商（如超预算时自动调整材料）并进行精准算量。
3. **Three.js 空间与材质实时渲染引擎（Spatial Engine）**
   - 基于 **Three.js / React Three Fiber (R3F)** 构建的前端三维渲染视口。
   - 支持白模空间参数化搭配、材质实时替换，并完美兼容 **3D Gaussian Splatting (3DGS)** 高精空间漫游。
4. **MCP 服务化适配器（Model Context Protocol）**
   - 将空间检索、材料物理特性校验、工艺规则与造价公式封装为标准 MCP 协议，允许任何兼容 MCP 的客户端/大模型安全调用。
5. **所见即所得的 BOM 联动计算**
   - 材质替换瞬间同步触发底层算量引擎，实时输出工程物料与造价清单。

---

## 📁 目录结构与路径规划 · Project Structure

```
AetherSpace-Core/
├── .github/
│   └── workflows/              # CI/CD 自动化流水线
├── apps/
│   └── playground/             # 前端 SaaS 展厅与调试台 (-> Cloudflare Pages)
│       ├── app/                # 路由: /explore (检索) / studio (3D空间搭配视口)
│       └── components/         # 空间卡片、Three.js Canvas 视口、BOM 侧边栏
├── workers/
│   └── api-worker/             # 后端 API、MCP 与 A2A 调度网关 (-> Cloudflare Workers)
│       ├── src/
│       │   ├── index.js        # 路由分发 (/health, /spatial, /materials, /mcp)
│       │   ├── mcp/            # MCP Server 协议实现
│       │   └── agents/         # A2A 多智能体状态机与消息 Broker
│       └── wrangler.toml       # Cloudflare Workers 配置文件
├── packages/
│   ├── core-types/             # 公共 TypeScript 类型定义 (空间、SKU、A2A 消息协议)
│   ├── sdk/                    # 供外部业务系统（如 Nusantara Atelier）调用的标准 SDK
│   ├── a2a-swarm/              # A2A 多智能体通信协议与协商算法
│   ├── spatial-engine/         # Three.js / R3F 渲染组件、材质映射与参数化逻辑
│   └── spatial-mcp/            # MCP 协议核心定义与资源暴露
├── data/
│   ├── taxonomy/               # 标准空间与风格分类树
│   └── seed/                   # 初始化样本数据 (ArchDaily/gooood 抓取转结构化)
├── schema.sql                  # Cloudflare D1 数据库表结构
├── pnpm-workspace.yaml         # pnpm workspace 根配置
├── turbo.json                  # Turborepo 任务编排
└── README.md
```

---

## 🚀 快速开始与 Cloudflare 部署指南 · Getting Started & Deployment

### 1. 环境准备
确保本机已安装：
- **Node.js** >= 18.x
- **pnpm** >= 8.x
- **Wrangler CLI** (`npm install -g wrangler`)

### 2. 克隆与安装依赖
```bash
git clone [https://github.com/vfvincentwong2026/AetherSpace-Core.git](https://github.com/vfvincentwong2026/AetherSpace-Core.git)
cd AetherSpace-Core
pnpm install
```

### 3. 本地开发调试
```bash
# 启动所有 workspace 包的监听与前端 Playground (含 Three.js 视口与 A2A 调试面板)
pnpm dev
```

### 4. 部署到 Cloudflare 生态

* **部署前端（Cloudflare Pages）**：
  ```bash
  pnpm build --filter=playground
  # 将输出目录 apps/playground/out 部署至 Cloudflare Pages
  ```

* **部署后端、MCP 与 A2A 网关（Cloudflare Workers & D1）**：
  ```bash
  cd workers/api-worker
  npx wrangler d1 create aether-space-db          # 创建 D1 数据库 (如首次部署)
  npx wrangler d1 execute aether-space-db --remote --file=../../schema.sql
  npx wrangler deploy                            # 部署 Workers 边缘网关
  ```

---

## 🤝 贡献与开源协议 · Contributing & License

- 欢迎提交 Pull Request 或开启 Issue 共同完善此空间智造引擎！
- **MIT License** © 2026 AetherSpace-Core Contributors.
