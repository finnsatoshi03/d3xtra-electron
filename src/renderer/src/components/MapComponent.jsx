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

const pathCoordinates = [
  [-8, 0, -8], // 0
  [-7, 0, -7], // 0
  [-6, 0, -6], // 0
  [-6, 0, -9], // 1
  [-7, 0, -9], // 1
  [-9, 0, -7], // 2
  [-9, 0, -6], // 2
  [-1, 0, -9], // 3
  [-2, 0, -9], // 3
  [-3, 0, -9], // 3
  [3, 0, -6], // 4
  [2, 0, -7], // 4
  [1, 0, -8], // 4
  [0, 0, -8], // 5
  [0, 0, -7], // 5
  [0, 0, -6], // 5
  [-9, 0, -3], // 6
  [-9, 0, -2], // 6
  [-9, 0, -1], // 6
  [-3, 0, -3], // 7
  [-2, 0, -2], // 7
  [-1, 0, -1], // 7
  [0, 0, -3], // 8
  [0, 0, -2], // 8
  [0, 0, -1], // 8
  [8, 0, -1], // 9
  [7, 0, -2], // 9
  [6, 0, -3], // 9
  [-9, 0, 1], // 10
  [-9, 0, 2], // 10
  [-9, 0, 3], // 10
  [-1, 0, 1], // 11
  [-2, 0, 2], // 11
  [-3, 0, 3], // 11
  [0, 0, 1], // 12
  [0, 0, 2], // 12
  [0, 0, 3], // 12
  [1, 0, 0], // 13
  [2, 0, 0], // 13
  [3, 0, 0], // 13
  [6, 0, 0], // 14
  [7, 0, 0], // 14
  [8, 0, 0], // 14
  [9, 0, 3], // 15
  [9, 0, 2], // 15
  [9, 0, 1], // 15
  [-9, 0, 6], // 16
  [-9, 0, 7], // 16
  [-9, 0, 8], // 16
  [-6, 0, 6], // 17
  [-7, 0, 7], // 17
  [-8, 0, 8], // 17
  [0, 0, 6], // 18
  [0, 0, 7], // 18
  [0, 0, 8], // 18
  [9, 0, 7], // 19
  [9, 0, 6], // 19
  [-8, 0, 9], // 20
  [-7, 0, 9], // 20
  [-6, 0, 9], // 20
  [-3, 0, 9], // 21
  [-2, 0, 9], // 21
  [-1, 0, 9], // 21
  [1, 0, 9], // 22
  [2, 0, 9], // 22
  [3, 0, 9], // 22
  [6, 0, 9], // 23
  [7, 0, 9], // 23
];

const nodeCoordinates = {
  I: [0, 0.3, 0], //NODE I
  N: [0, 0.3, 4.5], //NODE N
  R: [0, 0.3, 9], //NODE R
  S: [4.5, 0.3, 9], //NODE S
  T: [9, 0.3, 9], //NODE T
  O: [9, 0.3, 4.5], //NODE O
  K: [9, 0.3, 0], //NODE K
  J: [4.5, 0.3, 0], //NODE J
  F: [0, 0.3, -4.5], //NODE F
  C: [0, 0.3, -9], //NODE C
  B: [-4.5, 0.3, -9], //NODE B
  A: [-9, 0.3, -9], //NODE A
  D: [-9, 0.3, -4.5], //NODE D
  H: [-9, 0.3, 0], //NODE H
  L: [-9, 0.3, 4.5], //NODE L
  P: [-9, 0.3, 9], //NODE P
  Q: [-4.5, 0.3, 9], //NODE Q
  M: [-4.5, 0.3, 4.5], //NODE M
  E: [-4.5, 0.3, -4.5], //NODE E
  G: [4.65, 0.3, -4.65], //NODE G
};

