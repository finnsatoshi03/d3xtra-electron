/* eslint-disable react/prop-types */
import errorIcon from "../../../../resources/icons/error.png";

function ErrorModal({ message: errorMessage }) {
  return (
    <>
      <img
        src={errorIcon}
        alt="Error Icon"
        className="mx-auto my-0 mb-3 size-16"
      />
      <h2>Error</h2>
      <p>{errorMessage || "An error occurred."}</p>
    </>
  );
}

export default ErrorModal;
