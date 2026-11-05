// Equal vs. Equitable Tutoring MicroSim (p5.js)
// CANVAS_HEIGHT: 752
// Three students start at scores 80 (A), 65 (B) and 50 (C). The target is 80. There are 45
// tutoring hours, and each hour adds 1 point to the student who receives it.
// Step 1: with the equal split (15 hours each) still hidden, the learner answers Q1 (how many reach
// 80) and Q2 (the gap between the highest and lowest final score). One attempt each.
// Step 2: the equal-split result appears and three hour sliders unlock (0 to 45 in steps of 5;
// the total cannot exceed 45). The learner submits allocations until all three reach 80 or three
// submissions are used. The only allocation that works is A 0, B 15, C 30.
// Illustrative model, not measured data. Reset returns to the opening state.

// ---- content ----
const STUDENTS = [
  { name: 'A', start: 80 },
  { name: 'B', start: 65 },
  { name: 'C', start: 50 }
];
const TARGET = 80;
const TOTAL_HOURS = 45;
const STEP = 5;
const EQUAL = 15;
const MAX_SUBMITS = 3;
const QUESTIONS = [
  { label: 'Q1 reach 80:', text: 'Q1. With 15 hours each, how many of the three students reach 80?', answer: 2,
    right: 'Right: 2 students reach 80. A is at 95 and B is at 80; C is at 65.',
    wrong: 'Add 15 to each starting score and count how many reach 80. The answer is 2: A is at 95 and B is at 80; C is at 65.' },
  { label: 'Q2 gap (points):', text: 'Q2. With 15 hours each, what is the score gap between the highest and lowest student?', answer: 30,
    right: 'Right: 95 minus 65 is 30 points.',
    wrong: 'Find the highest and lowest final scores. The answer is 30 points: 95 minus 65.' }
];

// ---- layout ----
let containerWidth, canvasWidth = 600;
let drawHeight = 550;
let controlHeight = 202;
let canvasHeight = drawHeight + controlHeight;
const margin = 12;

// ---- state ----
let qDone = false; // Q1 and Q2 checked
let qRight = [false, false];
let submits = [];   // each: { hours: [a, b, c], ok }
let solved = false;
let revealed = false;

// ---- controls ----
let inputs = [], checkBtn, resetBtn, submitBtn, sliders = [];

function hoursNow() { return sliders.map(s => Number(s.value())); }
function finals(h) { return STUDENTS.map((s, i) => s.start + h[i]); }
function gapOf(f) { return Math.max(...f) - Math.min(...f); }

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(16);

  for (let i = 0; i < 2; i++) {
    const inp = createInput('', 'number');
    inp.attribute('aria-label', QUESTIONS[i].text);
    inp.style('font-size', '16px');
    inp.style('box-sizing', 'border-box');
    inp.elt.addEventListener('input', refreshControls);
    inputs.push(inp);
  }
  checkBtn = createButton('Check Q1 and Q2');
  checkBtn.elt.addEventListener('click', checkQuestions);
  resetBtn = createButton('Reset');
  resetBtn.elt.addEventListener('click', resetAll);
  submitBtn = createButton('Submit allocation');
  submitBtn.elt.addEventListener('click', submitAllocation);
  for (let i = 0; i < 3; i++) {
    const s = createSlider(0, TOTAL_HOURS, EQUAL, STEP);
    s.attribute('aria-label', 'Tutoring hours for student ' + STUDENTS[i].name + ', 0 to 45');
    s.elt.addEventListener('input', () => clampSlider(i));
    sliders.push(s);
  }
  [checkBtn, resetBtn, submitBtn].forEach(b => { b.style('font-size', '15px'); b.style('padding', '6px 8px'); });

  positionControls();
  refreshControls();
  describe('Three students start at scores 80, 65 and 50, with a target of 80 and 45 tutoring hours to share. ' +
    'Answer two questions about the equal split, then move three hour sliders to find an allocation that brings every student to 80.');
  noLoop();
}