const MapComponent = ({ mapImageVal }) => {
  const [mousePosition, setMousePosition] = useState(null);
  const [showHighlightPlane, setShowHighlightPlane] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const [hasObstacle, setHasObstacle] = useState(false);
  const [blockedEdges, setBlockedEdges] = useState([]);
  const [shortestAndSafestPath, setShortestAndSafestPath] = useState([
    "A",
    "E",
    "I",
    "J",
    "K",
    "O",
    "T",
  ]);

  function handleOnPointerMove(event) {
    const { point } = event;

    setHasObstacle(false);

    const highlightPosition = new Vector3(
      Math.floor(point.x),
      0,
      Math.floor(point.z),
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

  // function handleOnClick(event) {
  //   const { point } = event;

  //   const obstaclePosition = new Vector3(
  //     Math.floor(point.x),
  //     0.5,
  //     Math.floor(point.z),
  //   );

  //   const isOnPath = pathCoordinates.some((coord) => {
  //     const [x, y, z] = coord;
  //     if (
  //       x === obstaclePosition.x &&
  //       y === obstaclePosition.y - 0.5 &&
  //       z === obstaclePosition.z
  //     ) {
  //       // console.log(obstaclePosition);
  //       return true;
  //     }
  //   });

  //   if (isOnPath) {
  //     const hasObstacle = obstacles.some((obstacle) => {
  //       return obstacle.equals(obstaclePosition);
  //     });

  //     if (hasObstacle) {
  //       setHasObstacle(true);
  //     } else {
  //       setHasObstacle(false);
  //       setObstacles([...obstacles, obstaclePosition]);

  //       let newBlockedEdge;
  //       pathCoordinates.forEach((coord, index) => {
  //         // console.log(coord)
  //         if (obstaclePosition.equals(new Vector3(coord[0], 0.5, coord[2]))) {
  //           // console.log(
  //           //   obstaclePosition.equals(new Vector3(coord[0], 0.5, coord[2])),
  //           // );
  //           switch (index) {
  //             case 0:
  //             case 1:
  //             case 2:
  //               newBlockedEdge = 0;
  //               console.log("Edge 0");
  //               break;
  //             case 3:
  //             case 4:
  //               newBlockedEdge = 1;
  //               break;
  //             case 5:
  //             case 6:
  //               newBlockedEdge = 2;
  //               break;
  //             case 7:
  //             case 8:
  //             case 9:
  //               newBlockedEdge = 3;
  //               break;
  //             case 10:
  //             case 11:
  //             case 12:
  //               newBlockedEdge = 4;
  //               break;
  //             case 13:
  //             case 14:
  //             case 15:
  //               newBlockedEdge = 5;
  //               break;
  //             case 16:
  //             case 17:
  //             case 18:
  //               newBlockedEdge = 6;
  //               break;
  //             case 19:
  //             case 20:
  //             case 21:
  //               newBlockedEdge = 7;
  //               break;
  //             case 22:
  //             case 23:
  //             case 24:
  //               newBlockedEdge = 8;
  //               break;
  //             case 25:
  //             case 26:
  //             case 27:
  //               newBlockedEdge = 9;
  //               break;
  //             case 28:
  //             case 29:
  //             case 30:
  //               newBlockedEdge = 10;
  //               break;
  //             case 31:
  //             case 32:
  //             case 33:
  //               newBlockedEdge = 11;
  //               break;
  //             case 34:
  //             case 35:
  //             case 36:
  //               newBlockedEdge = 12;
  //               break;
  //             case 37:
  //             case 38:
  //             case 39:
  //               newBlockedEdge = 13;
  //               break;
  //             case 40:
  //             case 41:
  //             case 42:
  //               newBlockedEdge = 14;
  //               break;
  //             case 43:
  //             case 44:
  //             case 45:
  //               newBlockedEdge = 15;
  //               break;
  //             case 46:
  //             case 47:
  //             case 48:
  //               newBlockedEdge = 16;
  //               break;
  //             case 49:
  //             case 50:
  //             case 51:
  //               newBlockedEdge = 17;
  //               break;
  //             case 52:
  //             case 53:
  //             case 54:
  //               newBlockedEdge = 18;
  //               break;
  //             case 55:
  //             case 56:
  //               newBlockedEdge = 19;
  //               break;
  //             case 57:
  //             case 58:
  //             case 59:
  //               newBlockedEdge = 20;
  //               break;
  //             case 60:
  //             case 61:
  //             case 62:
  //               newBlockedEdge = 21;
  //               break;
  //             case 63:
  //             case 64:
  //             case 65:
  //               newBlockedEdge = 22;
  //               break;
  //             case 66:
  //             case 67:
  //               newBlockedEdge = 23;
  //               break;

  //             default:
  //               console.log("No edge to block");
  //               break;
  //           }
  //         }
  //       });

  //       setBlockedEdges([...blockedEdges, newBlockedEdge]);
  //     }
  //   }
  // }

  function handleOnClick(event) {
    const { point } = event;

    const obstaclePosition = new Vector3(
      Math.floor(point.x),
      0.5,
      Math.floor(point.z),
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
          // console.log(
          //   obstaclePosition.equals(new Vector3(coord[0], 0.5, coord[2])),
          // );
          switch (index) {
            case 0:
            case 1:
            case 2:
              newBlockedEdge = 0;
              break;
            case 3:
            case 4:
              newBlockedEdge = 1;
              break;
            case 5:
            case 6:
              newBlockedEdge = 2;
              break;
            case 7:
            case 8:
            case 9:
              newBlockedEdge = 3;
              break;
            case 10:
            case 11:
            case 12:
              newBlockedEdge = 4;
              break;
            case 13:
            case 14:
            case 15:
              newBlockedEdge = 5;
              break;
            case 16:
            case 17:
            case 18:
              newBlockedEdge = 6;
              break;
            case 19:
            case 20:
            case 21:
              newBlockedEdge = 7;
              break;
            case 22:
            case 23:
            case 24:
              newBlockedEdge = 8;
              break;
            case 25:
            case 26:
            case 27:
              newBlockedEdge = 9;
              break;
            case 28:
            case 29:
            case 30:
              newBlockedEdge = 10;
              break;
            case 31:
            case 32:
            case 33:
              newBlockedEdge = 11;
              break;
            case 34:
            case 35:
            case 36:
              newBlockedEdge = 12;
              break;
            case 37:
            case 38:
            case 39:
              newBlockedEdge = 13;
              break;
            case 40:
            case 41:
            case 42:
              newBlockedEdge = 14;
              break;
            case 43:
            case 44:
            case 45:
              newBlockedEdge = 15;
              break;
            case 46:
            case 47:
            case 48:
              newBlockedEdge = 16;
              break;
            case 49:
            case 50:
            case 51:
              newBlockedEdge = 17;
              break;
            case 52:
            case 53:
            case 54:
              newBlockedEdge = 18;
              break;
            case 55:
            case 56:
              newBlockedEdge = 19;
              break;
            case 57:
            case 58:
            case 59:
              newBlockedEdge = 20;
              break;
            case 60:
            case 61:
            case 62:
              newBlockedEdge = 21;
              break;
            case 63:
            case 64:
            case 65:
              newBlockedEdge = 22;
              break;
            case 66:
            case 67:
              newBlockedEdge = 23;
              break;
            default:
              console.log("No edge to block");
              break;
          }
        }
      });

      blockedEdges.includes(newBlockedEdge)
        ? setHasObstacle(true)
        : setObstacles([...obstacles, obstaclePosition]);

      setBlockedEdges([...blockedEdges, newBlockedEdge]);
    }
  }

  function getBlockedEdges() {
    const cleanData = blockedEdges.filter((item, index) => {
      return blockedEdges.indexOf(item) === index;
    });
    return cleanData;
  }

  const Plane = ({ mapVal }) => {
    const dextraMap = useLoader(TextureLoader, mapVal);

    return (
      <group>
        <mesh
          rotation-x={-Math.PI / 2}
          onPointerMove={handleOnPointerMove}
          onClick={handleOnClick}
          position={[0, -0.01, 0]}
          userData={{ name: "ground" }}
        >
          <planeGeometry args={[20.4, 20.4]} />
          <meshBasicMaterial map={dextraMap} side={DoubleSide} />
        </mesh>
        <Grid
          args={[20, 20]}
          cellColor={"white"}
          sectionThickness={0}
          cellThickness={1}
        />
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
      <DrawPath />
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
