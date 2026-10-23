// All invitation content lives here, so details can change without touching components.

export const couple = { first: "Richmond", second: "Beatrice" };

export const event = {
  start: new Date("2026-11-28T12:00:00Z"),
  // No end time was given; calendar entries assume six hours.
  end: new Date("2026-11-28T18:00:00Z"),
  weekday: "Saturday",
  day: 28,
  month: "November",
  monthIndex: 10, // 0-based: November
  year: 2026,
  time: "12:00",
  timezone: "GMT",
  venue: "Esereso Divine Junction",
  town: "Kumasi",
  country: "Ghana",
  lat: 6.65784,
  lng: -1.560961,
};

export const palette = [
  { name: "Brown", hex: "#6B4429" },
  { name: "Ash", hex: "#A8A49D" },
  { name: "Burnt Orange", hex: "#C0531D" },
  { name: "Beige", hex: "#DCCAAB" },
];

// Photos: put image files in public/photos/ and list them here, e.g. "photos/richmond.jpg".
// Empty frames show the couple's initials; the gallery section is hidden until it has photos.
export const photos = {
  groom: "",
  bride: "",
  gallery: [],
};

// Background music, started by the envelope tap. Put an MP3 in public/music/ and name it here; "" turns music off.
// Default: Pachelbel's Canon in D by the Air Force Strings (U.S. Air Force Band), public domain, via Wikimedia Commons.
export const music = "music/canon-in-d.mp3";

export const closingLine ="Your presence would be the greatest gift we could receive!";

export const guestCounts = ["1", "2", "3", "4", "5+"];

// Google Apps Script web-app URL that stores replies in a Google Sheet (see README.md).
export const RSVP_ENDPOINT = import.meta.env.VITE_RSVP_ENDPOINT || "";
