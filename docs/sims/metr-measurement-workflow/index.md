---
title: "METR Measurement Workflow"
description: "Read the six steps that turn AI task results into a 50 percent time horizon, then answer five questions about the steps."
image: /sims/metr-measurement-workflow/metr-measurement-workflow.png
og:image: /sims/metr-measurement-workflow/metr-measurement-workflow.png
twitter:image: /sims/metr-measurement-workflow/metr-measurement-workflow.png
social:
   cards: false
status: built
quality_score: 100
---

# METR Measurement Workflow

<iframe src="main.html" height="564px" width="100%" scrolling="no"></iframe>

[Run the METR Measurement Workflow MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 4: Measuring AI Capability: The METR Task-Horizon Studies](../../chapters/04-measuring-ai-capability-metr/index.md){ .md-button }

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/metr-measurement-workflow/main.html"
        height="564px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

How do you turn a pile of AI test results into one number? METR's method has six steps: assemble a task suite of roughly 170 tasks, time skilled humans on each one, run the AI model several times on every task, record each task's success rate, fit a success curve against human working time, and read off the task length where the curve crosses 50 percent.

The flowchart shows the six steps, and each arrow names what one step hands to the next. Click a step to read what it does. Then press **Start the questions** for five multiple-choice questions, one attempt each.

The steps and the figure of roughly 170 tasks are as described in a 2025 preprint, METR's *Measuring AI Ability to Complete Long Tasks*.

## How to Use

Nothing moves until you act, and the MicroSim does not store your answers.

- **Steps in the flowchart:** click (or tab to and press Enter) to read a step's description. The step turns gold; steps you have read turn green.
- **Start the questions:** shows question 1 of 5.
- **Answer options and Submit:** choose one option and press Submit. One attempt per question; the correct option is then shown.
- **Next and Try again:** move through the questions, and restart them after the score.

Notice that human working time, the unit of the horizon, appears in step 2 and again in step 6.

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner will **explain** the six steps that turn AI task results into a 50 percent time horizon, correctly answering at least four of five questions about the steps. (Bloom level: Understand.)

### Audience

Teachers, administrators, school board members, education policymakers, and parents.

### Duration

10 minutes.

### Prerequisites

- Benchmark task suite, human working time, task success rate, task horizon, and 50 percent time horizon, from the section "METR and the Task-Horizon Idea" in Chapter 4.

### Activities

1. **Read the steps (3 min).** Click each step in order. For each, say what it produces and what the next step needs.
2. **Answer (5 min).** Work the five questions. Before you submit, say which step the question is about.
3. **Explain (3 min).** In two sentences, explain to a parent why a 2-hour horizon does not mean the AI is reliable on 2-hour tasks.

### Assessment

Ask learners to answer without the MicroSim, then check each answer by using it.

1. What unit measures how long a task is? *(The human working time the task needs.)*
2. A model has a 50 percent horizon of 2 hours. What does that mean? *(It succeeds about half the time on tasks that take a skilled human about 2 hours.)*
3. A model succeeds on 9 of 10 attempts. What is the task success rate? *(90 percent.)*
4. Why is human time used instead of AI running time? *(Human time is a common yardstick for difficulty; AI run time depends on hardware.)*

## References

1. [Measuring AI Ability to Complete Long Tasks](https://arxiv.org/abs/2503.14499). METR (2025), arXiv preprint. The source of the task-horizon method and the roughly 170-task suite.
2. [METR](https://metr.org/). The research organization that publishes the task-horizon measurements.
3. [Logistic regression](https://en.wikipedia.org/wiki/Logistic_regression). Wikipedia. The kind of curve fit used to relate success to task length.
