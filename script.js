const apiKey = '01c640103836f1db8b55eaa0997fa178';
const weatherInfo = document.getElementById('weatherInfo');
const getWeatherButton = document.getElementById('getWeather');
const cityInput = document.getElementById('cityInput');
const errorMessage = document.getElementById('error-message');

getWeatherButton.addEventListener('click', () => {
    const city = cityInput.value.trim();

    if (city === '') {
        displayError('Please enter a city name.');
        return;
    }

    fetchWeather(city);
});

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError(error.message);
    }
}

function displayWeather(data) {
    errorMessage.innerHTML = '';
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function displayError(message) {
    weatherInfo.innerHTML = '';
    errorMessage.innerHTML = message;
}
