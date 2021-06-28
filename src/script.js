let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

console.log(weather);

let city = prompt("Enter a city");
city = city.toLowerCase();
city = city.trim();

if (weather[city] !== undefined) {
  let temperature = weather[city].temp;
  let humidity = weather[city].humidity;
  let fahrenheit = Math.round(temperature * 1.8 + 32);
  alert(
    `It is currently ${weather[city].temp}°C (${fahrenheit}°F) in ${city} with a humidity of ${humidity}%`
  );
} else {
  alert(
    "Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+" +
      city
  );
}

let now = new Date();
let current = document.querySelector("#currentDate");
let days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
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
let minutes = now.getMinutes();
let year = now.getFullYear();

current.innerHTML = `${day}, ${month} ${date}, ${year} ${hours}:${minutes}`;
