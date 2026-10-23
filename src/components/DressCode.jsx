import floralSprig from "../assets/floral-sprig.webp";
import { palette } from "../wedding.js";

export default function DressCode() {
  return (
    <section className="block dress" aria-labelledby="dress-h">
      <img className="sprig sprig-right" src={floralSprig} alt="" />
      <div className="block-body reveal">
        <h2 className="h" id="dress-h">
          Dress Code
        </h2>
        <p className="lead small">Kindly dress in our colour palette</p>
        <ul className="swatches">
          {palette.map(({ name, hex }) => (
            <li key={name} className="swatch">
              <span className="swatch-dot" style={{ "--c": hex }} />
              <span className="swatch-name">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
