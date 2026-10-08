import AnimatedContent from './bits/AnimatedContent';
import SectionHeading from './SectionHeading';
import FloralCorner from './art/FloralCorner';
import { story } from '../config/site';

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

        <ol className="mx-auto mt-16 max-w-4xl space-y-10 md:space-y-0">
          {story.milestones.map((milestone, index) => (
            <li key={milestone.year} className="md:grid md:grid-cols-2 md:gap-14">
              <AnimatedContent
                direction={index % 2 === 0 ? 'left' : 'right'}
                distance={40}
                delay={index * 90}
                className={`${
                  index % 2 === 0
                    ? 'md:col-start-1 md:text-right'
                    : 'md:col-start-2 md:row-start-1'
                } pb-10 md:pb-20`}
              >
                <p className="chapter-numeral text-2xl text-gold-light">
                  {milestone.year}
                </p>
                <h3 className="mt-2 font-serif text-[1.5rem] leading-snug text-cream">
                  {milestone.title}
                </h3>
                <p className="mt-2 text-[1.02rem] leading-relaxed text-cream/75">
                  {milestone.detail}
                </p>
              </AnimatedContent>

              {/* Empty half keeps the zig-zag rhythm on desktop */}
              <div className="hidden md:block" aria-hidden="true" />
            </li>
          ))}
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
