---
title: "Vendor Scorecard"
description: "Calculate the weighted scores of two vendors and apply the knockout rule to decide which vendor may proceed."
image: /sims/vendor-scorecard/vendor-scorecard.png
og:image: /sims/vendor-scorecard/vendor-scorecard.png
twitter:image: /sims/vendor-scorecard/vendor-scorecard.png
social:
   cards: false
status: built
---

# Vendor Scorecard

<iframe src="main.html" height="664px" width="100%" scrolling="no"></iframe>

[Run the Vendor Scorecard MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 20: Designing the AI-Native School Day](../../chapters/20-designing-ai-native-school-day/index.md){ .md-button }

To edit the sketch, paste the contents of `vendor-scorecard.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor's p5.js version to 2.x. The learning content is in the `CONFIG` block at the top of the file.

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/vendor-scorecard/main.html"
        height="664px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

A district compares two AI tutor vendors on seven criteria. Each criterion has a weight, and the weights add to 100. Each vendor gets a score from 1 to 5 on each criterion. The **weighted score** is the sum of weight × score ÷ 5. The **knockout rule** says a vendor that scores 2 or below on privacy and data governance, or on vendor viability, may not proceed until the problem is resolved.

The MicroSim starts with three questions. Vendor A scores 75 and Vendor B scores 74, but Vendor A's viability score of 2 knocks it out, so only Vendor B may proceed. After the questions, the score menus unlock. The weighted points, the bars, and the knockout status update at once. Raise Vendor A's viability from 2 to 3 and it may proceed, as the higher-scoring choice. The scorecard is illustrative.

## How to Use

1. Read Question 1. Type your answer and press **Check**. Type only the number.
2. If you are wrong, you get a hint and one more try. After a second miss, the sim shows the answer and the working. Only a first-try answer counts toward the score.
3. Press **Next question**. After Question 3, press **See the results**.
4. The score menus unlock. Change them and watch the results update at once.
5. **Defaults** puts the inputs back to their starting values. **Start over** returns to Question 1.

The results stay hidden until you answer the three questions. Nothing moves until you act, and the MicroSim does not store your answers.

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner can **calculate** the weighted scores of two vendors from criterion scores and weights, and apply the knockout rule to decide which vendor may proceed, correctly answering three of three questions. (Bloom level: Apply.)

### Audience

Teachers, school administrators, school board members, education policymakers, and parents.

### Duration

15 minutes

### Prerequisites

- Procurement criteria, vendor evaluation, weighted scoring, and the knockout rule, from the section "Procurement and Vendor Evaluation" in Chapter 20.

### Activities

1. **Calculate (6 min).** Compute both weighted scores on paper, then answer the three questions.
2. **Explore (4 min).** Raise Vendor A's viability from 2 to 3. What changes?
3. **Discuss (5 min).** Why should some criteria be knockouts instead of just heavier weights?

### Assessment

Ask learners to answer without the MicroSim, then check each answer by using it.

1. Vendor A totals 75 and Vendor B 74. Does Vendor A win? *(No. Vendor A's viability score of 2 knocks it out.)*
2. Can a weak privacy score be offset by strong scores elsewhere? *(No. A privacy score of 2 or below is a knockout whatever the total.)*
3. What is the weighted value of a score of 4 on a criterion with weight 15? *(15 × 4 ÷ 5 = 12 points.)*

## References

1. [Weighted sum model](https://en.wikipedia.org/wiki/Weighted_sum_model). Wikipedia. Scoring options by weighted criteria.
2. [Multiple-criteria decision analysis](https://en.wikipedia.org/wiki/Multiple-criteria_decision_analysis). Wikipedia. Methods for decisions with several criteria, including thresholds.
3. [Vendor lock-in](https://en.wikipedia.org/wiki/Vendor_lock-in). Wikipedia. Why vendor viability matters.
