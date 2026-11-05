---
title: AI-Native Schools FAQ
description: Frequently asked questions about AI-Native Schools, from the five-level model of intelligent textbooks and the compressed academic morning to the pro-social afternoon, leading change, and implementing the model responsibly.
---

# AI-Native Schools FAQ

These questions follow the order of the book: getting started, the core ideas, the technical details, common difficulties, good practice, and harder questions. Each answer stands on its own and links to the chapter that covers the topic in depth.

## Getting Started Questions

### What is this book about?

The book makes a prediction and works out what follows from it. The prediction is that within three to four years almost every student will have access to a free, high-quality, interactive textbook that adapts to their needs. If that happens, schools will not need to spend most of the day on direct instruction, and they will have to decide what to do with the freed time. The book's answer is its subtitle: **mornings with AI, afternoons with each other.** Students spend a shorter academic morning with adaptive intelligent textbooks, and the afternoon goes to pro-social, hands-on work with other people: music, theater, sports, robotics, maker spaces, and projects.

The book is honest that this change can go well or badly. It draws on real AI-first schools and products, some that worked and some that failed, and its goal is to strengthen the positives and reduce the negatives. See the [Course Description](course-description.md) for the full outline.

### Who is this book written for?

The book is written for the people who share decisions about a school: K-12 teachers, principals and administrators, school board members, education policymakers, curriculum and instructional designers, education students, and parents. It assumes no programming or statistics background. The few charts and growth curves are explained from first principles, and the technical pieces, such as xAPI and learning graphs, are introduced with plain examples before any detail.

Different readers will use different parts. A board member may care most about the five-level model, privacy, procurement, and the board recommendation. A teacher may care most about the afternoon, the changing teacher role, and the microstrategies for change. A parent may care most about screen time, privacy, and what students actually do all day. The chapters are written so that each can be read with only its listed prerequisites. See [Chapter 2](chapters/02-evidence-motivation-stakeholders/index.md) for how the book describes these stakeholders.

### Do I need any background in AI or programming?

No. Readers should be comfortable using a web browser, and experience with an AI chat assistant helps but is not required. [Chapter 4](chapters/04-measuring-ai-capability-metr/index.md) builds a ladder of terms from the bottom: artificial intelligence is the broad field, machine learning learns rules from data, generative AI creates content, a large language model generates language, and an AI agent takes multi-step actions toward a goal. Each rung has a worked example.

The math in the book is limited to percentages, per-student cost tables, and doubling. [Chapter 5](chapters/05-projecting-ai-growth-doubling-curves/index.md) explains how to read a logarithmic chart without assuming you have seen one before. Where the book uses a standard such as xAPI, it shows a single example statement rather than a specification.

### How is the book organized?

The 23 chapters fall into five parts, preceded by three foundation chapters.

- **Foundations (Chapters 1–3):** the vocabulary of schools and learning, how to judge evidence, and why schools are built around bells, grade levels, and seat time.
- **Part 1, the evidence (Chapters 4–10):** METR's measurements of AI capability, doubling curves, the five-level model of intelligent textbooks, content economics, xAPI and Learning Record Stores, learning graphs, and student privacy.
- **Part 2, the morning (Chapters 11–12):** mastery learning, tutoring, AI tutors, and guardrails.
- **Part 3, the afternoon (Chapters 13–14):** social learning theory and what fills the afternoon in practice.
- **Part 4, changing culture (Chapters 15–19):** adoption curves, organizational change models, and microstrategies.
- **Part 5, practice (Chapters 20–23):** designing the school day, implementing responsibly, and the case studies.

The [List of Chapters](chapters/index.md) gives a summary of each.

### What does "mornings with AI, afternoons with each other" mean?

It is the book's short name for the **morning-afternoon model** of the school day. In the morning, students work through adaptive intelligent textbooks that pace the material, check mastery, and fill gaps, for roughly two to three hours. In the afternoon, students do things that need other people: ensembles, teams, theater, robotics, service projects, and project-based learning, led by trained adults.

The split follows from what each part does well. Software can deliver practice, explanation, and immediate feedback at each student's pace. It cannot give students practice at collaborating, listening, resolving conflict, or caring for each other, because those skills are learned through interaction. For example, an AI tutor can teach a student how to decompose a problem, but only a team can teach that student how to divide a problem among four people who disagree. See [Chapter 20](chapters/20-designing-ai-native-school-day/index.md) for sample schedules by grade.

### What is an AI-native school, and how is it different from an AI-first school?

An **AI-first school** is defined by its technology: AI is the thing it leads with. An **AI-native school**, as this book uses the term, is defined by its learning goals and its people, and uses AI where AI does a job well. In practice an AI-native school uses the morning-afternoon model, keeps screen time short for younger students, and treats the afternoon as carefully planned school time rather than leftover time.

The difference matters because several AI-first efforts failed for reasons that had nothing to do with whether the software worked. AltSchool raised more than \$170 million for technology-led personalized learning and closed its schools within a few years. Unbound Academy used Alpha School's software online without in-person afternoons and reportedly scored below state averages. The book's conclusion from these cases is that the software is not the model. See [Chapter 20](chapters/20-designing-ai-native-school-day/index.md) and [Chapter 23](chapters/23-ai-first-case-studies-ii-lessons/index.md).

### What is the book's prediction, and how confident is it?

The prediction is that within three to four years almost every student will have access to a free, high-quality, interactive textbook that adapts to them. It rests on two trends. First, METR's task-horizon studies show the length of task an AI system can complete doubling about every five months. Second, AI is making Level 2 interactive textbook content cheap to produce, heading toward pennies per student per day.

The book does not treat the prediction as certain. [Chapter 5](chapters/05-projecting-ai-growth-doubling-curves/index.md) shows that the doubling time dominates the uncertainty: four months versus six months changes a three-year projection by a factor of eight. It lists what could slow the trend, including cost, chips and power, data, reliability, and regulation. Its advice is to plan with scenarios and "no-regret moves," decisions that pay off even if the forecast is wrong, such as adopting open Level 2 content and improving data governance.

### How should I use the MicroSims and learning graph in this book?

The book is itself a Level 2 intelligent textbook, so it practices what it describes. **MicroSims** are small interactive simulations embedded in the chapters. Many let you practice a judgment, such as classifying a product's level or deciding whether an AI tutor design helps or harms, and give feedback on each attempt. Use them after reading the section they follow; they work best as practice, not as a substitute for the explanation.

The **learning graph** maps the book's 532 concepts and 961 prerequisite links. The [Learning Graph Viewer](sims/graph-viewer/index.md) lets you search for a concept and see what it depends on, which is useful if a chapter assumes something you have not read. [Chapter 9](chapters/09-learning-graphs-interoperability/index.md) uses the book's own graph as a worked example and shows that "Five-Month Doubling" rests on 15 concepts in seven layers.

### Where do the stories in the book come from?

The book uses three kinds of story, and labels which is which. A **real case study** is sourced, such as Alpha School, the Turkish high school chatbot study, or the Los Angeles "Ed" chatbot. A **composite story** is fictional and labeled as such: Maya, Mr. Dang, and Lincoln Middle School are composites built to illustrate a typical situation. An **illustrated story** presents a scene, sometimes in graphic-novel form.

The real cases are collected in the [AI-First Stories](appendices/ai-first-stories.md) appendix, grouped into stories that worked, stories that went wrong, and stories with both sides. Every story about AI in schools shows both a benefit and a risk, and how the school responds to the risk. [Chapter 22](chapters/22-ai-first-case-studies-i-promise-peril/index.md) explains the framework the book uses to read each case.

### Is this book for or against AI in schools?

Neither. The book argues that **how the AI is designed matters more than how powerful it is.** The same model can help or harm. In the Turkish high school study, students with open access to a GPT-4 chatbot did better on practice problems but about 17 percent worse on later exams taken without AI; a version that gave hints instead of answers removed most of the harm.

On **AI in education**, the book's position is to use AI where it does a job well, such as writing interactive content once and adapting practice to each student, and to keep it out of the jobs it does badly, such as replacing the human contact students need. It pairs every benefit with a risk and a response. A reader who finishes the book should be able to argue for a pilot and also to name what would make them stop it.

### How long does the book take to read?

The chapters are long because each concept has a worked example. Most chapters run 6,000 to 14,000 words, so expect one to two hours per chapter with the MicroSims, and roughly 40 hours for the whole book.

Readers with a specific question can take a shorter path. A board member preparing for a vote might read [Chapter 6](chapters/06-five-level-model-intelligent-textbooks/index.md) on the five levels, [Chapter 10](chapters/10-student-privacy-data-governance/index.md) on privacy, [Chapter 21](chapters/21-implementing-ai-native-model-responsibly/index.md) on procurement and pilots, and [Chapter 23](chapters/23-ai-first-case-studies-ii-lessons/index.md) on the board recommendation. A teacher leading change might start with [Chapter 19](chapters/19-microstrategies-leading-change/index.md) and go back to Chapters 15–18 as needed.

### Who is Indigo the Barn Owl?

Indigo is the book's learning mascot, a barn owl with indigo feathers and an amber scarf whose catchphrase is "Let's find the balance." Indigo appears in boxed asides in the chapters, and each pose has a job: welcoming you to a chapter, marking a key idea, offering a tip, warning about a common mistake, encouraging you through a hard passage, and celebrating what you learned at the end.

Indigo speaks plainly and names the tradeoff before the benefit, which matches the book's habit of pairing every benefit with a risk. If Indigo is not doing one of those jobs, Indigo is not in the chapter. [Chapter 1](chapters/01-building-blocks-schools-students/index.md) is where Indigo introduces themself.

## Core Concept Questions

### What is the five-level model of intelligent textbooks?

The **five-level textbook model** is the book's central framework for classifying any textbook or AI learning product. It comes from McCreary's paper *A Five-Level Classification Framework for Intelligent Textbooks: Lessons from Autonomous Vehicle Standards* (EdArXiv preprint, December 2025). The levels are:

1. **Static:** fixed content, like print and PDF textbooks.
2. **Interactive:** MicroSims, self-check quizzes, learning graphs, and path recommendations, with nothing stored about the student.
3. **Adaptive:** content driven by each student's goals and progress, which requires stored student records.
4. **Chatbot:** conversational tutoring through a large language model.
5. **Autonomous:** real-time content generation and full personalization.

A product's level is the highest defining capability it actually delivers, not the one its marketing implies. The model gives buyers, teachers, and policymakers a shared vocabulary, and it shows where risks appear: privacy at Level 3, chat guardrails at Level 4, human review of generated lessons at Level 5. See [Chapter 6](chapters/06-five-level-model-intelligent-textbooks/index.md).

### Why is the five-level model based on self-driving car levels?

The SAE J3016 standard defines levels of driving automation, from no automation to full automation. It gave the car industry three things while the technology changed quickly: a **shared vocabulary**, so "Level 2" meant the same thing to engineers, regulators, and buyers; **graduated regulation**, so rules matched the risk at each level; and **realistic expectations**, so a driver-assist feature was not sold as a self-driving car.

