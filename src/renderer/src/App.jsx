import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./windows/Home";
import { apiGetMap } from "./services/apiGetMap";
import { MapProvider } from "./contexts/MapContext";

function App() {
  // const ipcHandle = () => window.electron.ipcRenderer.send('ping')
  apiGetMap();

  return (
    <MapProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to={"home"} />} />
            <Route path="home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MapProvider>
  );
}

export default App;
