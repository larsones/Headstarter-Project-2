import React, { useState } from 'react';

const SearchBar = ({ onCitySearch }) => {
  const [cityName, setCityName] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    onCitySearch(cityName);
  };

  return (
    <div className='searchBar'>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search city"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
