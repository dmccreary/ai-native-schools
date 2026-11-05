---
title: "One Lesson, Many Readiness Levels"
description: "Predict where one whole-class lesson should be pitched for a class spread across eight readiness levels, then move the pitch to see who is in reach."
image: /sims/one-lesson-many-readiness-levels/one-lesson-many-readiness-levels.png
og:image: /sims/one-lesson-many-readiness-levels/one-lesson-many-readiness-levels.png
twitter:image: /sims/one-lesson-many-readiness-levels/one-lesson-many-readiness-levels.png
social:
   cards: false
status: built
quality_score: 100
---

# One Lesson, Many Readiness Levels

<iframe src="main.html" height="812px" width="100%" scrolling="no"></iframe>

[Run the One Lesson, Many Readiness Levels MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 1: The Building Blocks of Schools, Students, and Learning](../../chapters/01-building-blocks-schools-students/index.md){ .md-button }

To edit the sketch, paste the contents of `one-lesson-many-readiness-levels.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor to p5.js 2.x. The learning content is in the `CONFIG` block at the top of the file.

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/one-lesson-many-readiness-levels/main.html"
        height="812px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

A real classroom holds students at many readiness levels. This illustrative class of 28 students spans grade levels 3 to 10:

| Readiness (grade level) | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|
| Students | 1 | 2 | 4 | 6 | 7 | 5 | 2 | 1 |

A whole-class lesson has one **pitch**, the grade level it is taught at. For each student:

- **In reach:** the lesson is at the student's level or one level above.
- **Too hard:** the lesson is more than one level above the student.
- **Already known:** the lesson is below the student's level. In this model the student waits.

You predict the best pitch before you can move it. Then the slider unlocks and every student marker shows its state. The best single pitch reaches 13 students, fewer than half the class. Every pitch leaves at least 15 students either lost or waiting.

## How to Use

- Type your prediction for **Q1** (the pitch that reaches the most students) and **Q2** (how many it reaches), then press **Check Q1 and Q2**.
- A wrong answer gets a hint and one more try. After the second try the answer is shown. Only first tries count toward your score.
- When both are checked, the **Pitch** slider unlocks. Move it from 3 to 10 and watch the markers and the three counts change.
- Set the pitch to 7, type your answer to **Q3**, and press **Check Q3**.
- The score appears when all three questions are checked. **Reset** returns to the opening state with the pitch locked at 7.

Nothing moves until you act. Mastery is 3 of 3 on the first try.

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner can **examine** how the pitch of one whole-class lesson splits a mixed-readiness class into students in reach, students for whom it is too hard, and students who already know it, and identify the pitch that reaches the most students. (Bloom level: Analyze.)

### Audience

Teachers, administrators, school board members, policymakers, and parents.

### Duration

10-15 minutes.

### Prerequisites

- Learning gap, direct instruction, classroom, readiness as a grade level, and the "in reach" rule, from [Chapter 1](../../chapters/01-building-blocks-schools-students/index.md).

### Activities

1. **Predict (3 min).** Many teachers teach "to the middle." Before you touch the sim, write down how many of the 28 students you think a middle pitch reaches.
2. **Check and explore (6 min).** Answer Q1 and Q2, then move the pitch through every value. Record the in-reach count at each pitch in a table.
3. **Answer Q3 (2 min).** Set the pitch to 7 and count the students for whom the lesson is too hard.
4. **Discuss (4 min).** No pitch reaches more than 13 students. What could a school change so that more students are in reach at the same time?

### Assessment

Ask learners to answer without the MicroSim.

1. Which pitch reaches the most students, and how many? *(Pitch 7 reaches 13 of 28.)*
2. At pitch 7, how many students find the lesson too hard, and how many already know it? *(7 too hard and 8 already known.)*
3. Can a more skilled teacher find one pitch that reaches the whole class? *(No. Readiness spans eight levels, and a single pitch reaches only two of them.)*

## References

1. [Differentiated instruction](https://en.wikipedia.org/wiki/Differentiated_instruction). Wikipedia. Teaching approaches that adjust to students' different readiness levels.
2. [Zone of proximal development](https://en.wikipedia.org/wiki/Zone_of_proximal_development). Wikipedia. The range of tasks a learner can reach with the right level of challenge.
3. [Direct instruction](https://en.wikipedia.org/wiki/Direct_instruction). Wikipedia. Teacher-led whole-class instruction and its assumptions.
