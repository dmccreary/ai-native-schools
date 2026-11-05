// Coach Capacity Calculator MicroSim (p5.js)
// CANVAS_HEIGHT: 502
// Answer three questions first. Then the sliders unlock and the coaches
// needed, the gap, and the message update at once. No animation.
// Coaches needed = teachers / capacity, rounded up to a whole coach.

// ---------------------------------------------------------------- CONFIG
const SIM = {
  title: 'Coach Capacity Calculator',
  prompt: 'How many coaches does a district rollout need?',
  rules: 'Coaches needed = teachers ÷ teachers per coach, rounded up to the next whole number. Teachers supported = coaches × teachers per coach.',
  footer: 'A capacity of 12 teachers per coach is illustrative; set your own.',
  defaults: { teachers: 150, capacity: 12, coaches: 8 }
};

const QUESTIONS = [
  { text: 'A district has 150 teachers to support, and each coach can support 12 teachers. How many coaches does it need?',
    type: 'number', answer: 13, tol: 0, unit: 'coaches', shown: '13 coaches',
    working: '150 ÷ 12 = 12.5, rounded up to 13. Half a coach cannot be hired.',
    wrongText: 'Not quite. Divide, then round up to a whole coach.' },
  { text: 'The rollout grows to 400 teachers, still at 12 teachers per coach. How many coaches does it need?',
    type: 'number', answer: 34, tol: 0, unit: 'coaches', shown: '34 coaches',
    working: '400 ÷ 12 = 33.3, rounded up to 34.',
    wrongText: 'Not quite. Divide, then round up to a whole coach.' },
  { text: 'The district has 8 coaches, each supporting 12 teachers. What is the largest number of teachers they can support?',
    type: 'number', answer: 96, tol: 0, unit: 'teachers', shown: '96 teachers',
    working: '8 × 12 = 96. With 150 teachers, that is 54 short, so the rollout must slow down or add coaches.',
    wrongText: 'Not quite. Multiply the coaches by the teachers each one can support.' }
];

// ---------------------------------------------------------------- layout
let canvasWidth = 700;
const rulesY = 70, rulesH = 46;
const panelY = 124, panelH = 224;
const footerY = 356;
let drawHeight = 380;
let controlHeight = 3 * 36 + 14;
let canvasHeight = drawHeight + controlHeight;
let sliderLeft = 250;

let teachersSlider, capacitySlider, coachesSlider, defaultsButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create every control before positioning any of them.
  teachersSlider = createSlider(10, 600, SIM.defaults.teachers, 10);
  capacitySlider = createSlider(6, 20, SIM.defaults.capacity, 1);
  coachesSlider = createSlider(1, 50, SIM.defaults.coaches, 1);
  defaultsButton = createButton('Defaults');
  defaultsButton.mousePressed(resetSimDefaults);
  createQuizControls();

  setSimEnabled(false);
  loadQuestion();
  positionControls();
  describe('A calculator for instructional coaches. After three questions, sliders set the teachers, the teachers per coach, and the coaches available; the sim shows the coaches needed and the gap.', LABEL);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = Math.max(340, container.offsetWidth);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

function positionControls() {
  sliderLeft = Math.min(250, Math.round(canvasWidth * 0.45));
  const sw = canvasWidth - sliderLeft - 20;
  const sliders = [teachersSlider, capacitySlider, coachesSlider];
  for (let i = 0; i < sliders.length; i++) {
    sliders[i].position(sliderLeft, drawHeight + 8 + i * 36);
    sliders[i].size(Math.max(60, sw - 90));
  }
  defaultsButton.position(canvasWidth - 100, drawHeight + 8);
  restartButton.position(canvasWidth - 100, drawHeight + 44);
  positionQuizControls(margin + 12, quizInputY(panelY));
}

function setSimEnabled(on) {
  for (const s of [teachersSlider, capacitySlider, coachesSlider]) setEnabled(s, on);
  if (on) defaultsButton.show(); else defaultsButton.hide();
}

function resetSimDefaults() {
  teachersSlider.value(SIM.defaults.teachers);
  capacitySlider.value(SIM.defaults.capacity);
  coachesSlider.value(SIM.defaults.coaches);
}

