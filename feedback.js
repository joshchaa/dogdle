// DOGDLE Feedback Logic
// computeFeedback(guess, target) → array of 7 tile objects
// Each tile: { category, value, displayValue, result, arrow }
// result: "correct" | "partial" | "wrong"
// arrow: "up" | "down" | null

// Coat adjacency (no natural order, use neighbor map)
const COAT_NEIGHBORS = {
  Short:  ["Medium", "Wire"],
  Medium: ["Short", "Long", "Curly"],
  Long:   ["Medium", "Curly"],
  Curly:  ["Long", "Medium"],
  Wire:   ["Short"]
};

// Ordinal comparison helper → result + arrow direction
function ordinalCompare(guessOrder, targetOrder) {
  if (guessOrder === targetOrder) return { result: "correct", arrow: null };
  const diff = Math.abs(guessOrder - targetOrder);
  const arrow = guessOrder < targetOrder ? "up" : "down";
  if (diff === 1) return { result: "partial", arrow };
  return { result: "wrong", arrow };
}

// Lifespan range comparison
function lifespanCompare(guess, target) {
  // Check for exact match
  if (guess.lifespanLow === target.lifespanLow && guess.lifespanHigh === target.lifespanHigh) {
    return { result: "correct", arrow: null };
  }
  // Check for range overlap
  const overlapLow  = Math.max(guess.lifespanLow,  target.lifespanLow);
  const overlapHigh = Math.min(guess.lifespanHigh, target.lifespanHigh);
  if (overlapHigh >= overlapLow) {
    return { result: "partial", arrow: null };
  }
  // No overlap — show direction
  const arrow = guess.lifespanHigh < target.lifespanLow ? "up" : "down";
  return { result: "wrong", arrow };
}

export function computeFeedback(guess, target) {
  const sizeComp   = ordinalCompare(guess.sizeOrder,   target.sizeOrder);
  const shedComp   = ordinalCompare(guess.shedOrder,   target.shedOrder);
  const groomComp  = ordinalCompare(guess.groomOrder,  target.groomOrder);
  const activeComp = ordinalCompare(guess.activeOrder, target.activeOrder);

  // Coat (categorical with adjacency)
  let coatResult;
  if (guess.coat === target.coat) {
    coatResult = { result: "correct", arrow: null };
  } else if (COAT_NEIGHBORS[guess.coat]?.includes(target.coat)) {
    coatResult = { result: "partial", arrow: null };
  } else {
    coatResult = { result: "wrong", arrow: null };
  }

  // Origin (categorical with regional partial)
  let originResult;
  if (guess.origin === target.origin) {
    originResult = { result: "correct", arrow: null };
  } else if (guess.originRegion === target.originRegion) {
    originResult = { result: "partial", arrow: null };
  } else {
    originResult = { result: "wrong", arrow: null };
  }

  const lifeComp = lifespanCompare(guess, target);

  return [
    { category: "SIZE",     value: guess.size,                                          ...sizeComp },
    { category: "SHED",     value: guess.shed,                                          ...shedComp },
    { category: "GROOM",    value: guess.groom,                                         ...groomComp },
    { category: "COAT",     value: guess.coat,                                          ...coatResult },
    { category: "ACTIVE",   value: guess.active,                                        ...activeComp },
    { category: "LIFESPAN", value: `${guess.lifespanLow}–${guess.lifespanHigh} yrs`,   ...lifeComp },
    { category: "ORIGIN",   value: guess.origin,                                        ...originResult },
  ];
}

// Emoji encoding for share text
const RESULT_EMOJI = { correct: "🟩", partial: "🟨", wrong: "🟥" };

export function generateShareText(guesses, puzzleNum, won) {
  const header = `DOGDLE #${puzzleNum} ${won ? guesses.length : "X"}/6`;
  const rows = guesses.map(g =>
    g.feedback.map(f => RESULT_EMOJI[f.result]).join("")
  );
  return [header, "", ...rows].join("\n");
}
