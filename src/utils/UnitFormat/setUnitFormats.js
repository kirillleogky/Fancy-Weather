function convertFahrenheitToCelsius(elem) {
  const valNum = parseFloat(elem);
  return Math.ceil((valNum - 32) / 1.8);
}

function convertCelsiusToFahrenheit(elem) {
  const valNum = parseFloat(elem);
  return ((valNum * 1.8) + 32).toFixed(1);
}

function setCelsiusUnitFormat() {
  const currDegrees = document.getElementById('currDegrees');
  const firstFutureDegreesDay = document.getElementById('firstDegreesDay');
  const secondFutureDegreesDay = document.getElementById('secondDegreesDay');
  const thirdFutureDegreesDay = document.getElementById('thirdDegreesDay');
  const currFeelsLike = document.getElementById('currWeatherFeels');

  currDegrees.innerHTML = convertFahrenheitToCelsius(currDegrees.innerHTML);
  firstFutureDegreesDay.innerHTML = convertFahrenheitToCelsius(firstFutureDegreesDay.innerHTML);
  secondFutureDegreesDay.innerHTML = convertFahrenheitToCelsius(secondFutureDegreesDay.innerHTML);
  thirdFutureDegreesDay.innerHTML = convertFahrenheitToCelsius(thirdFutureDegreesDay.innerHTML);
  currFeelsLike.innerHTML = `${convertFahrenheitToCelsius(thirdFutureDegreesDay.innerHTML)}°`;
}

function setFahrenheitUnitFormat() {
  const currDegrees = document.getElementById('currDegrees');
  const firstFutureDegreesDay = document.getElementById('firstDegreesDay');
  const secondFutureDegreesDay = document.getElementById('secondDegreesDay');
  const thirdFutureDegreesDay = document.getElementById('thirdDegreesDay');
  const currFeelsLike = document.getElementById('currWeatherFeels');

  currDegrees.innerHTML = convertCelsiusToFahrenheit(currDegrees.innerHTML);
  firstFutureDegreesDay.innerHTML = convertCelsiusToFahrenheit(firstFutureDegreesDay.innerHTML);
  secondFutureDegreesDay.innerHTML = convertCelsiusToFahrenheit(secondFutureDegreesDay.innerHTML);
  thirdFutureDegreesDay.innerHTML = convertCelsiusToFahrenheit(thirdFutureDegreesDay.innerHTML);
  currFeelsLike.innerHTML = `${convertCelsiusToFahrenheit(thirdFutureDegreesDay.innerHTML)}°`;
}

export { setCelsiusUnitFormat, setFahrenheitUnitFormat };
