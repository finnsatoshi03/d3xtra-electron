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
      <div className="my-24 mb-8 flex w-full flex-col gap-3 text-[12px] font-bold xl:my-48 xl:text-sm">
        <Features icon={ObstacleIcon} title={"Obstacles"} />
        <Features icon={BookmarkIcon} title={"Saved Places"} />
      </div>
    </div>
  );
}

export default Sidebar;
