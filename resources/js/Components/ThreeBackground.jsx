// resources/js/Components/ThreeBackground.jsx
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

function SceneModel() {
  const gltf = useGLTF("/models/art-scene.glb");
  return (
    <primitive object={gltf.scene} scale={1.2} position={[4, -0.8, 0]} />
  );
}

// 🎥 CAMERA ANIMATION (cinematic zoom in)
function CameraAnimation() {
  const cameraRef = useRef();

  useFrame(({ camera }) => {
    // Starting position (zoomed out)
    const startZ = 18; // far
    const endZ = 11;    // close
    const speed = 0.015;

    if (!camera.__animated) {
      camera.position.z = startZ;
      camera.position.y = 3;
      camera.__animated = true;
    }

    // Animate Z position forward
    if (camera.position.z > endZ) {
      camera.position.z -= speed;
    }
  });

  return null;
}

export default function ThreeBackground() {
  return (
    <Canvas
      camera={{ position: [-5, 3, 18], fov: 40 }}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <ambientLight intensity={1} />
      <directionalLight intensity={1.5} position={[5, 5, 5]} />

      <Suspense fallback={null}>
        <SceneModel />
        <Environment preset="sunset" />
      </Suspense>

      {/* ✨ CAMERA ZOOM-IN ANIMATION */}
      <CameraAnimation />

      {/* Controls disabled so user cannot move camera */}
      <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
    </Canvas>
  );
}
