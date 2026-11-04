---
title: "Tracking Mastery: xAPI, Learning Record Stores, and MicroSims"
description: "How an interactive textbook records what a student has mastered using xAPI statements and a Learning Record Store, adapts without a live AI model, and keeps the data under student and family control."
generated_by: claude skill chapter-content-generator
date: "2026-11-04 08:23:34"
version: 1.11
---

# Tracking Mastery: xAPI, Learning Record Stores, and MicroSims

## Summary

This chapter introduces the technical building blocks that let a textbook adapt to a student without a live AI model: xAPI, Learning Record Stores, mastery data, learning analytics, and MicroSims, together with student-controlled, portable learning data. Readers finish able to explain how a Learning Record Store tracks what a student has mastered and why that data should stay under the student's control.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Mastery Data | 369 |
| Learning Analytics | 107 |
| xAPI | 106 |
| Learning Record Store | 60 |
| Learning Graph | 52 |
| Web Browser | 39 |
| Learning Dependency | 38 |
| Static Website | 28 |
| xAPI Statement | 28 |
| Actor Verb Object | 27 |
| Learning Record | 26 |
| Data Portability | 23 |
| Student-Controlled Data | 22 |
| MicroSim | 21 |
| Learning Management System | 18 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: The Building Blocks of Schools, Students, and Learning](../01-building-blocks-schools-students/index.md)
- [Chapter 2: Evidence, Motivation, and the Stakeholders of Schooling](../02-evidence-motivation-stakeholders/index.md)
- [Chapter 6: The Five-Level Model of Intelligent Textbooks](../06-five-level-model-intelligent-textbooks/index.md)

---

## "How Does It Know?"

After the pilot at Lincoln Middle School, Maya's mother, Ms. Reyes, comes to the parent night with a sharp question. "The software seems to know exactly which fractions my daughter is stuck on. How does it know? Is there an AI watching her? And who else gets to see that?"

It is the right pair of questions, and the honest answer is less dramatic than she fears and more important than she might expect. No live AI model needs to be watching her. What the software needs is a *record*: a running list of what Maya did, in a standard format, kept in a place the school controls. Choosing the next lesson from that record can be done with simple rules.

This chapter explains the parts of that arrangement: how an interactive page reports what a student did, where those reports are kept, how they are turned into a measure of mastery, how the software uses the measure to choose what comes next, and how the student and family stay in control of the data throughout. It is the technical foundation of Level 3 from Chapter 6, and it is why the book's low-cost design can adapt to students without sending every request to a large language model.