Textbooks face the same problem. Words like "AI-powered," "intelligent," and "adaptive" are used for products as different as a PDF with a chat box and a fully generative tutor. The five-level model borrows all three benefits from SAE. For example, a district can write a rule that says "any product at Level 3 or above needs a signed data agreement and a bias audit" and apply it without arguing about what "adaptive" means. See [Chapter 6](chapters/06-five-level-model-intelligent-textbooks/index.md).

### What is an intelligent textbook?

An **intelligent textbook** is a textbook that uses software to respond to the reader, adapt to the reader, converse with the reader, or generate content for the reader. It does not have to contain AI. A Level 2 textbook with MicroSims and self-check quizzes is intelligent because it responds to what the student does, even though no AI model runs while the student reads it.

This distinction matters for cost. AI can do its expensive work once, when the content is written, and then the textbook is served as ordinary web pages to every student at almost no cost. The **intelligent textbook movement**, which began in earnest in 2025, is the growing effort to publish textbooks this way, often openly licensed and free, and it is driving the **growth of Level 2 textbooks**. This book is an example. See [Chapter 6](chapters/06-five-level-model-intelligent-textbooks/index.md) and [Chapter 7](chapters/07-content-economics-open-educational/index.md).

### What makes a Level 2 interactive textbook different from Level 1?

A **Level 1 static textbook** shows the same fixed content to every reader. Print textbooks are Level 1, and so are many **digital textbooks**: a PDF is a print textbook on a screen. A **Level 2 interactive textbook** responds to what the reader does on the page. It adds embedded simulations (MicroSims), self-check quizzes with feedback, a learning graph showing how concepts connect, and recommended learning paths.

The key point is that Level 2 stores nothing about the individual student. A MicroSim runs entirely in the browser and forgets the student when the page closes. That is why Level 2 needs almost no privacy governance, costs very little to serve, and can run offline. For example, a physics page where a student drags a slider to change a ramp's angle and watches the acceleration change is Level 2; the same page as a PDF with a static diagram is Level 1. See [Chapter 6](chapters/06-five-level-model-intelligent-textbooks/index.md).

### What is a Level 3 adaptive textbook?

A **Level 3 adaptive textbook** keeps a record of each student and changes what it shows based on that record. It adds **progress tracking**, so it knows which concepts a student has mastered, and **student goal setting**, so the path can aim at what the student is trying to learn. With a learning graph, the textbook can choose the next concept: one the student has not mastered whose prerequisites the student has.

Level 3 does not need a live AI model. [Chapter 8](chapters/08-tracking-mastery-xapi-learning-record/index.md) shows a design where each activity sends a short xAPI statement to a Learning Record Store, a stated mastery rule turns those statements into a judgment, and a lookup on the learning graph picks the next step. Because Level 3 stores records about individual children, it is the **privacy inflection point** of the model and needs real data governance. See [Chapter 6](chapters/06-five-level-model-intelligent-textbooks/index.md).

### What are Level 4 and Level 5 textbooks?

A **Level 4 chatbot textbook** adds conversational tutoring: a student can hold an open conversation about the material with a large language model. A **Level 5 autonomous AI textbook** adds real-time content generation and full personalization: the textbook writes the lesson itself, for each student, as they learn.

Both are more expensive and riskier than Levels 2 and 3. Level 4 needs guardrails, because an open chatbot that gives answers can harm learning, as the Turkish high school study showed. Level 5 needs human review of generated lessons, because a model can produce confident errors that no editor has seen. The book places Levels 3 to 5 "on the horizon," with Level 5 technically plausible around three years out on the central trend but dependent on reliability and trust. It also notes that a Level 4 chatbot is not automatically better than a well-built Level 2 or Level 3 textbook. See [Chapter 6](chapters/06-five-level-model-intelligent-textbooks/index.md).

### Why is Level 3 called the privacy inflection point?

Below Level 3, a textbook needs almost no student data. A Level 2 page can respond to a student's clicks without storing anything once the page closes. At Level 3 and above, adaptation requires a **detailed learning history** for each student: what they attempted, how they did, how long they took, and what they mastered. That record is both the benefit and the risk. It lets the textbook choose the right next step, and it is also personal data about a child that can be misused, breached, or used to label a student unfairly.

Crossing that line brings in FERPA, COPPA, and in some cases GDPR, and calls for data minimization, retention rules, vendor contracts, and algorithmic bias audits. The book's practical rule is that a school not yet ready to govern student data should stay at Level 2, which still delivers interactive content without the records. See [Chapter 10](chapters/10-student-privacy-data-governance/index.md).

### What do the METR task-horizon studies measure?

METR measures AI capability in a natural unit: **human working time**, the time a skilled person needs to finish a task. Researchers give AI systems a suite of tasks of known human length, from seconds to many hours, and record which tasks each model completes correctly. Plotting success rate against task length gives a curve. The **50 percent time horizon** is the task length at which the model succeeds half the time.

The result is a single number that can be tracked across model releases, and it has been doubling about every five months. The book is careful about what the number means. A 50 percent horizon is a coin flip, not a reliable worker; the 80 percent horizon is several times shorter. For example, a model with a two-hour 50 percent horizon will fail about half of two-hour tasks, so a school would not trust it with a two-hour job unsupervised. See [Chapter 4](chapters/04-measuring-ai-capability-metr/index.md).

### What does "doubling about every five months" imply for schools?

Exponential growth multiplies by a constant factor each period. With a five-month doubling time, a value after \( t \) months is the starting value times \( 2^{t/5} \). Starting from a 50-minute horizon, five-month doubling implies about 23 hours after two years and about 122 hours after three years. On the central trend, the 50 percent horizon passes 40 hours, roughly a work week, in about 28 months.

For schools, this means the tools available at the end of a three-to-four-year plan may be far more capable than the tools available when the plan is written. Writing a textbook chapter with interactive elements, a task of many hours for a person, moves into range during a typical planning window. The book pairs this with a warning: if the doubling time were ten months instead of five, the three-year result would be about twelve times smaller. See [Chapter 4](chapters/04-measuring-ai-capability-metr/index.md) and [Chapter 5](chapters/05-projecting-ai-growth-doubling-curves/index.md).

### What is the compressed academic morning?

The **compressed academic morning** is the idea that students can reach today's academic results in two to three hours a day with adaptive intelligent textbooks, instead of a full day of direct instruction. It combines adaptive learning, mastery learning, personalized pacing, and gap filling, so each student works on what they are ready for rather than following one pace for the whole room.

The book shows both the potential and the burden of proof. In its illustration, **reduced direct instruction** creates **freed-up school time** of about 100 minutes a day, about 300 hours a year. But the same results in less time require students to learn about 1.67 times as much per minute, which the evidence has not yet shown for the full package. Well-designed AI tutoring has the strongest support; claims for the whole compressed day are mostly self-reported or early. The book's advice is to pilot it and measure it independently. See [Chapter 11](chapters/11-mastery-learning-case-compressed-morning/index.md).

### What is Bloom's two-sigma problem?

In 1984 Benjamin Bloom reported that students tutored one-on-one with mastery learning performed about two standard deviations better than students taught in a conventional class: the average tutored student did better than about 98 percent of the conventional class. The "problem" was that one-on-one tutoring is too expensive to give every student, so Bloom challenged researchers to find group methods that came close.

The book treats two sigma as the upper end of the evidence, not a typical result. The original studies were small. Pooled randomized trials of tutoring average about 0.37 standard deviations, which is still large in education, where an effect of 0.2 is already meaningful. AI tutors matter because they might deliver part of the tutoring effect at the cost of software. See [Chapter 11](chapters/11-mastery-learning-case-compressed-morning/index.md).

### What is cognitive offloading, and why does it matter?

**Cognitive offloading** is handing a mental task to a tool. People do it all the time: a calculator for arithmetic, a calendar for appointments. It is fine, even helpful, when the offloaded task is routine. It is harmful when the offloaded task is the skill the student is supposed to be learning.

AI makes this risk sharper because a chatbot can do almost any task a student is assigned. A student who asks a chatbot to write a paragraph learns nothing about writing paragraphs. The MIT Media Lab study known as "Your Brain on ChatGPT" (a small preprint) found that students who wrote essays with ChatGPT showed lower brain engagement and remembered less of what they had written. The book's rule is to **offload the routine and keep the target**: let a student use a spell checker in a history essay, but not a chatbot to build the argument the essay is meant to teach. See [Chapter 11](chapters/11-mastery-learning-case-compressed-morning/index.md) and [Chapter 12](chapters/12-ai-guardrails-teaching-thinking-without/index.md).

### What are AI guardrails?

**AI guardrails** are design rules that keep an AI tutor helping rather than doing the student's thinking. [Chapter 12](chapters/12-ai-guardrails-teaching-thinking-without/index.md) recommends five:

1. **Hints instead of answers** (G1), the essential one.
2. **Grounded in the course's content** (G2), so it answers from the textbook rather than whatever the model knows.
3. **Math and facts checked by a trusted tool** (G3), such as a calculator.
4. **Logs teachers can review** (G4).
5. **Age and topic limits** (G5).

The chapter's rule is two-part: a tutor without hint-first behavior is likely to harm learning whatever else it has; a tutor with hints and at least four of the five is likely to help; anything in between needs more guardrails. For example, a homework helper that is grounded in the textbook and keeps logs but gives the full answer as soon as asked still fails the rule, because G1 is missing.

### What is the difference between guided AI and open AI?

**Open AI access** means a student can use a general chatbot for anything, with no restrictions on what it does. **Guided AI** means the same or a similar model wrapped in guardrails: it gives hints before answers, stays within the course, checks its math, and keeps logs for teachers.

The Turkish high school study (Bastani and colleagues, 2024) is the clearest comparison. Students given open GPT-4 access did much better on practice problems, but about 17 percent worse on later exams without AI than students who never had access. A guided version that gave hints instead of answers removed most of the harm. The two versions could use the same underlying model; they differed only in design. That is the book's thesis in one experiment: design matters more than raw AI power. See [Chapter 12](chapters/12-ai-guardrails-teaching-thinking-without/index.md) and [Chapter 22](chapters/22-ai-first-case-studies-i-promise-peril/index.md).

### What is the pro-social afternoon?

The **pro-social afternoon** is the second half of the AI-native school day, given to activities students do with and for other people: music, dance, theater, visual arts, sports, coding and robotics clubs, maker spaces, service learning, and project-based learning. It focuses on collaboration, communication, empathy, and creativity.

The book defines a **pro-social activity** by four features: it needs other people, it has a shared goal, it has a real audience or real stakes, and it ends with reflection. A robotics team preparing for a competition passes; a room where students sit on their own phones under supervision does not. The afternoon is part of the school day, planned and staffed like the morning, not leftover time. See [Chapter 14](chapters/14-pro-social-afternoon/index.md).

