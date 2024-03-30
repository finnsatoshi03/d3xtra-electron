/* eslint-disable react/prop-types */
import { useState } from "react";
import Autosuggest from "react-autosuggest";
import searchIcon from "../../../../resources/icons/search.png";
import { useMaps } from "../contexts/MapContext";

function Input({
  value,
  setter,
  placeholder,
  label,
  options,
  id,
  handleSubmit,
  externalError,
}) {
  const { dispatch } = useMaps();
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const getSuggestions = (value) => {
    const inputValue = value?.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : options?.filter(
          (option) => option.toLowerCase().slice(0, inputLength) === inputValue,
        );
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setter(suggestion);
    handleSubmit();
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

    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    style: { outline: "none" },
  };

  return (
    <div className="children-border relative">
      <label
        htmlFor={id}
        className={`pointer-events-none relative flex flex-col text-xs font-normal transition-all duration-300 ease-in-out ${value ? "top-0 text-blue400" : "top-[20px] text-gray200"} ${error ? "text-red-400" : ""}`}
      >
        {error || externalError
          ? error || externalError
          : value
            ? label
            : placeholder}
      </label>
      <div className={`inline-flex w-full gap-0`}>
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
          onSuggestionSelected={onSuggestionSelected}
        />
        {isFocused && (
          <div
            className="absolute right-0 hover:cursor-pointer xl:static"
            onMouseDown={() => {
              if (!value) {
                setError("Input cannot be empty");
                return;
              }
              handleSubmit();
              dispatch({ type: "insert/released" });
            }}
          >
            <img src={searchIcon} className="size-5" />
          </div>
        )}
      </div>
      {isFocused && (
        <div
          className={`absolute bottom-0 h-[1px] w-[200px] xl:w-full ${error || externalError ? "bg-red-400" : "bg-blue200"}`}
        ></div>
      )}
    </div>
  );
}

export default Input;
