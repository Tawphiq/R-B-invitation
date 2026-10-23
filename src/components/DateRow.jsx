import { event } from "../wedding.js";

export default function DateRow({ strong = false }) {
  return (
    <div className={`date-row${strong ? " is-strong" : ""}`}>
      <p className="date-line">
        <span className="date-side">{event.weekday}</span>
        <span className="date-bar" aria-hidden="true" />
        <span className="date-day">{event.day}</span>
        <span className="date-bar" aria-hidden="true" />
        <span className="date-side">{event.month}</span>
      </p>
      <p className="date-year">{event.year}</p>
    </div>
  );
}
