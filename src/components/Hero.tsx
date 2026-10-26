import Wreath from './art/Wreath';
import FloralCorner from './art/FloralCorner';
import Countdown from './Countdown';
import { couple, event } from '../config/site';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-field px-5 py-20 text-cream"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 22% 14%, rgba(247,243,232,0.16) 0%, rgba(111,122,97,0) 58%), radial-gradient(80% 70% at 82% 96%, rgba(72,81,63,0.85) 0%, rgba(111,122,97,0) 62%)',
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <Wreath className="h-auto w-[min(96vw,44rem)] opacity-70" />
      </div>

      <FloralCorner
        className="pointer-events-none absolute -left-6 -top-4 h-40 w-40 opacity-30 md:h-56 md:w-56"
      />
      <FloralCorner
        flip
        className="pointer-events-none absolute -bottom-4 -right-6 h-40 w-40 opacity-30 md:h-56 md:w-56"
      />

      <div className="relative z-10 w-full max-w-3xl text-center">
        <p className="eyebrow text-[0.6rem] text-gold-light/80 md:text-[0.68rem]">
          Together with their families
        </p>

        <h1 className="mt-7 font-script text-[clamp(4.2rem,15vw,8.5rem)] leading-[0.86] text-cream">
          <span className="block">{couple.partnerA}</span>
          <span className="my-2 block text-[0.42em] italic text-gold-light">&amp;</span>
          <span className="block">{couple.partnerB}</span>
        </h1>

        <div className="mx-auto mt-9 h-px w-20 bg-gold/60" aria-hidden="true" />

        <p className="mx-auto mt-6 max-w-md text-[1.02rem] leading-relaxed text-cream/80">
          {couple.tagline}
        </p>

        <div className="mt-7 space-y-2">
          <p className="font-serif text-[clamp(1.35rem,4vw,1.8rem)] tracking-[0.08em] text-gold-light">
            {event.dateLong}
          </p>
          <p className="eyebrow text-[0.6rem] text-cream/70 md:text-[0.68rem]">
            {event.timeLabel} · {event.venue} · {event.area}
          </p>
        </div>

        <div className="mx-auto mt-9 max-w-xl border-y border-gold/20 py-5">
          <Countdown tone="dark" />
        </div>

        <nav className="mt-8" aria-label="Invitation sections">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {[
              ['invitation', 'Invitation'],
              ['schedule', 'Ceremony'],
              ['rsvp', 'Reply'],
            ].map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="eyebrow border-b border-gold/45 pb-1 text-[0.62rem] text-gold-light transition-colors hover:border-gold-light hover:text-cream"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-center">
        <a href="#invitation" className="eyebrow text-[0.54rem] text-cream/50">
          Read the invitation ↓
        </a>
      </div>
    </section>
  );
}
