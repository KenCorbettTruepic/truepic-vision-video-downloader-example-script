import fetchFromVisionAPI from "./fetchFromVisionAPI.js";

export default async function getFullEventData(eventId) {
  return fetchFromVisionAPI(`/events/${eventId}`);
}
