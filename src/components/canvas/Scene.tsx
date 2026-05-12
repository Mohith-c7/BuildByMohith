"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

const ServiceNode = ({ position, color, size = 1, speed = 1 }: any) => {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2 * speed;
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position} ref={mesh}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.5} 
          wireframe 
          transparent 
          opacity={0.4} 
        />
      </mesh>
    </Float>
  );
};

const ConnectionLines = () => {
  const points = [
    new THREE.Vector3(-4, 2, 0),
    new THREE.Vector3(4, 2, 0),
    new THREE.Vector3(0, -3, 0),
    new THREE.Vector3(-4, 2, 0), // Back to start for a triangle
  ];

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color="#10b981" transparent opacity={0.2} />
    </line>
  );
};

export const Scene = () => {
  return (
    <div className="absolute inset-0 -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#10b981" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <ServiceNode position={[-5, 3, 0]} color="#10b981" size={1.2} speed={1.5} />
        <ServiceNode position={[5, 2, -2]} color="#059669" size={0.8} speed={1.2} />
        <ServiceNode position={[-2, -4, 2]} color="#34d399" size={1} speed={0.8} />
        <ServiceNode position={[3, -2, -5]} color="#064e3b" size={1.5} speed={0.5} />
        
        <ConnectionLines />
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/50 to-black pointer-events-none" />
    </div>
  );
};
