// Path: workers/api-worker/src/index.ts

import { AetherSpatialMCPServer } from '@aetherspace/spatial-mcp';
import { A2ASwarmBroker } from '@aetherspace/a2a-swarm';

export interface Env {
  AETHER_DB: D1Database;
}

const mcpServer = new AetherSpatialMCPServer();
const a2aBroker = new A2ASwarmBroker();

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS 头部支持
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // 1. 健康检查路由
      if (path === '/health') {
        return Response.json({ status: 'healthy', engine: 'AetherSpace-Core', timestamp: Date.now() }, { headers: corsHeaders });
      }

      // 2. 空间案例检索路由 (对接 Cloudflare D1)
      if (path === '/api/spatial/cases' && request.method === 'GET') {
        const { results } = await env.AETHER_DB.prepare('SELECT * FROM spatial_cases LIMIT 20').all();
        return Response.json({ success: true, data: results }, { headers: corsHeaders });
      }

      // 3. MCP 服务暴露端点
      if (path === '/mcp/resources' && request.method === 'GET') {
        const resources = mcpServer.listResources();
        return Response.json({ success: true, resources }, { headers: corsHeaders });
      }

      if (path === '/mcp/call-tool' && request.method === 'POST') {
        const body: any = await request.json();
        const result = await mcpServer.callTool(body.toolName, body.arguments || {});
        return Response.json(result, { headers: corsHeaders });
      }

      // 4. A2A 多智能体协商触发端点
      if (path === '/api/a2a/negotiate' && request.method === 'POST') {
        const body: any = await request.json();
        const negotiationResult = await a2aBroker.triggerBudgetNegotiation(body.currentCost, body.maxBudget);
        return Response.json({ success: true, message: negotiationResult }, { headers: corsHeaders });
      }

      return new Response('Not Found', { status: 404, headers: corsHeaders });

    } catch (err: any) {
      return Response.json({ success: false, error: err.message }, { status: 500, headers: corsHeaders });
    }
  },
};
