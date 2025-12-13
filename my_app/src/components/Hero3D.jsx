import React from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Environment, OrbitControls, useGLTF, ContactShadows } from "@react-three/drei";

function Laptop() {
  const { scene } = useGLTF("/models/LaptopComputer.glb");

  // Big scale for prominence
  const isMobile = window.innerWidth < 600;
  const scale = isMobile ? 35 : 55;
  const position = isMobile ? [0, -0.5, 0] : [0, -1, 0];

  // Reduce material shininess for realism
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.metalness = 0.2;
      child.material.roughness = 0.8;
    }
  });

  return (
    <primitive
      object={scene}
      scale={scale}
      position={position}
      rotation={[0, Math.PI / 4, 0]}
    />
  );
}

export default function Hero3D() {
  return (
    <Canvas shadows camera={{ position: [6, 3, 12], fov: 50 }}>
      {/* Gradient-like ambient light */}
      <hemisphereLight
        skyColor={"#ffffff"} 
        groundColor={"#1a424bff"} 
        intensity={0.7}
      />

      {/* Soft directional light for shadows */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.3}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Environment reflection */}
      <Environment preset="city" intensity={0.3} />

      {/* Floating laptop */}
      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.5}>
        <Laptop />
      </Float>

      {/* Ground shadow for realism */}
      <ContactShadows
        position={[0, -1, 0]}
        opacity={0.6}
        scale={15}
        blur={3}
        far={5}
        color="#000000"
      />

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}
