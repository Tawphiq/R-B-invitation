import { useEffect, useState } from "react";
import Envelope from "./components/Envelope.jsx";
import Cover from "./components/Cover.jsx";
import Ceremony from "./components/Ceremony.jsx";
import Gallery from "./components/Gallery.jsx";
import Celebration from "./components/Celebration.jsx";
import DressCode from "./components/DressCode.jsx";
import Venue from "./components/Venue.jsx";
import Closing from "./components/Closing.jsx";
import RsvpDialog from "./components/RsvpDialog.jsx";

// Personal links: ?to=Kwame%20%26%20Ama%20Mensah writes the guest's name on the envelope and pre-fills the reply.
const hasWindow = typeof window !== "undefined";
const guest = hasWindow ? (new URLSearchParams(window.location.search).get("to") || "").trim().slice(0, 60) : "";

function alreadyOpened() {
  if (!hasWindow || window.location.hash) return true;
  try {
    return sessionStorage.getItem("rb-opened") === "1";
  } catch {
    return false;
  }
}

export default function App() {
  const [introShown, setIntroShown] = useState(() => !alreadyOpened());
  const [playing, setPlaying] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(() => hasWindow && window.location.hash === "#rsvp");

  // Without the envelope, play the cover entrance right after first paint.
  useEffect(() => {
    if (introShown) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setPlaying(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("is-locked", introShown);
  }, [introShown]);

  // Scroll reveals. Content stays visible without JS; the hidden state only applies once this runs.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("can-reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  function done() {
    setIntroShown(false);
    try {
      sessionStorage.setItem("rb-opened", "1");
    } catch {
      /* private mode: the envelope simply shows again next visit */
    }
  }

  return (
    <>
      {introShown && <Envelope guest={guest} onReveal={() => setPlaying(true)} onDone={done} />}
      <div className="page" inert={introShown}>
        <main className={`paper${playing ? " is-playing" : ""}`}>
          <Cover />
          <Ceremony />
          <Gallery />
          <Celebration onRsvp={() => setRsvpOpen(true)} />
          <DressCode />
          <Venue />
          <Closing />
        </main>
        <button type="button" className="fab" onClick={() => setRsvpOpen(true)} aria-label="Confirm attendance">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3.5 6.5h17v11h-17z" />
            <path d="M3.5 7l8.5 6.5L20.5 7" />
          </svg>
        </button>
        <RsvpDialog open={rsvpOpen} onClose={() => setRsvpOpen(false)} guest={guest} />
      </div>
    </>
  );
}
