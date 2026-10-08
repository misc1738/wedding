import Divider from './art/Divider';
import { couple, event, footer } from '../config/site';

export default function Footer() {
  return (
    <footer className="bg-field-deep px-5 py-16 text-center text-cream">
      <Divider className="mx-auto max-w-md" />

      <p className="mt-8 font-script text-[clamp(1.8rem,5vw,2.6rem)] text-gold-light">
        {footer.closing}
      </p>

      <p className="eyebrow mt-5 text-cream/60">{footer.hashtag}</p>

      <p className="mt-6 text-[0.98rem] text-cream/60">{footer.contactLabel}</p>

      <p className="mt-8 font-serif text-[1.05rem] tracking-[0.14em] text-cream/45">
        {couple.display} · {event.dateLabel}
      </p>

      <nav className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="Footer">
        <a href="#top" className="eyebrow text-cream/45 transition-colors hover:text-gold-light">
          Back to top
        </a>
        <a href="/admin" className="eyebrow text-cream/35 transition-colors hover:text-gold-light">
          Couple’s dashboard
        </a>
      </nav>

      <p className="mt-8 text-xs text-cream/30">
        PCEA St Luke · Utawala, Nairobi · {event.dateLong}
      </p>
    </footer>
  );
}
