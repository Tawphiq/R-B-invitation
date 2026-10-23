# Richmond & Beatrice: wedding invitation

A digital wedding invitation built with Vite and React. Guests open a wax-sealed envelope, then scroll a boho floral invitation: photo frames, ceremony details, countdown and calendar, dress code, venue map, and an RSVP form.

```bash
npm install
npm run dev       # local preview at http://localhost:5173
npm run build     # production build in dist/
```

## Where things live

| Path | Purpose |
| --- | --- |
| `src/wedding.js` | All invitation content: names, date, venue, coordinates, colours, photos |
| `src/components/` | `Envelope` (opening), `Cover`, `Ceremony`, `Gallery`, `Celebration`, `DressCode`, `Venue`, `Closing`, `RsvpDialog` |
| `src/assets/` | Watercolour florals, leaves and floral band artwork |
| `src/styles.css` | Design tokens and styles |
| `public/richmond-beatrice.ics` | Calendar file for Apple Calendar / Outlook |
| `rsvp-apps-script.gs` | Google Apps Script that saves RSVPs to a Google Sheet |

## 1. Connect the RSVP form (about 5 minutes)

1. Create a new Google Sheet, for example "R&B Wedding RSVPs".
2. In the sheet, open **Extensions → Apps Script**.
3. Replace the editor contents with `rsvp-apps-script.gs` and save.
4. Click **Deploy → New deployment**, choose type **Web app**, set
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Authorise when asked, then copy the **Web app URL** (ends in `/exec`).
6. Give the URL to the build:
   - **Locally / Netlify:** copy `.env.example` to `.env` and set `VITE_RSVP_ENDPOINT=<url>`. On Netlify, add the same name under **Site configuration → Environment variables**.
   - **GitHub Pages:** add a repository variable `VITE_RSVP_ENDPOINT` under **Settings → Secrets and variables → Actions → Variables**.

Replies then appear as rows in the **RSVPs** tab: time received, attendance, name(s), guest count.

Until the URL is set, the form tells guests that online replies aren't switched on yet.

## 2. Publish the site

- **GitHub Pages:** push to GitHub, then set **Settings → Pages → Source** to **GitHub Actions**. The included workflow builds and deploys on every push to `main`.
- **Netlify:** connect the repo with build command `npm run build` and publish directory `dist`, or run `npm run build` and drag `dist/` onto <https://app.netlify.com/drop>.

Share the resulting link with guests, for example over WhatsApp.

## Adding photos

Put image files in `public/photos/` and list them in `photos` in `src/wedding.js`:

```js
export const photos = {
  groom: "photos/richmond.jpg",   // tilted frame beside "Groom"
  bride: "photos/beatrice.jpg",   // tilted frame beside "Bride"
  gallery: ["photos/1.jpg", "photos/2.jpg", "photos/3.jpg"],
};
```

Empty frames show the couple's initials, and the Photo Gallery section stays hidden until `gallery` has photos. Three photos fill the layout best (one tall on the left, two stacked on the right).

## Personal links for guests

Add `?to=` with the guest's name to the link you send. The name is written on the envelope and filled into the RSVP form:

```
https://your-site.example/?to=Kwame%20%26%20Ama%20Mensah
```

Use `%20` for spaces and `%26` for `&`. Without `?to=`, the envelope reads "For our dear guest".

The envelope opens once per browser session. Links ending in `#rsvp` skip the envelope and open the RSVP form directly.

## Notes

- The calendar entries use 12:00–18:00 GMT. Change `event.end` in `src/wedding.js` and `DTEND` in `public/richmond-beatrice.ics` if the celebration runs longer.
