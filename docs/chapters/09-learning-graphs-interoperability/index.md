---
title: "Learning Graphs, Interoperability Standards, and Access at Scale"
description: "How a learning graph chooses a student's next concept, which standards let educational tools work together, and what it takes to deliver generate-once content to every student, including those with limited devices and connectivity."
generated_by: claude skill chapter-content-generator
date: "2026-11-04 08:26:32"
version: 1.11
---

# Learning Graphs, Interoperability Standards, and Access at Scale

## Summary

This chapter covers learning graphs as directed acyclic graphs of concept nodes, the interoperability standards (IMS Global, IEEE) that let these pieces work across products, and the practical requirements of delivering content at scale: device access, connectivity, offline access, and a "generate once, serve many" delivery model. Readers finish able to explain how a learning graph selects a student's next concept and what it takes to deliver that content to every student affordably.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Device Access | 18 |
| Interoperability Standards | 17 |
| Concept Node | 13 |
| Directed Acyclic Graph | 13 |
| Web Page Hosting | 12 |
| Foundational Concept | 12 |
| Learning Path | 12 |
| Generate Once Serve Many | 11 |
| Browser-Based Simulation | 10 |
| Interactive Visualization | 10 |
| IMS Global Standards | 8 |
| IEEE Learning Standards | 8 |
| Internet Connectivity | 8 |
| Student Progress Dashboard | 6 |
| Offline Access | 4 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: The Building Blocks of Schools, Students, and Learning](../01-building-blocks-schools-students/index.md)
- [Chapter 7: Content Economics and Open Educational Resources](../07-content-economics-open-educational/index.md)
- [Chapter 8: Tracking Mastery: xAPI, Learning Record Stores, and MicroSims](../08-tracking-mastery-xapi-learning-record/index.md)

---

## "Will It Work at Fairview?"

The district's technology director, Ms. Singh, has read the plan from the last few chapters and has a practical worry. "This all sounds wonderful for Lincoln Middle," she says. "But Fairview Elementary is forty minutes from the nearest town. Its internet is slow, half its devices are older than the students, and the district's tools all come from different vendors that don't talk to each other. Will any of this work at Fairview?"

Her question divides into two. The first is about *structure*: how does the software decide what a student should learn next, and how do products from different makers share the information they need? The second is about *delivery*: how does a free, interactive textbook actually reach a student on an old device with a poor connection?

This chapter answers both. It explains the learning graph that drives the "what next" decision, the standards that let separate tools cooperate, and the delivery model that keeps cost and bandwidth low enough for a school like Fairview. The story it tells has both sides, since a design that looks wonderful on a fast network in a well-funded school can quietly leave the schools that most need it behind.

