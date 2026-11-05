// Reinforcing or Balancing? MicroSim (vis-network)
// CANVAS_HEIGHT: 644
// Six illustrative causal loops from school change, one at a time, each drawn as a ring of
// variables joined by signed arrows. The learner counts the minus signs and decides whether the
// loop is reinforcing (even number of minus signs, including zero) or balancing (odd number).
// Two tries per loop; only the first try counts toward the score "First-try correct: n of 6".
// Mastery is 5 of 6 on the first run. The results screen lists the minus-sign count for each loop.
// The loops are read from reinforcing-or-balancing-cld.json. Nodes are locked for learners and
// mouse-wheel zoom is off; the +, -, and Reset view buttons zoom. Add ?edit=true to the URL to drag
// the nodes of the current loop and copy the updated JSON back into the data file.
// The MicroSim opens on loop 1 of a shuffled order and nothing moves until the learner answers.

const DATA_FILE = 'reinforcing-or-balancing-cld.json';
const EDIT = new URLSearchParams(window.location.search).get('edit') === 'true';
const TYPES = ['Reinforcing', 'Balancing'];
const PASS_MARK = 5;

let cld = null;          // the loaded JSON
let network = null;
let order = [];          // shuffled loop indexes for this run
let pos = 0;             // position in the run
let tries = 0;           // answers on the current loop
let firstPick = null;    // first (scored) answer on the current loop
let results = [];        // one entry per answered loop
let runNumber = 0;
let firstRunScore = null;
let answered = false;

const $ = id => document.getElementById(id);

// ---------------------------------------------------------------------------
// Loop helpers
// ---------------------------------------------------------------------------
function minusCount(loop) { return loop.edges.filter(e => e.sign === '-').length; }
function typeOf(loop) { return minusCount(loop) % 2 === 0 ? 'Reinforcing' : 'Balancing'; }
function currentLoop() { return cld.loops[order[pos]]; }

function wrapLabel(text, max) {
  const lines = [];
  let line = '';
  text.split(' ').forEach(w => {
    if (line && (line + ' ' + w).length > max) { lines.push(line); line = w; } else line = line ? line + ' ' + w : w;
  });
  if (line) lines.push(line);
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Drawing one loop with vis-network
// ---------------------------------------------------------------------------
function drawLoop(reveal) {
  const loop = currentLoop();
  const nodes = loop.nodes.map(n => ({
    id: n.id, label: wrapLabel(n.label, 14), x: n.position.x, y: n.position.y,
    shape: 'box', margin: 8, borderWidth: 2,
    color: { background: 'white', border: '#1e40af', highlight: { background: '#dbeafe', border: '#1e3a8a' } },
    font: { size: 16, face: 'Arial', color: '#1f2937' }
  }));
  // centre marker: "?" until the answer is revealed, then R or B with the minus count
  const t = typeOf(loop);
  nodes.push({
    id: '__center', x: loop.center.x, y: loop.center.y, shape: 'circle', fixed: true,
    label: reveal ? (t === 'Reinforcing' ? 'R' : 'B') : '?',
    color: { background: reveal ? (t === 'Reinforcing' ? '#fee2e2' : '#dcfce7') : '#f3f4f6',
             border: reveal ? (t === 'Reinforcing' ? '#b91c1c' : '#15803d') : '#9ca3af' },
    font: { size: 22, face: 'Arial', bold: true, color: '#1f2937' }, borderWidth: 2, chosen: false
  });
  // Straight arrows, with each sign drawn as its own small node just outside the middle of the arrow.
  // (vis-network edge labels render unreliably on curved and near-horizontal edges.)
  const byId = {};
  loop.nodes.forEach(n => { byId[n.id] = n.position; });
  const edges = loop.edges.map((e, k) => ({
    id: 'e' + k, from: e.source, to: e.target, arrows: { to: { enabled: true, scaleFactor: 1.1 } },
    color: { color: e.sign === '-' ? '#b91c1c' : '#15803d' }, width: 3, smooth: { enabled: false }
  }));
  loop.edges.forEach((e, k) => {
    const a = byId[e.source], b = byId[e.target];
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    let dx = mx - loop.center.x, dy = my - loop.center.y;
    const len = Math.hypot(dx, dy) || 1;
    dx /= len; dy /= len;
    const neg = e.sign === '-';
    nodes.push({
      id: '__sign' + k, x: mx + dx * 22, y: my + dy * 22, shape: 'circle', fixed: true, chosen: false,
      label: neg ? '\u2212' : '+', borderWidth: 2, margin: 4,
      color: { background: neg ? '#fee2e2' : '#dcfce7', border: neg ? '#b91c1c' : '#15803d' },
      font: { size: 20, face: 'Arial', bold: true, color: neg ? '#b91c1c' : '#15803d' }
    });
  });

  const data = { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) };
  const options = {
    physics: false,
    interaction: { dragNodes: EDIT, dragView: true, zoomView: false, hover: false, selectable: EDIT },
    nodes: { widthConstraint: { maximum: 150 } }
  };
  if (network) network.destroy();
  network = new vis.Network($('network'), data, options);
  network.once('afterDrawing', () => network.fit({ animation: false }));
}

