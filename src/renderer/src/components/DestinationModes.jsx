import Mode from "../components/Mode";

import locationIcon from "../../../../resources/icons/pin_location.png";
import motorIcon from "../../../../resources/icons/motorcycle.png";
import walkingIcon from "../../../../resources/icons/walking.png";
import { useMaps } from "../contexts/MapContext";

function DestinationModes() {
  const { distance: distanceInCm } = useMaps();

  // scaling factor to represent the distance in a way that looks like km
  const distanceInKm = (distanceInCm / 100).toFixed(2);

  const walkingTime = ((distanceInKm / 5) * 60).toFixed(0); // 5 km/h
  const motorcyclingTime = ((distanceInKm / 60) * 60).toFixed(0); // 60 km/h

  const modes = [
    { icon: walkingIcon, value: walkingTime, unit: "mins." },
    { icon: motorIcon, value: motorcyclingTime, unit: "mins." },
    { icon: locationIcon, value: distanceInKm, unit: "km." },
  ];

  // console.log(distanceInCm, distanceInKm, walkingTime, motorcyclingTime);

  return (
    <div className="my-8 flex items-center justify-center gap-2 xl:my-12 xl:gap-6">
      {modes.map((mode, index) => (
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
