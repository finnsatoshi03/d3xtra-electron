import { tempData } from "../data/tempData";
import Mode from "../components/Mode";

function DestinationModes() {
  return (
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
  );
}

export default DestinationModes;
