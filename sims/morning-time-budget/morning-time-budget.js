// Morning Time Budget MicroSim (p5.js)
// CANVAS_HEIGHT: 670
// A five-period academic morning takes 250 minutes a day (the illustrative Chapter 2 schedule:
// 50 minutes settling and wrap-up, 100 explanation, 100 practice). A compressed morning keeps
// some settling, explanation, and practice time and frees the rest.
//   compressed = settling + explanation + practice
//   freed per day = 250 - compressed (0 if compressed > 250)
//   hours freed per year = freed per day x school days / 60
//   school days freed = freed minutes per year / (length of school day in hours x 60)
//   required speedup = 250 / compressed
// The learner first answers three questions (two tries each, fixed order). Only then do the
// sliders unlock for exploration. The settings are an illustrative scenario, not evidence.
// Nothing moves until the learner acts. Reset returns the sliders to their defaults.

let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 240;
let canvasHeight = drawHeight + controlHeight;
let margin = 12;
let sliderLeftMargin = 250;
let defaultTextSize = 16;

const BASELINE = 250; // minutes of academic periods per day
const BASE_PARTS = [50, 100, 100]; // settling, explanation, practice in today's morning
const PART_NAMES = ['Settling', 'Explanation', 'Practice'];
const PART_COLORS = ['silver', 'steelblue', 'seagreen'];

// Slider definitions: label, min, max, step, default, unit
const INPUTS = [
  { label: 'Settling and wrap-up', min: 0, max: 50, step: 5, def: 10, unit: ' min' },
  { label: 'Explanation', min: 0, max: 100, step: 5, def: 50, unit: ' min' },
  { label: 'Practice', min: 0, max: 150, step: 5, def: 90, unit: ' min' },
  { label: 'School days per year', min: 150, max: 200, step: 10, def: 180, unit: '' },
  { label: 'Length of school day', min: 6, max: 7, step: 0.5, def: 6.5, unit: ' h' }
];

// The three questions, answered before the controls unlock
const QUESTIONS = [
  { text: 'Q1. Settling 10, explanation 50, practice 90 minutes. How many minutes are freed per day?',
    settings: [10, 50, 90], answer: 100, tol: 1, unit: 'minutes',
    working: '10 + 50 + 90 = 150 minutes. 250 - 150 = 100 minutes freed per day.',
    hint: 'Add the three parts of the compressed morning, then subtract from 250.' },
  { text: 'Q2. Same settings, 180 school days. How many hours are freed per year?',
    settings: [10, 50, 90], answer: 300, tol: 1, unit: 'hours',
    working: '100 minutes x 180 days = 18,000 minutes. 18,000 / 60 = 300 hours.',
    hint: 'Add the three parts of the compressed morning, then subtract from 250. Multiply by 180 days, then divide by 60.' },
  { text: 'Q3. Settling 10, explanation 70, practice 110, with 180 days and a 6.5-hour day. How many school days are freed per year?',
    settings: [10, 70, 110], answer: 27.7, tol: 0.1, unit: 'days',
    working: '10 + 70 + 110 = 190. 250 - 190 = 60 minutes a day. 60 x 180 = 10,800 minutes. A 6.5-hour day is 390 minutes. 10,800 / 390 = 27.7 days.',
    hint: 'Add the three parts of the compressed morning, then subtract from 250. Multiply by 180 days, then divide by the 390 minutes in a 6.5-hour day.' }
];

let sliders = [];
let answerInput, checkButton, nextButton, resetButton;
let qIndex = 0; // which question is showing
let tries = 0; // checks on the current question
let qDone = false; // current question resolved (right, or two misses)
let score = 0; // first-try correct answers
let unlocked = false; // controls unlock after all three questions
let feedback = null; // { lead, body, kind: 'good' | 'bad' | 'hint' }

