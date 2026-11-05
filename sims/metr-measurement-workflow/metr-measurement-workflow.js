// METR Measurement Workflow MicroSim (Mermaid + JavaScript)
// CANVAS_HEIGHT: 560
// Six steps turn AI task results into a 50 percent time horizon. Clicking a step shows what it
// does (exploration). Then five multiple-choice questions, in a fixed order, one attempt each;
// mastery is 4 of 5. Figures are as described in a 2025 preprint (METR, Measuring AI Ability
// to Complete Long Tasks). Nothing moves until the learner acts. Edit STEPS and QUESTIONS to change content.

const STEPS = {
  S1: { title: 'Step 1: Assemble a benchmark task suite', text: 'Gather roughly 170 tasks, from seconds to hours long, each with a clear way to check whether it was done correctly.' },
  S2: { title: 'Step 2: Time skilled humans', text: 'Skilled professionals do each task while a clock runs, giving its human working time.' },
  S3: { title: 'Step 3: Run the AI model', text: 'The AI attempts every task several times.' },
  S4: { title: 'Step 4: Record the task success rate', text: 'For each task, record the fraction of attempts that succeeded.' },
  S5: { title: 'Step 5: Fit a success curve', text: 'Fit a curve showing how the chance of success falls as human working time grows, on a logarithmic scale.' },
  S6: { title: 'Step 6: Read off the horizon', text: 'The task length at which the curve crosses 50 percent is the 50 percent time horizon.' }
};

// answer is the option index (0 = A)
const QUESTIONS = [
  { q: 'In the task-horizon measure, what is the unit that says how long a task is?',
    options: ['The seconds the AI takes to run', 'The human working time the task needs', 'The number of lines of code written', 'The number of tokens the AI produces'],
    answer: 1, why: 'Human working time measures how hard the task is for people, whoever does it.' },
  { q: 'A model has a 50 percent time horizon of 2 hours. What does that mean?',
    options: ['It succeeds on every task up to 2 hours', 'It runs for 2 hours at a time', 'It succeeds about half the time on tasks that take a skilled human about 2 hours', 'It is 50 percent as capable as a human'],
    answer: 2, why: 'The horizon is the task length at which the success rate is about half.' },
  { q: 'Which step comes immediately after skilled humans are timed?',
    options: ['Fit a success curve', 'Run the AI model on every task several times', 'Assemble the task suite', 'Read off the horizon'],
    answer: 1, why: 'The AI\'s results must exist before success rates can be recorded or fitted.' },
  { q: 'A model attempts a 10-minute task 10 times and succeeds 9 times. What is the task success rate?',
    options: ['10 percent', '50 percent', '90 percent', '9 minutes'],
    answer: 2, why: 'Success rate is successes divided by attempts: 9 divided by 10 is 90 percent.' },
  { q: 'Why is a human\'s working time used instead of the AI\'s running time?',
    options: ['AI running time cannot be measured', 'Human time gives a common yardstick for how hard a task is, and AI running time depends on hardware', 'Humans are always faster', 'It makes the numbers larger'],
    answer: 1, why: 'A task\'s difficulty for people is the same across models and years, while AI run time depends on hardware and changes quickly.' }
];
const PASS_MARK = 4;
const LETTERS = ['A', 'B', 'C', 'D'];

let seen = new Set();
let qi = -1, results = [], answered = false;
const $ = id => document.getElementById(id);

// Called by main.html after Mermaid has drawn the flowchart
function setupDiagram() {
  document.querySelectorAll('.node').forEach(node => {
    const m = node.id.match(/flowchart-(S\d)-\d+$/);
    if (!m) return;
    const id = m[1];
    node.setAttribute('tabindex', '0');
    node.setAttribute('role', 'button');
    node.setAttribute('aria-label', STEPS[id].title);
    const pickIt = () => showStep(id, node);
    node.addEventListener('click', pickIt);
    node.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pickIt(); } });
  });
}

