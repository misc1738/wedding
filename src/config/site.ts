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
 * Nairobi is EAT = UTC+03:00, so this is 10:00 local.
 */
export const event = {
  startsAt: '2026-11-26T10:00:00+03:00',
  /** Shown everywhere as the big date. */
  dateLabel: '26 | 11 | 26',
  dateLong: 'Thursday, 26 November 2026',
  timeLabel: '10:00 AM',
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
    time: '09:30',
    title: 'Guests arrive',
    detail: 'Ushers will show you to your seat. Come a little early — the church fills quickly.',
  },
  {
    time: '10:00',
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
    detail: 'Lunch is served. Seating follows the printed cards at the entrance.',
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
    'Every love story is beautiful, but ours is our favourite. Here is the short version — the long version takes all evening and at least two plates of food.',
  milestones: [
    {
      year: '2019',
      title: 'The introduction',
      detail:
        'A mutual friend insisted we would get along. We did not believe her for about a month.',
    },
    {
      year: '2021',
      title: 'The long drives',
      detail:
        'Late-night drives across Nairobi with the radio on and no particular destination became a habit neither of us wanted to break.',
    },
    {
      year: '2024',
      title: 'The question',
      detail:
        'Asked quietly, answered loudly. Both families were told within the hour.',
    },
    {
      year: '2026',
      title: 'The beginning',
      detail:
        'PCEA St Luke, 10:00 in the morning, surrounded by the people who got us here.',
    },
  ],
  outro:
    'This is only the first chapter. We are so glad you will be there to turn the page with us.',
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
    'PCEA St Luke sits in Utawala, about a twenty-minute drive from Nairobi’s CBD depending on traffic.',
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
        'From town, take the Eastleigh–Utawala route or any matatu heading toward Utawala and alight at the Utawala stage. A boda or short taxi hop takes you the rest of the way.',
    },
    {
      heading: 'Parking',
      detail:
        'There is parking inside the church compound. Arrive by 09:15 on the day — the gate fills once the bridal party arrives.',
    },
    {
      heading: 'Where to stay',
      detail:
        'Hotels along Mombasa Road and in the Utawala–Embakasi stretch are all within a short drive. Book early; the wedding falls on a weekday.',
    },
    {
      heading: 'Running late?',
      detail:
        'Message the couple directly rather than waiting. The service starts at 10:00 sharp and the doors close for the processional.',
    },
  ],
};

export const gifts = {
  chapter: 'VI',
  title: 'Gifts',
  intro:
    'Your presence is the gift we want. If you would still like to give, a contribution towards our first home would mean a great deal to us.',
  options: [
    {
      label: 'Cash envelope',
      value: 'On the day',
      detail: 'There will be a card box at the reception entrance, or hand it to either family.',
    },
  ],
  note: 'Please do not feel obliged. We would rather have you there on time than have anything at all.',
};

export const faq = {
  chapter: 'VII',
  title: 'Questions',
  intro: 'The things guests ask us most, answered in advance.',
  items: [
    {
      q: 'Can I bring a plus-one?',
      a: 'Your invitation names everyone we have saved a seat for. If someone is missing from it, message us and we will do our best.',
    },
    {
      q: 'What time should I arrive?',
      a: 'Doors open at 09:30 and the service begins at 10:00. Please be seated by 09:50 so the processional can start on time.',
    },
    {
      q: 'Are children welcome?',
      a: 'Yes — family is family. There is space at the back of the church if anyone needs to step out with a little one.',
    },
    {
      q: 'Is there parking?',
      a: 'Yes, inside the church compound. Come by 09:15; the gate gets busy once the bridal party arrives.',
    },
    {
      q: 'What should I wear?',
      a: 'Anything in blush, dusty rose, mauve, plum or sage. Smart and comfortable is the aim — the reception involves dancing.',
    },
    {
      q: 'Will the ceremony be photographed?',
      a: 'We have photographers covered, so keep your phone down for the vows. There will be plenty of time for your own pictures afterwards.',
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
