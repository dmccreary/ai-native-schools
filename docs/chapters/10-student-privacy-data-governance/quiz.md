# Quiz: Student Privacy and Data Governance

Test your understanding of student data, the main privacy laws, data governance, bias auditing, and governance readiness with these review questions.

---

#### 1. What does COPPA require, and what does the FTC allow schools to do under it?

<div class="upper-alpha" markdown>

1. It protects education records in federally funded schools, and lets schools share them with any vendor
2. It protects EU residents' data, and lets schools process it with no lawful basis
3. It protects children under 13 online, and lets schools consent for parents for educational use only
4. It protects students over 13 online, and lets schools consent for parents for any purpose
</div>

??? question "Show Answer"
    The correct answer is **C**. COPPA requires operators of services directed at children under 13, or that know they collect data from them, to give notice and get verifiable parental consent. The FTC allows schools to consent on behalf of parents for educational uses only, so a school that signs a vendor's terms takes on responsibility for what the vendor does. Commercial uses such as advertising need parental consent a school cannot give. The first option describes FERPA, and the second misstates GDPR.

    **Concept Tested:** COPPA

    **See:** [The Laws: FERPA, COPPA, and GDPR](index.md#the-laws-ferpa-coppa-and-gdpr)

---

#### 2. A vendor says its data set is anonymous because "we removed all student names." Why does the chapter say this is not enough?

<div class="upper-alpha" markdown>

1. Because names are the only identifiers that privacy laws actually regulate
2. Because birth date, ZIP code, and gender together can identify most students
3. Because any data set containing test scores counts as identifying under FERPA
4. Because removing names makes the data useless for adapting each student's lessons
</div>

??? question "Show Answer"
    The correct answer is **B**. Personally identifiable data includes direct identifiers, such as a name or student ID, and indirect identifiers that identify a student in combination. Latanya Sweeney's research found that birth date, ZIP code, and gender alone uniquely identify about 87 percent of Americans. Data about a small group can also identify an individual, such as the only student in a grade with a hearing impairment. Laws cover far more than names, so the first option is false.

    **Concept Tested:** Personally Identifiable Data

    **See:** [What Counts as Student Data](index.md#what-counts-as-student-data)

---

#### 3. An audit of an advanced-math recommendation system finds selection rates of 50 percent for Group A, 42 percent for Group B, and 36 percent for Group C. Using the four-fifths rule, which group's result should the auditors flag?

<div class="upper-alpha" markdown>

1. Groups B and C, since both rates are below Group A's
2. Only Group B, since its rate is 8 points below Group A's
3. No group, since every rate is above 30 percent
4. Only Group C, since its ratio to Group A's rate is about 0.72
</div>

??? question "Show Answer"
    The correct answer is **D**. The four-fifths rule compares each group's rate with the highest rate. Group B's ratio is 42 / 50 = 0.84, above the 0.80 line, so it passes the screen. Group C's ratio is 36 / 50 = 0.72, below the line, so it is flagged. Being lower than the top group is not enough to flag. The chapter stresses that a flag starts an investigation into whether a legitimate factor or a stand-in for group membership explains the gap.

    **Concept Tested:** Algorithmic Bias Auditing

    **See:** [Worked Example: A Four-Fifths Audit](index.md#worked-example-a-four-fifths-audit)

---

#### 4. A district has a named data officer, a full data inventory, a retention schedule, strong vendor contracts, and a consent process. It also has all four should-have practices, but it has no written breach response plan. Is it ready for a Level 3 textbook?

<div class="upper-alpha" markdown>

1. No, because a missing must-have practice means the district is not ready
2. Yes, because the four should-have practices make up for one missing must-have
3. Yes, and it is also well placed for Level 4, since it has all should-haves
4. No, because a district needs a privacy officer and a lawyer on staff full-time
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter's rule is that a school is not ready for Level 3 if any of the six must-have practices is missing, and a written breach response plan is must-have M6. Like Oakdale in the worked example, the district looks impressive but fails because strong extras do not make up for a missing foundation. A breach plan matters because speed in the first days limits harm. The chapter does not require a full-time lawyer.

    **Concept Tested:** Governance Readiness

    **See:** [Governance Readiness](index.md#governance-readiness)

---

#### 5. Under FERPA's "school official" exception, why can a free practice app whose terms allow advertising use not receive identifiable student records?

<div class="upper-alpha" markdown>

1. Because FERPA bans all sharing of records with companies outside the district
2. Because free apps are covered by GDPR and state law instead of FERPA
3. Because it is not under the school's direct control and may use records for other purposes
4. Because the app does not perform any service the school would otherwise do itself
</div>

??? question "Show Answer"
    The correct answer is **C**. A vendor can act as a school official only if it performs a service the school would otherwise do, is under the school's direct control for use and upkeep of the records, and uses them only for the authorized purpose without re-disclosure. An app whose terms allow advertising use fails the last two conditions, so parental consent would be required and the school should not use it. FERPA does allow sharing with qualifying vendors, so the first option is false, and the app partly provides practice.

    **Concept Tested:** FERPA

    **See:** [Worked Example: FERPA and the "School Official" Test](index.md#worked-example-ferpa-and-the-school-official-test)

---

#### 6. What is data minimization?

<div class="upper-alpha" markdown>

1. Compressing student records so they take less storage space
2. Collecting only the data needed for a stated purpose and no more
3. Deleting all student data at the end of each school day
4. Combining several small data stores into one central database
</div>

??? question "Show Answer"
    The correct answer is **B**. Data minimization means collecting only what a stated purpose needs. It is a GDPR principle and an ethical one, and the chapter calls it the cheapest protection there is: data that was never collected cannot be leaked. Before adding a field, a school asks what decision it will inform. Compression saves space but keeps the data. Combining stores into one is centralization, which the chapter shows makes a single, valuable target for attackers.

    **Concept Tested:** Data Minimization

    **See:** [Data Governance and Its Parts](index.md#data-governance-and-its-parts)

---

#### 7. Which pairing correctly states the main lesson the chapter draws from each real case?

<div class="upper-alpha" markdown>

1. inBloom: a data project fails without family trust; PowerSchool: one large store is a single target
2. inBloom: cloud storage is unsafe for schools; PowerSchool: districts should not use vendors
3. inBloom: projects need more funding; PowerSchool: student records should be kept on paper
4. inBloom: centralized records always get breached; PowerSchool: families did not trust the vendor
</div>

??? question "Show Answer"
    The correct answer is **A**. inBloom, launched in 2013 with about \$100 million, collected many data fields in one place; parents objected that they had not been told and could not control the data, and it closed in 2014. Its lesson is that technical soundness is not enough without family trust. The December 2024 PowerSchool breach showed that records held by one large vendor become a single, valuable target. The last option reverses the two lessons; inBloom closed from lack of trust, not a breach.

    **Concept Tested:** Centralized Student Records

    **See:** [Learning from Failure: inBloom and PowerSchool](index.md#learning-from-failure-inbloom-and-powerschool)

---

#### 8. An adaptive platform's behavioral data shows that a seventh grader often logs in at 2 a.m. A counselor proposes adding a "possible home problem" label to the student's record. What does the chapter recommend?

<div class="upper-alpha" markdown>

1. Add the label, since behavioral data reveals what the student would not say
2. Share the login times with the family and the vendor so both can investigate
3. Raise the student's hint limit so late-night sessions go more smoothly
4. Draw no conclusions, and consider whether login times should be collected at all
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter warns that behavioral signals invite over-interpretation: a 2 a.m. login might mean late studying, trouble sleeping, or a home situation. Data that supports a human conversation is a good use, while data used to assign a label without one is risky. Data that no decision needs, such as exact login times, should not be collected, which is data minimization. Sharing the times more widely adds exposure without a clear purpose.

    **Concept Tested:** Behavioral Data

    **See:** [Worked Example: What a Clickstream Can and Cannot Tell You](index.md#worked-example-what-a-clickstream-can-and-cannot-tell-you)

---

#### 9. Why does the chapter favor transparent, rule-based adaptation at Level 3 where it is good enough?

<div class="upper-alpha" markdown>

1. Because rule-based systems cannot be breached by outside attackers
2. Because complex models are prohibited for students under 13 by COPPA
3. Because families can understand and contest a simple rule, and auditors test it
4. Because rule-based systems always recommend the same lesson to every student
</div>

??? question "Show Answer"
    The correct answer is **C**. Algorithmic transparency lets affected people know what a system does, what data it uses, and why it decided something. A rule like "four of the last five answers correct" can be explained to a family in one sentence, checked by a teacher, and tested for bias by an auditor. A model that cannot state its reasons gives the family only "the system chose it." Rule-based systems can still be breached, and they recommend different lessons from each student's record.

    **Concept Tested:** Algorithmic Transparency

    **See:** [Worked Example: Two Levels of Explanation](index.md#worked-example-two-levels-of-explanation)

---

#### 10. At a parent night, a father asks why he should trust a Level 3 textbook after a major vendor breach. Which response best fits the chapter's way out of the trust paradox?

<div class="upper-alpha" markdown>

1. "We comply with FERPA and COPPA, so your child's data is already fully protected."
2. "We'll keep only what lessons need, delete it on schedule, let you see it, and report problems fast."
3. "We promise a breach can never happen here, because our vendor is larger and more secure."
4. "We'll collect as much as possible so the textbook can adapt as precisely as it can."
</div>

??? question "Show Answer"
    The correct answer is **B**. The trust paradox is that a system needs data to adapt, but families give it only if they trust the system to hold back. The chapter's way out is to collect the minimum, say what you hold, let families see and take their data, delete on schedule, and report problems quickly and honestly. Citing compliance treats the legal floor as trust, which the chapter warns against. Promising a breach can never happen is not honest, and collecting everything widens the risk.

    **Concept Tested:** Trust Paradox

    **See:** [Children, AI, and Trust](index.md#children-ai-and-trust)
