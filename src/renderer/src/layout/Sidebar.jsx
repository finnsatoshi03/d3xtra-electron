/* eslint-disable prettier/prettier */
import logo from "../../../../resources/d3xtra_logo.png";

const lineBase = "border-b-2 border-gray200";
const lineYBase = "border-y-2 border-gray200";

function Sidebar() {
  return (
    <div className="flex h-full flex-col items-center justify-between">
      <div>
        <div className={`flex flex-col items-center pb-8`}>
          <img
            src={logo}
            alt="D3xtra Logo"
            className="w-[150px] py-8 xl:w-[200px]"
          />
          <button className="rounded-full bg-gray200 px-6 py-2.5 text-xs font-[600]">
            Contact Us
          </button>
        </div>
        <div
          className={`flex flex-col py-8 ${lineYBase} mx-10 px-2 text-xs xl:mx-16 xl:px-4 xl:text-sm`}
        >
          <h1 className="pb-1 font-bold">Description</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
      </div>
      <div className="mb-8">
        <div className={`${lineBase} pb-1`}>Sample</div>
      </div>
    </div>
  );
}

export default Sidebar;
