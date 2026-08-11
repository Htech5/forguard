// One-off: removes the near-white studio background from a product render
// by thresholding pixel luminance into an alpha channel, then exports WebP.
// ponytail: luminance threshold cutout, not real matting — fine for flat
// white-background renders, revisit with a proper matting tool if the
// source photography changes (colored backdrop, shadows, etc).
import sharp from "sharp";

const [, , input, output] = process.argv;
if (!input || !output) {
  console.error("usage: node cutout-drone.mjs <input> <output.webp>");
  process.exit(1);
}

const WHITE_FLOOR = 236; // at/above this min(r,g,b) -> fully transparent
const WHITE_CEIL = 165; // at/below this min(r,g,b) -> fully opaque
const SHADOW_DAMPEN = 0.35; // extra alpha multiplier for soft mid-tone shadow

const img = sharp(input).ensureAlpha();
const { data, info } = await img
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
for (let i = 0; i < width * height; i++) {
  const idx = i * channels;
  const r = data[idx];
  const g = data[idx + 1];
  const b = data[idx + 2];
  const whiteness = Math.min(r, g, b);
  const saturation = Math.max(r, g, b) - Math.min(r, g, b);

  let alpha;
  if (whiteness >= WHITE_FLOOR) alpha = 0;
  else if (whiteness <= WHITE_CEIL) alpha = 255;
  else
    alpha =
      (255 * (WHITE_FLOOR - whiteness)) / (WHITE_FLOOR - WHITE_CEIL);

  // Neutral-gray midtones in this range are almost always the rendered
  // drop shadow rather than drone material (which is either near-black
  // or colored) — fade them further so the shadow reads as a soft
  // contact shadow instead of a hard gray blob.
  if (saturation < 18 && whiteness > 70 && whiteness < 225) {
    alpha *= SHADOW_DAMPEN;
  }

  data[idx + 3] = Math.round(alpha);
}

await sharp(data, { raw: { width, height, channels } })
  .webp({ quality: 92, alphaQuality: 100, lossless: false })
  .toFile(output);

console.log(`wrote ${output}`);
