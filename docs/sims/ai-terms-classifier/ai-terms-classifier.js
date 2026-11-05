// AI Terms Classifier MicroSim (HTML + JavaScript)
// CANVAS_HEIGHT: 470
// Six categories shown as nested regions (Not AI outside, AI agent innermost). The learner
// places each of eight example systems in the narrowest category that fits and presses Submit.
// Two attempts per example; only the first attempt counts. Mastery is 7 of 8.
// The examples are shuffled once per session. Selecting a region shows its definition (exploration).
// Nothing moves until the learner acts. To change the content, edit the two arrays below.

const CATEGORIES = [
  { name: 'Not AI', def: 'Software that follows a fixed rule and does nothing that requires intelligence.' },
  { name: 'AI without machine learning', def: 'A system that performs an intelligent task using rules or search written by programmers.' },
  { name: 'Machine learning', def: 'A system that learns patterns from examples in order to label or predict.' },
  { name: 'Generative AI', def: 'A machine-learning system that creates new content, such as images or audio.' },
  { name: 'Large language model', def: 'A generative AI system trained on text to produce language.' },
  { name: 'AI agent', def: 'A system built on a language model that takes multi-step actions with tools toward a goal.' }
];

// answer is the index into CATEGORIES
const EXAMPLES = [
  { text: 'A thermostat that switches the heat on whenever the room is below 68°F.', answer: 0, short: 'Thermostat',
    why: 'It follows one fixed rule and does not do anything that requires intelligence.' },
  { text: 'A 1990s chess program that scores positions using rules its programmers wrote.', answer: 1, short: '1990s chess program',
    why: 'It plays chess, an intelligent task, but nothing was learned from data.' },
  { text: 'An email filter trained on millions of messages labeled spam or not spam.', answer: 2, short: 'Spam filter',
    why: 'It learned from labeled examples and only labels; it creates nothing new.' },
  { text: 'A model that estimates which students may fail a course using past grades and attendance.', answer: 2, short: 'Course-failure predictor',
    why: 'It learned a pattern from past data to predict; it does not create content.' },
  { text: 'A tool that draws a new picture from a sentence describing it.', answer: 3, short: 'Picture generator',
    why: 'It creates new content, but images are not language.' },
  { text: 'A tool that turns a typed sentence into new spoken audio in a chosen voice.', answer: 3, short: 'Text-to-speech voice tool',
    why: 'It creates new audio, and it is not a language model.' },
  { text: 'A chatbot that answers a teacher\'s question in several paragraphs and cannot take any other action.', answer: 4, short: 'Chatbot that only answers',
    why: 'It generates language and stops after answering.' },
  { text: 'A system told "build a quiz website" that writes code, runs it, reads the error messages, and fixes them over many steps.', answer: 5, short: 'Quiz-website builder',
    why: 'It plans and takes many actions with tools to reach a goal.' }
];

const PASS_MARK = 7;
let order = [], pos = 0, pick = -1, attempt = 0, resolved = false, finished = false, firstTry = [];
const regions = [];
const $ = id => document.getElementById(id);

// Build the nested regions, outermost first
function buildNest() {
  let parent = $('nest');
  CATEGORIES.forEach((c, i) => {
    const div = document.createElement('div');
    div.className = 'region r' + i;
    div.tabIndex = 0;
    div.setAttribute('role', 'button');
    div.setAttribute('aria-label', c.name);
    const label = document.createElement('div');
    label.className = 'rlabel';
    label.textContent = c.name;
    div.appendChild(label);
    div.addEventListener('click', e => { e.stopPropagation(); choose(i); });
    div.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); choose(i); } });
    parent.appendChild(div);
    regions.push(div);
    parent = div;
  });
}

