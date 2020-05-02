export default async function getUserLocation() {
  const tokenIp = 'd12f917a258822';
  let responseIp = await fetch(`https://ipinfo.io/json?token=${tokenIp}`);
  responseIp = await responseIp.json();

  const token = '25d5d7222a366b92e02ec8c9aee0902a';
  let response = await fetch(`http://api.ipstack.com/${responseIp.ip}?access_key=${token}`);
  response = await response.json();

  const lat = response.latitude.toFixed(4);
  const long = response.longitude.toFixed(4);
  return {
    city: `${response.city}`,
    loc: `${lat},${long}`,
    country: `${response.country_code}`,
  };
}