### Why do students still need the afternoon if AI can teach thinking skills?

AI can teach critical thinking and computational thinking well, including **evidence evaluation**, **argument analysis**, decompose a problem, or write an algorithm. What it cannot do is give students practice using those skills with other people. Collaboration, active listening, resolving a conflict, and noticing that a teammate is discouraged are forms of **pro-social behavior** learned through interaction, so they need people.

[Chapter 13](chapters/13-social-learning-human-skills/index.md) grounds this in learning theory. Vygotsky's social constructivism holds that learners build understanding through interaction with others. Papert's constructionism holds that people learn by making things. The book's sense of **social constructionism** combines them: students learn most when they build a shared artifact as a team. For example, a team designing a garden irrigation system must split the problem, argue from evidence, and agree on a design, which is **team problem solving** in a way no tutor can simulate.

### What is social constructionism?

In this book, **social constructionism** is the idea that students learn the most when they build things and solve problems together. It draws on four learning theories that [Chapter 13](chapters/13-social-learning-human-skills/index.md) lays out in order:

- **Constructivism (Piaget):** learners build understanding from what they already know.
- **Social constructivism (Vygotsky):** understanding is built through interaction, within the zone of proximal development, with scaffolding that fades.
- **Constructionism (Papert):** learning happens when people make tangible, shareable artifacts.
- **Social constructionism:** learning by building a shared artifact as a team.

**Hands-on learning** supports all four, but only when it is guided; [Chapter 13](chapters/13-social-learning-human-skills/index.md) notes that the popular "Dale's Cone" retention percentages are a myth. The term social constructionism is used differently in sociology, where it refers to how societies construct shared meanings. The book uses it in the education sense, as the theory behind the afternoon. A school mural designed and painted by a team of students, with roles, drafts, and a public unveiling, is a direct example.

### What is unstructured afternoon drift?

**Unstructured afternoon drift** is the slide of the afternoon into unplanned free time, passive supervision, or screens, in which adults watch students and nothing is taught. Its opposite is a **structured afternoon**, with clear goals, a planned sequence, trained adults, and regular reflection. The book calls drift the main risk of the whole model: a school that frees the time and does not plan it has replaced a morning of teaching with an afternoon of babysitting.

Research on after-school programs supports the concern. A 2010 meta-analysis by Durlak, Weissberg, and Pachan of 68 programs found that programs using four **SAFE** practices improved personal and social skills, school bonding, and achievement, while programs without them showed no such gains. SAFE stands for **Sequenced** (activities build step by step), **Active** (students practice), **Focused** (at least one part develops personal or social skills), and **Explicit** (stated goals). Counting how many of the four an activity meets is the simplest quality check. See [Chapter 14](chapters/14-pro-social-afternoon/index.md).

### What is Alpha School, and what does it show?

**Alpha School** is the best-known working example of the morning-and-afternoon model. Its students spend about two hours a day on adaptive academic software, called 2 Hour Learning, and the rest of the day on life-skills workshops and projects led by adult guides. Tuition ranges from about \$40,000 a year at the original Austin campus to about \$65,000 at newer campuses such as Boston, Miami, and New York.

Alpha shows that the structure can work, but at private-school prices far beyond typical public per-pupil spending of roughly \$15,000. Its companion story is **Unbound Academy**, a free online charter school in Arizona that uses the same software without in-person afternoons and reportedly scored below state averages in early results. Together they show that the software alone is not the model. The book asks how to offer the same structure to every student using open intelligent textbooks and a learning record store instead of costly live AI. See [Chapter 22](chapters/22-ai-first-case-studies-i-promise-peril/index.md).

### What is the low-cost, energy-efficient adaptive design?

It is the book's answer to the cost problem Alpha School exposes. The design combines four pieces:

- **Intelligent textbooks** at Levels 2 and 3, written once with AI and served as ordinary web pages.
- **MicroSims** that run in the browser with no server or AI model behind them.
- **Learning graphs** that map concepts and prerequisites so the textbook can choose the next step.
- **xAPI and a Learning Record Store** that record what each student has done and mastered.

AI does its expensive work once, when content is written, instead of every time a student asks a question. Most students never send a request to a large language model. Chatbot tutoring is used only where it adds real value, with hint-first guardrails. In [Chapter 12](chapters/12-ai-guardrails-teaching-thinking-without/index.md), selective chatbot use cuts inference cost and energy by 80 percent or more compared with chat for every student. [Chapter 23](chapters/23-ai-first-case-studies-ii-lessons/index.md) estimates an **affordable Alpha model** adding about \$64 per student per year net of print savings, with afternoon staffing as the main cost.

### What is a learning graph?

A **learning graph** is a map of the concepts in a course and the prerequisites between them. Each **concept node** is one idea; each **learning dependency** is an arrow from a concept to a concept it requires. A **foundational concept** has no prerequisites. This book's own graph has 532 concepts, 961 dependencies, and 14 foundational concepts.

A learning graph lets a textbook adapt without a live AI model. A concept is "ready" for a student when the student has not mastered it but has mastered all of its direct prerequisites. Choosing the next lesson becomes a lookup rather than a conversation. For example, in this book's graph "Doubling Time" has one direct prerequisite, "Exponential Growth." A student who has mastered Exponential Growth but not Doubling Time is ready for Doubling Time next. "Five-Month Doubling," which has seven direct prerequisites, is not ready until all seven are mastered. See [Chapter 9](chapters/09-learning-graphs-interoperability/index.md) and the [Learning Graph Viewer](sims/graph-viewer/index.md).

### What are xAPI and a Learning Record Store?

**xAPI** (the Experience API) is a standard format for describing a learning event. Each **xAPI statement** records an **actor, verb, and object**, with an optional result and context: for example, "Maya completed the Ramp Angle MicroSim with a score of 4 out of 5." A **Learning Record Store (LRS)** is the service that receives and stores those statements. The stored history for one learner is their **learning record**.

Together they let a Level 3 textbook know what a student has done without a live AI model. A stated **mastery rule**, such as "four correct out of the last five attempts," turns the statements into a judgment about each concept, and the learning graph picks what comes next. Because any activity can send statements, an LRS-centered design can record learning that happens outside a learning management system. It also keeps the privacy question focused on one bounded store, which is easier to govern. See [Chapter 8](chapters/08-tracking-mastery-xapi-learning-record/index.md).

### What does "generate once, serve many" mean?

**Generate once, serve many** is a delivery model in which AI is used once to write the content, and the finished pages are then served to every student as ordinary static web pages. The creation cost is paid once; serving a static page to one more student costs a fraction of a cent.

The alternative is live generation, where an AI model produces content or answers every time a student asks. Live generation has a cost per request that grows with every student and every question. [Chapter 9](chapters/09-learning-graphs-interoperability/index.md) works an example in which live generation becomes more expensive than generate-once beyond about 3,100 students. Generate-once also helps equity: static pages and browser-based simulations work on modest devices and can be downloaded for offline use, while live AI chat needs a reliable connection.

### What is the OpenBook QR Score?

The **OpenBook QR Score** rates an open textbook on ten metrics worth 100 points in total, split into a **quality subscore** (Q, out of 50) and a **reusability subscore** (R, out of 50). Quality covers whether the book teaches well; reusability covers whether others can legally and practically adapt it, for example under an open license with editable source files.

The book stresses that **textbook quality** needs both halves reported, because a total hides which half is weak. Two books with a score of 70 can be very different: one with Q 45 and R 25 teaches well but is hard to adapt; one with Q 25 and R 45 is easy to adapt but needs work. These **rising quality scores** come largely from AI handling tedious improvements, such as adding alt text or self-check questions, but a higher score does not by itself prove students learn more. See [Chapter 7](chapters/07-content-economics-open-educational/index.md).

### What is the penny-per-day vision?

The **penny-per-day vision** is the idea that interactive textbook content can cost about a penny per student per school day, about \$1.80 per student per year. It follows from two facts in [Chapter 7](chapters/07-content-economics-open-educational/index.md): content creation cost is mostly up-front, and AI is pushing that up-front cost down. In the chapter's illustration, producing a chapter falls from about \$4,000 to about \$1,120, provided the human review step stays. Spread across many students, the content cost per student becomes very small.

The chapter is careful about what the penny covers. A complete digital program, before devices, costs more: about \$5.80, \$12.80, and \$23.00 per student per year at Levels 2, 3, and 4 in its illustration. Devices at about \$75 a year dominate all of them. Even so, cheap content makes **universal textbook access** plausible, with devices, training, accessibility, and privacy as the remaining barriers. A district that promises "a penny a day" and forgets the devices will lose trust, so the full cost table matters.

### What is the grammar of schooling?

The **grammar of schooling** is a phrase from historians David Tyack and Larry Cuban for the stable structure underneath most schools: age-graded classes, one teacher per room, a bell schedule, subjects divided into periods, and credits earned by seat time. Like grammar in a language, it is so familiar that people rarely notice it, and it shapes what feels like "real school."

The concept explains why schools often absorb reforms without changing much. A new tool gets fitted into the old structure: tablets become digital worksheets, and a personalized-learning platform becomes another period on the schedule. The book calls this **reform without real change**. It is a warning for the AI-native model: a compressed morning dropped into an unchanged day, with no redesign of the afternoon or the teacher's role, is likely to be absorbed the same way. See [Chapter 18](chapters/18-sustaining-change-systems-thinking/index.md) and [Chapter 3](chapters/03-school-structures-equity-industrial-era/index.md).

### How does the teacher's role change in an AI-native school?

The role moves from lecturer to coach, mentor, and facilitator. When adaptive textbooks handle much of the explanation and practice, teachers spend less time delivering the same lesson to a whole room and more time on what needs a person: diagnosing why a student is stuck, coaching a small group, running a team project, and building relationships.

The book is careful about the risks. A **learning guide**, the adult who supports students through the morning, is not necessarily a subject expert, and a design that removes subject expertise entirely loses something. Fear of job loss is real and needs an honest answer, not a slogan. In the 280-student school in [Chapter 20](chapters/20-designing-ai-native-school-day/index.md), the redesign needed about 10 percent more adult-hours, not fewer, because the afternoon needs adults too. Tutor CoPilot, where AI gave live suggestions to human tutors and the weakest tutors improved most, shows AI making teachers better rather than unnecessary.

### What is Rogers' diffusion of innovations?

**Diffusion of innovations** is Everett Rogers' theory of how new ideas spread: through communication channels, over time, among members of a social system. An innovation is anything people perceive as new. Rogers found that ideas move mostly through trust in peers, not through announcements.

Rogers divided adopters into five categories by when they adopt: **innovators** (2.5%), **early adopters** (13.5%), the **early majority** (34%), the **late majority** (34%), and **laggards** (16%). Plotted cumulatively, adoption forms an S-curve, steepest through the early majority. Applied to a district of 400 teachers, that means about 10 innovators, 54 early adopters, and 136 in each majority group. A leader who plans for all 400 to adopt in the first year has ignored the curve. See [Chapter 15](chapters/15-technology-adoption-diffusion-innovation/index.md).

