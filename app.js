// DOGDLE — Main Application
import { BREEDS, BREED_BY_ID, BREED_BY_NAME } from './breeds.js';
import { computeFeedback, generateShareText }  from './feedback.js';

const MAX_GUESSES = 6;

// ─── Daily Puzzle ─────────────────────────────────────────────────────────────

function getDayNumber() {
  const epoch = new Date(2025, 0, 1); // Day 0 = Jan 1, 2025
  const now   = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.floor((today - epoch) / 86_400_000);
}

function getDailyBreed() {
  const day = getDayNumber();
  // Only use breeds that have a valid dog.ceo photo path
  const stable = [...BREEDS]
    .filter(b => b.dogCeoPath !== null)
    .sort((a, b) => a.id.localeCompare(b.id));
  return stable[day % stable.length];
}

// ─── Dev Override ─────────────────────────────────────────────────────────────

const OVERRIDE_KEY = 'dogdle-override';

function getOverrideBreed() {
  const id = localStorage.getItem(OVERRIDE_KEY);
  return id ? BREED_BY_ID[id] ?? null : null;
}

// ─── State ────────────────────────────────────────────────────────────────────

const todayKey   = `dogdle-${new Date().toISOString().slice(0, 10)}`;
let   target     = getOverrideBreed() ?? getDailyBreed();
const puzzleNum  = getDayNumber();

let isBonus    = false;
let bonusCount = 0;
const playedBreedIds = new Set([target.id]);

let state = loadState() || {
  guesses: [],      // [{ breedId, feedback }]
  status:  "playing",
  photoUrl: null
};

