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
  // Pin shared by the couple; "Get directions" opens this link, the embedded map uses lat/lng.
  mapLink: "https://maps.app.goo.gl/cJthc1GydB4NM2uG6",
  lat: 6.630216,
  lng: -1.55458,
};

export const palette = [
  { name: "Brown", hex: "#6B4429" },
  { name: "Ash", hex: "#A8A49D" },
  { name: "Burnt Orange", hex: "#C0531D" },
  { name: "Beige", hex: "#DCCAAB" },
];

// Photo Gallery: put image files in public/gallery/ and list them here; an empty list hides the section.
export const photos = {
  gallery: ["gallery/1.jpeg", "gallery/2.jpeg", "gallery/3.jpeg", "gallery/4.jpeg"],
};

// Background music, started by the envelope tap. Put an MP3 in public/music/ and name it here; "" turns music off.
// "Ordinary" by Alex Warren: the MP3 is supplied by the couple (see README.md).
export const music = "music/ordinary.mp3";

export const closingLine ="Your presence would be the greatest gift we could receive!";

export const guestCounts = ["1", "2", "3", "4", "5+"];

// Replies are sent to the couple's Google Form (https://forms.gle/DTYVYwgcxy6L7KZ28); see README.md.
// Each value is a question's entry ID, and the answers must match the form's options exactly.
// The invite only asks for the guest count when `guests` has an entry ID; "" for `action` turns online replies off.
export const rsvpForm = {
  action: "https://docs.google.com/forms/d/e/1FAIpQLSefZ3l1snBisaEOfeo9ljPta3qMdDP-m34gjyw3nr3W94Bong/formResponse",
  name: "entry.1710590140", // "Full Name"
  attendance: { entry: "entry.1768927054", accept: "Yes", decline: "No" }, // "Can you make it"
  contact: "entry.2095523272", // "Contact"
  guests: "", // the form has no guest-count question
};
