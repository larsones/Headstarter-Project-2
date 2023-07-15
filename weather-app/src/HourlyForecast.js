import React from 'react';

const HourlyForecast = ({ city }) => {
  return (
    <div className="widget">
      <h2>Hourly Forecast in {city}</h2>
      {/* Forecast data will go here */}
    </div>
  );
}

export default HourlyForecast;
