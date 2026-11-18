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
