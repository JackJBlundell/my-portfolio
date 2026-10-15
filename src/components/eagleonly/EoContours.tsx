import React from 'react';

// Contour lines like the green pages of a yardage book, drawn behind EagleOnly's dark bands.
// The rings are generated rather than hand drawn: each is a wobbly ellipse, smoothed into curves.

const ring = (cx: number, cy: number, r: number, seed: number) => {
  const points: [number, number][] = [];
  for (let deg = 0; deg < 360; deg += 15) {
    const a = (deg * Math.PI) / 180;
    const wobble = 1 + 0.13 * Math.sin(3 * a + seed) + 0.06 * Math.sin(5 * a + seed * 1.7);
    points.push([cx + Math.cos(a) * r * wobble, cy + Math.sin(a) * r * wobble * 0.72]);
  }

  // Run a quadratic curve through the midpoint of each pair of points for a smooth closed line
  const mid = (p: [number, number], q: [number, number]) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const start = mid(points[0], points[1]);
  let d = `M${start[0].toFixed(1)} ${start[1].toFixed(1)}`;
  for (let i = 1; i <= points.length; i++) {
    const p = points[i % points.length];
    const m = mid(p, points[(i + 1) % points.length]);
    d += ` Q${p[0].toFixed(1)} ${p[1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`;
  }
  return `${d} Z`;
};

// Two "greens", each a set of nested rings, placed so they bleed off the edges of the band
const GREENS = [
  { cx: 1040, cy: 120, rings: 9, step: 46, seed: 0.6 },
  { cx: 140, cy: 520, rings: 7, step: 42, seed: 2.1 },
];

const PATHS = GREENS.flatMap((g) =>
  Array.from({ length: g.rings }, (_, i) => ring(g.cx, g.cy, 40 + i * g.step, g.seed + i * 0.18))
);

const EoContours: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={`eo-contours ${className}`}
    viewBox="0 0 1200 600"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    focusable="false"
  >
    {PATHS.map((d, i) => (
      <path key={i} d={d} />
    ))}
  </svg>
);

export default EoContours;
