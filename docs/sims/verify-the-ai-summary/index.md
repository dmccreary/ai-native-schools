---
title: "Verify the AI Summary"
description: "Judge whether each of six statements in an AI-written summary is supported by a short source passage."
image: /sims/verify-the-ai-summary/verify-the-ai-summary.png
og:image: /sims/verify-the-ai-summary/verify-the-ai-summary.png
twitter:image: /sims/verify-the-ai-summary/verify-the-ai-summary.png
social:
   cards: false
status: built
quality_score: 100
---

# Verify the AI Summary

<iframe src="main.html" height="744px" width="100%" scrolling="no"></iframe>

[Run the Verify the AI Summary MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 5: Projecting AI Growth: Doubling Curves, Limits, and Uncertainty](../../chapters/05-projecting-ai-growth-doubling-curves/index.md){ .md-button }

To edit the sketch, paste the contents of `verify-the-ai-summary.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor's p5.js version to 2.x. The learning content is in the `CONFIG` block near the top of the file.

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/verify-the-ai-summary/main.html"
        height="744px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

An AI-written summary can be fluent and still be wrong. Some statements match the source, some are subtly changed, and some are invented. The habit that protects against this is simple: check each statement against the source.

The source passage describes a six-week math pilot at Lincoln Middle School. For each of six statements from an AI-written summary, you choose **Supported** or **Not supported** and press **Submit**. After each answer the matching sentence of the passage is highlighted, if there is one. Missing information counts as Not supported.

The passage and the summary are fictional, written for practice. The figures are the Chapter 2 pilot: 280 students, 140 per group, 30 minutes a day, six weeks, and averages of 34 and 30.

## How to Use

Nothing moves until you act, and the MicroSim does not store your answers.

- **Supported, Not supported:** choose your judgment for the statement.
- **Submit:** commits it. Two attempts per statement; only the first counts.
- **Next:** moves to the next statement; after the sixth it shows your score.
- **Show the rule:** checkbox that shows how to judge a statement.
- **Try again:** starts over from statement 1.

Read the passage first. Statements are in a fixed order.

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner will **judge** whether each of six statements in an AI-written summary is supported by a source passage, correctly judging at least five of six on the first attempt. (Bloom level: Evaluate.)

### Audience

Teachers, administrators, school board members, education policymakers, and parents.

### Duration

10 minutes.

### Prerequisites

- AI hallucination, grounding in a source, and AI literacy, from the section "AI Hallucination and AI Literacy" in Chapter 5.

### Activities

1. **Read (2 min).** Read the passage once without looking at the statements.
2. **Judge (5 min).** For each statement, find the sentence that supports it before you submit. If you cannot find one, it is Not supported.
3. **Discuss (3 min).** Statement 6 sounds reasonable. What would a busy reader have to do to catch it?

### Assessment

Ask learners to answer without the MicroSim, then check each answer by using it.

1. The summary says the pilot lasted a full semester. Supported? *(Not supported. The passage says six weeks.)*
2. The summary says students were assigned at random. Supported? *(Supported. A computer randomly assigned them.)*
3. The summary says a university team ran the evaluation, and the passage does not say who did. Supported? *(Not supported. Missing information counts as not supported.)*
4. Five of six statements check out. Can you trust the summary whole? *(No. Each statement must be checked; one invented claim can mislead.)*

## References

1. [Hallucination (artificial intelligence)](https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)). Wikipedia. Why language models produce fluent but false statements.
2. [Fact-checking](https://en.wikipedia.org/wiki/Fact-checking). Wikipedia. Checking claims against sources.
3. [Randomized controlled trial](https://en.wikipedia.org/wiki/Randomized_controlled_trial). Wikipedia. The design of the pilot in the passage.
