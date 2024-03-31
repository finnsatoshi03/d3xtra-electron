import axios from "axios";

export async function getShortestPath(startNode, targetNode, graph, dispatch) {
  // console.log("startNode: ", startNode);
  // console.log("targetNode: ", targetNode);
  // console.log("graph: ", graph);

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
