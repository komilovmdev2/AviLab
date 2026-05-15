const { readFileSync, readdirSync, writeFileSync } = require('fs');
const { join, extname } = require('path');
const root = join(process.cwd(), 'src');
const files = [];
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(p);
    } else if (['.ts', '.tsx', '.js', '.jsx'].includes(extname(p))) {
      files.push(p);
    }
  }
}
walk(root);
const keys = new Set();
const regex = /\buseTranslations\s*\(\s*['\"]([^'\"]+)['\"]\s*\)|\bt\s*\(\s*['\"]([^'\"]+)['\"]\s*\)|getTranslations\s*\(\s*\{[^}]*namespace\s*:\s*['\"]([^'\"]+)['\"]\s*\}/g;
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  let m;
  while ((m = regex.exec(text))) {
    for (let i = 1; i < m.length; i++) {
      if (m[i]) keys.add(m[i]);
    }
  }
}
const out = [...keys].sort().join('\n');
writeFileSync('i18n-keys.txt', out);
console.log(`wrote ${keys.size} keys to i18n-keys.txt`);
