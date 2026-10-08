import { Fragment, type CSSProperties } from 'react';
import { prefersReducedMotion, useInView } from './useInView';

/**
 * Vendored from reactbits.dev (Blur Text) and re-skinned.
 * Each word resolves out of a blur into focus as the heading scrolls in.
 */

type Props = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  startDelay?: number;
  threshold?: number;
  style?: CSSProperties;
};

export default function BlurText({
  text,
  className = '',
  delay = 70,
  duration = 760,
  startDelay = 0,
  threshold = 0.3,
  style,
}: Props) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold });
  const reduced = prefersReducedMotion();
  const words = text.split(' ');

  return (
    <span ref={ref} className={className} aria-label={text} style={style}>
      <span aria-hidden="true">
        {words.map((word, index) => {
          const visible = reduced || inView;
          const offset = startDelay + index * delay;

          return (
            <Fragment key={`${word}-${index}`}>
              <span
                style={{
                  display: 'inline-block',
                  opacity: visible ? 1 : 0,
                  filter: visible ? 'blur(0px)' : 'blur(9px)',
                  transform: visible ? 'translateY(0)' : 'translateY(0.28em)',
                  transition: reduced
                    ? undefined
                    : `opacity ${duration}ms ease ${offset}ms, filter ${duration}ms cubic-bezier(0.22,0.61,0.36,1) ${offset}ms, transform ${duration}ms cubic-bezier(0.22,0.61,0.36,1) ${offset}ms`,
                }}
              >
                {word}
              </span>
              {index < words.length - 1 ? ' ' : null}
            </Fragment>
          );
        })}
      </span>
    </span>
  );
}
