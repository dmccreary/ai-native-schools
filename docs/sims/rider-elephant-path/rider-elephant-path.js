// Direct the Rider, Motivate the Elephant, Shape the Path MicroSim (p5.js)
// CANVAS_HEIGHT: 382
// One item at a time: choose a category, press Submit, read the feedback.
// Two attempts per item. Only the first attempt counts toward the score.
// The learning content (items, categories, answers, reasons) is in CONFIG.
// No animation: nothing changes until the learner acts.

// ---------------------------------------------------------------- CONFIG
const CONFIG = {
  "title": "Direct the Rider, Motivate the Elephant, Shape the Path",
  "description": "A classification quiz. The learner sorts nine change tactics by the part of the Switch framework they serve: directing the rider, motivating the elephant, or shaping the path.",
  "itemNoun": "Tactic",
  "binNoun": "part",
  "prompt": "Which part of the change does this tactic serve?",
  "context": "",
  "bins": [
    {
      "label": "Direct the rider",
      "def": "Give the thinking mind clarity about what to do and where it leads"
    },
    {
      "label": "Motivate the elephant",
      "def": "Engage feeling and identity so people want to act"
    },
    {
      "label": "Shape the path",
      "def": "Change the situation so that the right behavior is easier"
    }
  ],
  "items": [
    {
      "text": "Find the classroom where students like yours already thrive with the tool and copy what that teacher does.",
      "answer": "Direct the rider",
      "why": "Following a bright spot gives clear, proven direction.",
      "short": "Copy the classroom where students like yours thrive"
    },
    {
      "text": "Give teachers a one-page script for the first week: what to click and what to say on days one to five.",
      "answer": "Direct the rider",
      "why": "Scripting the critical moves removes ambiguity.",
      "short": "A one-page script for the first week"
    },
    {
      "text": "Show a vivid picture of the exhibition night that the freed afternoons will make possible.",
      "answer": "Direct the rider",
      "why": "Pointing to the destination clarifies where the change leads.",
      "short": "A vivid picture of exhibition night"
    },
    {
      "text": "Share a story of a student's breakthrough so that teachers feel why this matters.",
      "answer": "Motivate the elephant",
      "why": "Finding the feeling engages emotion.",
      "short": "A story of a student's breakthrough"
    },
    {
      "text": "Ask each teacher to try one ten-minute activity this week.",
      "answer": "Motivate the elephant",
      "why": "Shrinking the change makes it feel doable.",
      "short": "Try one ten-minute activity this week"
    },
    {
      "text": "Invite teachers to see themselves as learning coaches, not lecturers.",
      "answer": "Motivate the elephant",
      "why": "Growing people's identity builds motivation.",
      "short": "See yourself as a learning coach"
    },
    {
      "text": "Fix the single sign-on so the login works on the first try.",
      "answer": "Shape the path",
      "why": "Tweaking the environment removes friction.",
      "short": "Fix the single sign-on"
    },
    {
      "text": "Add a standing fifteen-minute dashboard check to the weekly team meeting.",
      "answer": "Shape the path",
      "why": "Building a habit makes the behavior routine.",
      "short": "A standing dashboard check in the weekly meeting"
    },
    {
      "text": "Make visible that most teachers in the neighboring school already use it.",
      "answer": "Shape the path",
      "why": "Rallying the herd makes the behavior the norm.",
      "short": "Show that the neighboring school already uses it"
    }
  ],
  "wrongText": "Not quite. Ask whom the tactic is aimed at: the thinking mind, the feeling mind, or the situation.",
  "passText": "You can tell which part of the change a tactic serves.",
  "failText": "Review the three parts and try again; the tactics will be reshuffled.",
  "mastery": 8,
  "footer": "Framework: Heath and Heath, Switch (2010). The tactics are illustrative, written for this chapter.",
  "binCols": 3,
  "binFontSize": 15,
  "summaryGrouped": true,
  "summaryCols": 3,
  "hasDefinitions": true,
  "definitionsLabel": "Show definitions",
  "layout": {
    "scoreY": 44,
    "contextH": 0,
    "promptY": 70,
    "cardY": 96,
    "cardH": 82,
    "fbY": 186,
    "fbH": 62,
    "binsY": 258,
    "binH": 40,
    "footerY": 308,
    "drawHeight": 332
  },
  "summaryShortFirst": true,
  "definitionsTitle": "Definitions"
};

