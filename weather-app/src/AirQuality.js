import React, { useState, useEffect } from 'react';

const AirQuality = ({ city }) => {
  const [airQualityData, setAirQualityData] = useState(null);

  useEffect(() => {
    const fetchAirQualityData = async () => {
      try {
        const response = await fetch(
          `https://api.airvisual.com/v2/city?city=${encodeURIComponent(
            city
          )}&state=&country=USA&key=7e56aae3-f67b-438f-9c06-b5aba522e089`
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

  const renderAirQuality = () => {
    if (!airQualityData || airQualityData.status !== 'success') {
      return <p>No air quality data available for {city}</p>;
    }

    const { current } = airQualityData.data;
    return (
      <div className="air-quality-entry">
        <p>Air Quality Index (AQI): {current.pollution.aqius}</p>
        <p>Temperature: {current.weather.tp}°C</p>
        <p>Humidity: {current.weather.hu}%</p>
        <p>Wind: {current.weather.ws} m/s</p>
      </div>
    );
  };

  return (
    <div className="widget">
      <h2>Air Quality in {city}</h2>
      {renderAirQuality()}
    </div>
  );
};

export default AirQuality;
