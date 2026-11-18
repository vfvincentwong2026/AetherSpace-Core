// Path: packages/core-types/src/index.ts

// 空间类型定义
export type SpaceCategory = 'commercial' | 'residential' | 'public';
export type SpaceSubtype = 'villa' | 'hotel' | 'clubhouse' | 'retail' | 'museum' | 'office';

export interface SpatialCase {
  id: string;
  title: string;
  category: SpaceCategory;
  subtype: SpaceSubtype;
  style: string;
  areaSqm: number;
  country: string;
  imageUrl: string;
  unitCostIdr: number;
}

// 材料与 SKU 定义（支持 Nusantara Atelier 等业务复用）
export interface MaterialSKU {
  skuId: string;
  name: string;
  category: string;
  grade: 'Standard' | 'Premium' | 'Luxury';
  priceIdr: number;
  wasteFactor: number;
  climateFit: 'tropical_high_humidity' | 'universal';
}

// A2A 智能体角色与通信消息协议
export type AgentRole = 'lead_architect' | 'aesthetic_stylist' | 'material_expert' | 'cost_controller';

export interface A2AMessage {
  messageId: string;
  sender: AgentRole;
  receiver: AgentRole | 'broadcast';
  intent: 'propose_design' | 'check_constraint' | 'negotiate_budget' | 'finalize';
  payload: Record<string, any>;
  timestamp: number;
}

// BOM 精报与算量契约
export interface BOMItem {
  skuId: string;
  itemName: string;
  quantity: number;
  unit: string;
  unitPriceIdr: number;
  totalPriceIdr: number;
}
