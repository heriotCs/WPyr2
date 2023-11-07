const APIKey = "3851ae912cbd04780e17abd045bccde3";

//Create variables to store references to HTML elements
const cityInput = document.getElementById("cityInput");
const btn = document.getElementById("btn");
const weatherInfo = document.getElementById("weather-info");

// Add an event listener to detect when the button is clicked
btn.addEventListener("click", () => {
  // Get the value of the input field (city name)
  const CityName = cityInput.value.trim();

  if (CityName === "") {
    alert("Please enter a city name.");
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${CityName}&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      const weatherDescription = data.weather[0].description;
      const CityMainTemperature = data.main.temp;
      const windSpeed = data.wind.speed;

      weatherInfo.innerHTML = `
                <p>Weather: ${weatherDescription}</p>
                <p>Temperature: ${CityMainTemperature}°C</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
            `;
    })
    .catch((error) => {
      console.error("Error:", error);
      weatherInfo.innerHTML = "Error: Could not fetch weather data.";
    });
});
