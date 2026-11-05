// Who May See This Record? MicroSim (p5.js)
// CANVAS_HEIGHT: 660
// The learner judges eight requests to see or use a student's learning record:
// Allow, Allow only with an agreement and family notice, or Do not allow.
// Two attempts per request; only the first attempt counts. Mastery is 7 of 8.
// The responses follow the chapter's five design principles, not any one law.
// Nothing moves until the learner acts. To change the content, edit CONFIG.
let drawHeight = 570;
let controlHeight = 90;

const CONFIG = {
  title: 'Who May See This Record?',
  provenance: 'Illustrative requests. The answers follow the chapter\'s five design principles, not any one law. Legal duties are covered in Chapter 10.',
  description: 'Eight requests to see or use a student\'s learning record, from teachers, parents, a student, a vendor, ' +
    'researchers, an advertiser, and a tutoring partner. Choose Allow, Allow only with an agreement and family notice, or Do not allow.',
  itemNoun: 'Request',
  prompt: 'Should this request be allowed?',
  pickHint: 'Choose a response below, then press Submit. Ask who is asking and for what purpose.',
  shuffle: true,
  passMark: 7,
  passMessage: 'You can judge who should see a student\'s record.',
  failMessage: 'Review the five principles and try again; the requests will be reshuffled.',
  defsDefault: true,
  defsLabel: 'Show the responses and principles',
  defsTitle: 'The three responses and the five principles',
  defsHint: 'Check "Show the responses and principles" to read what each response means.',
  options: [
    { label: 'Allow', def: 'A person with an educational need, or the student\'s own family, may see or take the record.' },
    { label: 'Allow only with an agreement and family notice', button: 'Agreement and family notice',
      def: 'An outside party may use the record only under a written agreement that states the purpose, with the family notified.' },
    { label: 'Do not allow', def: 'The use has no educational need or goes beyond the stated purpose.' }
  ],
  defsExtra: [
    { label: 'Principles', def: 'Minimum necessary (collect only what instruction needs). See it (the family can view the record). ' +
      'Take it (they can export it). Limit it (only people with an educational need see identifiable records; outside parties only under a written agreement). ' +
      'Remove it (delete the record when it is no longer needed).' }
  ],
  items: [
    { text: 'A teacher views the mastery records of the students in her own class to plan next week.', answer: 0,
      short: 'Teacher views her own class.', why: 'The teacher has a direct educational need for her own students.' },
    { text: 'A teacher with no connection to a class looks up the records of its students out of curiosity.', answer: 2,
      short: 'Unconnected teacher, out of curiosity.', why: 'There is no educational need, so access is not justified.' },
    { text: 'A parent asks to see their own child\'s learning record.', answer: 0,
      short: 'Parent asks to see own child\'s record.', why: 'Parents have the right to inspect their child\'s education records.' },
    { text: 'A student moving to a new school asks for a copy of their record in a standard format.', answer: 0,
      short: 'Student moving schools asks for a copy.', why: 'Data portability lets the record follow the student.' },
    { text: 'The software vendor wants to use identifiable student records to train a new commercial product.', answer: 2,
      short: 'Vendor trains a new commercial product.', why: 'The use goes beyond providing the service the school bought.' },
    { text: 'A university team, working under a district-approved study, asks for class-level summaries with no student names.', answer: 1,
      short: 'University study asks for class summaries.', why: 'An outside party may use data only under a written agreement stating the purpose.',
      hint: 'The team is an outside party with a stated research purpose. Think about what an outside party needs before it may use school data.' },
    { text: 'An advertiser asks for a list of students who are struggling in math.', answer: 2,
      short: 'Advertiser wants struggling students.', why: 'Student records must never be used for advertising.' },
    { text: 'A district-approved tutoring partner asks to see one student\'s fractions mastery to prepare a session.', answer: 1,
      short: 'Tutoring partner prepares a session.', why: 'An outside party with an educational purpose needs an agreement and notice.',
      hint: 'The partner has an educational purpose, but it is an outside party, not the student\'s own school staff.' }
  ],
  drawSummary(x, y, w) {
    const counts = [0, 0, 0];
    CONFIG.items.forEach(it => counts[it.answer]++);
    y += textBlock('Across the eight requests: ' + counts[0] + ' allowed, ' + counts[1] + ' need an agreement and family notice, and ' +
      counts[2] + ' refused. The job title alone never decided the answer: a teacher appears under both Allow and Do not allow. ' +
      'The purpose of the request did.', x, y, w, 16, { color: 'midnightblue' });
    return y + 8;
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
// Classifier engine: one item at a time, choose one option, Submit.
// Two attempts per item; only the first attempt counts toward the score.
// Everything the learner sees comes from the CONFIG block above.
// ---------------------------------------------------------------------------
let canvasHeight = drawHeight + controlHeight;
let order = [];          // shuffled item indexes
let pos = 0;             // position in order
let pick = -1;           // option index the learner has selected
let attempt = 0;         // submitted attempts on this item
let resolved = false;    // item finished (correct, or two attempts used)
let finished = false;    // all items done
let feedback = null;     // {kind, lead, body, extra}
let firstTry = [];       // per item index: true/false after the first attempt
let optionButtons = [];
let submitButton, nextButton, againButton, defsCheckbox;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create every control before positioning any of them
  for (let i = 0; i < CONFIG.options.length; i++) {
    const b = createButton(CONFIG.options[i].button || CONFIG.options[i].label);
    b.parent(document.querySelector('main'));
    styleButton(b);
    b.attribute('aria-label', 'Choose ' + CONFIG.options[i].label);
    b.mousePressed(() => choose(i));
    optionButtons.push(b);
  }
  submitButton = createButton('Submit');
  submitButton.parent(document.querySelector('main'));
  styleButton(submitButton, 80);
  submitButton.mousePressed(submitPick);
  nextButton = createButton('Next');
  nextButton.parent(document.querySelector('main'));
  styleButton(nextButton, 70);
  nextButton.mousePressed(nextItem);
  againButton = createButton('Try again');
  againButton.parent(document.querySelector('main'));
  styleButton(againButton);
  againButton.mousePressed(startQuiz);
  defsCheckbox = createCheckbox(' ' + CONFIG.defsLabel, !!CONFIG.defsDefault);
  defsCheckbox.parent(document.querySelector('main'));
  defsCheckbox.style('font-size', '15px');
  defsCheckbox.changed(() => redraw());

  startQuiz();
  layoutControls();
  describe(CONFIG.description, LABEL);
  noLoop();
}

function startQuiz() {
  const idx = CONFIG.items.map((_, i) => i);
  order = CONFIG.shuffle ? shuffled(idx) : idx;
  pos = 0;
  firstTry = new Array(CONFIG.items.length).fill(null);
  finished = false;
  resetItem();
  layoutControls();
  redraw();
}

function resetItem() {
  pick = -1;
  attempt = 0;
  resolved = false;
  feedback = null;
  refreshButtons();
}

function currentItem() { return CONFIG.items[order[pos]]; }

function choose(i) {
  if (resolved || finished) return;
  pick = i;
  refreshButtons();
  redraw();
}

function optLabel(i) { return CONFIG.options[i].label; }

function submitPick() {
  if (pick < 0 || resolved || finished) return;
  const it = currentItem();
  const ok = pick === it.answer;
  attempt++;
  if (attempt === 1) firstTry[order[pos]] = ok;
  const extra = CONFIG.afterResolve ? CONFIG.afterResolve(it) : '';
  if (ok) {
    resolved = true;
    feedback = { kind: 'ok', lead: 'Correct: ' + optLabel(it.answer) + '.',
                 body: it.why + (attempt > 1 ? ' (A second try does not change your first-try score.)' : ''), extra: extra };
  } else if (attempt === 1) {
    feedback = { kind: 'retry', lead: 'Not quite.',
                 body: (CONFIG.wrongPrefix ? CONFIG.wrongPrefix + ' ' : '') + (it.hint || it.why) + ' Choose again and press Submit.' };
  } else {
    resolved = true;
    feedback = { kind: 'miss', lead: 'The answer is ' + optLabel(it.answer) + '.',
                 body: it.why + ' This one counts as missed.', extra: extra };
  }
  refreshButtons();
  redraw();
}

function nextItem() {
  if (!resolved) return;
  if (pos < order.length - 1) {
    pos++;
    resetItem();
  } else {
    finished = true;
    refreshButtons();
  }
  layoutControls();
  redraw();
}

function score() { return firstTry.filter(v => v === true).length; }

function refreshButtons() {
  const it = finished ? null : currentItem();
  for (let i = 0; i < optionButtons.length; i++) {
    const b = optionButtons[i];
    showEl(b, !finished);
    if (finished) continue;
    if (resolved && i === it.answer) setButtonColor(b, 'forestgreen', 'white');
    else if (i === pick && !resolved) setButtonColor(b, 'royalblue', 'white');
    else if (i === pick && resolved) setButtonColor(b, 'firebrick', 'white');
    else setButtonColor(b, 'whitesmoke', 'black');
    enableEl(b, !resolved);
    if (resolved && (i === it.answer || i === pick)) b.style('opacity', '1');
  }
  showEl(submitButton, !finished);
  showEl(nextButton, !finished);
  showEl(againButton, finished);
  if (!finished) {
    enableEl(submitButton, pick >= 0 && !resolved);
    enableEl(nextButton, resolved);
    nextButton.html(pos === order.length - 1 ? 'See score' : 'Next');
    if (pick >= 0 && !resolved) setButtonColor(submitButton, 'gold', 'black');
    else setButtonColor(submitButton, 'whitesmoke', 'black');
    if (resolved) setButtonColor(nextButton, 'gold', 'black');
    else setButtonColor(nextButton, 'whitesmoke', 'black');
  }
}

// Lay out option buttons left to right, wrapping to a new row when needed,
// then a row with Submit, Next and the definitions checkbox.
function layoutControls() {
  if (!submitButton) return;
  const gap = 8;
  let x = margin, y = drawHeight + 8;
  const rowH = 38;
  for (const b of optionButtons) {
    const w = b.elt.offsetWidth || 120;
    if (x + w > canvasWidth - margin && x > margin) { x = margin; y += rowH; }
    b.position(x, y);
    x += w + gap;
  }
  y = finished ? drawHeight + 8 : y + rowH + 4;
  x = margin;
  if (finished) {
    againButton.position(x, y);
    x += (againButton.elt.offsetWidth || 90) + 16;
  } else {
    submitButton.position(x, y);
    x += (submitButton.elt.offsetWidth || 80) + gap;
    nextButton.position(x, y);
    x += (nextButton.elt.offsetWidth || 70) + 16;
  }
  defsCheckbox.position(x, y + 6);
}

// ---------------------------------------------------------------------------
// Drawing
// ---------------------------------------------------------------------------
function feedbackColors(kind) {
  if (kind === 'ok') return ['honeydew', 'forestgreen', 'darkgreen'];
  if (kind === 'retry') return ['seashell', 'darkorange', 'saddlebrown'];
  return ['mistyrose', 'firebrick', 'darkred'];
}

// Every possible feedback for an item, used to reserve a stable panel height
function feedbackVariants(it) {
  const extra = CONFIG.afterResolve ? CONFIG.afterResolve(it) : '';
  return [
    ['Correct: ' + optLabel(it.answer) + '.', it.why + ' (A second try does not change your first-try score.)', extra],
    ['Not quite.', (CONFIG.wrongPrefix ? CONFIG.wrongPrefix + ' ' : '') + (it.hint || it.why) + ' Choose again and press Submit.', ''],
    ['The answer is ' + optLabel(it.answer) + '.', it.why + ' This one counts as missed.', extra]
  ];
}

function measureFeedback(f, w) {
  let h = leadBody(f[0], f[1], 0, 0, w, 16, 'black', false);
  if (f[2]) h += 6 + textBlock(f[2], 0, 0, w, 15, { draw: false, style: ITALIC });
  return h + 20;
}

function measureCard(it, w) {
  let h = textBlock(it.text, 0, 0, w, 17, { draw: false });
  if (it.extraLine) h += 6 + textBlock(it.extraLine, 0, 0, w, 16, { draw: false, style: BOLD });
  return h + 20;
}

function draw() {
  drawBackgrounds();
  let y = drawTitle(CONFIG.title, CONFIG.provenance);
  const w = canvasWidth - 2 * margin;

  if (finished) { drawResults(y, w); return; }

  // Status line
  textSize(16);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  text(CONFIG.itemNoun + ' ' + (pos + 1) + ' of ' + order.length, margin, y);
  textAlign(RIGHT, TOP);
  textStyle(BOLD);
  text('First-try correct: ' + score() + ' of ' + order.length, canvasWidth - margin, y);
  textStyle(NORMAL);
  y += 26;

  // Prompt
  y += textBlock(CONFIG.prompt, margin, y, w, 18, { style: BOLD, color: 'midnightblue' }) + 6;

  // Optional source passage drawn above the item (custom drawer)
  if (CONFIG.drawAboveCard) y = CONFIG.drawAboveCard(margin, y, w, currentItem(), resolved || attempt > 0) + 8;

  // Item card, reserved at the height of the longest item
  const it = currentItem();
  let cardH = 0;
  for (const other of CONFIG.items) cardH = Math.max(cardH, measureCard(other, w - 24));
  panel(margin, y, w, cardH, 'white', 'steelblue');
  let cy = y + 10;
  cy += textBlock(it.text, margin + 12, cy, w - 24, 17);
  if (it.extraLine) textBlock(it.extraLine, margin + 12, cy + 6, w - 24, 16, { style: BOLD, color: 'midnightblue' });
  y += cardH + 8;

  // Feedback panel, reserved at the largest feedback height
  let fbH = 0;
  for (const other of CONFIG.items) for (const f of feedbackVariants(other)) fbH = Math.max(fbH, measureFeedback(f, w - 24));
  if (feedback) {
    const c = feedbackColors(feedback.kind);
    panel(margin, y, w, fbH, c[0], c[1]);
    let fy = y + 10;
    fy += leadBody(feedback.lead, feedback.body, margin + 12, fy, w - 24, 16, c[2]);
    if (feedback.extra) textBlock(feedback.extra, margin + 12, fy + 6, w - 24, 15, { color: 'black', style: ITALIC });
  } else {
    panel(margin, y, w, fbH, 'ghostwhite', 'gainsboro');
    textBlock(attempt === 0 ? CONFIG.pickHint : '', margin + 12, y + 10, w - 24, 16, { color: 'dimgray' });
  }
  y += fbH + 8;

  // Definitions (exploration)
  window.__neededDrawHeight = Math.max(window.__neededDrawHeight || 0, y + definitionsHeight(w) + 8);
  if (defsCheckbox.checked()) y = drawDefinitions(y, w);
  else if (CONFIG.defsHint) textBlock(CONFIG.defsHint, margin, y, w, 15, { color: 'dimgray', style: ITALIC });
}

// Option definitions plus any extra entries (such as principles) to show with them
function defEntries() { return CONFIG.options.concat(CONFIG.defsExtra || []); }

function definitionsHeight(w) {
  let h = 30;
  for (const o of defEntries()) h += textBlock(o.label + ': ' + o.def, 0, 0, w - 24, 15, { draw: false }) + 4;
  return h + 6;
}

function drawDefinitions(y, w) {
  const h = definitionsHeight(w);
  panel(margin, y, w, h, 'white', 'silver');
  let dy = y + 8;
  textBlock(CONFIG.defsTitle, margin + 12, dy, w - 24, 16, { style: BOLD });
  dy += 24;
  const hiSet = (!finished && resolved && CONFIG.defsHighlight) ? CONFIG.defsHighlight(currentItem()) : [];
  let k = -1;
  for (const o of defEntries()) {
    k++;
    if (hiSet.includes(k)) {
      const eh = textBlock(o.label + ': ' + o.def, 0, 0, w - 24, 15, { draw: false });
      noStroke();
      fill('palegreen');
      rect(margin + 6, dy - 2, w - 12, eh + 4, 4);
    }
    textSize(15);
    textStyle(BOLD);
    const lw = textWidth(o.label + ':') + 7;
    textStyle(NORMAL);
    // Bold term followed by its definition
    const lines = wrapLines(o.label + ': ' + o.def, w - 24);
    noStroke();
    textAlign(LEFT, TOP);
    for (let i = 0; i < lines.length; i++) {
      if (i === 0) {
        fill('midnightblue'); textStyle(BOLD); text(o.label + ':', margin + 12, dy);
        textStyle(NORMAL); fill('black'); text(lines[0].substring(o.label.length + 1).trim(), margin + 12 + lw, dy);
      } else {
        fill('black'); text(lines[i], margin + 12, dy);
      }
      dy += 15 * 1.3;
    }
    dy += 4;
  }
  return y + h + 8;
}

function drawResults(y, w) {
  const n = order.length;
  const s = score();
  const pass = s >= CONFIG.passMark;
  const c = pass ? ['honeydew', 'forestgreen', 'darkgreen'] : ['seashell', 'darkorange', 'saddlebrown'];
  const msg = pass ? CONFIG.passMessage : CONFIG.failMessage;
  const top = y;
  let h = 20 + 30 + textBlock(msg, 0, 0, w - 24, 17, { draw: false });
  panel(margin, y, w, h, c[0], c[1]);
  textBlock('First-try correct: ' + s + ' of ' + n, margin + 12, y + 10, w - 24, 22, { style: BOLD, color: c[2] });
  textBlock(msg, margin + 12, y + 42, w - 24, 17, { color: c[2] });
  y += h + 10;

  // Every item, marked right or missed on the first try, with its answer
  y += textBlock('Your first tries (' + (n - s) + ' missed):', margin, y, w, 16, { style: BOLD }) + 4;
  for (const i of order) {
    const it = CONFIG.items[i];
    const ok = firstTry[i] === true;
    noStroke();
    fill(ok ? 'forestgreen' : 'firebrick');
    textSize(15);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text(ok ? '✓' : '✗', margin + 4, y + 2);
    textStyle(NORMAL);
    const line = (it.short || it.text) + ' Answer: ' + optLabel(it.answer) + '.';
    y += textBlock(line, margin + 24, y + 2, w - 24, 15, { color: ok ? 'black' : 'darkred' }) + 3;
  }
  y += 8;
  if (CONFIG.drawSummary) y = CONFIG.drawSummary(margin, y, w);
  if (defsCheckbox.checked()) drawDefinitions(y, w);
  window.__resultsBottom = y;
}
