import { useEffect, useRef, useState } from 'react';

type Options = {
  /** Fraction of the element that must be visible. */
  threshold?: number;
  /** Negative bottom margin so elements animate slightly before centre screen. */
  rootMargin?: string;
  /** When true the element never animates back out. */
  once?: boolean;
};

/**
 * Observes an element and reports when it enters the viewport.
 * Falls back to "always visible" where IntersectionObserver is unavailable,
 * so content is never hidden behind a broken observer.
 */
export function useInView<T extends HTMLElement>({
  threshold = 0.15,
  rootMargin = '0px 0px -8% 0px',
  once = true,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}

/** True when the visitor has asked the OS to reduce motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
