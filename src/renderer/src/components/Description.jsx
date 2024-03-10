import { lineYBase } from "../layout/Sidebar";

function Description() {
  return (
    <div
      className={`flex flex-col py-8 ${lineYBase} mx-10 px-2 text-xs xl:mx-16 xl:px-4 xl:text-sm`}
    >
      <h1 className="pb-1 font-bold">Description</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </div>
  );
}

export default Description;
