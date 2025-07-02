import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY; // Replace with your actual API key
console.log(API_KEY);

// const API_KEY = "56ad51637bfc20d9b867709e138c883a"; // Replace with your actual API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeatherByCity = async (city, unit = "metric") => {
  const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`;
  const { data } = await axios.get(url);
  return data;
};

export const fetchWeatherByCoords = async (lat, lon, unit = "metric") => {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`;
  const { data } = await axios.get(url);
  return data;
};

export const fetchForecastByCity = async (city, unit = "metric") => {
  const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`;
  const { data } = await axios.get(url);
  return data;
};

export const fetchForecastByCoords = async (lat, lon, unit = "metric") => {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`;
  const { data } = await axios.get(url);
  return data;
};

export const fetchAQI = async (lat, lon) => {
  const url = `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const { data } = await axios.get(url);
  return data;
};

// Alerts are included in the One Call API (paid tier), but for free tier, alerts may not be available.
// This function is a placeholder for future use.
export const fetchAlerts = async (lat, lon) => {
  // Alerts are part of the One Call API (3.0)
  // const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  // const { data } = await axios.get(url);
  // return data.alerts || [];
  return [];
}; 