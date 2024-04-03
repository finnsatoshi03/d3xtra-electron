/* eslint-disable */

import { Text3D, Text } from "@react-three/drei";
import React, { useRef } from "react";
import roboto from "../../assets/fonts/Roboto_Regular.json";
import { useFrame, useThree } from "@react-three/fiber";
import { nodeCoordinates } from "../../data/coordinates";

const NodesIdentity = () => {
  const { camera } = useThree();
  const refs = useRef([]);

  const nodeNames = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
  ];

  useFrame(() => {
    camera.updateMatrixWorld();
    refs.current.forEach((ref) => {
      ref.lookAt(camera.position);
    });
  });

  // console.log(refs);

  return (
    <group>
      {nodeNames.map((node, index) => (
        <Text3D
          key={node}
          ref={(el) => (refs.current[index] = el)}
          font={roboto}
          position={nodeCoordinates[node].map((coord, index) =>
            index === 1 ? coord + 0.4 : coord,
          )}
          scale={0.5}
        >
          {node}
          {/* <meshBasicMaterial color="orange" /> */}
          <meshStandardMaterial color="orange" />
        </Text3D>
      ))}
    </group>
  );
};

export default NodesIdentity;
