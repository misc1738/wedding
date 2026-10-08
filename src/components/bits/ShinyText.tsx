import type { CSSProperties, ReactNode } from 'react';

/**
 * Vendored from reactbits.dev (Shiny Text) and re-skinned for gold.
 * A metallic highlight sweeps across the text on a loop — reads as foil on
 * the calligraphy, matching the invitation's metallic gold.
 */

type Props = {
  children: ReactNode;
  className?: string;
  /** Base colour of the text. */
  color?: string;
  /** Colour of the travelling highlight. */
  highlight?: string;
  duration?: number;
  style?: CSSProperties;
};

export default function ShinyText({
  children,
  className = '',
  color = '#C6A45C',
  highlight = '#FBF0D4',
  duration = 4.5,
  style,
}: Props) {
  return (
    <span
      className={className}
      style={{
        color: 'transparent',
        backgroundImage: `linear-gradient(105deg, ${color} 0%, ${color} 38%, ${highlight} 50%, ${color} 62%, ${color} 100%)`,
        backgroundSize: '250% 100%',
        backgroundPosition: '180% center',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: `shimmer-sweep ${duration}s linear infinite`,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
