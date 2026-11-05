---
title: "Challenge and Prior Knowledge Zone Explorer"
description: "Predict whether a student is bored, engaged, in productive struggle, or overwhelmed from the gap between task challenge and prior knowledge, then explore the model."
image: /sims/challenge-knowledge-zone-explorer/challenge-knowledge-zone-explorer.png
og:image: /sims/challenge-knowledge-zone-explorer/challenge-knowledge-zone-explorer.png
twitter:image: /sims/challenge-knowledge-zone-explorer/challenge-knowledge-zone-explorer.png
social:
   cards: false
status: built
quality_score: 100
---

# Challenge and Prior Knowledge Zone Explorer

<iframe src="main.html" height="764px" width="100%" scrolling="no"></iframe>

[Run the Challenge and Prior Knowledge Zone Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 2: Evidence, Motivation, and the Stakeholders of Schooling](../../chapters/02-evidence-motivation-stakeholders/index.md){ .md-button }

To edit the sketch, paste the contents of `challenge-knowledge-zone-explorer.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor to p5.js 2.x. The learning content is in the `CONFIG` block at the top of the file.

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/challenge-knowledge-zone-explorer/main.html"
        height="764px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

How a student feels about a task depends on the **gap** between the task's challenge and what the student already knows. Both are rated on a 1-to-10 scale, and the gap is challenge minus prior knowledge.

| Gap | Without support | With support (hint ladder) |
|---|---|---|
| −2 or less | Bored | Bored |
| −1 to 1 | Engaged | Engaged |
| 2 to 3 | Productive struggle | Productive struggle |
| 4 | Overwhelmed | Productive struggle |
| 5 or more | Overwhelmed | Overwhelmed |

Support matters at the edge. A gap of 4 overwhelms a student working alone, but a hint ladder keeps the same student making progress.

The MicroSim first gives you six scenarios. For each one you predict the state before it is revealed. After your results, **Explore the model** opens a map of every challenge and knowledge pair, colored by state, with sliders and a support checkbox.

This is an illustrative model, not measured data. It is based on the chapter's challenge-and-knowledge model and inspired by Csikszentmihalyi's research on flow.

## How to Use

- Read the scenario: the task challenge, the student's prior knowledge, and whether support is on.
- Work out the gap, then press the state you predict. Your prediction is final for each scenario.
- The feedback shows the gap and the reason. Press **Next** for the next scenario.
- After all six scenarios, the results screen shows your score. **Explore the model** opens the map. Move the two sliders and tick **Support available** to see which pairs change state.
- **Back to results** returns to the results screen. **Play again** starts a practice run.

Mastery is 5 of 6 on the first run. Nothing moves until you choose, and the MicroSim does not store your answers.

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner can **distinguish** whether a student is bored, engaged, in productive struggle, or overwhelmed by examining the gap between task challenge and prior knowledge and whether support is available, with at least 5 of 6 scenarios correct. (Bloom level: Analyze.)

### Audience

Teachers, administrators, school board members, policymakers, and parents.

### Duration

10-15 minutes.

### Prerequisites

- Prior knowledge, student boredom, student engagement, productive struggle, and the four states of the challenge-minus-knowledge gap, from [Chapter 2](../../chapters/02-evidence-motivation-stakeholders/index.md).

### Activities

1. **Predict (6 min).** Work through the six scenarios. Write the gap on paper before you choose a state.
2. **Explore (5 min).** Open **Explore the model**. Set challenge 8 and prior knowledge 4, then tick and untick support. Then try a gap of 3 and a gap of 5. When does support change the state?
3. **Discuss (4 min).** A student is overwhelmed by a task with a gap of 4. Name two responses: one that lowers the challenge and one that adds support. Which keeps the learning goal intact?

### Assessment

Ask learners to answer without the MicroSim.

1. A task is at level 5 and the student knows level 7. What is the state? *(Bored. The gap is −2.)*
2. Does struggle always mean the task is too hard? *(No. A gap of 2 or 3 is productive struggle, where effort pays off.)*
3. A gap of 4 overwhelms a student. Is making the task easier the only fix? *(No. A hint ladder turns the same gap into productive struggle.)*

## References

1. [Flow (psychology)](https://en.wikipedia.org/wiki/Flow_(psychology)). Wikipedia. Csikszentmihalyi's model of challenge and skill.
2. [Zone of proximal development](https://en.wikipedia.org/wiki/Zone_of_proximal_development). Wikipedia. What a learner can do with help but not yet alone.
3. [Instructional scaffolding](https://en.wikipedia.org/wiki/Instructional_scaffolding). Wikipedia. Support that lets a learner work above their current level.
