import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const AirQualityGraph = ({ city }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`
        );
        const data = await response.json();
        if (data.length > 0) {
          const { lat, lon } = data[0];
          setLatitude(lat);
          setLongitude(lon);
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
          const response = await fetch(
            `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${latitude}&lon=${longitude}&appid=e7fc081df850c97f252bf1c3af358d51`
          );
          const data = await response.json();
          setAirQualityData(data);
        }
      } catch (error) {
        console.error('Error fetching air quality data:', error);
      }
    };

    if (latitude && longitude) {
      fetchAirQualityData();
    }
  }, [latitude, longitude]);

  const generateGraphData = () => {
    if (!airQualityData) {
      return null;
    }

    const labels = airQualityData.list.map((entry) => {
      const date = new Date(entry.dt * 1000);
      return date.toLocaleDateString();
    });

    const airQualityIndex = airQualityData.list.map((entry) => entry.main.aqi);

    return {
      labels,
      datasets: [
        {
          label: 'Air Quality Index',
          data: airQualityIndex,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="widget">
      <h2>Air Quality Graph for {city}</h2>
      {airQualityData && airQualityData.list ? (
        <Line
          data={generateGraphData()}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      ) : (
        <p>No air quality data available</p>
      )}
    </div>
  );
};

export default AirQualityGraph;
