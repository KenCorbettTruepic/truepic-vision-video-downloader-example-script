import fetch from "node-fetch";
import fs from "fs";

var downloadDirectory = "./downloads";

fs.rmSync(downloadDirectory, { recursive: true, force: true });
fs.mkdirSync(downloadDirectory);

export default async function downloadFile(url, filename) {
  console.log("Downloading file: " + filename);
  const response = await fetch(url);
  const fileStream = fs.createWriteStream(
    `${downloadDirectory}/${filename}.mp4`
  );
  await new Promise((resolve, reject) => {
    response.body.pipe(fileStream);
    response.body.on("error", reject);
    fileStream.on("finish", resolve);
  });
}
