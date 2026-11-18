// Path: packages/spatial-engine/src/viewport.tsx

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface SpatialViewportProps {
  currentMaterialColor?: string;
  modelType?: 'villa_living_room' | 'hotel_suite';
}

function RoomMesh({ color = '#C9A96E' }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  // 简单的轻量旋转或呼吸动画交互
  useFrame((state, delta) => {
    // meshRef.current.rotation.y += delta * 0.05;
  });

  return (
    <group>
      {/* 模拟房间地板 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#333333" roughness={0.4} />
      </mesh>

      {/* 模拟核心墙面 / 互动材质展示块 */}
      <mesh ref={meshRef} position={[0, 1, -3]}>
        <boxGeometry args={[6, 4, 0.2]} />
        <meshStandardMaterial color={color} roughness={0.2} />
      </mesh>
    </group>
  );
}

export const SpatialViewport: React.FC<SpatialViewportProps> = ({ 
  currentMaterialColor = '#C9A96E',
  modelType = 'villa_living_room' 
}) => {
  return (
    <div style={{ width: '100%', height: '600px', background: '#111', borderRadius: '12px', overflow: 'hidden' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 3, 7]} fov={50} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
        
        <RoomMesh color={currentMaterialColor} />
        
        <OrbitControls enableZoom={true} enablePan={true} maxPolarAngle={Math.PI / 2 - 0.05} />
      </Canvas>
    </div>
  );
};
