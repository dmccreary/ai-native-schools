---
title: "Source Credibility Checker"
description: "Rate eight fictional sources of evidence about an education product as Lead only, Use with caution, or Reasonable weight by applying a three-part rule."
image: /sims/source-credibility-checker/source-credibility-checker.png
og:image: /sims/source-credibility-checker/source-credibility-checker.png
twitter:image: /sims/source-credibility-checker/source-credibility-checker.png
social:
   cards: false
status: built
quality_score: 100
---

# Source Credibility Checker

<iframe src="main.html" height="732px" width="100%" scrolling="no"></iframe>

[Run the Source Credibility Checker MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 3: School Structures, Equity, and the Industrial-Era Legacy](../../chapters/03-school-structures-equity-industrial-era/index.md){ .md-button }

To edit the sketch, paste the contents of `source-credibility-checker.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor to p5.js 2.x. The learning content is in the `CONFIG` block at the top of the file.

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/source-credibility-checker/main.html"
        height="732px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

Not every report about an education product deserves the same weight. This MicroSim gives you one rule and eight sources to apply it to.

**The rule.** First, if there is no comparison group of other students studied at the same time, the rating is **Lead only**. A comparison with national norms does not count as a comparison group. Otherwise, add one point if the evaluator is independent (did not build, sell, or buy the product, and the results are published whatever they show) and one point if the work has been peer reviewed.

| Points | Rating |
|---|---|
| No comparison group, or 0 | Lead only |
| 1 | Use with caution |
| 2 | Reasonable weight |

Three sources test the edges of the rule. A vendor-paid study can still be independent when the contract guarantees publication. A preprint has not been peer reviewed. A school's comparison with national norms is not a comparison group.

The sources are fictional and written for this chapter.

## How to Use

- Read the source on the card, then press the rating you think it deserves.
- The rule is shown beside the card on wide screens. On narrow screens, **Show definitions** opens it.
- If your first answer is wrong, you get a hint and a second try. Only the first try counts toward your score.
- After the second try, the correct rating and the reason appear. Press **Next** for the next source.
- After all eight sources, the results screen shows your first-try score and lets you step through the sources you missed. **Play again** reshuffles the sources for practice.

Mastery is 7 of 8 on the first try. Nothing moves until you choose, and the MicroSim does not store your answers.

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner can **judge** how much weight each of eight sources of evidence deserves by applying the comparison-group, independence, and peer-review rules, with at least 7 of 8 correct on the first try. (Bloom level: Evaluate.)

### Audience

Teachers, administrators, school board members, policymakers, and parents.

### Duration

10-15 minutes.

### Prerequisites

- Independent evaluation, self-reported results, preprint, peer review, and comparison group, from [Chapter 3](../../chapters/03-school-structures-equity-industrial-era/index.md).

### Activities

1. **Predict (2 min).** Before you start, decide whether a study paid for by a vendor can ever count as independent. Write down your reason.
2. **Rate (8 min).** Work through all eight sources. Apply the rule in order: comparison group, then independence, then peer review.
3. **Compare (5 min).** Find the two sources that describe the same randomized trial. What single change moves the rating up?

### Assessment

Ask learners to answer without the MicroSim.

1. A school compares its growth with national norms. Is that a comparison group? *(No. National norms are not other students studied at the same time, so the rating is Lead only.)*
2. Can a vendor-paid study be independent? *(Yes, when the contract guarantees publication whatever the results show.)*
3. An independent team posts a randomized trial as a preprint. What rating does it get, and what would raise it? *(Use with caution. Peer review would raise it to Reasonable weight.)*

## References

1. [Peer review](https://en.wikipedia.org/wiki/Peer_review). Wikipedia. How experts check work before a journal publishes it.
2. [Preprint](https://en.wikipedia.org/wiki/Preprint). Wikipedia. Papers shared publicly before peer review.
3. [Treatment and control groups](https://en.wikipedia.org/wiki/Treatment_and_control_groups). Wikipedia. Why a comparison group studied at the same time matters.
4. [Conflict of interest](https://en.wikipedia.org/wiki/Conflict_of_interest). Wikipedia. Why the people who build or sell a product are not independent judges of it.
