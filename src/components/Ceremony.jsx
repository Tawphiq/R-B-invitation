import DateRow from "./DateRow.jsx";
import floralSprig from "../assets/floral-sprig.webp";
import { couple, event } from "../wedding.js";

export default function Ceremony() {
  return (
    <section className="block ceremony leafy" aria-labelledby="ceremony-h">
      <img className="sprig sprig-left" src={floralSprig} alt="" />
      <div className="block-body reveal">
        <h2 className="h" id="ceremony-h">
          Wedding Celebration
        </h2>
        <p className="lead">Together with their families</p>

        <div className="pair">
          <p className="pair-name">{couple.first}</p>
          <p className="pair-role">Groom</p>
          <p className="pair-amp" aria-label="and">
            &amp;
          </p>
          <p className="pair-name">{couple.second}</p>
          <p className="pair-role">Bride</p>
        </div>

        <p className="lead request">Request the honour of your presence at their wedding celebration</p>
        <p className="lead small">At</p>
        <p className="time">{event.time}</p>
        <DateRow />
      </div>
    </section>
  );
}
