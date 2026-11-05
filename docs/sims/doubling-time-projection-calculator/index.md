---
title: "Doubling Time Projection Calculator"
description: "Calculate how many months a 50-minute task horizon takes to reach 40 hours for doubling times of 4, 5, and 6 months, then explore other doubling times and targets."
image: /sims/doubling-time-projection-calculator/doubling-time-projection-calculator.png
og:image: /sims/doubling-time-projection-calculator/doubling-time-projection-calculator.png
twitter:image: /sims/doubling-time-projection-calculator/doubling-time-projection-calculator.png
social:
   cards: false
status: built
quality_score: 100
---

# Doubling Time Projection Calculator

<iframe src="main.html" height="689px" width="100%" scrolling="no"></iframe>

[Run the Doubling Time Projection Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 5: Projecting AI Growth: Doubling Curves, Limits, and Uncertainty](../../chapters/05-projecting-ai-growth-doubling-curves/index.md){ .md-button }

To edit the sketch, paste the contents of `doubling-time-projection-calculator.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor's p5.js version to 2.x. The learning content is in the `CONFIG` block near the top of the file.

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/doubling-time-projection-calculator/main.html"
        height="689px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

If a quantity doubles at a steady rate, the time to reach a target is:

**months to target = number of doublings × doubling time**, where the number of doublings = log2(target ÷ start).

Starting from a 50-minute task horizon, 40 hours (2,400 minutes) is 48 times the start, which needs about 5.6 doublings. Three questions ask for the months to reach 40 hours at doubling times of 5, 4, and 6 months. Then the doubling-time slider and the target menu unlock, and a timeline and a bar chart show how the date moves.

This is an illustrative projection, not a forecast. The 50-minute start comes from Chapter 4; the 5-, 40-, and 160-hour targets are illustrative. The book uses a doubling time of about every five months.

## How to Use

Nothing moves until you act, and the MicroSim does not store your answers.

- **Your answer box and Check:** type a whole number of months and press Check (or Enter). Two attempts per question; only the first counts.
- **Next:** moves on; after question 3 it unlocks the controls.
- **Doubling time:** slider from 3 to 12 months.
- **Target:** menu of 5, 40, or 160 hours.
- **Redo challenges and Defaults:** start the questions again, or reset to 5 months and 40 hours.

The red marker on the timeline is your current setting; the blue markers are the 4-, 5-, and 6-month answers.

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner will **calculate** how many months a 50-minute task horizon takes to reach 40 hours for doubling times of 4, 5, and 6 months, to within one month, and describe how the answer changes with the doubling time. (Bloom level: Apply.)

### Audience

Teachers, administrators, school board members, education policymakers, and parents.

### Duration

10-15 minutes.

### Prerequisites

- Exponential growth, doubling time, number of doublings, trend extrapolation, and forecast uncertainty, from Chapter 5.

### Activities

1. **Calculate (5 min).** Multiply 5.6 doublings by 5, 4, and 6 months on paper, then check each answer.
2. **Explore (5 min).** Move the doubling time one month at a time. How far does the 40-hour date move each step?
3. **Discuss (4 min).** A colleague says "40 hours will arrive in exactly 28 months." What would you add about uncertainty?

### Assessment

Ask learners to answer without the MicroSim, then check each answer by using it.

1. Start 50 minutes, target 40 hours, doubling every 5 months. How many months? *(About 28 (5.6 × 5).)*
2. The same at a 4-month and a 6-month doubling time? *(About 22 and about 34 months.)*
3. Does 160 hours take four times as long as 40 hours? *(No. It is only 2 more doublings: about 38 months at a 5-month doubling time.)*
4. Does a forecast have one answer? *(No. A one-month change in doubling time moves the 40-hour date by about 5.6 months.)*

## References

1. [Doubling time](https://en.wikipedia.org/wiki/Doubling_time). Wikipedia. The time for a growing quantity to double.
2. [Exponential growth](https://en.wikipedia.org/wiki/Exponential_growth). Wikipedia. Growth at a constant rate per period.
3. [Binary logarithm](https://en.wikipedia.org/wiki/Binary_logarithm). Wikipedia. log2 counts how many doublings separate two values.
4. [Measuring AI Ability to Complete Long Tasks](https://arxiv.org/abs/2503.14499). METR (2025), arXiv preprint. The source of the task-horizon method and the roughly 170-task suite.
