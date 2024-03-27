import mapImage from "../../../../resources/map_dextra.png";
import MapComponent from "../components/MapComponent";

function Home() {
  return (
    <div className="h-screen bg-[#000]">
      <MapComponent mapImageVal={mapImage} />
    </div>
  );
}

export default Home;