// ---------------------------------------------------------------- layout
let canvasWidth = 700;
const L = CONFIG.layout;
let drawHeight = L.drawHeight;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 16;

// ---------------------------------------------------------------- state
let order = [];          // shuffled item indices
let pos = 0;             // position in order
let attempts = 0;        // submissions on the current item
let selected = -1;       // selected bin index
let wrongPick = -1;      // bin chosen on a wrong first attempt
let resolved = false;    // current item finished (correct or revealed)
let score = 0;           // first-attempt correct
let results = [];        // per position: 'first' | 'second' | 'missed'
let feedback = '';       // feedback text for the current item
let feedbackKind = '';   // 'correct' | 'wrong' | 'reveal' | ''
let finished = false;

// ---------------------------------------------------------------- controls
let binButtons = [];
let submitButton, nextButton, restartButton, defsCheckbox;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create every control before positioning any of them.
  for (let i = 0; i < CONFIG.bins.length; i++) {
    const b = createButton(CONFIG.bins[i].label);
    b.mousePressed(() => selectBin(i));
    b.style('white-space', 'normal');
    b.style('line-height', '1.2');
    b.style('padding', '2px 6px');
    b.style('border-radius', '6px');
    b.style('cursor', 'pointer');
    binButtons.push(b);
  }
  submitButton = createButton('Submit');
  submitButton.mousePressed(submitAnswer);
  nextButton = createButton('Next');
  nextButton.mousePressed(nextItem);
  restartButton = createButton('Start over');
  restartButton.mousePressed(startRun);
  if (CONFIG.hasDefinitions) {
    defsCheckbox = createCheckbox(' ' + CONFIG.definitionsLabel, false);
    defsCheckbox.style('font-size', '15px');
  }

  startRun();
  positionControls();
  describe(CONFIG.description, LABEL);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = Math.max(320, container.offsetWidth);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

function positionControls() {
  const cols = CONFIG.binCols;
  const gap = 8;
  const w = (canvasWidth - 2 * margin - (cols - 1) * gap) / cols;
  for (let i = 0; i < binButtons.length; i++) {
    const r = Math.floor(i / cols);
    const c = i % cols;
    binButtons[i].position(margin + c * (w + gap), L.binsY + r * (L.binH + gap));
    binButtons[i].size(w, L.binH);
    const fs = canvasWidth < 560 ? CONFIG.binFontSize - 3 : CONFIG.binFontSize;
    binButtons[i].style('font-size', fs + 'px');
  }
  const y = drawHeight + 10;
  submitButton.position(10, y);
  nextButton.position(90, y);
  restartButton.position(155, y);
  if (defsCheckbox) defsCheckbox.position(260, y + 3);
  styleBins();
}

// ---------------------------------------------------------------- run logic
function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startRun() {
  order = shuffleArray(CONFIG.items.map((_, i) => i));
  pos = 0;
  score = 0;
  results = [];
  finished = false;
  loadItem();
}

function loadItem() {
  attempts = 0;
  selected = -1;
  wrongPick = -1;
  resolved = false;
  feedback = '';
  feedbackKind = '';
  updateButtons();
}

function currentItem() {
  return CONFIG.items[order[pos]];
}

function binIndex(label) {
  return CONFIG.bins.findIndex(b => b.label === label);
}

function selectBin(i) {
  if (resolved || finished) return;
  if (i === wrongPick) return;  // already ruled out
  selected = i;
  updateButtons();
}

function submitAnswer() {
  if (resolved || finished || selected < 0) return;
  const item = currentItem();
  const correct = binIndex(item.answer);
  attempts++;
  if (selected === correct) {
    if (attempts === 1) {
      score++;
      results[pos] = 'first';
    } else {
      results[pos] = 'second';
    }
    feedback = 'Correct: ' + withStop(item.answer) + ' ' + item.why;
    feedbackKind = 'correct';
    resolved = true;
  } else if (attempts === 1) {
    wrongPick = selected;
    selected = -1;
    results[pos] = 'missed';
    feedback = CONFIG.wrongText + ' ' + item.why;
    feedbackKind = 'wrong';
  } else {
    wrongPick = selected;
    selected = correct;
    results[pos] = 'missed';
    feedback = 'The answer is ' + withStop(item.answer) + ' ' + item.why + ' This one counts as missed.';
    feedbackKind = 'reveal';
    resolved = true;
  }
  updateButtons();
}

// Add a period unless the label already ends with punctuation.
function withStop(label) {
  return /[.?!]$/.test(label) ? label : label + '.';
}

