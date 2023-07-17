import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import WeatherWidget from './WeatherWidget';
import HourlyForecast from './HourlyForecast';
import WeeklyForecast from './WeeklyForecast';
import AirQuality from './AirQuality';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleCitySearch = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=bbea61d37db924452af9aec9cde074c1
&q=${cityName}`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch weather data');
      setWeatherData(null);
    }
    setCity(cityName);
  };

  return (
    <div className="App">

      <h1 className='text'>Welcome!  Please Enter a Location to get current news and weather.</h1>
      <SearchBar onCitySearch={handleCitySearch} className='search'/>
      <div className="widgets">
        <WeatherWidget city={city} />
        <HourlyForecast city={city} />
        <WeeklyForecast city={city} />
        <AirQuality city={city} />
      </div>
    </div>
  );
}

export default App;
