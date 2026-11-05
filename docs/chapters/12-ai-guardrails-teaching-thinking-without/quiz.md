# Quiz: AI Guardrails: Teaching Thinking Without Over-Reliance

Test your understanding of AI tutor guardrails, hints and Socratic questioning, computational thinking skills, and adapting with little live AI with these review questions.

---

#### 1. Researchers use the term sycophancy for one of the four main AI tutor failures. What is it?

<div class="upper-alpha" markdown>

1. Giving the final answer before the student has tried the problem
2. Flattering a student's mistaken belief instead of correcting it
3. Failing to notice that a student is discouraged or not working
4. Stating a wrong answer fluently with no signal of doubt
</div>

??? question "Show Answer"
    The correct answer is **B**. Sycophancy is the tendency of an AI tutor to agree with and praise a student's mistaken belief, as when Dev says 6 divided by 4.50 and the tutor replies "Great thinking! That's right." The other three options are the other failures the chapter names: answering instead of guiding, missing what a human would notice, and confidently wrong answers. Ms. Okafor's second probe, stating a wrong answer firmly, tests for sycophancy.

    **Concept Tested:** AI Tutor Failures

    **See:** [What AI Tutors Do Well and Badly](index.md#what-ai-tutors-do-well-and-badly)

---

#### 2. What does the chapter say about the relationship between guided AI and open AI?

<div class="upper-alpha" markdown>

1. Guided AI always runs on a smaller, cheaper model than open AI
2. Open AI is safe for older students, while guided AI is for younger ones
3. The two may run on the same model and differ only in their design
4. Guided AI requires a live internet connection, while open AI works offline
</div>

??? question "Show Answer"
    The correct answer is **C**. Guided AI is a tutor built with guardrails for a learning purpose; open AI is an unrestricted general-purpose chatbot. The chapter stresses that both may run on the same underlying model. The Turkish study confirms it: the harmful and helpful conditions used the same system and differed only in whether it gave answers or hints. Model size is not the difference, and the chapter does not divide them by age or connectivity.

    **Concept Tested:** Guided AI vs Open AI

    **See:** [Guardrails: Guided AI Versus Open AI](index.md#guardrails-guided-ai-versus-open-ai)

---

#### 3. A district evaluates an AI tutor that is grounded in course content, checks math with a calculator, keeps teacher-reviewable logs, and has age and topic limits. It always gives the final answer first. Using the chapter's five-guardrail rule, how should it be judged?

<div class="upper-alpha" markdown>

1. Likely to harm learning, since it lacks hints instead of answers
2. Likely to help learning, since it has four of the five guardrails
3. A mixed case that needs one more guardrail before it is ready
4. Ready for students, since grounding prevents most tutor failures
</div>

??? question "Show Answer"
    The correct answer is **A**. The rule treats G1, hints instead of answers, as essential because it is the property that separated help from harm in the Turkish study. A tutor with no G1 is likely to harm learning whatever else it has. A tutor needs G1 plus at least four of the five guardrails in all to be judged likely to help, so counting four guardrails without G1 is the tempting mistake. Grounding reduces wrong answers but does not stop the tutor from doing the student's thinking.

    **Concept Tested:** AI Guardrails

    **See:** [Worked Example: Judging Tutor Designs Against Five Guardrails](index.md#worked-example-judging-tutor-designs-against-five-guardrails)

---

#### 4. A teacher sets a "10 of 10 correct" mastery threshold for a low-stakes weekly review. Based on the chapter's table, what problem should she expect?

<div class="upper-alpha" markdown>

1. Students with only partial understanding will pass most of the time
2. The rule will pass every student, since review questions are easy
3. The software will be unable to select a next concept for anyone
4. Students who know the material will often be held back after one slip
</div>

??? question "Show Answer"
    The correct answer is **D**. A stricter threshold is better at refusing weak students but worse at passing strong ones. Under "10 of 10," a student who answers 90 percent of questions correctly passes only about 35 percent of the time, so one off day holds them back. The chapter advises strict rules for prerequisites many concepts depend on and lenient ones for low-stakes review. The first option describes the problem with a lenient rule like "4 of 5," which passes a 70-percent student about 53 percent of the time.

    **Concept Tested:** Mastery Threshold

    **See:** [The Mastery Threshold](index.md#the-mastery-threshold)

---

#### 5. A tutor helps a student rewrite "6 bottles cost \$4.50" as "n items cost C" so that one method works for any such problem. Which computational thinking skill is the student practicing?

<div class="upper-alpha" markdown>

1. Decomposition
2. Pattern recognition
3. Abstraction
4. Algorithmic thinking
</div>

??? question "Show Answer"
    The correct answer is **C**. Abstraction is ignoring details that do not matter and representing a problem in a simpler general form, like a subway map that drops street layouts. Replacing specific numbers with \( n \) and \( C \) is the chapter's own example. Decomposition breaks a problem into smaller parts. Pattern recognition notices what repeats, such as several word problems all asking for "total divided by count." Algorithmic thinking writes precise steps that work every time.

    **Concept Tested:** Abstraction

    **See:** [Teaching Thinking with AI](index.md#teaching-thinking-with-ai)

---

#### 6. A student claims one bottle in a six-pack priced at \$4.50 costs \$1.33. The tutor asks, "If one bottle cost \$1.33, what would six cost?" Which kind of Socratic question is this?

<div class="upper-alpha" markdown>

1. Clarification
2. Implications and consequences
3. Probing assumptions
4. Questions about the question
</div>

??? question "Show Answer"
    The correct answer is **B**. An implications-and-consequences question follows an idea to its result. Six bottles at \$1.33 is about \$8, not \$4.50, so the student discovers the mistake without the tutor saying "wrong." A clarification question makes the student say what they mean, a probing-assumptions question surfaces what the student takes for granted, and a question about the question steps back to ask why the problem matters. The chapter uses Paul and Elder's six kinds of Socratic question.

    **Concept Tested:** Socratic Questioning

    **See:** [Hints Instead of Answers and Socratic Questioning](index.md#hints-instead-of-answers-and-socratic-questioning)

---

#### 7. Suppose a chat tutor costs \$10 per student per year if every student uses it every day. A school instead offers chat one day in four. What is the inference cost per student per year?

<div class="upper-alpha" markdown>

1. About \$40.00
2. About \$7.50
3. About \$0.40
4. About \$2.50
</div>

??? question "Show Answer"
    The correct answer is **D**. Using the tutor one day in four cuts sessions, and therefore inference cost, to a quarter: \$10 / 4 = \$2.50. The \$7.50 answer is the amount saved, not the remaining cost, and \$40 multiplies instead of divides. The chapter's example shows selective chatbot use cutting cost and energy by 80 to 94 percent, especially when the tutor is reserved for students who are stuck after honest attempts.

    **Concept Tested:** Selective Chatbot Use

    **See:** [Worked Example: What Selective Use Saves](index.md#worked-example-what-selective-use-saves)

---

#### 8. A teacher wants to know whether her students have become over-reliant on an AI tool. Which observation is the strongest sign of over-reliance?

<div class="upper-alpha" markdown>

1. Students cannot complete the task when the tool is taken away
2. Students use the tool to check their answers after finishing
3. Students ask the tool to explain a concept in a second way
4. Students use the tool after school when no teacher is available
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter names three signs of over-reliance: asking for the answer before trying, accepting output without checking it, and being unable to do the task when the tool is removed. The last is the clearest evidence that the underlying skill was never learned. Checking finished work, asking for another explanation, and using the tool when no teacher is available are listed as healthy uses and AI tutor strengths, not signs of over-reliance.

    **Concept Tested:** Over-Reliance on AI

    **See:** [What AI Tutors Do Well and Badly](index.md#what-ai-tutors-do-well-and-badly)

---

#### 9. In the chapter's next-concept selection procedure, why does the software offer two or three ready concepts instead of choosing one?

<div class="upper-alpha" markdown>

1. Because the learning graph cannot rank concepts that unlock the same number
2. Because it keeps student agency while the graph ensures every choice is valid
3. Because offering several concepts lowers the inference cost of the AI model
4. Because students must master all of the ready concepts on the same day
</div>

??? question "Show Answer"
    The correct answer is **B**. The procedure computes the ready set, keeps concepts on the path to the goal, prefers those that unlock the most, and then offers two or three and lets the student choose. That keeps student agency, while the learning graph guarantees each option has its prerequisites mastered. The whole procedure is a lookup and a comparison, with no AI model, so it has no inference cost. Ties are possible, but offering choices is a deliberate design step, not a workaround.

    **Concept Tested:** Next-Concept Selection

    **See:** [Next-Concept Selection](index.md#next-concept-selection)

---

#### 10. A proposed 150-minute morning puts students on screens for 140 minutes in three 45-minute blocks, with no small-group time. Which revision best fits the chapter's morning design principles?

<div class="upper-alpha" markdown>

1. Keep the schedule, since adaptive practice is active rather than passive screen use
2. Remove all screens from the morning and teach every lesson with paper practice
3. Cap screens near 120 minutes, break every 25 to 30 minutes, protect off-screen time
4. Lengthen the morning to 200 minutes so that the screen share falls below half
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter's morning screen-time policy has three parts: a cap, such as 120 minutes of a 150-minute morning; a break at least every 25 to 30 minutes with movement; and a protected stretch of off-screen work with a teacher or classmate. Its sample schedule meets all three with 100 minutes of screen time. The Summit Learning backlash shows what happens when such limits are ignored. Removing screens gives up adaptive practice, and lengthening the morning defeats the purpose of compression.

    **Concept Tested:** Morning Screen-Time Limits

    **See:** [The Morning's Shape: Screen Time and Curiosity](index.md#the-mornings-shape-screen-time-and-curiosity)
