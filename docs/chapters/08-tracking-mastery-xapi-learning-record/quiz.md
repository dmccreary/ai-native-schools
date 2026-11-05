# Quiz: Tracking Mastery: xAPI, Learning Record Stores, and MicroSims

Test your understanding of xAPI statements, Learning Record Stores, mastery data, and student-controlled data with these review questions.

---

#### 1. In an xAPI statement built on the Actor Verb Object pattern, what does the object identify?

<div class="upper-alpha" markdown>

1. The student who performed the action, written as a code
2. The activity the action was done to, such as a quiz question or simulation
3. The outcome of the action, such as a score or whether it was correct
4. The course and page the activity belongs to, along with the time
</div>

??? question "Show Answer"
    The correct answer is **B**. An xAPI statement reads as a three-part sentence: the actor is who did something, the verb is what they did, and the object is what they did it to, such as a particular quiz question or simulation. The first option describes the actor. The outcome belongs in the optional result, and the course or page belongs in the optional context. Each statement also carries a timestamp.

    **Concept Tested:** Actor Verb Object

    **See:** [xAPI: A Standard Way to Say What Happened](index.md#xapi-a-standard-way-to-say-what-happened)

---

#### 2. What does a Learning Record Store do?

<div class="upper-alpha" markdown>

1. It decides which lesson each student should study next
2. It enrolls students in courses and keeps the official gradebook
3. It runs the simulations and quizzes inside the student's browser
4. It receives xAPI statements, stores them, and returns them on request
</div>

??? question "Show Answer"
    The correct answer is **D**. A Learning Record Store is the memory of the arrangement, the place where statements from all sims, quizzes, and activities end up. The chapter stresses that an LRS does not decide anything about instruction; choosing the next lesson is done by a mastery rule and a learning graph. Enrolling students and keeping the gradebook are jobs of a learning management system, and MicroSims run in the web browser.

    **Concept Tested:** Learning Record Store

    **See:** [The Learning Record Store](index.md#the-learning-record-store)

---

#### 3. Why does a static website carry almost no privacy burden for a Level 2 textbook?

<div class="upper-alpha" markdown>

1. It has no server program and no database, so the page itself holds no student data
2. It encrypts every student's answers before sending them to the publisher
3. It requires students to log in with district accounts before reading
4. It deletes each student's records automatically at the end of the year
</div>

??? question "Show Answer"
    The correct answer is **A**. A static website is made of fixed files that a server hands over exactly as stored, without running a program to build each page. With no server program and no database, there is little for an attacker to break into and no student data to leak from the page itself. The chapter calls this the technical reason Level 2 textbooks carry almost no privacy burden. Logins, stored records, and deletion schedules belong to Level 3 designs that keep student data.

    **Concept Tested:** Static Website

    **See:** [The Pieces: Web Pages, Browsers, and MicroSims](index.md#the-pieces-web-pages-browsers-and-microsims)

---

#### 4. A textbook uses the rule "mastered means at least four of the last five answers correct." A student's last five answers, oldest first, are: Concept X: right, wrong, right, right, right. Concept Y: right, right, right, wrong, wrong. Concept Z: wrong, right, right, right, right. Which concepts count as mastered?

<div class="upper-alpha" markdown>

1. X, Y, and Z, since each has at least three correct answers
2. Only Z, since its most recent answers are all correct
3. X and Z only, since each has four of five correct
4. Only X, since its first answer was correct
</div>

??? question "Show Answer"
    The correct answer is **C**. Concept X has four of five correct and Concept Z has four of five correct, so both meet the rule. Concept Y has only three of five, so it is not mastered. The rule counts correct answers among the last five, not their order, so the second and fourth options apply criteria the rule never states. The chapter notes the rule is simple and imperfect, but it is stated in advance and applied the same way to every student, which makes it checkable.

    **Concept Tested:** Mastery Data

    **See:** [Worked Example: A Mastery Rule](index.md#worked-example-a-mastery-rule)

---

#### 5. In a learning graph, concept 4 depends on 3; concept 5 depends on 1 and 2; concept 7 depends on 5 and 6; concept 8 depends on 7. A student has mastered 1, 2, 3, and 6 but not 4, 5, 7, or 8. Which concepts are ready to study next?

<div class="upper-alpha" markdown>

1. Only concept 7, since it is the next unit in the course
2. Concepts 4 and 5, since each is unmastered with all prerequisites mastered
3. Concepts 4, 5, 7, and 8, since none of them has been mastered yet
4. Only concept 8, since it is the most advanced unmastered concept
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter's rule is that a concept is ready when the student has not mastered it but has mastered all of its prerequisites. Concept 4 needs 3 (mastered) and concept 5 needs 1 and 2 (mastered), so both are ready. Concept 7 needs 5, which is not mastered, and concept 8 needs 7, so neither is ready. Listing every unmastered concept ignores the prerequisites. This lookup uses a record, a rule, and a map, with no live AI model.

    **Concept Tested:** Learning Dependency

    **See:** [Learning Dependencies and the Learning Graph](index.md#learning-dependencies-and-the-learning-graph)

---

#### 6. Why does an LMS-centric design miss much of what a student does in an interactive textbook?

<div class="upper-alpha" markdown>

1. Because an LMS records only what it was built for, so outside sims leave no trace
2. Because an LMS deletes activity data at the end of each grading period
3. Because an LMS cannot store grades for more than one course at the same time
4. Because an LMS stores activity records only for students older than thirteen
</div>

??? question "Show Answer"
    The correct answer is **A**. A learning management system traditionally records grades and submissions, and it is not designed to take in activity from a simulation or an app outside it. In an LMS-centric design, every activity must report through the LMS. In an LRS-centric design, any activity sends xAPI statements directly to the record store, and the LMS becomes one more source and consumer. The chapter's comparison shows the gradebook keeps "67 percent" while the LRS keeps each attempt and where the student got stuck.

    **Concept Tested:** Learning Management System

    **See:** [The Learning Record Store](index.md#the-learning-record-store)

---

#### 7. A teacher's class mastery heatmap shows one dark column for "Ratios" across most students and one dark row for a single student across many concepts. What responses does the chapter's reasoning support?

<div class="upper-alpha" markdown>

1. Reteach ratios to the whole class, and give the one student individual support
2. Give individual support to every student, since the class average is low
3. Reteach every concept to the whole class, since both patterns show weak teaching
4. Move the one student to a lower grade, and skip ratios for the rest of the class
</div>

??? question "Show Answer"
    The correct answer is **A**. In the heatmap, a dark column means a concept-wide weakness: most students stumbled there, so a whole-class reteach or a better explanation is the response. A dark row means one student is struggling across many concepts, so the response is individual support. The chapter's tip is to look for dark columns and rows before averages, because an average blends the two and hides both. Treating both patterns the same way misreads the data.

    **Concept Tested:** Learning Analytics

    **See:** [Learning Analytics](index.md#learning-analytics)

---

#### 8. A vendor is designing the data practices for a district's adaptive textbook. Which practice is consistent with the chapter's principles of student-controlled data?

<div class="upper-alpha" markdown>

1. Recording every mouse movement in case the data becomes useful later
2. Keeping each student's record permanently so it can follow them to college
3. Collecting only what instruction needs and letting families export the record
4. Sharing identifiable records with any partner that offers free tools to the school
</div>

??? question "Show Answer"
    The correct answer is **C**. Student-controlled data has five parts: collect the minimum necessary, let the student and family see the record, let them take it in a standard format, limit who sees identifiable records, and remove it when no longer needed. Recording mouse movements "in case" violates minimum necessary and adds noise. A permanent record ignores removal. Outside parties should see identifiable records only under a written agreement for a stated purpose, never for advertising.

    **Concept Tested:** Student-Controlled Data

    **See:** [Data Portability and Student-Controlled Data](index.md#data-portability-and-student-controlled-data)

---

#### 9. What is data portability?

<div class="upper-alpha" markdown>

1. The ability to view a learning record on a phone as well as a laptop
2. The ability of a vendor to sell its student records to another company
3. The ability of a static website to run without an internet connection
4. The ability to move one's data between systems in a standard format
</div>

??? question "Show Answer"
    The correct answer is **D**. Data portability means a mastery record built in one school, textbook, or product can follow the student to the next in a standard format. Without it, every change of school or vendor starts the child back at "unknown," and the records are held hostage by whoever stores them. The EU's GDPR gives individuals a legal right to portability, and xAPI makes it practical because every compliant system reads the same statements. Viewing on different devices is a different idea.

    **Concept Tested:** Data Portability

    **See:** [Data Portability and Student-Controlled Data](index.md#data-portability-and-student-controlled-data)

---

#### 10. A board member objects that a Level 3 adaptive textbook will be costly because "every student's request has to go to a large language model." How does the chapter's design loop answer this objection?

<div class="upper-alpha" markdown>

1. It agrees, and recommends limiting adaptive textbooks to small pilot classes only
2. At use time, adaptation is a lookup using the record, a rule, and the graph
3. It shows that the LMS performs the adaptation, so no extra system is needed
4. It shows that the MicroSims send each answer to an AI model running in the browser
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter's loop uses a static site, browser-run MicroSims, xAPI statements, a record store, a mastery rule, and a learning graph. No step requires a live large language model. AI may have helped write the content once, but when a student uses the textbook the work is lookups, rules, and a record. That keeps the Level 3 cost per student modest and limits the privacy risk to one bounded record store. The LMS does not perform adaptation in this design.

    **Concept Tested:** xAPI

    **See:** [Putting It Together: Adapting Without a Live AI Model](index.md#putting-it-together-adapting-without-a-live-ai-model)
