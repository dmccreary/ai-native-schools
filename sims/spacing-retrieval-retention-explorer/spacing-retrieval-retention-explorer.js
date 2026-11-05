// Spacing and Retrieval Retention Explorer - Chart.js
// CANVAS_HEIGHT: 660
// An illustrative forgetting model (not experimental data). Retention R(t) = exp(-(t - t_last) / S),
// with t in days since the lesson, t_last the most recent review (0 at the start) and S the memory
// stability in days, starting at 3. At each review, R is computed at that moment and
// S_new = S * (1 + k * (1 - R)), with k = 2 for Reread and k = 4 for Retrieval. Reviews on or after
// the exam day are skipped. The learner first commits predictions P1 (best schedule for a day-30
// exam) and P2 (better method); nothing is plotted before that. Then the curves appear and the
// learner can switch the method and the exam day. P3 (best schedule for a day-1 exam) unlocks after
// the learner has tried exam days 1 and 7. Reset returns to the opening state.

const SCHEDULES = [
  { name: 'No review', reviews: [], label: 'none', color: '#7f8c8d' },
  { name: 'Massed', reviews: [0.042, 0.083, 0.125], label: '0.042, 0.083, 0.125 (1, 2 and 3 hours after)', color: '#c0392b' },
  { name: 'Evenly spaced', reviews: [1, 3, 7], label: '1, 3, 7', color: '#2e86ab' },
  { name: 'Expanding', reviews: [1, 4, 12], label: '1, 4, 12', color: '#2e9e5b' }
];
const METHODS = [{ name: 'Reread', k: 2 }, { name: 'Retrieval', k: 4 }];
const EXAM_DAYS = [1, 7, 30];
const S0 = 3;

const P1_FEEDBACK = {
  'Expanding': ['good', 'Yes: expanding gaps let each review come when the memory has faded a little, which strengthens it most.'],
  'Massed': ['bad', 'Massed reviews come before any forgetting happens, so they add little lasting strength.'],
  'Evenly spaced': ['bad', 'Close: spacing helps, but longer later gaps help more in this model.'],
  'No review': ['bad', 'Without review, retention falls close to zero within a month.']
};

// state
let p1 = null, p2 = null, p3 = null;
let method = 'Reread', examDay = 30;
let triedDays = new Set();
let scores = { p1: null, p2: null, p3: null };
let p3Tries = 0, p3Done = false;
let msgs = [];
let chart = null;

const $ = id => document.getElementById(id);

// ---- the model ----
function curve(sched, k, exam) {
  // returns { points: [{x, y}], final }
  const reviews = sched.reviews.filter(t => t < exam);
  let S = S0, tl = 0;
  const pts = [];
  const step = exam / 300;
  let ri = 0;
  for (let i = 0; i <= 300; i++) {
    const t = i * step;
    while (ri < reviews.length && reviews[ri] <= t) {
      const tr = reviews[ri];
      const R = Math.exp(-(tr - tl) / S);
      pts.push({ x: tr, y: 100 * R });
      S = S * (1 + k * (1 - R));
      tl = tr;
      pts.push({ x: tr, y: 100 });
      ri++;
    }
    pts.push({ x: t, y: 100 * Math.exp(-(t - tl) / S) });
  }
  return { points: pts, final: Math.round(100 * Math.exp(-(exam - tl) / S)) };
}

