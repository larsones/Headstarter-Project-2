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
        setAirQualityData(data.data);
      } catch (error) {
        console.error('Error fetching air quality data:', error);
      }
    };

    fetchAirQualityData();
  }, [latitude, longitude]);

  return (
    <div className="widget">
      <h2>Air Quality</h2>
      {airQualityData ? (
        <div>
          <p>PM10: {airQualityData.pm10?.value}</p>
          <p>PM2.5: {airQualityData.pm2_5?.value}</p>
          <p>Dust: {airQualityData.dust?.value}</p>
          <p>UV Index: {airQualityData.uv_index?.value}</p>
          <p>US AQI: {airQualityData.us_aqi?.value}</p>
        </div>
      ) : (
        <p>No air quality data available.</p>
      )}
    </div>
  );
};

export default AirQuality;
