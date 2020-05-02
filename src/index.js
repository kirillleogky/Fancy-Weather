import '@babel/polyfill';
import 'weather-icons/css/weather-icons.min.css';
import addHTMLstructure from './addHtml';
import showLanguage from './showLang';
import {
  searchBy, search, feels, wind, humidity, latitude, longitude,
} from './wordsData';
import getUserLocation from './getLocation';
import setUpToDateLocationInfo from './setLocationInfo';
import addMap from './addMap';
import getForecast from './getForecast';
import setForecast from './setForecastInfo';
import setWeatherIcons from './setIcons';
import setDate from './setDate';
import setCurrTime from './setCurrTime';
import setImg from './setBackgroundImg';
import useGeocod from './useGeocoding';
import setSearchTime from './setSearchingTime';
import getTimeDifference from './getTimeDifference';
import setFahUnitFormat from './setFahrenheitUnitFormat';
import setCelUnitFormat from './setCelsiusUnitFormat';
import delerePreLoad from './delPreLoad';

require('./style.css');
require('./preLoaderStyle.css');

let currUnitsFormat = localStorage.getItem('units') || 'Celsius';
const currLanguage = 'en';
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
    if (document.querySelector('.search_menu_block-input').value.length > 2) {
      setImg(forecast, location);
    } else {
      setImg();
    }
  }
  if (event.target === document.querySelector('.search_menu_block-submit')) {
    const areaSearch = document.querySelector('.search_menu_block-input').value;
    const currForecast = await getForecast(useGeocod(areaSearch));
    forecast = await currForecast;
    location = await useGeocod(areaSearch);

    setUpToDateLocationInfo(useGeocod(areaSearch));
    setForecast(currForecast);
    setWeatherIcons(currForecast);
    setDate(currLanguage, setSearchTime(useGeocod(areaSearch)));

    timeDifference = await getTimeDifference(setSearchTime(useGeocod(areaSearch)));

    document.getElementById('prldr').style = 'display: fixed;';
    setTimeout(delerePreLoad, 4000);

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

setTimeout(delerePreLoad, 7000);
