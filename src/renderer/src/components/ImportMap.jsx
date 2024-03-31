import { useRef } from "react";
import { useMaps } from "../contexts/MapContext";

import addIcon from "../../../../resources/icons/light-add.png";
import changeIcon from "../../../../resources/icons/light-change.png";

function ImportMap() {
  const { dispatch, base64map } = useMaps();
  const fileInputRef = useRef();

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    dispatch({ type: "reset" });

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");
      // console.log(base64String);
      // console.log(file.name, base64String);
      dispatch({ type: "base64/encoded", payload: base64String });
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="mt-2 w-full rounded-xl bg-gray200 bg-opacity-30 px-[3%] py-[1%] text-xs font-semibold shadow-md xl:text-sm">
      <div className="flex w-full flex-col items-center justify-center p-[3%]">
        <input
          type="file"
          accept=".jpeg, .jpg, .png"
          ref={fileInputRef}
          onChange={handleFileChange}
          hidden
        />
        <img
          src={base64map ? changeIcon : addIcon}
          className="my-2 size-8 rounded-full bg-[#005cc8] p-2 hover:cursor-pointer"
          onClick={handleImageClick}
        />
        <h1 className="text-[14px]">
          {base64map ? "Change Your Map" : "Import Your Map"}
        </h1>
        <p className="w-3/4 text-center text-[10px] font-normal leading-3">
          Upload a <span className="font-bold text-[#005cc8]">custom map</span>{" "}
          with your obstacles
        </p>
      </div>
    </div>
  );
}

export default ImportMap;
