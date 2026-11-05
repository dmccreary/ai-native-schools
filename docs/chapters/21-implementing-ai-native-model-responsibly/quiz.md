# Quiz: Implementing the AI-Native Model Responsibly

Test your understanding of responsible procurement, pilot governance and evaluation, capacity-paced scaling, equity monitoring, and sustaining the model with these review questions.

---

#### 1. What is vendor lock-in?

<div class="upper-alpha" markdown>

1. Dependence on one vendor so strong that switching becomes too costly
2. A contract clause that guarantees a vendor's price for the full term
3. A security feature that locks student data so only the vendor can see it
4. An agreement among vendors not to compete for the same school district
</div>

??? question "Show Answer"
    The correct answer is **A**. Vendor lock-in happens when data lives in proprietary formats, content cannot be moved, staff are trained only on one product, and the contract has no exit, leaving the vendor able to raise prices or reduce quality. The defenses are open standards such as xAPI, LTI, and OneRoster, a contract right to export data, short terms with termination rights, and above all a fallback, such as an open Level 2 textbook the district can host itself.

    **Concept Tested:** Vendor Lock-In

    **See:** [Vendor Lock-In](index.md#vendor-lock-in)

---

#### 2. How does a delayed-access design answer the ethical objection to A/B testing in schools?

<div class="upper-alpha" markdown>

1. It lets families choose which version their child receives
2. It gives the new version only to the students who are furthest behind
3. It randomizes when each group gets the new version, so all receive it
4. It tests the new version on teachers before any students see it
</div>

??? question "Show Answer"
    The correct answer is **C**. The objection to A/B testing is that some students are denied a possibly better version. In a delayed-access design, everyone gets the new version, but the order is randomized, so the group that starts later serves as the comparison. In the chapter's example, students were randomly assigned to the improved or original page for one week, and then the original group switched. Letting families choose would reintroduce the selection bias that randomization is meant to remove.

    **Concept Tested:** A/B Testing

    **See:** [Success Measures and Program Evaluation](index.md#success-measures-and-program-evaluation)

---

#### 3. During contract due diligence, counsel reviews four clauses in an AI tutoring contract. Which one should be marked as a red flag?

<div class="upper-alpha" markdown>

1. "Data is deleted within 60 days of termination, with written confirmation."
2. "Vendor may use identifiable student data to improve and train its own AI models."
3. "Vendor will notify the district of any breach within 72 hours."
4. "The district owns all student data and may export it in a standard format at any time."
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter's due-diligence checklist says the vendor may use data only to provide the service and may not use identifiable student data to train its own models or for marketing. Using it to train the vendor's AI is a use beyond the service, so it is a red flag that ends the conversation until it is removed. The other three clauses are acceptable: a stated deletion deadline with proof, a firm breach-notice deadline, and district ownership with portability.

    **Concept Tested:** Contract Due Diligence

    **See:** [Worked Example: Reading Eight Clauses](index.md#worked-example-reading-eight-clauses)

---

#### 4. A district plans to scale a program to 250 teachers. If one coach can support about 12 teachers well, how many coaches will the district need?

<div class="upper-alpha" markdown>

1. About 12
2. About 20
3. About 25
4. About 21
</div>

??? question "Show Answer"
    The correct answer is **D**. The number of coaches is the number of teachers divided by 12, rounded up: 250 / 12 is about 20.8, which rounds up to 21. Rounding down to 20 would leave some teachers without adequate coaching. The chapter's point is that the coach, not the technology, is the speed limit for scaling: if the district cannot hire or train enough coaches, it should slow the scaling rather than thin the coaching.

    **Concept Tested:** Scaling a Pilot

    **See:** [Worked Example: Coach Capacity as the Speed Limit](index.md#worked-example-coach-capacity-as-the-speed-limit)

---

#### 5. After one year, a school's lower-income students rose from a mastery score of 60 to 66, and higher-income students rose from 75 to 84. The principal's report says, "Scores rose for every group." What does the chapter's analysis reveal?

<div class="upper-alpha" markdown>

1. Both groups improved, but the gap between them widened from 15 to 18 points
2. The gap closed, since both groups improved by a similar amount
3. The program failed, since lower-income students did not reach the higher group
4. The result cannot be judged without the state test scores for the year
</div>

??? question "Show Answer"
    The correct answer is **A**. The gap was 75 - 60 = 15 points before and 84 - 66 = 18 points after, so it widened even though both groups improved. Higher-income students gained 9 points and lower-income students 6. The chapter warns that a tool that helps everyone on average can still widen gaps, the Matthew effect Stanovich described, and that a school must measure the gap for each subgroup before and after, not only the average. The report's statement is true and incomplete.

    **Concept Tested:** Closing or Widening Gaps

    **See:** [Worked Example: Everyone Improves, the Gap Widens](index.md#worked-example-everyone-improves-the-gap-widens)

---

#### 6. Why does the chapter favor "redesign not policing" as the response to AI and academic integrity?

<div class="upper-alpha" markdown>

1. Because AI detectors are too expensive for most districts to license
2. Because detectors falsely accuse students, especially English learners
3. Because students who use AI are always honest about it when asked
4. Because federal law prohibits schools from using AI detectors on student work
</div>

??? question "Show Answer"
    The correct answer is **B**. Redesign not policing means changing what and how a school assesses rather than trying to catch students with detectors. Chapter 20 showed that detectors produce false accusations, with the heaviest burden on English-language learners, while redesigned assessments, such as in-class work, process evidence, and oral defense, make AI less useful for cheating and measure what matters better. The chapter does not rest the case on cost or a legal ban.

    **Concept Tested:** Redesign Not Policing

    **See:** [Assessment and Integrity in Practice](index.md#assessment-and-integrity-in-practice)

---

#### 7. A school runs a delayed-access A/B test of a revised lesson page. Group A, with the revised page, has a mean quiz score of 8.2; Group B, with the original, has 7.6. Both groups have a standard deviation of 2.4. What is the effect size?

<div class="upper-alpha" markdown>

1. About 0.6
2. About 0.10
3. About 1.4
4. About 0.25
</div>

??? question "Show Answer"
    The correct answer is **D**. The effect size is the difference in means divided by the standard deviation: (8.2 - 7.6) / 2.4 = 0.6 / 2.4 = 0.25. The 0.6 answer is the raw difference in points, not standardized. As in the chapter's example, an effect of 0.25 is meaningful by the education benchmarks of Chapter 2. The chapter adds that one study of one page should be checked in another class before the school generalizes from it.

    **Concept Tested:** Program Evaluation

    **See:** [Worked Example: A Delayed-Access A/B Test](index.md#worked-example-a-delayed-access-ab-test)

---

#### 8. A district estimates \$400,000 a year in content savings from switching to an open Level 2 textbook. Its afternoon program needs 15 additional specialists at \$60,000 each. What conclusion does the chapter's reasoning support?

<div class="upper-alpha" markdown>

1. The model is self-financing, since content savings exceed the afternoon cost
2. The model should be abandoned, since it cannot be paid for from savings
3. Savings leave a gap of about \$500,000 to fill through partners, grants, or phasing
4. The district should cut the afternoon program to match the content savings exactly
</div>

??? question "Show Answer"
    The correct answer is **C**. Fifteen specialists at \$60,000 cost \$900,000, so the \$400,000 in savings leaves a gap of about \$500,000. The chapter's worked example reaches the same kind of conclusion: content savings alone do not pay for the afternoon, so a district must find the rest through community partners and volunteers, reassigning teacher time from lecturing, grants, and phasing in. The model's claim is narrower: it can be done within the order of magnitude of public budgets, unlike AI-first tuition of \$40,000 to \$65,000.

    **Concept Tested:** Budget Reallocation

    **See:** [Worked Example: Is It Self-Financing?](index.md#worked-example-is-it-self-financing)

---

#### 9. A vendor's representative tells a purchasing officer that a favorable price is good "through the end of the month," and the district's one-time funds must be spent soon. The 38-page contract has not been reviewed. Which course of action is best justified by the chapter?

<div class="upper-alpha" markdown>

1. Decline the deadline, send the contract to counsel, ask for an extension, keep a fallback
2. Sign now to lock in the price, then negotiate the contract terms after the pilot begins
3. Sign a shorter version of the contract that omits the data terms to save time
4. Cancel all AI purchases, since any deadline pressure proves the vendor cannot be trusted
</div>

??? question "Show Answer"
    The correct answer is **A**. Rushed procurement risk is the danger that pressure from hype, deadlines, or expiring budgets leads a school to skip its protections; the Los Angeles "Ed" chatbot, which spent about \$3 million before the company collapsed, shows the cost. The chapter's rule is no purchase before the criteria are met, whatever the deadline, and says a good vendor will extend a price for a district doing due diligence. Signing first gives up leverage, omitting data terms removes the protections, and cancelling everything overreacts.

    **Concept Tested:** Rushed Procurement Risk

    **See:** [Rushed Procurement Risk](index.md#rushed-procurement-risk)

---

#### 10. A district's pilot plan uses one success measure: the state test score at the end of the year. Analyzed against the chapter's guidance on success measures, what is the main weakness?

<div class="upper-alpha" markdown>

1. State tests cannot be used in pilots, since they are required for accountability
2. A single measure is fine, as long as an independent evaluator scores it
3. A single lagging measure can be corrupted and misses equity, cost, and privacy
4. The measure should be replaced with a teacher satisfaction survey alone
</div>

??? question "Show Answer"
    The correct answer is **C**. A balanced set of success measures covers learning, engagement and attendance, teacher time and well-being, equity by subgroup, cost per student, privacy incidents, and student and family experience, chosen before the pilot. A mix of leading indicators that move early and lagging ones like annual tests is useful. The chapter applies Chapter 2's warning that when a single measure becomes the target it is corrupted, so a set is safer than one. Replacing the test with one survey repeats the same mistake.

    **Concept Tested:** Success Measures

    **See:** [Success Measures and Program Evaluation](index.md#success-measures-and-program-evaluation)
