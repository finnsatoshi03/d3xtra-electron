import { useState } from "react";
import Autosuggest from "react-autosuggest";

function Input({ value, setter, placeholder, label, disabled, options, id }) {
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  const getSuggestions = (value) => {
    const inputValue = value?.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : options?.filter(
          (option) => option.toLowerCase().slice(0, inputLength) === inputValue,
        );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    const newSuggestions = getSuggestions(value);
    setSuggestions(newSuggestions);
    if (newSuggestions.length === 0) {
      setError("Input not found in map");
    } else {
      setError(null);
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    value,
    onChange: (event, { newValue }) => {
      setter(newValue);
    },
    disabled: disabled,
  };

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`pointer-events-none relative flex flex-col text-xs font-normal transition-all duration-300 ease-in-out ${value ? "top-0 text-blue400" : "top-[20px] text-gray200"} ${error ? "text-red-400" : ""}`}
      >
        {error ? error : value ? label : placeholder}
      </label>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={(suggestion) => (
          <div className="absolute -bottom-[2.1rem] z-30 w-full rounded-b-lg border-x border-b border-x-gray200 border-b-gray200 bg-white px-4 py-1 shadow-md">
            {suggestion}
          </div>
        )}
        inputProps={inputProps}
      />
    </div>
  );
}

export default Input;
