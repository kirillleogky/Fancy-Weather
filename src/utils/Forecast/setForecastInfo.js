import getForecast from "./getForecast";
import { TRANSLATE_YANDEX } from "../staticData/constants";

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

export default async function setForecast(forecast = getForecast()) {
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
