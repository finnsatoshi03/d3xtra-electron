import Mode from "../components/Mode";

import { useMaps } from "../contexts/MapContext";
import {
  calculateMotorcyclingTime,
  calculateWalkingTime,
  convertDistanceToKm,
} from "../utils/helpers";

import locationIcon from "../../../../resources/icons/pin_location.png";
import motorIcon from "../../../../resources/icons/motorcycle.png";
import walkingIcon from "../../../../resources/icons/walking.png";

function DestinationModes() {
  const { distance: distanceInCm } = useMaps();

  const distanceInKm = convertDistanceToKm(distanceInCm);

  const walkingTime = calculateWalkingTime(distanceInKm); // 5 km/h
  const motorcyclingTime = calculateMotorcyclingTime(distanceInKm); // 60 km/h

  const modes = [
    { icon: walkingIcon, value: walkingTime, unit: "mins." },
    { icon: motorIcon, value: motorcyclingTime, unit: "mins." },
    { icon: locationIcon, value: distanceInKm, unit: "km." },
  ];

  // console.log(distanceInCm, distanceInKm, walkingTime, motorcyclingTime);

  return (
    <div className="my-8 flex items-center justify-center gap-2 xl:my-12 xl:gap-6">
      {!distanceInCm ? (
        <p className="text-xs text-gray200">
          <strong>Select a destination</strong> to see estimated travel times by
          walking and motorcycle.
        </p>
      ) : (
        modes.map((mode, index) => (
          <Mode
            key={index}
            icon={mode.icon}
            value={mode.value}
            unit={mode.unit}
          />
        ))
      )}
    </div>
  );
}

export default DestinationModes;
