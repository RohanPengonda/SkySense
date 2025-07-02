// Helper functions will go here 

// Transform OpenWeatherMap 3-hour forecast data into daily min/max for 5 days
export function transformForecastData(forecastList) {
  // Group by date
  const daily = {};
  forecastList.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!daily[date]) {
      daily[date] = [];
    }
    daily[date].push(item);
  });
  // Get min/max and main condition for each day
  return Object.entries(daily).slice(0, 5).map(([date, items]) => {
    const temps = items.map(i => i.main.temp);
    const min = Math.min(...temps);
    const max = Math.max(...temps);
    // Use the most frequent weather condition
    const main = items[0].weather[0].main;
    return {
      date,
      temp_min: min,
      temp_max: max,
      main,
    };
  });
} 