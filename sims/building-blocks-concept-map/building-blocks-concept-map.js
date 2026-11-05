// Building Blocks Concept Map - vis-network
// CANVAS_HEIGHT: 720
// The 21 Chapter 1 concepts and their 20 dependencies, from the book's learning graph.
// Each arrow points from a concept to a prerequisite it depends on. Foundational concepts
// (no prerequisites) are gold. Explore mode: click a node to read its definition.
// Quiz mode: six questions in a fixed order. For each, select every direct prerequisite of the
// highlighted concept and press Submit. Two attempts per question; only the first attempt counts
// toward the score. Mastery is 5 of 6. Mouse-wheel zoom is off; use the zoom buttons.
// To change the content, edit the NODES, EDGES, and QUESTIONS arrays below.

const NODES = [
  // [id, label, definition, x, y]
  ['education', 'Education', 'The organized, intentional effort to help people acquire knowledge, skills, values, and ways of thinking.', -250, 190],
  ['learning', 'Learning', 'A relatively lasting change in knowledge, skills, or understanding that results from experience.', 125, 190],
  ['student', 'Student', 'A person enrolled in a course of study at an educational institution.', 375, 190],
  ['teacher', 'Teacher', 'A professional whose job is to help students learn through planning, explaining, assessing, and feedback.', -125, 190],
  ['school', 'School', 'An institution a society sets up to provide education to a defined group of learners on a regular schedule.', -250, 60],
  ['curriculum', 'Curriculum', 'The planned body of knowledge, skills, and experiences a school intends students to learn, and its sequence.', -375, 60],
  ['edtech', 'Educational Technology', 'Tools, devices, software, and media used to support teaching and learning, with the practices for using them well.', -125, 60],
  ['classroom', 'Classroom', 'The room, and the group of students and teacher within it, where scheduled instruction happens.', -125, -70],
  ['schoolday', 'School Day', 'The daily schedule of periods, transitions, meals, and breaks during which students attend school.', -375, -70],
  ['funding', 'Public School Funding', 'The system of revenues, mainly local, state, and federal taxes, that pays for public schools.', -250, -70],
  ['perpupil', 'Per-Pupil Spending', 'Total annual spending on public schools divided by the number of students enrolled.', -250, -200],
  ['outcome', 'Learning Outcome', 'A specific, observable statement of what a learner will be able to do after instruction.', 125, 60],
  ['gap', 'Learning Gap', 'The difference between what a student is expected to know and what the student actually knows.', 250, -200],
  ['bloom', "Bloom's Taxonomy", 'A framework that classifies learning outcomes into six levels of cognitive work.', 125, -70],
  ['hot', 'Higher-Order Thinking', 'The cognitive work of the top three Bloom levels: analyzing, evaluating, and creating.', 125, -200],
  ['formative', 'Formative Assessment', 'Gathering evidence of learning during instruction and using it to adjust teaching and learning.', 250, -70],
  ['direct', 'Direct Instruction', 'A teacher-led method of explaining, modeling, guided practice, and independent practice.', 0, -70],
  ['spaced', 'Spaced Practice', 'Spreading practice sessions over time instead of concentrating them in one session.', 0, 60],
  ['retrieval', 'Retrieval Practice', 'Learning by actively recalling information from memory rather than rereading it.', 250, 190],
  ['agency', 'Student Agency', 'The capacity and opportunity for students to make meaningful choices about their own learning.', 375, 60],
  ['selfpaced', 'Self-Paced Learning', 'An arrangement in which each student advances through material at their own speed.', 375, -70]
];

// [from (depends), to (prerequisite)]
const EDGES = [
  ['curriculum', 'education'], ['school', 'education'], ['edtech', 'education'],
  ['agency', 'student'], ['agency', 'learning'], ['selfpaced', 'agency'],
  ['outcome', 'learning'], ['schoolday', 'school'], ['funding', 'school'],
  ['perpupil', 'funding'], ['gap', 'outcome'], ['classroom', 'school'],
  ['direct', 'teacher'], ['direct', 'learning'], ['direct', 'classroom'],
  ['spaced', 'learning'], ['retrieval', 'learning'], ['bloom', 'outcome'],
  ['hot', 'bloom'], ['formative', 'outcome']
];

