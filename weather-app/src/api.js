const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '71a0752e28msh084cebbe004a0aep180adejsndcc331acc048',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  }
};

const fetchData = async () => {
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const result = await response.text();
      console.log(result);
    } else {
      throw new Error('Request failed with status: ' + response.status);
    }
  } catch (error) {
    console.error(error);
  }
};

fetchData();
