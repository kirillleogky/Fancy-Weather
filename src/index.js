import '@babel/polyfill';
import 'weather-icons/css/weather-icons.min.css';
import addHTMLstructure from './addHtml';
import showLanguage from './showLang';
import {
  searchBy, search, feels, wind, humidity, latitude, longitude,
} from './utils/staticData/wordsData';
import getUserLocation from './utils/getData/getLocation';
import setUpToDateLocationInfo from './utils/setData/setLocationInfo';
import addMap from './addMap';
import getForecast from './utils/getData/getForecast';
import setForecast from './utils/setData/setForecastInfo';
import setWeatherIcons from './utils/setData/setIcons';
import setDate from './utils/setData/setDate';
import setCurrTime from './utils/setData/setCurrTime';
import setImg from './utils/setData/setBackgroundImg';
import useGeocod from './utils/getData/useGeocoding';
import setSearchTime from './utils/setData/setSearchingTime';
import getTimeDifference from './utils/getData/getTimeDifference';
import setFahUnitFormat from './utils/setData/setFahrenheitUnitFormat';
import setCelUnitFormat from './utils/setData/setCelsiusUnitFormat';
import deletePreLoad from './delPreLoad';

require('./styles/style.css');
require('./styles/preLoaderStyle.css');

let currUnitsFormat = localStorage.getItem('units') || 'Celsius';
const currLanguage = localStorage.getItem('language') || 'en';
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

const userLocation = getUserLocation();
setUpToDateLocationInfo(userLocation);

/* eslint-disable */
ymaps.ready(addMap);
/* eslint-enable */
setForecast();
setWeatherIcons();
setImg();

if (currUnitsFormat === 'Fahrenheit') {
  document.querySelector('.temp_change').classList.add('temp');
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
  if (event.target === document.querySelector('.navigation_menu_block-image_btn')) {
    document.getElementById('prldr').style = 'display: fixed;';
    if (document.querySelector('.search_menu_block-input').value.length > 2) {
      setImg(forecast, location);
    } else {
      setImg();
    }
  }
  if (event.target === document.querySelector('.eng_language_btn')) {
    localStorage.setItem('language', 'en');
    window.location.reload();
  }
  if (event.target === document.querySelector('.rus_language_btn')) {
    localStorage.setItem('language', 'ru');
    window.location.reload();
  }
  if (event.target === document.querySelector('.bel_language_btn')) {
    localStorage.setItem('language', 'be');
    window.location.reload();
  }
  if (event.target === document.querySelector('.search_menu_block-submit')) {
    document.getElementById('prldr').style = 'display: fixed;';

    const areaSearch = document.querySelector('.search_menu_block-input').value;
    const currForecast = await getForecast(useGeocod(areaSearch));
    forecast = await currForecast;
    location = await useGeocod(areaSearch);

    setUpToDateLocationInfo(useGeocod(areaSearch));
    setForecast(currForecast);
    setWeatherIcons(currForecast);
    setDate(currLanguage, setSearchTime(useGeocod(areaSearch)));

    timeDifference = await getTimeDifference(setSearchTime(useGeocod(areaSearch)));

    await deletePreLoad();

    if (currUnitsFormat === 'Fahrenheit') {
      setFahUnitFormat();
    }
  }
  if (event.target === document.querySelector('.temp_change')) {
    if (currUnitsFormat === 'Celsius') {
      localStorage.setItem('units', 'Fahrenheit');
      document.querySelector('.temp_change').classList.add('temp');
      setFahUnitFormat();
      currUnitsFormat = 'Fahrenheit';
    } else {
      localStorage.setItem('units', 'Celsius');
      document.querySelector('.temp_change').classList.remove('temp');
      currUnitsFormat = 'Celsius';
      setCelUnitFormat();
    }
  }
};

// Set Time
window.setInterval(setCurrTime, 3000, getTime);
