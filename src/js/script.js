"user strict";

import {
  UNSPLASH_ID,
  WEATHER_API_KEY,
  TIME_API_URL,
  UNSPLASH_URL_BACKGROUND_IMG,
  BACKGROUND_IMAGE_SEC,
  ACTIVITY_SEC,
  RANDOM_JOKE_API,
  BORED_API_URL,
  JOKE_SEC,
} from "./config.js";
import { AJAX } from "./helper.js";
import {
  kToC,
  renderSpinner,
  renderErrorAcitivtyMsg,
  renderErrorTimeMsg,
  renderErrorImgMsg,
  renderErrorMsgJokes,
  preload,
  preloadAll,
} from "./helper.js";

const dashboardContainer = document.querySelector(".dashboardContainer");
const timeContainer = document.querySelector(".timeContainer");
const backgroundImage = document.querySelector(".backgroundImage");
const activityContainer = document.querySelector(".activityContainer");
const ImgDescription = document.querySelector(".ImgDescription");
const randomJokeContainer = document.querySelector(".randomJokeContainer");

const randomJoke = async function () {
  try {
    const { data } = await AJAX(RANDOM_JOKE_API);
    const { punchline, setup } = data;

    let markup = `
      <p>${setup}</p>
      <p>Punchline: ${punchline}</p>    
    `;
    randomJokeContainer.innerHTML = markup;
  } catch (err) {
    renderErrorMsgJokes(randomJokeContainer);
  }
};

const boredActivity = async function () {
  try {
    const { data } = await AJAX(BORED_API_URL);
    const { activity, type } = data;

    let markup = `    
    <p class="activity">Bored is a free API to find something to do by getting suggestions for random activities.</p>
      <span class="activity">Todays suggestion:</span>
      <span class="activity">${activity}.</span>
      <span class="activity">Type: ${type}</p>
        `;

    activityContainer.innerHTML = markup;
  } catch (err) {
    renderErrorAcitivtyMsg(activityContainer);
  }
};

const diplayBackgroundImage = async function () {
  try {
    const { data } = await AJAX(`${UNSPLASH_URL_BACKGROUND_IMG}${UNSPLASH_ID}`);

    data.forEach((img) => {
      let imgs = img.urls.full;
      let markup = `
         <p class="alt_description">${img.alt_description}.</p>
        <p class="author">Image created by ${img.user.first_name} ${
        img.user.last_name ? "" : img.user.last_name
      }.</p>
         `;
      ImgDescription.innerHTML = markup;
      backgroundImage.style.backgroundImage = `url('${imgs}')`;
    });
  } catch (err) {
    renderErrorImgMsg(ImgDescription);
  }
};

const displayTime = async function () {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const { data } = await AJAX(`${TIME_API_URL}${tz}`);
    const { datetime } = data;

    let day;
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    if (data.day_of_week === 1) day = days[0];
    if (data.day_of_week === 2) day = days[1];
    if (data.day_of_week === 3) day = days[2];
    if (data.day_of_week === 4) day = days[3];
    if (data.day_of_week === 5) day = days[4];
    if (data.day_of_week === 6) day = days[5];
    if (data.day_of_week === 7) day = days[6];

    const markup = `
    <div class="date_time">
      <span id="time">${datetime.slice(11, 19)}</span>
      <span class="date">${day}</span>    
      <span class="date">${datetime.slice(0, 10)} </span>    
    </div>

  `;

    timeContainer.innerHTML = markup;
  } catch (err) {
    let markup = `
    <div class="weatherContainer">
             <div class="weatherItems">
                 <span>${err.message} 😥</span>
         </div>
         `;
    renderErrorTimeMsg(timeContainer);
  }
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const getWeather = async function () {
  try {
    const pos = await getPosition();

    const { latitude, longitude } = pos.coords;
    if (!pos) throw new Error("Problem getting location data");

    showWeather(latitude, longitude);
  } catch (err) {
    console.error(`${err.message}`);
    let markup = `
    <div class="weatherContainer">    
            <div class="weatherItems">
                <span>${err.message} 😥</span>
        </div>    
        `;
    dashboardContainer.insertAdjacentHTML("beforeend", markup);
  }
};
const showWeather = async function (lat, lon) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;
    const { data } = await axios.get(url);
    const { temp } = data.main;
    let markup = `
    <div class="weatherContainer">
        <div class="weatherItems">
            <span>${kToC(temp)}</span>
            <span>${data.name}</span>
            </div>
            <img src="http://openweathermap.org/img/w/${
              data.weather[0].icon
            }.png" alt="${data.weather.description}">
    </div>
    `;
    dashboardContainer.insertAdjacentHTML("beforeend", markup);
  } catch (error) {
    throw error;
  }
};
const init = function () {
  getWeather();
  diplayBackgroundImage();
  boredActivity();
  randomJoke();

  renderSpinner(timeContainer);
  renderSpinner(activityContainer);
  renderSpinner(ImgDescription);
  renderSpinner(randomJokeContainer);
};
init();

(function () {
  setInterval(() => {
    displayTime();
  }, 1000);
})();

setInterval(diplayBackgroundImage, BACKGROUND_IMAGE_SEC * 1000);
setInterval(boredActivity, ACTIVITY_SEC * 1000);
setInterval(randomJoke, JOKE_SEC * 1000);
