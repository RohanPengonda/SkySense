import React, { useState } from "react";
import { fetchWeatherByCity } from '../utils/api';

const WeatherChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! Ask me about the weather in any city." }
  ]);
  const [loading, setLoading] = useState(false);

  // Simple city extraction (improve as needed)
  const extractCity = (text) => {
    const match = text.match(/in ([a-zA-Z ]+)/i);
    if (match) return match[1].trim();
    return null;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setLoading(true);
    let botMsg;
    const city = extractCity(input);
    if (city) {
      try {
        const weather = await fetchWeatherByCity(city);
        botMsg = {
          sender: "bot",
          text: `The weather in ${weather.name} is ${Math.round(weather.main.temp)}°C with ${weather.weather[0].description}.`
        };
      } catch (err) {
        botMsg = { sender: "bot", text: `Sorry, I couldn't find the weather for ${city}.` };
      }
    } else {
      botMsg = { sender: "bot", text: "Please ask about the weather in a specific city, e.g., 'What's the weather in Paris?'" };
    }
    setMessages((msgs) => [...msgs, botMsg]);
    setInput("");
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-xl flex flex-col overflow-hidden z-50">
      <div className="bg-blue-600 text-white px-4 py-2 font-bold">Weather ChatBot</div>
      <div className="flex-1 p-3 h-64 overflow-y-auto flex flex-col gap-2 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`text-sm px-3 py-2 rounded-lg max-w-[90%] ${msg.sender === 'bot' ? 'bg-blue-100 self-start' : 'bg-green-100 self-end'}`}>{msg.text}</div>
        ))}
        {loading && <div className="text-xs text-gray-400">Bot is typing...</div>}
      </div>
      <form onSubmit={handleSend} className="flex border-t">
        <input
          className="flex-1 px-3 py-2 outline-none"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about the weather..."
          disabled={loading}
        />
        <button type="submit" className="px-4 bg-blue-500 text-white" disabled={loading || !input.trim()}>Send</button>
      </form>
    </div>
  );
};

export default WeatherChatBot; 