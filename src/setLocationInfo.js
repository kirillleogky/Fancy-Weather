function deletePreLocationInfo(elem) {
  elem.childNodes.forEach((n) => n.nodeType === document.TEXT_NODE && n.remove());
}

export default async function setLocation(location) {
  const { city, loc } = await location;
  const latitude = loc.split(',')[0];
  const longitude = loc.split(',')[1];

  deletePreLocationInfo(document.getElementById('city'));
  deletePreLocationInfo(document.getElementById('latitude'));
  deletePreLocationInfo(document.getElementById('longitude'));

  document.getElementById('city').prepend(`${city}, `);
  document.getElementById('latitude').prepend(latitude);
  document.getElementById('longitude').prepend(longitude);
}
