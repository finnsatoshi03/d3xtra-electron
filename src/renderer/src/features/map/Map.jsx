import { Canvas } from "@react-three/fiber";
import { CameraControls, PerspectiveCamera } from "@react-three/drei";
import { HemisphereLight, DirectionalLight } from "@react-three/drei";

import Scene from "./Scene";

function Map() {
  return (
    <Canvas shadows={true}>
      <HemisphereLight
        skyColor={"#ffffff"}
        groundColor={"#aaaaaa"}
        intensity={0.5}
        position={[0, 50, 0]}
      />
      <DirectionalLight
        color={"#ffffff"}
        intensity={1}
        position={[4, 10, -12]}
        castShadow
      />
      <PerspectiveCamera makeDefault position={[4, 15, 25]} />
      <Scene />
      <CameraControls />
    </Canvas>
  );
}

export default Map;
