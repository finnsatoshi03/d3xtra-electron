/* eslint-disable react/prop-types */
function Input({ value, setter, placeholder, label }) {
  return (
    <div className="relative">
      <label
        htmlFor="current-location"
        className={`pointer-events-none relative flex flex-col text-xs font-normal transition-all duration-300 ease-in-out ${value ? "top-0 text-blue400" : "top-[20px] text-gray200"}`}
      >
        {value ? label : placeholder}
      </label>
      <input
        type="text"
        id="current-location"
        name="current-location"
        className="text-base font-normal text-black transition-all duration-300 ease-in-out focus:outline-none"
        value={value}
        onChange={(e) => setter(e.target.value)}
      />
    </div>
  );
}

export default Input;
