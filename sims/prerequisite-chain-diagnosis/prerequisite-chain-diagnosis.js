// Prerequisite Chain Diagnosis - vis-network
// CANVAS_HEIGHT: 720
// A simplified fractions-to-proportions prerequisite map: eight concepts and nine arrows, each
// arrow pointing from a concept to a prerequisite it depends on. Explore mode: click a concept to
// read its description. Case mode: five students, each with pass/fail results on every concept and
// a target concept failed in class. The learner selects the root gap (the failed concept whose
// direct prerequisites all passed) and presses Submit. Two attempts per case; the score counts
// first tries; mastery is 4 of 5. Mouse-wheel zoom is off; use the zoom buttons.
// The pass/fail results are illustrative. Edit NODES, EDGES, and CASES to change the content.

const NODES = [
  // [id, name, description, x, y]
  [1, 'Whole-number multiplication and division', 'Multiplying and dividing whole numbers fluently.', -250, 180],
  [2, 'Fractions as parts of a whole', 'Understanding a fraction as equal parts of one whole.', 250, 180],
  [3, 'Equivalent fractions', 'Recognizing that different fractions can name the same amount, such as 1/2 and 2/4.', -130, 90],
  [4, 'Adding and subtracting fractions with unlike denominators', 'Combining fractions after rewriting them with a common denominator.', -370, 0],
  [5, 'Multiplying and dividing fractions', 'Multiplying and dividing fractions, including by whole numbers.', 260, 90],
  [6, 'Ratios', 'Comparing two quantities, such as 3 apples for every 2 oranges.', 10, 0],
  [7, 'Unit rates', 'Finding the amount per one unit, such as price per ounce.', 150, -90],
  [8, 'Proportional equations', 'Writing and solving equations that relate two proportional quantities.', 150, -180]
];
// [from (depends), to (prerequisite)]
const EDGES = [[3, 1], [3, 2], [4, 3], [5, 1], [5, 2], [6, 3], [7, 5], [7, 6], [8, 7]];
// results on nodes 1..8 (P or F), target, root gap, why
const CASES = [
  { target: 7, results: 'PPPPFPFF', root: 5, why: 'Node 5 failed while both its prerequisites (1 and 2) passed; nodes 7 and 8 fail because they sit above node 5.' },
  { target: 8, results: 'PPFFPFFF', root: 3, why: 'Node 3 failed while its prerequisites (1 and 2) passed; nodes 4, 6, 7 and 8 fail because they depend on 3, directly or through 6.' },
  { target: 4, results: 'PPPFPPPP', root: 4, why: 'Node 4 failed while its only prerequisite (3) passed, so the gap is at the target itself.' },
  { target: 8, results: 'PPPPPPFF', root: 7, why: 'Node 7 failed while both its prerequisites (5 and 6) passed; node 8 fails because it depends on 7.' },
  { target: 6, results: 'PFFFFFFF', root: 2, why: 'Node 2 has no prerequisites and failed; every other failure lies above it.' }
];
const PASS_MARK = 4;
const OPENING = 'A student failed one concept. Where should we reteach?';

const prereqsOf = id => EDGES.filter(e => e[0] === id).map(e => e[1]);
const nodeName = id => NODES.find(n => n[0] === id)[1];
const isFoundation = id => prereqsOf(id).length === 0;
const failed = (c, id) => c.results[id - 1] === 'F';
const nodeLabel = (id, c) => id + '. ' + nodeName(id) + (c ? '\n' + (failed(c, id) ? '✗ Fail' : '✓ Pass') + (id === c.target ? ' · TARGET' : '') : '');

