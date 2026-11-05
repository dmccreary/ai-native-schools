# Quiz: Measuring AI Capability: The METR Task-Horizon Studies

Test your understanding of AI terminology, how METR measures AI capability with task horizons, and what five-month doubling implies with these review questions.

---

#### 1. Which statement about the nesting of AI terms is correct?

<div class="upper-alpha" markdown>

1. Every machine-learning system is generative AI, but not every LLM is machine learning
2. Every large language model is generative AI, but not every machine-learning system is generative
3. Every AI system learns from data, but not every AI system uses rules written by programmers
4. Every AI agent is a chatbot, but not every chatbot is built on a large language model
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter's key idea is the nesting: every LLM is generative AI, every generative system is machine learning, and every machine-learning system is AI, but not the other way around. A spam filter is machine learning without being generative. The third option is false because a 1990s chess program using hand-written rules is AI that learns nothing from data. An agent differs from a chatbot because it takes multi-step actions on its own.

    **Concept Tested:** Artificial Intelligence

    **See:** [A Ladder of Terms: From AI to AI Agents](index.md#a-ladder-of-terms-from-ai-to-ai-agents)

---

#### 2. In METR's studies, what is human working time?

<div class="upper-alpha" markdown>

1. The time an AI model takes to finish a task when run on a standard computer
2. The average time a typical student would need to complete a school assignment
3. The time a skilled professional needs to complete a task correctly, without distractions
4. The number of hours a human reviewer spends checking an AI system's output for errors
</div>

??? question "Show Answer"
    The correct answer is **C**. METR hired skilled people to do each task while a clock ran, so human working time measures how hard the task is for people. It stays the same whether an AI or a person eventually does the task, which is what makes it a usable unit. It is not the AI's own running time, and it is measured on skilled professionals, not typical students. Review time is a separate cost the chapter does not use as the unit.

    **Concept Tested:** Human Working Time

    **See:** [METR and the Task-Horizon Idea](index.md#metr-and-the-task-horizon-idea)

---

#### 3. Why did METR measure AI capability in units of human working time instead of a benchmark test score?

<div class="upper-alpha" markdown>

1. Because test scores cannot be computed for AI systems that use language
2. Because human working time is cheaper to collect than benchmark scores
3. Because benchmark scores always favor the AI developer that wrote the test
4. Because a time-based measure does not hit a ceiling the way a saturated test does
</div>

??? question "Show Answer"
    The correct answer is **D**. Benchmarks follow a typical life story: they start hard, systems improve until scores approach the maximum, and the test stops telling anyone anything. Scores on old and new tests cannot be placed on one scale. A measure such as "how long a task, in hours, can the system finish" never hits a ceiling, so the ruler keeps working as AI improves. Contamination is a real benchmark problem, but the chapter does not say all scores favor the developer.

    **Concept Tested:** AI Benchmark

    **See:** [Worked Example: A Benchmark Runs Out of Room](index.md#worked-example-a-benchmark-runs-out-of-room)

---

#### 4. A model's success rates are 96% on 2-minute tasks, 80% on 10-minute tasks, 50% on 40-minute tasks, and 20% on 160-minute tasks. What are its 50 percent and 80 percent time horizons?

<div class="upper-alpha" markdown>

1. 40 minutes and 10 minutes
2. 40 minutes and 160 minutes
3. 10 minutes and 40 minutes
4. 80 minutes and 50 minutes
</div>

??? question "Show Answer"
    The correct answer is **A**. The 50 percent time horizon is the task length at which the model succeeds about half the time, here 40 minutes. The 80 percent horizon is the length at which it succeeds four times in five, here 10 minutes, four times shorter. The third option swaps the two. The last option confuses success rates with task lengths. As the chapter notes, the reliable horizon sits well below the 50 percent one.

    **Concept Tested:** 50 Percent Time Horizon

    **See:** [Worked Example: Reading a Success Curve](index.md#worked-example-reading-a-success-curve)

---

#### 5. A vendor tells a principal its AI agent "has a four-hour task horizon." What does the chapter suggest the principal should understand by that claim?

<div class="upper-alpha" markdown>

1. The agent will reliably complete any school task that takes a teacher four hours
2. The agent can work continuously for four hours before it needs to be restarted
3. At 50 percent, it fails about half of four-hour tasks; its reliable horizon is shorter
4. The agent completes four-hour tasks in a small fraction of the time a human needs
</div>

??? question "Show Answer"
    The correct answer is **C**. A 50 percent horizon is a coin flip, not a reliable worker: the tool fails about half the time at that length, and the 80 percent horizon is several times shorter. The chapter advises asking at what success rate, on what kind of tasks, and when the figure was measured. METR's tasks are mostly software tasks, so the first option overstates the claim. The horizon describes task length in human time, not how long the agent runs or how fast it works.

    **Concept Tested:** Task Horizon

    **See:** [Long-Running Tasks and AI Agents](index.md#long-running-tasks-and-ai-agents)

---

#### 6. Suppose a leading model has a 50 percent time horizon of 2 hours today, and the horizon keeps doubling about every five months. What would the horizon be after 20 months?

<div class="upper-alpha" markdown>

1. About 10 hours
2. About 32 hours
3. About 16 hours
4. About 80 hours
</div>

??? question "Show Answer"
    The correct answer is **B**. Twenty months divided by a five-month doubling time gives four doublings, and \( 2 \times 2^4 = 32 \) hours. The 10-hour answer treats the growth as linear, adding two hours per period instead of doubling. The 16-hour answer counts only three doublings. The chapter's advice is to count the doublings, not the months, because exponential growth multiplies by a constant factor each period.

    **Concept Tested:** Five-Month Doubling

    **See:** [Exponential Growth and Doubling Time](index.md#exponential-growth-and-doubling-time)

---

#### 7. Agent A succeeds 95 percent of the time on each step, and Agent B succeeds 99 percent of the time. On a 20-step task, A finishes about 36 percent of the time and B about 82 percent. What does this comparison show?

<div class="upper-alpha" markdown>

1. Long tasks are impossible for any agent, since every agent fails most twenty-step tasks
2. The difference is too small to matter, because both agents are right on almost every step
3. Agent A is the better choice for long tasks, because it gives up sooner when steps fail
4. Small gains in per-step reliability produce large differences on long, multi-step tasks
</div>

??? question "Show Answer"
    The correct answer is **D**. When a task succeeds only if every step does, the per-step rate is multiplied by itself once per step, so errors compound. A four-point gain in per-step reliability more than doubles the chance of finishing. The chapter uses this to explain why the 80 percent horizon sits well below the 50 percent horizon and why a rising horizon means more reliable work at every step. Agent B finishes most twenty-step tasks, so the first option is false.

    **Concept Tested:** Long-Running Task

    **See:** [Worked Example: Why Long Tasks Are Harder Than Short Ones](index.md#worked-example-why-long-tasks-are-harder-than-short-ones)

---

#### 8. What did the "jagged technological frontier" study of consultants using GPT-4 show?

<div class="upper-alpha" markdown>

1. AI improved consultants' work on every task, but by different amounts
2. AI helped only the least experienced consultants and slowed down the experts
3. AI helped on tasks inside its range but hurt accuracy just outside it
4. AI performed the same on all tasks, so the frontier was smooth and predictable
</div>

??? question "Show Answer"
    The correct answer is **C**. On tasks inside what the AI did well, consultants with AI finished more tasks, faster, at higher quality. On a task just outside that range, consultants using AI were about 19 percentage points less likely to reach the correct answer, because confident AI output led them astray. The edge of AI ability is jagged and hard to see from outside, so a tool's average ability says little about the task in front of you. The first option misses the harm outside the frontier.

    **Concept Tested:** AI Capability

    **See:** [Measuring What AI Can Do](index.md#measuring-what-ai-can-do)

---

#### 9. A student uses about 3.6 million tokens of AI tutoring over a school year. At the October 2024 price of about \$0.07 per million tokens for GPT-3.5-level performance, what is the cost per student per year?

<div class="upper-alpha" markdown>

1. About \$72.00
2. About \$0.25
3. About \$2.52
4. About \$25.20
</div>

??? question "Show Answer"
    The correct answer is **B**. Multiply 3.6 million tokens by \$0.07 per million: \( 3.6 \times 0.07 \approx \$0.25 \) per student per year. The \$72 answer uses the November 2022 price of \$20 per million tokens. The other two shift the decimal point. The chapter cautions that this price applies to a GPT-3.5-level model; stronger tutors cost more per token, so the full cost picture returns in Chapter 7.

    **Concept Tested:** AI Inference Cost

    **See:** [Worked Example: Cost per Student per Year](index.md#worked-example-cost-per-student-per-year)

---

#### 10. At a board meeting, a presenter projects that the AI task horizon will grow about 147-fold in three years. A board member asks what would most change that forecast. Which answer best reflects the chapter?

<div class="upper-alpha" markdown>

1. The number of schools and districts that adopt AI tools during the three years
2. The price per million tokens that AI providers charge schools and districts
3. The success rate METR uses, since a 50 percent figure is always too optimistic
4. The doubling time, since ten-month doubling would make the result twelve times smaller
</div>

??? question "Show Answer"
    The correct answer is **D**. The 147-fold figure comes from 7.2 doublings at five months each over 36 months. The chapter shows that with a ten-month doubling time the horizon after three years would be about ten hours instead of 122, roughly twelve times smaller, and concludes that a forecast with an exponential in it is only as good as its doubling time. The success-rate choice changes the level of the horizon, not its growth factor. Prices and adoption do not drive the capability curve.

    **Concept Tested:** Doubling Time

    **See:** [Worked Example: What Five-Month Doubling Implies](index.md#worked-example-what-five-month-doubling-implies)
