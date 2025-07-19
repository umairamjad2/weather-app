const container = document.querySelector(".container");
const weatherBox = document.querySelector(".weather-box");
const search = document.querySelector(".search-box button");
const weatherDetails = document.querySelector(".weather-detail");
const error404 = document.querySelector(".not-found");
const cityInput = document.querySelector(".search-box input");

search.addEventListener("click", () => {
  const APIKey = "a0d5048b36c780427194674d8a4aef67";
  const city = cityInput.value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod == "404") {
        container.style.height = "420px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        return;
      }
      container.style.height = "555px";
      error404.classList.remove("active");

      weatherBox.classList.remove("active");
      weatherDetails.classList.remove("active");
      void weatherBox.offsetWidth;
      void weatherDetails.offsetWidth;
      weatherBox.classList.add("active");
      weatherDetails.classList.add("active");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(".weather-detail .humidity span");
      const wind = document.querySelector(".weather-detail .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;
        case "Rain":
          image.src = "images/rain.png";
          break;
        case "Snow":
          image.src = "images/snow.webp";
          break;
        case "overcast Clouds":
          image.src = "images/overcastcloud.png";
          break;
        case "broken Clouds":
          image.src = "images/cloud.webp";
          break;
        case "Mist":
          image.src = "images/mist.png";
          break;
        case "Haze":
          image.src = "images/mist.png";
          break;

        default:
          image.src = "images/cloud.webp";
      }
      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;
    });
});

cityInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    search.click(); // triggers the same code as button click
  }
});
