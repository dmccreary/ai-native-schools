// Level-Specific Safeguard Matcher MicroSim (p5.js)
// CANVAS_HEIGHT: 730
// The learner chooses the lowest level (1 to 5) at which each of eight safeguards should
// first be required. Two attempts per safeguard; only the first attempt counts.
// Mastery is 7 of 8 on the first try. The results screen stacks the safeguards
// required at each level. The safeguards are recommended practice, not legal requirements.
// Nothing moves until the learner acts. To change the content, edit CONFIG.
let drawHeight = 640;
let controlHeight = 90;

const CONFIG = {
  title: 'Level-Specific Safeguard Matcher',
  provenance: 'Recommended practice written for this book, not legal requirements.',
  description: 'Eight safeguards for digital textbooks, one at a time. Choose the lowest of five textbook levels ' +
    'at which each safeguard should first be required, then press Submit.',
  itemNoun: 'Safeguard',
  prompt: 'At what level should this first be required?',
  pickHint: 'Choose a level below, then press Submit. A safeguard keeps applying at every higher level.',
  shuffle: true,
  passMark: 7,
  passMessage: 'You can match safeguards to levels.',
  failMessage: 'Review where each risk first appears and try again.',
  defsDefault: true,
  defsHighlight: it => [0, 1, 2, 3, 4].filter(i => i >= it.answer),
  defsLabel: 'Show level definitions',
  defsTitle: 'The five levels (green: where it applies)',
  defsHint: '',
  options: [
    { label: 'Level 1', def: 'Static. Fixed content; no response to the learner.' },
    { label: 'Level 2', def: 'Interactive. Responds to the learner\'s actions; stores nothing about the learner.' },
    { label: 'Level 3', def: 'Adaptive. Adapts using a stored record of each student\'s goals and progress.' },
    { label: 'Level 4', def: 'Chatbot. Adds conversational tutoring about the material.' },
    { label: 'Level 5', def: 'Autonomous. Generates the textbook content itself for each student in real time.' }
  ],
  // answer is the option index: 0 means Level 1
  items: [
    { text: 'Accessibility check of every page for screen readers and keyboard use', answer: 0, short: 'Accessibility check.', tag: 'Accessibility',
      why: 'Every student must be able to use any textbook, whatever its level.',
      hint: 'Every student must be able to use any textbook. Which level is the first textbook of any kind?' },
    { text: 'Independent accuracy check of the simulations by a subject expert', answer: 1, short: 'Expert accuracy check of simulations.', tag: 'Sim accuracy',
      why: 'Interactive models first appear at Level 2 and can mislead if they are wrong.',
      hint: 'A wrong simulation can mislead. Find the first level whose pages respond to the learner.' },
    { text: 'Review of how student records are stored, who sees them, and when they are deleted', answer: 2, short: 'Records storage and access review.', tag: 'Records review',
      why: 'Level 3 is the first level that keeps records about individual students.',
      hint: 'Find the first level that keeps a record about each student.' },
    { text: 'Parent notice and consent process for collecting student learning data', answer: 2, short: 'Parent notice and consent.', tag: 'Parent consent',
      why: 'Collecting individual learning data begins at Level 3.',
      hint: 'Find the first level that collects learning data about individual students.' },
    { text: 'Bias audit of how the system chooses next steps for different groups of students', answer: 2, short: 'Bias audit of next-step choices.', tag: 'Bias audit',
      why: 'The system first makes individualized choices at Level 3.',
      hint: 'Find the first level where the system chooses next steps for each student from a stored record.' },
    { text: 'Hint-first rules and weekly review of the chat tutor\'s logs', answer: 3, short: 'Hint-first rules and chat log review.', tag: 'Chat log review',
      why: 'Open conversation first appears at Level 4.',
      hint: 'Find the first level where a student can hold an open conversation with the textbook.' },
    { text: 'Age limit and supervision rules for open-ended chat', answer: 3, short: 'Age limit and chat supervision.', tag: 'Chat age rules',
      why: 'Open conversation with minors first appears at Level 4.',
      hint: 'Find the first level where minors can chat openly with the textbook.' },
    { text: 'Human review of AI-generated lessons before students see them', answer: 4, short: 'Human review of AI-generated lessons.', tag: 'Lesson review',
      why: 'Content is first generated without an author\'s prior review at Level 5.',
      hint: 'Find the first level where lesson content is written by the system, not reviewed in advance by an author.' }
  ],
  afterResolve(it) {
    const n = it.answer + 1;
    return n < 5 ? 'This safeguard also applies at every higher level, from Level ' + n + ' to Level 5.'
                 : 'Level 5 is the highest level, so this safeguard applies only there.';
  },
  // Results: a stacked view of the safeguards required at each level
  drawSummary(x, y, w) {
    y += textBlock('Safeguards required at each level (dark = first required there)', x, y, w, 16, { style: BOLD }) + 6;
    const colW = w / 5;
    const blockH = 22;
    const sorted = CONFIG.items.slice().sort((a, b) => a.answer - b.answer);
    const baseY = y + 24 + 8 * (blockH + 3);
    for (let L = 0; L < 5; L++) {
      const cx = x + L * colW;
      noStroke();
      fill('black');
      textAlign(CENTER, TOP);
      textSize(15);
      textStyle(BOLD);
      const req = sorted.filter(it => it.answer <= L);
      text('Level ' + (L + 1) + ' (' + req.length + ')', cx + colW / 2, y);
      textStyle(NORMAL);
      // stack from the bottom up
      req.forEach((it, k) => {
        const by = baseY - (k + 1) * (blockH + 3);
        const isNew = it.answer === L;
        fill(isNew ? 'steelblue' : 'lightsteelblue');
        rect(cx + 3, by, colW - 6, blockH, 4);
        fill(isNew ? 'white' : 'black');
        textSize(colW < 120 ? 11 : 13);
        textAlign(CENTER, CENTER);
        text(it.tag, cx + colW / 2, by + blockH / 2);
      });
    }
    return baseY + 8;
  }
};

