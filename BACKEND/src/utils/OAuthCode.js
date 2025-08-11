
import { google } from "googleapis";
import fs from "fs";
import path from "path";
import readline from "readline";


const SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events"
];
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "src","credentials", "OAuth2.json");

console.log(CREDENTIALS_PATH);

let oAuth2Client;

async function loadOAuthClient() {
  const content = fs.readFileSync(CREDENTIALS_PATH, "utf-8");
  const credentials = JSON.parse(content);
  const { client_secret, client_id, redirect_uris } =
    credentials.installed || credentials.web;

  oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Load token if exists
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
    oAuth2Client.setCredentials(token);
  } else {
    await getAccessToken(oAuth2Client);
  }

  return oAuth2Client;
}

function getAccessToken(oAuth2Client) {
  return new Promise((resolve, reject) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    console.log("Authorize this app by visiting this URL:", authUrl);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Enter the code from that page here: ", (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) {
          reject("Error retrieving access token: " + err);
          return;
        }
        oAuth2Client.setCredentials(token);
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
        console.log("Token stored to", TOKEN_PATH);
        resolve(oAuth2Client);
      });
    });
  });
}

export { loadOAuthClient, oAuth2Client };
