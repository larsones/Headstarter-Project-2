import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AirQuality = ({ city }) => {
  const [airQualityData, setAirQualityData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAirQualityData = async () => {
      try {
        const response = await axios.get(
          `https://api.airvisual.com/v2/city?city=${encodeURIComponent(city)}&key=7e56aae3-f67b-438f-9c06-b5aba522e089`
        );
        const data = response.data;
        console.log('API response:', data);
        if (data.status === 'success') {
          setAirQualityData(data);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error('Error fetching air quality data:', error);
        setError(true);
      }
    };

    if (city) {
      fetchAirQualityData();
    }
  }, [city]);

  return (
    <div className="widget">
      <h2>Air Quality in {city}</h2>
      {error ? (
        <p>Error fetching air quality data.</p>
      ) : (
        <>
          {airQualityData ? (
            <>
              <p>Current Air Quality Index: {airQualityData.data.current.pollution.aqius}</p>
              <p>Main Pollutant: {airQualityData.data.current.pollution.mainus}</p>
            </>
          ) : (
            <p>No air quality data available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default AirQuality;
