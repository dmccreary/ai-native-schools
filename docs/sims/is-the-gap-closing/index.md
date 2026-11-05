---
title: "Is the Gap Closing?"
description: "Compute the gap between higher-income and lower-income students before and after for five schools, and decide whether each gap is closing, widening, or unchanged."
image: /sims/is-the-gap-closing/is-the-gap-closing.png
og:image: /sims/is-the-gap-closing/is-the-gap-closing.png
twitter:image: /sims/is-the-gap-closing/is-the-gap-closing.png
social:
   cards: false
status: built
---

# Is the Gap Closing?

<iframe src="main.html" height="474px" width="100%" scrolling="no"></iframe>

[Run the Is the Gap Closing? MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 21: Implementing the AI-Native Model Responsibly](../../chapters/21-implementing-ai-native-model-responsibly/index.md){ .md-button }

To edit the sketch, paste the contents of `is-the-gap-closing.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor's p5.js version to 2.x. The learning content is in the `CONFIG` block at the top of the file.

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/is-the-gap-closing/main.html"
        height="474px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

When both groups of students improve, it is tempting to say a program closed the gap. The only way to know is to compute the gap:

**Gap = higher-income mean − lower-income mean.** If the gap after is at least 1 point smaller than before, it is **Closing**. If it is at least 1 point larger, it is **Widening**. Otherwise it is **Unchanged**.

The MicroSim shows five schools, one at a time, each with four mean mastery scores. In two of the schools both groups improve, and the gap still widens. In another, both groups gain the same 6 points, and the gap stays the same. The data are illustrative.

## How to Use

1. Read the school in the white box.
2. Click the result you think fits. The button turns blue.
3. Press **Submit**. The box below the school says whether you are right and why.
4. If you are wrong, the button you chose turns orange. Choose again and press **Submit**. The second try does not change the score. After a second miss, the right answer turns green.
5. Press **Next** to go on. After the last school, press **Finish** to see your score, with each school's gap before and after.
6. Press **Start over** at any time to reshuffle and begin again.

Only your first try on each school counts toward the score. The schools are shuffled each run. Nothing moves until you act, and the MicroSim does not store your answers.

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner can **differentiate** five schools' results as closing, widening, or unchanged gaps by computing the gap before and after, correctly classifying at least four of five on the first attempt. (Bloom level: Analyze.)

### Audience

Teachers, school administrators, school board members, education policymakers, and parents.

### Duration

10-15 minutes

### Prerequisites

- Closing or widening gaps, the Matthew effect, and the achievement gap, from the section "Equity in Implementation" in Chapter 21 and from Chapter 3.

### Activities

1. **Compute (3 min).** For School 1 (62 to 70 and 74 to 79), compute both gaps on paper before you start.
2. **Differentiate (6 min).** Classify all five schools. Aim for 4 of 5 on the first try.
3. **Discuss (5 min).** Why might an AI tutor widen a gap even when every group gains? Connect your answer to the Matthew effect.

### Assessment

Ask learners to answer without the MicroSim, then check each answer by using it.

1. Lower-income 58 to 63; higher-income 72 to 80. Closing, widening, or unchanged? *(Widening. The gap rose from 14 to 17, even though both groups improved.)*
2. If both groups improve, must the gap be closing? *(No. It closes only if the lower group gains more.)*
3. Does an unchanged gap mean scores did not change? *(No. In School 3 both groups gained 6 points and the gap stayed at 10.)*

## References

1. [Achievement gaps in the United States](https://en.wikipedia.org/wiki/Achievement_gaps_in_the_United_States). Wikipedia. How gaps between student groups are measured and reported.
2. [Matthew effect](https://en.wikipedia.org/wiki/Matthew_effect). Wikipedia. Why advantages tend to grow when everyone gets the same help.
3. [Digital divide](https://en.wikipedia.org/wiki/Digital_divide). Wikipedia. Unequal access to devices and connections.
