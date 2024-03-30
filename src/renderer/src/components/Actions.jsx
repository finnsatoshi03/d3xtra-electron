import { useState } from "react";
import { useMaps } from "../contexts/MapContext";

function Actions({ icon, title, description, onClick }) {
  const { isInsertPressed, dispatch } = useMaps();

  const handleClick = () => {
    if (title === "Insert") {
      dispatch({ type: "insert/released" });
    } else {
      dispatch({ type: "insert/pressed" });
    }
    onClick(title);
  };

  return (
    <div
      className={`flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 ${title === "Insert" && isInsertPressed && "bg-blue-100 bg-opacity-20"} hover:bg-blue-100 hover:bg-opacity-20`}
      onClick={handleClick}
    >
      <div className="rounded-lg bg-blue200 p-2">
        <img
          src={icon}
          alt="View Icon"
          className={`size-[15px] transition-transform duration-500 ${title === "Insert" && isInsertPressed ? "rotate-45 transform" : ""}`}
        />
      </div>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs font-normal leading-3">{description}</p>
      </div>
    </div>
  );
}

export default Actions;
