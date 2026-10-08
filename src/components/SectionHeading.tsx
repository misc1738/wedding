import type { ReactNode } from 'react';
import BlurText from './bits/BlurText';
import AnimatedContent from './bits/AnimatedContent';

type Props = {
  chapter?: string;
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  /** 'light' = on cream, 'dark' = on the sage field. */
  tone?: 'light' | 'dark';
  align?: 'center' | 'left';
  className?: string;
};

export default function SectionHeading({
  chapter,
  eyebrow,
  title,
  intro,
  tone = 'light',
  align = 'center',
  className = '',
}: Props) {
  const dark = tone === 'dark';
  const centred = align === 'center';

  return (
    <AnimatedContent
      className={`${centred ? 'text-center mx-auto' : 'text-left'} max-w-2xl ${className}`}
    >
      {chapter ? (
        <p
          className={`chapter-numeral text-xl md:text-2xl mb-3 ${
            dark ? 'text-gold-light' : 'text-gold'
          }`}
        >
          {chapter}
        </p>
      ) : null}

      {eyebrow ? (
        <p
          className={`eyebrow mb-4 ${dark ? 'text-gold-light/85' : 'text-gold-deep'}`}
        >
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={`font-script leading-[1.05] text-[clamp(2.4rem,7vw,4rem)] ${
          dark ? 'text-cream' : 'text-field-deep'
        }`}
      >
        <BlurText text={title} />
      </h2>

      <div
        className={`hairline my-6 h-px w-24 ${centred ? 'mx-auto' : ''}`}
        aria-hidden="true"
      />

      {intro ? (
        <p
          className={`text-[1.06rem] leading-relaxed ${
            dark ? 'text-cream/80' : 'text-ink/75'
          }`}
        >
          {intro}
        </p>
      ) : null}
    </AnimatedContent>
  );
}