### What is the chasm in technology adoption?

**The chasm** is Geoffrey Moore's name for the gap between early adopters and the early majority. Early adopters are visionaries who will try something incomplete because they see its promise. The early majority are pragmatists who want proof that it works for people like them, and a **whole product** that includes training, support, and integration.

Many innovations stall here because what convinces visionaries does not convince pragmatists. Moore's answer is a **beachhead strategy**: win one group completely, produce trusted references, and expand from there. In a school, that might mean making one grade-level team fully successful with the compressed morning, with data and a teacher willing to talk honestly with colleagues, before expanding to the rest of the building. See [Chapter 15](chapters/15-technology-adoption-diffusion-innovation/index.md).

### What is the Concerns-Based Adoption Model (CBAM)?

The **Concerns-Based Adoption Model** was built to track how teachers adopt new practices. It has two main tools. **Stages of concern** describe what a teacher is worried about, in order: self concerns (awareness, information, personal impact), then task concerns (managing the work), then impact concerns (effect on students, collaboration, refocusing). **Levels of use** describe what the teacher actually does, from nonuse through mechanical and routine use to refinement and renewal. A third tool, the **innovation configuration map**, defines what "using it" means.

CBAM's key insight is that early questions are not resistance. A teacher who asks "What happens to my job?" is at a personal stage of concern and needs a direct answer, not more training. The book covers CBAM in depth because it gives leaders a way to match each response to where a specific teacher is. See [Chapter 17](chapters/17-leading-change-vision-culture/index.md) and [Chapter 18](chapters/18-sustaining-change-systems-thinking/index.md).

### What are microstrategies for leading change?

A **microstrategy** is a small, concrete action that moves one person or one group, something a leader or teacher can do next week. Examples from [Chapter 19](chapters/19-microstrategies-leading-change/index.md) include recruiting a teacher champion, running one pilot classroom, getting early visible results, finding and copying bright spots, shrinking the first step, peer observation, and a fifteen-minute professional learning community routine.

The book pairs microstrategies with whole-organization models such as Kotter's eight steps. The big plan sets direction; microstrategies carry it through each person. Small changes also compound: one percent improvement a week for 52 weeks adds up to about 68 percent. The chapter's main skill is matching the move to the person, using their CBAM stage of concern and their adopter category, so that a skeptical late-majority teacher gets proof from a respected peer rather than another enthusiastic presentation.

### What is Bloom's Taxonomy, and why does the book use it?

**Bloom's Taxonomy**, in its 2001 revised form, classifies learning outcomes by the kind of thinking they ask for, from lowest to highest: Remember, Understand, Apply, Analyze, Evaluate, and Create. The top three are called **higher-order thinking**. A **learning outcome** written with an observable verb, such as "compare two tutor designs," tells you which level a lesson targets and how to check it.

The book uses the taxonomy in two ways. It writes every course outcome and every MicroSim objective at a stated level, so you can see what each part asks of you. And it uses the taxonomy to explain the AI-native split. Higher-order thinking depends on a strong base of the lower levels, which an adaptive morning can build efficiently. For example, a student must remember and understand what a ratio is before analyzing whether a recipe scales; the morning can secure the first two, and an afternoon team project can practice the analysis and creation with other people. See [Chapter 1](chapters/01-building-blocks-schools-students/index.md).

### What is the learning gap, and how does self-paced learning address it?

A **learning gap** is the difference between what a student is ready to learn and what the class is being taught. It grows out of **direct instruction** at one pace for the whole room: students who are behind miss the lesson, students who are ahead wait, and ordinary differences in readiness widen over time. [Chapter 1](chapters/01-building-blocks-schools-students/index.md) shows that a single classroom often spans several grade levels of readiness, and [Chapter 11](chapters/11-mastery-learning-case-compressed-morning/index.md) finds that in a class of 28, a single lesson reaches only about 13 students at the right level.

**Self-paced learning** lets each student move through material at their own speed, so time varies and the gap stops widening. It is different from **student agency**, which is about choice of what and how to learn. Both need structure. Self-paced work without checks lets students skip ahead with holes in their understanding. [Chapter 2](chapters/02-evidence-motivation-stakeholders/index.md) adds the idea of a **root gap**: when a student fails several related concepts, find the failed concept whose own prerequisites passed, and fix that one first.

### What is an open educational resource, and what are the 5R permissions?

An **open educational resource (OER)** is teaching material released under an **open license** that lets others use and change it. A **free textbook** is free in price; an open textbook adds legal permissions. Those permissions are the **5R permissions**: **retain** (keep a copy), **reuse** (use it as is), **revise** (change it), **remix** (combine it with other material), and **redistribute** (share the original or your version).

A **Creative Commons license** grants these permissions to different degrees. CC BY allows all five as long as the author is credited. A "NonCommercial" (NC) term restricts commercial use, and a "NoDerivatives" (ND) term blocks revising and remixing, which removes much of the value for teachers who want to adapt a book. [Chapter 7](chapters/07-content-economics-open-educational/index.md) works examples of which licenses can be combined. For example, a teacher can remix two CC BY chapters into one unit, but cannot share a version of a CC BY-ND chapter revised to fit local standards.

### What is an AI benchmark, and why did METR measure capability differently?

An **AI benchmark** is a standard test used to measure what AI systems can do, built from a **benchmark task suite** of questions or tasks with known answers. Benchmarks make **AI capability**, which has many dimensions, comparable across systems.

Benchmarks have two known problems. They **saturate**: a new benchmark is hard, but within a few years the best systems score near the maximum and the test stops telling anyone anything. They can also be **contaminated**, when questions or answers leak into a model's training data, so a system appears to reason when it is recalling. A score of 92 percent on an old test is hard to compare with 40 percent on a new one.

METR avoided saturation by measuring in human working time. Its tasks range from seconds to many hours, and each model's **task success rate** at each length places it on a single scale that keeps working as models improve. Longer tasks, including **long-running tasks** that take many steps over hours, are harder because errors compound. See [Chapter 4](chapters/04-measuring-ai-capability-metr/index.md).

### What is the hype cycle, and where is AI in education on it?

The **hype cycle** describes how expectations for a new technology rise and fall over time: an innovation trigger, a **peak of inflated expectations**, a **trough of disillusionment**, a slope of enlightenment, and a **plateau of productivity**. It describes expectations, not the technology itself. Education has seen repeated **EdTech hype waves**, from MOOCs to classroom tablets.

[Chapter 15](chapters/15-technology-adoption-diffusion-innovation/index.md) offers a reading of generative AI in schools. ChatGPT's release in November 2022 was the trigger. Predictions in 2023 that AI tutors would replace teachers marked the peak. Reports of wrong answers, cognitive offloading, and a vendor collapsing after a large district purchase pushed toward the trough. Randomized studies showing that guided tutors help and open access harms point to the slope of enlightenment. The plateau, guided AI with guardrails built into ordinary tools, has not been reached. The chapter's advice is to neither join the peak nor flee the trough, and to use the trough for small pilots.

## Technical Detail Questions

### What is an xAPI statement made of?

An **xAPI statement** describes one learning event as **actor, verb, object**. The actor is who did it (a student, identified by an account or ID). The verb is what they did (attempted, completed, answered, mastered). The object is what they did it to (a MicroSim, a quiz question, a page). Optional parts add a **result**, such as a score or success flag, and **context**, such as the course or class.

For example: actor = student 4821, verb = answered, object = Question 3 of the Doubling Time quiz, result = correct, in 42 seconds. Each statement is small, and a Learning Record Store collects them over time. The format is an IEEE learning standard, which means any tool that speaks xAPI can report to any LRS that accepts it, so a school is not tied to one vendor's records. See [Chapter 8](chapters/08-tracking-mastery-xapi-learning-record/index.md).

### What is a MicroSim?

A **MicroSim** is a small interactive simulation, usually focused on one concept, that runs in a web browser. It typically has a drawing area and a few controls such as sliders, buttons, and dropdown menus, so a student can change one thing and see the effect. Many MicroSims in this book are practice tools: they present a case, ask for a judgment, and give feedback.

MicroSims are the main building block of Level 2 textbooks. Because they run entirely in the browser, they need no server, no AI model, and no stored student data, and they can work offline once loaded. They are usually built with open libraries such as p5.js, Chart.js, or vis-network, and can be embedded in any web page with an iframe. When a school wants Level 3 adaptation, a MicroSim can also send an xAPI statement to a Learning Record Store. See [Chapter 8](chapters/08-tracking-mastery-xapi-learning-record/index.md) and the [MicroSims list](sims/index.md).

### Why must a learning graph be a directed acyclic graph?

A **directed acyclic graph (DAG)** is a set of nodes connected by one-way arrows with no cycles: you can never follow the arrows and return to where you started. A learning graph must be a DAG because a cycle would make learning impossible. If concept A required B, B required C, and C required A, no student could ever start any of them.

The no-cycle property guarantees that the concepts can always be put in an order where each concept comes after all its prerequisites. That ordering is what lets a textbook build a **learning path**: collect the prerequisites of a goal concept, remove those the student has mastered, and order the rest. Tools that build learning graphs check for cycles automatically. This book's graph of 532 concepts and 961 dependencies is validated as a DAG. See [Chapter 9](chapters/09-learning-graphs-interoperability/index.md).

### What are interoperability standards, and why do they matter?

**Interoperability standards** are shared technical rules that let products from different companies work together. In education, the main families are the **IMS Global standards** (now 1EdTech), which include LTI for launching tools from a learning management system, OneRoster for class rosters, QTI for test questions, Common Cartridge for course packages, and Caliper for learning events; and the **IEEE learning standards**, which include xAPI and Learning Object Metadata.

Standards matter because they prevent **vendor lock-in**. A school whose records are in a standard format can move them to another product; a school whose records are in a proprietary format may have to stay with a vendor it no longer trusts. In [Chapter 9](chapters/09-learning-graphs-interoperability/index.md), Fairview's "tool tangle" shows the cost of tools that do not share logins, rosters, or records: teachers re-enter the same data in several places. A procurement rule that requires standard data export is one of the simplest protections a district can adopt.

### What do FERPA, COPPA, and GDPR require?

These laws set the legal floor for student data.

