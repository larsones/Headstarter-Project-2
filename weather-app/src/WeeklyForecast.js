import React, { useState, useEffect } from 'react';

const WeeklyForecast = ({ city }) => {
  const [weeklyForecast, setWeeklyForecast] = useState([]);

  useEffect(() => {
    const fetchWeeklyForecastData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e7fc081df850c97f252bf1c3af358d51`
        );
        const data = await response.json();
        const transformedData = data.list.map((day) => ({
          date: formatDate(day.dt_txt),
          temperature: convertKelvinToCelsius(day.main.temp),
          weather: day.weather[0].description,
        }));
        setWeeklyForecast(transformedData);
      } catch (error) {
        console.error('Error fetching weekly forecast data:', error);
      }
    };

    if (city) {
      fetchWeeklyForecastData();
    }
  }, [city]);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const date = new Date(dateString).toLocaleDateString([], options);
    return date;
  };

  const convertKelvinToCelsius = (temperature) => {
    return Math.round(temperature - 273.15);
  };

  return (
    <div className="widget">
      <h2>Weekly Forecast in {city}</h2>
      {weeklyForecast.map((day) => (
        <div key={day.date} className="day">
          <p>Date: {day.date}</p>
          <p>Temperature: {day.temperature} °C</p>
          <p>Weather: {day.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default WeeklyForecast;
