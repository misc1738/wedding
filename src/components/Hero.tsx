import Wreath from './art/Wreath';
import FloralCorner from './art/FloralCorner';
import ShinyText from './bits/ShinyText';
import SplitText from './bits/SplitText';
import AnimatedContent from './bits/AnimatedContent';
import Countdown from './Countdown';
import { couple, event } from '../config/site';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-field px-5 py-14 text-cream"
    >
      {/* Paper texture: soft light fall from the upper left */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 22% 14%, rgba(247,243,232,0.20) 0%, rgba(111,122,97,0) 58%), radial-gradient(80% 70% at 82% 96%, rgba(72,81,63,0.85) 0%, rgba(111,122,97,0) 62%)',
        }}
        aria-hidden="true"
      />

      {/* Wreath frame */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <Wreath className="h-auto w-[min(96vw,44rem)] opacity-95" />
      </div>

      {/* Corner blooms */}
      <FloralCorner
        className="pointer-events-none absolute -left-6 -top-4 h-40 w-40 opacity-45 md:h-56 md:w-56"
      />
      <FloralCorner
        flip
        className="pointer-events-none absolute -bottom-4 -right-6 h-40 w-40 opacity-45 md:h-56 md:w-56"
      />

      <div className="relative z-10 w-full max-w-2xl text-center">
        <AnimatedContent delay={60}>
          <p className="eyebrow text-gold-light/80 text-[0.6rem] md:text-[0.68rem]">
            {event.dateLong} · {event.timeLabel}
          </p>
        </AnimatedContent>

        <h1 className="mt-5">
          <span className="block font-script text-[clamp(1.8rem,5vw,2.7rem)] leading-tight text-gold-light">
            <ShinyText highlight="#FFFBEE" duration={5}>
              {couple.greeting}
            </ShinyText>
          </span>

          <span className="mt-3 block font-script text-[clamp(3rem,9.5vw,5.6rem)] leading-[0.95] text-cream">
            <SplitText
              text={couple.partnerA}
              splitBy="chars"
              delay={70}
              startDelay={320}
              duration={820}
            />
          </span>

          <span className="my-0.5 block font-script text-[clamp(1.4rem,4vw,2rem)] italic text-gold-light">
            and
          </span>

          <span className="block font-script text-[clamp(3.2rem,13vw,7rem)] leading-[0.95] text-cream">
            <SplitText
              text={couple.partnerB}
              splitBy="chars"
              delay={70}
              startDelay={760}
              duration={820}
            />
          </span>
        </h1>

        <AnimatedContent delay={420} className="mt-7">
          <div className="mx-auto h-px w-28 bg-gold/60" aria-hidden="true" />
          <p className="mt-4 text-[0.95rem] leading-relaxed text-cream/80">
            {couple.tagline}
          </p>

          <div className="mt-5 space-y-1.5">
            <p className="eyebrow text-gold-light text-[0.66rem] md:text-[0.72rem]">
              {event.venue}
            </p>
            <p className="eyebrow text-cream/70 text-[0.6rem] md:text-[0.66rem]">
              {event.area}
            </p>
          </div>

          <p className="mt-6 font-serif text-[clamp(1.5rem,5vw,2.1rem)] tracking-[0.16em] text-gold-light">
            {event.dateLabel}
          </p>
        </AnimatedContent>

        <AnimatedContent delay={620} className="mt-7">
          <Countdown tone="dark" />
        </AnimatedContent>

        <AnimatedContent delay={800} className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <a href="#rsvp" className="btn-gold btn-gold--solid">
            RSVP
          </a>
          <a href="#schedule" className="btn-gold">
            See the day
          </a>
        </AnimatedContent>
      </div>

      {/* Scroll cue */}
      <div
        className="pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex h-11 w-7 items-start justify-center rounded-full border border-gold/45 pt-2">
          <span
            className="block h-1.5 w-1 rounded-full bg-gold-light"
            style={{ animation: 'scroll-cue 2.1s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  );
}
