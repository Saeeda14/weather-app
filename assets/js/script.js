const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const currentWeatherSection = document.getElementById('current-weather'); 
const forecastSection = document.getElementById('forecast');
const searchHistorySection = document.getElementById('search-history');

// API key for OpenWeatherMap
const apiKey = '022bba9572364968227b2b2289462619';

// func to fetch current weather 
function fetchCurrentWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=022bba9572364968227b2b2289462619`;

    // fetch API to make a GET request 
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // current weather displayed here 
            console.log(data);
        })
        .catch(error => console.error('Error fetching current weather:', error));
}

// func to fetch 5-day weather forecast 
function fetchForecast(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=022bba9572364968227b2b2289462619`;

    // fetch API to make a GET request
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // 5-day forecast displayed here 
            console.log(data);
        })
        .catch(error => console.error('Error fetching forecast:', error));
}

// func to handle form submission 
function handleFormSubmit(event) {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        fetchCurrentWeather(city);
        fetchForecast(city);
        // Add the city to the search history
        addToSearchHistory(city);
        // Clear the input field
        cityInput.value = '';
    }
}

// func to add a city to the search history 
function addToSearchHistory(city) {
    const listItem = document.createElement('li');
    listItem.textContent = city;
    // Add a click event listener to the list item
    listItem.addEventListener('click', () => {
        fetchCurrentWeather(city);
        fetchForecast(city);
    });
    // Add the list item to the search history section
    searchHistorySection.appendChild(listItem);
}

searchForm.addEventListener('submit', handleFormSubmit);