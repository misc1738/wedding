/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THE PHOTOS.
 *  Everything here points at a file in `public/gallery/`. To swap a picture,
 *  drop the new file in that folder and change the `src` below — nothing else
 *  needs touching. Any photo you add that is NOT listed here still shows up in
 *  the gallery automatically, at the end.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Orientation = 'portrait' | 'square' | 'landscape';

export type Photo = {
  /** Path inside `public/`. */
  src: string;
  /** Short caption, shown on hover and in the lightbox. */
  label: string;
  /** Long description for screen readers. */
  alt: string;
  orientation: Orientation;
};

const G = '/gallery';

export const photos = {
  /** The big one on the feature band under the hero. */
  feature: {
    src: `${G}/garden-portrait.webp`,
    label: 'The two of us',
    alt: 'Mutua and Wahito standing close together beneath the trees',
    orientation: 'portrait',
  } as Photo,

  /** Small square photo tucked into the feature band. */
  featureDetail: {
    src: `${G}/the-laugh.webp`,
    label: 'That laugh',
    alt: 'Wahito laughing, head tipped back, beside Mutua',
    orientation: 'square',
  } as Photo,

  /** One photo per milestone in "Our Story", in the same order. */
  story: [
    {
      src: `${G}/in-our-element.webp`,
      label: 'The introduction',
      alt: 'Mutua and Wahito in matching Ankara outfits against an orange backdrop',
      orientation: 'square',
    },
    {
      src: `${G}/the-dome.webp`,
      label: 'The long drives',
      alt: 'The couple seated inside a lantern-lit rattan dome',
      orientation: 'portrait',
    },
    {
      src: `${G}/she-said-yes.webp`,
      label: 'The question',
      alt: 'Wahito in a pink sequin gown beside Mutua at their engagement shoot',
      orientation: 'portrait',
    },
    {
      src: `${G}/welcome-to-our-beginning.webp`,
      label: 'The beginning',
      alt: 'Mutua and Wahito embracing beneath a welcome sign',
      orientation: 'portrait',
    },
  ] as Photo[],

  /** Gallery order is deliberate — heights alternate so the masonry column breathes. */
  gallery: [
    {
      src: `${G}/garden-portrait.webp`,
      label: 'The two of us',
      alt: 'Mutua and Wahito standing close together beneath the trees',
      orientation: 'portrait',
    },
    {
      src: `${G}/in-our-element.webp`,
      label: 'In our element',
      alt: 'Mutua and Wahito in matching Ankara outfits against an orange backdrop',
      orientation: 'square',
    },
    {
      src: `${G}/she-said-yes.webp`,
      label: 'She said yes',
      alt: 'Wahito in a pink sequin gown beside Mutua at their engagement shoot',
      orientation: 'portrait',
    },
    {
      src: `${G}/the-announcement.webp`,
      label: 'He asked',
      alt: 'Mutua and Wahito laughing together in front of an orange backdrop',
      orientation: 'landscape',
    },
    {
      src: `${G}/hand-in-hand.webp`,
      label: 'Hand in hand',
      alt: 'The couple shoulder to shoulder in matching Ankara outfits',
      orientation: 'square',
    },
    {
      src: `${G}/welcome-to-our-beginning.webp`,
      label: 'Welcome to our beginning',
      alt: 'Mutua and Wahito embracing beneath a welcome sign',
      orientation: 'portrait',
    },
    {
      src: `${G}/the-laugh.webp`,
      label: 'That laugh',
      alt: 'Wahito laughing, head tipped back, beside Mutua',
      orientation: 'square',
    },
    {
      src: `${G}/garden-bouquet.webp`,
      label: 'Somewhere in the garden',
      alt: 'The couple in a flower garden, Wahito holding a bouquet',
      orientation: 'portrait',
    },
    {
      src: `${G}/the-dome.webp`,
      label: 'Dinner, just us',
      alt: 'The couple seated inside a lantern-lit rattan dome',
      orientation: 'portrait',
    },
    {
      src: `${G}/close-up.webp`,
      label: 'Up close',
      alt: 'A close selfie of Mutua and Wahito smiling',
      orientation: 'square',
    },
  ] as Photo[],
};

/** Tailwind aspect class per orientation, used by the masonry tiles. */
export const ratioClass: Record<Orientation, string> = {
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
  landscape: 'aspect-[4/3]',
};
