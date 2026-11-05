// Cost per Student by Level MicroSim (p5.js)
// CANVAS_HEIGHT: 690
// Itemized yearly cost per student for Level 2, Level 3, and Level 4 textbooks, plus the
// district cost. The learner first answers three challenges (two attempts each, first attempt
// scored); then the controls unlock: AI usage, price per million tokens, students served,
// and whether the district buys a device ($300 over four years = $75.00 per student per year).
// Illustrative costs; replace with your own quotes. Nothing moves until the learner acts.
let drawHeight = 530;
let controlHeight = 160;

const PER_PUPIL_SPENDING = 15600;
const DEVICE_SHARE = 75.00;
// Fixed items in dollars per student per year: [Level 2, Level 3, Level 4]
const ITEMS = [
  { name: 'Content and hosting', v: [1.80, 1.80, 1.80] },
  { name: 'Records platform', v: [0.00, 3.00, 3.00] },
  { name: 'Privacy governance', v: [0.00, 2.00, 2.00] },
  { name: 'Guardrail log review', v: [0.00, 0.00, 1.00] },
  { name: 'Teacher training', v: [4.00, 6.00, 8.00] }
];
function dollars(v) { return '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function wholeDollars(v) { return '$' + Math.round(v).toLocaleString('en-US'); }
function inference() { return ctlValue('tokens') * ctlValue('sessions') * ctlValue('days') * ctlValue('price') / 1e6; }
// Per-student totals for the three levels
function levelTotals() {
  const inf = inference();
  const dev = ctlValue('device') ? DEVICE_SHARE : 0;
  return [0, 1, 2].map(L => ITEMS.reduce((s, it) => s + it.v[L], 0) + (L === 2 ? inf : 0) + dev);
}

const CONFIG = {
  title: 'Cost per Student by Level',
  provenance: 'Illustrative costs; replace with your own quotes. $20.00 and $0.07 per million tokens: Stanford AI Index 2025 (Chapter 4); ' +
    '$2.00 and $0.20 are illustrative. The device share is an illustrative assumption.',
  description: 'An itemized table of yearly cost per student for Level 2, 3, and 4 textbooks, with the district total. ' +
    'Three challenges come first; then controls for AI usage, token price, students served, and a purchased device update the costs.',
  answerHint: 'Type a dollar amount, such as 12.34, and press Check. The table shows every item; the totals unlock after the three challenges.',
  passMark: 3,
  passMessage: 'You can total the cost of each level.',
  failMessage: 'Press Redo challenges to try for 3 of 3.',
  challenges: [
    { prompt: 'What does Level 3 cost per student per year?',
      setup: 'Use the Level 3 column of the table. No device is purchased.',
      settings: {}, kind: 'number', answer: 12.80, tol: 0.01, example: '12.34', answerText: '$12.80',
      correctLead: 'Correct: $12.80.', working: '1.80 + 3.00 + 2.00 + 6.00 = 12.80',
      hint: 'Add each item in the table for that level.' },
    { prompt: 'What does Level 4 cost per student per year?',
      setup: 'AI inference: 20,000 tokens per session, 1 session a day, 180 days, at $2.00 per million tokens. No device.',
      settings: { price: 2 }, kind: 'number', answer: 23.00, tol: 0.01, example: '12.34', answerText: '$23.00',
      correctLead: 'Correct: $23.00.', working: 'Inference 3.6 × 2.00 = 7.20; 1.80 + 3.00 + 2.00 + 1.00 + 8.00 + 7.20 = 23.00',
      hint: 'Add each item in the table for that level.' },
    { prompt: 'What does Level 4 cost the district per year for 12,000 students?',
      setup: 'As in challenge 2, but at $0.20 per million tokens. No device. Give the district total in dollars.',
      settings: { price: 0.2 }, kind: 'number', answer: 198240, tol: 1, example: '123456', answerText: '$198,240',
      correctLead: 'Correct: $198,240.', working: 'Inference 3.6 × 0.20 = 0.72; per student 15.80 + 0.72 = 16.52; × 12,000 = 198,240',
      hint: 'Add each item in the table for that level.' }
  ],
  controls: [
    { key: 'tokens', type: 'slider', min: 5000, max: 100000, value: 20000, step: 5000, labelW: 180,
      aria: 'Tokens per session', label: v => 'Tokens/session: ' + v.toLocaleString('en-US') },
    { key: 'sessions', type: 'slider', min: 1, max: 5, value: 1, step: 1, labelW: 140,
      aria: 'Sessions per school day', label: v => 'Sessions/day: ' + v },
    { key: 'days', type: 'slider', min: 150, max: 200, value: 180, step: 10, labelW: 180,
      aria: 'School days per year', label: v => 'School days: ' + v },
    { key: 'price', type: 'select', value: 2, labelW: 140, maxW: 180,
      options: [{ label: '$0.07 (Oct 2024)', value: 0.07 }, { label: '$0.20 (Illustrative)', value: 0.2 },
                { label: '$2.00 (Illustrative)', value: 2 }, { label: '$20.00 (Nov 2022)', value: 20 }],
      aria: 'Price per million tokens', label: () => 'Price/million:' },
    { key: 'students', type: 'slider', min: 100, max: 20000, value: 12000, step: 100, labelW: 180,
      aria: 'Students served', label: v => 'Students: ' + v.toLocaleString('en-US') },
    { key: 'device', type: 'checkbox', value: false, text: 'Device purchased ($75.00/yr)', aria: 'Device purchased' }
  ],
  rows: [['tokens', 'sessions'], ['days', 'price'], ['students', 'device']],

  drawScene(x, y, w, h, locked) {
    const inf = inference();
    const dev = ctlValue('device');
    const totals = levelTotals();
    const students = ctlValue('students');
    const rows = ITEMS.map(it => [it.name, it.v.map(dollars)]);
    rows.push(['AI inference', ['$0.00', '$0.00', locked ? 'computed' : dollars(inf)]]);
    if (dev && !locked) rows.push(['Device share', [dollars(DEVICE_SHARE), dollars(DEVICE_SHARE), dollars(DEVICE_SHARE)]]);
    const rowH = 22;
    const nRows = rows.length + (locked ? 1 : 3);
    const th = (nRows + 1) * rowH + 12;
    panel(x, y, w, th, 'white', 'silver');
    const colX = [x + 12, x + w * 0.56, x + w * 0.78, x + w - 12];
    textSize(15);
    noStroke();
    fill('black');
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text('Per student per year', colX[0], y + 8);
    textAlign(RIGHT, TOP);
    ['Level 2', 'Level 3', 'Level 4'].forEach((t, i) => text(t, colX[i + 1], y + 8));
    textStyle(NORMAL);
    let ry = y + 8 + rowH;
    for (const r of rows) {
      fill('black');
      textAlign(LEFT, TOP);
      text(r[0], colX[0], ry);
      textAlign(RIGHT, TOP);
      r[1].forEach((t, i) => text(t, colX[i + 1], ry));
      ry += rowH;
    }
    stroke('silver');
    line(x + 8, ry - 2, x + w - 8, ry - 2);
    noStroke();
    const totalRows = [['Total per student', totals.map(dollars)]];
    if (!locked) {
      totalRows.push(['District, ' + students.toLocaleString('en-US') + ' students', totals.map(t => wholeDollars(t * students))]);
      totalRows.push(['Share of $15,600 per pupil', totals.map(t => (t / PER_PUPIL_SPENDING * 100).toFixed(2) + '%')]);
    }
    textStyle(BOLD);
    for (const r of totalRows) {
      fill(locked ? 'gray' : 'midnightblue');
      textAlign(LEFT, TOP);
      text(r[0], colX[0], ry);
      textAlign(RIGHT, TOP);
      r[1].forEach((t, i) => text(locked ? '?' : t, colX[i + 1], ry));
      ry += rowH;
    }
    textStyle(NORMAL);
    y += th + 10;
    if (locked) return;

    // Bars: software items versus the device share
    const software = totals.map(t => t - (dev ? DEVICE_SHARE : 0));
    const maxT = Math.max(...totals, 1);
    const bx = x + 70, bw = w - 70 - 80;
    textBlock('Per student per year:', x, y, w, 15, { style: BOLD });
    // legend
    textSize(14);
    const lgx = x + 175;
    fill('steelblue'); rect(lgx, y + 2, 14, 14, 3);
    fill('black'); textAlign(LEFT, TOP); text('Software and services', lgx + 20, y + 1);
    fill('darkorange'); rect(lgx + 190, y + 2, 14, 14, 3);
    fill('black'); text('Device share', lgx + 210, y + 1);
    y += 24;
    for (let L = 0; L < 3; L++) {
      const by = y + L * 26;
      fill('black');
      textSize(14);
      textAlign(RIGHT, CENTER);
      text('Level ' + (L + 2), bx - 6, by + 9);
      const sw = bw * software[L] / maxT;
      fill('steelblue');
      rect(bx, by, Math.max(1, sw), 18, 2);
      if (dev) { fill('darkorange'); rect(bx + sw, by, bw * DEVICE_SHARE / maxT, 18, 2); }
      fill('black');
      textAlign(LEFT, CENTER);
      text(dollars(totals[L]), bx + bw * totals[L] / maxT + 6, by + 9);
    }
    y += 3 * 26 + 2;
    const note = dev ? 'The device share alone is larger than every software item combined at Levels 2 and 3.'
                     : 'Check "Device purchased" to compare the device share with the software items.';
    textBlock(note, x, y, w, 14, { color: 'midnightblue', style: ITALIC });
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
// Challenge engine: three calculation challenges, answered before the
// exploration controls unlock. Two attempts per challenge; only the first
// attempt counts toward the score. Then the controls unlock for exploration.
// ---------------------------------------------------------------------------
let canvasHeight = drawHeight + controlHeight;
let phase = 'challenge';   // 'challenge' or 'explore'
let ci = 0;                // current challenge index
let attempt = 0;
let resolved = false;
let feedback = null;
let firstTry = [];
let answerInput, answerSelect, checkButton, nextButton, redoButton, defaultsButton;
let ctl = {};              // exploration controls by key

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  const main = document.querySelector('main');

  // Challenge row controls
  answerInput = createInput('');
  answerInput.parent(main);
  answerInput.size(130);
  answerInput.style('font-size', '16px');
  answerInput.attribute('aria-label', 'Your answer');
  answerInput.elt.addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(); });
  answerSelect = createSelect();
  answerSelect.parent(main);
  answerSelect.style('font-size', '15px');
  answerSelect.attribute('aria-label', 'Your answer');
  checkButton = createButton('Check');
  checkButton.parent(main);
  styleButton(checkButton, 70);
  checkButton.mousePressed(checkAnswer);
  nextButton = createButton('Next');
  nextButton.parent(main);
  styleButton(nextButton, 70);
  nextButton.mousePressed(nextChallenge);
  redoButton = createButton('Redo challenges');
  redoButton.parent(main);
  styleButton(redoButton);
  redoButton.mousePressed(startChallenges);
  defaultsButton = createButton('Defaults');
  defaultsButton.parent(main);
  styleButton(defaultsButton);
  defaultsButton.mousePressed(() => { applySettings(defaultSettings()); redraw(); });

  // Exploration controls (built-in p5.js controls)
  for (const c of CONFIG.controls) {
    let el;
    if (c.type === 'slider') {
      el = createSlider(c.min, c.max, c.value, c.step);
      el.input(() => redraw());
    } else if (c.type === 'select') {
      el = createSelect();
      for (const o of c.options) el.option(o.label, String(o.value));
      el.selected(String(c.value));
      el.style('font-size', '15px');
      el.changed(() => redraw());
    } else {
      el = createCheckbox(' ' + c.text, c.value);
      el.style('font-size', '15px');
      el.changed(() => redraw());
    }
    el.parent(main);
    el.attribute('aria-label', c.aria || c.key);
    ctl[c.key] = el;
  }

  startChallenges();
  describe(CONFIG.description, LABEL);
  noLoop();
}

