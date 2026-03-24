// DOGDLE — Main Application
import { BREEDS, BREED_BY_ID, BREED_BY_NAME } from './breeds.js';
import { computeFeedback } from './feedback.js';

const MAX_GUESSES = 8;

// ─── Date helpers ─────────────────────────────────────────────────────────────

function getLocalDateStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getDayNumber() {
  const epoch = new Date(2025, 0, 1);
  const today = new Date();
  return Math.floor((new Date(today.getFullYear(), today.getMonth(), today.getDate()) - epoch) / 86_400_000);
}

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

// ─── Config ───────────────────────────────────────────────────────────────────

let allEntries   = []; // full daily.json array
let currentEntry = null;
let viewingDate  = '';

async function loadAllEntries() {
  try {
    const res = await fetch(`./daily.json?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return;
    const data = await res.json();
    allEntries = Array.isArray(data) ? data : [data];
  } catch {}
}

// ─── Security helpers ─────────────────────────────────────────────────────────

function safeUrl(url) {
  if (!url) return '#';
  try {
    const u = new URL(url);
    return (u.protocol === 'http:' || u.protocol === 'https:') ? url : '#';
  } catch { return '#'; }
}

// ─── State ────────────────────────────────────────────────────────────────────

function stateKey(date) { return `dogdle-${date}`; }

let target1, target2;
const guessedBreedIds = new Set();
const guessedIds      = new Set();
let currentPhotos   = [];
let currentPhotoIdx = 0;
let state = { guesses: [], status: 'playing', guessedBreedIds: [] };

function loadPersistedState(date) {
  try {
    const raw = localStorage.getItem(stateKey(date));
    if (!raw) return null;
    const { _pid, ...data } = JSON.parse(raw);
    if (_pid !== `daily-${date}`) return null;
    return data;
  } catch { return null; }
}

function saveState() {
  try {
    localStorage.setItem(stateKey(viewingDate), JSON.stringify({
      _pid:            `daily-${viewingDate}`,
      guesses:         state.guesses,
      status:          state.status,
      guessedBreedIds: [...guessedBreedIds],
    }));
  } catch {}
}

// ─── DOM refs ─────────────────────────────────────────────────────────────────

const dogPhoto          = document.getElementById('dog-photo');
const photoPlaceholder  = document.getElementById('photo-placeholder');
const puzzleNumberEl    = document.getElementById('puzzle-number');
const guessInput        = document.getElementById('guess-input');
const submitBtn         = document.getElementById('submit-btn');
const giveUpBtn         = document.getElementById('give-up-btn');
const suggestionsList   = document.getElementById('suggestions');
const guessRowsEl       = document.getElementById('guess-rows');
const guessesLeftEl     = document.getElementById('guesses-left-count');
const resultModal       = document.getElementById('result-modal');
const modalClose        = document.getElementById('modal-close');
const modalBackdrop     = document.getElementById('modal-backdrop');
const modalWin          = document.getElementById('modal-win');
const modalLose         = document.getElementById('modal-lose');
const winMessage        = document.getElementById('win-message');
const modalLoseBreeds   = document.getElementById('modal-lose-breeds');
const modalPhoto        = document.getElementById('modal-photo');
const modalBreedName    = document.getElementById('modal-breed-name');
const modalBreedDetail  = document.getElementById('modal-breed-details');
const adoptBtn          = document.getElementById('adopt-btn');
const adoptBreedSpan    = document.getElementById('adopt-breed-span');
const shareSection      = document.getElementById('share-section');
const shareBtn          = document.getElementById('share-btn');
const shareToast        = document.getElementById('share-toast');
const nextPuzzleSection = document.getElementById('next-puzzle');
const countdownEl       = document.getElementById('countdown');
const archiveLinkEl     = document.getElementById('modal-archive-link');
const legendToggle      = document.getElementById('legend-toggle');
const legendContent     = document.getElementById('legend-content');
const breedStatusEl     = document.getElementById('breed-status');
const breedSlot1El      = document.getElementById('breed-slot-1');
const breedSlot2El      = document.getElementById('breed-slot-2');
const dailyDogInfoEl    = document.getElementById('daily-dog-info');
const dailyDogNameEl    = document.getElementById('daily-dog-name');
const dailyDogBioEl     = document.getElementById('daily-dog-bio');
const photoCaptionEl    = document.getElementById('photo-caption');
const albumNavEl        = document.getElementById('album-nav');
const albumPrevBtn      = document.getElementById('album-prev');
const albumNextBtn      = document.getElementById('album-next');
const albumCounterEl    = document.getElementById('album-counter');
const archiveBtn        = document.getElementById('archive-btn');
const archiveModal      = document.getElementById('archive-modal');
const archiveClose      = document.getElementById('archive-close');
const archiveBackdrop   = document.getElementById('archive-backdrop');
const archiveListEl     = document.getElementById('archive-list');
const viewingDateBanner = document.getElementById('viewing-date-banner');
const viewingDateLabel  = document.getElementById('viewing-date-label');
const backTodayBtn      = document.getElementById('back-today-btn');

// ─── Album Nav ────────────────────────────────────────────────────────────────

albumPrevBtn?.addEventListener('click', () => showAlbumPhoto(currentPhotoIdx - 1, -1));
albumNextBtn?.addEventListener('click', () => showAlbumPhoto(currentPhotoIdx + 1, 1));

function updateAlbumNav() {
  if (!albumNavEl) return;
  if (currentPhotos.length <= 1) { albumNavEl.classList.add('hidden'); return; }
  albumNavEl.classList.remove('hidden');
  if (albumCounterEl) albumCounterEl.textContent = `${currentPhotoIdx + 1} / ${currentPhotos.length}`;
  if (albumPrevBtn) albumPrevBtn.disabled = currentPhotoIdx === 0;
  if (albumNextBtn) albumNextBtn.disabled = currentPhotoIdx === currentPhotos.length - 1;
}

function showAlbumPhoto(idx, direction = 0) {
  if (idx < 0 || idx >= currentPhotos.length) return;
  currentPhotoIdx = idx;
  dogPhoto.classList.add('hidden');
  dogPhoto.classList.remove('loaded');
  dogPhoto.onload = () => {
    photoPlaceholder.style.display = 'none';
    dogPhoto.classList.remove('hidden');
    dogPhoto.classList.add('loaded');
    updateAlbumNav();
  };
  dogPhoto.onerror = () => {
    // Skip blocked/broken photo — try next in the same direction, or either direction
    const next = idx + (direction || 1);
    const prev = idx - 1;
    if (direction >= 0 && next < currentPhotos.length) showAlbumPhoto(next, 1);
    else if (prev >= 0) showAlbumPhoto(prev, -1);
    else photoPlaceholder.innerHTML = '<div class="paw-spinner">🐶</div><p>No photo available</p>';
  };
  dogPhoto.src = currentPhotos[idx];
}

function showPhoto(startIdx = 0) {
  if (!currentPhotos.length) {
    photoPlaceholder.innerHTML = '<div class="paw-spinner">🐶</div><p>No photo available</p>';
    return;
  }
  showAlbumPhoto(startIdx, 1);
}

// ─── Breed Status ─────────────────────────────────────────────────────────────

function updateBreedStatus() {
  const f1 = guessedBreedIds.has(target1.id);
  const f2 = guessedBreedIds.has(target2.id);
  if (breedSlot1El) { breedSlot1El.textContent = f1 ? `${target1.name} ✓` : '?'; breedSlot1El.classList.toggle('found', f1); }
  if (breedSlot2El) { breedSlot2El.textContent = f2 ? `${target2.name} ✓` : '?'; breedSlot2El.classList.toggle('found', f2); }
}

// ─── Autocomplete ─────────────────────────────────────────────────────────────

let activeIndex = -1;

function getFilteredBreeds(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return BREEDS
    .filter(b => !guessedIds.has(b.id) && b.name.toLowerCase().includes(q))
    .slice(0, 8);
}

function renderSuggestions(query) {
  const matches = getFilteredBreeds(query);
  if (!matches.length) { suggestionsList.classList.add('hidden'); return; }
  suggestionsList.replaceChildren(...matches.map((b, i) => {
    const li = document.createElement('li');
    li.setAttribute('role', 'option');
    li.dataset.id    = b.id;
    li.dataset.index = i;
    li.textContent   = b.name;
    return li;
  }));
  activeIndex = -1;
  suggestionsList.classList.remove('hidden');
}

function hideSuggestions() {
  suggestionsList.classList.add('hidden');
  activeIndex = -1;
}

function selectSuggestion(breedId) {
  const breed = BREED_BY_ID[breedId];
  if (breed) { guessInput.value = breed.name; hideSuggestions(); }
}

guessInput.addEventListener('input', () => renderSuggestions(guessInput.value));

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
    if (activeIndex >= 0 && items[activeIndex]) selectSuggestion(items[activeIndex].dataset.id);
    else submitGuess();
  } else if (e.key === 'Escape') {
    hideSuggestions();
  }
});

suggestionsList.addEventListener('mousedown', (e) => {
  const li = e.target.closest('li');
  if (li) { e.preventDefault(); selectSuggestion(li.dataset.id); }
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

  if (!breed) { showError('Please select a valid breed from the list.'); return; }
  if (guessedIds.has(breed.id)) { showError('You already guessed that breed!'); return; }

  let foundTargetId = null;

  if (breed.id === target1.id && !guessedBreedIds.has(target1.id)) {
    guessedBreedIds.add(target1.id);
    foundTargetId = target1.id;
  } else if (breed.id === target2.id && !guessedBreedIds.has(target2.id)) {
    guessedBreedIds.add(target2.id);
    foundTargetId = target2.id;
  }

  let feedbackTarget;
  if (foundTargetId) {
    feedbackTarget = foundTargetId === target1.id ? target1 : target2;
  } else {
    const remaining = [target1, target2].filter(t => !guessedBreedIds.has(t.id));
    if (remaining.length === 1) {
      feedbackTarget = remaining[0];
    } else {
      const score = t => {
        const fb = computeFeedback(breed, t);
        return fb.filter(x => x.result === 'correct').length * 2
             + fb.filter(x => x.result === 'partial').length;
      };
      feedbackTarget = score(remaining[0]) >= score(remaining[1]) ? remaining[0] : remaining[1];
    }
  }
  const feedback = computeFeedback(breed, feedbackTarget);

  state.guesses.push({ breedId: breed.id, feedback, foundTargetId });
  state.guessedBreedIds = [...guessedBreedIds];
  guessedIds.add(breed.id);

  const bothFound = guessedBreedIds.has(target1.id) && guessedBreedIds.has(target2.id);
  const isLoss    = !bothFound && state.guesses.length >= MAX_GUESSES;
  if (bothFound)   state.status = 'won';
  else if (isLoss) state.status = 'lost';

  saveState();

  const isDone = state.status !== 'playing';
  appendGuessRow(breed, feedback, isDone, () => {
    updateGuessesLeft();
    updateBreedStatus();
    if (isDone) setTimeout(showResultModal, 600);
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

  const breedCell = document.createElement('div');
  breedCell.className = 'breed-cell';
  const icon1 = document.createElement('span'); icon1.className = 'breed-cell-icon'; icon1.textContent = '🐕';
  const name1 = document.createElement('span'); name1.className = 'breed-cell-name'; name1.textContent = breed.name;
  breedCell.append(icon1, name1);
  row.appendChild(breedCell);

  const TILE_DELAY = 120;
  feedback.forEach((tile, i) => row.appendChild(makeTile(tile, true, i * TILE_DELAY)));
  guessRowsEl.prepend(row);

  setTimeout(onDone, feedback.length * TILE_DELAY + 500);
}

function replayGuessRow(breedId, feedback) {
  const breed = BREED_BY_ID[breedId];
  if (!breed) return;

  const row = document.createElement('div');
  row.className = 'guess-row';

  const breedCell = document.createElement('div');
  breedCell.className = 'breed-cell';
  const icon2 = document.createElement('span'); icon2.className = 'breed-cell-icon'; icon2.textContent = '🐕';
  const name2 = document.createElement('span'); name2.className = 'breed-cell-name'; name2.textContent = breed.name;
  breedCell.append(icon2, name2);
  row.appendChild(breedCell);
  feedback.forEach(tile => row.appendChild(makeTile(tile, false, 0)));
  guessRowsEl.prepend(row);
}

// ─── UI State ─────────────────────────────────────────────────────────────────

function updateGuessesLeft() {
  const remaining = MAX_GUESSES - state.guesses.length;
  guessesLeftEl.textContent = Math.max(0, remaining);
  if (state.status !== 'playing') {
    guessInput.disabled = true;
    submitBtn.disabled  = true;
    giveUpBtn.disabled  = true;
  }
}

function showError(msg) {
  document.querySelector('.error-banner')?.remove();
  const el = document.createElement('div');
  el.className = 'error-banner';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

// ─── Result Modal ─────────────────────────────────────────────────────────────

function showResultModal() {
  const won      = state.status === 'won';
  const isToday  = viewingDate === getLocalDateStr();

  modalWin.classList.toggle('hidden', !won);
  modalLose.classList.toggle('hidden', won);

  if (won) {
    const count = state.guesses.length;
    winMessage.textContent = `Found both breeds in ${count} ${count === 1 ? 'guess' : 'guesses'}!`;
  } else {
    const f1 = guessedBreedIds.has(target1.id);
    const f2 = guessedBreedIds.has(target2.id);
    modalLoseBreeds.textContent = f1
      ? `You found ${target1.name} but not ${target2.name}.`
      : f2
        ? `You found ${target2.name} but not ${target1.name}.`
        : `The breeds were ${target1.name} and ${target2.name}.`;
  }

  modalBreedName.textContent   = `${target1.name} + ${target2.name}`;
  modalBreedDetail.textContent = currentEntry.dogName ? `Meet ${currentEntry.dogName}!` : '';
  if (currentPhotos[0]) { modalPhoto.src = currentPhotos[0]; modalPhoto.alt = currentEntry.dogName ?? ''; }

  adoptBtn.href = safeUrl(currentEntry.adoptionUrl);
  adoptBreedSpan.textContent = `Adopt ${currentEntry.dogName || 'this dog'} here`;

  const orgFallback = document.getElementById('adopt-org-fallback');
  const orgLink     = document.getElementById('adopt-org-link');
  if (orgFallback && orgLink) {
    if (currentEntry.orgName && currentEntry.orgUrl) {
      orgLink.href        = safeUrl(currentEntry.orgUrl);
      orgLink.textContent = currentEntry.orgName;
      orgFallback.classList.remove('hidden');
    } else {
      orgFallback.classList.add('hidden');
    }
  }

  shareSection.classList.remove('hidden');
  nextPuzzleSection.classList.toggle('hidden', !isToday);
  if (archiveLinkEl) archiveLinkEl.classList.toggle('hidden', isToday);
  if (isToday) startCountdown();

  resultModal.setAttribute('aria-hidden', 'false');
}

function hideResultModal() {
  resultModal.setAttribute('aria-hidden', 'true');
}

modalClose.addEventListener('click', hideResultModal);
modalBackdrop.addEventListener('click', hideResultModal);

giveUpBtn.addEventListener('click', () => {
  if (state.status !== 'playing') return;
  state.status = 'lost';
  saveState();
  updateGuessesLeft();
  showResultModal();
});

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
  const won  = state.status === 'won';
  const pNum = currentEntry?.puzzleNumber ?? getDayNumber();
  const icon = won ? '🟢' : '🔴';
  const guessInfo = won ? ` in ${state.guesses.length}` : '';
  const text = `DOGDLE #${pNum}\n${icon} ${won ? 'Won' : 'Lost'}${guessInfo}\ndogdle.org`;
  try {
    await navigator.clipboard.writeText(text);
    shareToast.classList.remove('hidden');
    setTimeout(() => shareToast.classList.add('hidden'), 2500);
  } catch {
    window.prompt('Copy your results:', text);
  }
});

// ─── Archive ──────────────────────────────────────────────────────────────────

function openArchive() {
  const today = getLocalDateStr();
  const past  = allEntries
    .filter(e => e.date <= today)
    .sort((a, b) => b.date.localeCompare(a.date));

  archiveListEl.replaceChildren(...past.map(entry => {
    const saved     = loadPersistedState(entry.date);
    const played    = saved && saved.status !== 'playing';
    const won       = played && saved.status === 'won';
    const isToday   = entry.date === today;
    const isViewing = entry.date === viewingDate;

    const div = document.createElement('div');
    div.className  = ['archive-entry', isToday ? 'archive-today' : '', isViewing ? 'archive-active' : ''].filter(Boolean).join(' ');
    div.dataset.date = entry.date;

    const left   = document.createElement('div');  left.className = 'archive-entry-left';
    const result = document.createElement('span'); result.className = 'archive-result'; result.textContent = played ? (won ? '🟢' : '🔴') : '⬜';
    const info   = document.createElement('div');
    const dateEl = document.createElement('div');  dateEl.className = 'archive-date'; dateEl.textContent = formatDate(entry.date) + (isToday ? ' - Today' : '');
    const numEl  = document.createElement('div');  numEl.className  = 'archive-num';  numEl.textContent  = `Puzzle #${entry.puzzleNumber}`;
    info.append(dateEl, numEl);
    left.append(result, info);

    const play = document.createElement('span'); play.className = 'archive-play'; play.textContent = isViewing ? 'Playing' : 'Play \u2192';
    div.append(left, play);
    return div;
  }));

  archiveListEl.querySelectorAll('.archive-entry').forEach(el => {
    el.addEventListener('click', () => {
      const date = el.dataset.date;
      closeArchive();
      loadDay(date);
    });
  });

  archiveModal.setAttribute('aria-hidden', 'false');
}

function closeArchive() {
  archiveModal.setAttribute('aria-hidden', 'true');
}

archiveBtn?.addEventListener('click', openArchive);
archiveClose?.addEventListener('click', closeArchive);
archiveBackdrop?.addEventListener('click', closeArchive);
archiveLinkEl?.addEventListener('click', () => { hideResultModal(); openArchive(); });

// ─── Load Day ─────────────────────────────────────────────────────────────────

function loadDay(date) {
  const entry = allEntries.find(e => e.date === date);
  if (!entry) return;

  const today   = getLocalDateStr();
  const isToday = date === today;

  viewingDate  = date;
  currentEntry = entry;

  // Show / hide archive date banner
  if (viewingDateBanner) {
    viewingDateBanner.classList.toggle('hidden', isToday);
    if (viewingDateLabel) viewingDateLabel.textContent = formatDate(date);
  }
  if (backTodayBtn) {
    backTodayBtn.classList.toggle('hidden', isToday);
  }

  target1 = BREED_BY_ID[entry.breed1];
  target2 = BREED_BY_ID[entry.breed2];

  const saved = loadPersistedState(date);
  state = (saved && Array.isArray(saved.guesses))
    ? { guesses: saved.guesses, status: saved.status, guessedBreedIds: saved.guessedBreedIds }
    : { guesses: [], status: 'playing', guessedBreedIds: [] };

  guessedBreedIds.clear();
  guessedIds.clear();
  (state.guessedBreedIds || []).forEach(id => guessedBreedIds.add(id));
  state.guesses.forEach(g => guessedIds.add(g.breedId));

  // Reset UI
  guessRowsEl.innerHTML = '';
  guessInput.disabled   = false;
  guessInput.value      = '';
  submitBtn.disabled    = false;
  giveUpBtn.disabled    = false;

  puzzleNumberEl.textContent = entry.puzzleNumber ?? getDayNumber();

  // Dog info
  if (dailyDogNameEl) dailyDogNameEl.textContent = `Meet ${entry.dogName}!`;
  if (dailyDogBioEl)  dailyDogBioEl.textContent  = entry.bio ?? '';
  dailyDogInfoEl?.classList.toggle('hidden', !entry.dogName);
  photoCaptionEl?.classList.toggle('hidden', !!entry.dogName);

  breedStatusEl?.classList.remove('hidden');
  updateBreedStatus();

  // Photos
  currentPhotos   = entry.photos || [];
  currentPhotoIdx = 0;
  photoPlaceholder.style.display = '';
  dogPhoto.classList.add('hidden');
  dogPhoto.classList.remove('loaded');
  showPhoto(0);
  updateAlbumNav();

  // Replay saved guesses
  state.guesses.forEach(g => replayGuessRow(g.breedId, g.feedback));
  updateGuessesLeft();

  if (state.status !== 'playing') {
    setTimeout(showResultModal, 800);
  }
}

// ─── Legend ───────────────────────────────────────────────────────────────────

legendToggle?.addEventListener('click', () => {
  const open = !legendContent.classList.contains('hidden');
  legendContent.classList.toggle('hidden', open);
  legendToggle.textContent = open ? 'Color guide ▼' : 'Color guide ▲';
});

// ─── Dev Console ──────────────────────────────────────────────────────────────

(function initDevConsole() {
  if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') return;

  const panel = document.createElement('div');
  panel.id = 'dev-console';
  panel.innerHTML = `
    <div class="dev-header">
      <span>🛠 Dev Console</span>
      <button id="dev-close">✕</button>
    </div>
    <div class="dev-body">
      <div class="dev-row dev-actions">
        <button id="dev-reset-btn">Reset Today's State</button>
      </div>
      <p class="dev-hint">Clears localStorage for today and reloads.</p>
    </div>
  `;
  document.body.appendChild(panel);

  panel.querySelector('#dev-reset-btn').addEventListener('click', () => {
    localStorage.removeItem(stateKey(getLocalDateStr()));
    location.reload();
  });

  panel.querySelector('#dev-close').addEventListener('click', () => toggleDevConsole(false));

  let visible = false;
  function toggleDevConsole(show) {
    visible = show ?? !visible;
    panel.classList.toggle('dev-open', visible);
  }

  document.addEventListener('keydown', e => {
    if (e.key === '`' || (e.ctrlKey && e.shiftKey && e.key === 'D')) {
      e.preventDefault();
      toggleDevConsole();
    }
  });
})();

// ─── Back to Today ────────────────────────────────────────────────────────────

if (backTodayBtn) {
  backTodayBtn.addEventListener('click', () => {
    loadDay(getLocalDateStr());
  });
}

// ─── Init ─────────────────────────────────────────────────────────────────────

async function init() {
  await loadAllEntries();

  const today      = getLocalDateStr();
  const todayEntry = allEntries.find(e => e.date === today);

  if (!todayEntry) {
    photoPlaceholder.innerHTML = '<div class="paw-spinner">🐾</div><p>No puzzle today — check back soon!</p>';
    puzzleNumberEl.textContent = '—';
    return;
  }

  loadDay(today);
}

init();

// ─── Midnight Auto-Reload ─────────────────────────────────────────────────────

const _initDate = getLocalDateStr();
setInterval(() => {
  if (getLocalDateStr() !== _initDate) location.reload();
}, 60_000);

// ─── How to Play ──────────────────────────────────────────────────────────────

const htpModal     = document.getElementById('htp-modal');
const htpClose     = document.getElementById('htp-close');
const htpBackdrop  = document.getElementById('htp-backdrop');
const htpStartBtn  = document.getElementById('htp-start-btn');
const howToPlayBtn = document.getElementById('how-to-play-btn');

const HTP_KEY = 'dogdle_seen_htp';

function openHtp()  { htpModal?.setAttribute('aria-hidden', 'false'); }
function closeHtp() { htpModal?.setAttribute('aria-hidden', 'true'); localStorage.setItem(HTP_KEY, '1'); }

htpClose?.addEventListener('click', closeHtp);
htpBackdrop?.addEventListener('click', closeHtp);
htpStartBtn?.addEventListener('click', closeHtp);
howToPlayBtn?.addEventListener('click', openHtp);

if (!localStorage.getItem(HTP_KEY)) {
  setTimeout(openHtp, 600);
}
