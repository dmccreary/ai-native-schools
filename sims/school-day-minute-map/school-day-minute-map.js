// Where the Minutes Go in a Traditional School Day - Chart.js
// CANVAS_HEIGHT: 700
// An illustrative middle-school day of 425 minutes. Before the chart is shown, the learner
// estimates (a) the minutes of whole-class direct instruction and (b) the largest single use
// of time. Estimate (a) is correct within 10 minutes of 100. For (b), three categories tie at
// 100 minutes, and any of the three is accepted. After the reveal, a bar chart shows the seven
// categories with minutes and shares of 425; clicking a bar highlights the schedule blocks that
// make it up. Try again clears the estimates and hides the chart.

const SCHEDULE = [
  // [time, block, minutes, key]
  ['8:00–8:10', 'Homeroom', 10, 'home'],
  ['8:10–8:15', 'Passing', 5, 'pass'],
  ['8:15–9:05', 'Period 1: English', 50, 'acad'],
  ['9:05–9:10', 'Passing', 5, 'pass'],
  ['9:10–10:00', 'Period 2: Mathematics', 50, 'acad'],
  ['10:00–10:05', 'Passing', 5, 'pass'],
  ['10:05–10:55', 'Period 3: Science', 50, 'acad'],
  ['10:55–11:00', 'Passing', 5, 'pass'],
  ['11:00–11:50', 'Period 4: Social Studies', 50, 'acad'],
  ['11:50–12:20', 'Lunch', 30, 'lunch'],
  ['12:20–12:25', 'Passing', 5, 'pass'],
  ['12:25–1:15', 'Period 5: World Language', 50, 'acad'],
  ['1:15–1:20', 'Passing', 5, 'pass'],
  ['1:20–2:10', 'Period 6: Art', 50, 'arts'],
  ['2:10–2:15', 'Passing', 5, 'pass'],
  ['2:15–3:05', 'Period 7: Physical Education', 50, 'arts']
];
const TOTAL = 425;
const CATEGORIES = [
  { name: 'Whole-class direct instruction', short: 'Direct instruction', min: 100, from: 'acad', color: '#c0392b', how: '20 minutes in each of the five academic periods (Periods 1 to 5).' },
  { name: 'Guided and independent practice', short: 'Practice', min: 100, from: 'acad', color: '#2e86ab', how: '20 minutes in each of the five academic periods (Periods 1 to 5).' },
  { name: 'Arts and physical education', short: 'Arts and PE', min: 100, from: 'arts', color: '#9b4f96', how: 'Period 6 (Art) and Period 7 (Physical Education), 50 minutes each.' },
  { name: 'Settling, attendance, and wrap-up', short: 'Settling and wrap-up', min: 50, from: 'acad', color: '#e9a03b', how: '5 minutes of settling and 5 of wrap-up in each of the five academic periods.' },
  { name: 'Passing time', short: 'Passing', min: 35, from: 'pass', color: '#7f8c8d', how: 'Seven 5-minute passing periods between blocks.' },
  { name: 'Lunch', short: 'Lunch', min: 30, from: 'lunch', color: '#95a5a6', how: 'One 30-minute lunch.' },
  { name: 'Homeroom', short: 'Homeroom', min: 10, from: 'home', color: '#b0bec5', how: 'One 10-minute homeroom at the start of the day.' }
];
const DI = 100; // true direct-instruction total
const TIED = ['Whole-class direct instruction', 'Guided and independent practice', 'Arts and physical education'];

const $ = id => document.getElementById(id);
let chart = null;
let revealed = false;

function share(min) { return (100 * min / TOTAL).toFixed(1) + '%'; }

function buildSchedule() {
  $('schedBody').innerHTML = SCHEDULE.map((r, i) =>
    '<tr data-key="' + r[3] + '" id="row' + i + '"><td>' + r[0] + '</td><td>' + r[1] + '</td><td class="min">' + r[2] + '</td></tr>').join('');
  CATEGORIES.forEach(c => {
    const o = document.createElement('option');
    o.value = c.name; o.textContent = c.name;
    $('estB').appendChild(o);
  });
}

function canReveal() {
  const v = $('estA').value;
  const n = Number(v);
  return v !== '' && Number.isInteger(n) && n >= 0 && n <= TOTAL && $('estB').value !== '';
}

function highlight(key) {
  document.querySelectorAll('#schedBody tr').forEach(tr => tr.classList.toggle('hl', key !== null && tr.dataset.key === key));
}

