---
title: "Level-Specific Safeguard Matcher"
description: "Choose the lowest of five textbook levels at which each of eight safeguards should first be required."
image: /sims/level-specific-safeguard-matcher/level-specific-safeguard-matcher.png
og:image: /sims/level-specific-safeguard-matcher/level-specific-safeguard-matcher.png
twitter:image: /sims/level-specific-safeguard-matcher/level-specific-safeguard-matcher.png
social:
   cards: false
status: built
quality_score: 100
---

# Level-Specific Safeguard Matcher

<iframe src="main.html" height="734px" width="100%" scrolling="no"></iframe>

[Run the Level-Specific Safeguard Matcher MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 6: The Five-Level Model of Intelligent Textbooks](../../chapters/06-five-level-model-intelligent-textbooks/index.md){ .md-button }

To edit the sketch, paste the contents of `level-specific-safeguard-matcher.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor's p5.js version to 2.x. The learning content is in the `CONFIG` block near the top of the file.

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/level-specific-safeguard-matcher/main.html"
        height="734px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

A **level-specific policy** matches each safeguard to the textbook capability that first creates the risk. A safeguard first required at one level keeps applying at every higher level.

For each of eight safeguards you choose the lowest level, from 1 to 5, at which it should first be required, and press **Submit**. The results screen stacks the safeguards required at each level, so you can see how the list grows.

The safeguards and levels follow the Chapter 6 section "Graduated Regulation and Level-Specific Policy." They are recommended practice written for this book, not legal requirements.

## How to Use

Nothing moves until you act, and the MicroSim does not store your answers.

- **Level 1 to Level 5:** choose the lowest level at which the safeguard should first apply.
- **Submit:** commits your choice. Two attempts per safeguard; only the first counts.
- **Next:** moves on; after the eighth it shows your score and the stacked view.
- **Show level definitions:** checkbox that shows what each level adds.
- **Try again:** reshuffles the safeguards and starts over.

Ask which capability creates the risk, then find the first level that has it.

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner will **apply** the level-specific policy by choosing the lowest level at which each of eight safeguards should first be required, correctly matching at least seven of eight on the first attempt. (Bloom level: Apply.)

### Audience

Teachers, administrators, school board members, education policymakers, and parents.

### Duration

10-15 minutes.

### Prerequisites

- The five levels, level-specific policy, and graduated regulation, from Chapter 6.

### Activities

1. **Review (2 min).** Check "Show level definitions" and say what each level adds.
2. **Match (6 min).** For each safeguard, name the risk first, then the level where it appears, then submit.
3. **Discuss (4 min).** Three safeguards first apply at Level 3. Why, and why does none of them depend on whether the product contains an AI model?

### Assessment

Ask learners to answer without the MicroSim, then check each answer by using it.

1. At what level should an accessibility check first be required? *(Level 1. Every student must be able to use any textbook.)*
2. At what level does a privacy review of student records begin? *(Level 3, the first level that keeps records about individual students.)*
3. An adaptive product uses fixed rules and no AI model. Does it need data governance? *(Yes. It stores student records, which is the Level 3 risk.)*
4. Is human review of AI-generated lessons needed at Level 4? *(Not as a first requirement; it first applies at Level 5, where content is generated for each student.)*

## References

1. [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/). W3C. The standard behind an accessibility check.
2. [Family Educational Rights and Privacy Act](https://en.wikipedia.org/wiki/Family_Educational_Rights_and_Privacy_Act). Wikipedia. The U.S. law on student education records.
3. [Algorithmic bias](https://en.wikipedia.org/wiki/Algorithmic_bias). Wikipedia. Why systems that choose next steps need a bias audit.
