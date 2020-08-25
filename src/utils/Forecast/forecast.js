import { useGeocoding, getUserLocation } from "../Location/location";
import {
  OPENWEATHERMAP_TOKEN,
  TRANSLATE_YANDEX,
} from "../staticData/constants";

// Get forecast
async function getForecast() {
  let location = document.querySelector(".search_menu_block-input").value;
  location = location === "" ? getUserLocation() : useGeocoding();

  try {
    const { loc } = await location;
    const latitude = loc.split(",")[0];
    const longitude = loc.split(",")[1];

    const forecast = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHERMAP_TOKEN}&units=metric`
    );
    const forecastJson = await forecast.json();
    return await forecastJson.list;
  } catch (e) {
    throw new Error(e);
  }
}

// Functions for setting forecast
function deletePreWeatherInfo(elem) {
  elem.childNodes.forEach(
    (n) => n.nodeType === document.TEXT_NODE && n.remove()
  );
}

function setFutureWeather(domElem, elem) {
  deletePreWeatherInfo(domElem);
  domElem.prepend(`${Math.floor(elem.main.temp)}`);
}

async function getCurrentWeatherType(text) {
  let lang = await fetch(
    `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${TRANSLATE_YANDEX}&text=${text}&lang=${localStorage.getItem(
      "language"
    )}`
  );
  lang = await lang.json();
  return lang.text[0];
}

async function setForecast(forecast = getForecast()) {
  const [
    firstDay,

    ,
    ,
    ,
    ,
    ,
    ,
    ,
    secondDay,

    ,
    ,
    ,
    ,
    ,
    ,
    ,
    thirdDay,

    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    fourthDay,
  ] = await forecast;

  const currDegrees = document.getElementById("currDegrees");
  deletePreWeatherInfo(currDegrees);
  currDegrees.prepend(`${Math.floor(firstDay.main.temp)}`);

  const currWeatherType = document.getElementById("currWeatherType");
  deletePreWeatherInfo(currWeatherType);
  const weatherType = await getCurrentWeatherType(firstDay.weather[0].main);
  currWeatherType.prepend(`${weatherType}`);

  const currWeatherFeels = document.getElementById("currWeatherFeels");
  deletePreWeatherInfo(currWeatherFeels);
  currWeatherFeels.prepend(`${Math.floor(firstDay.main.feels_like)}°`);

  const currWeatherWind = document.getElementById("currWeatherWind");
  deletePreWeatherInfo(currWeatherWind);
  currWeatherWind.prepend(`${Math.floor(firstDay.wind.speed)} m/s`);

  const currWeatherHumidity = document.getElementById("currWeatherHumidity");
  deletePreWeatherInfo(currWeatherHumidity);
  currWeatherHumidity.prepend(`${Math.floor(firstDay.main.humidity)} %`);

  const firstFutureDegreesDay = document.getElementById("firstDegreesDay");
  const secondFutureDegreesDay = document.getElementById("secondDegreesDay");
  const thirdFutureDegreesDay = document.getElementById("thirdDegreesDay");
  setFutureWeather(firstFutureDegreesDay, secondDay);
  setFutureWeather(secondFutureDegreesDay, thirdDay);
  setFutureWeather(thirdFutureDegreesDay, fourthDay);
}

export { getForecast, setForecast };