function nextItem() {
  if (!resolved) return;
  if (pos < order.length - 1) {
    pos++;
    loadItem();
  } else {
    finished = true;
    updateButtons();
  }
}

function setEnabled(el, on) {
  if (on) el.removeAttribute('disabled');
  else el.attribute('disabled', '');
}

function updateButtons() {
  setEnabled(submitButton, !resolved && !finished && selected >= 0);
  setEnabled(nextButton, resolved && !finished);
  nextButton.html(pos === order.length - 1 ? 'Finish' : 'Next');
  for (const b of binButtons) {
    if (finished) b.hide(); else b.show();
  }
  styleBins();
}

function styleBins() {
  if (!binButtons.length || !order.length) return;
  const item = currentItem();
  const correct = binIndex(item.answer);
  for (let i = 0; i < binButtons.length; i++) {
    const b = binButtons[i];
    let bg = 'white', border = '2px solid #4682b4', weight = 'normal', color = '#1a1a1a';
    if (resolved && i === correct) {
      bg = '#d4edda'; border = '3px solid #2e7d32'; weight = 'bold';
    } else if (i === wrongPick) {
      bg = '#fde2cf'; border = '2px solid #c75b12'; color = '#5a2a00';
    } else if (i === selected) {
      bg = '#cfe3f7'; border = '3px solid #1f5f99'; weight = 'bold';
    }
    b.style('background-color', bg);
    b.style('border', border);
    b.style('font-weight', weight);
    b.style('color', color);
    b.style('cursor', resolved ? 'default' : 'pointer');
  }
}

// ---------------------------------------------------------------- drawing
function draw() {
  // drawing area
  stroke('silver');
  strokeWeight(1);
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  // control area
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  noStroke();
  fill('black');
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  fitLineSize(CONFIG.title, canvasWidth - 2 * margin, 22, 14);
  text(CONFIG.title, canvasWidth / 2, 10);
  textStyle(NORMAL);

  // score and progress
  textSize(15);
  textAlign(LEFT, TOP);
  fill('#1a1a1a');
  text('First-try correct: ' + score + ' of ' + CONFIG.items.length, margin, L.scoreY);
  textAlign(RIGHT, TOP);
  const shown = finished ? CONFIG.items.length : pos + 1;
  text(CONFIG.itemNoun + ' ' + shown + ' of ' + CONFIG.items.length, canvasWidth - margin, L.scoreY);

  if (L.contextH > 0) drawContext();

  if (finished) {
    drawSummary();
  } else {
    drawPrompt();
    drawCard();
    drawFeedback();
  }

  if (defsCheckbox && defsCheckbox.checked() && !finished) drawDefinitions();

  // footer note
  noStroke();
  fill('#555');
  textStyle(ITALIC);
  fitLineSize(CONFIG.footer, canvasWidth - 2 * margin, 13, 9);
  textAlign(CENTER, TOP);
  text(CONFIG.footer, canvasWidth / 2, L.footerY);
  textStyle(NORMAL);
}

function drawContext() {
  const x = margin, w = canvasWidth - 2 * margin;
  stroke('#9bb7d4');
  strokeWeight(1);
  fill('#eef5fc');
  rect(x, L.contextY, w, L.contextH, 6);
  noStroke();
  fill('#1a1a1a');
  fitText(CONFIG.context, x + 10, L.contextY + 6, w - 20, L.contextH - 12, 15, 11, LEFT);
}

function drawPrompt() {
  noStroke();
  fill('#1f3f66');
  textStyle(BOLD);
  fitLineSize(CONFIG.prompt, canvasWidth - 2 * margin, 16, 11);
  textAlign(CENTER, TOP);
  text(CONFIG.prompt, canvasWidth / 2, L.promptY);
  textStyle(NORMAL);
}

function drawCard() {
  const x = margin, w = canvasWidth - 2 * margin;
  stroke('#4682b4');
  strokeWeight(2);
  fill('white');
  rect(x, L.cardY, w, L.cardH, 8);
  noStroke();
  const item = currentItem();
  let textH = L.cardH - 16;
  if (item.table) textH = L.cardH - 16 - item.table.length * 24 - 6;
  fill('#1a1a1a');
  fitText(item.text, x + 12, L.cardY + 8, w - 24, textH, 17, 11, item.table ? CENTER : LEFT, true);
  if (item.table) drawTable(item.table, x + 12, L.cardY + L.cardH - 8 - item.table.length * 24, w - 24);
}

