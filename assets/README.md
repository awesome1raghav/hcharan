# Hero background video

There are two ways to set the hero background:

1. **On the page (no code):** Click the **Background** control in the top-right
   of the hero, then click or drag a video in. It's saved in your browser
   (IndexedDB) and reused on reload. "Reset to default" clears it.

2. **As the shipped default (for everyone):** Put your file here as
   `assets/hero-bg.mp4` (and optionally a `.webm`). It's referenced by
   `index.html` and used whenever no custom video has been uploaded on the page.

Tips:
- The video plays **muted, looped, autoplaying** (browsers require muted for autoplay).
- Keep it compressed (H.264/AAC MP4, ~1080p, a few MB) for fast loading.
- `assets/hero-poster.svg` is the gradient shown before the video is ready.
