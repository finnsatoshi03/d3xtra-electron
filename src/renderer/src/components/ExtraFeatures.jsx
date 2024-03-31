/* eslint-disable react/prop-types */
import { useMaps } from "../contexts/MapContext";

import interactiveIcon from "../../../../resources/icons/interactive.png";
import dynamicIcon from "../../../../resources/icons/dynamic.png";
import ImportMap from "./ImportMap";

const features = [
  {
    title: "Interactive Map",
    description: "Add obstacles & overlays",
    icon: interactiveIcon,
  },
  { title: "Dynamic Map", description: "Import Maps", icon: dynamicIcon },
];

function ExtraFeatures() {
  const { selectedFeature, dispatch } = useMaps();
  const isDynamicMap = selectedFeature === "Dynamic Map";

  const handleSelectFeature = (feature) => {
    if (selectedFeature === feature) return;

    dispatch({ type: "feature/selected", payload: feature });

    if (
      feature !== "Interactive Map" ||
      (isDynamicMap && feature === "Interactive Map")
    ) {
      dispatch({ type: "reset" });
    }
  };

  return (
    <div className="my-4 w-[75%] xl:w-[70%]">
      <h1 className="mx-[5%] mb-2 text-[10px] font-semibold uppercase text-gray-400 xl:text-xs">
        Extra Features
      </h1>
      <div className="flex w-full flex-col rounded-xl bg-gray200 bg-opacity-30 px-[3%] py-[1%] text-xs font-semibold shadow-md xl:text-sm">
        {features.map((feature, index) => (
          <Features
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            isSelected={selectedFeature === feature.title}
            onSelect={() => handleSelectFeature(feature.title)}
          />
        ))}
      </div>
      {isDynamicMap && <ImportMap />}
    </div>
  );
}

function Features({ title, description, icon, isSelected, onSelect }) {
  // const { selectedFeature } = useMaps();
  return (
    <div
      className={`flex w-full items-center justify-between gap-4 p-[3%] hover:cursor-pointer ${
        !isSelected ? "opacity-50" : ""
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-4">
        <img src={icon} className="size-10 rounded-xl bg-blue200 p-2" />
        <div>
          <label htmlFor={title}>{title}</label>
          <p className="text-[0.65rem] font-normal leading-3 text-gray-600">
            {description}
          </p>
        </div>
      </div>
      <input
        type="radio"
        id={title}
        name={title}
        value={title}
        checked={isSelected}
        onChange={() => {}}
        disabled={!isSelected}
      />
    </div>
  );
}

export default ExtraFeatures;
