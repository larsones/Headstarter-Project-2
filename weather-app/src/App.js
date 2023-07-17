import React, { useState } from 'react';
import SearchBar from './SearchBar';
import WeatherWidget from './WeatherWidget';
import HourlyForecast from './HourlyForecast';
import WeeklyForecast from './WeeklyForecast';
import AirQuality from './AirQuality';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');

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
    </div>
  );
}

export default App;
