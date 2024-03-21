import useDijkstra from "../hooks/useDijkstra";
import { tempData, routeTempData } from "../data/tempData";

import InfobarForm from "../components/InfobarForm";
import HorizontalLine from "../components/HorizontalLine";
import Mode from "../components/Mode";
import Route from "../components/Route";

import backIcon from "../../../../resources/icons/chevron-left.png";

const fontHeader = "text-sm font-bold";

function Infobar() {
  const setImageData = useDijkstra((state) => state.setSourceImg);
  const fetchSourceImg = useDijkstra((state) => state.fetchSourceImg);

  async function handleSubmit(e, currentLocation, destination) {
    e.preventDefault();
    const start = currentLocation;
    const end = destination;
    const url = `http://localhost:5000/api/get/shortest/path/${start}/${end}`;
    fetchSourceImg(url)
      .then((imageData) => {
        setImageData(`data:image/png;base64,${imageData}`);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }

  // handleSubmit()
  return (
    <div className="rows grid h-screen grid-rows-[auto_auto_auto_auto_230px_1fr] overflow-y-auto overflow-x-hidden px-12 py-8 xl:grid-rows-[auto_auto_auto_auto_350px_1fr]">
      {/*directions*/}
      <div className="">
        <h1 className={fontHeader}>Directions</h1>
        <InfobarForm handleSubmit={handleSubmit} />
      </div>
      <HorizontalLine />
      {/* modes of destination */}
      <div className="my-8 flex items-center justify-center gap-2 xl:my-12 xl:gap-6">
        {tempData.map((mode, index) => (
          <Mode
            key={index}
            icon={mode.icon}
            value={mode.value}
            unit={mode.unit}
          />
        ))}
      </div>
      <HorizontalLine />
      {/* other routes */}
      <div className="pt-6">
        <h1 className={fontHeader}>Other Routes</h1>
        <div className="scroller m-0 h-4/5 overflow-y-hidden hover:overflow-y-auto">
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
      {/* back */}
      <div className="self-end">
        <button className="flex items-center gap-2 font-bold">
          <span>
            <img src={backIcon} className="size-3.5" />{" "}
          </span>
          Back
        </button>
      </div>
    </div>
  );
}

export default Infobar;
