import { useMemo } from 'react';
import AnimatedContent from './bits/AnimatedContent';
import SectionHeading from './SectionHeading';
import { downloadIcs, type CalendarEvent } from '../lib/ics';
import { couple, event, schedule } from '../config/site';

const CEREMONY_DATE = '2026-11-26';
const HOUR_MS = 60 * 60 * 1000;

function buildEvents(): CalendarEvent[] {
  return schedule.map((item) => {
    const start = new Date(`${CEREMONY_DATE}T${item.time}:00+03:00`);
    return {
      title: `${item.title} — ${couple.display}`,
      start: start.toISOString(),
      end: new Date(start.getTime() + HOUR_MS).toISOString(),
      location: `${event.venue}, ${event.area}, ${event.country}`,
      description: item.detail,
    };
  });
}

export default function Schedule() {
  const events = useMemo(buildEvents, []);

  return (
    <section
      id="schedule"
      className="section-pad relative bg-cream-warm/60 scroll-mt-20"
    >
      <SectionHeading
        chapter="I"
        eyebrow="The day"
        title="Schedule"
        intro="Thursday 26 November 2026. The service starts at ten and does not wait — everything after that is a little more relaxed."
      />

      <div className="mx-auto mt-14 max-w-3xl">
        <ol className="relative">
          <span
            className="pointer-events-none absolute hidden md:block"
            style={{
              left: '8.75rem',
              top: '0.9rem',
              bottom: '2.5rem',
              width: '1px',
              background:
                'linear-gradient(to bottom, rgba(198,164,92,0.05), rgba(198,164,92,0.45) 12%, rgba(198,164,92,0.45) 88%, rgba(198,164,92,0.05))',
            }}
            aria-hidden="true"
          />

          {schedule.map((item, index) => (
            <li key={item.time} className="relative pb-9 last:pb-0">
              <AnimatedContent
                delay={index * 70}
                threshold={0.05}
                className="grid gap-x-10 gap-y-1.5 md:grid-cols-[5.5rem_1.5rem_1fr]"
              >
                <div className="font-serif text-[1.15rem] tabular-nums text-gold-deep md:pt-1 md:text-right">
                  {item.time}
                </div>

                <div className="hidden md:block" aria-hidden="true">
                  <span
                    className="absolute top-1.5 block h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gold ring-4 ring-cream-warm"
                    style={{ left: '8.75rem' }}
                  />
                </div>

                <div className="pt-0.5">
                  <h3 className="font-serif text-[1.35rem] leading-snug text-field-deep">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 max-w-prose text-[1rem] leading-relaxed text-ink/70">
                    {item.detail}
                  </p>
                </div>
              </AnimatedContent>
            </li>
          ))}
        </ol>

        <AnimatedContent className="mt-12 flex flex-wrap items-center gap-4">
          <button
            type="button"
            className="btn-gold"
            onClick={() =>
              downloadIcs(events, 'mutua-and-wahito-26-11-26.ics')
            }
          >
            Add to calendar
          </button>
          <span className="text-sm italic text-ink/55">
            Downloads an .ics file that opens in Apple Calendar, Google or Outlook.
          </span>
        </AnimatedContent>
      </div>
    </section>
  );
}