function setup() {
  updateCanvasSize(); // must be first: get the container width
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create every control before positioning any of them
  for (const inp of INPUTS) {
    const s = createSlider(inp.min, inp.max, inp.def, inp.step);
    s.parent(document.querySelector('main'));
    s.attribute('aria-label', inp.label);
    s.input(() => redraw());
    sliders.push(s);
  }
  answerInput = createInput('', 'text');
  answerInput.parent(document.querySelector('main'));
  answerInput.attribute('inputmode', 'decimal');
  answerInput.attribute('aria-label', 'Your answer');
  answerInput.input(() => { checkButton.elt.disabled = answerValue() === null || qDone; });
  answerInput.elt.addEventListener('keydown', e => { if (e.key === 'Enter' && !checkButton.elt.disabled) checkAnswer(); });
  checkButton = createButton('Check');
  checkButton.parent(document.querySelector('main'));
  checkButton.mousePressed(checkAnswer);
  nextButton = createButton('Next question');
  nextButton.parent(document.querySelector('main'));
  nextButton.mousePressed(nextQuestion);
  resetButton = createButton('Reset sliders');
  resetButton.parent(document.querySelector('main'));
  resetButton.mousePressed(resetSliders);

  showQuestion();
  positionControls();
  describe('Morning Time Budget. Answer three questions about how much time a compressed academic morning frees, ' +
    'then use five sliders to see the freed minutes, hours, school days, and the required speedup.', LABEL);
  noLoop(); // redraw only when the learner acts
}

function draw() {
  updateCanvasSize();
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(24);
  text('Morning Time Budget', canvasWidth / 2, 8);
  textStyle(ITALIC);
  textSize(14);
  fill('dimgray');
  let sub = 'Illustrative scenario, not evidence. Baseline: 250 minutes of academic periods a day.';
  if (textWidth(sub) > canvasWidth - 2 * margin) sub = 'Illustrative scenario, not evidence.';
  text(sub, canvasWidth / 2, 38);
  textStyle(NORMAL);

  const v = values();
  drawBars(v, margin, 62, canvasWidth - 2 * margin);

  const panelY = 178;
  const panelH = drawHeight - panelY - margin;
  const wide = canvasWidth >= 600;
  const leftW = wide ? Math.floor((canvasWidth - 3 * margin) * 0.52) : canvasWidth - 2 * margin;
  if (wide) {
    drawQuestionPanel(margin, panelY, leftW, panelH);
    drawResults(v, 2 * margin + leftW, panelY, canvasWidth - 3 * margin - leftW, panelH);
  } else if (unlocked) {
    drawResults(v, margin, panelY, leftW, panelH);
  } else {
    drawQuestionPanel(margin, panelY, leftW, panelH);
  }
  drawControlLabels();
}

// Current settings: the scenario of the current question until unlocked, then the sliders
function settings() {
  if (!unlocked) {
    const q = QUESTIONS[qIndex];
    return { parts: q.settings, days: 180, hours: 6.5 };
  }
  return { parts: [sliders[0].value(), sliders[1].value(), sliders[2].value()], days: sliders[3].value(), hours: sliders[4].value() };
}

function values() {
  const s = settings();
  const compressed = s.parts[0] + s.parts[1] + s.parts[2];
  const freedDay = Math.max(0, BASELINE - compressed);
  const freedYearMin = freedDay * s.days;
  return {
    parts: s.parts, days: s.days, hours: s.hours, compressed: compressed, freedDay: freedDay,
    hoursYear: freedYearMin / 60, daysFreed: freedYearMin / (s.hours * 60),
    speedup: compressed > 0 ? BASELINE / compressed : null
  };
}

// Two stacked bars on one minute scale: today's 250-minute morning and the compressed one
function drawBars(v, x, y, w) {
  const labelW = 110;
  const scaleMax = Math.max(BASELINE, v.compressed);
  const barW = w - labelW - 10;
  const px = m => (m / scaleMax) * barW;
  const barH = 34;
  textSize(15);
  const rows = [
    { name: 'Today', parts: BASE_PARTS, total: BASELINE },
    { name: 'Compressed', parts: v.parts, total: v.compressed }
  ];
  rows.forEach((r, k) => {
    const by = y + k * (barH + 12);
    noStroke();
    fill('black');
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    text(r.name, x, by + barH / 2 - 8);
    textStyle(NORMAL);
    fill('dimgray');
    text(r.total + ' min', x, by + barH / 2 + 10);
    let bx = x + labelW;
    r.parts.forEach((m, i) => {
      if (m <= 0) return;
      fill(PART_COLORS[i]);
      stroke('white');
      rect(bx, by, px(m), barH);
      noStroke();
      fill(i === 0 ? 'black' : 'white');
      textAlign(CENTER, CENTER);
      if (px(m) > 30) text(m, bx + px(m) / 2, by + barH / 2);
      bx += px(m);
    });
    if (k === 1 && v.freedDay > 0) {
      // the freed time: an outlined gap up to the 250-minute mark
      noFill();
      stroke('darkorange');
      strokeWeight(2);
      drawingContext.setLineDash([6, 4]);
      rect(bx, by, px(v.freedDay), barH);
      drawingContext.setLineDash([]);
      strokeWeight(1);
      noStroke();
      fill('darkorange');
      textAlign(CENTER, CENTER);
      textStyle(BOLD);
      const lbl = unlocked ? 'freed ' + v.freedDay : 'freed ?';
      if (px(v.freedDay) > textWidth(lbl) + 6) text(lbl, bx + px(v.freedDay) / 2, by + barH / 2);
      textStyle(NORMAL);
    }
  });
  // legend
  let lx = w < 560 ? x : x + labelW; // narrow screens start the legend at the left edge
  const ly = y + 2 * (barH + 12) + 4;
  textSize(14);
  for (let i = 0; i < 3; i++) {
    fill(PART_COLORS[i]);
    noStroke();
    rect(lx, ly, 14, 14);
    fill('black');
    textAlign(LEFT, TOP);
    text(PART_NAMES[i], lx + 18, ly);
    lx += textWidth(PART_NAMES[i]) + 28;
  }
  stroke('darkorange');
  noFill();
  drawingContext.setLineDash([4, 3]);
  rect(lx, ly, 14, 14);
  drawingContext.setLineDash([]);
  noStroke();
  fill('black');
  text('Freed time', lx + 18, ly);
}

