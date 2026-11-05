// Four-Fifths Bias Audit Calculator MicroSim (p5.js)
// CANVAS_HEIGHT: 655
// A selection-rate audit for three student groups. Rate = recommended / eligible; the highest
// rate is the reference; ratio = rate / reference; a group is flagged when its ratio is below 0.80.
// The learner first answers three questions (two attempts each, first attempt scored); then three
// sliders for the recommended counts unlock and the rates, ratios, and flags update at once.
// Illustrative audit data. A flag starts an investigation; it is not a verdict.
let drawHeight = 490;
let controlHeight = 165;

const GROUPS = [
  { name: 'A', eligible: 500, key: 'recA' },
  { name: 'B', eligible: 300, key: 'recB' },
  { name: 'C', eligible: 200, key: 'recC' }
];

// Audit results. Ratios use whole-number arithmetic so 96 of 300 against 200 of 500
// gives exactly 0.80 (not flagged).
function audit() {
  const rec = GROUPS.map(g => ctlValue(g.key));
  // reference group: the highest rate (compare rec_i/elig_i by cross-multiplying)
  let ref = 0;
  for (let i = 1; i < 3; i++) if (rec[i] * GROUPS[ref].eligible > rec[ref] * GROUPS[i].eligible) ref = i;
  const none = rec.every(r => r === 0);
  return GROUPS.map((g, i) => {
    const num = rec[i] * GROUPS[ref].eligible;
    const den = GROUPS[i].eligible * rec[ref];
    return {
      name: g.name, eligible: g.eligible, rec: rec[i],
      rate: rec[i] / g.eligible,
      ratio: none ? null : num / den,
      flagged: none ? false : 5 * num < 4 * den,
      isRef: !none && i === ref
    };
  });
}

