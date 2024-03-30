import { useState } from "react";
import { useMaps } from "../contexts/MapContext";
import { action as actions } from "../data/actions";
import Actions from "./Actions";

function Submenu({ menuTitle }) {
  const { dispatch } = useMaps();
  const [isInsertActive, setIsInsertActive] = useState(false);

  const handleActionClick = (actionTitle) => {
    if (actionTitle === "Insert") {
      setIsInsertActive(!isInsertActive);
      dispatch({ type: isInsertActive ? "insert/released" : "insert/pressed" });
    } else {
      setIsInsertActive(false);
      dispatch({ type: "insert/released" });
    }
  };

  return (
    <div
      className="relative left-2 z-10 content-none xl:left-3"
      style={{ height: 0 }}
    >
      <div
        className={`absolute flex w-[280px] flex-col rounded-xl bg-[#A8A8A8] bg-opacity-90 px-4 py-3 ${menuTitle === "" ? "top-[-35px]" : "top-0"} animate-translateY`}
      >
        {menuTitle === "Obstacles"
          ? actions.map((action, index) => (
              <Actions
                key={index}
                icon={action.icon}
                title={action.title}
                description={action.description}
                menuTitle={menuTitle}
                onClick={handleActionClick}
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default Submenu;
