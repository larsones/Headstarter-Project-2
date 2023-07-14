import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import axios from "axios";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const handleOnChange = async (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);

    // Fetch weather data based on the searched city
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${searchData}&appid=YOUR_API_KEY`
    );

    // Process the weather data here and update the state or pass it to the parent component
    const weatherData = response.data;
    console.log(weatherData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
    />
  );
};

export default Search;
