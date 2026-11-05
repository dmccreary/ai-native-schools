---
title: "Spacing and Retrieval Retention Explorer"
description: "Predict which review schedule and method keep the most memory for a day-30 exam, then compare forgetting curves for massed, spaced, and expanding reviews."
image: /sims/spacing-retrieval-retention-explorer/spacing-retrieval-retention-explorer.png
og:image: /sims/spacing-retrieval-retention-explorer/spacing-retrieval-retention-explorer.png
twitter:image: /sims/spacing-retrieval-retention-explorer/spacing-retrieval-retention-explorer.png
social:
   cards: false
status: built
quality_score: 100
---

# Spacing and Retrieval Retention Explorer

<iframe src="main.html" height="664px" width="100%" scrolling="no"></iframe>

[Run the Spacing and Retrieval Retention Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 1: The Building Blocks of Schools, Students, and Learning](../../chapters/01-building-blocks-schools-students/index.md){ .md-button }

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/spacing-retrieval-retention-explorer/main.html"
        height="664px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

Maya has three short reviews before a test on day 30. When should she do them, and how?

| Schedule | Reviews (days after the lesson) |
|---|---|
| No review | none |
| Massed | 1, 2 and 3 hours after the lesson |
| Evenly spaced | days 1, 3 and 7 |
| Expanding | days 1, 4 and 12 |

Each review can be done by **rereading** or by **retrieval** (recalling from memory). In this model, memory fades along a forgetting curve. Each review makes the memory more stable. A review helps more when some forgetting has already happened, and retrieval helps more than rereading.

You commit two predictions before any curve is drawn. Then the curves appear and you can switch the method and the exam day. On a day-1 exam the massed schedule wins, which is why cramming feels effective. On a day-30 exam it falls to 0%, while expanding retrieval holds 65%.

This is an illustrative model, not experimental data. It shows the direction of effects reported by Ebbinghaus (1885), Cepeda and colleagues (2006), and Roediger and Karpicke (2006).

## How to Use

- Choose your answer to **P1** (the best schedule for a day-30 exam) and **P2** (the better method), then press **Submit predictions**. Each gets one attempt.
- The curves appear for the Reread method and a day-30 exam. Dots mark retention on the exam day, and the legend lists each value. Dashed lines show the other method for comparison.
- Switch the **Review method** and the **Exam day**. After you have tried exam days 1 and 7, **P3** unlocks.
- Choose an answer to P3 and press **Check P3**. P3 has two attempts; only the first counts toward the score.
- **Reset** returns to the opening state with no curves.

Nothing moves until you act. Mastery is 3 of 3.

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner can **compare** predicted retention under massed, evenly spaced, and expanding review schedules, each done by rereading or by retrieval, and predict which schedule and method retain the most on a day-30 exam. (Bloom level: Understand.)

### Audience

Teachers, administrators, school board members, policymakers, and parents.

### Duration

10-15 minutes.

### Prerequisites

- Learning versus performance, forgetting curve, spaced practice, massed practice, retrieval practice, and desirable difficulty, from [Chapter 1](../../chapters/01-building-blocks-schools-students/index.md).

### Activities

1. **Predict (2 min).** Before you submit, write down which schedule you used the last time you studied for a test.
2. **Compare (6 min).** Look at the day-30 curves for Reread, then for Retrieval. Write down how much each schedule gains from switching methods.
3. **Explain (4 min).** Switch to a day-1 exam. Explain to a partner why a student who crams might honestly believe cramming works.
4. **Apply (3 min).** Plan three reviews for a unit test 30 days away. Which days, and what will students do in each review?

### Assessment

Ask learners to answer without the MicroSim.

1. Which schedule gives the highest day-30 retention, and with which method? *(Expanding reviews done by retrieval: 65% in this model.)*
2. Why does the massed schedule win on a day-1 exam but fall to 0% by day 30? *(Its reviews come before any forgetting, so they add little lasting strength. They help only a test that comes soon.)*
3. Two students spend the same total time reviewing. Why can their day-30 results differ? *(When the reviews happen and how they are done matter, not only total time.)*

## References

1. [Forgetting curve](https://en.wikipedia.org/wiki/Forgetting_curve). Wikipedia. Ebbinghaus's finding that memory fades quickly without review.
2. [Spaced repetition](https://en.wikipedia.org/wiki/Spaced_repetition). Wikipedia. Reviewing at increasing intervals.
3. [Testing effect](https://en.wikipedia.org/wiki/Testing_effect). Wikipedia. Why recalling from memory strengthens learning more than rereading.
4. [Roediger and Karpicke (2006), Test-Enhanced Learning](https://doi.org/10.1111/j.1467-9280.2006.01693.x). Psychological Science. The study that compared rereading and retrieval after five minutes and after one week.