const nodes = new vis.DataSet(NODES.map(n => ({
  id: n[0], label: nodeLabel(n[0], null), x: n[3], y: n[4], shape: 'box', margin: 8,
  widthConstraint: { maximum: 150 }, font: { size: 15, face: 'Arial', color: 'black', multi: false }
})));
const edges = new vis.DataSet(EDGES.map((e, i) => ({ id: 'e' + i, from: e[0], to: e[1], arrows: 'to', color: { color: '#8a8a8a' }, width: 1.5 })));
const network = new vis.Network(document.getElementById('network'), { nodes: nodes, edges: edges }, {
  physics: { enabled: false },
  layout: { improvedLayout: false },
  edges: { smooth: false, arrows: { to: { scaleFactor: 0.8 } } },
  interaction: { zoomView: false, dragView: true, dragNodes: false, selectable: false, hover: true }
});

// ---- state ----
let mode = 'explore'; // explore | question | feedback | results
let ci = 0, tries = 0, results = [], selected = null, focusId = null;
const $ = id => document.getElementById(id);

// failed nodes that sit above the root gap (depend on it directly or indirectly)
function failedAbove(c, root) {
  const out = new Set();
  let grew = true;
  while (grew) {
    grew = false;
    EDGES.forEach(([from, to]) => {
      if ((to === root || out.has(to)) && failed(c, from) && !out.has(from)) { out.add(from); grew = true; }
    });
  }
  return out;
}

function restyle() {
  const c = (mode === 'question' || mode === 'feedback') ? CASES[ci] : null;
  const reveal = mode === 'feedback';
  const above = reveal ? failedAbove(c, c.root) : new Set();
  nodes.update(NODES.map(n => {
    const id = n[0];
    let bg = '#e3eefc', border = isFoundation(id) ? '#b8901a' : '#4a78b5', bw = isFoundation(id) ? 3 : 2;
    if (c) {
      bg = failed(c, id) ? '#f9d0d0' : '#c8f0d2';
      if (id === c.target) { border = '#7b2fbf'; bw = 4; }
      if (id === selected) { border = '#e67700'; bw = 5; bg = failed(c, id) ? '#fbc08a' : '#ffe0b2'; }
      if (reveal && id === c.root) { border = '#1f7a3f'; bw = 6; }
    } else if (id === focusId) { border = 'navy'; bw = 4; }
    const col = { background: bg, border: border };
    return { id: id, label: nodeLabel(id, c), color: { background: bg, border: border, highlight: col, hover: col }, borderWidth: bw };
  }));
  edges.update(EDGES.map((e, i) => {
    const hot = reveal && (above.has(e[0]) && (e[1] === c.root || above.has(e[1])));
    return { id: 'e' + i, color: { color: hot ? '#b22222' : '#8a8a8a' }, width: hot ? 4 : 1.5 };
  }));
}

function info(html, kind) {
  const el = $('info');
  el.className = 'card' + (kind ? ' ' + kind : '');
  el.innerHTML = html;
}
function firstTryScore() { return results.filter(r => r).length; }

function render() {
  const inCase = mode === 'question' || mode === 'feedback';
  $('startBtn').parentElement.style.display = (mode === 'explore' || mode === 'results') ? 'flex' : 'none';
  $('startBtn').textContent = mode === 'results' ? 'Try the cases again' : 'Start the cases';
  $('submitBtn').parentElement.style.display = mode === 'question' ? 'flex' : 'none';
  $('nextBtn').parentElement.style.display = (mode === 'feedback' || mode === 'results') ? 'flex' : 'none';
  $('nextBtn').textContent = mode === 'results' ? 'Back to exploring' : (ci === CASES.length - 1 ? 'See results' : 'Next case');
  $('nextBtn').className = mode === 'results' ? '' : 'primary';
  $('submitBtn').disabled = selected === null;
  $('clearBtn').disabled = selected === null;
  $('note').textContent = inCase ? 'Illustrative student results' : '';
  if (mode === 'explore') {
    $('status').textContent = 'Explore the map';
    $('prompt').textContent = OPENING;
  } else if (inCase) {
    const c = CASES[ci];
    $('status').textContent = 'Case ' + (ci + 1) + ' of ' + CASES.length + ' · First-try correct: ' + firstTryScore();
    $('prompt').innerHTML = 'The student failed the target, <b>' + c.target + '. ' + nodeName(c.target) + '</b>. Select the root gap.' +
      '<br/><span style="font-size:14px">Selected: ' + (selected ? selected + '. ' + nodeName(selected) : 'none yet') + '</span>';
  }
  restyle();
}