// ---------------------------------------------------------------- drawing
function draw() {
  stroke('silver');
  strokeWeight(1);
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  noStroke();
  fill('black');
  textStyle(BOLD);
  fitLineSize(SIM.title, canvasWidth - 2 * margin, 22, 14);
  textAlign(CENTER, TOP);
  text(SIM.title, canvasWidth / 2, 10);
  fill('#1f3f66');
  fitLineSize(SIM.prompt, canvasWidth - 2 * margin, 16, 11);
  text(SIM.prompt, canvasWidth / 2, 42);
  textStyle(NORMAL);

  // rules box
  stroke('#9bb7d4');
  fill('#eef5fc');
  rect(margin, rulesY, canvasWidth - 2 * margin, rulesH, 6);
  noStroke();
  fill('#1a1a1a');
  fitText('Rule. ' + SIM.rules, margin + 10, rulesY + 6, canvasWidth - 2 * margin - 20, rulesH - 10, 15, 11, LEFT);

  if (phase === 'quiz') drawQuizPanel(margin, panelY, canvasWidth - 2 * margin, panelH);
  else drawExplore(margin, panelY, canvasWidth - 2 * margin, panelH);

  // slider labels
  noStroke();
  fill(phase === 'quiz' ? '#777' : 'black');
  textSize(15);
  textAlign(LEFT, CENTER);
  fitLineSize('Teachers to support: 600', sliderLeft - 16, 15, 10);
  text('Teachers to support: ' + teachersSlider.value(), 10, drawHeight + 18);
  text('Teachers per coach: ' + capacitySlider.value(), 10, drawHeight + 54);
  text('Coaches available: ' + coachesSlider.value(), 10, drawHeight + 90);
  if (phase === 'quiz') {
    fill('#555');
    textSize(13);
    textAlign(RIGHT, CENTER);
    text('Sliders unlock after the questions', canvasWidth - 16, drawHeight + 108);
  }

  fill('#555');
  textStyle(ITALIC);
  fitLineSize(SIM.footer, canvasWidth - 2 * margin, 13, 9);
  textAlign(CENTER, TOP);
  text(SIM.footer, canvasWidth / 2, footerY);
  textStyle(NORMAL);
}

function drawExplore(x, y, w, h) {
  const teachers = teachersSlider.value();
  const cap = capacitySlider.value();
  const coaches = coachesSlider.value();
  const needed = Math.ceil(teachers / cap);
  const supported = coaches * cap;
  const gap = needed - coaches;
  const short = gap > 0;

  stroke(short ? '#c75b12' : '#2e7d32');
  strokeWeight(2);
  fill('white');
  rect(x, y, w, h, 8);
  noStroke();

  // three stat tiles
  const tw = (w - 48) / 3;
  const stats = [
    ['Coaches needed', String(needed), fmt(teachers / cap, 1) + ' rounded up'],
    ['Coaches available', String(coaches), 'support ' + supported + ' teachers'],
    [short ? 'Coaches short' : 'Coaches to spare', String(Math.abs(gap)), short ? 'gap to close' : 'no gap']
  ];
  for (let i = 0; i < 3; i++) {
    const tx = x + 12 + i * (tw + 12);
    fill(i === 2 ? (short ? '#fff1e6' : '#e6f4ea') : '#eef5fc');
    rect(tx, y + 12, tw, 78, 6);
    fill('#1f3f66');
    textSize(14);
    textAlign(CENTER, TOP);
    fitLineSize(stats[i][0], tw - 8, 14, 9);
    text(stats[i][0], tx + tw / 2, y + 18);
    fill(i === 2 ? (short ? '#a3460a' : '#2e7d32') : '#1a1a1a');
    textStyle(BOLD);
    textSize(28);
    text(stats[i][1], tx + tw / 2, y + 36);
    textStyle(NORMAL);
    fill('#444');
    textSize(13);
    fitLineSize(stats[i][2], tw - 8, 13, 9);
    text(stats[i][2], tx + tw / 2, y + 70);
  }

  // one square per coach needed: filled when a coach is available
  const gy = y + 104;
  const n = Math.max(needed, coaches);
  const cell = Math.min(16, Math.floor((w - 24) / 34));
  const perRow = Math.floor((w - 24) / cell);
  fill('#1a1a1a');
  textSize(13);
  textAlign(LEFT, TOP);
  const legend = 'Each square is one coach. Blue: available. Orange outline: needed but missing.';
  fitLineSize(legend, w - 24, 13, 8);
  text(legend, x + 12, gy);
  for (let i = 0; i < n; i++) {
    const cx = x + 12 + (i % perRow) * cell;
    const cy = gy + 20 + Math.floor(i / perRow) * cell;
    if (i < coaches) {
      fill(i < needed ? '#4682b4' : '#a9c6e3');
      noStroke();
    } else {
      noFill();
      stroke('#c75b12');
      strokeWeight(1.5);
    }
    rect(cx + 1, cy + 1, cell - 3, cell - 3, 2);
  }
  noStroke();

  // message
  fill(short ? '#a3460a' : '#2e7d32');
  textStyle(BOLD);
  textAlign(CENTER, BOTTOM);
  const msg = short
    ? 'Slow the rollout: ' + coaches + ' coaches can support ' + supported + ' of ' + teachers + ' teachers.'
    : 'Enough coaches: ' + coaches + ' coaches can support ' + supported + ' teachers.';
  fitLineSize(msg, w - 20, 17, 10);
  text(msg, x + w / 2, y + h - 30);
  textStyle(NORMAL);
  fill('#444');
  textSize(13);
  const sc = 'Your question score: ' + qScore + ' of ' + QUESTIONS.length + '. Press Start over to answer again.';
  fitLineSize(sc, w - 20, 13, 8);
  text(sc, x + w / 2, y + h - 10);
}