function reveal() {
  revealed = true;
  const a = Number($('estA').value);
  const b = $('estB').value;
  const aOk = Math.abs(a - DI) <= 10;
  const bOk = TIED.includes(b);
  let msgA, msgB;
  if (aOk) msgA = 'Within 10 minutes: 100 minutes of the 425-minute day is whole-class direct instruction.';
  else if (a > DI) msgA = 'Higher than the schedule shows. Teachers explain new material for about 20 minutes of each 50-minute academic period, and only five of the seven periods are academic.';
  else msgA = 'Lower than the schedule shows: five academic periods with about 20 minutes of explanation each make 100 minutes.';
  if (bOk) msgB = 'Right: direct instruction and practice tie at 100 minutes, and arts and PE also take 100.';
  else msgB = 'That category is smaller. Three categories tie at 100 minutes each.';
  const score = (aOk ? 1 : 0) + (bOk ? 1 : 0);

  $('estA').disabled = true;
  $('estB').disabled = true;
  $('form').classList.add('hidden');
  $('chartPanel').classList.remove('hidden');
  $('feedback').classList.remove('hidden');
  $('againRow').classList.remove('hidden');
  $('prompt').textContent = 'Click any bar to see which blocks of the schedule add up to it.';
  $('feedback').innerHTML =
    '<b>Score: ' + score + ' of 2.</b><br/>' +
    '<span class="' + (aOk ? 'good' : 'bad') + '"><b>(a) You estimated ' + a + ' minutes; the schedule shows 100.</b> ' + msgA + '</span><br/>' +
    '<span class="' + (bOk ? 'good' : 'bad') + '"><b>(b) You chose ' + b + '.</b> ' + msgB + '</span><br/>' +
    'Non-instructional time (settling, passing, lunch, homeroom) adds up to 125 minutes, more than direct instruction.';
  drawChart(a);
}

function drawChart(estimate) {
  const ctx = $('chart');
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: CATEGORIES.map(c => c.name),
      datasets: [
        { label: 'Minutes (illustrative schedule)', data: CATEGORIES.map(c => c.min), backgroundColor: CATEGORIES.map(c => c.color), grouped: false, barPercentage: 0.7 },
        { label: 'Your estimate (a)', data: CATEGORIES.map((c, i) => i === 0 ? estimate : null), backgroundColor: 'rgba(0,0,0,0)', borderColor: 'black', borderWidth: 2, grouped: false, barPercentage: 0.7 }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        title: { display: true, text: 'Minutes in a 425-minute day (illustrative schedule)', font: { size: 14 } },
        legend: { display: true, position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } },
        tooltip: { callbacks: { title: items => CATEGORIES[items[0].dataIndex].name, label: c => c.dataset.label + ': ' + c.raw + ' min' + (c.datasetIndex === 0 ? ' (' + share(c.raw) + ')' : '') } }
      },
      scales: {
        x: { beginAtZero: true, max: Math.max(120, Math.ceil((estimate + 10) / 20) * 20), title: { display: true, text: 'Minutes' } },
        y: { ticks: { autoSkip: false, font: { size: 11 }, callback: function (v) { const c = CATEGORIES[v]; return [c.short, c.min + ' min, ' + share(c.min)]; } } }
      },
      onClick: (e, els) => { if (els.length) selectCategory(els[0].index); }
    }
  });
}

function selectCategory(i) {
  const c = CATEGORIES[i];
  highlight(c.from);
  const extra = document.getElementById('catInfo');
  const html = '<b>' + c.name + ': ' + c.min + ' minutes (' + share(c.min) + ').</b> ' + c.how + ' The highlighted rows in the schedule contribute.';
  if (extra) extra.innerHTML = html;
  else $('feedback').insertAdjacentHTML('afterbegin', '<div id="catInfo" style="margin-bottom:6px;padding:4px 6px;background:#fff8dc;border-radius:6px">' + html + '</div>');
}

function tryAgain() {
  revealed = false;
  if (chart) { chart.destroy(); chart = null; }
  $('estA').value = ''; $('estB').value = '';
  $('estA').disabled = false; $('estB').disabled = false;
  $('form').classList.remove('hidden');
  ['chartPanel', 'feedback', 'againRow'].forEach(id => $(id).classList.add('hidden'));
  $('prompt').textContent = 'In this seven-hour day, how many minutes does a student spend listening to a teacher explain new material to the whole class?';
  highlight(null);
  $('revealBtn').disabled = true;
}

buildSchedule();
$('estA').addEventListener('input', () => { $('revealBtn').disabled = !canReveal(); });
$('estB').addEventListener('change', () => { $('revealBtn').disabled = !canReveal(); });
$('estA').addEventListener('keydown', e => { if (e.key === 'Enter' && canReveal()) reveal(); });
$('revealBtn').addEventListener('click', () => { if (canReveal()) reveal(); });
$('againBtn').addEventListener('click', tryAgain);
