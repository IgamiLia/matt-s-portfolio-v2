/**
 * Optimiza la foto de "Sobre mí" para self-hosting.
 *
 * 1. Guardá la foto original (máxima calidad) como: matt-photo.webp|png|jpg
 *    en la raíz del proyecto.
 * 2. Corré: node scripts/optimize-about-photo.mjs
 *
 * Genera public/about/matt-{416,768}.{avif,webp} listos para el srcset
 * de FooterAbout.astro.
 */
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import sharp from "sharp";

const INPUT = ["public/matt.webp", "matt-photo.webp", "matt-photo.png", "matt-photo.jpg"].find(
  existsSync,
);
if (!INPUT) {
  console.error("No encontré public/matt.webp ni matt-photo.* en el proyecto.");
  process.exit(1);
}

const OUT = "public/about";
const WIDTHS = [416, 768];

await mkdir(OUT, { recursive: true });

for (const width of WIDTHS) {
  const base = sharp(INPUT).resize(width, width, { fit: "cover" });
  await base.clone().avif({ quality: 60, effort: 4 }).toFile(`${OUT}/matt-${width}.avif`);
  await base.clone().webp({ quality: 80, effort: 6 }).toFile(`${OUT}/matt-${width}.webp`);
  console.log(`matt-${width}.avif / .webp generados`);
}

console.log("Listo. FooterAbout.astro ya apunta a estos archivos.");
