// Ready Concepts Finder - vis-network
// CANVAS_HEIGHT: 720
// Sixteen concepts from this book's learning graph (Five-Month Doubling and everything it depends
// on, copied from docs/learning-graph/learning-graph.json). For each of six problems, some concepts
// are mastered; the learner picks every concept that is ready (not mastered, and every direct
// prerequisite mastered) and presses Submit. Two attempts per problem; only the first attempt
// counts. Mastery is 5 of 6. Nothing moves until the learner acts.

// Concept -> direct prerequisites. [layer, x position] places the node in the drawing.
const CONCEPTS = {
  'Artificial Intelligence': { pre: [], pos: [0, -1] },
  'Exponential Growth': { pre: [], pos: [0, 1.6] },
  'AI Capability': { pre: ['Artificial Intelligence'], pos: [1, -1.6] },
  'Machine Learning': { pre: ['Artificial Intelligence'], pos: [1, -0.2] },
  'Doubling Time': { pre: ['Exponential Growth'], pos: [1, 1.6] },
  'AI Benchmark': { pre: ['AI Capability'], pos: [2, -1.6] },
  'Large Language Model': { pre: ['Machine Learning'], pos: [2, -0.2] },
  'METR': { pre: ['AI Benchmark'], pos: [3, -1.6] },
  'AI Agent': { pre: ['Large Language Model'], pos: [3, -0.2] },
  'Benchmark Task Suite': { pre: ['METR', 'AI Benchmark'], pos: [4, -2.3] },
  'Task Horizon': { pre: ['METR', 'AI Capability'], pos: [4, -0.9] },
  '50 Percent Time Horizon': { pre: ['Task Horizon'], pos: [5, -2.25] },
  'Human Working Time': { pre: ['Task Horizon'], pos: [5, -0.75] },
  'Long-Running Task': { pre: ['Task Horizon', 'AI Agent'], pos: [5, 0.75] },
  'Task Success Rate': { pre: ['Task Horizon'], pos: [5, 2.25] },
  'Five-Month Doubling': { pre: ['Task Horizon', '50 Percent Time Horizon', 'Human Working Time', 'Benchmark Task Suite',
                                 'Long-Running Task', 'Task Success Rate', 'Doubling Time'], pos: [6, 0] }
};
const NAMES = Object.keys(CONCEPTS);
const FIRST_NINE = ['Artificial Intelligence', 'Exponential Growth', 'AI Capability', 'Machine Learning', 'Doubling Time',
                    'AI Benchmark', 'Large Language Model', 'METR', 'AI Agent'];

const PROBLEMS = [
  { mastered: [], why: 'Only concepts with no prerequisites can be ready when nothing is mastered.' },
  { mastered: ['Artificial Intelligence', 'Exponential Growth'], why: 'Each depends only on a mastered concept.' },
  { mastered: ['Artificial Intelligence', 'Exponential Growth', 'AI Capability', 'Machine Learning', 'Doubling Time'],
    why: 'Each depends only on mastered concepts; METR still needs AI Benchmark.' },
  { mastered: FIRST_NINE, why: 'Both depend only on mastered concepts; Long-Running Task still needs Task Horizon.' },
  { mastered: FIRST_NINE.concat(['Benchmark Task Suite', 'Task Horizon']),
    why: 'All four depend only on Task Horizon, and on AI Agent for the Long-Running Task.' },
  { mastered: NAMES.filter(n => n !== 'Five-Month Doubling'),
    why: 'It is the only unmastered concept, and all its prerequisites are mastered.' }
];
// The ready rule: not mastered, and every direct prerequisite mastered
function readySet(mastered) {
  const m = new Set(mastered);
  return NAMES.filter(n => !m.has(n) && CONCEPTS[n].pre.every(p => m.has(p)));
}
const PASS_MARK = 5;

let pi = 0, picks = new Set(), attempt = 0, resolved = false, finished = false, firstTry = [];
const $ = id => document.getElementById(id);

// ---------------------------------------------------------------------------
// Network
// ---------------------------------------------------------------------------
const ids = {};
NAMES.forEach((n, i) => ids[n] = i + 1);
const nodes = new vis.DataSet(NAMES.map(n => ({
  id: ids[n], label: n, x: CONCEPTS[n].pos[1] * 125, y: CONCEPTS[n].pos[0] * 70
})));
const edgeList = [];
NAMES.forEach(n => CONCEPTS[n].pre.forEach(p => edgeList.push({ id: n + '>' + p, from: ids[n], to: ids[p] })));
const edges = new vis.DataSet(edgeList);
const network = new vis.Network($('network'), { nodes, edges }, {
  layout: { improvedLayout: false },
  physics: { enabled: false },
  interaction: { selectConnectedEdges: false, zoomView: false, dragView: false, dragNodes: false,
                 navigationButtons: false, hover: true },
  nodes: { shape: 'box', margin: 6, font: { size: 17, face: 'Arial' }, borderWidth: 2,
           widthConstraint: { maximum: 120 } },
  edges: { arrows: { to: { enabled: true, scaleFactor: 0.6 } }, width: 1.5, color: { color: 'silver' },
           smooth: { enabled: true, type: 'curvedCW', roundness: 0.08 } }
});
network.once('afterDrawing', () => network.fit({ animation: false }));

function nameOf(id) { return NAMES[id - 1]; }

