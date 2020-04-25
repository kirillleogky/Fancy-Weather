export default async function getTimeDifference(currDate) {
  const currDateTime = await currDate;
  const pastDateTime = new Date();
  if (currDateTime > pastDateTime) {
    return currDateTime.getHours() - pastDateTime.getHours();
  }
  return pastDateTime.getHours() - currDateTime.getHours();
}
