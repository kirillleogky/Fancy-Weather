import getLocation from './getLocation';
import getForecast from './getForecast';
import deletePreLoad from './delPreLoad';


export default async function setImage(forecast = getForecast(), location = getLocation()) {
  const month = new Date().getMonth();
  const hours = new Date().getHours();

  let timeOfTheYear;
  let timeOfDay;

  switch (month) {
    case 11:
    case 0:
    case 1:
      timeOfTheYear = 'winter';
      break;
    case 2:
    case 3:
    case 4:
      timeOfTheYear = 'spring';
      break;
    case 5:
    case 6:
    case 7:
      timeOfTheYear = 'summer';
      break;
    case 8:
    case 9:
    case 10:
      timeOfTheYear = 'autumn';
      break;
    default:
      break;
  }

  switch (hours) {
    case 0:
    case 1:
    case 2:
    case 3:
      timeOfDay = 'night';
      break;
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
      timeOfDay = 'morning';
      break;
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
      timeOfDay = 'afternoon';
      break;
    case 17:
    case 18:
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
      timeOfDay = 'evening';
      break;
    default:
      break;
  }

  const { city } = await location;
  let [currWeather] = await forecast;
  currWeather = currWeather.weather[0].main;


  const token = 'cf2e15678b05f9556afd2598ef1c48b956b8b7295f08ebda3df1191a79e28d6e';

  let backgroundImg = await fetch(`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${city},${currWeather},${timeOfTheYear},${timeOfDay}&client_id=${token}`);
  backgroundImg = await backgroundImg.json();
  backgroundImg = await backgroundImg.urls;
  backgroundImg = await backgroundImg.full;

  const elemBody = document.querySelector('body');
  elemBody.style.backgroundImage = `url(${backgroundImg})`;
  elemBody.style.backgroundSize = 'cover';
  elemBody.style.backgroundRepeat = 'no-repeat';

  const img = new Image();
  img.src = backgroundImg;
  img.onload = () => {
    deletePreLoad();
  };
}
