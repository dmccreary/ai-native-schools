---
title: "Measuring AI Capability: The METR Task-Horizon Studies"
description: "What artificial intelligence, machine learning, and large language models are, and how METR turned the question of AI capability into a measurable task horizon."
generated_by: claude skill chapter-content-generator
date: "2026-11-04 08:06:54"
version: 1.11
---

# Measuring AI Capability: The METR Task-Horizon Studies

## Summary

This chapter introduces artificial intelligence, machine learning, and large language models, then explains how METR measures AI capability through the task-horizon studies — benchmark task suites, the 50% time horizon, and human working time as the unit of measurement. Readers learn how researchers turned the vague question "how capable is AI?" into a number that can be tracked over time.

## Concepts Covered

This chapter covers the following 19 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Artificial Intelligence | 21220 |
| AI Capability | 12644 |
| AI Benchmark | 7373 |
| METR | 6319 |
| Task Horizon | 5265 |
| Machine Learning | 4865 |
| Large Language Model | 4814 |
| AI in Education | 3710 |
| Generative AI | 2111 |
| Exponential Growth | 1121 |
| AI Agent | 1054 |
| 50 Percent Time Horizon | 1053 |
| Human Working Time | 1053 |
| Benchmark Task Suite | 1053 |
| Long-Running Task | 1053 |
| Task Success Rate | 1053 |
| Doubling Time | 1053 |
| Five-Month Doubling | 1052 |
| AI Inference Cost | 1038 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: The Building Blocks of Schools, Students, and Learning](../01-building-blocks-schools-students/index.md)

---

## "Doubles What?"

At a school board meeting in November, a board member named Mr. Alvarez raises his hand during the technology report. "I keep reading that AI is doubling every few months," he says. "Doubling *what*? Because my phone's autocorrect doesn't seem twice as smart as it was last spring."

It is the right question, and it is the question this chapter answers. Claims about AI progress are easy to make and hard to check, because "capability" is vague. A chatbot may write a better poem than it did last year and still fail to book a flight. Unless there is a precise yardstick, "AI is getting better" cannot be turned into a plan. A school that is deciding how to schedule a day three or four years from now needs a number it can track.

This chapter gives you the vocabulary and the yardstick. First we define the terms that every conversation about AI uses and often blurs: artificial intelligence, machine learning, large language models, generative AI, and AI agents. Then we meet a research group called METR that built a measurement of AI capability based on a surprising choice of unit, the amount of time a task takes a human. Finally we see why the measurement behaves like exponential growth, and what that implies for the cost of AI in schools.

