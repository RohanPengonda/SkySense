# Weather App

A modern, fully responsive Weather App built with React and Vite.

## Features

- **Search by City or Geolocation**: Enter a city or use your current location to get weather data.
- **Current Weather Display**: Shows temperature, weather condition, humidity, wind speed, and more.
- **5-Day Forecast**: Daily forecast with min/max temperature and weather icons.
- **Air Quality Index (AQI)**: Displays AQI if available.
- **Weather Alerts**: Shows severe weather alerts if provided by the API.
- **Forecast Chart**: Visualizes temperature trends with a chart.
- **Unit Toggle**: Switch between Celsius (°C) and Fahrenheit (°F) with a modern toggle switch.
- **Responsive Design**: Works beautifully on mobile, tablet, and desktop.
- **Weather ChatBot**: Ask any weather-related question! Powered by OpenRouter AI (free model), with a floating robot icon to open/close the chat.

## Tech Stack
- React + Vite
- Tailwind CSS
- Axios
- Recharts
- OpenWeatherMap API
- OpenRouter AI (for chatbot)

## Setup & Installation

1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd WeatherApp
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up your `.env` file in the project root:**
   ```env
   VITE_WEATHER_KEY=your_openweathermap_api_key
   VITE_OPENROUTER_API_KEY=your_openrouter_api_key
   ```
   - Get your [OpenWeatherMap API key](https://openweathermap.org/api)
   - Get your [OpenRouter API key](https://openrouter.ai/)

4. **Run the app**
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:5173` by default.

## Usage
- Search for any city or use your location.
- Toggle between °C and °F.
- Click the robot icon to chat with the AI about weather questions.
- Fully responsive for all devices.

## Screenshots
_Add your screenshots here_

---

**Enjoy your modern Weather App!**
