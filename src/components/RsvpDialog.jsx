import { useEffect, useRef, useState } from "react";
import { RSVP_ENDPOINT, guestCounts, event } from "../wedding.js";

const ACCEPT = "Joyfully Accepts";
const DECLINE = "Regretfully Declines";

export default function RsvpDialog({ open, onClose, guest }) {
  const dialogRef = useRef(null);
  const [attendance, setAttendance] = useState("");
  const [name, setName] = useState(guest || "");
  const [guests, setGuests] = useState("");
  const [status, setStatus] = useState({ text: "", error: false });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(null);

  const nameRef = useRef(null);
  const acceptRef = useRef(null);
  const firstGuestRef = useRef(null);
  const accepts = attendance === ACCEPT;

  useEffect(() => {
    const d = dialogRef.current;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  function fail(text, focusRef) {
    setStatus({ text, error: true });
    focusRef?.current?.focus();
  }

  function clearStatus() {
    if (status.text) setStatus({ text: "", error: false });
  }

  async function submit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return fail("Please enter your full name.", nameRef);
    if (!attendance) return fail("Please choose whether you will attend.", acceptRef);
    if (accepts && !guests) return fail("Please choose how many guests are attending.", firstGuestRef);
    if (!RSVP_ENDPOINT) {
      return fail("Online replies are not switched on yet. Please send your reply to the couple directly.");
    }

    setSending(true);
    setStatus({ text: "", error: false });
    try {
      // Apps Script does not send CORS headers, so the response is opaque; a network error still throws.
      await fetch(RSVP_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams({ attendance, name: trimmed, guests: accepts ? guests : "0" }),
      });
      setSent({ accepts, first: trimmed.split(/\s+/)[0] });
    } catch {
      fail("Your reply could not be sent. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="rsvp"
      aria-labelledby="rsvp-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="rsvp-sheet">
        <button type="button" className="rsvp-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        {sent ? (
          <div className="rsvp-thanks" role="status">
            <svg className="rsvp-heart" viewBox="0 0 32 30" aria-hidden="true">
              <path d="M16 29C7.5 22.6 1.5 17.3 1.5 10.2 1.5 5.2 5.3 1.5 9.8 1.5c2.8 0 4.9 1.4 6.2 3.5 1.3-2.1 3.4-3.5 6.2-3.5 4.5 0 8.3 3.7 8.3 8.7 0 7.1-6 12.4-14.5 18.8z" />
            </svg>
            <h2 className="rsvp-title" id="rsvp-title">
              {sent.accepts ? `Thank you, ${sent.first}` : `Thank you, ${sent.first}`}
            </h2>
            <p className="rsvp-copy">
              {sent.accepts
                ? `Your reply has been received. We look forward to celebrating with you on ${event.weekday}, ${event.day} ${event.month}.`
                : "Your reply has been received. You will be missed, and we are grateful for your kind wishes."}
            </p>
            <button type="button" className="cta" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <h2 className="rsvp-title" id="rsvp-title">
              Confirm your attendance
            </h2>
            <p className="rsvp-copy">
              We would be honoured to celebrate our special day with you. Please confirm your attendance by
              submitting the details below.
            </p>

            <label className="rsvp-label" htmlFor="rsvp-name">
              Full name(s)
            </label>
            <input
              ref={nameRef}
              id="rsvp-name"
              className="rsvp-input"
              type="text"
              autoComplete="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clearStatus();
              }}
            />

            <fieldset className="rsvp-set">
              <legend className="rsvp-label">Will you attend?</legend>
              {[ACCEPT, DECLINE].map((value, i) => (
                <label key={value} className="rsvp-option">
                  <input
                    ref={i === 0 ? acceptRef : undefined}
                    className="sr"
                    type="radio"
                    name="attendance"
                    id={i === 0 ? "att-yes" : "att-no"}
                    value={value}
                    checked={attendance === value}
                    onChange={() => {
                      setAttendance(value);
                      clearStatus();
                    }}
                  />
                  <span className="rsvp-option-box">
                    <span className="rsvp-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        {i === 0 ? <path d="M5 12.5l4.5 4.5L19 7.5" /> : <path d="M7 7l10 10M17 7 7 17" />}
                      </svg>
                    </span>
                    {value.charAt(0) + value.slice(1).toLowerCase()}
                  </span>
                </label>
              ))}
            </fieldset>

            {accepts && (
              <fieldset className="rsvp-set">
                <legend className="rsvp-label">Number of guests attending</legend>
                <div className="rsvp-counts">
                  {guestCounts.map((n, i) => (
                    <label key={n} className="rsvp-count">
                      <input
                        ref={i === 0 ? firstGuestRef : undefined}
                        className="sr"
                        type="radio"
                        name="guests"
                        id={`g${i + 1}`}
                        value={n}
                        checked={guests === n}
                        onChange={() => {
                          setGuests(n);
                          clearStatus();
                        }}
                      />
                      <span>{n}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <p className={`rsvp-status${status.error ? " is-error" : ""}`} role="status" aria-live="polite">
              {status.text}
            </p>

            <button className="rsvp-submit" type="submit" disabled={sending}>
              {sending ? "Sending…" : "Confirm"}
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
