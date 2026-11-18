-- Path: schema.sql
-- Cloudflare D1 Database Schema for AetherSpace-Core

-- 空间案例表 (存储 ArchDaily / gooood 结构化数据)
CREATE TABLE IF NOT EXISTS spatial_cases (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  subtype TEXT NOT NULL,
  style TEXT NOT NULL,
  area_sqm REAL NOT NULL,
  country TEXT NOT NULL,
  image_url TEXT NOT NULL,
  unit_cost_idr INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 材料与 SKU 表 (存储 53+ 印尼本地及全球材料与工艺特征)
CREATE TABLE IF NOT EXISTS material_skus (
  sku_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  grade TEXT NOT NULL,
  price_idr INTEGER NOT NULL,
  waste_factor REAL NOT NULL,
  climate_fit TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 项目报价与 BOM 记录表
CREATE TABLE IF NOT EXISTS project_quotes (
  quote_id TEXT PRIMARY KEY,
  project_name TEXT NOT NULL,
  total_cost_idr INTEGER NOT NULL,
  bom_payload TEXT NOT NULL, -- JSON 格式存储详细 BOM 清单
  status TEXT DEFAULT 'draft',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
