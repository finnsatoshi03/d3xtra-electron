import { fontHeader } from "../layout/Infobar";
import { getShortestPath } from "../services/apiShortestPath";
import InfobarForm from "./InfobarForm";

function Directions() {
  async function handleSubmit(e, currentLocation, destination, graph) {
    e.preventDefault();
    getShortestPath(currentLocation, destination, graph);
  }

  return (
    <div className="">
      <h1 className={fontHeader}>Directions</h1>
      <InfobarForm handleSubmit={handleSubmit} />
    </div>
  );
}

export default Directions;
