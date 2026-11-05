// Is This a Normal Dip? MicroSim (Chart.js)
// CANVAS_HEIGHT: 728
// Three pilot performance series (percent correct, months 0 to 12, baseline 70 at month 0).
// For each series the learner commits the month of the lowest point and a judgment, then submits.
// The rule: a normal dip has its lowest point in months 2 to 4, is no deeper than 15 percent of the
// baseline, and is back at or above the baseline by month 8. A dip that is deeper, bottoms after
// month 4, or has not recovered by month 8 is "Deep or late: investigate". A series that never falls
// below 97 percent of the baseline is "No dip: check whether practice really changed".
// One attempt per series; the judgment is scored, "n of 3". Mastery is 3 of 3.
// After each submission the sim reveals the low point, depth, and recovery month on the chart.
// The data and the rule are illustrative, written for Chapter 16, not research findings.
// Nothing moves until the learner acts. "Start over" returns to the opening state.

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------
const BASELINE = 70;
const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const SERIES = [
  { name: 'Series A', color: 'royalblue', data: [70, 68, 64, 63, 65, 68, 71, 73, 75, 76, 77, 78, 78],
    answer: 'Normal dip',
    why: 'The low is in months 2 to 4, the depth is under 15 percent, and recovery comes before month 8.' },
  { name: 'Series B', color: 'darkorange', data: [70, 69, 63, 58, 55, 54, 56, 58, 60, 62, 63, 64, 65],
    answer: 'Deep or late: investigate',
    why: 'The low comes after month 4, the depth is over 15 percent, and it has not recovered by month 8.' },
  { name: 'Series C', color: 'seagreen', data: [70, 70, 70, 71, 70, 71, 70, 71, 70, 71, 70, 71, 71],
    answer: 'No dip: check whether practice really changed',
    why: 'It never falls below 97 percent of the baseline, which can mean the practice did not really change.' }
];
const JUDGMENTS = ['Normal dip', 'Deep or late: investigate', 'No dip: check whether practice really changed'];
const NONE = 'None below the baseline';

// ---------------------------------------------------------------------------
// The rule, computed from the data
// ---------------------------------------------------------------------------
function analyze(data) {
  let low = 0;
  for (let m = 1; m < data.length; m++) if (data[m] < data[low]) low = m; // first month if tied
  const min = data[low];
  const depth = (BASELINE - min) / BASELINE;
  let recovery = null;
  for (let m = low + 1; m < data.length; m++) if (data[m] >= BASELINE) { recovery = m; break; }
  let judgment;
  if (min >= 0.97 * BASELINE) judgment = JUDGMENTS[2];
  else if (low >= 2 && low <= 4 && depth <= 0.15 && recovery !== null && recovery <= 8) judgment = JUDGMENTS[0];
  else judgment = JUDGMENTS[1];
  const dips = min < BASELINE;
  return { low: low, min: min, depth: depth, recovery: recovery, judgment: judgment, lowAnswer: dips ? String(low) : NONE };
}

// ---------------------------------------------------------------------------
// State and page
// ---------------------------------------------------------------------------
let state = SERIES.map(() => ({ done: false, correct: false, monthOk: false }));
let charts = [];
let ui = [];
let feedbackEl, scoreEl, pickerSel;

function build() {
  const main = document.querySelector('main');
  main.innerHTML = '';
  main.insertAdjacentHTML('beforeend',
    '<h1>Is This a Normal Dip?</h1>' +
    '<p class="prompt">Is each pilot on a normal path?</p>' +
    '<div class="rule"><b>The rule.</b> A <b>normal dip</b> has its lowest point in months 2 to 4, is no deeper than ' +
    '15 percent of the baseline, and is back at or above the baseline by month 8. A dip that is deeper than 15 percent, ' +
    'bottoms after month 4, or has not recovered by month 8 is <b>deep or late: investigate</b>. A series that never ' +
    'falls below 97 percent of the baseline is <b>no dip: check whether practice really changed</b>. Baseline: 70 at month 0.' +
    '<div class="note">Illustrative data and rule, not research findings. Hover a point to read its value.</div></div>');

  // narrow screens show one series at a time
  const picker = document.createElement('div');
  picker.className = 'picker';
  picker.innerHTML = '<label>Show <select aria-label="Series to show">' +
    SERIES.map((s, i) => '<option value="' + i + '">' + s.name + '</option>').join('') + '</select></label>';
  main.appendChild(picker);
  pickerSel = picker.querySelector('select');
  pickerSel.addEventListener('change', showPicked);

  const panels = document.createElement('div');
  panels.className = 'panels';
  main.appendChild(panels);

  SERIES.forEach((s, i) => {
    const p = document.createElement('div');
    p.className = 'panel';
    p.innerHTML = '<h2 style="color:' + s.color + '">' + s.name + '</h2>' +
      '<div class="chart-box"><canvas aria-label="' + s.name + ' line chart of percent correct by month"></canvas></div>' +
      '<div class="row"><label for="m' + i + '">Lowest month</label><select id="m' + i + '"><option value="">Choose</option>' +
      MONTHS.map(m => '<option value="' + m + '">Month ' + m + '</option>').join('') +
      '<option value="' + NONE + '">' + NONE + '</option></select></div>' +
      '<div class="row"><label for="j' + i + '">Judgment</label><select id="j' + i + '"><option value="">Choose</option>' +
      JUDGMENTS.map(j => '<option value="' + j + '">' + j + '</option>').join('') + '</select></div>' +
      '<button type="button" disabled>Submit</button>' +
      '<div class="status" aria-live="polite"></div>';
    panels.appendChild(p);
    const month = p.querySelector('#m' + i);
    const judge = p.querySelector('#j' + i);
    const btn = p.querySelector('button');
    const ready = () => { btn.disabled = state[i].done || !month.value || !judge.value; };
    month.addEventListener('change', ready);
    judge.addEventListener('change', ready);
    btn.addEventListener('click', () => submit(i));
    ui.push({ panel: p, month: month, judge: judge, btn: btn, status: p.querySelector('.status') });
    charts.push(makeChart(p.querySelector('canvas'), s));
  });

  feedbackEl = document.createElement('div');
  feedbackEl.className = 'feedback';
  feedbackEl.setAttribute('aria-live', 'polite');
  main.appendChild(feedbackEl);

  const footer = document.createElement('div');
  footer.className = 'footer';
  footer.innerHTML = '<span></span><button type="button">Start over</button>';
  scoreEl = footer.querySelector('span');
  footer.querySelector('button').addEventListener('click', reset);
  main.appendChild(footer);

  reset();
}

