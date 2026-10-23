import { useEffect, useRef, useState } from "react";
import Seal from "./Seal.jsx";
import floralBand from "../assets/floral-band.webp";
import { couple, event } from "../wedding.js";

// Opening sequence: the seal lifts, the flap folds back to show the floral liner,
// the card slides out, then the whole scene fades to reveal the page.
export default function Envelope({ guest, onReveal, onDone }) {
  const [phase, setPhase] = useState("closed");
  const timers = useRef([]);

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  function open() {
    if (phase !== "closed") return;
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
      <p className="intro-kicker">You are warmly invited</p>

      <div className="envelope" style={{ "--liner": `url(${floralBand})` }} onClick={open} aria-hidden="true">
        <span className="env-back" />
        <span className="env-card">
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
        <span className="env-pocket env-side" />
        <span className="env-lift">
          <span className="env-pocket env-bottom" />
        </span>
        <span className="env-address">
          <span className="env-for">For</span>
          <span className="env-name">{guest || "our dear guest"}</span>
        </span>
        <span className="env-flap-wrap">
          <span className="env-flap" />
        </span>
        <Seal className="env-seal" id="env-seal" />
      </div>

      <button type="button" className="intro-open" onClick={open}>
        Open invitation
      </button>
    </div>
  );
}
