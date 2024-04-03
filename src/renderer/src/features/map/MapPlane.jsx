/* eslint-disable */
import { DoubleSide, TextureLoader } from "three";
import { Grid, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import NodesIdentity from "./NodesIdentity";

function MapPlane({
  gltfPath,
  mapImage,
  insertObstacle,
  shortestAndSafestPath,
  handleOnPointerMove,
  handleOnClick,
}) {
  const { scene } = useGLTF(gltfPath);
  const texture = mapImage && useLoader(TextureLoader, mapImage);

  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <>
      {mapImage ? (
        <group>
          <PerspectiveCamera makeDefault position={[4, 15, 25]} />
          <mesh
            rotation-x={-Math.PI / 2}
            position={[0, -0.05, 0]}
            userData={{ name: "ground" }}
          >
            <planeGeometry args={[20.4, 20.4]} />
            <meshBasicMaterial map={texture} side={DoubleSide} />
          </mesh>
          <NodesIdentity />
        </group>
      ) : (
        <group>
          <PerspectiveCamera makeDefault position={[-5, 10, 6]} />
          <mesh
            onPointerMove={
              insertObstacle && shortestAndSafestPath.length === 0
                ? handleOnPointerMove
                : undefined
            }
            onClick={
              insertObstacle && shortestAndSafestPath.length === 0
                ? handleOnClick
                : undefined
            }
            position={[0, -0.05, 0]}
            userData={{ name: "ground" }}
          >
            <primitive object={scene} scale={4.08} />
          </mesh>
          {insertObstacle && shortestAndSafestPath.length === 0 && (
            <Grid
              args={[20, 20]}
              cellColor={"white"}
              sectionThickness={0}
              cellThickness={1}
            />
          )}
          <NodesIdentity />
        </group>
      )}
    </>
  );
}

export default MapPlane;
