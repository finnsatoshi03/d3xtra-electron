/* eslint-disable */

import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
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
  const {
    isInsertPressed: insertObstacle,
    paths: shortestAndSafestPath,
    base64map,
    mapImage,
    dispatch,
  } = useMaps();

  // console.log(base64map);

  const { getBlockedEdge } = useBlockedEdge();

  const [mousePosition, setMousePosition] = useState(null);
  const [showHighlightPlane, setShowHighlightPlane] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const [hasObstacle, setHasObstacle] = useState(false);
  const [blockedEdges, setBlockedEdges] = useState([]);
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [frameCount, setFrameCount] = useState(0);

  useEffect(() => {
    if (base64map) {
      dispatch({
        type: "mapImage/updated",
        payload: "data:image/png;base64," + base64map,
      });
    } else {
      dispatch({ type: "mapImage/updated", payload: mapImageVal });
    }
  }, [base64map, mapImageVal, dispatch]);

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
        setObstacles([...obstacles, obstaclePosition]);
        setBlockedEdges([...blockedEdges, newBlockedEdge]);

        dispatch({
          type: "insert/obstacle",
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

  const Plane = ({ mapVal }) => {
    const dextraMap = useLoader(TextureLoader, mapImage);

    return (
      <group>
        <mesh
          rotation-x={-Math.PI / 2}
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
          position={[0, -0.01, 0]}
          userData={{ name: "ground" }}
        >
          <planeGeometry args={[20.4, 20.4]} />
          <meshBasicMaterial map={dextraMap} side={DoubleSide} />
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

  const DrawPath = React.memo(() => {
    const coordinatesOfPath = React.useMemo(() => {
      return shortestAndSafestPath.slice(0, currentPathIndex).map((node) => {
        const [x, y, z] = nodeCoordinates[node];
        return new Vector3(x, y - 0.2, z);
      });
    }, [shortestAndSafestPath, currentPathIndex]);

    useFrame(() => {
      setFrameCount(frameCount + 1);

      if (
        frameCount % 5 === 0 &&
        currentPathIndex < shortestAndSafestPath.length
      ) {
        setCurrentPathIndex(currentPathIndex + 1);
      }
    });

    return coordinatesOfPath.length >= 2 ? (
      <Line points={coordinatesOfPath} lineWidth={5} color={"#0f53ff"} />
    ) : null;
    // console.log("No path to draw")
  });

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
      {shortestAndSafestPath.length > 0 && <DrawPath />}
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
