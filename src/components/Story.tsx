import AnimatedContent from './bits/AnimatedContent';
import SectionHeading from './SectionHeading';
import FloralCorner from './art/FloralCorner';
import { story } from '../config/site';
import { photos } from '../config/photos';

/** Chapter II — placeholder narrative the couple can rewrite in site.ts. */
export default function Story() {
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
          eyebrow="How we got here"
          title={story.title}
          intro={story.intro}
          tone="dark"
        />

        <ol className="mx-auto mt-16 max-w-5xl">
          {story.milestones.map((milestone, index) => {
            const photo = photos.story[index % photos.story.length];
            const photoLeft = index % 2 === 1;

            return (
              <li
                key={milestone.year}
                className="border-t border-gold/15 py-10 first:border-t-0 first:pt-0 md:grid md:grid-cols-2 md:items-center md:gap-16 md:py-14"
              >
                <AnimatedContent
                  direction={index % 2 === 0 ? 'left' : 'right'}
                  distance={40}
                  delay={index * 90}
                  className={`${photoLeft ? 'md:order-2' : 'md:order-1'} ${
                    photoLeft ? 'md:text-left' : 'md:text-right'
                  }`}
                >
                  <p className="chapter-numeral text-2xl text-gold-light">{milestone.year}</p>
                  <h3 className="mt-2 font-serif text-[1.5rem] leading-snug text-cream">
                    {milestone.title}
                  </h3>
                  <p className="mt-3 text-[1.02rem] leading-relaxed text-cream/75">
                    {milestone.detail}
                  </p>
                </AnimatedContent>

                {photo ? (
                  <AnimatedContent
                    direction={photoLeft ? 'left' : 'right'}
                    distance={40}
                    delay={index * 90 + 80}
                    className={`${photoLeft ? 'md:order-1' : 'md:order-2'} mt-8 md:mt-0`}
                  >
                    <figure className="relative w-full max-w-[21rem] md:mx-auto">
                      <div className="relative overflow-hidden bg-cream/5 p-2 shadow-[0_28px_60px_-34px_rgba(0,0,0,0.85)] ring-1 ring-gold/40">
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[4/5] w-full object-cover"
                        />
                      </div>
                      <figcaption className="mt-3 flex items-center gap-3 font-ui text-[0.6rem] uppercase tracking-[0.28em] text-gold-light/75">
                        <span className="h-px w-6 bg-gold/50" aria-hidden="true" />
                        {photo.label}
                      </figcaption>
                    </figure>
                  </AnimatedContent>
                ) : null}
              </li>
            );
          })}
        </ol>

        <AnimatedContent className="mx-auto mt-16 max-w-xl text-center">
          <p className="font-script text-[clamp(1.5rem,4vw,2.1rem)] leading-snug text-gold-light">
            {story.outro}
          </p>
        </AnimatedContent>
      </div>
    </section>
  );
}
