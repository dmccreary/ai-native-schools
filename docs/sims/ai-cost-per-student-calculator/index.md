---
title: "AI Cost per Student Calculator"
description: "Calculate the yearly AI inference cost per student from tokens per session, sessions per day, school days, and price per million tokens, then explore how price changes the result."
image: /sims/ai-cost-per-student-calculator/ai-cost-per-student-calculator.png
og:image: /sims/ai-cost-per-student-calculator/ai-cost-per-student-calculator.png
twitter:image: /sims/ai-cost-per-student-calculator/ai-cost-per-student-calculator.png
social:
   cards: false
status: built
quality_score: 100
---

# AI Cost per Student Calculator

<iframe src="main.html" height="644px" width="100%" scrolling="no"></iframe>

[Run the AI Cost per Student Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 4: Measuring AI Capability: The METR Task-Horizon Studies](../../chapters/04-measuring-ai-capability-metr/index.md){ .md-button }

To edit the sketch, paste the contents of `ai-cost-per-student-calculator.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor's p5.js version to 2.x. The learning content is in the `CONFIG` block near the top of the file.

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/ai-cost-per-student-calculator/main.html"
        height="644px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

A school that gives every student an AI tutor pays for **AI inference**: each session uses tokens, and providers charge a price per million tokens. The yearly cost per student is:

**cost per student per year = tokens per session × sessions per day × school days × price per million tokens ÷ 1,000,000**

Three challenges come first, with the inputs shown but locked. After the third, the controls unlock and the yearly cost, the daily cost, the district total for 12,000 students, and the share of $15,600 per-pupil spending update at once. A bar chart compares the same usage at all four prices.

The $20.00 (November 2022) and $0.07 (October 2024) prices for GPT-3.5-level performance come from the Stanford AI Index 2025. The $2.00 and $0.20 prices are illustrative, and so are the session sizes.

## How to Use

Nothing moves until you act, and the MicroSim does not store your answers.

- **Your answer box and Check:** type a dollar amount for the challenge and press Check (or Enter). Two attempts per challenge; only the first counts toward the score.
- **Next:** moves to the next challenge. After challenge 3 it unlocks the controls.
- **Tokens per session:** slider from 5,000 to 100,000 in steps of 5,000.
- **Sessions per day:** slider from 1 to 5.
- **School days:** slider from 150 to 200 in steps of 10.
- **Price per million tokens:** menu of $20.00, $2.00, $0.20, and $0.07.
- **Redo challenges and Defaults:** start the challenges again, or reset the controls.

Costs are shown to the cent, and to the tenth of a cent when under $1.

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner will **calculate** the yearly AI inference cost per student from tokens per session, sessions per day, school days, and price per million tokens, to within one cent, in three of three challenges. (Bloom level: Apply.)

### Audience

Teachers, administrators, school board members, education policymakers, and parents.

### Duration

10-15 minutes.

### Prerequisites

- AI inference cost, token, and price per million tokens, from the section "AI Inference Cost" in Chapter 4.

### Activities

1. **Calculate (6 min).** Work the three challenges on paper first, then type each answer. Read the working shown after each one.
2. **Compare (4 min).** After the controls unlock, keep the usage fixed and switch between $20.00 and $0.07. How many times larger is the cost at $20.00?
3. **Explore (4 min).** At $0.07, raise tokens per session and sessions per day to their maximums. Is the cost still small next to $15,600 per pupil?

### Assessment

Ask learners to answer without the MicroSim, then check each answer by using it.

1. A district uses 20,000 tokens per session, 1 session a day, 180 days, at $20.00 per million tokens. What is the yearly cost per student? *($72.00. 3.6 million tokens × $20.00 per million.)*
2. The same usage at $0.07 per million tokens? *(About $0.25.)*
3. Which input changed the cost most between 2022 and 2024? *(The price per million tokens, which fell more than 280-fold.)*
4. Is a capable AI tutor out of reach for a public school on cost alone? *(Not at these prices: inference is a tiny share of per-pupil spending. Other costs, such as training and oversight, still matter.)*

## References

1. [The 2025 AI Index Report](https://hai.stanford.edu/ai-index/2025-ai-index-report). Stanford HAI. Reports the fall in the price of GPT-3.5-level performance from about $20 to about $0.07 per million tokens.
2. [Large language model](https://en.wikipedia.org/wiki/Large_language_model). Wikipedia. How language models process text as tokens.
3. [Lexical analysis: tokens](https://en.wikipedia.org/wiki/Lexical_analysis#Token). Wikipedia. What a token is in computing.
