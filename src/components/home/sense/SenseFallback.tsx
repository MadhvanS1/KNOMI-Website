import styles from "../SenseCore.module.css";

/*
 * The instrument, engraved flat: what shows before three.js arrives, and what
 * stays if WebGL is unavailable. Same composition as the 3D piece (dial, polar
 * axis and meridian, five module rings, glowing core) so the hand-over is a
 * gentle cross-fade rather than a swap. viewBox units: 100 = the frame's half-height.
 */

const r2 = (n: number) => Number(n.toFixed(2));

const DIAL_R = 83.3;
const TICKS = Array.from({ length: 120 }, (_, k) => {
  const a = (k / 120) * Math.PI * 2;
  const len = k % 10 === 0 ? 6.4 : k % 5 === 0 ? 4.2 : 2.3;
  const r0 = DIAL_R + 1.6;
  return {
    k,
    major: k % 10 === 0,
    x1: r2(Math.cos(a) * r0),
    y1: r2(Math.sin(a) * r0),
    x2: r2(Math.cos(a) * (r0 + len)),
    y2: r2(Math.sin(a) * (r0 + len)),
  };
});

/* Module rings: radius, foreshortening (ry / rx), rotation (deg), bead angle (rad). */
const RINGS = [
  { r: 32, k: 0.34, rot: -10, bead: 0.9 },
  { r: 41.7, k: 0.82, rot: 32, bead: 2.5 },
  { r: 51.3, k: 0.46, rot: -30, bead: 4.3 },
  { r: 60.9, k: 0.93, rot: 68, bead: 5.6 },
  { r: 70.5, k: 0.38, rot: 12, bead: 1.8 },
].map((ring) => {
  const t = (ring.rot * Math.PI) / 180;
  const bx = Math.cos(ring.bead) * ring.r;
  const by = Math.sin(ring.bead) * ring.r * ring.k;
  return {
    ...ring,
    bx: r2(bx * Math.cos(t) - by * Math.sin(t)),
    by: r2(bx * Math.sin(t) + by * Math.cos(t)),
  };
});

/* Polar axis, tilted 23.4° from vertical. */
const AXIS_TILT = 23.4;
const AXIS_R = 79;
const AX = r2(Math.sin((AXIS_TILT * Math.PI) / 180) * AXIS_R);
const AY = r2(-Math.cos((AXIS_TILT * Math.PI) / 180) * AXIS_R);

export default function SenseFallback({ active, className }: { active: number; className?: string }) {
  return (
    <svg className={`${styles.fb} ${className ?? ""}`} viewBox="-100 -100 200 200" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="sense-fb-halo">
          <stop offset="0" stopColor="#ffd6a0" stopOpacity="0.55" />
          <stop offset="0.35" stopColor="#d66a30" stopOpacity="0.18" />
          <stop offset="1" stopColor="#7a2e19" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sense-fb-core" cx="0.42" cy="0.38" r="0.62">
          <stop offset="0" stopColor="#fff2da" />
          <stop offset="0.38" stopColor="#ffb468" />
          <stop offset="0.78" stopColor="#d2602c" />
          <stop offset="1" stopColor="#8a3317" />
        </radialGradient>
      </defs>

      <circle r="58" fill="url(#sense-fb-halo)" />

      {/* Dial */}
      <g className={styles.fbFrame}>
        <circle r={DIAL_R} strokeWidth="1.4" />
        <circle r={DIAL_R - 2.4} strokeWidth="0.35" />
        <circle r="77.6" strokeWidth="0.3" className={styles.fbHair} />
        {TICKS.map((t) => (
          <line key={t.k} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} strokeWidth={t.major ? 0.7 : 0.4} />
        ))}
      </g>

      {/* Polar axis and meridian */}
      <g className={styles.fbFrame}>
        <ellipse rx={AXIS_R - 1.5} ry="20" transform={`rotate(${r2(-90 + AXIS_TILT)})`} strokeWidth="0.5" />
        <line x1={-AX} y1={-AY} x2={AX} y2={AY} strokeWidth="0.55" />
        <circle cx={AX} cy={AY} r="1.5" className={styles.fbFill} />
        <circle cx={-AX} cy={-AY} r="1.5" className={styles.fbFill} />
      </g>

      {/* Filaments from each bead to the core */}
      <g>
        {RINGS.map((ring, i) => (
          <line
            key={`f${i}`}
            x1="0"
            y1="0"
            x2={ring.bx}
            y2={ring.by}
            className={`${styles.fbFilament} ${i === active ? styles.fbOn : ""}`}
          />
        ))}
      </g>

      {/* Module rings with their beads */}
      {RINGS.map((ring, i) => (
        <g key={`r${i}`} className={`${styles.fbRing} ${i === active ? styles.fbOn : ""}`}>
          <ellipse rx={ring.r} ry={r2(ring.r * ring.k)} transform={`rotate(${ring.rot})`} />
          <circle cx={ring.bx} cy={ring.by} r="2.3" className={styles.fbBead} />
        </g>
      ))}

      {/* Core */}
      <circle r="12.6" fill="url(#sense-fb-core)" />
      <circle r="18.6" className={styles.fbGimbal} />
      <circle r="21.8" className={styles.fbGimbal} />
    </svg>
  );
}
