// Path: packages/a2a-swarm/src/broker.ts

import { A2AMessage, AgentRole } from '@aetherspace/core-types';

export class A2ASwarmBroker {
  private listeners: Map<AgentRole | 'broadcast', Array<(msg: A2AMessage) => void>> = new Map();

  // 注册 Agent 监听
  public subscribe(role: AgentRole | 'broadcast', callback: (msg: A2AMessage) => void) {
    if (!this.listeners.has(role)) {
      this.listeners.set(role, []);
    }
    this.listeners.get(role)!.push(callback);
  }

  // 广播或点对点发送 A2A 消息
  public async dispatch(message: A2AMessage): Promise<void> {
    console.log(`[A2A Broker] Message from [${message.sender}] to [${message.receiver}]: intent -> ${message.intent}`);
    
    // 投递给指定接收者
    const targetListeners = this.listeners.get(message.receiver) || [];
    for (const callback of targetListeners) {
      callback(message);
    }

    // 投递给广播监听者
    if (message.receiver !== 'broadcast') {
      const broadcastListeners = this.listeners.get('broadcast') || [];
      for (const callback of broadcastListeners) {
        callback(message);
      }
    }
  }

  // 模拟超预算自动协商逻辑 (Cost Controller -> Material Expert)
  public async triggerBudgetNegotiation(currentCost: number, maxBudget: number): Promise<string> {
    if (currentCost > maxBudget) {
      return `[Negotiation Triggered] Cost (${currentCost} IDR) exceeds budget (${maxBudget} IDR). Requesting Material Expert for alternative SKUs.`;
    }
    return `[Budget Status] Within safe limits.`;
  }
}
