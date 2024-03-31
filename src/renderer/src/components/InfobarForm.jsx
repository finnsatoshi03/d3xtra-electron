/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useMaps } from "../contexts/MapContext";

import Input from "./Input";

import LocationIcon from "../../../../resources/icons/location.png";
import DashedIcon from "../../../../resources/icons/dash.png";

function InfobarForm({ handleSubmit }) {
  const { graph, selectedFeature, currentLocation, destination, dispatch } =
    useMaps();
  const [currentLocationNodes, setCurrentLocationNodes] = useState([]);
  const [destinationNodes, setDestinationNodes] = useState([]);
  const [currentLocationError, setCurrentLocationError] = useState(null);
  const [destinationError, setDestinationError] = useState(null);

  // const disable = selectedFeature !== "Interactive Map";

  useEffect(() => {
    const nodes = Object.keys(graph);
    setCurrentLocationNodes(nodes.filter((node) => node !== destination));
    setDestinationNodes(nodes.filter((node) => node !== currentLocation));
  }, [graph, currentLocation, destination]);

  const validateInput = (inputName) => {
    if (inputName === "currentLocation" && !currentLocation) {
      setCurrentLocationError("Current location is required");
    } else if (inputName === "destination" && !destination) {
      setDestinationError("Destination is required");
    }
  };

  const handleSubmitWithValidation = (
    e,
    currentLocation,
    destination,
    graph,
  ) => {
    if (!currentLocation || !destination) {
      validateInput("currentLocation");
      validateInput("destination");
      return;
    }
    handleSubmit(e, currentLocation, destination, graph);
  };

  return (
    <form
      className={`my-6`}
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
          setter={(value) =>
            dispatch({
              type: "currentLocation/updated",
              payload: value,
            })
          }
          options={currentLocationNodes}
          handleSubmit={() => {
            handleSubmitWithValidation(
              null,
              currentLocation,
              destination,
              graph,
            );
          }}
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
          setter={(value) =>
            dispatch({
              type: "destination/updated",
              payload: value,
            })
          }
          options={destinationNodes}
          handleSubmit={() => {
            handleSubmitWithValidation(
              null,
              currentLocation,
              destination,
              graph,
            );
          }}
          error={destinationError}
        />
      </div>
    </form>
  );
}

export default InfobarForm;
