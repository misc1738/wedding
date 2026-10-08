import { useState, type FormEvent } from 'react';
import AnimatedContent from './bits/AnimatedContent';
import SectionHeading from './SectionHeading';
import FloralCorner from './art/FloralCorner';
import { save, type RsvpRecord } from '../lib/rsvpStore';
import { rsvp } from '../config/site';

type Draft = {
  name: string;
  contact: string;
  attending: 'yes' | 'no' | '';
  guests: string;
  meal: string;
  song: string;
  note: string;
};

type Errors = Partial<Record<keyof Draft, string>>;

const EMPTY: Draft = {
  name: '',
  contact: '',
  attending: '',
  guests: '1',
  meal: rsvp.meals[0],
  song: '',
  note: '',
};

const MAX_GUESTS = 6;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d][\d\s()-]{6,}$/;

function validate(draft: Draft): Errors {
  const errors: Errors = {};

  if (draft.name.trim().length < 2) {
    errors.name = 'Please tell us your name.';
  }

  const contact = draft.contact.trim();
  if (!contact) {
    errors.contact = 'We need a way to reach you — email or phone.';
  } else if (!EMAIL.test(contact) && !PHONE.test(contact)) {
    errors.contact = 'That does not look like an email address or a phone number.';
  }

  if (!draft.attending) {
    errors.attending = 'Please let us know whether you can make it.';
  }

  if (draft.attending === 'yes') {
    const count = Number(draft.guests);
    if (!Number.isInteger(count) || count < 1 || count > MAX_GUESTS) {
      errors.guests = `Somewhere between 1 and ${MAX_GUESTS}, please.`;
    }
  }

  return errors;
}

function fieldError(errors: Errors, key: keyof Draft) {
  return errors[key] ? (
    <p id={`${key}-error`} className="mt-1.5 text-[0.86rem] text-blush-deep">
      {errors[key]}
    </p>
  ) : null;
}

