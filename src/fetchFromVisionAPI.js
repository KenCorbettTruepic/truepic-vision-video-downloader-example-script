import fetch from "node-fetch";

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const API_DOMAIN = process.env.API_DOMAIN || "https://vision-api.truepic.com";
const AUTH_TOKEN_URL =
  process.env.AUTH_TOKEN_URL ||
  "https://truepic-vision-dev.auth0.com/oauth/token";

let access_token = null; // If you have an access token, you can also just set it here too.

async function getAccessToken() {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error("Missing CLIENT_ID or CLIENT_SECRET");
  }

  const body = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    audience: API_DOMAIN,
    grant_type: "client_credentials",
  };

  const response = await fetch(AUTH_TOKEN_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const jsonData = await response.json();

  if (response.status !== 200) {
    console.error(jsonData);
    throw new Error("Error getting access token");
  }

  access_token = jsonData.access_token;
}

export default async function fetchFromVisionAPI(path, params) {
  if (!access_token) {
    await getAccessToken();
  }
  const url = `${API_DOMAIN}/v2/${path}?${params}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const jsonData = await response.json();
  if (response.status !== 200) {
    console.error(jsonData);
    throw new Error("Error fetching from API", url, jsonData);
  }
  return jsonData.result;
}
