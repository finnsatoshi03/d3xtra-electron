import { useState } from "react";

import Logo from "../components/Logo";
import Description from "../components/Description";
import Features from "../components/Features";
import HorizontalLine from "../components/HorizontalLine";

import ObstacleIcon from "../../../../resources/icons/restrict.png";
import BookmarkIcon from "../../../../resources/icons/bookmark.png";
import ExtraFeatures from "../components/ExtraFeatures";

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
      <div className="mt-6 flex w-full flex-col gap-3 text-[12px] font-bold xl:mt-24 xl:text-sm">
        <Features icon={ObstacleIcon} title={"Obstacles"} />
        <Features icon={BookmarkIcon} title={"Saved Places"} />
      </div>
      <ExtraFeatures />
    </div>
  );
}

export default Sidebar;