export default function RsvpForm() {
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [record, setRecord] = useState<RsvpRecord | null>(null);

  const update = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const found = validate(draft);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0];
      document.getElementById(firstKey)?.focus();
      return;
    }

    setRecord(
      save({
        name: draft.name.trim(),
        contact: draft.contact.trim(),
        attending: draft.attending as 'yes' | 'no',
        guests: draft.attending === 'yes' ? Number(draft.guests) : 0,
        meal: draft.attending === 'yes' ? draft.meal : '',
        song: draft.song.trim(),
        note: draft.note.trim(),
      }),
    );
  };

  const reset = () => {
    setRecord(null);
    setDraft(EMPTY);
    setErrors({});
  };

  const attending = draft.attending === 'yes';

  return (
    <section
      id="rsvp"
      className="section-pad relative overflow-hidden scroll-mt-20 bg-field text-cream"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(75% 55% at 50% 100%, rgba(72,81,63,0.95) 0%, rgba(111,122,97,0) 68%)',
        }}
        aria-hidden="true"
      />

      <FloralCorner
        flip
        className="pointer-events-none absolute -right-8 top-4 h-44 w-44 opacity-25"
      />

      <div className="relative">
        <SectionHeading
          chapter={rsvp.chapter}
          eyebrow={`Kindly reply by ${rsvp.deadline}`}
          title={rsvp.title}
          intro={rsvp.intro}
          tone="dark"
        />

        <div className="mx-auto mt-14 max-w-2xl">
          {record ? (
            <AnimatedContent>
              <div className="border border-gold/50 bg-field-deep/60 px-6 py-10 text-center backdrop-blur-sm md:px-10">
                <p className="eyebrow text-gold-light">
                  {record.attending === 'yes' ? 'We cannot wait' : 'We will miss you'}
                </p>

                <p className="mt-5 font-script text-[clamp(2rem,6vw,2.8rem)] leading-tight text-cream">
                  {record.attending === 'yes'
                    ? 'Thank you, see you there!'
                    : 'Thank you for letting us know'}
                </p>

                <div className="hairline mx-auto my-6 w-32" aria-hidden="true" />

                <p className="text-[1.02rem] leading-relaxed text-cream/75">
                  {record.attending === 'yes'
                    ? `A seat is saved for you${record.guests > 1 ? ` and ${record.guests - 1} other${record.guests > 2 ? 's' : ''}` : ''} on ${'26 November 2026'}.`
                    : 'We are sorry to miss you, and grateful you told us.'}
                </p>

                <div className="mt-7 inline-block border border-gold/50 px-6 py-4">
                  <p className="eyebrow text-gold-light/70">Your reference</p>
                  <p className="mt-1.5 font-serif text-2xl tracking-[0.18em] text-gold-light">
                    {record.reference}
                  </p>
                </div>

                <p className="mt-6 text-sm italic text-cream/55">
                  Keep this code — quote it if you need to change your answer.
                </p>

                <button type="button" className="btn-gold mt-7" onClick={reset}>
                  Submit another response
                </button>
              </div>
            </AnimatedContent>
          ) : (
            <AnimatedContent>
              <form
                onSubmit={onSubmit}
                noValidate
                className="border border-gold/45 bg-field-deep/45 p-6 backdrop-blur-sm md:p-9"
              >
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="eyebrow block text-gold-light">
                      Your name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className="field-input mt-2"
                      placeholder="As it appears on your invitation"
                      value={draft.name}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      onChange={(e) => update('name', e.target.value)}
                    />
                    {fieldError(errors, 'name')}
                  </div>

                  {/* Contact */}
                  <div>
                    <label htmlFor="contact" className="eyebrow block text-gold-light">
                      Email or phone
                    </label>
                    <input
                      id="contact"
                      name="contact"
                      type="text"
                      autoComplete="email"
                      className="field-input mt-2"
                      placeholder="you@example.com or +254…"
                      value={draft.contact}
                      aria-invalid={Boolean(errors.contact)}
                      aria-describedby={errors.contact ? 'contact-error' : undefined}
                      onChange={(e) => update('contact', e.target.value)}
                    />
                    {fieldError(errors, 'contact')}
                  </div>

                  {/* Attending */}
                  <fieldset aria-describedby={errors.attending ? 'attending-error' : undefined}>
                    <legend className="eyebrow text-gold-light">
                      Will you be there?
                    </legend>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {(
                        [
                          { value: 'yes', label: 'Joyfully accepts' },
                          { value: 'no', label: 'Regretfully declines' },
                        ] as const
                      ).map((option) => {
                        const selected = draft.attending === option.value;
                        return (
                          <label
                            key={option.value}
                            className={`cursor-pointer border px-4 py-3.5 text-center font-serif text-[1.02rem] transition-colors ${
                              selected
                                ? 'border-gold bg-gold text-field-deep'
                                : 'border-gold/45 text-cream hover:border-gold hover:bg-gold/15'
                            }`}
                          >
                            <input
                              type="radio"
                              name="attending"
                              value={option.value}
                              checked={selected}
                              className="sr-only"
                              onChange={() => update('attending', option.value)}
                            />
                            {option.label}
                          </label>
                        );
                      })}
                    </div>
                    {fieldError(errors, 'attending')}
                  </fieldset>

                  {/* Conditional fields */}
                  {attending ? (
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="guests" className="eyebrow block text-gold-light">
                          In your party
                        </label>
                        <select
                          id="guests"
                          name="guests"
                          className="field-input mt-2"
                          value={draft.guests}
                          aria-invalid={Boolean(errors.guests)}
                          aria-describedby={errors.guests ? 'guests-error' : undefined}
                          onChange={(e) => update('guests', e.target.value)}
                        >
                          {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={String(n)}>
                              {n} {n === 1 ? 'person' : 'people'}
                            </option>
                          ))}
                        </select>
                        {fieldError(errors, 'guests')}
                      </div>

                      <div>
                        <label htmlFor="meal" className="eyebrow block text-gold-light">
                          Meal preference
                        </label>
                        <select
                          id="meal"
                          name="meal"
                          className="field-input mt-2"
                          value={draft.meal}
                          onChange={(e) => update('meal', e.target.value)}
                        >
                          {rsvp.meals.map((meal) => (
                            <option key={meal} value={meal}>
                              {meal}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ) : null}

                  {/* Song */}
                  <div>
                    <label htmlFor="song" className="eyebrow block text-gold-light">
                      A song to dance to <span className="normal-case tracking-normal text-cream/45">(optional)</span>
                    </label>
                    <input
                      id="song"
                      name="song"
                      type="text"
                      className="field-input mt-2"
                      placeholder="Something guaranteed to get you up"
                      value={draft.song}
                      onChange={(e) => update('song', e.target.value)}
                    />
                  </div>

                  {/* Note */}
                  <div>
                    <label htmlFor="note" className="eyebrow block text-gold-light">
                      A note for us <span className="normal-case tracking-normal text-cream/45">(optional)</span>
                    </label>
                    <textarea
                      id="note"
                      name="note"
                      rows={3}
                      className="field-input mt-2 resize-y"
                      placeholder="Anything we should know — dietary needs, arrival time…"
                      value={draft.note}
                      onChange={(e) => update('note', e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-col items-center gap-4">
                  <button type="submit" className="btn-gold btn-gold--solid px-10">
                    Send response
                  </button>
                  <p className="text-center text-xs italic text-cream/50">
                    Your reply is saved securely. Quote the reference if you need to
                    change it.
                  </p>
                </div>
              </form>
            </AnimatedContent>
          )}
        </div>
      </div>
    </section>
  );
}
