/* eslint-disable react/prop-types */
function Input({ value, setter, placeholder, label }) {
  return (
    <div className="relative">
      <label
        htmlFor="current-location"
        className={`relative flex flex-col text-xs font-normal text-gray200 transition-all duration-300 ease-in-out ${value ? "top-0" : "top-[20px]"}`}
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
