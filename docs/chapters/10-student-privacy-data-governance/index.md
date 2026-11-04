---
title: "Student Privacy and Data Governance"
description: "Why Level 3 and higher textbooks raise a privacy inflection point, what FERPA, COPPA, and GDPR require, how to govern student data and audit algorithms for bias, and what inBloom and the PowerSchool breach teach."
generated_by: claude skill chapter-content-generator
date: "2026-11-04 08:30:20"
version: 1.11
---

# Student Privacy and Data Governance

## Summary

This chapter covers the level-3 privacy inflection point: why adaptive and higher-level textbooks need detailed student data, and what that triggers — FERPA, COPPA, GDPR, data governance, and algorithmic bias auditing — illustrated by the inBloom shutdown and the PowerSchool data breach. Readers finish able to assess whether a school's data governance is ready for a level-3-or-higher textbook.

## Concepts Covered

This chapter covers the following 26 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Student Data | 271 |
| Personally Identifiable Data | 251 |
| Student Data Privacy | 250 |
| Data Governance | 132 |
| Algorithmic Bias | 50 |
| Privacy Inflection Point | 49 |
| Detailed Learning History | 25 |
| Behavioral Data | 22 |
| FERPA | 21 |
| COPPA | 21 |
| GDPR | 21 |
| Data Minimization | 21 |
| Informed Consent | 21 |
| Data Retention Policy | 21 |
| Data Ownership | 21 |
| Algorithmic Bias Auditing | 21 |
| Algorithmic Transparency | 21 |
| Governance Readiness | 20 |
| Data Breach | 19 |
| Vendor Risk | 9 |
| Cybersecurity in Schools | 7 |
| Responsible AI with Minors | 5 |
| Age-Appropriate AI Design | 4 |
| Trust Paradox | 3 |
| Family Trust | 2 |
| Centralized Student Records | 2 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Evidence, Motivation, and the Stakeholders of Schooling](../02-evidence-motivation-stakeholders/index.md)
- [Chapter 6: The Five-Level Model of Intelligent Textbooks](../06-five-level-model-intelligent-textbooks/index.md)
- [Chapter 8: Tracking Mastery: xAPI, Learning Record Stores, and MicroSims](../08-tracking-mastery-xapi-learning-record/index.md)

---

## A Parent Who Reads the News

At the next parent night, a father named Mr. Chen, who works in network security, stands up with a printout. "I read that a company that holds records for tens of millions of students was breached last winter," he says. "You're about to ask us to let a system keep a record of every mistake my daughter makes. Why should I trust it more than that company?"

Ms. Okafor does not argue. She thanks him, because he has asked the central question of the whole Level 3 design. Everything in the earlier chapters that makes a textbook adaptive requires a record about a child. The better the adaptation, the more detailed the record. And records can leak, be misused, or be kept long after anyone needs them.

This chapter takes that problem seriously. It explains what student data is and what the law requires, how a school governs the data it holds, how it checks that an algorithm treats groups of students fairly, and what two real failures, inBloom and the PowerSchool breach, teach. It ends with a way for a school to judge whether it is ready for a Level 3 textbook. The goal is the book's usual one: strengthen the benefits of personalization and reduce the harm.