// Current value of an exploration control
function ctlValue(key) {
  const c = CONFIG.controls.find(k => k.key === key);
  const el = ctl[key];
  if (c.type === 'checkbox') return el.checked();
  return parseFloat(el.value());
}
function setVal(key, v) {
  const c = CONFIG.controls.find(k => k.key === key);
  const el = ctl[key];
  if (c.type === 'checkbox') el.checked(!!v);
  else if (c.type === 'select') el.selected(String(v));
  else el.value(v);
}
function defaultSettings() {
  const s = {};
  for (const c of CONFIG.controls) s[c.key] = c.value;
  return s;
}
function applySettings(s) { for (const k in s) setVal(k, s[k]); }

function startChallenges() {
  phase = 'challenge';
  ci = 0;
  firstTry = new Array(CONFIG.challenges.length).fill(null);
  loadChallenge();
}

function loadChallenge() {
  attempt = 0;
  resolved = false;
  feedback = null;
  const c = CONFIG.challenges[ci];
  applySettings(Object.assign(defaultSettings(), c.settings || {}));
  answerInput.value('');
  answerSelect.elt.innerHTML = '';
  if (c.kind === 'choice') {
    answerSelect.option('Choose...', '-1');
    c.choices.forEach((t, i) => answerSelect.option(t, String(i)));
    answerSelect.selected('-1');
  }
  refreshControls();
  layoutControls();
  redraw();
}

