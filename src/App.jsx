import React, { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import WeatherDisplay from './components/WeatherDisplay'
import Forecast from './components/Forecast'
import AQI from './components/AQI'
import Alerts from './components/Alerts'
import UnitToggle from './components/UnitToggle'
import LoadingSpinner from './components/LoadingSpinner'
import ForecastChart from './components/ForecastChart'

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-blue-500 transition-colors duration-500 px-2 sm:px-4 md:px-8">
        <div className="w-full max-w-lg md:max-w-2xl lg:max-w-3xl p-2 sm:p-4 rounded-lg shadow-lg bg-white/80 mt-4 mb-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2 sm:gap-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">Weather App</h1>
            <div className="flex justify-center sm:justify-end items-center w-full sm:w-auto">
              <UnitToggle />
            </div>
          </div>
          <SearchBar setWeather={setWeather} setForecast={setForecast} setAqi={setAqi} setAlerts={setAlerts} setLoading={setLoading} setError={setError} />
          {loading && <LoadingSpinner />}
          {error && <div className="text-red-500 my-2 text-center">{error}</div>}
          {weather && <WeatherDisplay weather={weather} />}
          {forecast && <Forecast forecast={forecast} />}
          {forecast && <ForecastChart forecast={forecast} />}
          {aqi && <AQI aqi={aqi} />}
          {alerts && alerts.length > 0 && <Alerts alerts={alerts} />}
        </div>
      </div>
    </>
  )
}

export default App
