/* eslint-disable react/prop-types */
import walkingIcon from "../../../../resources/icons/walking.png";

function Mode({ value = 1.45, unit = "min", icon = walkingIcon }) {
  // console.log(value);

  return (
    <div className="flex flex-col">
      <img src={icon} className="size-[20px] xl:size-[25px]" />
      <div className="grid w-[60px] grid-cols-[auto_1fr] gap-0.5 xl:gap-1">
        <h1 className="text-xs font-semibold lg:text-sm">{value}</h1>
        <p className="text-[0.6rem] text-gray200 lg:text-xs">{unit}</p>
      </div>
    </div>
  );
}

export default Mode;
