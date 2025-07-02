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

function App() {
  // State placeholders
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [aqi, setAqi] = useState(null)
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-blue-500 transition-colors duration-500">
      <div className="w-full max-w-2xl p-4 rounded-lg shadow-lg bg-white/80">
        <div className="flex justify-between items-center mb-4">
          <UnitToggle />
          <ThemeToggle />
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
  )
}

export default App