function loadState() {
  try {
    const raw = localStorage.getItem(todayKey);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveState() {
  if (isBonus) return;
  try { localStorage.setItem(todayKey, JSON.stringify(state)); }
  catch {}
}

// ─── DOM refs ─────────────────────────────────────────────────────────────────

const dogPhoto         = document.getElementById('dog-photo');
const photoPlaceholder = document.getElementById('photo-placeholder');
const puzzleNumberEl   = document.getElementById('puzzle-number');
const guessInput       = document.getElementById('guess-input');
const submitBtn        = document.getElementById('submit-btn');
const suggestionsList  = document.getElementById('suggestions');
const guessRowsEl      = document.getElementById('guess-rows');
const guessesLeftEl    = document.getElementById('guesses-left-count');
const resultModal      = document.getElementById('result-modal');
const modalClose       = document.getElementById('modal-close');
const modalBackdrop    = document.getElementById('modal-backdrop');
const modalWin         = document.getElementById('modal-win');
const modalLose        = document.getElementById('modal-lose');
const winMessage       = document.getElementById('win-message');
const modalPhoto       = document.getElementById('modal-photo');
const modalBreedName   = document.getElementById('modal-breed-name');
const modalBreedDetail = document.getElementById('modal-breed-details');
const adoptBtn         = document.getElementById('adopt-btn');
const adoptBreedSpan   = document.getElementById('adopt-breed-span');
const shareBtn         = document.getElementById('share-btn');
const shareToast       = document.getElementById('share-toast');
const countdownEl      = document.getElementById('countdown');
const legendToggle     = document.getElementById('legend-toggle');
const legendContent    = document.getElementById('legend-content');

// ─── Photo Loading ─────────────────────────────────────────────────────────────

// Resolve the correct dog.ceo path for a breed by checking the live breed list.
// Returns e.g. "germanshepherd" or "retriever/golden" or null if not found.
async function resolveDogCeoPath(hint, breedName) {
  const res  = await fetch('https://dog.ceo/api/breeds/list/all');
  const data = await res.json();
  if (data.status !== 'success') return null;

  const allBreeds = data.message; // { breedKey: [subbreedKey, ...] }

  // 1. Try the hardcoded hint first (exact key or breed/subbreed)
  if (hint) {
    const [main, sub] = hint.split('/');
    if (sub) {
      if (allBreeds[main]?.includes(sub)) return hint;
    } else {
      if (main in allBreeds) return hint;
    }
    console.warn('[DOGDLE] Hardcoded path not in breed list:', hint);
  }

  // 2. Fuzzy-match breed name against the full list
  // Flatten to "breed" and "breed/subbreed" candidates
  const candidates = [];
  for (const [breed, subs] of Object.entries(allBreeds)) {
    candidates.push(breed);
    for (const sub of subs) candidates.push(`${breed}/${sub}`);
  }

  const target = breedName.toLowerCase().replace(/[^a-z]/g, '');
  // Score: how many characters of the breed name appear in the candidate
  const scored = candidates.map(c => {
    const flat = c.replace('/', '').toLowerCase();
    let score = 0;
    if (flat === target) score = 1000;
    else if (target.includes(flat) || flat.includes(target)) score = 100;
    else {
      // count matching chars
      for (const ch of flat) if (target.includes(ch)) score++;
    }
    return { c, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];
  if (best && best.score > 0) {
    console.log('[DOGDLE] Resolved path:', breedName, '→', best.c, '(score', best.score + ')');
    return best.c;
  }

  return null;
}

async function fetchDogPhoto() {
  if (state.photoUrl) return state.photoUrl;

  try {
    const path = await resolveDogCeoPath(target.dogCeoPath, target.name);
    if (!path) { console.error('[DOGDLE] Could not resolve breed path for:', target.name); return null; }

    // Fetch full image list, pick deterministically by puzzle number
    const res  = await fetch(`https://dog.ceo/api/breed/${path}/images`);
    const data = await res.json();
    if (data.status === 'success' && data.message?.length) {
      const idx = isBonus
        ? Math.floor(Math.random() * data.message.length)
        : puzzleNum % data.message.length;
      const url = data.message[idx];
      state.photoUrl = url;
      saveState();
      return url;
    }
    console.error('[DOGDLE] dog.ceo images failed:', data);
  } catch (e) {
    console.error('[DOGDLE] fetchDogPhoto error:', e.message);
  }

  return null;
}

function showPhoto(url) {
  if (!url) {
    photoPlaceholder.innerHTML = '<div class="paw-spinner">🐶</div><p>No photo available</p>';
    return;
  }
  dogPhoto.onload = () => {
    photoPlaceholder.style.display = 'none';
    dogPhoto.classList.remove('hidden');
    dogPhoto.classList.add('loaded');
  };
  dogPhoto.onerror = () => {
    photoPlaceholder.innerHTML = '<div class="paw-spinner">🐶</div><p>Photo unavailable</p>';
  };
  dogPhoto.src = url;
}

// ─── Autocomplete ─────────────────────────────────────────────────────────────

let activeIndex = -1;
const guessedIds = new Set();

function getFilteredBreeds(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return BREEDS
    .filter(b => !guessedIds.has(b.id) && b.name.toLowerCase().includes(q))
    .slice(0, 8);
}

function renderSuggestions(query) {
  const matches = getFilteredBreeds(query);
  if (!matches.length) {
    suggestionsList.classList.add('hidden');
    return;
  }
  suggestionsList.innerHTML = matches.map((b, i) =>
    `<li role="option" data-id="${b.id}" data-index="${i}">${b.name}</li>`
  ).join('');
  activeIndex = -1;
  suggestionsList.classList.remove('hidden');
}

function hideSuggestions() {
  suggestionsList.classList.add('hidden');
  activeIndex = -1;
}

function selectSuggestion(breedId) {
  const breed = BREED_BY_ID[breedId];
  if (breed) {
    guessInput.value = breed.name;
    hideSuggestions();
  }
}

guessInput.addEventListener('input', () => {
  renderSuggestions(guessInput.value);
});

guessInput.addEventListener('keydown', (e) => {
  const items = suggestionsList.querySelectorAll('li');
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    activeIndex = Math.min(activeIndex + 1, items.length - 1);
    items.forEach((li, i) => li.classList.toggle('active', i === activeIndex));
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    activeIndex = Math.max(activeIndex - 1, -1);
    items.forEach((li, i) => li.classList.toggle('active', i === activeIndex));
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (activeIndex >= 0 && items[activeIndex]) {
      selectSuggestion(items[activeIndex].dataset.id);
    } else {
      submitGuess();
    }
  } else if (e.key === 'Escape') {
    hideSuggestions();
  }
});

suggestionsList.addEventListener('mousedown', (e) => {
  const li = e.target.closest('li');
  if (li) {
    e.preventDefault();
    selectSuggestion(li.dataset.id);
  }
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.autocomplete-container')) hideSuggestions();
});

// ─── Guess Submission ─────────────────────────────────────────────────────────

submitBtn.addEventListener('click', submitGuess);

function submitGuess() {
  if (state.status !== 'playing') return;

  const raw   = guessInput.value.trim();
  const breed = BREED_BY_NAME[raw.toLowerCase()];

  if (!breed) {
    showError('Please select a valid breed from the list.');
    return;
  }
  if (guessedIds.has(breed.id)) {
    showError('You already guessed that breed!');
    return;
  }

  const feedback = computeFeedback(breed, target);
  state.guesses.push({ breedId: breed.id, feedback });
  guessedIds.add(breed.id);
  saveState();

  const isWin  = breed.id === target.id;
  const isLoss = !isWin && state.guesses.length >= MAX_GUESSES;

  if (isWin)       state.status = 'won';
  else if (isLoss) state.status = 'lost';
  saveState();

  appendGuessRow(breed, feedback, isWin || isLoss, () => {
    updateGuessesLeft();
    if (state.status !== 'playing') {
      setTimeout(showModal, 600);
    }
  });

  guessInput.value = '';
  hideSuggestions();
}

// ─── Tile Rendering ───────────────────────────────────────────────────────────

const ARROWS = { up: '↑', down: '↓' };

function makeTile(tile, animate, delay) {
  const el = document.createElement('div');
  el.className = 'tile';

  const valEl = document.createElement('span');
  valEl.className = 'tile-value';
  valEl.textContent = tile.value;

  const arrowEl = document.createElement('span');
  arrowEl.className = 'tile-arrow';
  arrowEl.textContent = tile.arrow ? ARROWS[tile.arrow] : '';

  el.appendChild(valEl);
  el.appendChild(arrowEl);

  if (animate) {
    el.classList.add('unrevealed');
    setTimeout(() => {
      el.classList.remove('unrevealed');
      el.classList.add(tile.result, 'flip');
    }, delay);
  } else {
    el.classList.add(tile.result);
  }

  return el;
}

function appendGuessRow(breed, feedback, _isLast, onDone) {
  const row = document.createElement('div');
  row.className = 'guess-row';

  // Breed name cell
  const breedCell = document.createElement('div');
  breedCell.className = 'breed-cell';
  breedCell.innerHTML = `
    <span class="breed-cell-icon">🐕</span>
    <span class="breed-cell-name">${breed.name}</span>
  `;
  row.appendChild(breedCell);

  // Category tiles
  const TILE_DELAY = 120;
  feedback.forEach((tile, i) => {
    row.appendChild(makeTile(tile, true, i * TILE_DELAY));
  });

  guessRowsEl.appendChild(row);

  // Callback after last tile reveal
  const totalDelay = feedback.length * TILE_DELAY + 500;
  setTimeout(onDone, totalDelay);
}

function replayGuessRow(breedId, feedback) {
  const breed = BREED_BY_ID[breedId];
  if (!breed) return;

  const row = document.createElement('div');
  row.className = 'guess-row';

  const breedCell = document.createElement('div');
  breedCell.className = 'breed-cell';
  breedCell.innerHTML = `
    <span class="breed-cell-icon">🐕</span>
    <span class="breed-cell-name">${breed.name}</span>
  `;
  row.appendChild(breedCell);

  // No animation for replayed rows
  feedback.forEach(tile => {
    row.appendChild(makeTile(tile, false, 0));
  });

  guessRowsEl.appendChild(row);
}

// ─── UI State ─────────────────────────────────────────────────────────────────

function updateGuessesLeft() {
  const remaining = MAX_GUESSES - state.guesses.length;
  guessesLeftEl.textContent = Math.max(0, remaining);
  if (state.status !== 'playing') {
    guessInput.disabled   = true;
    submitBtn.disabled    = true;
  }
}

function showError(msg) {
  // Remove existing error if any
  document.querySelector('.error-banner')?.remove();
  const el = document.createElement('div');
  el.className = 'error-banner';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function showModal() {
  const won = state.status === 'won';

  modalWin.classList.toggle('hidden', !won);
  modalLose.classList.toggle('hidden', won);

  if (won) {
    const count = state.guesses.length;
    winMessage.textContent = count === 1
      ? 'First try! Amazing! 🏆'
      : `Got it in ${count} ${count === 1 ? 'guess' : 'guesses'}!`;
  }

  modalBreedName.textContent   = target.name;
  modalBreedDetail.textContent = `${target.origin} · ${target.lifespanLow}–${target.lifespanHigh} yrs`;

  // Use cached photo in modal too
  if (state.photoUrl) {
    modalPhoto.src = state.photoUrl;
    modalPhoto.alt = target.name;
  }

  const petfinderUrl = `https://www.petfinder.com/search/dogs-for-adoption/?breed=${encodeURIComponent(target.petfinderName)}&includeOutOfTown=true`;
  adoptBtn.href           = petfinderUrl;
  adoptBreedSpan.textContent = target.name;

  resultModal.setAttribute('aria-hidden', 'false');
  startCountdown();
}

function hideModal() {
  resultModal.setAttribute('aria-hidden', 'true');
}

modalClose.addEventListener('click', hideModal);
modalBackdrop.addEventListener('click', hideModal);
document.getElementById('keep-playing-btn').addEventListener('click', startBonusRound);

// ─── Countdown ────────────────────────────────────────────────────────────────

function startCountdown() {
  function update() {
    const now      = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const diff     = tomorrow - now;
    const h = String(Math.floor(diff / 3_600_000)).padStart(2, '0');
    const m = String(Math.floor((diff % 3_600_000) / 60_000)).padStart(2, '0');
    const s = String(Math.floor((diff % 60_000) / 1_000)).padStart(2, '0');
    countdownEl.textContent = `${h}:${m}:${s}`;
  }
  update();
  setInterval(update, 1000);
}

// ─── Share ────────────────────────────────────────────────────────────────────

shareBtn.addEventListener('click', async () => {
  const text = generateShareText(state.guesses, puzzleNum, state.status === 'won');
  try {
    await navigator.clipboard.writeText(text);
    shareToast.classList.remove('hidden');
    setTimeout(() => shareToast.classList.add('hidden'), 2500);
  } catch {
    // Fallback: prompt
    window.prompt('Copy your results:', text);
  }
});

// ─── Legend ───────────────────────────────────────────────────────────────────

legendToggle.addEventListener('click', () => {
  const open = !legendContent.classList.contains('hidden');
  legendContent.classList.toggle('hidden', open);
  legendToggle.textContent = open ? 'Color guide ▼' : 'Color guide ▲';
});

// ─── Dev Console ──────────────────────────────────────────────────────────────

(function initDevConsole() {
  if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') return;
  // Build the panel
  const panel = document.createElement('div');
  panel.id = 'dev-console';
  panel.innerHTML = `
    <div class="dev-header">
      <span>🛠 Dev Console</span>
      <button id="dev-close">✕</button>
    </div>
    <div class="dev-body">
      <p class="dev-current">Current breed: <strong id="dev-current-breed">${target.name}</strong></p>
      <label class="dev-label">Set breed:</label>
      <div class="dev-row">
        <div class="dev-ac-wrap">
          <input id="dev-input" type="text" placeholder="Type breed name…" autocomplete="off" />
          <ul id="dev-suggestions" class="dev-suggestions"></ul>
        </div>
        <button id="dev-set-btn">Set &amp; Reload</button>
      </div>
      <div class="dev-row dev-actions">
        <button id="dev-clear-btn">Clear Override</button>
        <button id="dev-reset-btn">Reset Today's State</button>
      </div>
      <p class="dev-hint">Override persists across reloads until cleared.</p>
    </div>
  `;
  document.body.appendChild(panel);

  // ── Autocomplete ──
  const devInput       = panel.querySelector('#dev-input');
  const devSuggestions = panel.querySelector('#dev-suggestions');
  let devActive = -1;

  function renderDevSuggestions(q) {
    const matches = q
      ? BREEDS.filter(b => b.name.toLowerCase().includes(q.toLowerCase())).slice(0, 8)
      : [];
    if (!matches.length) { devSuggestions.innerHTML = ''; return; }
    devSuggestions.innerHTML = matches.map((b, i) =>
      `<li data-id="${b.id}" data-index="${i}">${b.name}</li>`
    ).join('');
    devActive = -1;
  }

  // Track which breed ID is currently selected (set when picking from dropdown)
  let selectedBreedId = null;

  devInput.addEventListener('input', () => {
    selectedBreedId = null; // text changed manually, clear selection
    renderDevSuggestions(devInput.value);
  });

  devInput.addEventListener('keydown', e => {
    const items = devSuggestions.querySelectorAll('li');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      devActive = Math.min(devActive + 1, items.length - 1);
      items.forEach((li, i) => li.classList.toggle('active', i === devActive));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      devActive = Math.max(devActive - 1, -1);
      items.forEach((li, i) => li.classList.toggle('active', i === devActive));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (devActive >= 0 && items[devActive]) {
        // Select and immediately apply
        applyOverride(items[devActive].dataset.id);
      } else {
        applyOverride();
      }
    }
  });

  devSuggestions.addEventListener('mousedown', e => {
    const li = e.target.closest('li');
    if (li) {
      e.preventDefault();
      devInput.value = li.textContent;
      selectedBreedId = li.dataset.id;
      devSuggestions.innerHTML = '';
    }
  });

  // ── Actions ──
  function applyOverride(explicitId) {
    const id = explicitId ?? selectedBreedId;
    const breed = id
      ? BREED_BY_ID[id]
      : BREED_BY_NAME[devInput.value.trim().toLowerCase()];

    if (!breed) { devInput.style.borderColor = '#c0392b'; return; }
    devInput.style.borderColor = '';

    // Clear all dogdle state so no stale photo or guesses carry over
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('dogdle-')) keysToRemove.push(k);
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));

    localStorage.setItem(OVERRIDE_KEY, breed.id);
    location.reload();
  }

  panel.querySelector('#dev-set-btn').addEventListener('click', () => applyOverride());

  panel.querySelector('#dev-clear-btn').addEventListener('click', () => {
    localStorage.removeItem(OVERRIDE_KEY);
    localStorage.removeItem(todayKey);
    location.reload();
  });

  panel.querySelector('#dev-reset-btn').addEventListener('click', () => {
    localStorage.removeItem(todayKey);
    location.reload();
  });

  panel.querySelector('#dev-close').addEventListener('click', () => toggleDevConsole(false));

  // ── Toggle ──
  let visible = false;
  function toggleDevConsole(show) {
    visible = show ?? !visible;
    panel.classList.toggle('dev-open', visible);
    if (visible) devInput.focus();
  }

  // Keyboard shortcut: backtick ` or Ctrl+Shift+D
  document.addEventListener('keydown', e => {
    if (e.key === '`' || (e.ctrlKey && e.shiftKey && e.key === 'D')) {
      e.preventDefault();
      toggleDevConsole();
    }
  });
})();

