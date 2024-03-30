import { useMaps } from "../contexts/MapContext";
import { fontHeader } from "../layout/Infobar";
import { getShortestPath } from "../services/apiShortestPath";
import InfobarForm from "./InfobarForm";

function Directions() {
  const { dispatch, error } = useMaps();

  async function handleSubmit(e, currentLocation, destination, graph) {
    if (e) {
      e.preventDefault();
    }
    getShortestPath(currentLocation, destination, graph, dispatch);
  }

  return (
    <div className="">
      <h1 className={fontHeader}>Directions</h1>
      <InfobarForm handleSubmit={handleSubmit} />
    </div>
  );
}

export default Directions;