// keep the total at or below 45 by limiting the slider that just moved
function clampSlider(i) {
  const h = hoursNow();
  const others = h.reduce((a, b) => a + b, 0) - h[i];
  if (h[i] + others > TOTAL_HOURS) sliders[i].value(TOTAL_HOURS - others);
  redraw();
}

function positionControls() {
  const inputW = 70, btnW = Math.min(190, canvasWidth - 2 * margin - 150 - inputW - 16);
  const labelW = 150;
  const y0 = drawHeight + 8;
  inputs[0].position(margin + labelW, y0 + 4); inputs[0].size(inputW, 32);
  inputs[1].position(margin + labelW, y0 + 48); inputs[1].size(inputW, 32);
  const bx = margin + labelW + inputW + 12;
  checkBtn.position(bx, y0 + 3); checkBtn.size(btnW, 34);
  resetBtn.position(bx, y0 + 47); resetBtn.size(btnW, 34);
  const colW = (canvasWidth - 2 * margin - 24) / 3;
  for (let i = 0; i < 3; i++) {
    sliders[i].position(margin + i * (colW + 12), y0 + 116);
    sliders[i].size(colW, 20);
  }
  submitBtn.position(margin, y0 + 148);
  submitBtn.size(canvasWidth - 2 * margin, 36);
}

function refreshControls() {
  inputs.forEach(inp => inp.elt.disabled = qDone);
  checkBtn.elt.disabled = qDone || inputs[0].value() === '' || inputs[1].value() === '';
  const allocOpen = qDone && !solved && !revealed;
  sliders.forEach(s => s.elt.disabled = !allocOpen);
  submitBtn.elt.disabled = !allocOpen;
  redraw();
}

function checkQuestions() {
  qRight[0] = Number(inputs[0].value()) === QUESTIONS[0].answer;
  qRight[1] = Number(inputs[1].value()) === QUESTIONS[1].answer;
  qDone = true;
  refreshControls();
}

function submitAllocation() {
  const h = hoursNow();
  const f = finals(h);
  const ok = f.every(v => v >= TARGET);
  submits.push({ hours: h, ok: ok, finals: f });
  if (ok) solved = true;
  else if (submits.length >= MAX_SUBMITS) {
    revealed = true;
    sliders[0].value(0); sliders[1].value(15); sliders[2].value(30);
  }
  refreshControls();
}

function resetAll() {
  qDone = false; qRight = [false, false]; submits = []; solved = false; revealed = false;
  inputs.forEach(inp => inp.value(''));
  sliders.forEach(s => s.value(EQUAL));
  refreshControls();
}

function draw() {
  fill('aliceblue'); stroke('silver'); strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  noStroke(); fill('black');
  textAlign(CENTER, TOP); textStyle(BOLD); textSize(canvasWidth < 500 ? 19 : 22);
  text('Equal vs. Equitable Tutoring', canvasWidth / 2, 8);
  textStyle(NORMAL); textSize(15); textAlign(LEFT, TOP);
  let y = drawWrapped('Is an equal share of tutoring a fair share? Starting scores: A 80, B 65, C 50. Target: 80. Hours to share: 45. Each hour adds 1 point.',
                      margin, 40, canvasWidth - 2 * margin, 19) + 6;

  const wide = canvasWidth >= 620;
  const chart = { x: margin, y: y, w: wide ? Math.floor((canvasWidth - 2 * margin) * 0.56) : canvasWidth - 2 * margin, h: wide ? 260 : 210 };
  drawChart(chart);
  const info = wide ? { x: chart.x + chart.w + 10, y: chart.y, w: canvasWidth - margin - chart.x - chart.w - 10, h: chart.h }
                    : { x: margin, y: chart.y + chart.h + 8, w: canvasWidth - 2 * margin, h: 54 };
  drawInfo(info, wide);
  const fbTop = info.y + info.h + 8;
  drawFeedback({ x: margin, y: fbTop, w: canvasWidth - 2 * margin, h: drawHeight - fbTop - 8 });
  drawControlLabels();
}

