// Batch-converts the source renders (kept outside public/ in assets/renders)
// into slugified WebP files served from public/img/.
import sharp from "sharp";
import { readdirSync, mkdirSync } from "node:fs";
import path from "node:path";

const SRC_DIR = "assets/renders";
const OUT_DIR = "public/img";

mkdirSync(OUT_DIR, { recursive: true });

const slug = (name) =>
  name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/\s+/g, "-");

const files = readdirSync(SRC_DIR).filter((f) => /\.jpe?g$/i.test(f));

for (const file of files) {
  const out = path.join(OUT_DIR, `${slug(file)}.webp`);
  await sharp(path.join(SRC_DIR, file))
    .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(out);
  console.log(`${file} -> ${out}`);
}
