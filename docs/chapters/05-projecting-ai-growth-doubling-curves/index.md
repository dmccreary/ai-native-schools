---
title: "Projecting AI Growth: Doubling Curves, Limits, and Uncertainty"
description: "How to read a logarithmic chart, project the five-month doubling trend over a three-to-four-year planning window, and plan responsibly around what could bend the curve."
generated_by: claude skill chapter-content-generator
date: "2026-11-04 08:11:26"
version: 1.11
---

# Projecting AI Growth: Doubling Curves, Limits, and Uncertainty

## Summary

This chapter teaches readers to project the METR task-horizon trend forward: reading a logarithmic scale, the five-month doubling time, and the difference between linear and exponential growth. It also covers what could slow the trend, forecast uncertainty, AI inference cost, and energy use, so readers can hold the prediction and its limits at the same time. Readers finish able to read a log-scale chart and state the assumptions behind a multi-year AI forecast.

## Concepts Covered

This chapter covers the following 19 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Falling AI Costs | 1024 |
| Chatbot | 550 |
| Linear Growth | 66 |
| Trend Extrapolation | 65 |
| AI Hallucination | 60 |
| Forecast Uncertainty | 36 |
| Planning Window | 28 |
| Three-to-Four-Year Forecast | 27 |
| Planning Under Uncertainty | 27 |
| AI Prediction for Schools | 26 |
| AI Literacy | 21 |
| Compute Scaling | 5 |
| AI Energy Use | 5 |
| Limits to AI Growth | 4 |
| Prediction Assumptions | 4 |
| Prediction Failure Scenario | 3 |
| Logarithmic Scale | 2 |
| Log-Scale Chart | 1 |
| Data Center Energy | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: The Building Blocks of Schools, Students, and Learning](../01-building-blocks-schools-students/index.md)
- [Chapter 4: Measuring AI Capability: The METR Task-Horizon Studies](../04-measuring-ai-capability-metr/index.md)

---

## "Why Should the Line Keep Going?"

A month after the board meeting in Chapter 4, Mr. Alvarez returns with a harder question. "Fine, the horizon doubles about every five months. But a line on a chart is not a law of physics. Why should it keep going for three more years? And what do we do if it doesn't?"

A skeptical teacher, Mr. Dang, adds his own: "I've heard 'this will change everything' about film strips, computers, and tablets. Why is this different?"

Both questions are fair, and this chapter answers them without taking sides. It teaches how to read the kind of chart these claims come with, how to project it, how far a projection can honestly be trusted, and how a school can make decisions that hold up whether the trend continues, slows, or stops. The goal is to hold the prediction and its limits in your head at once.

