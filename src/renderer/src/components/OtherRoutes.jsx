import { useState } from "react";
import { useMaps } from "../contexts/MapContext";
import { fontHeader } from "../layout/Infobar";
import { calculateWalkingTime, convertDistanceToKm } from "../utils/helpers";
import Route from "./Route";

function OtherRoutes() {
  const { otherPaths, paths, dispatch } = useMaps();
  const [selectedRoute, setSelectedRoute] = useState(0);

  // console.log(paths);

  const transformedPaths = Array.isArray(otherPaths)
    ? otherPaths.map((path) => {
        otherPaths?.sort((a, b) => a[1] - b[1]);
        const route = path[0].slice(1, -1).join(", "); // remove the first and last element, that's start and end nodes
        const distanceInKm = convertDistanceToKm(path[1]);
        const walkingTime = calculateWalkingTime(distanceInKm);

        return {
          value: walkingTime,
          unit: "mins.",
          route,
          routeValue: distanceInKm,
          routeUnit: "km.",
        };
      })
    : [];

  // if (Array.isArray(transformedPaths)) {
  //   transformedPaths.sort((a, b) => a.value - b.value);
  // }

  const handleRouteClick = (index) => {
    setSelectedRoute(index);
    // console.log(`Route ${index + 1} was clicked.`);
    const paths = otherPaths[index][0];
    const distance = otherPaths[index][1];
    // console.log(distance, paths);
    dispatch({
      type: "path/update",
      payload: { paths: paths, distance: distance },
    });
  };

  return (
    <div className="pt-6">
      <h1 className={fontHeader}>Other Routes</h1>
      <div className="scroller m-0 h-[120%] overflow-y-hidden hover:overflow-y-auto xl:h-[150%]">
        {transformedPaths?.length === 0 ? (
          <p className="text-xs text-gray200">
            No other routes available. <br />
            <strong>Please insert your start and end points first.</strong>
          </p>
        ) : (
          transformedPaths.map((route, index) => (
            <Route
              key={index}
              index={index + 1}
              highlight={index === selectedRoute}
              value={route.value}
              unit={route.unit}
              route={route.route}
              routeUnit={route.routeUnit}
              routeValue={route.routeValue}
              onClick={() => handleRouteClick(index)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default OtherRoutes;
