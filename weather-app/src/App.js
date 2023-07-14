import "./App.css";
import Search from "./components/search/search.js";
import { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [weatherData, setWeatherData] = useState(null);

  const handleOnSearchChange = async (searchData) => {
    // Fetch weather data based on the searched city
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${searchData}&appid=YOUR_API_KEY`
    );

    // Process the weather data here and update the state
    const weatherData = response.data;
    setWeatherData(weatherData);
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {weatherData && <WeatherCard weatherData={weatherData} />}
    </div>
  );
}

export default App;