function shuffle(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function start() {
  order = shuffle(EXAMPLES.map((_, i) => i));
  pos = 0;
  firstTry = new Array(EXAMPLES.length).fill(null);
  finished = false;
  loadItem();
}

function loadItem() {
  pick = -1; attempt = 0; resolved = false;
  setFeedback('', '', '');
  render();
}

function choose(i) {
  // Selecting a region always shows its definition; it only changes the answer while unanswered
  $('pickedName').textContent = CATEGORIES[i].name;
  $('pickedDef').textContent = CATEGORIES[i].def;
  if (finished || resolved) return;
  pick = i;
  render();
}

function submit() {
  if (pick < 0 || resolved || finished) return;
  const it = EXAMPLES[order[pos]];
  const ok = pick === it.answer;
  attempt++;
  if (attempt === 1) firstTry[order[pos]] = ok;
  if (ok) {
    resolved = true;
    setFeedback('ok', 'Correct: ' + CATEGORIES[it.answer].name + '.', it.why + (attempt > 1 ? ' (A second try does not change your first-try score.)' : ''));
  } else if (attempt === 1) {
    setFeedback('retry', 'Not quite.', it.why + ' Choose again and press Submit.');
  } else {
    resolved = true;
    setFeedback('miss', 'The answer is ' + CATEGORIES[it.answer].name + '.', it.why + ' This one counts as missed.');
  }
  render();
}

function next() {
  if (!resolved) return;
  if (pos < order.length - 1) { pos++; loadItem(); return; }
  finished = true;
  render();
}

function score() { return firstTry.filter(v => v === true).length; }

function setFeedback(kind, lead, body) {
  const fb = $('feedback');
  fb.className = kind || 'empty';
  fb.innerHTML = lead ? '<b>' + lead + '</b> ' + body : 'Click a region, then press Submit. Every large language model is generative AI, and every generative system is machine learning.';
}

function render() {
  const it = EXAMPLES[order[pos]];
  $('score').textContent = 'First-try correct: ' + score() + ' of ' + EXAMPLES.length;
  regions.forEach((r, i) => {
    r.classList.toggle('selected', !resolved && !finished && i === pick);
    r.classList.toggle('correct', resolved && !finished && i === it.answer);
    r.classList.toggle('wrong', resolved && !finished && i === pick && pick !== it.answer);
  });
  $('submit').disabled = pick < 0 || resolved || finished;
  $('submit').classList.toggle('go', !$('submit').disabled);
  $('next').disabled = !resolved || finished;
  $('next').classList.toggle('go', resolved && !finished);
  $('next').textContent = pos === order.length - 1 ? 'See score' : 'Next';
  $('submit').hidden = finished;
  $('next').hidden = finished;
  $('again').hidden = !finished;
  $('picked').hidden = finished;
  if (!finished) {
    $('count').textContent = 'Example ' + (pos + 1) + ' of ' + order.length;
    $('prompt').textContent = 'Which is the narrowest category that fits this system?';
    $('card').textContent = it.text;
    if (pick < 0 && !resolved) { $('pickedName').textContent = 'none'; $('pickedDef').textContent = 'Click a region to select it and read its definition.'; }
    return;
  }
  // Results
  const s = score();
  const pass = s >= PASS_MARK;
  $('count').textContent = 'Finished';
  $('prompt').textContent = pass ? 'You can place AI systems on the ladder.' : 'Review the definitions and try again; the examples will be reshuffled.';
  $('card').innerHTML = '<b>First-try correct: ' + s + ' of ' + EXAMPLES.length + '</b><br>' +
    'Notice: the spam filter and the course-failure predictor both land in Machine learning, and the chatbot and the quiz builder differ only in whether they take actions.';
  const missed = order.filter(i => firstTry[i] !== true);
  const fb = $('feedback');
  fb.className = pass ? 'ok' : 'retry';
  fb.innerHTML = missed.length
    ? '<b>Missed on the first try:</b><ul>' + missed.map(i => '<li>' + EXAMPLES[i].short + ': ' + CATEGORIES[EXAMPLES[i].answer].name + '</li>').join('') + '</ul>'
    : '<b>You placed all eight on the first try.</b>';
}

buildNest();
$('submit').addEventListener('click', submit);
$('next').addEventListener('click', next);
$('again').addEventListener('click', start);
start();
