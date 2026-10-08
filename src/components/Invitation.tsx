import AnimatedContent from './bits/AnimatedContent';
import SectionHeading from './SectionHeading';
import FloralCorner from './art/FloralCorner';
import FlipCard from './bits/FlipCard';
import { couple, event } from '../config/site';

/** The invitation itself, shown as a tactile card alongside the structured details. */
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
          <div className="mx-auto w-full max-w-[26rem]">
            <FlipCard
              width={416}
              height={520}
              radius={2}
              perspective={1200}
              background="#f7f3e8"
              color="#2e3227"
              shadowColor="#2e3227"
              shadowOpacity={0.32}
              ariaLabel="Wedding invitation. Tap to see the event details."
              className="w-full"
              front={
                <figure className="relative h-full w-full">
                  <img
                    src="invitation.png"
                    alt="Wedding invitation for Mutua and Wahito at PCEA St Luke, Utawala, Nairobi, 26 November 2026"
                    className="block h-full w-full object-cover"
                    loading="lazy"
                    width={1024}
                    height={1280}
                  />
                  <span className="pointer-events-none absolute inset-3 border border-gold/60" aria-hidden="true" />
                </figure>
              }
              back={
                <div className="flex h-full flex-col justify-between bg-field-deep p-7 text-cream sm:p-9">
                  <div>
                    <p className="eyebrow text-gold-light">The details</p>
                    <h3 className="mt-4 font-script text-4xl text-cream">{couple.display}</h3>
                    <div className="hairline my-6" aria-hidden="true" />
                    <dl className="space-y-4">
                      {[
                        ['When', event.dateLong],
                        ['Time', `${event.timeLabel} · guests seated by 09:50`],
                        ['Where', event.venue],
                        ['Area', event.area],
                      ].map(([term, value]) => (
                        <div key={term}>
                          <dt className="eyebrow text-gold-light/75">{term}</dt>
                          <dd className="mt-1 text-base leading-snug text-cream/90">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <p className="text-sm italic text-gold-light/80">Tap or press Enter to turn the invitation back.</p>
                </div>
              }
            />
            <p className="mt-5 text-center font-ui text-xs uppercase tracking-[0.24em] text-field/70">
              Tap to reveal the details
            </p>
          </div>
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