function drawQuestionPanel(x, y, w, h) {
  const kind = feedback ? feedback.kind : 'none';
  fill(kind === 'good' ? 'honeydew' : kind === 'bad' ? 'mistyrose' : kind === 'hint' ? 'lemonchiffon' : 'white');
  stroke(kind === 'good' ? 'seagreen' : kind === 'bad' ? 'firebrick' : kind === 'hint' ? 'darkgoldenrod' : 'slategray');
  strokeWeight(kind === 'none' ? 1 : 2);
  rect(x, y, w, h, 10);
  noStroke();
  strokeWeight(1);
  textAlign(LEFT, TOP);
  textSize(15);
  const tx = x + 10;
  const tw = w - 20;
  let ty = y + 8;
  fill('black');
  textStyle(BOLD);
  if (unlocked) {
    ty = wrapText('Score: ' + score + ' of 3', tx, ty, tw);
    textStyle(NORMAL);
    ty = wrapText(score === 3 ? 'All three right on the first try.' : 'Your score is set. Now explore with the sliders.', tx, ty, tw) + 6;
    ty = wrapText('The sliders are unlocked. Shorten the morning and watch the required speedup rise. Then keep more explanation and practice and watch the freed time shrink.', tx, ty, tw);
    return;
  }
  ty = wrapText('How much time does a shorter morning free up?   Score: ' + score + ' of 3', tx, ty, tw) + 4;
  textStyle(NORMAL);
  ty = wrapText(QUESTIONS[qIndex].text, tx, ty, tw) + 6;
  if (feedback) {
    textStyle(BOLD);
    fill(kind === 'good' ? 'darkgreen' : kind === 'bad' ? 'firebrick' : 'saddlebrown');
    ty = wrapText(feedback.lead, tx, ty, tw);
    textStyle(NORMAL);
    fill('black');
    wrapText(feedback.body, tx, ty, tw);
  } else {
    fill('dimgray');
    wrapText('Type your answer below and press Check. You get two tries. The sliders unlock after all three questions.', tx, ty, tw);
  }
}

function drawResults(v, x, y, w, h) {
  fill('white');
  stroke('silver');
  rect(x, y, w, h, 10);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(15);
  const tx = x + 10;
  const tw = w - 20;
  let ty = y + 8;
  fill('black');
  textStyle(BOLD);
  ty = wrapText(unlocked ? 'Results for the slider settings' : 'Results (shown after the questions)', tx, ty, tw) + 4;
  textStyle(NORMAL);
  const show = (s) => unlocked ? s : '?';
  const rows = [
    ['Compressed morning', v.compressed + ' min', 'settling + explanation + practice'],
    ['Freed per day', show(v.freedDay + ' min'), '250 - compressed'],
    ['Hours freed per year', show(Math.round(v.hoursYear) + ' h'), 'freed per day x days / 60'],
    ['School days freed', show(v.daysFreed.toFixed(1)), 'minutes per year / (day length x 60)'],
    ['Required speedup', show(v.speedup === null ? 'none' : v.speedup.toFixed(2) + 'x'), '250 / compressed']
  ];
  for (const r of rows) {
    fill('black');
    textStyle(BOLD);
    text(r[0] + ':', tx, ty);
    textAlign(RIGHT, TOP);
    fill(unlocked ? 'navy' : 'dimgray');
    text(r[1], tx + tw, ty);
    textAlign(LEFT, TOP);
    textStyle(NORMAL);
    fill('dimgray');
    textSize(13);
    ty = wrapText(r[2], tx, ty + 18, tw) + 3;
    textSize(15);
  }
  if (unlocked && v.compressed >= BASELINE) {
    fill('firebrick');
    textStyle(BOLD);
    wrapText('No time is freed.', tx, ty, tw);
    textStyle(NORMAL);
  }
}