// Parse a typed number, ignoring $, commas, % and spaces
function parseAnswer(str) {
  const clean = String(str).replace(/[$,%\s]/g, '').replace(/[a-zA-Z]+$/, '');
  if (clean === '' || isNaN(Number(clean))) return NaN;
  return Number(clean);
}

function checkAnswer() {
  if (phase !== 'challenge' || resolved) return;
  const c = CONFIG.challenges[ci];
  let ok;
  if (c.kind === 'choice') {
    const v = parseInt(answerSelect.value());
    if (v < 0) { feedback = { kind: 'retry', lead: 'Choose an answer first.', body: '' }; redraw(); return; }
    ok = v === c.answer;
  } else {
    const v = parseAnswer(answerInput.value());
    if (isNaN(v)) { feedback = { kind: 'retry', lead: 'Type a number first.', body: 'For example ' + c.example + '.' }; redraw(); return; }
    ok = Math.abs(v - c.answer) <= c.tol + 1e-9;
  }
  attempt++;
  if (attempt === 1) firstTry[ci] = ok;
  if (ok) {
    resolved = true;
    feedback = { kind: 'ok', lead: c.correctLead, body: c.working + (attempt > 1 ? ' (A second try does not change your score.)' : '') };
  } else if (attempt === 1) {
    feedback = { kind: 'retry', lead: 'Not quite.', body: c.hint + ' Try once more.' };
  } else {
    resolved = true;
    feedback = { kind: 'miss', lead: 'The answer is ' + c.answerText + '.', body: c.working };
  }
  refreshControls();
  redraw();
}

