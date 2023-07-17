import React, { useState, useEffect } from 'react';

const WeatherWidget = ({ city }) => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e7fc081df850c97f252bf1c3af358d51&units=metric`
        );
        const data = await response.json();
        setWeatherData(data.list.slice(0, 7)); // Limit the forecast to 7 days
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  return (
    <div className="widget">
      <h2>Weather in {city}</h2>
      {weatherData.map((forecast) => (
        <div key={forecast.dt}>
          <p>Date: {new Date(forecast.dt * 1000).toDateString()}</p>
          <p>Temperature: {forecast.main.temp} °C</p>
          <p>Weather: {forecast.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherWidget;

