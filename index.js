import "./src/initializeEnvValues.js";
import getRecentEventsWithPhotos from "./src/getRecentEventsWithPhotos.js";
import getFullEventData from "./src/getFullEventData.js";
import asyncForEach from "./src/asyncForEach.js";
import downloadFile from "./src/downloadFile.js";

try {
  const events = await getRecentEventsWithPhotos();
  const videosFromEvents = [];
  await asyncForEach(
    events.map((event) => event.id),
    async (eventId) => {
      // TODO: check if you have already already checked this event for videos
      console.log(`Fetching full details for event: ${eventId}...`);
      const fullEventData = await getFullEventData(eventId);
      fullEventData.photos
        .filter((photo) => photo.mp4)
        .forEach(({ id, mp4 }) => videosFromEvents.push({ eventId, id, mp4 }));
      await new Promise((resolve) => setTimeout(resolve, 500)); // wait 500ms between requests
    }
  );

  const notSavedVideos = [];
  await asyncForEach(videosFromEvents, async (video) => {
    // TODO: check if you have already saved this video
    notSavedVideos.push(video);
  });

  console.log(notSavedVideos.length + " videos found.");
  await asyncForEach(videosFromEvents, async ({ eventId, id, mp4 }) => {
    await downloadFile(mp4, `${eventId}-${id}`);
  });
  console.log("Done!");
} catch (error) {
  console.error(error);
}
