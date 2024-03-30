/* eslint-disable prettier/prettier */
import Logo from "../components/Logo";
import Description from "../components/Description";
import Features from "../components/Features";
import HorizontalLine from "../components/HorizontalLine";

import ObstacleIcon from "../../../../resources/icons/restrict.png";
import BookmarkIcon from "../../../../resources/icons/bookmark.png";

export const iconBase = "w-[24px] h-[24px]";

function Sidebar() {
  return (
    <div className="flex h-full flex-col items-center">
      <div className="flex flex-col items-center">
        <Logo />
        <HorizontalLine size="medium" />
        <Description />
        <HorizontalLine size="medium" />
      </div>
      <div className="mt-24 flex w-full flex-col gap-3 text-[12px] font-bold xl:mt-48 xl:text-sm">
        <Features icon={ObstacleIcon} title={"Obstacles"} />
        <Features icon={BookmarkIcon} title={"Saved Places"} />
      </div>
      <div className="my-4 w-[70%] xl:w-[65%]">
        <h1 className="text-xs font-semibold uppercase">Dynamic Obstacles</h1>
        <div className=" flex w-full flex-col rounded-xl bg-gray200 px-3 py-2 ">
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
