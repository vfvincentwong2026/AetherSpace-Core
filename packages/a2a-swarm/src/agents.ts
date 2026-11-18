// Path: packages/a2a-swarm/src/agents.ts

import { A2AMessage, MaterialSKU } from '@aetherspace/core-types';
import { A2ASwarmBroker } from './broker';

export class SwarmAgentOrchestrator {
  private broker: A2ASwarmBroker;
  private materialCatalog: MaterialSKU[];

  constructor(broker: A2ASwarmBroker, materialCatalog: MaterialSKU[]) {
    this.broker = broker;
    this.materialCatalog = materialCatalog;
    this.registerAllAgents();
  }

  private registerAllAgents() {
    // 1. 材料与工艺专家 Agent (Material Expert)：负责气候适应性校验与超预算平替推荐
    this.broker.subscribe('material_expert', async (msg: A2AMessage) => {
      if (msg.intent === 'check_constraint') {
        const targetSku = this.materialCatalog.find((m) => m.skuId === msg.payload.skuId);
        const isSafe = targetSku?.climateFit === 'tropical_high_humidity';
        
        await this.broker.dispatch({
          messageId: `msg-${Date.now()}-mat`,
          sender: 'material_expert',
          receiver: 'lead_architect',
          intent: 'finalize',
          payload: {
            skuId: msg.payload.skuId,
            climateApproved: isSafe,
            note: isSafe ? 'Verified for tropical high humidity.' : 'Warning: High warping risk in humid climate.',
          },
          timestamp: Date.now(),
        });
      }

      // 响应造价控制 Agent 的超预算协商请求
      if (msg.intent === 'negotiate_budget' && msg.payload.actionRequired === 'SUGGEST_ALTERNATIVE_SKU') {
        const cheaperAlternative = this.materialCatalog
          .filter((m) => m.climateFit === 'tropical_high_humidity' && m.grade !== 'Luxury')
          .sort((a, b) => a.priceIdr - b.priceIdr)[0];

        if (cheaperAlternative) {
          await this.broker.dispatch({
            messageId: `msg-${Date.now()}-alt`,
            sender: 'material_expert',
            receiver: 'cost_controller',
            intent: 'propose_design',
            payload: {
              reason: 'Budget optimization swap',
              suggestedSku: cheaperAlternative,
            },
            timestamp: Date.now(),
          });
        }
      }
    });

    // 2. 美学与风格 Agent (Aesthetic Stylist)：负责色彩与材质情绪板生成
    this.broker.subscribe('aesthetic_stylist', async (msg: A2AMessage) => {
      if (msg.intent === 'propose_design') {
        const style = msg.payload.style || 'Tropical Modern';
        const palette = style === 'Tropical Modern' 
          ? ['#C9A96E', '#E5E5E5', '#2C3531'] 
          : ['#D8CFC4', '#8C7A6B', '#1F2421'];

        await this.broker.dispatch({
          messageId: `msg-${Date.now()}-aes`,
          sender: 'aesthetic_stylist',
          receiver: 'lead_architect',
          intent: 'finalize',
          payload: { style, recommendedPalette: palette },
          timestamp: Date.now(),
        });
      }
    });
  }
}
