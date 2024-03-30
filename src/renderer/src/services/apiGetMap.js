import { useEffect } from "react";
import axios from "axios";

const URL = "http://localhost:5000/api/get/";

export function apiGetMap() {
  useEffect(function () {
    async function getMap() {
      try {
        const fetchMap = await fetch(`${URL}map_graph`);
        const res = await fetchMap.json();
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
    getMap();
  }, []);
}
