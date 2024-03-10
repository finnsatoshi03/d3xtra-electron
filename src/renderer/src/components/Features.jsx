/* eslint-disable prettier/prettier */
import LeftIcon from "../../../../resources/icons/chevron-left.png";
import { iconBase, lineBase } from "../layout/Sidebar";

function Features({ icon, title }) {
  return (
    <div
      className={`${lineBase} group mx-10 flex cursor-pointer items-center justify-between pb-2 xl:mx-16`}
    >
      <div
        className={`group-hover:bg-blue200 flex flex-grow-[0.7] items-center gap-2 rounded-xl bg-transparent transition-colors duration-300 ease-in-out`}
      >
        <div className="bg-blue200 rounded-xl p-2 group-hover:bg-transparent">
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
  );
}

export default Features;
