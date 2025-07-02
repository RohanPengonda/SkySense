import React from "react";

const getAqiDescription = (aqi) => {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive Groups";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
};

const getAqiColor = (aqi) => {
  if (aqi <= 50) return "bg-green-200 dark:bg-green-900/60";
  if (aqi <= 100) return "bg-yellow-200 dark:bg-yellow-900/60";
  if (aqi <= 150) return "bg-orange-200 dark:bg-orange-900/60";
  if (aqi <= 200) return "bg-red-200 dark:bg-red-900/60";
  if (aqi <= 300) return "bg-purple-200 dark:bg-purple-900/60";
  return "bg-gray-400 dark:bg-gray-800/60";
};

const AQI = ({ aqi }) => {
  if (!aqi) return null;
  return (
    <div className={`my-4 p-4 rounded text-center ${getAqiColor(aqi)}`}>
      <div className="text-lg font-bold">Air Quality Index: {aqi}</div>
      <div className="text-sm">{getAqiDescription(aqi)}</div>
    </div>
  );
};

export default AQI; 