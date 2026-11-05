// Seat Time vs. Mastery MicroSim (p5.js)
// CANVAS_HEIGHT: 832
// Twenty students need different numbers of hours to master a course (illustrative data). With a
// fixed course length L, a student masters the course when hours needed <= L. Idle hours are the sum
// of (L - hours needed) over students who master; hours still needed are the sum of
// (hours needed - L) over students who do not. The learner first commits three answers with L
// locked at 150: Q1 how many master a 150-hour course, Q2 the total idle hours, Q3 how many master a
// 200-hour course. Two attempts each; the score counts first tries. Then the course-length slider
// (60 to 300) and the mastery-based view unlock. Reset returns to the opening state.

// ---- content ----
const HOURS = [70, 80, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 150, 160, 170, 185, 200, 230, 260];
const START_L = 150;
const QUESTIONS = [
  { label: 'Q1 master at 150:', text: 'Q1. How many of the 20 students master a 150-hour course?', answer: 14,
    right: 'Yes: 14 students need 150 hours or fewer.',
    hint: 'Count the students whose hours needed are at most 150.',
    reveal: 'The answer is 14: students 1 to 14 need 150 hours or fewer.',
    short: 'Q1: 14 students need 150 hours or fewer' },
  { label: 'Q2 idle hours:', text: 'Q2. What is the total of idle hours among the students who master it?', answer: 535,
    right: 'Right: 535 idle hours.',
    hint: 'For each student who masters, subtract hours needed from 150, then add the results.',
    reveal: 'The answer is 535: 80 + 70 + 60 + 55 + 50 + 45 + 40 + 35 + 30 + 25 + 20 + 15 + 10 + 0.',
    short: 'Q2: 535 idle hours at 150' },
  { label: 'Q3 master at 200:', text: 'Q3. How many students master a 200-hour course?', answer: 18,
    right: 'Yes: 18 students need 200 hours or fewer.',
    hint: 'Count the students whose hours needed are at most 200.',
    reveal: 'The answer is 18: only the students who need 230 and 260 hours fall short.',
    short: 'Q3: 18 students need 200 hours or fewer' }
];

// ---- layout ----
let containerWidth, canvasWidth = 600;
let drawHeight = 600;
let controlHeight = 232;
let canvasHeight = drawHeight + controlHeight;
const margin = 12;
const ROW_H = 44;

// ---- state ----
let unlocked = false;
let tries = [0, 0, 0], done = [false, false, false], firstTry = [false, false, false];
let messages = ['', '', ''], kinds = ['', '', ''];

// ---- controls ----
let inputs = [], checkBtn, resetBtn, lengthSlider, masteryBox;

function L() { return unlocked ? Number(lengthSlider.value()) : START_L; }
function masteryView() { return unlocked && masteryBox.checked(); }
function stats(len) {
  const m = HOURS.filter(h => h <= len);
  return {
    master: m.length, not: HOURS.length - m.length,
    idle: m.reduce((a, h) => a + len - h, 0),
    still: HOURS.filter(h => h > len).reduce((a, h) => a + h - len, 0)
  };
}
const fmt = n => n.toLocaleString('en-US');

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(16);
  for (let i = 0; i < 3; i++) {
    const inp = createInput('', 'number');
    inp.attribute('aria-label', QUESTIONS[i].text);
    inp.style('font-size', '16px');
    inp.style('box-sizing', 'border-box');
    inp.elt.addEventListener('input', refreshControls);
    inputs.push(inp);
  }
  checkBtn = createButton('Check answers');
  checkBtn.elt.addEventListener('click', checkAll);
  resetBtn = createButton('Reset');
  resetBtn.elt.addEventListener('click', resetAll);
  [checkBtn, resetBtn].forEach(b => { b.style('font-size', '15px'); b.style('padding', '6px 8px'); });
  lengthSlider = createSlider(60, 300, START_L, 10);
  lengthSlider.attribute('aria-label', 'Course length in hours, 60 to 300');
  lengthSlider.elt.addEventListener('input', () => redraw());
  masteryBox = createCheckbox(' Mastery-based view: every student takes the hours they need', false);
  masteryBox.style('font-family', 'Arial, Helvetica, sans-serif');
  masteryBox.style('font-size', '15px');
  masteryBox.changed(() => redraw());
  positionControls();
  refreshControls();
  describe('Bars show the hours each of 20 students needs to master a course, with a line at the course length of 150 hours. ' +
    'Answer three questions, then move the course length and switch to the mastery-based view.');
  noLoop();
}

