// scripts/optimize-images.mjs
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const assetsDir = './src/assets';
const infographicsDir = path.join(assetsDir, 'infographics');
const spritesDir = path.join(assetsDir, 'sprites');

// Background images - resize to 1280x720 and convert to WebP
const bgImages = ['hero.png', 'demon_king.png', 'dragon.png'];

console.log('=== Optimizing Background Images ===');
for (const img of bgImages) {
  const input = path.join(infographicsDir, img);
  const output = path.join(infographicsDir, img.replace('.png', '.webp'));

  if (!fs.existsSync(input)) {
    console.log(`Skipping (not found): ${img}`);
    continue;
  }

  await sharp(input)
    .resize(1280, 720, { fit: 'cover' })
    .webp({ quality: 80 })
    .toFile(output);

  const originalSize = fs.statSync(input).size;
  const optimizedSize = fs.statSync(output).size;
  const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
  console.log(`Optimized: ${img} -> ${img.replace('.png', '.webp')} (${savings}% smaller)`);
}

// Sprite images - resize to 150x150 and convert to WebP
console.log('\n=== Optimizing Sprite Images ===');
const spriteFiles = fs.readdirSync(spritesDir).filter(f => f.endsWith('.png'));

for (const file of spriteFiles) {
  const input = path.join(spritesDir, file);
  const output = path.join(spritesDir, file.replace('.png', '.webp'));

  await sharp(input)
    .resize(150, 150, { fit: 'cover' })
    .webp({ quality: 75 })
    .toFile(output);

  const originalSize = fs.statSync(input).size;
  const optimizedSize = fs.statSync(output).size;
  const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
  console.log(`Optimized: ${file} -> ${file.replace('.png', '.webp')} (${savings}% smaller)`);
}

console.log('\n=== Optimization Complete ===');
