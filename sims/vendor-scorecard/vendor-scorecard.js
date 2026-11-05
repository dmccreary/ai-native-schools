// Vendor Scorecard MicroSim (p5.js)
// CANVAS_HEIGHT: 660
// Answer three questions first. Then the score menus unlock and the weighted
// totals, the bars, and the knockout status update at once. No animation.
// Weighted score = sum of (weight x score / 5). Knockout: privacy or viability <= 2.

// ---------------------------------------------------------------- CONFIG
const SIM = {
  title: 'Vendor Scorecard',
  prompt: 'Which vendor should the district move forward with?',
  rules: 'Weighted score = the sum over criteria of (weight × score ÷ 5), out of 100. Knockout rule: a vendor that scores 2 or below on privacy and data governance, or on vendor viability, may not proceed until the problem is resolved.',
  footer: 'Illustrative scorecard. Scores run from 1 (weak) to 5 (strong).',
  // [criterion, weight, Vendor A, Vendor B, knockout criterion?]
  criteria: [
    ['Independent evidence of effect', 20, 4, 3, false],
    ['Privacy and data governance', 20, 5, 3, true],
    ['Level and capability fit', 15, 3, 5, false],
    ['Guardrails for the AI tutor', 15, 4, 3, false],
    ['Standards and interoperability', 10, 3, 5, false],
    ['Total cost of ownership', 10, 4, 3, false],
    ['Vendor viability', 10, 2, 5, true]
  ]
};

const QUESTIONS = [
  { text: "What is Vendor A's weighted score, out of 100?",
    type: 'number', answer: 75, tol: 0.5, unit: 'points', shown: '75',
    working: '16 + 20 + 9 + 12 + 6 + 8 + 4 = 75. For example, privacy is 20 × 5 ÷ 5 = 20, and viability is 10 × 2 ÷ 5 = 4.',
    wrongText: 'Not quite. Multiply each weight by its score, divide by 5, and add.' },
  { text: "What is Vendor B's weighted score, out of 100?",
    type: 'number', answer: 74, tol: 0.5, unit: 'points', shown: '74',
    working: '12 + 12 + 15 + 9 + 10 + 6 + 10 = 74. Vendor B is one point behind Vendor A.',
    wrongText: 'Not quite. Multiply each weight by its score, divide by 5, and add.' },
  { text: 'Which vendor may proceed under the knockout rule?',
    type: 'choice', options: ['Vendor A', 'Vendor B', 'Both vendors', 'Neither vendor'], answer: 'Vendor B',
    shown: 'Vendor B',
    correctText: 'Correct: Vendor B. Vendor A has the higher total but a viability score of 2.',
    working: 'Vendor A has the higher total but a viability score of 2, which knocks it out until the problem is resolved.',
    wrongText: 'Check the knockout rule for privacy and viability.' }
];

// ---------------------------------------------------------------- layout
let canvasWidth = 700;
const rulesY = 66, rulesH = 50;
const tableY = 124, headH = 26, rowH = 30;
const panelY = 372, panelH = 206;
const footerY = 586;
let drawHeight = 610;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

let selA = [], selB = [];
let defaultsButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create every control before positioning any of them.
  for (const c of SIM.criteria) {
    selA.push(makeScoreSelect(c[2]));
    selB.push(makeScoreSelect(c[3]));
  }
  defaultsButton = createButton('Defaults');
  defaultsButton.mousePressed(resetSimDefaults);
  createQuizControls();

  setSimEnabled(false);
  loadQuestion();
  positionControls();
  describe('A weighted vendor scorecard. After three questions, menus set the scores of two vendors on seven criteria; the sim shows each weighted total and whether the knockout rule stops a vendor.', LABEL);
}

