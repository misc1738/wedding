import { useCountdown } from '../lib/countdown';
import { event } from '../config/site';

const UNITS = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
] as const;

export default function Countdown({ tone = 'dark' }: { tone?: 'light' | 'dark' }) {
  const { days, hours, minutes, seconds, done } = useCountdown(event.startsAt);
  const values = { days, hours, minutes, seconds };
  const dark = tone === 'dark';

  if (done) {
    return (
      <p
        className={`font-script text-3xl md:text-4xl ${
          dark ? 'text-gold-light' : 'text-gold-deep'
        }`}
      >
        We’re married!
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="grid grid-cols-4 gap-3 md:gap-6">
        {UNITS.map((unit) => (
          <div key={unit.key} className="flex flex-col items-center">
            <span
              className={`font-serif text-[clamp(1.7rem,6vw,2.9rem)] leading-none tabular-nums ${
                dark ? 'text-cream' : 'text-field-deep'
              }`}
            >
              {String(values[unit.key]).padStart(2, '0')}
            </span>
            <span
              className={`eyebrow mt-2 text-[0.55rem] md:text-[0.62rem] ${
                dark ? 'text-gold-light/75' : 'text-gold-deep/80'
              }`}
            >
              {unit.label}
            </span>
          </div>
        ))}
      </div>
      <p
        className={`eyebrow text-[0.58rem] ${
          dark ? 'text-cream/55' : 'text-ink/55'
        }`}
      >
        {event.countdownLabel}
      </p>
    </div>
  );
}
