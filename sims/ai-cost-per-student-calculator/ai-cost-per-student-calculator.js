// AI Cost per Student Calculator MicroSim (p5.js)
// CANVAS_HEIGHT: 640
// The learner calculates the yearly AI inference cost per student from tokens per session,
// sessions per day, school days, and price per million tokens, in three challenges
// (two attempts each, first attempt scored, within one cent). Then the controls unlock and
// the yearly cost, daily cost, and district total for 12,000 students update at once.
// Prices of $20.00 and $0.07 are from the Stanford AI Index 2025; $2.00 and $0.20 are illustrative.
// Nothing moves until the learner acts. To change the content, edit CONFIG.
let drawHeight = 510;
let controlHeight = 130;

const DISTRICT_STUDENTS = 12000;   // the Chapter 1 example district
const PER_PUPIL_SPENDING = 15600;  // about $15,600 per pupil per year

function money(v) {
  // To the cent, and to the tenth of a cent when under $1
  if (v < 1) return '$' + v.toFixed(3);
  return '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function dailyMoney(v) {
  if (v < 0.01) return '$' + v.toFixed(4);
  return money(v);
}
function num(v) { return v.toLocaleString('en-US'); }

const PRICES = [
  { label: '$20.00 (Nov 2022)', value: 20, note: 'November 2022, Stanford AI Index 2025' },
  { label: '$2.00 (Illustrative)', value: 2, note: 'Illustrative' },
  { label: '$0.20 (Illustrative)', value: 0.2, note: 'Illustrative' },
  { label: '$0.07 (Oct 2024)', value: 0.07, note: 'October 2024, Stanford AI Index 2025' }
];

