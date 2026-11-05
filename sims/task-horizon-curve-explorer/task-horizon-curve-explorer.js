// Task Horizon Curve Explorer MicroSim (p5.js)
// CANVAS_HEIGHT: 615
// A simplified success rule, P = 1 / (1 + t/H), gives a model's chance of finishing a task
// that takes a skilled human t minutes, where H is the model's 50 percent time horizon.
// The learner first answers three questions (two attempts each, first attempt scored);
// then the horizon slider unlocks and the curve and six task success rates update at once.
// Simplified illustrative model, not METR data. Nothing moves until the learner acts.
let drawHeight = 520;
let controlHeight = 95;

const TASKS = [
  { name: 'A', t: 1 }, { name: 'B', t: 4 }, { name: 'C', t: 15 },
  { name: 'D', t: 60 }, { name: 'E', t: 240 }, { name: 'F', t: 960 }
];
function chance(t, H) { return 1 / (1 + t / H); }
function pct(p) { return Math.round(p * 100) + '%'; }
function timeText(m) {
  if (m < 60) return (Math.round(m * 10) / 10) + ' min';
  const h = m / 60;
  return (Number.isInteger(h) ? h : h.toFixed(2)) + ' hr';
}

const CONFIG = {
  title: 'Task Horizon Curve Explorer',
  provenance: 'Simplified illustrative model, not METR data. Rule: P = 1 / (1 + t/H), where t is the human working time and H is the 50 percent time horizon.',
  description: 'A success curve on a logarithmic time axis from 1 to 960 minutes for the rule P = 1/(1 + t/H). ' +
    'Three questions come first; then a horizon slider from 15 to 960 minutes moves the curve and six marked tasks.',
  answerHint: 'Type a number (a percent or a number of minutes) and press Check. The horizon slider unlocks after the three questions.',
  passMark: 3,
  passMessage: 'You can turn a horizon into a chance of success.',
  failMessage: 'Press Redo challenges to try for 3 of 3.',
  challenges: [
    { prompt: 'How likely is this model to finish task C?',
      setup: 'The model\'s 50 percent time horizon is H = 60 minutes. Task C takes a skilled human 15 minutes. Give the chance of success as a percent.',
      settings: { H: 60 }, kind: 'number', answer: 80, tol: 2, example: '45', answerText: '80%',
      correctLead: 'Yes: 1/(1 + 15/60) is 0.80.', working: '15 ÷ 60 = 0.25; 1 + 0.25 = 1.25; 1 ÷ 1.25 = 0.80, or 80%.',
      hint: 'Divide the task length by the horizon, add 1, then take the reciprocal.' },
    { prompt: 'At what task length does this model\'s chance reach 80 percent?',
      setup: 'The same model, H = 60 minutes. Give the task length in minutes.',
      settings: { H: 60 }, kind: 'number', answer: 15, tol: 1, example: '30', answerText: '15 minutes',
      correctLead: 'Yes: the 80 percent point is a quarter of the horizon.', working: 'P = 0.8 when 1 + t/H = 1.25, so t/H = 0.25 and t = 60 ÷ 4 = 15 minutes.',
      hint: 'Find the t where t/H equals 0.25.' },
    { prompt: 'A later model has a horizon of H = 240 minutes. How likely is it to finish task D?',
      setup: 'Task D takes a skilled human 60 minutes. Give the chance of success as a percent.',
      settings: { H: 240 }, kind: 'number', answer: 80, tol: 2, example: '45', answerText: '80%',
      correctLead: 'Yes: 1/(1 + 60/240) is 0.80.', working: '60 ÷ 240 = 0.25; 1 ÷ 1.25 = 0.80, or 80%.',
      hint: 'A longer horizon means the same 60-minute task is relatively shorter.' }
  ],
  controls: [
    { key: 'H', type: 'slider', min: 15, max: 960, value: 60, step: 15, labelW: 230,
      aria: 'Model 50 percent time horizon in minutes', label: v => 'Horizon H: ' + v + ' min (' + timeText(v) + ')' }
  ],
  rows: [['H']],

  drawScene(x, y, w, h, locked) {
    const H = ctlValue('H');
    const tableW = 170;
    // Six-task table on the right
    const tx = x + w - tableW;
    const rowH = 25;
    panel(tx, y, tableW, rowH * 7 + 12, 'white', 'silver');
    textSize(15);
    noStroke();
    fill('black');
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text('Task', tx + 10, y + 8);
    text('t', tx + 62, y + 8);
    textAlign(RIGHT, TOP);
    text('Chance', tx + tableW - 10, y + 8);
    textStyle(NORMAL);
    TASKS.forEach((k, i) => {
      const ry = y + 8 + (i + 1) * rowH;
      fill('black');
      textAlign(LEFT, TOP);
      text(k.name, tx + 14, ry);
      text(timeText(k.t), tx + 62, ry);
      textAlign(RIGHT, TOP);
      fill(locked ? 'gray' : 'midnightblue');
      text(locked ? '?' : pct(chance(k.t, H)), tx + tableW - 10, ry);
    });
    if (locked) {
      // No curve until the questions are answered
      const pw = w - tableW - 12;
      panel(x, y, pw, rowH * 7 + 12, 'white', 'silver');
      textBlock('The curve appears after the three questions.\n\nThe rule: P = 1 / (1 + t/H)\nt = the task\'s human working time\nH = the model\'s 50 percent time horizon',
        x + 12, y + 12, pw - 24, 16, { color: 'black' });
      return;
    }

    // Plot on a log time axis
    const px = x + 52, py = y + 18, pw = w - tableW - 12 - 62, ph = h - 62;
    const xOf = t => px + pw * Math.log(t) / Math.log(960);
    const yOf = p => py + ph * (1 - p);
    stroke('gainsboro');
    strokeWeight(1);
    for (const p of [0, 0.2, 0.4, 0.6, 0.8, 1]) line(px, yOf(p), px + pw, yOf(p));
    for (const t of [1, 4, 15, 60, 240, 960]) line(xOf(t), py, xOf(t), py + ph);
    stroke('black');
    line(px, py + ph, px + pw, py + ph);
    line(px, py, px, py + ph);
    noStroke();
    fill('black');
    textSize(13);
    textAlign(RIGHT, CENTER);
    for (const p of [0, 0.2, 0.4, 0.6, 0.8, 1]) text(Math.round(p * 100) + '%', px - 4, yOf(p));
    textAlign(CENTER, TOP);
    for (const t of [1, 4, 15, 60, 240, 960]) text(timeText(t), xOf(t), py + ph + 4);
    textSize(14);
    text('Human working time (log scale)', px + pw / 2, py + ph + 22);
    push();
    translate(x + 10, py + ph / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER);
    text('Chance of success', 0, 0);
    pop();

    // 50% and 80% markers
    const mark = (t, p, col, label) => {
      if (t < 1 || t > 960) return;
      stroke(col);
      strokeWeight(1.5);
      drawingContext.setLineDash([5, 4]);
      line(xOf(t), yOf(p), xOf(t), py + ph);
      line(px, yOf(p), xOf(t), yOf(p));
      drawingContext.setLineDash([]);
      noStroke();
      fill(col);
      textSize(13);
      textAlign(LEFT, TOP);
      text(label, px + 6, yOf(p) + 3);
    };
    mark(H, 0.5, 'firebrick', '50% at H = ' + timeText(H));
    mark(H / 4, 0.8, 'darkorange', '80% at H/4 = ' + timeText(H / 4));

    // The curve
    noFill();
    stroke('steelblue');
    strokeWeight(3);
    beginShape();
    for (let i = 0; i <= 120; i++) {
      const t = Math.exp(Math.log(960) * i / 120);
      vertex(xOf(t), yOf(chance(t, H)));
    }
    endShape();
    // The six tasks
    for (const k of TASKS) {
      const p = chance(k.t, H);
      stroke('white');
      strokeWeight(2);
      fill('midnightblue');
      circle(xOf(k.t), yOf(p), 11);
      noStroke();
      fill('midnightblue');
      textSize(13);
      textAlign(CENTER, BOTTOM);
      text(k.name, xOf(k.t), yOf(p) - 7);
    }
    strokeWeight(1);
    noStroke();
    // Note under the table
    textBlock('No task is ever certain: P only approaches 100% (values are rounded).', tx, y + rowH * 7 + 22, tableW, 14, { color: 'midnightblue', style: ITALIC });
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
