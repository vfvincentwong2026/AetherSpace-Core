// Path: apps/playground/app/page.tsx
'use client';

import React, { useState } from 'react';
import { SpatialViewport } from '@aetherspace/spatial-engine';

export default function PlaygroundPage() {
  const [selectedColor, setSelectedColor] = useState<string>('#C9A96E'); // 默认热带轻奢金/木色
  const [currentMaterialName, setCurrentMaterialName] = useState<string>('Teak Wood Panel (Ant-Termite)');
  const [currentCost, setCurrentCost] = useState<number>(145000000); // 1.45 亿 IDR
  const maxBudget = 140000000; // 1.40 亿 IDR 预算上限
  const [a2aLog, setA2aLog] = useState<string>('System initialized. A2A Swarm standing by.');

  // 材质切换与联动计算
  const handleMaterialChange = (color: string, name: string, price: number) => {
    setSelectedColor(color);
    setCurrentMaterialName(name);
    setCurrentCost(price);

    // 模拟 A2A 自动干预
    if (price > maxBudget) {
      setA2aLog(`⚠️ [Cost Controller Agent]: Budget exceeded (${price.toLocaleString()} IDR > ${maxBudget.toLocaleString()} IDR). Triggering A2A negotiation with Material Expert.`);
    } else {
      setA2aLog(`✅ [A2A Swarm]: Material updated. Budget within safe limit.`);
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#090D16', color: '#F3F4F6', fontFamily: 'Inter, sans-serif', padding: '32px' }}>
      {/* 顶部标题栏 */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid #1F2937', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, background: 'linear-gradient(to right, #818CF8, #C084FC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            AetherSpace-Core Playground
          </h1>
          <p style={{ fontSize: '14px', color: '#9CA3AF', margin: '4px 0 0 0' }}>
            AI-Native Spatial Intelligence & Three.js / MCP / A2A Live Studio
          </p>
        </div>
        <div style={{ background: '#1F2937', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', color: '#10B981' }}>
          🟢 Cloudflare Edge Connected
        </div>
      </header>

      {/* 主布局区域 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px' }}>
        
        {/* 左侧：Three.js 实时 3D 渲染视口 */}
        <div>
          <SpatialViewport currentMaterialColor={selectedColor} modelType="villa_living_room" />
          
          {/* 下方：A2A 智能体实时状态日志 */}
          <div style={{ marginTop: '20px', background: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '16px' }}>
            <h3 style={{ fontSize: '14px', margin: '0 0 8px 0', color: '#93C5FD' }}>🤖 A2A Multi-Agent Swarm Live Log</h3>
            <p style={{ fontSize: '13px', fontFamily: 'monospace', color: '#34D399', margin: 0 }}>{a2aLog}</p>
          </div>
        </div>

        {/* 右侧：控制面板与 BOM 算量联动 */}
        <div style={{ background: '#111827', border: '1px solid #1F2937', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* 材质选择面板 */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 m 12px 0', color: '#E5E7EB' }}>🎨 Material & SKU Swapper</h3>
            <p style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '12px' }}>Click to instantly switch materials and trigger real-time BOM calculation.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                onClick={() => handleMaterialChange('#C9A96E', 'Teak Wood Panel (Tropical)', 135000000)}
                style={{ background: selectedColor === '#C9A96E' ? '#374151' : '#1F2937', color: '#fff', border: '1px solid #4B5563', padding: '10px 14px', borderRadius: '8px', cursor: 'pointer', textAlign: 'left' }}>
                🪵 Teak Wood Panel (Safe Budget)
              </button>
              <button 
                onClick={() => handleMaterialChange('#E5E7EB', 'Italian White Marble (Luxury)', 148000000)}
                style={{ background: selectedColor === '#E5E7EB' ? '#374151' : '#1F2937', color: '#fff', border: '1px solid #4B5563', padding: '10px 14px', borderRadius: '8px', cursor: 'pointer', textAlign: 'left' }}>
                🏛️ Italian White Marble (Triggers Over-Budget)
              </button>
            </div>
          </div>

          {/* 算量与造价看板 */}
          <div style={{ borderTop: '1px solid #1F2937', paddingTop: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 12px 0', color: '#E5E7EB' }}>📊 Real-time BOM & Cost</h3>
            <div style={{ background: '#1F2937', padding: '14px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#9CA3AF' }}>Active Material:</span>
                <span style={{ fontWeight: '500' }}>{currentMaterialName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#9CA3AF' }}>Max Budget:</span>
                <span>{maxBudget.toLocaleString()} IDR</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 'bold', borderTop: '1px solid #374151', paddingTop: '8px', marginTop: '4px' }}>
                <span style={{ color: '#9CA3AF' }}>Total Cost:</span>
                <span style={{ color: currentCost > maxBudget ? '#EF4444' : '#10B981' }}>{currentCost.toLocaleString()} IDR</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
