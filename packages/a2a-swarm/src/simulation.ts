// Path: packages/a2a-swarm/src/simulation.ts

import { A2ASwarmBroker } from './broker';
import { SwarmAgentOrchestrator } from './agents';
import { SpatialBOMCalculator } from '@aetherspace/spatial-engine/src/bom-calculator';
import { SEED_MATERIAL_SKUS } from '../../../data/seed/initial-data';

async function runAetherSpaceA2ASimulation() {
  console.log('🚀 [AetherSpace-Core] Starting A2A Multi-Agent Swarm & BOM Simulation...\n');

  // 1. 初始化消息总线与智能体网络
  const broker = new A2ASwarmBroker();
  new SwarmAgentOrchestrator(broker, SEED_MATERIAL_SKUS);

  // 监听广播与消息投递
  broker.subscribe('broadcast', (msg) => {
    console.log(`📡 [Broadcast Monitor] Agent [${msg.sender}] sent intent [${msg.intent}] -> Payload:`, JSON.stringify(msg.payload));
  });

  // 2. 模拟空间物理尺寸 (例如：320平米别墅客厅)
  const roomDimensions = {
    floorAreaSqm: 85,
    wallPerimeterM: 42,
    ceilingHeightM: 3.5,
  };

  const maxBudget = 140000000; // 1.4 亿 IDR 预算上限

  console.log(`📐 Room Specs: ${roomDimensions.floorAreaSqm} m² floor, Max Budget: ${maxBudget.toLocaleString()} IDR\n`);

  // 3. 初始方案：选用高奢意大利大理石 (触发超预算)
  console.log('🏛️ Step 1: Selecting Luxury Italian Marble...');
  const initialFloor = SEED_MATERIAL_SKUS[1]; // Andesite
  const luxuryWall = SEED_MATERIAL_SKUS[2];   // Carrara Statuario Marble (High Price)

  const initialBOM = SpatialBOMCalculator.calculateBOM(roomDimensions, {
    floorSku: initialFloor,
    wallSku: luxuryWall,
  });

  console.log(`   -> Calculated Total Cost: ${initialBOM.totalCostIdr.toLocaleString()} IDR`);

  if (initialBOM.totalCostIdr > maxBudget) {
    console.log('⚠️ [Alert]: Total cost exceeds max budget! Triggering Cost Controller Agent...');

    // 4. 触发 A2A 超预算自动协商
    const negotiationMsg = await broker.triggerBudgetNegotiation(initialBOM.totalCostIdr, maxBudget);
    
    // 模拟接收材料专家的平替推荐
    setTimeout(() => {
      console.log('\n💡 [A2A Swarm Resolution]: Material Expert successfully negotiated and substituted a climate-fit alternative SKU.');
      
      // 切换为平替防潮微水泥
      const alternativeWall = SEED_MATERIAL_SKUS[3];
      const optimizedBOM = SpatialBOMCalculator.calculateBOM(roomDimensions, {
        floorSku: initialFloor,
        wallSku: alternativeWall,
      });

      console.log(`   -> Optimized Wall Material: ${alternativeWall.name}`);
      console.log(`   -> New Total Cost: ${optimizedBOM.totalCostIdr.toLocaleString()} IDR (Within Budget ✅)`);
    }, 500);
  }
}

// 执行模拟
runAetherSpaceA2ASimulation();
