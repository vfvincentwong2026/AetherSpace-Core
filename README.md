# AetherSpace-Core

**AI-Native 空间智造底层引擎与多智能体协作中台**  
**AI-Native Spatial Intelligence Core & Multi-Agent Swarm Engine for Architecture, Interior Design & Automated Construction**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![MCP](https://img.shields.io/badge/Protocol-MCP%20%2F%20Model%20Context-purple?style=flat-square)](https://modelcontextprotocol.io/)
[![A2A](https://img.shields.io/badge/Architecture-A2A%20Multi--Agent-green?style=flat-square)](https://github.com/vfvincentwong2026)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

🌐 **核心定位**：一个集成了多源空间资产、新材料知识图谱、**MCP（Model Context Protocol）**服务化标准与 **A2A（Agent-to-Agent）**多智能体蜂群网络的头部空间设计与算量引擎。既可作为独立 SaaS 与开发者工具运行，亦可作为垂直业务（如高端别墅全案服务平台 *Nusantara Atelier*）的深度赋能大脑。

---

## 🏗️ 架构概览 · Architecture

```text
+-----------------------------------------------------------------------+
|                    A2A 多智能体协作网络 (Multi-Agent Swarm)             |
|  [主理建筑师 Agent] <---> [美学与风格 Agent] <---> [材料与工艺 Agent] <---> [造价与BOM Agent] |
+-----------------------------------------------------------------------+
                                  ▲
                                  │ (标准 A2A 协商与状态同步协议)
+-----------------------------------------------------------------------+
|                     MCP 标准服务协议层 (Model Context Protocol)         |
|  [Spatial-MCP Server]  [Material-MCP Server]  [KG-Rule-MCP Server]    |
+-----------------------------------------------------------------------+
                                  ▲
                                  │ (标准化 Tools & Resources)
+-----------------------------------------------------------------------+
|                     底层结构化知识与向量库 (Data & Assets)              |
|  ArchDaily/gooood 案例库 | 53+ 本地SKU | 空间白模与参数化渲染引擎          |
+-----------------------------------------------------------------------+
```

---

## ✨ 核心模块 · Core Modules

1. **多维专业分类矩阵（Taxonomy & Metadata）**
   - **空间体系**：商业空间（酒店、会所、零售）、住宅空间（独栋别墅、集合住宅）、公共空间（博物馆、学校、文旅驿站）。
   - **设计资产**：强绑定的实景照片、CAD/DXF 平面与剖面图、节点大样、真实品牌 SKU 与单方造价。
2. **MCP 服务化适配器（Model Context Protocol）**
   - 将空间检索、材料物理特性校验、工艺规则与造价公式封装为标准 MCP 协议，允许任何兼容 MCP 的客户端/大模型安全调用。
3. **A2A 多智能体蜂群网络（Agent-to-Agent Swarm）**
   - **Lead Architect Agent**：主导空间概念与布局方案。
   - **Aesthetic & Style Agent**：负责美学意向、情绪板（Moodboard）及风格搭配。
   - **Material & Craft Agent**：结合区域气候特征（如热带高湿）校验新材料与工艺可行性。
   - **Cost & BOM Agent**：监控方案变动并进行超预算自动协商与精准算量。
4. **所见即所得的 BOM 联动引擎（Rendering & BOM Engine）**
   - 参数化空间模板匹配、材质实时替换，渲染瞬间自动输出工程物料与造价清单。

---

## 📁 目录结构 · Project Structure

```text
AetherSpace-Core/
├── .github/
│   └── workflows/          # CI/CD 自动化流水线
├── packages/
│   ├── core-types/         # 公共 TypeScript 类型定义（空间、SKU、BOM、A2A协议）
│   ├── spatial-mcp/        # MCP Server 核心实现（空间案例与材料资产暴露）
│   ├── a2a-swarm/          # A2A 多智能体通信、状态机与协商工作流
│   └── spatial-engine/     # 参数化空间搭配、材质替换与 BOM 算量联动逻辑
├── apps/
│   ├── playground/         # 独立调试与测试前端（Next.js 14）
│   └── mcp-host/           # MCP 客户端宿主与联调面板
├── data/
│   ├── taxonomy/           # 标准空间与风格分类树
│   └── seed/               # 初始化测试样本数据
├── package.json            # pnpm workspace 根配置
├── turbo.json              # Turborepo 任务编排
└── README.md
```

---

## 🚀 快速开始 · Getting Started

### 1. 环境准备
确保本机已安装：
- **Node.js** >= 18.x
- **pnpm** >= 8.x

### 2. 克隆与安装依赖
```bash
git clone https://github.com/vfvincentwong2026/AetherSpace-Core.git
cd AetherSpace-Core
pnpm install
```

### 3. 本地开发调试
```bash
# 启动所有 workspace 包的监听与 Playground 前端
pnpm dev
```

---

## 🤝 贡献与开源协议 · Contributing & License

- 欢迎提交 Pull Request 或开启 Issue 共同完善此空间智造引擎！
- **MIT License** © 2026 AetherSpace-Core Contributors.
