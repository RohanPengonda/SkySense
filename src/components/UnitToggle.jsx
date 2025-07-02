import React, { useContext } from "react";
import { UnitContext } from "../context/UnitContext";

const UnitToggle = () => {
  const { unit, setUnit } = useContext(UnitContext);
  return (
    <button
      className="px-3 py-1 rounded border border-gray-400 bg-gray-100 "
      onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}
    >
      {unit === "metric" ? "°C" : "°F"}
    </button>
  );
};

export default UnitToggle; 