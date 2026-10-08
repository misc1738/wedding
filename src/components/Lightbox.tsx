import { useEffect, useRef } from 'react';
import type { GalleryItem } from './Gallery';

type Props = {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
};

/** Fullscreen lightbox: Escape closes, arrows navigate, backdrop dismisses. */
export default function Lightbox({ items, index, onClose, onNavigate }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const item = items[index];

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNavigate((index + 1) % items.length);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onNavigate((index - 1 + items.length) % items.length);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      previousFocus?.focus();
    };
  }, [index, items.length, onClose, onNavigate]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-field-deep/97 p-4 backdrop-blur-sm md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.label} — photo ${index + 1} of ${items.length}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="flex items-center justify-between">
        <p className="eyebrow text-gold-light/80">
          {index + 1} / {items.length}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center border border-gold/50 text-gold-light transition-colors hover:bg-gold hover:text-field-deep"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M2 2L14 14M14 2L2 14"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div
        ref={dialogRef}
        tabIndex={-1}
        className="flex min-h-0 flex-1 items-center justify-center py-5 outline-none"
      >
        {item.src ? (
          <img
            src={item.src}
            alt={item.alt ?? item.label}
            className="max-h-full max-w-full object-contain shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]"
          />
        ) : (
          <div className="flex aspect-[4/5] max-h-full w-full max-w-md items-center justify-center border border-gold/40 bg-field">
            <p className="px-8 text-center font-script text-3xl text-gold-light">
              {item.label}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onNavigate((index - 1 + items.length) % items.length)}
          className="btn-gold px-5 py-3"
          aria-label="Previous image"
        >
          ← Prev
        </button>

        <p className="hidden max-w-md text-center font-script text-xl text-cream/85 sm:block">
          {item.label}
        </p>

        <button
          type="button"
          onClick={() => onNavigate((index + 1) % items.length)}
          className="btn-gold px-5 py-3"
          aria-label="Next image"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
