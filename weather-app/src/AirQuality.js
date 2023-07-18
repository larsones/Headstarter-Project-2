import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AirQuality = ({ city }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const geocodingResponse = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            city
          )}&key=5e96988d62de4b52aadbf5c51a1b8bef`
        );
        const geocodingData = geocodingResponse.data;
        if (geocodingData.results.length > 0) {
          const { lat, lng } = geocodingData.results[0].geometry;
          setLatitude(lat);
          setLongitude(lng);
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    if (city) {
      fetchCoordinates();
    }
  }, [city]);

  useEffect(() => {
    const fetchAirQualityData = async () => {
      try {
        if (latitude && longitude) {
          const airVisualResponse = await axios.get(
            `https://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=7e56aae3-f67b-438f-9c06-b5aba522e089`
          );
          const airVisualData = airVisualResponse.data;
          setAirQualityData(airVisualData);
        }
      } catch (error) {
        console.error('Error fetching air quality data:', error);
      }
    };

    if (latitude && longitude) {
      fetchAirQualityData();
    }
  }, [latitude, longitude]);

  return (
    <div className="widget">
      <h2>Air Quality in {city}</h2>
      {airQualityData && airQualityData.status === 'success' ? (
        <div>
          <p>PM2.5: {airQualityData.data.current.pollution.pm2_5}</p>
          <p>PM10: {airQualityData.data.current.pollution.pm10}</p>
          <p>O3: {airQualityData.data.current.pollution.o3}</p>
          <p>NO2: {airQualityData.data.current.pollution.no2}</p>
          <p>SO2: {airQualityData.data.current.pollution.so2}</p>
          <p>CO: {airQualityData.data.current.pollution.co}</p>
        </div>
      ) : (
        <p>No air quality data available.</p>
      )}
    </div>
  );
};

export default AirQuality;
