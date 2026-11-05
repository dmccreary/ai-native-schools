// Schooling and EdTech Timeline - vis-timeline
// CANVAS_HEIGHT: 640
// Twenty events from 1848 to 2022 in three groups (Structure, Policy, Technology), shaded by
// five eras (1840-1909, 1910-1959, 1960-1989, 1990-2009, 2010 to present). Explore: click an event
// to read its description, filter the groups, and zoom or pan with the buttons (the mouse wheel
// does not zoom). Quiz: eight events, shuffled, shown without dates; the learner assigns each to
// an era. One attempt each; mastery is 7 of 8. The timeline is hidden during the quiz so the dates
// cannot be read off it. Edit EVENTS, ERAS, and QUIZ to change the content.

const ERAS = [
  { n: 1, start: 1840, end: 1909 },
  { n: 2, start: 1910, end: 1959 },
  { n: 3, start: 1960, end: 1989 },
  { n: 4, start: 1990, end: 2009 },
  { n: 5, start: 2010, end: null } // present
];
const EVENTS = [
  // [year, group, title, short label, description]
  [1848, 'Structure', 'Quincy Grammar School opens', 'Quincy Grammar', 'Usually cited as the first age-graded school in the United States.'],
  [1906, 'Structure', 'Carnegie unit defined', 'Carnegie unit', '120 hours of class time in one subject becomes the standard high school credit.'],
  [1913, 'Technology', 'Edison predicts film will replace textbooks', 'Edison: film', 'Thomas Edison is reported to have predicted that motion pictures would make textbooks obsolete in schools.'],
  [1924, 'Technology', "Pressey's testing machine", 'Pressey machine', 'A machine that gave multiple-choice questions and advanced only on correct answers.'],
  [1954, 'Policy', 'Brown v. Board of Education', 'Brown v. Board', 'The Supreme Court rules racial segregation in public schools unconstitutional.'],
  [1954, 'Technology', "Skinner's teaching machine", 'Skinner machine', 'B. F. Skinner proposes machines that give immediate feedback in small steps.'],
  [1956, 'Technology', 'Hagerstown closed-circuit television', 'Hagerstown TV', 'Washington County, Maryland, tests televised lessons across many classrooms.'],
  [1960, 'Technology', 'PLATO launched', 'PLATO', 'The University of Illinois begins a computer-based instruction system.'],
  [1965, 'Policy', 'Elementary and Secondary Education Act', 'ESEA', 'Title I funding for schools serving low-income students begins.'],
  [1975, 'Policy', 'Education for All Handicapped Children Act', 'EHA (later IDEA)', 'Students with disabilities are guaranteed a free, appropriate public education; later renamed IDEA.'],
  [1977, 'Technology', 'Apple II reaches schools', 'Apple II', 'Microcomputers begin to appear in classrooms.'],
  [1991, 'Policy', 'First charter school law', 'Charter law', 'Minnesota passes the first law allowing charter schools.'],
  [1996, 'Technology', 'E-rate program', 'E-rate', 'The Telecommunications Act creates a subsidy for school internet access.'],
  [1997, 'Structure', 'Florida Virtual School begins', 'Florida Virtual', 'One of the first state-run virtual schools.'],
  [2002, 'Policy', 'No Child Left Behind', 'NCLB', 'Annual testing and accountability for results become federal law.'],
  [2008, 'Technology', 'Khan Academy becomes a nonprofit', 'Khan Academy', 'Free online video lessons and practice reach a mass audience.'],
  [2013, 'Technology', 'Los Angeles iPad rollout', 'LA iPads', 'A large district launches a one-to-one device program that soon runs into problems.'],
  [2015, 'Policy', 'Every Student Succeeds Act', 'ESSA', 'Much accountability authority returns to the states.'],
  [2020, 'Structure', 'Emergency remote learning', 'Remote learning', 'School closures in March move nearly all schools online.'],
  [2022, 'Technology', 'ChatGPT released', 'ChatGPT', 'A general-purpose AI chatbot reaches the public on November 30.']
];
const QUIZ = [
  { title: 'Carnegie unit defined', era: 1, why: 'It was defined in 1906.' },
  { title: "Pressey's testing machine", era: 2, why: 'It was built in 1924.' },
  { title: 'Hagerstown closed-circuit television', era: 2, why: 'The experiment began in 1956.' },
  { title: 'Elementary and Secondary Education Act', era: 3, why: 'It was enacted in 1965.' },
  { title: 'Education for All Handicapped Children Act', era: 3, why: 'It was enacted in 1975.' },
  { title: 'Florida Virtual School begins', era: 4, why: 'It began in 1997.' },
  { title: 'No Child Left Behind', era: 4, why: 'It became law in 2002.' },
  { title: 'Los Angeles iPad rollout', era: 5, why: 'It was launched in 2013.' }
];
const PASS_MARK = 7;
const GROUPS = ['Structure', 'Policy', 'Technology'];
const eraLabel = e => 'Era ' + e.n + ': ' + e.start + '–' + (e.end ? e.end : 'present');

