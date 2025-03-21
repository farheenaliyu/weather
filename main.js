const apiKey = "c85097b2c9789f2b3eff1f9765391bdb";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

async function getWeather() {
    const city = document.getElementById("city-input").value;
    if (!city) return;
    
    const response = await fetch(`${apiUrl}${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    
    document.getElementById("city").innerText = data.name;
    document.getElementById("temp").innerText = `${Math.round(data.main.temp)}°C`;
    document.getElementById("humidity").innerText = `${data.main.humidity}%`;
    document.getElementById("wind-speed").innerText = `${data.wind.speed} m/s`;
    document.getElementById("description").innerText = data.weather[0].description;
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}


