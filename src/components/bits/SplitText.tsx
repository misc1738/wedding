import { Fragment, type CSSProperties } from 'react';
import { prefersReducedMotion, useInView } from './useInView';

/**
 * Vendored from reactbits.dev (Split Text) and re-skinned.
 * Splits a string into characters or words and staggers them into place.
 */

type Props = {
  text: string;
  className?: string;
  splitBy?: 'chars' | 'words';
  /** Milliseconds between each item. */
  delay?: number;
  /** Milliseconds each item takes. */
  duration?: number;
  /** Delay before the first item starts. */
  startDelay?: number;
  threshold?: number;
  style?: CSSProperties;
};

export default function SplitText({
  text,
  className = '',
  splitBy = 'words',
  delay = 55,
  duration = 700,
  startDelay = 0,
  threshold = 0.2,
  style,
}: Props) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold });
  const reduced = prefersReducedMotion();

  const items = splitBy === 'chars' ? Array.from(text) : text.split(' ');

  return (
    <span
      ref={ref}
      className={className}
      aria-label={text}
      style={{ display: 'inline-block', ...style }}
    >
      <span aria-hidden="true" style={{ display: 'inline' }}>
        {items.map((item, index) => {
          const isChar = splitBy === 'chars';
          const visible = reduced || inView;

          return (
            <Fragment key={`${item}-${index}`}>
              <span
                style={{
                  display: 'inline-block',
                  whiteSpace: 'pre',
                  opacity: visible ? 1 : 0,
                  filter: visible ? 'none' : 'blur(6px)',
                  transform: visible
                    ? 'translateY(0) rotate(0deg)'
                    : 'translateY(0.42em) rotate(4deg)',
                  transition: reduced
                    ? undefined
                    : `opacity ${duration}ms cubic-bezier(0.22,0.61,0.36,1) ${startDelay + index * delay}ms, transform ${duration}ms cubic-bezier(0.22,0.61,0.36,1) ${startDelay + index * delay}ms, filter ${duration}ms ease ${startDelay + index * delay}ms`,
                }}
              >
                {item}
              </span>
              {!isChar && index < items.length - 1 ? ' ' : null}
            </Fragment>
          );
        })}
      </span>
    </span>
  );
}
