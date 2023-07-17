import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import WeatherWidget from './WeatherWidget';
import HourlyForecast from './HourlyForecast';
import WeeklyForecast from './WeeklyForecast';
import AirQuality from './AirQuality';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const apiKey = 'e7fc081df850c97f252bf1c3af358d51';
  const [weatherData, setWeatherData] = useState([{}]);
  const [newsData, setNewsData] = useState([]);

  const handleCitySearch = (cityName) => {
    setCity(cityName);
  };

  useEffect(() => {
    // Fetch news data when the city changes
    const fetchNewsData = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${city}&sortBy=publishedAt&apiKey=YOUR_API_KEY&pageSize=100`
        );
        const data = await response.json();
        const uniqueArticles = getUniqueArticles(data.articles.slice(0, 100));
        setNewsData(uniqueArticles.slice(0, 5)); // Limit the articles to 5
      } catch (error) {
        console.log(error);
      }
    };

    if (city) {
      fetchNewsData();
    }
  }, [city]);

  function getUniqueArticles(articles) {
    const uniqueArticles = [];
    const articleUrls = new Set();

    for (const article of articles) {
      if (!articleUrls.has(article.url)) {
        uniqueArticles.push(article);
        articleUrls.add(article.url);
      }
    }

    return uniqueArticles;
  }

  return (
    <div className="App">
      <h1 className="text">
        Welcome! Please enter a location to get current news and weather.
      </h1>
      <SearchBar onCitySearch={handleCitySearch} className="search" />
      <div className="widgets">
        <WeatherWidget city={city} />
        <HourlyForecast city={city} />
        <WeeklyForecast city={city} />
        <AirQuality city={city} />
      </div>
      <div className="newsWidget">
        <h1>News</h1>
        {newsData.map((article) => (
          <div key={article.title} className="article">
            <img src={article.urlToImage} alt={article.title} />
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Click Here to Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
