import getUserLocation from './getLocation';

export default async function getWeatherForecast(location = getUserLocation()) {
  try {
    const token = '6aa0863ac4d38dccf1f9aba54c050563';
    const { loc } = await location;
    const latitude = loc.split(',')[0];
    const longitude = loc.split(',')[1];

    const forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${token}&units=metric`);
    const forecastJson = await forecast.json();
    return await forecastJson.list;
  } catch (e) {
    throw new Error(e);
  }
}
