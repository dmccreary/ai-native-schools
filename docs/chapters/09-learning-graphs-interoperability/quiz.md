# Quiz: Learning Graphs, Interoperability Standards, and Access at Scale

Test your understanding of learning graphs, interoperability standards, and what it takes to deliver interactive content to every school with these review questions.

---

#### 1. What is a foundational concept in a learning graph?

<div class="upper-alpha" markdown>

1. A concept with no prerequisites, where learning can begin
2. A concept that nothing else depends on, which ends a chain
3. The concept with the most dependencies pointing to it
4. The first concept taught in the first chapter of a course
</div>

??? question "Show Answer"
    The correct answer is **A**. A foundational concept has no prerequisites in the graph; it is a root from which everything else grows. This book's graph has 14, including Education, Student, Learning, and Artificial Intelligence. A concept that nothing else depends on is a terminal concept, the opposite. Being first in a course outline or having many dependents does not by itself make a concept foundational.

    **Concept Tested:** Foundational Concept

    **See:** [Learning Graphs: Maps of Concepts](index.md#learning-graphs-maps-of-concepts)

---

#### 2. Why must a learning graph be a directed acyclic graph?

<div class="upper-alpha" markdown>

1. Because only acyclic graphs can be drawn in a browser-based viewer
2. Because standards bodies require all educational data to use this format
3. Because a cycle would make every concept in it a foundational concept
4. Because if A required B and B required A, no student could learn either
</div>

??? question "Show Answer"
    The correct answer is **D**. A cycle means each concept would have to be learned before the other, which is impossible. Checking for cycles is one of the first quality tests, and this book's graph passes it. The DAG property also guarantees the concepts can always be put in an order where each comes after its prerequisites, which is the basis of a learning path. Concepts in a cycle would all have prerequisites, so none would be foundational.

    **Concept Tested:** Directed Acyclic Graph

    **See:** [Learning Graphs: Maps of Concepts](index.md#learning-graphs-maps-of-concepts)

---

#### 3. Which organization's learning standards include xAPI and Learning Object Metadata?

<div class="upper-alpha" markdown>

1. The IMS Global Learning Consortium, now 1EdTech
2. The Institute of Electrical and Electronics Engineers (IEEE)
3. The Society for Learning Analytics Research
4. The U.S. Department of Education's What Works Clearinghouse
</div>

??? question "Show Answer"
    The correct answer is **B**. The IEEE's Learning Technology Standards Committee maintains learning technology standards, including xAPI (now an IEEE standard, originating with the Advanced Distributed Learning initiative) and Learning Object Metadata, which describes a resource's title, subject, level, and rights. IMS Global, renamed 1EdTech in 2022, produces LTI, OneRoster, QTI, Common Cartridge, and Caliper Analytics. Caliper serves a similar purpose to xAPI, which makes the first option tempting.

    **Concept Tested:** IEEE Learning Standards

    **See:** [Interoperability Standards](index.md#interoperability-standards)

---

#### 4. At a rural elementary school, students need a separate login for each of four learning tools, and the free textbook cannot be opened from the district LMS. Which standard addresses both problems?

<div class="upper-alpha" markdown>

1. OneRoster
2. QTI
3. LTI
4. Caliper Analytics
</div>

??? question "Show Answer"
    The correct answer is **C**. Learning Tools Interoperability (LTI) lets an outside tool plug into a learning management system with single sign-on and the ability to return grades, so the tools and the textbook open from inside the LMS with one login. OneRoster exchanges rosters and grades with the student information system, which solves re-typing class lists, not logins. QTI moves quiz questions between systems, and Caliper reports learning events for analytics.

    **Concept Tested:** IMS Global Standards

    **See:** [Worked Example: Fairview's Tool Tangle](index.md#worked-example-fairviews-tool-tangle)

---

#### 5. A district can produce an interactive textbook once for \$30,000, or pay about \$6 per student per year for live AI generation of each student's lessons. Above roughly how many students does generate-once become cheaper for a single year?

<div class="upper-alpha" markdown>

1. About 5,000 students
2. About 500 students
3. About 50,000 students
4. About 180,000 students
</div>

??? question "Show Answer"
    The correct answer is **A**. The two costs are equal when \$30,000 equals \$6 times the number of students, which is 5,000. Above that, the fixed cost of generate-once spreads across more students while live generation keeps growing with every student. The chapter's own example crosses at about 3,100 students and notes that generate-once content can also serve students for several years, while live generation can personalize far more than a fixed book.

    **Concept Tested:** Generate Once Serve Many

    **See:** [Worked Example: Once Versus Every Time](index.md#worked-example-once-versus-every-time)

---

#### 6. According to the chapter, how does a textbook's level affect whether it works without an internet connection?

<div class="upper-alpha" markdown>

1. Every level works offline once the student has logged in at least once
2. Only Levels 4 and 5 work offline, since the AI model is stored on the device
3. Levels 1 and 2 work offline, Level 3 can buffer, and Levels 4 and 5 need a connection
4. No level works offline, since all digital textbooks are served from a remote host
</div>

??? question "Show Answer"
    The correct answer is **C**. A static website is ordinary files, so it can be saved to a laptop or USB drive or cached by the browser. Levels 1 and 2 therefore work offline, Level 3 can buffer its records and send them later, and live AI chat at Levels 4 and 5 needs a connection to a remote model. The chapter concludes that the choice of level is a connectivity decision. The second option reverses the relationship.

    **Concept Tested:** Offline Access

    **See:** [Reaching Fairview: Devices, Connectivity, and Offline Access](index.md#reaching-fairview-devices-connectivity-and-offline-access)

---

#### 7. A school shares a 2 megabit-per-second connection. Twenty students open a 2-megabyte lesson page at the same moment. About how long will it take for all of them to load it?

<div class="upper-alpha" markdown>

1. About 20 seconds
2. About 1 second
3. About 8 seconds
4. About 160 seconds
</div>

??? question "Show Answer"
    The correct answer is **D**. Two megabits per second is 2 / 8 = 0.25 megabytes per second. Twenty students times 2 MB is 40 MB, and 40 / 0.25 = 160 seconds, close to three minutes. Eight seconds is the time for one student alone. Twenty seconds forgets to convert bits to bytes. The chapter shows that a page cached on the school network the night before loads in under a second, so the design, not just the connection, decides the experience.

    **Concept Tested:** Internet Connectivity

    **See:** [Worked Example: A Slow Connection and an Offline Copy](index.md#worked-example-a-slow-connection-and-an-offline-copy)

---

#### 8. Which feature does the chapter identify as a mark of a well-designed student progress dashboard?

<div class="upper-alpha" markdown>

1. A ranking that shows each student's place in the class
2. A next step the student can take, shown alongside their own progress
3. A complete list of every click the student made that week
4. A points total that rewards students for time spent on screen
</div>

??? question "Show Answer"
    The correct answer is **B**. A well-designed dashboard shows a student their own progress, not their place in a ranking, and always shows a next step. Maya's example lists what she has mastered, what is ready next, and a note from her teacher, with no comparison to classmates, no points, and no grade. The chapter warns that rankings can discourage students who are behind and that a long list of clicks drowns the reader in noise.

    **Concept Tested:** Student Progress Dashboard

    **See:** [Student Progress Dashboards](index.md#student-progress-dashboards)

---

#### 9. A district is choosing between two designs for a remote school with old laptops and a slow shared connection: a live AI chat tutor, or a static textbook with browser-based simulations cached on the school network. Which analysis fits the chapter?

<div class="upper-alpha" markdown>

1. The chat tutor fits better, since text messages use less bandwidth than any web page
2. Both designs perform about the same, since each needs the same connection speed
3. The static textbook fails, since browser-based simulations require a fast server
4. The static textbook fits: it runs locally and offline, while chat needs a live link
</div>

??? question "Show Answer"
    The correct answer is **D**. Static pages and browser-based simulations run on the student's own device with no server doing the computation, can be cached locally, and keep working when the network is down. Live AI chat cannot work offline and needs a network round-trip for each exchange. The chapter warns that testing only on the best connection can widen the equity gap. Browser-based simulations need a capable enough device, not a fast server, so the third option reverses how they work.

    **Concept Tested:** Browser-Based Simulation

    **See:** [Reaching Fairview: Devices, Connectivity, and Offline Access](index.md#reaching-fairview-devices-connectivity-and-offline-access)

---

#### 10. A vendor says its product "integrates with everything" through custom integrations but supports none of LTI, OneRoster, or xAPI. What does the chapter suggest the district should conclude?

<div class="upper-alpha" markdown>

1. The product is a lock-in risk; the district should require standards when it buys
2. Custom integrations are better than standards, because they are built for each district
3. The district should build its own integration, since standards rarely work in practice
4. The product is fine as long as the vendor offers a lower price than competitors do
</div>

??? question "Show Answer"
    The correct answer is **A**. Interoperability standards prevent lock-in, lower cost because a tool built once works in every compliant system, and let small open projects take part. The chapter advises asking for standards by name and warns that "custom integrations" usually means extra cost and lock-in. The district does not need to build integrations itself; it needs to require the standards when it buys. A low price does not remove the risk of data trapped in proprietary formats.

    **Concept Tested:** Interoperability Standards

    **See:** [Interoperability Standards](index.md#interoperability-standards)