// ---------------------------------------------------------------------------
// Shared drawing helpers (text wrapping, panels)
// ---------------------------------------------------------------------------
let canvasWidth = 700;
let margin = 16;

// Width of one space at the current text size (p5 2.x trims spaces in textWidth)
function spaceWidth() { return textWidth('a a') - textWidth('aa'); }

// Split a string into lines that fit width w at the current text size
function wrapLines(str, w) {
  const out = [];
  const paras = String(str).split('\n');
  for (const para of paras) {
    const words = para.split(' ');
    let line = '';
    for (const word of words) {
      const test = line ? line + ' ' + word : word;
      if (textWidth(test) > w && line) {
        out.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    out.push(line);
  }
  return out;
}

// Draw (or only measure, when doDraw is false) a wrapped block of text.
// Returns the height used.
function textBlock(str, x, y, w, size, opts) {
  opts = opts || {};
  textSize(size);
  textStyle(opts.style || NORMAL);
  const lines = wrapLines(str, w);
  const lh = size * 1.3;
  if (opts.draw !== false) {
    noStroke();
    fill(opts.color || 'black');
    textAlign(opts.align || LEFT, TOP);
    const ax = (opts.align === CENTER) ? x + w / 2 : x;
    for (let i = 0; i < lines.length; i++) text(lines[i], ax, y + i * lh);
  }
  textStyle(NORMAL);
  return lines.length * lh;
}

// Draw a lead sentence in bold followed by body text (each wrapped). Returns height.
function leadBody(lead, body, x, y, w, size, color, doDraw) {
  let h = 0;
  if (lead) h += textBlock(lead, x, y, w, size, { style: BOLD, color: color, draw: doDraw });
  if (body) h += (lead ? 4 : 0) + textBlock(body, x, y + h + (lead ? 4 : 0), w, size, { color: color, draw: doDraw });
  return h;
}

// Rounded panel
function panel(x, y, w, h, fillColor, strokeColor) {
  stroke(strokeColor || 'silver');
  strokeWeight(1);
  fill(fillColor || 'white');
  rect(x, y, w, h, 10);
  noStroke();
}

// Standard background: aliceblue drawing area and white control area
function drawBackgrounds() {
  stroke('silver');
  strokeWeight(1);
  fill('aliceblue');
  rect(0, 0, canvasWidth - 1, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth - 1, controlHeight - 1);
  noStroke();
}

// Title and the provenance label under it. Returns the y below them.
function drawTitle(title, sub) {
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(24);
  textStyle(BOLD);
  text(title, canvasWidth / 2, 8);
  textStyle(NORMAL);
  let y = 40;
  if (sub) {
    y += textBlock(sub, margin, y, canvasWidth - 2 * margin, 14, { align: CENTER, color: 'dimgray', style: ITALIC });
  }
  return y + 6;
}

// Give a p5 button a consistent look
function styleButton(b, minW) {
  b.style('font-size', '15px');
  b.style('padding', '5px 10px');
  b.style('border-radius', '6px');
  b.style('border', '1px solid gray');
  b.style('cursor', 'pointer');
  b.style('white-space', 'nowrap');
  if (minW) b.style('min-width', minW + 'px');
  setButtonColor(b, 'whitesmoke', 'black');
}
function setButtonColor(b, bg, fg) {
  b.style('background-color', bg);
  b.style('color', fg);
}
function enableEl(el, on) {
  el.elt.disabled = !on;
  el.style('opacity', on ? '1' : '0.45');
  el.style('cursor', on ? 'pointer' : 'default');
}
function showEl(el, on) {
  if (on) el.show(); else el.hide();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = Math.max(320, container.offsetWidth);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  layoutControls();
  redraw();
}

// Fisher-Yates shuffle (returns a new array)
function shuffled(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------------------------------------------------------------------------
// Classifier engine: one item at a time, choose one option, Submit.
// Two attempts per item; only the first attempt counts toward the score.
// Everything the learner sees comes from the CONFIG block above.
// ---------------------------------------------------------------------------
let canvasHeight = drawHeight + controlHeight;
let order = [];          // shuffled item indexes
let pos = 0;             // position in order
let pick = -1;           // option index the learner has selected
let attempt = 0;         // submitted attempts on this item
let resolved = false;    // item finished (correct, or two attempts used)
let finished = false;    // all items done
let feedback = null;     // {kind, lead, body, extra}
let firstTry = [];       // per item index: true/false after the first attempt
let optionButtons = [];
let submitButton, nextButton, againButton, defsCheckbox;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create every control before positioning any of them
  for (let i = 0; i < CONFIG.options.length; i++) {
    const b = createButton(CONFIG.options[i].button || CONFIG.options[i].label);
    b.parent(document.querySelector('main'));
    styleButton(b);
    b.attribute('aria-label', 'Choose ' + CONFIG.options[i].label);
    b.mousePressed(() => choose(i));
    optionButtons.push(b);
  }
  submitButton = createButton('Submit');
  submitButton.parent(document.querySelector('main'));
  styleButton(submitButton, 80);
  submitButton.mousePressed(submitPick);
  nextButton = createButton('Next');
  nextButton.parent(document.querySelector('main'));
  styleButton(nextButton, 70);
  nextButton.mousePressed(nextItem);
  againButton = createButton('Try again');
  againButton.parent(document.querySelector('main'));
  styleButton(againButton);
  againButton.mousePressed(startQuiz);
  defsCheckbox = createCheckbox(' ' + CONFIG.defsLabel, !!CONFIG.defsDefault);
  defsCheckbox.parent(document.querySelector('main'));
  defsCheckbox.style('font-size', '15px');
  defsCheckbox.changed(() => redraw());

  startQuiz();
  layoutControls();
  describe(CONFIG.description, LABEL);
  noLoop();
}

function startQuiz() {
  const idx = CONFIG.items.map((_, i) => i);
  order = CONFIG.shuffle ? shuffled(idx) : idx;
  pos = 0;
  firstTry = new Array(CONFIG.items.length).fill(null);
  finished = false;
  resetItem();
  layoutControls();
  redraw();
}

function resetItem() {
  pick = -1;
  attempt = 0;
  resolved = false;
  feedback = null;
  refreshButtons();
}

function currentItem() { return CONFIG.items[order[pos]]; }

function choose(i) {
  if (resolved || finished) return;
  pick = i;
  refreshButtons();
  redraw();
}

function optLabel(i) { return CONFIG.options[i].label; }

function submitPick() {
  if (pick < 0 || resolved || finished) return;
  const it = currentItem();
  const ok = pick === it.answer;
  attempt++;
  if (attempt === 1) firstTry[order[pos]] = ok;
  const extra = CONFIG.afterResolve ? CONFIG.afterResolve(it) : '';
  if (ok) {
    resolved = true;
    feedback = { kind: 'ok', lead: 'Correct: ' + optLabel(it.answer) + '.',
                 body: it.why + (attempt > 1 ? ' (A second try does not change your first-try score.)' : ''), extra: extra };
  } else if (attempt === 1) {
    feedback = { kind: 'retry', lead: 'Not quite.',
                 body: (CONFIG.wrongPrefix ? CONFIG.wrongPrefix + ' ' : '') + (it.hint || it.why) + ' Choose again and press Submit.' };
  } else {
    resolved = true;
    feedback = { kind: 'miss', lead: 'The answer is ' + optLabel(it.answer) + '.',
                 body: it.why + ' This one counts as missed.', extra: extra };
  }
  refreshButtons();
  redraw();
}

function nextItem() {
  if (!resolved) return;
  if (pos < order.length - 1) {
    pos++;
    resetItem();
  } else {
    finished = true;
    refreshButtons();
  }
  layoutControls();
  redraw();
}

function score() { return firstTry.filter(v => v === true).length; }

function refreshButtons() {
  const it = finished ? null : currentItem();
  for (let i = 0; i < optionButtons.length; i++) {
    const b = optionButtons[i];
    showEl(b, !finished);
    if (finished) continue;
    if (resolved && i === it.answer) setButtonColor(b, 'forestgreen', 'white');
    else if (i === pick && !resolved) setButtonColor(b, 'royalblue', 'white');
    else if (i === pick && resolved) setButtonColor(b, 'firebrick', 'white');
    else setButtonColor(b, 'whitesmoke', 'black');
    enableEl(b, !resolved);
    if (resolved && (i === it.answer || i === pick)) b.style('opacity', '1');
  }
  showEl(submitButton, !finished);
  showEl(nextButton, !finished);
  showEl(againButton, finished);
  if (!finished) {
    enableEl(submitButton, pick >= 0 && !resolved);
    enableEl(nextButton, resolved);
    nextButton.html(pos === order.length - 1 ? 'See score' : 'Next');
    if (pick >= 0 && !resolved) setButtonColor(submitButton, 'gold', 'black');
    else setButtonColor(submitButton, 'whitesmoke', 'black');
    if (resolved) setButtonColor(nextButton, 'gold', 'black');
    else setButtonColor(nextButton, 'whitesmoke', 'black');
  }
}

// Lay out option buttons left to right, wrapping to a new row when needed,
// then a row with Submit, Next and the definitions checkbox.
function layoutControls() {
  if (!submitButton) return;
  const gap = 8;
  let x = margin, y = drawHeight + 8;
  const rowH = 38;
  for (const b of optionButtons) {
    const w = b.elt.offsetWidth || 120;
    if (x + w > canvasWidth - margin && x > margin) { x = margin; y += rowH; }
    b.position(x, y);
    x += w + gap;
  }
  y = finished ? drawHeight + 8 : y + rowH + 4;
  x = margin;
  if (finished) {
    againButton.position(x, y);
    x += (againButton.elt.offsetWidth || 90) + 16;
  } else {
    submitButton.position(x, y);
    x += (submitButton.elt.offsetWidth || 80) + gap;
    nextButton.position(x, y);
    x += (nextButton.elt.offsetWidth || 70) + 16;
  }
  defsCheckbox.position(x, y + 6);
}

// ---------------------------------------------------------------------------
// Drawing
// ---------------------------------------------------------------------------
function feedbackColors(kind) {
  if (kind === 'ok') return ['honeydew', 'forestgreen', 'darkgreen'];
  if (kind === 'retry') return ['seashell', 'darkorange', 'saddlebrown'];
  return ['mistyrose', 'firebrick', 'darkred'];
}

// Every possible feedback for an item, used to reserve a stable panel height
function feedbackVariants(it) {
  const extra = CONFIG.afterResolve ? CONFIG.afterResolve(it) : '';
  return [
    ['Correct: ' + optLabel(it.answer) + '.', it.why + ' (A second try does not change your first-try score.)', extra],
    ['Not quite.', (CONFIG.wrongPrefix ? CONFIG.wrongPrefix + ' ' : '') + (it.hint || it.why) + ' Choose again and press Submit.', ''],
    ['The answer is ' + optLabel(it.answer) + '.', it.why + ' This one counts as missed.', extra]
  ];
}

function measureFeedback(f, w) {
  let h = leadBody(f[0], f[1], 0, 0, w, 16, 'black', false);
  if (f[2]) h += 6 + textBlock(f[2], 0, 0, w, 15, { draw: false, style: ITALIC });
  return h + 20;
}

function measureCard(it, w) {
  let h = textBlock(it.text, 0, 0, w, 17, { draw: false });
  if (it.extraLine) h += 6 + textBlock(it.extraLine, 0, 0, w, 16, { draw: false, style: BOLD });
  return h + 20;
}

function draw() {
  drawBackgrounds();
  let y = drawTitle(CONFIG.title, CONFIG.provenance);
  const w = canvasWidth - 2 * margin;

  if (finished) { drawResults(y, w); return; }

  // Status line
  textSize(16);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  text(CONFIG.itemNoun + ' ' + (pos + 1) + ' of ' + order.length, margin, y);
  textAlign(RIGHT, TOP);
  textStyle(BOLD);
  text('First-try correct: ' + score() + ' of ' + order.length, canvasWidth - margin, y);
  textStyle(NORMAL);
  y += 26;

  // Prompt
  y += textBlock(CONFIG.prompt, margin, y, w, 18, { style: BOLD, color: 'midnightblue' }) + 6;

  // Optional source passage drawn above the item (custom drawer)
  if (CONFIG.drawAboveCard) y = CONFIG.drawAboveCard(margin, y, w, currentItem(), resolved || attempt > 0) + 8;

  // Item card, reserved at the height of the longest item
  const it = currentItem();
  let cardH = 0;
  for (const other of CONFIG.items) cardH = Math.max(cardH, measureCard(other, w - 24));
  panel(margin, y, w, cardH, 'white', 'steelblue');
  let cy = y + 10;
  cy += textBlock(it.text, margin + 12, cy, w - 24, 17);
  if (it.extraLine) textBlock(it.extraLine, margin + 12, cy + 6, w - 24, 16, { style: BOLD, color: 'midnightblue' });
  y += cardH + 8;

  // Feedback panel, reserved at the largest feedback height
  let fbH = 0;
  for (const other of CONFIG.items) for (const f of feedbackVariants(other)) fbH = Math.max(fbH, measureFeedback(f, w - 24));
  if (feedback) {
    const c = feedbackColors(feedback.kind);
    panel(margin, y, w, fbH, c[0], c[1]);
    let fy = y + 10;
    fy += leadBody(feedback.lead, feedback.body, margin + 12, fy, w - 24, 16, c[2]);
    if (feedback.extra) textBlock(feedback.extra, margin + 12, fy + 6, w - 24, 15, { color: 'black', style: ITALIC });
  } else {
    panel(margin, y, w, fbH, 'ghostwhite', 'gainsboro');
    textBlock(attempt === 0 ? CONFIG.pickHint : '', margin + 12, y + 10, w - 24, 16, { color: 'dimgray' });
  }
  y += fbH + 8;

  // Definitions (exploration)
  window.__neededDrawHeight = Math.max(window.__neededDrawHeight || 0, y + definitionsHeight(w) + 8);
  if (defsCheckbox.checked()) y = drawDefinitions(y, w);
  else if (CONFIG.defsHint) textBlock(CONFIG.defsHint, margin, y, w, 15, { color: 'dimgray', style: ITALIC });
}

// Option definitions plus any extra entries (such as principles) to show with them
function defEntries() { return CONFIG.options.concat(CONFIG.defsExtra || []); }

function definitionsHeight(w) {
  let h = 30;
  for (const o of defEntries()) h += textBlock(o.label + ': ' + o.def, 0, 0, w - 24, 15, { draw: false }) + 4;
  return h + 6;
}

function drawDefinitions(y, w) {
  const h = definitionsHeight(w);
  panel(margin, y, w, h, 'white', 'silver');
  let dy = y + 8;
  textBlock(CONFIG.defsTitle, margin + 12, dy, w - 24, 16, { style: BOLD });
  dy += 24;
  const hiSet = (!finished && resolved && CONFIG.defsHighlight) ? CONFIG.defsHighlight(currentItem()) : [];
  let k = -1;
  for (const o of defEntries()) {
    k++;
    if (hiSet.includes(k)) {
      const eh = textBlock(o.label + ': ' + o.def, 0, 0, w - 24, 15, { draw: false });
      noStroke();
      fill('palegreen');
      rect(margin + 6, dy - 2, w - 12, eh + 4, 4);
    }
    textSize(15);
    textStyle(BOLD);
    const lw = textWidth(o.label + ':') + 7;
    textStyle(NORMAL);
    // Bold term followed by its definition
    const lines = wrapLines(o.label + ': ' + o.def, w - 24);
    noStroke();
    textAlign(LEFT, TOP);
    for (let i = 0; i < lines.length; i++) {
      if (i === 0) {
        fill('midnightblue'); textStyle(BOLD); text(o.label + ':', margin + 12, dy);
        textStyle(NORMAL); fill('black'); text(lines[0].substring(o.label.length + 1).trim(), margin + 12 + lw, dy);
      } else {
        fill('black'); text(lines[i], margin + 12, dy);
      }
      dy += 15 * 1.3;
    }
    dy += 4;
  }
  return y + h + 8;
}

function drawResults(y, w) {
  const n = order.length;
  const s = score();
  const pass = s >= CONFIG.passMark;
  const c = pass ? ['honeydew', 'forestgreen', 'darkgreen'] : ['seashell', 'darkorange', 'saddlebrown'];
  const msg = pass ? CONFIG.passMessage : CONFIG.failMessage;
  const top = y;
  let h = 20 + 30 + textBlock(msg, 0, 0, w - 24, 17, { draw: false });
  panel(margin, y, w, h, c[0], c[1]);
  textBlock('First-try correct: ' + s + ' of ' + n, margin + 12, y + 10, w - 24, 22, { style: BOLD, color: c[2] });
  textBlock(msg, margin + 12, y + 42, w - 24, 17, { color: c[2] });
  y += h + 10;

  // Every item, marked right or missed on the first try, with its answer
  y += textBlock('Your first tries (' + (n - s) + ' missed):', margin, y, w, 16, { style: BOLD }) + 4;
  for (const i of order) {
    const it = CONFIG.items[i];
    const ok = firstTry[i] === true;
    noStroke();
    fill(ok ? 'forestgreen' : 'firebrick');
    textSize(15);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text(ok ? '✓' : '✗', margin + 4, y + 2);
    textStyle(NORMAL);
    const line = (it.short || it.text) + ' Answer: ' + optLabel(it.answer) + '.';
    y += textBlock(line, margin + 24, y + 2, w - 24, 15, { color: ok ? 'black' : 'darkred' }) + 3;
  }
  y += 8;
  if (CONFIG.drawSummary) y = CONFIG.drawSummary(margin, y, w);
  if (defsCheckbox.checked()) drawDefinitions(y, w);
  window.__resultsBottom = y;
}
