import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { gsap } from "gsap";
import { music } from "../wedding.js";

const VOLUME = 0.55;

// Background music. Browsers only allow sound after a tap, so the envelope starts it through `ref.play()`.
// The toggle sits above the reply button, and the music rests while the tab is in the background.
// iOS ignores scripted volume, so the fades there come from the fade baked into the file.
export default function Music({ ref }) {
  const audioRef = useRef(null);
  const resting = useRef(false);
  const [playing, setPlaying] = useState(false);

  function play() {
    const a = audioRef.current;
    if (!a) return;
    gsap.killTweensOf(a);
    if (a.paused) a.volume = 0;
    setPlaying(true);
    a.play().then(
      () => gsap.to(a, { volume: VOLUME, duration: 2.4, ease: "sine.out" }),
      () => setPlaying(false),
    );
  }

  function pause() {
    const a = audioRef.current;
    setPlaying(false);
    gsap.killTweensOf(a);
    gsap.to(a, { volume: 0, duration: 0.4, ease: "sine.in", onComplete: () => a.pause() });
  }

  useImperativeHandle(ref, () => ({ play }), []);

  useEffect(() => {
    function onVisibility() {
      const a = audioRef.current;
      if (!a) return;
      if (document.hidden && !a.paused) {
        resting.current = true;
        a.pause();
      } else if (!document.hidden && resting.current) {
        resting.current = false;
        play();
      }
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  if (!music) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}${music}`}
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        className={`music${playing ? " is-playing" : ""}`}
        onClick={playing ? pause : play}
        aria-label={playing ? "Pause music" : "Play music"}
      >
        {playing ? (
          <span className="music-bars" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 18V5l11-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="17" cy="16" r="3" />
          </svg>
        )}
      </button>
    </>
  );
}
