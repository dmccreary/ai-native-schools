// Force Field Balance MicroSim (p5.js)
// CANVAS_HEIGHT: 804
// Lewin's force field analysis for the compressed-morning change. Four driving forces push toward
// change and four restraining forces push against it, each scored from 1 (weak) to 5 (strong).
// Net force = total driving - total restraining. A net of 0 is "balanced", a positive net
// "favors change", and a negative net "favors the status quo".
// Evidence of mastery: before the sliders unlock, the learner commits three answers:
//   Q1 total driving force (14); Q2 total restraining force after the device force is reduced to 1
//   and the privacy force to 1 (9); Q3 net force after those reductions (+5).
// Two tries per question; only the first try counts toward the score "n of 3".
// After the three questions are settled, eight sliders unlock for exploration. Lowering a
// restraining force by 3 moves the net exactly as much as raising a driving force by 3.
// The strengths are illustrative judgments written for Chapter 17. Nothing moves until the learner acts.

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------
const FORCES = [
  { name: 'Evidence of learning gaps in the data', short: 'Learning gaps', kind: 'driving', start: 4 },
  { name: 'Potential relief from teacher workload', short: 'Workload relief', kind: 'driving', start: 3 },
  { name: 'Free open textbooks', short: 'Open textbooks', kind: 'driving', start: 3 },
  { name: 'Leadership support', short: 'Leadership', kind: 'driving', start: 4 },
  { name: 'Culture of closed doors', short: 'Closed doors', kind: 'restraining', start: 4 },
  { name: 'Fear of job loss', short: 'Job-loss fear', kind: 'restraining', start: 3 },
  { name: 'Privacy concerns', short: 'Privacy', kind: 'restraining', start: 3 },
  { name: 'Students without home devices', short: 'No home devices', kind: 'restraining', start: 4 }
];

const QUESTIONS = [
  { label: 'Q1. What is the total driving force?', answer: 14,
    working: '4 + 3 + 3 + 4 = 14.' },
  { label: 'Q2. Reduce "Students without home devices" to 1 and "Privacy concerns" to 1. What is the total restraining force?', answer: 9,
    working: '4 + 3 + 1 + 1 = 9.' },
  { label: 'Q3. What is the net force after those reductions (driving minus restraining)?', answer: 5,
    working: '14 - 9 = +5, so the balance now favors change without any added pressure.' }
];

// ---------------------------------------------------------------------------
// Canvas dimensions
// ---------------------------------------------------------------------------
let containerWidth;
let canvasWidth = 400;
let drawHeight = 440;
let controlHeight = 364;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
const margin = 12;
const defaultTextSize = 16;

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
let strengths = FORCES.map(f => f.start);
let unlocked = false; // sliders unlock once all three questions are settled
let qState = QUESTIONS.map(() => ({ tries: 0, done: false, correct: false, msg: '' }));

// Controls
let sliders = [];
let inputs = [];
let checkButton, resetButton;

function setup() {
  updateCanvasSize(); // must be first: get the container width before creating the canvas
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // All controls are created before anything positions them
  for (let i = 0; i < FORCES.length; i++) {
    const s = createSlider(1, 5, FORCES[i].start, 1);
    s.attribute('aria-label', FORCES[i].name + ' strength');
    s.input(() => { strengths[i] = s.value(); redraw(); });
    sliders.push(s);
  }
  for (let q = 0; q < QUESTIONS.length; q++) {
    const inp = createInput('', 'text');
    inp.attribute('inputmode', 'numeric');
    inp.attribute('aria-label', QUESTIONS[q].label);
    inp.attribute('placeholder', '?');
    inp.style('font-size', '16px');
    inp.style('box-sizing', 'border-box');
    inp.elt.addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswers(); });
    inputs.push(inp);
  }
  checkButton = createButton('Check answers');
  checkButton.elt.addEventListener('click', () => { if (qState.every(s => s.done)) unlock(); else checkAnswers(); });
  resetButton = createButton('Reset strengths');
  resetButton.elt.addEventListener('click', resetStrengths);
  styleButton(checkButton);
  styleButton(resetButton);

  describe('Force field diagram with four driving forces pushing toward change and four restraining forces ' +
    'pushing against it. Answer three questions about the totals and the net force, then use sliders to change each strength.');
  positionControls();
  noLoop(); // redraw only when the learner acts
}

