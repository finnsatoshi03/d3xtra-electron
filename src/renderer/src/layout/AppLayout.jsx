import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useMaps } from "../contexts/MapContext";
import Modal, { ModalContext } from "../components/Modal";

import Sidebar from "./Sidebar";
import Infobar from "./Infobar";
import Loading from "../components/LoadingMaze";

import Lottie from "react-lottie";
import noPath from "../../../../resources/icons/nopath.json";
import loading from "../../../../resources/icons/loading.json";

function AppLayout() {
  const { isLoading, error, dispatch } = useMaps();
  const { open } = useContext(ModalContext);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: isLoading ? loading : noPath,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (error) {
      open("errorModal");
      dispatch({
        type: "path/error",
        payload: "Unable to find a path because one endpoint is inaccessible.",
      });
    }
  }, [error, open]);

  if (isLoading) return <Loading />;

  return (
    <div className="grid h-full w-full grid-cols-[250px_1fr_350px] overflow-y-hidden xl:grid-cols-[350px_1fr_450px]">
      <Sidebar />
      <main className="overflow-hidden">
        <Outlet />
      </main>
      <Infobar />
      <Modal.Window name="errorModal">
        <div className="-mt-8 flex w-[200px] flex-col text-center text-black xl:w-[400px]">
          <Lottie options={defaultOptions} height={150} width={150} />
          <div className="-mt-8">{error}</div>
        </div>
      </Modal.Window>
    </div>
  );
}

export default AppLayout;