function positionControls() {
  const inputW = 80, labelW = 160;
  const btnW = Math.min(190, canvasWidth - 2 * margin - labelW - inputW - 12);
  const y0 = drawHeight + 8;
  for (let i = 0; i < 3; i++) { inputs[i].position(margin + labelW, y0 + i * ROW_H + 4); inputs[i].size(inputW, 32); }
  const bx = margin + labelW + inputW + 12;
  checkBtn.position(bx, y0 + 3); checkBtn.size(btnW, 34);
  resetBtn.position(bx, y0 + ROW_H + 3); resetBtn.size(btnW, 34);
  lengthSlider.position(margin + labelW, y0 + 3 * ROW_H + 10);
  lengthSlider.size(canvasWidth - 2 * margin - labelW, 20);
  masteryBox.position(margin, y0 + 4 * ROW_H + 8);
}

function refreshControls() {
  for (let i = 0; i < 3; i++) inputs[i].elt.disabled = done[i];
  const pending = [0, 1, 2].filter(i => !done[i]);
  checkBtn.elt.disabled = pending.length === 0 || pending.some(i => inputs[i].value() === '');
  lengthSlider.elt.disabled = !unlocked;
  masteryBox.elt.querySelector('input').disabled = !unlocked;
  redraw();
}

function checkAll() {
  for (let i = 0; i < 3; i++) {
    if (done[i]) continue;
    const q = QUESTIONS[i];
    tries[i]++;
    if (Number(inputs[i].value()) === q.answer) { done[i] = true; firstTry[i] = tries[i] === 1; messages[i] = q.right; kinds[i] = 'good'; }
    else if (tries[i] < 2) { messages[i] = 'Not quite. ' + q.hint + ' One more try.'; kinds[i] = 'hint'; }
    else { done[i] = true; firstTry[i] = false; messages[i] = 'Not quite. ' + q.reveal; kinds[i] = 'bad'; inputs[i].value(q.answer); }
  }
  if (done.every(Boolean)) unlocked = true;
  refreshControls();
}

function resetAll() {
  unlocked = false; tries = [0, 0, 0]; done = [false, false, false]; firstTry = [false, false, false];
  messages = ['', '', '']; kinds = ['', '', ''];
  inputs.forEach(inp => inp.value(''));
  lengthSlider.value(START_L);
  masteryBox.checked(false);
  refreshControls();
}

function draw() {
  fill('aliceblue'); stroke('silver'); strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
  noStroke(); fill('black');
  textAlign(CENTER, TOP); textStyle(BOLD); textSize(canvasWidth < 500 ? 19 : 22);
  text('Seat Time vs. Mastery', canvasWidth / 2, 8);
  textStyle(NORMAL); textSize(15); textAlign(LEFT, TOP);
  const prompt = unlocked
    ? 'Move the course length, then tick the mastery-based view. Can any fixed length leave zero idle hours and zero students who have not mastered the course?'
    : 'If every student must spend the same 150 hours, who masters the course, and how many hours are wasted? Answer Q1 to Q3 first: the length is locked at 150.';
  const y = drawWrapped(prompt, margin, 40, canvasWidth - 2 * margin, 19) + 6;
  const chart = { x: margin, y: y, w: canvasWidth - 2 * margin, h: 250 };
  drawChart(chart);
  const statsTop = chart.y + chart.h + 8;
  drawStats(statsTop);
  drawQuestions(statsTop + 64);
  drawControlLabels();
}

