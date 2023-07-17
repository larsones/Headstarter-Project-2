import React from 'react';

const WeatherWidget = ({ weatherData, city }) => {
  const { location, current } = weatherData;

  return (
    <div className="widget">
      <h2>Weather in {city}</h2>
      <p>Temperature: {current.temp_c}°C</p>
      <p>Condition: {current.condition.text}</p>
      <p>Humidity: {current.humidity}%</p>
      <p>Wind: {current.wind_kph} km/h</p>
      {/* Additional weather data can be displayed here */}
    </div>
  );
}

export default WeatherWidget;
