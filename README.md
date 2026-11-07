# Richmond & Beatrice: wedding invitation

A digital wedding invitation built with Vite and React. Guests open a wax-sealed envelope, which starts soft background music, then scroll a boho floral invitation with parallax depth: ceremony details, photo gallery, countdown and calendar, dress code, venue map, and an RSVP form.

```bash
npm install
npm run dev       # local preview at http://localhost:5173
npm run build     # production build in dist/
```

## Where things live

| Path | Purpose |
| --- | --- |
| `src/wedding.js` | All invitation content: names, date, venue, coordinates, colours, photos |
| `src/components/` | `Envelope` (opening), `Cover`, `Ceremony`, `Gallery`, `Celebration`, `DressCode`, `Venue`, `Closing`, `RsvpDialog`, `Music` (background music and its toggle) |
| `src/parallax.js` | GSAP ScrollTrigger parallax: which layers drift, and by how much |
| `src/assets/` | Watercolour florals, leaves and floral band artwork |
| `src/styles.css` | Design tokens and styles |
| `public/richmond-beatrice.ics` | Calendar file for Apple Calendar / Outlook |
| `public/gallery/` | Photo Gallery images |
| `public/music/` | Background music |

## 1. RSVP replies (Google Form)

The RSVP dialog sends each reply straight to the couple's Google Form, <https://forms.gle/DTYVYwgcxy6L7KZ28>. Replies appear in the form's **Responses** tab, with a timestamp; **Link to Sheets** there collects them in a Google Sheet too.

The questions are matched up in `rsvpForm` in `src/wedding.js`:

| Invitation field | Form question | Sent as |
| --- | --- | --- |
| Full name(s) | "Full Name" (`entry.1710590140`) | as typed |
| Contact number | "Contact" (`entry.2095523272`) | as typed |
| Will you attend? | "Can you make it" (`entry.1768927054`) | `Yes` / `No` |

All three are required on both forms. The invitation can also ask accepting guests how many are coming, but only once the form has a question for it: add a **Short answer** question such as "Number of guests", then put its entry ID in `rsvpForm.guests` (it is sent as `1`–`5+`, or `0` for a decline).

To find a question's entry ID, open **⋮ → Get pre-filled link** in the form editor, type anything into each answer, click **Get link** and copy it. The link has an `entry.<number>=` part for each question.

Google rejects a reply without telling the guest if a required question is missing or an answer doesn't match a multiple-choice option, so after changing the form, update `rsvpForm` and send one test reply. Leave sign-in requirements off (**Collect email addresses: Verified**, **Limit to 1 response**), because replies come from the website rather than a signed-in Google account.

Set `action` to `""` to switch online replies off; the dialog then asks guests to reply to the couple directly.

## 2. Publish the site

- **GitHub Pages:** push to GitHub, then set **Settings → Pages → Source** to **GitHub Actions**. The included workflow builds and deploys on every push to `main`.
- **Netlify:** connect the repo with build command `npm run build` and publish directory `dist`, or run `npm run build` and drag `dist/` onto <https://app.netlify.com/drop>.

Share the resulting link with guests, for example over WhatsApp.

## Adding photos

Put image files in `public/gallery/` and list them in `photos` in `src/wedding.js`:

```js
export const photos = {
  gallery: ["gallery/1.jpeg", "gallery/2.jpeg", "gallery/3.jpeg", "gallery/4.jpeg"],
};
```

The Photo Gallery section stays hidden until `gallery` has photos. Three photos show as one tall on the left with two stacked on the right; four or more show as portrait tiles, two to a row (4:5). Each photo drifts slowly inside its tile as the page scrolls, so a little of its top and bottom is cropped at any moment; keep faces away from the very edges.

## Personal links for guests

Add `?to=` with the guest's name to the link you send. The name is written on the envelope and filled into the RSVP form:

```
https://your-site.example/?to=Kwame%20%26%20Ama%20Mensah
```

Use `%20` for spaces and `%26` for `&`. Without `?to=`, the envelope reads "Cordially invite our dear guest".

The envelope greets guests on every visit, including after a refresh. Links ending in `#rsvp` skip the envelope and open the RSVP form directly.

## Music

Tapping the envelope's "Open" seal starts the music (browsers only allow sound after a tap). Guests can pause it with the round button above the reply button, and it rests while the tab is in the background.

The song is "Ordinary" by Alex Warren. It is a commercial recording, so the MP3 isn't included in this repo: save your own copy as `public/music/ordinary.mp3`. Until that file exists, the music button does nothing.

To change the song, put an MP3 in `public/music/` and set `music` in `src/wedding.js`, for example `music: "music/our-song.mp3"`. Keep it small (around 3 MB, e.g. 96–128 kbps) since many guests open the link on mobile data. Set it to `""` to turn music off.

`public/music/canon-in-d.mp3` is the earlier track: Pachelbel's Canon in D by the Air Force Strings of the U.S. Air Force Band, public domain ([source](https://commons.wikimedia.org/wiki/File:Canon_(2004)_-_Strolling_Strings_-_United_States_Air_Force_Band.mp3)). Set `music: "music/canon-in-d.mp3"` to go back to it.

## Notes

- The calendar entries use 12:00–18:00 GMT. Change `event.end` in `src/wedding.js` and `DTEND` in `public/richmond-beatrice.ics` if the celebration runs longer.
