---
title: "Four Thinking Skills Sorter"
description: "Classify eight school activities as decomposition, pattern recognition, abstraction, or algorithmic thinking."
image: /sims/four-thinking-skills-sorter/four-thinking-skills-sorter.png
og:image: /sims/four-thinking-skills-sorter/four-thinking-skills-sorter.png
twitter:image: /sims/four-thinking-skills-sorter/four-thinking-skills-sorter.png
social:
   cards: false
status: built
quality_score: 100
---

# Four Thinking Skills Sorter

<iframe src="main.html" height="622px" width="100%" scrolling="no"></iframe>

[Run the Four Thinking Skills Sorter MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 12: AI Guardrails: Teaching Thinking Without Over-Reliance](../../chapters/12-ai-guardrails-teaching-thinking-without/index.md){ .md-button }

To edit the sketch, paste the contents of `four-thinking-skills-sorter.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor's p5.js version to 2.x. The learning content is in the `CONFIG` block at the top of the file.

## About This MicroSim

Four thinking skills show up far beyond programming. Each has one defining move:

| Skill | Defining move |
|---|---|
| Decomposition | Breaking a big problem into smaller parts |
| Pattern recognition | Noticing what repeats or what examples share |
| Abstraction | Ignoring detail that does not matter, to focus on what does |
| Algorithmic thinking | Writing precise steps that solve the problem every time |

The eight activities come from ordinary school life: a science fair, an essay, a subway map, a recipe. Look for the defining move. Breaking a task into steps is decomposition; writing steps so exact that anyone can follow them is algorithmic thinking. The activities are illustrative examples written for this chapter.

## How to Use

Read the activity, then choose one of the four skills. Press **Show definitions** to see the defining move of each skill. A wrong first answer gives a hint and lets you choose again, but only the first answer counts toward **First-try correct**. After eight activities, the results screen shows your score and the activities you misplaced.

### Controls

- **Choice buttons:** commit an answer. A wrong first answer gives a hint and lets you choose again; only the first answer counts.
- **Show definitions:** opens or closes the reference table. Reading it is exploration, not evidence.
- **Next:** moves to the next item after feedback. On the results screen, Previous missed and Next missed step through what you missed.
- **Play again:** starts a practice run with the items reshuffled. Practice runs do not change the first-run score.

Nothing moves until you act, and the MicroSim does not store your answers.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/four-thinking-skills-sorter/main.html"
        height="622px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner can **classify** eight student activities as decomposition, pattern recognition, abstraction, or algorithmic thinking, correctly placing at least seven of eight on the first attempt. (Bloom level: Understand.)

### Audience

Teachers, administrators, school board members, policymakers, and parents.

### Duration

10 minutes

### Prerequisites

- Decomposition, pattern recognition, abstraction, and algorithmic thinking, from the section "Teaching Thinking with AI" in Chapter 12

### Activities

1. **Classify (5 min).** Place the eight activities. Name the defining move before you choose.
2. **Notice (2 min).** Count the chips in each bin on the right. What do you notice?
3. **Create (5 min).** Write one activity from your own subject for each of the four skills.

### Assessment

Mastery is 7 of 8 correct on the first try. Only the first answer to each activity on the first run counts. Then ask learners to answer these without the MicroSim:

1. A student lists the steps to make a sandwich so a robot could follow them. Which skill? *(Algorithmic thinking.)*
2. Is every step-by-step activity an algorithm? *(No. Splitting a task into parts is decomposition; an algorithm needs steps exact enough to follow without guessing.)*
3. Does abstraction make a problem harder to understand? *(No. It drops detail that does not matter, which makes the structure easier to see.)*

## References

1. [Computational thinking](https://en.wikipedia.org/wiki/Computational_thinking). Wikipedia. The four skills and where they come from.
2. [Decomposition (computer science)](https://en.wikipedia.org/wiki/Decomposition_(computer_science)). Wikipedia. Breaking a system into parts.
3. [Abstraction (computer science)](https://en.wikipedia.org/wiki/Abstraction_(computer_science)). Wikipedia. Hiding detail to focus on structure.
4. [Algorithm](https://en.wikipedia.org/wiki/Algorithm). Wikipedia. A finite, precise sequence of steps.