function drawControlLabels() {
  noStroke();
  fill(unlocked ? 'black' : 'dimgray');
  textAlign(LEFT, CENTER);
  textSize(15);
  const s = settings();
  const shown = [s.parts[0], s.parts[1], s.parts[2], s.days, s.hours];
  for (let i = 0; i < INPUTS.length; i++) {
    const y = drawHeight + 60 + i * 34 + 10;
    text(INPUTS[i].label + ': ' + shown[i] + INPUTS[i].unit, margin, y);
  }
  if (!unlocked) {
    fill('black');
    textStyle(BOLD);
    text('Your answer:', margin, drawHeight + 25);
    textStyle(NORMAL);
  }
}

// Wrap text to width w with a 19px line height; returns the y below the last line
function wrapText(str, x, y, w) {
  const words = str.split(' ');
  let line = '';
  for (const word of words) {
    const t = line ? line + ' ' + word : word;
    if (line && textWidth(t) > w) { text(line, x, y); y += 19; line = word; } else line = t;
  }
  if (line) { text(line, x, y); y += 19; }
  return y;
}

function answerValue() {
  const raw = String(answerInput.value()).replace(/,/g, '').trim();
  if (raw === '' || isNaN(Number(raw))) return null;
  return Number(raw);
}

function checkAnswer() {
  if (qDone || unlocked) return;
  const val = answerValue();
  if (val === null) return;
  const q = QUESTIONS[qIndex];
  tries++;
  if (Math.abs(val - q.answer) <= q.tol + 1e-9) {
    if (tries === 1) score++;
    feedback = { lead: 'Correct: ' + q.answer + ' ' + q.unit + '.', body: q.working, kind: 'good' };
    qDone = true;
  } else if (tries < 2) {
    feedback = { lead: 'Not quite.', body: q.hint, kind: 'hint' };
  } else {
    feedback = { lead: 'Not quite. The answer is ' + q.answer + ' ' + q.unit + '.', body: q.working, kind: 'bad' };
    qDone = true;
  }
  refreshControls();
  redraw();
}

function nextQuestion() {
  if (!qDone) return;
  if (qIndex < QUESTIONS.length - 1) {
    qIndex++;
    showQuestion();
  } else {
    unlocked = true;
    feedback = null;
    sliders.forEach((sl, i) => sl.value(INPUTS[i].def)); // explore from the default settings
    refreshControls();
  }
  redraw();
}

function showQuestion() {
  tries = 0;
  qDone = false;
  feedback = null;
  answerInput.value('');
  // the locked sliders show the question's scenario
  QUESTIONS[qIndex].settings.forEach((m, i) => sliders[i].value(m));
  refreshControls();
}

function resetSliders() {
  sliders.forEach((s, i) => s.value(INPUTS[i].def));
  redraw();
}

function refreshControls() {
  sliders.forEach(s => { s.elt.disabled = !unlocked; });
  if (unlocked) {
    answerInput.hide();
    checkButton.hide();
    nextButton.hide();
    resetButton.show();
  } else {
    answerInput.show();
    checkButton.show();
    nextButton.show();
    resetButton.hide();
    answerInput.elt.disabled = qDone;
    checkButton.elt.disabled = qDone || answerValue() === null;
    nextButton.elt.disabled = !qDone;
    nextButton.html(qIndex === QUESTIONS.length - 1 ? 'Unlock the sliders' : 'Next question');
  }
}

function positionControls() {
  const row1 = drawHeight + 10;
  answerInput.position(margin + 105, row1);
  answerInput.size(90, 28);
  checkButton.position(margin + 210, row1);
  checkButton.size(80, 32);
  nextButton.position(margin + 300, row1);
  nextButton.size(Math.min(150, canvasWidth - margin - 300 - margin), 32); // shrinks on a narrow screen
  resetButton.position(margin, row1);
  resetButton.size(130, 32);
  const sw = Math.max(80, canvasWidth - sliderLeftMargin - margin);
  sliders.forEach((s, i) => {
    s.position(sliderLeftMargin, drawHeight + 60 + i * 34);
    s.size(sw);
  });
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = Math.floor(container.getBoundingClientRect().width);
}
