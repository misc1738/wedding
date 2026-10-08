import type { CSSProperties, ReactNode } from 'react';
import { prefersReducedMotion, useInView } from './useInView';

/**
 * Vendored from reactbits.dev (Animated Content) and re-skinned.
 * Wraps children and animates them into place as they scroll into view.
 */

type Direction = 'up' | 'down' | 'left' | 'right';

type Props = {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  /** Travel distance in pixels before settling. */
  distance?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
  once?: boolean;
  style?: CSSProperties;
};

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

export default function AnimatedContent({
  children,
  className = '',
  direction = 'up',
  distance = 34,
  duration = 760,
  delay = 0,
  threshold = 0.15,
  once = true,
  style,
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold, once });

  const reduced = prefersReducedMotion();
  const offset = OFFSET[direction];

  const settled: CSSProperties = {
    opacity: 1,
    transform: 'translate3d(0,0,0)',
  };

  const hidden: CSSProperties = {
    opacity: 0,
    transform: `translate3d(${offset.x * distance}px, ${offset.y * distance}px, 0)`,
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...(reduced ? settled : inView ? settled : hidden),
        transition: reduced
          ? undefined
          : `opacity ${duration}ms cubic-bezier(0.22, 0.61, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 0.61, 0.36, 1) ${delay}ms`,
        willChange: reduced ? undefined : 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
