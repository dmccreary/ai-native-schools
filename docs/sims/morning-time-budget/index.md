---
title: "Morning Time Budget"
description: "Calculate the minutes, hours, and school days a compressed academic morning frees, and the speedup it requires, then explore the trade-off with sliders."
image: /sims/morning-time-budget/morning-time-budget.png
og:image: /sims/morning-time-budget/morning-time-budget.png
twitter:image: /sims/morning-time-budget/morning-time-budget.png
social:
   cards: false
status: built
quality_score: 100
---

# Morning Time Budget

<iframe src="main.html" height="674px" width="100%" scrolling="no"></iframe>

[Run the Morning Time Budget MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 11: Mastery Learning and the Case for a Compressed Morning](../../chapters/11-mastery-learning-case-compressed-morning/index.md){ .md-button }

To edit the sketch, paste the contents of `morning-time-budget.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor's p5.js version to 2.x. The questions and slider ranges are in the `QUESTIONS` and `INPUTS` blocks at the top of the file.

## About This MicroSim

Today's five academic periods take about 250 minutes a day: 50 minutes of settling and wrap-up, 100 of explanation, and 100 of practice (the illustrative Chapter 2 schedule). A compressed morning keeps some of each and frees the rest for the afternoon. The arithmetic is simple:

- Compressed morning = settling + explanation + practice
- Freed per day = 250 − compressed morning
- Hours freed per year = freed per day × school days ÷ 60
- School days freed = freed minutes per year ÷ (length of school day in hours × 60)
- Required speedup = 250 ÷ compressed morning

The last line is the hidden cost. If students are to learn the same amount in less time, each minute has to be more productive. A 150-minute morning needs students to learn about 1.67 times as fast. The settings are an illustrative scenario, not evidence that any school achieves this.

## How to Use

Answer the three questions first. Type a number in **Your answer** and press **Check**. You get two tries per question, and the score counts only first tries. The bar chart shows each scenario, but the freed time stays hidden until you finish. After the third question press **Unlock the sliders**. The five sliders then set settling, explanation, practice, school days per year, and the length of the school day, and every result updates at once. **Reset sliders** returns them to 10, 50, 90 minutes, 180 days, and 6.5 hours.

### Controls

- **Your answer and Check:** type a number and press Check. Two tries per question; only the first counts.
- **Next question:** moves to the next question after feedback. On the last question it reads Unlock the sliders.
- **Five sliders:** settling and wrap-up (0 to 50 min), explanation (0 to 100 min), practice (0 to 150 min), school days per year (150 to 200), and length of school day (6 to 7 hours). They unlock after the three questions.
- **Reset sliders:** returns the sliders to 10, 50, and 90 minutes, 180 days, and 6.5 hours.

Nothing moves until you act, and the MicroSim does not store your answers.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/morning-time-budget/main.html"
        height="674px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner can **calculate** the minutes freed per day, the hours freed per year, and the equivalent school days freed by a compressed academic morning, and the speedup it requires, correctly answering three of three questions. (Bloom level: Apply.)

### Audience

Teachers, administrators, school board members, policymakers, and parents.

### Duration

15 minutes

### Prerequisites

- Academic morning, compressed academic morning, reduced direct instruction, and freed-up school time, from the section "The Compressed Academic Morning" in Chapter 11

### Activities

1. **Calculate (6 min).** Answer the three questions on paper first, then enter them. Show the working for each step.
2. **Explore (5 min).** After the sliders unlock, lower explanation to 30 minutes. What happens to the freed time, and to the required speedup?
3. **Discuss (4 min).** Find settings that free about 30 school days a year with a speedup below 1.4. Is that speedup realistic for your students?

### Assessment

Mastery is 3 of 3 correct on the first try. Only the first answer to each question on the first run counts. Then ask learners to answer these without the MicroSim:

1. Settling 10, explanation 50, practice 90. How many minutes are freed per day? *(100 minutes.)*
2. For the same settings and 180 days, how many hours are freed per year? *(300 hours.)*
3. Settling 10, explanation 70, practice 110, 180 days, 6.5-hour day. How many school days are freed? *(About 27.7 days.)*
4. What speedup does a 190-minute morning require? *(250 ÷ 190, about 1.32.)*

## References

1. [Mastery learning](https://en.wikipedia.org/wiki/Mastery_learning). Wikipedia. The approach behind moving on only after a skill is learned.
2. [Bloom's 2 sigma problem](https://en.wikipedia.org/wiki/Bloom%27s_2_sigma_problem). Wikipedia. Tutoring's large effect, and the search for a way to scale it.
3. [Block scheduling](https://en.wikipedia.org/wiki/Block_scheduling). Wikipedia. Other ways schools have reorganized the minutes in a day.
