/* eslint-disable prettier/prettier */
import { useState } from "react";
import LocationIcon from "../../../../resources/icons/location.png";

const label =
  "text-xs text-gray200 font-normal flex flex-col relative transition-all duration-300 ease-in-out";
const input = "text-base text-black font-normal";

function Infobar() {
  const [currentLocation, setCurrentLocation] = useState("");
  const [destination, setDestination] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("dito mo nalang lagay tol");
  }

  return (
    <div className="px-12 py-8">
      {/*directions*/}
      <div className="">
        <h1 className="text-sm font-bold">Directions</h1>
        <form className="my-6" onSubmit={handleSubmit}>
          <div className="mb-6 flex gap-4">
            <div className="h-5 w-5 self-end rounded-full border-4 border-gray200">
              <div className="h-full w-full rounded-full border-4 border-black"></div>
            </div>
            <div className="relative">
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
          <div className="flex gap-4">
            <div className="self-end">
              <img src={LocationIcon} alt="Near Me Icon" className="h-6 w-6" />
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
          </div>
          <button>Temp Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Infobar;
