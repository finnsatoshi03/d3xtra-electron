/* eslint-disable prettier/prettier */
import Logo from "../components/Logo";
import Description from "../components/Description";
import Features from "../components/Features";
import ObstacleIcon from "../../../../resources/icons/restrict.png";
import BookmarkIcon from "../../../../resources/icons/bookmark.png";

export const lineBase = "border-b-2 border-gray200";
export const lineYBase = "border-y-2 border-gray200";
export const iconBase = "w-[24px] h-[24px]";

function Sidebar() {
  return (
    <div className="flex h-full flex-col items-center justify-between">
      <div>
        <Logo />
        <Description />
      </div>
      <div className="mb-8 flex w-full flex-col gap-3 text-[12px] font-bold xl:text-sm">
        <Features icon={ObstacleIcon} title={"Obstacles"} />
        <Features icon={BookmarkIcon} title={"Saved Places"} />
      </div>
    </div>
  );
}

export default Sidebar;
