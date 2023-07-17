import React, { useState, useEffect } from 'react';

const WeatherWidget = ({ city }) => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=YOUR_API_KEY&units=metric`
        );
        const data = await response.json();
        const uniqueDates = getUniqueDates(data.list);
        setWeatherData(uniqueDates);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const getUniqueDates = (weatherList) => {
    const uniqueDates = [];
    const datesSet = new Set();

    for (const entry of weatherList) {
      const date = new Date(entry.dt * 1000).toDateString();

      if (!datesSet.has(date)) {
        uniqueDates.push(entry);
        datesSet.add(date);
      }
    }

    return uniqueDates;
  };

  return (
    <div className="widget">
      <h2>Weather in {city}</h2>
      {weatherData.map((entry) => (
        <div key={entry.dt}>
          <p>Date: {new Date(entry.dt * 1000).toDateString()}</p>
          <p>Temperature: {entry.main.temp} °C</p>
          <p>Weather: {entry.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherWidget;
