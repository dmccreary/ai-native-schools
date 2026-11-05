---
title: "Seat Time vs. Mastery"
description: "Calculate how many of twenty students master a fixed-length course and how many hours the early finishers sit idle, then compare with a mastery-based schedule."
image: /sims/seat-time-vs-mastery/seat-time-vs-mastery.png
og:image: /sims/seat-time-vs-mastery/seat-time-vs-mastery.png
twitter:image: /sims/seat-time-vs-mastery/seat-time-vs-mastery.png
social:
   cards: false
status: built
quality_score: 100
---

# Seat Time vs. Mastery

<iframe src="main.html" height="836px" width="100%" scrolling="no"></iframe>

[Run the Seat Time vs. Mastery MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 3: School Structures, Equity, and the Industrial-Era Legacy](../../chapters/03-school-structures-equity-industrial-era/index.md){ .md-button }

To edit the sketch, paste the contents of `seat-time-vs-mastery.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor to p5.js 2.x. The learning content is in the `CONFIG` block at the top of the file.

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/seat-time-vs-mastery/main.html"
        height="836px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

The Carnegie unit measures a course in hours of seat time. Every student sits for the same number of hours, but students do not need the same number of hours to master the material.

This illustrative class has 20 students. The hours each one needs range from 70 to 260:

| Students 1 to 10 | 70 | 80 | 90 | 95 | 100 | 105 | 110 | 115 | 120 | 125 |
|---|---|---|---|---|---|---|---|---|---|---|
| **Students 11 to 20** | **130** | **135** | **140** | **150** | **160** | **170** | **185** | **200** | **230** | **260** |

With a fixed course length L, a student **masters** the course when the hours they need are L or fewer. Students who finish early sit **idle** for the rest of the course. Students who need more than L leave with hours **still needed**.

| L (hours) | Master | Do not | Idle hours | Hours still needed |
|---|---|---|---|---|
| 100 | 5 | 15 | 65 | 835 |
| 150 | 14 | 6 | 535 | 305 |
| 200 | 18 | 2 | 1,320 | 90 |

The **mastery-based view** lets every student take exactly the hours they need. Every student finishes, and the total is 2,770 hours, less than the 3,000 hours of a fixed 150-hour course for 20 students. No single fixed length gives both zero idle hours and zero students who fall short.

## How to Use

- With the length locked at 150 hours, type your answers to **Q1**, **Q2**, and **Q3**, then press **Check answers**.
- A wrong answer gets a hint and one more try. After the second try the answer and its working are shown. Only first tries count toward your score.
- When all three are checked, the **Length** slider (60 to 300 hours) and the **Mastery-based view** checkbox unlock. Each bar shows whether that student mastered the course, the idle hours above it, or the hours still needed.
- **Reset** returns to the opening state with the length locked at 150.

Nothing moves until you act. Mastery is 3 of 3 on the first try.

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner can **calculate**, for a fixed course length, how many of twenty students master the course and how many hours the early finishers sit idle, answering all three questions correctly on the first try. (Bloom level: Apply.)

### Audience

Teachers, administrators, school board members, policymakers, and parents.

### Duration

10-15 minutes.

### Prerequisites

- Seat time, the Carnegie unit, mastery, and hours needed to master, from [Chapter 3](../../chapters/03-school-structures-equity-industrial-era/index.md).

### Activities

1. **Calculate (5 min).** Answer Q1 to Q3 on paper first. For Q2, list each early finisher's idle hours before you add them.
2. **Explore (5 min).** Move the length from 60 to 300. Record the length where idle hours first pass 1,000 and the length where every student masters the course.
3. **Compare (3 min).** Tick the mastery-based view. Compare its total with 20 × 150 = 3,000 hours.
4. **Discuss (4 min).** Does letting students take different amounts of time mean the course takes more total time? What would a school need to change to run on the mastery-based schedule?

### Assessment

Ask learners to answer without the MicroSim.

1. With a 150-hour course, how many of the 20 students master it, and how many idle hours do they have? *(14 students and 535 idle hours.)*
2. How many master a 200-hour course, and what does the longer course cost? *(18 master, but idle hours rise to 1,320.)*
3. Does a mastery-based schedule take more total time than a fixed 150-hour course? *(No. It takes 2,770 hours, compared with 3,000.)*

## References

1. [Carnegie Unit and Student Hour](https://en.wikipedia.org/wiki/Carnegie_Unit_and_Student_Hour). Wikipedia. The seat-time credit defined in 1906.
2. [Mastery learning](https://en.wikipedia.org/wiki/Mastery_learning). Wikipedia. Letting time vary so that learning can stay constant.
3. [Competency-based learning](https://en.wikipedia.org/wiki/Competency-based_learning). Wikipedia. Advancing students when they show mastery rather than after a fixed time.
