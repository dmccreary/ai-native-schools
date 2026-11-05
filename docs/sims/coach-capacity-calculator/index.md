---
title: "Coach Capacity Calculator"
description: "Calculate the number of coaches a rollout needs, rounding up, and the number of teachers a given number of coaches can support."
image: /sims/coach-capacity-calculator/coach-capacity-calculator.png
og:image: /sims/coach-capacity-calculator/coach-capacity-calculator.png
twitter:image: /sims/coach-capacity-calculator/coach-capacity-calculator.png
social:
   cards: false
status: built
---

# Coach Capacity Calculator

<iframe src="main.html" height="506px" width="100%" scrolling="no"></iframe>

[Run the Coach Capacity Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 21: Implementing the AI-Native Model Responsibly](../../chapters/21-implementing-ai-native-model-responsibly/index.md){ .md-button }

To edit the sketch, paste the contents of `coach-capacity-calculator.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor's p5.js version to 2.x. The learning content is in the `CONFIG` block at the top of the file.

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/coach-capacity-calculator/main.html"
        height="506px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

Teachers learning a new model need instructional coaches, and a coach can support only so many teachers. Coach capacity sets the speed limit of a rollout.

**Coaches needed = teachers ÷ teachers per coach, rounded up.** Coaches come in whole people, so 150 teachers at 12 per coach need 12.5 coaches, which means 13. **Teachers supported = coaches × teachers per coach.** Eight coaches at 12 each support 96 teachers.

The MicroSim starts with three questions. After them, three sliders unlock: teachers to support, teachers per coach, and coaches available. The coaches needed, the gap, and a row of coach squares update at once. When there are fewer coaches than needed, the sim says **Slow the rollout**. The capacity of 12 is illustrative; set your own.

## How to Use

1. Read Question 1. Type your answer and press **Check**. Type only the number.
2. If you are wrong, you get a hint and one more try. After a second miss, the sim shows the answer and the working. Only a first-try answer counts toward the score.
3. Press **Next question**. After Question 3, press **See the results**.
4. The three sliders unlock. Change them and watch the results update at once.
5. **Defaults** puts the inputs back to their starting values. **Start over** returns to Question 1.

The results stay hidden until you answer the three questions. Nothing moves until you act, and the MicroSim does not store your answers.

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner can **calculate** the number of coaches needed for a given number of teachers and coach capacity, and the number of teachers a given number of coaches can support, correctly answering three of three questions. (Bloom level: Apply.)

### Audience

Teachers, school administrators, school board members, education policymakers, and parents.

### Duration

10-15 minutes

### Prerequisites

- Scaling a pilot, instructional coaching, coach capacity, and rounding up, from the section "Scaling Without Breaking" in Chapter 21 and from Chapter 19.

### Activities

1. **Calculate (5 min).** Answer the three questions. Round up where you must.
2. **Explore (4 min).** Lower teachers per coach from 12 to 6. What happens to the coaches needed?
3. **Plan (5 min).** Set the sliders for your own district. How many teachers can the next phase of the rollout include?

### Assessment

Ask learners to answer without the MicroSim, then check each answer by using it.

1. 400 teachers at 12 per coach. How many coaches? *(400 ÷ 12 = 33.3, rounded up to 34.)*
2. Can the coaches needed be a fraction? *(No. A coach is a whole person, so always round up.)*
3. Does buying more software licenses speed up the rollout? *(Not if coaches are the limit. The rollout can go only as fast as coaches can support teachers.)*

## References

1. [The effect of teacher coaching on instruction and achievement](https://annenberg.brown.edu/publications/effect-teacher-coaching-instruction-and-achievement-meta-analysis-causal-evidence). Kraft, Blazar, and Hogan. A meta-analysis of coaching studies.
2. [Floor and ceiling functions](https://en.wikipedia.org/wiki/Floor_and_ceiling_functions). Wikipedia. Rounding up to a whole number.
3. [Professional learning community](https://en.wikipedia.org/wiki/Professional_learning_community). Wikipedia. Teachers supporting each other through change.
