/* eslint-disable */

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  CameraControls,
  Grid,
  Line,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";
import { DoubleSide, TextureLoader, Vector3 } from "three";
import { pathCoordinates, nodeCoordinates } from "../data/coordinates";
import { useBlockedEdge } from "../hooks/useBlockedEdge";
import { useMaps } from "../contexts/MapContext";

import pinModelPath from "../../../../resources/map_pin.glb";
import endPinPath from "../../../../resources/end_pin.glb";
import obstacleModelPath from "../../../../resources/obstacle.glb";

const MapComponent = ({ gltfPath }) => {
  const {
    isInsertPressed: insertObstacle,
    paths: shortestAndSafestPath,
    base64map,
    mapImage,
    dispatch,
    obstacles,
    blockedEdges,
    currentLocation,
    destination,
  } = useMaps();

  const { getBlockedEdge } = useBlockedEdge();
  const [mousePosition, setMousePosition] = useState(null);
  const [showHighlightPlane, setShowHighlightPlane] = useState(false);
  const [hasObstacle, setHasObstacle] = useState(false);
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [frameCount, setFrameCount] = useState(0);

  // console.log("mapComponent Renders");
  // console.log(currentLocation);
  // console.log(destination);

  useEffect(() => {
    if (base64map) {
      dispatch({
        type: "mapImage/updated",
        payload: "data:image/png;base64," + base64map,
      });
    } else {
      dispatch({ type: "mapImage/updated", payload: "" });
    }
  }, [base64map, dispatch]); //mapImageVal

  useEffect(() => {
    setCurrentPathIndex(0);
    setFrameCount(0);
  }, [shortestAndSafestPath]);

  useEffect(() => {
    if (insertObstacle) {
      dispatch({ type: "path/reset" });
    }
  }, [insertObstacle, dispatch]);

  function handleOnPointerMove(event) {
    if (!insertObstacle || shortestAndSafestPath.length > 0) return;

    const { point } = event;

    setHasObstacle(false);

    const highlightPosition = new Vector3(
      Math.round(point.x),
      0,
      Math.round(point.z),
    );

    let isOnPath = false;

    pathCoordinates.forEach((coord) => {
      if (highlightPosition.equals(new Vector3(...coord))) {
        isOnPath = true;
        return;
      }
    });

    setShowHighlightPlane(isOnPath);
    setMousePosition(isOnPath ? highlightPosition : null);
  }

  function handleOnClick(event) {
    if (!insertObstacle) return;

    const { point } = event;

    const obstaclePosition = new Vector3(
      Math.round(point.x),
      0.5,
      Math.round(point.z),
    );

    const isOnPath = pathCoordinates.some((coord) => {
      const [x, y, z] = coord;
      if (
        x === obstaclePosition.x &&
        y === obstaclePosition.y - 0.5 &&
        z === obstaclePosition.z
      ) {
        // console.log(obstaclePosition);
        return true;
      }
    });

    if (isOnPath) {
      let newBlockedEdge;
      pathCoordinates.forEach((coord, index) => {
        if (obstaclePosition.equals(new Vector3(coord[0], 0.5, coord[2]))) {
          newBlockedEdge = getBlockedEdge(index);
        }
      });

      if (!blockedEdges.includes(newBlockedEdge)) {
        dispatch({ type: "obstacle/add", payload: obstaclePosition });
        // dispatch({ type: "blockedEdges/add", payload: newBlockedEdge });
        // setBlockedEdges([...blockedEdges, newBlockedEdge]);

        dispatch({
          type: "obstacle/insert",
          payload: {
            obstaclePosition,
            blockedEdgeIndex: newBlockedEdge,
          },
        });
      } else {
        setHasObstacle(true);
      }
    }
  }

  const Plane = () => {
    const { scene } = useGLTF(gltfPath);
    const texture = mapImage && useLoader(TextureLoader, mapImage);

    return (
      <>
        {mapImage ? (
          <group>
            <mesh
              rotation-x={-Math.PI / 2}
              position={[0, -0.05, 0]}
              userData={{ name: "ground" }}
            >
              <planeGeometry args={[20.4, 20.4]} />
              <meshBasicMaterial map={texture} side={DoubleSide} />
            </mesh>
          </group>
        ) : (
          <group>
            <mesh
              castShadow={true}
              receiveShadow={true}
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
          </group>
        )}
      </>
    );
  };

  const HighlightPlane = ({ position, color }) => (
    <mesh rotation-x={-Math.PI / 2} position={position}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color={color} transparent={true} />
    </mesh>
  );

  const ObstacleGeo = ({ position }) => {
    const { scene } = useGLTF(obstacleModelPath);
    const model = useMemo(() => scene.clone(), [scene]);

    return (
      <mesh position={position} castShadow={true}>
        <primitive object={model} scale={[0.9, 1, 0.9]} />
      </mesh>
    );
  };

  const Scene = ({ mapVal }) => (
    <>
      <Plane mapVal={mapVal} />
      {obstacles.map((position, index) => (
        <ObstacleGeo key={index} position={position} />
      ))}
      {showHighlightPlane && (
        <HighlightPlane
          position={mousePosition}
          color={hasObstacle ? "red" : "orange"}
        />
      )}
      {shortestAndSafestPath.length > 0 && (
        <DrawPath
          shortestAndSafestPath={shortestAndSafestPath}
          currentPathIndex={currentPathIndex}
          setCurrentPathIndex={setCurrentPathIndex}
        />
      )}
      {currentLocation && (
        <LocationPin
          position={nodeCoordinates[currentLocation]}
          modelPath={pinModelPath}
        />
      )}
      {destination && (
        <LocationPin
          position={nodeCoordinates[destination]}
          modelPath={endPinPath}
        />
      )}
    </>
  );

  return (
    <Canvas shadows={true}>
      <directionalLight position={[-7.6, 10.4, 20]} intensity={5} />
      <ambientLight intensity={0.5} />
      <PerspectiveCamera makeDefault position={[4, 15, 25]} />
      <Scene />
      <CameraControls />
    </Canvas>
  );
};

const DrawPath = ({
  shortestAndSafestPath,
  currentPathIndex,
  setCurrentPathIndex,
}) => {
  const coordinatesOfPath = useMemo(() => {
    return shortestAndSafestPath.slice(0, currentPathIndex).map((node) => {
      const [x, y, z] = nodeCoordinates[node];
      return new Vector3(x, y - 0.2, z);
    });
  }, [shortestAndSafestPath, currentPathIndex]);

  const frameCount = useRef(0);

  console.log("drawPath Renders");

  useFrame(() => {
    frameCount.current += 1;

    if (
      frameCount.current % 5 === 0 &&
      currentPathIndex < shortestAndSafestPath.length
    ) {
      setCurrentPathIndex(currentPathIndex + 1);
    }
  });

  return coordinatesOfPath.length >= 2 ? (
    <Line points={coordinatesOfPath} lineWidth={5} color={"#0f53ff"} />
  ) : null;
};

const LocationPin = ({ position, modelPath }) => {
  const { scene } = useGLTF(modelPath);

  return (
    <mesh position={position}>
      <primitive object={scene} />
    </mesh>
  );
};

export default MapComponent;
