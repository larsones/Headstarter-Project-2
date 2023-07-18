import React, { useState, useEffect } from 'react';

const AirQuality = ({ city }) => {
  const [airQualityData, setAirQualityData] = useState(null);

  useEffect(() => {
    const fetchAirQualityData = async () => {
      try {
        const response = await fetch(
          `https://api.openaq.org/v2/latest?country_id=US&city=${encodeURIComponent(city)}&parameter=pm25`
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
      {airQualityData && airQualityData.results ? (
        <div>
          <p>PM2.5: {airQualityData.results[0].measurements[0].value} {airQualityData.results[0].measurements[0].unit}</p>
          <p>Last Updated: {airQualityData.results[0].measurements[0].lastUpdated}</p>
        </div>
      ) : (
        <p>No air quality data available for {city}.</p>
      )}
    </div>
  );
};

export default AirQuality;
