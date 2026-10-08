import AnimatedContent from './bits/AnimatedContent';
import SectionHeading from './SectionHeading';
import FloralCorner from './art/FloralCorner';
import { gifts } from '../config/site';

/** Chapter VI — M-Pesa and cash envelope gifting. */
export default function Gifts() {
  return (
    <section
      id="gifts"
      className="section-pad relative overflow-hidden scroll-mt-20 bg-field-deep text-cream"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(80% 60% at 50% 0%, rgba(198,164,92,0.16) 0%, rgba(72,81,63,0) 65%)',
        }}
        aria-hidden="true"
      />

      <FloralCorner className="pointer-events-none absolute -left-8 -top-6 h-44 w-44 opacity-25" />
      <FloralCorner
        flip
        className="pointer-events-none absolute -bottom-6 -right-8 h-44 w-44 opacity-25"
      />

      <div className="relative">
        <SectionHeading
          chapter={gifts.chapter}
          eyebrow="If you would like to"
          title={gifts.title}
          intro={gifts.intro}
          tone="dark"
        />

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
          {gifts.options.map((option, index) => (
            <AnimatedContent
              key={option.label}
              delay={index * 120}
              className="h-full"
            >
              <div className="flex h-full flex-col border border-gold/45 bg-field/45 p-7 text-center backdrop-blur-sm">
                <p className="eyebrow text-gold-light">{option.label}</p>
                <p className="mt-4 break-words font-serif text-[clamp(1.15rem,3.4vw,1.45rem)] leading-snug text-cream">
                  {option.value}
                </p>
                <div className="hairline mx-auto my-5 w-16" aria-hidden="true" />
                <p className="text-[0.98rem] leading-relaxed text-cream/70">
                  {option.detail}
                </p>
              </div>
            </AnimatedContent>
          ))}
        </div>

        <AnimatedContent delay={280} className="mx-auto mt-10 max-w-xl text-center">
          <p className="text-[1.02rem] italic leading-relaxed text-gold-light/85">
            {gifts.note}
          </p>
        </AnimatedContent>
      </div>
    </section>
  );
}
