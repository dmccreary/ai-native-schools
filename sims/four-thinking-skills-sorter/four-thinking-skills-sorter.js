// Four Thinking Skills Sorter MicroSim (p5.js)
// CANVAS_HEIGHT: 618
// Eight student activities, one at a time. The learner places each activity in one of four bins:
// Decomposition, Pattern recognition, Abstraction, or Algorithmic thinking.
// Two tries per activity; only the first try counts as evidence. Activities are shuffled each run.
// The activities are illustrative examples written for Chapter 12.
// The MicroSim opens on activity 1 and nothing moves until the learner answers.
// To change the activities, edit the CONFIG block below.

const DEFS = {
  'Decomposition': 'Breaking a big problem into smaller parts',
  'Pattern recognition': 'Noticing what repeats or what examples share',
  'Abstraction': 'Ignoring detail that does not matter, to focus on what does',
  'Algorithmic thinking': 'Writing precise steps that solve the problem every time'
};

const CONFIG = {
  title: 'Four Thinking Skills Sorter',
  description: 'Quiz with eight student activities. For each activity, choose the thinking skill it shows: decomposition, ' +
    'pattern recognition, abstraction, or algorithmic thinking. Two tries per activity; only the first try counts.',
  drawHeight: 450,
  wideMin: 640,
  minButtonWidth: 140,
  buttonHeight: 48,
  itemNoun: 'Activity',
  question: 'Which thinking skill is this?',
  cardNote: 'Illustrative example',
  prompt: 'Choose a skill below. You get two tries, and only the first try counts.',
  shuffle: true,
  attempts: 2,
  passMark: 7,
  passMessage: 'You can tell the four thinking skills apart.',
  failMessage: 'Review the four definitions and try again; the activities will be reshuffled.',
  summaryNote: () => 'Each skill appears exactly twice.',

  options: Object.keys(DEFS),
  optionColors: ['royalblue', 'darkorange', 'seagreen', 'darkorchid'],
  legendIsBins: true,
  legendTitle: 'Four thinking skills',
  legend: Object.keys(DEFS).map(k => ({ name: k })),
  reference: {
    title: 'The four thinking skills',
    columns: ['Skill', 'Definition'],
    weights: [0.32, 0.68],
    rows: Object.keys(DEFS).map(k => [k, DEFS[k]]),
    showLabel: 'Show definitions',
    hideLabel: 'Hide definitions'
  },

  correctMessage: it => ({ lead: 'Correct: ' + it.answer + '.', body: it.why }),
  hintMessage: it => ({ lead: 'Not quite.', body: it.why }),
  wrongMessage: it => ({ lead: 'Not quite. The skill is ' + it.answer + '.', body: it.why }),

  items: [
    { text: 'Splitting "plan the science fair" into venue, judges, posters, and schedule.', answer: 'Decomposition', why: 'The big problem is broken into smaller parts.' },
    { text: 'Noticing that the digits of every multiple of 9 up to 90 add up to 9.', answer: 'Pattern recognition', why: 'The student spots something that repeats across examples.' },
    { text: 'Drawing a subway map that shows stations and lines but not the streets.', answer: 'Abstraction', why: 'Detail that does not matter for the task is dropped.' },
    { text: 'Writing exact steps to find the tallest student in a line so that any helper could follow them.', answer: 'Algorithmic thinking', why: 'The steps are precise and work every time.' },
    { text: 'Breaking a long essay into an introduction, three arguments, and a conclusion.', answer: 'Decomposition', why: 'The task is divided into smaller parts.' },
    { text: 'Seeing that three differently worded word problems all need "total divided by count."', answer: 'Pattern recognition', why: 'The student finds what the examples share.' },
    { text: 'Replacing a story about apples with x and y to solve for the unknown.', answer: 'Abstraction', why: "The story's details are dropped and the structure kept." },
    { text: 'Writing a recipe in numbered steps so someone else can follow it without asking questions.', answer: 'Algorithmic thinking', why: 'The steps are exact enough to be followed without guessing.' }
  ]
};

// ---------------------------------------------------------------------------
// Quiz engine. Everything above this line is content (CONFIG); everything below is code.
// The sketch opens on the first item, nothing moves until the learner answers, and only the
// first committed answer to each item on the first run counts as evidence of mastery.
// ---------------------------------------------------------------------------

// Canvas dimensions: a drawing region above a control region that holds the buttons
const MIN_WIDTH = CONFIG.minWidth || 320; // narrowest container the layout is designed for
const BTN_H = CONFIG.buttonHeight || 48; // height of a choice button
const ACTION_H = 40; // height of the Next / reference row
const GAP = 8; // space between buttons
const pad = 12; // space around the panels in the drawing region

let containerWidth; // calculated from the <main> element on init and on resize
let canvasWidth = 400;
let drawHeight = CONFIG.drawHeight; // the drawing region has no controls
let controlHeight = Math.max(controlHeightFor(MIN_WIDTH), CONFIG.minControlHeight || 0); // sized for the narrowest layout
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let defaultTextSize = 16;

// Run state. Run 1 is the first run and the only one that counts as evidence; later runs are practice.
let order = []; // indexes into CONFIG.items for this run
let pos = 0; // position in the run
let tries = 0; // answers committed on the current item
let phase = 'question'; // 'question' | 'feedback' | 'summary'
let runNumber = 0;
let results = []; // one entry per item answered in this run
let firstRunScore = null; // score of run 1, kept for the summary of later runs
let message = null; // { lead, body, kind: 'good' | 'bad' | 'hint' }
let wrongPicks = []; // option indexes already tried on the current item
let firstCheck = []; // check mode: the choices marked at the first check of the current item
let reviewIndex = 0; // which missed item the summary is showing
let referenceOpen = false;
let selected = []; // check mode: which choice buttons are marked
let inputBox; // check mode: optional numeric entry
let refPage = 0; // page of the reference table when it is too tall for one screen
let binChips = []; // per option: chips for the items that were placed in it
let fly = null; // chip animation from the card to a bin, set only by a learner click
let layoutCache = { key: '', value: null };
const wrapCache = new Map();

// Controls
let choiceButtons = [];
let nextButton, referenceButton, prevReviewButton, nextReviewButton, againButton;
let exploreOpenButton, exploreContinueButton; // only when CONFIG.explore is set
let exploreReturnPhase = 'question'; // where the explore screen's button leads
let liveRegion;

const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setup() {
  updateCanvasSize(); // must be first: get the container width before creating the canvas
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  injectStyles();
  createControls();

  // Visually hidden live region so screen readers hear each result
  liveRegion = createDiv('');
  liveRegion.attribute('aria-live', 'polite');
  liveRegion.style('position', 'absolute');
  liveRegion.style('left', '-10000px');
  liveRegion.style('width', '1px');
  liveRegion.style('height', '1px');
  liveRegion.style('overflow', 'hidden');

  describe(CONFIG.description);
  startRun();
  noLoop(); // redraw only when the learner acts; loop() runs just while a chip is moving
}

function draw() {
  updateCanvasSize();

  // Drawing region (aliceblue) and control region (white), both with a silver border
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title, shrunk if needed so it fits a narrow container
  fill('black');
  noStroke();
  textStyle(BOLD);
  textSize(fitTextSize(CONFIG.title, canvasWidth - 2 * pad, 24, 17));
  textAlign(CENTER, TOP);
  text(CONFIG.title, canvasWidth / 2, 8);
  textStyle(NORMAL);

  drawProgress();
  if (CONFIG.input && (phase === 'question' || phase === 'feedback')) drawInputLabel();
  if (phase === 'explore') {
    CONFIG.explore.draw({ x: pad, y: 70, w: canvasWidth - 2 * pad, h: drawHeight - 70 - pad });
  } else if (phase === 'summary') {
    drawSummary();
  } else {
    const L = bodyLayout();
    drawCard(L);
    if (CONFIG.legend) drawLegend(L);
    drawFeedback(L);
    if (referenceOpen && activeReference()) drawReference(L.body);
    drawFly();
  }
}

