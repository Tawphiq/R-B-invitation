import floralCorner from "../assets/floral-corner.webp";
import { couple } from "../wedding.js";

export default function Cover() {
  return (
    <header className="cover" aria-label={`${couple.first} and ${couple.second}`}>
      <div className="cover-stage">
        <img className="cover-flowers" src={floralCorner} alt="" />
        <span className="cover-band" aria-hidden="true" />
        <p className="who who-groom">
          <span>Groom</span>
          <strong>{couple.first}</strong>
        </p>
        <p className="who who-bride">
          <span>Bride</span>
          <strong>{couple.second}</strong>
        </p>
      </div>
    </header>
  );
}
