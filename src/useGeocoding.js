function deletePreCountryInfo(elem) {
  elem.childNodes.forEach((n) => n.nodeType === document.TEXT_NODE && n.remove());
}

export default async function getGeocoding(location) {
  const token = 'f7108eea-b3ec-4332-84ff-674b9a05bfa1';
  let newCoord = await fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&lang=en_US&apikey=${token}&geocode=${location}`);
  newCoord = await newCoord.json();
  newCoord = await newCoord.response;
  newCoord = await newCoord.GeoObjectCollection;
  newCoord = await newCoord.featureMember;
  newCoord = await newCoord[0];
  newCoord = await newCoord.GeoObject;
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
  document.getElementById('country').prepend(`${country}`);

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
