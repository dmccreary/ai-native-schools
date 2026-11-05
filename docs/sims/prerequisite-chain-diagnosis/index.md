---
title: "Prerequisite Chain Diagnosis"
description: "Trace a student's failure on a fractions-to-proportions prerequisite map back to the root gap in five illustrative cases."
image: /sims/prerequisite-chain-diagnosis/prerequisite-chain-diagnosis.png
og:image: /sims/prerequisite-chain-diagnosis/prerequisite-chain-diagnosis.png
twitter:image: /sims/prerequisite-chain-diagnosis/prerequisite-chain-diagnosis.png
social:
   cards: false
status: built
quality_score: 100
---

# Prerequisite Chain Diagnosis

<iframe src="main.html" height="724px" width="100%" scrolling="no"></iframe>

[Run the Prerequisite Chain Diagnosis MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 2: Evidence, Motivation, and the Stakeholders of Schooling](../../chapters/02-evidence-motivation-stakeholders/index.md){ .md-button }

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/prerequisite-chain-diagnosis/main.html"
        height="724px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

When a student fails a concept, the place to reteach is not always the concept they failed. It may be a prerequisite further down the chain.

This map shows eight concepts on the path from whole-number arithmetic to proportional equations. Each arrow points **from a concept to a prerequisite it depends on**. Concepts 1 and 2 have no prerequisites.

The **root gap** is the failed concept whose direct prerequisites all passed, or a failed concept with no prerequisites. Everything that failed above it failed because of it.

You work through five cases. Each shows one student's pass or fail result on every concept and the target concept the student failed in class. You select the root gap. In only one of the five cases is the target itself the root gap.

The pass and fail results are illustrative, written for this chapter.

## How to Use

- **Explore.** Click any concept to read its description and its direct prerequisites.
- Press **Start the cases**. Green concepts passed, red ones failed, and the target has a purple border.
- Click the concept you judge to be the root gap. It turns orange. Click it again or press **Clear** to unselect.
- Press **Submit**. A wrong answer gets a hint and a second try. Only the first try counts toward your score.
- After the answer, the root gap gets a green border and the failed concepts above it are joined by red arrows. Press **Next case**.
- After five cases you see your first-try score.
- **Zoom in**, **Zoom out**, and **Reset** change the view. The mouse wheel does not zoom.

Mastery is 4 of 5 on the first try. The MicroSim does not store your answers.

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner can **attribute** a student's failure on a target concept to its root gap by examining a prerequisite map and pass/fail results, correctly identifying the root gap in at least 4 of 5 cases. (Bloom level: Analyze.)

### Audience

Teachers, administrators, school board members, policymakers, and parents.

### Duration

10-15 minutes.

### Prerequisites

- Prior knowledge, prerequisite concept, root gap, and the meaning of a dependency arrow, from [Chapter 2](../../chapters/02-evidence-motivation-stakeholders/index.md).

### Activities

1. **Explore (3 min).** Click each concept and read what it depends on. Which two concepts have no prerequisites?
2. **Diagnose (8 min).** Work through the five cases. For each failed concept, check its prerequisites before you decide.
3. **Discuss (4 min).** In case 2 the student failed five concepts. How many need reteaching first? What would happen if the teacher retaught the target, Proportional equations, instead?

### Assessment

Ask learners to answer without the MicroSim.

1. Define the root gap. *(The failed concept whose direct prerequisites all passed, or a failed concept with no prerequisites.)*
2. A student fails Unit rates and Proportional equations, but passes Multiplying and dividing fractions and Ratios. Where is the root gap? *(Unit rates.)*
3. Is the concept a student failed in class always the place to reteach? *(No. In four of the five cases the root gap was below the target.)*

## References

1. [Mastery learning](https://en.wikipedia.org/wiki/Mastery_learning). Wikipedia. Why students should master prerequisites before moving on.
2. [Knowledge space](https://en.wikipedia.org/wiki/Knowledge_space). Wikipedia. A model of which concepts a learner must know before others.
3. [Directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph). Wikipedia. The structure of a prerequisite map.
