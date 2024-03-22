function HorizontalLine({ size = "large" }) {
  const sizes = {
    medium: "w-2/3",
    large: "w-full",
  };

  return <div className={`h-0 ${sizes[size]} border border-gray200`}></div>;
}

export default HorizontalLine;
