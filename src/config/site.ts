/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  EVERYTHING YOU MIGHT WANT TO EDIT LIVES IN THIS FILE.
 *  Dates, times, venue, wording, FAQ answers, and links.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const couple = {
  partnerA: 'Wahito',
  partnerB: 'Mutua',
  display: 'Wahito & Mutua',
  greeting: 'Welcome to our beginning',
  /** Short line under the names in the hero. */
  tagline: 'Together with their families, they invite you to share in the joy of their wedding day.',
};

/**
 * The ceremony start moment, used for the countdown and the calendar file.
 * Nairobi is EAT = UTC+03:00, so this is 08:30 local.
 */
export const event = {
  startsAt: '2026-11-26T08:30:00+03:00',
  /** Shown everywhere as the big date. */
  dateLabel: '26 | 11 | 26',
  dateLong: 'Thursday, 26 November 2026',
  timeLabel: '8:30 AM',
  guestArrivalLabel: '8:15 AM',
  guestSeatedLabel: '8:15 AM',
  venue: 'PCEA St Luke',
  area: 'Utawala, Nairobi',
  receptionVenue: 'Nairobi Baptist Westlands',
  receptionArea: 'Westlands, Nairobi',
  receptionMapsUrl: 'https://maps.app.goo.gl/n7GDPPDTDys5rpvR6',
  country: 'Kenya',
  /** Edit the countdown headline wording here. */
  countdownLabel: 'Until we say “I do”',
};

export const nav = [
  { id: 'invitation', label: 'Invitation' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'story', label: 'Our Story' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'colours', label: 'Colours' },
  { id: 'travel', label: 'Travel' },
  { id: 'gifts', label: 'Gift' },
  { id: 'faq', label: 'Q&A' },
];

export const schedule = [
  {
    time: '08:15',
    title: 'Guests arrive',
    detail: `Ushers will show you to your seat. Please be seated by ${event.guestSeatedLabel} so the ceremony can begin on time.`,
  },
  {
    time: '08:30',
    title: 'Holy matrimony',
    detail: 'The service begins promptly. Please be seated before the bridal party enters.',
  },
  {
    time: '09:30',
    title: 'Signing',
    detail: 'The register is signed after the ceremony.',
  },
  {
    time: '10:00',
    title: 'Group photographs',
    detail: 'Family and friends are called by group. Your presence in these means a lot to us.',
  },
  {
    time: '13:00',
    title: 'Reception',
    detail: `The reception begins at ${event.receptionVenue}.`,
  },
  {
    time: '16:00',
    title: 'Cake & first dance',
    detail: 'The cake is cut and the floor opens. Bring your appetite for dancing.',
  },
];

export const story = {
  chapter: 'II',
  title: 'Our Story',
  intro:
    'Two years of the small things: taking the long way home, the inside jokes only we understand, and the countless random dates.',
  quote:
    'These are the few frames we did manage to keep, and the ones we want you to see as we count down to the day itself.',
  attribution: 'Wahito & Mutua',
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
    'The ceremony is at PCEA St Luke in Utawala, followed by the reception at Nairobi Baptist Westlands.',
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
      {
        heading: 'Reception',
        detail: `${event.receptionVenue}, ${event.receptionArea}.`,
        link: event.receptionMapsUrl,
      },
  ],
};

export const gifts = {
  chapter: 'VI',
  title: 'Gift',
  intro:
    'We will deeply appreciate your presence and thoughtful gift. A contribution towards our first home together would mean a great deal to us.',
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
  closing: 'With love, Wahito & Mutua',
  hashtag: '#WahitoMeetsMutua',
  /** Edit this to your own contact if you would rather hear from guests directly. */
  contactLabel: 'Questions? Message either of us directly.',
};
