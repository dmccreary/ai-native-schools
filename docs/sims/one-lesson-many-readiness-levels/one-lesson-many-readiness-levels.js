// One Lesson, Many Readiness Levels MicroSim (p5.js)
// CANVAS_HEIGHT: 808
// An illustrative class of 28 students spread across readiness levels 3 to 10. One whole-class
// lesson is pitched at grade level p. A student with readiness r is "in reach" when 0 <= p - r <= 1,
// finds it "too hard" when p - r > 1, and "already knows it" when p - r < 0.
// The learner first predicts (Q1) the pitch that reaches the most students and (Q2) how many it
// reaches. The pitch is locked at 7 until both predictions are checked. Then the pitch slider
// unlocks, every marker shows its state, and the learner answers (Q3) how many students find the
// pitch-7 lesson too hard. Two attempts per question; the score counts first-try answers.
// Reset returns to the opening state. Nothing moves until the learner acts.

// ---- content ----
const LEVELS = [3, 4, 5, 6, 7, 8, 9, 10];
const COUNTS = [1, 2, 4, 6, 7, 5, 2, 1]; // students at each readiness level (28 in all)
const START_PITCH = 7;
const QUESTIONS = [
  { label: 'Q1 best pitch:', text: 'Q1. Which lesson pitch puts the most students in reach?', answer: 7,
    short: 'Q1. Best pitch: 7 (13 students in reach, the most).',
    right: 'Yes: pitch 7 puts 13 students in reach, the most of any pitch.',
    hint: 'Try each pitch and watch the in-reach count; it peaks at one value.',
    reveal: 'The answer is 7. Pitch 7 puts 13 students in reach, the most of any pitch.' },
  { label: 'Q2 in reach:', text: 'Q2. How many students are in reach at that best pitch?', answer: 13,
    short: 'Q2. In reach at pitch 7: 13 of 28, fewer than half.',
    right: 'Right: 13 of 28, fewer than half the class.',
    hint: 'Count the students at readiness 6 and 7 when the pitch is 7.',
    reveal: 'The answer is 13: the 6 students at readiness 6 and the 7 at readiness 7. That is fewer than half the class.' },
  { label: 'Q3 too hard at 7:', text: 'Q3. At pitch 7, how many students find the lesson too hard?', answer: 7,
    right: 'Correct: the 7 students at readiness 3, 4 and 5 are more than one level behind.',
    hint: 'Count students whose readiness is more than one level below the pitch.',
    reveal: 'The answer is 7: the 1, 2 and 4 students at readiness 3, 4 and 5 are more than one level behind.' }
];
const STATE_NAMES = ['In reach', 'Too hard', 'Already known'];
const STATE_COLORS = ['#2e9e5b', '#c0392b', '#6c8ebf'];
const STATE_TEXT = ['lesson at their level or one above', 'lesson more than one level above them', 'lesson below their level: they wait'];

// ---- layout ----
let containerWidth, canvasWidth = 600;
let drawHeight = 620;
let controlHeight = 188;
let canvasHeight = drawHeight + controlHeight;
const margin = 12;
const ROW_H = 44;
let defaultTextSize = 16;

// ---- state ----
let unlocked = false; // the pitch slider unlocks after Q1 and Q2 are checked
let tries = [0, 0, 0];
let done = [false, false, false];
let firstTry = [false, false, false];
let messages = ['', '', ''];
let kinds = ['', '', ''];

// ---- controls ----
let inputs = [];
let checkPredBtn, checkQ3Btn, resetBtn, pitchSlider;

function stateOf(p, r) {
  const d = p - r;
  if (d < 0) return 2;
  if (d <= 1) return 0;
  return 1;
}

function countsFor(p) {
  const c = [0, 0, 0];
  LEVELS.forEach((r, i) => { c[stateOf(p, r)] += COUNTS[i]; });
  return c;
}

