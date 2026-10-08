/** Corner floral ornament — paper blossom, gold leaves and pearls. */

type Props = { className?: string; flip?: boolean };

export default function FloralCorner({ className = '', flip = false }: Props) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      aria-hidden="true"
      focusable="false"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <defs>
        <linearGradient id="mw-corner-gold" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#8E6F32" />
          <stop offset="50%" stopColor="#C6A45C" />
          <stop offset="100%" stopColor="#F0DEB0" />
        </linearGradient>

        <radialGradient id="mw-corner-pearl" cx="34%" cy="30%" r="72%">
          <stop offset="0%" stopColor="#FFFDF6" />
          <stop offset="100%" stopColor="#CFC5AC" />
        </radialGradient>

        <g id="mw-corner-blossom">
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cx="0"
              cy="-12"
              rx="7.5"
              ry="12"
              fill="#FAF7EE"
              stroke="#E3DAC4"
              strokeWidth="0.6"
              transform={`rotate(${a})`}
            />
          ))}
          <circle r="5" fill="url(#mw-corner-gold)" />
        </g>

        <g id="mw-corner-leaf">
          <path d="M0 0C8 -7 23 -8 34 0C23 8 8 7 0 0Z" />
          <path
            d="M3 0H31"
            stroke="#2E3227"
            strokeOpacity="0.2"
            strokeWidth="0.8"
            fill="none"
          />
        </g>
      </defs>

      <path
        d="M10 226C52 214 92 186 122 148C150 112 168 70 176 22"
        fill="none"
        stroke="url(#mw-corner-gold)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M176 22C186 44 210 54 226 44C238 36 238 18 226 14C216 11 208 20 212 28"
        fill="none"
        stroke="url(#mw-corner-gold)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {[
        { x: 42, y: 210, deg: -34, s: 1, fill: '#C6A45C' },
        { x: 74, y: 194, deg: -54, s: 0.85, fill: '#6F7A61' },
        { x: 100, y: 168, deg: -46, s: 1.05, fill: '#C6A45C' },
        { x: 124, y: 140, deg: -62, s: 0.8, fill: '#6F7A61' },
        { x: 142, y: 108, deg: -52, s: 1, fill: '#C6A45C' },
        { x: 158, y: 76, deg: -70, s: 0.78, fill: '#6F7A61' },
        { x: 168, y: 48, deg: -58, s: 0.92, fill: '#C6A45C' },
      ].map((leaf) => (
        <use
          key={`${leaf.x}-${leaf.y}`}
          href="#mw-corner-leaf"
          transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.deg}) scale(${leaf.s})`}
          fill={leaf.fill}
          opacity="0.95"
        />
      ))}

      <use href="#mw-corner-blossom" transform="translate(112 152)" />
      <use href="#mw-corner-blossom" transform="translate(154 92) scale(0.78)" />
      <use href="#mw-corner-blossom" transform="translate(70 196) scale(0.6)" />

      {[
        [64, 222, 4],
        [88, 210, 3],
        [112, 200, 3.5],
        [186, 40, 4],
        [200, 66, 3],
        [136, 124, 3],
      ].map(([x, y, r]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={r}
          fill="url(#mw-corner-pearl)"
        />
      ))}
    </svg>
  );
}
