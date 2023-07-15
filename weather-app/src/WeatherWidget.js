import React from 'react';

const WeatherWidget = ({ city }) => {
  return (
    <div className="widget">
      <h2>Weather in {city}</h2>
      {/* Weather data will go here */}
    </div>
  );
}

export default WeatherWidget;
