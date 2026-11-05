---
title: "Contract Clause Review"
description: "Judge eight clauses from a fictional AI product contract as acceptable, needing change, or a red flag."
image: /sims/contract-clause-review/contract-clause-review.png
og:image: /sims/contract-clause-review/contract-clause-review.png
twitter:image: /sims/contract-clause-review/contract-clause-review.png
social:
   cards: false
status: built
---

# Contract Clause Review

<iframe src="main.html" height="380px" width="100%" scrolling="no"></iframe>

[Run the Contract Clause Review MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 21: Implementing the AI-Native Model Responsibly](../../chapters/21-implementing-ai-native-model-responsibly/index.md){ .md-button }

To edit the sketch, paste the contents of `contract-clause-review.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor's p5.js version to 2.x. The learning content is in the `CONFIG` block at the top of the file.

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/contract-clause-review/main.html"
        height="380px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

Before a district signs a contract for an AI product, someone has to read the clauses that protect students. The MicroSim shows eight clauses from a fictional contract, one at a time. You give each one a verdict:

| Verdict | Meaning |
|---|---|
| Acceptable | Protects the district and families as written |
| Needs change | Not harmful in intent, but too vague or one-sided; negotiate a fix |
| Red flag | Allows a use or risk the district should not accept; remove before signing |

Check each clause for a deadline, a cap, an exit, and any use of data beyond providing the service. Two clauses cover breach notice: one sets a firm 72-hour deadline and one promises notice "in a timely manner." They get different verdicts. The clauses are fictional, and this MicroSim is not legal advice.

## How to Use

1. Read the clause in the white box.
2. Click the verdict you think fits. The button turns blue.
3. Press **Submit**. The box below the clause says whether you are right and why.
4. If you are wrong, the button you chose turns orange. Choose again and press **Submit**. The second try does not change the score. After a second miss, the right answer turns green.
5. Press **Next** to go on. After the last clause, press **Finish** to see your score, with the clauses grouped by verdict.
6. Press **Start over** at any time to reshuffle and begin again.
7. Check **Show definitions** to read what each verdict means. Uncheck it to go back.

Only your first try on each clause counts toward the score. The clauses are shuffled each run. Nothing moves until you act, and the MicroSim does not store your answers.

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner can **judge** eight contract clauses from an AI product contract as acceptable, needing change, or a red flag, correctly judging at least seven of eight on the first attempt. (Bloom level: Evaluate.)

### Audience

Teachers, school administrators, school board members, education policymakers, and parents.

### Duration

10-15 minutes

### Prerequisites

- Contract due diligence, vendor lock-in, data ownership, breach notice, deletion, and the contract checklist, from the section "Buying Responsibly" in Chapter 21 and from Chapter 10.

### Activities

1. **Review the checklist (2 min).** Check **Show definitions** and read the three verdicts.
2. **Judge (7 min).** Give all eight clauses a verdict. Aim for 7 of 8 on the first try.
3. **Rewrite (5 min).** Rewrite one "Needs change" clause so it becomes acceptable.

### Assessment

Ask learners to answer without the MicroSim, then check each answer by using it.

1. "Vendor will notify the district of a breach in a timely manner." What is the verdict? *(Needs change. There is no deadline that can be enforced.)*
2. Is every clause that favors the vendor a red flag? *(No. A one-sided clause can often be fixed by negotiation. A red flag allows a use or risk the district should not accept.)*
3. A vendor says the student data it trains on is anonymous. Is that enough? *(No. Using student data to train the vendor's own models is a use beyond providing the service.)*

## References

1. [Vendor lock-in](https://en.wikipedia.org/wiki/Vendor_lock-in). Wikipedia. How long terms and closed formats make it hard to leave a vendor.
2. [Family Educational Rights and Privacy Act](https://en.wikipedia.org/wiki/Family_Educational_Rights_and_Privacy_Act). Wikipedia. The main U.S. law on student education records.
3. [Common Sense Privacy Program](https://privacy.commonsense.org/). Common Sense Media. Privacy evaluations of education products.
