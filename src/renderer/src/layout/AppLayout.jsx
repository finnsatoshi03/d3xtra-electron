import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Infobar from "./Infobar";

function AppLayout() {
  return (
    <div className="grid h-full w-full grid-cols-[250px_1fr_350px] xl:grid-cols-[350px_1fr_450px]">
      <Sidebar />
      <main className="overflow-hidden">
        <Outlet />
      </main>
      <Infobar />
    </div>
  );
}

export default AppLayout;