// ---------------------------------------------------------------------------
// Layout: card, legend (the bins or choices with their definitions) and feedback.
// Wide containers use two columns. Narrower ones stack the panels. On a phone the legend
// shrinks to the bin names and the definitions move behind a button. The text size steps
// down from its preferred size until everything fits in the drawing region.
// ---------------------------------------------------------------------------
function bodyLayout() {
  const key = canvasWidth + '|' + (referenceOpen ? 1 : 0);
  if (layoutCache.key === key && layoutCache.value) return layoutCache.value;

  const top = 70;
  const body = { x: pad, y: top, w: canvasWidth - 2 * pad, h: drawHeight - top - pad };
  const attempts = [];
  if (!CONFIG.legend) {
    for (let ts = 18; ts >= 14; ts--) attempts.push({ mode: 'stacked', ts: ts });
  } else {
    if (canvasWidth >= (CONFIG.wideMin || 700)) for (let ts = 18; ts >= 15; ts--) attempts.push({ mode: 'wide', ts: ts });
    for (let ts = 18; ts >= 15; ts--) attempts.push({ mode: 'stacked', ts: ts });
    if (!CONFIG.customLegend) for (let ts = 18; ts >= 14; ts--) attempts.push({ mode: 'compact', ts: ts });
    else for (let ts = 18; ts >= 14; ts--) attempts.push({ mode: 'stacked', ts: ts });
  }

  let best = null;
  for (const at of attempts) {
    const leftW = at.mode === 'wide' ? Math.floor(body.w * 0.54) : body.w;
    const rightW = at.mode === 'wide' ? body.w - leftW - GAP : body.w;
    const need = measureNeeds(at.ts, at.mode, leftW, rightW);
    let total;
    if (at.mode === 'wide') total = Math.max(need.card + GAP + need.feedback, need.legend);
    else total = need.card + (CONFIG.legend && need.legend > 0 ? GAP + need.legend : 0) + GAP + need.feedback;
    best = { mode: at.mode, ts: at.ts, need: need, total: total, leftW: leftW, rightW: rightW };
    if (total <= body.h) break;
  }

  const need = best.need;
  const spare = Math.max(0, body.h - best.total);
  let card, legend = null, feedback;
  if (best.mode === 'wide') {
    // The feedback panel takes the spare height: it holds the longest text
    card = { x: body.x, y: body.y, w: best.leftW, h: need.card };
    feedback = { x: body.x, y: body.y + need.card + GAP, w: best.leftW, h: body.h - need.card - GAP };
    legend = { x: body.x + best.leftW + GAP, y: body.y, w: best.rightW, h: body.h };
  } else {
    const cardH = need.card + Math.floor(spare * 0.25);
    card = { x: body.x, y: body.y, w: body.w, h: cardH };
    let y = body.y + cardH + GAP;
    if (CONFIG.legend && need.legend > 0) {
      const legendH = need.legend + Math.floor(spare * 0.25);
      legend = { x: body.x, y: y, w: body.w, h: legendH };
      y += legendH + GAP;
    }
    feedback = { x: body.x, y: y, w: body.w, h: body.y + body.h - y };
  }

  const value = { mode: best.mode, ts: best.ts, wide: best.mode === 'wide', body: body, card: card, legend: legend,
                  feedback: feedback, fits: best.total <= body.h };
  layoutCache = { key: key, value: value };
  window.layoutWarnings = value.fits ? [] : ['content needs ' + best.total + 'px but only ' + body.h + 'px are available at width ' + canvasWidth];
  window.layoutInfo = { mode: value.mode, ts: value.ts, needed: best.total, available: body.h };
  return value;
}

// Height each panel needs at text size ts, taking the longest text it will ever show
function measureNeeds(ts, mode, cardW, legendW) {
  const lineH = Math.round(ts * 1.3);
  const itemTs = ts + 2;
  const itemLineH = Math.round(itemTs * 1.3);
  const inner = cardW - 24;

  // card: the question line(s) plus the longest item text
  textStyle(BOLD);
  textSize(ts);
  const qLines = wrapLines(CONFIG.question, inner).length;
  textStyle(NORMAL);
  textSize(itemTs);
  let itemH = 0;
  for (const it of CONFIG.items) {
    itemH = Math.max(itemH, itemHeight(itemLinesOf(it, inner), itemLineH));
  }
  let noteH = 0;
  if (CONFIG.cardNote) {
    textStyle(ITALIC);
    textSize(ts);
    noteH = wrapLines(CONFIG.cardNote, inner).length * lineH + 4;
    textStyle(NORMAL);
  }
  const card = 12 + qLines * lineH + 6 + itemH + noteH + 12;

  // feedback: lead line plus the longest body text for any message
  textSize(ts);
  let fbLines = 0;
  const msgs = [];
  for (const it of CONFIG.items) {
    msgs.push(CONFIG.correctMessage(it), CONFIG.wrongMessage(it));
    if (CONFIG.attempts > 1 && CONFIG.hintMessage) msgs.push(CONFIG.hintMessage(it));
  }
  for (const m of msgs) {
    textStyle(BOLD);
    const l1 = wrapLines(m.lead, cardW - 24).length;
    textStyle(NORMAL);
    const l2 = m.body ? wrapLines(m.body, cardW - 24).length : 0;
    fbLines = Math.max(fbLines, l1 + l2);
  }
  textStyle(NORMAL);
  fbLines = Math.max(fbLines, wrapLines(CONFIG.prompt, cardW - 24).length); // the prompt shows before the first answer
  const feedback = 10 + fbLines * lineH + 10;

  // legend: title, criterion and each entry (name, definition and room for the chips)
  let legend = 0;
  if (CONFIG.customLegend) {
    legend = CONFIG.customLegend.need(ts, mode, legendW);
  } else if (CONFIG.legend) {
    legend = 10;
    textSize(ts);
    if (CONFIG.legendTitle) {
      textStyle(BOLD);
      legend += wrapLines(CONFIG.legendTitle, legendW - 20).length * lineH + 4;
    }
    if (CONFIG.criterion) {
      textStyle(NORMAL);
      legend += wrapLines(CONFIG.criterion, legendW - 20).length * lineH + 8;
    }
    if (mode === 'compact' && CONFIG.legendHiddenWhenCompact) {
      legend = 0;
    } else if (mode === 'compact') {
      legend += compactBoxHeight(ts, lineH, legendW) + 6;
    } else {
      for (let i = 0; i < CONFIG.legend.length; i++) {
        legend += legendEntryHeight(i, ts, lineH, legendW - 28) + 6;
      }
      legend += 4;
    }
  }
  textStyle(NORMAL);
  return { card: card, feedback: feedback, legend: legend, lineH: lineH };
}

function legendEntryHeight(i, ts, lineH, innerW) {
  const e = CONFIG.legend[i];
  textStyle(BOLD);
  textSize(ts);
  let h = 6 + wrapLines(e.name, innerW).length * lineH;
  if (e.text) {
    textStyle(NORMAL);
    h += wrapLines(e.text, innerW).length * lineH;
  }
  if (CONFIG.legendIsBins) h += chipRows(i, innerW, 44) * 26;
  return h + 6;
}

