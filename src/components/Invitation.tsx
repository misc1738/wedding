import AnimatedContent from './bits/AnimatedContent';
import SectionHeading from './SectionHeading';
import FloralCorner from './art/FloralCorner';
import { couple, event } from '../config/site';

/** The invitation itself, shown alongside the structured details. */
export default function Invitation() {
  return (
    <section className="section-pad relative overflow-hidden bg-cream">
      <FloralCorner
        flip
        className="pointer-events-none absolute -right-8 top-6 h-44 w-44 opacity-25"
      />

      <SectionHeading
        eyebrow="The invitation"
        title="Together with their families"
        intro={`${couple.partnerA} and ${couple.partnerB} would be honoured by your company on their wedding day.`}
      />

      <div className="mx-auto mt-14 grid max-w-5xl items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
        <AnimatedContent direction="left" distance={44}>
          <figure className="relative">
            <div
              className="absolute -inset-3 border border-gold/35"
              aria-hidden="true"
            />
            <img
              src="invitation.png"
              alt="Wedding invitation for Mutua and Wahito at PCEA St Luke, Utawala, Nairobi, 26 November 2026"
              className="relative block w-full object-cover shadow-[0_24px_60px_-30px_rgba(46,50,39,0.6)]"
              loading="lazy"
              width={1024}
              height={1280}
            />
          </figure>
        </AnimatedContent>

        <AnimatedContent direction="right" distance={44} delay={140}>
          <dl className="divide-y divide-gold/25 border-y border-gold/35">
            {[
              ['When', event.dateLong],
              ['Time', `${event.timeLabel} · guests seated by 09:50`],
              ['Where', event.venue],
              ['Area', event.area],
              ['Countdown', event.dateLabel],
            ].map(([term, value]) => (
              <div
                key={term}
                className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <dt className="eyebrow w-28 shrink-0 text-gold-deep">{term}</dt>
                <dd className="font-serif text-[1.08rem] text-field-deep">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <a
            href={googleMapsSearch()}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-gold mt-8"
          >
            Open in maps
          </a>
        </AnimatedContent>
      </div>
    </section>
  );
}

function googleMapsSearch(): string {
  return `${event.venue} ${event.area} Kenya`
    .split(/\s+/)
    .map(encodeURIComponent)
    .join('%20')
    .replace(/^/, 'https://www.google.com/maps/search/?api=1&query=');
}
