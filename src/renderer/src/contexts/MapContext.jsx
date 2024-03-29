/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:5000/api/get/";

const MapContext = createContext();

const initialState = {
  graph: {},
  paths: [],
  message: "",
  error: "",
  isLoading: "",
  isInsertPressed: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "map/loaded":
      return {
        ...state,
        isLoading: false,
        graph: action.payload,
        paths: action.payload,
        message: action.payload,
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    case "insert/pressed":
      return { ...state, isInsertPressed: true };

    case "insert/released":
      return { ...state, isInsertPressed: false };

    default:
      return new Error("Unknown Action");
  }
}

function MapProvider({ children }) {
  const [
    { graph, paths, message, error, isLoading, isInsertPressed },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchMap() {
      dispatch({ type: "loading" });

      const base64 = "sht";
      try {
        const res = await fetch(`${BASE_URL}map_graph`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ base64EncodedMap: base64 }),
        });

        const data = await res.json();
        dispatch({ type: "map/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: error });
      }
    }
    fetchMap();
  }, []);

  return (
    <MapContext.Provider
      value={{
        graph,
        paths,
        message,
        error,
        isLoading,
        isInsertPressed,
        dispatch,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

function useMaps() {
  const context = useContext(MapContext);

  if (context === undefined)
    throw Error("useMaps was defined outside the MapProvider");
  return context;
}

export { MapProvider, useMaps };
