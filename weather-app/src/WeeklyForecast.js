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
        const transformedData = transformForecastData(data.list);
        setWeeklyForecast(transformedData);
      } catch (error) {
        console.error('Error fetching weekly forecast data:', error);
      }
    };

    if (city) {
      fetchWeeklyForecastData();
    }
  }, [city]);

  const transformForecastData = (forecastData) => {
    const dailyData = {};
    const transformedData = [];

    forecastData.forEach((item) => {
      const date = item.dt_txt.split(' ')[0];

      if (!dailyData[date]) {
        dailyData[date] = {
          date: formatDate(item.dt_txt),
          temperatures: [],
          weather: [],
        };
      }

      dailyData[date].temperatures.push(item.main.temp);
      dailyData[date].weather.push(item.weather[0].description);
    });

    Object.values(dailyData).forEach((daily) => {
      const averageTemperature = calculateAverage(daily.temperatures);
      const weather = daily.weather[0];

      transformedData.push({
        date: daily.date,
        temperature: convertKelvinToCelsius(averageTemperature),
        weather,
      });
    });

    return transformedData;
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const date = new Date(dateString).toLocaleDateString([], options);
    return date;
  };

  const convertKelvinToCelsius = (temperature) => {
    return Math.round(temperature - 273.15);
  };

  const calculateAverage = (values) => {
    const sum = values.reduce((acc, value) => acc + value, 0);
    return sum / values.length;
  };

  return (
    <div className="widget">
      <h2>Weekly Forecast in {city}</h2>
      {weeklyForecast.map((day) => (
        <div key={day.date} className="day">
          <p><b>Date:</b> <u>{day.date}</u></p>
          <p>Temperature: {(Math.round(day.temperature*9/5)+32)} °F</p>
          <p>Weather: {day.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default WeeklyForecast;