function nextChallenge() {
  if (!resolved) return;
  if (ci < CONFIG.challenges.length - 1) {
    ci++;
    loadChallenge();
  } else {
    phase = 'explore';
    applySettings(defaultSettings());
    refreshControls();
    layoutControls();
    redraw();
  }
}

function score() { return firstTry.filter(v => v === true).length; }

function refreshControls() {
  const ch = phase === 'challenge';
  const c = CONFIG.challenges[ci];
  showEl(answerInput, ch && c.kind !== 'choice');
  showEl(answerSelect, ch && c.kind === 'choice');
  showEl(checkButton, ch);
  showEl(nextButton, ch);
  showEl(redoButton, !ch);
  showEl(defaultsButton, !ch);
  if (ch) {
    enableEl(answerInput, !resolved);
    enableEl(answerSelect, !resolved);
    enableEl(checkButton, !resolved);
    enableEl(nextButton, resolved);
    setButtonColor(checkButton, resolved ? 'whitesmoke' : 'gold', 'black');
    setButtonColor(nextButton, resolved ? 'gold' : 'whitesmoke', 'black');
    nextButton.html(ci === CONFIG.challenges.length - 1 ? 'Unlock controls' : 'Next');
  }
  for (const k in ctl) enableEl(ctl[k], !ch);
}

// Row 0: the challenge row. Rows 1+: exploration controls, cells split evenly.
function layoutControls() {
  if (!checkButton) return;
  const rowH = 36;
  let y = drawHeight + 8;
  let x = margin + 112;
  if (phase === 'challenge') {
    const c = CONFIG.challenges[ci];
    const box = c.kind === 'choice' ? answerSelect : answerInput;
    box.position(x, y + 2);
    x += (box.elt.offsetWidth || 140) + 10;
    checkButton.position(x, y);
    x += (checkButton.elt.offsetWidth || 70) + 8;
    nextButton.position(x, y);
  } else {
    redoButton.position(margin, y);
    defaultsButton.position(margin + (redoButton.elt.offsetWidth || 140) + 10, y);
  }
  y += rowH + 4;
  for (const row of CONFIG.rows) {
    const cellW = (canvasWidth - 2 * margin) / row.length;
    row.forEach((key, i) => {
      const c = CONFIG.controls.find(k => k.key === key);
      const cx = margin + i * cellW;
      const el = ctl[key];
      if (c.type === 'checkbox') {
        el.position(cx, y + 6);
      } else {
        const lw = c.labelW || 150;
        el.position(cx + lw, y + (c.type === 'select' ? 3 : 4));
        const ew = Math.max(60, cellW - lw - 14);
        if (c.type === 'slider') el.size(ew);
        else el.style('width', Math.min(ew, c.maxW || 260) + 'px');
      }
      c._x = cx; c._y = y;
    });
    y += rowH;
  }
}