const CONFIG = {
  title: 'Four-Fifths Bias Audit Calculator',
  provenance: 'Illustrative audit data. The four-fifths threshold is a screening convention from U.S. employment-selection guidance, applied here as an illustration.',
  description: 'A table of three student groups with eligible and recommended counts for an AI recommendation system. ' +
    'Three questions come first; then sliders for the recommended counts update each group\'s selection rate, ratio to the highest rate, and flag.',
  answerHint: 'Type a number and press Check (Questions 1 and 2), or choose an answer (Question 3). The sliders unlock after the three questions.',
  passMark: 3,
  passMessage: 'You can run a four-fifths screen.',
  failMessage: 'Press Redo challenges to try for 3 of 3.',
  challenges: [
    { prompt: 'Is the system recommending students from every group at similar rates? Start with group B\'s selection rate.',
      setup: 'Selection rate = recommended ÷ eligible. Give group B\'s rate as a percent, to one decimal place.',
      kind: 'number', answer: 24.0, tol: 0.1, example: '12.5', answerText: '24.0%',
      correctLead: 'Correct: 72 ÷ 300 is 24.0%.', working: '72 ÷ 300 = 0.240, or 24.0%.',
      hint: 'Divide the number recommended by the number eligible.' },
    { prompt: 'What is group B\'s ratio to the highest rate?',
      setup: 'The highest rate is the reference. Ratio = a group\'s rate ÷ the reference rate. Give a decimal, such as 0.75.',
      kind: 'number', answer: 0.60, tol: 0.01, example: '0.75', answerText: '0.60',
      correctLead: 'Correct: 24.0 ÷ 40.0 is 0.60.', working: 'Group A has the highest rate, 200 ÷ 500 = 40.0%. 24.0 ÷ 40.0 = 0.60.',
      hint: 'Divide group B\'s rate by the highest rate, group A\'s.' },
    { prompt: 'Which groups does the audit flag?',
      setup: 'A group is flagged when its ratio to the highest rate is below 0.80. Work out group C\'s ratio too.',
      kind: 'choice', choices: ['Group A only', 'Group B only', 'Group C only', 'Groups B and C', 'No group'],
      answer: 1, answerText: 'group B only',
      correctLead: 'Correct: only group B is below 0.80.', working: 'Ratios: A 1.00, B 0.60, C 35.0 ÷ 40.0 = 0.875 (about 0.88). Only B is below 0.80.',
      hint: 'Flag any group whose ratio is below 0.80.' }
  ],
  controls: [
    { key: 'recA', type: 'slider', min: 0, max: 500, value: 200, step: 10, labelW: 250,
      aria: 'Recommended, group A', label: v => 'Recommended, group A: ' + v + ' of 500' },
    { key: 'recB', type: 'slider', min: 0, max: 300, value: 72, step: 6, labelW: 250,
      aria: 'Recommended, group B', label: v => 'Recommended, group B: ' + v + ' of 300' },
    { key: 'recC', type: 'slider', min: 0, max: 200, value: 70, step: 10, labelW: 250,
      aria: 'Recommended, group C', label: v => 'Recommended, group C: ' + v + ' of 200' }
  ],
  rows: [['recA'], ['recB'], ['recC']],

  drawScene(x, y, w, h, locked) {
    const res = audit();
    const none = res.every(r => r.rec === 0);
    const rowH = 25;
    const th = rowH * 4 + 12;
    panel(x, y, w, th, 'white', 'silver');
    const heads = ['Group', 'Eligible', 'Recommended', 'Rate', 'Ratio', 'Flag'];
    const cx = [x + 12, x + w * 0.17, x + w * 0.33, x + w * 0.55, x + w * 0.70, x + w * 0.84];
    textSize(15);
    noStroke();
    fill('black');
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    heads.forEach((t, i) => text(t, cx[i], y + 8));
    textStyle(NORMAL);
    res.forEach((r, i) => {
      const ry = y + 8 + (i + 1) * rowH;
      fill('black');
      text(r.name, cx[0], ry);
      text(r.eligible, cx[1], ry);
      text(r.rec, cx[2], ry);
      if (locked) {
        fill('gray');
        text('?', cx[3], ry); text('?', cx[4], ry); text('?', cx[5], ry);
        return;
      }
      text((r.rate * 100).toFixed(1) + '%', cx[3], ry);
      text(r.ratio === null ? '-' : r.ratio.toFixed(2) + (r.isRef ? ' (ref)' : ''), cx[4], ry);
      fill(r.flagged ? 'firebrick' : 'forestgreen');
      textStyle(BOLD);
      text(none ? '-' : (r.flagged ? 'Flagged' : 'OK'), cx[5], ry);
      textStyle(NORMAL);
    });
    y += th + 10;
    if (locked) {
      textBlock('Rate = recommended ÷ eligible. The highest rate is the reference. Ratio = rate ÷ reference rate. A group is flagged when its ratio is below 0.80.',
        x, y, w, 15, { color: 'midnightblue' });
      return;
    }
    if (none) {
      textBlock('No recommendations to audit.', x, y, w, 18, { style: BOLD, color: 'firebrick' });
      return;
    }

    // Bar chart of ratios with the 0.80 threshold
    textBlock('Each group\'s ratio to the highest rate', x, y, w, 15, { style: BOLD });
    y += 24;
    const bx = x + 80, bw = w - 80 - 70;
    const xOf = r => bx + bw * Math.min(r, 1);
    res.forEach((r, i) => {
      const by = y + i * 30;
      fill('black');
      textSize(14);
      textAlign(RIGHT, CENTER);
      text('Group ' + r.name, bx - 8, by + 10);
      fill(r.flagged ? 'firebrick' : 'steelblue');
      rect(bx, by, Math.max(1, bw * r.ratio), 20, 2);
      fill('black');
      textAlign(LEFT, CENTER);
      text(r.ratio.toFixed(2), bx + bw * r.ratio + 6, by + 10);
    });
    stroke('black');
    strokeWeight(2);
    drawingContext.setLineDash([6, 4]);
    line(xOf(0.8), y - 6, xOf(0.8), y + 3 * 30);
    drawingContext.setLineDash([]);
    strokeWeight(1);
    noStroke();
    fill('black');
    textSize(13);
    textAlign(CENTER, TOP);
    text('0.80 threshold', xOf(0.8), y + 3 * 30 + 2);
    y += 3 * 30 + 24;
    const flagged = res.filter(r => r.flagged).map(r => r.name);
    const msg = (flagged.length ? 'Flagged: group ' + flagged.join(' and group ') + '. ' : 'No group is flagged. ') +
      'A flag is a prompt to investigate why, not proof that the system is unfair.';
    textBlock(msg, x, y, w, 15, { color: 'midnightblue', style: ITALIC });
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
