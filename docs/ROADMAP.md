# AetherSpace-Core Implementation Roadmap

本文档规划了 **AetherSpace-Core** 从零到一的演进路线与各阶段技术里程碑。

---

## 🗺️ 研发阶段总览 (Phases Overview)

| 阶段 | 目标代号 | 核心交付内容 | 预计周期 | 状态 |
| :--- | :--- | :--- | :--- | :--- |
| **Phase 1** | **Foundation & Taxonomy** | Monorepo 脚手架搭建、`core-types` 定义、ArchDaily/gooood 结构化 ETL 管道、D1 数据库与 R2 存储配置。 | 2026 Q1 | 🚧 进行中 |
| **Phase 2** | **MCP & A2A Swarm** | `spatial-mcp` 服务端实现、A2A 消息总线 (`broker.ts`)、四大 Agent 状态机与超预算自动协商逻辑。 | 2026 Q2 | 📋 规划中 |
| **Phase 3** | **Spatial Rendering Engine** | Three.js / R3F 空间视口组件 (`viewport.tsx`)、白模参数化搭配、材质实时替换与 BOM 算量引擎联动。 | 2026 Q3 | 📋 规划中 |
| **Phase 4** | **Ecosystem & Downstream** | 封装独立 SDK (`packages/sdk`)、发布 Playground 展厅至 Cloudflare Pages、与垂直业务 (*Nusantara Atelier*) 成功对接。 | 2026 Q4 | 📋 规划中 |

---

## 🛠️ 各阶段详细技术路径 (Detailed Technical Milestones)

### Phase 1: 基础设施与数据底座 (Current)
* [x] 初始化 Monorepo (pnpm workspaces + Turborepo)。
* [x] 编写根目录 `README.md`、`ARCHITECTURE.md` 与 `ROADMAP.md`。
* [ ] 实现 `packages/core-types` 基础类型契约。
* [ ] 编写 Cloudflare D1 数据库表结构 (`schema.sql`) 及初始化种子数据 (`data/seed/`)。

### Phase 2: 协议化与多智能体中台
* [ ] 在 `workers/api-worker` 中集成 MCP 协议适配层，暴露出标准 `spatial_cases` 与 `materials` 资源。
* [ ] 实现 `packages/a2a-swarm` 的发布-订阅事件总线。
* [ ] 编写四大 Agent 的提示词模板与推理逻辑（依托 Workers AI / Llama 3.3）。

### Phase 3: 三维渲染与算量闭环
* [ ] 完善 `packages/spatial-engine`，支持动态加载不同空间白模。
* [ ] 跑通“材质替换 -> 触发 BOM 算量 -> 实时返回总造价”的前后端完整链路。
* [ ] 引入 3DGS (.splat) 资产加载支持，实现轻量化沉浸式漫游。

### Phase 4: 开发者 SDK 与业务赋能
* [ ] 封装 `packages/sdk`，提供开箱即用的 NPM 模块。
* [ ] 部署 `apps/playground` 到 Cloudflare Pages。
* [ ] 在 *Nusantara Atelier* 项目中引入该 SDK，完成从独立引擎到垂直落地业务的无缝插拔。
