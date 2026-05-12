"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Stars, Text, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const Pulse = ({ start, end, speed = 1, delay = 0 }: { start: THREE.Vector3, end: THREE.Vector3, speed?: number, delay?: number }) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!mesh.current) return;
    const t = (state.clock.getElapsedTime() * 0.5 * speed + delay) % 1;
    mesh.current.position.lerpVectors(start, end, t);
    mesh.current.scale.setScalar(Math.sin(t * Math.PI) * 0.5);
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial color="#10b981" transparent opacity={0.8} />
    </mesh>
  );
};

const ServiceNode = ({ position, name, color, size = 1 }: any) => {
  const [hovered, setHovered] = useState(false);
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position}>
        <mesh 
          ref={mesh}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <icosahedronGeometry args={[size, 1]} />
          <meshStandardMaterial 
            color={hovered ? "#34d399" : color} 
            wireframe 
            emissive={color}
            emissiveIntensity={hovered ? 2 : 0.5}
          />
        </mesh>
        
        {hovered && (
          <Text
            position={[0, size + 0.5, 0]}
            fontSize={0.2}
            color="white"
            font="/fonts/Inter-Bold.ttf" // Note: ensure font exists or fallback
            anchorX="center"
            anchorY="middle"
          >
            {name}\nACTIVE_NODE
          </Text>
        )}
      </group>
    </Float>
  );
};

const MeshNetwork = () => {
  const nodes = useMemo(() => [
    { pos: new THREE.Vector3(-6, 3, -2), name: "AUTH_SERVICE", color: "#10b981" },
    { pos: new THREE.Vector3(6, 2, -4), name: "GATEWAY_V4", color: "#059669" },
    { pos: new THREE.Vector3(0, -4, 2), name: "TELEMETRY_ENGINE", color: "#34d399" },
    { pos: new THREE.Vector3(-4, -2, -6), name: "STORAGE_NODE", color: "#064e3b" },
    { pos: new THREE.Vector3(4, -5, -2), name: "CACHE_LAYER", color: "#10b981" },
  ], []);

  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.4) {
          lines.push({ start: nodes[i].pos, end: nodes[j].pos });
        }
      }
    }
    return lines;
  }, [nodes]);

  return (
    <group>
      {nodes.map((node, i) => (
        <ServiceNode key={i} position={node.pos} name={node.name} color={node.color} size={0.8} />
      ))}
      
      {connections.map((line, i) => (
        <React.Fragment key={i}>
          <line>
            <bufferGeometry attach="geometry" onUpdate={self => self.setFromPoints([line.start, line.end])} />
            <lineBasicMaterial attach="material" color="#10b981" transparent opacity={0.1} />
          </line>
          <Pulse start={line.start} end={line.end} speed={0.8} delay={i * 0.2} />
        </React.Fragment>
      ))}
    </group>
  );
};

export const Scene = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#10b981" />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        <MeshNetwork />
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.2} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)] pointer-events-none" />
    </div>
  );
};
