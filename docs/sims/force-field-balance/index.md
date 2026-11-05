---
title: "Force Field Balance"
description: "Calculate the driving, restraining, and net forces for a school change, before and after reducing two restraining forces, then explore with sliders."
image: /sims/force-field-balance/force-field-balance.png
og:image: /sims/force-field-balance/force-field-balance.png
twitter:image: /sims/force-field-balance/force-field-balance.png
social:
   cards: false
status: built
---

# Force Field Balance

<iframe src="main.html" height="808px" width="100%" scrolling="no"></iframe>

[Run the Force Field Balance MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 17: Leading Change: Vision, Culture, and Early-Stage Concerns](../../chapters/17-leading-change-vision-culture/index.md){ .md-button }

To edit the sketch, paste the contents of `force-field-balance.js` into the [p5.js editor](https://editor.p5js.org/). The forces and questions are in the content block at the top of the file.

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/force-field-balance/main.html"
        height="808px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

Kurt Lewin's *force field analysis* pictures a situation as a balance between *driving forces*, which push toward change, and *restraining forces*, which push against it. This MicroSim shows the chapter's force field for the compressed morning: four driving forces and four restraining forces, each scored from 1 (weak) to 5 (strong). At the start the two sides balance at 14 and 14.

You first answer three questions: the total driving force, the total restraining force after two restraining forces are reduced, and the net force after those reductions. Then eight sliders unlock so you can explore. The arithmetic shows Lewin's advice: lowering a restraining force by 3 moves the net exactly as much as raising a driving force by 3, without adding pressure. The strengths are illustrative judgments.

| Force | Kind | Starting strength |
|---|---|---|
| Evidence of learning gaps in the data | Driving | 4 |
| Potential relief from teacher workload | Driving | 3 |
| Free open textbooks | Driving | 3 |
| Leadership support | Driving | 4 |
| Culture of closed doors | Restraining | 4 |
| Fear of job loss | Restraining | 3 |
| Privacy concerns | Restraining | 3 |
| Students without home devices | Restraining | 4 |

## How to Use

- Read the force field. Each arrow's length and number show its strength.
- Type your answers to **Q1**, **Q2**, and **Q3** in the boxes and press **Check answers**. A wrong answer gets a hint and one more try. Only your first try counts toward the score.
- When all three are settled, press **Unlock the sliders**. The totals, the net force, and the balance bar appear.
- Move the eight sliders to change the strengths. **Reset strengths** returns them to the starting values.

### Good to Know

- Net force = total driving minus total restraining. A net of 0 is balanced, a positive net favors change, and a negative net favors the status quo.
- Mastery is 3 of 3 correct on the first try. Moving the sliders afterward is exploration. Nothing moves until you act.

## Lesson Plan

### Learning Objective

The learner will calculate the total driving force, the total restraining force, and the net force for a change situation, before and after reducing two restraining forces, correctly answering three of three questions. (Bloom level: Apply.)

### Audience

Teachers, school administrators, school board members, education policymakers, and parents.

### Duration

10-15 minutes

### Prerequisites

- Force field analysis, driving forces, restraining forces, and the unfreeze stage, from the section "Lewin: Unfreeze, Change, Refreeze" in Chapter 17.

### Activities

1. **Calculate (5 min).** Answer Q1 to Q3 on paper first, then type them in.
2. **Explore (5 min).** Raise one driving force by 3 and note the net. Reset, then lower one restraining force by 3. Compare.
3. **Discuss (5 min).** Why might pushing harder on a driving force raise a restraining force in a real school?

### Assessment

Ask learners to answer without the MicroSim, then check each answer by using it.

1. Driving forces are 4, 3, 3, and 4. What is the total? *(14.)*
2. Restraining forces are 4, 3, 1, and 1. What is the net if driving is 14? *(+5, which favors change.)*
3. Is a balanced field stable and safe? *(No. It is stuck: nothing moves until a force changes.)*
4. Why reduce a restraining force rather than push harder? *(It improves the net just as much without adding pressure that can raise resistance.)*

## References

1. [Force-field analysis](https://en.wikipedia.org/wiki/Force-field_analysis). Wikipedia. Lewin's method of listing and weighing driving and restraining forces.
2. [Kurt Lewin](https://en.wikipedia.org/wiki/Kurt_Lewin). Wikipedia. The psychologist behind force field analysis and the unfreeze-change-refreeze model.
