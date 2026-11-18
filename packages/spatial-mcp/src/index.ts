// Path: packages/spatial-mcp/src/index.ts

import { SpatialCase, MaterialSKU } from '@aetherspace/core-types';

export interface MCPResource {
  uri: string;
  name: string;
  mimeType: string;
  description: string;
}

export interface MCPToolCallResult {
  success: boolean;
  data: any;
  error?: string;
}

export class AetherSpatialMCPServer {
  private serverName = 'aetherspace-spatial-mcp';
  private version = '1.0.0';

  // 1. 暴露标准 MCP Resources (如空间案例库、印尼本地材料库)
  public listResources(): MCPResource[] {
    return [
      {
        uri: 'aether://spatial/cases',
        name: 'Global & Tropical Spatial Cases',
        mimeType: 'application/json',
        description: 'ArchDaily & gooood structured architecture cases with spatial taxonomy.'
      },
      {
        uri: 'aether://materials/indonesia-skus',
        name: 'Indonesian Local Material SKUs',
        mimeType: 'application/json',
        description: '53+ verified local material SKUs optimized for tropical high-humidity climates.'
      }
    ];
  }

  // 2. 提供标准 MCP Tools (供 AI 调用的具体动作)
  public async callTool(toolName: string, args: Record<string, any>): Promise<MCPToolCallResult> {
    try {
      switch (toolName) {
        case 'search_spatial_cases':
          return {
            success: true,
            data: this.mockSearchCases(args.style, args.category)
          };
        case 'check_material_climate_fit':
          return {
            success: true,
            data: this.mockCheckClimateFit(args.skuId)
          };
        default:
          return { success: false, data: null, error: `Unknown MCP tool: ${toolName}` };
      }
    } catch (err: any) {
      return { success: false, data: null, error: err.message };
    }
  }

  private mockSearchCases(style?: string, category?: string): SpatialCase[] {
    // 模拟从 D1 / 向量库检索结构化空间案例
    return [
      {
        id: 'case-001',
        title: 'PIK 2 Tropical Modern Luxury Villa',
        category: 'residential',
        subtype: 'villa',
        style: 'Tropical Modern',
        areaSqm: 250,
        country: 'Indonesia',
        imageUrl: 'https://r2.aetherspace.core/cases/pik2-villa.webp',
        unitCostIdr: 7500000
      }
    ];
  }

  private mockCheckClimateFit(skuId: string) {
    return {
      skuId,
      climateFit: 'tropical_high_humidity',
      warning: 'Passed anti-humidity and anti-termite verification for Southeast Asia.'
    };
  }
}
