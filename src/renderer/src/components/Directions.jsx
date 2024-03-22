import useDijkstra from "../hooks/useDijkstra";

import { fontHeader } from "../layout/Infobar";
import InfobarForm from "./InfobarForm";

function Directions() {
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

  return (
    <div className="">
      <h1 className={fontHeader}>Directions</h1>
      <InfobarForm handleSubmit={handleSubmit} />
    </div>
  );
}

export default Directions;
