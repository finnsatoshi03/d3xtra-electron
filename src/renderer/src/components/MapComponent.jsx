/* eslint-disable */

import React, { useState, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  CameraControls,
  Grid,
  Line,
  PerspectiveCamera,
} from "@react-three/drei";
import { DoubleSide, TextureLoader, Vector3 } from "three";
import { pathCoordinates, nodeCoordinates } from "../data/coordinates";
import { useBlockedEdge } from "../hooks/useBlockedEdge";
import { useMaps } from "../contexts/MapContext";

const MapComponent = ({ mapImageVal }) => {
  const { isInsertPressed: insertObstacle } = useMaps();

  const { getBlockedEdge } = useBlockedEdge();

  const [mousePosition, setMousePosition] = useState(null);
  const [showHighlightPlane, setShowHighlightPlane] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const [hasObstacle, setHasObstacle] = useState(false);
  const [blockedEdges, setBlockedEdges] = useState([]);
  const [shortestAndSafestPath, setShortestAndSafestPath] = useState([
    // "A",
    // "E",
    // "I",
    // "J",
    // "K",
    // "O",
    // "T",
  ]);

  function handleOnPointerMove(event) {
    if (!insertObstacle) return;

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
    // setMousePosition(highlightPosition);
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

      blockedEdges.includes(newBlockedEdge)
        ? setHasObstacle(true)
        : setObstacles([...obstacles, obstaclePosition]);

      setBlockedEdges([...blockedEdges, newBlockedEdge]);
    }
  }

  const Plane = ({ mapVal }) => {
    const dextraMap = useLoader(TextureLoader, mapVal);

    return (
      <group>
        <mesh
          rotation-x={-Math.PI / 2}
          onPointerMove={insertObstacle ? handleOnPointerMove : undefined}
          onClick={insertObstacle ? handleOnClick : undefined}
          position={[0, -0.01, 0]}
          userData={{ name: "ground" }}
        >
          <planeGeometry args={[20.4, 20.4]} />
          <meshBasicMaterial map={dextraMap} side={DoubleSide} />
        </mesh>
        {insertObstacle && (
          <Grid
            args={[20, 20]}
            cellColor={"white"}
            sectionThickness={0}
            cellThickness={1}
          />
        )}
      </group>
    );
  };

  const HighlightPlane = ({ position, color }) => (
    <mesh rotation-x={-Math.PI / 2} position={position}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color={color} transparent={true} />
    </mesh>
  );

  const ObstacleGeo = ({ position }) => {
    return (
      <group>
        <mesh rotation-x={-Math.PI / 2} position={position} castShadow={true}>
          <boxGeometry args={[0.9, 0.9, 1]} />
          <meshStandardMaterial color="darkblue" />
        </mesh>
      </group>
    );
  };

  const DrawPath = () => {
    const coordinatesOfPath = shortestAndSafestPath.map((node) => {
      // Retrieve the coordinates for the current node from the nodeCoordinates object
      return nodeCoordinates[node];
    });

    // console.log(coordinatesOfPath);

    return <Line points={coordinatesOfPath} lineWidth={5} color={"red"} />;
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
      {/* <DrawPath /> */}
    </>
  );

  return (
    <Canvas shadows={true}>
      <directionalLight position={[-7.6, 10.4, 20]} intensity={50} />
      <PerspectiveCamera makeDefault position={[4, 15, 25]} />
      <Scene mapVal={mapImageVal} />
      <CameraControls />
    </Canvas>
  );
};

export default MapComponent;
