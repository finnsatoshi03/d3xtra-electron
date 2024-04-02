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
    <Canvas shadows={true}>
      <directionalLight position={[-7.6, 10.4, 20]} intensity={5} />
      <ambientLight intensity={0.5} />
      <PerspectiveCamera makeDefault position={[4, 15, 25]} />
      <Scene />
      <Exposure />
      <CameraControls />
    </Canvas>
  );
}

export default Map;
