/* eslint-disable */
import { useGLTF } from "@react-three/drei";

const LocationPin = ({ position, modelPath }) => {
  const { scene } = useGLTF(modelPath);

  return (
    <mesh position={position}>
      <primitive object={scene} />
    </mesh>
  );
};

export default LocationPin;
