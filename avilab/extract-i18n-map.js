const { readFileSync, readdirSync, writeFileSync } = require('fs');
const { join, extname } = require('path');
const root = join(process.cwd(), 'src');
const files = [];
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (['.ts', '.tsx', '.js', '.jsx'].includes(extname(p))) files.push(p);
  }
}
walk(root);
const mapping = {};
const namespaceRegex = /const\s+(\w+)\s*=\s*useTranslations\s*\(\s*['\"]([^'\"]+)['\"]\s*\)/g;
const keyRegex = /(\w+)\s*\(\s*(['\"])([^'\"]+)\2\s*\)/g;
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  const namespaces = {};
  let m;
  while ((m = namespaceRegex.exec(text))) {
    namespaces[m[1]] = m[2];
  }
  if (Object.keys(namespaces).length === 0) continue;
  for (const [varName, ns] of Object.entries(namespaces)) {
    const regex = new RegExp(`\\b${varName}\\s*\\(\\s*(['\"])([^'\"]+)\\1\\s*\\)`, 'g');
    let k;
    while ((k = regex.exec(text))) {
      const key = k[2];
      if (!mapping[ns]) mapping[ns] = new Set();
      mapping[ns].add(key);
    }
  }
}
const result = {};
for (const [ns, keys] of Object.entries(mapping)) {
  result[ns] = [...keys].sort();
}
writeFileSync('i18n-map.json', JSON.stringify(result, null, 2));
console.log('wrote i18n-map.json');