// Rows of chips needed by bin i = items whose answer is that bin, at stride px per chip
function chipRows(i, innerW, stride) {
  const count = CONFIG.items.filter(it => it.answer === CONFIG.options[i]).length;
  const perRow = Math.max(1, Math.floor((innerW + 4) / stride));
  return count === 0 ? 0 : Math.ceil(count / perRow);
}

// Compact legend: one narrow box per bin side by side, holding the name and the chips
function compactBoxHeight(ts, lineH, totalW) {
  const n = CONFIG.legend.length;
  const boxW = Math.floor((totalW - 16 - (n - 1) * 6) / n);
  let tallest = 0;
  textStyle(BOLD);
  textSize(ts);
  for (let i = 0; i < n; i++) {
    let h = 6 + wrapLines(CONFIG.legend[i].name, boxW - 20).length * lineH;
    if (CONFIG.legendIsBins) h += chipRows(i, boxW - 20, 34) * 24;
    tallest = Math.max(tallest, h + 6);
  }
  return tallest;
}

// ---------------------------------------------------------------------------
// Drawing: progress strip, card, legend, feedback, reference table, summary
// ---------------------------------------------------------------------------
function drawInputLabel() {
  const g = buttonGrid(canvasWidth);
  const used = ACTION_H + GAP + g.rows * (BTN_H + GAP) + ACTION_H;
  const top = drawHeight + Math.max(GAP, Math.floor((controlHeight - used) / 2));
  const labelW = Math.min(240, Math.floor(g.avail * 0.62));
  noStroke();
  fill('black');
  textStyle(BOLD);
  textSize(15);
  textAlign(LEFT, CENTER);
  const lines = wrapLines(CONFIG.input.label, labelW - 8);
  const lh = 17;
  lines.forEach((l, k) => text(l, pad, top + (ACTION_H - 4) / 2 + (k - (lines.length - 1) / 2) * lh));
  textStyle(NORMAL);
}

function drawProgress() {
  const y = 40;
  const total = CONFIG.items.length;
  const shown = phase === 'summary' ? total : Math.min(pos + 1, total);
  if (phase === 'explore') {
    noStroke();
    fill('black');
    textStyle(BOLD);
    textSize(defaultTextSize);
    textAlign(LEFT, CENTER);
    text(CONFIG.explore.label, pad, y + 12);
    textStyle(NORMAL);
    return;
  }
  let label = phase === 'summary'
    ? (runNumber === 1 ? 'Results' : 'Practice results')
    : (runNumber === 1 ? CONFIG.itemNoun + ' ' + shown + ' of ' + total
                       : 'Practice ' + shown + ' of ' + total);
  // running first-try score, shown beside the position
  const score = 'First-try correct: ' + scoreOf(results) + ' of ' + total;
  noStroke();
  fill('black');
  textStyle(BOLD);
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  const room = canvasWidth - 2 * pad - total * 9 - 16;
  if (textWidth(label + '  |  ' + score) <= room) label = label + '  |  ' + score;
  else if (textWidth(shown + ' of ' + total + '  |  ' + score) <= room) label = shown + ' of ' + total + '  |  ' + score;
  else label = score;
  text(label, pad, y + 12);

  // One segment per item: gray = not yet answered, green = right the first time, red = missed
  const segW = Math.max(6, Math.min(26, Math.floor((canvasWidth - 2 * pad - textWidth(label) - 16) / total) - 3));
  const startX = canvasWidth - pad - total * (segW + 3) + 3;
  for (let i = 0; i < total; i++) {
    let c = 'gainsboro';
    if (results[i]) c = results[i].firstTry ? 'seagreen' : 'firebrick';
    const current = i === pos && phase !== 'summary';
    fill(c);
    stroke(current ? 'black' : 'silver');
    strokeWeight(current ? 2 : 1);
    rect(startX + i * (segW + 3), y + 3, segW, 18, 3);
  }
  textStyle(NORMAL);
}

function drawCard(L) {
  const r = L.card;
  const item = CONFIG.items[order[pos]];
  fill('white');
  stroke('slategray');
  strokeWeight(2);
  rect(r.x, r.y, r.w, r.h, 10);
  noStroke();

  const lineH = Math.round(L.ts * 1.3);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(L.ts);
  fill('dimgray');
  let y = drawWrapped(CONFIG.question, r.x + 12, r.y + 12, r.w - 24, lineH) + 6;

  textStyle(NORMAL);
  textSize(L.ts + 2);
  fill('black');
  y = drawItemLines(itemLinesOf(item, r.w - 24), r.x + 12, y, Math.round((L.ts + 2) * 1.3));
  if (CONFIG.cardNote) {
    textSize(L.ts);
    textStyle(ITALIC);
    fill('dimgray');
    drawWrapped(CONFIG.cardNote, r.x + 12, y + 4, r.w - 24, lineH);
    textStyle(NORMAL);
  }
}

function drawLegend(L) {
  const r = L.legend;
  if (CONFIG.customLegend) { CONFIG.customLegend.draw(r, L); return; }
  if (L.mode === 'compact' && CONFIG.legendHiddenWhenCompact) return;
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(r.x, r.y, r.w, r.h, 10);
  noStroke();

  const ts = L.ts;
  const lineH = Math.round(ts * 1.3);
  let y = r.y + 10;
  textAlign(LEFT, TOP);
  if (CONFIG.legendTitle) {
    textStyle(BOLD);
    textSize(ts);
    fill('black');
    y = drawWrapped(CONFIG.legendTitle, r.x + 10, y, r.w - 20, lineH) + 4;
  }
  if (CONFIG.criterion) {
    textStyle(NORMAL);
    textSize(ts);
    fill('black');
    y = drawWrapped(CONFIG.criterion, r.x + 10, y, r.w - 20, lineH) + 8;
  }

  const item = phase === 'question' ? null : CONFIG.items[order[pos]];
  const picked = results[pos] ? results[pos].choice : -1;
  const compact = L.mode === 'compact';
  const n = CONFIG.legend.length;
  const innerW = r.w - 28;
  const boxW = Math.floor((r.w - 16 - (n - 1) * 6) / n);
  for (let i = 0; i < n; i++) {
    const e = CONFIG.legend[i];
    const h = compact ? compactBoxHeight(ts, lineH, r.w) : legendEntryHeight(i, ts, lineH, innerW);
    const x = compact ? r.x + 8 + i * (boxW + 6) : r.x + 8;
    const w = compact ? boxW : r.w - 16;
    const isAnswer = item && item.answer === CONFIG.options[i];

    fill(isAnswer ? 'honeydew' : 'whitesmoke');
    stroke(isAnswer ? 'seagreen' : (picked === i ? 'firebrick' : 'gainsboro'));
    strokeWeight(isAnswer || picked === i ? 3 : 1);
    rect(x, y, w, h, 8);
    noStroke();
    fill(CONFIG.optionColors[i]);
    rect(x, y + 4, 8, h - 8, 3);

    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(ts);
    fill('black');
    const tw = w - 24;
    let ty = drawWrapped(e.name, x + 16, y + 6, tw - (compact ? 0 : 6), lineH);
    if (!compact && e.text) {
      textStyle(NORMAL);
      ty = drawWrapped(e.text, x + 16, ty, tw - 6, lineH);
    }
    if (CONFIG.legendIsBins) drawChips(i, x + 16, ty + 2, tw - (compact ? 0 : 6), compact);
    if (!compact) y += h + 6;
  }
  textStyle(NORMAL);
}

