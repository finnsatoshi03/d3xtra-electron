/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useMaps } from "../contexts/MapContext";

import Input from "./Input";

import LocationIcon from "../../../../resources/icons/location.png";
import DashedIcon from "../../../../resources/icons/dash.png";

function InfobarForm({ handleSubmit }) {
  const { graph, selectedFeature } = useMaps();
  const [currentLocation, setCurrentLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [currentLocationNodes, setCurrentLocationNodes] = useState([]);
  const [destinationNodes, setDestinationNodes] = useState([]);
  const [currentLocationError, setCurrentLocationError] = useState(null);
  const [destinationError, setDestinationError] = useState(null);

  const disable = selectedFeature !== "Interactive Map";

  useEffect(() => {
    const nodes = Object.keys(graph);
    setCurrentLocationNodes(nodes.filter((node) => node !== destination));
    setDestinationNodes(nodes.filter((node) => node !== currentLocation));
  }, [graph, currentLocation, destination]);

  const validateInput = (inputName) => {
    // Add this function
    if (inputName === "currentLocation" && !currentLocation) {
      setCurrentLocationError("Current location is required");
    } else if (inputName === "destination" && !destination) {
      setDestinationError("Destination is required");
    }
  };

  return (
    <form
      className={`${disable ? "opacity-50" : ""} my-6`}
      onSubmit={(e) => handleSubmit(e, currentLocation, destination, graph)}
    >
      <div className="mb-4 flex gap-4">
        <div className="h-[1.35rem] w-[1.35rem] self-end rounded-full border-4 border-gray200">
          <div className="h-full w-full rounded-full border-4 border-black"></div>
        </div>
        <Input
          label="Your Current Location"
          placeholder="Input your current location"
          value={currentLocation}
          setter={setCurrentLocation}
          disabled={disable}
          options={currentLocationNodes}
          handleSubmit={() => validateInput("currentLocation")}
          error={currentLocationError}
        />
      </div>
      <div className="relative">
        <img
          src={DashedIcon}
          alt="Dash Line Connect from Point A to B"
          className="absolute left-[-3px] top-[-13px] m-0 h-[1.7rem] rotate-[-45deg]"
        />
      </div>
      <div className="flex gap-4">
        <div className="self-end">
          <img src={LocationIcon} alt="Near Me Icon" className="h-6 w-6" />
        </div>
        <Input
          label="Your Destination"
          placeholder="Input your destination"
          value={destination}
          setter={setDestination}
          disabled={disable}
          options={destinationNodes}
          handleSubmit={() => validateInput("destination")}
          error={destinationError}
        />
      </div>
      <button disabled={disable}>Temp Submit</button>
    </form>
  );
}

export default InfobarForm;
