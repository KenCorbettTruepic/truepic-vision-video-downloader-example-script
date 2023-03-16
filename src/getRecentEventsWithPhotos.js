import fetchFromVisionAPI from "./fetchFromVisionAPI.js";

export default async function getRecentEventsWithPhotos() {
  console.log("Fetching recent events from Vision API...");
  const searchParams = new URLSearchParams(
    Object.entries({
      "page[number]": 1,
      "page[size]": 50,
      "sort[created_at]": "desc",
      "filter[status][in][]": 2, // Ready for review
      "filter[status][in][]": 5, // Closed
      "filter[photos][is not]": null, // with photos
    })
  );

  const events = await fetchFromVisionAPI("/events", searchParams);
  console.log(`Found ${events.length} events.`);
  return events;
}
