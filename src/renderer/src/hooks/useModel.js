import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const useModel = () => {
  const gltf = useLoader(GLTFLoader, "../../../../resources/map.glb");

  return gltf.scene;
};

export default useModel;
