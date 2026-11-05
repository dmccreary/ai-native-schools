---
title: "Task Horizon Curve Explorer"
description: "Calculate a model's chance of finishing tasks of different lengths from its 50 percent time horizon, then move the horizon and watch the success curve shift."
image: /sims/task-horizon-curve-explorer/task-horizon-curve-explorer.png
og:image: /sims/task-horizon-curve-explorer/task-horizon-curve-explorer.png
twitter:image: /sims/task-horizon-curve-explorer/task-horizon-curve-explorer.png
social:
   cards: false
status: built
quality_score: 100
---

# Task Horizon Curve Explorer

<iframe src="main.html" height="619px" width="100%" scrolling="no"></iframe>

[Run the Task Horizon Curve Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 4: Measuring AI Capability: The METR Task-Horizon Studies](../../chapters/04-measuring-ai-capability-metr/index.md){ .md-button }

To edit the sketch, paste the contents of `task-horizon-curve-explorer.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor's p5.js version to 2.x. The learning content is in the `CONFIG` block near the top of the file.

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/task-horizon-curve-explorer/main.html"
        height="619px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

A model's **50 percent time horizon** H is the task length, in human working time, at which it succeeds about half the time. This MicroSim uses a simplified rule:

**P = 1 / (1 + t/H)**, where t is the task's human working time in minutes.

Three questions come first, with the horizon locked: the chance on a 15-minute task when H = 60 minutes, the task length where that chance reaches 80 percent, and the chance on a 60-minute task for a later model with H = 240 minutes. Then the horizon slider unlocks, and the curve on a logarithmic time axis and the six task success rates update at once.

The rule is a simplified illustrative model written for Chapter 4, in the spirit of the curves METR fits. It is not METR data.

## How to Use

Nothing moves until you act, and the MicroSim does not store your answers.

- **Your answer box and Check:** type a percent or a number of minutes and press Check (or Enter). Two attempts per question; only the first counts.
- **Next:** moves on; after question 3 it unlocks the slider.
- **Horizon H:** slider from 15 to 960 minutes in steps of 15.
- **Redo challenges and Defaults:** start the questions again, or return H to 60 minutes.

The dashed lines mark the 50 percent point, at H, and the 80 percent point, at a quarter of H.

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner will **calculate** a model's chance of completing tasks of different human working times from its 50 percent time horizon, to within 2 percentage points, and identify the task length at which the chance reaches 80 percent. (Bloom level: Apply.)

### Audience

Teachers, administrators, school board members, education policymakers, and parents.

### Duration

10-15 minutes.

### Prerequisites

- Human working time, task success rate, task horizon, 50 percent time horizon, and the rule P = 1/(1 + t/H), from the section "METR and the Task-Horizon Idea" in Chapter 4.

### Activities

1. **Calculate (5 min).** Answer the three questions on paper first.
2. **Explore (5 min).** Move H from 15 to 960 minutes. Where do the 50 percent and 80 percent points sit each time?
3. **Discuss (3 min).** A vendor says its model "handles hour-long tasks." Using the curve, what would you ask?

### Assessment

Ask learners to answer without the MicroSim, then check each answer by using it.

1. H = 60 minutes. What is the chance on a 15-minute task? *(80%. 1/(1 + 15/60) = 0.80.)*
2. Where is the 80 percent point for any H? *(At H/4.)*
3. Does the chance drop to zero just past the horizon? *(No. At t = H it is 50 percent, and it falls gradually after that.)*
4. Is a model with a 1-hour horizon reliable on all tasks up to an hour? *(No. At one hour it succeeds only about half the time.)*

## References

1. [Measuring AI Ability to Complete Long Tasks](https://arxiv.org/abs/2503.14499). METR (2025), arXiv preprint. The source of the task-horizon method and the roughly 170-task suite.
2. [Logarithmic scale](https://en.wikipedia.org/wiki/Logarithmic_scale). Wikipedia. Why task lengths from 1 minute to 16 hours are drawn on a log axis.
3. [Logistic function](https://en.wikipedia.org/wiki/Logistic_function). Wikipedia. The S-shaped curve family that success curves come from.
