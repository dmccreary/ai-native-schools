---
title: "Tutor Reply Hint Levels"
description: "Classify eight AI tutor replies to the same juice-price question by hint level, from 1 (asks a question) to 4 (gives the answer)."
image: /sims/tutor-reply-hint-levels/tutor-reply-hint-levels.png
og:image: /sims/tutor-reply-hint-levels/tutor-reply-hint-levels.png
twitter:image: /sims/tutor-reply-hint-levels/tutor-reply-hint-levels.png
social:
   cards: false
status: built
quality_score: 100
---

# Tutor Reply Hint Levels

<iframe src="main.html" height="566px" width="100%" scrolling="no"></iframe>

[Run the Tutor Reply Hint Levels MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 11: Mastery Learning and the Case for a Compressed Morning](../../chapters/11-mastery-learning-case-compressed-morning/index.md){ .md-button }

To edit the sketch, paste the contents of `tutor-reply-hint-levels.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor's p5.js version to 2.x. The learning content is in the `CONFIG` block at the top of the file.

## About This MicroSim

A good tutor keeps the thinking with the student. The four-level hint ladder from Chapter 2 measures how much of the solution a reply gives away:

| Level | What the reply does |
|---|---|
| 1 | Asks what the problem is asking, without giving any part of the method |
| 2 | Narrows the plan, such as naming which quantities to use or which operation type |
| 3 | Gives the specific step to carry out, leaving the final computation |
| 4 | States the final answer or does the whole solution |

Every reply in this MicroSim answers the same question: "A 6-pack of juice costs \$4.50. What is the price per bottle?" Look at what each reply reveals, not at how friendly it sounds. After each answer the feedback says whether the reply suits a first response: Levels 1 and 2 do, Levels 3 and 4 do not. The replies are illustrative examples written for this chapter.

## How to Use

Read the tutor's reply, then choose Level 1, 2, 3, or 4. Press **Show the four levels** to see the ladder. A wrong first answer gives a hint and lets you choose again, but only the first answer counts toward **First-try correct**. After eight replies, the results screen shows your score and lets you review the replies you missed.

### Controls

- **Choice buttons:** commit an answer. A wrong first answer gives a hint and lets you choose again; only the first answer counts.
- **Show definitions:** opens or closes the reference table. Reading it is exploration, not evidence.
- **Next:** moves to the next item after feedback. On the results screen, Previous missed and Next missed step through what you missed.
- **Play again:** starts a practice run with the items reshuffled. Practice runs do not change the first-run score.

Nothing moves until you act, and the MicroSim does not store your answers.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/tutor-reply-hint-levels/main.html"
        height="566px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner can **classify** eight AI tutor replies to the same question by hint level (1 to 4), correctly placing at least seven of eight on the first attempt. (Bloom level: Understand.)

### Audience

Teachers, administrators, school board members, policymakers, and parents.

### Duration

10 minutes

### Prerequisites

- Productive struggle, the four-level hint ladder, cognitive offloading, and AI tutor, from Chapter 2 and Chapter 11

### Activities

1. **Classify (5 min).** Place the eight replies. For each one, ask: what is left for the student to do?
2. **Compare (3 min).** Two replies sound very different and are both Level 4. Which are they, and what do they share?
3. **Rewrite (4 min).** Take a Level 4 reply and rewrite it as a Level 1 or Level 2 reply.

### Assessment

Mastery is 7 of 8 correct on the first try. Only the first answer to each reply on the first run counts. Then ask learners to answer these without the MicroSim:

1. "Divide the total by the number of bottles." Which level? *(Level 3. It gives the step and leaves only the computation.)*
2. Is a worked example of a similar problem a Level 1 hint? *(No. It shows the step, so it is Level 3.)*
3. Why does a polite reply that states the answer still count as Level 4? *(The level measures what the reply reveals, not its tone.)*

## References

1. [Instructional scaffolding](https://en.wikipedia.org/wiki/Instructional_scaffolding). Wikipedia. Support that is faded as the learner gains skill.
2. [Intelligent tutoring system](https://en.wikipedia.org/wiki/Intelligent_tutoring_system). Wikipedia. Computer tutors and how they give hints.
3. [Generative AI Can Harm Learning](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4895486). Bastani and colleagues. The Turkish high-school study that compared open GPT-4 with a hint-first tutor.