function drawChart(r) {
  fill('white'); stroke('silver'); strokeWeight(1);
  rect(r.x, r.y, r.w, r.h, 8);
  const len = L(), mv = masteryView();
  const plot = { x: r.x + 44, y: r.y + 22, w: r.w - 56, h: r.h - 58 };
  const maxH = 300;
  const yOf = v => plot.y + plot.h - v / maxH * plot.h;
  textSize(11); textAlign(RIGHT, CENTER);
  for (let v = 0; v <= maxH; v += 50) {
    stroke('#eee'); line(plot.x, yOf(v), plot.x + plot.w, yOf(v));
    noStroke(); fill('dimgray'); text(v, plot.x - 4, yOf(v));
  }
  const n = HOURS.length, bw = plot.w / n;
  for (let i = 0; i < n; i++) {
    const h = HOURS[i];
    const x = plot.x + i * bw + bw * 0.15, w = bw * 0.7;
    noStroke();
    if (!unlocked) {
      fill('#8a9bb0'); rect(x, yOf(h), w, yOf(0) - yOf(h));
    } else if (mv) {
      fill('#2e9e5b'); rect(x, yOf(h), w, yOf(0) - yOf(h));
    } else if (h <= len) {
      fill('#2e9e5b'); rect(x, yOf(h), w, yOf(0) - yOf(h));
      fill('#d9d9d9'); rect(x, yOf(len), w, yOf(h) - yOf(len)); // idle
    } else {
      fill('#e9a03b'); rect(x, yOf(len), w, yOf(0) - yOf(len)); // time spent
      noFill(); stroke('#c0392b'); strokeWeight(1.5);
      drawingContext.setLineDash([3, 2]);
      rect(x, yOf(h), w, yOf(len) - yOf(h)); // still needed
      drawingContext.setLineDash([]);
      noStroke();
    }
    if (bw > 22 || i % 2 === 0) { fill('black'); textAlign(CENTER, TOP); textSize(10); text(i + 1, x + w / 2, plot.y + plot.h + 3); }
    if (!unlocked && bw > 26) { fill('dimgray'); textAlign(CENTER, BOTTOM); textSize(10); text(h, x + w / 2, yOf(h) - 1); }
  }
  if (!mv) {
    stroke('navy'); strokeWeight(2);
    line(plot.x, yOf(len), plot.x + plot.w, yOf(len));
    noStroke(); fill('navy'); textStyle(BOLD); textSize(12); textAlign(LEFT, BOTTOM);
    text('Course length: ' + len + ' h' + (unlocked ? '' : ' (locked)'), plot.x + 4, yOf(len) - 2);
    textStyle(NORMAL);
  }
  fill('black'); textSize(12); textAlign(LEFT, TOP);
  text('Student (sorted by hours needed)', plot.x, plot.y + plot.h + 16);
  push(); translate(r.x + 12, plot.y + plot.h / 2); rotate(-HALF_PI); textAlign(CENTER, CENTER); text('Hours', 0, 0); pop();
  fill('dimgray'); textStyle(ITALIC); textSize(11); textAlign(RIGHT, TOP);
  text('Illustrative data, not measured', r.x + r.w - 6, plot.y + plot.h + 17);
  textStyle(NORMAL);
  // legend
  if (unlocked) {
    const items = mv ? [['#2e9e5b', 'Hours needed (each student finishes)']]
                     : [['#2e9e5b', 'Mastered'], ['#d9d9d9', 'Idle'], ['#e9a03b', 'Not mastered'], [null, 'Still needed']];
    let lx = r.x + 8;
    textAlign(LEFT, TOP); textSize(canvasWidth < 500 ? 10 : 11);
    for (const [c, t] of items) {
      if (c) { fill(c); noStroke(); rect(lx, r.y + 5, 10, 10); }
      else { noFill(); stroke('#c0392b'); drawingContext.setLineDash([3, 2]); rect(lx, r.y + 5, 10, 10); drawingContext.setLineDash([]); noStroke(); }
      fill('black'); text(t, lx + 14, r.y + 4);
      lx += textWidth(t) + (canvasWidth < 500 ? 18 : 28);
    }
  }
}

