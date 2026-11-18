// Path: apps/playground/app/page.tsx
'use client';

import React, { useState } from 'react';
import { SpatialViewport } from '@aetherspace/spatial-engine';
import { SpatialBOMCalculator } from '@aetherspace/spatial-engine/src/bom-calculator';
import { SEED_MATERIAL_SKUS } from '../../../data/seed/initial-data';
import { MaterialSKU, BOMItem } from '@aetherspace/core-types';

export default function PlaygroundPage() {
  // 默认选中的材质
  const [selectedFloorSku, setSelectedFloorSku] = useState<MaterialSKU>(SEED_MATERIAL_SKUS[1]); // Andesite Stone
  const [selectedWallSku, setSelectedWallSku] = useState<MaterialSKU>(SEED_MATERIAL_SKUS[0]);     // Teak Wood Panel
  const [currentMaterialColor, setCurrentMaterialColor] = useState<string>('#C9A96E');
  const [a2aLog, setA2aLog] = useState<string>('System initialized. A2A Swarm & BOM Calculator active.');

  // 空间物理尺寸模拟 (例如：320平米别墅客厅)
  const roomDimensions = {
    floorAreaSqm: 85,
    wallPerimeterM: 42,
    ceilingHeightM: 3.5,
  };

  // 实时运行 BOM 算量
  const bomResult = SpatialBOMCalculator.calculateBOM(roomDimensions, {
    floorSku: selectedFloorSku,
    wallSku: selectedWallSku,
  });

  const maxBudget = 140000000; // 1.4 亿 IDR 预算上限

  // 材质切换交互
  const handleMaterialSwap = (type: 'floor' | 'wall', sku: MaterialSKU, colorHex: string) => {
    if (type === 'floor') {
      setSelectedFloorSku(sku);
    } else {
      setSelectedWallSku(sku);
      setCurrentMaterialColor(colorHex);
    }

    // 模拟 A2A 校验
    const estimatedCost = bomResult.totalCostIdr;
    if (estimatedCost > maxBudget) {
      setA2aLog(`⚠️ [Cost Controller Agent]: Budget warning! Current total (${estimatedCost.toLocaleString()} IDR) exceeds limit.`);
    } else {
      setA2aLog(`✅ [A2A Swarm]: Material updated successfully. BOM re-calculated with waste factor.`);
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#090D16', color: '#F3F4F6', fontFamily: 'Inter, sans-serif', padding: '32px' }}>
      {/* 顶部标题栏 */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid #1F2937', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, background: 'linear-gradient(to right, #818CF8, #C084FC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            AetherSpace-Core Studio & BOM Playground
          </h1>
          <p style={{ fontSize: '14px', color: '#9CA3AF', margin: '4px 0 0 0' }}>
            Real-time Three.js Rendering + Automated BOM Calculation + A2A Swarm
          </p>
        </div>
        <div style={{ background: '#1F2937', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', color: '#10B981' }}>
          🟢 Engine Online
        </div>
      </header>

      {/* 主布局区域 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px' }}>
        
        {/* 左侧：3D 视口与 A2A 日志 */}
        <div>
          <SpatialViewport currentMaterialColor={currentMaterialColor} modelType="villa_living_room" />
          
          <div style={{ marginTop: '20px', background: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '16px' }}>
            <h3 style={{ fontSize: '14px', margin: '0 0 8px 0', color: '#93C5FD' }}>🤖 A2A Multi-Agent Swarm Live Log</h3>
            <p style={{ fontSize: '13px', fontFamily: 'monospace', color: '#34D399', margin: 0 }}>{a2aLog}</p>
          </div>
        </div>

        {/* 右侧：材质选择与动态 BOM 清单面板 */}
        <div style={{ background: '#111827', border: '1px solid #1F2937', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* 材质切换 */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 10px 0', color: '#E5E7EB' }}>🎨 Material & SKU Swapper</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button 
                onClick={() => handleMaterialSwap('wall', SEED_MATERIAL_SKUS[0], '#C9A96E')}
                style={{ background: '#1F2937', color: '#fff', border: '1px solid #4B5563', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontSize: '13px' }}>
                🪵 Wall: Perhutani Teak Wood Panel
              </button>
              <button 
                onClick={() => handleMaterialSwap('wall', SEED_MATERIAL_SKUS[3], '#E5E7EB')}
                style={{ background: '#1F2937', color: '#fff', border: '1px solid #4B5563', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontSize: '13px' }}>
                🧱 Wall: Waterproof Microcement
              </button>
            </div>
          </div>

          {/* 动态算量 BOM 清单 */}
          <div style={{ borderTop: '1px solid #1F2937', paddingTop: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 10px 0', color: '#E5E7EB' }}>📊 Live BOM & Cost Engine</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
              {bomResult.items.map((item: BOMItem, idx: number) => (
                <div key={idx} style={{ background: '#1F2937', padding: '10px', borderRadius: '8px', fontSize: '12px' }}>
                  <div style={{ fontWeight: '500', color: '#D1D5DB' }}>{item.itemName}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9CA3AF', marginTop: '4px' }}>
                    <span>Qty: {item.quantity} {item.unit}</span>
                    <span style={{ color: '#F3F4F6' }}>{item.totalPriceIdr.toLocaleString()} IDR</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 总造价看板 */}
          <div style={{ borderTop: '1px solid #1F2937', paddingTop: '16px' }}>
            <div style={{ background: '#1F2937', padding: '14px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#9CA3AF' }}>Max Budget:</span>
                <span>{maxBudget.toLocaleString()} IDR</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 'bold' }}>
                <span style={{ color: '#9CA3AF' }}>Calculated Total:</span>
                <span style={{ color: bomResult.totalCostIdr > maxBudget ? '#EF4444' : '#10B981' }}>
                  {bomResult.totalCostIdr.toLocaleString()} IDR
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