const QUESTIONS = [
  { target: 'perpupil', answer: ['funding'], why: 'You need to know where school money comes from before you can divide it per student.' },
  { target: 'hot', answer: ['bloom'], why: 'Higher-order thinking is defined as the top three levels of the taxonomy.' },
  { target: 'selfpaced', answer: ['agency'], why: 'Letting a student control their pace is one form of giving them agency.' },
  { target: 'gap', answer: ['outcome'], why: 'A gap is measured against an expected outcome.' },
  { target: 'direct', answer: ['teacher', 'learning', 'classroom'], why: 'Direct instruction is a teacher leading a classroom toward learning; it needs all three.' },
  { target: 'formative', answer: ['outcome'], why: 'Formative assessment checks progress toward a specific outcome.' }
];
const PASS_MARK = 5;
const OPENING = 'Every concept in this chapter rests on others. Which ones?';

const C = {
  base: { background: '#e3eefc', border: '#4a78b5' },
  found: { background: '#fff3c4', border: '#b8901a' },
  target: { background: '#efe3fb', border: '#7b2fbf' },
  selected: { background: '#ffd8a8', border: '#e67700' },
  right: { background: '#c8f0d2', border: '#1f7a3f' },
  wrong: { background: '#f9d0d0', border: '#b22222' }
};

const label = id => NODES.find(n => n[0] === id)[1];
const prereqsOf = id => EDGES.filter(e => e[0] === id).map(e => e[1]);
const isFoundation = id => prereqsOf(id).length === 0;

const nodes = new vis.DataSet(NODES.map(n => ({
  id: n[0], label: n[1], x: n[3], y: n[4], shape: 'box', margin: 8,
  widthConstraint: { maximum: 100 }, font: { size: 16, face: 'Arial', color: 'black' },
  borderWidth: isFoundation(n[0]) ? 3 : 2
})));
const edges = new vis.DataSet(EDGES.map((e, i) => ({ id: 'e' + i, from: e[0], to: e[1], arrows: 'to', color: { color: '#8a8a8a' }, width: 1.5 })));

const network = new vis.Network(document.getElementById('network'), { nodes: nodes, edges: edges }, {
  physics: { enabled: false },
  layout: { improvedLayout: false },
  edges: { smooth: false, arrows: { to: { scaleFactor: 0.8 } } },
  interaction: { zoomView: false, dragView: true, dragNodes: false, selectable: false, hover: true }
});

// ---- state ----
let mode = 'explore'; // 'explore' | 'question' | 'feedback' | 'results'
let qi = 0, tries = 0, results = [], selection = new Set(), focusId = null, lastWrong = [];
const $ = id => document.getElementById(id);

function restyle() {
  const q = QUESTIONS[qi];
  const reveal = mode === 'feedback';
  nodes.update(NODES.map(n => {
    const id = n[0];
    let col = isFoundation(id) ? C.found : C.base;
    let bw = isFoundation(id) ? 3 : 2;
    if (mode === 'question' || mode === 'feedback') {
      if (id === q.target) { col = C.target; bw = 4; }
      else if (reveal && q.answer.includes(id)) { col = C.right; bw = 4; }
      else if (reveal && selection.has(id)) { col = C.wrong; bw = 4; }
      else if (selection.has(id)) { col = C.selected; bw = 4; }
    } else if (mode === 'explore' && id === focusId) {
      bw = 4; col = { background: col.background, border: 'navy' };
    }
    return { id: id, color: { background: col.background, border: col.border, highlight: col, hover: col }, borderWidth: bw };
  }));
  edges.update(EDGES.map((e, i) => {
    const hot = reveal && e[0] === q.target;
    return { id: 'e' + i, color: { color: hot ? '#1f7a3f' : '#8a8a8a' }, width: hot ? 4 : 1.5 };
  }));
}

function info(html, kind) {
  const el = $('info');
  el.className = 'card' + (kind ? ' ' + kind : '');
  el.innerHTML = html;
}

function firstTryScore() { return results.filter(r => r).length; }

function render() {
  const inQuiz = mode === 'question' || mode === 'feedback';
  $('startBtn').parentElement.style.display = (mode === 'explore' || mode === 'results') ? 'flex' : 'none';
  $('startBtn').textContent = mode === 'results' ? 'Try the quiz again' : 'Start quiz';
  $('submitBtn').parentElement.style.display = mode === 'question' ? 'flex' : 'none';
  $('nextBtn').parentElement.style.display = mode === 'feedback' || mode === 'results' ? 'flex' : 'none';
  $('nextBtn').textContent = mode === 'results' ? 'Back to exploring' : (qi === QUESTIONS.length - 1 ? 'See results' : 'Next question');
  $('nextBtn').className = mode === 'results' ? '' : 'primary';
  $('submitBtn').disabled = selection.size === 0;
  $('clearBtn').disabled = selection.size === 0;
  if (mode === 'explore') {
    $('status').textContent = 'Explore the map';
    $('prompt').textContent = OPENING;
  } else if (inQuiz) {
    $('status').textContent = 'Question ' + (qi + 1) + ' of ' + QUESTIONS.length + ' · First-try correct: ' + firstTryScore();
    $('prompt').innerHTML = 'Select every direct prerequisite of <b>' + label(QUESTIONS[qi].target) + '</b>.' +
      '<br/><span style="font-size:14px">Selected: ' + (selection.size ? [...selection].map(label).join(', ') : 'none yet') + '</span>';
  }
  restyle();
}