function drawChart(r) {
  fill('white'); stroke('silver'); strokeWeight(1);
  rect(r.x, r.y, r.w, r.h, 8);
  const showHours = qDone;
  const h = showHours ? hoursNow() : [0, 0, 0];
  const maxScore = 130;
  const plot = { x: r.x + 40, y: r.y + 20, w: r.w - 52, h: r.h - 60 };
  const yOf = v => plot.y + plot.h - v / maxScore * plot.h;
  // grid
  textSize(11); textAlign(RIGHT, CENTER);
  for (let v = 0; v <= maxScore; v += 20) {
    stroke('#eee'); line(plot.x, yOf(v), plot.x + plot.w, yOf(v));
    noStroke(); fill('dimgray'); text(v, plot.x - 4, yOf(v));
  }
  // bars
  const bw = plot.w / 3;
  for (let i = 0; i < 3; i++) {
    const s = STUDENTS[i];
    const bx = plot.x + i * bw + bw * 0.2, w = bw * 0.6;
    noStroke();
    fill('#4a78b5');
    rect(bx, yOf(s.start), w, yOf(0) - yOf(s.start));
    if (h[i] > 0) {
      fill('#f2b134');
      rect(bx, yOf(s.start + h[i]), w, yOf(s.start) - yOf(s.start + h[i]));
    }
    const fin = s.start + h[i];
    fill(showHours && fin >= TARGET ? 'darkgreen' : 'black');
    textAlign(CENTER, BOTTOM); textStyle(BOLD); textSize(14);
    text(showHours ? fin : s.start, bx + w / 2, yOf(fin) - 2);
    textStyle(NORMAL); fill('black'); textAlign(CENTER, TOP); textSize(13);
    text('Student ' + s.name, bx + w / 2, plot.y + plot.h + 4);
    fill('dimgray'); textSize(12);
    text(showHours ? h[i] + ' h' : (qDone ? '' : '15 h each?'), bx + w / 2, plot.y + plot.h + 20);
  }
  // target line
  stroke('firebrick'); strokeWeight(2);
  drawingContext.setLineDash([6, 4]);
  line(plot.x, yOf(TARGET), plot.x + plot.w, yOf(TARGET));
  drawingContext.setLineDash([]);
  noStroke(); fill('aliceblue'); rect(r.x + 2, yOf(TARGET) - 8, plot.x - r.x - 3, 16);
  fill('firebrick'); textSize(11); textStyle(BOLD); textAlign(RIGHT, CENTER);
  text('Goal', plot.x - 4, yOf(TARGET));
  textStyle(NORMAL);
  fill('dimgray'); textStyle(ITALIC); textAlign(RIGHT, TOP); textSize(11);
  text('Illustrative model, not measured data', r.x + r.w - 6, r.y + 4);
  textStyle(NORMAL);
}

function drawInfo(r, wide) {
  fill('white'); stroke('silver'); strokeWeight(1);
  rect(r.x, r.y, r.w, r.h, 8);
  noStroke(); fill('black'); textAlign(LEFT, TOP);
  const x = r.x + 10, w = r.w - 20;
  if (!qDone) {
    textSize(14);
    drawWrapped('The equal split gives 15 hours to each student. Answer Q1 and Q2 below, then the result appears and the sliders unlock.', x, r.y + 8, w, 18);
    return;
  }
  const h = hoursNow(), f = finals(h);
  const used = h.reduce((a, b) => a + b, 0);
  textStyle(BOLD); textSize(15);
  let y = r.y + 8;
  text('Hours used: ' + used + ' of ' + TOTAL_HOURS + '   Unused: ' + (TOTAL_HOURS - used), x, y, w);
  y += wide ? 44 : 22;
  textStyle(NORMAL); textSize(14);
  if (wide) {
    for (let i = 0; i < 3; i++) {
      fill(f[i] >= TARGET ? 'darkgreen' : 'firebrick');
      text(STUDENTS[i].name + ': ' + STUDENTS[i].start + ' + ' + h[i] + ' = ' + f[i] + (f[i] >= TARGET ? '  reaches 80' : '  ' + (TARGET - f[i]) + ' short'), x, y);
      y += 22;
    }
    fill('black'); textStyle(BOLD);
    text('Gap (highest − lowest): ' + gapOf(f) + ' points', x, y + 6, w);
    textStyle(NORMAL);
    fill('dimgray'); textSize(12);
    drawWrapped('Hours: blue is the starting score, orange is the tutoring added.', x, r.y + r.h - 40, w, 15);
  } else {
    text(STUDENTS.map((s, i) => s.name + ' ' + f[i]).join(', ') + '. Gap: ' + gapOf(f) + ' points.', x, y, w);
  }
}

