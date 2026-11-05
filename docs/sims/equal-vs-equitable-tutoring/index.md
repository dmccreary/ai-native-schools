---
title: "Equal vs. Equitable Tutoring"
description: "Compare an equal split of 45 tutoring hours with an equitable one by finding the allocation that brings three students to a score of 80."
image: /sims/equal-vs-equitable-tutoring/equal-vs-equitable-tutoring.png
og:image: /sims/equal-vs-equitable-tutoring/equal-vs-equitable-tutoring.png
twitter:image: /sims/equal-vs-equitable-tutoring/equal-vs-equitable-tutoring.png
social:
   cards: false
status: built
quality_score: 100
---

# Equal vs. Equitable Tutoring

<iframe src="main.html" height="756px" width="100%" scrolling="no"></iframe>

[Run the Equal vs. Equitable Tutoring MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 3: School Structures, Equity, and the Industrial-Era Legacy](../../chapters/03-school-structures-equity-industrial-era/index.md){ .md-button }

To edit the sketch, paste the contents of `equal-vs-equitable-tutoring.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor to p5.js 2.x. The learning content is in the `CONFIG` block at the top of the file.

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/equal-vs-equitable-tutoring/main.html"
        height="756px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

Three students need to reach a score of 80. The school has 45 tutoring hours, and each hour adds one point to the student who receives it.

| Student | Starting score | Equal split (15 hours each) |
|---|---|---|
| A | 80 | 95 |
| B | 65 | 80 |
| C | 50 | 65 |

The **equal** split gives everyone the same 15 hours. Two students reach 80, and the gap between the highest and lowest score is 30 points. Student A gets 15 hours they did not need.

An **equitable** allocation matches hours to need. Only one allocation in steps of 5 hours brings all three to 80: A 0, B 15, C 30. It uses exactly 45 hours, and the gap closes to 0.

Equity here does not take anything away from Student A, who already met the target. It spends the same 45 hours where they close the gap. The numbers are an illustrative model, not measured data.

## How to Use

- Answer **Q1** (how many students reach 80 with 15 hours each) and **Q2** (the gap between the highest and lowest score), then press **Check Q1 and Q2**. Each has one attempt.
- The equal-split result appears and the three hour sliders unlock. Each moves in steps of 5 hours. The total cannot go above 45.
- The bars update as you move the sliders. When you are ready, press **Submit allocation**. You have three submissions.
- If a student is still short, the feedback names the student and the number of points. After three unsuccessful submissions, the working allocation is shown.
- **Reset** returns to the opening state.

Nothing moves until you act. Mastery is Q1 and Q2 right and the allocation found within three submissions.

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner can **distinguish** an equal allocation of tutoring hours from an equitable one by finding the split of 45 hours that brings all three students to a score of 80, and by stating the score gap that results from each. (Bloom level: Analyze.)

### Audience

Teachers, administrators, school board members, policymakers, and parents.

### Duration

10-15 minutes.

### Prerequisites

- Achievement gap, educational equity, equality, and learning gains, from [Chapter 3](../../chapters/03-school-structures-equity-industrial-era/index.md).

### Activities

1. **Calculate (3 min).** Answer Q1 and Q2 on paper first, then check them.
2. **Search (5 min).** Find the allocation that brings all three students to 80. Before each submission, predict each student's final score.
3. **Discuss (5 min).** Did the equitable allocation take anything away from Student A? Where does your school give every student the same support even though needs differ?

### Assessment

Ask learners to answer without the MicroSim.

1. With 15 hours each, what is the score gap? *(30 points: 95 minus 65.)*
2. What allocation brings all three students to 80, and why? *(A 0, B 15, C 30. Each student gets exactly the hours they need to reach 80.)*
3. Is treating everyone the same always fair? *(No. The equal split left Student C 15 points short while Student A got hours they did not need.)*

## References

1. [Educational equity](https://en.wikipedia.org/wiki/Educational_equity). Wikipedia. The difference between equal and equitable distribution of resources.
2. [Achievement gaps in the United States](https://en.wikipedia.org/wiki/Achievement_gaps_in_the_United_States). Wikipedia. Persistent differences in outcomes between groups of students.
3. [Tutoring](https://en.wikipedia.org/wiki/Tutoring). Wikipedia. One-to-one and small-group help and its effects.
