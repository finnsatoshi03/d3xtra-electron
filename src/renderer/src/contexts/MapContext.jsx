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
        const base64 =
          "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";
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
