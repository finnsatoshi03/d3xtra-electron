import { useEffect } from "react";
import mapImage from "../../../../resources/map.png";
import MapRenderIn3D from "../components/MapRenderIn3D";
import useDijkstra from "../hooks/useDijkstra";

function Home() {
  const sourceImg = useDijkstra((state) => state.sourceImg);
  const setSourceImg = useDijkstra((state) => state.setSourceImg);

  useEffect(() => {
    setSourceImg(mapImage);
  }, []);

  return (
    <div className="h-screen bg-[#818286]">
      <MapRenderIn3D imageVal={sourceImg} />
    </div>
  );
}

export default Home;