function explore() {
  mode = 'explore'; focusId = null; selected = null;
  info('Click any concept to read its description. Gold borders mark the two concepts with no prerequisites. When you are ready, press <b>Start the cases</b>.');
  render();
}
function startCases() {
  mode = 'question'; ci = 0; tries = 0; results = []; selected = null;
  askInfo(); render();
}
function askInfo() {
  info('Green concepts passed and red ones failed. The root gap is the failed concept whose direct prerequisites all passed (or that has none). Click one concept, then press <b>Submit</b>.');
}

function submit() {
  const c = CASES[ci];
  tries++;
  if (selected === c.root) {
    results[ci] = tries === 1;
    mode = 'feedback';
    info('<span class="lead">Correct.</span> ' + c.why, 'good');
  } else if (tries < 2) {
    const msg = failed(c, selected)
      ? 'That node failed because something below it failed. Look for a failed node whose prerequisites all passed.'
      : 'That node passed, so it is not a gap.';
    info('<span class="lead">Not quite.</span> ' + msg + ' Choose again and submit once more.', 'hint');
  } else {
    results[ci] = false;
    mode = 'feedback';
    info('<span class="lead">Not quite. The root gap is ' + c.root + '. ' + nodeName(c.root) + '</span> (green border). ' + c.why, 'bad');
  }
  render();
}

function next() {
  if (mode === 'results') { explore(); return; }
  if (ci < CASES.length - 1) {
    ci++; tries = 0; selected = null; mode = 'question'; askInfo();
  } else {
    mode = 'results'; selected = null;
    const score = firstTryScore();
    const targetIsRoot = CASES.filter(c => c.target === c.root).length;
    const missed = CASES.map((c, i) => results[i] ? null : 'Case ' + (i + 1) + ': root gap ' + c.root + '. ' + nodeName(c.root)).filter(Boolean);
    $('status').textContent = 'Results';
    $('prompt').innerHTML = '<b>Score: ' + score + ' of ' + CASES.length + '</b> (first try)';
    info((score >= PASS_MARK ? '<span class="lead">You can trace a failure to its root gap.</span> ' : '<span class="lead">Mastery is ' + PASS_MARK + ' of 5.</span> Review the rule and try again. ') +
      (missed.length ? '<br/><br/><b>Missed:</b><br/>' + missed.join('<br/>') : '') +
      '<br/><br/>Notice that the target was the root gap in only ' + targetIsRoot + ' of the 5 cases. Reteaching the target alone would often miss the real gap.', score >= PASS_MARK ? 'good' : '');
  }
  render();
}

network.on('click', params => {
  const id = network.getNodeAt(params.pointer.DOM);
  if (id === undefined) return;
  if (mode === 'explore' || mode === 'results') {
    if (mode === 'results') mode = 'explore';
    focusId = id;
    const p = prereqsOf(id);
    info('<b>' + id + '. ' + nodeName(id) + '</b><br/>' + NODES.find(n => n[0] === id)[2] + '<br/><br/>' +
      (p.length ? 'Depends on: ' + p.map(x => x + '. ' + nodeName(x)).join('; ') + '.' : '<i>No prerequisites in this map.</i>'));
    render();
  } else if (mode === 'question') {
    selected = selected === id ? null : id;
    render();
  }
});

$('startBtn').onclick = startCases;
$('submitBtn').onclick = submit;
$('clearBtn').onclick = () => { selected = null; render(); };
$('nextBtn').onclick = next;
$('zoomInBtn').onclick = () => network.moveTo({ scale: network.getScale() * 1.25 });
$('zoomOutBtn').onclick = () => network.moveTo({ scale: network.getScale() / 1.25 });
$('fitBtn').onclick = () => network.fit({ animation: false });
window.addEventListener('resize', () => network.fit({ animation: false }));
network.once('afterDrawing', () => network.fit({ animation: false }));

explore();
