---
title: "Generate Once Versus Generate for Each Student"
description: "Compare the yearly cost of generating a textbook once and serving it to everyone with generating content live for each student, and find the break-even number of students."
image: /sims/generate-once-vs-live-cost/generate-once-vs-live-cost.png
og:image: /sims/generate-once-vs-live-cost/generate-once-vs-live-cost.png
twitter:image: /sims/generate-once-vs-live-cost/generate-once-vs-live-cost.png
social:
   cards: false
status: built
quality_score: 100
---

# Generate Once Versus Generate for Each Student

<iframe src="main.html" height="654px" width="100%" scrolling="no"></iframe>

[Run the Generate Once Versus Generate for Each Student MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 9: Learning Graphs, Interoperability Standards, and Access at Scale](../../chapters/09-learning-graphs-interoperability/index.md){ .md-button }

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/generate-once-vs-live-cost/main.html"
        height="654px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

There are two ways to use AI for textbook content. **Generate once, serve many**: pay a one-time production cost, then serve the same pages to every student at almost no cost. **Generate live**: pay for AI inference for each student, every year.

The chart plots the yearly total for both on log scales against the number of students. The generate-once line is flat; the live line rises with every student. Three questions come first: the generate-once cost per student for 12,000 students, the live total for 12,000 students, and the number of students where the totals are equal. Then the controls unlock and both lines and the break-even point update at once.

All values are illustrative: the $22,400 production cost is the Chapter 7 example for a 20-chapter AI-assisted book, and 3.6 million tokens at $2.00 per million are the Chapter 4 and Chapter 7 example values.

## How to Use

Nothing moves until you act, and the MicroSim does not store your answers.

- **Your answer box and Check:** type a number and press Check (or Enter). Two attempts per question; only the first counts.
- **Next:** moves on; after question 3 it unlocks the controls.
- **Production cost:** slider from $5,000 to $100,000.
- **Tokens per student per year:** slider from 1 million to 10 million.
- **Price per million tokens:** menu of $0.07, $0.20, $2.00, and $20.00.
- **Students:** slider from 100 to 1,000,000 on a log scale, rounded to the nearest 100.
- **Redo questions and Defaults:** start the questions again, or reset the controls.

Hover over a point on the chart, after the controls unlock, to read its value.

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner will **compare** the total yearly cost of generating content once and serving it to all students with the cost of generating it live for each student, and determine the number of students at which the two are equal, to within 100 students. (Bloom level: Analyze.)

### Audience

Teachers, administrators, school board members, education policymakers, and parents.

### Duration

10-15 minutes.

### Prerequisites

- Generate once serve many and web page hosting (Chapter 9), and AI inference cost (Chapter 4).

### Activities

1. **Calculate (5 min).** Answer the three questions on paper first.
2. **Explore (5 min).** Lower the price to $0.20, then $0.07. Which way does the break-even point move, and why?
3. **Discuss (3 min).** When might live generation still be worth its cost?

### Assessment

Ask learners to answer without the MicroSim, then check each answer by using it.

1. Generate-once cost per student for 12,000 students? *($1.87 ($22,400 ÷ 12,000).)*
2. Live total for 12,000 students at $7.20 each? *($86,400.)*
3. Break-even number of students? *(About 3,100 ($22,400 ÷ $7.20).)*
4. Does the generate-once total grow with students? *(No. In this model serving costs nothing, so the line is flat.)*

## References

1. [Break-even (economics)](https://en.wikipedia.org/wiki/Break-even_(economics)). Wikipedia. Where two cost curves meet.
2. [Fixed cost](https://en.wikipedia.org/wiki/Fixed_cost). Wikipedia. Costs that do not change with the number served.
3. [Variable cost](https://en.wikipedia.org/wiki/Variable_cost). Wikipedia. Costs that grow with each unit.
4. [Static web page](https://en.wikipedia.org/wiki/Static_web_page). Wikipedia. Pages served unchanged to every reader.