// Where the next chip for bin i will land, so the animation can aim at it
function chipSlot(i, L) {
  const r = L.legend;
  const ts = L.ts;
  const lineH = Math.round(ts * 1.3);
  const compact = L.mode === 'compact';
  const n = CONFIG.legend.length;
  const innerW = r.w - 28;
  const boxW = Math.floor((r.w - 16 - (n - 1) * 6) / n);
  let y = r.y + 10;
  textSize(ts);
  if (CONFIG.legendTitle) { textStyle(BOLD); y += wrapLines(CONFIG.legendTitle, r.w - 20).length * lineH + 4; }
  if (CONFIG.criterion) { textStyle(NORMAL); y += wrapLines(CONFIG.criterion, r.w - 20).length * lineH + 8; }
  let x = r.x + 8;
  if (compact) x += i * (boxW + 6);
  else for (let k = 0; k < i; k++) y += legendEntryHeight(k, ts, lineH, innerW) + 6;
  const tw = (compact ? boxW : r.w - 16) - 24;
  textStyle(BOLD);
  let ty = y + 6 + wrapLines(CONFIG.legend[i].name, tw - (compact ? 0 : 6)).length * lineH;
  if (!compact && CONFIG.legend[i].text) { textStyle(NORMAL); ty += wrapLines(CONFIG.legend[i].text, tw - 6).length * lineH; }
  const stride = compact ? 34 : 44;
  const rowH = compact ? 24 : 26;
  const perRow = Math.max(1, Math.floor((tw - (compact ? 0 : 6) + 4) / stride));
  const count = binChips[i].length;
  return { x: x + 16 + (count % perRow) * stride, y: ty + 2 + Math.floor(count / perRow) * rowH };
}

function drawChips(i, x, y, w, small) {
  const stride = small ? 34 : 44;
  const rowH = small ? 24 : 26;
  const perRow = Math.max(1, Math.floor((w + 4) / stride));
  for (let k = 0; k < binChips[i].length; k++) {
    const c = binChips[i][k];
    drawChip(x + (k % perRow) * stride, y + Math.floor(k / perRow) * rowH, c.n, c.ok, small);
  }
}

// A small numbered tag: green with a check when right the first time, red with an X when missed
function drawChip(x, y, n, ok, small) {
  const w = small ? 30 : 40;
  const h = small ? 20 : 22;
  fill(ok ? 'seagreen' : 'firebrick');
  stroke('white');
  strokeWeight(1);
  rect(x, y, w, h, 5);
  noStroke();
  fill('white');
  textStyle(BOLD);
  textSize(small ? 12 : 14);
  textAlign(LEFT, CENTER);
  text(n, x + 5, y + h / 2 + 1);
  stroke('white');
  strokeWeight(2);
  const mx = x + w - (small ? 10 : 12); // centre of the mark
  const my = y + h / 2;
  const k = small ? 3 : 4;
  if (ok) {
    line(mx - k, my, mx - k / 3, my + k * 0.8);
    line(mx - k / 3, my + k * 0.8, mx + k, my - k * 0.8);
  } else {
    line(mx - k * 0.8, my - k * 0.8, mx + k * 0.8, my + k * 0.8);
    line(mx + k * 0.8, my - k * 0.8, mx - k * 0.8, my + k * 0.8);
  }
  noStroke();
  textStyle(NORMAL);
}

function drawFeedback(L) {
  const r = L.feedback;
  const kind = message ? message.kind : 'none';
  fill(kind === 'good' ? 'honeydew' : kind === 'bad' ? 'mistyrose' : kind === 'hint' ? 'lemonchiffon' : 'white');
  stroke(kind === 'good' ? 'seagreen' : kind === 'bad' ? 'firebrick' : kind === 'hint' ? 'darkgoldenrod' : 'silver');
  strokeWeight(kind === 'none' ? 1 : 3);
  rect(r.x, r.y, r.w, r.h, 10);
  noStroke();

  const lineH = Math.round(L.ts * 1.3);
  textAlign(LEFT, TOP);
  textSize(L.ts);
  if (!message) {
    textStyle(NORMAL);
    fill('dimgray');
    drawWrapped(CONFIG.prompt, r.x + 12, r.y + 10, r.w - 24, lineH);
    return;
  }
  textStyle(BOLD);
  fill(kind === 'good' ? 'darkgreen' : kind === 'bad' ? 'firebrick' : 'saddlebrown');
  const y = drawWrapped(message.lead, r.x + 12, r.y + 10, r.w - 24, lineH);
  if (message.body) {
    textStyle(NORMAL);
    fill('black');
    drawWrapped(message.body, r.x + 12, y, r.w - 24, lineH);
  }
  textStyle(NORMAL);
}

// The reference table is the one the sim asks for, or on a phone the bin definitions that the
// compact legend leaves out. Opening it is exploration, not evidence.
function activeReference() {
  if (CONFIG.reference) return CONFIG.reference;
  if (CONFIG.legend && bodyLayout().mode === 'compact') {
    const rows = CONFIG.legend.map(e => [e.name, e.text || '']);
    if (CONFIG.criterion) rows.unshift(['Rule', CONFIG.criterion]);
    return { title: CONFIG.legendTitle || 'Definitions', columns: ['Name', 'Meaning'], weights: [0.34, 0.66],
             rows: rows, showLabel: 'Show definitions', hideLabel: 'Hide definitions' };
  }
  return null;
}


function drawReference(r) {
  const ref = activeReference();
  const lay = referenceLayout(ref, r);
  refPage = constrain(refPage, 0, lay.pages.length - 1);
  const rows = lay.pages[refPage];
  fill('white');
  stroke('slategray');
  strokeWeight(2);
  rect(r.x, r.y, r.w, r.h, 10);
  noStroke();

  const ts = lay.ts;
  const lineH = Math.round(ts * 1.25);
  const innerW = r.w - 24;
  const colW = ref.weights.map(w => Math.floor(innerW * w));
  textAlign(LEFT, TOP);
  textSize(ts);
  textStyle(BOLD);
  fill('black');
  const title = ref.title + (lay.pages.length > 1 ? ' (page ' + (refPage + 1) + ' of ' + lay.pages.length + ')' : '');
  let y = drawWrapped(title, r.x + 12, r.y + 10, innerW, lineH) + 4;
  let x = r.x + 12;
  let headLines = 1;
  for (let c = 0; c < ref.columns.length; c++) {
    fill('dimgray');
    const lines = wrapLines(ref.columns[c], colW[c] - 8);
    headLines = Math.max(headLines, lines.length);
    drawLines(lines, x, y, lineH);
    x += colW[c];
  }
  y += headLines * lineH + 2;
  stroke('silver');
  strokeWeight(1);
  line(r.x + 12, y, r.x + r.w - 12, y);
  noStroke();
  y += 4;
  textStyle(NORMAL);
  fill('black');
  for (let k = rows[0]; k < rows[1]; k++) {
    const row = ref.rows[k];
    let rowLines = 1;
    x = r.x + 12;
    for (let c = 0; c < row.length; c++) {
      const lines = wrapLines(row[c], colW[c] - 8);
      rowLines = Math.max(rowLines, lines.length);
      drawLines(lines, x, y, lineH);
      x += colW[c];
    }
    y += rowLines * lineH + 4;
  }
}

// Text size and row pages for the reference table: one page when it fits, else pages of rows
function referenceLayout(ref, r) {
  const innerW = r.w - 24;
  const n = ref.rows.length;
  for (let ts = 17; ts >= 14; ts--) {
    if (referenceHeight(ref, innerW, ts, 0, n) <= r.h - 20) return { ts: ts, pages: [[0, n]] };
  }
  const ts = 15;
  const pages = [];
  let start = 0;
  while (start < n) {
    let end = start + 1;
    while (end < n && referenceHeight(ref, innerW, ts, start, end + 1, true) <= r.h - 20) end++;
    pages.push([start, end]);
    start = end;
  }
  return { ts: ts, pages: pages };
}

