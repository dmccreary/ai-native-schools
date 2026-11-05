// Generate Once Versus Generate for Each Student - Chart.js
// CANVAS_HEIGHT: 650
// Compares the yearly total cost of generating a textbook once and serving it to every student
// (a flat production cost; serving is free in this model) with generating content live for each
// student (students x tokens / 1,000,000 x price). Three questions come first (two attempts
// each, first attempt scored); then the controls unlock and both lines and the break-even point
// update at once. All values are illustrative. Nothing moves until the learner acts.

const DEFAULTS = { prod: 22400, tokens: 3600000, price: '2', studentsPos: 520 };

const QUESTIONS = [
  { prompt: 'At how many students does generating once become cheaper? Start here: what is the generate-once cost per student for 12,000 students?',
    setup: 'Production cost $22,400 (one time), serving cost zero. Give dollars per student.',
    answer: 1.87, tol: 0.01, answerText: '$1.87', example: '2.50',
    working: '$22,400 ÷ 12,000 students = $1.87 per student.' },
  { prompt: 'What does live generation cost in total per year for 12,000 students?',
    setup: '3.6 million tokens per student per year at $2.00 per million tokens. Give the total in dollars.',
    answer: 86400, tol: 100, answerText: '$86,400', example: '50000',
    working: '3.6 × $2.00 = $7.20 per student; $7.20 × 12,000 = $86,400.' },
  { prompt: 'At how many students are the two yearly totals equal?',
    setup: 'Break-even students = production cost ÷ live cost per student. Give a number of students.',
    answer: 3100, tol: 100, answerText: 'about 3,100 students', example: '5000',
    working: '$22,400 ÷ $7.20 per student = 3,111, about 3,100 students. Above that, generating once is cheaper.' }
];
const WRONG_HINT = 'Check the units: the price is per million tokens.';

let qi = 0, attempt = 0, resolved = false, firstTry = [], unlocked = false;
const $ = id => document.getElementById(id);
const money = (v, d) => '$' + v.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const whole = v => Math.round(v).toLocaleString('en-US');

function students() {
  const pos = parseFloat($('students').value);
  const raw = 100 * Math.pow(10, pos * 4 / 1000);
  return Math.min(1000000, Math.max(100, Math.round(raw / 100) * 100));
}
function values() {
  const prod = parseFloat($('prod').value);
  const tokens = parseFloat($('tokens').value);
  const price = parseFloat($('price').value);
  const liveEach = tokens / 1e6 * price;
  return { prod, tokens, price, liveEach, n: students(), breakEven: prod / liveEach };
}

