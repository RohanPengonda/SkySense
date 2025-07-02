import React, { useState, useContext } from "react";
import { fetchWeatherByCity, fetchWeatherByCoords, fetchForecastByCity, fetchForecastByCoords, fetchAQI } from '../utils/api';
import { transformForecastData } from '../utils/helpers';
import { UnitContext } from '../context/UnitContext';

const SearchBar = ({ setWeather, setForecast, setAqi, setAlerts, setLoading, setError }) => {
  const [city, setCity] = useState("");
  const { unit } = useContext(UnitContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const weather = await fetchWeatherByCity(city, unit);
      setWeather(weather);
      const forecastRaw = await fetchForecastByCity(city, unit);
      setForecast(transformForecastData(forecastRaw.list));
      const aqiRaw = await fetchAQI(weather.coord.lat, weather.coord.lon);
      setAqi(aqiRaw.list[0]?.main.aqi || null);
      setAlerts([]);
    } catch (err) {
      setError("City not found or API error.");
      setWeather(null);
      setForecast(null);
      setAqi(null);
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      setError(null);
      setLoading(true);
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weather = await fetchWeatherByCoords(latitude, longitude, unit);
          setWeather(weather);
          const forecastRaw = await fetchForecastByCoords(latitude, longitude, unit);
          setForecast(transformForecastData(forecastRaw.list));
          const aqiRaw = await fetchAQI(latitude, longitude);
          setAqi(aqiRaw.list[0]?.main.aqi || null);
          setAlerts([]);
        } catch (err) {
          setError("Location error or API error.");
          setWeather(null);
          setForecast(null);
          setAqi(null);
          setAlerts([]);
        } finally {
          setLoading(false);
        }
      }, (err) => {
        setError("Geolocation permission denied.");
        setLoading(false);
      });
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-4 w-full">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="flex-1 px-3 py-2 rounded border border-gray-300 focus:outline-none w-full"
      />
      <div className="flex gap-2 w-full sm:w-auto">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded w-full sm:w-auto">Search</button>
        <button type="button" onClick={handleGeolocation} className="px-4 py-2 bg-green-500 text-white rounded w-full sm:w-auto">Use My Location</button>
      </div>
    </form>
  );
};

export default SearchBar;