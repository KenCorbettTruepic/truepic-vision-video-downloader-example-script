import fetch from "node-fetch";
import fs from "fs";
import https from "https";

var downloadDirectory = "./downloads";

fs.rmSync(downloadDirectory, { recursive: true, force: true });
fs.mkdirSync(downloadDirectory);

export default async function downloadFile(url, filename) {
  console.log("Downloading file: " + filename);
  let retryCount = 0;
  while (retryCount < 3) {
    try {
      const response = await fetch(url, {
        timeout: 1000 * 60 * 5, // 5 minutes
        agent: new https.Agent({ keepAlive: true }),
      });
      const fileStream = fs.createWriteStream(
        `${downloadDirectory}/${filename}.mp4`
      );
      await new Promise((resolve, reject) => {
        response.body.pipe(fileStream);
        response.body.on("error", reject);
        fileStream.on("finish", resolve);
      });
      return true;
    } catch (error) {
      console.error("Download failed: " + filename);
      retryCount++;
    }
  }
  console.error("Maximum retries reached. Download failed: " + filename);
}
