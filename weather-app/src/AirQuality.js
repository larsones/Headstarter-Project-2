import React, { useState, useEffect } from 'react';

const AirQuality = ({ latitude, longitude }) => {
  const [airQualityData, setAirQualityData] = useState(null);

  useEffect(() => {
    const fetchAirQualityData = async () => {
      try {
        const response = await fetch(
          `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=pm10,pm2_5,dust,uv_index,us_aqi`
        );
        const data = await response.json();
        setAirQualityData(data);
      } catch (error) {
        console.error('Error fetching air quality data:', error);
      }
    };

    fetchAirQualityData();
  }, [latitude, longitude]);

  return (
    <div className="widget">
      <h2>Air Quality</h2>
      {airQualityData && airQualityData.status === 'ok' ? (
        <div>
          <p>PM10: {airQualityData.hourly.pm10}</p>
          <p>PM2.5: {airQualityData.hourly.pm2_5}</p>
          <p>Dust: {airQualityData.hourly.dust}</p>
          <p>UV Index: {airQualityData.hourly.uv_index}</p>
          <p>US AQI: {airQualityData.hourly.us_aqi}</p>
        </div>
      ) : (
        <p>No air quality data available.</p>
      )}
    </div>
  );
};

export default AirQuality;
