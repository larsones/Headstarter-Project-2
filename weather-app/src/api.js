const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '71a0752e28msh084cebbe004a0aep180adejsndcc331acc048',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
