const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const currentWeatherSection = document.getElementById('current-weather'); 
const forecastSection = document.getElementById('forecast');
const searchHistorySection = document.getElementById('search-history');

// API key for OpenWeatherMap
const apiKey = '022bba9572364968227b2b2289462619';

// func to fetch current weather 
function fetchCurrentWeather(city) {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={022bba9572364968227b2b2289462619}';

    // fetch API to make a GET request 
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error('Error fetching current weather:', error));
}

