---
title: "Seat Time vs. Mastery"
description: "An interactive poster comparing two staircases of the same five concepts: seat time, where the calendar moves the class on and gaps crack the blocks, and mastery learning, where every block is solid but students spread apart in time."
status: built
social:
   cards: false
hide:
    - toc
---

<iframe src="main.html" height="720px" width="100%" scrolling="no"></iframe>

[Run the Seat Time vs. Mastery Poster Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 3: School Structures, Equity, and the Industrial-Era Legacy](../../chapters/03-school-structures-equity-industrial-era/index.md){ .md-button }
[Chapter 11: Mastery Learning and the Case for a Compressed Morning](../../chapters/11-mastery-learning-case-compressed-morning/index.md){ .md-button }

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/seat-time-vs-mastery-poster/main.html"
        height="720px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

This poster draws the same five concepts as two staircases. Each concept is a colored block, and each block rests on the ones below it, so the first block is the foundation for everything above.

On the left, **seat time** holds time fixed. A calendar sheds its pages, a clock and a bell keep the schedule, and a conveyor belt carries the class along together. The class moved on before the first two blocks were solid, so the foundation is cracked and has a hole in it. The top blocks sag into the hole, and the student who reached the top on schedule is wobbling.

On the right, **mastery learning** holds learning fixed. The same five blocks are all whole, and each carries a check shape for the mastery threshold. That is the benefit: no hidden gaps. The risk is that students now stand at different heights, and the slowest fall behind in time. The school's response is in the far right corner: a coach hands a stuck student the missing block, and students from every step build one project together at an afternoon workbench.

The numbers in the panels come from the illustrative class of 20 students in [Chapter 3](../../chapters/03-school-structures-equity-industrial-era/index.md), who need between 70 and 260 hours to master a 150-hour course, and from the worked examples in [Chapter 11](../../chapters/11-mastery-learning-case-compressed-morning/index.md).

## How to Use

- **Explore:** hover over a part of the poster to see its name, and click it to read about it in the panel below the image.
- **Quiz Me:** click **Quiz Me**. The poster asks a question, and you click the part of the picture that answers it. Your score shows next to the buttons.
- **Calibrate (authors):** open [`main.html?edit=true`](./main.html?edit=true) to drag the zone corners, then copy the JSON into `data.json`.

## The 6 Zones

1. **Seat time: the calendar**: a wall calendar shedding pages, a clock, a ringing bell, and a conveyor belt of students
2. **Seat time: the cracked blocks**: the bottom two blocks, one cracked and one with a hole
3. **Seat time: the wobbling top**: the upper blocks sagging into the hole, with a student struggling to balance
4. **Mastery: the solid blocks**: the bottom two blocks, whole and marked with check shapes
5. **Mastery: spread of students**: students standing at different heights on the solid stairs
6. **Mastery: help and shared work**: a coach handing a stuck student the missing block, and an afternoon workbench where students of every pace build together

The poster image is a text-free SVG made by `make-seat-time-svg.py` in this folder. The script also prints the zone rectangles used in `data.json`.

To practice the arithmetic behind the poster, try the [Seat Time vs. Mastery](../seat-time-vs-mastery/index.md) MicroSim, which asks how many of the 20 students master a fixed-length course and how many hours the early finishers sit idle.

## Lesson Plan

### Learning Objective

The learner will **compare** seat time with mastery learning by explaining, for each model, what is held fixed, what varies, and what goes wrong, and will describe how a school responds to the students who fall behind in time under mastery learning. (Bloom level: Analyze.)

### Audience

Teachers, administrators, school board members, policymakers, and parents.

### Duration

10 minutes.

### Activities

1. **Explore (5 minutes):** read the three left zones from the calendar up to the wobbling top, then the three right zones. For each side, write one sentence: "In this model, ___ is fixed and ___ varies."
2. **Quiz (2 minutes):** run Quiz Me until you can answer all six questions on the first try.
3. **Discuss (3 minutes):** look at the two students at the bottom right. What would your school need to change to give the slowest students more time and coaching without separating them from their class?

### Assessment

The learner answers all 6 quiz questions correctly and, without the poster, can name the hidden cost of seat time (gaps that build up silently), the risk of mastery learning (students spread apart in time), and one response to that risk (gap filling and tutoring, or shared afternoon work).

## References

1. [Carnegie Unit and Student Hour](https://en.wikipedia.org/wiki/Carnegie_Unit_and_Student_Hour). Wikipedia. The seat-time credit defined in 1906.
2. [Mastery learning](https://en.wikipedia.org/wiki/Mastery_learning). Wikipedia. Letting time vary so that learning can stay constant.
3. [Chapter 3: School Structures, Equity, and the Industrial-Era Legacy](../../chapters/03-school-structures-equity-industrial-era/index.md). Seat time, the Carnegie unit, and the 20-student worked example.
4. [Chapter 11: Mastery Learning and the Case for a Compressed Morning](../../chapters/11-mastery-learning-case-compressed-morning/index.md). Mastery learning, personalized pacing, and gap filling.
