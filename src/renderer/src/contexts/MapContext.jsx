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

    default:
      return new Error("Unknown Action");
  }
}

function MapProvider({ children }) {
  const [{ graph, paths, message, error, isLoading }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(function () {
    async function fetchMap() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}map_graph`);
        const data = await res.json();
        // console.log(res);
        dispatch({ type: "map/loaded", payload: data });
      } catch (error) {
        // console.error(error);
        dispatch({ type: "rejected", payload: error });
      }
    }
    fetchMap();
  }, []);

  return (
    <MapContext.Provider value={{ graph, paths, message, error, isLoading }}>
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