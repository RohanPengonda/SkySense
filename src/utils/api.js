import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_KEY;
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
