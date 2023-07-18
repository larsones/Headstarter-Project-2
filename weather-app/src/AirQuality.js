import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AirQuality = ({ latitude, longitude }) => {
  const [airQualityData, setAirQualityData] = useState(null);

  useEffect(() => {
    const fetchAirQualityData = async () => {
      try {
        const response = await axios.get(
          `https://api.openaq.org/v1/measurements?coordinates=${latitude},${longitude}&parameter[]=pm10&parameter[]=pm2.5&parameter[]=no2&parameter[]=co&parameter[]=so2&parameter[]=o3&limit=1`
        );
        const data = response.data;
        console.log('API response:', data);
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
      {airQualityData && airQualityData.results.length > 0 ? (
        <div>
          <p>PM10: {airQualityData.results[0].measurements.find(m => m.parameter === 'pm10').value}</p>
          <p>PM2.5: {airQualityData.results[0].measurements.find(m => m.parameter === 'pm2.5').value}</p>
          <p>NO2: {airQualityData.results[0].measurements.find(m => m.parameter === 'no2').value}</p>
          <p>CO: {airQualityData.results[0].measurements.find(m => m.parameter === 'co').value}</p>
          <p>SO2: {airQualityData.results[0].measurements.find(m => m.parameter === 'so2').value}</p>
          <p>O3: {airQualityData.results[0].measurements.find(m => m.parameter === 'o3').value}</p>
        </div>
      ) : (
        <p>No air quality data available.</p>
      )}
    </div>
  );
};

export default AirQuality;
