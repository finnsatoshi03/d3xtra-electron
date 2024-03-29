import { useState } from "react";

function Actions({ icon, title, description, onClick }) {
  const [isInsertActive, setIsInsertActive] = useState(false);

  const handleClick = () => {
    if (title === "Insert") {
      setIsInsertActive(!isInsertActive);
    }
    onClick(title);
  };

  return (
    <div
      className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-blue-100 hover:bg-opacity-20"
      onClick={handleClick}
    >
      <div className="rounded-lg bg-blue200 p-2">
        <img
          src={icon}
          alt="View Icon"
          className={`size-[15px] transition-transform duration-500 ${title === "Insert" && isInsertActive ? "rotate-45 transform" : ""}`}
        />
      </div>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs font-normal leading-3">{description}</p>
      </div>
    </div>
  );
}

export default Actions;
