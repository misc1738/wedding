import { useState } from 'react';
import { couple, event } from '../config/site';
import { downloadIcs, type CalendarEvent } from '../lib/ics';

function buildCalendarEvent(): CalendarEvent[] {
  const start = new Date(event.startsAt);
  const end = new Date(start.getTime() + 2.5 * 60 * 60 * 1000);

  return [
    {
      title: `${couple.display} Wedding Day`,
      start: start.toISOString(),
      end: end.toISOString(),
      location: `${event.venue}, ${event.area}, ${event.country}`,
      description: `Join us for ${couple.display}'s wedding celebration at ${event.venue}.`,
    },
  ];
}

function googleMapsSearch(): string {
  return `${event.venue} ${event.area} Kenya`
    .split(/\s+/)
    .map(encodeURIComponent)
    .join('%20')
    .replace(/^/, 'https://www.google.com/maps/search/?api=1&query=');
}

export default function QuickActions() {
  const [copied, setCopied] = useState(false);
  const shareUrl =
    typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}#rsvp` : '#rsvp';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.alert('Copy failed. Please copy the page URL from your browser address bar instead.');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-[calc(100vw-1.5rem)] rounded-full border border-gold/50 bg-field-deep/88 p-1.5 shadow-[0_18px_42px_-18px_rgba(46,50,39,0.8)] backdrop-blur-sm">
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          className="eyebrow rounded-full border border-gold/60 bg-gold px-3 py-2 text-[0.56rem] tracking-[0.18em] text-field-deep transition-colors hover:bg-gold-light"
          onClick={() => downloadIcs(buildCalendarEvent(), 'mutua-and-wahito-wedding.ics')}
        >
          Save date
        </button>

        <a
          href={googleMapsSearch()}
          target="_blank"
          rel="noreferrer noopener"
          className="eyebrow rounded-full border border-gold/60 px-3 py-2 text-[0.56rem] tracking-[0.18em] text-cream transition-colors hover:bg-gold/10 hover:text-gold-light"
        >
          Maps
        </a>

        <button
          type="button"
          className="eyebrow rounded-full border border-gold/60 px-3 py-2 text-[0.56rem] tracking-[0.18em] text-cream transition-colors hover:bg-gold/10 hover:text-gold-light"
          onClick={handleCopy}
          aria-live="polite"
        >
          {copied ? 'Copied' : 'Copy RSVP'}
        </button>
      </div>
    </div>
  );
}