function makeChart(canvas, s) {
  return new Chart(canvas, {
    type: 'line',
    data: {
      labels: MONTHS.map(String),
      datasets: [
        { label: s.name, data: s.data.slice(), borderColor: s.color, backgroundColor: s.color, borderWidth: 2,
          pointRadius: MONTHS.map(() => 3), pointBackgroundColor: MONTHS.map(() => s.color), tension: 0 },
        { label: 'Baseline (70)', data: MONTHS.map(() => BASELINE), borderColor: 'gray', borderDash: [5, 4],
          borderWidth: 1.5, pointRadius: 0, pointHitRadius: 0 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        legend: { display: false },
        tooltip: { filter: item => item.datasetIndex === 0,
                   callbacks: { title: items => 'Month ' + items[0].label, label: item => item.formattedValue + ' percent correct' } }
      },
      scales: {
        x: { title: { display: true, text: 'Month' }, ticks: { maxRotation: 0, autoSkip: true } },
        y: { min: 50, max: 80, ticks: { stepSize: 5 }, title: { display: true, text: 'Percent correct' } }
      }
    }
  });
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------
function submit(i) {
  if (state[i].done) return;
  const u = ui[i];
  const s = SERIES[i];
  const a = analyze(s.data);
  const pickedJudgment = u.judge.value;
  const pickedMonth = u.month.value;
  const correct = pickedJudgment === s.answer;
  const monthOk = pickedMonth === a.lowAnswer;
  state[i] = { done: true, correct: correct, monthOk: monthOk };
  u.month.disabled = true;
  u.judge.disabled = true;
  u.btn.disabled = true;

  // reveal the low point (red) and the recovery month (green) on the chart
  const ds = charts[i].data.datasets[0];
  if (a.min < BASELINE) { ds.pointRadius[a.low] = 7; ds.pointBackgroundColor[a.low] = 'firebrick'; }
  if (a.min < BASELINE && a.recovery !== null) { ds.pointRadius[a.recovery] = 7; ds.pointBackgroundColor[a.recovery] = 'seagreen'; }
  charts[i].update();

  const facts = (a.min < BASELINE ? 'Low: month ' + a.low + ', ' + a.min : 'Low: none below 70') +
    '. Depth: ' + (a.depth * 100).toFixed(1) + '%. Recovery: ' +
    (a.min >= BASELINE ? 'not applicable' : a.recovery === null ? 'not by month 12' : 'month ' + a.recovery) + '.';
  u.status.className = 'status ' + (correct ? 'good' : 'bad');
  u.status.textContent = (correct ? 'Correct. ' : 'Not quite. ') + facts;

  const monthText = monthOk ? 'Your low-point month is right.' : 'The low point is ' + (a.min < BASELINE ? 'month ' + a.low : 'none: it never falls below 70') + '.';
  feedbackEl.className = 'feedback ' + (correct ? 'good' : 'bad');
  feedbackEl.innerHTML = '<b>' + s.name + '. ' + (correct ? 'Correct: ' + s.answer + '.' :
    'Not quite. Check the depth, the month of the low point, and the recovery month against the rule.') + '</b> ' +
    s.why + (correct ? '' : ' The correct judgment is <b>' + s.answer + '</b>.') + ' ' + monthText;
  updateScore();
}

function updateScore() {
  const done = state.filter(x => x.done).length;
  const score = state.filter(x => x.correct).length;
  let text = 'Score: ' + score + ' of 3';
  if (done === 3) text += score === 3 ? '. You can tell a normal dip from a warning sign.' : '. Review the rule and try again.';
  scoreEl.textContent = text;
}

function reset() {
  state = SERIES.map(() => ({ done: false, correct: false, monthOk: false }));
  SERIES.forEach((s, i) => {
    const u = ui[i];
    u.month.value = '';
    u.judge.value = '';
    u.month.disabled = false;
    u.judge.disabled = false;
    u.btn.disabled = true;
    u.status.className = 'status';
    u.status.textContent = '';
    const ds = charts[i].data.datasets[0];
    ds.pointRadius = MONTHS.map(() => 3);
    ds.pointBackgroundColor = MONTHS.map(() => s.color);
    charts[i].update();
  });
  feedbackEl.className = 'feedback';
  feedbackEl.textContent = 'For each series, choose the month of the lowest point and a judgment, then press Submit. ' +
    'You get one attempt per series; the judgment is scored.';
  updateScore();
  showPicked();
}

function showPicked() {
  const k = parseInt(pickerSel.value, 10) || 0;
  ui.forEach((u, i) => u.panel.classList.toggle('hidden', i !== k));
}

build();
