/** Pearl-dot and gold rule used to separate blocks within a section. */

type Props = {
  className?: string;
  /** Hide the rule on very small screens where space is tight. */
  compact?: boolean;
};

export default function Divider({ className = '', compact = false }: Props) {
  return (
    <div
      className={`flex items-center gap-4 ${compact ? 'gap-2' : ''} ${className}`}
      aria-hidden="true"
    >
      <span className="hairline flex-1" />
      <svg width={compact ? 66 : 108} height="12" viewBox="0 0 108 12">
        <defs>
          <radialGradient id="mw-div-pearl" cx="34%" cy="30%" r="72%">
            <stop offset="0%" stopColor="#FFFDF6" />
            <stop offset="100%" stopColor="#C9BFa6" />
          </radialGradient>
        </defs>
        <path
          d="M4 6H44"
          stroke="#C6A45C"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M64 6H104"
          stroke="#C6A45C"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M50 1.5C52.8 1.5 54 3.4 54 6C54 8.6 52.8 10.5 50 10.5C47.2 10.5 46 8.6 46 6C46 3.4 47.2 1.5 50 1.5Z"
          fill="url(#mw-div-pearl)"
        />
        <circle cx="54" cy="6" r="3.4" fill="url(#mw-div-pearl)" />
        <circle cx="58" cy="6" r="3.4" fill="url(#mw-div-pearl)" />
        <circle cx="54" cy="6" r="1.4" fill="#FFFFFF" opacity="0.9" />
      </svg>
      <span className="hairline flex-1" />
    </div>
  );
}
