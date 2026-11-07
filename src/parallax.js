import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Parallax: decorative layers drift at their own pace while their section crosses the screen.
// Offsets are written to CSS variables that `translate` reads (see styles.css), so each layer keeps
// its own rotation and entrance transition. A negative end offset runs ahead of the page (near);
// a positive one lags behind it (far).

// The cover starts on screen, so its layers begin at rest and spread apart as it scrolls away.
// The groom's name only ever pulls away from the band and the bride's name, so nothing collides.
const COVER = [
  [".cover-flowers", -110],
  [".who-groom", -50],
  [".who-bride, .cover-band", 20],
];

function drift(targets, from, to, trigger, { start = "top bottom", end = "bottom top", prop = "--py", unit = "px" } = {}) {
  gsap.fromTo(
    targets,
    { [prop]: `${from}${unit}` },
    { [prop]: `${to}${unit}`, ease: "none", scrollTrigger: { trigger, start, end, scrub: 0.4 } },
  );
}

export function startParallax() {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    COVER.forEach(([sel, to]) => drift(sel, 0, to, ".cover", { start: "top top" }));
    // Faded leaves behind the text lag behind the page; the floral sprigs run ahead of it.
    gsap.utils.toArray(".leafy").forEach((el) => drift(el, -60, 60, el, { prop: "--leaves-y" }));
    gsap.utils.toArray(".sprig").forEach((el) => drift(el, 70, -70, el.parentElement));
    // Gallery photos lag behind the page inside their tiles: bottom edge showing as a tile enters, top edge as it leaves.
    gsap.utils.toArray(".gallery-tile img").forEach((el) => drift(el, -20, 0, el.parentElement, { prop: "--gy", unit: "%" }));
    // The closing garland rises into place as the page ends.
    drift(".closing-flowers", 90, 0, ".closing", { end: "bottom bottom" });
  });
  // Web fonts arriving late change section heights, so measure again once they are in.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  return () => mm.revert();
}
