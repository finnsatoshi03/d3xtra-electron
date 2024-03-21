import backIcon from "../../../../resources/icons/chevron-left.png";

function BackButton() {
  return (
    <div className="self-end">
      <button className="flex items-center gap-2 font-bold">
        <span>
          <img src={backIcon} className="size-3.5" />{" "}
        </span>
        Back
      </button>
    </div>
  );
}

export default BackButton;
