import {AsyncPaginate } from "react-select-asynch-paginate";

const Search = (onSearchChange) => {

  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
    
  }
  
  return (
    <AsyncPaginate
    placeholder="Search for city"
    debounceTimeout={600}
    value={search}
    onChange={handleOnChange}
    />
  )
}

export default Search;