function pitch() { return unlocked ? Number(pitchSlider.value()) : START_PITCH; }

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  for (let i = 0; i < 3; i++) {
    const inp = createInput('', 'number');
    inp.attribute('min', '0');
    inp.attribute('max', '28');
    inp.attribute('aria-label', QUESTIONS[i].text);
    inp.style('font-size', '16px');
    inp.style('box-sizing', 'border-box');
    inp.elt.addEventListener('input', () => { refreshControls(); });
    inputs.push(inp);
  }
  checkPredBtn = createButton('Check Q1 and Q2');
  checkPredBtn.elt.addEventListener('click', checkPredictions);
  checkQ3Btn = createButton('Check Q3');
  checkQ3Btn.elt.addEventListener('click', () => checkQuestion(2));
  resetBtn = createButton('Reset');
  resetBtn.elt.addEventListener('click', resetAll);
  pitchSlider = createSlider(3, 10, START_PITCH, 1);
  pitchSlider.attribute('aria-label', 'Lesson pitch, grade level 3 to 10');
  pitchSlider.elt.addEventListener('input', () => redraw());
  [checkPredBtn, checkQ3Btn, resetBtn].forEach(b => { b.style('font-size', '15px'); b.style('padding', '6px 8px'); });

  positionControls();
  refreshControls();
  describe('A class of 28 students shown as markers grouped by readiness level from 3 to 10. A lesson pitch marker sits at grade 7. ' +
    'Predict the pitch that reaches the most students, then unlock the pitch slider to see who is in reach, who finds it too hard, and who already knows it.');
  noLoop();
}

function positionControls() {
  const btnW = 150, inputW = 70;
  const labelW = Math.min(170, canvasWidth - 2 * margin - inputW - btnW - 16);
  const x0 = margin + labelW;
  const y0 = drawHeight + 8;
  inputs[0].position(x0, y0 + 4); inputs[0].size(inputW, 32);
  inputs[1].position(x0, y0 + ROW_H + 4); inputs[1].size(inputW, 32);
  inputs[2].position(x0, y0 + 3 * ROW_H + 4); inputs[2].size(inputW, 32);
  const bx = x0 + inputW + 12;
  const bw = Math.min(btnW + 60, canvasWidth - margin - bx);
  checkPredBtn.position(bx, y0 + 3); checkPredBtn.size(bw, 34);
  resetBtn.position(bx, y0 + ROW_H + 3); resetBtn.size(bw, 34);
  checkQ3Btn.position(bx, y0 + 3 * ROW_H + 3); checkQ3Btn.size(bw, 34);
  const sx = margin + labelW;
  pitchSlider.position(sx, y0 + 2 * ROW_H + 10);
  pitchSlider.size(canvasWidth - margin - sx, 20);
}

function refreshControls() {
  for (let i = 0; i < 2; i++) inputs[i].elt.disabled = done[i];
  checkPredBtn.elt.disabled = (done[0] && done[1]) ||
    (!done[0] && inputs[0].value() === '') || (!done[1] && inputs[1].value() === '');
  pitchSlider.elt.disabled = !unlocked;
  inputs[2].elt.disabled = !unlocked || done[2];
  checkQ3Btn.elt.disabled = !unlocked || done[2] || inputs[2].value() === '';
  redraw();
}

function checkPredictions() {
  for (let i = 0; i < 2; i++) if (!done[i]) grade(i);
  if (done[0] && done[1]) unlocked = true;
  refreshControls();
}

function checkQuestion(i) {
  grade(i);
  refreshControls();
}

function grade(i) {
  const q = QUESTIONS[i];
  const v = Number(inputs[i].value());
  tries[i]++;
  if (v === q.answer) {
    done[i] = true; firstTry[i] = tries[i] === 1;
    messages[i] = q.right; kinds[i] = 'good';
  } else if (tries[i] < 2) {
    messages[i] = 'Not quite. ' + q.hint + ' One more try.'; kinds[i] = 'hint';
  } else {
    done[i] = true; firstTry[i] = false;
    messages[i] = 'Not quite. ' + q.reveal; kinds[i] = 'bad';
    inputs[i].value(q.answer);
  }
}

function resetAll() {
  unlocked = false;
  tries = [0, 0, 0]; done = [false, false, false]; firstTry = [false, false, false];
  messages = ['', '', '']; kinds = ['', '', ''];
  inputs.forEach(inp => inp.value(''));
  pitchSlider.value(START_PITCH);
  refreshControls();
}

