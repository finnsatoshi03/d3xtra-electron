/* eslint-disable react/prop-types */
function Route({
  index = 1,
  value = 32,
  unit = "mins.",
  route = "Kabilang Daan",
  routeValue = "7.8",
  routeUnit = "km.",
}) {
  return (
    <div className="mt-3 flex items-center gap-3 xl:mt-5 xl:gap-5">
      <div className="flex size-8 items-center justify-center rounded-full bg-gray200 xl:size-9">
        <p className="text-sm font-bold xl:text-base">{index}</p>
      </div>
      <div className="">
        <p className="font-bold leading-[0.3rem]">
          {value} {unit}{" "}
          <span className="text-xs font-normal italic">via </span>
          <span className="text-xs font-semibold">{route}</span>
        </p>
        <p className="text-xs font-medium leading-[0.5rem] text-gray200">
          {routeValue} {routeUnit}
        </p>
      </div>
    </div>
  );
}

export default Route;
