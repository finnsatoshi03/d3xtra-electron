/* eslint-disable */

const HighlightPlane = ({ position, color }) => (
  <mesh rotation-x={-Math.PI / 2} position={position}>
    <planeGeometry args={[1, 1]} />
    <meshBasicMaterial color={color} transparent={true} />
  </mesh>
);

export default HighlightPlane;
