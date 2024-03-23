import { fontHeader } from "../layout/Infobar";
import InfobarForm from "./InfobarForm";

function Directions() {
  async function handleSubmit(e, currentLocation, destination) {
    e.preventDefault();
  }

  return (
    <div className="">
      <h1 className={fontHeader}>Directions</h1>
      <InfobarForm handleSubmit={handleSubmit} />
    </div>
  );
}

export default Directions;
