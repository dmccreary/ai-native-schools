---
title: "Mastery Threshold Chooser"
description: "Examine a table of pass probabilities for five mastery rules and select every rule that meets each of four requirements."
image: /sims/mastery-threshold-chooser/mastery-threshold-chooser.png
og:image: /sims/mastery-threshold-chooser/mastery-threshold-chooser.png
twitter:image: /sims/mastery-threshold-chooser/mastery-threshold-chooser.png
social:
   cards: false
status: built
quality_score: 100
---

# Mastery Threshold Chooser

<iframe src="main.html" height="656px" width="100%" scrolling="no"></iframe>

[Run the Mastery Threshold Chooser MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 12: AI Guardrails: Teaching Thinking Without Over-Reliance](../../chapters/12-ai-guardrails-teaching-thinking-without/index.md){ .md-button }

To edit the sketch, paste the contents of `mastery-threshold-chooser.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor's p5.js version to 2.x. The learning content is in the `CONFIG` block at the top of the file.

## About This MicroSim

A mastery rule such as "4 of 5 right" decides when a student moves on. Every rule makes two kinds of mistake. A **false pass** moves on a student who has not mastered the skill. A **false fail** holds back a student who has. The table shows how often a student whose true accuracy is 50, 70, or 90 percent passes each rule on a fresh set of questions:

| Rule | Student at 50% | Student at 70% | Student at 90% |
|---|---|---|---|
| 4 of 5 | 18.8% | 52.8% | 91.9% |
| 5 of 5 | 3.1% | 16.8% | 59.0% |
| 8 of 10 | 5.5% | 38.3% | 93.0% |
| 9 of 10 | 1.1% | 14.9% | 73.6% |
| 10 of 10 | 0.1% | 2.8% | 34.9% |

These are computed values from the binomial distribution. The sim computes them from the formula, so you can check them. The accuracy levels are illustrative. Each of the four requirements asks you to read across the table for more than one student, and no rule is best for every requirement.

## How to Use

Read the requirement, then mark every rule that meets it. Marked rules are shaded in the table. Press **Check**. A set is correct only when it has no missing and no extra rules. You get two checks per requirement, and only the first check counts toward **First-try correct**. After four requirements, the results screen shows your score and lets you review the requirements you missed.

### Controls

- **Five rule buttons:** mark or unmark a rule. Marked rules are shaded in the table.
- **Check:** commits the marked set. Two checks per requirement; only the first counts.
- **Next:** moves to the next requirement after feedback. On the results screen, Previous missed and Next missed step through what you missed.
- **Play again:** starts a practice run. Practice runs do not change the first-run score.

Nothing moves until you act, and the MicroSim does not store your answers.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/mastery-threshold-chooser/main.html"
        height="656px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner can **examine** a table of pass probabilities for five mastery rules and select the rule or rules that meet each of four stated requirements, correctly answering at least three of four. (Bloom level: Analyze.)

### Audience

Teachers, administrators, school board members, policymakers, and parents.

### Duration

15 minutes

### Prerequisites

- Mastery threshold, false pass, false fail, and pass probability, from the section "The Mastery Threshold" in Chapter 12

### Activities

1. **Read (3 min).** Find how often a student at 70 percent passes "4 of 5." Is that a high standard?
2. **Select (8 min).** Work through the four requirements. Check every condition for every rule.
3. **Decide (4 min).** Your school values never moving on a weak student more than speed. Which rule would you choose, and what does it cost the strong student?

### Assessment

Mastery is 3 of 4 correct on the first try. Only the first answer to each requirement on the first run counts. Then ask learners to answer these without the MicroSim:

1. Which rule passes a 70 percent student about half the time? *(4 of 5, at 52.8%.)*
2. Is a stricter rule always better? *(No. 10 of 10 fails the 90 percent student about 65 percent of the time.)*
3. Which rule meets: 70% student under 50% and 90% student at least 90%? *(8 of 10.)*

## References

1. [Binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution). Wikipedia. The formula behind the pass probabilities.
2. [Type I and type II errors](https://en.wikipedia.org/wiki/Type_I_and_type_II_errors). Wikipedia. False passes and false fails in general terms.
3. [Mastery learning](https://en.wikipedia.org/wiki/Mastery_learning). Wikipedia. Where mastery thresholds come from.
