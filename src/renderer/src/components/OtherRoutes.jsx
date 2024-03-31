import { useMaps } from "../contexts/MapContext";
import { routeTempData } from "../data/tempData";
import { fontHeader } from "../layout/Infobar";
import { calculateWalkingTime, convertDistanceToKm } from "../utils/helpers";
import Route from "./Route";

function OtherRoutes() {
  const { otherPaths, distance } = useMaps();

  // let otherPathsExcludingShortest;

  // if (Array.isArray(otherPaths)) {
  //   const indexOfShortest = otherPaths.reduce(
  //     (lowestIndex, currentPath, currentIndex) => {
  //       return currentPath[1] < otherPaths[lowestIndex][1]
  //         ? currentIndex
  //         : lowestIndex;
  //     },
  //     0,
  //   );

  //   otherPathsExcludingShortest = [...otherPaths];
  //   otherPathsExcludingShortest.splice(indexOfShortest, 1);
  // }

  const transformedPaths = Array.isArray(otherPaths)
    ? otherPaths.map((path) => {
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

  if (Array.isArray(transformedPaths)) {
    transformedPaths.sort((a, b) => a.value - b.value);
  }

  // console.log(otherPathsExcludingShortest);
  // console.log(distance);

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
              highlight={index === 0}
              value={route.value}
              unit={route.unit}
              route={route.route}
              routeUnit={route.routeUnit}
              routeValue={route.routeValue}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default OtherRoutes;
