---
title: "Implementing the AI-Native Model Responsibly"
description: "Putting the model into practice responsibly: contract due diligence, avoiding lock-in and rushed buying, governing and evaluating pilots, scaling, equity monitoring, budgets and hiring, and embedding the change in policy and culture."
generated_by: claude skill chapter-content-generator
date: "2026-11-04 09:06:20"
version: 1.11
---

# Implementing the AI-Native Model Responsibly

## Summary

This chapter covers putting the model into practice responsibly: safe procurement, avoiding vendor lock-in, equity and access, redesigning assessment instead of policing it, and measuring whether a pilot is actually working. Readers finish able to write procurement criteria and a success-measures plan for a school considering the model.

## Concepts Covered

This chapter covers the following 26 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Teamwork Rubric | 5 |
| Redesign Not Policing | 5 |
| Sustaining Change | 5 |
| Afternoon Specialist Staff | 4 |
| Grade-Level Design | 4 |
| Vendor Lock-In | 4 |
| Success Measures | 4 |
| Combined Assessment Plan | 4 |
| Rushed Procurement Risk | 3 |
| Pilot Governance | 3 |
| Program Evaluation | 3 |
| Digital Divide | 3 |
| Cost Barrier to AI Schools | 3 |
| Budget Reallocation | 3 |
| AI Coaching Teachers | 2 |
| Block Scheduling | 2 |
| Scaling a Pilot | 2 |
| Closing or Widening Gaps | 2 |
| Policy Embedding | 2 |
| Hiring for New Roles | 2 |
| Elementary School Model | 1 |
| Middle School Model | 1 |
| High School Model | 1 |
| Contract Due Diligence | 1 |
| A/B Testing | 1 |
| Culture Change Plan | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Evidence, Motivation, and the Stakeholders of Schooling](../02-evidence-motivation-stakeholders/index.md)
- [Chapter 7: Content Economics and Open Educational Resources](../07-content-economics-open-educational/index.md)
- [Chapter 10: Student Privacy and Data Governance](../10-student-privacy-data-governance/index.md)
- [Chapter 19: Microstrategies for Leading Change](../19-microstrategies-leading-change/index.md)
- [Chapter 20: Designing the AI-Native School Day](../20-designing-ai-native-school-day/index.md)

---

## The Contract on the Desk

Two months before the pilot, Ms. Okafor gets a call from the district's purchasing office. A vendor, whose product the district liked, has sent a 38-page contract, and the vendor's representative has mentioned that the price is good "through the end of the month." The purchasing officer, who is not a lawyer, asks whether the school is ready to sign.

Chapter 20 gave her a scorecard and a pilot rule. This chapter covers what happens after the decision to proceed: reading the contract, resisting the clock, governing the pilot, measuring honestly, scaling at a sustainable speed, watching who is helped and who is left behind, paying for it, staffing it, and making it last. The theme is the one the title says: responsibly. A good plan can be undone in any of these steps, and the failures in this book's AI-First Stories appendix, the Los Angeles chatbot and the iPad rollout among them, mostly happened here, in the implementation, and not in the idea.

