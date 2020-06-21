import getForecast from '../Forecast/getForecast';
import weatherIcons from '../staticData/weatherIconsTags';

async function addWeatherIcons(day) {
  const prefix = 'wi-';
  const code = await day.weather[0].id;
  const { icon } = weatherIcons[code];

  return prefix + icon;
}

export default async function addToDomIcons(forecast = getForecast()) {
  const [currDay,,,,,,,, firstDay,,,,,,,, secondDay,,,,,,,,, thirdDay] = await forecast;

  const currIcon = document.getElementById('currWeatherCondition');
  const firstFutureIcon = document.getElementById('firstIconDay');
  const secondFutureIcon = document.getElementById('secondIconDay');
  const thirdFutureIcon = document.getElementById('thirdIconDay');


  currIcon.className = 'wi';
  firstFutureIcon.className = 'wi';
  secondFutureIcon.className = 'wi';
  thirdFutureIcon.className = 'wi';

  currIcon.classList.add(await addWeatherIcons(currDay));
  firstFutureIcon.classList.add(await addWeatherIcons(firstDay));
  secondFutureIcon.classList.add(await addWeatherIcons(secondDay));
  thirdFutureIcon.classList.add(await addWeatherIcons(thirdDay));
}