function paint() {
  const P = PROBLEMS[pi];
  const m = new Set(finished ? [] : P.mastered);
  const ready = new Set(readySet(P.mastered));
  nodes.update(NAMES.map(n => {
    let bg = 'white', border = 'steelblue', bw = 2, fc = 'black';
    if (!finished && m.has(n)) { bg = '#cfe8cf'; border = 'forestgreen'; fc = '#2f4f2f'; }
    if (!finished && picks.has(n)) { bg = 'gold'; border = 'darkgoldenrod'; }
    if (!finished && resolved && ready.has(n)) { border = 'royalblue'; bw = 5; }
    if (!finished && resolved && picks.has(n) && !ready.has(n)) { bg = 'mistyrose'; border = 'firebrick'; bw = 3; }
    return { id: ids[n], color: { background: bg, border: border, highlight: { background: bg, border: border },
             hover: { background: bg, border: border } }, borderWidth: bw, font: { color: fc } };
  }));
  // After answering, highlight the prerequisite edges that make each ready concept ready
  edges.update(edgeList.map(e => {
    const on = !finished && resolved && ready.has(nameOf(e.from));
    return { id: e.id, color: { color: on ? 'royalblue' : 'silver' }, width: on ? 3 : 1.5 };
  }));
}

network.on('click', params => {
  if (!params.nodes.length) return;
  const n = nameOf(params.nodes[0]);
  network.unselectAll();
  const pre = CONCEPTS[n].pre;
  const P = PROBLEMS[pi];
  const mastered = !finished && P.mastered.includes(n);
  $('info').innerHTML = '<b>' + n + '</b>' + (mastered ? ' (mastered)' : '') + ': ' +
    (pre.length ? 'needs ' + pre.join(', ') + '.' : 'no prerequisites.');
  if (finished || resolved || mastered) return;   // mastered concepts cannot be picked
  if (picks.has(n)) picks.delete(n); else picks.add(n);
  paint();
});

// ---------------------------------------------------------------------------
// Problems
// ---------------------------------------------------------------------------
function score() { return firstTry.filter(Boolean).length; }

function start() {
  pi = 0;
  firstTry = [];
  finished = false;
  load();
}

function load() {
  picks = new Set();
  attempt = 0;
  resolved = false;
  const P = PROBLEMS[pi];
  $('pnum').textContent = 'Problem ' + (pi + 1) + ' of ' + PROBLEMS.length;
  $('pscore').textContent = 'First-try correct: ' + score() + ' of ' + PROBLEMS.length;
  $('prompt').textContent = 'Which concepts could this student start on?';
  $('mastered').innerHTML = '<b>Mastered (' + P.mastered.length + '):</b> ' + (P.mastered.length ? (P.mastered.length === 15 ? 'all fifteen concepts except Five-Month Doubling' : P.mastered.join(', ')) : 'none');
  $('info').textContent = 'Click a concept to pick or unpick it and see its prerequisites. Ready = not mastered, and every direct prerequisite mastered.';
  setFeedback('', '');
  buttons();
  paint();
}

function buttons() {
  $('submit').hidden = finished;
  $('clear').hidden = finished;
  $('next').hidden = finished;
  $('again').hidden = !finished;
  $('submit').disabled = resolved;
  $('submit').classList.toggle('go', !resolved);
  $('clear').disabled = resolved;
  $('next').disabled = !resolved;
  $('next').classList.toggle('go', resolved);
  $('next').textContent = pi === PROBLEMS.length - 1 ? 'See score' : 'Next';
}

function setFeedback(kind, html) {
  $('feedback').className = kind;
  $('feedback').innerHTML = html;
}

function submit() {
  if (resolved || finished) return;
  const P = PROBLEMS[pi];
  const ready = readySet(P.mastered);
  const missing = ready.filter(n => !picks.has(n));
  const extra = [...picks].filter(n => !ready.includes(n));
  const ok = missing.length === 0 && extra.length === 0;
  attempt++;
  if (attempt === 1) firstTry[pi] = ok;
  if (ok) {
    resolved = true;
    setFeedback('ok', '<b>Correct.</b> ' + P.why + (attempt > 1 ? ' (A second try does not change your first-try score.)' : ''));
  } else if (attempt === 1) {
    const msgs = [];
    if (missing.length) msgs.push('At least one ready concept is missing. Check every unmastered concept\'s prerequisites.');
    if (extra.length) msgs.push('At least one selected concept still has an unmastered prerequisite.');
    setFeedback('retry', '<b>Not quite.</b> ' + msgs.join(' ') + ' Change your picks and submit again.');
  } else {
    resolved = true;
    setFeedback('miss', '<b>The ready set is ' + ready.join(', ') + '.</b> ' + P.why);
  }
  $('pscore').textContent = 'First-try correct: ' + score() + ' of ' + PROBLEMS.length;
  buttons();
  paint();
}

function next() {
  if (!resolved) return;
  if (pi < PROBLEMS.length - 1) { pi++; load(); return; }
  finished = true;
  const s = score();
  $('pnum').textContent = 'Finished';
  $('prompt').textContent = s >= PASS_MARK ? 'You can find the ready concepts in a learning graph.' : 'Review the ready rule and try again.';
  $('mastered').innerHTML = '<b>Score: ' + s + ' of ' + PROBLEMS.length + '.</b> ' +
    firstTry.map((r, i) => 'Problem ' + (i + 1) + ': ' + (r ? 'correct' : 'missed')).join(' · ');
  $('info').textContent = '';
  setFeedback('done', 'The number of ready concepts went 2, 3, 2, 2, 4, then 1: it rises and then falls as the student nears the goal.');
  buttons();
  paint();
}

$('submit').addEventListener('click', submit);
$('clear').addEventListener('click', () => { if (!resolved) { picks.clear(); paint(); } });
$('next').addEventListener('click', next);
$('again').addEventListener('click', start);
start();
