/* eslint-disable prettier/prettier */
import { useState } from "react";

import axios from "axios";
import InfobarForm from "../components/InfobarForm";

function Infobar() {
  const [currentLocation, setCurrentLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [encodedImage, setEncodedImage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const start = "A";
    const end = "B";
    await axios
      .get(`http://localhost:5000/api/get/shortest/path/${start}/${end}`)
      .then((response) => {
        // console.log(response.data);
        const imageData = response.data.data.encoded_image;
        setEncodedImage(imageData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    console.log("dito mo nalang lagay tol");
  }
  // handleSubmit()
  return (
    <div className="px-12 py-8">
      {/*directions*/}
      <div className="">
        <h1 className="text-sm font-bold">Directions</h1>
        <InfobarForm handleSubmit={handleSubmit} />
      </div>
      {/* </div> */}

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
