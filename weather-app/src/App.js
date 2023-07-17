import React, { useState } from 'react';
import SearchBar from './SearchBar';
import WeatherWidget from './WeatherWidget';
import HourlyForecast from './HourlyForecast';
import WeeklyForecast from './WeeklyForecast';
import AirQuality from './AirQuality';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const apiKey = 'e7fc081df850c97f252bf1c3af358d51'
  const [weatherData, setWeatherData] = useState([{}])
  const handleCitySearch = (cityName) => {
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
      <div className='newsWidget'>
        
      </div>
    </div>
  );
}

export default App;
