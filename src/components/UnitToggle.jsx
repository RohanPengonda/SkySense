import React, { useContext } from "react";
import { UnitContext } from "../context/UnitContext";

const UnitToggle = () => {
  const { unit, setUnit } = useContext(UnitContext);
  const isCelsius = unit === "metric";

  return (
    <div className="flex items-center">
      <span className={`mr-2 text-sm font-semibold ${isCelsius ? 'text-blue-700' : 'text-gray-400'}`}>°C</span>
      <button
        type="button"
        aria-label="Toggle temperature unit"
        className={`relative w-12 h-7 rounded-full transition-colors duration-300 focus:outline-none ${isCelsius ? 'bg-blue-900' : 'bg-blue-800'}`}
        onClick={() => setUnit(isCelsius ? "imperial" : "metric")}
      >
        <span
          className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${isCelsius ? 'translate-x-0' : 'translate-x-5'}`}
        />
      </button>
      <span className={`ml-2 text-sm font-semibold ${!isCelsius ? 'text-blue-700' : 'text-blue-900'}`}>°F</span>
    </div>
  );
};

export default UnitToggle; 