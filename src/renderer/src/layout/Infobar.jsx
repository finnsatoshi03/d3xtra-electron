/* eslint-disable prettier/prettier */
import { useState } from "react";
import axios from "axios";

import LocationIcon from "../../../../resources/icons/location.png";
import DashedIcon from "../../../../resources/icons/dash.png";

import Input from "../components/Input";
import useDijkstra from "../hooks/useDijkstra";

function Infobar() {
  const [currentLocation, setCurrentLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [encodedImage, setEncodedImage] = useState("");
  const setImageData = useDijkstra((state) => state.setSourceImg);
  const fetchSourceImg = useDijkstra((state) => state.fetchSourceImg);

  async function handleSubmit(e) {
    e.preventDefault();
    const start = "A";
    const end = "B";
    const url = `http://localhost:5000/api/get/shortest/path/${start}/${end}`;
    fetchSourceImg(url).then((imageData) => {
      setImageData(`data:image/png;base64,${imageData}`);
    }).catch((error) => {
      console.error("Error fetching image:", error);
    });
  }


  // handleSubmit()
  return (
    <div className="px-12 py-8">
      <h1 className="text-sm font-bold">Directions</h1>
      <button onClick={handleSubmit}>asda</button>
      {encodedImage && (
        <img
          src={`data:image/png;base64,${encodedImage}`}
          alt="Encoded Image"
        />
      )}
    </div>
    // <div className="px-12 py-8">
    //   {/*directions*/}
    //   <div className="">
    //     <h1 className="text-sm font-bold">Directions</h1>
    //     <form className="my-6" onSubmit={handleSubmit}>
    //       <div className="mb-4 flex gap-4">
    //         <div className="h-[1.35rem] w-[1.35rem] self-end rounded-full border-4 border-gray200">
    //           <div className="h-full w-full rounded-full border-4 border-black"></div>
    //         </div>
    //         <Input
    //           label="Your Current Location"
    //           placeholder="Input your current location"
    //           value={currentLocation}
    //           setter={setCurrentLocation}
    //         />
    //       </div>
    //       <div className="relative">
    //         <img
    //           src={DashedIcon}
    //           alt="Dash Line Connect from Point A to B"
    //           className="absolute left-[-3px] top-[-13px] m-0 h-[1.7rem] rotate-[-45deg]"
    //         />
    //       </div>
    //       <div className="flex gap-4">
    //         <div className="self-end">
    //           <img src={LocationIcon} alt="Near Me Icon" className="h-6 w-6" />
    //         </div>
    //         <Input
    //           label="Your Destination"
    //           placeholder="Input your destination"
    //           value={destination}
    //           setter={setDestination}
    //         />
    //       </div>
    //       <button>Temp Submit</button>
    //     </form>
    //   </div>
    // </div>
  );
}

export default Infobar;