function referenceHeight(ref, innerW, ts, from, to, paged) {
  textSize(ts);
  textStyle(BOLD);
  const lineH = Math.round(ts * 1.25);
  const title = ref.title + (paged ? ' (page 1 of 9)' : '');
  const colW = ref.weights.map(w => Math.floor(innerW * w));
  let headLines = 1;
  for (let c = 0; c < ref.columns.length; c++) headLines = Math.max(headLines, wrapLines(ref.columns[c], colW[c] - 8).length);
  let h = wrapLines(title, innerW).length * lineH + 4 + headLines * lineH + 6;
  textStyle(NORMAL);
  for (let k = from; k < to; k++) {
    const row = ref.rows[k];
    let rowLines = 1;
    for (let c = 0; c < row.length; c++) rowLines = Math.max(rowLines, wrapLines(row[c], colW[c] - 8).length);
    h += rowLines * lineH + 4;
  }
  return h;
}

function refPageCount() {
  const ref = activeReference();
  if (!ref || !referenceOpen) return 1;
  return referenceLayout(ref, bodyLayout().body).pages.length;
}

function drawSummary() {
  const top = 70;
  let r = { x: pad, y: top, w: canvasWidth - 2 * pad, h: drawHeight - top - pad };
  if (CONFIG.customLegend && CONFIG.customLegend.drawSummary && canvasWidth >= 700) {
    const chartW = Math.floor(r.w * 0.46);
    CONFIG.customLegend.drawSummary({ x: r.x + r.w - chartW, y: r.y, w: chartW, h: r.h });
    r = { x: r.x, y: r.y, w: r.w - chartW - GAP, h: r.h };
  }
  const total = results.length;
  const score = scoreOf(results);
  const misses = results.filter(x => !x.firstTry);
  const passed = score >= CONFIG.passMark;

  fill('white');
  stroke(passed ? 'seagreen' : 'slategray');
  strokeWeight(3);
  rect(r.x, r.y, r.w, r.h, 10);
  noStroke();

  let ts = 18;
  let lineH = Math.round(ts * 1.3);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(22);
  fill(passed ? 'darkgreen' : 'black');
  let y = r.y + 10;
  const headline = runNumber === 1
    ? score + ' of ' + total + ' correct on the first run'
    : score + ' of ' + total + ' correct on this practice run';
  y = drawWrapped(headline, r.x + 12, y, r.w - 24, 28) + 2;

  textStyle(NORMAL);
  textSize(ts);
  fill('black');
  let sub;
  if (runNumber === 1) sub = passed ? CONFIG.passMessage : (CONFIG.failMessage || 'Mastery is ' + CONFIG.passMark + ' of ' + total + ' on the first run. Review what you missed below, then play again to practice.');
  else sub = (passed ? CONFIG.passMessage : (CONFIG.failMessage || '')) + ' Practice runs do not change your first-run score of ' + firstRunScore + ' of ' + total + '.';
  if (CONFIG.summaryNote) sub += ' ' + CONFIG.summaryNote(results);
  y = drawWrapped(sub, r.x + 12, y, r.w - 24, lineH) + 8;

  if (misses.length === 0) {
    textStyle(BOLD);
    fill('darkgreen');
    drawWrapped('Every ' + CONFIG.itemNoun.toLowerCase() + ' was right on the first try.', r.x + 12, y, r.w - 24, lineH);
    return;
  }

  // Review one missed item at a time so the explanation always fits
  reviewIndex = constrain(reviewIndex, 0, misses.length - 1);
  const m = misses[reviewIndex];
  const item = m.item;
  stroke('silver');
  strokeWeight(1);
  line(r.x + 12, y, r.x + r.w - 12, y);
  noStroke();
  y += 8;
  const avail = r.y + r.h - y - 8;
  // shrink the review text until it fits
  let need;
  for (ts = 17; ts >= 14; ts--) {
    lineH = Math.round(ts * 1.3);
    need = reviewHeight(m, item, r.w - 24, ts, lineH);
    if (need <= avail) break;
  }
  textSize(ts);
  textStyle(BOLD);
  fill('black');
  y = drawWrapped('Review ' + (reviewIndex + 1) + ' of ' + misses.length + ' missed', r.x + 12, y, r.w - 24, lineH) + 2;
  textStyle(NORMAL);
  fill('black');
  y = drawItemLines(itemLinesOf(item, r.w - 24), r.x + 12, y, lineH) + 4;
  fill('dimgray');
  y = drawWrapped(reviewAnswerText(m, item), r.x + 12, y, r.w - 24, lineH) + 2;
  fill('black');
  drawWrapped(item.why, r.x + 12, y, r.w - 24, lineH);
}

function reviewAnswerText(m, item) {
  if (CONFIG.answerMode === 'check') return CONFIG.reviewText(m, item);
  const picked = m.first === null || m.first === undefined ? '' : 'Your first try: ' + CONFIG.options[m.first] + '. ';
  return picked + 'Answer: ' + item.answer + '.';
}

function reviewHeight(m, item, w, ts, lineH) {
  textSize(ts);
  textStyle(BOLD);
  let h = wrapLines('Review 1 of 1 missed', w).length * lineH + 2;
  textStyle(NORMAL);
  h += itemHeight(itemLinesOf(item, w), lineH) + 4;
  h += wrapLines(reviewAnswerText(m, item), w).length * lineH + 2;
  h += wrapLines(item.why, w).length * lineH;
  return h;
}

// A chip that flies from the card to the bin that holds the answer
function drawFly() {
  if (!fly) return;
  const t = constrain((millis() - fly.start) / 450, 0, 1);
  const e = t * t * (3 - 2 * t);
  const x = lerp(fly.from.x, fly.to.x, e);
  const y = lerp(fly.from.y, fly.to.y, e);
  drawChip(x, y, fly.n, fly.ok);
  if (t >= 1) {
    binChips[fly.bin].push({ n: fly.n, ok: fly.ok });
    fly = null;
    noLoop();
    redraw();
  }
}

// ---------------------------------------------------------------------------
// Run logic
// ---------------------------------------------------------------------------
function startRun() {
  runNumber++;
  order = CONFIG.items.map((_, i) => i);
  if (CONFIG.shuffle) {
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
  }
  pos = 0;
  tries = 0;
  results = [];
  message = null;
  wrongPicks = [];
  reviewIndex = 0;
  referenceOpen = false;
  fly = null;
  binChips = CONFIG.options.map(() => []);
  selected = CONFIG.options.map(() => false);
  if (inputBox) inputBox.value('');
  exploreReturnPhase = 'question';
  phase = (CONFIG.explore && CONFIG.explore.startsWith && runNumber === 1) ? 'explore' : 'question';
  refreshControls();
  announce(phase === 'explore' ? CONFIG.explore.announce : 'Ready. ' + CONFIG.question + ' ' + describeItem(CONFIG.items[order[pos]]));
}

function choose(i) {
  if (phase !== 'question') return;
  const item = CONFIG.items[order[pos]];
  tries++;
  const right = CONFIG.options[i] === item.answer;
  if (right) {
    finishItem(item, i, tries === 1, CONFIG.correctMessage(item), 'good');
  } else if (tries < CONFIG.attempts) {
    wrongPicks.push(i);
    message = CONFIG.hintMessage(item);
    message.kind = 'hint';
    refreshControls();
    announce(message.lead + ' ' + (message.body || ''));
    redraw();
  } else {
    finishItem(item, i, false, CONFIG.wrongMessage(item), 'bad');
  }
}