function draw() {
  // regions
  fill('aliceblue'); stroke('silver'); strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  noStroke(); fill('black');
  textAlign(CENTER, TOP); textStyle(BOLD);
  textSize(canvasWidth < 500 ? 19 : 22);
  text('One Lesson, Many Readiness Levels', canvasWidth / 2, 8);
  textStyle(NORMAL);
  textSize(15);
  textAlign(LEFT, TOP);
  let y = 40;
  y = drawWrapped(unlocked ? 'Move the pitch slider. Each marker shows whether that student is in reach, finds the lesson too hard, or already knows it.'
                           : 'Where should one lesson be pitched to reach the most students, and how many will it reach? Predict first: the pitch is locked at 7.',
                  margin, y, canvasWidth - 2 * margin, 19) + 6;

  drawClass(y);
  drawQuestions();
  drawControlLabels();
}

function drawClass(top) {
  const p = pitch();
  const panel = { x: margin, y: top, w: canvasWidth - 2 * margin, h: 262 };
  fill('white'); stroke('silver'); strokeWeight(1);
  rect(panel.x, panel.y, panel.w, panel.h, 8);
  noStroke();

  const plotX = panel.x + 10, plotW = panel.w - 20;
  const colW = plotW / LEVELS.length;
  const baseY = panel.y + panel.h - 58;
  const d = Math.min(18, colW * 0.42);
  const pitchI = LEVELS.indexOf(p);

  // in-reach band behind columns p-1 and p
  if (unlocked) {
    fill(46, 158, 91, 40);
    const bi = Math.max(0, pitchI - 1);
    rect(plotX + bi * colW + 2, panel.y + 34, (pitchI - bi + 1) * colW - 4, baseY - panel.y - 30, 6);
  }

  // markers
  for (let i = 0; i < LEVELS.length; i++) {
    const cx = plotX + (i + 0.5) * colW;
    const st = stateOf(p, LEVELS[i]);
    for (let k = 0; k < COUNTS[i]; k++) {
      const cy = baseY - d / 2 - 4 - k * (d + 4);
      fill(unlocked ? STATE_COLORS[st] : 'gray');
      stroke('white'); strokeWeight(1);
      circle(cx, cy, d);
    }
    noStroke(); fill('black');
    textAlign(CENTER, TOP); textSize(14);
    text(LEVELS[i], cx, baseY + 4);
    fill('dimgray'); textSize(12);
    text(COUNTS[i] + (colW > 60 ? (COUNTS[i] === 1 ? ' student' : ' students') : ''), cx, baseY + 20);
  }
  stroke('dimgray'); strokeWeight(1);
  line(plotX, baseY, plotX + plotW, baseY);
  noStroke();

  // pitch marker
  const px = plotX + (pitchI + 0.5) * colW;
  fill(unlocked ? 'navy' : 'dimgray');
  triangle(px - 8, panel.y + 22, px + 8, panel.y + 22, px, panel.y + 32);
  textAlign(CENTER, TOP); textStyle(BOLD); textSize(14);
  text('Lesson pitch: ' + p + (unlocked ? '' : ' (locked)'), constrain(px, panel.x + 90, panel.x + panel.w - 90), panel.y + 5);
  textStyle(NORMAL);

  // axis title and provenance
  fill('dimgray'); textSize(12); textAlign(LEFT, BOTTOM);
  text('Readiness (grade level)', panel.x + 8, panel.y + panel.h - 4);
  textAlign(RIGHT, BOTTOM); textStyle(ITALIC);
  text('Illustrative class', panel.x + panel.w - 8, panel.y + panel.h - 4);
  textStyle(NORMAL);

  // counts row
  const c = countsFor(p);
  const cy = panel.y + panel.h + 8;
  const bw = (panel.w - 16) / 3;
  for (let s = 0; s < 3; s++) {
    const bx = panel.x + s * (bw + 8);
    fill(unlocked ? STATE_COLORS[s] : 'gainsboro');
    rect(bx, cy, bw, 56, 6);
    fill(unlocked ? 'white' : 'black');
    textAlign(CENTER, TOP); textStyle(BOLD);
    const head = STATE_NAMES[s] + ': ' + (unlocked ? c[s] : '?');
    textSize(16);
    while (textWidth(head) > bw - 8 && textSize() > 11) textSize(textSize() - 1);
    text(head, bx + bw / 2, cy + 5);
    textStyle(NORMAL); textSize(canvasWidth < 500 ? 10 : 12);
    text(STATE_TEXT[s], bx + 4, cy + 26, bw - 8);
  }
  questionsTop = cy + 64;
}

