import backIcon from "../../../../resources/icons/chevron-left.png";
import { useMaps } from "../contexts/MapContext";

function BackButton() {
  const { dispatch, blockedEdges, paths, selectedFeature } = useMaps();
  // console.log(paths);

  function handleReset() {
    dispatch({ type: "reset" });
  }

  const isButtonDisabled =
    (blockedEdges.length === 0 &&
      paths.length === 0 &&
      selectedFeature !== "Dynamic Map") ||
    (selectedFeature === "Dynamic Map" && paths.length === 0);

  const buttonText =
    selectedFeature === "Dynamic Map" ? "Reset Paths" : "Reset to Defaults";

  return (
    <button
      className={`${isButtonDisabled ? "cursor-not-allowed opacity-50" : ""} flex w-full items-center justify-center gap-2 rounded-lg bg-blue200 py-2 text-sm font-semibold xl:text-base `}
      onClick={isButtonDisabled ? undefined : handleReset}
    >
      {/* <span>
        <img src={backIcon} className="size-3.5" />{" "}
      </span> */}
      {buttonText}
    </button>
  );
}

export default BackButton;
