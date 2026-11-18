# AetherSpace-Core Architecture & Design

本文档详细阐述 **AetherSpace-Core**（AI-Native 空间智造底层引擎与多智能体协作中台）的整体架构、分层设计、核心协议及数据流向。

---

## 1. 核心设计原则 (Design Principles)
* **AI-Native & Protocol-Driven**：所有空间检索、材料校验与算量逻辑通过 **MCP (Model Context Protocol)** 标准化；多智能体协作通过 **A2A (Agent-to-Agent)** 状态机驱动。
* **Edge-First Architecture**：深度依托 **Cloudflare 全栈生态（Pages + Workers + R2 + D1 + Vectorize）**，实现全球毫秒级低延迟响应与零出口流量费。
* **Headless & Reusable**：核心逻辑高度解耦，既可驱动独立 SaaS 展厅（Playground），又可通过标准 SDK 无缝赋能垂直业务（如 *Nusantara Atelier*）。

---

## 2. 系统分层架构 (Layered Architecture)

```
+--------------------------------------------------------------------------+
|                  1. 前端表现与交互层 (Presentation Layer)                 |
|       apps/playground (Next.js 14 Static Export + Three.js / R3F)       |
+--------------------------------------------------------------------------+
                                     │ (SDK / REST / MCP Protocol)
                                     ▼
+--------------------------------------------------------------------------+
|                  2. 协议、网关与调度层 (Gateway & Swarm Layer)          |
|    workers/api-worker/ (Cloudflare Workers API + MCP & A2A Swarm Broker) |
+--------------------------------------------------------------------------+
                   │                   │                   │
                   ▼                   ▼                   ▼
+-------------------------+ +---------------------+ +--------------------+
| 3. 数据与资产持久化层      | | 4. 分布式对象存储     | | 5. 向量语义检索层   |
| Cloudflare D1 (SQL)     | | Cloudflare R2       | | Cloudflare Vectorize|
| (Cases, SKUs, Quotes)   | | (.jpg/webp, .splat) | | (Semantic RAG DB)  |
+-------------------------+ +---------------------+ +--------------------+
```

---

## 3. 核心模块与职责 (Core Modules)

### 3.1 `packages/core-types` (公共数据契约)
定义了贯穿整个引擎的强类型接口，包括多维空间分类、全球及印尼本地材料 SKU、BOM 物料清单以及 A2A 消息通信协议。

### 3.2 `packages/a2a-swarm` (A2A 多智能体蜂群网络)
实现事件驱动的分布式消息总线 (`A2ASwarmBroker`)。核心 Agent 协同链路：
1. **Lead Architect Agent**：生成空间概念与布局。
2. **Aesthetic Stylist Agent**：制定情绪板（Moodboard）与材质意向。
3. **Material Expert Agent**：结合区域气候（如热带高湿）校验新材料与工艺。
4. **Cost Controller Agent**：实时监控方案预算，当超支时触发 A2A 自动协商，驱动材料 Agent 寻找平替 SKU。

### 3.3 `packages/spatial-engine` (Three.js 实时渲染引擎)
基于 **React Three Fiber (R3F)** 构建的前端三维渲染视口组件，支持空间白模参数化搭配、材质实时替换，并兼容 3D Gaussian Splatting (3DGS) 高精漫游。

### 3.4 `packages/spatial-mcp` (MCP 服务化网关)
将空间案例库、材料属性和造价公式封装为标准的 MCP 资源与工具，允许任何大模型客户端（如 Claude Desktop 或 Cursor）安全调用。

---

## 4. 关键业务数据流 (Data Flow)

以“**用户在 Playground 选择风格并实时联动 BOM 算量**”为例：
1. **前端触发**：用户在 `SpatialViewport` 中将墙面材质由“天然大理石”替换为“新型微水泥”。
2. **状态同步**：前端通过 `packages/sdk` 向 Cloudflare Workers 发起参数更新请求。
3. **A2A 校验**：Cost Controller Agent 介入，调用 BOM 算量逻辑比对当前预算。
4. **即时响应**：Workers 从 D1 数据库拉取对应 SKU 价格与工时定额，边缘网关在 50ms 内返回更新后的 BOM 清单与 3D 材质渲染指令。
