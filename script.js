document.getElementById('location-form').addEventListener('submit', function (e) {
    if (e) {
        e.preventDefault(); // Prevent the default form submission behavior
    }

    const apiKey = '0b19887d4102ee7011d9388018f93b63';
    const inputField = document.getElementById('location-input');
    const city = inputField.value;
    const weatherData = document.getElementById('weather-data');

    if (!city) {
        weatherData.textContent = 'Error: Please enter a city name';
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Error: Invalid API key. Please check your configuration.');
                }
                throw new Error('Error: Place does not exist');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            inputField.value = ''; // Clear the input field
        })
        .catch(error => {
            console.error('Error fetching weather data:', error.message);
            weatherData.textContent = error.message;
        });
});

function displayWeather(data) {
    const weatherData = document.getElementById('weather-data');
    weatherData.innerHTML = '';

    if (data.cod === '404') {
        weatherData.textContent = 'Error: City not found';
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
        const description = data.weather[0].description;

        const weatherHtml = `
            <h1> ${cityName} </h1>
            <p>Temperature: ${temperature}°C</p>
            <p>Description: ${description}</p>
        `;

        weatherData.innerHTML = weatherHtml;
    }
}
