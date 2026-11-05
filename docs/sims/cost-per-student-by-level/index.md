---
title: "Cost per Student by Level"
description: "Calculate the yearly cost per student and the district cost for Level 2, 3, and 4 textbooks from itemized costs, then explore AI usage, token price, and devices."
image: /sims/cost-per-student-by-level/cost-per-student-by-level.png
og:image: /sims/cost-per-student-by-level/cost-per-student-by-level.png
twitter:image: /sims/cost-per-student-by-level/cost-per-student-by-level.png
social:
   cards: false
status: built
quality_score: 100
---

# Cost per Student by Level

<iframe src="main.html" height="694px" width="100%" scrolling="no"></iframe>

[Run the Cost per Student by Level MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 7: Content Economics and Open Educational Resources](../../chapters/07-content-economics-open-educational/index.md){ .md-button }

To edit the sketch, paste the contents of `cost-per-student-by-level.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor's p5.js version to 2.x. The learning content is in the `CONFIG` block near the top of the file.

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/cost-per-student-by-level/main.html"
        height="694px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

The price of software is only one line in the cost of a digital textbook. This MicroSim itemizes the yearly cost per student at Levels 2, 3, and 4: content and hosting, a records platform, privacy governance, guardrail log review, teacher training, and, at Level 4, AI inference.

Three challenges come first: the Level 3 cost per student, the Level 4 cost per student at $2.00 per million tokens, and the Level 4 district cost for 12,000 students at $0.20. Then the controls unlock and the three totals, the district totals, and each level's share of $15,600 per-pupil spending update at once. Check **Device purchased** to add a $75.00 device share ($300 over four years).

All cost items are illustrative; replace them with your own quotes. The $20.00 and $0.07 prices are the Stanford AI Index 2025 values from Chapter 4; $2.00 and $0.20 are illustrative.

## How to Use

Nothing moves until you act, and the MicroSim does not store your answers.

- **Your answer box and Check:** type a dollar amount and press Check (or Enter). Two attempts per challenge; only the first counts.
- **Next:** moves on; after challenge 3 it unlocks the controls.
- **Tokens per session, Sessions per day, School days:** sliders for AI usage at Level 4.
- **Price per million tokens:** menu of $0.07, $0.20, $2.00, and $20.00.
- **Students:** slider from 100 to 20,000.
- **Device purchased:** checkbox that adds $75.00 per student per year at every level.
- **Redo challenges and Defaults:** start the challenges again, or reset the controls.

District costs are shown to the dollar; per-student costs to the cent.

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner will **calculate** the yearly cost per student and the district cost for Level 2, Level 3, and Level 4 textbooks from itemized costs, to within one cent per student, in three of three challenges. (Bloom level: Apply.)

### Audience

Teachers, administrators, school board members, education policymakers, and parents.

### Duration

15 minutes.

### Prerequisites

- Cost per student, cost modeling, total cost of ownership, and the cost items for each level, from the section "Putting a Cost on Each Level" in Chapter 7.

### Activities

1. **Calculate (6 min).** Add the Level 3 column, then the Level 4 column with inference, then multiply by 12,000.
2. **Compare (4 min).** Check Device purchased. Which is larger at Level 3: the device share or all the software items together?
3. **Explore (4 min).** Set the price to $20.00 and raise usage. At what point does Level 4 cost more than the device?

### Assessment

Ask learners to answer without the MicroSim, then check each answer by using it.

1. What does Level 3 cost per student per year without a device? *($12.80.)*
2. Level 4 at 3.6 million tokens and $2.00 per million? *($23.00, including $7.20 of inference.)*
3. Is a free textbook free to run? *(No. Hosting, training, and governance still cost money.)*
4. Is software the main cost of a digital textbook? *(Not when devices are bought: the $75.00 device share is larger than every software item combined at Levels 2 and 3.)*

## References

1. [Total cost of ownership](https://en.wikipedia.org/wiki/Total_cost_of_ownership). Wikipedia. Counting every cost over the life of a purchase.
2. [Open educational resources](https://en.wikipedia.org/wiki/Open_educational_resources). Wikipedia. Free-to-use content that still has running costs.
3. [The 2025 AI Index Report](https://hai.stanford.edu/ai-index/2025-ai-index-report). Stanford HAI. Reports the fall in the price of GPT-3.5-level performance from about $20 to about $0.07 per million tokens.
