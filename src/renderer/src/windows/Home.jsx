import mapImage from "../../../../resources/map.png";
import MapRenderIn3D from "../components/MapRenderIn3D";

function Home() {
  return (
    <div className="h-full bg-[#818286]">
      <MapRenderIn3D imageVal={mapImage} />
    </div>
  );
}

export default Home;
