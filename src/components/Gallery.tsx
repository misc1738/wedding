import { useState } from 'react';
import AnimatedContent from './bits/AnimatedContent';
import InfiniteSpiral from './bits/InfiniteSpiral';
import SectionHeading from './SectionHeading';
import Lightbox from './Lightbox';
import FloralCorner from './art/FloralCorner';

export type GalleryItem = {
  src?: string;
  alt?: string;
  label: string;
  /** Which built-in artwork to draw when there is no photo. */
  art: number;
  /** Aspect ratio class for the masonry tile. */
  ratio: string;
};

/**
 * Drop photo files into `public/gallery/` and rebuild — they appear here
 * automatically. Anything you have not supplied is filled with drawn artwork
 * so the grid is never full of holes.
 */
const PHOTO_MODULES = import.meta.glob(
  '../../public/gallery/*.{jpg,jpeg,png,webp,avif}',
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>;

const PLACEHOLDERS: GalleryItem[] = [
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

function photoItems(): GalleryItem[] {
  return Object.entries(PHOTO_MODULES)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, src], index) => {
      const name = path.split('/').pop() ?? 'photo';
      const label = name.replace(/\.[a-z0-9]+$/i, '').replace(/[-_]+/g, ' ');
      return {
        src,
        alt: label,
        label,
        art: index % ART.length,
        ratio: index % 3 === 1 ? 'aspect-square' : 'aspect-[4/5]',
      };
    });
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
  const photos = photoItems();
  const items: GalleryItem[] = [...photos, ...PLACEHOLDERS];
  const spiralItems = photos.length
    ? photos.map((photo) => ({
        src: photo.src ?? '/invitation.png',
        alt: photo.alt ?? photo.label,
        label: photo.label,
        id: photo.label,
      }))
    : [
        { src: '/invitation.png', alt: 'Invitation cover', label: 'Invitation', id: 'invitation' },
        { src: '/invitation.png', alt: 'Invitation cover', label: 'Invitation', id: 'invitation-2' },
        { src: '/invitation.png', alt: 'Invitation cover', label: 'Invitation', id: 'invitation-3' },
        { src: '/invitation.png', alt: 'Invitation cover', label: 'Invitation', id: 'invitation-4' },
        { src: '/invitation.png', alt: 'Invitation cover', label: 'Invitation', id: 'invitation-5' },
        { src: '/invitation.png', alt: 'Invitation cover', label: 'Invitation', id: 'invitation-6' },
      ];

  return (
    <section id="gallery" className="section-pad relative bg-cream scroll-mt-20">
      <SectionHeading
        chapter="III"
        eyebrow="Moments"
        title="Gallery"
        intro="A few frames from the build-up. Add your own photos to the gallery folder and they will take their place here."
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
              A cinematic loop of the photos we love most — it smooths beautifully as new images are added.
            </p>
          </div>

          <div className="h-[360px] overflow-hidden rounded-[1.5rem] border border-gold/25 bg-[radial-gradient(circle_at_top,_rgba(247,243,232,0.18),_transparent_38%),linear-gradient(180deg,#48513f_0%,#2e3227_100%)] md:h-[520px]">
            <InfiniteSpiral
              items={spiralItems}
              animationMode="all"
              speed={0.55}
              radius={170}
              cardWidth={120}
              cardHeight={120}
              verticalSpacing={58}
              perspective={1100}
              cardRadius={18}
              centerScale={1.2}
              edgeBlur={6}
              cardsPerTurn={7}
              pauseOnHover
            />
          </div>
        </div>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
          {items.map((item, index) => (
            <AnimatedContent
              key={`${item.label}-${index}`}
              delay={(index % 3) * 90}
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
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                ) : (
                  <ArtTile art={item.art} label={item.label} ratio={item.ratio} />
                )}

                <span
                  className="pointer-events-none absolute inset-0 bg-field-deep/0 transition-colors duration-500 group-hover:bg-field-deep/35"
                  aria-hidden="true"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="font-script text-xl text-cream">
                    {item.label}
                  </span>
                </span>
              </button>
            </AnimatedContent>
          ))}
        </div>

        <p className="mt-8 text-center text-sm italic text-ink/55">
          {photos.length > 0
            ? `${photos.length} photo${photos.length === 1 ? '' : 's'} loaded from the gallery folder.`
            : 'No photos added yet — the drawn artwork stands in until you drop some in.'}
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
