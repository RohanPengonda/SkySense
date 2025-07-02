import React, { useContext } from "react";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";
import { UnitContext } from "../context/UnitContext";

const getWeatherIcon = (main) => {
  switch (main) {
    case "Clear":
      return <WiDaySunny size={48} />;
    case "Clouds":
      return <WiCloud size={48} />;
    case "Rain":
      return <WiRain size={48} />;
    case "Snow":
      return <WiSnow size={48} />;
    case "Thunderstorm":
      return <WiThunderstorm size={48} />;
    default:
      return <WiDaySunny size={48} />;
  }
};

const WeatherDisplay = ({ weather }) => {
  const { unit } = useContext(UnitContext);
  if (!weather) return null;
  const { name, main, weather: weatherArr, wind } = weather;
  const condition = weatherArr[0];
  const tempUnit = unit === "metric" ? "°C" : "°F";
  const windUnit = unit === "metric" ? "m/s" : "mph";
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-6 max-w-3xl w-full mx-auto flex flex-col items-center">
      <h2 className="text-3xl font-extrabold mb-2 text-gray-800">{name}</h2>
      {getWeatherIcon(condition.main)}
      <div className="text-4xl font-bold mb-1 text-blue-600">{main ? Math.round(main.temp) : "-"}{tempUnit}</div>
      <div className="capitalize text-lg text-gray-600 mb-2">{condition?.description || "-"}</div>
      <div className="flex gap-6 text-gray-500 text-base">
        <span>Humidity: {main?.humidity ?? "-"}%</span>
        <span>Wind: {wind?.speed ?? "-"} {windUnit}</span>
      </div>
    </div>
  );
};

export default WeatherDisplay; 