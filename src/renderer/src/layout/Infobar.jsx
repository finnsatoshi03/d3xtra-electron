import useDijkstra from "../hooks/useDijkstra";

import InfobarForm from "../components/InfobarForm";
import HorizontalLine from "../components/HorizontalLine";
import Mode from "../components/Mode";
import Route from "../components/Route";

import locationIcon from "../../../../resources/icons/pin_location.png";
import motorIcon from "../../../../resources/icons/motorcycle.png";
import backIcon from "../../../../resources/icons/chevron-left.png";

const tempData = [
  {},
  { icon: motorIcon, value: 30, unit: "mins." },
  { icon: locationIcon, value: 7.5, unit: "km." },
];
const routeTempData = [
  {},
  {
    value: 32,
    unit: "mins.",
    route: "Dating Daan",
    routeValue: 8.2,
    routeUnit: "km.",
  },
  {
    value: 1.8,
    unit: "hrs.",
    route: "Isang Daan",
    routeValue: 9.8,
    routeUnit: "km.",
  },
  {
    value: 3,
    unit: "hrs.",
    route: "Dalawang Daan",
    routeValue: 12,
    routeUnit: "km.",
  },
];

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
    <div className="rows grid grid-rows-[auto_auto_auto_auto_auto_1fr] px-12 py-8">
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
      <div className="py-6">
        <h1 className={fontHeader}>Other Routes</h1>
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