function drawTable(rows, x, y, w) {
  const cols = rows[0].length;
  const firstW = w * 0.34;
  const cw = (w - firstW) / (cols - 1);
  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = c === 0 ? x : x + firstW + (c - 1) * cw;
      const cwid = c === 0 ? firstW : cw;
      stroke('#b0c4de');
      strokeWeight(1);
      fill(r === 0 ? '#e3eef9' : 'white');
      rect(cx, y + r * 24, cwid, 24);
      noStroke();
      fill('#1a1a1a');
      textStyle(r === 0 || c === 0 ? BOLD : NORMAL);
      textSize(14);
      textAlign(c === 0 ? LEFT : CENTER, CENTER);
      text(rows[r][c], c === 0 ? cx + 6 : cx + cwid / 2, y + r * 24 + 12);
    }
  }
  textStyle(NORMAL);
}

function drawFeedback() {
  const x = margin, w = canvasWidth - 2 * margin;
  let bg = '#f4f4f4', edge = '#cccccc', ink = '#444';
  let msg = feedback;
  if (feedbackKind === 'correct') { bg = '#e6f4ea'; edge = '#2e7d32'; ink = '#1b4d20'; }
  else if (feedbackKind === 'wrong') { bg = '#fff1e6'; edge = '#c75b12'; ink = '#5a2a00'; }
  else if (feedbackKind === 'reveal') { bg = '#fff8e1'; edge = '#b28704'; ink = '#4a3800'; }
  if (!msg) {
    msg = attempts === 0
      ? 'Choose a ' + CONFIG.binNoun + ' below, then press Submit.'
      : msg;
  }
  if (feedbackKind === 'wrong') msg += '  Choose again and press Submit.';
  stroke(edge);
  strokeWeight(1);
  fill(bg);
  rect(x, L.fbY, w, L.fbH, 6);
  noStroke();
  fill(ink);
  fitText(msg, x + 10, L.fbY + 6, w - 20, L.fbH - 12, 15, 11, LEFT);
}

function drawDefinitions() {
  const x = margin, w = canvasWidth - 2 * margin;
  const y = L.promptY - 4;
  const h = L.binsY - 8 - y;
  stroke('#4682b4');
  strokeWeight(2);
  fill('white');
  rect(x, y, w, h, 8);
  noStroke();
  fill('#1f3f66');
  textStyle(BOLD);
  textSize(15);
  textAlign(LEFT, TOP);
  text(CONFIG.definitionsTitle, x + 12, y + 8);
  textStyle(NORMAL);
  fill('#1a1a1a');
  const lines = CONFIG.bins.map(b => b.label + ': ' + b.def);
  fitParagraphs(lines, x + 12, y + 30, w - 24, h - 38, 15, 10);
}

function drawSummary() {
  const x = margin, w = canvasWidth - 2 * margin;
  const y = L.promptY - 4;
  const h = L.footerY - 8 - y;
  const mastered = score >= CONFIG.mastery;
  stroke(mastered ? '#2e7d32' : '#c75b12');
  strokeWeight(2);
  fill(mastered ? '#e6f4ea' : '#fff1e6');
  rect(x, y, w, h, 8);
  noStroke();
  fill('#1a1a1a');
  textStyle(BOLD);
  textSize(20);
  textAlign(CENTER, TOP);
  text('First-try correct: ' + score + ' of ' + CONFIG.items.length, canvasWidth / 2, y + 10);
  textStyle(NORMAL);
  textSize(16);
  fill(mastered ? '#1b4d20' : '#5a2a00');
  fitText(mastered ? CONFIG.passText : CONFIG.failText, x + 12, y + 38, w - 24, 22, 16, 11, CENTER);

  const idx = order.map((itemIdx, p) => ({ itemIdx, p }));
  const top = y + 66, avail = h - 74;
  if (CONFIG.summaryGrouped) {
    drawGroupedSummary(idx, x + 10, top, w - 20, avail);
    return;
  }
  // one row per item, in the order the learner saw them
  const rows = idx.map(o => {
    const it = CONFIG.items[o.itemIdx];
    const t = CONFIG.summaryShortFirst
      ? it.short + '  \u2192  ' + it.answer
      : it.answer + ':  ' + it.short;
    return { p: o.p, text: t };
  });
  const rowH = Math.min(26, avail / rows.length);
  textSize(Math.min(15, rowH - 6));
  textAlign(LEFT, CENTER);
  for (let i = 0; i < rows.length; i++) {
    const ry = top + i * rowH + rowH / 2;
    drawMark(results[rows[i].p], x + 14, ry);
    fill('#1a1a1a');
    text(truncateToWidth(rows[i].text, w - 44), x + 34, ry);
  }
}

