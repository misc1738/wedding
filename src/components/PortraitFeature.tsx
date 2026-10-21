import AnimatedContent from './bits/AnimatedContent';
import FloralCorner from './art/FloralCorner';
import { couple, story } from '../config/site';
import { photos } from '../config/photos';

/**
 * The first thing after the hero: a real photograph, so the site feels like
 * the two of them rather than a template. Swap the images in `photos.ts`.
 */
export default function PortraitFeature() {
  return (
    <section
      id="portrait"
      className="relative overflow-hidden bg-field-deep px-5 py-[clamp(3.75rem,9vw,6.5rem)] text-cream md:px-10"
      aria-labelledby="portrait-title"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(75% 60% at 15% 0%, rgba(228,201,138,0.16) 0%, rgba(72,81,63,0) 58%), radial-gradient(60% 55% at 100% 100%, rgba(107,47,74,0.30) 0%, rgba(72,81,63,0) 62%)',
        }}
        aria-hidden="true"
      />
      <FloralCorner className="pointer-events-none absolute -left-8 bottom-0 h-40 w-40 opacity-25 md:h-56 md:w-56" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] md:gap-20">
        {/* Portrait, in a soft church-window arch */}
        <AnimatedContent direction="left" distance={36}>
          <div className="relative mx-auto w-full max-w-[23rem] pb-10 md:max-w-[26rem]">
            <div
              className="pointer-events-none absolute -inset-3 rounded-t-[50%] border border-gold/35"
              aria-hidden="true"
            />
            <figure className="relative overflow-hidden rounded-t-[50%] border border-gold/60 bg-field">
              <img
                src={photos.feature.src}
                alt={photos.feature.alt}
                width={933}
                height={1400}
                fetchPriority="high"
                decoding="async"
                className="aspect-[3/4] w-full object-cover object-[50%_28%]"
              />
              <span
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-field-deep/45 via-transparent to-transparent"
                aria-hidden="true"
              />
            </figure>

            {/* Tucked-in square print */}
            <figure className="absolute -bottom-2 right-0 w-24 rotate-[-5deg] bg-cream p-1.5 shadow-[0_18px_38px_-16px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:rotate-0 sm:w-32">
              <img
                src={photos.featureDetail.src}
                alt={photos.featureDetail.alt}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover"
              />
              <figcaption className="pt-1.5 pb-0.5 text-center font-script text-[0.95rem] leading-none text-plum">
                {photos.featureDetail.label}
              </figcaption>
            </figure>
          </div>
        </AnimatedContent>

        <AnimatedContent direction="right" distance={36} delay={120}>
          <p className="eyebrow text-gold-light/85">Before the vows</p>

          <h2
            id="portrait-title"
            className="mt-4 font-script text-[clamp(2.4rem,5.4vw,3.9rem)] leading-[1.05] text-cream"
          >
            Every photo, <span className="text-gold-light">a page</span>
          </h2>

          <div className="mt-6 h-px w-20 bg-gold/55" aria-hidden="true" />

          <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-cream/78">
            {story.intro} {story.quote}
          </p>

          <p className="mt-4 max-w-lg text-[1.05rem] leading-relaxed text-cream/60">
            On 26 November we add the next one. We would love for you to be in it.
          </p>

          <dl className="mt-9 grid grid-cols-3 gap-4 border-t border-gold/25 pt-6">
            {story.milestones.map(({ year, title: note }) => (
              <div key={`${year}-${note}`}>
                <dt className="font-serif text-[clamp(1.35rem,3vw,1.75rem)] italic text-gold-light">
                  {year}
                </dt>
                <dd className="mt-1 font-ui text-[0.58rem] uppercase tracking-[0.24em] text-cream/55">
                  {note}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#story" className="btn-gold">
              Our story
            </a>
            <a
              href="#gallery"
              className="font-ui text-[0.65rem] uppercase tracking-[0.26em] text-cream/60 underline decoration-gold/40 underline-offset-[6px] transition-colors hover:text-gold-light"
            >
              See more photos
            </a>
          </div>

          <p className="mt-8 font-script text-2xl text-gold-light/90">
            {couple.display}
          </p>
        </AnimatedContent>
      </div>
    </section>
  );
}
