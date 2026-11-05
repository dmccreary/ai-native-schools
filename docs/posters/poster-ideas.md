# Poster Ideas

Ideas for full-page overlay infographic posters.

Each poster is an **infographic overlay MicroSim**: a text-free background image with
an interactive layer of labels on top, built with the shared engines in
`docs/sims/shared-libs/`. There are two engines:

- **Callout** (`diagram.js`) draws numbered markers with leader lines. Use it for one
  complex scene where small parts need names.
- **Grid** (`grid-diagram.js`) draws large rectangular hover zones. Use it for
  side-by-side comparisons and posters split into regions.

The first poster, [Crossing the Chasm](../sims/crossing-the-chasm-overlay/index.md)
(Chapter 15), is built and is the model for the twelve below. Its background is a
hand-built SVG drawn by a Python script, so no text-to-image step is needed. Most
posters below can be drawn the same way. A few (marked) would look better painted
from an `image-prompt.md`.

**Rules that apply to every poster**

- No text in the image, not even the title. Every word lives in `data.json`.
  - Exception: grid posters may print column headers in the image, with `showLabels: false`.
- Every poster shows a benefit, a risk, and the school's response to the risk
  (the book's story-balance rule).
- Any number baked into a zone's facts goes through Phases 1–4 of the
  verified-infographic guide first, and carries a `source_id`. Numbers taken from
  the book's own worked examples cite the chapter instead.
- Each poster starts at `status: scaffold`, is embedded in its chapter under a
  `#### Diagram:` heading, and is added to `nav:` and `docs/sims/index.md`.

## Summary

| # | Poster | Chapter | Engine | sim-id |
|---|---|---|---|---|
| 1 | The Factory Day vs. the AI-Native Day | 3, 20 | Grid | `factory-vs-ai-native-day` |
| 2 | Five Levels: Textbooks and Self-Driving Cars | 6 | Grid | `five-levels-textbooks-and-cars` |
| 3 | Seat Time vs. Mastery | 3, 11 | Grid | `seat-time-vs-mastery-poster` |
| 4 | Anatomy of a Learning Record | 8 | Callout | `anatomy-of-a-learning-record` |
| 5 | The Student Record Vault | 10 | Callout | `student-record-vault` |
| 6 | Answer Machine vs. Thinking Tutor | 12 | Grid | `answer-machine-vs-thinking-tutor` |
| 7 | The EdTech Hype Cycle | 15 | Callout | `edtech-hype-cycle-overlay` |
| 8 | The Rider, the Elephant and the Path | 19 | Callout | `rider-elephant-path-overlay` |
| 9 | Kotter's Eight Steps as a Mountain Trail | 17 | Callout | `kotter-mountain-trail` |
| 10 | Schein's Culture Iceberg | 17, 18 | Callout | `schein-culture-iceberg` |
| 11 | What a Textbook Costs per Student | 7 | Grid | `textbook-cost-per-student-poster` |
| 12 | Promise and Peril: Five AI-First Cases | 22 | Grid | `promise-and-peril-cases` |

Several of these share a topic with an existing practice sim, such as
`seat-time-vs-mastery`, `where-on-hype-cycle`, `rider-elephant-path`,
`which-kotter-step`, `who-may-see-this-record` and `cost-per-student-by-level`.
That is deliberate: the poster *explains* the idea, and the practice sim that
follows it in the chapter *checks* it. To avoid a clash with the existing sim ids,
the overlay ids end in `-poster` or `-overlay`.

---

## 1. The Factory Day vs. the AI-Native Day

**Chapters:** 3 (Industrial-Era School Model), 20 (Designing the AI-Native School Day)
**Engine:** Grid, two columns, each split into a morning band and an afternoon band (four zones plus two header zones)
**Why a poster:** the whole argument of the book is a comparison between two school days. Seeing them side by side, hour by hour, makes it concrete.

**Image:** two vertical school-day timelines drawn as buildings in cross-section.
- **Left, the factory day:** identical classrooms stacked like a production line, rows of desks facing the front, a bell on the wall, students grouped by age, and a clock that dominates each room.
- **Right, the AI-native day:**
  - Morning: small clusters of students at laptops, each at a different point on a winding path, with a coach moving between them.
  - Afternoon: open spaces with project tables, a garden, a stage and a workshop.

**Zones**

| Zone | Summary | Facts to show |
|---|---|---|
| Factory morning | Everyone hears the same lesson at the same pace | Bell schedule; age-based grade levels; seat time; Carnegie unit |
| Factory afternoon | More of the same, by subject | Teacher workload and burnout; little time for projects |
| AI-native morning | A compressed academic morning, about two to three hours, at each student's own pace | Personalized pacing; mastery learning; gap filling; reduced direct instruction |
| AI-native afternoon | Freed-up time for people skills | Projects, clubs, service, the pro-social afternoon (Ch 14) |
| Teacher, left | Lecturer and grader | — |
| Teacher, right | Coach, mentor, facilitator | Changing teacher role (Ch 20) |

**Story balance:**
- Benefit: freed-up time.
- Risk: too much screen time and isolated students.
- Response: morning screen-time limits, and a structured (not empty) afternoon.

**To verify:** the length of the compressed morning. Use the book's phrasing and cite Chapter 11.

---

## 2. Five Levels: Textbooks and Self-Driving Cars

**Chapter:** 6 (The Five-Level Model of Intelligent Textbooks)
**Engine:** Grid, five columns in two rows (cars on top, textbooks below), so one zone per level per row
**Why a poster:** the chapter's analogy to the SAE driving levels is the key to the model, and it lands best when the two ladders sit side by side.

**Image:** five columns that rise like a staircase from left to right.
- **Top row:** a car at each level, from a car with a driver's hands on the wheel to a car with no steering wheel at all.
- **Bottom row:** a textbook at each level:
  - a closed print book
  - a laptop with a slider and a graph
  - a laptop with a branching path
  - a laptop with a chat bubble
  - a laptop generating pages on the fly
- Small column headers "1"–"5" may be printed, with `showLabels: false`.

**Zones (textbook row)**

| Level | Summary | Facts |
|---|---|---|
| 1 Static | Fixed content, like print and PDF | No interactivity; nothing known about the student |
| 2 Interactive | Responds to what the learner does | Embedded simulations, quizzes, learning graphs |
| 3 Adaptive | Driven by each student's progress | Needs stored student records (Ch 8, 10) |
| 4 Chatbot | Conversational tutoring | Large language models; inference cost (Ch 7) |
| 5 Autonomous | Real-time content generation | Full personalization; not yet realistic |

**Story balance:**
- Benefit: each level adds power.
- Risk: each level also adds cost, data and things that can go wrong. Vendors claim a higher level than they deliver.
- Response: the chapter's rule that a product's level is the highest capability it *delivers in use*.

**To verify:** the SAE level names (cite SAE J3016) and the date of the five-level paper (December 2025 preprint).

---

## 3. Seat Time vs. Mastery

**Chapters:** 3 (Seat Time, Carnegie Unit), 11 (Mastery Learning)
**Engine:** Grid, two columns
**Why a poster:** the difference is about time, and a picture of two students' paths through the same unit makes the hidden gaps visible.

**Image:** two staircases of the same five concepts (blocks).
- **Left, seat time:** a calendar marches forward and the student climbs on schedule, but some blocks are cracked or missing. The higher blocks wobble on the gaps.
- **Right, mastery:** the student stays on a block until it is solid (a small green check shape, not text), then climbs. Every block is whole, and some students are higher than others.

**Zones**

| Zone | Summary | Facts |
|---|---|---|
| Seat time: the calendar | Time is fixed; learning varies | Carnegie unit; the class moves on together |
| Seat time: the cracked blocks | Gaps build up silently | Later concepts depend on earlier ones (learning dependency, Ch 8) |
| Mastery: the solid blocks | Learning is fixed; time varies | Mastery threshold; gap filling |
| Mastery: the spread of students | Students finish at different times | Personalized pacing; what the class does together instead |

**Story balance:**
- Benefit: no hidden gaps.
- Risk: students spread far apart, and slow students fall further behind in time.
- Response: tutoring and gap filling for those who are stuck, and shared afternoon work that does not depend on pace.

**To verify:** none; this poster is conceptual.

---

## 4. Anatomy of a Learning Record

**Chapter:** 8 (Tracking Mastery: xAPI and the Learning Record Store)
**Engine:** Callout, `top-bottom` layout, about 10 callouts
**Why a poster:** the path from a click to a dashboard is invisible to most teachers and parents. A single picture of it answers the chapter's opening question, "How does it know?"

**Image:** a left-to-right flow:
1. A student at a laptop moving a slider in a MicroSim.
2. A glowing envelope leaves the laptop. The envelope is drawn as three linked tiles, shown only as a person icon, an action icon and an object icon.
3. It travels to a filing-cabinet server (the Learning Record Store).
4. The cabinet feeds a teacher's dashboard with bars.
5. The cabinet also feeds a learning graph whose next node lights up.
6. A small key on a lanyard hangs from the student, standing for student-controlled data.

**Callouts:** the MicroSim; the xAPI statement; actor; verb; object; result (score); the Learning Record Store; the dashboard (learning analytics); the learning graph choosing the next concept; the key (data portability and student control).

**Story balance:**
- Benefit: the textbook adapts without a live AI model, cheaply.
- Risk: a detailed learning history is sensitive data.
- Response: data minimization and student-controlled records (links to poster 5).

**To verify:** the xAPI statement structure (cite the xAPI specification).

---

## 5. The Student Record Vault

**Chapter:** 10 (Student Privacy and Data Governance)
**Engine:** Callout, `side-panel` layout, about 12 callouts
**Why a poster:** "who may see what" is a set of nested rules that is hard to follow in prose and easy to follow as rings.

**Image:**
- **Centre:** a student's record as a glowing folder inside a round vault.
- **Rings:** concentric walls, each with a gate.
  - Innermost ring: the student and the family.
  - Second ring: the teacher and the school.
  - Third ring: the district.
  - Outer ring: the vendors and researchers.
- **Around the rings:**
  - a crack in the outer wall with papers blowing out (a data breach)
  - a shredder by one gate (the retention policy)
  - a small balance scale on a desk (bias auditing)

**Callouts:** student data vs. personally identifiable data; behavioral data; FERPA (the school's gate); COPPA (the under-13 gate); GDPR (where it applies); data minimization (a small vault); informed consent; the retention-policy shredder; vendor risk; the breach crack; algorithmic bias auditing; the trust paradox.

**Story balance:**
- Benefit: detailed records let a textbook adapt.
- Risk: the privacy inflection point, and the inBloom and PowerSchool cases.
- Response: governance readiness before adoption.

**To verify:** the scope of each law, the inBloom and PowerSchool facts, and any numbers about breaches. Run the verified-infographic Phases 1–4.

---

## 6. Answer Machine vs. Thinking Tutor

**Chapter:** 12 (AI Guardrails: Teaching Thinking Without Over-Reliance)
**Engine:** Grid, two columns of three rows (the question, the AI's move, what the student is left with)
**Why a poster:** the same homework question handled two ways shows exactly what a guardrail changes.

**Image:** two chat conversations on two phones. Speech bubbles hold only shapes and icons, no words.
- **Left phone, open AI:** one big bubble with a finished answer (a checkmark and a neat page). The student leans back, and a small, empty thought cloud floats above them.
- **Right phone, guided AI:** a chain of short bubbles, with a question-mark icon, a lightbulb hint and a smaller question mark. The student is writing on paper, and the thought cloud above them holds four small icons: puzzle pieces (decomposition), a repeating pattern (pattern recognition), a simplified shape (abstraction) and numbered steps (algorithmic thinking).

**Zones**

| Zone | Summary | Facts |
|---|---|---|
| Open AI: the move | Gives the answer | Fast and convenient |
| Open AI: the result | Cognitive offloading | Over-reliance; confidently wrong answers go unchecked |
| Guided AI: the move | Hints instead of answers | Socratic questioning; the tutor holds back |
| Guided AI: the result | The student does the thinking | The four computational-thinking skills |
| The guardrails | What makes the right phone different | Mastery threshold; selective chatbot use; screen-time limits |

**Story balance:**
- Benefit: an AI tutor is patient and always available.
- Risk: over-reliance.
- Response: guardrails, and the guided-AI design.

**To verify:** any study figures quoted about tutoring outcomes (run the verified phases, or keep the poster qualitative).

---

## 7. The EdTech Hype Cycle

**Chapter:** 15 (Technology Adoption, the hype-cycle section)
**Engine:** Callout, `top-bottom` layout, about 11 callouts
**Why a poster:** a century of education technology on one curve is the fastest way to show that the pattern repeats.

**Image:** a landscape whose skyline is the hype-cycle curve.
- **The five phases:**
  - a rocket launch at the trigger
  - a crowded, fireworks-lit peak
  - a foggy valley at the trough
  - a gentle staircase up the slope
  - a calm, productive plateau with a working classroom
- **Objects placed on the curve, one per technology wave:**
  - an old radio
  - a classroom TV on a cart
  - a computer-lab desktop
  - a laptop cart
  - a MOOC certificate
  - a glowing chat bubble for generative AI

**Callouts:** the five phases (5), plus one per technology wave (6). The wave placements must match the chapter's own hype-cycle table.

**Story balance:**
- Benefit: some technologies do reach the plateau.
- Risk: buying at the peak, and abandoning at the trough.
- Response: realistic expectations, and staying on the slope of enlightenment, where a small group keeps learning what works.

**To verify:** the dates and claims for each wave. Run Phases 1–4; Gartner is the source for the curve itself.

---

## 8. The Rider, the Elephant and the Path

**Chapter:** 19 (Microstrategies for Leading Change, the Switch framework)
**Engine:** Callout, `side-panel` layout, 10 callouts
**Why a poster:** the Heaths' framework is already an image. Drawing it, with each of the nine moves placed in the scene, turns a list into something memorable.

**Image:**
- **The rider:** a small figure holding a map and pointing ahead. A bright patch of the landscape glows in the distance (a bright spot), and a far-off hilltop shows a school building at the destination.
- **The elephant:** a large elephant, partly tired. A heart shape floats near it, a small step-sized stone sits right in front of its foot (shrink the change), and a team badge hangs on its harness (grow your people).
- **The path:**
  - a smooth, fenced path with a well-worn groove (build habits)
  - a signpost with no words (tweak the environment)
  - a herd of elephants walking ahead (rally the herd)

**Callouts:** direct the rider (follow the bright spots, script the critical moves, point to the destination); motivate the elephant (find the feeling, shrink the change, grow your people); shape the path (tweak the environment, build habits, rally the herd); plus one overall callout for the three-part idea.

**Story balance:**
- Benefit: each move is small and cheap.
- Risk: a clear plan (rider) with no motivation (elephant) stalls.
- Response: address all three, and use the chapter's examples, such as "a login that works first time."

**To verify:** none beyond attribution to Heath and Heath (2010), *Switch*.

---

## 9. Kotter's Eight Steps as a Mountain Trail

**Chapter:** 17 (Leading Change: Vision, Culture, and Early-Stage Concerns)
**Engine:** Callout, `dual-panel` layout, 8 step callouts plus 2 risk callouts
**Why a poster:** Kotter's steps are a sequence, and a trail up a mountain shows that skipping one leaves you stranded.

**Image:** a mountain with a switchback trail and eight camps.
1. A camp with a fire alarm-style flare (urgency)
2. A rope team (the guiding coalition)
3. A telescope pointed at the summit (vision)
4. A signal flag station (communicating)
5. Fallen logs being cleared (removing obstacles)
6. A small flag planted on a ledge (a short-term win)
7. A wider camp with more tents (building on change)
8. A stone cairn at the summit (anchoring in culture)

Two hazards complete the scene: a climber sliding back down a shortcut gully, and a summit cairn that is only half built.

**Callouts:** the eight steps, using the book's names (sense of urgency, guiding coalition, change vision, communicating the vision, removing obstacles, short-term wins, building on change, anchoring in culture). The two risk callouts are:
- **Skipping steps:** the shortcut gully.
- **Declaring victory too soon:** the half-built cairn.

**Story balance:**
- Benefit: a clear order of work.
- Risk: skipping steps, or declaring victory too soon.
- Response: Lewin's refreeze and Kotter's anchoring, as the chapter pairs them.

**To verify:** step names (cite Kotter, *Leading Change*).

---

## 10. Schein's Culture Iceberg

**Chapters:** 17 (Schein's culture model), 18 (culture assessment)
**Engine:** Callout, `side-panel` layout, about 9 callouts
**Why a poster:** Schein's three layers are about what you can and cannot see, and an iceberg shows that directly. It also explains why reforms that change only the surface fail.

**Image:** an iceberg in cross-section, at sea.
- **Above the water (artifacts):** a school building with a bell tower, a printed schedule shape, a trophy case and a crowd at a pep rally (a ritual).
- **At the waterline (espoused values):** a framed mission-statement shape with blank lines, and a banner with no text.
- **Deep below (basic assumptions):** dark, heavy ice with fossil-like shapes, such as a single desk alone in a room ("a good teacher works alone") and a clock fused into the ice ("learning takes a fixed time").
- **The reform ship:** a small boat labelled with nothing, steering at the visible tip while the hidden mass sits beneath its path.

**Callouts:** artifacts; school rituals; espoused values; shared beliefs and norms; basic assumptions (two examples); the grammar of schooling; the reform ship ("reform without real change"); culture assessment (a diver with a lamp).

**Story balance:**
- Benefit: culture holds a school together through hard times.
- Risk: when stated values and real assumptions disagree, the assumptions win.
- Response: assess culture before announcing change, and work on assumptions through small wins.

**To verify:** none beyond attribution to Schein.

---

## 11. What a Textbook Costs per Student

**Chapter:** 7 (Content Economics and Open Educational Resources)
**Engine:** Grid, four columns (Print, Level 2, Level 3, Level 4)
**Why a poster:** a finance director's question ("What will it cost per student, all in?") has a picture answer: stacked cost blocks, one stack per option.
**Image:** best painted from an image prompt, or built as an SVG with exact block heights.

**Image:** four stacks of coin-like blocks on a table, with block height proportional to cost.
- **Print:** one tall stack.
- **Level 2:** a tiny stack.
- **Level 3:** a slightly taller stack, with blocks in different colors for records, governance and training.
- **Level 4:** taller again, with an added block glowing like a chat bubble (inference).

A laptop sits behind all four stacks, slightly faded, to show the device cost that is not included.

**Zones**

| Option | Per student per year (devices already owned) | Facts |
|---|---|---|
| Print baseline | about \$53.33 | \$80 book, six years, four core subjects |
| Level 2 | \$5.80 | Penny-per-day content and hosting (\$1.80) plus \$4.00 of training |
| Level 3 | \$12.80 | Adds a learning record store (\$3.00), privacy governance (\$2.00) and \$2.00 more training |
| Level 4 | \$23.00 | Adds inference (\$7.20 at \$2 per million tokens), log review (\$1.00) and \$2.00 more training |
| The device (faded) | about \$75 a year | \$300 laptop over four years |

**Story balance:**
- Benefit: content costs collapse.
- Risk: hidden costs (devices, training, governance), plus publisher disruption.
- Response: total cost of ownership and explicit cost models.

**To verify:** all figures come from the chapter's illustrative model. Cite Chapter 7 and say "illustrative" in every zone. No web verification is needed unless real prices are added.

---

## 12. Promise and Peril: Five AI-First Cases

**Chapter:** 22 (AI-First Case Studies I: Promise and Peril)
**Engine:** Grid, five columns (one per case) by three rows (benefit, risk, response), 15 zones
**Why a poster:** the chapter's risk-and-response framework is a table. A poster that fills it in for all five cases shows the pattern at a glance, and it *is* the book's story-balance rule in one picture.
**Image:** best painted.

**Image:** five vertical panels, each showing a school scene in a consistent flat style:
1. A small private school with guides beside students at laptops (Alpha School)
2. A home screen with a single student and a virtual classroom (Unbound Academy)
3. A Turkish high-school math classroom with two groups, one with open AI and one with a guided tutor (the Turkish study)
4. A university physics lecture hall with students working with an AI tutor (Harvard)
5. A large public-school classroom with students on a learning platform and a mentor checking in (Summit Learning)

In each panel, a green band at the top holds a symbol for its benefit, a red band in the middle a symbol for its risk, and a blue band at the bottom a symbol for its response.

**Zones:** one per case per row, so 15 in all. Each zone's facts include its source.

**Story balance:** built into the design. Every case gets all three rows, and a missing response is shown as an empty blue band, not invented.

**To verify:** **everything.** Run the verified-infographic Phases 1–4 for every claim:
- Alpha School's tuition: about \$40,000 at the original Austin campus to about \$65,000 at newer campuses. Never give \$65,000 for every campus.
- The study results.
- The Unbound charter decisions.
- The Summit Learning history.

Allow asymmetric content where a case has no published evidence for a row.

---

## Suggested build order

1. **Posters 4, 8, 9 and 10:** they can be drawn as SVGs from simple shapes, need no outside facts, and each fills a gap in a chapter with no picture of its main model.
2. **Posters 1, 3 and 6:** two-column grid comparisons, quick to build.
3. **Posters 2 and 11:** need care with exact figures and level names, but no web research.
4. **Posters 5, 7 and 12:** need the verified-infographic research phases first.
