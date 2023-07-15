import React from 'react';

const WeeklyForecast = ({ city }) => {
  return (
    <div className="widget">
      <h2>Weekly Forecast in {city}</h2>
      {/* Week data will go here */}
    </div>
  );
}

export default WeeklyForecast;
