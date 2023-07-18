import React, { useState, useEffect } from 'react';

const AirQuality = ({ city }) => {
  const [airQualityData, setAirQualityData] = useState(null);

  useEffect(() => {
    const fetchAirQualityData = async () => {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${encodeURIComponent(
            city.lat
          )}&lon=${encodeURIComponent(city.lon)}&start=${encodeURIComponent(city.start)}&end=${encodeURIComponent(city.end)}&appid=bbea61d37db924452af9aec9cde074c1`
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
      <h2>Air Quality in {city.name}</h2>
      {airQualityData ? (
        <div>
          <p>Data: {JSON.stringify(airQualityData)}</p>
        </div>
      ) : (
        <p>No air quality data available for {city.name}.</p>
      )}
    </div>
  );
};

export default AirQuality;
