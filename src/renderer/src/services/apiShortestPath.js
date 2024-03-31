import axios from "axios";

export async function getShortestPath(startNode, targetNode, graph, dispatch) {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/get/shortest/path`,
      {
        startNode,
        targetNode,
        graph,
      },
    );

    if (response.data.message === "Success") {
      dispatch({
        type: "path/loaded",
        payload: {
          paths: response.data.data.path,
          distance: response.data.data.safestAndShortestPathDistance,
          otherPaths: response.data.data.otherPathWithDistances,
        },
      });
      // console.log(response.data.data);
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    dispatch({ type: "path/error", payload: error.message });
    return null;
  }
}
