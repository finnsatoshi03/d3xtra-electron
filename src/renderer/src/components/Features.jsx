/* eslint-disable prettier/prettier */
import { useState } from "react";

import { useMaps } from "../contexts/MapContext";
import { iconBase } from "../layout/Sidebar";
import leftIcon from "../../../../resources/icons/chevron-left.png";
import Submenu from "./Submenu";

function Features({ icon, title, disable }) {
  const { isInsertPressed, selectedFeature } = useMaps();
  const [openSubmenu, setOpenSubmenu] = useState(false);
  let closeTimeout = null;

  disable = title === "Obstacles" && selectedFeature !== "Interactive Map";

  const handleOpenSubmenu = () => {
    if (disable) return;
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      closeTimeout = null;
    }
    setOpenSubmenu(true);
  };

  const handleCloseSubmenu = () => {
    if (disable) return;
    closeTimeout = setTimeout(() => {
      setOpenSubmenu(false);
      closeTimeout = null;
    }, 50);
  };

  return (
    <div
      className="flex justify-between"
      onMouseEnter={handleOpenSubmenu}
      onMouseLeave={handleCloseSubmenu}
    >
      <div
        className={`mx-10 flex w-full items-center justify-between border-b-2 border-gray200 pb-2 xl:mx-16 ${disable ? "cursor-disable opacity-50" : "group cursor-pointer"}`}
      >
        <div
          className={`flex flex-grow-[0.7] items-center gap-2 rounded-xl bg-transparent transition-colors duration-200 ease-in-out group-hover:bg-blue200 `}
        >
          <div className="rounded-xl bg-blue200 p-2 group-hover:bg-transparent">
            <img src={icon} alt="Road Close Icon" className={iconBase} />
          </div>
          <p>{title}</p>
        </div>
        {isInsertPressed && title === "Obstacles" ? (
          <div className="rounded-full bg-green-200 px-1.5 py-0.5 text-xs font-normal">
            Active
          </div>
        ) : (
          <img
            src={leftIcon}
            alt="Chevron Left Icon"
            className={`h-[19px] w-[19px] rotate-180 transition-transform duration-300 ease-in-out group-hover:rotate-0`}
          />
        )}
      </div>
      {openSubmenu && <Submenu menuTitle={title} />}
    </div>
  );
}

export default Features;
