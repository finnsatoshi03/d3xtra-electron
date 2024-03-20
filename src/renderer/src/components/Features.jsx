/* eslint-disable prettier/prettier */
import { useState } from "react";

import { iconBase, lineBase } from "../layout/Sidebar";
import LeftIcon from "../../../../resources/icons/chevron-left.png";

function Features({ icon, title }) {
  const [openSubmenu, setOpenSubmenu] = useState(false);

  return (
    <div className="flex justify-between">
      <div
        className={`${lineBase} group mx-10 flex w-full cursor-pointer items-center justify-between pb-2 xl:mx-16`}
        onMouseEnter={() => setOpenSubmenu(true)}
        onMouseLeave={() => setOpenSubmenu(false)}
      >
        <div
          className={`flex flex-grow-[0.7] items-center gap-2 rounded-xl bg-transparent transition-colors duration-200 ease-in-out group-hover:bg-blue200`}
        >
          <div className="rounded-xl bg-blue200 p-2 group-hover:bg-transparent">
            <img src={icon} alt="Road Close Icon" className={iconBase} />
          </div>
          <p>{title}</p>
        </div>
        <img
          src={LeftIcon}
          alt="Chevron Left Icon"
          className={`h-[19px] w-[19px] rotate-180 transition-transform duration-300 ease-in-out group-hover:rotate-0`}
        />
      </div>
      {openSubmenu && (
        <div
          className="relative left-2 z-10 content-none xl:left-3"
          style={{ height: 0 }}
        >
          <div
            className={`absolute w-[250px] rounded-xl bg-[#A8A8A8] bg-opacity-70 px-4 py-2 ${title === "" ? "top-[-35px]" : "top-0"}`}
          >
            <div>
              <p className="text-sm font-semibold leading-3">View</p>
              <p className="text-xs font-normal">
                View obstacles effortlessly.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Features;
