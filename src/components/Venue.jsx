import { event } from "../wedding.js";

const coords = `${event.lat.toFixed(7)}, ${event.lng.toFixed(7)}`;
const q = `${event.lat.toFixed(6)},${event.lng.toFixed(6)}`;
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed`;

export default function Venue() {
  return (
    <section className="block venue leafy" aria-labelledby="venue-h">
      <div className="block-body reveal">
        <h2 className="h" id="venue-h">
          Wedding Venue
        </h2>
        <p className="venue-name">{event.venue}</p>
        <p className="lead small">
          {event.town}, {event.country}
        </p>
        <p className="coords">{coords}</p>
        <div className="map">
          <iframe title={`Map of ${event.venue}`} src={embedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
        <a className="directions" href={mapsUrl} target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 3 3 10.5l7.2 2.3L12.5 20z" />
          </svg>
          Get directions
        </a>
      </div>
    </section>
  );
}