function finishItem(item, choice, firstTry, msg, kind) {
  message = msg;
  message.kind = kind;
  results[pos] = { item: item, choice: choice, first: wrongPicks.length ? wrongPicks[0] : choice, firstTry: firstTry, n: pos + 1 };
  phase = 'feedback';
  refreshControls();
  announce(msg.lead + ' ' + (msg.body || ''));

  const binIndex = CONFIG.options.indexOf(item.answer);
  const L = bodyLayout();
  if (CONFIG.legendIsBins && L.legend && binIndex >= 0 && !reducedMotion) {
    const to = chipSlot(binIndex, L);
    fly = { start: millis(), from: { x: L.card.x + L.card.w - 52, y: L.card.y + 8 }, to: to, n: pos + 1, ok: firstTry, bin: binIndex };
    loop();
  } else if (CONFIG.legendIsBins && binIndex >= 0) {
    binChips[binIndex].push({ n: pos + 1, ok: firstTry });
  }
  redraw();
}

function nextItem() {
  if (phase !== 'feedback') return;
  if (fly) { binChips[fly.bin].push({ n: fly.n, ok: fly.ok }); fly = null; noLoop(); }
  pos++;
  tries = 0;
  wrongPicks = [];
  selected = CONFIG.options.map(() => false);
  if (inputBox) inputBox.value('');
  message = null;
  referenceOpen = false;
  if (pos >= order.length) {
    if (runNumber === 1) firstRunScore = scoreOf(results);
    phase = 'summary';
    reviewIndex = 0;
    refreshControls();
    const score = scoreOf(results);
    announce(score + ' of ' + results.length + ' correct. ' + (runNumber === 1 && score >= CONFIG.passMark ? CONFIG.passMessage : ''));
  } else {
    phase = 'question';
    refreshControls();
    announce(CONFIG.itemNoun + ' ' + (pos + 1) + ' of ' + order.length + '. ' + describeItem(CONFIG.items[order[pos]]));
  }
  redraw();
}

// ---------------------------------------------------------------------------
// Check mode: the learner marks one or more choices (and may type a number), then presses Check
// ---------------------------------------------------------------------------
function notOffered(i) {
  const item = CONFIG.items[order[pos]];
  return !!(item.notOffered && item.notOffered.includes(CONFIG.options[i]));
}

function toggleChoice(i) {
  if (phase !== 'question' || notOffered(i)) return;
  if (CONFIG.selectMode === 'single') {
    selected = CONFIG.options.map((_, k) => k === i);
  } else if (CONFIG.exclusive && CONFIG.exclusive.includes(CONFIG.options[i])) {
    // an exclusive choice such as "None missing" clears every other mark
    const on = !selected[i];
    selected = CONFIG.options.map((_, k) => on && k === i);
  } else {
    selected[i] = !selected[i];
    CONFIG.options.forEach((o, k) => { if (CONFIG.exclusive && CONFIG.exclusive.includes(o)) selected[k] = false; });
  }
  refreshControls();
  redraw();
}

function inputValue() {
  if (!inputBox) return null;
  const raw = String(inputBox.value()).trim();
  if (raw === '' || !/^-?\d+$/.test(raw)) return null;
  return parseInt(raw, 10);
}

function canCheck() {
  if (!selected.some(x => x)) return false;
  if (CONFIG.input) {
    const v = inputValue();
    if (v === null || v < CONFIG.input.min || v > CONFIG.input.max) return false;
  }
  return true;
}

function checkAnswer() {
  if (phase !== 'question' || !canCheck()) return;
  const item = CONFIG.items[order[pos]];
  const picks = [];
  selected.forEach((on, i) => { if (on) picks.push(i); });
  const res = CONFIG.evaluate(item, picks.map(i => CONFIG.options[i]), inputValue(), tries);
  tries++;
  if (tries === 1) firstCheck = picks.slice();
  if (!res.correct && tries < (CONFIG.attempts || 1)) {
    // a wrong first check: give the hint, keep the marks, and let the learner check again
    message = { lead: res.lead, body: res.body, kind: 'hint' };
    announce(message.lead + ' ' + (message.body || ''));
    refreshControls();
    redraw();
    return;
  }
  message = { lead: res.lead, body: res.body, kind: res.correct ? 'good' : 'bad' };
  results[pos] = { item: item, choice: picks, first: firstCheck, input: inputValue(), firstTry: res.correct && tries === 1, n: pos + 1 };
  phase = 'feedback';
  refreshControls();
  announce(message.lead + ' ' + (message.body || ''));
  redraw();
}

function scoreOf(list) {
  return list.filter(x => x.firstTry).length;
}

function describeItem(item) {
  return item.lines ? item.lines.map(r => (typeof r === 'string' ? r : r.t)).join(' ') : item.text;
}

// The card text for an item, wrapped to w, as a list of lines. An item gives either text or a list
// of lines; a line may be a string or { t: text, s: 'bold' | 'dim' } to style a paragraph.
function itemLinesOf(item, w) {
  const runs = item.lines ? item.lines : [item.text];
  const out = [];
  runs.forEach((r, k) => {
    const run = typeof r === 'string' ? { t: r } : r;
    const style = run.s || 'normal';
    textStyle(style === 'bold' ? BOLD : NORMAL);
    wrapLines(run.t, w).forEach((l, j) => out.push({ text: l, style: style, gap: (j === 0 && k > 0) ? 4 : 0 }));
  });
  textStyle(NORMAL);
  return out;
}

function itemHeight(lines, lineH) {
  return lines.reduce((h, l) => h + lineH + l.gap, 0);
}

function drawItemLines(lines, x, y, lineH) {
  textAlign(LEFT, TOP);
  for (const l of lines) {
    y += l.gap;
    textStyle(l.style === 'bold' ? BOLD : NORMAL);
    fill(l.style === 'dim' ? 'dimgray' : 'black');
    text(l.text, x, y);
    y += lineH;
  }
  textStyle(NORMAL);
  fill('black');
  return y;
}

function announce(text) {
  if (liveRegion) liveRegion.html(text);
}

