import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model({ modelPath }) {
  const gltf = useGLTF(modelPath);
  return <primitive object={gltf.scene} scale={0.5} />;
}

function ModelViewer({ modelPath }) {
  return (
    <Canvas style={{ width: "100%", height: "400px" }} camera={{ position: [3, 2, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      <Suspense fallback={null}>
        <Model modelPath={modelPath} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}

export default ModelViewer;