!!! mascot-welcome "A forecast you can plan with"
    ![Indigo waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    This chapter is about being useful under uncertainty: you'll learn to read a doubling chart, name the assumptions behind a multi-year forecast, and choose moves that make sense even if it's wrong. Let's find the balance between planning for a curve and not betting the school on it.

## Linear Versus Exponential Growth

Chapter 4 introduced exponential growth. To see why it behaves so differently from the growth people expect, compare it with its opposite.

**Linear growth** is growth by a constant *amount* in each period: a plant that grows two centimeters every week, or a savings jar that gains ten dollars every month. On a chart it is a straight line, and its rate of change never changes. People find linear growth intuitive, because it matches most of everyday life.

The contrast with exponential growth, which gains a constant *factor* in each period, is the heart of the argument. Start both from the 50-minute horizon of Chapter 4. The linear version adds 50 minutes every five months, which is 10 minutes a month. The exponential version doubles every five months.

| Months | Linear (adds 10 min per month) | Exponential (doubles every 5 months) |
|---|---|---|
| 0 | 50 minutes | 50 minutes |
| 12 | 170 minutes (2.8 hours) | about 4.4 hours |
| 24 | 290 minutes (4.8 hours) | about 23 hours |
| 36 | 410 minutes (6.8 hours) | about 122 hours |
| 48 | 530 minutes (8.8 hours) | about 647 hours |

At 12 months the two are nearly the same, so early data cannot tell them apart. By 36 months the exponential value is about 18 times the linear one, and by 48 months about 73 times. This is the reason people who correctly understand a doubling trend sound alarmed to people who are extrapolating a straight line: they are not disagreeing about the facts so much as about the shape.

### Worked Example: Two Students, Two Vocabularies

Maya and Jordan each start with 50 vocabulary words. Maya learns 10 new words a month (linear). Jordan's method doubles his word count every five months (exponential, as a thought experiment). After a year Maya knows 170 and Jordan knows about 264; Jordan looks only about 55 percent ahead. After three years Maya knows 410 and Jordan about 7,350. A teacher who checked in after one year and extrapolated a straight line for Jordan would have predicted about 690 words at year three (a straight line through 50 and 264 reaches about 690 at 36 months), off by a factor of more than ten. The shape of the curve, not the early numbers, determines the future.

## Reading a Logarithmic Chart

Exponential data is awkward to draw. On an ordinary chart the early values are squashed against the bottom while the last few shoot off the top. The usual fix is to change the scale.

A **logarithmic scale** is an axis on which equal *distances* represent equal *multiples* rather than equal amounts. On an ordinary (linear) axis the gridlines might read 0, 100, 200, 300. On a logarithmic axis they read 1, 10, 100, 1,000: each gridline is ten times the one before. In the common base-ten version, the distance between 1 and 10 is the same as between 10 and 100, and the same as between 100 and 1,000.

A **log-scale chart** is a chart that uses a logarithmic scale on one axis, normally the vertical one, with time on the horizontal axis. Its useful property is that *a quantity growing at a constant doubling time plots as a straight line*. The steepness of the line tells you the growth rate: a steep line means a short doubling time, and a flatter line a longer one. Equal steps up the chart are equal numbers of doublings, so you can count them.

Three rules help you read one:

- **Check the axis first.** If the labels go 1, 10, 100, 1,000, you are looking at a log scale, and a line that rises steadily is exponential growth, not a gentle trend.
- **Straight means constant doubling.** A line that bends upward on a log chart is growth getting faster than exponential, and a line that bends downward means growth is slowing.
- **Distance is a ratio.** The gap between two points tells you *how many times larger* the later value is, not how much larger.

!!! mascot-tip "Count the gridlines"
    ![Indigo giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    On a base-ten log chart, every gridline you climb is a tenfold increase, and every gridline contains a little over three doublings (since \( 2^{3.32} \approx 10 \)). So two gridlines up is a factor of 100 in about six or seven doublings, which at five months each is about thirty-three months.

### Worked Example: Reading the Horizon Chart

On a log-scale chart of the Chapter 4 projection, suppose the vertical axis is labeled 1 minute, 10 minutes, 100 minutes, 1,000 minutes, 10,000 minutes (about a week of work), and 100,000 minutes. The line starts at 50 minutes, between the first two gridlines, and crosses 10,000 minutes at about 38 months. You can check this: \( 50 \times 2^{38/5} \approx 50 \times 194 \approx 9{,}700 \) minutes. The gap between 50 and 10,000 is a factor of 200, which is about 7.6 doublings, which at five months each is 38 months. Reading a log chart means translating distance into doublings and doublings into time.

The sim below, reused from another book in this series, plots the same exponential data on a linear and a logarithmic axis so you can see the straightening effect for yourself.

#### Diagram: Linear Versus Semi-Log Plot of Exponential Data

<iframe src="https://dmccreary.github.io/pre-calc/sims/semilog-linearization/main.html" width="100%" height="504" scrolling="no"></iframe>

[Run the Linear vs Semi-Log Plot MicroSim fullscreen](https://dmccreary.github.io/pre-calc/sims/semilog-linearization/main.html){ .md-button }

<details markdown="1">
<summary>Linear vs Semi-Log Plot of Exponential Data (reused MicroSim)</summary>
Type: microsim
**sim-id:** semilog-linearization<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/pre-calc/sims/semilog-linearization/<br/>
**Source Repo:** https://github.com/dmccreary/pre-calc/tree/main/docs/sims/semilog-linearization<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** compare<br/>
**Learning Objective:** The learner will compare how the same exponential data looks on a linear axis and on a logarithmic axis, and explain why it plots as a straight line on the logarithmic one.

Reused from the MicroSim catalog (WHAT match score 0.782). The source sim's own lesson page is unfinished, but its main.html runs as described.
</details>

!!! mascot-encourage "Logs trip up almost everyone"
    ![Indigo encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If a log scale feels backwards at first, that's normal; most of us learned charts where equal steps mean equal amounts. You already read two kinds of scale in Chapter 1 when you compared minutes and dollars. Try the sim above with the slider on one value and watch which axis the line straightens on.

## Projecting the Trend

Now we can state the forecast and its logic.

**Trend extrapolation** is the practice of extending a pattern observed in past data into the future, on the assumption that the forces that produced the pattern will continue. It is the most common forecasting method, since it needs no theory, only a line. Its strength is that, over short spans, the future often resembles the recent past. Its weakness is that it fails exactly when the forces behind the pattern change, which is when the forecast matters most.

History offers both successes and failures. Moore's law, Gordon Moore's 1965 observation that the number of transistors on a chip doubles at a steady interval, which he revised in 1975 to about every two years, held for decades and shaped an entire industry. It also slowed as chips approached physical limits. Many other exponential-looking trends turned out to be the early part of an *S-curve*: growth that accelerates, then levels off as it runs into a ceiling. The adoption of any new technology follows an S-curve, with the exponential phase lasting until the market is saturated.

A **planning window** is the span of time over which a decision has to hold up: the years a purchase, schedule, or training commitment will be in use. Schools plan in windows of about three to five years. Device fleets are replaced every three to five years, textbook adoptions last five to seven, and a kindergartner who starts in 2026 graduates in 2039. A forecast is useful only to the extent it covers the planning window of the decision it informs.

The book's central projection is the **three-to-four-year forecast**: applying five-month doubling to the task horizon over the next three to four years. From a start of about 50 minutes in early 2025, the Chapter 4 arithmetic gives a horizon of roughly 122 hours after three years and 647 hours after four. These figures are central estimates, not promises; the next section shows how wide the honest range around them is.

### Worked Example: When Could AI Build a Textbook Chapter?

Suppose a skilled team needs about 40 hours of human working time to write one chapter of an interactive textbook with its simulations. When does the 50 percent horizon cross 40 hours, which is 2,400 minutes? Solve \( 50 \times 2^{t/5} = 2{,}400 \):

\[
2^{t/5} = 48 \qquad \frac{t}{5} = \log_2 48 \approx 5.6 \qquad t \approx 28 \text{ months}
\]

So on the central trend the horizon passes 40 hours about 28 months after early 2025, around mid-2027. But a 50 percent horizon means the system finishes such a chapter correctly only half the time. If reliable output requires the 80 percent horizon, which in Chapter 4's simple model is a quarter of the 50 percent horizon, the 50 percent horizon must reach 160 hours, or 9,600 minutes:

\[
2^{t/5} = 192 \qquad \frac{t}{5} = \log_2 192 \approx 7.6 \qquad t \approx 38 \text{ months}
\]

That is about three years, mid-2028. This is the reasoning behind the book's prediction that interactive textbooks will become cheap and widely available within three to four years: not a guess about "intelligence," but arithmetic on a measured trend with a stated reliability bar.

## Forecast Uncertainty

**Forecast uncertainty** is the range of outcomes a forecast could reasonably turn out to have, which grows the further into the future the forecast looks. A single number, such as "122 hours," conceals that range. An honest forecast gives a range and says what it depends on.

The main source of uncertainty in an exponential forecast is the doubling time, because it sits in the exponent. Using an illustrative range of four to six months around the five-month planning figure:

| Doubling time | Horizon after 36 months | Horizon after 48 months |
|---|---|---|
| 4 months | about 427 hours | about 3,413 hours |
| 5 months | about 122 hours | about 647 hours |
| 6 months | about 53 hours | about 213 hours |
| 10 months (trend halves in speed) | about 10 hours | about 23 hours |

A shift of one month either way moves the three-year answer by a factor of about two or three, and the two ends of the range, four and six months, differ by a factor of eight. A trend that slows to half speed produces a three-year horizon about twelve times smaller than the central one. These are the same arithmetic as the Chapter 4 formula, applied to different inputs, and they show why precision about the doubling time matters more than precision about the starting value.

Uncertainty has other sources too: the measurement itself (a preprint on one set of tasks), whether horizons on benchmark tasks match horizons on messy real-world work, and whether progress on the 50 percent horizon carries over to the reliability that matters.

!!! mascot-warning "Don't mistake a line for a law"
    ![Indigo warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is reading a trend line as a guarantee, in either direction: "it will certainly happen" or "it's obviously hype." Instead, ask what the line assumes, how far it extends past the data, and how much the answer changes if the doubling time shifts by a month. If the answer swings by a factor of eight, say so in the plan.

The sim below lets you try these sensitivities yourself.

#### Diagram: Doubling Time Projection Calculator

<details markdown="1">
<summary>Doubling Time Projection Calculator</summary>
Type: microsim
**sim-id:** doubling-time-projection-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate how many months a 50-minute task horizon takes to reach 40 hours for doubling times of 4, 5, and 6 months, to within one month, and describe how the answer changes with the doubling time.

**Template:** https://github.com/dmccreary/microsims/tree/main/docs/sims/projecting-ai<br/>

**Prerequisites:** exponential growth, doubling time, number of doublings, trend extrapolation, forecast uncertainty (all defined in the sections "Linear Versus Exponential Growth," "Projecting the Trend," and "Forecast Uncertainty" above).

**Evidence of Mastery:** Before the doubling time can be changed, the learner commits three answers using the stated number of doublings: the months to reach 40 hours for doubling times of 5, 4, and 6 months. An answer is correct when it is within ±1 month of the value in Content. Mastery is 3 of 3 correct. Moving the slider afterward is exploration.

**Misconceptions:** (1) A small change in doubling time makes only a small change in the date. (2) The time to reach a target is proportional to the target. (3) A forecast has one answer.

**Instructional Rationale:** Calculating time to a target from the number of doublings makes the multiplication of doubling time by doublings explicit. Committing to three calculations first, then exploring, shows the learner that a one-month change in doubling time moves the date by about five or six months.

**Content:**

Rule shown: the time to reach a target = (number of doublings needed) × (doubling time). The number of doublings needed is log base 2 of (target ÷ starting value). For a start of 50 minutes and a target of 40 hours (2,400 minutes), the target is 48 times the start, which needs about 5.6 doublings.

Inputs:

| Input | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Doubling time | 3 | 12 | 1 | 5 | months |
| Target horizon | 3 choices | | | 40 hours | |

The three targets: 5 hours (6 times the start, about 2.6 doublings), 40 hours (48 times the start, about 5.6 doublings), and 160 hours (192 times the start, about 7.6 doublings).

Check values at the 40-hour target:

| Doubling time (months) | Months to reach 40 hours |
|---|---|
| 4 | 22 |
| 5 | 28 |
| 6 | 34 |
| 10 | 56 |

Check values for other targets at a 5-month doubling time: 5 hours takes 13 months and 160 hours takes 38 months.

**Provenance:** The start value of 50 minutes and the formula come from the chapter and Chapter 4. The targets are illustrative. The sim must label its output "Illustrative projection, not a forecast."

**Rules:** Start value = 50 minutes. Number of doublings n = log2(target in minutes ÷ 50). Months to target = n × doubling time, rounded to the nearest whole month. Targets in minutes are 300, 2,400, and 9,600.

**Learner Activity:**

1. The learner is shown the number of doublings for the 40-hour target and answers the three questions (doubling times of 5, 4, and 6 months).
2. The learner submits. The sim checks the answers and shows the 28, 22, and 34 months on a timeline.
3. The learner moves the doubling time from 3 to 12 months and switches targets. The months to target update at once.
4. The learner should notice that a one-month change in doubling time moves the date for the 40-hour target by about five or six months.

**Feedback:** Three questions, fixed order, two attempts each. Correct: "Correct: about [value] months." Incorrect: "Multiply the number of doublings, 5.6, by the doubling time in months." After the second wrong attempt, the value and working are shown. A score "n of 3" is shown.

**Starting State:** The doubling time is locked at 5 months, the 40-hour target is selected, and the prompt reads "How many months until the horizon reaches 40 hours?"

**Chapter Anchors:** The chapter states a 50-minute start, targets of 40 hours (28 months at a 5-month doubling) and 160 hours (about 38 months), and sensitivities of 22 and 34 months for doubling times of 4 and 6 months.
</details>

## Limits to AI Growth

A trend is a statement about the past. What keeps it going, and what could stop it? This section defines the main factors.

**Compute scaling** is the practice of improving AI capability by using more computing power to train and run models. Epoch AI, a research group that tracks AI trends, has estimated that the computing power used to train the largest AI models has grown by roughly four to five times per year since around 2010. A large share of recent capability gains has come from this scaling, in combination with better algorithms and more data.

The **limits to AI growth** are the constraints that could slow the trend. Researchers point to several:

- **Money.** Training the largest models now costs hundreds of millions of dollars, and each step costs more than the last.
- **Chips and power.** Advanced chips are made by a small number of factories, and data centers need large amounts of electricity and grid connections.
- **Data.** The supply of high-quality human-written text is finite, and some analyses suggest the best of it could be used up within years.
- **The gap between benchmarks and the world.** Gains on tasks with clear right answers may not carry over to messy, open-ended work.
- **Reliability.** Progress at the 50 percent horizon may not translate into the reliability needed to trust a system with a long task.
- **Regulation and trust.** Laws, safety concerns, and public opinion can slow deployment even when the technology is ready.

None of these is certain to bind. Each is a reason the trend might bend, and each has an offsetting argument: algorithmic efficiency improves, synthetic data can supplement human text, and chips keep getting more efficient.

### AI Energy Use and Data Center Energy

**AI energy use** is the electricity consumed by training and running AI models, and **data center energy** is the electricity consumed by the large facilities that house the computers doing the work. Both matter because energy is one of the limits above and because a school's choice of AI tool has an environmental footprint.

The International Energy Agency estimated that data centers used roughly 1.5 percent of the world's electricity in 2024, and projected that their consumption could roughly double by 2030, with AI a main driver. A typical text exchange with a chatbot is estimated at a few tenths of a watt-hour, about the energy of a web search; generating images, video, and long agentic tasks use much more.

### Worked Example: The Energy of a Tutoring Year

Take the Chapter 4 tutoring session, about 40 exchanges, and assume 0.3 watt-hours per exchange, an illustrative figure.

\[
40 \times 0.3 \text{ Wh} = 12 \text{ Wh per session}
\]

For a class of 28 students, one session each per day for 180 days, the total is \( 28 \times 12 \times 180 = 60{,}480 \) watt-hours, or about 60 kilowatt-hours, less than one percent of what a typical U.S. household uses in a year (about 10,000 kilowatt-hours). Scaled to 50 million students it is about 108 gigawatt-hours, or about 0.1 terawatt-hours, about three hundredths of one percent of the data centers' 2024 total of about 415 terawatt-hours. Chatbot tutoring is therefore not an energy problem on its own. The picture changes if every student runs long agent tasks, generates video, or uses the largest models all day, which is one reason the course description's design uses AI mainly to write content once and serve it as ordinary web pages. Writing a chapter once and serving it to a million students costs about the same energy as one run, not a million.

## Falling AI Costs and Chatbots

Chapter 4 defined AI inference cost. **Falling AI costs** names the trend that the price of a given level of AI capability keeps dropping. The Stanford AI Index 2025 reported a more than 280-fold drop in the price of GPT-3.5-level performance in under two years, and analyses by Epoch AI found large but uneven declines across capability levels, from roughly tenfold to hundreds-fold per year. As with the horizon, two forces combine: the capability available at a fixed price rises, and the price of fixed capability falls.

A decline of ten times per year compounds. A yearly tutoring cost of \$72, the Chapter 4 figure at the 2022 price, would become \$7.20 after one year, \$0.72 after two, and \$0.07 after three, about a thousandfold in all. The same caveat holds: the fall applies to a *fixed* capability level, and the newest systems cost more.

A **chatbot** is a conversational interface to an AI system, usually an LLM, through which a person exchanges messages with it in natural language. A chatbot is a *way of using* a model, and it is the form in which most students and teachers first meet AI. It is also the basis of level 4 in the book's five-level model of intelligent textbooks (Chapter 6). Because a chatbot can answer almost anything, it is flexible, and because it answers fluently whether or not it is right, it is also risky.

## AI Hallucination and AI Literacy

**AI hallucination** is the generation by an AI system of content that is fluent and confident but false or unsupported, such as an invented fact, a fabricated quotation, or a citation to a paper that does not exist. It happens because an LLM generates likely-sounding text, and it has no built-in check on whether the statement is true. Rates vary widely by model and task, and independent leaderboards that test summarization have found rates from about one percent to over ten percent depending on the model, with higher rates on harder questions.

The consequences are not hypothetical. In 2023 a New York lawyer submitted a legal brief containing court cases that a chatbot had invented, and a federal judge sanctioned the lawyers involved. For students, a hallucinated quotation in an essay or a wrong step in a math explanation can be learned as fact.

There are partial remedies. A model can be *grounded* in a vetted source, so that it answers from a given document rather than from memory; it can be asked to cite its sources, which can then be checked; and a human can verify anything that matters. None eliminates the problem, so people need the skills to catch it.

**AI literacy** is the set of knowledge and skills that lets a person understand what AI systems are, use them effectively, evaluate their outputs critically, and recognize their risks and ethical implications. It is to AI what reading comprehension is to text: a skill that everyone needs, not only specialists. The European Union's AI Act, which began requiring organizations to ensure AI literacy among their staff in February 2025, and curriculum frameworks developed by the OECD and the European Commission for primary and secondary schools, treat it as a basic competence.

### Worked Example: A One-Hour "Verify It" Lesson

A teacher gives students a short passage and an AI-written summary of it that contains six statements, two of which are wrong. Students mark each statement as *supported by the passage* or *not supported*, and find the sentence in the passage that proves each answer. After the activity students know three things from direct experience: the AI summary was mostly right, it was wrong in a confident tone, and the only way to tell was to check against the source. The sim below practices the same skill.

#### Diagram: Verify the AI Summary

<details markdown="1">
<summary>Verify the AI Summary</summary>
Type: microsim
**sim-id:** verify-the-ai-summary<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge whether each of six statements in an AI-written summary is supported by a source passage, correctly judging at least five of six on the first attempt.

**Prerequisites:** AI hallucination, grounding in a source, AI literacy (all defined in the section "AI Hallucination and AI Literacy" above).

**Evidence of Mastery:** The learner marks each of 6 statements as Supported or Not supported and submits it. A mark is correct when it matches the "Correct mark" column in Content. Mastery is 5 of 6 correct on the first attempt. Reading the passage is exploration, not evidence.

**Misconceptions:** (1) A confident, fluent statement is probably correct. (2) A statement that sounds plausible is supported. (3) A summary that is mostly right can be trusted whole.

**Instructional Rationale:** Judging a statement requires the learner to compare it with a source, which is the central habit of AI literacy. Mixing statements that are correct, subtly changed, and invented shows that fluency gives no clue to accuracy.

**Content:**

Source passage shown in full (fictional, written for this chapter):

"Lincoln Middle School ran a six-week pilot of a math program with 280 seventh graders. A computer randomly assigned 140 students to use the program for 30 minutes a day and 140 to continue as normal. At the end of the pilot, the program group scored an average of 34 points on a 50-point test and the comparison group scored an average of 30. The standard deviation of scores was 10 points. Six teachers were interviewed. They said the dashboard was useful, but two teachers used the tablets only on Fridays."

Six statements in an AI-written summary:

| # | Statement | Correct mark | Why (shown as feedback) |
|---|---|---|---|
| 1 | The pilot involved 280 seventh graders. | Supported | The passage states 280 seventh graders. |
| 2 | Students were assigned to groups at random. | Supported | The passage says a computer randomly assigned them. |
| 3 | The program group scored 34 on average, four points above the comparison group. | Supported | The passage gives 34 and 30. |
| 4 | The pilot lasted a full semester. | Not supported | The passage says six weeks, not a semester. |
| 5 | All six teachers used the tablets every day. | Not supported | Two teachers used the tablets only on Fridays. |
| 6 | An independent university team ran the evaluation. | Not supported | The passage does not say who ran the evaluation. |

**Provenance:** The passage is the Chapter 2 pilot rewritten as a short text. The statements are illustrative. The sim must label the passage and summary "Fictional, for practice."

**Rules:** Each statement has exactly one correct mark. A statement is scored on its first submitted mark only. The score counts first-attempt correct marks out of 6. Mastery is a score >= 5. Missing information counts as Not supported.

**Learner Activity:**

1. The learner reads the passage and the six statements.
2. For each statement, the learner marks Supported or Not supported and submits. The sim marks it and shows the feedback and the matching sentence of the passage, if any.
3. If incorrect, the learner may re-mark; the second attempt does not change the score. After the second attempt, the correct mark and reason are shown.
4. After all 6, the sim shows the score.
5. The learner should notice that statement 6 sounds reasonable but has no support in the passage.

**Feedback:** 6 statements, fixed order, two attempts each. Correct: "Correct: [mark]. [Why text]." Incorrect: "Not quite. Look for a sentence in the passage that says this. [Why text]." After the second attempt the correct mark is revealed and the statement counts as missed. A running score "First-try correct: n of 6" is shown. Final message for a score >= 5: "You checked the summary against its source." For a score < 5: "Reread the passage and try again."

**Starting State:** The passage and the first statement are shown, with the score "First-try correct: 0 of 6," and the prompt "Does the passage support this statement?"

**Chapter Anchors:** The passage uses the Chapter 2 pilot figures: 280 students, 140 per group, 30 minutes a day, six weeks, averages of 34 and 30, standard deviation 10, and six teachers. The mastery bar is 5 of 6.
</details>

## Planning Under Uncertainty

A forecast with a wide range still has to be turned into a decision. **Planning under uncertainty** is the practice of making decisions that remain sensible across a range of possible futures instead of betting on one. Several techniques are standard.

- **Scenarios.** Describe two or three distinct futures, such as "trend continues," "trend halves," and "trend stalls," and test each decision against all of them.
- **No-regret moves.** Prefer actions that pay off in every scenario, such as training teachers in AI literacy, tightening student data governance, and piloting mastery-based pacing.
- **Reversible decisions.** Choose short contracts, pilots, and options that can be undone, and avoid long lock-in until the picture clears.
- **Trip-wires.** Decide in advance which observations, such as a vendor's independent evaluation or a stalled horizon measurement, would change the plan.

**Prediction assumptions** are the conditions that must hold for a forecast to be right. Stating them is a discipline: it turns "AI will do X" into "AI will do X *if* these things stay true." For the book's three-to-four-year forecast the main assumptions are:

1. The doubling trend of the task horizon continues at about five months.
2. Gains on benchmark tasks carry over to real work.
3. Reliability, not just the 50 percent horizon, improves enough to be trusted.
4. The price per unit of capability keeps falling.
5. Schools have the devices, connectivity, and trained staff to use the tools.
6. Privacy law and public acceptance permit adoption.

A **prediction failure scenario** is a specific, described way a forecast could turn out wrong, used to test whether a plan survives it. Three for this book: *the trend stalls* (compute, energy, or data limits bind and the horizon grows slowly); *the benchmarks mislead* (horizons grow on test tasks but not on real classroom work); and *the tools arrive but trust does not* (privacy scandals or harm to students lead to bans). A plan that works only in the best case is not a plan.

The final term links the forecast to the book's purpose. **AI prediction for schools** is the specific forecast this book works from: that within about three to four years almost every student could have access to a free, high-quality, interactive, adaptive textbook, because AI will be able to author such textbooks at very low cost. It rests on the horizon arithmetic you saw above, together with falling costs. It is a prediction about *content*, which can be written once and then served cheaply, and not a prediction that each student will have a human-level private tutor.

!!! mascot-thinking "Build the plan so it survives being wrong"
    ![Indigo thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice what makes a no-regret move: it is useful whether or not the forecast comes true. Teaching students to check AI outputs, protecting student data, and letting students move at their own pace are all worth doing even if AI progress stalls tomorrow. That is the test to apply to every item on a school's AI plan.

### Worked Example: A Three-Scenario Table for Lincoln Middle

Ms. Okafor brings the board a table that tests four decisions against three futures.

| Decision | Trend continues | Trend halves | Trend stalls | Verdict |
|---|---|---|---|---|
| Train all teachers in AI literacy | Strongly useful | Useful | Still useful: students already use chatbots | No-regret: do now |
| Adopt a student data-governance policy | Essential | Essential | Still required by law | No-regret: do now |
| Pilot self-paced math in one grade | Early lessons | Useful | Useful: pacing helps regardless | No-regret: do now |
| Sign a five-year contract for one vendor's AI tutor | Risky: better tools will arrive | Uncertain | Wasteful if the vendor fails | Avoid: prefer one-year terms |

The last row is the useful one. A long contract is a bet on one future, and the first three decisions are bets on all of them. This is the approach the book recommends and returns to in Chapters 20 and 21.

## Answering Mr. Alvarez and Mr. Dang

Mr. Alvarez asked why the line should keep going, and what to do if it does not. The honest answer has three parts. The line *might* keep going, because the forces behind it, more computing power, better methods, and falling costs, are still in play, and because past forecasts of AI progress have been wrong in both directions. It might not, because each of those forces has limits, and benchmark progress might not carry over to real work. And a school does not need to decide which: it needs a plan built on no-regret moves, short contracts, and stated trip-wires.

Mr. Dang's concern, that every earlier technology was oversold, deserves its own answer. The pattern from Chapter 3 is real: tools arrive, are absorbed into old routines, and underdeliver. What is different here is not that this time the promises are bigger, but that there is a *measurement*, imperfect and preliminary, that can be checked every few months, and one that has so far kept rising. A skeptic should watch the measurement.

The story has both sides. The benefit: if the trend holds, high-quality adaptive content could be cheap for every student, and teachers could be freed from routine work. The risks: a school that plans around a forecast that fails, spends heavily on tools that disappoint, and leaves students handing their thinking to systems that hallucinate. The response: no-regret moves, short commitments, and teaching students and staff to verify.

## Key Takeaways

- **Linear growth** adds a fixed amount per period and **exponential growth** a fixed factor; early data cannot tell them apart, but three years out they differ by a factor of about eighteen in our example.
- A **logarithmic scale** gives equal distance to equal multiples; on a **log-scale chart**, constant doubling plots as a straight line, and distance counts doublings.
- **Trend extrapolation** works until the forces behind the trend change; many exponentials turn out to be the early part of an S-curve.
- A **planning window** of three to five years is how long a school decision has to hold up; the **three-to-four-year forecast** applies five-month doubling over that window.
- On the central trend a 50 percent horizon passes 40 hours in about 28 months, and passes the 160 hours needed for an 80 percent horizon in about 38 months, which underlies the book's **AI prediction for schools**.
- **Forecast uncertainty** is dominated by the doubling time: four months versus six months changes the three-year answer by a factor of eight.
- **Compute scaling** powers the trend; the **limits to AI growth** include money, chips and power, data, the benchmark-to-world gap, reliability, and regulation.
- **AI energy use** and **data center energy** are modest for chatbot tutoring (about 12 watt-hours per session, in our example) and larger for video and agent tasks.
- **Falling AI costs** compound; a **chatbot** is the conversational way of using a model.
- **AI hallucination** is fluent, confident falsehood, and **AI literacy** is the habit of checking against a source.
- **Planning under uncertainty** means scenarios, **no-regret moves**, reversible decisions, and trip-wires, built on stated **prediction assumptions** and tested against a **prediction failure scenario**.

!!! mascot-celebration "You can read the curve and its limits"
    ![Indigo celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You just learned to read a log-scale chart, project the five-month doubling over a planning window, state the assumptions behind it, and pick moves that survive being wrong. Chapter 6 turns from the forecast to the product: the five-level model that lets you say exactly what kind of intelligent textbook you're being sold. One step at a time, together.