function zoomBy(f) {
  if (!network) return;
  network.moveTo({ scale: network.getScale() * f, animation: false });
}

// ---------------------------------------------------------------------------
// Quiz flow
// ---------------------------------------------------------------------------
function startRun() {
  runNumber++;
  order = cld.loops.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  pos = 0;
  results = [];
  $('summary').style.display = 'none';
  $('quiz').style.display = 'block';
  showLoop();
}

function showLoop() {
  tries = 0;
  firstPick = null;
  answered = false;
  [0, 1].forEach(i => { const b = $('choice-' + i); b.disabled = false; b.className = 'btn'; });
  $('next-btn').disabled = true;
  $('next-btn').innerHTML = pos === order.length - 1 ? 'See results' : 'Next &rarr;';
  setFeedback('', 'Count the minus signs around the whole loop, then choose. You get two tries, and only the first try counts toward the score.');
  updateHeader();
  drawLoop(false);
}

function choose(i) {
  if (answered) return;
  const loop = currentLoop();
  const right = TYPES[i] === typeOf(loop);
  tries++;
  if (tries === 1) firstPick = i;
  const btn = $('choice-' + i);
  if (right) {
    finish(true, 'good', 'Correct: ' + TYPES[i] + '.', loop.why);
    btn.className = 'btn correct';
  } else if (tries < 2) {
    btn.disabled = true;
    btn.className = 'btn wrong';
    setFeedback('hint', '<b>Not quite. Choose again.</b> Count the minus signs around the whole loop. ' + loop.why);
  } else {
    btn.className = 'btn wrong';
    finish(false, 'bad', 'Not quite. This loop is ' + typeOf(loop).toLowerCase() + '.', loop.why);
  }
}

function finish(right, kind, lead, body) {
  answered = true;
  const loop = currentLoop();
  results[pos] = { loop: loop, firstTry: right && tries === 1, firstPick: firstPick, n: pos + 1 };
  [0, 1].forEach(i => {
    const b = $('choice-' + i);
    b.disabled = true;
    if (TYPES[i] === typeOf(loop)) b.className = 'btn correct';
  });
  setFeedback(kind, '<b>' + lead + '</b> ' + body + (right && tries > 1 ? ' (Second try, so it does not count toward the score.)' : ''));
  $('next-btn').disabled = false;
  updateHeader();
  drawLoop(true);
}

function next() {
  if (!answered) return;
  pos++;
  if (pos >= order.length) showSummary(); else showLoop();
}

function scoreOf() { return results.filter(r => r && r.firstTry).length; }

