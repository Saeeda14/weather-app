const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const currentWeatherSection = document.getElementById('current-weather'); 
const forecastSection = document.getElementById('forecast');
const searchHistorySection = document.getElementById('search-history');

// API key for OpenWeatherMap
const apiKey = '022bba9572364968227b2b2289462619';

// func to fetch current weather 
function fetchCurrentWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=022bba9572364968227b2b2289462619&units=metric`;

    // fetch API to make a GET request 
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // current weather displayed here 

            // display city name
            const cityNameElement = document.getElementById('city-name');
            cityNameElement.textContent = data.name;

            // display the current date 
            const currentDateElement = document.getElementById('current-date');
            const currentDate = new Date(); 
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = currentDate.toLocaleDateString(undefined, options);
            currentDateElement.textContent = formattedDate;

            // to get weather icon
            const weatherIconElement = document.getElementById('weather-icon');
            const iconCode = data.weather[0].icon; // Icon code from API response
            const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
            weatherIconElement.src = iconUrl;

            // display temp
            const temperatureElement = document.getElementById('temperature');
            temperatureElement.textContent = `${data.main.temp}°C`;

            // display humidity 
            const humidityElement = document.getElementById('humidity');
            humidityElement.textContent = `${data.main.humidity}%`;

            // display wind-speed
            const windSpeedElement = document.getElementById('wind-speed');
            windSpeedElement.textContent = `${data.wind.speed} m/s`;

            addToSearchHistory(city);
            console.log(data);
        })
        .catch(error => console.error('Error fetching current weather:', error));
}

// func to fetch 5-day weather forecast 
function fetchForecast(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=022bba9572364968227b2b2289462619&units=metric`;

    // fetch API to make a GET request
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const forecastList = data.list;

            // Clear the existing forecast data
            const forecastContainer = document.getElementById('forecast-container');
            forecastContainer.innerHTML = '';

            // Iterate through the forecast entries and display the data for each day
            forecastList.forEach(entry => {
                const dateTime = new Date(entry.dt * 1000); 
                const date = dateTime.toLocaleDateString(undefined, { weekday: 'short' });
                const iconCode = entry.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
                const temperature = `${entry.main.temp}°C`;
                const windSpeed = `${entry.wind.speed} m/s`;
                const humidity = `${entry.main.humidity}%`;

                // Create a card element for each forecast day
                const card = document.createElement('div');
                card.classList.add('forecast-card');
                card.innerHTML = `
                    <p>Date: ${date}</p>
                    <img src="${iconUrl}" alt="Weather Icon">
                    <p>Temperature: ${temperature}</p>
                    <p>Wind Speed: ${windSpeed}</p>
                    <p>Humidity: ${humidity}</p>
                `;

                // Append the card to the forecast container
                forecastContainer.appendChild(card);
            });

            // Save city to search history
            addToSearchHistory(city);
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