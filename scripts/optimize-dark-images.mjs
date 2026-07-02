import { mkdir, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = "public/backgrounds/dark";
const FORMATS = [
  { dir: "png", ext: ".png", pipe: (img) => img.png({ compressionLevel: 9, palette: true }) },
  { dir: "webp", ext: ".webp", pipe: (img) => img.webp({ quality: 80, effort: 6 }) },
  { dir: "avif", ext: ".avif", pipe: (img) => img.avif({ quality: 55, effort: 4 }) },
];

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

const files = (await readdir(SRC_DIR)).filter((f) => /\.png$/i.test(f));
if (!files.length) {
  console.error(`No hay PNGs en ${SRC_DIR}`);
  process.exit(1);
}

await Promise.all(FORMATS.map(({ dir }) => mkdir(path.join(SRC_DIR, dir), { recursive: true })));

for (const file of files) {
  const src = path.join(SRC_DIR, file);
  const { size: srcSize } = await stat(src);
  const name = path.parse(file).name;

  for (const { dir, ext, pipe } of FORMATS) {
    const dest = path.join(SRC_DIR, dir, name + ext);
    if (existsSync(dest)) continue;
    await pipe(sharp(src)).toFile(dest);
    const { size } = await stat(dest);
    console.log(`${file} (${kb(srcSize)}) -> ${dir}/${name}${ext} (${kb(size)})`);
  }
}

console.log("Listo.");
