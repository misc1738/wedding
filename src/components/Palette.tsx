import AnimatedContent from './bits/AnimatedContent';
import SectionHeading from './SectionHeading';
import { palette } from '../config/site';

/** Chapter IV — the mood board's five colours as a dress-code suggestion. */
export default function Palette() {
  return (
    <section
      id="colours"
      className="section-pad relative overflow-hidden scroll-mt-20 bg-cream-warm/70"
    >
      <SectionHeading
        chapter={palette.chapter}
        eyebrow="Dress code"
        title={palette.title}
        intro={palette.intro}
      />

      <div className="mx-auto mt-14 max-w-5xl">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {palette.swatches.map((swatch, index) => (
            <AnimatedContent
              key={swatch.name}
              delay={index * 80}
              className="h-full"
            >
              <li className="flex h-full flex-col overflow-hidden border border-gold/30">
                <div
                  className="flex h-32 items-end justify-start p-3 sm:h-44"
                  style={{ backgroundColor: swatch.hex }}
                  aria-hidden="true"
                >
                  <span
                    className="font-ui text-[0.62rem] tracking-[0.2em]"
                    style={{ color: swatch.text }}
                  >
                    {swatch.hex.toUpperCase()}
                  </span>
                </div>
                <div className="bg-cream px-3 py-3 text-center">
                  <p className="font-serif text-[1.05rem] text-field-deep">
                    {swatch.name}
                  </p>
                </div>
              </li>
            </AnimatedContent>
          ))}
        </ul>

        {/* Full-width strip, the way the mood board reads */}
        <AnimatedContent delay={240} className="mt-8">
          <div className="flex h-14 overflow-hidden border border-gold/30 sm:h-16">
            {palette.swatches.map((swatch) => (
              <div
                key={`strip-${swatch.name}`}
                className="flex-1"
                style={{ backgroundColor: swatch.hex }}
                title={swatch.name}
              />
            ))}
          </div>
        </AnimatedContent>

        <AnimatedContent delay={320} className="mt-8 text-center">
          <p className="mx-auto max-w-xl text-[1.02rem] italic leading-relaxed text-ink/70">
            {palette.note}
          </p>
        </AnimatedContent>
      </div>
    </section>
  );
}
