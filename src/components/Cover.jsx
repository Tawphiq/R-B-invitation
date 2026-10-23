import floralCorner from "../assets/floral-corner.webp";
import { couple, photos } from "../wedding.js";

function Frame({ who, name, src }) {
  return (
    <figure className={`frame frame-${who}`}>
      {src ? (
        <img src={`${import.meta.env.BASE_URL}${src}`} alt={name} />
      ) : (
        <span className="frame-initial" aria-hidden="true">
          {name[0]}
        </span>
      )}
    </figure>
  );
}

export default function Cover() {
  return (
    <header className="cover" aria-label={`${couple.first} and ${couple.second}`}>
      <div className="cover-stage">
        <img className="cover-flowers" src={floralCorner} alt="" />
        <span className="cover-band" aria-hidden="true" />
        <Frame who="groom" name={couple.first} src={photos.groom} />
        <Frame who="bride" name={couple.second} src={photos.bride} />
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
