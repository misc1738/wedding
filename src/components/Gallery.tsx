import { useState } from 'react';
import AnimatedContent from './bits/AnimatedContent';
import InfiniteSpiral from './bits/InfiniteSpiral';
import SectionHeading from './SectionHeading';
import Lightbox from './Lightbox';
import FloralCorner from './art/FloralCorner';
import { photos, ratioClass, type Photo } from '../config/photos';

export type GalleryItem = {
  src?: string;
  alt?: string;
  label: string;
  /** Which built-in artwork to draw when there is no photo. */
  art?: number;
  /** Aspect ratio class for the masonry tile. */
  ratio: string;
};

/**
 * Photos in `public/gallery/` that are not named in `src/config/photos.ts`
 * are still picked up and added after the curated ones.
 */
const PHOTO_MODULES = import.meta.glob(
  '../../public/gallery/*.{jpg,jpeg,png,webp,avif}',
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>;

const FALLBACK: GalleryItem[] = [
  { label: 'The bouquet', art: 0, ratio: 'aspect-[3/4]' },
  { label: 'Table setting', art: 1, ratio: 'aspect-square' },
  { label: 'Bridal party', art: 2, ratio: 'aspect-[4/5]' },
  { label: 'Place cards', art: 3, ratio: 'aspect-[3/4]' },
  { label: 'Centrepiece', art: 4, ratio: 'aspect-square' },
  { label: 'The florals', art: 5, ratio: 'aspect-[4/5]' },
];

const ART = [
  { from: '#F2D0CD', to: '#C98A90' },
  { from: '#A8748C', to: '#6B2F4A' },
  { from: '#8C9E7E', to: '#6F7A61' },
  { from: '#E7B3AE', to: '#A8748C' },
  { from: '#6B2F4A', to: '#48513F' },
  { from: '#C98A90', to: '#8C9E7E' },
];

function toItem(photo: Photo): GalleryItem {
  return {
    src: photo.src,
    alt: photo.alt,
    label: photo.label,
    ratio: ratioClass[photo.orientation],
  };
}

/** Curated photos first, then anything else dropped in the folder. */
function galleryItems(): GalleryItem[] {
  const curated = photos.gallery.map(toItem);
  const known = new Set(photos.gallery.map((photo) => photo.src));

  const extras = Object.entries(PHOTO_MODULES)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, src]) => ({ path, src }))
    .filter(({ src }) => !known.has(src))
    .map(({ path, src }, index) => {
      const name = path.split('/').pop() ?? 'photo';
      const label = name.replace(/\.[a-z0-9]+$/i, '').replace(/[-_]+/g, ' ');
      return {
        src,
        alt: label,
        label,
        ratio: index % 3 === 1 ? 'aspect-[4/3]' : 'aspect-[3/4]',
      };
    });

  return curated.length ? [...curated, ...extras] : FALLBACK;
}

function ArtTile({ art, label, ratio }: { art: number; label: string; ratio: string }) {
  const palette = ART[art % ART.length];

  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden ${ratio}`}
      style={{
        background: `linear-gradient(145deg, ${palette.from} 0%, ${palette.to} 100%)`,
      }}
    >
      <FloralCorner className="pointer-events-none absolute -left-4 -top-4 h-28 w-28 opacity-60" />
      <FloralCorner
        flip
        className="pointer-events-none absolute -bottom-4 -right-4 h-28 w-28 opacity-60"
      />
      <span className="relative px-6 text-center font-script text-[clamp(1.4rem,4vw,2rem)] leading-tight text-cream drop-shadow-[0_2px_8px_rgba(46,50,39,0.45)]">
        {label}
      </span>
    </div>
  );
}

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = galleryItems();
  const spiralItems = items
    .filter((item) => item.src)
    .map((item, index) => ({
      src: item.src as string,
      alt: item.alt ?? item.label,
      label: item.label,
      id: `${item.label}-${index}`,
    }));

  return (
    <section id="gallery" className="section-pad relative overflow-hidden bg-cream scroll-mt-20">
      <FloralCorner className="pointer-events-none absolute -right-10 top-8 h-48 w-48 opacity-20" />

      <SectionHeading
        chapter="III"
        eyebrow="Moments"
        title="Gallery"
        intro="A handful of frames from before the day itself — the engagement, the celebrations, and the ordinary afternoons we keep coming back to."
      />

      <div className="mx-auto mt-14 max-w-6xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-gold/40 bg-field-deep px-4 py-5 shadow-[0_26px_70px_-30px_rgba(46,50,39,0.7)] md:px-6 md:py-7">
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-gold-light/80">Spiral story</p>
              <h3 className="mt-2 font-script text-[clamp(2rem,4vw,3.25rem)] text-cream">
                Our little world in motion
              </h3>
            </div>
            <p className="max-w-md text-sm italic text-cream/65">
              A cinematic loop of the photos we love most — it smooths beautifully as new images are
              added.
            </p>
          </div>

          <div className="h-[360px] overflow-hidden rounded-[1.5rem] border border-gold/25 bg-[radial-gradient(circle_at_top,_rgba(247,243,232,0.18),_transparent_38%),linear-gradient(180deg,#48513f_0%,#2e3227_100%)] md:h-[520px]">
            <InfiniteSpiral
              items={spiralItems}
              animationMode="all"
              speed={0.55}
              radius={300}
              cardWidth={136}
              cardHeight={136}
              verticalSpacing={68}
              perspective={1200}
              cardRadius={20}
              centerScale={1.18}
              edgeBlur={7}
              cardsPerTurn={8}
              pauseOnHover
            />
          </div>
        </div>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
          {items.map((item, index) => (
            <AnimatedContent
              key={`${item.label}-${index}`}
              delay={(index % 3) * 80}
              threshold={0.05}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="group relative block w-full cursor-zoom-in overflow-hidden text-left"
                aria-label={`Open ${item.label}`}
              >
                {item.src ? (
                  <div className={`${item.ratio} w-full overflow-hidden`}>
                    <img
                      src={item.src}
                      alt={item.alt ?? item.label}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                ) : (
                  <ArtTile art={item.art ?? 0} label={item.label} ratio={item.ratio} />
                )}

                <span
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-field-deep/70 via-field-deep/0 to-field-deep/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="font-script text-xl text-cream">{item.label}</span>
                </span>
              </button>
            </AnimatedContent>
          ))}
        </div>

        <p className="mt-10 text-center text-sm italic text-ink/55">
          Tap any frame to see it full size — arrow keys move through the set.
        </p>
      </div>

      {openIndex !== null ? (
        <Lightbox
          items={items}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={(next) => setOpenIndex(next)}
        />
      ) : null}
    </section>
  );
}
