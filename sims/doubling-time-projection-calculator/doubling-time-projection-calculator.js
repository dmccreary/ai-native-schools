// Doubling Time Projection Calculator MicroSim (p5.js)
// CANVAS_HEIGHT: 685
// Months to reach a target task horizon = (number of doublings) x (doubling time), where the
// number of doublings = log2(target / 50 minutes). The learner first calculates the months to
// reach 40 hours for doubling times of 5, 4, and 6 months (two attempts each, first scored).
// Then the doubling-time slider and the target menu unlock and the result updates at once.
// Illustrative projection, not a forecast. Nothing moves until the learner acts.
let drawHeight = 590;
let controlHeight = 95;

const START_MIN = 50;  // starting 50 percent time horizon, minutes
const TARGETS = [
  { label: '5 hours', value: 300 },
  { label: '40 hours', value: 2400 },
  { label: '160 hours', value: 9600 }
];
function doublings(target) { return Math.log2(target / START_MIN); }
function monthsTo(target, d) { return Math.round(doublings(target) * d); }
function targetLabel(v) { return TARGETS.find(t => t.value === v).label; }

const CONFIG = {
  title: 'Doubling Time Projection Calculator',
  provenance: 'Illustrative projection, not a forecast. Start: a 50-minute task horizon (Chapter 4). The targets are illustrative.',
  description: 'Calculates how many months a 50-minute task horizon takes to reach a target for a chosen doubling time. ' +
    'Three questions come first; then a doubling-time slider (3 to 12 months) and a target menu (5, 40, or 160 hours) update a timeline and a bar chart.',
  answerHint: 'Type a whole number of months and press Check. Months to target = number of doublings × doubling time.',
  passMark: 3,
  passMessage: 'You can project a horizon from its doubling time.',
  failMessage: 'Press Redo challenges to try for 3 of 3.',
  challenges: [
    { prompt: 'How many months until the horizon reaches 40 hours?',
      setup: 'Start at 50 minutes. 40 hours is 2,400 minutes, 48 times the start, which needs about 5.6 doublings. Doubling time: 5 months.',
      settings: { d: 5, target: 2400 }, kind: 'number', answer: 28, tol: 1, example: '30', answerText: 'about 28 months',
      correctLead: 'Correct: about 28 months.', working: '5.6 doublings × 5 months = 28 months (more exactly 5.585 × 5 = 27.9).',
      hint: 'Multiply the number of doublings, 5.6, by the doubling time in months.' },
    { prompt: 'If the doubling time were 4 months, how many months to 40 hours?',
      setup: 'The same start (50 minutes) and target (40 hours, about 5.6 doublings). Doubling time: 4 months.',
      settings: { d: 4, target: 2400 }, kind: 'number', answer: 22, tol: 1, example: '30', answerText: 'about 22 months',
      correctLead: 'Correct: about 22 months.', working: '5.6 doublings × 4 months = 22.4, about 22 months.',
      hint: 'Multiply the number of doublings, 5.6, by the doubling time in months.' },
    { prompt: 'If the doubling time were 6 months, how many months to 40 hours?',
      setup: 'The same start (50 minutes) and target (40 hours, about 5.6 doublings). Doubling time: 6 months.',
      settings: { d: 6, target: 2400 }, kind: 'number', answer: 34, tol: 1, example: '30', answerText: 'about 34 months',
      correctLead: 'Correct: about 34 months.', working: '5.6 doublings × 6 months = 33.5, about 34 months.',
      hint: 'Multiply the number of doublings, 5.6, by the doubling time in months.' }
  ],
  controls: [
    { key: 'd', type: 'slider', min: 3, max: 12, value: 5, step: 1, labelW: 200,
      aria: 'Doubling time in months', label: v => 'Doubling time: ' + v + ' months' },
    { key: 'target', type: 'select', value: 2400, labelW: 70, maxW: 140,
      options: TARGETS.map(t => ({ label: t.label, value: t.value })),
      aria: 'Target horizon', label: () => 'Target:' }
  ],
  rows: [['d', 'target']],

  drawScene(x, y, w, h, locked) {
    const d = ctlValue('d'), target = ctlValue('target');
    // Table of the three targets
    const rowH = 24;
    const th = rowH * 4 + 12;
    panel(x, y, w, th, 'white', 'silver');
    const cols = [x + 12, x + w * 0.30, x + w * 0.52, x + w * 0.74];
    const heads = ['Target', 'Times the start', 'Doublings', 'Months (' + d + '-mo doubling)'];
    textSize(15);
    noStroke();
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    fill('black');
    heads.forEach((t, i) => text(t, cols[i], y + 8));
    textStyle(NORMAL);
    TARGETS.forEach((t, i) => {
      const ry = y + 8 + (i + 1) * rowH;
      const sel = t.value === target;
      fill(sel ? 'midnightblue' : 'black');
      textStyle(sel ? BOLD : NORMAL);
      text(t.label + ' (' + t.value.toLocaleString('en-US') + ' min)', cols[0], ry);
      text(t.value / START_MIN + ' times', cols[1], ry);
      text('about ' + doublings(t.value).toFixed(1), cols[2], ry);
      fill(locked ? 'gray' : (sel ? 'midnightblue' : 'black'));
      text(locked ? '?' : monthsTo(t.value, d) + ' months', cols[3], ry);
    });
    textStyle(NORMAL);
    y += th + 10;
    if (locked) {
      textBlock('Number of doublings = log2(target ÷ 50 minutes). Months to target = number of doublings × doubling time, rounded to a whole month.',
        x, y, w, 15, { color: 'midnightblue' });
      return;
    }

    // Big result
    const m = monthsTo(target, d);
    y += textBlock('With a ' + d + '-month doubling time, the horizon reaches ' + targetLabel(target) + ' in about ' + m + ' months.',
      x, y, w, 17, { style: BOLD, color: 'midnightblue' }) + 4;

    // Timeline: months to target for doubling times 4, 5, 6 and the current setting
    const maxM = Math.ceil(doublings(target) * 12 / 10) * 10;
    const lx = x + 20, lw = w - 40;
    const ly = y + 34;
    const xOf = mo => lx + lw * mo / maxM;
    stroke('black');
    strokeWeight(2);
    line(lx, ly, lx + lw, ly);
    strokeWeight(1);
    textSize(12);
    for (let mo = 0; mo <= maxM; mo += 10) {
      stroke('black');
      line(xOf(mo), ly - 4, xOf(mo), ly + 4);
      noStroke();
      fill('black');
      textAlign(CENTER, TOP);
      text(mo, xOf(mo), ly + 6);
    }
    textSize(13);
    text('Months from the start', lx + lw / 2, ly + 22);
    for (const dd of [4, 5, 6]) {
      const mo = monthsTo(target, dd);
      noStroke();
      fill('lightsteelblue');
      circle(xOf(mo), ly, 12);
      fill('black');
      textAlign(CENTER, BOTTOM);
      textSize(12);
      text(dd + '-mo: ' + mo, xOf(mo), ly - 9 - (dd === 5 ? 15 : 0));
    }
    stroke('white');
    strokeWeight(2);
    fill('firebrick');
    circle(xOf(m), ly, 14);
    noStroke();
    y = ly + 46;

    // Bars: months to target for every doubling time from 3 to 12
    textBlock('Months to reach ' + targetLabel(target) + ' for each doubling time', x, y, w, 15, { style: BOLD });
    y += 22;
    const barH = 14, gap = 2;
    const bx = x + 70, bw = w - 70 - 50;
    const maxBar = monthsTo(target, 12);
    for (let dd = 3; dd <= 12; dd++) {
      const by = y + (dd - 3) * (barH + gap);
      const mo = monthsTo(target, dd);
      const sel = dd === d;
      noStroke();
      fill(sel ? 'midnightblue' : 'black');
      textSize(13);
      textAlign(RIGHT, CENTER);
      text(dd + ' months', bx - 6, by + barH / 2);
      fill(sel ? 'firebrick' : 'lightsteelblue');
      rect(bx, by, bw * mo / maxBar, barH, 2);
      fill('black');
      textAlign(LEFT, CENTER);
      text(mo, bx + bw * mo / maxBar + 4, by + barH / 2);
    }
    y += 10 * (barH + gap) + 6;
    textBlock('A one-month change in doubling time moves the date by about ' + doublings(target).toFixed(1) + ' months, the number of doublings.',
      x, y, w, 14, { color: 'midnightblue', style: ITALIC });
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
