// Burnt-orange wax seal with an irregular poured edge and an embossed monogram.

const rand = (i) => {
  const s = Math.sin(i * 12.9898) * 43758.5453;
  return s - Math.floor(s);
};

function edgePath(r = 54, n = 30) {
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const rr = r * (0.93 + 0.07 * rand(i + 1)) + (i % 7 === 0 ? 2.5 : 0);
    return [Math.cos(a) * rr, Math.sin(a) * rr];
  });
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let d = `M${mid(pts[n - 1], pts[0]).map((v) => v.toFixed(2)).join(" ")}`;
  pts.forEach((p, i) => {
    const m = mid(p, pts[(i + 1) % n]);
    d += `Q${p[0].toFixed(2)} ${p[1].toFixed(2)} ${m[0].toFixed(2)} ${m[1].toFixed(2)}`;
  });
  return d + "Z";
}

const EDGE = edgePath();

export default function Seal({ className = "", id = "seal" }) {
  return (
    <svg className={`seal ${className}`} viewBox="-60 -60 120 120" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${id}-wax`} cx="38%" cy="32%" r="80%">
          <stop offset="0" stopColor="#E3874F" />
          <stop offset=".45" stopColor="#C0531D" />
          <stop offset="1" stopColor="#7A2C0B" />
        </radialGradient>
        <radialGradient id={`${id}-well`} cx="55%" cy="60%" r="70%">
          <stop offset="0" stopColor="#B54A17" />
          <stop offset="1" stopColor="#8E3810" />
        </radialGradient>
      </defs>
      <path d={EDGE} fill={`url(#${id}-wax)`} />
      <circle r="37" fill={`url(#${id}-well)`} />
      <circle r="37" fill="none" stroke="rgba(60,18,4,.45)" strokeWidth="1.6" />
      <circle r="38.4" fill="none" stroke="rgba(255,200,160,.28)" strokeWidth="1" />
      <circle r="31" fill="none" stroke="rgba(255,200,160,.22)" strokeWidth=".7" />
      <g fontFamily="'Playfair Display', Georgia, serif" textAnchor="middle">
        <text y="9.5" fontSize="27" fill="rgba(255,205,170,.32)" transform="translate(.7 .9)">
          R<tspan fontStyle="italic" fontSize="19" dx="1">&amp;</tspan>
          <tspan dx="1">B</tspan>
        </text>
        <text y="9.5" fontSize="27" fill="#6E270A">
          R<tspan fontStyle="italic" fontSize="19" dx="1">&amp;</tspan>
          <tspan dx="1">B</tspan>
        </text>
      </g>
    </svg>
  );
}
