// False Accusations Calculator MicroSim (p5.js)
// CANVAS_HEIGHT: 656
// Answer three questions first. Then six sliders unlock and the counts and
// shares update at once. No animation.
// Shows how a small false-positive rate, and a higher rate for English-language
// learners (ELL), turns into many false accusations.

// ---------------------------------------------------------------- CONFIG
const SIM = {
  title: 'False Accusations Calculator',
  prompt: 'If the detector wrongly flags only 1 percent of human essays, how many accusations are false?',
  rules: 'AI essays = essays × share written by AI. Human essays = essays − AI essays. True flags = AI essays × sensitivity. ELL essays = human essays × ELL share; other essays = the rest. Wrong flags = ELL essays × ELL rate + other essays × most-writers rate. False share = wrong flags ÷ (true flags + wrong flags). ELL share = ELL wrong flags ÷ wrong flags.',
  footer: 'Illustrative, not the performance of any real detector.',
  // [label, min, max, step, default, unit]
  inputs: [
    ['Essays checked', 1000, 20000, 1000, 10000, ''],
    ['Share written by AI', 0, 50, 1, 5, '%'],
    ['Detector catches AI essays', 50, 100, 5, 80, '%'],
    ['False-positive rate, most writers', 0, 10, 1, 1, '%'],
    ['Share of human essays by ELL writers', 0, 30, 5, 10, '%'],
    ['False-positive rate, ELL writers', 0, 50, 5, 20, '%']
  ]
};

const QUESTIONS = [
  { text: 'Use the defaults: 10,000 essays, 5 percent written by AI, 80 percent caught. Suppose every writer has a 1 percent false-positive rate. What share of flagged essays are false accusations?',
    type: 'number', answer: 19.2, tol: 0.5, unit: '%', shown: '19.2 percent',
    working: '500 AI essays give 400 true flags. 9,500 human essays at 1 percent give 95 wrong flags. 95 ÷ (400 + 95) = 19.2 percent: about 1 in 5 accusations is false.',
    wrongText: 'Not quite. Work from counts: flagged essays are true flags plus wrong flags.' },
  { text: 'Now English-language learners write 10 percent of the 9,500 human essays, and the detector wrongly flags 20 percent of their essays. How many wrong flags fall on English-language learners?',
    type: 'number', answer: 190, tol: 1, unit: 'flags', shown: '190 wrong flags',
    working: 'ELL essays = 9,500 × 10% = 950. Wrong flags = 950 × 20% = 190.',
    wrongText: 'Not quite. Work from counts: flagged essays are true flags plus wrong flags.' },
  { text: 'Other writers keep the 1 percent rate. What share of all wrong flags fall on English-language learners?',
    type: 'number', answer: 69.0, tol: 0.5, unit: '%', shown: '69.0 percent',
    working: 'Other essays = 8,550, and 1 percent gives 85.5 wrong flags. Total wrong flags = 190 + 85.5 = 275.5. 190 ÷ 275.5 = 69.0 percent, from writers of 10 percent of the essays.',
    wrongText: 'Not quite. Work from counts: flagged essays are true flags plus wrong flags.' }
];

// ---------------------------------------------------------------- layout
let canvasWidth = 700;
const rulesY = 66, rulesH = 82;
const panelY = 156, panelH = 252;
const footerY = 414;
let drawHeight = 438;
let controlHeight = 6 * 34 + 14;
let canvasHeight = drawHeight + controlHeight;
let sliderLeft = 322;

let sliders = [];
let defaultsButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create every control before positioning any of them.
  for (const inp of SIM.inputs) sliders.push(createSlider(inp[1], inp[2], inp[4], inp[3]));
  defaultsButton = createButton('Defaults');
  defaultsButton.mousePressed(resetSimDefaults);
  createQuizControls();

  setSimEnabled(false);
  loadQuestion();
  positionControls();
  describe('A calculator for AI-writing detector errors. After three questions, six sliders set the essays, the AI share, the detection rate, and the false-positive rates; the sim shows how many flags are false and how many fall on English-language learners.', LABEL);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = Math.max(400, container.offsetWidth);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

function positionControls() {
  sliderLeft = Math.min(322, Math.round(canvasWidth * 0.5));
  const sw = Math.max(60, canvasWidth - sliderLeft - 120);
  for (let i = 0; i < sliders.length; i++) {
    sliders[i].position(sliderLeft, drawHeight + 7 + i * 34);
    sliders[i].size(sw);
  }
  defaultsButton.position(canvasWidth - 100, drawHeight + 7);
  restartButton.position(canvasWidth - 100, drawHeight + 41);
  positionQuizControls(margin + 12, quizInputY(panelY));
}

function setSimEnabled(on) {
  for (const s of sliders) setEnabled(s, on);
  if (on) defaultsButton.show(); else defaultsButton.hide();
}

function resetSimDefaults() {
  for (let i = 0; i < sliders.length; i++) sliders[i].value(SIM.inputs[i][4]);
}

