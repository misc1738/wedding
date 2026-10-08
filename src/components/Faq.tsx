import { useState } from 'react';
import AnimatedContent from './bits/AnimatedContent';
import SectionHeading from './SectionHeading';
import { faq } from '../config/site';

/** Chapter VII — accessible single-open accordion. */
export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="section-pad relative bg-cream scroll-mt-20"
      style={{ backgroundColor: '#F4EEE0' }}
    >
      <SectionHeading
        chapter={faq.chapter}
        eyebrow="Good to know"
        title={faq.title}
        intro={faq.intro}
      />

      <div className="mx-auto mt-14 max-w-3xl">
        <div className="divide-y divide-gold/35 border-y border-gold/40">
          {faq.items.map((item, index) => {
            const open = openIndex === index;
            const buttonId = `faq-button-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <AnimatedContent key={item.q} delay={index * 60} threshold={0.05}>
                <div>
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? null : index)}
                      className="flex w-full items-center justify-between gap-5 py-5 text-left transition-colors hover:text-gold-deep"
                    >
                      <span className="font-serif text-[1.15rem] leading-snug text-field-deep md:text-[1.24rem]">
                        {item.q}
                      </span>
                      <span
                        className="relative block h-6 w-6 shrink-0 text-gold"
                        aria-hidden="true"
                      >
                        <span className="absolute left-0 top-1/2 h-px w-6 -translate-y-1/2 bg-current" />
                        <span
                          className="absolute left-1/2 top-0 h-6 w-px -translate-x-1/2 bg-current transition-transform duration-400"
                          style={{
                            transform: open
                              ? 'translateX(-50%) scaleY(0)'
                              : 'translateX(-50%) scaleY(1)',
                          }}
                        />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!open}
                    className="pb-6 pr-10"
                  >
                    <p className="text-[1.03rem] leading-relaxed text-ink/75">
                      {item.a}
                    </p>
                  </div>
                </div>
              </AnimatedContent>
            );
          })}
        </div>
      </div>
    </section>
  );
}
