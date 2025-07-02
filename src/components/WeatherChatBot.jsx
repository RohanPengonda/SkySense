import React, { useState } from "react";
import { fetchWeatherByCity, askOpenRouter } from '../utils/api';
import { FaRobot } from "react-icons/fa";

const DEFAULT_CITY = "London"; // Change this to your preferred default city
const MODEL = 'mistralai/mistral-7b-instruct:free';

const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const WeatherChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! Ask me any weather-related question!", time: getCurrentTime() }
  ]);
  const [loading, setLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Improved city extraction: matches 'in [city]' or 'at [city]' at the end, or just a city name
  const extractCity = (text) => {
    // Try to match 'in [city]' or 'at [city]' at the end of the sentence
    const match = text.match(/(?:in|at)\s+([a-zA-Z\s]+)[?.!]*$/i);
    if (match) return match[1].trim();
    // If the text starts with 'in ' or 'at ', remove it
    const startMatch = text.match(/^(?:in|at)\s+([a-zA-Z\s]+)$/i);
    if (startMatch) return startMatch[1].trim();
    // Fallback: if the text is just a city name
    if (/^[a-zA-Z\s]+$/.test(text.trim())) return text.trim();
    return null;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input, time: getCurrentTime() };
    setMessages((msgs) => [...msgs, userMsg]);
    setLoading(true);

    let botMsg;
    const city = extractCity(input) || DEFAULT_CITY;
    let weatherData = null;
    try {
      if (extractCity(input)) {
        weatherData = await fetchWeatherByCity(city);
      }
      const answer = await askOpenRouter(input, weatherData, MODEL);
      botMsg = { sender: "bot", text: answer, time: getCurrentTime() };
    } catch (err) {
      botMsg = { sender: "bot", text: "Sorry, I couldn't answer your question right now.", time: getCurrentTime() };
    }
    setMessages((msgs) => [...msgs, botMsg]);
    setInput("");
    setLoading(false);
  };

  return (
    <>
      {!showChat && (
        <button
          className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg z-50 hover:bg-blue-700 transition-colors"
          onClick={() => setShowChat(true)}
          aria-label="Open Weather ChatBot"
        >
          <FaRobot size={28} />
        </button>
      )}
      {showChat && (
        <div className="fixed bottom-4 right-1 w-full max-w-xs sm:w-80 bg-white shadow-lg rounded-xl flex flex-col overflow-hidden z-50">
          <div className="bg-blue-600 text-white px-4 py-2 font-bold flex items-center justify-between text-base sm:text-lg">
            <span>Weather ChatBot</span>
            <button
              className="ml-2 text-white hover:text-gray-200 text-lg font-bold"
              onClick={() => setShowChat(false)}
              aria-label="Close ChatBot"
            >
              ×
            </button>
          </div>
          <div className="flex-1 p-2 sm:p-3 h-64 overflow-y-auto flex flex-col gap-2 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`text-xs sm:text-sm px-2 sm:px-3 py-2 rounded-lg max-w-[95%] ${msg.sender === 'bot' ? 'bg-blue-100 self-start' : 'bg-green-100 self-end'}`}>
                <div>{msg.text}</div>
                <div className="text-xs text-gray-400 text-right">{msg.time}</div>
              </div>
            ))}
            {loading && <div className="text-xs text-gray-400">Bot is typing...</div>}
          </div>
          <form onSubmit={handleSend} className="flex border-t">
            <input
              className="flex-1 px-2 sm:px-3 py-2 outline-none text-xs sm:text-sm"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about the weather..."
              disabled={loading}
            />
            <button type="submit" className="px-3 sm:px-4 bg-blue-500 text-white text-xs sm:text-sm" disabled={loading || !input.trim()}>Send</button>
          </form>
        </div>
      )}
    </>
  );
};

export default WeatherChatBot;