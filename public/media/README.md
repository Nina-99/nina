# Media

Everything in `public/` is deployed as-is. Keep it to files the app actually references.

## Brand logo

Two colourways of the same mark, with the black background knocked out to alpha.

| File                  | Colour          | Use                            |
| --------------------- | --------------- | ------------------------------ |
| `nina-logo.webp`      | orange / fire   | default colourway              |
| `nina-logo-blue.webp` | violet / plasma | crossfaded with the orange one |

Rendered by `src/components/Logo.tsx`, which crossfades the two colourways, adds a slow
"breathing" scale, a flicker, a sway, a pulsing glow, and an ignite wipe on mount.

**Legibility limit:** below ~160px wide the fiery letterforms turn to mush. Keep the logo for large
brand moments (hero, footer), not the compact navbar.

### Regenerating the transparency

The source JPEGs live in `assets-src/originales/` (not deployed, not committed):

```sh
cd assets-src/originales
magick nina-logo.jpeg -resize 900x \
  \( +clone -separate -evaluate-sequence max -level 8%,100% \) \
  -alpha off -compose copy_opacity -composite /tmp/logo.png
magick /tmp/logo.png -quality 82 ../../public/media/nina-logo.webp
```

The alpha channel is built from the brightest RGB channel: black becomes transparent, the flame glow
gets a smooth falloff. `-level 8%` cleans up JPEG noise.

### Icons

Generated from the leftmost glyph of the wordmark (the "N"), cropped at ~33% width and centred on
the brand background. The full wordmark is 2:1 and unreadable at 16px, so a monogram is used instead.

```sh
cd assets-src/originales
magick nina-logo.jpeg -crop 33%x100%+0+0 +repage -background '#07070b' -flatten \
  -fuzz 6% -trim +repage -resize 430x430 -background '#07070b' -gravity center -extent 512x512 /tmp/icon.png
magick /tmp/icon.png -resize 512x512 ../../public/icon-512.png
magick /tmp/icon.png -resize 192x192 ../../public/icon-192.png
magick /tmp/icon.png -resize 180x180 ../../public/apple-touch-icon.png
magick /tmp/icon.png -define icon:auto-resize=48,32,16 ../../public/favicon.ico
```

`icon-512.png` is generated from the **original** (not `nina-logo.webp`) so the crop stays sharp.

## Hero video

- `hero.mp4` — cinematic background video for the hero (optional).
- `hero-poster.svg` — generated placeholder poster frame.

Keep the hero video short (6-12s), muted-friendly, under ~4 MB.

## Product media

Each product in `src/data/products.ts` accepts optional media fields:

```ts
video: '/media/yotu/video/yotu.web.mp4',   // product page hero
poster: '/media/yotu/video/yotu-poster.jpg',
image: '/media/yotu/img/yotu.png',         // card visual (use visualFit: 'contain' for logos)
mediaAspect: 'portrait',                   // 'landscape' (16:9, default) | 'portrait' (9:16)
```

If neither `video` nor `image` is set, a gradient placeholder is rendered from the product's
`accent` / `accent2` colours.

### Compressing product video

Commit the compressed file, keep the original in `assets-src/`:

```sh
ffmpeg -i original.mp4 -vf scale=720:1280 -c:v libx264 -crf 24 -preset slow \
  -pix_fmt yuv420p -movflags +faststart -an public/media/<product>/video/<product>.web.mp4
```

`-movflags +faststart` puts the index at the front so playback starts before the whole file is
downloaded. A 9 MB clip typically lands around 230 KB with no visible quality loss.