function showStep(id, node) {
  // Inline !important styles beat Mermaid's own class styles
  document.querySelectorAll('.node').forEach(n => {
    const sh = n.querySelector('rect, polygon, path');
    if (!sh) return;
    const isSeen = seen.has((n.id.match(/flowchart-(S\d)-\d+$/) || [])[1]);
    sh.style.setProperty('fill', isSeen ? '#e6f4e6' : '#e8f1fb', 'important');
    sh.style.setProperty('stroke', isSeen ? 'forestgreen' : '#4682b4', 'important');
  });
  const shape = node.querySelector('rect, polygon, path');
  if (shape) {
    shape.style.setProperty('fill', 'gold', 'important');
    shape.style.setProperty('stroke', 'darkgoldenrod', 'important');
  }
  seen.add(id);
  $('stepTitle').textContent = STEPS[id].title;
  $('stepText').textContent = STEPS[id].text;
  $('viewed').textContent = 'Steps read: ' + seen.size + ' of 6' + (seen.size === 6 ? '. Notice that human working time appears in step 2 and again in step 6.' : '');
}

function startQuestions() {
  qi = 0;
  results = [];
  $('startBtn').hidden = true;
  $('againBtn').hidden = true;
  $('submitBtn').hidden = false;
  $('nextBtn').hidden = false;
  loadQuestion();
}

function score() { return results.filter(Boolean).length; }

function loadQuestion() {
  answered = false;
  const Q = QUESTIONS[qi];
  $('qnum').textContent = 'Question ' + (qi + 1) + ' of ' + QUESTIONS.length;
  $('qscore').textContent = 'Score: ' + score() + ' of ' + QUESTIONS.length;
  $('qtext').textContent = Q.q;
  $('options').innerHTML = Q.options.map((o, i) =>
    '<label><input type="radio" name="opt" value="' + i + '">' + LETTERS[i] + '. ' + o + '</label>').join('');
  $('options').querySelectorAll('input').forEach(inp => inp.addEventListener('change', () => {
    $('submitBtn').disabled = answered;
    $('submitBtn').classList.toggle('go', !answered);
  }));
  $('submitBtn').disabled = true;
  $('submitBtn').classList.remove('go');
  $('nextBtn').disabled = true;
  $('nextBtn').classList.remove('go');
  $('nextBtn').textContent = qi === QUESTIONS.length - 1 ? 'See score' : 'Next';
  $('qfeedback').className = '';
  $('qfeedback').textContent = '';
}

function submitAnswer() {
  const sel = $('options').querySelector('input:checked');
  if (!sel || answered) return;
  answered = true;
  const Q = QUESTIONS[qi];
  const v = parseInt(sel.value);
  const ok = v === Q.answer;
  results.push(ok);
  const labels = $('options').querySelectorAll('label');
  labels[Q.answer].classList.add('correct');
  if (!ok) labels[v].classList.add('wrong');
  $('options').querySelectorAll('input').forEach(inp => inp.disabled = true);
  $('qfeedback').className = ok ? 'ok' : 'miss';
  $('qfeedback').innerHTML = ok ? '<b>Correct.</b> ' + Q.why
                                 : '<b>Not quite.</b> ' + Q.why + ' The answer is ' + LETTERS[Q.answer] + '.';
  $('qscore').textContent = 'Score: ' + score() + ' of ' + QUESTIONS.length;
  $('submitBtn').disabled = true;
  $('submitBtn').classList.remove('go');
  $('nextBtn').disabled = false;
  $('nextBtn').classList.add('go');
}

function nextQuestion() {
  if (!answered) return;
  if (qi < QUESTIONS.length - 1) { qi++; loadQuestion(); return; }
  // Final score
  const s = score();
  $('qnum').textContent = 'Finished';
  $('qtext').textContent = '';
  $('options').innerHTML = '';
  $('submitBtn').hidden = true;
  $('nextBtn').hidden = true;
  $('againBtn').hidden = false;
  $('qfeedback').className = 'done';
  $('qfeedback').innerHTML = '<b>Score: ' + s + ' of ' + QUESTIONS.length + '.</b> ' +
    (s >= PASS_MARK ? 'You can explain how a time horizon is produced.' : 'Review the six steps and try again.') +
    '<br>' + results.map((r, i) => 'Q' + (i + 1) + ': ' + (r ? 'correct' : 'missed')).join(' · ');
}

document.addEventListener('DOMContentLoaded', () => {
  $('startBtn').addEventListener('click', startQuestions);
  $('submitBtn').addEventListener('click', submitAnswer);
  $('nextBtn').addEventListener('click', nextQuestion);
  $('againBtn').addEventListener('click', startQuestions);
});
