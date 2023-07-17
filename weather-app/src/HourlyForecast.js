import React, { useState, useEffect } from 'react';

const HourlyForecast = ({ city }) => {
  const [hourlyForecast, setHourlyForecast] = useState([]);

  useEffect(() => {
    const fetchHourlyForecastData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e7fc081df850c97f252bf1c3af358d51`
        );
        const data = await response.json();
        const transformedData = data.list.map((hour) => ({
          time: hour.dt_txt,
          temperature: hour.main.temp,
          weather: hour.weather[0].description,
        }));
        setHourlyForecast(transformedData);
      } catch (error) {
        console.error('Error fetching hourly forecast data:', error);
      }
    };

    if (city) {
      fetchHourlyForecastData();
    }
  }, [city]);

  return (
    <div className="widget">
      <h2>Hourly Forecast in {city}</h2>
      {hourlyForecast.map((hour) => (
        <div key={hour.time} className="hour">
          <p>Time: {hour.time}</p>
          <p>Temperature: {hour.temperature} °C</p>
          <p>Weather: {hour.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default HourlyForecast;

