/* eslint-disable prettier/prettier */
import axios from "axios";
import InfobarForm from "../components/InfobarForm";

function Infobar() {
  async function handleSubmit(e) {
    e.preventDefault();
    const start = "A";
    const end = "B";
    await axios
      .get(`http://localhost:5000/api/get/shortest/path/${start}/${end}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    console.log("dito mo nalang lagay tol");
  }

  return (
    <div className="px-12 py-8">
      {/*directions*/}
      <div className="">
        <h1 className="text-sm font-bold">Directions</h1>
        <InfobarForm handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default Infobar;