// ---------------------------------------------------------------------------
// Chart
// ---------------------------------------------------------------------------
function shortMoney(v) {
  if (v >= 1e9) return '$' + (v / 1e9) + 'B';
  if (v >= 1e6) return '$' + (v / 1e6) + 'M';
  if (v >= 1e3) return '$' + (v / 1e3) + 'k';
  return '$' + v;
}
const chart = new Chart($('chart'), {
  type: 'scatter',
  data: {
    datasets: [
      { label: 'Generate once (total)', data: [], showLine: true, borderColor: 'steelblue', backgroundColor: 'steelblue', borderWidth: 3, pointRadius: 0 },
      { label: 'Generate live for each student (total)', data: [], showLine: true, borderColor: 'darkorange', backgroundColor: 'darkorange', borderWidth: 3, pointRadius: 0 },
      { label: 'Break-even', data: [], borderColor: 'firebrick', backgroundColor: 'firebrick', pointRadius: 7, pointStyle: 'rectRot' },
      { label: 'Current number of students', data: [], borderColor: 'black', backgroundColor: 'white', pointRadius: 5, borderWidth: 2 }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    plugins: {
      legend: { position: 'top', labels: { boxWidth: 14, font: { size: 13 } } },
      tooltip: {
        enabled: false,
        callbacks: { label: c => c.dataset.label + ': ' + whole(c.parsed.x) + ' students, ' + money(c.parsed.y, 0) }
      }
    },
    scales: {
      x: { type: 'logarithmic', min: 100, max: 1000000,
           title: { display: true, text: 'Number of students (log scale)', font: { size: 13 } },
           ticks: { maxRotation: 0, autoSkip: false, callback: v => [100, 1000, 10000, 100000, 1000000].includes(v) ? whole(v) : '' } },
      y: { type: 'logarithmic',
           title: { display: true, text: 'Total cost per year (log scale)', font: { size: 13 } },
           ticks: { callback: v => (Math.log10(v) % 1 === 0) ? shortMoney(v) : '' } }
    }
  }
});

function updateChart() {
  const v = values();
  chart.data.datasets[0].data = [{ x: 100, y: v.prod }, { x: 1000000, y: v.prod }];
  chart.data.datasets[1].data = [{ x: 100, y: 100 * v.liveEach }, { x: 1000000, y: 1000000 * v.liveEach }];
  const be = v.breakEven;
  chart.data.datasets[2].data = unlocked && be >= 100 && be <= 1000000 ? [{ x: be, y: v.prod }] : [];
  chart.data.datasets[3].data = unlocked ? [{ x: v.n, y: v.prod }, { x: v.n, y: v.n * v.liveEach }] : [];
  chart.options.plugins.tooltip.enabled = unlocked;
  chart.update();
}

// ---------------------------------------------------------------------------
// Readouts and controls
// ---------------------------------------------------------------------------
function updateLabels() {
  const v = values();
  $('prodV').textContent = money(v.prod, 0);
  $('tokensV').textContent = (v.tokens / 1e6).toFixed(1) + ' million';
  $('studentsV').textContent = whole(v.n);
  if (!unlocked) return;
  const onceEach = v.prod / v.n;
  const liveTotal = v.n * v.liveEach;
  const cheaper = v.prod < liveTotal ? 'Generating once is cheaper at this number of students.'
                : v.prod > liveTotal ? 'Live generation is cheaper at this number of students.' : 'The two totals are equal.';
  $('readout').innerHTML =
    '<div class="big">Break-even: about ' + whole(v.breakEven) + ' students. ' + cheaper + '</div>' +
    'Live generation costs ' + money(v.liveEach, 2) + ' per student per year (' + (v.tokens / 1e6).toFixed(1) + ' million tokens × ' + money(v.price, 2) + ' per million).<br>' +
    'At ' + whole(v.n) + ' students: generate once ' + money(v.prod, 0) + ' in total (' + money(onceEach, 2) + ' per student); live ' + money(liveTotal, 0) + ' in total.<br>' +
    'The generate-once line is flat: its total does not grow with students, because serving pages costs nothing in this model. ' +
    'Challenge score: ' + score() + ' of 3.';
}

function setLocked(locked) {
  ['prod', 'tokens', 'price', 'students'].forEach(id => {
    $(id).disabled = locked;
    $(id).parentElement.classList.toggle('locked', locked);
  });
  $('redo').hidden = locked;
  $('defaults').hidden = locked;
  $('lockNote').textContent = locked ? 'The controls unlock after the three questions.' : 'Change the price, the tokens, or the number of students.';
}

function applyDefaults() {
  $('prod').value = DEFAULTS.prod;
  $('tokens').value = DEFAULTS.tokens;
  $('price').value = DEFAULTS.price;
  $('students').value = DEFAULTS.studentsPos;
  refresh();
}

function refresh() { updateLabels(); updateChart(); }

// ---------------------------------------------------------------------------
// Questions
// ---------------------------------------------------------------------------
function score() { return firstTry.filter(Boolean).length; }

function startQuestions() {
  unlocked = false;
  qi = 0;
  firstTry = [];
  $('challenge').hidden = false;
  $('readout').hidden = true;
  setLocked(true);
  applyDefaults();
  loadQuestion();
}

function loadQuestion() {
  attempt = 0;
  resolved = false;
  const Q = QUESTIONS[qi];
  $('cnum').textContent = 'Question ' + (qi + 1) + ' of 3';
  $('cscore').textContent = 'Score: ' + score() + ' of 3';
  $('cprompt').textContent = Q.prompt;
  $('csetup').textContent = Q.setup;
  $('answer').value = '';
  $('answer').disabled = false;
  $('check').disabled = false;
  $('check').classList.add('go');
  $('next').disabled = true;
  $('next').classList.remove('go');
  $('next').textContent = qi === 2 ? 'Unlock controls' : 'Next';
  setFeedback('', '');
}

function setFeedback(kind, html) {
  $('cfeedback').className = kind;
  $('cfeedback').innerHTML = html;
}

function check() {
  if (resolved) return;
  const Q = QUESTIONS[qi];
  const v = Number(String($('answer').value).replace(/[$,%\s]/g, ''));
  if ($('answer').value.trim() === '' || isNaN(v)) { setFeedback('retry', '<b>Type a number first,</b> for example ' + Q.example + '.'); return; }
  const ok = Math.abs(v - Q.answer) <= Q.tol + 1e-9;
  attempt++;
  if (attempt === 1) firstTry[qi] = ok;
  if (ok) {
    resolved = true;
    setFeedback('ok', '<b>Correct: ' + Q.answerText + '.</b> ' + Q.working + (attempt > 1 ? ' (A second try does not change your score.)' : ''));
  } else if (attempt === 1) {
    setFeedback('retry', '<b>Not quite.</b> ' + WRONG_HINT + ' Try once more.');
  } else {
    resolved = true;
    setFeedback('miss', '<b>The answer is ' + Q.answerText + '.</b> ' + Q.working);
  }
  $('cscore').textContent = 'Score: ' + score() + ' of 3';
  if (resolved) {
    $('answer').disabled = true;
    $('check').disabled = true;
    $('check').classList.remove('go');
    $('next').disabled = false;
    $('next').classList.add('go');
  }
}

function next() {
  if (!resolved) return;
  if (qi < 2) { qi++; loadQuestion(); return; }
  unlocked = true;
  $('challenge').hidden = true;
  $('readout').hidden = false;
  setLocked(false);
  refresh();
}

['prod', 'tokens', 'students'].forEach(id => $(id).addEventListener('input', refresh));
$('price').addEventListener('change', refresh);
$('check').addEventListener('click', check);
$('answer').addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
$('next').addEventListener('click', next);
$('redo').addEventListener('click', startQuestions);
$('defaults').addEventListener('click', applyDefaults);
startQuestions();
