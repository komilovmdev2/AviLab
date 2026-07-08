import sharp from "sharp"

const input = "public/AviLabLogo.png"
const meta = await sharp(input).metadata()
console.log("original size:", meta.width, meta.height)

const trimmed = sharp(input).trim()
const trimmedBuf = await trimmed.toBuffer({ resolveWithObject: true })
console.log("trimmed size:", trimmedBuf.info.width, trimmedBuf.info.height)

// Preview on dark background so we can actually see the white logo
await sharp({
  create: {
    width: trimmedBuf.info.width + 40,
    height: trimmedBuf.info.height + 40,
    channels: 4,
    background: "#050816",
  },
})
  .composite([{ input: trimmedBuf.data, left: 20, top: 20 }])
  .png()
  .toFile("backend/logo-preview-dark.png")

console.log("wrote backend/logo-preview-dark.png")
