import { useEffect, useRef, useState } from "react";
import Seal from "./Seal.jsx";
import floralBand from "../assets/floral-band.webp";
import { couple, event } from "../wedding.js";

// Opening sequence: the seal lifts, the flap folds back to show the floral liner,
// the card slides out, then the whole scene fades to reveal the page.
export default function Envelope({ guest, onOpen, onReveal, onDone }) {
  const [phase, setPhase] = useState("closed");
  const timers = useRef([]);

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  function open() {
    if (phase !== "closed") return;
    // Runs inside the tap itself, which is what lets the browser start the music.
    onOpen();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const at = (ms, fn) => timers.current.push(setTimeout(fn, ms));
    if (reduce) {
      setPhase("leaving");
      onReveal();
      at(450, onDone);
      return;
    }
    setPhase("opening");
    at(2200, () => {
      setPhase("leaving");
      onReveal();
    });
    at(3000, onDone);
  }

  return (
    <div className={`intro is-${phase}`} role="dialog" aria-modal="true" aria-label="Your invitation">
      <div className="envelope" style={{ "--liner": `url(${floralBand})` }} onClick={open}>
        <span className="env-back" aria-hidden="true" />
        <span className="env-card" aria-hidden="true">
          <span className="env-card-heart">
            <svg viewBox="0 0 32 30">
              <path d="M16 29C7.5 22.6 1.5 17.3 1.5 10.2 1.5 5.2 5.3 1.5 9.8 1.5c2.8 0 4.9 1.4 6.2 3.5 1.3-2.1 3.4-3.5 6.2-3.5 4.5 0 8.3 3.7 8.3 8.7 0 7.1-6 12.4-14.5 18.8z" />
            </svg>
          </span>
          <span className="env-card-names">
            {couple.first}
            <em>&amp;</em>
            {couple.second}
          </span>
          <span className="env-card-rule" />
          <span className="env-card-date">
            {event.month} {event.day}, {event.year}
          </span>
        </span>
        <span className="env-pocket env-side" aria-hidden="true" />
        <span className="env-lift" aria-hidden="true">
          <span className="env-pocket env-bottom" />
        </span>
        <span className="env-preview">
          <span className="env-names">
            <span>{couple.first}</span>
            <span className="env-amp">&amp;</span>
            <span>{couple.second}</span>
          </span>
          <span className="env-fleuron" aria-hidden="true">
            ❦
          </span>
          <span className="env-date">
            {event.month} {event.day}, {event.year}
          </span>
          <span className="env-invite">Cordially invite</span>
          <span className="env-guest">{guest || "our dear guest"}</span>
        </span>
        <span className="env-flap-wrap" aria-hidden="true">
          <span className="env-flap" />
        </span>
        <button type="button" className="env-seal" aria-label="Open invitation">
          <Seal id="env-seal" />
        </button>
      </div>
    </div>
  );
}
