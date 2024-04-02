/* eslint-disable react/prop-types */
import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Vector3 } from "three";

const DrawPath = ({
  shortestAndSafestPath,
  currentPathIndex,
  setCurrentPathIndex,
  nodeCoordinates,
}) => {
  const coordinatesOfPath = useMemo(() => {
    return shortestAndSafestPath.slice(0, currentPathIndex).map((node) => {
      const [x, y, z] = nodeCoordinates[node];
      return new Vector3(x, y - 0.2, z);
    });
  }, [shortestAndSafestPath, currentPathIndex]);

  const frameCount = useRef(0);

  // console.log("drawPath Renders");

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
export default DrawPath;
