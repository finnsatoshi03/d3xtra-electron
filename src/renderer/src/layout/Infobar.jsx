import InfobarForm from "../components/InfobarForm";
import HorizontalLine from "../components/HorizontalLine";
import useDijkstra from "../hooks/useDijkstra";
import Mode from "../components/Mode";

import locationIcon from "../../../../resources/icons/pin_location.png";
import motorIcon from "../../../../resources/icons/motorcycle.png";

const tempData = [
  {},
  { icon: motorIcon, value: 30, unit: "mins." },
  { icon: locationIcon, value: 7.5, unit: "km." },
];

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
        <h1 className="text-sm font-bold">Directions</h1>
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
    </div>
  );
}

export default Infobar;
