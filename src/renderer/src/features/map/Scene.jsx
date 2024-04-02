/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Vector3 } from "three";

import { useMaps } from "../../contexts/MapContext";
import { useBlockedEdge } from "../../hooks/useBlockedEdge";
import { pathCoordinates, nodeCoordinates } from "../../data/coordinates";

import MapPlane from "./MapPlane";
import Obstacles from "./Obstacles";
import HighlightPlane from "./HighlightPlane";
import DrawPath from "./DrawPath";
import LocationPin from "./LocationPin";

import mapGLTF from "../../../../../resources/map.glb";
import pinModelPath from "../../../../../resources/map_pin.glb";
import endPinPath from "../../../../../resources/end_pin.glb";
import obstacleModelPath from "../../../../../resources/obstacle.glb";

function Scene() {
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

  return (
    <>
      <MapPlane
        gltfPath={mapGLTF}
        mapImage={mapImage}
        insertObstacle={insertObstacle}
        shortestAndSafestPath={shortestAndSafestPath}
        handleOnPointerMove={handleOnPointerMove}
        handleOnClick={handleOnClick}
      />
      {obstacles.map((position, index) => (
        <Obstacles
          key={index}
          position={position}
          obstacleModelPath={obstacleModelPath}
        />
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
          nodeCoordinates={nodeCoordinates}
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
}

export default Scene;
