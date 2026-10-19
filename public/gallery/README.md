# Gallery — the photos

The photos on the site live in **this folder** and are described, in order, in
[`src/config/photos.ts`](../../src/config/photos.ts).

```
public/gallery/
  garden-portrait.webp
  in-our-element.webp
  she-said-yes.webp
  …
```

## Swapping or adding a photo

1. Drop the file in this folder (`.jpg` `.jpeg` `.png` `.webp` `.avif` all work).
2. Add an entry to `photos.gallery` in `src/config/photos.ts` with the path, a
   short caption and alt text.

Anything in this folder that is **not** listed in `photos.ts` is still picked up
and appended to the end of the gallery automatically, so a quick drop-and-rebuild
always works.

- `orientation` controls the tile shape: `portrait` (3:4), `square`, `landscape` (4:3)
- `photos.story` pairs one picture with each milestone in `site.ts`
- `photos.feature` is the large arch-topped portrait under the hero
- `photos.featureDetail` is the small square print tucked into its corner

The same files are used by the spiral and the full-screen lightbox, so a photo
only needs adding once.

## Exporting

Keep photos around 1400 px on the long edge and under ~250 KB each. WebP is
smallest; JPEG is fine. The originals from the shoot live in `assets-src/` and
are ignored by git.