function drawFeedback(r) {
  fill('white'); stroke('silver'); strokeWeight(1);
  rect(r.x, r.y, r.w, r.h, 8);
  noStroke(); textAlign(LEFT, TOP);
  const x = r.x + 10, w = r.w - 20;
  const ts = canvasWidth < 500 ? 13 : 14, lh = ts + 4;
  textSize(ts);
  let y = r.y + 8;
  for (let i = 0; i < 2; i++) {
    if (qDone && (canvasWidth < 620 || submits.length > 0)) { // after the first submission (or on narrow screens), one line per question
      textStyle(BOLD); fill(qRight[i] ? 'darkgreen' : 'firebrick');
      y = drawWrapped((i === 0 ? 'Q1 (reach 80 at 15 h each): 2' : 'Q2 (gap at 15 h each): 30 points, 95 − 65') + (qRight[i] ? '  ✓' : '  ✗'), x, y, w, lh) + 2;
      continue;
    }
    textStyle(BOLD); fill('black');
    y = drawWrapped(QUESTIONS[i].text + (qDone ? (qRight[i] ? '  ✓' : '  ✗') : ''), x, y, w, lh);
    textStyle(NORMAL);
    if (qDone) { fill(qRight[i] ? 'darkgreen' : 'firebrick'); y = drawWrapped(QUESTIONS[i].right && qRight[i] ? QUESTIONS[i].right : QUESTIONS[i].wrong, x, y, w, lh); }
    y += 2;
  }
  if (!qDone) return;
  textStyle(BOLD); fill('black');
  y = drawWrapped('Find hours for A, B and C that bring all three to at least 80. Submissions: ' + submits.length + ' of ' + MAX_SUBMITS + '.', x, y + 2, w, lh);
  textStyle(NORMAL);
  if (submits.length) {
    const last = submits[submits.length - 1];
    let msg;
    if (last.ok) msg = 'All three reach 80. This is an equitable allocation: hours match need.';
    else {
      const shorts = last.finals.map((v, i) => v < TARGET ? STUDENTS[i].name + ' is still ' + (TARGET - v) + ' points short.' : null).filter(Boolean);
      msg = shorts.join(' ');
      if (revealed) msg += ' The allocation that works is A 0, B 15, C 30: B needs 15 hours (65 to 80), C needs 30 (50 to 80), and A needs none; the total is exactly 45.';
    }
    fill(last.ok ? 'darkgreen' : (revealed ? 'firebrick' : '#8a5a00'));
    y = drawWrapped(msg, x, y, w, lh);
  }
  if (solved || revealed) {
    const mastery = qRight[0] && qRight[1] && solved;
    fill(mastery ? 'darkgreen' : 'black'); textStyle(BOLD);
    drawWrapped(mastery ? 'Mastery: both questions right and the allocation found within three submissions.'
                        : 'Mastery needs Q1 and Q2 right and the allocation found within three submissions. Press Reset to try again.', x, y + 2, w, lh);
    textStyle(NORMAL);
  }
}

function drawControlLabels() {
  noStroke(); textSize(15); textAlign(LEFT, CENTER);
  const y0 = drawHeight + 8;
  fill(qDone ? 'gray' : 'black');
  text(QUESTIONS[0].label, margin, y0 + 20);
  text(QUESTIONS[1].label, margin, y0 + 64);
  const colW = (canvasWidth - 2 * margin - 24) / 3;
  const h = hoursNow();
  textStyle(BOLD);
  fill(qDone && !solved && !revealed ? 'black' : 'gray');
  for (let i = 0; i < 3; i++) text('Hours for ' + STUDENTS[i].name + ': ' + h[i], margin + i * (colW + 12), y0 + 104);
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
