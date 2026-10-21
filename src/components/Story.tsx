import AnimatedContent from './bits/AnimatedContent';
import SectionHeading from './SectionHeading';
import FloralCorner from './art/FloralCorner';
import { story } from '../config/site';
import { photos } from '../config/photos';

export default function Story() {
  const storyPhoto = photos.story[3];

  return (
    <section
      id="story"
      className="section-pad relative overflow-hidden bg-field text-cream scroll-mt-20"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(90% 70% at 88% 8%, rgba(247,243,232,0.14) 0%, rgba(111,122,97,0) 60%), radial-gradient(70% 60% at 6% 94%, rgba(72,81,63,0.9) 0%, rgba(111,122,97,0) 62%)',
        }}
        aria-hidden="true"
      />

      <FloralCorner className="animate-drift pointer-events-none absolute -left-10 top-10 h-52 w-52 opacity-30" />
      <FloralCorner
        flip
        className="animate-drift pointer-events-none absolute -bottom-10 -right-10 h-52 w-52 opacity-30"
      />

      <div className="relative">
        <SectionHeading
          chapter={story.chapter}
          eyebrow="A little about us"
          title={story.title}
          intro={story.intro}
          tone="dark"
        />

        <div className="mx-auto mt-14 grid max-w-4xl items-center gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(15rem,0.75fr)] md:gap-16">
          <AnimatedContent direction="left" className="text-center md:text-left">
            <blockquote className="border-y border-gold/25 py-8 md:py-10">
              <p className="font-script text-[clamp(2rem,5vw,3.4rem)] leading-[1.08] text-gold-light">
                “{story.quote}”
              </p>
              <footer className="mt-6 flex items-center justify-center gap-3 font-ui text-[0.62rem] uppercase tracking-[0.28em] text-cream/60 md:justify-start">
                <span className="h-px w-8 bg-gold/50" aria-hidden="true" />
                {story.attribution}
              </footer>
            </blockquote>

            <ol className="mt-8 grid gap-4 sm:grid-cols-3">
              {story.milestones.map((milestone) => (
                <li key={`${milestone.year}-${milestone.title}`} className="border-l border-gold/40 pl-4">
                  <p className="chapter-numeral text-xl text-gold-light">{milestone.year}</p>
                  <p className="mt-1 font-serif text-lg text-cream">{milestone.title}</p>
                </li>
              ))}
            </ol>
          </AnimatedContent>

          <AnimatedContent direction="right" delay={120}>
            <figure className="mx-auto max-w-[18rem]">
              <div className="overflow-hidden bg-cream/5 p-2 shadow-[0_28px_60px_-34px_rgba(0,0,0,0.85)] ring-1 ring-gold/40">
                <img
                  src={storyPhoto.src}
                  alt={storyPhoto.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-center gap-3 font-ui text-[0.6rem] uppercase tracking-[0.28em] text-gold-light/75">
                <span className="h-px w-6 bg-gold/50" aria-hidden="true" />
                {storyPhoto.label}
              </figcaption>
            </figure>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
