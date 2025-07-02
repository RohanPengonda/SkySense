import React, { useContext } from "react";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";
import { UnitContext } from "../context/UnitContext";

const getWeatherIcon = (main) => {
  switch (main) {
    case "Clear":
      return <WiDaySunny size={32} />;
    case "Clouds":
      return <WiCloud size={32} />;
    case "Rain":
      return <WiRain size={32} />;
    case "Snow":
      return <WiSnow size={32} />;
    case "Thunderstorm":
      return <WiThunderstorm size={32} />;
    default:
      return <WiDaySunny size={32} />;
  }
};

const Forecast = ({ forecast }) => {
  const { unit } = useContext(UnitContext);
  const tempUnit = unit === "metric" ? "°C" : "°F";
  if (!forecast) return null;
  return (
    <div className="my-4">
      <h3 className="text-lg font-semibold mb-2">5-Day Forecast</h3>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        {forecast.map((day, idx) => (
          <div key={idx} className="bg-white shadow rounded-lg p-4 flex flex-col items-center transition-transform hover:scale-105">
            <div>{getWeatherIcon(day.main)}</div>
            <div className="font-semibold text-gray-700">{day.date}</div>
            <div className="text-sm text-gray-500">Min: {day.temp_min !== undefined ? Math.round(day.temp_min) : "-"}{tempUnit}</div>
            <div className="text-sm text-gray-500">Max: {day.temp_max !== undefined ? Math.round(day.temp_max) : "-"}{tempUnit}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;