const $ = id => document.getElementById(id);

// ---- timeline ----
const groups = new vis.DataSet(GROUPS.map(g => ({ id: g, content: g })));
const items = new vis.DataSet();
EVENTS.forEach((e, i) => {
  const date = e[0] === 2022 ? new Date(2022, 10, 30) : new Date(e[0], 6, 1);
  items.add({ id: i, group: e[1], start: date, content: e[3], type: 'point', className: e[1].toLowerCase(), title: e[2] + ' (' + e[0] + ')' });
});
ERAS.forEach((e, i) => items.add({ id: 'era' + e.n, start: new Date(e.start, 0, 1), end: new Date(e.end ? e.end + 1 : 2027, 0, 1),
  type: 'background', content: 'Era ' + e.n, className: 'era' + (i % 2 ? ' alt' : '') }));

const START = new Date(1836, 0, 1), END = new Date(2058, 0, 1);
const timeline = new vis.Timeline($('timeline'), items, groups, {
  start: START, end: END, min: new Date(1830, 0, 1), max: new Date(2065, 0, 1),
  zoomable: false, moveable: true, horizontalScroll: false, verticalScroll: false,
  stack: true, selectable: true, showCurrentTime: false, orientation: 'top',
  margin: { item: { horizontal: 4, vertical: 6 } },
  zoomMin: 1000 * 60 * 60 * 24 * 365 * 8
});

function showEvent(i) {
  const e = EVENTS[i];
  const era = ERAS.find(x => e[0] >= x.start && (!x.end || e[0] <= x.end));
  $('info').innerHTML = '<b>' + e[2] + '</b> (' + e[0] + ', ' + e[1] + ')<br/>' + e[4] + '<br/><span style="color:dimgray;font-size:14px">' + eraLabel(era) + '</span>';
}
function exploreInfo() {
  $('info').innerHTML = 'Click any event to read about it. Use the checkboxes to show or hide a group, and the buttons to zoom and pan. ' +
    'The shaded bands are the five eras: ' + ERAS.map(eraLabel).join('; ') + '.';
}
timeline.on('select', p => { if (p.items.length && typeof p.items[0] === 'number') showEvent(p.items[0]); });

function applyFilter() {
  const vis = GROUPS.filter(g => $('g' + g).checked);
  groups.update(GROUPS.map(g => ({ id: g, visible: vis.includes(g) })));
}
GROUPS.forEach(g => $('g' + g).addEventListener('change', applyFilter));

function zoom(f) {
  const w = timeline.getWindow();
  const mid = (w.start.valueOf() + w.end.valueOf()) / 2;
  const half = (w.end - w.start) / 2 * f;
  timeline.setWindow(new Date(mid - half), new Date(mid + half), { animation: false });
}
function pan(f) {
  const w = timeline.getWindow();
  const d = (w.end - w.start) * f;
  timeline.setWindow(new Date(w.start.valueOf() + d), new Date(w.end.valueOf() + d), { animation: false });
}
$('zoomIn').onclick = () => zoom(0.6);
$('zoomOut').onclick = () => zoom(1 / 0.6);
$('panLeft').onclick = () => pan(-0.3);
$('panRight').onclick = () => pan(0.3);
$('fit').onclick = () => timeline.setWindow(START, END, { animation: false });

// ---- quiz ----
let order = [], pos = 0, answers = [], answered = false;
const eraBox = $('eraBtns');
ERAS.forEach(e => {
  const b = document.createElement('button');
  b.innerHTML = 'Era ' + e.n + '<br/><span style="font-size:12px">' + e.start + '–' + (e.end ? e.end : 'now') + '</span>';
  b.setAttribute('aria-label', eraLabel(e));
  b.dataset.n = e.n;
  b.addEventListener('click', () => choose(e.n));
  eraBox.appendChild(b);
});

