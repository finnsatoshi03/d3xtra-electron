import { routeTempData } from "../data/tempData";
import { fontHeader } from "../layout/Infobar";
import Route from "./Route";

function OtherRoutes() {
  return (
    <div className="pt-6">
      <h1 className={fontHeader}>Other Routes</h1>
      <div className="scroller m-0 h-4/5 overflow-y-hidden hover:overflow-y-auto xl:h-[150%]">
        {routeTempData.map((route, index) => (
          <Route
            key={index}
            index={index + 1}
            value={route.value}
            unit={route.unit}
            route={route.route}
            routeUnit={route.routeUnit}
            routeValue={route.routeValue}
          />
        ))}
      </div>
    </div>
  );
}

export default OtherRoutes;