let questionsTop = 400;

function drawQuestions() {
  const r = { x: margin, y: questionsTop, w: canvasWidth - 2 * margin, h: drawHeight - questionsTop - 8 };
  fill('white'); stroke('silver'); strokeWeight(1);
  rect(r.x, r.y, r.w, r.h, 8);
  noStroke();
  let y = r.y + 8;
  textAlign(LEFT, TOP);
  const allDone = done[0] && done[1] && done[2];
  const ts = canvasWidth < 500 ? 13 : 14, lh = ts + 4;
  for (let i = 0; i < 3; i++) {
    const locked = i === 2 && !unlocked;
    textStyle(BOLD); textSize(ts);
    fill(locked ? 'gray' : 'black');
    const mark = done[i] ? (firstTry[i] ? '  ✓' : '  ✗') : '';
    if (i < 2 && unlocked) { // once the slider unlocks, the checked predictions shrink to one line each
      y = drawWrapped(QUESTIONS[i].short + mark, r.x + 10, y, r.w - 20, lh) + 2;
      continue;
    }
    y = drawWrapped(QUESTIONS[i].text + (locked ? ' (unlocks after Q1 and Q2)' : '') + mark, r.x + 10, y, r.w - 20, lh);
    textStyle(NORMAL);
    if (messages[i]) {
      fill(kinds[i] === 'good' ? 'darkgreen' : kinds[i] === 'bad' ? 'firebrick' : '#8a5a00');
      y = drawWrapped(messages[i], r.x + 10, y, r.w - 20, lh);
    }
    y += 4;
  }
  if (allDone) {
    const score = firstTry.filter(Boolean).length;
    textStyle(BOLD); fill(score === 3 ? 'darkgreen' : 'black');
    drawWrapped('Score: ' + score + ' of 3 on the first try. ' +
      (score === 3 ? 'No single pitch reaches more than 13 of 28 students.' : 'Mastery is 3 of 3. Press Reset to try again.'),
      r.x + 10, y, r.w - 20, lh);
    textStyle(NORMAL);
  }
}

function drawControlLabels() {
  noStroke(); fill('black'); textSize(15); textAlign(LEFT, CENTER);
  const y0 = drawHeight + 8;
  fill(done[0] ? 'dimgray' : 'black'); text(QUESTIONS[0].label, margin, y0 + ROW_H / 2);
  fill(done[1] ? 'dimgray' : 'black'); text(QUESTIONS[1].label, margin, y0 + ROW_H + ROW_H / 2);
  fill(unlocked ? 'black' : 'gray');
  textStyle(BOLD);
  text('Pitch: ' + pitch() + (unlocked ? '' : ' (locked)'), margin, y0 + 2 * ROW_H + ROW_H / 2);
  textStyle(NORMAL);
  fill(unlocked && !done[2] ? 'black' : 'gray');
  text(QUESTIONS[2].label, margin, y0 + 3 * ROW_H + ROW_H / 2);
}

// word wrap helper; returns the y below the last line
function drawWrapped(str, x, y, maxW, lineH) {
  const words = str.split(' ');
  let line = '';
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    if (textWidth(test) > maxW && line) { text(line, x, y); y += lineH; line = w; }
    else line = test;
  }
  if (line) { text(line, x, y); y += lineH; }
  return y;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) containerWidth = container.getBoundingClientRect().width;
  canvasWidth = Math.max(360, Math.floor(containerWidth || windowWidth));
}
