---
title: "Scale, Extend, or Stop?"
description: "Apply a pilot decision rule to six pilot results and judge whether each pilot should scale, extend, or stop."
image: /sims/scale-extend-or-stop/scale-extend-or-stop.png
og:image: /sims/scale-extend-or-stop/scale-extend-or-stop.png
twitter:image: /sims/scale-extend-or-stop/scale-extend-or-stop.png
social:
   cards: false
status: built
---

# Scale, Extend, or Stop?

<iframe src="main.html" height="452px" width="100%" scrolling="no"></iframe>

[Run the Scale, Extend, or Stop? MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 20: Designing the AI-Native School Day](../../chapters/20-designing-ai-native-school-day/index.md){ .md-button }

To edit the sketch, paste the contents of `scale-extend-or-stop.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor's p5.js version to 2.x. The learning content is in the `CONFIG` block at the top of the file.

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/scale-extend-or-stop/main.html"
        height="452px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

A pilot needs a decision rule written before it starts, so that the results decide what happens next and not the mood of the room. The rule in this MicroSim is:

- **Stop** if there is a serious privacy incident, or if any subgroup is more than 0.1 standard deviations (SD) below the comparison.
- Otherwise, **Scale** if the gain is 0.15 SD or more, the teacher workload increase is 2 hours a week or less, and family satisfaction is 70 percent or more.
- Otherwise, **Extend** the pilot and fix what fell short.

The MicroSim shows six pilot results, one at a time. You check the stop conditions first, then the scale conditions. The two largest gains, 0.30 SD and 0.18 SD, both lead to a stop. The rule and results are illustrative; each district should set its own thresholds.

## How to Use

1. Read the pilot result in the white box.
2. Click the decision you think fits. The button turns blue.
3. Press **Submit**. The box below the pilot result says whether you are right and why.
4. If you are wrong, the button you chose turns orange. Choose again and press **Submit**. The second try does not change the score. After a second miss, the right answer turns green.
5. Press **Next** to go on. After the last pilot result, press **Finish** to see your score, with each result and its decision.
6. Press **Start over** at any time to reshuffle and begin again.

Only your first try on each pilot result counts toward the score. The pilot results are shuffled each run. Nothing moves until you act, and the MicroSim does not store your answers.

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner can **judge** whether each of six pilot results leads to scaling, extending, or stopping by applying the stated decision rule, correctly judging at least five of six on the first attempt. (Bloom level: Evaluate.)

### Audience

Teachers, school administrators, school board members, education policymakers, and parents.

### Duration

10-15 minutes

### Prerequisites

- Pilot program, pilot goals, and decision rule, from the section "Readiness and Pilots" in Chapter 20.

### Activities

1. **Read the rule (2 min).** Say in your own words why the stop conditions are checked first.
2. **Judge (6 min).** Decide all six results. Aim for 5 of 6 on the first try.
3. **Discuss (5 min).** A board member says, "A 0.30 SD gain is too good to stop." How would you answer?

### Assessment

Ask learners to answer without the MicroSim, then check each answer by using it.

1. Gain 0.30 SD with a serious privacy incident. What does the rule say? *(Stop. A serious privacy incident is a stop condition, whatever the gains.)*
2. Gain 0.16 SD, workload +2 hours, satisfaction 65 percent. What does the rule say? *(Extend. Satisfaction is below 70 percent, and no stop condition applies.)*
3. Does a pilot that misses one goal fail? *(No. It is extended so the district can fix what fell short.)*

## References

1. [Pilot experiment](https://en.wikipedia.org/wiki/Pilot_experiment). Wikipedia. Small trials run before a full rollout.
2. [Effect size](https://en.wikipedia.org/wiki/Effect_size). Wikipedia. Measuring gains in standard deviations.
3. [Program evaluation](https://en.wikipedia.org/wiki/Program_evaluation). Wikipedia. Judging whether a program meets its goals.
