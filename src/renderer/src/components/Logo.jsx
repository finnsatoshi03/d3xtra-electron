import logo from "../../../../resources/d3xtra_logo.png";

function Logo() {
  return (
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
  );
}

export default Logo;
