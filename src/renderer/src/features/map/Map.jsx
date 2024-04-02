/* eslint-disable */
import { Canvas } from "@react-three/fiber";
import { CameraControls, PerspectiveCamera } from "@react-three/drei";

import Scene from "./Scene";

function Map() {
  return (
    <Canvas shadows={true}>
      <directionalLight position={[-7.6, 10.4, 20]} intensity={5} />
      <ambientLight intensity={0.5} />
      <PerspectiveCamera makeDefault position={[4, 15, 25]} />
      <Scene />
      <CameraControls />
    </Canvas>
  );
}

export default Map;
