---
title: "Governance Readiness Judge"
description: "Judge six fictional districts as not ready, ready for Level 3, or well placed for Level 4 by applying the must-have and should-have rule."
image: /sims/governance-readiness-judge/governance-readiness-judge.png
og:image: /sims/governance-readiness-judge/governance-readiness-judge.png
twitter:image: /sims/governance-readiness-judge/governance-readiness-judge.png
social:
   cards: false
status: built
quality_score: 100
---

# Governance Readiness Judge

<iframe src="main.html" height="785px" width="100%" scrolling="no"></iframe>

[Run the Governance Readiness Judge MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 10: Student Privacy and Data Governance](../../chapters/10-student-privacy-data-governance/index.md){ .md-button }

To edit the sketch, paste the contents of `governance-readiness-judge.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor's p5.js version to 2.x. The learning content is in the `CONFIG` block at the top of the file.

## About This MicroSim

A district is ready to adopt a Level 3 intelligent textbook only when its data governance is in place. This chapter names six **must-have** practices (M1 to M6) and four **should-have** practices (S1 to S4). The rule has two parts, and the order matters:

1. If any must-have is missing, the district is **Not ready**.
2. If all six must-haves are present and fewer than 3 should-haves, it is **Ready for Level 3**.
3. If all six must-haves are present and 3 or more should-haves, it is **Ready for Level 3 and well placed for Level 4**.

Each card lists the practices a district has in place. You have to notice which must-have is missing. Should-haves cannot make up for one.

The practices and the rule are this chapter's recommended practice, not a legal standard. The six districts are fictional.

## How to Use

Read the district card, then choose one of the three verdicts below it. A correct first answer turns its segment green in the progress strip. A wrong first answer gives a hint and lets you choose again, but only the first answer counts toward the score shown as **First-try correct**. Press **Show all practices** to see the ten practices with their codes. Press **Next** to move on. After six districts, the results screen shows your score and lets you review each district you missed.

### Controls

- **Choice buttons:** commit an answer. A wrong first answer gives a hint and lets you choose again; only the first answer counts.
- **Show definitions:** opens or closes the reference table. Reading it is exploration, not evidence.
- **Next:** moves to the next item after feedback. On the results screen, Previous missed and Next missed step through what you missed.
- **Play again:** starts a practice run with the items reshuffled. Practice runs do not change the first-run score.

Nothing moves until you act, and the MicroSim does not store your answers.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/governance-readiness-judge/main.html"
        height="785px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner can **judge** whether each of six districts is not ready, ready for Level 3, or ready for Level 3 and well placed for Level 4, by applying the must-have and should-have rule, correctly judging at least five of six on the first attempt. (Bloom level: Evaluate.)

### Audience

Teachers, administrators, school board members, policymakers, and parents.

### Duration

10-15 minutes

### Prerequisites

- Governance readiness, the six must-have and four should-have practices, and the readiness rule, from the section "Governance Readiness" in Chapter 10

### Activities

1. **Predict (2 min).** Before you start, decide: can a district with nine practices in place be not ready? Write down why.
2. **Judge (6 min).** Work through the six districts. For each one, check the six must-haves before you count the should-haves.
3. **Discuss (4 min).** Oakdale has the most practices of any district and is still not ready. Explain why to a colleague or board member.

### Assessment

Mastery is 5 of 6 correct on the first try. Only the first answer to each district on the first run counts. Then ask learners to answer these without the MicroSim:

1. A district has every practice except M6, a breach response plan. What is the verdict? *(Not ready. Any missing must-have means not ready.)*
2. A district has all six must-haves and two should-haves. What is the verdict? *(Ready for Level 3. Two is fewer than 3.)*
3. Is readiness a score out of ten? *(No. It is a two-step rule: must-haves first, then a count of should-haves.)*

## References

1. [Family Educational Rights and Privacy Act](https://en.wikipedia.org/wiki/Family_Educational_Rights_and_Privacy_Act). Wikipedia. The main US federal law on student education records.
2. [Data governance](https://en.wikipedia.org/wiki/Data_governance). Wikipedia. The roles, policies, and processes an organization uses to manage data.
3. [Student Privacy Policy Office](https://studentprivacy.ed.gov/). US Department of Education. Guidance and training on student privacy for schools and districts.
