import React from "react";

function RadiusSlider({ radius, onRadiusChange }) {
  const handleRadiusChange = (e) => {
    const newRadius = e.target.value;
    onRadiusChange(newRadius);
  };

  return (
    <div className="mt-5 px-2">
      <input
        type="range"
        className="w-full accent-[#283618] h-2 bg-[#D4D4D4] rounded-lg appearance-none cursor-pointer"
        max="30000"
        step="100"
        onChange={handleRadiusChange}
        value={radius}
      />
      <label className="text-gray-500 text-[15px]">{radius} in Meter</label>
    </div>
  );
}

export default RadiusSlider;
