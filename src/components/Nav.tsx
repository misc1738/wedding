import { useEffect, useState } from 'react';
import { couple, nav } from '../config/site';

/**
 * Sticky navigation. Transparent over the hero, then fades in past the fold
 * (the awwwards-style transition) with the active chapter highlighted.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 90);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    for (const item of nav) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? 'rgba(72,81,63,0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          transform: scrolled ? 'translateY(0)' : 'translateY(-100%)',
          boxShadow: scrolled ? '0 1px 0 rgba(198,164,92,0.32)' : 'none',
        }}
      >
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 md:px-8"
          aria-label="Main"
        >
          <a
            href="#top"
            className="font-script text-xl text-gold-light transition-colors hover:text-cream md:text-2xl"
            onClick={() => setOpen(false)}
          >
            {couple.display}
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`eyebrow relative py-1 transition-colors ${
                    active === item.id
                      ? 'text-gold-light'
                      : 'text-cream/70 hover:text-cream'
                  }`}
                >
                  {item.label}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px bg-gold-light transition-all duration-300"
                    style={{
                      width: active === item.id ? '100%' : '0%',
                    }}
                  />
                </a>
              </li>
            ))}
            <li>
              <a
                href="#rsvp"
                className="eyebrow border border-gold px-5 py-2.5 text-gold-light transition-colors hover:bg-gold hover:text-field-deep"
              >
                RSVP
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className="block h-px w-6 bg-gold-light transition-transform duration-300"
              style={{
                transform: open ? 'translateY(3.5px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="block h-px w-6 bg-gold-light transition-transform duration-300"
              style={{
                transform: open ? 'translateY(-3.5px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-1 bg-field-deep/97 transition-opacity duration-300 lg:hidden"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <ul className="flex flex-col items-center gap-5">
          {nav.map((item, index) => (
            <li key={item.id} style={{ transitionDelay: `${index * 40}ms` }}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="font-script text-4xl text-cream transition-colors hover:text-gold-light"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="mt-4">
            <a
              href="#rsvp"
              onClick={() => setOpen(false)}
              className="eyebrow border border-gold px-8 py-3 text-gold-light"
            >
              RSVP
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