!!! mascot-welcome "Design for Fairview first"
    ![Indigo waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    This chapter shows how a textbook chooses each student's next step from a map of concepts, and how the same design can reach a school with slow internet and old devices. You'll leave able to ask the questions that decide whether an AI-native school is for everyone or only for the best-connected. Let's find the balance between ambitious design and access that actually reaches every child.

## Learning Graphs: Maps of Concepts

Chapter 8 introduced the learning graph as a map of concepts and their dependencies, and used it to pick Maya's next concept. This section gives the graph its proper vocabulary.

A **concept node** is one concept in a learning graph, the unit of knowledge the graph tracks. A node has an identifier, a name such as "Equivalent Fractions," and sometimes extra attributes, like a category or an importance score. Every node stands for something a student can learn and that can be checked. This book's own learning graph has 532 concept nodes, from "Education" to "A/B Testing," and each chapter covers a group of them.

A **learning dependency**, as in Chapter 8, links two nodes: concept A depends on concept B when B must be understood before A can be learned. In this book's graph every dependency is written as an arrow from the dependent concept to its prerequisite. The book's graph has 961 of them.

A **foundational concept** is a concept with no prerequisites in the graph: the place where learning on a topic can begin. Foundational concepts are the roots from which everything else grows. This book's graph has 14, including Education, Student, Teacher, Learning, Artificial Intelligence, Exponential Growth, and Web Browser. A *terminal* concept is the opposite: one that nothing else depends on, so it ends a chain, such as a capstone skill. The graph has 28.

A **directed acyclic graph** (DAG) is a graph whose arrows point in one direction (directed) and that never leads back to where it started (acyclic, meaning free of cycles). A learning graph must be a DAG, for a logical reason: if concept A required concept B and B also required A, no student could learn either, because each would have to be learned first. Checking that a learning graph has no cycles is one of the first quality tests, and this book's graph passes it. The DAG property has a useful consequence: the concepts can always be put into an order in which every concept comes after all of its prerequisites, which is the basis of a learning path.

A **learning path** is an ordered sequence of concepts that takes a student from where they are to a goal, with every concept coming after its prerequisites. A path can be generated automatically from the graph: start with the goal, collect every concept it depends on, directly or indirectly, remove the ones the student has already mastered, and list what is left in an order that respects the arrows. Because the path is built from the student's mastery data (Chapter 8), two students with the same goal get different paths.

### Worked Example: A Path Through This Book's Own Graph

Take a goal from this book: the concept **Five-Month Doubling**, from Chapter 4. Following its dependencies back through the book's learning graph, the concept rests on 15 other concepts, arranged in seven layers, where each layer's concepts depend only on layers above it.

| Layer | Concepts in the layer | Depends on |
|---|---|---|
| 1 | Artificial Intelligence; Exponential Growth | Nothing (both foundational) |
| 2 | AI Capability; Machine Learning; Doubling Time | Layer 1 |
| 3 | AI Benchmark; Large Language Model | Layers 1 and 2 |
| 4 | METR; AI Agent | Layers 2 and 3 |
| 5 | Benchmark Task Suite; Task Horizon | Layers 2 to 4 |
| 6 | 50 Percent Time Horizon; Human Working Time; Long-Running Task; Task Success Rate | Layer 5 and AI Agent |
| 7 | Five-Month Doubling (the goal) | Layer 6, Layer 5, and Doubling Time |

A student who has never studied any of it needs all 16 concepts, in an order that respects the layers. A student who has already mastered Artificial Intelligence, Exponential Growth, Doubling Time, and Machine Learning skips four and begins with AI Capability. The same graph produces both paths with no judgment call and no AI model. The longest chain in the whole book's graph is much longer: 26 concepts, running from Artificial Intelligence to A/B Testing, which means that a student aiming at the book's final skill is walking through the book's own argument from the first idea to the last.

The book's own graph viewer, embedded below, lets you explore all 532 concepts. Search for a concept, filter by category, and follow the arrows.

#### Diagram: The AI-Native Schools Learning Graph Viewer

<iframe src="../../sims/graph-viewer/main.html" width="100%" height="600px" frameborder="0"></iframe>

[Run the Learning Graph Viewer fullscreen](../../sims/graph-viewer/main.html){ .md-button }

<details markdown="1">
<summary>Learning Graph Viewer (reused MicroSim)</summary>
Type: graph-model
**sim-id:** graph-viewer<br/>
**Library:** vis-network<br/>
**Status:** Reused<br/>
**Source:** ../../sims/graph-viewer/<br/>
**Source Repo:** https://github.com/dmccreary/ai-native-schools/tree/main/docs/sims/graph-viewer<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** explain<br/>
**Learning Objective:** The learner will explain how a concept depends on other concepts by selecting a concept in the 532-concept learning graph and following its arrows to its prerequisites.

Reused from this book's own sims directory, which marks it as built.
</details>

!!! mascot-thinking "The arrow points to what you need first"
    ![Indigo thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice the direction. In this book's graph every arrow runs from a concept to the one it depends on, so following arrows takes you backward to what must come first. A learning path is those arrows read in reverse. Keep the direction straight and the rest of the graph is easy to read.

### Worked Example: Finding the Ready Concepts

Chapter 8 introduced the rule for picking the next concept: a concept is *ready* when the student has not mastered it and has mastered all of its direct prerequisites. Apply it to the sixteen concepts above. Suppose a student has mastered Artificial Intelligence, Exponential Growth, AI Capability, Machine Learning, and Doubling Time.

| Unmastered concept | Direct prerequisites | All mastered? | Ready? |
|---|---|---|---|
| AI Benchmark | AI Capability | Yes | Yes |
| Large Language Model | Machine Learning | Yes | Yes |
| METR | AI Benchmark | No | No |
| AI Agent | Large Language Model | No | No |
| Task Horizon | METR, AI Capability | No (METR) | No |

Two concepts are ready: AI Benchmark and Large Language Model. The student could begin with either, and the software could offer both and let the student choose, which keeps the student's agency (Chapter 1) while the graph guarantees the choice is valid. The sim below practices the rule.

#### Diagram: Ready Concepts Finder

<iframe src="../../sims/ready-concepts-finder/main.html" height="724px" width="100%" scrolling="no"></iframe>

[Run the Ready Concepts Finder MicroSim Fullscreen](../../sims/ready-concepts-finder/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>Ready Concepts Finder</summary>
Type: graph-model
**sim-id:** ready-concepts-finder<br/>
**Library:** vis-network<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** solve<br/>
**Learning Objective:** The learner will solve six problems by selecting exactly the set of ready concepts in a 16-concept learning graph for a given set of mastered concepts, correctly answering at least five of six on the first attempt.

**Template:** https://github.com/dmccreary/automating-instructional-design/tree/main/docs/sims/learning-dependency-network<br/>

**Prerequisites:** learning dependency, foundational concept, directed acyclic graph, learning path, the ready rule (all defined in the section "Learning Graphs: Maps of Concepts" above).

**Evidence of Mastery:** For each of 6 problems, the learner selects the set of nodes they judge to be ready and submits it. A selection is correct when it equals the "Ready set" in Content exactly, with no missing and no extra nodes. Mastery is 5 of 6 correct on the first attempt. Selecting a node to read its description is exploration, not evidence.

**Misconceptions:** (1) A concept is ready as soon as one prerequisite is mastered. (2) A concept already mastered can still be ready. (3) Only one concept can be ready at a time.

**Instructional Rationale:** Solving a ready-set problem applies the rule step by step: for each unmastered node, check every direct prerequisite. Problems with an empty mastered set, several ready nodes, and a single ready node show the range of cases.

**Content:**

Sixteen concepts taken from this book's learning graph (provenance below), with their direct prerequisites. An arrow from a concept points to its prerequisites.

| Concept | Direct prerequisites |
|---|---|
| Artificial Intelligence | none |
| Exponential Growth | none |
| AI Capability | Artificial Intelligence |
| Machine Learning | Artificial Intelligence |
| Doubling Time | Exponential Growth |
| AI Benchmark | AI Capability |
| Large Language Model | Machine Learning |
| METR | AI Benchmark |
| AI Agent | Large Language Model |
| Benchmark Task Suite | METR, AI Benchmark |
| Task Horizon | METR, AI Capability |
| 50 Percent Time Horizon | Task Horizon |
| Human Working Time | Task Horizon |
| Long-Running Task | Task Horizon, AI Agent |
| Task Success Rate | Task Horizon |
| Five-Month Doubling | Task Horizon, 50 Percent Time Horizon, Human Working Time, Benchmark Task Suite, Long-Running Task, Task Success Rate, Doubling Time |

The ready rule: a concept is ready when it is not mastered and every one of its direct prerequisites is mastered.

Six problems:

| # | Mastered concepts | Ready set | Why (shown as feedback) |
|---|---|---|---|
| 1 | none | Artificial Intelligence; Exponential Growth | Only concepts with no prerequisites can be ready when nothing is mastered. |
| 2 | Artificial Intelligence; Exponential Growth | AI Capability; Machine Learning; Doubling Time | Each depends only on a mastered concept. |
| 3 | Artificial Intelligence; Exponential Growth; AI Capability; Machine Learning; Doubling Time | AI Benchmark; Large Language Model | Each depends only on mastered concepts; METR still needs AI Benchmark. |
| 4 | Artificial Intelligence; Exponential Growth; AI Capability; Machine Learning; Doubling Time; AI Benchmark; Large Language Model; METR; AI Agent | Benchmark Task Suite; Task Horizon | Both depend only on mastered concepts; Long-Running Task still needs Task Horizon. |
| 5 | All nine from problem 4, plus Benchmark Task Suite and Task Horizon | 50 Percent Time Horizon; Human Working Time; Long-Running Task; Task Success Rate | All four depend only on Task Horizon, and on AI Agent for the Long-Running Task. |
| 6 | All fifteen concepts except Five-Month Doubling | Five-Month Doubling | It is the only unmastered concept, and all its prerequisites are mastered. |

**Provenance:** The sixteen concepts and their dependencies are copied from docs/learning-graph/learning-graph.json in this repository, restricted to Five-Month Doubling and everything it depends on. The sim must copy the values into its own folder, not read the file at run time.

**Rules:** The ready set for a problem is computed by the ready rule from the table. Each problem has exactly one correct ready set. A problem is scored on its first submitted set only. The score counts first-attempt correct sets out of 6. Mastery is a score >= 5. Mastered nodes are shown as already known and cannot be selected.

**Learner Activity:**

1. The learner sees the graph with the mastered concepts marked, and the problem number.
2. The learner selects every concept they judge to be ready and submits.
3. The sim marks the answer and highlights the correct ready concepts and the prerequisites that make them ready.
4. If incorrect, the learner may select again; the second attempt does not change the score. After the second attempt, the correct set and reason are shown.
5. After all 6 problems, the sim shows the score.
6. The learner should notice that the number of ready concepts rises from two to four and then falls to one as the student nears the goal.

**Feedback:** 6 problems, fixed order, two attempts each. Correct: "Correct. [Why text]." Incorrect with a missing node: "At least one ready concept is missing. Check every unmastered concept's prerequisites." Incorrect with an extra node: "At least one selected concept still has an unmastered prerequisite." After the second wrong attempt the correct set is shown with the Why text. Score "n of 6" is shown at the end.

**Starting State:** The full graph is shown with problem 1, no concepts mastered, and the prompt "Which concepts could this student start on?"

**Chapter Anchors:** The chapter's worked examples use the same sixteen concepts: seven layers, 15 prerequisites of Five-Month Doubling, and the ready set of AI Benchmark and Large Language Model for the mastered set of problem 3. The mastery bar is 5 of 6.
</details>

## Interoperability Standards

A learning graph, a Learning Record Store, and a textbook are useful only if they can exchange information with the other tools a school uses: the learning management system, the student information system that holds rosters and grades, and the assessment tools. **Interoperability standards** are agreed technical specifications that let separate software products exchange data and work together without custom, one-off integrations. They are the electrical sockets of educational software: any compliant plug fits any compliant outlet.

Interoperability matters for three reasons. It prevents *lock-in*, in which a school cannot leave a vendor because its data and workflows are tied to proprietary formats. It lowers cost, since a tool built once to a standard works in every compliant system. And it lets small and open projects take part: a free Level 2 textbook that follows the standards can be dropped into any school's learning management system.

Two organizations produce most of the standards that matter here.

**IMS Global standards** are the specifications of the IMS Global Learning Consortium, a nonprofit of schools, universities, and technology companies, which renamed itself 1EdTech in 2022. Its best-known standards are these:

- **Learning Tools Interoperability (LTI)** lets an outside tool plug into a learning management system, with single sign-on and the ability to return grades.
- **OneRoster** exchanges class rosters, enrollments, and grades between a school's student information system and learning tools.
- **Question and Test Interoperability (QTI)** exchanges quiz questions and tests between systems.
- **Common Cartridge** packages course content so that it can be imported into any compliant learning management system.
- **Caliper Analytics** describes learning events, in the same spirit as xAPI.

**IEEE learning standards** are the specifications of the Institute of Electrical and Electronics Engineers, whose Learning Technology Standards Committee maintains standards for learning technology. These include xAPI, now an IEEE standard (Chapter 8), and the Learning Object Metadata standard, which defines how to describe a learning resource, such as its title, subject, level, and rights, so that it can be found and reused.

| Standard | Organization | What it lets tools do |
|---|---|---|
| LTI | IMS Global (1EdTech) | Plug into an LMS with single sign-on and return grades |
| OneRoster | IMS Global (1EdTech) | Exchange rosters and grades with the student information system |
| QTI | IMS Global (1EdTech) | Move quiz questions between systems |
| Common Cartridge | IMS Global (1EdTech) | Package content for import into an LMS |
| Caliper Analytics | IMS Global (1EdTech) | Report learning events for analytics |
| xAPI | IEEE (originating with ADL) | Send learning statements to a Learning Record Store |
| Learning Object Metadata | IEEE | Describe a learning resource so it can be found and reused |

### Worked Example: Fairview's Tool Tangle

Fairview Elementary uses four tools from four vendors: a reading app, a math practice site, a quiz maker, and the district's learning management system. Teachers re-type class rosters into each one, and the principal cannot see a student's work across the tools.

| Problem | Standard that addresses it | Result |
|---|---|---|
| Rosters typed into four tools | OneRoster | The district's roster system feeds all four tools automatically |
| A separate login for each tool | LTI | The tools open from inside the LMS with one sign-on |
| Quizzes trapped in the quiz maker | QTI | Questions move to another tool when needed |
| No view of work across tools | xAPI | All four tools send statements to one record store |
| A free textbook that cannot join the LMS | LTI, Common Cartridge | The textbook opens from the LMS like any other tool |

The district does not need to build any integration itself. It needs to require the standards in its purchasing criteria, which is the subject of Chapter 21. A vendor that supports none of them is a lock-in risk, whatever its brochure says.

!!! mascot-tip "Ask for the standards by name"
    ![Indigo giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    When a vendor says "it integrates with everything," ask: "Which standards? LTI, OneRoster, xAPI?" A vendor who supports them will say so in one sentence, and one who doesn't will talk about "custom integrations," which usually means extra cost and lock-in.

## Delivering Content at Scale

Now the second half of Ms. Singh's question: how does the content reach every student?

### Generate Once, Serve Many

**Generate once, serve many** is the delivery model at the center of the book's low-cost design. AI is used to *create* the content one time, with human review, as Chapter 7 described, and the finished content is then served to every student as ordinary web pages. The expensive step, creation, happens once. The cheap step, serving, happens a million times. The alternative, "generate for each student," would call an AI model every time a student asks for a lesson, so the cost grows with every student and every request.

**Web page hosting** is the service that stores a website's files and delivers them to browsers on request. For a static site it is among the cheapest services in computing: the host simply sends stored files. Many hosts, including GitHub Pages, which serves this book, offer static hosting at no charge for public projects, within generous limits, and commercial hosts charge pennies. A *content delivery network* can copy the files to servers close to each school to make them load faster.

### Worked Example: Once Versus Every Time

Use the Chapter 7 illustration: a 20-chapter interactive textbook costs about \$22,400 to produce with AI assistance and human review. Compare two ways to serve a school year to N students. In the first, the book is generated once and served as static pages, so the cost is the one-time \$22,400 plus almost nothing to serve it. In the second, an AI model generates each student's lessons live, which uses about 3.6 million tokens a student per year (the Chapter 4 usage), at the illustrative \$2.00 per million tokens, or \$7.20 per student per year.

| Students N | Generate once: cost per student | Generate once: total | Live generation: total per year |
|---|---|---|---|
| 100 | \$224.00 | \$22,400 | \$720 |
| 1,000 | \$22.40 | \$22,400 | \$7,200 |
| 12,000 | \$1.87 | \$22,400 | \$86,400 |
| 1,000,000 | \$0.02 | \$22,400 | \$7,200,000 |

For a very small group, live generation is cheaper, since nothing has to be produced in advance. The lines cross at about \( 22{,}400 / 7.20 \approx 3{,}100 \) students. Beyond that, generate-once wins, and at a million students the one-time cost is about one three-hundred-twentieth of the live cost. The comparison understates the first approach's advantage, because the one-time content can serve students for several years, and it overstates it in one respect: live generation can personalize far more than a fixed book can. The right choice depends on what you need, and this book's design uses generate-once for the bulk of content and reserves live AI for the places where it adds the most, as Chapter 6's levels suggested.

#### Diagram: Generate Once Versus Generate for Each Student

<iframe src="../../sims/generate-once-vs-live-cost/main.html" height="654px" width="100%" scrolling="no"></iframe>

[Run the Generate Once Versus Generate for Each Student MicroSim Fullscreen](../../sims/generate-once-vs-live-cost/main.html){ .md-button .md-button--primary }

<details markdown="1">
<summary>Generate Once Versus Generate for Each Student</summary>
Type: chart
**sim-id:** generate-once-vs-live-cost<br/>
**Library:** Chart.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** compare<br/>
**Learning Objective:** The learner will compare the total yearly cost of generating content once and serving it to all students with the cost of generating it live for each student, and determine the number of students at which the two are equal, to within 100 students.

**Prerequisites:** generate once serve many, web page hosting, AI inference cost (defined in this chapter and Chapter 4).

**Evidence of Mastery:** Before the controls unlock, the learner commits three answers: (Q1) the generate-once cost per student for 12,000 students; (Q2) the live-generation total per year for 12,000 students; (Q3) the number of students at which the two totals are equal. An answer is correct when it is within the tolerance in Content. Mastery is 3 of 3 correct. Exploring the controls afterward is not evidence.

**Misconceptions:** (1) Live generation is always more expensive. (2) Serving static pages costs as much as generating them. (3) The cost of generate-once grows with the number of students.

**Instructional Rationale:** Comparing a fixed cost with a per-student cost requires finding where the two lines cross. Calculating a few points first and then locating the break-even makes the structure of the argument clear.

**Content:**

Cost model: generate-once total = production cost (one-time) + serving cost (zero in this model). Live-generation total = tokens per student per year × price per million tokens ÷ 1,000,000 × number of students.

Controls:

| Input | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Production cost of the book | 5,000 | 100,000 | 100 | 22,400 | dollars |
| Tokens per student per year | 1,000,000 | 10,000,000 | 100,000 | 3,600,000 | tokens |
| Price per million tokens | 4 choices: 0.07, 0.20, 2.00, 20.00 | | | 2.00 | dollars |
| Number of students | 100 | 1,000,000 | 100 | 12,000 | students |

Check values at the chapter's settings (production cost \$22,400, 3.6 million tokens, \$2.00 per million): live cost per student per year \$7.20.

| Students | Generate-once cost per student | Generate-once total | Live-generation total |
|---|---|---|---|
| 100 | \$224.00 | \$22,400 | \$720 |
| 1,000 | \$22.40 | \$22,400 | \$7,200 |
| 12,000 | \$1.87 | \$22,400 | \$86,400 |
| 1,000,000 | \$0.02 | \$22,400 | \$7,200,000 |

Answers: Q1 = \$1.87 (±\$0.01); Q2 = \$86,400 (±\$100); Q3 = about 3,100 students (±100).

**Provenance:** The \$22,400 production cost is the illustrative Chapter 7 value for a 20-chapter AI-assisted book. The token usage and \$2.00 price are the illustrative Chapter 4 and Chapter 7 values. The sim must label all of them "Illustrative."

**Rules:** Generate-once cost per student = production cost ÷ students. Live total = students × tokens ÷ 1,000,000 × price. Break-even students = production cost ÷ live cost per student.

**Learner Activity:**

1. The learner answers Q1, Q2, and Q3 and submits them.
2. The sim checks the answers and unlocks the controls.
3. The learner changes the price, the tokens, and the number of students. Two lines and the break-even point update at once.
4. The learner should notice that lowering the price moves the break-even number of students up, and that the generate-once line is flat.

**Feedback:** Three questions, fixed order, two attempts each. Correct: "Correct: [value]. [Working text]." Incorrect: "Not quite. Check the units: the price is per million tokens." After the second wrong attempt the value and working are shown. A score "n of 3" is shown.

**Starting State:** The generate-once line and the live-generation line are drawn for the default settings, the question is hidden, and the prompt reads "At how many students does generating once become cheaper?"

**Chapter Anchors:** The chapter's table uses a production cost of \$22,400, 3.6 million tokens, a \$2.00 price, \$7.20 per student, and break-even at about 3,100 students, with totals of \$86,400 at 12,000 students and \$7,200,000 at 1,000,000.
</details>

## Reaching Fairview: Devices, Connectivity, and Offline Access

A delivery model that is cheap on paper still has to work in a school with old computers and slow internet. Three terms describe what has to be true.

**Device access** is whether each student has a working device with a browser and a screen large enough to use, at school and, where homework is involved, at home. A device is the largest cost in digital learning (Chapter 7), and an uneven spread of devices is among the most important equity gaps in education. Pew Research surveys around 2018 found that roughly one in six U.S. teenagers said they could not always complete homework because they lacked a reliable computer or internet connection. During the 2020 school closures that gap became visible nationwide, and federal programs such as the Emergency Connectivity Fund responded with billions of dollars for devices and connections.

**Internet connectivity** is the quality and capacity of a school's and students' connection to the internet: its speed (bandwidth), its reliability, and its cost. Static pages and browser-based simulations are lighter than video or live AI chat, which keeps them workable on slower connections. But a rural school's connection is shared by every device at once, and bandwidth that is fine for one student may not be fine for twenty-eight.

**Offline access** is the ability to use content without any connection at all. A static website is made of ordinary files, so a copy can be saved to a laptop or a USB drive, or the browser can store the pages it has already loaded, and students can keep working with the network down. Live AI chat cannot work offline, since it needs a connection to a remote model. This makes the choice of level a connectivity decision: Levels 1 and 2 are available offline, Level 3 can buffer records and send them later, and Levels 4 and 5 need a live connection.

**Browser-based simulation** is a simulation, such as a MicroSim, that runs inside the student's browser, using the device's own processor, with nothing to install and no server doing the computation. That is why it works on a basic school laptop or Chromebook, costs nothing per use, and exposes no student data: the calculation happens on the student's own device. The drawback is that it depends on the device being capable enough.

An **interactive visualization** is a graphic that the learner can manipulate to explore data or a model, by hovering, filtering, zooming, or changing a setting, rather than merely looking at it. The graph viewer earlier in this chapter is one: you can search for a concept, filter categories, and follow its arrows. Interactive visualizations help most when the data is too large or too connected to understand from a static picture.

### Worked Example: A Slow Connection and an Offline Copy

Fairview Elementary shares a 1.5 megabit-per-second connection among its devices. Suppose a chapter page with its simulations is about 3 megabytes (an illustrative size). Converting units, 1.5 megabits per second is \( 1.5 / 8 = 0.1875 \) megabytes per second.

| Situation | Calculation | Time |
|---|---|---|
| One student opens the page | 3 MB ÷ 0.1875 MB/s | about 16 seconds |
| Twenty-eight students open it together | 28 × 3 MB ÷ 0.1875 MB/s | about 448 seconds, or 7.5 minutes |
| The teacher downloaded the page to a shared folder the night before | Read from local storage | under a second |
| The whole 23-chapter book at about 5 MB a chapter | 23 × 5 MB = 115 MB, which fits easily on a USB stick | Copied once |

The point of the table is that the *design* decides the experience. A static, offline-capable textbook turns a seven-minute wait into no wait at all, and the same is not true of a design that needs a fresh network round-trip for every click. A school with a poor connection should ask every vendor: "What works offline? How much data does a lesson download? Can the content be cached on the school network?"

!!! mascot-warning "'Works on the web' is not 'works at Fairview'"
    ![Indigo warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is testing a product on the best connection in the district and calling it ready. Instead, test on the worst: an old device, a shared slow link, and no connection at all. If it fails there, it will widen the equity gap the district says it wants to close.

## Student Progress Dashboards

A **student progress dashboard** is a display of what a student has done and mastered, shown to the student, the teacher, and the family. It is the visible output of the whole chain of Chapter 8: statements become mastery data, mastery data joins the learning graph, and the dashboard presents the result in a form a person can act on. A good dashboard has a different job for each audience: it shows the *student* what they have mastered and what is ready next; it shows the *teacher* which concepts and which students need attention; and it shows the *family* progress in plain language.

Dashboards can help or harm, depending on design. A dashboard that ranks students against each other can discourage the ones who are behind. One that shows a long list of every click can drown the reader in noise. A well-designed dashboard shows a student their own progress, not their place in a ranking, and always shows a next step.

### Worked Example: Maya's Dashboard

A good progress dashboard for Maya after the Lincoln Middle pilot might show the following.

| Part | What it shows |
|---|---|
| Goal | "Ready for the March 12 unit test" |
| Mastered | Fractions as parts of a whole; Whole-number multiplication and division; Multiplying and dividing fractions |
| Ready next | Equivalent fractions |
| In progress | Ratios (waiting on equivalent fractions) |
| This week | 4 sessions, 1 hour 10 minutes |
| A note from your teacher | "Try the tiles simulation first, then the check." |

It contains no comparison with classmates, no points total, and no grade. It tells Maya what she knows, what to do next, and gives her a human voice. Compare this with the dashboard that lists her rank in the class, which tells her only where she stands.

## Answering Ms. Singh

Ms. Singh's two questions now have answers. On structure: a learning graph, a directed acyclic graph of concept nodes, lets the software pick each student's next concept by a simple rule, and interoperability standards, LTI, OneRoster, QTI, xAPI, and the rest, let the tools from different vendors share rosters, logins, questions, and records without custom work. On delivery: generate-once, serve-many content keeps the cost per student far below live generation at scale, static pages and browser-based simulations work on modest devices, and offline access keeps students working when the network does not.

The story has both sides. The benefit: a design that, with the right choices, can reach Fairview as well as Lincoln Middle. The risks: devices that are too old, connections that are too slow, a product that quietly requires a live connection, and vendors whose tools cannot share data. The response is the set of questions in this chapter, and a district that tests every product at its worst-connected school before it buys.

## Key Takeaways

- A **concept node** is one concept in a **learning graph**; a **learning dependency** is an arrow from a concept to its prerequisite; a **foundational concept** has no prerequisites. This book's graph has 532 concepts, 961 dependencies, and 14 foundational concepts.
- A learning graph must be a **directed acyclic graph**, with no cycles, so the concepts can always be put in an order where each follows its prerequisites.
- A **learning path** is built by collecting the goal's prerequisites, removing what the student has mastered, and ordering the rest; a concept is *ready* when it is unmastered and all its direct prerequisites are mastered. Five-Month Doubling rests on 15 concepts in seven layers.
- **Interoperability standards** prevent lock-in; **IMS Global standards** (LTI, OneRoster, QTI, Common Cartridge, Caliper) and **IEEE learning standards** (xAPI, Learning Object Metadata) let tools share logins, rosters, questions, and records.
- **Generate once, serve many** pays for content creation once and then relies on cheap **web page hosting**; in our example live generation costs more beyond about 3,100 students.
- **Device access**, **Internet connectivity**, and **offline access** decide whether a design reaches every school; **browser-based simulations** and static pages work on modest devices and can run offline, while live AI chat cannot.
- An **interactive visualization** helps explore large connected data, and a good **student progress dashboard** shows each student what they have mastered and what is ready next, without ranking them.

!!! mascot-celebration "You can say how it reaches Fairview"
    ![Indigo celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You just learned how a learning graph chooses the next step, which standards let tools cooperate, and why generate-once content with offline access can reach a school with a slow connection and old devices. Chapter 10 takes on the hard question these records raise: protecting student privacy and governing the data. One step at a time, together.

[See Annotated References](./references.md)
