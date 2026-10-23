import floralCorner from "../assets/floral-corner.webp";
import { closingLine, couple, event } from "../wedding.js";

export default function Closing() {
  return (
    <footer className="closing">
      <div className="closing-body reveal">
        <p className="closing-line">{closingLine}</p>
        <p className="closing-names">
          {couple.first} <span>&amp;</span> {couple.second}
        </p>
        <p className="closing-date">
          {event.day} · {String(event.monthIndex + 1).padStart(2, "0")} · {event.year}
        </p>
      </div>
      <img className="closing-flowers" src={floralCorner} alt="" />
    </footer>
  );
}
