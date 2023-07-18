import React, { useState, useEffect } from 'react';

const AirQuality = ({ city }) => {
  const [airQualityData, setAirQualityData] = useState(null);

  useEffect(() => {
    const fetchAirQualityData = async () => {
      try {
        const response = await fetch(
          `https://api.openaq.org/v1/measurements?country_id=US&city=${encodeURIComponent(
            city
          )}&limit=1&parameter=pm25&sort=desc`
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
    if (!airQualityData || airQualityData.results.length === 0) {
      return <p>No air quality data available for {city}</p>;
    }

    const { value, unit, date } = airQualityData.results[0];
    return (
      <div className="air-quality-entry">
        <p>PM2.5: {value} {unit}</p>
        <p>Last Updated: {date.local}</p>
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
