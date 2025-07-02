import React, { useContext } from "react";
import { UnitContext } from "../context/UnitContext";

const UnitToggle = () => {
  const { unit, setUnit } = useContext(UnitContext);
  const isCelsius = unit === "metric";

  return (
    <div className="flex items-center gap-2">
      <span className={`text-sm font-semibold ${isCelsius ? 'text-blue-900' : 'text-blue-800'}`}>°C</span>
      <button
        onClick={() => setUnit(isCelsius ? "imperial" : "metric")}
        className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${isCelsius ? 'bg-blue-900' : 'bg-blue-800'}`}
        aria-label="Toggle Celsius/Fahrenheit"
      >
        <span
          className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${isCelsius ? 'translate-x-0' : 'translate-x-6'}`}
        />
      </button>
      <span className={`text-sm font-semibold ${!isCelsius ? 'text-blue-900' : 'text-blue-800'}`}>°F</span>
    </div>
  );
};

export default UnitToggle; 