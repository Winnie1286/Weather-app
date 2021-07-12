function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let year = now.getFullYear();

  return `${day}, ${month} ${date}, ${year} ${hours}:${minutes}`;
}

let now = new Date();
let current = document.querySelector("#currentDate");
current.innerHTML = formatDate(now);

function formatDay(datestamp) {
  let date = new Date(datestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response.data);
  console.log(response.data.timezone_offset);
  function formatTime(sunTime) {
    console.log(sunTime);
    let sunTimeMS = sunTime * 1000;
    let dateObject = new Date(sunTimeMS);

    return dateObject.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  }
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img src= "http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
          width="42"/>
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° | </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.daily[0].temp.max
  );
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.daily[0].temp.min
  );
  document.querySelector("#precipitation").innerHTML =
    response.data.hourly[0].pop * 100;
  document.querySelector("#sunrise").innerHTML = `${formatTime(
    response.data.daily[0].sunrise
  )}`;
  document.querySelector("#sunset").innerHTML = `${formatTime(
    response.data.daily[0].sunset
  )}`;
}

function getForecast(coordinates) {
  let apiKey = "90f1d53b11df0bd6f29722974b5c486b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let iconElement = document.querySelector("#now-icon");

  fahrenheitTemperature = response.data.main.temp;

  temperatureElement.innerHTML = `${currentTemperature}`;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function showCity(cityElement) {
  let apiKey = "90f1d53b11df0bd6f29722974b5c486b";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityElement}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
  console.log(apiUrl);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#cityInput").value;
  showCity(cityElement);
}

function searchLocation(position) {
  let apiKey = "90f1d53b11df0bd6f29722974b5c486b";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let celsiusTemperature = (fahrenheitTemperature - 32) * (5 / 9);
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

showCity("New York");

let form = document.querySelector("#enterCity");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
