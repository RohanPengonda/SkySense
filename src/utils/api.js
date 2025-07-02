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

// Alerts are included in the One Call API (paid tier), but for free tier, alerts may not be available.
// This function is a placeholder for future use.
export const fetchAlerts = async (lat, lon) => {
  // Alerts are part of the One Call API (3.0)
  // const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  // const { data } = await axios.get(url);
  // return data.alerts || [];
  return [];
};

// OpenRouter integration for multiple models
export async function askOpenRouter(question, weatherData = null, model = 'mistralai/mistral-7b-instruct:free') {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const prompt = weatherData
    ? `User asked: ${question}\nHere is the weather data: ${JSON.stringify(weatherData)}\nAnswer the user's question in a helpful way.`
    : question;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'WeatherApp'
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    if (!response.ok) {
      if (response.status === 429) {
        return "Sorry, the AI is currently overloaded (rate limit reached). Please wait a moment and try again.";
      }
      return "Sorry, I couldn't answer your question right now.";
    }
    const data = await response.json();
    return (
      data?.choices?.[0]?.message?.content ||
      "Sorry, I couldn't answer your question."
    );
  } catch (err) {
    return "Sorry, I couldn't answer your question right now.";
  }
}
