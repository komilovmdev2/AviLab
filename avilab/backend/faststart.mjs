// Rewrites an MP4 so the `moov` atom comes before `mdat` ("faststart"),
// without re-encoding — patches the absolute chunk offsets (stco/co64)
// inside moov to account for moov's new position in the file.
//
// Usage: node backend/faststart.mjs <input.mp4> <output.mp4>

import { readFileSync, writeFileSync } from "node:fs"

const CONTAINER_TYPES = new Set(["moov", "trak", "mdia", "minf", "stbl", "dinf", "edts", "mvex"])

function parseBoxes(buf, start, end) {
  const boxes = []
  let offset = start
  while (offset < end) {
    let size = buf.readUInt32BE(offset)
    const type = buf.toString("ascii", offset + 4, offset + 8)
    let headerSize = 8
    if (size === 1) {
      size = Number(buf.readBigUInt64BE(offset + 8))
      headerSize = 16
    } else if (size === 0) {
      size = end - offset
    }
    if (size <= 0 || offset + size > end) {
      throw new Error(`Malformed box at offset ${offset}: type=${type} size=${size}`)
    }
    boxes.push({ type, offset, size, headerSize })
    offset += size
  }
  return boxes
}

function patchOffsets(buf, start, end, shift) {
  for (const box of parseBoxes(buf, start, end)) {
    const contentStart = box.offset + box.headerSize
    const contentEnd = box.offset + box.size
    if (box.type === "stco") {
      const entryCount = buf.readUInt32BE(contentStart + 4)
      let p = contentStart + 8
      for (let i = 0; i < entryCount; i++) {
        const val = buf.readUInt32BE(p)
        buf.writeUInt32BE(val + shift, p)
        p += 4
      }
    } else if (box.type === "co64") {
      const entryCount = buf.readUInt32BE(contentStart + 4)
      let p = contentStart + 8
      for (let i = 0; i < entryCount; i++) {
        const val = buf.readBigUInt64BE(p)
        buf.writeBigUInt64BE(val + BigInt(shift), p)
        p += 8
      }
    } else if (CONTAINER_TYPES.has(box.type)) {
      patchOffsets(buf, contentStart, contentEnd, shift)
    }
  }
}

const [, , inputPath, outputPath] = process.argv
const buf = readFileSync(inputPath)
const topBoxes = parseBoxes(buf, 0, buf.length)

const moovBox = topBoxes.find((b) => b.type === "moov")
const mdatBox = topBoxes.find((b) => b.type === "mdat")
if (!moovBox || !mdatBox) {
  throw new Error("Missing moov or mdat box")
}
if (moovBox.offset < mdatBox.offset) {
  console.log("moov already precedes mdat — file is already faststart, copying as-is.")
  writeFileSync(outputPath, buf)
  process.exit(0)
}

const shift = moovBox.size
const moovCopy = Buffer.from(buf.subarray(moovBox.offset, moovBox.offset + moovBox.size))
// Patch offsets within the *copy* (relative positions inside moovCopy match the original moov box).
patchOffsets(moovCopy, 8, moovCopy.length, shift)

// Insert moov immediately before mdat (not just "wherever it used to be") —
// everything else keeps its original relative order.
const before = Buffer.concat(
  topBoxes
    .filter((b) => b.type !== "moov" && b.offset < mdatBox.offset)
    .map((b) => buf.subarray(b.offset, b.offset + b.size))
)
const after = Buffer.concat(
  topBoxes
    .filter((b) => b.type !== "moov" && b.offset >= mdatBox.offset)
    .map((b) => buf.subarray(b.offset, b.offset + b.size))
)

const result = Buffer.concat([before, moovCopy, after])
if (result.length !== buf.length) {
  throw new Error(`Size mismatch after remux: ${result.length} vs original ${buf.length}`)
}

writeFileSync(outputPath, result)
console.log(`Faststart remux complete: ${outputPath} (${result.length} bytes)`)