!!! mascot-welcome "Where good plans get tested"
    ![Indigo waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    This chapter is about the unglamorous middle: contracts, pilots, measures, budgets, and staffing. You'll finish with checklists you can use on a real purchase and a real pilot. Let's find the balance between moving fast enough to help students and slowly enough to protect them.

## Buying Responsibly

### Rushed Procurement Risk

**Rushed procurement risk** is the danger that pressure to buy quickly, from hype, a vendor's deadline, an expiring budget, or fear of falling behind, leads a school to skip the checks that protect it. The pattern is familiar. Federal pandemic-relief funds (ESSER), which had to be spent by 2024, pushed many districts to buy technology quickly. The Los Angeles "Ed" chatbot, from the book's appendix, shows the cost: the district committed about \$6 million to a startup and spent about \$3 million before the company collapsed within months of launch. The remedy is a rule applied every time: no purchase before the criteria of Chapter 20 are met, whatever the deadline. A price that is only good until the end of the month is a reason for more caution, and a good vendor will extend it for a district that is doing due diligence.

### Contract Due Diligence

**Contract due diligence** is the careful review of a contract, and of the vendor behind it, before signing. It is the step that turns the privacy and governance principles of Chapter 10 into legal obligations. A district should have the contract read by someone qualified, usually counsel, with a checklist of the terms that matter most for an AI product:

- **Data ownership and use:** the district and families own the data; the vendor may use it only to provide the service, and may not use identifiable student data to train its own models or for marketing.
- **Breach notice:** a fixed deadline, such as 72 hours, for telling the district about a breach.
- **Deletion:** data is deleted on termination, within a stated time, with written confirmation.
- **Subprocessors:** a list of any other companies that will handle the data, with notice of changes.
- **Portability:** the right to export the data in a standard format at any time.
- **Price and term:** caps on renewal increases, no automatic multi-year renewal, and a right to terminate for convenience.
- **Accessibility and standards:** commitments to accessibility and to the interoperability standards of Chapter 9.
- **Model changes:** notice before the underlying AI model or its behavior changes materially.

Many districts use a shared template for the data terms, such as the National Data Privacy Agreement developed through the Student Data Privacy Consortium, so that each district does not negotiate from scratch.

### Worked Example: Reading Eight Clauses

Ms. Okafor and the district's counsel mark up eight clauses from the 38-page contract.

| Clause | Verdict | Why |
|---|---|---|
| "Vendor may use identifiable student data to improve and train its own AI models." | Red flag | A use beyond providing the service (Chapter 10) |
| "Data is deleted within 60 days of termination, with written confirmation." | Acceptable | A stated deadline and proof |
| "Vendor will notify the district of any breach within 72 hours." | Acceptable | A firm deadline |
| "Vendor will notify the district of a breach 'in a timely manner.'" | Needs change | No deadline can be enforced |
| "Price may rise by any amount at renewal; the contract renews automatically for three years." | Needs change | No cap and automatic multi-year commitment |
| "The district owns all student data and may export it in a standard format at any time." | Acceptable | Ownership and portability |
| "The district may not terminate before the end of the three-year term." | Needs change | No exit if the vendor fails |
| "Vendor may share student data with unnamed third parties for marketing." | Red flag | Student data must never be used for advertising |

Two red flags end the conversation until they are removed. Three more are fixable and should be negotiated. A vendor that will not change the red flags has answered the due-diligence question.

#### Diagram: Contract Clause Review

<details markdown="1">
<summary>Contract Clause Review</summary>
Type: microsim
**sim-id:** contract-clause-review<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge eight contract clauses from an AI product contract as acceptable, needing change, or a red flag, correctly judging at least seven of eight on the first attempt.

**Prerequisites:** contract due diligence, vendor lock-in, data ownership, breach notice, deletion, and the contract checklist (all defined in the sections "Buying Responsibly" above and in Chapter 10).

**Evidence of Mastery:** The learner places each of 8 clauses in one of three categories and submits it. A placement is correct when it matches the "Correct verdict" column in Content. Mastery is 7 of 8 correct on the first attempt. Reading the checklist is exploration, not evidence.

**Misconceptions:** (1) A vague promise is as good as a stated deadline. (2) Any clause that favors the vendor is a red flag. (3) Student data may be used to train a vendor's models if the vendor says it is anonymous.

**Instructional Rationale:** Judging a clause requires matching its wording to the checklist, noticing missing deadlines or caps, and separating fixable terms from deal-breakers. Pairs of clauses on the same topic, such as a firm and a vague breach deadline, force attention to wording.

**Content:**

Three categories with definitions on request:

| Category | Definition shown |
|---|---|
| Acceptable | Protects the district and families as written |
| Needs change | Not harmful in intent, but too vague or one-sided; negotiate a fix |
| Red flag | Allows a use or risk the district should not accept; remove before signing |

Eight clauses:

| # | Clause shown to the learner | Correct verdict | Why (shown as feedback) |
|---|---|---|---|
| 1 | "Vendor may use identifiable student data to improve and train its own AI models." | Red flag | It allows a use beyond providing the service. |
| 2 | "Data is deleted within 60 days of termination, with written confirmation." | Acceptable | It has a deadline and proof. |
| 3 | "Vendor will notify the district of any data breach within 72 hours." | Acceptable | It sets a firm deadline. |
| 4 | "Vendor will notify the district of a breach in a timely manner." | Needs change | There is no deadline that can be enforced. |
| 5 | "Price may rise by any amount at renewal, and the contract renews automatically for three years." | Needs change | There is no price cap and a long automatic commitment. |
| 6 | "The district owns all student data and may export it in a standard format at any time." | Acceptable | It states ownership and portability. |
| 7 | "The district may not terminate before the end of the three-year term for any reason." | Needs change | There is no exit if the vendor fails or the product disappoints. |
| 8 | "Vendor may share student data with unnamed third parties for marketing purposes." | Red flag | Student data must never be used for advertising or shared with unnamed parties. |

**Provenance:** The categories follow the chapter's contract checklist and Chapter 10. The clauses are fictional, written for this chapter, and the sim must say it is not legal advice.

**Rules:** Each clause has exactly one correct verdict, given in Content. A clause is scored on its first submitted verdict only. The score counts first-attempt correct verdicts out of 8. Mastery is a score >= 7.

**Learner Activity:**

1. The learner reads one clause and sees the three verdicts.
2. The learner selects a verdict and submits it. The sim marks it correct or incorrect and shows the feedback text.
3. If incorrect, the learner may choose again; the second attempt does not change the score. After the second attempt, the correct verdict and reason are shown.
4. After all 8 clauses, the sim shows the score.
5. The learner should notice that clauses 3 and 4 cover the same topic and receive different verdicts.

**Feedback:** 8 clauses, shuffled once per session, two attempts each. Correct: "Correct: [verdict]. [Why text]." Incorrect: "Not quite. Check for a deadline, a cap, an exit, and any use beyond the service. [Why text for the correct answer, without naming the verdict]." After the second attempt the correct verdict is revealed and the clause counts as missed. A running score "First-try correct: n of 8" is shown. Final message for a score >= 7: "You can read a contract for what protects students." For a score < 7: "Review the checklist and try again; the clauses will be reshuffled."

**Starting State:** Clause 1 of the shuffled order is shown with the three verdicts, the score "First-try correct: 0 of 8," and the prompt "Is this clause acceptable, does it need a change, or is it a red flag?"

**Chapter Anchors:** The chapter's worked example lists the same eight clauses with two red flags, three that need change, and three acceptable. The mastery bar is 7 of 8.
</details>

### Vendor Lock-In

**Vendor lock-in** is the dependence of a school on one vendor's systems or formats so strongly that switching is prohibitively costly, leaving the vendor in a position to raise prices or reduce quality. It happens when data lives in a proprietary format, when content cannot be moved, when staff are trained only on that product, and when the contract has no exit. The defenses come from earlier chapters. Open standards (xAPI, LTI, OneRoster, Chapter 9) let data and tools move. A contract right to export data in a standard format makes the data portable. Short terms and termination rights limit the commitment. And a fallback matters most of all: an open Level 2 textbook (Chapter 7) is something a district can host itself, so a district that keeps one as a baseline can walk away from any vendor.

!!! mascot-tip "Ask 'how do we leave?'"
    ![Indigo giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Before signing anything, ask the vendor to explain, in writing, how the district would leave: what data it gets back, in what format, how fast, and at what cost. A vendor who answers easily isn't worried about it. One who hedges has told you something.
 
## Piloting and Evaluating Responsibly

### Pilot Governance

**Pilot governance** is the structure of decision-making and oversight for a pilot: who is accountable, who decides, what data is collected and who may see it, and what stops the pilot. A short governance statement for a pilot names a steering group that includes a teacher, a family representative, the technology and privacy lead, and a principal; limits the vendor's access to the data the pilot needs; sets a data-sharing agreement; sets the stop rules written in advance (Chapter 20); sets a reporting schedule, such as a monthly note to families and staff; and says whether the pilot counts as research. If it does, formal review of the protection of human subjects may be required, and families must be given informed consent.

### Success Measures and Program Evaluation

**Success measures** are the specific indicators a pilot or program uses to judge whether it is succeeding. A balanced set covers more than test scores: learning (mastery gains and an independent test), engagement and attendance, teacher time and well-being, equity (results for each subgroup), cost per student, privacy incidents, and student and family experience. Measures should be chosen before the pilot starts, and a mix of *leading* indicators that move early (such as mastery counts) and *lagging* indicators that move late (such as annual test results) is useful. The warning from Chapter 2 applies: when a single measure becomes the target it is corrupted, so a set of measures is safer than one.

**Program evaluation** is the systematic assessment of a program's design, implementation, and results. A common tool is the *logic model*, which lays out the chain from the resources put in (inputs), through the activities carried out and what they produce directly (outputs), to the results for students (outcomes). Evaluation asks of each link whether it happened and whether the next followed. It should use independent evaluation where possible (Chapter 3), a baseline and a comparison group (Chapter 2), standardized testing for the academic core, and the quality tools of Chapter 14 for the afternoon.

**A/B testing** is a method in which two versions of something, A and B, are compared by randomly assigning people to each and measuring the difference. It is the randomized controlled trial of Chapter 2 on a small scale, used here to test whether a change helps. The ethical concern, that some students are denied a possibly better version, has a standard answer: *delayed access*. Everyone gets the new version, but the order is randomized, so the group that starts later serves as the comparison. The companion book *OER Evaluator* teaches how to run an A/B test on an improved open textbook.

### Worked Example: A Delayed-Access A/B Test

A school wants to know whether an improved version of an explanation page helps students on a ten-question quiz. It randomly assigns 120 students to the improved version (A) and 120 to the original (B) for one week, and then switches B to the improved version.

| Group | Students | Mean quiz score (out of 10) | Standard deviation |
|---|---|---|---|
| A: improved page | 120 | 7.9 | 2.0 |
| B: original page | 120 | 7.4 | 2.0 |

The difference is 0.5 points, and the effect size is \( d = (7.9 - 7.4)/2.0 = 0.25 \), a meaningful result by the benchmarks of Chapter 2, from a test that cost nothing but a coin flip and a week. Because everyone then gets the improved page, no student was left out. The result is one study of one page, so the school should check that it holds for another class before generalizing.

## Scaling Without Breaking

**Scaling a pilot** is the expansion of a successful pilot to more classrooms, schools, or the whole district. Chapter 15 supplied the ideas: choose a beachhead, build the whole product, and expect the chasm. Responsible scaling adds two rules. First, scale only as fast as capacity grows: the number of coaches, the training, and the support must keep pace, or the early majority meets a half-built product. Second, scale in stages with a gate at each: a pilot becomes a grade, then a school, then a feeder pattern, then the district, with the decision rule of Chapter 20 applied at each gate.

### Worked Example: Coach Capacity as the Speed Limit

Suppose a coach can support about 12 teachers well (an illustrative figure). The number of coaches needed is the number of teachers divided by 12, rounded up.

| Stage | Teachers | Coaches needed |
|---|---|---|
| Year 1: the pilot and a second school | 40 | \( \lceil 40/12 \rceil = 4 \) |
| Year 2: all middle schools | 150 | \( \lceil 150/12 \rceil = 13 \) |
| Year 3: the whole district | 400 | \( \lceil 400/12 \rceil = 34 \) |

The district has to grow from 4 coaches to 34 in three years. If it cannot hire or train that many, the right response is to slow the scaling, not to thin the coaching. The coach, not the technology, is the speed limit.

#### Diagram: Coach Capacity Calculator

<details markdown="1">
<summary>Coach Capacity Calculator</summary>
Type: microsim
**sim-id:** coach-capacity-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the number of coaches needed for a given number of teachers and coach capacity, and the number of teachers a given number of coaches can support, correctly answering three of three questions.

**Prerequisites:** scaling a pilot, instructional coaching, coach capacity, rounding up (all defined in the sections "Scaling Without Breaking" above and in Chapter 19).

**Evidence of Mastery:** Before the controls unlock, the learner commits three answers: (Q1) the coaches needed for 150 teachers at a capacity of 12; (Q2) the coaches needed for 400 teachers at a capacity of 12; (Q3) the largest number of teachers that 8 coaches can support at a capacity of 12. An answer is correct when it equals the value in Content. Mastery is 3 of 3 correct. Using the controls afterward is exploration.

**Misconceptions:** (1) Coaches needed can be a fraction. (2) Scaling speed depends only on the software. (3) A thinner coach load has no effect.

**Instructional Rationale:** Calculating with rounding up makes the learner confront the fact that capacity is in whole people. Asking in both directions, teachers to coaches and coaches to teachers, shows that coach capacity sets the speed limit of scaling.

**Content:**

Rules shown: coaches needed = teachers ÷ capacity, rounded up to the next whole number. Teachers supported = coaches × capacity.

Controls:

| Input | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Teachers to support | 10 | 600 | 10 | 150 | teachers |
| Teachers per coach | 6 | 20 | 1 | 12 | teachers |
| Coaches available | 1 | 50 | 1 | 8 | coaches |

Check values at capacity 12: 40 teachers need 4 coaches; 150 need 13; 400 need 34.

Answers: Q1 = 13; Q2 = 34; Q3 = 96 teachers.

**Provenance:** The capacity of 12 teachers per coach is illustrative, written for this chapter, and the sim must label it "Illustrative; set your own." The rounding rule is arithmetic.

**Rules:** Coaches needed = ceiling(teachers ÷ capacity). Teachers supported = coaches available × capacity. The sim shows the gap between coaches needed and coaches available, and says "Slow the rollout" when coaches available are fewer than coaches needed.

**Learner Activity:**

1. The learner answers Q1, Q2, and Q3 and submits them.
2. The sim checks the answers and unlocks the controls.
3. The learner changes the teachers, the capacity, and the coaches available. The coaches needed, the gap, and the message update at once.
4. The learner should notice that lowering capacity from 12 to 6 doubles the coaches needed, to the nearest whole coach.

**Feedback:** Three questions, fixed order, two attempts each. Correct: "Correct: [value]. [Working text]." Incorrect: "Not quite. Divide, then round up to a whole coach." After the second wrong attempt the value and working are shown. A score "n of 3" is shown.

**Starting State:** The defaults are shown with the results hidden, and the prompt reads "How many coaches does a district rollout need?"

**Chapter Anchors:** The chapter's worked example uses a capacity of 12 teachers per coach, giving 4 coaches for 40 teachers, 13 for 150, and 34 for 400. The mastery bar is 3 of 3.
</details>

## Equity in Implementation

### Digital Divide and Cost Barrier

The **digital divide** is the gap between those who have ready access to the internet and digital devices and those who do not, which tracks income, geography, and disability. Chapter 9 covered devices and offline access, and Chapter 20 listed the equity commitments. In implementation the divide appears in specifics: a student who cannot finish adaptive practice at home, a family without a reliable connection, an older device that cannot run a simulation. The remedies are specific too: loaner devices, hotspots, offline copies, and community Wi-Fi, supported in recent years by federal programs such as the Emergency Connectivity Fund.

The **cost barrier to AI schools** is the price that keeps AI-first models out of reach for most families. Alpha School charges about \$40,000 a year at its original Austin campus and about \$65,000 at newer campuses, against the roughly \$15,600 that U.S. public schools spend per pupil (Chapter 2), so tuition is about 2.6 to 4.2 times the public cost. A model that is available only at those prices is a model for the few, and is a reason that the public school version, using open Level 2 and Level 3 textbooks and a structured afternoon, matters.

### Closing or Widening Gaps

A tool that helps everyone on average can still widen gaps if it helps the advantaged more. **Closing or widening gaps** is the question of whether the change makes the difference between groups of students smaller or larger. The educational psychologist Keith Stanovich named the pattern the *Matthew effect*, after the saying that those who have get more: students who start ahead gain more from new tools and opportunities. To tell which is happening a school has to measure the gap before and after, for each subgroup, not only the average.

### Worked Example: Everyone Improves, the Gap Widens

Mean mastery scores for a lower-income group and a higher-income group at two schools, before and after one year.

| School | Group | Before | After | Gap before | Gap after | Result |
|---|---|---|---|---|---|---|
| 1 | Lower-income | 62 | 70 | 12 | 9 | Closing |
|  | Higher-income | 74 | 79 |  |  |  |
| 2 | Lower-income | 58 | 63 | 14 | 17 | Widening |
|  | Higher-income | 72 | 80 |  |  |  |

At School 2 both groups improved, and the average improvement was 6.5 points. A report that said "scores rose" would be true, and the gap grew from 14 to 17 points. At School 1 the lower-income group gained more, and the gap closed. The averages alone would make the two schools look alike.

#### Diagram: Is the Gap Closing?

<details markdown="1">
<summary>Is the Gap Closing?</summary>
Type: microsim
**sim-id:** is-the-gap-closing<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** differentiate<br/>
**Learning Objective:** The learner will differentiate five schools' results as closing, widening, or unchanged gaps by computing the gap before and after, correctly classifying at least four of five on the first attempt.

**Prerequisites:** closing or widening gaps, the Matthew effect, achievement gap (defined in the section "Equity in Implementation" above and in Chapter 3).

**Evidence of Mastery:** For each of 5 schools, the learner selects Closing, Widening, or Unchanged and submits it. A selection is correct when it matches the "Correct result" column in Content. Mastery is 4 of 5 correct on the first attempt. Viewing the computed gaps after answering is exploration.

**Misconceptions:** (1) If both groups improve, the gap must be closing. (2) A larger gain for one group always closes the gap. (3) An unchanged gap means no change in scores.

**Instructional Rationale:** Differentiating requires computing the gap, not reading the gains. Cases where both groups improve but the gap widens, and cases where both improve equally and the gap is unchanged, make the learner compute.

**Content:**

The rule shown: gap = higher-income mean − lower-income mean. If the gap after is at least 1 point smaller than before, the result is Closing; at least 1 point larger, Widening; otherwise Unchanged.

Five schools, mean mastery before and after:

| School | Lower-income before | Lower-income after | Higher-income before | Higher-income after | Gap before | Gap after | Correct result | Why (shown as feedback) |
|---|---|---|---|---|---|---|---|---|
| 1 | 62 | 70 | 74 | 79 | 12 | 9 | Closing | The gap fell from 12 to 9. |
| 2 | 58 | 63 | 72 | 80 | 14 | 17 | Widening | Both improved, but the gap rose from 14 to 17. |
| 3 | 60 | 66 | 70 | 76 | 10 | 10 | Unchanged | Both gained 6 points, so the gap stayed at 10. |
| 4 | 55 | 65 | 70 | 72 | 15 | 7 | Closing | The lower-income group gained 10 and the other gained 2. |
| 5 | 64 | 66 | 71 | 79 | 7 | 13 | Widening | The higher-income group gained 8 and the other gained 2. |

**Provenance:** The scores are illustrative, written for this chapter, and the sim must label them "Illustrative data."

**Rules:** Gap = higher-income mean − lower-income mean. Result = Closing if gap after <= gap before − 1; Widening if gap after >= gap before + 1; otherwise Unchanged. Each school has exactly one correct result, given in Content. A school is scored on its first submitted answer only. The score counts first-attempt correct answers out of 5. Mastery is a score >= 4.

**Learner Activity:**

1. The learner sees one school's four numbers and the three results.
2. The learner computes the gaps, selects a result, and submits it. The sim marks it correct or incorrect and shows the feedback text.
3. If incorrect, the learner may choose again; the second attempt does not change the score. After the second attempt, the correct result and reason are shown.
4. After all 5 schools, the sim shows the score and each school's gap before and after.
5. The learner should notice that in schools 2 and 5 the scores of both groups rose.

**Feedback:** 5 schools, shuffled once per session, two attempts each. Correct: "Correct: [result]. [Why text]." Incorrect: "Not quite. Compute the gap before and after. [Why text for the correct answer, without naming the result]." After the second attempt the correct result is revealed and the school counts as missed. A running score "First-try correct: n of 5" is shown. Final message for a score >= 4: "You can see past the averages to the gap." For a score < 4: "Review the rule and try again; the schools will be reshuffled."

**Starting State:** School 1 of the shuffled order is shown with its four scores and the three results, the score "First-try correct: 0 of 5," and the prompt "Is the gap between the two groups closing?"

**Chapter Anchors:** The chapter's worked example uses schools 1 and 2 with the same numbers (gaps 12 to 9 and 14 to 17). The rule for a closing, widening, or unchanged gap is a change of at least one point. The mastery bar is 4 of 5.
</details>

## Assessment and Integrity in Practice

**Redesign not policing** is the principle that a school should respond to AI by changing what and how it assesses, not by trying to catch students with detectors. Chapter 20 gave the reasons: detectors produce false accusations, with the heaviest burden on English-language learners, and a redesigned assessment makes AI less useful for cheating while measuring what matters better.

The **combined assessment plan** is the school's written plan for how the different kinds of assessment fit together: what is measured, with what tool, how often, and who sees it. It pairs the morning's mastery data with the afternoon's evidence and keeps the required state tests (which federal law still mandates, Chapter 2) in their place.

A **teamwork rubric** is a scoring guide for teamwork in a project, with a small number of criteria and descriptions of performance at each level, so that teachers and students share a picture of what good looks like. Rubrics support the performance assessment of Chapter 20 and are scored by two people on a sample to check agreement.

### Worked Example: A Combined Assessment Plan and a Teamwork Rubric

| What is measured | Tool | How often | Who sees it |
|---|---|---|---|
| Concept mastery in the academic core | Dashboard mastery data (Chapter 8) | Continuous | Student, teacher, family |
| Quality of work and growth | Portfolio with reflection | Each term | Student, mentor, family |
| Communication and teamwork | Exhibition and a teamwork rubric, two scorers | Each project | Student, teacher, family |
| Grade-level standards | State test | Annually (required) | School, district, state |

An illustrative teamwork rubric, scored from 1 to 4.

| Criterion | 1: Beginning | 2: Developing | 3: Proficient | 4: Exemplary |
|---|---|---|---|---|
| Contribution | Does little of the team's work | Does an assigned part | Does a fair share and helps others | Does a fair share and improves the team's work |
| Listening | Interrupts or ignores others | Listens but rarely responds | Paraphrases and asks questions | Draws out quieter members and builds on their ideas |
| Roles and accountability | Unclear or avoids a role | Fills a role when reminded | Fills a role reliably | Fills a role and covers gaps without being asked |
| Handling disagreement | Avoids it or makes it personal | Raises it, but argues positions | Discusses interests and reaches agreement | Helps the team turn the disagreement into a better solution |

!!! mascot-warning "A rubric is only as good as the scorers"
    ![Indigo warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is adopting a rubric and trusting every score. Different scorers can read it differently, which makes scores unfair. Have two people score a sample independently, compare, and discuss the differences until they agree on what each level looks like.

## Grade-Level Models, Scheduling, and Staff

**Grade-level design** is the adaptation of the AI-native school day to the needs of a particular age group, which Chapter 20 outlined in a table. Three models follow from it.

The **elementary school model** keeps one home-room teacher with a class for most of the day, which gives young children a stable relationship. The academic morning is short, mostly teacher-led and hands-on, and a brief adaptive block supports reading and number practice. The afternoon is play, movement, music, stories, and projects, often with older students as buddies. The **middle school model** adds an advisory teacher who follows a student for several years, an adaptive morning of about 150 minutes, and projects with public exhibitions in the afternoon, as in the schedule of Chapter 20. The **high school model** builds around credits and preparation for what follows: a morning that mixes adaptive work with seminars and laboratories, and an afternoon of capstone projects, internships and dual enrollment with community partners, ensembles, and service.

**Block scheduling** is the arrangement of the school day into fewer, longer periods, typically 80 to 90 minutes, which may alternate by day or by semester. It suits the new model, since a project, a laboratory, or a studio session needs a long uninterrupted block, and a high school's afternoon is the natural place for it. The costs are fewer class meetings per course, which makes long gaps between meetings of the same class, and the need for teachers to plan activities that fill a long block. The evidence on block scheduling is mixed, so it is a choice about fit and not a proven improvement.

**Afternoon specialist staff** are the adults, other than classroom teachers, who lead the afternoon: artists, musicians, coaches, makers, coders, and community experts, often part time or contracted. They bring skills that classroom teachers may not have. They also bring requirements: background checks, training in the school's structure (the SAFE practices of Chapter 14) and in safety, and a clear line of supervision. **Hiring for new roles** is the recruitment of adults for the roles the model needs, such as learning coach, afternoon facilitator, and program lead. The qualities to hire for are facilitation, the ability to build relationships with young people, comfort with technology, and a growth mindset, and the interview should include a demonstration, such as leading a ten-minute activity, since a résumé does not show it.

**AI coaching teachers** is the use of AI to support teachers in improving their practice, in the way the Tutor CoPilot study in the appendix used it: the AI gave suggestions to human tutors during their sessions. In that study, students' mastery improved, the least experienced tutors improved the most, and the cost per tutor was small. AI coaching can also help with lesson planning, reflection on a recorded lesson, and feedback on classroom talk. It carries the privacy and guardrail concerns of Chapters 10 and 12, since classroom recordings are sensitive, and it should support the teacher's judgment, not replace it or be used to rank teachers.

## Paying for It

**Budget reallocation** is the shifting of existing money from old uses to new ones, the main way a school pays for the model, since new money is rare. Chapter 7 showed where savings arise: a print-textbook baseline of about \$53 per student per year against about \$6 to \$13 for Level 2 or Level 3 content and training, which for a district of 12,000 students is roughly \$490,000 to \$570,000 a year. Other sources include ending licenses for content that has an open equivalent, reducing spending on remediation as gaps are closed earlier, and reassigning staff time.

### Worked Example: Is It Self-Financing?

The afternoon is the main new cost. Suppose a district of 12,000 students needs the equivalent of 20 additional full-time afternoon specialists at an illustrative loaded cost of \$60,000 each.

| | Amount per year |
|---|---|
| Savings: print versus Level 2 content and training (Chapter 7) | about \$570,000 |
| New cost: 20 afternoon specialists × \$60,000 | \$1,200,000 |
| Gap to fill | about \$630,000 |

The savings from content alone do not pay for the afternoon. The honest conclusion is that a district must find the rest by other means: community partners and volunteers, reassigning teacher time from lecturing (the adult-hours of Chapter 20), grants, and phasing the program in. The model is not free. Its claim is narrower: that it can be done within the order of magnitude of public school budgets, which Alpha's tuition of \$40,000 to \$65,000 shows is not true of every version.

## Making It Last

**Sustaining change** is the work of keeping the new way of working in place after the pilot ends and the champions move on. It is the refreeze and anchoring of Chapter 17 applied to the whole model. **Policy embedding** is making the change part of the formal rules: board policy, the bell schedule, the handbook, job descriptions, hiring practices, budgets, and agreements with the union and with the state. Where a rule gets in the way, such as a seat-time requirement tied to the Carnegie unit (Chapter 3), policy embedding includes seeking the waiver, and some states have allowed competency-based credit to replace seat time.

A **culture change plan** is a written plan, usually for one to two years, that brings together the change models of Chapters 16 to 19 and aims at the culture itself. It names the culture the school has and the one it wants (Chapter 18's assessment), and sets out actions for each of the main steps.

### Worked Example: A Twelve-Month Culture Change Plan

| Months | Focus | Models used | Main actions |
|---|---|---|---|
| 1–2 | Ready the ground | Kotter (urgency, coalition), CBAM (concerns survey), culture assessment | Share the data; form the coalition; read the culture; list losses |
| 3–5 | Launch the pilot | ADKAR, Bridges, pilot governance | Champions; coaching; family communication; one-page pilot plan |
| 6–8 | Show results and learn | Implementation dip, short-term wins | Honest monthly reports; peer observation; exhibition night |
| 9–10 | Build the whole product | Whole product, capacity building | Training package; integration; hiring for new roles |
| 11–12 | Embed | Anchoring, policy embedding | Board policy; hiring practices; schedule; staff orientation |

The plan fits on a page, and it names a model at each phase. Each line of it is a commitment, not a hope.

## Answering the Contract

Ms. Okafor's phone call has an answer. She will not sign by the end of the month. She will send the contract to counsel with the checklist, ask the vendor to remove two red flags and fix three terms, and tell the purchasing officer that a vendor that wants a district's business will extend the date. She will keep an open Level 2 textbook as the fallback, so that the district can leave if it has to. The pilot will have a governance statement, a balanced set of measures chosen in advance, a delayed-access design for the first test, and a decision rule. The scaling will be paced by coach capacity, and the gap data will be reported by subgroup.

The story has both sides. The benefit: a model that is carried out with its protections intact and that can be defended to families, the board, and the press. The risks: a rushed purchase, a locked-in vendor, a pilot that cannot fail, a scale-up that outruns its coaches, a gap that quietly widens, an afternoon with no money, and a change that fades when the champion leaves. The response is the set of habits in this chapter: due diligence before signing, an exit plan, governance and measures before the pilot, capacity-paced scaling, gap monitoring, honest budgets, and embedding in policy.

!!! mascot-thinking "Responsible means leave-able"
    ![Indigo thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice the thread through every section: a responsible implementation can be stopped, left, measured, and corrected. A contract you can exit, a pilot with a stop rule, a gap you track, a fallback you host yourself. The things you can't undo are the ones to be most careful about.

## Key Takeaways

- **Rushed procurement risk** skips the checks that protect schools; **contract due diligence** covers data use, breach notice, deletion, portability, price, term, and model changes. Two red flags end the conversation.
- **Vendor lock-in** is prevented with open standards, data export, short terms, and an open Level 2 fallback.
- **Pilot governance** sets who decides and what stops the pilot; **success measures** are a balanced set chosen in advance; **program evaluation** uses a logic model, independent evaluation, and a comparison; **A/B testing** with delayed access answers the ethical objection.
- **Scaling a pilot** is paced by capacity: 4, 13, and 34 coaches for 40, 150, and 400 teachers at 12 teachers per coach.
- The **digital divide** and the **cost barrier to AI schools** (tuition of \$40,000 to \$65,000) show why the public model matters; check **closing or widening gaps** with the gap, not the average.
- **Redesign not policing** pairs with a **combined assessment plan** and a **teamwork rubric** scored by two raters.
- **Grade-level design** gives the **elementary school model**, **middle school model**, and **high school model**; **block scheduling** suits projects; **afternoon specialist staff** and **hiring for new roles** supply the adults; **AI coaching teachers** supports without replacing.
- **Budget reallocation** does not fully pay for the afternoon in our example; **sustaining change** needs **policy embedding** and a **culture change plan**.

!!! mascot-celebration "You can implement it responsibly"
    ![Indigo celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You just learned to read a contract for what protects students, govern and evaluate a pilot, pace a scale-up to coach capacity, watch the gaps, and pay for and sustain the model. That completes the how-to of the book. Chapters 22 and 23 return to the real stories, the ones that worked and the ones that went wrong, and what they teach. One step at a time, together.