function computeResults() {
  const v = sliders.map(s => Number(s.value()));
  const [essays, aiShare, sens, fpr, ellShare, ellRate] = v;
  const ai = essays * aiShare / 100;
  const human = essays - ai;
  const trueFlags = ai * sens / 100;
  const ell = human * ellShare / 100;
  const other = human - ell;
  const ellWrong = ell * ellRate / 100;
  const otherWrong = other * fpr / 100;
  const wrong = ellWrong + otherWrong;
  const flags = trueFlags + wrong;
  return { essays, ai, human, trueFlags, ell, other, ellWrong, otherWrong, wrong, flags };
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
  text(SIM.title, canvasWidth / 2, 8);
  fill('#1f3f66');
  fitText(SIM.prompt, margin, 38, canvasWidth - 2 * margin, 22, 15, 11, CENTER);
  textStyle(NORMAL);

  stroke('#9bb7d4');
  fill('#eef5fc');
  rect(margin, rulesY, canvasWidth - 2 * margin, rulesH, 6);
  noStroke();
  fill('#1a1a1a');
  fitText('Rules. ' + SIM.rules, margin + 10, rulesY + 6, canvasWidth - 2 * margin - 20, rulesH - 10, 14, 10, LEFT);

  if (phase === 'quiz') drawQuizPanel(margin, panelY, canvasWidth - 2 * margin, panelH);
  else drawExplore(margin, panelY, canvasWidth - 2 * margin, panelH);

  // slider labels
  noStroke();
  fill(phase === 'quiz' ? '#777' : 'black');
  fitLineSize('Share of human essays by ELL writers: 30%', sliderLeft - 16, 15, 9);
  textAlign(LEFT, CENTER);
  for (let i = 0; i < sliders.length; i++) {
    const inp = SIM.inputs[i];
    text(inp[0] + ': ' + fmt(Number(sliders[i].value()), 0) + inp[5], 10, drawHeight + 17 + i * 34);
  }
  if (phase === 'quiz') {
    fill('#555');
    textSize(13);
    textAlign(RIGHT, TOP);
    text('Sliders unlock', canvasWidth - 12, drawHeight + 80);
    text('after the questions', canvasWidth - 12, drawHeight + 96);
  }

  fill('#555');
  textStyle(ITALIC);
  fitLineSize(SIM.footer, canvasWidth - 2 * margin, 13, 9);
  textAlign(CENTER, TOP);
  text(SIM.footer, canvasWidth / 2, footerY);
  textStyle(NORMAL);
}

function drawExplore(x, y, w, h) {
  const r = computeResults();
  stroke('#4682b4');
  strokeWeight(2);
  fill('white');
  rect(x, y, w, h, 8);
  noStroke();

  // left: the counts
  const rows = [
    ['AI essays', r.ai],
    ['Human essays', r.human],
    ['True flags (AI essays caught)', r.trueFlags],
    ['ELL essays', r.ell],
    ['Other human essays', r.other],
    ['Wrong flags on ELL writers', r.ellWrong],
    ['Wrong flags on other writers', r.otherWrong],
    ['Total wrong flags', r.wrong],
    ['All flagged essays', r.flags]
  ];
  const lw = Math.min(330, w * 0.5);
  const rowSize = fitLineSize('Wrong flags on other writers', lw - 72, 14, 8);
  for (let i = 0; i < rows.length; i++) {
    textSize(rowSize);
    const ry = y + 12 + i * 22;
    fill(i % 2 ? 'white' : '#f2f7fc');
    rect(x + 10, ry, lw - 10, 22);
    fill(i === 7 ? '#a3460a' : '#1a1a1a');
    textStyle(i >= 7 ? BOLD : NORMAL);
    textAlign(LEFT, CENTER);
    text(rows[i][0], x + 16, ry + 11);
    textAlign(RIGHT, CENTER);
    text(fmt(rows[i][1], 1), x + lw - 6, ry + 11);
  }
  textStyle(NORMAL);

  // right: the two shares
  const rx = x + lw + 14, rw = w - lw - 24;
  const falseShare = r.flags > 0 ? (100 * r.wrong / r.flags).toFixed(1) + '%' : 'no flags';
  const ellShare = r.wrong > 0 ? (100 * r.ellWrong / r.wrong).toFixed(1) + '%' : 'no wrong flags';
  drawStat(rx, y + 12, rw, 'Share of flags that are false', falseShare, '#a3460a');
  drawStat(rx, y + 82, rw, 'ELL share of wrong flags', ellShare, '#6a1b9a');

  // stacked bar of all flags
  const by = y + 160;
  fill('#1a1a1a');
  textSize(13);
  textAlign(LEFT, TOP);
  text('Every flagged essay:', rx, by);
  const bw = rw, bh = 26, bx = rx;
  stroke('#999');
  noFill();
  rect(bx, by + 18, bw, bh);
  noStroke();
  if (r.flags > 0) {
    const parts = [[r.trueFlags, '#2e7d32'], [r.otherWrong, '#e08a3c'], [r.ellWrong, '#8e44ad']];
    let cx = bx;
    for (const [v, c] of parts) {
      const pw = bw * v / r.flags;
      fill(c);
      rect(cx, by + 18, pw, bh);
      cx += pw;
    }
  }
  // legend
  const leg = [['true flag', '#2e7d32'], ['wrong, other', '#e08a3c'], ['wrong, ELL', '#8e44ad']];
  let lx = bx;
  fitLineSize('true flag wrong, other wrong, ELL', bw - 90, 12, 7);
  textAlign(LEFT, CENTER);
  for (const [t, c] of leg) {
    fill(c);
    rect(lx, by + 52, 10, 10);
    fill('#1a1a1a');
    text(t, lx + 13, by + 57);
    lx += textWidth(t) + 26;
  }
  fill('#444');
  textSize(12);
  textAlign(LEFT, TOP);
  text('Question score: ' + qScore + ' of ' + QUESTIONS.length + '. Start over to answer again.', x + 16, y + h - 20);
}

function drawStat(x, y, w, label, value, color) {
  fill('#f6f6f6');
  rect(x, y, w, 62, 6);
  fill('#1f3f66');
  textSize(14);
  textAlign(CENTER, TOP);
  text(label, x + w / 2, y + 6);
  fill(color);
  textStyle(BOLD);
  textSize(26);
  text(value, x + w / 2, y + 26);
  textStyle(NORMAL);
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
