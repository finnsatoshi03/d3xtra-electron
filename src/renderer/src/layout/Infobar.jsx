import HorizontalLine from "../components/HorizontalLine";
import Directions from "../components/Directions";
import DestinationModes from "../components/DestinationModes";
import OtherRoutes from "../components/OtherRoutes";
import BackButton from "../components/BackButton";

export const fontHeader = "text-sm font-bold";

function Infobar() {
  return (
    <div className="rows grid h-screen grid-rows-[auto_auto_auto_auto_230px_1fr] overflow-y-auto overflow-x-hidden px-12 py-8 xl:grid-rows-[auto_auto_auto_auto_350px_1fr]">
      <Directions />
      <HorizontalLine />
      <DestinationModes />
      <HorizontalLine />
      <OtherRoutes />
      <div className="self-end">
        <BackButton />
      </div>
    </div>
  );
}

export default Infobar;
