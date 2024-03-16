import { useState } from "react";

import Input from "./Input";

import LocationIcon from "../../../../resources/icons/location.png";
import DashedIcon from "../../../../resources/icons/dash.png";

function InfobarForm({ handleSubmit }) {
  const [currentLocation, setCurrentLocation] = useState("");
  const [destination, setDestination] = useState("");
  return (
    <form className="my-6" onSubmit={handleSubmit}>
      <div className="mb-4 flex gap-4">
        <div className="h-[1.35rem] w-[1.35rem] self-end rounded-full border-4 border-gray200">
          <div className="h-full w-full rounded-full border-4 border-black"></div>
        </div>
        <Input
          label="Your Current Location"
          placeholder="Input your current location"
          value={currentLocation}
          setter={setCurrentLocation}
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
        />
      </div>
      <button>Temp Submit</button>
    </form>
  );
}

export default InfobarForm;
