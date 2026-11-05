---
title: "Reinforcing or Balancing?"
description: "Classify six causal loops from school change as reinforcing or balancing by counting the minus signs around each loop."
image: /sims/reinforcing-or-balancing/reinforcing-or-balancing.png
og:image: /sims/reinforcing-or-balancing/reinforcing-or-balancing.png
twitter:image: /sims/reinforcing-or-balancing/reinforcing-or-balancing.png
social:
   cards: false
status: built
---

# Reinforcing or Balancing?

<iframe src="main.html" height="648px" width="100%" scrolling="no"></iframe>

[Run the Reinforcing or Balancing? MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 18: Sustaining Change: Systems Thinking and National Adoption](../../chapters/18-sustaining-change-systems-thinking/index.md){ .md-button }

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/reinforcing-or-balancing/main.html"
        height="648px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

A *causal loop diagram* shows how variables push on each other in a circle. Each arrow has a sign: **+** when the next variable moves the same way, **−** when it moves the opposite way. The rule is simple: count the minus signs around the loop. An even number, including zero, makes the loop *reinforcing*; an odd number makes it *balancing*.

You see six loops from school change, one at a time, and decide the type of each. The center marker shows **?** until you answer, then **R** or **B**. The type is about structure, not about whether the loop is good: the workload, burnout, and absences loop is reinforcing even though it is harmful. The loops are illustrative.

Try the sim before you read this table: it gives the answers.

| Loop | Minus signs | Type |
|---|---|---|
| Student results → Teacher confidence → Quality of use | 0 | Reinforcing |
| Rollout speed → Teacher overload → Resistance | 1 | Balancing |
| Family trust → Willingness to share data → Quality of personalization | 0 | Reinforcing |
| Data collected → Breach risk → Family trust → Data allowed | 1 | Balancing |
| Teacher workload → Burnout → Absences | 0 | Reinforcing |
| Screen time → Family complaints → Pressure to cut screen time | 1 | Balancing |

## How to Use

- Follow the arrows around the loop and count the red minus signs.
- Press **Reinforcing** or **Balancing**. If your first answer is wrong, a hint appears and you choose again. Only your first answer counts toward the score.
- Use **+**, **−**, and **Reset view** to zoom. The mouse wheel does not zoom, so the page scrolls normally.
- Press **Next** after the feedback. The results screen lists the minus-sign count for every loop. **Play again** reshuffles the loops.

### Good to Know

- Mastery is 5 of 6 correct on the first try, on the first run. Nothing moves until you act, and the MicroSim does not store your answers.
- Authors: add `?edit=true` to the URL to drag the nodes of the current loop and copy the updated JSON into `reinforcing-or-balancing-cld.json`.

## Lesson Plan

### Learning Objective

The learner will distinguish six causal loops from school change as reinforcing or balancing by counting the minus signs around each, correctly classifying at least five of six on the first attempt. (Bloom level: Analyze.)

### Audience

Teachers, school administrators, school board members, education policymakers, and parents.

### Duration

10 minutes

### Prerequisites

- Feedback loops, reinforcing and balancing loops, causal loop diagrams, and the counting rule, from the section "Seeing the System" in Chapter 18.

### Activities

1. **Predict (2 min).** Is a reinforcing loop always good? Write your answer.
2. **Distinguish (5 min).** Work through the six loops. Count the minus signs aloud before you choose.
3. **Discuss (3 min).** Pick one balancing loop. What does it protect, and what does it slow down?

### Assessment

Ask learners to answer without the MicroSim, then check each answer by using it.

1. A loop has two minus signs. Which type is it? *(Reinforcing, because two is even.)*
2. Can a loop with a minus sign be reinforcing? *(Yes, if the number of minus signs is even.)*
3. Does the number of variables decide the type? *(No. Only the number of minus signs does.)*
4. Is a reinforcing loop always good? *(No. Workload, burnout, and absences form a harmful reinforcing loop.)*

## References

1. [Causal loop diagram](https://en.wikipedia.org/wiki/Causal_loop_diagram). Wikipedia. How to read signed links and identify reinforcing and balancing loops.
2. [Systems thinking](https://en.wikipedia.org/wiki/Systems_thinking). Wikipedia. The broader approach that causal loop diagrams support.
3. [The Fifth Discipline](https://en.wikipedia.org/wiki/The_Fifth_Discipline). Wikipedia. Senge's book on systems thinking in learning organizations.
