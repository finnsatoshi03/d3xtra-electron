import axios from "axios";

export async function getShortestPath(startNode, targetNode, graph) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/get/shortest/path`,
      {
        data: {
          startNode,
          targetNode,
          graph,
        },
      },
    );

    if (response.data.message === "Success") {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