!!! mascot-welcome "From clicks to a record you control"
    ![Indigo waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    By the end of this chapter you'll be able to explain to a worried parent, like Ms. Reyes, exactly what is recorded, where it lives, and how an adaptive textbook uses it, without a live AI model in sight. You'll also know the one design rule that keeps families in charge. Let's find the balance between a textbook that knows a child well and a family that stays in control.

## The Pieces: Web Pages, Browsers, and MicroSims

Before the record, the thing that produces it. A **web browser** is the application on a computer, tablet, or phone that retrieves web pages and displays them, and that can run small programs, written in a language called JavaScript, that come with those pages. Chrome, Safari, Edge, and Firefox are web browsers. Every student with a school device already has one.

A **static website** is a website made of fixed files, such as HTML pages, images, and JavaScript, that a server hands over exactly as stored, without running any program on the server to build each page. This book's own site is a static website. Static sites are cheap and fast to serve, because the server only has to deliver files, and they are secure in a useful way: with no server program and no database, there is little for an attacker to break into and no student data to leak from the page itself. This is the technical reason that Level 2 textbooks carry almost no privacy burden.

A **MicroSim**, the term used for an embedded simulation in Chapter 6, is a small interactive model that runs entirely inside the web browser. A MicroSim does not need a server, because the browser runs it using the JavaScript delivered with the page. This is why a school can host hundreds of MicroSims on a static site at almost no cost. The sims in each chapter of this book, such as the effect-size visualizer and the task-horizon explorer, are MicroSims.

A MicroSim runs in the student's browser, which makes it a natural place to observe what the student does: a slider moved, a question answered, an answer checked. The question is what to do with those observations. That is the job of the next few terms.

## xAPI: A Standard Way to Say What Happened

Different learning programs have traditionally reported results in incompatible ways, or not at all. A quiz tool recorded a score, a video platform recorded minutes watched, and a simulation recorded nothing. To make the records comparable and portable, the education technology community developed a shared format.

**xAPI**, short for *Experience API* (and originally called Tin Can API), is a standard format and protocol for describing learning experiences and sending the descriptions to a store. It was developed beginning around 2011 under the U.S. Department of Defense's Advanced Distributed Learning initiative, released as version 1.0 in 2013, and later adopted as an IEEE standard. Its main advance over the earlier SCORM standard, which tracked a course's completion and score inside a learning management system, is that xAPI can describe almost any activity, on any device, including activity outside a course.

An **xAPI statement** is a single record of one learning event, written as a small structured data object. Its core idea is a sentence in three parts, called **Actor Verb Object**:

- The **actor** is who did something, such as a student.
- The **verb** is what they did, such as *answered*, *completed*, or *experienced*.
- The **object** is what they did it to, such as a particular quiz question or simulation.

Statements can carry extra detail. A *result* holds the outcome, such as a score or whether the answer was correct, and a *context* holds surrounding information, such as the course or the page the activity belongs to. Each statement also has a timestamp. The sentence "Student 4821 answered Question 3 on Unit Rates correctly" is a statement in everyday language.

The standard writes the statement in a text format called JSON. Before you look at one, here is what each field in it means: `actor` names who acted, using a code instead of a real name so that the record does not expose identity by itself; `verb` gives a standard web address that identifies the action, plus a human-readable label; `object` identifies the activity by its web address; and `result` records whether the answer was correct and the score as a fraction of 1.

```json
{
  "actor":  { "account": { "name": "student-4821" } },
  "verb":   { "id": "http://adlnet.gov/expapi/verbs/answered",
              "display": { "en-US": "answered" } },
  "object": { "id": "https://example.edu/unit-rates/question-3" },
  "result": { "success": true, "score": { "scaled": 1.0 } },
  "timestamp": "2026-11-04T10:15:32Z"
}
```

Read it as a sentence: *student-4821 answered question 3 of the unit-rates activity, correctly, at 10:15 a.m.* The statement says nothing more. It records an event, which is what makes it a safe and compact unit of data: an ordinary statement takes about a kilobyte or less, and a full semester of a student's activity compresses to a fraction of a megabyte, according to the author's draft design for a lightweight store.

The sim below, reused from the author's companion book on Learning Record Stores, walks through the building blocks of a statement with one worked example.

#### Diagram: xAPI Statement Building Blocks

<iframe src="https://dmccreary.github.io/learning-record-store/sims/xapi-statement-triple/main.html" width="100%" height="790" scrolling="no"></iframe>

[Run the xAPI Statement Building Blocks MicroSim fullscreen](https://dmccreary.github.io/learning-record-store/sims/xapi-statement-triple/main.html){ .md-button }

<details markdown="1">
<summary>xAPI Statement Building Blocks (reused MicroSim)</summary>
Type: workflow
**sim-id:** xapi-statement-triple<br/>
**Library:** Mermaid<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/learning-record-store/sims/xapi-statement-triple/<br/>
**Source Repo:** https://github.com/dmccreary/learning-record-store/tree/main/docs/sims/xapi-statement-triple<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** classify<br/>
**Learning Objective:** The learner will classify the parts of an xAPI statement as actor, verb, object, result, or context using one worked example.

Reused from the author's companion book on Learning Record Stores, whose page is marked instrumented.
</details>

### Worked Example: From Maya's Click to a Statement

Maya answers the third question in the unit-rates activity. The page, running in her browser, builds a statement.

| Event on the page | Statement parts | In plain English |
|---|---|---|
| Maya clicks "Check" on question 3 and the answer is right | Actor: student-4821. Verb: answered. Object: unit-rates question 3. Result: success, score 1.0 | "student-4821 answered question 3 correctly" |
| Maya slides the bottle-count slider in the simulation | Actor: student-4821. Verb: experienced. Object: unit-rate simulation | "student-4821 explored the simulation" |
| Maya finishes the five-question check with four right | Actor: student-4821. Verb: completed. Object: unit-rates check. Result: success, score 0.8 | "student-4821 completed the check with 80 percent" |

Two details deserve attention. The actor is a code, `student-4821`, not "Maya Reyes," so that someone reading the record without the roster cannot tell who she is. And not every action is recorded: nothing in the table records that Maya moved her mouse across the page, because that would be noise, and noise in a record makes the conclusions drawn from it unreliable.

## The Learning Record Store

A **Learning Record Store** (LRS) is a system that receives xAPI statements, stores them, and returns them on request. It is the memory of the arrangement: the place where all the statements from all the sims, quizzes, and activities for all the students end up. An LRS does not decide anything about instruction. It receives and answers questions such as "give me all the statements for student-4821 about unit rates."

A **learning record** is the stored collection of statements about one learner, or one activity, held in the LRS. Where a statement is one event, a learning record is the history: everything Maya did over the semester, in order.

A **learning management system** (LMS) is a software platform that schools use to administer courses: it holds course materials, enrolls students, delivers assignments, collects submissions, and keeps the gradebook. Canvas, Moodle, Schoology, and Google Classroom are examples. An LMS has traditionally been the home of learning data, but it records only what it was built to record, usually grades and submissions, and it is not designed to take in the activity of a simulation or an app outside it.

The difference between an LMS-centered design and an LRS-centered one is a difference in architecture, and the sim below, from the same companion book, shows it.

#### Diagram: LMS-Centric Versus LRS-Centric Architecture

<iframe src="https://dmccreary.github.io/learning-record-store/sims/lms-vs-lrs-architecture/main.html" width="100%" height="462" scrolling="no"></iframe>

[Run the LMS versus LRS MicroSim fullscreen](https://dmccreary.github.io/learning-record-store/sims/lms-vs-lrs-architecture/main.html){ .md-button }

<details markdown="1">
<summary>LMS-Centric versus LRS-Centric Architecture (reused MicroSim)</summary>
Type: workflow
**sim-id:** lms-vs-lrs-architecture<br/>
**Library:** Mermaid<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/learning-record-store/sims/lms-vs-lrs-architecture/<br/>
**Source Repo:** https://github.com/dmccreary/learning-record-store/tree/main/docs/sims/lms-vs-lrs-architecture<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** compare<br/>
**Learning Objective:** The learner will compare a single-hub LMS-centric architecture with a hub-and-spoke LRS-centric architecture and explain why the second scales to many kinds of learning activity.

Reused from the author's companion book on Learning Record Stores, whose page is marked implemented.
</details>

The summary is as follows. In an LMS-centric design, every activity must report through the LMS, so a simulation that the LMS does not know about leaves no trace. In an LRS-centric design, every activity, whether a simulation, a quiz, a reading page, or an app, sends statements directly to the LRS, and the LMS becomes one more source and one more consumer. The textbook, the LMS, and any analytics tool all speak xAPI.

### Worked Example: Same Activity, Two Records

Maya spends twenty minutes on the unit-rates simulation, answers three questions, gets the second one wrong twice, and then gets it right. Compare what two systems keep.

| | LMS gradebook | LRS record |
|---|---|---|
| Did she open the simulation? | Not recorded; the LMS does not know about it | Yes, one *experienced* statement with the time |
| How many questions did she attempt? | Only the final score on the quiz: 2 of 3 | Each attempt, in order: right, wrong, wrong, right |
| Where did she get stuck? | Not recorded | Question 2, two attempts, then success |
| What can a teacher learn? | "Maya scored 67 percent" | "Maya needed three tries at the division order and then got it" |

The gradebook says how she did. The record says how she got there, which is the information a teacher needs to help.

For a small pilot, the store need not be a heavy system. The author's draft design for a lightweight "LRS-Lite" keeps each student's compressed statements in a database inside the browser and synchronizes them through low-cost cloud storage, which the draft estimates at a few dollars a month for one course. That design is a plan, not a finished product, and a district at scale would use a full LRS. What matters here is the principle: a Level 3 textbook needs a store of records, and the store can be small and cheap.

!!! mascot-thinking "The page doesn't need to know you; the record does"
    ![Indigo thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice the division of labor. The page, a static file, is the same for every student and holds no data. The record store holds each student's history and nothing else. Keeping those two apart is what lets the content be free and the data be protected, because each can be treated according to what it is.

## Mastery Data and How a Textbook Uses It

**Mastery data** is evidence of which concepts a student has demonstrated they know, derived from the learning record. A statement records an event, but mastery data turns a pile of events into a judgment about a concept: has this student mastered equivalent fractions? Mastery data is the output that adaptation depends on, and it extends the formative assessment of Chapter 1 from a single quiz to a continuing, automatic process.

Estimating mastery can be simple or sophisticated. A simple rule, for example, is to count a concept as mastered when the student answered four of the last five questions on it correctly. A more sophisticated method, such as the Bayesian Knowledge Tracing used in the author's LRS design, keeps a probability for each concept and updates it after every answer. Either way, the rule must be stated in advance and applied the same way to every student, which makes it transparent and checkable.

### Worked Example: A Mastery Rule

Maya's record for three concepts after three weeks, under the rule "mastered means at least four of the last five answers correct," reads as follows. Correct answers are marked ✓ and wrong ones ✗, oldest first.

| Concept | Last five answers | Correct | Mastered? |
|---|---|---|---|
| Fractions as parts of a whole | ✓ ✓ ✓ ✓ ✗ | 4 of 5 | Yes |
| Equivalent fractions | ✗ ✗ ✓ ✗ ✓ | 2 of 5 | No |
| Whole-number multiplication and division | ✓ ✓ ✓ ✓ ✓ | 5 of 5 | Yes |

The rule is deliberately simple and has its own weaknesses: five answers is a small sample, and a lucky guess can flip a result. Transparency is the price worth paying. A teacher or parent can see exactly why the system said what it said.

### Learning Dependencies and the Learning Graph

A **learning dependency** is a relationship between two concepts in which one must be understood before the other can be learned. Equivalent fractions depend on fractions as parts of a whole; unit rates depend on ratios. This is the idea of a prerequisite concept from Chapter 2, written as a link between two concepts.

A **learning graph** is a map of concepts and their learning dependencies: each concept is a node, and each dependency an arrow from a concept to the prerequisite it depends on. Chapter 9 covers learning graphs in detail. For now what matters is what the graph lets the software do. Given a student's mastery data and the learning graph, finding the next concept to study needs no AI model: it is a lookup. The rule is that the next concepts to study are those the student has *not* mastered, and whose prerequisites the student *has* mastered. Call those concepts *ready*.

### Worked Example: Choosing Maya's Next Concept

Use the eight-concept fractions-to-proportions graph of Chapter 2. Maya's mastery data says she has mastered concepts 1, 2, and 5, and has not mastered 3, 4, 6, 7, and 8. Apply the rule to each unmastered concept.

| Concept | Prerequisites | Prerequisites all mastered? | Ready? |
|---|---|---|---|
| 3. Equivalent fractions | 1, 2 | Yes | **Yes** |
| 4. Adding and subtracting fractions with unlike denominators | 3 | No (3) | No |
| 6. Ratios | 3 | No (3) | No |
| 7. Unit rates | 5, 6 | No (6) | No |
| 8. Proportional equations | 7 | No (7) | No |

Exactly one concept is ready: equivalent fractions, which is the root gap found in Chapter 2. The software did not use a language model, a neural network, or any live AI: it used a stored record, a stated mastery rule, and a map. This is the whole answer to the parent's question about whether an AI is watching. The adaptation here is a lookup, and its output can be checked by anyone who can read the table.

#### Diagram: Class Mastery Heatmap for One Section

<iframe src="https://dmccreary.github.io/learning-record-store/sims/class-mastery-heatmap/main.html" width="100%" height="502" scrolling="no"></iframe>

[Run the Class Mastery Heatmap MicroSim fullscreen](https://dmccreary.github.io/learning-record-store/sims/class-mastery-heatmap/main.html){ .md-button }

<details markdown="1">
<summary>Class Mastery Heatmap for One Section (reused MicroSim)</summary>
Type: chart
**sim-id:** class-mastery-heatmap<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/learning-record-store/sims/class-mastery-heatmap/<br/>
**Source Repo:** https://github.com/dmccreary/learning-record-store/tree/main/docs/sims/class-mastery-heatmap<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** distinguish<br/>
**Learning Objective:** The learner will distinguish a concept-wide weakness, shown as a dark column across most students, from a student-specific weakness, shown as a dark row across most concepts, in a class mastery heatmap.

Reused from the author's companion book on Learning Record Stores, whose page is marked implemented.
</details>

### Learning Analytics

**Learning analytics** is the measurement, collection, analysis, and reporting of data about learners and their contexts, for the purpose of understanding and improving learning and the environments in which it happens. That definition comes from the Society for Learning Analytics Research. Mastery data for one student is the starting point, and analytics goes on to ask questions across many students: which concept does most of the class find hard, which students have stalled, did a new activity help?

The heatmap above shows the idea. Each row is a student and each column a concept, and darker cells mean lower mastery. A dark *column* means a concept-wide weakness: most students stumbled there, so the right response is a whole-class reteach or a better explanation. A dark *row* means a student-specific weakness: one student is struggling across many concepts, so the response is individual support. The same data supports opposite conclusions, and a teacher who reads only an average would miss the difference.

!!! mascot-tip "Read rows and columns before averages"
    ![Indigo giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    When you look at any class dashboard, ask two questions before you look at the average: "Is there a dark column?" and "Is there a dark row?" A column points to your teaching; a row points to a student. The average blends them and hides both.

## Data Portability and Student-Controlled Data

A system that holds a child's learning history carries responsibilities. This section names the design principles that decide whether the arrangement serves families or merely observes them.

**Data portability** is the ability to move one's data from one system to another in a standard format without losing meaning. For a student it means that a mastery record built in one school, one textbook, or one product can follow them to the next. Without portability, every change of school or vendor starts the child back at "unknown," and the records are held hostage by whoever stores them. The European Union's General Data Protection Regulation (GDPR) gives individuals a legal right to data portability, and xAPI helps make it practical, since every compliant system reads the same statements.

**Student-controlled data** is a design principle under which the student, and for a minor the family, decide what is collected, who can see it, and what happens to it, and the school and vendors act as custodians, not owners. The principle has five parts:

1. **Minimum necessary.** Collect only what instruction needs.
2. **See it.** The student and family can view their own record at any time.
3. **Take it.** They can export it in a standard format, which is portability.
4. **Limit it.** Only people with an educational need, such as the student's own teachers, can see identifiable records. Outside parties see them only under a written agreement for a stated purpose.
5. **Remove it.** The record can be deleted when it is no longer needed, within the law.

In the United States, the Family Educational Rights and Privacy Act (FERPA) already gives parents and eligible students the right to inspect education records and to ask for corrections, and it limits disclosure to others. Chapter 10 covers FERPA, COPPA, and GDPR in detail. The principles above are design commitments that go beyond the minimum.

### Worked Example: Answering Ms. Reyes

Ms. Okafor answers the parent's two questions with a one-page handout.

| Ms. Reyes asks | The answer |
|---|---|
| "How does it know?" | The pages report what Maya does, as short xAPI statements, to a record store. A stated rule turns the record into a mastery estimate, and the learning graph shows which concept is ready next. No live AI model is involved |
| "What is in the record?" | A code, not her name, plus the time, the activity, and whether each answer was right. No camera, no microphone, no location |
| "Who sees it?" | Maya's own teachers, Maya, and the family. Outside parties only under a written agreement, and never for advertising |
| "Can I get a copy?" | Yes, in a standard format, and the family can ask for it to be deleted when Maya leaves |
| "Where does it live?" | In the district's record store, not in the vendor's own systems |

The handout works because it states what the system does, in order, and commits to specifics. A promise that "your data is safe" would not have.

#### Diagram: Who May See This Record?

<details markdown="1">
<summary>Who May See This Record?</summary>
Type: microsim
**sim-id:** who-may-see-this-record<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge whether each of eight requests to see or use a student's learning record should be allowed, allowed only with an agreement and family notice, or not allowed, correctly judging at least seven of eight on the first attempt.

**Template:** https://github.com/dmccreary/health-education/tree/main/docs/sims/trusted-source-sorter<br/>

**Prerequisites:** learning record, student-controlled data and its five parts, data portability (all defined in the section "Data Portability and Student-Controlled Data" above).

**Evidence of Mastery:** For each of 8 requests, the learner chooses one of three responses and submits it. A response is correct when it matches the "Correct response" column in Content. Mastery is 7 of 8 correct on the first attempt. Reading the five principles is exploration, not evidence.

**Misconceptions:** (1) Anyone at the school may see any student's record. (2) A vendor may use records for any purpose once it has them. (3) A family may only look at the record, never take a copy.

**Instructional Rationale:** Judging a request requires applying the principles of minimum necessary access and stated purpose to a concrete case. Cases from teachers, parents, vendors, researchers, and advertisers show that the same record deserves different answers for different requesters and purposes.

**Content:**

Three responses, shown for every request:

| Response | Meaning shown |
|---|---|
| Allow | A person with an educational need, or the student's own family, may see or take the record |
| Allow only with an agreement and family notice | An outside party may use the record only under a written agreement that states the purpose, with the family notified |
| Do not allow | The use has no educational need or goes beyond the stated purpose |

Eight requests:

| # | Request shown to the learner | Correct response | Why (shown as feedback) |
|---|---|---|---|
| 1 | A teacher views the mastery records of the students in her own class to plan next week. | Allow | The teacher has a direct educational need for her own students. |
| 2 | A teacher with no connection to a class looks up the records of its students out of curiosity. | Do not allow | There is no educational need, so access is not justified. |
| 3 | A parent asks to see their own child's learning record. | Allow | Parents have the right to inspect their child's education records. |
| 4 | A student moving to a new school asks for a copy of their record in a standard format. | Allow | Data portability lets the record follow the student. |
| 5 | The software vendor wants to use identifiable student records to train a new commercial product. | Do not allow | The use goes beyond providing the service the school bought. |
| 6 | A university team, working under a district-approved study, asks for class-level summaries with no student names. | Allow only with an agreement and family notice | An outside party may use data only under a written agreement stating the purpose. |
| 7 | An advertiser asks for a list of students who are struggling in math. | Do not allow | Student records must never be used for advertising. |
| 8 | A district-approved tutoring partner asks to see one student's fractions mastery to prepare a session. | Allow only with an agreement and family notice | An outside party with an educational purpose needs an agreement and notice. |

**Provenance:** The responses follow the five principles in the chapter section "Data Portability and Student-Controlled Data," which are recommended design practice, not a statement of any one law. The requests are illustrative, written for this chapter, and the sim must say that legal duties are covered in Chapter 10.

**Rules:** Each request has exactly one correct response, given in Content. A request is scored on its first submitted response only. The score counts first-attempt correct responses out of 8. Mastery is a score >= 7.

**Learner Activity:**

1. The learner sees one request at a time and the three responses.
2. The learner chooses a response and submits it. The sim marks it correct or incorrect and shows the feedback text.
3. If incorrect, the learner may choose again; the second attempt does not change the score. After the second attempt, the correct response and reason are shown.
4. After all 8 requests, the sim shows the score and lists misjudged requests with their correct responses.
5. The learner should notice that three requests are allowed, two need an agreement, and three are refused, and that the requester's job title alone never decided the answer.

**Feedback:** 8 requests, shuffled once per session, two attempts each. Correct: "Correct: [response]. [Why text]." Incorrect: "Not quite. [Why text for the correct answer, without naming the response]." After the second attempt the correct response is revealed and the request counts as missed. A running score "First-try correct: n of 8" is shown. Final message for a score >= 7: "You can judge who should see a student's record." For a score < 7: "Review the five principles and try again; the requests will be reshuffled."

**Starting State:** Request 1 of the shuffled order is shown with the three responses, the score "First-try correct: 0 of 8," and the prompt "Should this request be allowed?"

**Chapter Anchors:** The chapter lists five principles: minimum necessary, see it, take it, limit it, remove it. The chapter states that outside parties may see identifiable records only under a written agreement for a stated purpose, and never for advertising. The mastery bar is 7 of 8.
</details>

!!! mascot-warning "Data you can't delete is a liability"
    ![Indigo warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is collecting everything "in case it's useful later." Every extra field raises the damage if the store is breached and the work of protecting it. Before collecting any item, ask what decision it will inform, and plan when it will be deleted.

## Putting It Together: Adapting Without a Live AI Model

The chapter's pieces now make a complete loop, and it is the loop at the heart of the book's low-cost design.

1. A **static website** serves the same free pages to every student, with no student data on the server.
2. In the student's **web browser**, **MicroSims** and quizzes report what the student does as **xAPI statements**, each an *actor, verb, object* sentence.
3. A **Learning Record Store** keeps each student's **learning record**.
4. A stated rule turns the record into **mastery data**.
5. A **learning graph** of **learning dependencies** tells the software which concept is *ready* next.
6. **Learning analytics** shows the teacher which concepts and which students need attention.
7. Throughout, the data is **student-controlled** and **portable**.

No step requires a live large language model. AI may have helped *write* the content, once, as Chapter 7 explained, but at the time a student uses the textbook the work is lookups, rules, and a record. That is why the cost per student at Level 3 in the Chapter 7 model is modest and why the privacy risks, while real, are limited to the record store, which is a bounded and defensible thing to protect.

The story has both sides, as always. The benefit: a textbook that moves each student at their own pace, shows Maya the exact missing prerequisite, and costs a few dollars a year per student. The risks: a permanent record of a child's mistakes, the temptation to collect more than needed, a breach, and the danger of treating a simple mastery rule as truth when it is a rough estimate. The response is built into the design: collect the minimum, keep the data under the family's control, state the rules in public, and treat the estimate as a prompt for a human to look, not a verdict.

## Key Takeaways

- A **web browser** runs the pages and the code; a **static website** serves fixed files with no student data on the server; a **MicroSim** runs entirely in the browser.
- **xAPI** is a standard format for describing learning events, and an **xAPI statement** is one event written as **actor, verb, object**, with an optional result and context.
- A **Learning Record Store** receives and stores statements; a **learning record** is the stored history for one learner; an LRS-centered design lets any activity report, where an **LMS**-centered design records only what the LMS sees.
- **Mastery data** turns events into a judgment about a concept using a stated rule; with a **learning graph** of **learning dependencies**, finding the next concept is a lookup: not mastered, with all prerequisites mastered.
- **Learning analytics** reads across students: a dark column points at the teaching, a dark row at a student.
- **Data portability** lets a record follow the student, and **student-controlled data** means minimum necessary, see it, take it, limit it, and remove it.
- A Level 3 textbook can adapt with no live AI model, which keeps cost low and the privacy question focused on one bounded store.

!!! mascot-celebration "You can explain how it knows"
    ![Indigo celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You just followed a click all the way to a mastery estimate and a next-lesson choice, and you can say exactly what is recorded, where it lives, and who may see it. That's a clear answer for a worried parent. Chapter 9 looks at learning graphs and the standards that let these tools work together. One step at a time, together.
