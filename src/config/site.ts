/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  EVERYTHING YOU MIGHT WANT TO EDIT LIVES IN THIS FILE.
 *  Dates, times, venue, wording, FAQ answers, links, the admin passcode hash.
 *  Nothing outside `ADMIN` needs touching to change what the site says.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const couple = {
  partnerA: 'Mutua',
  partnerB: 'Wahito',
  display: 'Mutua & Wahito',
  greeting: 'Welcome to our beginning',
  /** Short line under the names in the hero. */
  tagline: 'Together with their families, we invite you to celebrate our marriage',
};

/**
 * The ceremony start moment, used for the countdown and the calendar file.
 * Nairobi is EAT = UTC+03:00, so this is 09:00 local.
 */
export const event = {
  startsAt: '2026-11-26T09:00:00+03:00',
  /** Shown everywhere as the big date. */
  dateLabel: '26 | 11 | 26',
  dateLong: 'Thursday, 26 November 2026',
  timeLabel: '9:00 AM',
  guestArrivalLabel: '8:45 AM',
  guestSeatedLabel: '8:50 AM',
  venue: 'PCEA St Luke',
  area: 'Utawala, Nairobi',
  country: 'Kenya',
  /** Edit the countdown headline wording here. */
  countdownLabel: 'Until we say “I do”',
};

export const nav = [
  { id: 'schedule', label: 'Schedule' },
  { id: 'story', label: 'Our Story' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'colours', label: 'Colours' },
  { id: 'travel', label: 'Travel' },
  { id: 'gifts', label: 'Gifts' },
  { id: 'faq', label: 'Q&A' },
];

export const schedule = [
  {
    time: '08:45',
    title: 'Guests arrive',
    detail: `Ushers will show you to your seat. Please be seated by ${event.guestSeatedLabel} so the ceremony can begin on time.`,
  },
  {
    time: '09:00',
    title: 'Holy matrimony',
    detail: 'The service begins promptly. Please be seated before the bridal party enters.',
  },
  {
    time: '11:45',
    title: 'Signing & congratulations',
    detail: 'The register is signed, and there is time for greetings and photographs.',
  },
  {
    time: '12:30',
    title: 'Group photographs',
    detail: 'Family and friends are called by group. Your presence in these means a lot to us.',
  },
  {
    time: '14:00',
    title: 'Reception',
    detail: 'Lunch is served and the celebrations continue.',
  },
  {
    time: '17:00',
    title: 'Cake & first dance',
    detail: 'The cake is cut and the floor opens. Bring your appetite for dancing.',
  },
  {
    time: '19:00',
    title: 'Send-off',
    detail: 'A last circle of sparklers as we leave. Thank you for spending the day with us.',
  },
];

export const story = {
  chapter: 'II',
  title: 'Our Story',
  intro:
    'Two years of the small things: taking the long way home, the inside jokes only we understand, and the countless random dates.',
  quote:
    'These are the few frames we did manage to keep, and the ones we want you to see as we count down to the day itself.',
  attribution: 'Mutua & Wahito',
  milestones: [
    { year: '2024', title: 'We met' },
    { year: '2026', title: 'She said yes' },
    { year: '2026', title: 'The wedding' },
  ],
};

export const palette = {
  chapter: 'IV',
  title: 'Event colours & dress code',
  intro:
    'Blush and mauve through plum, with sage and gold. Come in any of these and you will fit right in — there is no strict dress code, only a gentle suggestion.',
  swatches: [
    { name: 'Blush', hex: '#F2D0CD', text: '#2E3227' },
    { name: 'Dusty Rose', hex: '#C98A90', text: '#2E3227' },
    { name: 'Mauve', hex: '#A8748C', text: '#F7F3E8' },
    { name: 'Plum', hex: '#6B2F4A', text: '#F7F3E8' },
    { name: 'Sage', hex: '#8C9E7E', text: '#2E3227' },
  ],
  note: 'Gentlemen: a sage or plum tie would be perfect. Ladies: any of the five above.',
};

export const travel = {
  chapter: 'V',
  title: 'Travel & the venue',
  intro:
    'PCEA St Luke sits in Utawala, about a 35-minute drive from Nairobi’s CBD depending on traffic.',
  /** Centred on Utawala; OpenStreetMap does not carry this church as a named place. */
  map: {
    lat: -1.2843808,
    lon: 36.9680714,
    /** Exact lookup — resolves the church name properly. */
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=PCEA%20St%20Luke%2C%20Utawala%2C%20Nairobi%2C%20Kenya',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=PCEA%20St%20Luke%2C%20Utawala%2C%20Nairobi%2C%20Kenya',
  },
  blocks: [
    {
      heading: 'Getting there',
      detail:
        'Take matatu number 33 from Ambassador and alight at Quickmart (Kwa Chief).',
    },
    {
      heading: 'Parking',
      detail:
        `There is parking inside the church compound. Please arrive by ${event.guestArrivalLabel}.`,
      },
  ],
};

export const gifts = {
  chapter: 'VI',
  title: 'Gifts',
  intro:
    'We will deeply appreciate your presence and thoughtful gifts. A contribution towards our first home together would mean a great deal to us.',
  options: [
    {
      label: 'Cash',
      value: 'On the day',
      detail: 'Envelopes shall be provided at the reception.',
    },
  ],
};

export const faq = {
  chapter: 'VII',
  title: 'Questions',
  intro: 'The things guests ask us most, answered in advance.',
  items: [
    {
      q: 'Bringing a plus-one?',
      a: 'Your invitation names everyone we have saved a seat for. If someone is missing from it, message us and we will do our best.',
    },
    {
      q: 'What time should I arrive?',
      a: `Please arrive by ${event.guestArrivalLabel}. The service begins at ${event.timeLabel}, and everyone should be seated by ${event.guestSeatedLabel} so the processional can start on time.`,
    },
    {
      q: 'Are children welcome?',
      a: 'Yes — family is family. There is space at the back of the church if anyone needs to step out with a little one.',
    },
    {
      q: 'Is there parking?',
      a: `Yes, inside the church compound. Please arrive by ${event.guestArrivalLabel}; the gate gets busy once the bridal party arrives.`,
    },
    {
      q: 'What should I wear?',
      a: 'Anything in blush, dusty rose, mauve, plum or sage. Smart and comfortable is the aim — the reception involves dancing.',
    },
  ],
};

export const rsvp = {
  chapter: 'VIII',
  title: 'RSVP',
  intro: 'Kindly respond by 31 October 2026 so we can seat everyone properly.',
  deadline: '31 October 2026',
  meals: ['No preference', 'Chicken', 'Beef', 'Fish', 'Vegetarian', 'Vegan'],
};

export const footer = {
  closing: 'With love, Mutua & Wahito',
  hashtag: '#MutuaMeetsWahito',
  /** Edit this to your own contact if you would rather hear from guests directly. */
  contactLabel: 'Questions? Message either of us directly.',
};

export const ADMIN = {
  /**
   * SHA-256 of the passcode — the plain text is never in the source.
   * Change by running:  node -e "console.log(require('crypto').createHash('sha256').update('YOURCODE').digest('hex'))"
   * Default passcode: 261126
   */
  passcodeHash:
    '348de92d6eec7f3ff2da9fe9074004fefa0a75cb756605accf2ffa1b1418a87a',
  /** Cosmetic only — this is a deterrent, not real authentication. */
  hint: 'The passcode is the wedding date, no separators.',
};
