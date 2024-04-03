/* eslint-disable */
import { Canvas, useThree } from "@react-three/fiber";
import { CameraControls, PerspectiveCamera } from "@react-three/drei";
import { useEffect } from "react";

import Scene from "./Scene";

function Exposure() {
  const { gl } = useThree();

  useEffect(() => {
    gl.toneMappingExposure = 0.5;
  }, [gl]);

  return null;
}

function Map() {
  return (
    <Canvas shadows>
      <directionalLight position={[-5, 4.5, 9]} intensity={10} castShadow />
      <ambientLight intensity={1} />
      <Scene />
      <Exposure />
      <CameraControls />
    </Canvas>
  );
}

export default Map;