!!! mascot-welcome "A yardstick for a moving target"
    ![Indigo waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    This is the chapter where the book's big prediction first gets a number you can check, instead of a mood. By the end you'll be able to answer Mr. Alvarez's "doubles what?" in one sentence, and say what the answer does and doesn't tell a school. Let's find the balance between taking the curve seriously and not taking it for a promise.

## A Ladder of Terms: From AI to AI Agents

People use "AI" for everything from a spam filter to a robot in a movie. The terms below form a ladder, each rung a narrower kind of the one above it, and keeping them straight prevents most confusion.

**Artificial intelligence** (AI) is the field of building computer systems that perform tasks that would normally require human intelligence, such as understanding language, recognizing images, making decisions, and solving problems. The term was coined in 1955 for a summer workshop at Dartmouth College. It is a broad umbrella. A 1990s chess program that searches moves using rules written by programmers is AI, though it learns nothing from data.

**Machine learning** (ML) is the part of AI in which a system learns patterns from examples instead of following rules a programmer wrote by hand. You show a machine-learning system thousands of emails labeled "spam" or "not spam," and it adjusts itself until it can label new emails. Most of the AI you meet today is machine learning.

**Generative AI** is machine learning that creates new content, such as text, images, audio, video, or computer code, rather than only labeling or predicting. A spam filter sorts messages; a generative system writes one.

A **large language model** (LLM) is a generative AI system trained on enormous amounts of text to produce human-like language. It works, roughly, by predicting what text should come next, and doing that at huge scale produces answers, essays, summaries, and code. The chatbots that became widely known after ChatGPT's release in November 2022 are built on LLMs. This book does not explain how LLMs are built inside; what matters here is what they can do.

An **AI agent** is a system, usually built on an LLM, that pursues a goal by taking a series of actions on its own: planning steps, using tools such as a web browser or a code editor, checking its results, and trying again when something fails. A chatbot answers your question and waits. An agent is told "build a quiz website," and then writes the code, runs it, reads the error messages, and fixes them without further prompting.

### Worked Example: One Problem at Every Rung

Imagine the same job at each rung of the ladder: finding scam emails for a school office.

| Rung | How it tackles the job | Where it breaks |
|---|---|---|
| Fixed rule | A programmer writes "if the subject contains WINNER, flag it" | Misses "You have been selected" and wrongly flags "Winner of the spelling bee" |
| Machine learning | The system is shown 10,000 emails already labeled scam or not, and finds the patterns that separate them: sender oddities, link styles, word mixes. It gives each new email a scam score | Fails on a new kind of scam unlike anything in its training examples |
| Large language model | Asked "Explain in two sentences why this email looks suspicious," it writes a plain-language explanation | The explanation can sound confident and be wrong |
| AI agent | Told "Check this week's inbox, move the scams to a folder, and send me a summary," it opens the inbox, scores each message, moves the flagged ones, writes the summary, and emails it | A mistake in an early step, such as misjudging one sender, can carry through every step after |

Each rung does more than the one before and brings a new way to fail. The agent row is the one to remember: because it acts on its own over many steps, an agent's errors can compound, which is why the length of task it can handle reliably, the subject of the rest of this chapter, matters so much.

### Worked Example: Three Waves of AI

The terms above were not invented at once. Artificial intelligence has risen in waves, and each wave explains why a different rung of the ladder dominates the news at a different time.

| Period | What people built | Rung of the ladder | What happened next |
|---|---|---|---|
| 1950s | Alan Turing asked in 1950 whether machines can think; the 1955 proposal for a Dartmouth summer workshop gave the field its name | AI without machine learning | Rule-based programs solved puzzles and played checkers, then stalled on messy real-world problems |
| 1970s and late 1980s | Expert systems that encoded specialists' rules | AI without machine learning | Two "AI winters": funding and interest collapsed when the systems proved brittle and costly to maintain |
| 2012 | A deep neural network called AlexNet won an image-recognition contest by a wide margin | Machine learning | Learning from data replaced hand-written rules across vision, speech, and translation |
| 2017 | Google researchers published the transformer design behind modern language models | Machine learning, toward LLMs | Models could be trained on far more text, far faster |
| November 2022 | ChatGPT reached the public | Large language models, generative AI | Mass adoption, and the education questions of this book |

Two lessons follow. The current wave is built on machine learning and large language models, not on rules, which is why its behavior is statistical and sometimes wrong in odd ways. And earlier waves ended in winters when expectations outran results, a pattern the hype cycle of Chapter 15 describes.

### Worked Example: How a Machine Learns a Rule From Counts

"Learning from examples" can sound mysterious, so here is the smallest honest version. A spam filter is shown 1,000 labeled emails, 200 spam and 800 not spam. For three words it counts how often each appears in each group. These counts are illustrative.

| Word | Share of spam emails containing it | Share of non-spam emails containing it | How much more likely in spam |
|---|---|---|---|
| "free" | 60% | 3% | \( 0.60/0.03 = 20 \) times |
| "winner" | 30% | 2% | \( 0.30/0.02 = 15 \) times |
| "meeting" | 5% | 50% | \( 0.05/0.50 = 0.1 \) times, so 10 times *less* likely |

A new email contains "free," "winner," and "meeting." Before reading it, spam is 200 of 1,000 emails, which is odds of 1 to 4, or 0.25. Multiply the odds by each word's ratio: \( 0.25 \times 20 \times 15 \times 0.1 = 7.5 \), which is odds of 7.5 to 1, or a probability of \( 7.5/8.5 \approx 88\% \) that the email is spam. Nobody wrote a rule saying "free is suspicious." The counts produced it. Real systems use thousands of features and cleverer arithmetic, but the idea is the same, and it shows the weakness too: a scam that uses none of the words the filter has seen gets no help from the counts.

### Worked Example: What a Language Model Does at Each Step

A large language model produces text one small piece at a time. The pieces are called *tokens*, which are chunks of text roughly three-quarters of an English word long. At each step the model assigns a probability to every possible next token, picks one, adds it to the text, and repeats. Suppose the text so far is "The capital of France is" and the model's probabilities, which are illustrative, are:

| Next token | Probability |
|---|---|
| " Paris" | 92% |
| " the" | 3% |
| " a" | 2% |
| " located" | 1% |
| anything else | 2% |

The model almost always continues with " Paris," because that continuation was overwhelmingly common in its training text. Now change the prompt to a question the training text never settled, such as "The mayor of the school district's biggest town is." The probabilities flatten across many plausible names, and the model still picks one, fluently. That is the mechanism behind the hallucination of Chapter 5: the model is always choosing a likely continuation, whether or not a true one exists. It also explains why a model grounded in a vetted document (Chapter 12) behaves better: the document concentrates the probability on supported text.

### Worked Example: Generative AI Beyond Text

Generative AI covers more than chatbots, and each kind has its own benefit and risk in a school.

| Kind of output | A school use | A benefit | A risk and a response |
|---|---|---|---|
| Text | Drafting practice questions | Saves planning time | Errors; a teacher reviews every set |
| Images | Illustrating a vocabulary card | Fast custom visuals | Inaccurate details or biased depictions; check against a trusted source |
| Audio | Reading a passage aloud in a student's home language | Access for English-language learners | Wrong pronunciation; ask a fluent speaker to sample it |
| Code | A student's first program | Quick feedback on errors | Students copy code they do not understand; require them to explain it |
| Video | A short explainer clip | Engagement | Realistic fakes; teach students to ask where a clip came from |

The table below summarizes the ladder using examples. It adds no new terms; it organizes the five you have just met, plus the case of ordinary software that is not AI at all.

| Category | What it does | Example |
|---|---|---|
| Not AI | Follows a fixed rule | A thermostat that switches on at 68°F |
| AI without machine learning | Uses rules or search written by programmers | A 1990s chess program |
| Machine learning | Learns patterns from data to label or predict | A spam filter; a model that predicts which students may fail a course |
| Generative AI | Creates new content | A tool that draws a picture from a description |
| Large language model | Generative AI for language | A chatbot that answers a teacher's question in paragraphs |
| AI agent | Takes multi-step actions toward a goal using tools | A system that writes, runs, and fixes code to build a website |

The nesting is the key idea. Every LLM is generative AI, every generative system is machine learning, and every machine-learning system is AI, but not the other way around. The sim below lets you practice sorting examples.

#### Diagram: AI Terms Classifier

<details markdown="1">
<summary>AI Terms Classifier</summary>
Type: infographic
**sim-id:** ai-terms-classifier<br/>
**Library:** html<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** classify<br/>
**Learning Objective:** The learner will classify eight example systems into the narrowest of six categories (Not AI, AI without machine learning, Machine learning, Generative AI, Large language model, AI agent), correctly placing at least seven of eight on the first attempt.

**Template:** https://github.com/dmccreary/ai-strategy-for-education/tree/main/docs/sims/ai-concept-hierarchy<br/>

**Prerequisites:** artificial intelligence, machine learning, generative AI, large language model, AI agent (all defined in the section "A Ladder of Terms" above).

**Evidence of Mastery:** The learner places each of 8 examples in one of six category bins and submits it. A placement is correct when it matches the "Correct category" column in Content. Mastery is 7 of 8 correct on the first attempt. Opening the category definitions is exploration, not evidence.

**Misconceptions:** (1) Any software that feels smart is AI. (2) All AI is machine learning. (3) A chatbot and an agent are the same thing.

**Instructional Rationale:** Classifying requires recognizing which defining feature an example has, such as learning from data, creating content, or taking multi-step actions. Choosing the narrowest category forces the learner to use the nesting, not just the topic word.

**Content:**

Six categories, shown as nested regions from outside in (Not AI sits outside all the others), each with its definition shown on selection:

| Category | Definition shown |
|---|---|
| Not AI | Software that follows a fixed rule and does nothing that requires intelligence |
| AI without machine learning | A system that performs an intelligent task using rules or search written by programmers |
| Machine learning | A system that learns patterns from examples in order to label or predict |
| Generative AI | A machine-learning system that creates new content, such as images or audio |
| Large language model | A generative AI system trained on text to produce language |
| AI agent | A system built on a language model that takes multi-step actions with tools toward a goal |

Eight examples:

| # | Example shown to the learner | Correct category | Why (shown as feedback) |
|---|---|---|---|
| 1 | A thermostat that switches the heat on whenever the room is below 68°F. | Not AI | It follows one fixed rule and does not do anything that requires intelligence. |
| 2 | A 1990s chess program that scores positions using rules its programmers wrote. | AI without machine learning | It plays chess, an intelligent task, but nothing was learned from data. |
| 3 | An email filter trained on millions of messages labeled spam or not spam. | Machine learning | It learned from labeled examples and only labels; it creates nothing new. |
| 4 | A model that estimates which students may fail a course using past grades and attendance. | Machine learning | It learned a pattern from past data to predict; it does not create content. |
| 5 | A tool that draws a new picture from a sentence describing it. | Generative AI | It creates new content, but images are not language. |
| 6 | A tool that turns a typed sentence into new spoken audio in a chosen voice. | Generative AI | It creates new audio, and it is not a language model. |
| 7 | A chatbot that answers a teacher's question in several paragraphs and cannot take any other action. | Large language model | It generates language and stops after answering. |
| 8 | A system told "build a quiz website" that writes code, runs it, reads the error messages, and fixes them over many steps. | AI agent | It plans and takes many actions with tools to reach a goal. |

**Provenance:** Definitions follow the chapter section "A Ladder of Terms: From AI to AI Agents." The examples are illustrative, written for this chapter.

**Rules:** Each example has exactly one correct category: the narrowest category whose definition it meets. An example is scored on its first submitted placement only. The score counts first-attempt correct placements out of 8. Mastery is a score >= 7.

**Learner Activity:**

1. The learner sees one example at a time and the six categories.
2. The learner places the example and submits. The sim marks it correct or incorrect and shows the feedback text.
3. If incorrect, the learner may place it again; the second attempt does not change the score. After the second attempt, the correct category and reason are shown.
4. After all 8 examples, the sim shows the score and lists misplaced examples with their correct categories.
5. The learner should notice that examples 3 and 4 use machine learning for different purposes and land in the same category, and that examples 7 and 8 both use a language model and differ only in whether they take actions.

**Feedback:** 8 examples, shuffled once per session, two attempts each. Correct: "Correct: [category]. [Why text]." Incorrect: "Not quite. [Why text for the correct answer, without naming the category]." After the second attempt the correct category is revealed and the example counts as missed. A running score "First-try correct: n of 8" is shown. Final message for a score >= 7: "You can place AI systems on the ladder." For a score < 7: "Review the definitions and try again; the examples will be reshuffled."

**Starting State:** The nested regions are shown with example 1 of the shuffled order, the score "First-try correct: 0 of 8," and the prompt "Which is the narrowest category that fits this system?"

**Chapter Anchors:** The chapter names six categories in the order Not AI, AI without machine learning, Machine learning, Generative AI, Large language model, AI agent. The chapter states that every LLM is generative AI and every generative system is machine learning. The mastery bar is 7 of 8.
</details>

### AI in Education

**AI in education** is the use of artificial intelligence to support teaching, learning, and school administration. The uses fall into three groups. *For students*, AI can act as a tutor, give feedback on writing or problem solving, explain a concept several ways, or adapt practice to what a student knows. *For teachers*, it can draft lesson plans, create practice problems, translate materials, and help with grading and feedback. *For administrators*, it can assist with scheduling, forecasting enrollment, and analyzing records. AI in education has a longer history than the current excitement suggests, since the intelligent tutoring systems of the 1980s and the adaptive math software of the 2000s were also AI. What changed after 2022 is that LLMs made flexible conversation and content generation cheap and widely available.

A majority of U.S. teachers surveyed in 2025 reported using AI tools in some way, and many students use chatbots on their own, whether or not their school permits it. UNESCO's 2023 guidance on generative AI in education recommended that governments set a minimum age for classroom use, suggesting 13, and stressed that teachers and students need to understand how the tools work before relying on them.

The Chapter 2 evidence habits apply here from the start. Some AI-in-education results are strongly positive and others are negative, and the difference often comes from *how the tool is designed*, a theme the course description names and Chapter 12 develops.

### Worked Example: Three Uses, Three Tradeoffs

Here is how the benefit, risk, and response pattern looks for three uses at Lincoln Middle School.

| Use | Benefit | Risk | Response |
|---|---|---|---|
| A student tutor that answers math questions | Immediate help at 8 p.m. when no teacher is available | Students may ask for answers instead of thinking | Choose a tool that gives hints first; Ms. Rivera reviews logs weekly (Chapter 12) |
| A teacher tool that drafts practice problems | Saves planning time | Problems may contain errors or be too easy | The teacher checks every set before use |
| A district tool that flags students at risk of failing | Earlier support for students who need it | Biased predictions; privacy of student records | Audit the tool for bias; limit who sees the flags (Chapter 10) |

The row for each use states what could go wrong and what the school does about it. That habit, naming the tradeoff and the response together, is the one this book asks you to keep.

## Measuring What AI Can Do

Back to Mr. Alvarez's question. To say AI is "doubling," you first have to say what is being measured. The next three terms set up that question.

**AI capability** is the range and difficulty of tasks an AI system can perform successfully. It is not a single quantity: a system may be superb at translation and poor at planning a trip. Because capability is multi-dimensional, measuring it requires choosing specific tasks and a way to score them.

The unevenness is not a small caveat. In a 2023 field experiment, researchers from Harvard Business School and Boston Consulting Group gave consultants realistic tasks, some with access to GPT-4 and some without. On tasks inside what the AI did well, consultants with AI finished about 12 percent more tasks, about 25 percent faster, with much higher rated quality. On a task chosen to sit just outside that range, consultants using AI were about 19 percentage points *less* likely to reach the correct answer than those working alone, because the AI's confident output led them astray. The authors called this a "jagged technological frontier": the edge of what AI does well is not a smooth line, and from the outside it is hard to tell which side of it a task falls on. For a teacher, the implication is that a tool's average ability says little about its ability on the task in front of you.

An **AI benchmark** is a standardized set of tasks or questions used to measure and compare AI systems, much as a standardized test, which you met in Chapter 3, compares students. A benchmark fixes the questions and the scoring so that results from different systems and different years can be compared. Well-known benchmarks include multiple-choice exams on general knowledge, collections of grade-school math word problems, and sets of real software bugs to fix.

Benchmarks have a typical life story. A new benchmark is hard, and the best systems score low. Within a few years, systems improve until they score near the maximum, and the benchmark stops telling anyone anything. This is called *saturation*. Benchmarks also suffer from *contamination*, in which questions or answers leak into a model's training data so the system appears to reason when it is recalling. The pressure on benchmark designers is constant: they must keep inventing harder tests, and a score of 92 percent on an old test is hard to compare with 40 percent on a new one.

A **benchmark task suite** is the particular collection of tasks that a benchmark runs. A good suite has tasks of many difficulties and lengths, each with a clear way to decide whether it was done correctly. How a suite is built determines what the benchmark can and cannot say.

### Worked Example: A Benchmark Runs Out of Room

The table shows the best score reached each year on a hypothetical benchmark of 1,000 questions. These numbers are illustrative.

| Year | Best score | Gain over the previous year |
|---|---|---|
| 2019 | 12% | n/a |
| 2021 | 35% | 23 points in two years |
| 2022 | 62% | 27 points |
| 2023 | 85% | 23 points |
| 2024 | 94% | 9 points |
| 2025 | 96% | 2 points |

Through 2023 the benchmark tracks real progress. By 2025 it cannot: a two-point gain could be a real improvement, or a few lucky answers, or a few questions whose answers leaked into training data. Once the best systems score 96 percent there is no room to show further growth, and the benchmark's designers must write a new, harder test. Scores on the old and new tests cannot be placed on one scale. A measure that never hits a ceiling, such as "how long a task, in hours, can the system finish," avoids this trap, and that is the design choice behind the rest of the chapter.

The saturation problem is what METR set out to avoid.

## METR and the Task-Horizon Idea

**METR** (pronounced "meter") stands for Model Evaluation and Threat Research. It is a nonprofit research organization based in Berkeley, California, that studies the autonomous capabilities of advanced AI systems, including whether they could carry out tasks that would pose risks. It describes itself as independent of the AI developers it evaluates. In March 2025 METR published a paper titled *Measuring AI Ability to Complete Long Tasks*, which is one of the core references of this book. The paper was released as a preprint, so in the sense of Chapter 3 it was a public draft that had not yet been through peer review when it appeared; that is a reason to hold its specific numbers loosely and its broad pattern more firmly.

METR's central idea is to measure capability with a *natural unit*, time, instead of a test score. The idea needs three more definitions.

**Human working time** is the amount of time a skilled human professional, working without distractions, needs to complete a task correctly. METR obtained it by hiring skilled people to do each task while a clock ran, and recording how long they took. A task that takes a skilled person two minutes to complete has a human working time of two minutes. A task that takes a full working day has a human working time of about eight hours. The key point is that human working time is a measure of *how hard the task is for people*, and it is the same whether an AI or a person eventually does it.

A **task success rate** is the fraction of attempts at a task, or at a set of similar tasks, that an AI system completes correctly. Running a model ten times on a task and succeeding on seven gives a success rate of 70 percent. METR runs each model many times on each task, since AI systems do not behave identically each time.

A **task horizon** is the length of task, measured in human working time, that an AI system can complete at a stated level of success. It answers the question, "how long a task can this AI handle?" Putting the three ideas together gives METR's key number.

The **50 percent time horizon** is the task length, in human working time, at which an AI system succeeds about half the time. Tasks shorter than the horizon are mostly completed, and tasks longer than it mostly fail. If a model has a 50 percent time horizon of one hour, it completes about half of the one-hour tasks and fewer of the longer ones. METR chose 50 percent because it is the middle of the transition from "usually works" to "usually fails," which makes it a stable point to measure. The price of that choice, as we will see, is that 50 percent is a coin flip, not a reliable worker.

### Worked Example: One Task, Three Human Times

Human working time is not a single fixed number, since skilled people vary. Suppose METR times three professionals on the same task and records 22, 35, and 48 minutes. A single value is needed, and the choice matters: the average is \( (22 + 35 + 48)/3 = 35 \) minutes, and the middle value, the median, is also 35. Had one person gotten distracted and taken 120 minutes, the average would jump to \( (22 + 35 + 120)/3 \approx 59 \) minutes while the median would stay at 35, which is why a robust summary such as the median, or the geometric mean for times that differ by large factors, is the safer choice. The practical point for a reader is that every "task length" in a horizon chart is itself an estimate with a spread, and a careful study says how it was chosen.

### How the Number Is Produced

The procedure has six steps, and understanding them is the best protection against misreading the result.

1. **Assemble a benchmark task suite.** METR combined several suites of tasks, roughly 170 in all, mostly in software engineering, cybersecurity, and reasoning, with lengths from a few seconds to about eight hours or more. Examples include fixing a configuration error, writing a function that passes tests, and improving the speed of a program.
2. **Time skilled humans on each task.** This gives each task its human working time.
3. **Run the AI model on every task, several times.**
4. **Record the task success rate for each task.**
5. **Fit a curve** that relates the chance of success to the human working time of the task. Success is high for short tasks and falls as tasks get longer.
6. **Read off the length at which the curve crosses 50 percent.** That is the 50 percent time horizon.

The leading model METR tested in the March 2025 paper, Claude 3.7 Sonnet, had a 50 percent time horizon of roughly 50 minutes. That is the starting point for the projections later in this chapter.

#### Diagram: How METR Measures a Task Horizon

<details markdown="1">
<summary>How METR Measures a Task Horizon</summary>
Type: workflow
**sim-id:** metr-measurement-workflow<br/>
**Library:** Mermaid<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** explain<br/>
**Learning Objective:** The learner will explain the six steps that turn AI task results into a 50 percent time horizon, correctly answering at least four of five questions about the steps.

**Prerequisites:** benchmark task suite, human working time, task success rate, task horizon, 50 percent time horizon (all defined in the section "METR and the Task-Horizon Idea" above).

**Evidence of Mastery:** After exploring the six steps, the learner answers five multiple-choice questions. An answer is correct when it matches the "Correct option" column in Content. Mastery is 4 of 5 correct. Opening a step to read its description is exploration, not evidence.

**Misconceptions:** (1) The horizon measures how long the AI takes to run. (2) A 50 percent horizon means the AI is reliable on tasks up to that length. (3) The task suite is a single test with one score.

**Instructional Rationale:** Explaining a process is strongest when the learner can say what each step produces and what the next step needs. Questions that depend on the order and the unit of measure make the learner use the process, not recite it.

**Content:**

Six steps shown in order as a flow from step 1 to step 6, each with a description revealed on selection:

| Step | Name | Description shown |
|---|---|---|
| 1 | Assemble a benchmark task suite | Gather roughly 170 tasks, from seconds to hours long, each with a clear way to check whether it was done correctly. |
| 2 | Time skilled humans | Skilled professionals do each task while a clock runs, giving its human working time. |
| 3 | Run the AI model | The AI attempts every task several times. |
| 4 | Record the task success rate | For each task, record the fraction of attempts that succeeded. |
| 5 | Fit a success curve | Fit a curve showing how the chance of success falls as human working time grows, on a logarithmic scale. |
| 6 | Read off the horizon | The task length at which the curve crosses 50 percent is the 50 percent time horizon. |

Five questions, each with four options in the order shown:

| # | Question | Options | Correct option | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | In the task-horizon measure, what is the unit that says how long a task is? | A. The seconds the AI takes to run; B. The human working time the task needs; C. The number of lines of code written; D. The number of tokens the AI produces | B | Human working time measures how hard the task is for people, whoever does it. |
| 2 | A model has a 50 percent time horizon of 2 hours. What does that mean? | A. It succeeds on every task up to 2 hours; B. It runs for 2 hours at a time; C. It succeeds about half the time on tasks that take a skilled human about 2 hours; D. It is 50 percent as capable as a human | C | The horizon is the task length at which the success rate is about half. |
| 3 | Which step comes immediately after skilled humans are timed? | A. Fit a success curve; B. Run the AI model on every task several times; C. Assemble the task suite; D. Read off the horizon | B | The AI's results must exist before success rates can be recorded or fitted. |
| 4 | A model attempts a 10-minute task 10 times and succeeds 9 times. What is the task success rate? | A. 10 percent; B. 50 percent; C. 90 percent; D. 9 minutes | C | Success rate is successes divided by attempts: 9 divided by 10 is 90 percent. |
| 5 | Why is a human's working time used instead of the AI's running time? | A. AI running time cannot be measured; B. Human time gives a common yardstick for how hard a task is, and AI running time depends on hardware; C. Humans are always faster; D. It makes the numbers larger | B | A task's difficulty for people is the same across models and years, while AI run time depends on hardware and changes quickly. |

**Provenance:** The six steps and the figure of roughly 170 tasks summarize METR (2025), *Measuring AI Ability to Complete Long Tasks* (preprint), as presented in the chapter. The sim must label the figures "As described in a 2025 preprint."

**Rules:** Steps are shown in the fixed order 1 to 6. The questions are asked in the order shown, one attempt each, and the options are shown in the order listed. A question is correct when the selected option equals the correct option. Mastery is a score >= 4.

**Learner Activity:**

1. The learner selects each of the six steps in turn to read its description.
2. The learner starts the questions. Question 1 appears with its four options.
3. The learner selects an option and submits. The sim marks it correct or incorrect and shows the feedback text.
4. The learner continues through question 5 and sees the score.
5. The learner should notice that the unit of the horizon, human time, appears in both step 2 and step 6.

**Feedback:** 5 questions, fixed order, one attempt each. Correct: "Correct. [Why text]." Incorrect: "Not quite. [Why text]." The correct option is revealed after the attempt. A running score "n of 5" is shown. Final message for a score >= 4: "You can explain how a time horizon is produced." For a score < 4: "Review the six steps and try again."

**Starting State:** The six steps are shown as a flow with no step selected, and the prompt reads "How do you turn a pile of AI test results into one number?"

**Chapter Anchors:** The chapter states six steps, roughly 170 tasks, task lengths from seconds to about eight hours or more, and that the horizon is read where the success curve crosses 50 percent.
</details>

!!! mascot-thinking "A ruler made of time"
    ![Indigo thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think of the task horizon as a ruler marked in human minutes and hours instead of test points. That choice is what lets the ruler keep working as AI improves: a score of 95 percent on a test is a ceiling, but "tasks that take a person a day" is a mark you can keep moving up.

### Worked Example: Reading a Success Curve

Suppose a model attempts tasks of six lengths, many times each, and the success rates are as follows. These numbers are illustrative; they follow a smooth curve of the kind METR fits.

| Human working time of the task | Task success rate |
|---|---|
| 1 minute | 98% |
| 4 minutes | 94% |
| 15 minutes | 80% |
| 60 minutes | 50% |
| 240 minutes (4 hours) | 20% |
| 960 minutes (16 hours) | 6% |

Reading the table, the success rate crosses 50 percent at 60 minutes, so this model's 50 percent time horizon is one hour. A second number is also visible: the success rate is 80 percent at 15 minutes, so the *80 percent* time horizon is 15 minutes, four times shorter than the 50 percent one. In METR's real data the 80 percent horizon was also several times shorter than the 50 percent horizon. This matters for schools: a tool that succeeds half the time on one-hour tasks succeeds only four times in five on tasks a quarter that long.

!!! mascot-tip "Three questions for any headline"
    ![Indigo giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    When a headline quotes a task horizon, ask: At what success rate, 50 or 80 percent? On what kind of tasks? Measured when? A "four-hour horizon" at 50 percent on software tasks is a very different claim from a four-hour assistant a teacher can trust.

The shape of the curve in the table, success falling steadily as tasks lengthen, is a simplified model with a stated rule: the chance of success is \( 1/(1 + t/H) \), where \( t \) is the task's human working time and \( H \) is the 50 percent horizon. The sim below lets you try it.

#### Diagram: Task Horizon Curve Explorer

<details markdown="1">
<summary>Task Horizon Curve Explorer</summary>
Type: microsim
**sim-id:** task-horizon-curve-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate a model's chance of completing tasks of different human working times from its 50 percent time horizon, to within 2 percentage points, and identify the task length at which the chance reaches 80 percent.

**Template:** https://github.com/dmccreary/tracking-ai-course/tree/main/docs/sims/ai-task-horizons<br/>

**Prerequisites:** human working time, task success rate, task horizon, 50 percent time horizon, and the success rule P = 1/(1 + t/H) (all defined in the section "METR and the Task-Horizon Idea" above).

**Evidence of Mastery:** Before the horizon can be changed, the learner commits three answers: (Q1) the chance of success on a 15-minute task for a model with H = 60 minutes; (Q2) the task length at which that model's chance is 80 percent; (Q3) the chance of success on a 60-minute task for a later model with H = 240 minutes. An answer is correct when it is within ±2 percentage points (Q1, Q3) or ±1 minute (Q2) of the value in Content. Mastery is 3 of 3 correct. Moving the horizon afterward is exploration.

**Misconceptions:** (1) A model with a 1-hour horizon is reliable on all tasks up to 1 hour. (2) Success drops to zero just past the horizon. (3) The 80 percent horizon is about the same as the 50 percent horizon.

**Instructional Rationale:** Applying a stated rule to specific values makes the meaning of the horizon concrete. Committing to calculations first and then exploring other horizons shows how the whole curve shifts as the horizon grows, and why reliability and horizon are different things.

**Content:**

The success rule: P = 1 / (1 + t/H), where t is the task's human working time in minutes and H is the model's 50 percent time horizon in minutes.

Model horizon H: min 15, max 960, step 15, default 60, unit minutes.

Six reference tasks:

| Task | Human working time t (minutes) |
|---|---|
| A | 1 |
| B | 4 |
| C | 15 |
| D | 60 |
| E | 240 |
| F | 960 |

Check values for H = 60:

| t (minutes) | Chance of success |
|---|---|
| 1 | 98% |
| 4 | 94% |
| 15 | 80% |
| 60 | 50% |
| 240 | 20% |
| 960 | 6% |

Answers: Q1 = 80%; Q2 = 15 minutes (the 80 percent horizon is H/4); Q3 = 80% (60 minutes with H = 240 gives 1/(1 + 0.25)).

**Provenance:** The rule is a simplified model written for this chapter, in the spirit of the success curves METR fits. The sim must label it "Simplified illustrative model, not METR data."

**Rules:** P = 1/(1 + t/H), shown as a percent rounded to the nearest whole number. The 80 percent horizon is the t for which P = 0.8, which equals H/4. The 50 percent horizon is H. The curve is drawn on a logarithmic horizontal axis from 1 minute to 960 minutes.

**Learner Activity:**

1. The learner reads the rule and the six tasks, and answers Q1, Q2, and Q3 as predictions.
2. The learner submits. The sim checks the answers and shows the curve for H = 60 with the six tasks marked.
3. The learner moves the horizon from 15 to 960 minutes. The curve and the six success rates update at once.
4. The learner should notice that the 50 percent point sits at H and the 80 percent point sits at a quarter of H, and that no task is ever certain.

**Feedback:** Three questions, fixed order, two attempts each. Q1 correct: "Yes: 1/(1 + 15/60) is 0.80." Q1 incorrect: "Divide the task length by the horizon, add 1, then take the reciprocal." Q2 correct: "Yes: the 80 percent point is a quarter of the horizon." Q2 incorrect: "Find the t where t/H equals 0.25." Q3 correct: "Yes: 1/(1 + 60/240) is 0.80." Q3 incorrect: "A longer horizon means the same 60-minute task is relatively shorter." After the second wrong attempt, the answer and its working are shown. A score "n of 3" is shown.

**Starting State:** The horizon is locked at 60 minutes, the six tasks are listed without success rates, and the prompt reads "How likely is this model to finish each task?"

**Chapter Anchors:** The chapter's worked example uses task lengths of 1, 4, 15, 60, 240, and 960 minutes, a 50 percent horizon of 60 minutes, and an 80 percent horizon of 15 minutes.
</details>

### Worked Example: Estimating a Horizon From Noisy Data

Real success rates do not land exactly on 50 percent, so the horizon has to be estimated between two measured points. Suppose a second model produces these results, which are illustrative.

| Human working time | Task success rate |
|---|---|
| 2 minutes | 95% |
| 8 minutes | 82% |
| 30 minutes | 61% |
| 120 minutes | 33% |
| 480 minutes | 12% |

The 50 percent point lies between 30 minutes (61 percent) and 120 minutes (33 percent). Because task length is spread over a very wide range, the interpolation is done on the logarithm of the time, not on the time itself. The success rate falls 28 points between the two measured lengths, and 50 percent is 11 of those 28 points down from 61, a fraction of \( 11/28 \approx 0.39 \) of the way along. The two lengths differ by a factor of \( 120/30 = 4 \), so the horizon is

\[
30 \times 4^{0.39} \approx 30 \times 1.72 \approx 52 \text{ minutes}.
\]

A reader who interpolated on the plain number line would have placed the point 39 percent of the way from 30 to 120, at about 65 minutes, a 25 percent overestimate. The method matters because the whole argument of the chapter rests on reading a number off a curve. It is also a reminder that the headline figure carries a margin of error, which METR reports as a range.

### Long-Running Tasks and AI Agents

A **long-running task** is a task that needs many steps over an extended period, from hours to days, so that early mistakes can compound and the worker must plan, track progress, and recover from errors. Teaching examples are *grade thirty essays and write feedback* (about five hours), *design and prepare a two-week unit with materials* (a few days), and *build an interactive classroom simulation* (a few days). Long-running tasks matter because most valuable work is long-running, and the early AI systems were good at short bursts only.

An AI agent, defined earlier, is the kind of system that can attempt a long-running task, since it can keep working through many steps. This is why the horizon matters for schools: a system with a horizon of a few minutes can answer a student's question, and a system with a horizon of a few hours can walk a student through a multi-step project, check each step, and report to a teacher. The table gives illustrative educational tasks and human working times to make the idea concrete. These times are rough estimates, written for this chapter, and METR's own tasks are software tasks, so the table is an analogy and not a measurement.

| Educational task | Rough human working time |
|---|---|
| Answer a student's factual question | 1 minute |
| Write feedback on one paragraph | 5 minutes |
| Draft a quiz of ten questions with an answer key | 30 minutes |
| Grade thirty short essays with written comments | 5 hours |
| Plan a two-week unit with materials and assessments | 20 hours |
| Build and test an interactive classroom simulation | 40 hours |

### Worked Example: Why Long Tasks Are Harder Than Short Ones

A long task is a chain of steps, and an agent has to get every step right, or notice and repair its mistakes. Suppose each step succeeds independently with some probability, and the task succeeds only if all the steps do. Then the chance of finishing is the per-step success rate multiplied by itself once per step. The table shows the result for three per-step reliabilities.

| Steps in the task | 90% per step | 95% per step | 99% per step |
|---|---|---|---|
| 5 | 59% | 77% | 95% |
| 10 | 35% | 60% | 90% |
| 20 | 12% | 36% | 82% |
| 50 | 0.5% | 8% | 61% |

An agent that is right 95 times in 100 at each step finishes a twenty-step task only about 36 percent of the time. To complete it 80 percent of the time, each step would need to succeed about 98.9 percent of the time, since \( 0.8^{1/20} \approx 0.989 \). This is one reason the 80 percent horizon sits well below the 50 percent horizon, and why a rising horizon means more than "smarter": it means more reliable at every step, and better at noticing and recovering from errors. The model is simple, since real steps are not independent and good agents retry, but it shows why reliability is the quantity to watch.

!!! mascot-warning "A coin flip is not a colleague"
    ![Indigo warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is hearing "can do tasks that take a human two hours" and picturing a reliable assistant. A 50 percent horizon means the tool fails about half the time at that length, and the 80 percent horizon is much shorter. For anything a student or family will rely on, plan on a human check, and ask which horizon the vendor is quoting.

## Exponential Growth and Doubling Time

METR's headline finding concerns how the horizon *changes over time*. To state it you need two more terms.

**Exponential growth** is growth in which a quantity increases by a constant *percentage* or constant *factor* in each period, rather than by a constant *amount*. A savings account earning 5 percent a year grows slowly at first and then much faster, because each year's interest is earned on a larger balance. The distinctive feature of exponential growth is that it starts slowly and then becomes enormous, which human intuition is poor at tracking. Chapter 5 contrasts it with linear growth and explains how to read it on a chart.

The **doubling time** is the length of time it takes a quantity growing exponentially to double. If a quantity has a doubling time of five months, it is twice as large after five months, four times as large after ten, eight times after fifteen, and so on. The number of doublings that have happened is the elapsed time divided by the doubling time, and each doubling multiplies the quantity by two:

\[
\text{value after } t \text{ months} = \text{starting value} \times 2^{t/T}
\]

where \( T \) is the doubling time in months. The formula is the whole of the arithmetic you need for the rest of the chapter.

!!! mascot-encourage "Exponents feel slippery for everyone"
    ![Indigo encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If exponents make you nervous, you're in good company; human intuition is built for steady, additive change. You already did similar arithmetic in Chapter 1 when you divided a budget by a day count. Here, just keep doubling a number on paper (1, 2, 4, 8, 16) until the pattern feels solid, then read the table below.

METR found that the 50 percent time horizon of leading AI models has been growing exponentially. This book uses **five-month doubling**, a doubling time of about every five months, as its planning figure for the task horizon. The estimated doubling time depends on which models and which period are measured, so treat "about five months" as a planning figure and not a constant of nature. Chapter 5 returns to the sensitivity of forecasts to this number.

### Worked Example: Doubling Time as a Monthly Growth Rate

People often meet growth as a percentage and doubling time as a period, so it helps to convert between them. If a quantity doubles every 5 months, it grows by a constant factor \( g \) each month with \( g^5 = 2 \), so \( g = 2^{1/5} \approx 1.149 \). The horizon therefore grows about 14.9 percent a month. Over a year the factor is \( 1.149^{12} = 2^{12/5} \approx 5.3 \), a gain of about 430 percent. A quick check is the "rule of 70": the doubling time in periods is about 70 divided by the percentage growth per period, and \( 70/14.9 \approx 4.7 \) months, close to the true 5. A bank account at 5 percent a year doubles in about 14 years by the same rule. Seen as a monthly rate, five-month doubling sounds like a steady 15 percent, and seen as a yearly factor it sounds like a five-fold annual jump, which are the same fact described two ways.

### Worked Example: What Five-Month Doubling Implies

Start from a 50 percent horizon of 50 minutes in early 2025 and apply five-month doubling. This is an illustration of the arithmetic, not a forecast.

| Months from start | Doublings (t/5) | Growth factor \( 2^{t/5} \) | Horizon |
|---|---|---|---|
| 0 | 0 | 1 | 50 minutes |
| 12 | 2.4 | 5.3 | about 4.4 hours |
| 24 | 4.8 | 27.9 | about 23 hours |
| 36 | 7.2 | 147 | about 122 hours, roughly 15 eight-hour workdays |
| 48 | 9.6 | 776 | about 647 hours, roughly 81 workdays |

The table shows why "three to four years" is the book's planning window. In three years the horizon grows by about a factor of 147, from under an hour to about three weeks of full-time human work. In four years it is about 776 times larger, or about four months of work. The growth after the first year looks small next to the growth in the last year, which is the signature of exponential growth.

The result depends heavily on the doubling time. If the doubling time were ten months instead of five, the horizon after 36 months would be \( 50 \times 2^{3.6} \approx 606 \) minutes, about ten hours rather than 122, a result twelve times smaller. A forecast with an exponential in it is only as good as its doubling time.

!!! mascot-thinking "Count the doublings, not the months"
    ![Indigo thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    The trick for reading any exponential claim is to ask how many doublings fit in the time. Five months per doubling gives about 2.4 doublings a year, so a factor of about 5 per year and about 147 in three years. Small changes in the doubling time swing the answer enormously, so always ask where the number comes from.

## AI Inference Cost

Capability is only half of what a school needs to know. The other half is price.

**AI inference cost** is the cost of running an already-trained AI model to produce an answer, as distinct from the large one-time cost of training the model. Inference is what happens each time a student sends a question and the model replies. It is typically priced per *token*, a small chunk of text, roughly three-quarters of an English word. Providers quote a price per million tokens, counting both the text sent in and the text generated.

Inference costs have been falling fast. The Stanford AI Index 2025 reported that the cost of querying a model with the performance of GPT-3.5 dropped from about \$20 per million tokens in November 2022 to about \$0.07 per million tokens in October 2024, more than a 280-fold decrease in under two years. That is about nineteen-fold a year. Two cautions apply. The fall describes a *fixed level of capability*: the cheapest way to reach the performance of an older model gets cheaper, while the most capable models still cost more. And prices depend on providers' pricing decisions, which can change.

For schools, falling inference cost is what makes AI tutoring something a public school could afford, as opposed to something only a tuition-funded private school could. The arithmetic is short.

### Worked Example: What a Token Costs in Everyday Terms

Prices per million tokens are hard to picture. A token is about three-quarters of an English word, so 1,000 words is roughly 1,333 tokens. A student asks a tutor to explain a concept in a 100-word question (about 133 tokens) and receives a 1,500-word explanation (about 2,000 tokens), for 2,133 tokens in all.

| Price per million tokens | Cost of this one exchange | Cost of 1,000 such exchanges |
|---|---|---|
| \$20.00 (November 2022) | about \$0.043 | about \$43 |
| \$2.00 (an illustrative stronger-model price) | about \$0.004 | about \$4.30 |
| \$0.07 (October 2024, GPT-3.5-level) | about \$0.00015 | about \$0.15 |

At the 2022 price, a classroom of 28 students each asking one such question would cost about \$1.20. At the 2024 price it is about four-tenths of a cent. The long, detailed answer matters more than the short question, because the model's output is usually priced higher than its input and is longer. A design that asks the tutor for short hints, as Chapter 12 recommends, is therefore cheaper as well as better for learning.

### Worked Example: Cost per Student per Year

Suppose a tutoring session uses about 20,000 tokens, such as forty exchanges of about 500 tokens, and a student has one session per school day for 180 days. The year's total is \( 20{,}000 \times 180 = 3{,}600{,}000 \) tokens, or 3.6 million. The cost for that year at each price is:

| Price per million tokens | Cost per student per year | Cost per student per day |
|---|---|---|
| \$20.00 (November 2022) | \$72.00 | \$0.40 |
| \$0.07 (October 2024) | about \$0.25 | about \$0.0014 |

At the 2024 price, a 28-student class costs about \( 28 \times \$0.25 = \$7 \) a year, and a 12,000-student district about \$3,000, against per-pupil spending of roughly \$15,600 per student from Chapter 1. At the 2022 price, the same district would have paid about \$864,000. A 280-fold price drop turns a luxury into a rounding error, which is the economic fact behind the "pennies per student per day" idea in the course description. The caution: this is a GPT-3.5-level model, and a stronger tutor costs more per token, so Chapter 7 returns to costs with the full picture.

#### Diagram: AI Cost per Student Calculator

<details markdown="1">
<summary>AI Cost per Student Calculator</summary>
Type: microsim
**sim-id:** ai-cost-per-student-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the yearly AI inference cost per student from tokens per session, sessions per day, school days, and price per million tokens, to within one cent, in three of three challenges.

**Template:** https://github.com/dmccreary/economics-course/tree/main/docs/sims/opportunity-cost-calculator<br/>

**Prerequisites:** AI inference cost, token, price per million tokens (all defined in the section "AI Inference Cost" above).

**Evidence of Mastery:** The learner commits answers to three challenges before the controls are unlocked. An answer is correct when it is within ±\$0.01 of the value in Content. Mastery is 3 of 3 correct. Using the controls afterward is exploration.

**Misconceptions:** (1) Cost depends only on the number of sessions. (2) Cheaper models are always worse. (3) The cost of a capable AI tutor is out of reach for a public school.

**Instructional Rationale:** Calculating cost from four inputs builds fluency with the units and makes the effect of a 280-fold price change tangible. Exploring afterward lets the learner see which input matters most.

**Content:**

The cost formula: cost per student per year = tokens per session × sessions per day × school days × price per million tokens ÷ 1,000,000.

Inputs:

| Input | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Tokens per session | 5,000 | 100,000 | 5,000 | 20,000 | tokens |
| Sessions per school day | 1 | 5 | 1 | 1 | sessions |
| School days per year | 150 | 200 | 10 | 180 | days |
| Price per million tokens | 4 choices | | | \$0.07 | dollars |

The four prices: \$20.00 (the November 2022 price for GPT-3.5-level performance as reported by the Stanford AI Index 2025), \$2.00 (illustrative), \$0.20 (illustrative), and \$0.07 (the October 2024 price as reported by the same source).

Three challenges:

| # | Tokens per session | Sessions per day | School days | Price per million | Correct cost per student per year | Working shown as feedback |
|---|---|---|---|---|---|---|
| 1 | 20,000 | 1 | 180 | \$20.00 | \$72.00 | 20,000 × 1 × 180 = 3,600,000 tokens; 3.6 × \$20.00 = \$72.00. |
| 2 | 20,000 | 1 | 180 | \$0.07 | \$0.25 | 3.6 million tokens × \$0.07 = \$0.252, which is about \$0.25. |
| 3 | 40,000 | 2 | 180 | \$0.20 | \$2.88 | 40,000 × 2 × 180 = 14,400,000 tokens; 14.4 × \$0.20 = \$2.88. |

**Provenance:** The two reported prices come from the Stanford AI Index 2025 as summarized in the chapter; the sim must show the source and label the \$2.00 and \$0.20 prices "Illustrative." The session sizes are illustrative, and the sim must say they apply to a GPT-3.5-level model.

**Rules:** Annual tokens = tokens per session × sessions per day × school days. Cost = annual tokens ÷ 1,000,000 × price. Costs are shown to the cent, and to the tenth of a cent when under \$1 per student per year. A district total is shown for an enrollment of 12,000 students, which is the Chapter 1 example district.

**Learner Activity:**

1. The learner answers challenges 1, 2, and 3 as calculations and submits them.
2. The sim checks the answers and unlocks the controls.
3. The learner changes the inputs. The yearly cost, the daily cost, and the district total update at once.
4. The learner compares the cost at \$20.00 and at \$0.07 for the same usage.
5. The learner should notice that price per token changes the result far more than any realistic change in usage.

**Feedback:** Three challenges, fixed order, two attempts each. Correct: "Correct: $[value]. [Working text]." Incorrect: "Not quite. Check the units: the price is per million tokens." After the second wrong attempt the value and working are shown. A score "n of 3" is shown.

**Starting State:** Challenge 1 is shown with its inputs locked, and the prompt reads "What does one year of AI tutoring cost per student?"

**Chapter Anchors:** The chapter's worked example uses 20,000 tokens per session, one session per day, 180 days, 3.6 million tokens a year, prices of \$20.00 and \$0.07, costs of \$72.00 and about \$0.25, a 12,000-student district, and per-pupil spending of about \$15,600.
</details>

## Answering "Doubles What?"

Mr. Alvarez's question now has an answer: the thing that is doubling is the *length of task, measured in human working time, that a leading AI system completes about half the time*. It is a specific, measured quantity, and it is not "intelligence" in general.

That answer also shows what the number does *not* say. It is measured on mostly software tasks, which may be cleaner than the messy tasks of a classroom. It is a 50 percent figure, so reliable performance is at a much shorter horizon. The doubling time is an estimate that depends on the models and period measured. And the main source is a preprint, not yet a settled finding. A board member who takes the curve seriously and holds these limits in mind is better placed than one who dismisses it or treats it as a promise.

The story has the benefit and risk this book always pairs. The benefit: if horizons keep growing, AI systems could eventually coach students through multi-step projects and take hours of routine work from teachers. The risks: tools that fail half the time at their advertised length; students who hand their thinking over to systems whose reliability they cannot judge; and a forecast that, by itself, tells a school nothing about whether a particular product helps a particular child. The response is the combination this book recommends: use the trend to plan, use independent evidence to buy, and keep a person in the loop wherever reliability matters.

## Key Takeaways

- **Artificial intelligence** is the broad field; **machine learning** learns from data; **generative AI** creates content; a **large language model** generates language; an **AI agent** takes multi-step actions toward a goal.
- **AI in education** serves students, teachers, and administrators, and the gap between good and harmful results often depends on how the tool is designed.
- **AI capability** is multi-dimensional; an **AI benchmark** and its **benchmark task suite** make it measurable, but benchmarks saturate and can be contaminated.
- **METR** measures capability in a natural unit: **human working time**, the time a skilled person needs. The **task success rate** at each length gives a curve, and the **task horizon** is the length where it crosses a chosen level.
- The **50 percent time horizon** is a coin flip, not a reliable worker; the 80 percent horizon is several times shorter.
- A **long-running task** needs many steps over hours or days, which is the kind of work an **AI agent** attempts.
- **Exponential growth** adds a constant factor per period; the **doubling time** sets the factor, and value after \( t \) months is the starting value times \( 2^{t/T} \).
- **Five-month doubling** is this book's planning figure: from 50 minutes, it implies about 23 hours after two years and about 122 hours after three, but a doubling time twice as long would give a result twelve times smaller.
- **AI inference cost** for a fixed capability level fell more than 280-fold from November 2022 to October 2024, which is why AI tutoring could become affordable for public schools.

!!! mascot-celebration "You can answer 'doubles what?'"
    ![Indigo celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You just learned to name what METR measures, read a task horizon, and explain what five-month doubling means for a three-year plan, along with the limits that come with it. Chapter 5 teaches you to read this kind of curve on a logarithmic chart and to say what could bend it. One step at a time, together.
