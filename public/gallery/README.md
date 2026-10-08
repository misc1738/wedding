# Gallery — drop photos here

Put your wedding and engagement photos in **this folder** and rebuild.

```
public/gallery/
  engagement-01.jpg
  beach-dusk.png
  the-dog.webp
```

- Accepted extensions: `.jpg` `.jpeg` `.png` `.webp` `.avif`
- Any size works — the grid crops to a tile shape automatically
- Filenames become captions: `beach-dusk.jpg` → “beach dusk”
- Ordering is alphabetical, so prefix with numbers to control placement:
  `01-lead.jpg`, `02-lead.jpg`, …

Then run:

```bash
npm run build     # or just save while `npm run dev` is running
```

Photos appear at the front of the gallery; the drawn artwork fills whatever
slots are left over so the grid is never half empty.

To remove a photo, delete the file — no code changes needed.
