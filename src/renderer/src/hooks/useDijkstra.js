import axios from "axios";
import { create } from "zustand";

const useDijkstra = create((set) => ({
  sourceImg: "",
  setSourceImg: (sourceImg) => set({ sourceImg: sourceImg }),
  fetchSourceImg: (url) => {
    return axios
      .get(url)
      .then((response) => {
        // console.log(response);
        const imageData = response.data.data.encoded_image;
        return imageData; // Return image data
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
        throw error; // Re-throw the error to handle it in the component
      });
  },
}));

export default useDijkstra;
