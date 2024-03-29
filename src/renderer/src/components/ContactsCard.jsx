/* eslint-disable react/prop-types */
import phone from "../../../../resources/icons/phone.png";

function ContactsCard({
  organization: title,
  number,
  image,
  specialties,
  icon,
}) {
  const titleWords = title?.split(" ");
  const titleWithBreak =
    titleWords?.length > 1
      ? `<span class="${titleWords[0] === "Commission" ? "text-[1rem] xl:text-[2.5rem]" : ""}">${titleWords[0]}</span><br />${titleWords.slice(1).join(" ")}`
      : title;

  return (
    <div
      style={{
        backgroundImage: `url('${image}')`,
      }}
      className="relative h-[35vh] w-[15vw] rounded-xl bg-cover bg-center bg-no-repeat shadow-lg"
    >
      <div className="absolute inset-0 rounded-lg bg-black opacity-30"></div>
      <div className="relative z-10 flex h-full flex-col justify-end gap-3 px-3 py-2 text-white">
        <h1
          className="text-[1.3rem] font-semibold leading-5 xl:text-[3rem] xl:leading-[0.9]"
          dangerouslySetInnerHTML={{ __html: titleWithBreak }}
        ></h1>
        <p className="text-xs leading-3 text-gray-300 xl:text-base xl:leading-4">
          {specialties}
        </p>
        <div className="flex justify-between">
          <img src={icon} alt="" className="size-5 xl:size-8" />
          <button className="inline-flex items-center gap-1 rounded-full bg-white bg-opacity-20 px-1.5 py-0.5 backdrop-blur-sm xl:gap-2 xl:px-2.5 xl:py-1">
            <img src={phone} alt="" className="size-3 xl:size-5" />
            <p className="text-xs xl:text-sm">{number}</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactsCard;
