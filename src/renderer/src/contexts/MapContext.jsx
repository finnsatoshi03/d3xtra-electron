/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:5000/api/get/";
import axios from "axios";
const MapContext = createContext();

const initialState = {
  graph: {},
  paths: [],
  obstacles: [],
  blockedEdges: [],
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
        graph: action.payload.graph,
        blockedEdges: action.payload.blockedEdges,
        message: action.payload.message,
      };

    case "insert/obstacle": {
      const { obstaclePosition, blockedEdgeIndex } = action.payload;
      const updatedGraph = { ...state.graph };
      const updatedBlockedEdges = [...state.blockedEdges, blockedEdgeIndex];

      for (const node in updatedGraph) {
        for (const edge in updatedGraph[node]) {
          if (updatedBlockedEdges.includes(updatedGraph[node][edge])) {
            delete updatedGraph[node][edge];
          }
        }
      }

      return {
        ...state,
        graph: updatedGraph,
        blockedEdges: updatedBlockedEdges,
        obstacles: [...state.obstacles, obstaclePosition],
      };
    }

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
    { graph, paths, message, error, isLoading, isInsertPressed, blockedEdges },
    dispatch,
  ] = useReducer(reducer, initialState);
  console.log("graph", graph);
  console.log("blockedEdges", blockedEdges);

  useEffect(function () {
    async function fetchMap() {
      dispatch({ type: "loading" });

      try {
        const res = await axios.post(`${BASE_URL}map_graph`, {
          base64EncodedMap: base64,
        });
        const data = res.data;
        dispatch({
          type: "map/loaded",
          payload: {
            graph: data.data.graph,
            blockedEdges: data.data.blockedEdges,
            message: data.data.message,
          },
        });
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
