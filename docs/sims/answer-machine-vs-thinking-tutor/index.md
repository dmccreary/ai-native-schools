---
title: "Answer Machine vs. Thinking Tutor"
description: "An interactive grid infographic of the same homework question handled two ways: an open chatbot that gives the answer and leaves the student with nothing to do, and a guided AI tutor that gives hints and leaves the student doing the thinking, with the guardrails that make the difference."
status: built
social:
   cards: false
hide:
    - toc
---

<iframe src="main.html" height="720px" width="100%" scrolling="no"></iframe>

[Run the Answer Machine vs. Thinking Tutor MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 12: AI Guardrails: Teaching Thinking Without Over-Reliance](../../chapters/12-ai-guardrails-teaching-thinking-without/index.md){ .md-button }

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/answer-machine-vs-thinking-tutor/main.html"
        height="720px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

This poster shows one homework question handled two ways. In the middle, a six-pack of juice, a stack of coins and a question mark stand for the question used throughout Chapter 12: a six-pack costs \$4.50, so what is the price per bottle? Both tutors may run on the same underlying model. What differs is the design.

On the left, an open chatbot sends one big, finished answer with a checkmark. It is fast and always available, which is the benefit. The student leans back with a blank sheet and an empty thought cloud, which is the risk: over-reliance, where the tool does the thinking and the student cannot do the task without it. On the right, a guided tutor sends a chain of short bubbles, a question, a hint and a smaller question, and the student's last bubble is their own correct answer. That student is writing on paper, and their thought cloud holds the four thinking skills: decomposition, pattern recognition, abstraction and algorithmic thinking. The shield and guard rail at the bottom are the school's response: the guardrails that turn the left phone into the right one.

## How to Use

- **Explore:** hover over a panel to see its name, then click it to read a summary and facts. Most facts use the chapter's juice problem and Dev's conversation.
- **Quiz Me:** click **Quiz Me**. The sim asks a question, and you click the panel that answers it. Your score shows next to the buttons.
- **Calibrate (authors):** open [`main.html?edit=true`](./main.html?edit=true) to drag zone corners, then copy the JSON into `data.json`.

## The 6 Zones

1. **Answer machine**: the orange phone of an open AI chatbot, with one big answer bubble, a checkmark and a lightning bolt
2. **Left with: offloading**: the student leaning back under an empty, dashed thought cloud
3. **The same question**: the juice six-pack, coins and question mark in the center
4. **The guardrails**: the shield and guard rail ringed by a book, a calculator, an eye, an hourglass and a padlock
5. **Left with: thinking**: the student writing on paper under a thought cloud of four skill icons
6. **Thinking tutor**: the teal phone of a guided AI tutor, with a chain of question, hint and attempt bubbles

The image is a text-free SVG made by `make-tutor-poster-svg.py` in this folder. The script also prints the zone percentages used in `data.json`.

To practice the ideas on this poster, try the [Tutor Reply Hint Levels](../tutor-reply-hint-levels/index.md) MicroSim, which rates tutor replies on the four-level hint ladder, and the [Four Thinking Skills Sorter](../four-thinking-skills-sorter/index.md), which sorts student activities into the four thinking skills.

## Lesson Plan

### Learning Objective

The learner will compare an open AI chatbot with a guided AI tutor answering the same homework question, and explain how guardrails change what the student is left with.

**Bloom level:** Analyze. **Bloom verb:** compare.

### Audience

Teachers, instructional coaches, and school and district leaders choosing or configuring an AI tutor.

### Duration

10 minutes.

### Activities

1. **Explore (5 minutes):** click the center question first, then the two phones, then the two students. Finish with the guardrails.
2. **Quiz (3 minutes):** run Quiz Me until you can answer every question on the first click.
3. **Apply (2 minutes):** think of an AI tool your students use now. Which phone does it look like? Which guardrail from the shield would move it to the right side?

### Assessment

The learner answers at least 6 of 7 quiz questions correctly and can name two guardrails that would make a specific tool behave like the guided tutor.

## References

- Chapter 12, [AI Guardrails: Teaching Thinking Without Over-Reliance](../../chapters/12-ai-guardrails-teaching-thinking-without/index.md). Source of the juice problem, the hint ladder, the guardrail list and the Turkish study figures used on this poster.
- [Socratic questioning](https://en.wikipedia.org/wiki/Socratic_questioning) - Wikipedia
- [Computational thinking](https://en.wikipedia.org/wiki/Computational_thinking) - Wikipedia
