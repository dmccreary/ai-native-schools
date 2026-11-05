---
title: "False Accusations Calculator"
description: "Calculate how many human-written essays an AI detector wrongly flags, the share of flags that are false, and the share of false flags that fall on English-language learners."
image: /sims/false-accusations-calculator/false-accusations-calculator.png
og:image: /sims/false-accusations-calculator/false-accusations-calculator.png
twitter:image: /sims/false-accusations-calculator/false-accusations-calculator.png
social:
   cards: false
status: built
---

# False Accusations Calculator

<iframe src="main.html" height="660px" width="100%" scrolling="no"></iframe>

[Run the False Accusations Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 20: Designing the AI-Native School Day](../../chapters/20-designing-ai-native-school-day/index.md){ .md-button }

To edit the sketch, paste the contents of `false-accusations-calculator.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor's p5.js version to 2.x. The learning content is in the `CONFIG` block at the top of the file.

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/false-accusations-calculator/main.html"
        height="660px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

A detector that wrongly flags "only 1 percent" of human essays sounds safe. But most essays are written by humans, so 1 percent of many can outnumber the AI essays it catches. And if the detector flags English-language learners (ELL) more often, the false accusations pile up on them.

The MicroSim starts with three questions, using 10,000 essays, 5 percent written by AI, and 80 percent caught. With a 1 percent rate for all writers, 95 of 495 flags are false, about 19 percent. With a 20 percent rate for ELL writers, who write 950 of the essays, 190 wrong flags fall on them, 69 percent of all wrong flags, and about 41 percent of all flags are false. After the questions, six sliders unlock and the counts, the two shares, and a bar of every flagged essay update at once. The numbers are illustrative, not the performance of any real detector.

## How to Use

1. Read Question 1. Type your answer and press **Check**. Type only the number.
2. If you are wrong, you get a hint and one more try. After a second miss, the sim shows the answer and the working. Only a first-try answer counts toward the score.
3. Press **Next question**. After Question 3, press **See the results**.
4. The six sliders unlock. Change them and watch the results update at once.
5. **Defaults** puts the inputs back to their starting values. **Start over** returns to Question 1.

The results stay hidden until you answer the three questions. Nothing moves until you act, and the MicroSim does not store your answers.

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner can **calculate** how many human-written essays an AI detector wrongly flags, the share of flagged essays that are false accusations, and the share of false flags that fall on English-language learners, correctly answering three of three questions. (Bloom level: Apply.)

### Audience

Teachers, school administrators, school board members, education policymakers, and parents.

### Duration

15-20 minutes

### Prerequisites

- AI cheating detector, detector false positives, and bias against ELL writers, from the section "Academic Integrity and the Detector Problem" in Chapter 20.

### Activities

1. **Calculate (7 min).** Answer the three questions with paper and a calculator. Work from counts.
2. **Explore (5 min).** Lower **Share written by AI** from 5 to 1 percent. What happens to the share of flags that are false?
3. **Discuss (5 min).** Set the ELL rate equal to the most-writers rate. Why does the ELL share of wrong flags fall to 10 percent?

### Assessment

Ask learners to answer without the MicroSim, then check each answer by using it.

1. With a 1 percent false-positive rate, are 1 percent of accusations wrong? *(No. At the defaults about 19 percent are wrong, because human essays far outnumber AI essays.)*
2. Do a detector's errors fall evenly on all students? *(Not when one group has a higher false-positive rate. Here ELL writers get 69 percent of the wrong flags.)*
3. What should a school do instead of relying on a detector? *(Redesign assessment so it shows process, such as drafts and conversations.)*

## References

1. [GPT detectors are biased against non-native English writers](https://arxiv.org/abs/2304.02819). Liang and others, 2023. The Stanford study of detector bias.
2. [Base rate fallacy](https://en.wikipedia.org/wiki/Base_rate_fallacy). Wikipedia. Why a small error rate can produce many false positives.
3. [Artificial intelligence content detection](https://en.wikipedia.org/wiki/Artificial_intelligence_content_detection). Wikipedia. How AI-writing detectors work and fail.
