---
title: "Afternoon Program Quality Judge"
description: "Judge six fictional afternoon programs as structured, partly structured, or unstructured by counting the SAFE practices each one includes."
image: /sims/afternoon-program-quality-judge/afternoon-program-quality-judge.png
og:image: /sims/afternoon-program-quality-judge/afternoon-program-quality-judge.png
twitter:image: /sims/afternoon-program-quality-judge/afternoon-program-quality-judge.png
social:
   cards: false
status: built
quality_score: 100
---

# Afternoon Program Quality Judge

<iframe src="main.html" height="652px" width="100%" scrolling="no"></iframe>

[Run the Afternoon Program Quality Judge MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 14: The Pro-Social Afternoon](../../chapters/14-pro-social-afternoon/index.md){ .md-button }

To edit the sketch, paste the contents of `afternoon-program-quality-judge.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor's p5.js version to 2.x. The learning content is in the `CONFIG` block at the top of the file.

## About This MicroSim

Freed afternoon time helps students only if it is used well. Durlak, Weissberg, and Pachan (2010) found that after-school programs improved personal and social skills when they followed four practices, known as **SAFE**:

- **Sequenced**: a connected, step-by-step set of activities.
- **Active**: students practice the skills actively.
- **Focused**: a component devoted to personal or social skills.
- **Explicit**: specific, stated skill goals.

The rule in this MicroSim counts the practices: all 4 is **Structured**, 2 or 3 is **Partly structured**, and 0 or 1 is **Unstructured**. A program can be quiet and supervised, or lively and hands-on, and still miss most of the four. The rule is a simple school-level check, not a full quality assessment. The six programs are fictional.

## How to Use

Read the program description, then choose one of the three ratings. Press **Show SAFE practices** to see what each practice means. A wrong first answer gives a hint and lets you choose again, but only the first answer counts toward **First-try correct**. After six programs, the results screen shows your score and the number of practices in each program.

### Controls

- **Choice buttons:** commit an answer. A wrong first answer gives a hint and lets you choose again; only the first answer counts.
- **Show definitions:** opens or closes the reference table. Reading it is exploration, not evidence.
- **Next:** moves to the next item after feedback. On the results screen, Previous missed and Next missed step through what you missed.
- **Play again:** starts a practice run with the items reshuffled. Practice runs do not change the first-run score.

Nothing moves until you act, and the MicroSim does not store your answers.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/afternoon-program-quality-judge/main.html"
        height="652px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner can **judge** whether each of six afternoon programs is structured, partly structured, or unstructured by applying the SAFE practices, correctly judging at least five of six on the first attempt. (Bloom level: Evaluate.)

### Audience

Teachers, administrators, school board members, policymakers, and parents.

### Duration

10-15 minutes

### Prerequisites

- Structured afternoon, unstructured afternoon drift, afternoon program quality, and the SAFE practices, from the section "Structure Versus Drift" in Chapter 14

### Activities

1. **Judge (6 min).** Rate the six programs. For each one, tick off S, A, F, and E on paper before you choose.
2. **Compare (3 min).** Homework Hall is quiet and Open Gym is noisy. Why do they get the same rating?
3. **Improve (5 min).** Pick the Garden Project. Add the two missing practices in one sentence each.

### Assessment

Mastery is 5 of 6 correct on the first try. Only the first answer to each program on the first run counts. Then ask learners to answer these without the MicroSim:

1. A program has a trained adult, hands-on work, and nothing else. Rating? *(Unstructured. Only Active is present.)*
2. Does a supervised program have quality? *(Not by itself. Supervision is not one of the four practices.)*
3. A program has Sequenced, Active, and Explicit but no Focused component. Rating? *(Partly structured.)*

## References

1. [A meta-analysis of after-school programs that seek to promote personal and social skills](https://doi.org/10.1007/s10464-010-9300-6). Durlak, Weissberg, and Pachan (2010), American Journal of Community Psychology. The source of the SAFE practices.
2. [Social emotional learning](https://en.wikipedia.org/wiki/Social_emotional_learning). Wikipedia. The skills that SAFE programs aim to build.
3. [After-school activity](https://en.wikipedia.org/wiki/After-school_activity). Wikipedia. The range of after-school programs.
