/* eslint-disable prettier/prettier */
import Logo from "../components/Logo";
import ObstacleIcon from "../../../../resources/icons/restrict.png";
import LeftIcon from "../../../../resources/icons/chevron-left.png";
import Description from "../components/Description";

const lineBase = "border-b-2 border-gray200";
export const lineYBase = "border-y-2 border-gray200";
const iconBase = "w-[24px] h-[24px]";

function Sidebar() {
  return (
    <div className="flex h-full flex-col items-center justify-between">
      <div>
        <Logo />
        <Description />
      </div>
      <div className="mb-8 flex w-full flex-col gap-3 text-sm font-bold">
        <div
          className={`${lineBase} mx-10 flex cursor-pointer items-center justify-between pb-2 xl:mx-16`}
        >
          <div
            className={`bg-blue200 flex items-center gap-4 rounded-xl px-3 py-2`}
          >
            <img
              src={ObstacleIcon}
              alt="Road Close Icon"
              className={iconBase}
            />
            <p>Sample</p>
          </div>
          <img
            src={LeftIcon}
            alt="Chevron Left Icon"
            className={`${iconBase}`}
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
