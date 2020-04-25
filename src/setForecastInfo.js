import getForecast from './getForecast';

function deletePreWeatherInfo(elem) {
  elem.childNodes.forEach((n) => n.nodeType === document.TEXT_NODE && n.remove());
}

function setFutureWeather(domElem, elem) {
  deletePreWeatherInfo(domElem);
  domElem.prepend(`${Math.floor(elem.main.temp)}`);
}

export default async function setForecast(forecast = getForecast()) {
  const [firstDay,,,,,,,, secondDay,,,,,,,, thirdDay,,,,,,,,, fourthDay] = await forecast;

  const currDegrees = document.getElementById('currDegrees');
  deletePreWeatherInfo(currDegrees);
  currDegrees.prepend(`${Math.floor(firstDay.main.temp)}`);


  const currWeatherType = document.getElementById('currWeatherType');
  deletePreWeatherInfo(currWeatherType);
  currWeatherType.prepend(`${firstDay.weather[0].main}`);

  const currWeatherFeels = document.getElementById('currWeatherFeels');
  deletePreWeatherInfo(currWeatherFeels);
  currWeatherFeels.prepend(`${Math.floor(firstDay.main.feels_like)}°`);

  const currWeatherWind = document.getElementById('currWeatherWind');
  deletePreWeatherInfo(currWeatherWind);
  currWeatherWind.prepend(`${Math.floor(firstDay.wind.speed)} m/s`);

  const currWeatherHumidity = document.getElementById('currWeatherHumidity');
  deletePreWeatherInfo(currWeatherHumidity);
  currWeatherHumidity.prepend(`${Math.floor(firstDay.main.humidity)} %`);


  const firstFutureDegreesDay = document.getElementById('firstDegreesDay');
  const secondFutureDegreesDay = document.getElementById('secondDegreesDay');
  const thirdFutureDegreesDay = document.getElementById('thirdDegreesDay');
  setFutureWeather(firstFutureDegreesDay, secondDay);
  setFutureWeather(secondFutureDegreesDay, thirdDay);
  setFutureWeather(thirdFutureDegreesDay, fourthDay);
}