!!! mascot-welcome "Take the hard question first"
    ![Indigo waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    This is the chapter where trust gets built or lost, so we'll answer Mr. Chen's question with specifics instead of reassurance. You'll learn what the main privacy laws ask of a school, how to govern data, and how to tell whether a district is ready for an adaptive textbook. Let's find the balance between a textbook that knows a student well and a school that protects what it knows.

## What Counts as Student Data

**Student data** is any information that a school, or a company working for a school, collects, creates, or keeps about a student. It is broader than the grade book. It includes enrollment and demographic information, attendance, grades and test scores, discipline records, health and special-education information, eligibility for free or reduced-price lunch, and, increasingly, what a student does inside digital learning tools: answers, time on task, and clicks.

**Personally identifiable data**, often called personally identifiable information or PII, is any student data that identifies a particular student, either on its own or in combination with other information. It has two kinds. *Direct identifiers* single out a person by themselves: a name, a student ID number, a home address, a photograph, a fingerprint. *Indirect identifiers*, also called linkable data, do not name anyone but can identify a student when combined: a birth date together with a ZIP code and a gender, for example. Latanya Sweeney's research found that those three facts alone were enough to uniquely identify about 87 percent of Americans, which is why "we removed the names" does not make a data set anonymous.

**Student data privacy** is the protection of student data from unauthorized access, use, and disclosure, and the right of students and families to know about and control how it is used. It has two sides. One is *security*: keeping outsiders out. The other is *appropriate use*: making sure that people who legitimately hold the data use it only for the purposes for which it was collected.

### Worked Example: A Data Map for One School

Governance begins with knowing what data exists. A data map lists each tool, the data it holds, and where that data goes. Here is a small, illustrative map for Lincoln Middle School's three tools.

| Tool | Level | Data it holds | Identifying? | Who can see it | Kept for |
|---|---|---|---|---|---|
| Open Level 2 textbook | 2 | None about students | No | Not applicable | Not applicable |
| Adaptive math platform | 3 | Student ID, every answer, time on task, mastery estimates | Yes (ID, linkable) | Teacher, student, family, vendor | One year after the student leaves |
| School information system | n/a | Name, birth date, address, grades, attendance, disability flags | Yes (direct) | Office staff, teachers, district | Per state records law |

Reading across the map shows two things at once. The Level 2 textbook adds no privacy burden, which is the main reason it is the book's default recommendation. And the adaptive platform holds the most behavior-rich data of the three, which is why it needs the strongest review. A school that cannot produce a map like this for every tool is missing the second must-have practice at the end of this chapter.

### Worked Example: Four Ways Privacy Fails

Student data privacy covers both keeping outsiders out (security) and making sure insiders use data appropriately. The four combinations show that both halves matter.

| | Access is authorized | Access is unauthorized |
|---|---|---|
| **Used for the stated purpose** | Normal operation: a teacher reads her own class's mastery data | A breach where the stolen data is never used: still a failure of security |
| **Used for another purpose** | Misuse by an insider: a staff member browses a neighbor's child's records, or a vendor trains a model on identifiable data | A breach followed by fraud or exposure |

A security checklist addresses only the right-hand column. The bottom-left cell, authorized people using data for the wrong reason, is where many everyday violations occur, and it is addressed by purpose limits, access logs, and training, which is why governance is more than cybersecurity.

### Worked Example: Is This Field Identifying?

Mr. Chen's daughter has a record in a Level 3 textbook. Consider several fields in it.

| Field | Identifies on its own? | Why |
|---|---|---|
| Name | Yes: direct identifier | It names the student |
| State student ID | Yes: direct identifier | It is unique to one student |
| Birth date plus ZIP code plus gender | No, but identifies in combination | Together they are unique for most people |
| The district's average score on a test | No | It describes a group, not an individual |
| Grade 7, Lincoln Middle, the only student there with a hearing impairment | In combination | The small group size makes the student identifiable |

The last row is the subtle one. Data about a group can identify an individual when the group is small enough. This is why privacy rules often suppress results for groups under a minimum size, a threshold such as ten students.

#### Diagram: Is This Data Identifying?

<details markdown="1">
<summary>Is This Data Identifying?</summary>
Type: microsim
**sim-id:** is-this-data-identifying<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** classify<br/>
**Learning Objective:** The learner will classify eight data fields as direct identifiers, identifiers in combination, or not identifying, correctly placing at least seven of eight on the first attempt.

**Prerequisites:** student data, personally identifiable data, direct identifier, indirect identifier, small-group identification (all defined in the section "What Counts as Student Data" above).

**Evidence of Mastery:** The learner places each of 8 data fields in one of three categories and submits it. A placement is correct when it matches the "Correct category" column in Content. Mastery is 7 of 8 correct on the first attempt. Reading the category definitions is exploration, not evidence.

**Misconceptions:** (1) Removing names makes data anonymous. (2) Group data can never identify a person. (3) Only a name or ID number counts as identifying.

**Instructional Rationale:** Classifying fields requires applying the distinction between identifying alone and identifying in combination. Including a small-group field and a combination of ordinary facts makes the learner use the idea of linkability, not just recognize obvious identifiers.

**Content:**

Three categories:

| Category | Definition shown |
|---|---|
| Direct identifier | Identifies a specific student on its own |
| Identifies in combination | Not identifying alone, but identifies a student when combined with other facts or because the group is very small |
| Not identifying | Describes a large group or carries no link to any individual |

Eight fields:

| # | Data field shown to the learner | Correct category | Why (shown as feedback) |
|---|---|---|---|
| 1 | A student's full name | Direct identifier | It names the student. |
| 2 | A state-assigned student ID number | Direct identifier | It is unique to one student. |
| 3 | A home street address | Direct identifier | It points to a specific household and student. |
| 4 | A birth date, a ZIP code, and a gender, together | Identifies in combination | Together they are unique for most people. |
| 5 | A fingerprint used to log in to a school device | Direct identifier | A biometric is unique to one person. |
| 6 | The district-wide average score on the state math test | Not identifying | It describes thousands of students, not one. |
| 7 | Grade 7, Lincoln Middle, and a hearing impairment, when only one student at that school has one | Identifies in combination | With a group of one, the facts point to a single student. |
| 8 | The number of students absent from the district today | Not identifying | It is a district-wide count that points to no one. |

**Provenance:** The categories follow the chapter section "What Counts as Student Data." The 87 percent figure cited in the chapter is from Latanya Sweeney's research on the identifiability of birth date, ZIP code, and gender. The fields are illustrative, written for this chapter.

**Rules:** Each field has exactly one correct category, given in Content. A field is scored on its first submitted placement only. The score counts first-attempt correct placements out of 8. Mastery is a score >= 7.

**Learner Activity:**

1. The learner sees one data field at a time and the three categories.
2. The learner places the field and submits. The sim marks it correct or incorrect and shows the feedback text.
3. If incorrect, the learner may place it again; the second attempt does not change the score. After the second attempt, the correct category and reason are shown.
4. After all 8 fields, the sim shows the score and lists misplaced fields with their correct categories.
5. The learner should notice that fields 4 and 7 contain no name, yet still identify a student.

**Feedback:** 8 fields, shuffled once per session, two attempts each. Correct: "Correct: [category]. [Why text]." Incorrect: "Not quite. [Why text for the correct answer, without naming the category]." After the second attempt the correct category is revealed and the field counts as missed. A running score "First-try correct: n of 8" is shown. Final message for a score >= 7: "You can spot data that identifies a student." For a score < 7: "Review the three categories and try again; the fields will be reshuffled."

**Starting State:** Field 1 of the shuffled order is shown with the three categories, the score "First-try correct: 0 of 8," and the prompt "Does this field identify a student?"

**Chapter Anchors:** The chapter names two kinds of identifier, direct and indirect, and states that small groups can identify individuals. It cites the 87 percent finding for birth date, ZIP code, and gender. The mastery bar is 7 of 8.
</details>

## The Privacy Inflection Point

The **privacy inflection point** is the level of the five-level model at which a textbook's data needs change from almost none to substantial. As Chapter 6 explained, Levels 1 and 2 need no record about an individual student. At Level 3 and above, the textbook needs the data that makes adaptation possible, and the privacy duties of this chapter begin to apply.

Two kinds of data drive the change. A **detailed learning history** is a long, time-ordered record of everything a student has attempted, answered, and struggled with: every wrong answer to every question over years. It is the same record that makes a Level 3 textbook useful, and it is a portrait of a child's mind. **Behavioral data** is data about how a student acts while learning, rather than what they answer: how long they hesitate, what they click, which hints they request, when they log in, how they type. It can reveal much more than anyone intended, such as attention, frustration, a learning difference, or a home situation.

Neither kind of data is dangerous by existing. The danger is in how much is kept, for how long, by whom, and for what use, which is why the rest of the chapter is about rules and governance.

### Worked Example: What a Clickstream Can and Cannot Tell You

Behavioral data invites over-interpretation. The same signal can mean very different things, and acting on a guess can harm a student. Each signal below is illustrative.

| Signal in the data | What it might mean | What it might also mean | A safer use |
|---|---|---|---|
| Long pauses before answering | Careful thinking | Difficulty reading, an attention difficulty, or distraction | Prompt a teacher check-in; do not label the student |
| Rapid, random clicking | Guessing | Boredom, or a rushed student who knows the material | Offer harder or different material |
| Logging in at 2 a.m. | Late-night studying | Trouble sleeping, or a home situation | Do not draw conclusions; consider whether to collect login times at all |
| Many requests for hints | Confusion | A student gaming the hint ladder | Look at the pattern over time and ask the student |

Two rules follow. Data that supports a human conversation is a good use, and data used to assign a label or a consequence without one is risky. And data that no decision needs, such as exact login times, should not be collected, which is data minimization again.

### Worked Example: What Changes at Level 3

The table compares what Maya's school holds under a Level 2 textbook and a Level 3 textbook for the same unit.

| | Level 2 textbook | Level 3 textbook |
|---|---|---|
| Stored about Maya | Nothing | A coded record of every answer, in order, for the year |
| Tracks behavior | No | Yes: time on page, hints requested, session times |
| Who could see it | Not applicable | Teacher, family, and the vendor's systems, unless limited |
| If the system is breached | No student data exposed | A year of Maya's learning history exposed |
| Privacy review needed | Accessibility and accuracy only | Records, consent, retention, bias, and breach plan |

The comparison is not an argument against Level 3. It is an argument for doing Level 3 *deliberately*, with a governance process, which the rest of this chapter describes.

!!! mascot-thinking "The same record is the benefit and the risk"
    ![Indigo thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that the record that shows Maya exactly which fraction idea to review is also the record that would harm her if it leaked. You can't keep the benefit and delete the risk; you can only shrink the risk with rules. That's why every Level 3 decision begins with "what do we actually need to keep?"

## The Laws: FERPA, COPPA, and GDPR

Three laws shape most of what a school must do. Each has a different scope, and a school may be subject to more than one.

**FERPA**, the Family Educational Rights and Privacy Act of 1974, is the main U.S. federal law protecting student education records. It gives parents, and students who turn 18, the right to inspect their education records and to ask for corrections. It generally requires written consent before a school discloses personally identifiable information from those records, with exceptions. One important exception lets a school share data with a vendor that acts as a "school official" with a legitimate educational interest, provided the school keeps direct control of how the vendor uses and protects the data. FERPA applies to schools that receive federal education funds, and the U.S. Department of Education can withhold funds for violations. It does not give individuals a right to sue, which the Supreme Court held in 2002.

**COPPA**, the Children's Online Privacy Protection Act of 1998, protects children under 13 online. It requires operators of websites and online services directed at children, or that know they collect data from them, to give notice and get verifiable parental consent before collecting personal information, and it is enforced by the Federal Trade Commission. The FTC has allowed schools to consent *on behalf of parents* for educational uses only, which means a school that signs a vendor's terms takes on a responsibility for what the vendor does with the data. COPPA was updated by an FTC rule in 2025, so a district should check the current requirements.

**GDPR**, the European Union's General Data Protection Regulation, in force since 2018, is a comprehensive privacy law covering the personal data of people in the EU, wherever the organization is located. It requires a lawful basis for processing, collection of only what is needed, and gives individuals rights to access, correct, delete, and move their data (Chapter 8's portability). Penalties can reach 20 million euros or four percent of worldwide annual revenue, whichever is higher. A U.S. school generally falls outside GDPR, but a vendor serving European students, and any school with students resident in the EU, may not.

Many U.S. states have added their own student-privacy laws. California's Student Online Personal Information Protection Act of 2014, for example, bars educational technology operators from using student data for targeted advertising or from building profiles for non-educational purposes. A district should know which of its state's laws apply.

| Law | Where | Protects | Key requirements |
|---|---|---|---|
| FERPA | United States | Education records of students in federally funded schools | Parent and student access and correction; consent before disclosure, with a school-official exception |
| COPPA | United States | Personal information of children under 13 online | Notice and verifiable parental consent; school consent allowed for educational use only |
| GDPR | European Union | Personal data of people in the EU | Lawful basis, data minimization, rights to access, erase, and port data; large fines |
| State laws | Varies by state | Student data from educational technology operators | Often ban targeted advertising and non-educational profiling |

### Worked Example: FERPA and the "School Official" Test

FERPA allows a school to share identifiable education records with a vendor without parental consent if the vendor qualifies as a school official under three conditions. Apply them to two vendors.

| Condition | Vendor A: adaptive math platform | Vendor B: free app that sells ads |
|---|---|---|
| Performs a service the school would otherwise do itself | Yes: it provides practice and tracking | Partly: it offers practice |
| Is under the school's direct control for the use and upkeep of the records | Yes: the contract limits use and requires deletion on request | No: its terms let it use data for advertising |
| Uses the records only for the authorized purpose and does not re-disclose them | Yes: the contract forbids both | No: its terms allow sharing with advertisers |
| Result | May receive records under the exception | May not; parental consent would be required, and the school should not use it |

FERPA also has a separate category, *directory information*, such as name, grade level, and photograph, which a school may release if it has given families notice and a chance to opt out. A common mistake is treating a photo or an email address as harmless: a school that lets a vendor use directory information still has to honor each family's opt-out. Parents also have a right to inspect their child's records, and the school must respond within 45 days.

### Worked Example: COPPA in a Classroom

COPPA applies when a service collects personal information from a child under 13. The FTC allows a school to consent on behalf of parents, with limits. Consider a tool a sixth grader, age 11, will use.

| Question | Answer for this tool | Why it matters |
|---|---|---|
| Is the child under 13? | Yes | COPPA applies |
| Is the data used only for the school's educational purpose? | Yes, if the contract says so | School consent is allowed only for this |
| Does the vendor use the data for advertising or build profiles for other purposes? | It must not | A commercial use requires parental consent, which a school cannot give |
| Is the data kept only as long as needed? | Retention schedule: yes | Data should not be kept indefinitely |
| Do parents have notice and a way to review and delete? | The school provides the notice | The school takes on responsibility for the vendor's practices |

If the tool wanted to show ads or build a marketing profile, the school's consent would not cover it, and the tool should not be used with this child. The same product used by a 14-year-old falls outside COPPA, though FERPA, state law, and the school's own policy still apply.

### Worked Example: GDPR for a School With a European Student

A U.S. international school enrolls a student who lives in the European Union, and GDPR may apply to that student's data. Two features of the law show how it differs from FERPA.

| Feature | What it requires | A school example |
|---|---|---|
| A lawful basis for every use | One of six bases: consent, contract, legal obligation, vital interests, public task, or legitimate interests | A school uses "public task" or "contract" for core records and asks consent only for optional extras such as a photo in a newsletter |
| Rights of the data subject | Access, correction, erasure, portability, and others | A parent asks for a copy of all data the school holds about their child, and the school must answer within one month |
| Breach notice | Tell the regulator within 72 hours of becoming aware of a breach, and tell individuals promptly when the risk is high | A vendor breach discovered on a Friday must be reported by Monday |
| Penalties | Up to 20 million euros or 4 percent of worldwide revenue | A reason that international vendors take the law seriously |

Even a school that is not subject to GDPR can use these features as a model of good practice, since they describe what a careful privacy regime looks like.

!!! mascot-warning "Legal is not the same as trusted"
    ![Indigo warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is treating "we comply with FERPA" as the end of the conversation. The laws set a floor, and several have exceptions that let a vendor hold data under a school's authority. Families judge you on what actually happens, so ask what the vendor does with the data, not only whether the form is signed. This is general information, not legal advice; check with your district's counsel.

## Data Governance and Its Parts

**Data governance** is the set of policies, roles, and processes by which an organization manages its data throughout its life: what is collected, who may use it, how it is protected, how long it is kept, and how problems are handled. A school with good data governance can answer, for any piece of student data, "who is responsible for this, and why do we have it?" It usually includes a named accountable person or committee, a list of every tool and the data it holds, vendor review, staff training, and a plan for when something goes wrong.

Five practices form the core of governance for a Level 3 textbook.

**Data minimization** is the practice of collecting only the data needed for a stated purpose and no more. It is a GDPR principle and an ethical one, and it is the cheapest protection there is: data that was never collected cannot be leaked. Before adding a field, a school asks what decision the field will inform.

**Informed consent** is a family's agreement to data collection that is given with real understanding: knowing what is collected, why, who sees it, how long it is kept, what the risks are, and what the alternatives are, including the ability to decline. A signature on a long form that no one reads is not informed consent. Good consent is specific, in plain language, and revocable.

A **data retention policy** is a written rule for how long each kind of data is kept and when it is deleted. A learning record that helps a teacher this semester has little value in ten years, and every extra year of storage is a year of breach risk. A typical policy keeps detailed records while the student is enrolled and deletes or de-identifies them a short time after the student leaves, except where the law requires longer.

**Data ownership** is the question of who has the rights to student data, meaning who controls it, who may use it, and who profits from it. The usual sound position, reflected in the student-controlled data of Chapter 8, is that the data belongs to the student and family and the school, and that a vendor is a custodian that may use it only to provide the service. Contracts should say so explicitly, and should bar the vendor from selling the data or using it to train commercial products.

**Governance readiness** is the degree to which a school has these practices in place and is therefore prepared to adopt a Level 3 or higher textbook safely. The last section of this chapter turns it into a checklist.

### Worked Example: A Retention Schedule

Lincoln Middle's draft retention schedule for the Level 3 pilot looks like this. The periods are illustrative; real ones depend on law and district policy.

| Data | Why it is kept | Kept until |
|---|---|---|
| Answer-level records (each answer, in order) | Choosing the next concept | End of the school year |
| Concept mastery summary | Planning and reporting progress | One year after the student leaves the school |
| Behavioral data (clicks, hints, timing) | Improving the textbook | Aggregated at the end of each term, then raw data deleted |
| Consent forms | Proof of consent | Seven years |
| Breach and incident logs | Accountability | Seven years |

The schedule shows data minimization at work: the most detailed data, the answer-level record, is kept the shortest time, and the most personal, behavioral data, is reduced to summaries quickly.

## Algorithmic Bias, Auditing, and Transparency

A system that adapts to students also makes judgments about them: who is ahead, who is at risk, who should get which task. **Algorithmic bias** is a systematic and unfair difference in a system's results for different groups of people, arising from the data the system learned from, the way it was designed, or the way it is used. A system can be biased without anyone intending it. If an at-risk prediction model learns from past data in which students from some schools were less often given advanced courses, it may repeat that pattern as if it were a fact about the students.

Real cases exist in education. In 2020, the United Kingdom replaced cancelled exams with an algorithm that adjusted teacher-assigned grades using schools' past results, and it lowered grades most often for students at schools that historically scored lower, so the government withdrew it after protests. A 2023 investigation by The Markup reported that Wisconsin's early-warning system for dropout risk produced more false alarms for Black and Hispanic students than for white students. And a 2023 Stanford study found that several AI-writing detectors falsely flagged the work of non-native English writers far more often than that of native writers, a point the book returns to in Chapter 21.

**Algorithmic bias auditing** is the systematic testing of a system's outputs across groups of people to find unfair differences. An audit compares measures such as how often each group is recommended for an opportunity, how often each group is wrongly flagged, and how accurate the system is for each group. One common screening test comes from employment law, where the "four-fifths rule" treats a group's selection rate as a warning sign when it is less than 80 percent of the rate of the most-selected group. A result below that line does not prove unfairness; it tells the auditors where to look.

**Algorithmic transparency** is the ability of the people affected by a system, and those responsible for it, to know what it does, what data it uses, and why it made a particular decision. A transparent system documents its rules, explains its recommendations in plain language, and lets families ask how a decision about their child was made. The simple mastery rule of Chapter 8, "four of the last five answers correct," is transparent: a parent can check it. A complex model that no one can explain is much harder to audit or contest, which is one more reason the book's design favors transparent, rule-based adaptation at Level 3.

### Worked Example: Two Levels of Explanation

Algorithmic transparency has levels, and a family needs a different one from an auditor. Take a single decision: the Level 3 textbook recommends that Maya study equivalent fractions next.

| Audience | Explanation | What it lets them do |
|---|---|---|
| Maya and her family | "You haven't yet answered at least four of your last five equivalent-fractions questions correctly, and you need it before ratios." | Understand, question, and contest the choice |
| The teacher | The mastery rule, the five recent answers, and the prerequisite map for ratios | Check whether the rule worked as intended |
| An auditor | The code of the rule, the thresholds, and the recommendation counts by subgroup | Test for bias and errors |

Notice that the whole explanation fits in a sentence because the rule is simple and stored in the open. A recommendation from a model that cannot state its reasons gives the family only "the system chose it," and an auditor only a statistical pattern. That difference is a practical reason to prefer transparent, rule-based adaptation wherever it is good enough.

### Worked Example: A Four-Fifths Audit

A district's adaptive system recommends students for an advanced math pathway. An audit counts how many students in each of three groups were eligible and how many were recommended. The numbers are illustrative.

| Group | Eligible | Recommended | Selection rate | Ratio to highest rate |
|---|---|---|---|---|
| A | 500 | 200 | 40.0% | 1.00 |
| B | 300 | 72 | 24.0% | \( 24.0/40.0 = 0.60 \) |
| C | 200 | 70 | 35.0% | \( 35.0/40.0 \approx 0.88 \) |

Group A has the highest rate, 40 percent. Group C's ratio of 0.88 is above the 0.80 line, so it passes the screen. Group B's ratio of 0.60 is well below it, so the audit flags the system. The next step is investigation: Is the difference explained by something legitimate, such as prior course taking, or is the system relying on a feature that stands in for group membership? A flagged result starts a conversation and does not end one.

#### Diagram: Four-Fifths Bias Audit Calculator

<details markdown="1">
<summary>Four-Fifths Bias Audit Calculator</summary>
Type: microsim
**sim-id:** four-fifths-bias-audit-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate selection rates and four-fifths ratios for three student groups and identify which groups the audit flags, correctly answering three of three questions.

**Template:** https://github.com/dmccreary/ai-strategy-for-education/tree/main/docs/sims/algorithmic-bias-sources<br/>

**Prerequisites:** algorithmic bias, algorithmic bias auditing, selection rate, the four-fifths rule (all defined in the section "Algorithmic Bias, Auditing, and Transparency" above).

**Evidence of Mastery:** Before the controls unlock, the learner commits three answers: (Q1) the selection rate for group B; (Q2) group B's ratio to the highest rate; (Q3) which groups the audit flags. An answer is correct when it equals the value in Content, within the stated tolerance. Mastery is 3 of 3 correct. Using the controls afterward is exploration.

**Misconceptions:** (1) A flagged result proves the system is unfair. (2) A group with the largest count must have the highest rate. (3) A ratio is a difference in percentage points.

**Instructional Rationale:** Calculating the rates and ratios from counts makes the audit's logic concrete, and asking which groups are flagged ties the arithmetic to the decision rule. The explanation after the answer stresses that a flag begins an investigation.

**Content:**

Rule shown: selection rate = recommended ÷ eligible. The highest group's rate is the reference. Ratio = a group's selection rate ÷ the reference rate. A group is flagged when its ratio < 0.80.

Data:

| Group | Eligible | Recommended |
|---|---|---|
| A | 500 | 200 |
| B | 300 | 72 |
| C | 200 | 70 |

Controls for exploration:

| Input | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Recommended, group A | 0 | 500 | 10 | 200 | students |
| Recommended, group B | 0 | 300 | 6 | 72 | students |
| Recommended, group C | 0 | 200 | 10 | 70 | students |

Answers: Q1 = 24.0% (±0.1 percentage point); Q2 = 0.60 (±0.01); Q3 = group B only.

Check values: group A rate 40.0%, ratio 1.00; group C rate 35.0%, ratio 0.875 (shown as 0.88).

**Provenance:** The counts are illustrative, written for this chapter, and the sim must label them "Illustrative audit data." The four-fifths threshold is a screening convention from U.S. employment-selection guidance, applied here as an illustration.

**Rules:** Rate = recommended ÷ eligible. Reference = the highest rate. Ratio = rate ÷ reference, shown to two decimals. A group is flagged when ratio < 0.80. When recommended is changed, rates, ratios, and flags update at once. If every recommended count is zero, no ratio is shown and the sim says "No recommendations to audit."

**Learner Activity:**

1. The learner answers Q1, Q2, and Q3 and submits them.
2. The sim checks the answers and shows the table with rates, ratios, and flags.
3. The learner changes the recommended counts. The rates, ratios, and flags update at once.
4. The learner should notice that group B can be moved above the line by raising its recommended count to at least 96, and that the flag is a prompt to investigate, not a verdict.

**Feedback:** Three questions, fixed order, two attempts each. Q1 correct: "Correct: 72 ÷ 300 is 24.0%." Q1 incorrect: "Divide the number recommended by the number eligible." Q2 correct: "Correct: 24.0 ÷ 40.0 is 0.60." Q2 incorrect: "Divide group B's rate by the highest rate, group A's." Q3 correct: "Correct: only group B is below 0.80." Q3 incorrect: "Flag any group whose ratio is below 0.80." After the second wrong attempt the answer and working are shown. A score "n of 3" is shown.

**Starting State:** The counts are shown for three groups with no rates, and the prompt reads "Is the system recommending students from every group at similar rates?"

**Chapter Anchors:** The chapter's worked example uses groups A, B, and C with eligible counts of 500, 300, and 200 and recommended counts of 200, 72, and 70, rates of 40.0, 24.0, and 35.0 percent, ratios of 1.00, 0.60, and about 0.88, and a threshold of 0.80.
</details>

## Learning from Failure: inBloom and PowerSchool

Two real cases, both in the book's AI-First Stories appendix, show what the principles above protect against.

**inBloom** was a nonprofit launched in 2013 with about \$100 million in funding, mainly from the Gates Foundation, to store student data from several states in one shared cloud service and let educational software use it. Its goals were reasonable, and its design collected an enormous number of data fields in one place. Parents, in New York and elsewhere, objected that they had not been told, could not control what was held, and did not trust a centralized repository. State after state withdrew, and inBloom closed in 2014. The lesson is that technical soundness is not enough: a data project fails without the trust of families, and that trust depends on clear rules about who owns and controls the data.

The **PowerSchool data breach** came in December 2024. PowerSchool, one of the largest vendors of student information systems, disclosed that attackers had gained access to records for tens of millions of students and teachers. Reporting at the time indicated that the attackers used stolen credentials to reach a support system, and that the account lacked multi-factor authentication, though the details should be checked against the latest reports. The lesson is that records held by one large vendor become a single, valuable target.

A **data breach** is an incident in which unauthorized people gain access to protected data. **Centralized student records** are student records held in one large store, whether by a vendor or a district, rather than spread across many separate ones. Centralization has benefits, since one store is easier to secure well and to share across tools, and a serious cost: a successful attacker gets everything at once. This is the case for keeping the sensitive store small, minimizing what it holds, and deleting data on schedule.

**Vendor risk** is the risk that a school's data is harmed through a company it relies on. Most school data lives with vendors, so a school's security is only as good as its vendors', and a school cannot fully outsource accountability. Managing vendor risk means checking a vendor's security practices before signing, requiring breach notification in the contract within a short, stated time, limiting what data the vendor receives, and planning for the vendor's failure or sale.

**Cybersecurity in schools** is the set of measures that protect school computers, networks, and data from attack. Schools are frequent targets of ransomware, a kind of attack that locks a school's systems until a payment is made. A 2022 report from the U.S. Government Accountability Office found that ransomware attacks on school districts caused weeks of lost learning time and months of recovery. Core measures are well known: multi-factor authentication for every account that can reach student data, prompt software updates, regular backups kept offline, giving each person only the access they need, and training staff to recognize phishing.

### Worked Example: The First 72 Hours of a Breach

A school's response in the first days decides how much harm follows. This is an illustrative plan; actual deadlines depend on state law and contracts, and counsel should be called early.

| When | Action | Why |
|---|---|---|
| Hour 0 to 4 | Contain: disconnect the affected system, reset credentials, switch on multi-factor authentication | Stops further access |
| Hour 4 to 24 | Assess: what data, how many students, how did it happen; preserve logs | You cannot notify accurately without scope |
| Hour 24 to 72 | Notify: counsel, the vendor, the insurer, law enforcement, and any regulator with a short deadline; decide what to tell families | Several rules, such as GDPR, require notice within 72 hours |
| Day 3 to 30 | Tell families clearly what happened, what data, and what to do; offer help such as credit freezes for older students | Communicating before rumors (Chapter 19) |
| Afterward | Fix the cause; update the plan; report to the board | Learning from the incident |

A plan that exists on paper before the breach, with named people and phone numbers, turns an emergency into a procedure. A district that first reads its breach clause the day after an incident has already lost days.

### Worked Example: What Each Failure Teaches

| Case | What went wrong | Which practice would have helped |
|---|---|---|
| inBloom (2014) | Parents did not trust a large central store; rules on ownership and use were unclear | Informed consent, data minimization, clear data ownership, a transparent explanation of what was kept |
| PowerSchool (2024) | One vendor held records for tens of millions; credentials were reportedly stolen | Multi-factor authentication, vendor risk checks, data minimization, a retention schedule that deletes old data |
| Any district | A vendor is breached and the school learns last | Contract clause requiring prompt breach notice, a breach response plan |

!!! mascot-tip "Ask 'what would an attacker get?'"
    ![Indigo giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    For any system that holds student data, imagine it is breached tonight and ask what an attacker would walk away with. If the answer is a year of answer-level records tied to names, shrink it: remove names, shorten retention, or collect less. The data you never stored is the data you can't lose.

## Children, AI, and Trust

Chatbots and adaptive systems that talk with children raise questions beyond data. **Responsible AI with minors** is the practice of designing, deploying, and supervising AI systems used by children so that they are safe, appropriate, and respectful of children's development and rights. UNESCO's 2023 guidance recommended a minimum age of 13 for classroom use of generative AI, and COPPA already restricts data collection from children under 13. The particular risks include exposure to inappropriate content, inaccurate answers delivered confidently (Chapter 5), data collected from children who cannot meaningfully consent, and chatbots that encourage emotional dependence.

**Age-appropriate AI design** is the design of AI tools to fit the age and development of their users. Practices include high privacy by default, collecting as little as possible, avoiding features that pressure children to keep using the tool, clear language, filters tuned to the age group, and teacher visibility. The United Kingdom's Age Appropriate Design Code, in force since 2021, is a widely cited model. Chapter 12 returns to guardrails for AI tutors.

The **trust paradox** is the tension at the center of personalization: the system needs more data to serve a student well, and families will give more data only if they trust the system, and trust requires that the system holds back. A school that collects too much loses trust, and a school that collects too little cannot adapt. **Family trust** is the confidence that parents and guardians have that a school will act in their children's interest, and it is built by consistent behavior over time rather than by statements. The way out of the paradox is the set of practices in this chapter: collect the minimum, say what you hold, let families see and take their data, delete on schedule, and report problems quickly and honestly.

### Worked Example: Features by Age

Responsible AI with minors means that one rule does not fit every age. A school might set the following defaults. They are recommended practice, and COPPA and the school's own counsel set the legal floor.

| Age | Law and guidance | Chat with an AI tutor | Data and visibility |
|---|---|---|---|
| Under 13 | COPPA: school consent for educational use only; UNESCO suggests no classroom generative AI under 13 | Not open chat; supervised, structured prompts with a teacher present | Minimum data; no profiling; the teacher sees the logs |
| 13 to 15 | UNESCO's suggested minimum age; many EU countries set the age of digital consent between 13 and 16 | A guided hint-first tutor; open topic chat only with limits | Teacher-visible logs; family notice |
| 16 to 17 | Greater autonomy; GDPR's default consent age is 16 | A guided tutor with more freedom; open chat for approved projects | Student sees their own data; a family-visible summary |

All three tiers share the rules of Chapter 12: hints first, no pressure to keep using the tool, clear language, and a way to reach a person. The point of the table is not the exact ages but the habit of asking, for every feature, "is this suited to the youngest student who will use it?"

!!! mascot-encourage "Governance feels heavy at first"
    ![Indigo encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If this much policy sounds overwhelming for a school with no privacy officer, start small. You managed a retention table and a bias audit in this chapter with nothing but arithmetic. Pick three practices, name one accountable person, and add one more each term.

## Governance Readiness

Putting the chapter together, **governance readiness** can be checked against a short list. The list below separates six *must-have* practices, without which a school should not adopt a Level 3 textbook, from four *should-have* practices that make a school well placed for Level 4.

| | Practice | Why it matters |
|---|---|---|
| M1 | A named person or committee accountable for student data | Someone must own the questions |
| M2 | An inventory of what student data each tool collects | You cannot protect what you have not listed |
| M3 | A retention schedule with deletion | Old data is old risk |
| M4 | Vendor contracts that state the school and family own the data and bar use beyond the service | Prevents misuse and lock-in |
| M5 | A notice and consent process for families | Informed consent and trust |
| M6 | A written breach response plan, with vendor notification duties | Speed in the first days limits harm |
| S1 | A plan to audit adaptive choices for bias | Fairness across groups |
| S2 | A public explanation of how recommendations are made | Algorithmic transparency |
| S3 | Annual staff training | People are the largest source of risk |
| S4 | A data minimization review before each new tool | Keeps the store small |

The rule: a school is *not ready* for Level 3 if any must-have is missing. It is *ready for Level 3* if all six must-haves are present, and *ready for Level 3 and well placed for Level 4* if it also has at least three of the four should-haves.

### Worked Example: Judging Three Districts

| | M1 | M2 | M3 | M4 | M5 | M6 | S count | Verdict |
|---|---|---|---|---|---|---|---|---|
| Riverton | Yes | Yes | Yes | Yes | Yes | Yes | 0 of 4 | Ready for Level 3 |
| Oakdale | Yes | Yes | No | Yes | Yes | Yes | 4 of 4 | Not ready: no retention schedule |
| Hillcrest | Yes | Yes | Yes | Yes | Yes | Yes | 3 of 4 | Ready for Level 3 and well placed for Level 4 |

Oakdale shows the point of the rule. It has every should-have and would look impressive, and it still fails, because it keeps data with no end date. Strong extras do not make up for a missing foundation.

#### Diagram: Governance Readiness Judge

<details markdown="1">
<summary>Governance Readiness Judge</summary>
Type: microsim
**sim-id:** governance-readiness-judge<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge whether each of six districts is not ready, ready for Level 3, or ready for Level 3 and well placed for Level 4, by applying the must-have and should-have rule, correctly judging at least five of six on the first attempt.

**Prerequisites:** governance readiness, the six must-have and four should-have practices and the readiness rule (all defined in the section "Governance Readiness" above).

**Evidence of Mastery:** For each of 6 districts, the learner chooses one of three verdicts and submits it. A verdict is correct when it matches the "Correct verdict" column in Content. Mastery is 5 of 6 correct on the first attempt. Reading the rule is exploration, not evidence.

**Misconceptions:** (1) Many should-have practices can make up for a missing must-have. (2) A district with one strong feature is ready. (3) Readiness is a score out of ten.

**Instructional Rationale:** Applying a two-part rule to concrete profiles requires checking the must-haves first and counting the should-haves second. A profile with a missing must-have but all should-haves tests whether the learner applies the rule as written.

**Content:**

The rule: Not ready if any of M1 to M6 is missing. Otherwise, Ready for Level 3 if fewer than 3 of S1 to S4 are present. Otherwise, Ready for Level 3 and well placed for Level 4.

Practices: M1 accountable person or committee; M2 data inventory; M3 retention schedule with deletion; M4 vendor contracts on ownership and use; M5 notice and consent process; M6 breach response plan; S1 bias-audit plan; S2 public explanation of recommendations; S3 annual staff training; S4 minimization review before each new tool.

Six districts:

| # | District | Practices present | Correct verdict | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | Riverton | M1, M2, M3, M4, M5, M6 | Ready for Level 3 | All must-haves are present and there are no should-haves, which is fewer than 3. |
| 2 | Oakdale | M1, M2, M4, M5, M6, S1, S2, S3, S4 | Not ready | M3, a retention schedule, is missing, and should-haves cannot make up for it. |
| 3 | Hillcrest | M1, M2, M3, M4, M5, M6, S1, S2, S3 | Ready for Level 3 and well placed for Level 4 | All six must-haves and three should-haves are present. |
| 4 | Pinewood | M2, M3, M4, M5, M6, S1, S2, S3, S4 | Not ready | M1, an accountable person, is missing. |
| 5 | Lakeview | M1, M2, M3, M4, M5, M6, S1 | Ready for Level 3 | All must-haves are present and only one should-have, which is fewer than 3. |
| 6 | Cedar Heights | M2, M5, S3 | Not ready | Four must-haves are missing: M1, M3, M4, and M6. |

**Provenance:** The practices and the rule are this chapter's recommended practice, not a legal standard, and the sim must say so. The districts are fictional, written for this chapter.

**Rules:** Each district has exactly one correct verdict, determined by the rule. A district is scored on its first submitted verdict only. The score counts first-attempt correct verdicts out of 6. Mastery is a score >= 5.

**Learner Activity:**

1. The learner sees one district's list of practices and the three verdicts.
2. The learner chooses a verdict and submits it. The sim marks it correct or incorrect and shows the feedback text.
3. If incorrect, the learner may choose again; the second attempt does not change the score. After the second attempt, the correct verdict and reason are shown.
4. After all 6 districts, the sim shows the score.
5. The learner should notice that district 2 has the most practices and is still not ready.

**Feedback:** 6 districts, shuffled once per session, two attempts each. Correct: "Correct: [verdict]. [Why text]." Incorrect: "Not quite. First check whether every must-have is present. [Why text for the correct answer, without naming the verdict]." After the second attempt the correct verdict is revealed and the district counts as missed. A running score "First-try correct: n of 6" is shown. Final message for a score >= 5: "You can judge a district's readiness." For a score < 5: "Review the rule and try again; the districts will be reshuffled."

**Starting State:** District 1 of the shuffled order is shown with its practices and the score "First-try correct: 0 of 6," and the prompt reads "Is this district ready for a Level 3 textbook?"

**Chapter Anchors:** The chapter lists six must-have practices (M1 to M6) and four should-have practices (S1 to S4), and the rule: not ready if any must-have is missing; ready for Level 3 with all six; well placed for Level 4 with all six and at least three should-haves. The chapter's worked example has Riverton, Oakdale, and Hillcrest. The mastery bar is 5 of 6.
</details>

## Answering Mr. Chen

Mr. Chen asked why he should trust the system more than the company that was breached. Ms. Okafor's honest answer has four parts. The district will hold less: only what the lesson needs, deleted on a published schedule. It will hold it differently: with multi-factor authentication, vendor contracts that bar misuse, and a written breach plan. It will let families see, take, and delete their data. And it will tell families when something goes wrong, quickly, even when the news is bad. She did not promise it could never happen. She promised the district would be ready.

The story has both sides, like every story in this book. The benefit: a Level 3 textbook that finds Maya's missing prerequisite and saves her years of confusion. The risks: a permanent record of her mistakes, a breach, a biased recommendation, and a loss of family trust that would end the whole effort, as it did at inBloom. The response is governance: minimize, consent, retain briefly, own clearly, audit for bias, explain, and prepare. A school that cannot do these things should stay at Level 2, which is free, effective, and needs none of them.

## Key Takeaways

- **Student data** includes records and learning-tool activity; **personally identifiable data** can identify a student directly or, in combination or in a small group, indirectly; **student data privacy** covers both security and appropriate use.
- The **privacy inflection point** is Level 3, where a **detailed learning history** and **behavioral data** become necessary; the same record is both the benefit and the risk.
- **FERPA** (U.S. education records), **COPPA** (children under 13 online), and **GDPR** (EU residents) set a floor, and compliance is not the same as trust.
- **Data governance** rests on **data minimization**, **informed consent**, a **data retention policy**, and clear **data ownership**; **governance readiness** means having the must-have practices in place.
- **Algorithmic bias** can arise without intent; **algorithmic bias auditing** compares results across groups (the four-fifths rule flags ratios below 0.80), and **algorithmic transparency** lets families understand and contest decisions.
- **inBloom** failed for lack of family trust, and the **PowerSchool** **data breach** showed the danger of **centralized student records**; manage **vendor risk** and practice **cybersecurity in schools**, especially multi-factor authentication.
- **Responsible AI with minors** and **age-appropriate AI design** call for privacy by default and no pressure on children; the **trust paradox** is resolved by collecting little, saying what you hold, and building **family trust** by consistent action.
- A school that is not ready should stay at Level 2, which needs no student records.

!!! mascot-celebration "You can say whether a district is ready"
    ![Indigo celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You just learned what counts as student data, what FERPA, COPPA, and GDPR ask, how to govern and audit, and how to judge readiness with a rule you can apply in minutes. That closes Part 1 of the book's argument, the evidence and the foundations. Chapter 11 turns to the shorter academic morning itself. One step at a time, together.
