---
title: "Bloom Level Task Sorter"
description: "Sort twelve classroom tasks into the six levels of the revised Bloom's Taxonomy, with a hint and a second try for each task."
image: /sims/bloom-level-task-sorter/bloom-level-task-sorter.png
og:image: /sims/bloom-level-task-sorter/bloom-level-task-sorter.png
twitter:image: /sims/bloom-level-task-sorter/bloom-level-task-sorter.png
social:
   cards: false
status: built
quality_score: 100
---

# Bloom Level Task Sorter

<iframe src="main.html" height="768px" width="100%" scrolling="no"></iframe>

[Run the Bloom Level Task Sorter MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 1: The Building Blocks of Schools, Students, and Learning](../../chapters/01-building-blocks-schools-students/index.md){ .md-button }

To edit the sketch, paste the contents of `bloom-level-task-sorter.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor to p5.js 2.x. The learning content is in the `CONFIG` block at the top of the file.

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/bloom-level-task-sorter/main.html"
        height="768px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

The revised Bloom's Taxonomy (Anderson and Krathwohl, 2001) sorts learning outcomes into six levels of thinking: **Remember**, **Understand**, **Apply**, **Analyze**, **Evaluate**, and **Create**. The top three are called higher-order thinking.

This MicroSim shows twelve tasks from different subjects, one at a time, in a shuffled order. You choose the level each task asks for. The tasks mix subjects so you sort by the kind of thinking, not by the topic.

Three traps are built in. The verb alone does not decide the level. A longer or harder task is not always higher. Writing something is not automatically Create.

The tasks are illustrative, written for this chapter.

## How to Use

- Read the task on the card, then press the level button you think fits.
- **Show definitions** opens the one-line definition of each level. Reading it does not count against you.
- If your first answer is wrong, you get a hint and a second try. Only the first try counts toward your score.
- After the second try, the correct level and the reason appear. Press **Next** for the next task.
- After all twelve tasks, the results screen shows your first-try score. **Previous missed** and **Next missed** step through the tasks you missed. **Play again** reshuffles the tasks for practice.

Mastery is 10 of 12 on the first try. Nothing moves until you choose, and the MicroSim does not store your answers.

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner can **classify** twelve classroom tasks into the six levels of the 2001 revised Bloom's Taxonomy, placing at least 10 of 12 correctly on the first try. (Bloom level: Understand.)

### Audience

Teachers, administrators, school board members, policymakers, and parents.

### Duration

10-15 minutes.

### Prerequisites

- The six levels of Bloom's Taxonomy and the meaning of higher-order thinking, from [Chapter 1](../../chapters/01-building-blocks-schools-students/index.md).

### Activities

1. **Predict (2 min).** Before you start, write down which level you think "Explain in your own words why ice floats" belongs to, and which level "Compare two accounts of the same battle" belongs to.
2. **Sort (8 min).** Work through all twelve tasks. Use **Show definitions** whenever you are unsure.
3. **Discuss (5 min).** Look at the tasks you missed. For each one, name the trap: the verb, the length, or the act of writing.

### Assessment

Ask learners to answer without the MicroSim.

1. "Explain why ice floats" and "Compare two accounts of a battle" both ask the student to talk about an idea. Why are they at different levels? *(Explaining restates an idea, which is Understand. Comparing breaks two sources into parts and relates them, which is Analyze.)*
2. Is "State the year the Constitution was signed" a higher level because it is a history task? *(No. Recalling one fact is Remember.)*
3. Is every writing task Create? *(No. Summarizing in writing is Understand. Composing a new story is Create.)*

## References

1. [Bloom's taxonomy](https://en.wikipedia.org/wiki/Bloom%27s_taxonomy). Wikipedia. The original 1956 framework and the 2001 revision.
2. [Bloom's Taxonomy](https://cft.vanderbilt.edu/guides-sub-pages/blooms-taxonomy/). Vanderbilt University Center for Teaching. The six revised levels with sample verbs and classroom uses.
3. [Higher-order thinking](https://en.wikipedia.org/wiki/Higher-order_thinking). Wikipedia. Why the top levels are grouped together.
