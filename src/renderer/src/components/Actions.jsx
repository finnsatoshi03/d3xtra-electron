function Actions({ icon, title, description }) {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-lg bg-blue200 p-2">
        <img src={icon} alt="View Icon" className="size-[15px]" />
      </div>
      <div>
        <p className="text-sm font-semibold leading-3">{title}</p>
        <p className="text-xs font-normal">{description}</p>
      </div>
    </div>
  );
}

export default Actions;
