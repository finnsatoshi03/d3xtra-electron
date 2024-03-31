/* eslint-disable react/prop-types */
import { cloneElement, createContext, useContext, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { createPortal } from "react-dom";
import { useMaps } from "../contexts/MapContext";

export const ModalContext = createContext();

function Modal({ children }) {
  const { error, dispatch } = useMaps();
  const [openName, setOpenName] = useState("");

  const close = () => {
    setOpenName("");
    if (error) {
      dispatch({ type: "path/error", payload: "" });
    }
  };
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, open: openWindowsName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(openWindowsName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const modalRef = useOutsideClick(close);

  if (name !== openName) return;

  const bgClass =
    name === "errorModal"
      ? "bg-gradient-to-tr from-[#972626] to-white text-white"
      : "bg-gray-300";

  return createPortal(
    <div className="fixed left-0 top-0 z-10 size-full bg-black bg-opacity-5 backdrop-blur-sm transition-all duration-75">
      <div
        className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-2xl px-10 py-8 shadow-lg transition-all duration-75 ${bgClass}`}
        ref={modalRef}
      >
        <button
          onClick={close}
          className={`${name === "errorModal" && "text-black"} absolute right-6 top-6`}
        >
          X
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