// ================================================================ shared quiz framework
// Phase 'quiz': three questions, two attempts each, results hidden and inputs locked.
// Phase 'explore': the inputs unlock and the results update at once.
let phase = 'quiz';
let qIndex = 0;          // current question
let qAttempts = 0;       // attempts on the current question
let qResolved = false;   // current question finished
let qScore = 0;          // first-attempt correct answers out of 3
let qFeedback = '';
let qKind = '';          // 'correct' | 'wrong' | 'reveal'
let answerInput, answerSelect, checkButton, nextButton, restartButton;
let margin = 16;

function createQuizControls() {
  answerInput = createInput('', 'text');
  answerInput.size(110, 24);
  answerInput.style('font-size', '16px');
  answerInput.attribute('inputmode', 'decimal');
  answerInput.input(() => updateQuizButtons());
  answerSelect = createSelect();
  answerSelect.style('font-size', '16px');
  answerSelect.changed(() => updateQuizButtons());
  checkButton = createButton('Check');
  checkButton.mousePressed(checkAnswer);
  nextButton = createButton('Next question');
  nextButton.mousePressed(nextQuestion);
  restartButton = createButton('Start over');
  restartButton.mousePressed(startOver);
}

// The input row sits inside the quiz panel at (x, y).
function positionQuizControls(x, y) {
  answerInput.position(x, y);
  answerSelect.position(x, y);
  const q = QUESTIONS[qIndex];
  const unitW = q && q.unit ? 12 + q.unit.length * 9 : 0;
  const bx = x + (q && q.type === 'choice' ? 190 : 140 + unitW);
  checkButton.position(bx, y);
  nextButton.position(bx + 70, y);
}

function loadQuestion() {
  const q = QUESTIONS[qIndex];
  qAttempts = 0;
  qResolved = false;
  qFeedback = '';
  qKind = '';
  answerInput.value('');
  if (q.type === 'choice') {
    answerSelect.html('');
    answerSelect.option('Choose...');
    for (const o of q.options) answerSelect.option(o);
    answerSelect.selected('Choose...');
  }
  nextButton.html(qIndex === QUESTIONS.length - 1 ? 'See the results' : 'Next question');
  updateQuizButtons();
  positionControls();
}

function setEnabled(el, on) {
  if (on) el.removeAttribute('disabled');
  else el.attribute('disabled', '');
}

function updateQuizButtons() {
  const quiz = phase === 'quiz';
  const q = QUESTIONS[qIndex];
  if (quiz && q.type === 'choice') { answerSelect.show(); answerInput.hide(); }
  else if (quiz) { answerInput.show(); answerSelect.hide(); }
  else { answerInput.hide(); answerSelect.hide(); }
  if (quiz) { checkButton.show(); nextButton.show(); } else { checkButton.hide(); nextButton.hide(); }
  const hasAnswer = q.type === 'choice'
    ? answerSelect.value() !== 'Choose...'
    : String(answerInput.value()).trim() !== '';
  setEnabled(checkButton, quiz && !qResolved && hasAnswer);
  setEnabled(nextButton, quiz && qResolved);
  setEnabled(answerInput, quiz && !qResolved);
  setEnabled(answerSelect, quiz && !qResolved);
}

function parseAnswer(s) {
  const v = parseFloat(String(s).replace(/[,%\s]/g, ''));
  return isNaN(v) ? null : v;
}