// ---------------------------------------------------------------------------
// Drawing
// ---------------------------------------------------------------------------
function feedbackColors(kind) {
  if (kind === 'ok') return ['honeydew', 'forestgreen', 'darkgreen'];
  if (kind === 'retry') return ['seashell', 'darkorange', 'saddlebrown'];
  return ['mistyrose', 'firebrick', 'darkred'];
}

function challengeCardHeight(w) {
  let h = 0;
  for (const c of CONFIG.challenges) {
    let ch = 10 + 24 + textBlock(c.prompt, 0, 0, w - 24, 17, { draw: false, style: BOLD }) + 4 +
             textBlock(c.setup, 0, 0, w - 24, 16, { draw: false }) + 10;
    h = Math.max(h, ch);
  }
  return h;
}
function feedbackHeight(w) {
  let h = 0;
  for (const c of CONFIG.challenges) {
    for (const f of [[c.correctLead, c.working + ' (A second try does not change your score.)'],
                     ['Not quite.', c.hint + ' Try once more.'],
                     ['The answer is ' + c.answerText + '.', c.working]]) {
      h = Math.max(h, leadBody(f[0], f[1], 0, 0, w - 24, 16, 'black', false) + 20);
    }
  }
  return h;
}

function draw() {
  drawBackgrounds();
  let y = drawTitle(CONFIG.title, CONFIG.provenance);
  const w = canvasWidth - 2 * margin;
  const n = CONFIG.challenges.length;

  if (phase === 'challenge') {
    const c = CONFIG.challenges[ci];
    const cardH = challengeCardHeight(w);
    panel(margin, y, w, cardH, 'white', 'steelblue');
    textSize(16);
    noStroke();
    fill('black');
    textAlign(LEFT, TOP);
    text('Challenge ' + (ci + 1) + ' of ' + n, margin + 12, y + 10);
    textAlign(RIGHT, TOP);
    textStyle(BOLD);
    text('Score: ' + score() + ' of ' + n, canvasWidth - margin - 12, y + 10);
    textStyle(NORMAL);
    let cy = y + 34;
    cy += textBlock(c.prompt, margin + 12, cy, w - 24, 17, { style: BOLD, color: 'midnightblue' }) + 4;
    textBlock(c.setup, margin + 12, cy, w - 24, 16);
    y += cardH + 6;
    const fbH = feedbackHeight(w);
    if (feedback) {
      const col = feedbackColors(feedback.kind);
      panel(margin, y, w, fbH, col[0], col[1]);
      leadBody(feedback.lead, feedback.body, margin + 12, y + 10, w - 24, 16, col[2]);
    } else {
      panel(margin, y, w, fbH, 'ghostwhite', 'gainsboro');
      textBlock(CONFIG.answerHint, margin + 12, y + 10, w - 24, 16, { color: 'dimgray' });
    }
    y += fbH + 8;
    window.__challengeSceneTop = Math.max(window.__challengeSceneTop || 0, y);
    CONFIG.drawScene(margin, y, w, drawHeight - y - 8, true);
  } else {
    const s = score();
    const pass = s >= CONFIG.passMark;
    const col = pass ? feedbackColors('ok') : feedbackColors('retry');
    const msg = 'Challenges: ' + s + ' of ' + n + ' correct on the first try. ' + (pass ? CONFIG.passMessage : CONFIG.failMessage) +
                ' The controls are unlocked: explore.';
    const h = textBlock(msg, 0, 0, w - 24, 15, { draw: false }) + 14;
    panel(margin, y, w, h, col[0], col[1]);
    textBlock(msg, margin + 12, y + 7, w - 24, 15, { color: col[2] });
    y += h + 8;
    CONFIG.drawScene(margin, y, w, drawHeight - y - 8, false);
  }

  // Labels for the control area
  noStroke();
  fill('black');
  textSize(16);
  textAlign(LEFT, CENTER);
  if (phase === 'challenge') {
    textStyle(BOLD);
    text('Your answer:', margin, drawHeight + 25);
    textStyle(NORMAL);
  }
  for (const c of CONFIG.controls) {
    if (c.type === 'checkbox' || c._x === undefined) continue;
    fill(phase === 'challenge' ? 'gray' : 'black');
    textSize(15);
    text(c.label(ctlValue(c.key)), c._x, c._y + 15);
  }
}
