import { useEffect, useRef } from "react";

function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        // Check if the click event's target is outside the modal
        // ref.current is a reference to the modal element
        // contains(e.target) checks if the clicked element is inside the modal
        if (ref.current && !ref.current.contains(e.target)) {
          // If the clicked element is outside the modal, close the modal
          handler();
        }
      }

      // The third argument, true, means that handleClick will be called during the capture phase
      // This ensures that handleClick runs before any other click events that might be set on elements within the modal
      document.addEventListener("click", handleClick, listenCapturing);

      // Return a cleanup function that will be called when the component unmounts
      return () => {
        // Remove the handleClick event listener
        document.removeEventListener("click", handleClick, listenCapturing);
      };
    },
    [handler, listenCapturing],
  );

  return ref;
}

export { useOutsideClick };
