
import { google } from "googleapis";
import { loadOAuthClient } from "./OAuthCode.js";

export async function createGoogleMeet({ summary, description, startTime, endTime, attendees }) {

  const auth = await loadOAuthClient();
  const calendar = google.calendar({ version: "v3", auth});

  const event = {
    summary,
    description,
    start: {
      dateTime: startTime,
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: endTime,
      timeZone: "Asia/Kolkata",
    },
    attendees: attendees.map(email => ({ email })),
    conferenceData: {
      createRequest: {
        requestId: Math.random().toString(36).substring(2),
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
      conferenceDataVersion: 1,
    });

    return response.data.hangoutLink;
  } catch (err) {
    console.error("Error creating Google Meet:", err);
    throw new Error("Failed to create Google Meet link");
  }
}
