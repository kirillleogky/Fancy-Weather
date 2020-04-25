export default async function getUserLocation() {
  const token = 'd12f917a258822';
  let response = await fetch(`https://ipinfo.io/json?token=${token}`);
  response = await response.json();
  return response;
}
