import React, { useState, useEffect } from 'react';

const AirQuality = ({ city }) => {
  const [airQualityData, setAirQualityData] = useState(null);

  useEffect(() => {
    const fetchAirQualityData = async () => {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={e7fc081df850c97f252bf1c3af358d51}`
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

  return (
    <div className="widget">
      <h2>Air Quality in {city}</h2>
      {airQualityData ? (
        <div>
          <p>Index: {airQualityData.index}</p>
          <p>Level: {airQualityData.level}</p>
          <p>Description: {airQualityData.description}</p>
        </div>
      ) : (
        <p>No air quality data available</p>
      )}
    </div>
  );
};

export default AirQuality;
