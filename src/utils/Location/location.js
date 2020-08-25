import {
  GEOCODE_MAPS_YANDEX_TOKEN,
  TRANSLATE_YANDEX,
  IPINFO_TOKEN,
  IPSTACK_TOKEN,
} from "../staticData/constants";

async function getCurrentCountry(text) {
  let lang = await fetch(
    `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${TRANSLATE_YANDEX}&text=${text}&lang=${localStorage.getItem(
      "language"
    )}`
  );
  lang = await lang.json();
  return lang.text[0];
}

// // function deletePreCountryInfo(elem) {
//   elem.childNodes.forEach(
//     (n) => n.nodeType === document.TEXT_NODE && n.remove()
//   );
// }

async function getCurrentCity(text) {
  let lang = await fetch(
    `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${TRANSLATE_YANDEX}&text=${text}&lang=${localStorage.getItem(
      "language"
    )}`
  );
  lang = await lang.json();
  return lang.text[0];
}

function deletePreLocationInfo(elem) {
  elem.childNodes.forEach(
    (n) => n.nodeType === document.TEXT_NODE && n.remove()
  );
}

// Get Location
async function getUserLocation() {
  let responseIp = await fetch(`https://ipinfo.io/json?token=${IPINFO_TOKEN}`);
  responseIp = await responseIp.json();

  let response = await fetch(
    `http://api.ipstack.com/${responseIp.ip}?access_key=${IPSTACK_TOKEN}`
  );
  response = await response.json();

  const lat = response.latitude.toFixed(4);
  const long = response.longitude.toFixed(4);
  return {
    city: `${response.city}`,
    loc: `${lat},${long}`,
    country: `${response.country_code}`,
  };
}

// Use Geocoding
async function useGeocoding() {
  let cityIp = await getUserLocation();
  cityIp = await cityIp.city;

  let areaSearch = document.querySelector(".search_menu_block-input").value;
  areaSearch = areaSearch === "" ? cityIp : areaSearch;

  let newCoord;
  try {
    newCoord = await fetch(
      `https://geocode-maps.yandex.ru/1.x/?format=json&lang=en_US&apikey=${GEOCODE_MAPS_YANDEX_TOKEN}&geocode=${areaSearch}`
    );
    newCoord = await newCoord.json();
    newCoord = await newCoord.response;
    newCoord = await newCoord.GeoObjectCollection;
    newCoord = await newCoord.featureMember;
    newCoord = await newCoord[0];
    newCoord = await newCoord.GeoObject;
  } catch (e) {
    newCoord = await fetch(
      `https://geocode-maps.yandex.ru/1.x/?format=json&lang=en_US&apikey=${GEOCODE_MAPS_YANDEX_TOKEN}&geocode=${cityIp}`
    );
    newCoord = await newCoord.json();
    newCoord = await newCoord.response;
    newCoord = await newCoord.GeoObjectCollection;
    newCoord = await newCoord.featureMember;
    newCoord = await newCoord[0];
    newCoord = await newCoord.GeoObject;
  }
  let coord = await newCoord.Point;
  coord = await coord.pos;
  coord = await coord.split(" ");
  const [longitude, latitude] = await coord;
  const country = await newCoord.description;
  let countryCode = await newCoord.metaDataProperty;
  countryCode = await countryCode.GeocoderMetaData;
  countryCode = await countryCode.Address;
  countryCode = await countryCode.country_code;

  const city = await newCoord.name;

  const currInfoObj = {
    city: `${city}`,
    loc: `${latitude},${longitude}`,
    country: `${countryCode}`,
  };
  document.getElementById("country").textContent = `${await getCurrentCountry(
    country
  )}`;
  document.getElementById("map").innerHTML = "";
  let maps;
  /* eslint-disable */
  maps = new ymaps.Map("map", {
    center: [0, 0],
    zoom: 10,
  });
  maps.setCenter([latitude, longitude]);
  /* eslint-enable */
  return currInfoObj;
}

// Set Location
async function setLocation(isUserLocation) {
  const location = isUserLocation ? getUserLocation() : useGeocoding();
  const { city, loc } = await location;
  const latitude = loc.split(",")[0];
  const longitude = loc.split(",")[1];
  const currCity = await getCurrentCity(city);

  deletePreLocationInfo(document.getElementById("city"));
  deletePreLocationInfo(document.getElementById("latitude"));
  deletePreLocationInfo(document.getElementById("longitude"));

  document.getElementById("city").prepend(`${currCity}, `);
  document.getElementById("latitude").prepend(latitude);
  document.getElementById("longitude").prepend(longitude);
}

export { useGeocoding, setLocation, getUserLocation };
