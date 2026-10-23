import { useEffect, useState } from "react";
import DateRow from "./DateRow.jsx";
import { couple, event, palette } from "../wedding.js";

const stamp = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

const calendarUrl =
  "https://calendar.google.com/calendar/render?" +
  new URLSearchParams({
    action: "TEMPLATE",
    text: `${couple.first} & ${couple.second} — Wedding`,
    dates: `${stamp(event.start)}/${stamp(event.end)}`,
    location: `${event.venue}, ${event.town}, ${event.country}`,
    details: `Wedding celebration of ${couple.first} & ${couple.second}. Dress code: ${palette
      .map((c) => c.name.toLowerCase())
      .join(", ")}.`,
  });

function remaining(now) {
  let s = Math.max(0, Math.floor((event.start - now) / 1000));
  const d = Math.floor(s / 86400);
  s -= d * 86400;
  const h = Math.floor(s / 3600);
  s -= h * 3600;
  const m = Math.floor(s / 60);
  return { d, h, m, s: s - m * 60 };
}

function Countdown() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const { d, h, m, s } = remaining(now);
  if (event.start - now <= 0) return <p className="countdown">Today is the day</p>;
  return (
    <p className="countdown" aria-live="off">
      <b>{d}</b> days <b>{h}</b> hours <b>{m}</b> min <b>{s}</b> sec
    </p>
  );
}

function MonthCalendar() {
  const lead = (new Date(Date.UTC(event.year, event.monthIndex, 1)).getUTCDay() + 6) % 7; // Monday first
  const length = new Date(Date.UTC(event.year, event.monthIndex + 1, 0)).getUTCDate();
  const cells = [...Array(lead).fill(null), ...Array.from({ length }, (_, i) => i + 1)];
  return (
    <figure className="month" aria-label={`${event.month} ${event.year}, the ${event.day}th marked`}>
      <figcaption className="month-title">
        {event.month} {event.year}
      </figcaption>
      <div className="month-grid" aria-hidden="true">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
          <span key={d} className="month-head">
            {d}
          </span>
        ))}
        {cells.map((n, i) =>
          n === event.day ? (
            <span key={i} className="month-day is-day">
              <svg viewBox="0 0 32 30" className="month-heart">
                <path d="M16 29C7.5 22.6 1.5 17.3 1.5 10.2 1.5 5.2 5.3 1.5 9.8 1.5c2.8 0 4.9 1.4 6.2 3.5 1.3-2.1 3.4-3.5 6.2-3.5 4.5 0 8.3 3.7 8.3 8.7 0 7.1-6 12.4-14.5 18.8z" />
              </svg>
              <span>{n}</span>
            </span>
          ) : (
            <span key={i} className="month-day">
              {n}
            </span>
          ),
        )}
      </div>
    </figure>
  );
}

export default function Celebration({ onRsvp }) {
  return (
    <section className="block celebration leafy" id="details" aria-labelledby="celebration-h">
      <div className="block-body reveal">
        <h2 className="h" id="celebration-h">
          Celebration Info
        </h2>
        <p className="sans-lead">The celebration will take place at:</p>
        <p className="venue-name">{event.venue}</p>
        <p className="lead small">
          {event.town}, {event.country}
        </p>
        <p className="time">
          {event.time} <span className="time-zone">{event.timezone}</span>
        </p>
        <DateRow strong />

        <div className="countdown-wrap">
          <p className="sans-small">Countdown</p>
          <Countdown />
        </div>

        <MonthCalendar />

        <div className="cal-links">
          <a className="underline-link" href={calendarUrl} target="_blank" rel="noopener">
            Add to Calendar
          </a>
          <a className="underline-link quiet" href={`${import.meta.env.BASE_URL}richmond-beatrice.ics`}>
            Apple / Outlook
          </a>
        </div>

        <button type="button" className="cta" onClick={onRsvp}>
          Confirm Attendance
        </button>
      </div>
    </section>
  );
}
