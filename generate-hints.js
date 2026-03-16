// generate-hints.js — run once with: node generate-hints.js
// Reads akc-data-latest.csv + breeds.js, outputs hints.json with censored descriptions.

const fs = require('fs');
const path = require('path');

// ── CSV parser (handles quoted fields containing commas/newlines) ──────────────
function parseCSV(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') { field += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      row.push(field); field = '';
    } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      rows.push(row); row = [];
    } else {
      field += ch;
    }
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

// ── Load CSV ──────────────────────────────────────────────────────────────────
const csvText = fs.readFileSync(path.join(__dirname, 'akc-data-latest.csv'), 'utf8');
const rows    = parseCSV(csvText);
const header  = rows[0];
const descIdx = header.indexOf('description');

const akcMap = {};
for (let i = 1; i < rows.length; i++) {
  const name = rows[i][0]?.trim();
  if (!name) continue;
  akcMap[name.toLowerCase()] = rows[i][descIdx] || '';
}

// ── Extract breed id+name pairs from breeds.js ────────────────────────────────
const breedsText = fs.readFileSync(path.join(__dirname, 'breeds.js'), 'utf8');
const breedPairs = [...breedsText.matchAll(/id:\s*['"]([^'"]+)['"]\s*,\s*name:\s*['"]([^'"]+)['"]/g)]
  .map(m => ({ id: m[1], name: m[2] }));

// ── Nickname map (common AKC-text aliases) ────────────────────────────────────
const NICKNAMES = {
  'West Highland White Terrier':     ['Westie', 'Westies'],
  'Yorkshire Terrier':               ['Yorkie', 'Yorkies'],
  'Pembroke Welsh Corgi':            ['Corgi', 'Corgis'],
  'Cardigan Welsh Corgi':            ['Corgi', 'Corgis'],
  'Labrador Retriever':              ['Lab', 'Labs'],
  'Australian Shepherd':             ['Aussie', 'Aussies'],
  'Shetland Sheepdog':               ['Sheltie', 'Shelties'],
  'Golden Retriever':                ['Golden', 'Goldens'],
  'Xoloitzcuintli':                  ['Xolo', 'Mexican Hairless'],
  'Cavalier King Charles Spaniel':   ['Cavalier', 'Cavaliers'],
  'Soft Coated Wheaten Terrier':     ['Wheaten', 'Wheatens'],
  'Chesapeake Bay Retriever':        ['Chessie', 'Chessies'],
};

// ── Censor breed name from text ───────────────────────────────────────────────
function censor(text, breedName) {
  if (!text) return '';
  let result = text;

  const words = breedName.split(/\s+/);
  const terms = [
    breedName,
    ...words.filter(w => w.length >= 4),
    ...(NICKNAMES[breedName] || []),
  ];

  // Longest first so "Labrador Retriever" gets replaced before "Labrador"
  terms.sort((a, b) => b.length - a.length);

  for (const term of terms) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`\\b${escaped}s?\\b`, 'gi');
    const block = '█'.repeat(Math.min(term.length, 14));
    result = result.replace(re, block);
  }
  return result;
}

// ── Extract first 2 sentences (max 320 chars) ─────────────────────────────────
function firstSentences(text, maxChars = 320) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  let out = '';
  for (const s of sentences) {
    out += s;
    if (out.length >= 160) break;
  }
  out = out.trim();
  if (out.length > maxChars) out = out.slice(0, maxChars).replace(/\s+\S*$/, '') + '…';
  return out || text.slice(0, maxChars).trim();
}

// Manual overrides for names that don't fuzzy-match well
const OVERRIDES = {
  'poodle':              'poodle (standard)',
  'brittany spaniel':    'brittany',
  'pit bull':            null,               // not AKC recognized
  'rough collie':        'collie',
  'shar-pei':            'chinese shar-pei',
  'st. bernard':         'saint bernard',
  'belgian groenendael': 'belgian sheepdog',
  'appenzeller mountain dog': 'appenzeller sennenhund',
};

// ── Fuzzy lookup: find best AKC entry for a breed name ───────────────────────
function findAkcEntry(breedName) {
  const key = breedName.toLowerCase();
  if (key in OVERRIDES) {
    return OVERRIDES[key] ? akcMap[OVERRIDES[key]] : null;
  }
  if (akcMap[key]) return akcMap[key];

  // Try partial containment match
  let best = null, bestScore = 0;
  for (const csvKey of Object.keys(akcMap)) {
    if (csvKey.includes(key) || key.includes(csvKey)) {
      const score = Math.min(csvKey.length, key.length) / Math.max(csvKey.length, key.length);
      if (score > bestScore) { bestScore = score; best = csvKey; }
    }
  }
  if (best && bestScore >= 0.55) return akcMap[best];
  return null;
}

// ── Build hints.json ──────────────────────────────────────────────────────────
const hints    = {};
const notFound = [];

for (const { id, name } of breedPairs) {
  const desc = findAkcEntry(name);
  if (desc) {
    hints[id] = censor(firstSentences(desc), name);
  } else {
    notFound.push(name);
  }
}

fs.writeFileSync(path.join(__dirname, 'hints.json'), JSON.stringify(hints, null, 2));
console.log(`✓ Generated hints for ${Object.keys(hints).length} / ${breedPairs.length} breeds`);
if (notFound.length) console.log('✗ Not found in AKC data:', notFound.join(', '));
