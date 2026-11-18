// Path: packages/sdk/src/index.ts

import { SpatialCase, BOMItem, A2AMessage } from '@aetherspace/core-types';

export interface AetherSDKConfig {
  baseUrl: string;
  apiKey?: string;
}

export class AetherSpaceSDK {
  private baseUrl: string;
  private apiKey?: string;

  constructor(config: AetherSDKConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, ''); // 去除尾部斜杠
    this.apiKey = config.apiKey;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(this.apiKey ? { 'Authorization': `Bearer ${this.apiKey}` } : {}),
      ...(options.headers || {}),
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    const json = await response.json();
    if (!json.success) {
      throw new Error(json.error || 'AetherSpace SDK Request Failed');
    }
    return json.data;
  }

  // 1. 获取空间案例列表
  public async getSpatialCases(): Promise<SpatialCase[]> {
    return this.request('/api/spatial/cases');
  }

  // 2. 调用 MCP 工具（如气候防潮校验）
  public async callMCPTool(toolName: string, args: Record<string, any>): Promise<any> {
    return this.request('/mcp/call-tool', {
      method: 'POST',
      body: JSON.stringify({ toolName, arguments: args }),
    });
  }

  // 3. 触发 A2A 多智能体超预算自动协商
  public async triggerA2ANegotiation(currentCost: number, maxBudget: number): Promise<A2AMessage> {
    return this.request('/api/a2a/negotiate', {
      method: 'POST',
      body: JSON.stringify({ currentCost, maxBudget }),
    });
  }
}
