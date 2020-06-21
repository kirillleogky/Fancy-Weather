import getUserLocation from "../Location/getLocation";
import useGeocoding from "../Location/useGeocoding";

import { OPENWEATHERMAP_TOKEN } from "../staticData/constants";

export default async function getWeatherForecast() {
  let location = document.querySelector(".search_menu_block-input").value;
  location = location === "" ? getUserLocation() : useGeocoding();

  try {
    const { loc } = await location;
    const latitude = loc.split(",")[0];
    const longitude = loc.split(",")[1];

    const forecast = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHERMAP_TOKEN}&units=metric`
    );
    const forecastJson = await forecast.json();
    return await forecastJson.list;
  } catch (e) {
    throw new Error(e);
  }
}
