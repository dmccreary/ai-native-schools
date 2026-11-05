---
title: "Evidence Tier Claim Checker"
description: "Judge the evidence behind ten fictional vendor claims by placing each in one of five evidence levels, from Strong to No evidence of effect."
image: /sims/evidence-tier-claim-checker/evidence-tier-claim-checker.png
og:image: /sims/evidence-tier-claim-checker/evidence-tier-claim-checker.png
twitter:image: /sims/evidence-tier-claim-checker/evidence-tier-claim-checker.png
social:
   cards: false
status: built
quality_score: 100
---

# Evidence Tier Claim Checker

<iframe src="main.html" height="838px" width="100%" scrolling="no"></iframe>

[Run the Evidence Tier Claim Checker MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 2: Evidence, Motivation, and the Stakeholders of Schooling](../../chapters/02-evidence-motivation-stakeholders/index.md){ .md-button }

To edit the sketch, paste the contents of `evidence-tier-claim-checker.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor to p5.js 2.x. The learning content is in the `CONFIG` block at the top of the file.

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/evidence-tier-claim-checker/main.html"
        height="838px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

Vendors describe their products with claims that sound like evidence. Some are. Many are not. The question to ask is how the comparison was built.

This MicroSim uses five levels. The first four follow the Every Student Succeeds Act (ESSA) evidence tiers. The fifth holds everything that is not evidence of effect.

| Level | What it needs |
|---|---|
| Strong | Random assignment, well designed and well carried out |
| Moderate | A comparison group, but no random assignment |
| Promising | A correlational study that adjusts for who chose the program |
| Demonstrates a rationale | A research-based reason to expect it to work; results not yet in |
| No evidence of effect | Testimonials, surveys, usage counts, uncontrolled before-and-after or self-selected comparisons |

You judge ten claims about a fictional program called MathPath. Two claims test a common trap: a study of 12,000 students that sits in the lowest level, and a study of 1,200 students that sits in the highest. Sample size does not fix how the groups were formed.

The claims are fictional and written for this chapter.

## How to Use

- Read the claim on the card, then press the evidence level you think fits.
- **Show definitions** opens the one-line definition of each level.
- If your first answer is wrong, you get a hint and a second try. Only the first try counts toward your score.
- After the second try, the correct level and the reason appear. Press **Next** for the next claim.
- After all ten claims, the results screen shows your first-try score and lets you step through the claims you missed. **Play again** reshuffles the claims for practice.

Mastery is 8 of 10 on the first try. Nothing moves until you choose, and the MicroSim does not store your answers.

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner can **judge** the strength of the evidence behind ten vendor claims by placing each in one of five evidence levels, with at least 8 of 10 correct on the first try. (Bloom level: Evaluate.)

### Audience

Teachers, administrators, school board members, policymakers, and parents.

### Duration

10-15 minutes.

### Prerequisites

- Evidence-based practice, randomized controlled trial, selection bias, and the five evidence levels, from [Chapter 2](../../chapters/02-evidence-motivation-stakeholders/index.md).

### Activities

1. **Predict (2 min).** Before you start, decide: is a study of 12,000 students always stronger than a study of 1,200? Write down why.
2. **Judge (8 min).** Work through all ten claims. For each one, ask first how the groups were formed.
3. **Apply (5 min).** Find a real vendor web page for an education product. Sort its claims into the five levels. How many are evidence of effect at all?

### Assessment

Ask learners to answer without the MicroSim.

1. A program reports that 94% of teachers love it. Which level is that? *(No evidence of effect. Satisfaction is not learning.)*
2. Students who chose an optional program scored higher than those who did not. Does a large sample make this Strong? *(No. The groups chose themselves, so they differ in ways a large sample does not fix.)*
3. What is the one feature that separates Strong from Moderate? *(Random assignment to the program or a control group.)*

## References

1. [Every Student Succeeds Act](https://en.wikipedia.org/wiki/Every_Student_Succeeds_Act). Wikipedia. The 2015 federal law that defines the evidence tiers.
2. [Randomized controlled trial](https://en.wikipedia.org/wiki/Randomized_controlled_trial). Wikipedia. Why random assignment supports a causal claim.
3. [Selection bias](https://en.wikipedia.org/wiki/Selection_bias). Wikipedia. How self-selected groups distort a comparison.
4. [What Works Clearinghouse](https://ies.ed.gov/ncee/wwc/). Institute of Education Sciences. Reviews of education research by study design.
