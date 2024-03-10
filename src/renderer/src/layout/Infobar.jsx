/* eslint-disable prettier/prettier */
import { useState } from "react";

const label =
  "text-xs text-gray200 font-normal flex flex-col relative transition-all duration-300 ease-in-out";
const input = "text-base text-black font-normal";

function Infobar() {
  const [currentLocation, setCurrentLocation] = useState("");
  const [destination, setDestination] = useState("");

  return (
    <div className="px-12 py-8">
      {/*directions*/}
      <div className="">
        <h1 className="text-sm font-bold">Directions</h1>
        <form className="my-8">
          <div>
            <div className="relative mb-8">
              <label
                htmlFor="current-location"
                className={`${label} ${currentLocation ? "top-0" : "top-[20px]"}`}
              >
                Your Current Location
              </label>
              <input
                type="text"
                id="current-location"
                name="current-location"
                className={input}
                value={currentLocation}
                onChange={(e) => setCurrentLocation(e.target.value)}
              />
            </div>
          </div>
          <div className="relative">
            <label
              htmlFor="destination"
              className={`${label} ${destination ? "top-0" : "top-[20px]"}`}
            >
              Destination
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              className={input}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Infobar;