function updateHeader() {
  const total = cld.loops.length;
  const label = pos >= order.length ? 'Results' : (runNumber === 1 ? 'Loop ' : 'Practice ') + (pos + 1) + ' of ' + total;
  $('progress').textContent = label;
  $('score').textContent = 'First-try correct: ' + scoreOf() + ' of ' + total;
}

function setFeedback(kind, html) {
  const f = $('feedback');
  f.className = 'feedback' + (kind ? ' ' + kind : '');
  f.innerHTML = html;
}

function showSummary() {
  const total = cld.loops.length;
  const score = scoreOf();
  if (runNumber === 1) firstRunScore = score;
  updateHeader();
  const passed = score >= PASS_MARK;
  let head;
  if (runNumber === 1) head = score + ' of ' + total + ' correct on the first run. ' +
    (passed ? 'You can read a loop.' : 'Mastery is 5 of 6. Review the counting rule and try again; the loops will be reshuffled.');
  else head = score + ' of ' + total + ' on this practice run. Practice runs do not change your first-run score of ' + firstRunScore + ' of ' + total + '.';
  const rows = results.map(r => {
    const first = r.firstPick === null ? '' : TYPES[r.firstPick];
    return '<tr><td>' + r.n + '</td><td class="loopcol">' + r.loop.nodes.map(n => n.label).join(' &rarr; ') + '</td><td>' + minusCount(r.loop) +
      '</td><td>' + typeOf(r.loop) + '</td><td style="color:' + (r.firstTry ? 'darkgreen' : 'firebrick') + '">' +
      (r.firstTry ? '&#10003; ' : '&#10007; ') + first + '</td></tr>';
  }).join('');
  $('summary').innerHTML = '<b style="color:' + (passed && runNumber === 1 ? 'darkgreen' : 'black') + '">' + head + '</b>' +
    '<table><tr><th>#</th><th class="loopcol">Loop</th><th>Minus signs</th><th>Type</th><th>Your first answer</th></tr>' + rows + '</table>' +
    '<p style="margin:8px 0 6px">Three loops are reinforcing and three are balancing. The workload and burnout loop is reinforcing even though it is harmful: the type is about structure, not about whether the loop is good.</p>' +
    '<button type="button" class="btn primary" id="again-btn">Play again</button>';
  $('again-btn').addEventListener('click', startRun);
  $('quiz').style.display = 'none';
  $('summary').style.display = 'block';
}

// ---------------------------------------------------------------------------
// Edit mode: drag the nodes of the current loop, then copy the JSON with the new positions
// ---------------------------------------------------------------------------
function copyJSON() {
  const loop = currentLoop();
  const posns = network.getPositions(loop.nodes.map(n => n.id).concat(['__center']));
  loop.nodes.forEach(n => { n.position = { x: Math.round(posns[n.id].x), y: Math.round(posns[n.id].y) }; });
  const text = JSON.stringify(cld, null, 2);
  navigator.clipboard.writeText(text).then(
    () => { $('edit-status').textContent = 'Copied. Paste it into ' + DATA_FILE + '.'; },
    () => { $('edit-status').textContent = 'Copy failed; see the console.'; console.log(text); });
}

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
function init() {
  [0, 1].forEach(i => $('choice-' + i).addEventListener('click', () => choose(i)));
  $('next-btn').addEventListener('click', next);
  $('zoom-in').addEventListener('click', () => zoomBy(1.2));
  $('zoom-out').addEventListener('click', () => zoomBy(1 / 1.2));
  $('zoom-reset').addEventListener('click', () => network && network.fit({ animation: false }));
  if (EDIT) {
    $('edit-bar').style.display = 'flex';
    $('copy-btn').addEventListener('click', copyJSON);
  }
  fetch(DATA_FILE)
    .then(r => r.json())
    .then(json => { cld = json; startRun(); })
    .catch(err => { setFeedback('bad', 'Could not load ' + DATA_FILE + '. Open this page through a web server.'); console.error(err); });
}

init();