// ---- UI builders ----
function optionButtons(containerId, names, onPick) {
  const box = $(containerId);
  box.innerHTML = '';
  names.forEach(n => {
    const b = document.createElement('button');
    b.className = 'opt';
    b.textContent = n;
    b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', () => onPick(n));
    box.appendChild(b);
  });
}
function markButtons(containerId, value) {
  [...$(containerId).children].forEach(b => {
    const on = b.textContent === value || b.dataset.v === String(value);
    b.classList.toggle('on', on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
}

function init() {
  $('schedBody').innerHTML = SCHEDULES.map(s => '<tr><td>' + s.name + '</td><td>' + s.label + '</td></tr>').join('');
  optionButtons('p1', SCHEDULES.map(s => s.name), n => { p1 = n; markButtons('p1', n); updateSubmit(); });
  optionButtons('p2', METHODS.map(m => m.name), n => { p2 = n; markButtons('p2', n); updateSubmit(); });
  optionButtons('method', METHODS.map(m => m.name), n => { method = n; markButtons('method', n); draw(); });
  optionButtons('exam', EXAM_DAYS.map(d => 'Day ' + d), n => {
    examDay = Number(n.replace('Day ', ''));
    triedDays.add(examDay);
    markButtons('exam', n);
    if (triedDays.has(1) && triedDays.has(7) && !p3Done) { $('p3Box').classList.remove('hidden'); $('p3Wait').classList.add('hidden'); }
    draw();
  });
  optionButtons('p3', SCHEDULES.map(s => s.name), n => { if (p3Done) return; p3 = n; markButtons('p3', n); $('p3Btn').disabled = false; });
  $('submitBtn').addEventListener('click', submitPredictions);
  $('p3Btn').addEventListener('click', checkP3);
  $('resetBtn').addEventListener('click', reset);
}

function updateSubmit() { $('submitBtn').disabled = !(p1 && p2); }

function submitPredictions() {
  scores.p1 = p1 === 'Expanding';
  scores.p2 = p2 === 'Retrieval';
  msgs = [];
  const f1 = P1_FEEDBACK[p1];
  msgs.push('<span class="' + f1[0] + '"><b>P1 (' + p1 + '):</b> ' + f1[1] + (scores.p1 ? '' : ' The answer is Expanding.') + '</span>');
  msgs.push(scores.p2 ? '<span class="good"><b>P2 (Retrieval):</b> Right: retrieval strengthens memory more than rereading.</span>'
                      : '<span class="bad"><b>P2 (Reread):</b> Rereading feels effective, but recalling from memory builds more lasting strength. The answer is Retrieval.</span>');
  $('predictPanel').classList.add('hidden');
  $('explorePanel').classList.remove('hidden');
  $('placeholder').classList.add('hidden');
  $('chartBox').classList.remove('hidden');
  $('feedback').classList.remove('hidden');
  method = 'Reread'; examDay = 30; triedDays = new Set([30]);
  markButtons('method', 'Reread'); markButtons('exam', 'Day 30');
  $('prompt').textContent = 'Switch the method to Retrieval, then try exam days 1 and 7. Which schedule wins on each exam day?';
  draw();
}

function checkP3() {
  if (!p3 || p3Done) return;
  p3Tries++;
  if (p3 === 'Massed') {
    p3Done = true; scores.p3 = p3Tries === 1;
    msgs[2] = '<span class="good"><b>P3 (Massed):</b> Yes: cramming wins tomorrow\'s test, which is why it feels like it works.</span>';
  } else if (p3Tries < 2) {
    msgs[2] = '<span class="hint"><b>P3 (' + p3 + '):</b> Look at the day-1 exam: the spaced reviews have not happened yet. One more try.</span>';
  } else {
    p3Done = true; scores.p3 = false;
    msgs[2] = '<span class="bad"><b>P3 (' + p3 + '):</b> The answer is Massed. On a day-1 exam the spaced reviews have not happened yet, so the three same-day reviews win.</span>';
  }
  if (p3Done) { $('p3Btn').disabled = true; [...$('p3').children].forEach(b => b.disabled = true); }
  else { $('p3Btn').disabled = true; }
  renderFeedback();
}

function reset() {
  p1 = p2 = p3 = null; scores = { p1: null, p2: null, p3: null }; p3Tries = 0; p3Done = false; msgs = [];
  method = 'Reread'; examDay = 30; triedDays = new Set();
  ['p1', 'p2', 'p3'].forEach(id => { markButtons(id, null); [...$(id).children].forEach(b => b.disabled = false); });
  $('submitBtn').disabled = true; $('p3Btn').disabled = true;
  $('predictPanel').classList.remove('hidden');
  ['explorePanel', 'p3Box', 'chartBox', 'feedback'].forEach(id => $(id).classList.add('hidden'));
  $('p3Wait').classList.remove('hidden');
  $('placeholder').classList.remove('hidden');
  $('prompt').textContent = 'Maya has three short reviews before a test on day 30. Which schedule, and which way of reviewing, will help her remember the most?';
  if (chart) { chart.destroy(); chart = null; }
}

function renderFeedback() {
  const k = METHODS.find(m => m.name === method).k;
  const finals = SCHEDULES.map(s => s.name + ' ' + curve(s, k, examDay).final + '%').join(', ');
  let html = msgs.filter(Boolean).join('<br/>');
  html += '<br/><b>Day-' + examDay + ' retention, ' + method + ':</b> ' + finals + '.';
  if (p3Done) {
    const n = [scores.p1, scores.p2, scores.p3].filter(Boolean).length;
    html += '<br/><b>Score: ' + n + ' of 3.</b> ' + (n === 3 ? 'You can predict when spacing and retrieval pay off.' : 'Mastery is 3 of 3. Press Reset to try again.');
  }
  $('feedback').innerHTML = html;
}

function draw() {
  const k = METHODS.find(m => m.name === method).k;
  const other = METHODS.find(m => m.name !== method);
  const datasets = [];
  SCHEDULES.forEach(s => {
    const c = curve(s, k, examDay);
    datasets.push({ label: s.name + ': ' + c.final + '%', data: c.points, borderColor: s.color, backgroundColor: s.color,
                    borderWidth: 2.5, pointRadius: 0, tension: 0 });
  });
  SCHEDULES.forEach(s => {
    const c = curve(s, other.k, examDay);
    datasets.push({ label: 'ref', data: c.points, borderColor: s.color + '55', borderWidth: 1.5, borderDash: [4, 4], pointRadius: 0, tension: 0 });
  });
  SCHEDULES.forEach(s => {
    const c = curve(s, k, examDay);
    datasets.push({ label: 'mark', data: [{ x: examDay, y: c.final }], borderColor: s.color, backgroundColor: s.color, pointRadius: 5, showLine: false });
  });
  const opts = {
    responsive: true, maintainAspectRatio: false, animation: false, parsing: false,
    plugins: {
      title: { display: true, text: [method + ' method, exam on day ' + examDay, 'Illustrative model, not experimental data'], font: { size: 13 } },
      legend: { position: 'bottom', labels: { filter: it => it.text !== 'ref' && it.text !== 'mark', boxWidth: 12, font: { size: 12 } } },
      tooltip: { enabled: false }
    },
    scales: {
      x: { type: 'linear', min: 0, max: examDay, title: { display: true, text: 'Days since the lesson (dashed: the other method)' } },
      y: { min: 0, max: 100, title: { display: true, text: 'Predicted retention (%)' } }
    }
  };
  if (chart) { chart.data.datasets = datasets; chart.options = opts; chart.update(); }
  else chart = new Chart($('chart'), { type: 'line', data: { datasets: datasets }, options: opts });
  renderFeedback();
}

init();
