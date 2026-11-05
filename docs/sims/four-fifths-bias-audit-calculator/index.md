---
title: "Four-Fifths Bias Audit Calculator"
description: "Calculate selection rates and four-fifths ratios for three student groups, decide which groups an audit flags, then change the counts and watch the flags update."
image: /sims/four-fifths-bias-audit-calculator/four-fifths-bias-audit-calculator.png
og:image: /sims/four-fifths-bias-audit-calculator/four-fifths-bias-audit-calculator.png
twitter:image: /sims/four-fifths-bias-audit-calculator/four-fifths-bias-audit-calculator.png
social:
   cards: false
status: built
quality_score: 100
---

# Four-Fifths Bias Audit Calculator

<iframe src="main.html" height="659px" width="100%" scrolling="no"></iframe>

[Run the Four-Fifths Bias Audit Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 10: Student Privacy and Data Governance](../../chapters/10-student-privacy-data-governance/index.md){ .md-button }

To edit the sketch, paste the contents of `four-fifths-bias-audit-calculator.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor's p5.js version to 2.x. The learning content is in the `CONFIG` block near the top of the file.

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/four-fifths-bias-audit-calculator/main.html"
        height="659px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

An AI system that recommends students for an advanced class should recommend students from every group at similar rates. A **four-fifths screen** checks this:

**selection rate = recommended ÷ eligible**. The highest group's rate is the reference. **Ratio = a group's rate ÷ the reference rate**. A group is flagged when its ratio is below 0.80.

Three questions come first: group B's selection rate, group B's ratio, and which groups the audit flags. Then three sliders for the recommended counts unlock, and the rates, ratios, flags, and a bar chart update at once. A flag is a prompt to investigate why, not proof that the system is unfair.

The counts are illustrative audit data. The four-fifths threshold is a screening convention from U.S. employment-selection guidance, applied here as an illustration.

## How to Use

Nothing moves until you act, and the MicroSim does not store your answers.

- **Your answer box and Check:** type a number and press Check (or Enter); for question 3 choose from the menu. Two attempts per question; only the first counts.
- **Next:** moves on; after question 3 it unlocks the sliders.
- **Recommended, group A, B, C:** sliders for the number recommended in each group.
- **Redo challenges and Defaults:** start the questions again, or reset the counts to 200, 72, and 70.

If every recommended count is zero, the sim says "No recommendations to audit."

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner will **calculate** selection rates and four-fifths ratios for three student groups and identify which groups the audit flags, correctly answering three of three questions. (Bloom level: Apply.)

### Audience

Teachers, administrators, school board members, education policymakers, and parents.

### Duration

10-15 minutes.

### Prerequisites

- Algorithmic bias, algorithmic bias auditing, selection rate, and the four-fifths rule, from the section "Algorithmic Bias, Auditing, and Transparency" in Chapter 10.

### Activities

1. **Calculate (5 min).** Work the three rates and the ratios on paper first.
2. **Explore (4 min).** Raise group B's recommended count until it is no longer flagged. What count does it take?
3. **Discuss (4 min).** Group B is flagged. List two reasons that could explain the gap, and one that would show the system is unfair.

### Assessment

Ask learners to answer without the MicroSim, then check each answer by using it.

1. Group B: 72 recommended of 300 eligible. Selection rate? *(24.0%.)*
2. Group A's rate is 40.0%. Group B's ratio? *(0.60 (24.0 ÷ 40.0).)*
3. Group C's rate is 35.0%. Is it flagged? *(No. Its ratio is 0.875, about 0.88, which is above 0.80.)*
4. Does a flag prove the system is unfair? *(No. It starts an investigation.)*

## References

1. [Disparate impact](https://en.wikipedia.org/wiki/Disparate_impact). Wikipedia. Includes the four-fifths rule of thumb.
2. [29 CFR Part 1607: Uniform Guidelines on Employee Selection Procedures](https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XIV/part-1607). Electronic Code of Federal Regulations. The source of the four-fifths convention.
3. [Algorithmic bias](https://en.wikipedia.org/wiki/Algorithmic_bias). Wikipedia. How automated systems can treat groups differently.
