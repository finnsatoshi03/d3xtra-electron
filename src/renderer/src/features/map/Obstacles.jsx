/* eslint-disable */
import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";

function Obstacles({ position, obstacleModelPath }) {
  const { scene } = useGLTF(obstacleModelPath);
  const model = useMemo(() => scene.clone(), [scene]);

  const adjustedPosition = position.clone();
  adjustedPosition.y -= 0.5;

  return (
    <mesh position={adjustedPosition} castShadow={true}>
      <primitive object={model} scale={[0.9, 1, 0.9]} />
    </mesh>
  );
}

export default Obstacles;
