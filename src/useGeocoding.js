import getUserLocation from './getLocation';
import { GEOCODE_MAPS_YANDEX_TOKEN, TRANSLATE_YANDEX } from './constants';

async function getCurrentCountry(text) {
  let lang = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${TRANSLATE_YANDEX}&text=${text}&lang=${localStorage.getItem('language')}`);
  lang = await lang.json();
  return lang.text[0];
}

function deletePreCountryInfo(elem) {
  elem.childNodes.forEach((n) => n.nodeType === document.TEXT_NODE && n.remove());
}

export default async function getGeocoding(location) {
  let cityIp = await getUserLocation();
  cityIp = await cityIp.city;
  let newCoord;
  try {
    newCoord = await fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&lang=en_US&apikey=${GEOCODE_MAPS_YANDEX_TOKEN}&geocode=${location}`);
    newCoord = await newCoord.json();
    newCoord = await newCoord.response;
    newCoord = await newCoord.GeoObjectCollection;
    newCoord = await newCoord.featureMember;
    newCoord = await newCoord[0];
    newCoord = await newCoord.GeoObject;
  } catch (e) {
    newCoord = await fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&lang=en_US&apikey=${GEOCODE_MAPS_YANDEX_TOKEN}&geocode=${cityIp}`);
    newCoord = await newCoord.json();
    newCoord = await newCoord.response;
    newCoord = await newCoord.GeoObjectCollection;
    newCoord = await newCoord.featureMember;
    newCoord = await newCoord[0];
    newCoord = await newCoord.GeoObject;
  }
  let coord = await newCoord.Point;
  coord = await coord.pos;
  coord = await coord.split(' ');
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

  deletePreCountryInfo(document.getElementById('country'));
  document.getElementById('country').prepend(`${await getCurrentCountry(country)}`);

  document.getElementById('map').innerHTML = '';
  let maps;
  /* eslint-disable */
      maps = new ymaps.Map('map', {
        center: [0, 0],
        zoom: 10
      });
      maps.setCenter([latitude, longitude]);
  /* eslint-enable */
  return currInfoObj;
}