function drawStats(y) {
  const len = L(), s = stats(len), mv = masteryView();
  const boxes = mv
    ? [['Students who master', '20 of 20'], ['Mastery-based total', fmt(2770) + ' h'], ['Mean per student', '138.5 h'], ['Fixed total (20 × ' + len + ')', fmt(20 * len) + ' h']]
    : [['Master', unlocked ? s.master + ' of 20' : '?'], ['Do not master', unlocked ? String(s.not) : '?'],
       ['Idle hours', unlocked ? fmt(s.idle) : '?'], ['Hours still needed', unlocked ? fmt(s.still) : '?']];
  const bw = (canvasWidth - 2 * margin - 24) / 4;
  for (let i = 0; i < 4; i++) {
    const x = margin + i * (bw + 8);
    fill(unlocked ? 'white' : 'gainsboro'); stroke('silver'); strokeWeight(1);
    rect(x, y, bw, 54, 6);
    noStroke(); fill('dimgray'); textAlign(CENTER, TOP); textSize(canvasWidth < 500 ? 10 : 12);
    text(boxes[i][0], x + 3, y + 5, bw - 6);
    fill('black'); textStyle(BOLD); textSize(canvasWidth < 500 ? 15 : 18);
    text(boxes[i][1], x + bw / 2, y + 28);
    textStyle(NORMAL);
  }
}

function drawQuestions(top) {
  const r = { x: margin, y: top, w: canvasWidth - 2 * margin, h: drawHeight - top - 8 };
  fill('white'); stroke('silver'); strokeWeight(1);
  rect(r.x, r.y, r.w, r.h, 8);
  noStroke(); textAlign(LEFT, TOP);
  const ts = canvasWidth < 500 ? 12.5 : 14, lh = ts + 4;
  let y = r.y + 8;
  if (unlocked) {
    const score = firstTry.filter(Boolean).length;
    textSize(ts); textStyle(BOLD); fill(score === 3 ? 'darkgreen' : 'black');
    y = drawWrapped('Score: ' + score + ' of 3 on the first try. ' + (score === 3 ? '' : 'Mastery is 3 of 3; press Reset to try again.'), r.x + 10, y, r.w - 20, lh);
    textStyle(NORMAL); fill('black');
    for (let i = 0; i < 3; i++) {
      fill(firstTry[i] ? 'darkgreen' : 'firebrick');
      y = drawWrapped((firstTry[i] ? '✓ ' : '✗ ') + QUESTIONS[i].short + (firstTry[i] ? '.' : ' (not on the first try).'), r.x + 10, y, r.w - 20, lh);
    }
    fill('black');
    y += 4;
    [150, 200].forEach(len => {
      const s = stats(len);
      y = drawWrapped('Check, L = ' + len + ': ' + s.master + ' master, ' + s.not + ' do not, ' + fmt(s.idle) + ' idle h, ' + fmt(s.still) + ' h still needed.', r.x + 10, y, r.w - 20, lh);
    });
    return;
  }
  for (let i = 0; i < 3; i++) {
    textStyle(BOLD); textSize(ts); fill('black');
    y = drawWrapped(QUESTIONS[i].text + (done[i] ? (firstTry[i] ? '  ✓' : '  ✗') : ''), r.x + 10, y, r.w - 20, lh);
    textStyle(NORMAL);
    if (messages[i]) {
      fill(kinds[i] === 'good' ? 'darkgreen' : kinds[i] === 'bad' ? 'firebrick' : '#8a5a00');
      y = drawWrapped(messages[i], r.x + 10, y, r.w - 20, lh);
    }
    y += 3;
  }
}

function drawControlLabels() {
  noStroke(); textSize(15); textAlign(LEFT, CENTER);
  const y0 = drawHeight + 8;
  for (let i = 0; i < 3; i++) { fill(done[i] ? 'gray' : 'black'); text(QUESTIONS[i].label, margin, y0 + i * ROW_H + ROW_H / 2); }
  fill(unlocked ? 'black' : 'gray'); textStyle(BOLD);
  text('Length: ' + L() + ' h' + (unlocked ? '' : ' (locked)'), margin, y0 + 3 * ROW_H + ROW_H / 2);
  textStyle(NORMAL);
}

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