function explore() {
  mode = 'explore'; focusId = null; selection.clear();
  info('Click any concept to read its definition. Gold concepts have no prerequisites. When you are ready, press <b>Start quiz</b>.');
  render();
}

function startQuiz() {
  mode = 'question'; qi = 0; tries = 0; results = []; selection.clear();
  askInfo();
  render();
}

function askInfo() {
  info('Click concepts on the map to select them (click again to unselect). Follow the arrows that leave <b>' +
       label(QUESTIONS[qi].target) + '</b>. Then press <b>Submit</b>.');
}


function submit() {
  const q = QUESTIONS[qi];
  tries++;
  const missing = q.answer.filter(a => !selection.has(a));
  const extra = [...selection].filter(s => !q.answer.includes(s));
  const name = label(q.target);
  if (missing.length === 0 && extra.length === 0) {
    results[qi] = tries === 1;
    mode = 'feedback';
    info('<span class="lead">Correct.</span> ' + q.why, 'good');
  } else if (tries < 2) {
    let msg = '<span class="lead">Not quite.</span> ';
    if (missing.length) msg += "You're missing at least one prerequisite. Follow every arrow leaving " + name + '. ';
    if (extra.length) msg += 'At least one selected concept is not a direct prerequisite. Only count arrows that leave ' + name + ' directly.';
    info(msg + ' Change your selection and submit once more.', 'hint');
  } else {
    results[qi] = false;
    mode = 'feedback';
    info('<span class="lead">Not quite. The direct prerequisites of ' + name + ' are: ' + q.answer.map(label).join(', ') +
         '.</span> They are shown in green. ' + q.why, 'bad');
  }
  render();
}

function next() {
  if (mode === 'results') { explore(); return; }
  if (qi < QUESTIONS.length - 1) {
    qi++; tries = 0; selection.clear(); mode = 'question';
    askInfo();
  } else {
    mode = 'results'; selection.clear();
    const score = firstTryScore();
    const missed = QUESTIONS.map((q, i) => results[i] ? null : label(q.target) + ' → ' + q.answer.map(label).join(', ')).filter(Boolean);
    $('status').textContent = 'Results';
    $('prompt').innerHTML = '<b>Score: ' + score + ' of ' + QUESTIONS.length + '</b> (first try)';
    info((score >= PASS_MARK ? '<span class="lead">You can read a prerequisite map.</span> ' : '<span class="lead">Mastery is ' + PASS_MARK + ' of 6.</span> Review the arrows and try again. ') +
         (missed.length ? '<br/><br/><b>Missed:</b><br/>' + missed.join('<br/>') : '<br/><br/>Every question was right on the first try.') +
         '<br/><br/>Notice that Higher-Order Thinking has only one direct prerequisite, and four concepts have none.', score >= PASS_MARK ? 'good' : '');
  }
  render();
}

network.on('click', params => {
  const id = network.getNodeAt(params.pointer.DOM);
  if (!id) return;
  if (mode === 'explore' || mode === 'results') {
    if (mode === 'results') mode = 'explore';
    focusId = id;
    const p = prereqsOf(id);
    info('<b>' + label(id) + '</b><br/>' + NODES.find(n => n[0] === id)[2] +
         (p.length === 0 ? '<br/><br/><i>A foundational concept: it has no prerequisites in this chapter.</i>' : ''));
    render();
  } else if (mode === 'question') {
    if (id === QUESTIONS[qi].target) { info('That is the concept itself. Select the concepts its arrows point to.', 'hint'); return; }
    if (selection.has(id)) selection.delete(id); else selection.add(id);
    askInfo();
    render();
  }
});

$('startBtn').onclick = startQuiz;
$('submitBtn').onclick = submit;
$('clearBtn').onclick = () => { selection.clear(); askInfo(); render(); };
$('nextBtn').onclick = next;
$('zoomInBtn').onclick = () => network.moveTo({ scale: network.getScale() * 1.25 });
$('zoomOutBtn').onclick = () => network.moveTo({ scale: network.getScale() / 1.25 });
$('fitBtn').onclick = () => network.fit({ animation: false });
window.addEventListener('resize', () => network.fit({ animation: false }));
network.once('afterDrawing', () => network.fit({ animation: false }));

explore();
