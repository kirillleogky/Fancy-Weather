import "@babel/polyfill";
import "weather-icons/css/weather-icons.min.css";
import addHTMLstructure from "./utils/addHtml";
import showLanguage from "./utils/showLang";
import addMap from "./utils/addMap";
import { setForecast, getForecast } from "./utils/Forecast/forecast";
import setWeatherIcons from "./utils/IconAndImg/setIcons";
import setImg from "./utils/IconAndImg/setBackgroundImg";
import deletePreLoad from "./utils/delPreLoad";
import {
  searchBy,
  search,
  feels,
  wind,
  humidity,
  latitude,
  longitude,
} from "./utils/staticData/wordsData";
import {
  getSearchingDate as getSearchTime,
  setDate,
  getTimeDifference,
  setTime,
} from "./utils/TimeAndDate/datetime";
import {
  useGeocoding as useGeocod,
  setLocation as setUpToDateLocationInfo,
} from "./utils/Location/location";
import {
  setCelsiusUnitFormat as setCelUnitFormat,
  setFahrenheitUnitFormat as setFahUnitFormat,
} from "./utils/UnitFormat/setUnitFormats";

require("./styles/style.css");
require("./styles/preLoaderStyle.css");

let currUnitsFormat = localStorage.getItem("units") || "Celsius";
const currLanguage = localStorage.getItem("language") || "en";
const currLangWords = {
  searchBy: `${searchBy[currLanguage]}`,
  search: `${search[currLanguage]}`,
  feels: `${feels[currLanguage]}`,
  wind: `${wind[currLanguage]}`,
  humidity: `${humidity[currLanguage]}`,
  latitude: `${latitude[currLanguage]}`,
  longitude: `${longitude[currLanguage]}`,
};
addHTMLstructure(currLangWords);
setDate(currLanguage);
useGeocod();

setUpToDateLocationInfo(true);

/* eslint-disable */
ymaps.ready(addMap);
/* eslint-enable */
setForecast();
setWeatherIcons();
setImg();

if (currUnitsFormat === "Fahrenheit") {
  document.querySelector(".temp_change").classList.add("temp");
  setTimeout(setFahUnitFormat, 3000);
}

// Get Current Date
let timeDifference = 0;
const getTime = () => {
  const currDate = new Date();
  currDate.setHours(currDate.getHours() + timeDifference);
  return currDate;
};

let forecast;
let location;
window.onclick = async (event) => {
  showLanguage(event);
  if (
    event.target === document.querySelector(".navigation_menu_block-image_btn")
  ) {
    document.getElementById("prldr").style = "display: fixed;";
    if (document.querySelector(".search_menu_block-input").value.length > 2) {
      setImg(forecast, location);
    } else {
      setImg();
    }
  }
  if (event.target === document.querySelector(".eng_language_btn")) {
    localStorage.setItem("language", "en");
    window.location.reload();
  }
  if (event.target === document.querySelector(".rus_language_btn")) {
    localStorage.setItem("language", "ru");
    window.location.reload();
  }
  if (event.target === document.querySelector(".bel_language_btn")) {
    localStorage.setItem("language", "be");
    window.location.reload();
  }
  if (event.target === document.querySelector(".search_menu_block-submit")) {
    document.getElementById("prldr").style = "display: fixed;";

    localStorage.setItem(
      "searchingCity",
      document.querySelector(".search_menu_block-input").value
    );

    const currForecast = await getForecast();
    forecast = await currForecast;
    location = await useGeocod();

    setUpToDateLocationInfo(false);
    setForecast(currForecast);
    setWeatherIcons(currForecast);
    setDate(currLanguage, getSearchTime());

    timeDifference = await getTimeDifference();

    await deletePreLoad();

    if (currUnitsFormat === "Fahrenheit") {
      setFahUnitFormat();
    }
  }
  if (event.target === document.querySelector(".temp_change")) {
    if (currUnitsFormat === "Celsius") {
      localStorage.setItem("units", "Fahrenheit");
      document.querySelector(".temp_change").classList.add("temp");
      setFahUnitFormat();
      currUnitsFormat = "Fahrenheit";
    } else {
      localStorage.setItem("units", "Celsius");
      document.querySelector(".temp_change").classList.remove("temp");
      currUnitsFormat = "Celsius";
      setCelUnitFormat();
    }
  }
};

// Starts weather search when changing language
if (localStorage.getItem("searchingCity") !== "") {
  document.querySelector(".search_menu_block-submit").click();
}

if (
  localStorage.getItem("searchingCity") !==
  document.querySelector(".search_menu_block-input").value
) {
  localStorage.setItem("searchingCity", "");
}

// Set Time
window.setInterval(setTime, 3000, getTime);