const CONFIG = {
  title: 'AI Cost per Student Calculator',
  provenance: 'Prices for GPT-3.5-level performance: $20.00 (Nov 2022) and $0.07 (Oct 2024) from the Stanford AI Index 2025; ' +
    '$2.00 and $0.20 are illustrative. Session sizes are illustrative and apply to a GPT-3.5-level model.',
  description: 'A calculator for the yearly AI inference cost per student. Three challenges come first; then four controls ' +
    '(tokens per session, sessions per day, school days, price per million tokens) update the yearly cost, daily cost, and district total.',
  answerHint: 'Type a dollar amount, such as 12.34, and press Check. The gray controls below show this challenge\'s inputs; they unlock after the three challenges.',
  passMark: 3,
  passMessage: 'You can calculate inference cost per student.',
  failMessage: 'Press Redo challenges to try for 3 of 3.',
  challenges: [
    { prompt: 'What does one year of AI tutoring cost per student?',
      setup: '20,000 tokens per session, 1 session per school day, 180 school days, at $20.00 per million tokens (the November 2022 price).',
      settings: { tokens: 20000, sessions: 1, days: 180, price: 20 },
      kind: 'number', answer: 72.00, tol: 0.01, example: '12.34', answerText: '$72.00',
      correctLead: 'Correct: $72.00.',
      working: '20,000 × 1 × 180 = 3,600,000 tokens; 3.6 × $20.00 = $72.00.',
      hint: 'Check the units: the price is per million tokens.' },
    { prompt: 'Same usage, at the October 2024 price. What does one year cost per student?',
      setup: '20,000 tokens per session, 1 session per school day, 180 school days, at $0.07 per million tokens.',
      settings: { tokens: 20000, sessions: 1, days: 180, price: 0.07 },
      kind: 'number', answer: 0.25, tol: 0.01, example: '0.12', answerText: '$0.25',
      correctLead: 'Correct: $0.25.',
      working: '3.6 million tokens × $0.07 = $0.252, which is about $0.25.',
      hint: 'Check the units: the price is per million tokens.' },
    { prompt: 'Heavier use at an illustrative price. What does one year cost per student?',
      setup: '40,000 tokens per session, 2 sessions per school day, 180 school days, at $0.20 per million tokens.',
      settings: { tokens: 40000, sessions: 2, days: 180, price: 0.2 },
      kind: 'number', answer: 2.88, tol: 0.01, example: '1.23', answerText: '$2.88',
      correctLead: 'Correct: $2.88.',
      working: '40,000 × 2 × 180 = 14,400,000 tokens; 14.4 × $0.20 = $2.88.',
      hint: 'Check the units: the price is per million tokens.' }
  ],
  controls: [
    { key: 'tokens', type: 'slider', min: 5000, max: 100000, value: 20000, step: 5000, labelW: 180,
      aria: 'Tokens per session', label: v => 'Tokens/session: ' + num(v) },
    { key: 'sessions', type: 'slider', min: 1, max: 5, value: 1, step: 1, labelW: 140,
      aria: 'Sessions per school day', label: v => 'Sessions/day: ' + v },
    { key: 'days', type: 'slider', min: 150, max: 200, value: 180, step: 10, labelW: 180,
      aria: 'School days per year', label: v => 'School days: ' + v },
    { key: 'price', type: 'select', value: 0.07, labelW: 140, maxW: 210,
      options: PRICES.map(p => ({ label: p.label, value: p.value })),
      aria: 'Price per million tokens', label: () => 'Price/million:' }
  ],
  rows: [['tokens', 'sessions'], ['days', 'price']],

  drawScene(x, y, w, h, locked) {
    const tokens = ctlValue('tokens'), sessions = ctlValue('sessions'), days = ctlValue('days'), price = ctlValue('price');
    const annual = tokens * sessions * days;
    const cost = annual / 1e6 * price;
    const rows = [
      ['Annual tokens = tokens per session × sessions per day × school days', locked ? '?' : num(annual)],
      ['Cost per student per year = annual tokens ÷ 1,000,000 × price', locked ? '?' : money(cost)],
      ['Cost per student per school day', locked ? '?' : dailyMoney(cost / days)],
      ['District total for ' + num(DISTRICT_STUDENTS) + ' students', locked ? '?' : money(cost * DISTRICT_STUDENTS)],
      ['Share of $15,600 per-pupil spending', locked ? '?' : (cost / PER_PUPIL_SPENDING * 100).toFixed(cost / PER_PUPIL_SPENDING * 100 < 0.01 ? 4 : 2) + '%']
    ];
    const rowH = 26;
    const valW = 120;
    const ph = rows.length * rowH + 16;
    panel(x, y, w, ph, 'white', 'silver');
    textSize(15);
    rows.forEach((r, i) => {
      const ry = y + 8 + i * rowH;
      noStroke();
      fill(i === 1 ? 'midnightblue' : 'black');
      textStyle(i === 1 ? BOLD : NORMAL);
      textAlign(LEFT, TOP);
      // shorten the label if the panel is narrow
      let label = r[0];
      while (textWidth(label) > w - valW - 30 && label.length > 10) label = label.slice(0, -2);
      if (label !== r[0]) label = label.trim() + '...';
      text(label, x + 12, ry + 4);
      textAlign(RIGHT, TOP);
      fill(locked ? 'gray' : (i === 1 ? 'midnightblue' : 'black'));
      text(r[1], x + w - 12, ry + 4);
      textStyle(NORMAL);
    });
    y += ph + 8;
    if (locked) return;

    // Cost at each of the four prices for the same usage
    textBlock('Yearly cost per student at each price, same usage', x, y, w, 16, { style: BOLD });
    y += 24;
    const labelW = 210, barMax = w - labelW - 90;
    const maxCost = annual / 1e6 * 20;
    PRICES.forEach((p, i) => {
      const c = annual / 1e6 * p.value;
      const by = y + i * 26;
      const sel = Math.abs(p.value - price) < 1e-9;
      noStroke();
      fill(sel ? 'midnightblue' : 'black');
      textStyle(sel ? BOLD : NORMAL);
      textSize(14);
      textAlign(LEFT, CENTER);
      text(p.label, x, by + 10);
      textStyle(NORMAL);
      fill(sel ? 'steelblue' : 'lightsteelblue');
      rect(x + labelW, by + 2, Math.max(2, barMax * c / maxCost), 16, 3);
      fill('black');
      text(money(c), x + labelW + Math.max(2, barMax * c / maxCost) + 6, by + 10);
    });
    y += 4 * 26 + 4;
    textBlock('The same usage costs about ' + Math.round(20 / 0.07) + ' times as much at $20.00 as at $0.07. Price per token changes the result far more than any realistic change in usage.',
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
