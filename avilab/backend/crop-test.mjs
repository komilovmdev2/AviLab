import sharp from "sharp"

const trimmed = await sharp("public/AviLabLogo.png").trim().toBuffer()

// Try cropping just the "A" glyph region.
const left = 0
const top = 10
const width = 105
const height = 150

const cropped = await sharp(trimmed)
  .extract({ left, top, width, height })
  .toBuffer()

await sharp({
  create: { width: width + 60, height: height + 60, channels: 4, background: "#050816" },
})
  .composite([{ input: cropped, left: 30, top: 30 }])
  .png()
  .toFile("backend/crop-preview.png")

console.log("done")
