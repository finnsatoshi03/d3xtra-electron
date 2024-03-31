import backIcon from "../../../../resources/icons/chevron-left.png";
import { useMaps } from "../contexts/MapContext";

function BackButton() {
  const { dispatch, blockedEdges, paths } = useMaps();
  console.log(paths);

  function handleReset() {
    dispatch({ type: "reset" });
  }

  return (
    <button
      className={`${blockedEdges.length === 0 && paths.length === 0 ? "cursor-not-allowed opacity-50" : ""} flex w-full items-center justify-center gap-2 rounded-lg bg-blue200 py-2 text-sm font-semibold xl:text-base `}
      onClick={handleReset}
    >
      <span>
        <img src={backIcon} className="size-3.5" />{" "}
      </span>
      Reset to Defaults
    </button>
  );
}

export default BackButton;
