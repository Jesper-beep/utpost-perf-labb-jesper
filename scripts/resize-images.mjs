// Creates smaller WebP copies of the hero images. The originals are never touched.
//
//   node scripts/resize-images.mjs
//
// hero-1.jpg becomes hero-1-800.webp and hero-1-1200.webp in the same folder.
import { readdir } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const IMAGE_FOLDER = "client/public/bilder"
const SOURCE_PREFIX = "hero-"
const SOURCE_EXTENSION = ".jpg"
const TARGET_WIDTHS = [800, 1200]
const WEBP_QUALITY = 80

const createCopy = async (sourceFileName, width) => {
  const baseName = path.basename(sourceFileName, SOURCE_EXTENSION)
  const outputPath = path.join(IMAGE_FOLDER, `${baseName}-${width}.webp`)
  const info = await sharp(path.join(IMAGE_FOLDER, sourceFileName))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(outputPath)
  console.log(`${outputPath}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} kB`)
}

const fileNames = await readdir(IMAGE_FOLDER)
const sourceFileNames = fileNames.filter(
  (fileName) => fileName.startsWith(SOURCE_PREFIX) && fileName.endsWith(SOURCE_EXTENSION),
)

for (const sourceFileName of sourceFileNames) {
  for (const width of TARGET_WIDTHS) {
    await createCopy(sourceFileName, width)
  }
}
