---
title: "AI Tutor Design Judge"
description: "Judge six fictional AI tutor designs as likely to harm learning, mixed, or likely to help, by applying the five-guardrail rule."
image: /sims/ai-tutor-design-judge/ai-tutor-design-judge.png
og:image: /sims/ai-tutor-design-judge/ai-tutor-design-judge.png
twitter:image: /sims/ai-tutor-design-judge/ai-tutor-design-judge.png
social:
   cards: false
status: built
quality_score: 100
---

# AI Tutor Design Judge

<iframe src="main.html" height="748px" width="100%" scrolling="no"></iframe>

[Run the AI Tutor Design Judge MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 12: AI Guardrails: Teaching Thinking Without Over-Reliance](../../chapters/12-ai-guardrails-teaching-thinking-without/index.md){ .md-button }

To edit the sketch, paste the contents of `ai-tutor-design-judge.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor's p5.js version to 2.x. The learning content is in the `CONFIG` block at the top of the file.

## About This MicroSim

This chapter names five guardrails for an AI tutor:

- **G1** hints instead of answers
- **G2** grounded in the course's content
- **G3** math and facts checked by a trusted tool
- **G4** logs teachers can review
- **G5** age and topic limits

G1 comes first. In the Turkish high-school study, open GPT-4 access lowered later exam scores by about 17 percent, while a hint-first version removed most of the harm. So the rule checks G1 before it counts the rest:

1. G1 absent: **Likely to harm learning**.
2. G1 present, 1 to 3 guardrails in all: **Mixed: needs more guardrails**.
3. G1 present, 4 or 5 guardrails in all: **Likely to help**.

The guardrails and the rule are this chapter's recommended practice, drawn from the design contrast in the Turkish study. The six designs are fictional.

## How to Use

Read the design and its list of guardrails, then choose one of the three verdicts. Press **Show the five guardrails** to see what each code means. A wrong first answer gives a hint and lets you choose again, but only the first answer counts toward **First-try correct**. After six designs, the results screen shows your score and lets you review the designs you missed.

### Controls

- **Choice buttons:** commit an answer. A wrong first answer gives a hint and lets you choose again; only the first answer counts.
- **Show definitions:** opens or closes the reference table. Reading it is exploration, not evidence.
- **Next:** moves to the next item after feedback. On the results screen, Previous missed and Next missed step through what you missed.
- **Play again:** starts a practice run with the items reshuffled. Practice runs do not change the first-run score.

Nothing moves until you act, and the MicroSim does not store your answers.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/ai-tutor-design-judge/main.html"
        height="748px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner can **judge** whether each of six AI tutor designs is likely to harm learning, a mixed case, or likely to help, by applying the five-guardrail rule, correctly judging at least five of six on the first attempt. (Bloom level: Evaluate.)

### Audience

Teachers, administrators, school board members, policymakers, and parents.

### Duration

10-15 minutes

### Prerequisites

- AI guardrails, hints instead of answers, guided AI versus open AI, and the five guardrails G1 to G5, from the section "Guardrails: Guided AI Versus Open AI" in Chapter 12

### Activities

1. **Judge (6 min).** Work through the six designs. Check G1 first, then count all the guardrails.
2. **Compare (3 min).** HomeworkHelper has three guardrails and fails. HintBot has one and is Mixed. Explain the difference.
3. **Apply (5 min).** Pick an AI tool your school uses or is considering. Which of G1 to G5 does it have? What is its verdict?

### Assessment

Mastery is 5 of 6 correct on the first try. Only the first answer to each design on the first run counts. Then ask learners to answer these without the MicroSim:

1. A tutor has G2, G3, G4, and G5 but gives answers on request. Verdict? *(Likely to harm learning. G1 is absent.)*
2. A tutor has G1 and G4 only. Verdict? *(Mixed: needs more guardrails.)*
3. Does a more powerful model need fewer guardrails? *(No. The rule looks at the design, not the model.)*

## References

1. [Generative AI Can Harm Learning](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4895486). Bastani and colleagues. The Turkish study behind the G1 rule.
2. [Intelligent tutoring system](https://en.wikipedia.org/wiki/Intelligent_tutoring_system). Wikipedia. How tutoring systems are designed and evaluated.
3. [Retrieval-augmented generation](https://en.wikipedia.org/wiki/Retrieval-augmented_generation). Wikipedia. One way to ground a tutor in the course's content (G2).
4. [Socratic questioning](https://en.wikipedia.org/wiki/Socratic_questioning). Wikipedia. The questioning style behind hint-first tutoring.