- **FERPA** (Family Educational Rights and Privacy Act) protects U.S. education records. It gives parents, and students at 18, rights to see and correct records, and limits disclosure. A vendor can receive records under the "school official" exception only when it performs a school function under the school's direct control.
- **COPPA** (Children's Online Privacy Protection Act) governs online services that collect personal information from children under 13. Schools can sometimes consent on parents' behalf, but only for educational use.
- **GDPR** (General Data Protection Regulation) protects residents of the European Union and applies when a school or vendor handles their data, with rights to access, correction, and deletion.

The book's point is that compliance is not the same as trust. inBloom may have been legal and still closed because families did not trust it. See [Chapter 10](chapters/10-student-privacy-data-governance/index.md).

### What is data minimization?

**Data minimization** means collecting only the student data needed for a stated purpose, keeping it only as long as needed, and sharing it only with those who need it. It is the first principle of data governance in [Chapter 10](chapters/10-student-privacy-data-governance/index.md) and the most effective protection against breaches, because data that was never collected cannot be stolen.

In practice, minimization shapes design choices. A Level 3 textbook needs to know which concepts a student has mastered; it probably does not need every keystroke, the student's location, or how long the browser tab sat idle. For example, a mastery rule that uses the last five quiz results needs five results per concept, not a full clickstream. Pairing minimization with a **data retention policy**, such as deleting detailed activity records at the end of each school year and keeping only mastery summaries, limits what is exposed if something goes wrong.

### What is algorithmic bias auditing?

**Algorithmic bias** is a pattern in which an automated system produces systematically worse results for some groups of students, even when no one intended it. An adaptive textbook might route students who read more slowly, many of them English language learners, into easier content and keep them there. **Algorithmic bias auditing** compares the system's results across groups to detect such patterns.

[Chapter 10](chapters/10-student-privacy-data-governance/index.md) uses the **four-fifths rule** as a simple test: divide the rate of a favorable outcome for one group by the rate for the most favored group, and flag ratios below 0.80. For example, if 60 percent of one group are moved up to the next unit but only 42 percent of another, the ratio is 0.70 and needs investigation. Auditing pairs with **algorithmic transparency**: families should be able to understand why the system made a decision about their child and contest it.

### What happened with inBloom and the PowerSchool breach?

**inBloom** was a \$100 million, Gates Foundation-funded project, launched around 2013, to store and share student data across states. It closed in 2014 after parents pushed back over privacy. Its failure was a failure of trust: families were not part of the decision and did not believe their children's data was safe or necessary.

The **PowerSchool data breach** in December 2024 hit one of the largest student information system vendors and exposed records for tens of millions of students and teachers. It showed the danger of **centralized student records**: the more records one system holds, the bigger the target. Together the two cases teach the Level 3 lessons: earn family trust before collecting data, collect as little as possible, keep it in bounded stores, manage vendor risk, and require basic cybersecurity such as multi-factor authentication. See [Chapter 10](chapters/10-student-privacy-data-governance/index.md) and [Chapter 23](chapters/23-ai-first-case-studies-ii-lessons/index.md).

### What is an effect size?

An **effect size** expresses the result of a study in standard deviations, so results measured on different tests can be compared. An effect size of 0.5 means the average student in the treatment group scored half a standard deviation above the average student in the comparison group, roughly moving from the 50th to the 69th percentile.

The book stresses that real school effects are smaller than many brochures suggest. A typical year of learning in middle school is roughly 0.3 standard deviations, and an intervention effect of 0.2 is already large. Mastery learning averages about 0.5 in pooled studies; tutoring averages about 0.37 in pooled randomized trials. A vendor claiming 0.8 for a product deserves the questions in [Chapter 2](chapters/02-evidence-motivation-stakeholders/index.md): compared with whom, chosen how, and measured by whom?

### What is a randomized controlled trial?

A **randomized controlled trial (RCT)** assigns students by chance to a treatment group, which gets the new program, or a comparison group, which does not. Random assignment removes **selection bias**: without it, the students who choose or are chosen for a new program may differ from those who are not, for example by being more motivated, and that difference can look like a program effect.

RCTs sit near the top of the levels of evidence, which rank study design, not the size of a claim. The Harvard physics AI tutor and the Turkish high school study were both randomized, which is part of why the book gives them weight. RCTs have limits: they show an average effect in one setting, not why it worked. The **case study method** complements them by explaining how and why something worked in one place. A school can run a fair version itself with **delayed access**, randomly choosing which classes get a tool this term and giving it to the rest next term. See [Chapter 2](chapters/02-evidence-motivation-stakeholders/index.md) and [Chapter 21](chapters/21-implementing-ai-native-model-responsibly/index.md).

### How do I read a logarithmic chart?

On a **logarithmic scale**, equal distances on the axis represent equal multiples rather than equal amounts. The step from 1 to 10 takes the same space as 10 to 100 and 100 to 1,000. That makes a log scale useful for quantities that grow by multiplying, like the METR task horizon.

The key reading rule is that constant exponential growth plots as a **straight line** on a log-scale chart. The slope tells you the growth rate, and distance along the axis counts doublings. On a horizon chart with a vertical axis marked 1 minute, 2, 4, 8 minutes and so on, each gridline up is one doubling; if the trend line rises one gridline every five months, the doubling time is five months. A line that starts to bend downward on a log chart is the first sign that growth is slowing. See [Chapter 5](chapters/05-projecting-ai-growth-doubling-curves/index.md).

### What is mastery learning?

**Mastery learning** fixes the level of achievement and lets the time vary. Students work on a unit until they show mastery, usually by meeting a stated threshold on a check, and then move on; students who do not meet it get corrective help and try again. It reverses the traditional model, which fixes the time (a unit lasts two weeks) and lets achievement vary.

Pooled studies show effects of about half a standard deviation, which is large. But [Chapter 11](chapters/11-mastery-learning-case-compressed-morning/index.md) shows that mastery alone does not compress the day: in its example, fixing mastery saved only about eight percent of total hours, because students who need more time still need it. Compression comes from combining mastery with adaptive pacing, gap filling, and less whole-class direct instruction. The **mastery threshold** also involves a tradeoff: "four of five correct" passes a student who truly knows 70 percent of the material about 53 percent of the time.

### What are the five innovation attributes?

Rogers identified five attributes of an innovation that predict how quickly it spreads:

- **Relative advantage:** is it better than what people do now?
- **Compatibility:** does it fit their values, experience, and needs?
- **Complexity:** how hard is it to understand and use?
- **Trialability:** can people try it on a small scale before committing?
- **Observability:** can others see the results?

The attributes are most useful for diagnosing a stall. If teachers are not adopting a compressed morning, the cause might be low observability (no one has seen it work), low trialability (it requires changing the whole schedule at once), or low compatibility (it conflicts with how teachers see their job). Each points to a different fix: a demonstration classroom, a one-period pilot, or a conversation about the teacher's role. [Chapter 15](chapters/15-technology-adoption-diffusion-innovation/index.md) recommends diagnosing by attribute rather than blaming people.

### What are Kotter's eight steps?

John Kotter's model gives leaders an ordered plan for organizational change:

1. Create a **sense of urgency**.
2. Build a **guiding coalition**.
3. Form a **change vision**.
4. **Communicate the vision**.
5. **Remove obstacles**.
6. Generate **short-term wins**.
7. **Build on the change**.
8. **Anchor it in the culture**.

The steps are cumulative. A common error is jumping to step 4, announcing a vision, without steps 1 and 2. For example, a principal who announces a compressed morning at a staff meeting without first building a coalition of respected teachers, and without a shared reason to change, usually meets compliance at best. [Chapter 17](chapters/17-leading-change-vision-culture/index.md) walks through the steps at Lincoln Middle School and contrasts a vision built with people, which produces commitment, with one handed down, which produces compliance.

### What is the ADKAR model?

**ADKAR** is a model of individual change with five elements in order: **Awareness** of the need to change, **Desire** to take part, **Knowledge** of how to change, **Ability** to do it in practice, and **Reinforcement** to sustain it. It is a diagnostic tool: find the first element that is missing for a person, and work on that.

Its most useful lesson for schools is that training only helps when awareness and desire are present. A teacher who does not see why the morning should change will not be moved by a workshop on the new software. Ability needs practice and coaching, not just knowledge, and reinforcement needs recognition and feedback to prevent sliding back. See [Chapter 17](chapters/17-leading-change-vision-culture/index.md) for the first three elements and [Chapter 18](chapters/18-sustaining-change-systems-thinking/index.md) for ability and reinforcement.

### What is Bridges' transition model?

William Bridges distinguished **change**, an external event such as a new schedule, from **transition**, the inner process people go through to accept it. Transition has three phases: **endings**, where people let go of what they are losing; the **neutral zone**, a confusing but necessary middle where old ways no longer work and new ones are not yet comfortable; and **new beginnings**, which need a purpose, a picture, a plan, and a part for each person.

Bridges' main warning is that endings come first. A veteran teacher asked to give up a lecture refined over twenty years is losing something real: competence, identity, and a familiar routine. Leaders who skip the losses are puzzled by the lack of response. [Chapter 17](chapters/17-leading-change-vision-culture/index.md) shows how to build a loss inventory, and [Chapter 18](chapters/18-sustaining-change-systems-thinking/index.md) follows a teacher through all three phases.

### What are Schein's three levels of culture?

Edgar Schein described organizational culture at three levels. **Artifacts** are what you can see and hear: schedules, room layouts, rituals, how meetings run. **Espoused values** are what people say they believe: "every child can learn," "we put students first." **Basic assumptions** are the unspoken beliefs underneath, which people rarely question: "real learning happens when the teacher is talking," "a quiet room is a good room."

The levels matter because change efforts usually target artifacts, such as a new schedule, while the basic assumptions stay the same and pull practice back. **Culture assessment** looks for gaps between the levels. For example, a school that says it values student agency (espoused value) but rewards teachers for orderly, teacher-led rooms in evaluations (artifact) reveals an assumption that will resist a student-paced morning. See [Chapter 17](chapters/17-leading-change-vision-culture/index.md) and [Chapter 18](chapters/18-sustaining-change-systems-thinking/index.md).

### What is a causal loop diagram?

A **causal loop diagram** shows how parts of a system affect each other through **feedback loops**. Each arrow links a cause to an effect and carries a plus sign (they move in the same direction) or a minus sign (they move in opposite directions). A loop is **reinforcing** when it has an even number of minus signs, so change grows on itself; it is **balancing** when it has an odd number, so the loop pushes back toward stability.

For example, in a rollout: more teachers succeed with the new morning, more colleagues see results, more teachers try it, and more succeed. That loop is reinforcing. A balancing loop might run: more teachers try it, more demand for coaching, less coaching time per teacher, fewer succeed. Seeing both loops tells a leader that coach capacity, not enthusiasm, will set the speed limit. See [Chapter 18](chapters/18-sustaining-change-systems-thinking/index.md).

### How do I calculate per-pupil spending, and why does it matter?

**Per-pupil spending** is a district's total operating spending divided by its number of students. U.S. **public school funding** comes from local sources (mostly property taxes), state aid, and a smaller federal share. Nationally, per-pupil spending is roughly \$15,000 a year.

To compare it with the cost of a tool, convert both to the same unit. For example, \$15,000 spread over a 180-day school year is about \$83 per student per school day, the figure [Chapter 1](chapters/01-building-blocks-schools-students/index.md) uses. A Level 2 program costing \$5.80 per student per year is about three cents per school day, a tiny fraction of that budget. Alpha School's tuition of \$40,000 to \$65,000 is roughly three to four times typical public spending.

This baseline matters because every claim about an AI-native model, whether a vendor quote or a promise of savings, should be checked against it. [Chapter 2](chapters/02-evidence-motivation-stakeholders/index.md) scales it up: thirteen years of K-12 education cost the public roughly \$200,000 per student.

### How much does AI tutoring cost, and why is the price falling?

**AI inference cost** is the cost of running a trained model to produce an answer, usually priced per million tokens (a token is roughly part of a word). For a fixed capability level, that cost has fallen sharply. [Chapter 4](chapters/04-measuring-ai-capability-metr/index.md) cites the Stanford AI Index 2025: GPT-3.5-level performance cost about \$20 per million tokens in November 2022 and about \$0.07 in October 2024, a drop of more than 280-fold.

The chapter works the arithmetic for a student who uses 20,000 tokens a day for 180 days, 3.6 million tokens a year. At the 2022 price that is \$72 per student per year; at the 2024 price, about \$0.25. A 12,000-student district would pay about \$3,000 instead of about \$864,000. The caution is that this is a GPT-3.5-level model, and a stronger tutor costs more per token. [Chapter 5](chapters/05-projecting-ai-growth-doubling-curves/index.md) notes that **falling AI costs** compound over time, and [Chapter 7](chapters/07-content-economics-open-educational/index.md) builds the full per-level cost table.

### How does learning analytics help a teacher?

**Learning analytics** is the use of student learning data across a class or school to understand and improve teaching. It starts from **mastery data**: the judgments, made with a stated rule, about which concepts each student has mastered. Laid out as a grid with students as rows and concepts as columns, the data shows patterns no single score reveals.

[Chapter 8](chapters/08-tracking-mastery-xapi-learning-record/index.md) gives a simple reading rule. A dark column, where most students have not mastered one concept, points at the teaching: the lesson or MicroSim for that concept may need to change. A dark row, where one student has not mastered several concepts, points at the student, who may have a root gap or a need outside the lesson. For example, a teacher who sees that 20 of 26 students missed "doubling time" should reteach it to the whole class tomorrow, while a student whose row is dark across a whole unit needs a conversation. Analytics should inform teachers, not rank students on a public board.

### What counts as personally identifiable student data?

**Personally identifiable data** is information that can identify a student, either directly or indirectly. Direct identifiers include a name, student ID, email address, or photograph. Indirect identifiers become identifying in combination or in a small group: a birth date plus a zip code, or "the only eighth-grade girl in the robotics club." **Student data privacy** covers both keeping such data secure and using it only in appropriate ways.

[Chapter 10](chapters/10-student-privacy-data-governance/index.md) has you test fields one at a time. A student's score on one quiz, reported only as a class average, is not identifying. The same score attached to a student ID is. A report on a group of three students can identify each of them even without names, which is why many districts suppress results for very small groups. In practice, the safest Level 3 design keeps identifiers in one governed store, uses pseudonymous IDs elsewhere, and makes a data map showing every field, where it lives, and who can see it.

### What does evidence-based practice mean for a school?

**Evidence-based practice** means making decisions by combining three things: the best available research, professional judgment, and local context. It is not the same as "doing whatever a study says." A strategy that worked in a large urban district may not fit a small rural school, and a teacher's knowledge of particular students still matters.

The **levels of evidence** rank the design of a study, not the size of its claim. A randomized controlled trial ranks higher than a comparison of volunteers, which ranks higher than testimonials. [Chapter 2](chapters/02-evidence-motivation-stakeholders/index.md) opens with a vendor brochure claiming large gains for a math product. The questions it teaches are "compared with whom, chosen how, measured by whom?" For example, a brochure reporting that students who used the product scored higher than those who did not, with no word on how students were chosen, may only show that motivated students chose to use it. [Chapter 3](chapters/03-school-structures-equity-industrial-era/index.md) adds that an **independent evaluation** carries more weight than **self-reported results**.

## Common Challenge Questions

### Why do so many technology reforms in schools fail?

[Chapter 23](chapters/23-ai-first-case-studies-ii-lessons/index.md) finds four recurring reasons: technology came before pedagogy, the existing culture absorbed the change, trust was not built, and hype outran evidence. The failures mostly show planning, trust, culture, and procurement failing, not the technology itself, which repeats a century-long pattern in the history of **educational technology**.

The cases make each pattern concrete. The **Los Angeles iPad rollout** (2013) began a \$1.3 billion plan to give every student an iPad with Pearson curriculum and was cancelled amid technical problems, weak curriculum, and a contract scandal: devices before a teaching plan. **AltSchool** raised more than \$170 million and closed its schools without building a lasting culture. **Summit Learning** met student walkouts in Brooklyn and family protests in Kansas over long screen hours and too little teacher contact. **inBloom** lost family trust. Each failure points to a practice that would have caught it, such as a teaching plan before devices, a procurement check, or listening to students.

### What went wrong with the Los Angeles "Ed" chatbot?

In 2024 Los Angeles Unified committed about \$6 million to the startup AllHere for an AI chatbot called "Ed" and spent about \$3 million of it. The company collapsed within months of launch. In November 2024 its founder was charged with defrauding investors of nearly \$10 million.

The lesson is about procurement, not chatbots. The district bought quickly, depended on a single unproven vendor, and sent student data to a company it had not checked well. [Chapter 20](chapters/20-designing-ai-native-school-day/index.md) and [Chapter 21](chapters/21-implementing-ai-native-model-responsibly/index.md) answer it with procurement criteria: a weighted vendor scorecard with knockout rules, contract due diligence on data use, breach notice, deletion, portability, price, and term, and a requirement that the product's level be verified with a product level assessment rather than taken from the vendor's own claim.

### Should schools use AI cheating detectors?

The book says no, or at least not as the main response. A 2023 Stanford study by Liang and colleagues found that popular AI-writing detectors often wrongly flagged essays by non-native English writers as AI-generated. Detectors produce **false positives**, and the false positives fall unevenly, which creates an equity problem.

[Chapter 20](chapters/20-designing-ai-native-school-day/index.md) works the arithmetic. Even a detector that sounds accurate can produce many false accusations when most students are honest: in the chapter's illustration, about two in five flags are false. Each false flag is a student accused of something they did not do. The book's answer is **redesign, not policing**: assignments with drafts and in-class work, oral defenses, performance and portfolio assessment, and clear rules about when AI use is allowed. Writing, debate, and making things also move into the afternoon, where they happen in front of people.

### How do I know if an AI tutor is helping or hurting learning?

Check its design against the five guardrails in [Chapter 12](chapters/12-ai-guardrails-teaching-thinking-without/index.md), starting with the essential one: does it give hints instead of answers? A quick test is to ask it directly for the answer to a homework problem. A helpful tutor responds with a question or a small hint; a harmful one gives the full solution.

Then watch for signs of **over-reliance** in students: asking for answers before trying, accepting output without checking it, and being unable to do the task without the tool. The Turkish study's pattern is the warning sign: practice scores rise while performance without the tool falls. The fairest evidence comes from comparing exam results taken without AI between students who used the tutor and students who did not. Also check the tutor for **confidently wrong answers**, especially in math, and for sycophancy, where it agrees with a student's mistaken reasoning to be pleasant.

### Isn't more screen time bad for students?

It can be, and the book takes the concern seriously. **Summit Learning** is its clearest cautionary case: students walked out in Brooklyn and families protested in Kansas over long hours on screens and too little teacher contact. That is one reason the model insists the AI morning stays short and the afternoon is with other people.

The book also argues that screen time depends on what students do, not only how long. An hour of adaptive practice with immediate feedback, which keeps **student engagement** high, differs from an hour of passive video. [Chapter 12](chapters/12-ai-guardrails-teaching-thinking-without/index.md) recommends **morning screen-time limits**: cap the total, take a break every 25 to 30 minutes, and protect time for students' own questions. [Chapter 20](chapters/20-designing-ai-native-school-day/index.md) gives the youngest students the least screen time. For a family, the useful question is how the whole day adds up, which in the morning-afternoon model can include less screen time than a traditional day plus homework on a laptop.

### Will AI replace teachers?

The book's answer is that the role changes and the need for adults does not shrink. In the 280-student school in [Chapter 20](chapters/20-designing-ai-native-school-day/index.md), the redesigned day needed about 10 percent more adult-hours than before, because afternoon ensembles, teams, and projects need trained adults. What changes is what those adults do: less whole-class lecturing, more coaching, mentoring, and facilitating.

The book does not dismiss the fear. [Chapter 19](chapters/19-microstrategies-leading-change/index.md) treats **fear of job loss** as a legitimate concern that needs an honest answer, not a slogan. Roles such as afternoon specialist staff will be new, some teachers will need different skills, and unions should be engaged early. The positive example is **Tutor CoPilot**, in which AI gave human tutors live suggestions during sessions; student mastery improved and the weakest tutors improved most. AI that makes teachers better is the model the book recommends.

### What should I do when teachers resist the change?

Treat resistance as information. [Chapter 19](chapters/19-microstrategies-leading-change/index.md) identifies sources of resistance and separates **legitimate concerns**, which deserve a real response, from habit or fear that needs patience. A teacher who says "the software's reading passages are too hard for my English learners" may be right and has handed you a problem to fix.

Respond with empathy before information. A teacher at a personal stage of concern, worried about their job or competence, will not hear a data presentation until the worry is acknowledged. Then match the move to the person. Use CBAM to identify the stage of concern, and the adopter category to choose the messenger: a late-majority skeptic is more likely to be moved by a respected colleague's results in a pilot classroom than by an enthusiastic leader. [Chapter 17](chapters/17-leading-change-vision-culture/index.md) adds that early questions are self concerns, not resistance, and need direct answers.

### What is the implementation dip, and should it worry me?

The **implementation dip** is a temporary fall in performance as people learn a new practice. Teachers using a new morning model for the first time are slower and less skilled than they were with the old one, and early results often drop before they rise. Michael Fullan's research on educational change describes the dip as normal.

[Chapter 16](chapters/16-organizational-change-models/index.md) gives two ways to read it. A normal dip bottoms early and recovers within a term or two. A dip that keeps falling is a sign something in the design is wrong. The absence of any dip can mean the change is shallow, that people are using the new tool the old way. The book recommends **managing expectations** by telling families and the board in advance what the dip will look like, which turns it from a surprise into part of the plan and protects trust.

### Why might a successful pilot not scale?

A pilot classroom usually has advantages the rest of the school does not: a volunteer teacher who is an early adopter, extra attention, and close support. When the program expands to the early and late majority, those advantages disappear, which is the chasm in [Chapter 15](chapters/15-technology-adoption-diffusion-innovation/index.md).

Capacity is the other limit. [Chapter 21](chapters/21-implementing-ai-native-model-responsibly/index.md) shows that coach capacity sets the speed of scale-up: at 12 teachers per coach, 40, 150, and 400 teachers need about 4, 13, and 34 coaches. A district that expands faster than it can coach will see results fall. A systems view adds a balancing loop: more teachers starting means less coaching per teacher. The practical answer is to scale in stages paced by coaching capacity, with a written decision rule for each stage.

### How can an AI-native model widen achievement gaps?

If every group improves but advantaged students improve faster, averages rise while the gap widens. [Chapter 21](chapters/21-implementing-ai-native-model-responsibly/index.md) works an example of exactly this, and recommends checking whether a program is **closing or widening gaps** by measuring the gap itself, not only the average.

There are several ways the model can widen gaps. Students without reliable home devices or internet fall behind on any work assigned outside school. Self-paced software rewards students who already manage their own learning. Detectors and adaptive systems can carry algorithmic bias against English language learners. Paid afternoon programs exclude families who cannot pay. And the private version of the model, at \$40,000 to \$65,000 tuition, is out of reach for most families. **Equity of access** in [Chapter 20](chapters/20-designing-ai-native-school-day/index.md) means devices, accessibility, language support, a free afternoon, and partnerships that serve every neighborhood.

### How do I evaluate a vendor's results claim?

Use the six questions from [Chapter 23](chapters/23-ai-first-case-studies-ii-lessons/index.md):

1. Where did students start?
2. Compared with whom?
3. Who measured it?
4. Has anyone independent checked it?
5. How big was the effect, and how long did it last?
6. What exactly was measured?

Unbound Academy shows why. It claims students learn 2.8 times faster on its own growth tests, while a board slideshow reportedly showed 10 percent proficiency in math and 28 percent in English Language Arts, below state averages. Without knowing where students started, neither number tells you how much they grew. A claim measured by the vendor on its own test, with no comparison group and no independent check, is a lead, not evidence. [Chapter 3](chapters/03-school-structures-equity-industrial-era/index.md) adds that a preprint is a lead until peer review, and an independent evaluation carries more weight than self-reported results.

### Why are textbook publishers being disrupted, and what still has value?

A **textbook publisher's** costs are mostly up-front: authors, editors, artwork, reviews, and permissions. The **publisher business model** recovered those costs by selling many copies at a high **textbook price** and revising every few years so used copies lost value. **AI-generated content** breaks that model by driving **falling production cost**. In [Chapter 7](chapters/07-content-economics-open-educational/index.md)'s illustration, a chapter that cost about \$4,000 to produce costs about \$1,120 with AI assistance, provided the human review stays.

When content becomes cheap to make and nearly free to copy, **content commoditization** pushes its price toward cost. That is **publisher disruption**. What remains valuable is everything around the content: trust, assessment, integration, training, support, and data protection. The chapter breaks down a \$900,000 publisher proposal for a 12,000-student district: only \$240,000 is the textbook license, while the rest pays for an adaptive platform, an assessment bank and dashboard, training, and support. A district comparing that proposal with free open content should ask which of those services it actually needs, and what each costs on its own.

## Best Practice Questions

### How do I classify an AI product's level?

Use the four-step **product level assessment** in [Chapter 6](chapters/06-five-level-model-intelligent-textbooks/index.md): gather documentation and a demonstration, test what the product does for students rather than what the brochure says, identify the highest defining capability it delivers, and record what student data it needs at that level. The checklist asks, in order:

1. Does it do anything but show fixed content? If not, Level 1.
2. Does it respond to the learner's actions on the page? At least Level 2.
3. Does it keep a record of each student and change what it shows from that record? At least Level 3.
4. Can a student hold an open conversation with it about the material? At least Level 4.
5. Does it generate the content itself, for each student, in real time? Level 5.

For example, a product sold as "AI-powered personalized learning" that turns out to be quizzes with feedback and no stored records is Level 2. A vendor's own level claim is a self-report to test, not reject.

### How should a school start with intelligent textbooks?

Start at Level 2. Interactive textbooks with MicroSims, self-check quizzes, and learning graphs deliver much of the benefit, cost very little, need no student records, and can run offline. Adopting open Level 2 content is one of the book's no-regret moves: it pays off whether or not the AI forecast holds.

Move to Level 3 only when the school is ready to govern student data. [Chapter 10](chapters/10-student-privacy-data-governance/index.md) gives a governance-readiness check: data minimization, informed consent, a retention policy, clear data ownership, vendor contracts, and a plan for breaches. Add Level 4 chatbot tutoring selectively, where it adds real value, with hint-first guardrails. For example, a middle school might begin with an open Level 2 math textbook in one grade, add a Learning Record Store the following year after the board adopts a retention policy, and pilot a guided chat tutor for one unit after that.

### How do I design a good pro-social afternoon activity?

Check it against two tests from [Chapter 14](chapters/14-pro-social-afternoon/index.md). The **four-feature test** asks whether the activity needs other people, has a shared goal, has a real audience or stakes, and ends with reflection. The **SAFE** check asks whether it is sequenced, active, focused on a personal or social skill, and explicit about its goals.

For example, a ten-week ensemble passes both. Students depend on each other, share the goal of a concert, perform for families, and debrief after each rehearsal; the rehearsals build in sequence and name the listening skills being practiced. An open gym where students choose what to do with no adult goals fails both and is the drift the book warns about. Start small: the chapter's ten-week launch plan begins with three activities chosen from student and family surveys, trains adults in SAFE practices and a three-minute debrief, and pilots one block a week before expanding.

### What makes project-based learning work?

[Chapter 14](chapters/14-pro-social-afternoon/index.md) describes seven essential elements of project-based learning and singles out two as the most important: a **driving question** and a **public exhibition**. A driving question is open, important to students, and cannot be answered by a quick search: "How can we cut the food our cafeteria throws away by half?" rather than "What is food waste?" A public exhibition gives the work a real audience and real stakes.

High Tech High in San Diego is the book's model: students work in teams on real projects and present them at public exhibitions. Finland's **phenomenon-based learning** applies a similar idea across subjects, with students studying a real-world topic such as climate or migration through science, math, and language together. Projects also need structure inside the team: shared goals, rotating roles, and individual accountability, so the work does not fall on one student. [Chapter 13](chapters/13-social-learning-human-skills/index.md) gives worked examples of each.

### How should a school plan and run a pilot?

Write the rules before the pilot starts. [Chapter 20](chapters/20-designing-ai-native-school-day/index.md) and [Chapter 21](chapters/21-implementing-ai-native-model-responsibly/index.md) recommend:

- A **school readiness assessment** before the pilot begins.
- Written **pilot goals** and a balanced set of **success measures**, chosen in advance, covering academics, engagement, well-being, equity, and cost.
- **Pilot governance** that names who decides and what would stop the pilot.
- A **decision rule** that says what results mean expand, revise, or end.
- A **comparison group**, ideally through delayed access, and independent evaluation where possible.

The **pilot risk checklist** in [Chapter 22](chapters/22-ai-first-case-studies-i-promise-peril/index.md) adds one line per known risk, such as screen time, offloading, wrong answers, privacy, equity, job fears, and afternoon drift, with a response for each. For example, a pilot plan with strong academic measures but no measure of afternoon quality has a gap the checklist will catch.

### What should be in an AI vendor contract?

[Chapter 21](chapters/21-implementing-ai-native-model-responsibly/index.md) lists the clauses that protect students under **contract due diligence**: how student data may be used (never for advertising, and never shared with unnamed third parties), breach notification within a set time, deletion at the end of the contract, data portability in a standard format, price and price increases, contract term, and what happens when the vendor changes the underlying AI model.

The chapter's rule is that two red flags end the conversation. A vendor that claims ownership of student data, refuses deletion, or will not say where data is stored is not one to negotiate with. To avoid **vendor lock-in**, require open standards and data export, keep terms short, and keep an open Level 2 fallback so the school can leave if it must. The Los Angeles "Ed" chatbot case shows what can happen without these checks.

### How should a school communicate with families about the change?

Communicate before rumors spread. [Chapter 19](chapters/19-microstrategies-leading-change/index.md) recommends a **communication calendar** that starts before any decision is announced, with family nights, plain-language handouts, and chances to try the tools. Families who first hear about a change through social media fill the gap with their own worst guesses.

Be specific and honest. Say what students will do in the morning and the afternoon, how much screen time is involved, what data is collected, where it is stored, and who can see it. Say in advance what the implementation dip may look like. Invite questions you cannot yet answer. inBloom's closure is the cautionary example: it failed because families were not part of the decision. [Chapter 10](chapters/10-student-privacy-data-governance/index.md) puts the principle simply: build trust by collecting little, saying what you hold, and acting consistently.

### How should assessment change in an AI-native school?

Redesign assessment rather than police it. [Chapter 20](chapters/20-designing-ai-native-school-day/index.md) recommends combining three kinds:

- **Mastery-based assessment** from the morning, where the Learning Record Store shows which concepts each student has mastered.
- **Performance assessment**, where students show a skill by doing it, such as presenting, debating, or building.
- **Portfolio assessment**, a collection of work over time showing growth.

Each needs checks for reliability. [Chapter 21](chapters/21-implementing-ai-native-model-responsibly/index.md) gives a **teamwork rubric** scored by two raters, so afternoon work can be assessed fairly. This approach also answers the cheating problem better than detectors, because a student explaining a design to a panel or revising a draft in class is showing their own thinking. A student's record then shows both what they mastered in the morning and what they built and contributed in the afternoon.

### How should a district choose a change model?

Match the model to the question. [Chapter 16](chapters/16-organizational-change-models/index.md) treats the models as tools for different jobs, not rivals:

- **Kotter** for an ordered leadership plan.
- **Lewin** for the three broad phases and force field analysis.
- **ADKAR** to diagnose one person's missing element.
- **Bridges** for the feelings of loss.
- **Schein** to read the culture.
- **Senge** to build a learning organization.
- **Fullan** for the specifics of schools, including the implementation dip and coherence.
- **CBAM** to track each teacher's concerns and use.

[Chapter 18](chapters/18-sustaining-change-systems-thinking/index.md) adds that the choice depends on size, culture, history, and time. A small school with high trust might need only Lewin's phases and CBAM. A large district with a history of failed initiatives and change fatigue needs Fullan's coherence framework, fewer connected priorities, and serious capacity building.

### What can we learn from Estonia's AI Leap?

**Estonia's AI Leap** (TI-Hüpe), launched in 2025, is a national program giving secondary students and teachers access to AI learning tools along with teacher training. It builds on the country's earlier success bringing computers into schools. The book uses it as the example of a whole system adopting AI on purpose: with a plan, training, and public support.

The lesson for districts is coherence. Estonia paired access with training, and built on prior trust and capacity rather than starting cold. [Chapter 18](chapters/18-sustaining-change-systems-thinking/index.md) contrasts it with a rapid national mandate in South Korea that, as reported, met resistance. A district can apply the same lessons at its own scale: connect the AI initiative to existing priorities rather than adding it on top, train teachers before students arrive, and build public understanding before rollout. See also [Chapter 15](chapters/15-technology-adoption-diffusion-innovation/index.md).

### How do I write a school board recommendation for an AI-native pilot?

[Chapter 23](chapters/23-ai-first-case-studies-ii-lessons/index.md) gives a one-page outline. A strong recommendation states:

1. **The ask:** exactly what the board is asked to approve, such as a one-year pilot in two grade-6 classes.
2. **The case:** the problem the pilot addresses.
3. **The evidence, with its level:** what is known from randomized trials, what is self-reported, and what is unknown.
4. **The risks and responses:** one line per risk, from the pilot risk checklist.
5. **The equity analysis:** who could be helped or left out, and how gaps will be measured.
6. **The cost:** including devices, staffing, and training, not just software.
7. **The decision rule:** what results will lead to expansion, revision, or ending.

A recommendation that names both sides is more persuasive to a careful board than one that only promises gains. Stating the decision rule in advance also protects the board from being asked to judge the pilot by mood rather than evidence.

### How do bright spots help lead change?

A **bright spot** is a person or group already succeeding at something within the system, despite the same constraints as everyone else. **Positive deviance** is the practice of finding those exceptions and spreading what they do. Both come from the **Switch framework** in [Chapter 19](chapters/19-microstrategies-leading-change/index.md), which describes change as directing the rider (the rational mind), motivating the elephant (emotion), and shaping the path (the environment).

Bright spots work because they are proof from inside. For example, if one fifth-grade teacher's students already make strong gains with self-paced practice, other teachers can watch that class, learn the specific moves the teacher makes, and see that it works with students like theirs. That is more persuasive than a vendor's case study from another state. It also respects teachers' expertise, since the solution comes from a colleague rather than from outside.

### How should formative assessment, spaced practice, and retrieval practice fit an adaptive morning?

These three practices from [Chapter 1](chapters/01-building-blocks-schools-students/index.md) are what turn a morning of screen time into lasting learning, so an adaptive textbook should build them in.

- **Formative assessment** uses evidence during learning to change what happens next. In an adaptive textbook, every self-check question is formative: a wrong answer triggers a hint, a different explanation, or a prerequisite review.
- **Spaced practice** spreads review over days and weeks instead of cramming it into one session.
- **Retrieval practice** asks students to recall what they learned, rather than reread it, which strengthens memory.

For example, after a student masters a concept on Monday, a well-designed textbook brings back two or three short recall questions on it the following Monday and again a month later, mixed in with new work. If the student misses them, the concept is marked for review rather than left as "mastered." When choosing a product, ask whether its mastery rule ever looks back, or whether a concept passed once stays passed forever. Teachers can apply the same idea in the afternoon by having teams explain earlier concepts from memory as part of a project.

### How do I build social-emotional learning into afternoon projects?

**Social-emotional learning (SEL)** covers self-awareness, empathy, perspective taking, relationship skills, and belonging. [Chapter 13](chapters/13-social-learning-human-skills/index.md) finds that these skills are best taught inside real projects rather than in separate lessons, because a real project creates real moments that need them: a disagreement, a teammate who falls behind, an audience to understand.

Build them in with structure. Assign **team roles** that rotate, so every student practices leading, recording, and checking. Teach **communication skills** such as **active listening**: paraphrase what a teammate said, ask a clarifying question, and reflect the feeling. Teach **conflict resolution** by looking at interests rather than positions. End each session with a short reflection naming one thing that went well and one to change. For example, a team building a community garden might hold a mid-project check-in where each member says what they need from the others. That is perspective taking and relationship skills in practice, tied to a goal everyone cares about. When a team stalls, ask the structure questions first: is the goal shared, are the roles clear, and is each member accountable?

## Advanced Topic Questions

### How would I design an AI-native day for elementary, middle, and high school?

The model changes by grade band. [Chapter 21](chapters/21-implementing-ai-native-model-responsibly/index.md) describes an **elementary school model**, a **middle school model**, and a **high school model**, and [Chapter 20](chapters/20-designing-ai-native-school-day/index.md) works a full middle school day.

The **elementary school model** keeps one home-room teacher with a class for most of the day, for a stable relationship. The morning is short, mostly teacher-led and hands-on, with a brief adaptive block for reading and number practice; the afternoon is play, movement, music, stories, and projects. The **middle school model** adds an advisory teacher who follows a student for several years, an adaptive morning of about 150 minutes with breaks every 25 to 30 minutes, and afternoon projects with public exhibitions. The **high school model** builds around credits: a morning that mixes adaptive work with seminars and labs, and an afternoon of capstone projects, internships, dual enrollment, ensembles, and service, often in **block scheduling** of 80 to 90 minutes. Every band must still meet legal instructional-time rules and do all the jobs a school does, including meals, supervision, and support services. A design exercise is to start from a blank bell schedule and place each block against those constraints.

### Does an AI-native model pay for itself?

Partly, but not fully, according to the book's example. Software and content costs can fall a great deal: open Level 2 content costs very little, and the **affordable Alpha model** in [Chapter 23](chapters/23-ai-first-case-studies-ii-lessons/index.md) adds only about \$64 per student per year after print savings for the morning. The main cost is the afternoon, which needs trained adults.

[Chapter 21](chapters/21-implementing-ai-native-model-responsibly/index.md) tests whether **budget reallocation** can cover it, for example by shifting spending from print textbooks and some direct-instruction time. In its example, reallocation does not fully pay for the afternoon. That means a district has to decide whether the gains in collaboration, engagement, and human skills are worth new money, or find partners such as arts organizations, community groups, and youth sports programs. A sound plan states the gap honestly rather than promising that technology savings cover everything.

### How do I plan for uncertainty in the AI forecast?

[Chapter 5](chapters/05-projecting-ai-growth-doubling-curves/index.md) recommends four tools. Use **scenarios**: write plans for a fast trend, the central trend, and a slow or stalled trend, since the doubling time drives most of the uncertainty. Prefer **no-regret moves**, which pay off in every scenario, such as open Level 2 content, better data governance, staff AI literacy, and a stronger afternoon program. Make decisions **reversible** where you can, with short contracts and data export. Set **trip-wires**, measurable signals that trigger a planned response, such as "if independent studies of AI tutors in our grade band show gains over two consecutive years, expand the pilot."

State the **prediction assumptions** behind the plan and test it against a **prediction failure scenario**: if AI capability stalled tomorrow, what in the plan would still be worth doing? A plan that only makes sense if the trend continues is a bet, not a plan.

### How can a school keep AI costs and energy use low at scale?

Use AI where its cost is paid once, and avoid it where its cost is paid per student per question. **Generate once, serve many** pays for content creation once and serves static pages for a fraction of a cent. **Adaptation without live AI** uses a Learning Record Store, a mastery threshold, and a learning-graph lookup to choose each student's next step, with no model call at all.

Where chat tutoring adds real value, use it selectively. In [Chapter 12](chapters/12-ai-guardrails-teaching-thinking-without/index.md), limiting chatbot use to the moments a student is stuck, rather than chat for everything, cut inference cost and energy by 80 percent or more. [Chapter 5](chapters/05-projecting-ai-growth-doubling-curves/index.md) puts energy in perspective: a chatbot tutoring session uses roughly 12 watt-hours in its example, which is modest, while video generation and long agent tasks use far more. Inference cost for a fixed capability level fell more than 280-fold from November 2022 to October 2024, so selective use gets cheaper over time too.

### How would I evaluate a pilot so the result is trustworthy?

Build the evaluation into the pilot before it starts. [Chapter 21](chapters/21-implementing-ai-native-model-responsibly/index.md) recommends a **logic model** that links resources and activities to the outcomes you expect, so you know what to measure at each stage. Choose a balanced set of success measures in advance, so no one can pick the favorable ones afterward.

Use a comparison. The fairest practical design is **A/B testing with delayed access**: randomly choose which classes start this term, and give the program to the rest next term. That answers the ethical objection that some students are denied a benefit, since everyone gets it. Measure outcomes without AI assistance, as the Turkish study did, so that practice gains are not mistaken for learning. Check the gap between groups, not only the average. Where possible, have an independent evaluator analyze the results. Then apply the decision rule written at the start, even if the result is disappointing.

### What would a two-sided story about an AI-native school look like?

A **two-sided story** shows a benefit, a risk, and how the school responds, which is the book's **risk-and-response framework** in miniature. [Chapter 22](chapters/22-ai-first-case-studies-i-promise-peril/index.md) reads each case as benefit, risk, response, and lesson, and [Chapter 23](chapters/23-ai-first-case-studies-ii-lessons/index.md) shows how to write one.

For example: Maya, a sixth grader, moves through her math morning at her own pace and finishes a unit two weeks early (benefit). Her teacher notices that Maya has started asking the tutor for answers whenever she is stuck, and her quiz scores without the tutor are dropping (risk: cognitive offloading). The school switches the tutor to hint-first mode, adds a weekly no-AI check, and pairs Maya with a peer to explain her reasoning in the afternoon (response). The lesson is that design and adult attention, not the software alone, decide the outcome. Writing stories this way keeps a school from either hiding risks or giving up on benefits.

### How might Level 5 autonomous textbooks change schools, and what safeguards would they need?

A **Level 5 autonomous AI textbook** would generate each lesson in real time for each student, with full personalization of examples, pacing, and explanations. [Chapter 6](chapters/06-five-level-model-intelligent-textbooks/index.md) places it as technically plausible around three years out on the central trend, but dependent on reliability and trust.

The risks are new in kind. A generated lesson may contain confident errors that no editor has seen. Two students may receive different explanations of the same concept, making it harder for teachers and families to know what was taught. Full personalization needs the richest student data of any level. The book's **level-specific policy** for Level 5 is human review of generated lessons, on top of every safeguard from Levels 1 to 4: accessibility, simulation accuracy, governed records with bias audits, and chat guardrails. A reasonable design question is what share of generated content must be reviewed, by whom, and how fast, before a Level 5 product could be trusted with a whole course.

### How can the afternoon be equitable when families have different resources?

Make the afternoon part of the free school day, not an add-on families pay for. [Chapter 20](chapters/20-designing-ai-native-school-day/index.md) lists a free afternoon among the requirements for **equity of access**, alongside devices, accessibility, and language support. Private models charge tuition of \$40,000 to \$65,000, which is the cost barrier the public model is meant to remove.

Partnerships help but need care. [Chapter 14](chapters/14-pro-social-afternoon/index.md) covers **community partnerships** with arts groups, youth sports, libraries, and local employers, with written agreements covering safety, schedules, and goals. Partnerships tend to cluster in better-resourced neighborhoods, so a district should map where they are and fill gaps deliberately. **Activity-skill matching** ensures every student gets a spread of skills across the week, not just the activities their friends or parents chose. Transportation, equipment, and instrument loans matter as much as the program design. El Sistema's youth orchestras, which use group music to build belonging in low-income communities, show the afternoon can serve the students with the least.
