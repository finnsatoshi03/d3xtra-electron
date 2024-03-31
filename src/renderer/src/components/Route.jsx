/* eslint-disable react/prop-types */
function Route({
  index = 1,
  value = 32,
  unit = "mins.",
  route = "Kabilang Daan",
  routeValue = "7.8",
  routeUnit = "km.",
  highlight = false,
  onClick,
}) {
  return (
    <div
      className={`my-1.5 flex items-center gap-3 rounded-lg px-2 py-1.5 xl:my-2.5 xl:gap-5 xl:px-3 xl:py-2.5 ${highlight ? "bg-blue200" : "group cursor-pointer hover:bg-blue200 hover:bg-opacity-40"}`}
      onClick={onClick}
    >
      <div className="flex size-8 items-center justify-center rounded-full bg-gray200 xl:size-9">
        <p className="text-sm font-bold xl:text-base">{index}</p>
      </div>
      <div className="">
        <p className="font-bold leading-[0.3rem]">
          {value} {unit}{" "}
          <span className="text-xs font-normal italic">via </span>
          <span className="text-xs font-semibold">{route}</span>
        </p>
        <p
          className={`text-xs font-medium leading-[0.5rem]  ${highlight ? "text-gray-500" : "text-gray200 group-hover:text-gray-500"}`}
        >
          {routeValue} {routeUnit}
        </p>
      </div>
    </div>
  );
}

export default Route;
