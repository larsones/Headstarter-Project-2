import React, { useState, useEffect } from 'react';

const AirQuality = ({ city }) => {
  const [airQualityData, setAirQualityData] = useState(null);

  useEffect(() => {
    const fetchAirQualityData = async () => {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/air_pollution/forecast?appid=e7fc081df850c97f252bf1c3af358d51&q=${encodeURIComponent(
            city
          )}`
        );
        const data = await response.json();
        setAirQualityData(data);
      } catch (error) {
        console.error('Error fetching air quality data:', error);
      }
    };

    if (city) {
      fetchAirQualityData();
    }
  }, [city]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const renderAirQuality = () => {
    if (!airQualityData || !airQualityData.list || airQualityData.list.length === 0) {
      return <p>No air quality data available for {city}</p>;
    }

    return airQualityData.list.map((entry) => (
      <div key={entry.dt} className="air-quality-entry">
        <p>{formatTimestamp(entry.dt)}</p>
        <p>Air Quality Index (AQI): {entry.main.aqi}</p>
      </div>
    ));
  };

  return (
    <div className="widget">
      <h2>Air Quality in {city}</h2>
      {renderAirQuality()}
    </div>
  );
};

export default AirQuality;