function styleButton(b) {
  b.style('font-size', '16px');
  b.style('padding', '6px 12px');
  b.style('border-radius', '6px');
  b.style('border', '2px solid navy');
  b.style('background', 'navy');
  b.style('color', 'white');
  b.style('cursor', 'pointer');
}

// ---------------------------------------------------------------------------
// Drawing
// ---------------------------------------------------------------------------
function draw() {
  updateCanvasSize();
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(canvasWidth < 420 ? 20 : 24);
  text('Force Field Balance', canvasWidth / 2, 8);
  textStyle(NORMAL);
  textSize(canvasWidth < 420 ? 13 : 15);
  fill('dimgray');
  text('How could the school tip the balance without adding pressure?', margin, 40, canvasWidth - 2 * margin);

  drawDiagram(76, 320);
  drawBalance(330, drawHeight - 10);

  if (unlocked) drawExploreLabels();
  else drawQuestionPanel();
}

// Force field diagram: driving arrows on the left point right, restraining arrows on the right point left
function drawDiagram(top, bottom) {
  const cx = canvasWidth / 2;
  const half = cx - margin - 8;
  const rowH = (bottom - top - 22) / 4;
  const unit = (half - 16) / 5; // pixels per strength point

  // headers
  textSize(canvasWidth < 420 ? 12 : 14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  fill('seagreen');
  text('Driving forces', cx - half / 2 - 4, top);
  fill('firebrick');
  text('Restraining forces', cx + half / 2 + 4, top);
  textStyle(NORMAL);

  // centre line: the current state
  stroke('slategray');
  strokeWeight(2);
  drawingContext.setLineDash([5, 4]);
  line(cx, top, cx, bottom);
  drawingContext.setLineDash([]);
  noStroke();

  const labelSize = canvasWidth < 420 ? 11 : 13;
  for (let k = 0; k < 4; k++) {
    const y = top + 22 + k * rowH;
    drawForce(k, cx, y, rowH, half, unit, labelSize, -1);      // driving, left side
    drawForce(k + 4, cx, y, rowH, half, unit, labelSize, 1);   // restraining, right side
  }

  fill('dimgray');
  textSize(12);
  textStyle(ITALIC);
  textAlign(LEFT, TOP);
  text('Illustrative judgments, scored 1 (weak) to 5 (strong).', margin, bottom - 4);
  textStyle(NORMAL);
}

// side = -1 draws on the left (arrow points right), +1 on the right (arrow points left)
function drawForce(i, cx, y, rowH, half, unit, labelSize, side) {
  const f = FORCES[i];
  const s = strengths[i];
  const col = side < 0 ? color(46, 139, 87) : color(178, 34, 34);
  // label above the arrow, wrapped inside its half
  textSize(labelSize);
  fill('black');
  noStroke();
  textAlign(side < 0 ? RIGHT : LEFT, TOP);
  const lx = side < 0 ? cx - 8 : cx + 8;
  const lines = wrapText(f.name, half - 4);
  for (let j = 0; j < Math.min(lines.length, 2); j++) text(lines[j], lx, y + j * (labelSize + 2));
  // arrow: both arrows in a row share one height, below the taller of the two labels
  const other = FORCES[side < 0 ? i + 4 : i - 4];
  const nLines = Math.min(2, Math.max(lines.length, wrapText(other.name, half - 4).length));
  const ay = y + nLines * (labelSize + 2) + 10;
  const len = s * unit;
  const tip = cx + side * 4;
  const tail = cx + side * (4 + len);
  stroke(col);
  strokeWeight(Math.max(6, Math.min(12, rowH * 0.16)));
  strokeCap(SQUARE);
  line(tail, ay, tip + side * 10, ay);
  noStroke();
  fill(col);
  triangle(tip, ay, tip + side * 12, ay - 9, tip + side * 12, ay + 9);
  // strength number at the tail
  fill('black');
  textSize(14);
  textStyle(BOLD);
  textAlign(side < 0 ? RIGHT : LEFT, CENTER);
  text(s, tail + side * 6, ay);
  textStyle(NORMAL);
  strokeCap(ROUND);
}

// Totals and net, shown only after the questions are settled so they do not give the answers away
function drawBalance(top, bottom) {
  const x = margin, w = canvasWidth - 2 * margin, h = bottom - top;
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(x, top, w, h, 8);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(canvasWidth < 420 ? 13 : 15);
  if (!unlocked) {
    fill('dimgray');
    text('The totals and the net force appear after you answer Q1 to Q3 below.', x + 10, top + h / 2 - 10, w - 20);
    return;
  }
  const d = drivingTotal(), r = restrainingTotal(), net = d - r;
  const verdict = net === 0 ? 'balanced' : net > 0 ? 'favors change' : 'favors the status quo';
  fill('black');
  textStyle(BOLD);
  text('Driving ' + d + '   Restraining ' + r + '   Net ' + signed(net) + ': ' + verdict, x + 8, top + 8, w - 16);
  textStyle(NORMAL);
  // bar: green share for driving, red share for restraining, marker at the middle
  const by = top + h - 30, bw = w - 40, bx = x + 20;
  const share = d / (d + r);
  fill('seagreen');
  rect(bx, by, bw * share, 18, 4, 0, 0, 4);
  fill('firebrick');
  rect(bx + bw * share, by, bw * (1 - share), 18, 0, 4, 4, 0);
  stroke('black');
  strokeWeight(2);
  line(bx + bw / 2, by - 5, bx + bw / 2, by + 23);
  noStroke();
}

// Question panel in the control region before the sliders unlock
function drawQuestionPanel() {
  const L = questionLayout();
  textAlign(LEFT, TOP);
  for (let q = 0; q < QUESTIONS.length; q++) {
    const r = L.rows[q];
    textSize(L.ts);
    fill('black');
    textStyle(BOLD);
    const lines = wrapText(QUESTIONS[q].label, L.textW);
    for (let j = 0; j < lines.length; j++) text(lines[j], margin, r.y + j * L.lineH);
    textStyle(NORMAL);
    const st = qState[q];
    if (st.msg) {
      fill(st.done ? (st.correct ? 'darkgreen' : 'firebrick') : 'saddlebrown');
      const ml = wrapText(st.msg, canvasWidth - 2 * margin);
      for (let j = 0; j < ml.length; j++) text(ml[j], margin, r.msgY + j * L.lineH);
    }
  }
}

// After unlock: the score, slider labels and the hint about restraining forces
function drawExploreLabels() {
  const L = sliderLayout();
  const score = qState.filter(s => s.correct).length;
  textAlign(LEFT, TOP);
  textSize(canvasWidth < 420 ? 13 : 15);
  fill(score === 3 ? 'darkgreen' : 'black');
  textStyle(BOLD);
  text('Score: ' + score + ' of 3 first-try correct. ' + (score === 3 ? 'You can calculate the balance.' : 'Answers: Q1 = 14, Q2 = 9, Q3 = +5.'),
       margin, drawHeight + 8, canvasWidth - 2 * margin);
  textStyle(NORMAL);
  textSize(canvasWidth < 420 ? 12 : 14);
  for (let i = 0; i < FORCES.length; i++) {
    const p = L.pos[i];
    fill(FORCES[i].kind === 'driving' ? 'seagreen' : 'firebrick');
    text(FORCES[i].short + ': ' + strengths[i], p.x, p.y - 18);
  }
  fill('dimgray');
  text('Try lowering a restraining force by 3, then raising a driving force by 3 instead. Compare the net.',
       margin, L.tipY, canvasWidth - 2 * margin);
}

// ---------------------------------------------------------------------------
// Layout of the control region
// ---------------------------------------------------------------------------
function questionLayout() {
  const ts = canvasWidth < 420 ? 13 : 15;
  const lineH = ts + 4;
  const inputW = 80;
  const textW = canvasWidth - 2 * margin - inputW - 10;
  let y = drawHeight + 10;
  const rows = [];
  textStyle(BOLD);
  textSize(ts);
  for (let q = 0; q < QUESTIONS.length; q++) {
    const n = wrapText(QUESTIONS[q].label, textW).length;
    const msgY = y + Math.max(n * lineH, 34) + 2;
    rows.push({ y: y, msgY: msgY, inputY: y });
    // room for the longest message this question can show
    textStyle(NORMAL);
    const longest = Math.max(...messagesFor(q).map(m => wrapText(m, canvasWidth - 2 * margin).length));
    textStyle(BOLD);
    y = msgY + longest * lineH + 8;
  }
  textStyle(NORMAL);
  return { ts: ts, lineH: lineH, inputW: inputW, textW: textW, rows: rows, buttonY: y };
}

function sliderLayout() {
  const colW = (canvasWidth - 3 * margin) / 2;
  const top = drawHeight + (canvasWidth < 420 ? 66 : 50);
  const rowH = 50;
  const pos = [];
  for (let i = 0; i < FORCES.length; i++) {
    const col = i < 4 ? 0 : 1;
    const row = i % 4;
    pos.push({ x: margin + col * (colW + margin), y: top + row * rowH, w: colW });
  }
  return { pos: pos, tipY: top + 4 * rowH - 16, buttonY: top + 4 * rowH + 20 };
}

function positionControls() {
  if (unlocked) {
    const L = sliderLayout();
    for (let i = 0; i < sliders.length; i++) {
      sliders[i].show();
      sliders[i].position(L.pos[i].x, L.pos[i].y);
      sliders[i].size(L.pos[i].w - 4);
    }
    inputs.forEach(inp => inp.hide());
    checkButton.hide();
    resetButton.show();
    resetButton.position(margin, Math.min(L.buttonY, drawHeight + controlHeight - 44));
  } else {
    const L = questionLayout();
    sliders.forEach(s => s.hide());
    resetButton.hide();
    for (let q = 0; q < inputs.length; q++) {
      inputs[q].show();
      inputs[q].position(canvasWidth - margin - L.inputW, L.rows[q].inputY);
      inputs[q].size(L.inputW, 32);
      inputs[q].elt.disabled = qState[q].done;
    }
    checkButton.show();
    checkButton.position(margin, Math.min(L.buttonY, drawHeight + controlHeight - 44));
  }
}

// ---------------------------------------------------------------------------
// Logic
// ---------------------------------------------------------------------------
function drivingTotal() { return strengths.slice(0, 4).reduce((a, b) => a + b, 0); }
function restrainingTotal() { return strengths.slice(4).reduce((a, b) => a + b, 0); }
function signed(n) { return n > 0 ? '+' + n : String(n); }

function checkAnswers() {
  if (unlocked) return;
  for (let q = 0; q < QUESTIONS.length; q++) {
    const st = qState[q];
    if (st.done) continue;
    const raw = String(inputs[q].value()).trim();
    if (!/^[+-]?\d+$/.test(raw)) {
      if (raw !== '') st.msg = 'Type a whole number, such as 12 or +3.';
      continue;
    }
    const v = parseInt(raw, 10);
    st.tries++;
    if (v === QUESTIONS[q].answer) {
      st.done = true;
      st.correct = st.tries === 1;
      st.msg = 'Correct: ' + signedFor(q) + '. ' + QUESTIONS[q].working + (st.tries > 1 ? ' (Second try, so it does not count.)' : '');
    } else if (st.tries < 2) {
      st.msg = 'Not quite. Add the strengths on each side, then subtract. Try once more.';
    } else {
      st.done = true;
      st.correct = false;
      st.msg = 'The answer is ' + signedFor(q) + '. ' + QUESTIONS[q].working;
    }
  }
  // all three settled: the learner reads the feedback, then unlocks the sliders
  if (qState.every(s => s.done)) checkButton.html('Unlock the sliders');
  positionControls();
  redraw();
}

function unlock() {
  unlocked = true;
  positionControls();
  redraw();
}

// Every message a question can show, so the layout reserves enough room
function messagesFor(q) {
  return ['Correct: ' + signedFor(q) + '. ' + QUESTIONS[q].working + ' (Second try, so it does not count.)',
          'The answer is ' + signedFor(q) + '. ' + QUESTIONS[q].working,
          'Not quite. Add the strengths on each side, then subtract. Try once more.'];
}

function signedFor(q) { return q === 2 ? signed(QUESTIONS[q].answer) : String(QUESTIONS[q].answer); }

function resetStrengths() {
  strengths = FORCES.map(f => f.start);
  sliders.forEach((s, i) => s.value(FORCES[i].start));
  redraw();
}

// ---------------------------------------------------------------------------
// Text helper: wrap str into lines no wider than maxW at the current text size
// ---------------------------------------------------------------------------
function wrapText(str, maxW) {
  const words = str.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const t = line ? line + ' ' + w : w;
    if (line && textWidth(t) > maxW) { lines.push(line); line = w; } else line = t;
  }
  if (line) lines.push(line);
  return lines;
}

// ---------------------------------------------------------------------------
// Responsive width. Keep these two functions at the end of the file.
// ---------------------------------------------------------------------------
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  positionControls();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
