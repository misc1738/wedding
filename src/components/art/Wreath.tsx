/**
 * Gold scroll wreath drawn by hand — modelled on the wire-and-pearl frame of
 * the paper invitation. Leaf clusters sit on the left arc the same way the
 * invitation's flowers do, with gold wire curling away top and bottom.
 */

type Props = { className?: string };

const CX = 240;
const CY = 240;
const R = 178;

const GOLD_LEAF = '#C6A45C';
const OLIVE_LEAF = '#6F7A61';

const LEAF_COUNT = 22;
const ARC_START = 118;
const ARC_SPAN = 138;

export default function Wreath({ className = '' }: Props) {
  const leaves = Array.from({ length: LEAF_COUNT }, (_, i) => {
    const t = i / (LEAF_COUNT - 1);
    const deg = ARC_START + t * ARC_SPAN;
    const rad = (deg * Math.PI) / 180;
    const radius = R + (i % 2 === 0 ? 7 : -9);
    const x = CX + radius * Math.cos(rad);
    const y = CY + radius * Math.sin(rad);
    const sweep = i % 2 === 0 ? -34 : 34;
    const scale = 0.72 + ((i * 7) % 5) * 0.09;
    const fill = i % 3 === 1 ? OLIVE_LEAF : GOLD_LEAF;

    return {
      key: i,
      transform: `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(deg + sweep).toFixed(1)}) scale(${scale.toFixed(2)})`,
      fill,
      opacity: 0.94,
    };
  });

  const blossoms = [152, 202, 238].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    const radius = R - 4;
    return {
      key: deg,
      x: CX + radius * Math.cos(rad),
      y: CY + radius * Math.sin(rad),
    };
  });

  const pearls = [
    [126, R + 24],
    [133, R + 40],
    [141, R + 26],
    [175, R - 30],
    [214, R + 30],
    [249, R - 26],
    [258, R + 18],
    [119, R - 28],
  ].map(([deg, radius], i) => {
    const rad = (deg * Math.PI) / 180;
    return {
      key: i,
      x: CX + radius * Math.cos(rad),
      y: CY + radius * Math.sin(rad),
      r: 3 + (i % 3),
    };
  });

  return (
    <svg
      viewBox="0 0 480 480"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="mw-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F0DEB0" />
          <stop offset="42%" stopColor="#C6A45C" />
          <stop offset="100%" stopColor="#8E6F32" />
        </linearGradient>

        <radialGradient id="mw-pearl" cx="34%" cy="30%" r="72%">
          <stop offset="0%" stopColor="#FFFDF6" />
          <stop offset="70%" stopColor="#F0E9D8" />
          <stop offset="100%" stopColor="#CFC5AC" />
        </radialGradient>

        <g id="mw-blossom">
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cx="0"
              cy="-13"
              rx="8.5"
              ry="13.5"
              fill="#FAF7EE"
              stroke="#E3DAC4"
              strokeWidth="0.7"
              transform={`rotate(${a})`}
            />
          ))}
          <circle r="5.5" fill="url(#mw-gold)" />
          <circle r="2.2" fill="#F0DEB0" />
        </g>

        <g id="mw-leaf">
          <path d="M0 0C9 -8 26 -9 38 0C26 9 9 8 0 0Z" />
          <path
            d="M4 0H34"
            stroke="#2E3227"
            strokeOpacity="0.2"
            strokeWidth="0.9"
            fill="none"
          />
        </g>
      </defs>

      {/* Wire frame */}
      <circle
        cx={CX}
        cy={CY}
        r={R}
        fill="none"
        stroke="url(#mw-gold)"
        strokeWidth="2.6"
      />
      <circle
        cx={CX}
        cy={CY}
        r={R - 12}
        fill="none"
        stroke="url(#mw-gold)"
        strokeWidth="1"
        opacity="0.55"
      />
      <circle
        cx={CX}
        cy={CY}
        r={R + 15}
        fill="none"
        stroke="url(#mw-gold)"
        strokeWidth="0.9"
        opacity="0.4"
        strokeDasharray="2 9"
      />

      {/* Gold wire curling away from the floral cluster */}
      <path
        d="M197 68C205 30 250 8 300 20C345 31 372 70 356 100C344 122 312 124 305 105C299 89 314 76 328 83"
        fill="none"
        stroke="url(#mw-gold)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M214 46C238 22 274 16 306 30"
        fill="none"
        stroke="url(#mw-gold)"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M156 397C140 435 95 458 55 445C20 434 4 398 24 375C39 357 70 360 75 380C79 396 64 408 51 400"
        fill="none"
        stroke="url(#mw-gold)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M138 414C114 442 78 452 46 444"
        fill="none"
        stroke="url(#mw-gold)"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* Leaf cluster */}
      <g>
        {leaves.map((leaf) => (
          <use
            key={leaf.key}
            href="#mw-leaf"
            transform={leaf.transform}
            fill={leaf.fill}
            opacity={leaf.opacity}
          />
        ))}
      </g>

      {/* Paper blossoms */}
      <g>
        {blossoms.map((b) => (
          <use
            key={b.key}
            href="#mw-blossom"
            transform={`translate(${b.x.toFixed(1)} ${b.y.toFixed(1)})`}
          />
        ))}
      </g>

      {/* Pearls */}
      <g>
        {pearls.map((p) => (
          <circle
            key={p.key}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill="url(#mw-pearl)"
          />
        ))}
      </g>
    </svg>
  );
}
