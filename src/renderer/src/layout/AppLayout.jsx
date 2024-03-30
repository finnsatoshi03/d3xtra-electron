import { Outlet } from "react-router-dom";
import { useMaps } from "../contexts/MapContext";

import Sidebar from "./Sidebar";
import Infobar from "./Infobar";
import Loading from "../components/LoadingMaze";

function AppLayout() {
  const { isLoading } = useMaps();

  if (isLoading) return <Loading />;

  return (
    <div className="grid h-full w-full grid-cols-[250px_1fr_350px] overflow-y-hidden xl:grid-cols-[350px_1fr_450px]">
      <Sidebar />
      <main className="overflow-hidden">
        <Outlet />
      </main>
      <Infobar />
    </div>
  );
}

export default AppLayout;
