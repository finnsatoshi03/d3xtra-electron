import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MapProvider } from "./contexts/MapContext";

import AppLayout from "./layout/AppLayout";
import Home from "./windows/Home";
import Modal from "./components/Modal";

function App() {
  // const ipcHandle = () => window.electron.ipcRenderer.send('ping')
  // apiGetMap();

  return (
    <MapProvider>
      <Modal>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to={"home"} />} />
              <Route path="home" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Modal>
    </MapProvider>
  );
}

export default App;
