import { action as actions } from "../data/actions";
import Actions from "./Actions";

function Submenu({ menuTitle }) {
  return (
    <div
      className="relative left-2 z-10 content-none xl:left-3"
      style={{ height: 0 }}
    >
      <div
        className={`absolute flex w-[280px] flex-col gap-4 rounded-xl bg-[#A8A8A8] bg-opacity-90 px-4 py-3 ${menuTitle === "" ? "top-[-35px]" : "top-0"} animate-translateY`}
      >
        {menuTitle === "Obstacles"
          ? actions.map((action, index) => (
              <Actions
                key={index}
                icon={action.icon}
                title={action.title}
                description={action.description}
                menuTitle={menuTitle}
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default Submenu;
