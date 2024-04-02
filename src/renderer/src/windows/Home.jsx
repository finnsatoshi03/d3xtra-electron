// import mapImage from "../../../../resources/map_dextra.png";
import mapGLTF from "../../../../resources/map.gltf";
import MapComponent from "../components/MapComponent";

function Home() {
  return (
    <div className="h-screen bg-[#000]">
      <MapComponent gltfPath={mapGLTF} />
    </div>
  );
}

export default Home;
