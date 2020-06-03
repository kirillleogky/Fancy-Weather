function convert(elem) {
  const valNum = parseFloat(elem);
  return Math.ceil((valNum - 32) / 1.8);
}

export default function setFahrenheitUnitFormat() {
  const currDegrees = document.getElementById('currDegrees');
  const firstFutureDegreesDay = document.getElementById('firstDegreesDay');
  const secondFutureDegreesDay = document.getElementById('secondDegreesDay');
  const thirdFutureDegreesDay = document.getElementById('thirdDegreesDay');
  const currFeelsLike = document.getElementById('currWeatherFeels');

  currDegrees.innerHTML = convert(currDegrees.innerHTML);
  firstFutureDegreesDay.innerHTML = convert(firstFutureDegreesDay.innerHTML);
  secondFutureDegreesDay.innerHTML = convert(secondFutureDegreesDay.innerHTML);
  thirdFutureDegreesDay.innerHTML = convert(thirdFutureDegreesDay.innerHTML);
  currFeelsLike.innerHTML = `${convert(thirdFutureDegreesDay.innerHTML)}°`;
}