function setMode(quiz) {
  $('timelineWrap').style.display = quiz ? 'none' : '';
  $('toolbar').style.display = quiz ? 'none' : 'flex';
  $('info').style.display = quiz ? 'none' : '';
  $('quiz').style.display = quiz ? 'flex' : 'none';
  $('startBtn').style.display = quiz ? 'none' : '';
}

function startQuiz() {
  order = QUIZ.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  pos = 0; answers = [];
  setMode(true);
  $('exploreBtn').style.display = 'none';
  $('prompt').textContent = 'Place each event in its era. The timeline is hidden until you finish.';
  showQuestion();
}

function score() { return answers.filter(a => a.ok).length; }

function showQuestion() {
  answered = false;
  const q = QUIZ[order[pos]];
  $('qStatus').textContent = 'Event ' + (pos + 1) + ' of ' + QUIZ.length + ' · Correct: ' + score() + ' of ' + QUIZ.length;
  $('event').textContent = q.title;
  $('qAsk').style.display = '';
  $('qFeedback').innerHTML = 'Choose an era. You have one attempt.';
  $('qFeedback').className = 'panel';
  [...eraBox.children].forEach(b => { b.disabled = false; b.className = ''; b.style.display = ''; });
  $('eraBtns').style.display = 'grid';
  $('nextBtn').style.display = 'none';
}

function choose(n) {
  if (answered) return;
  answered = true;
  const q = QUIZ[order[pos]];
  const ok = n === q.era;
  answers.push({ q: q, pick: n, ok: ok });
  [...eraBox.children].forEach(b => {
    b.disabled = true;
    if (Number(b.dataset.n) === q.era) b.className = 'right';
    else if (Number(b.dataset.n) === n) b.className = 'wrong';
  });
  $('qFeedback').innerHTML = ok ? '<span class="good"><span class="lead">Correct: era ' + q.era + '.</span> ' + q.why + '</span>'
                                : '<span class="bad"><span class="lead">Not quite.</span> ' + q.why + ' That is era ' + q.era + '.</span>';
  $('qStatus').textContent = 'Event ' + (pos + 1) + ' of ' + QUIZ.length + ' · Correct: ' + score() + ' of ' + QUIZ.length;
  $('nextBtn').textContent = pos === QUIZ.length - 1 ? 'See results' : 'Next event';
  $('nextBtn').style.display = '';
  $('nextBtn').focus();
}

function next() {
  if (pos < QUIZ.length - 1) { pos++; showQuestion(); return; }
  // results
  const s = score();
  const missed = answers.filter(a => !a.ok).map(a => a.q.title + ': era ' + a.q.era + ' (' + a.q.why.replace(/^It (was|became|began)[a-z ]* in /, '').replace(/^The experiment began in /, '').replace('.', '') + '), you chose era ' + a.pick);
  $('qStatus').textContent = 'Results';
  $('event').textContent = s + ' of ' + QUIZ.length + ' correct';
  $('qAsk').style.display = 'none';
  $('eraBtns').style.display = 'none';
  $('qFeedback').className = 'panel';
  $('qFeedback').innerHTML = (s >= PASS_MARK ? '<span class="good lead">You can place the major moments in schooling history.</span>'
                                             : '<span class="lead">Explore the timeline again and retry; the events will be reshuffled.</span>') +
    (missed.length ? '<br/><b>Misplaced:</b><br/>' + missed.join('<br/>') : '') +
    '<br/>Notice that the technology events cluster in the last three eras, while the structures they run into were set in the first.';
  $('nextBtn').style.display = 'none';
  $('startBtn').style.display = '';
  $('startBtn').textContent = 'Retry the quiz';
  $('exploreBtn').style.display = '';
}

$('startBtn').onclick = startQuiz;
$('nextBtn').onclick = next;
$('exploreBtn').onclick = () => {
  setMode(false);
  $('exploreBtn').style.display = 'none';
  $('startBtn').textContent = 'Start the era quiz';
  $('prompt').textContent = 'How long have schools been promised a technology revolution?';
  exploreInfo();
  timeline.redraw();
};

exploreInfo();
