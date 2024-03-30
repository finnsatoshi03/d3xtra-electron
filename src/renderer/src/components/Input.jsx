function Input({ value, setter, placeholder, label, disabled }) {
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
        className={`text-base font-normal text-black transition-all duration-300 ease-in-out ${disabled ? "opacity-50" : ""} focus:outline-none`}
        value={value}
        onChange={(e) => {
          if (!disabled) {
            setter(e.target.value);
          }
        }}
        style={{ pointerEvents: disabled ? "none" : "auto" }}
      />
    </div>
  );
}

export default Input;
