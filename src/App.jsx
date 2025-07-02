import React, { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import WeatherDisplay from './components/WeatherDisplay'
import Forecast from './components/Forecast'
import AQI from './components/AQI'
import Alerts from './components/Alerts'
import UnitToggle from './components/UnitToggle'
import ThemeToggle from './components/ThemeToggle'
import LoadingSpinner from './components/LoadingSpinner'
import ForecastChart from './components/ForecastChart'
import WeatherChatBot from './components/WeatherChatBot'

function App() {
  // State placeholders
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [aqi, setAqi] = useState(null)
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-blue-500 transition-colors duration-500 px-2 sm:px-4">
        <div className="w-full max-w-2xl p-2 sm:p-4 rounded-lg shadow-lg bg-white/80 mt-2 mb-16 sm:mt-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <h1 className="text-xl sm:text-3xl font-extrabold text-gray-800 text-center sm:text-left">Weather App</h1>
            <div className="flex justify-center sm:justify-end">
              <UnitToggle />
            </div>
          </div>
          <SearchBar setWeather={setWeather} setForecast={setForecast} setAqi={setAqi} setAlerts={setAlerts} setLoading={setLoading} setError={setError} />
          {loading && <LoadingSpinner />}
          {error && <div className="text-red-500 my-2">{error}</div>}
          {weather && <WeatherDisplay weather={weather} />}
          {forecast && <Forecast forecast={forecast} />}
          {forecast && <ForecastChart forecast={forecast} />}
          {aqi && <AQI aqi={aqi} />}
          {alerts && alerts.length > 0 && <Alerts alerts={alerts} />}
        </div>
      </div>
      <WeatherChatBot />
    </>
  )
}

export default App