// ---------------------------------------------------------------------------
// Controls: native p5.js buttons, restyled with CSS
// ---------------------------------------------------------------------------
function createControls() {
  for (let i = 0; i < CONFIG.options.length; i++) {
    const b = createButton(CONFIG.options[i]);
    b.class('quiz-btn');
    b.elt.addEventListener('click', () => { if (CONFIG.answerMode === 'check') toggleChoice(i); else choose(i); });
    choiceButtons.push(b);
  }
  nextButton = createButton('Next');
  nextButton.class('quiz-btn primary');
  nextButton.elt.addEventListener('click', () => {
    if (phase === 'summary') return;
    if (phase === 'question' && CONFIG.answerMode === 'check') checkAnswer();
    else nextItem();
  });

  if (CONFIG.input) {
    inputBox = createInput('', 'number');
    inputBox.class('quiz-input');
    inputBox.attribute('min', String(CONFIG.input.min));
    inputBox.attribute('max', String(CONFIG.input.max));
    inputBox.attribute('step', '1');
    inputBox.attribute('inputmode', 'numeric');
    inputBox.attribute('aria-label', CONFIG.input.label);
    inputBox.elt.addEventListener('input', () => { refreshControls(); redraw(); });
    inputBox.elt.addEventListener('keydown', e => { if (e.key === 'Enter' && !nextButton.elt.disabled) nextButton.elt.click(); });
  }

  if (CONFIG.reference || CONFIG.legend) {
    referenceButton = createButton('Show definitions');
    referenceButton.class('quiz-btn');
    referenceButton.elt.addEventListener('click', () => {
      referenceOpen = !referenceOpen;
      refPage = 0;
      layoutCache = { key: '', value: null };
      refreshControls();
      redraw();
    });
  }

  prevReviewButton = createButton('Previous missed');
  prevReviewButton.class('quiz-btn');
  prevReviewButton.elt.addEventListener('click', () => { if (phase === 'summary') reviewIndex--; else refPage--; redraw(); updateReviewButtons(); });
  nextReviewButton = createButton('Next missed');
  nextReviewButton.class('quiz-btn');
  nextReviewButton.elt.addEventListener('click', () => { if (phase === 'summary') reviewIndex++; else refPage++; redraw(); updateReviewButtons(); });
  againButton = createButton('Play again');
  againButton.class('quiz-btn primary');
  againButton.elt.addEventListener('click', () => { startRun(); positionControls(); redraw(); });

  if (CONFIG.explore) {
    CONFIG.explore.create(); // the explore screen makes its own native controls
    exploreOpenButton = createButton(CONFIG.explore.openLabel);
    exploreOpenButton.class('quiz-btn');
    exploreOpenButton.elt.addEventListener('click', () => {
      exploreReturnPhase = 'summary';
      phase = 'explore';
      refreshControls();
      announce(CONFIG.explore.announce);
      redraw();
    });
    exploreContinueButton = createButton(CONFIG.explore.continueLabel);
    exploreContinueButton.class('quiz-btn primary');
    exploreContinueButton.elt.addEventListener('click', () => {
      phase = exploreReturnPhase;
      refreshControls();
      if (phase === 'question') announce(CONFIG.question + ' ' + describeItem(CONFIG.items[order[pos]]));
      redraw();
    });
  }
}

// Show the buttons that belong to the current phase and set their states
function refreshControls() {
  const summary = phase === 'summary';
  const explore = phase === 'explore';
  const refPaged = !summary && !explore && referenceOpen && refPageCount() > 1;
  for (let i = 0; i < choiceButtons.length; i++) {
    const b = choiceButtons[i];
    b.elt.className = 'quiz-btn';
    b.elt.disabled = false;
    b.elt.removeAttribute('aria-label');
    if (summary || explore || refPaged) { b.hide(); continue; }
    b.show();
    const item = CONFIG.items[order[pos]];
    if (CONFIG.answerMode === 'check') {
      const truth = phase === 'feedback' ? CONFIG.truthOf(item) : null;
      const marked = !!selected[i];
      const missing = notOffered(i);
      b.html(CONFIG.options[i]);
      b.elt.setAttribute('aria-pressed', marked ? 'true' : 'false');
      if (marked) b.elt.classList.add('marked');
      if (missing) {
        b.elt.disabled = true;
        b.elt.setAttribute('aria-label', CONFIG.options[i] + ' (not offered for this item)');
      } else if (phase === 'feedback') {
        const should = truth.includes(CONFIG.options[i]);
        b.elt.disabled = true;
        if (should && marked) { b.elt.className = 'quiz-btn correct marked'; b.elt.setAttribute('aria-label', CONFIG.options[i] + ' (marked, correct)'); }
        else if (should && !marked) { b.elt.className = 'quiz-btn wrong'; b.elt.setAttribute('aria-label', CONFIG.options[i] + ' (should have been marked)'); }
        else if (!should && marked) { b.elt.className = 'quiz-btn wrong marked'; b.elt.setAttribute('aria-label', CONFIG.options[i] + ' (marked, but not correct)'); }
      } else if (marked) {
        b.elt.className = 'quiz-btn selected marked';
      }
      continue;
    }
    if (phase === 'feedback') {
      b.elt.disabled = true;
      if (CONFIG.options[i] === item.answer) { b.elt.className = 'quiz-btn correct'; b.elt.setAttribute('aria-label', CONFIG.options[i] + ' (correct answer)'); }
      else if ((results[pos] && results[pos].choice === i) || wrongPicks.includes(i)) { b.elt.className = 'quiz-btn wrong'; b.elt.setAttribute('aria-label', CONFIG.options[i] + ' (your answer, not correct)'); }
    } else if (wrongPicks.includes(i)) {
      b.elt.disabled = true;
      b.elt.className = 'quiz-btn wrong';
      b.elt.setAttribute('aria-label', CONFIG.options[i] + ' (tried, not correct)');
    }
  }

  // The optional explore screen owns its own controls
  if (CONFIG.explore) {
    if (explore) {
      CONFIG.explore.show();
      exploreContinueButton.show();
      exploreContinueButton.html(exploreReturnPhase === 'summary' ? (CONFIG.explore.backLabel || 'Back to results') : CONFIG.explore.continueLabel);
    } else {
      CONFIG.explore.hide();
      exploreContinueButton.hide();
    }
    if (summary && CONFIG.explore.openLabel) exploreOpenButton.show(); else exploreOpenButton.hide();
  }

  if (inputBox && (explore || summary)) inputBox.hide();
  if (explore) {
    nextButton.hide();
    prevReviewButton.hide();
    nextReviewButton.hide();
    againButton.hide();
    if (referenceButton) referenceButton.hide();
  } else if (summary) {
    nextButton.hide();
    if (referenceButton) referenceButton.hide();
    againButton.show();
    const misses = results.filter(x => !x.firstTry).length;
    prevReviewButton.html('Previous missed');
    nextReviewButton.html('Next missed');
    if (misses > 1) { prevReviewButton.show(); nextReviewButton.show(); } else { prevReviewButton.hide(); nextReviewButton.hide(); }
    updateReviewButtons();
  } else {
    if (refPaged) {
      prevReviewButton.html('Previous rows');
      nextReviewButton.html('More rows');
      prevReviewButton.show();
      nextReviewButton.show();
      updateReviewButtons();
    } else {
      prevReviewButton.hide();
      nextReviewButton.hide();
    }
    againButton.hide();
    nextButton.show();
    const last = pos >= order.length - 1;
    if (CONFIG.answerMode === 'check' && phase === 'question') {
      nextButton.html('Check');
      nextButton.elt.disabled = !canCheck();
    } else {
      nextButton.html(last ? 'See results' : 'Next →');
      nextButton.elt.disabled = phase !== 'feedback';
    }
    if (inputBox) {
      inputBox.show();
      inputBox.elt.disabled = phase !== 'question';
    }
    const ref = activeReference();
    if (!ref) referenceOpen = false;
    if (referenceButton && ref) {
      referenceButton.show();
      referenceButton.html(referenceOpen ? ref.hideLabel : ref.showLabel);
    } else if (referenceButton) {
      referenceButton.hide();
    }
  }
  positionControls();
}

function updateReviewButtons() {
  if (phase === 'summary') {
    const misses = results.filter(x => !x.firstTry).length;
    prevReviewButton.elt.disabled = reviewIndex <= 0;
    nextReviewButton.elt.disabled = reviewIndex >= misses - 1;
  } else {
    prevReviewButton.elt.disabled = refPage <= 0;
    nextReviewButton.elt.disabled = refPage >= refPageCount() - 1;
  }
}

// Grid of choice buttons: as many columns as fit, then rows
function buttonGrid(width) {
  const n = CONFIG.options.length;
  const avail = width - 2 * pad;
  const cols = Math.max(1, Math.min(n, Math.floor((avail + GAP) / (CONFIG.minButtonWidth + GAP))));
  const rows = Math.ceil(n / cols);
  const btnW = Math.floor((avail - GAP * (cols - 1)) / cols);
  return { cols: cols, rows: rows, btnW: btnW, avail: avail };
}

