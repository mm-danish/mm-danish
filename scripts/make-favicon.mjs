import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const sizes = [16, 32, 48, 64, 128, 256];
const radius = { 16: 3, 32: 7, 48: 11, 64: 14, 128: 28, 256: 57 };

// 1. Generate apple-touch-icon.png (180x180 — standard iOS size)
const appleSize = 180;
const appleMask = Buffer.from(
    `<svg><rect x="0" y="0" width="${appleSize}" height="${appleSize}" rx="40" ry="40"/></svg>`
);
await sharp(join(root, 'public', 'profile.png'))
    .resize(appleSize, appleSize, { fit: 'cover', position: 'top' })
    .composite([{ input: appleMask, blend: 'dest-in' }])
    .png()
    .toFile(join(root, 'public', 'apple-touch-icon.png'));
console.log('✅ public/apple-touch-icon.png created (180x180)');

// 2. Generate rounded PNG buffers for each ICO size
const pngBuffers = await Promise.all(
    sizes.map(async (size) => {
        const r = radius[size];
        const mask = Buffer.from(
            `<svg><rect x="0" y="0" width="${size}" height="${size}" rx="${r}" ry="${r}"/></svg>`
        );
        const buf = await sharp(join(root, 'public', 'profile.png'))
            .resize(size, size, { fit: 'cover', position: 'top' })
            .composite([{ input: mask, blend: 'dest-in' }])
            .png()
            .toBuffer();
        return buf;
    })
);

// Build .ico binary manually
// ICO format: header + directory entries + image data
function buildIco(pngBufs) {
    const count = pngBufs.length;
    const headerSize = 6;
    const dirEntrySize = 16;
    const dirSize = count * dirEntrySize;
    const dataOffset = headerSize + dirSize;

    const header = Buffer.alloc(headerSize);
    header.writeUInt16LE(0, 0);     // reserved, must be 0
    header.writeUInt16LE(1, 2);     // type: 1 = ICO
    header.writeUInt16LE(count, 4); // number of images

    const dir = Buffer.alloc(dirSize);
    let currentOffset = dataOffset;

    pngBufs.forEach((buf, i) => {
        const size = sizes[i];
        const entry = dir.slice(i * dirEntrySize, (i + 1) * dirEntrySize);
        entry.writeUInt8(size >= 256 ? 0 : size, 0);  // width (0 = 256)
        entry.writeUInt8(size >= 256 ? 0 : size, 1);  // height (0 = 256)
        entry.writeUInt8(0, 2);                         // color count
        entry.writeUInt8(0, 3);                         // reserved
        entry.writeUInt16LE(1, 4);                      // color planes
        entry.writeUInt16LE(32, 6);                     // bits per pixel
        entry.writeUInt32LE(buf.length, 8);             // size of image data
        entry.writeUInt32LE(currentOffset, 12);         // offset of image data
        currentOffset += buf.length;
    });

    return Buffer.concat([header, dir, ...pngBufs]);
}

// 3. Write the .ico file
const ico = buildIco(pngBuffers);
writeFileSync(join(root, 'public', 'favicon.ico'), ico);
console.log(`✅ public/favicon.ico created (${sizes.join(', ')}px)`);