function drawMark(res, mx, my) {
  fill(res === 'first' ? '#2e7d32' : '#c75b12');
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text(res === 'first' ? '\u2713' : '\u2717', mx, my);
  textStyle(NORMAL);
}

// The items grouped under their correct bin, one cell per bin.
function drawGroupedSummary(idx, x, y, w, h) {
  const cols = CONFIG.summaryCols;
  const nb = CONFIG.bins.length;
  const gridRows = Math.ceil(nb / cols);
  const gap = 10;
  const cw = (w - (cols - 1) * gap) / cols;
  const ch = (h - (gridRows - 1) * gap) / gridRows;
  const groups = CONFIG.bins.map(b => idx.filter(o => CONFIG.items[o.itemIdx].answer === b.label));
  // largest text size at which every cell fits
  let size = 14;
  for (; size > 9; size--) {
    textSize(size);
    let ok = true;
    for (const g of groups) {
      let need = size * 1.4 + 4;
      for (const m of g) need += wrapLines(CONFIG.items[m.itemIdx].short, cw - 30).length * size * 1.25 + 4;
      if (need > ch - 6) { ok = false; break; }
    }
    if (ok) break;
  }
  for (let i = 0; i < nb; i++) {
    const cx = x + (i % cols) * (cw + gap);
    const cy = y + Math.floor(i / cols) * (ch + gap);
    stroke('#b0c4de');
    strokeWeight(1);
    fill('white');
    rect(cx, cy, cw, ch, 6);
    noStroke();
    fill('#1f3f66');
    textStyle(BOLD);
    textSize(size);
    textAlign(LEFT, TOP);
    text(CONFIG.bins[i].label, cx + 8, cy + 5);
    textStyle(NORMAL);
    let ly = cy + 5 + size * 1.4 + 2;
    for (const m of groups[i]) {
      const lines = wrapLines(CONFIG.items[m.itemIdx].short, cw - 30);
      drawMark(results[m.p], cx + 8, ly + size * 0.6);
      fill('#1a1a1a');
      textAlign(LEFT, TOP);
      for (const line of lines) { text(line, cx + 24, ly); ly += size * 1.25; }
      ly += 4;
    }
  }
}

// ---------------------------------------------------------------- text helpers
// Shrink the current text size until one line fits in maxW.
function fitLineSize(str, maxW, size, minSize) {
  textSize(size);
  while (size > minSize && textWidth(str) > maxW) { size--; textSize(size); }
  return size;
}

function wrapLines(str, maxW) {
  const words = String(str).split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? line + ' ' + word : word;
    if (textWidth(test) > maxW && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// Draw wrapped text inside a box, shrinking the size until it fits.
function fitText(str, x, y, w, h, maxSize, minSize, align, vcenter) {
  let size = maxSize, lines;
  while (true) {
    textSize(size);
    lines = wrapLines(str, w);
    if (lines.length * size * 1.3 <= h || size <= minSize) break;
    size -= 1;
  }
  textAlign(align, TOP);
  const lh = size * 1.3;
  const ax = align === CENTER ? x + w / 2 : x;
  if (vcenter) y += Math.max(0, (h - lines.length * lh) / 2);
  for (let i = 0; i < lines.length; i++) text(lines[i], ax, y + i * lh);
}

// Several paragraphs, each wrapped, with a small gap between them.
function fitParagraphs(paras, x, y, w, h, maxSize, minSize) {
  let size = maxSize, wrapped;
  while (true) {
    textSize(size);
    wrapped = paras.map(p => wrapLines(p, w));
    const total = wrapped.reduce((s, ls) => s + ls.length * size * 1.25 + 3, 0);
    if (total <= h || size <= minSize) break;
    size -= 1;
  }
  textAlign(LEFT, TOP);
  const lh = size * 1.25;
  let cy = y;
  for (const ls of wrapped) {
    for (const line of ls) { text(line, x, cy); cy += lh; }
    cy += 3;
  }
}

function truncateToWidth(str, maxW) {
  if (textWidth(str) <= maxW) return str;
  let s = str;
  while (s.length > 1 && textWidth(s + '…') > maxW) s = s.slice(0, -1);
  return s + '…';
}
