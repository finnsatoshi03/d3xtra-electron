import logo from "../../../../resources/d3xtra_logo.png";
import Modal from "./Modal";
import Error from "./Error";

function Logo() {
  return (
    <div className={`flex flex-col items-center pb-8`}>
      <img
        src={logo}
        alt="D3xtra Logo"
        className="w-[150px] py-8 xl:w-[200px]"
      />

      {/* temp use of Modal */}
      <Modal>
        <Modal.Open open={"error"}>
          <button className="rounded-full bg-gray200 px-6 py-2.5 text-xs font-[600] transition-all duration-300 ease-in-out hover:bg-blue200">
            Contact Us
          </button>
        </Modal.Open>
        <Modal.Window name={"error"}>
          <Error />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default Logo;