// ─── Bonus Round ──────────────────────────────────────────────────────────────

function getRandomBreed() {
  const available = BREEDS.filter(b => b.dogCeoPath !== null && !playedBreedIds.has(b.id));
  if (!available.length) return null;
  return available[Math.floor(Math.random() * available.length)];
}

async function startBonusRound() {
  const newBreed = getRandomBreed();
  if (!newBreed) return;

  target = newBreed;
  playedBreedIds.add(target.id);
  isBonus = true;
  bonusCount++;

  state = { guesses: [], status: 'playing', photoUrl: null };
  guessedIds.clear();
  guessRowsEl.innerHTML = '';
  guessInput.disabled  = false;
  guessInput.value     = '';
  submitBtn.disabled   = false;
  updateGuessesLeft();
  hideModal();

  photoPlaceholder.style.display = '';
  dogPhoto.classList.add('hidden');
  dogPhoto.classList.remove('loaded');
  photoPlaceholder.innerHTML = '<div class="paw-spinner">🐾</div><p>Finding a dog...</p>';
  puzzleNumberEl.textContent = `Bonus ${bonusCount}`;

  const photoUrl = await fetchDogPhoto();
  showPhoto(photoUrl);
}

// ─── Init ─────────────────────────────────────────────────────────────────────

async function init() {
  puzzleNumberEl.textContent = 0;

  // Restore guessed ids
  state.guesses.forEach(g => guessedIds.add(g.breedId));

  // Replay existing guesses instantly (no animation)
  state.guesses.forEach(g => replayGuessRow(g.breedId, g.feedback));

  updateGuessesLeft();

  // Load photo
  const photoUrl = await fetchDogPhoto();
  showPhoto(photoUrl);

  // If game already over, show modal after short delay
  if (state.status !== 'playing') {
    setTimeout(showModal, 800);
  }
}

init();