function makeScoreSelect(v) {
  const s = createSelect();
  for (let i = 1; i <= 5; i++) s.option(String(i));
  s.selected(String(v));
  s.style('font-size', '15px');
  // keep the scores readable while the menus are locked
  s.style('color', '#1a1a1a');
  s.style('opacity', '1');
  s.style('background-color', 'white');
  return s;
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = Math.max(420, container.offsetWidth);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

// Column x positions of the table.
function cols() {
  const x0 = margin, w = canvasWidth - 2 * margin;
  const vw = Math.min(120, w * 0.2), ww = 64;
  return { x0, w, critW: w - ww - 2 * vw, ww, vw,
           wx: x0 + w - ww - 2 * vw, ax: x0 + w - 2 * vw, bx: x0 + w - vw };
}

function positionControls() {
  const c = cols();
  for (let i = 0; i < selA.length; i++) {
    const y = tableY + headH + i * rowH + 3;
    selA[i].position(c.ax + 10, y);
    selB[i].position(c.bx + 10, y);
  }
  restartButton.position(10, drawHeight + 12);
  defaultsButton.position(110, drawHeight + 12);
  positionQuizControls(margin + 12, quizInputY(panelY));
}

function setSimEnabled(on) {
  for (const s of selA.concat(selB)) setEnabled(s, on);
  if (on) defaultsButton.show(); else defaultsButton.hide();
}

function resetSimDefaults() {
  for (let i = 0; i < SIM.criteria.length; i++) {
    selA[i].selected(String(SIM.criteria[i][2]));
    selB[i].selected(String(SIM.criteria[i][3]));
  }
}

function scoresOf(sels) {
  return sels.map(s => Number(s.value()));
}

function weighted(scores) {
  let t = 0;
  for (let i = 0; i < scores.length; i++) t += SIM.criteria[i][1] * scores[i] / 5;
  return t;
}

// Names of the knockout criteria a vendor fails.
function knockouts(scores) {
  const out = [];
  for (let i = 0; i < scores.length; i++) {
    if (SIM.criteria[i][4] && scores[i] <= 2) out.push(SIM.criteria[i][0].toLowerCase() + ' ' + scores[i]);
  }
  return out;
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
  fitLineSize(SIM.prompt, canvasWidth - 2 * margin, 16, 11);
  text(SIM.prompt, canvasWidth / 2, 40);
  textStyle(NORMAL);

  stroke('#9bb7d4');
  fill('#eef5fc');
  rect(margin, rulesY, canvasWidth - 2 * margin, rulesH, 6);
  noStroke();
  fill('#1a1a1a');
  fitText('Rules. ' + SIM.rules, margin + 10, rulesY + 6, canvasWidth - 2 * margin - 20, rulesH - 10, 14, 10, LEFT);

  drawTable();

  if (phase === 'quiz') drawQuizPanel(margin, panelY, canvasWidth - 2 * margin, panelH);
  else drawExplore(margin, panelY, canvasWidth - 2 * margin, panelH);

  noStroke();
  fill('#555');
  textStyle(ITALIC);
  fitLineSize(SIM.footer, canvasWidth - 2 * margin, 13, 9);
  textAlign(CENTER, TOP);
  text(SIM.footer, canvasWidth / 2, footerY);
  textStyle(NORMAL);

  if (phase === 'quiz') {
    fill('#555');
    textSize(13);
    textAlign(RIGHT, CENTER);
    text('The score menus unlock after the questions.', canvasWidth - 12, drawHeight + 25);
  }
}

function drawTable() {
  const c = cols();
  // header
  stroke('#b0c4de');
  strokeWeight(1);
  fill('#e3eef9');
  rect(c.x0, tableY, c.w, headH);
  noStroke();
  fill('#1f3f66');
  textStyle(BOLD);
  textSize(14);
  textAlign(LEFT, CENTER);
  text('Criterion', c.x0 + 8, tableY + headH / 2);
  textAlign(CENTER, CENTER);
  text('Weight', c.wx + c.ww / 2, tableY + headH / 2);
  text('Vendor A', c.ax + c.vw / 2, tableY + headH / 2);
  text('Vendor B', c.bx + c.vw / 2, tableY + headH / 2);
  textStyle(NORMAL);

  const a = scoresOf(selA), b = scoresOf(selB);
  // one text size for every criterion label: the size at which the longest fits
  let labelSize = 14;
  for (const cr of SIM.criteria) {
    labelSize = Math.min(labelSize, fitLineSize(cr[0] + (cr[4] ? '  (knockout)' : ''), c.critW - 12, 14, 9));
  }
  for (let i = 0; i < SIM.criteria.length; i++) {
    const cr = SIM.criteria[i];
    const y = tableY + headH + i * rowH;
    stroke('#b0c4de');
    fill(cr[4] ? '#fff8ee' : 'white');
    rect(c.x0, y, c.w, rowH);
    noStroke();
    fill('#1a1a1a');
    const label = cr[0] + (cr[4] ? '  (knockout)' : '');
    textSize(labelSize);
    textAlign(LEFT, CENTER);
    text(label, c.x0 + 8, y + rowH / 2);
    textSize(14);
    textAlign(CENTER, CENTER);
    text(cr[1], c.wx + c.ww / 2, y + rowH / 2);
    if (phase === 'explore') {
      // weighted points beside each menu
      fill('#555');
      textSize(13);
      textAlign(RIGHT, CENTER);
      text('= ' + fmt(cr[1] * a[i] / 5, 1), c.ax + c.vw - 8, y + rowH / 2);
      text('= ' + fmt(cr[1] * b[i] / 5, 1), c.bx + c.vw - 8, y + rowH / 2);
      // flag a knockout score
      if (cr[4]) {
        noFill();
        stroke('#c75b12');
        strokeWeight(2);
        if (a[i] <= 2) rect(c.ax + 3, y + 2, c.vw - 6, rowH - 4, 4);
        if (b[i] <= 2) rect(c.bx + 3, y + 2, c.vw - 6, rowH - 4, 4);
        noStroke();
      }
    }
  }
  // column lines
  stroke('#b0c4de');
  const bottom = tableY + headH + SIM.criteria.length * rowH;
  line(c.wx, tableY, c.wx, bottom);
  line(c.ax, tableY, c.ax, bottom);
  line(c.bx, tableY, c.bx, bottom);
  noStroke();
}

function drawExplore(x, y, w, h) {
  const a = scoresOf(selA), b = scoresOf(selB);
  const ta = Math.round(weighted(a)), tb = Math.round(weighted(b));
  const ka = knockouts(a), kb = knockouts(b);

  stroke('#4682b4');
  strokeWeight(2);
  fill('white');
  rect(x, y, w, h, 8);
  noStroke();

  const labelW = 90, statusW = Math.min(250, w * 0.38);
  const barX = x + 12 + labelW, barW = w - 24 - labelW - statusW - 10;
  const rowsData = [['Vendor A', ta, ka, '#4682b4'], ['Vendor B', tb, kb, '#2a9d8f']];
  for (let i = 0; i < 2; i++) {
    const [name, total, ko, col] = rowsData[i];
    const by = y + 16 + i * 46;
    fill('#1a1a1a');
    textStyle(BOLD);
    textSize(16);
    textAlign(LEFT, CENTER);
    text(name, x + 14, by + 14);
    textStyle(NORMAL);
    fill('#eeeeee');
    rect(barX, by, barW, 28, 4);
    fill(ko.length ? '#bbbbbb' : col);
    rect(barX, by, barW * total / 100, 28, 4);
    fill(ko.length ? '#333' : 'white');
    textStyle(BOLD);
    textAlign(RIGHT, CENTER);
    text(total, barX + barW * total / 100 - 6, by + 14);
    textStyle(NORMAL);
    textSize(14);
    textAlign(LEFT, CENTER);
    fill(ko.length ? '#a3460a' : '#2e7d32');
    const status = ko.length ? 'Knocked out: ' + ko.join(', ') : 'May proceed';
    fitText(status, barX + barW + 10, by, statusW, 30, 14, 10, LEFT);
  }
  // scale marks
  fill('#666');
  textSize(11);
  textAlign(CENTER, TOP);
  for (const m of [0, 50, 100]) text(m, barX + barW * m / 100, y + 108);

  let verdict;
  if (ka.length && kb.length) verdict = 'Neither vendor may proceed.';
  else if (ka.length) verdict = 'Only Vendor B may proceed' + (ta > tb ? ', though Vendor A has the higher total.' : '.');
  else if (kb.length) verdict = 'Only Vendor A may proceed' + (tb > ta ? ', though Vendor B has the higher total.' : '.');
  else if (ta === tb) verdict = 'Both may proceed, and their totals are tied.';
  else verdict = 'Both may proceed. Vendor ' + (ta > tb ? 'A' : 'B') + ' has the higher total.';
  fill('#1f3f66');
  textStyle(BOLD);
  fitLineSize(verdict, w - 20, 17, 10);
  textAlign(CENTER, TOP);
  text(verdict, x + w / 2, y + 132);
  textStyle(NORMAL);
  fill('#444');
  textSize(13);
  text('Question score: ' + qScore + ' of ' + QUESTIONS.length + '. Press Start over to answer again.', x + w / 2, y + h - 24);
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