function controlHeightFor(width) {
  const g = buttonGrid(width);
  return GAP + (CONFIG.input ? ACTION_H + GAP : 0) + g.rows * (BTN_H + GAP) + ACTION_H + GAP;
}

function positionControls() {
  const g = buttonGrid(canvasWidth);
  const inputRow = CONFIG.input ? ACTION_H + GAP : 0;
  const used = inputRow + g.rows * (BTN_H + GAP) + ACTION_H;
  let top = drawHeight + Math.max(GAP, Math.floor((controlHeight - used) / 2));
  if (inputBox && phase !== 'summary' && phase !== 'explore') {
    const labelW = Math.min(240, Math.floor(g.avail * 0.62));
    inputBox.position(pad + labelW, top);
    inputBox.size(Math.min(110, g.avail - labelW), ACTION_H - 4);
    top += inputRow;
  }
  const summary = phase === 'summary';
  const explore = phase === 'explore';
  const actionY = drawHeight + controlHeight - ACTION_H - GAP; // explore screens use the bottom row

  if (explore) {
    exploreContinueButton.position(Math.floor((canvasWidth - Math.min(g.avail, 280)) / 2), actionY);
    exploreContinueButton.size(Math.min(g.avail, 280), ACTION_H);
    CONFIG.explore.position({ x: pad, y: drawHeight + GAP, w: canvasWidth - 2 * pad, h: actionY - drawHeight - 2 * GAP });
    return;
  }

  // Choice buttons (or the two pager buttons during the summary or a paged reference table)
  const pager = summary || (referenceOpen && refPageCount() > 1);
  if (!pager) {
    for (let i = 0; i < choiceButtons.length; i++) {
      const row = Math.floor(i / g.cols);
      const col = i % g.cols;
      // a short last row stretches its buttons across the whole row
      const inRow = row === g.rows - 1 ? CONFIG.options.length - row * g.cols : g.cols;
      const w = Math.floor((g.avail - GAP * (inRow - 1)) / inRow);
      choiceButtons[i].position(pad + col * (w + GAP), top + row * (BTN_H + GAP));
      choiceButtons[i].size(w, BTN_H);
    }
  } else {
    const w = Math.floor((g.avail - GAP) / 2);
    prevReviewButton.position(pad, top);
    prevReviewButton.size(w, BTN_H);
    nextReviewButton.position(pad + w + GAP, top);
    nextReviewButton.size(w, BTN_H);
  }

  // Action row
  const ay = top + g.rows * (BTN_H + GAP);
  if (summary) {
    if (CONFIG.explore && CONFIG.explore.openLabel) {
      const w = Math.floor((g.avail - GAP) / 2);
      exploreOpenButton.position(pad, ay);
      exploreOpenButton.size(w, ACTION_H);
      againButton.position(pad + w + GAP, ay);
      againButton.size(w, ACTION_H);
    } else {
      const w = Math.min(g.avail, 260);
      againButton.position(Math.floor((canvasWidth - w) / 2), ay);
      againButton.size(w, ACTION_H);
    }
    return;
  }
  if (referenceButton && activeReference()) {
    const w = Math.floor((g.avail - GAP) / 2);
    referenceButton.position(pad, ay);
    referenceButton.size(w, ACTION_H);
    nextButton.position(pad + w + GAP, ay);
    nextButton.size(w, ACTION_H);
  } else {
    const w = Math.min(g.avail, 260);
    nextButton.position(Math.floor((canvasWidth - w) / 2), ay);
    nextButton.size(w, ACTION_H);
  }
}

function injectStyles() {
  if (document.getElementById('quiz-styles')) return;
  const style = document.createElement('style');
  style.id = 'quiz-styles';
  style.textContent = `
    .quiz-btn { box-sizing: border-box; margin: 0; padding: 2px 6px; font-family: Arial, Helvetica, sans-serif;
                font-size: ${CONFIG.buttonFont || 16}px; line-height: 1.15; color: black; background: white; border: 2px solid dimgray;
                border-radius: 8px; cursor: pointer; white-space: normal; }
    .quiz-btn:hover:not(:disabled) { background: aliceblue; border-color: navy; }
    .quiz-btn:focus-visible { outline: 3px solid black; outline-offset: 2px; }
    .quiz-btn:disabled { cursor: default; color: dimgray; background: whitesmoke; border-color: silver; }
    .quiz-btn.marked::before { content: '\u2713'; position: absolute; left: 4px; top: 1px; font-size: 11px; font-weight: bold; }
    .quiz-btn.selected { color: navy; background: lightcyan; border: 3px solid navy; font-weight: bold; }
    .quiz-input { box-sizing: border-box; font-family: Arial, Helvetica, sans-serif; font-size: 18px; color: black; background: white;
                  border: 2px solid dimgray; border-radius: 8px; padding: 2px 8px; }
    .quiz-input:focus-visible { outline: 3px solid black; outline-offset: 2px; }
    .quiz-input:disabled { color: dimgray; background: whitesmoke; border-color: silver; }
    .quiz-btn.primary { color: white; background: navy; border-color: navy; font-weight: bold; }
    .quiz-btn.primary:hover:not(:disabled) { background: mediumblue; }
    .quiz-btn.primary:disabled { background: lightsteelblue; border-color: lightsteelblue; color: white; }
    .quiz-btn.correct:disabled { color: darkgreen; background: honeydew; border-color: seagreen; font-weight: bold; }
    .quiz-select { box-sizing: border-box; font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: black;
                   background: white; border: 2px solid dimgray; border-radius: 8px; padding: 2px 4px; cursor: pointer; }
    .quiz-select:focus-visible { outline: 3px solid black; outline-offset: 2px; }
    .quiz-btn.wrong:disabled { color: firebrick; background: mistyrose; border-color: firebrick; }
  `;
  document.head.appendChild(style);
}

// ---------------------------------------------------------------------------
// Text helpers (own word wrap so the layout is the same in every p5.js version)
// ---------------------------------------------------------------------------
function wrapLines(str, maxW) {
  const key = textSize() + '|' + textStyle() + '|' + Math.round(maxW) + '|' + str;
  if (wrapCache.has(key)) return wrapCache.get(key);
  const words = str.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    if (line && textWidth(test) > maxW) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
    // a single long word (such as a web address) is broken between characters
    while (textWidth(line) > maxW && line.length > 1) {
      let cut = line.length - 1;
      while (cut > 1 && textWidth(line.slice(0, cut)) > maxW) cut--;
      lines.push(line.slice(0, cut));
      line = line.slice(cut);
    }
  }
  if (line) lines.push(line);
  wrapCache.set(key, lines);
  return lines;
}

// Draws left-aligned wrapped text starting at (x, y) and returns the y below the last line
function drawWrapped(str, x, y, maxW, lineH) {
  return drawLines(wrapLines(str, maxW), x, y, lineH);
}

function drawLines(lines, x, y, lineH) {
  textAlign(LEFT, TOP);
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], x, y + i * lineH);
  }
  return y + lines.length * lineH;
}

// Largest text size (between minSize and maxSize) at which str fits in maxW
function fitTextSize(str, maxW, maxSize, minSize) {
  let s = maxSize;
  textSize(s);
  while (s > minSize && textWidth(str) > maxW) {
    s -= 1;
    textSize(s);
  }
  return s;
}

// ---------------------------------------------------------------------------
// These two functions make the MicroSim width responsive. Keep them at the end of the file.
// ---------------------------------------------------------------------------
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  layoutCache = { key: '', value: null };
  refreshControls();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width); // avoid fractional pixels
  canvasWidth = containerWidth;
}
