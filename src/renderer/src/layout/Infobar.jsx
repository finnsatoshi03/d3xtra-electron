import InfobarForm from "../components/InfobarForm";
import HorizontalLine from "../components/HorizontalLine";
import useDijkstra from "../hooks/useDijkstra";
import Mode from "../components/Mode";

import locationIcon from "../../../../resources/icons/pin_location.png";
import motorIcon from "../../../../resources/icons/motorcycle.png";
import Route from "../components/Route";

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
    <div className="px-12 py-8">
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
    </div>
  );
}

export default Infobar;
