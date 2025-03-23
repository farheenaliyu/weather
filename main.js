// API Key (replace with your own if needed)
const apiKey = "c85097b2c9789f2b3eff1f9765391bdb"; // OpenWeatherMap API key

// Select elements
const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weatherDescription");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const weatherIcon = document.getElementById("weatherIcon");
const weatherContainer = document.querySelector(".weather-container");

// Weather backgrounds
const weatherBackgrounds = {
    Clear: "backgrounds/clear.jpg",
    Clouds: "backgrounds/cloudy.jpg",
    Rain: "backgrounds/rainy.jpg",
    Snow: "backgrounds/snowy.jpg",
    Thunderstorm: "backgrounds/thunderstorm.jpg",
    Mist: "backgrounds/mist.jpg",
    Default: "backgrounds/default.jpg",
};

// Function to fetch weather data
async function getWeather() {
    const city = cityInput.value.trim();
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            alert("City not found. Please try again.");
            return;
        }

        // Update UI with fetched data
        cityName.textContent = data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeed.textContent = `Wind: ${data.wind.speed} m/s`;

        // Update weather icon
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        // Update background image
        const weatherType = data.weather[0].main;
        weatherContainer.style.backgroundImage = `url('${weatherBackgrounds[weatherType] || weatherBackgrounds["Default"]}')`;

    } catch (error) {
        alert("Something went wrong. Please try again.");
        console.error(error);
    }
}

// Event listener for search button
searchButton.addEventListener("click", getWeather);

// Event listener for "Enter" key
cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