function checkAnswer() {
  if (phase !== 'quiz' || qResolved) return;
  const q = QUESTIONS[qIndex];
  let right;
  if (q.type === 'choice') {
    right = answerSelect.value() === q.answer;
  } else {
    const v = parseAnswer(answerInput.value());
    if (v === null) {
      qFeedback = 'Type a number, then press Check.';
      qKind = 'wrong';
      return;
    }
    right = Math.abs(v - q.answer) <= q.tol;
  }
  qAttempts++;
  if (right) {
    if (qAttempts === 1) qScore++;  // only a first-attempt answer counts
    qFeedback = q.correctText || ('Correct: ' + q.shown + '. ' + q.working);
    qKind = 'correct';
    qResolved = true;
  } else if (qAttempts === 1) {
    qFeedback = q.wrongText + ' Try once more.';
    qKind = 'wrong';
  } else {
    qFeedback = 'The answer is ' + q.shown + '. ' + q.working;
    qKind = 'reveal';
    qResolved = true;
  }
  updateQuizButtons();
}

function nextQuestion() {
  if (!qResolved) return;
  if (qIndex < QUESTIONS.length - 1) {
    qIndex++;
    loadQuestion();
  } else {
    phase = 'explore';
    setSimEnabled(true);
    updateQuizButtons();
    positionControls();
  }
}

function startOver() {
  phase = 'quiz';
  qIndex = 0;
  qScore = 0;
  resetSimDefaults();
  setSimEnabled(false);
  loadQuestion();
}

// Draw the question panel; returns the y of the input row (for positioning).
function quizInputY(y) {
  return y + 102;
}

function drawQuizPanel(x, y, w, h) {
  const q = QUESTIONS[qIndex];
  stroke('#4682b4');
  strokeWeight(2);
  fill('white');
  rect(x, y, w, h, 8);
  noStroke();
  fill('#1f3f66');
  textStyle(BOLD);
  textSize(16);
  textAlign(LEFT, TOP);
  text('Question ' + (qIndex + 1) + ' of ' + QUESTIONS.length, x + 12, y + 10);
  textAlign(RIGHT, TOP);
  text('Score: ' + qScore + ' of ' + QUESTIONS.length, x + w - 12, y + 10);
  textStyle(NORMAL);
  fill('#1a1a1a');
  fitText(q.text, x + 12, y + 34, w - 24, 62, 16, 11, LEFT);
  if (q.unit) {
    textSize(16);
    textAlign(LEFT, CENTER);
    fill('#1a1a1a');
    text(q.unit, x + 12 + 128, quizInputY(y) + 14);
  }
  // feedback
  const fy = quizInputY(y) + 40, fh = y + h - 10 - fy;
  let bg = '#f4f4f4', edge = '#cccccc', ink = '#444';
  let msg = qFeedback || (q.type === 'choice'
    ? 'Choose an answer, then press Check.'
    : 'Type your answer, then press Check. Only the number counts.');
  if (qKind === 'correct') { bg = '#e6f4ea'; edge = '#2e7d32'; ink = '#1b4d20'; }
  else if (qKind === 'wrong') { bg = '#fff1e6'; edge = '#c75b12'; ink = '#5a2a00'; }
  else if (qKind === 'reveal') { bg = '#fff8e1'; edge = '#b28704'; ink = '#4a3800'; }
  stroke(edge);
  strokeWeight(1);
  fill(bg);
  rect(x + 12, fy, w - 24, fh, 6);
  noStroke();
  fill(ink);
  fitText(msg, x + 22, fy + 6, w - 44, fh - 12, 15, 11, LEFT);
}

// ================================================================ text helpers
// Shrink the current text size until one line fits in maxW.
function fitLineSize(str, maxW, size, minSize) {
  textSize(size);
  while (size > minSize && textWidth(str) > maxW) { size--; textSize(size); }
  return size;
}

function wrapLines(str, maxW) {
  const words = String(str).split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? line + ' ' + word : word;
    if (textWidth(test) > maxW && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// Draw wrapped text inside a box, shrinking the size until it fits.
function fitText(str, x, y, w, h, maxSize, minSize, align) {
  let size = maxSize, lines;
  while (true) {
    textSize(size);
    lines = wrapLines(str, w);
    if (lines.length * size * 1.3 <= h || size <= minSize) break;
    size -= 1;
  }
  textAlign(align, TOP);
  const lh = size * 1.3;
  const ax = align === CENTER ? x + w / 2 : x;
  for (let i = 0; i < lines.length; i++) text(lines[i], ax, y + i * lh);
}

function fmt(v, digits) {
  return v.toLocaleString('en-US', { maximumFractionDigits: digits, minimumFractionDigits: 0 });
}
