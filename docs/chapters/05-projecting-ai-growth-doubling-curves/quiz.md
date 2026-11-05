# Quiz: Projecting AI Growth: Doubling Curves, Limits, and Uncertainty

Test your understanding of log-scale charts, multi-year AI forecasts, their assumptions and limits, and how to plan under uncertainty with these review questions.

---

#### 1. What defines a logarithmic scale on a chart axis?

<div class="upper-alpha" markdown>

1. Equal distances along the axis represent equal multiples rather than equal amounts
2. Equal distances along the axis represent equal amounts, such as 0, 100, 200, 300
3. The axis starts at zero and doubles its spacing with each new gridline
4. The axis shows percentages of the final value rather than raw numbers
</div>

??? question "Show Answer"
    The correct answer is **A**. On a logarithmic scale, equal distances stand for equal multiples: in the base-ten version the gridlines read 1, 10, 100, 1,000, and the distance from 1 to 10 equals the distance from 10 to 100. The second option describes an ordinary linear axis. A log axis cannot start at zero, and its gridlines are evenly spaced, not doubling in spacing. This property is why constant doubling plots as a straight line on a log-scale chart.

    **Concept Tested:** Logarithmic Scale

    **See:** [Reading a Logarithmic Chart](index.md#reading-a-logarithmic-chart)

---

#### 2. In the chapter's comparison, linear and exponential projections from a 50-minute horizon are nearly the same at 12 months. Why does this matter?

<div class="upper-alpha" markdown>

1. It shows the exponential trend is an illusion that disappears in real data
2. It proves that linear growth is the safer assumption for school planning
3. Early data cannot tell the two shapes apart, though they diverge hugely later
4. It shows that both models reach the same value at every later point as well
</div>

??? question "Show Answer"
    The correct answer is **C**. At 12 months the linear projection gives 2.8 hours and the exponential about 4.4 hours, so early data look similar. By 36 months the exponential value is about 18 times the linear one, and by 48 months about 73 times. The chapter says people who understand a doubling trend and people extrapolating a straight line are disagreeing about the shape, not the facts. The near-match early on is exactly what makes the shape hard to see, not a sign either model is wrong.

    **Concept Tested:** Linear Growth

    **See:** [Linear Versus Exponential Growth](index.md#linear-versus-exponential-growth)

---

#### 3. On a base-ten log-scale chart, a trend line with a five-month doubling time climbs two full gridlines, a factor of 100. About how long did that take?

<div class="upper-alpha" markdown>

1. About 10 months
2. About 20 months
3. About 50 months
4. About 33 months
</div>

??? question "Show Answer"
    The correct answer is **D**. Each base-ten gridline is a tenfold increase and contains a little over three doublings, since \( 2^{3.32} \approx 10 \). Two gridlines is a factor of 100, or about 6.6 doublings, and at five months each that is about 33 months. The 10-month answer counts one doubling per gridline. The 20-month answer counts two doublings per gridline. Reading a log chart means translating distance into doublings and doublings into time.

    **Concept Tested:** Log-Scale Chart

    **See:** [Reading a Logarithmic Chart](index.md#reading-a-logarithmic-chart)

---

#### 4. On a log-scale chart of AI task horizons, the trend line begins to bend downward. What does that indicate?

<div class="upper-alpha" markdown>

1. The horizon has started to shrink, so AI systems are losing capability
2. Growth is slowing, so the doubling time is getting longer
3. Growth has become faster than exponential, so doublings are speeding up
4. The data have switched from a log scale to a linear scale
</div>

??? question "Show Answer"
    The correct answer is **B**. On a log-scale chart, a straight line means a constant doubling time. A line that bends upward means growth faster than exponential, and a line that bends downward means growth is slowing. A downward bend does not mean the horizon is falling; it can still be rising, just by smaller multiples per period. The chapter's rules for reading a log chart are to check the axis, read straight as constant doubling, and treat distance as a ratio.

    **Concept Tested:** Log-Scale Chart

    **See:** [Reading a Logarithmic Chart](index.md#reading-a-logarithmic-chart)

---

#### 5. A school board is unsure whether AI progress will continue, halve, or stall. Which decision is a no-regret move under the chapter's planning approach?

<div class="upper-alpha" markdown>

1. Train all teachers in AI literacy
2. Sign a five-year contract with one AI tutor vendor
3. Buy a device fleet sized for the central forecast
4. Postpone all AI decisions until the trend is settled
</div>

??? question "Show Answer"
    The correct answer is **A**. A no-regret move pays off in every scenario. Training teachers in AI literacy is useful even if the trend stalls, because students already use chatbots. A five-year single-vendor contract is a bet on one future and is wasteful if the vendor fails, so the chapter recommends one-year terms instead. Sizing purchases to the central forecast ignores the range. Waiting gives up no-regret gains, such as data governance and pacing pilots, that are worth doing regardless.

    **Concept Tested:** Planning Under Uncertainty

    **See:** [Worked Example: A Three-Scenario Table for Lincoln Middle](index.md#worked-example-a-three-scenario-table-for-lincoln-middle)

---

#### 6. What is AI hallucination?

<div class="upper-alpha" markdown>

1. An AI system refusing to answer a question it was not trained on
2. An AI system slowing down when too many users send requests at once
3. An AI system copying text word for word from the data it was trained on
4. An AI system generating confident content that is false or unsupported
</div>

??? question "Show Answer"
    The correct answer is **D**. Hallucination is fluent, confident output that is false or unsupported, such as an invented fact, a fabricated quotation, or a citation to a paper that does not exist. It happens because an LLM generates likely-sounding text with no built-in check on truth. The 2023 case of a lawyer sanctioned for citing invented court cases is the chapter's example. Grounding, citation checking, and human verification reduce but do not eliminate it.

    **Concept Tested:** AI Hallucination

    **See:** [AI Hallucination and AI Literacy](index.md#ai-hallucination-and-ai-literacy)

---

#### 7. A consultant tells a district, "In three years the AI task horizon will be 122 hours." What does the chapter say an honest forecast should add?

<div class="upper-alpha" markdown>

1. A guarantee that the figure will be reached, backed by the vendor's track record
2. A more precise starting value, since that is the main source of error
3. A range, since a one-month change in doubling time shifts the answer two- or threefold
4. A list of schools that have already reached that horizon in their classrooms
</div>

??? question "Show Answer"
    The correct answer is **C**. Forecast uncertainty grows the further a forecast looks, and in an exponential forecast the doubling time dominates because it sits in the exponent. Moving from five to four or six months shifts the three-year answer by a factor of about two or three, and the four- and six-month ends differ by a factor of eight. The chapter says precision about the doubling time matters more than precision about the starting value, so the second option is the tempting reversal.

    **Concept Tested:** Forecast Uncertainty

    **See:** [Forecast Uncertainty](index.md#forecast-uncertainty)

---

#### 8. The book's design uses AI mainly to write content once and serve it as ordinary web pages, rather than running a live chatbot session for every student all day. What reasoning from the chapter supports that choice?

<div class="upper-alpha" markdown>

1. Chatbot tutoring uses more electricity than all other data center work combined
2. Content written once costs about one run of energy, however many students read it
3. Web pages cannot hallucinate, so they need no review by teachers before use
4. Live chatbots are banned in public school classrooms under the EU AI Act
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter notes that writing a chapter once and serving it to a million students costs about the same energy as one run, not a million. Its AI prediction for schools is about content that can be written once and served cheaply, not a private human-level tutor for every student. Chatbot tutoring is modest in energy, about 12 watt-hours per session in the example, so the first option overstates it. AI-written content still needs checking, and the EU AI Act is cited for AI literacy, not a chatbot ban.

    **Concept Tested:** AI Prediction for Schools

    **See:** [Worked Example: The Energy of a Tutoring Year](index.md#worked-example-the-energy-of-a-tutoring-year)

---

#### 9. According to the chapter, when does trend extrapolation tend to fail?

<div class="upper-alpha" markdown>

1. When the forces that produced the past pattern change
2. When the trend has been measured for more than a few years
3. When the data are plotted on a logarithmic scale
4. When the trend involves costs rather than capabilities
</div>

??? question "Show Answer"
    The correct answer is **A**. Trend extrapolation extends a past pattern on the assumption that the forces behind it continue. It works over short spans and fails exactly when those forces change, which is when the forecast matters most. Moore's law held for decades and then slowed near physical limits, and many exponential-looking trends turn out to be the early part of an S-curve. A long record or a log scale does not by itself make extrapolation fail.

    **Concept Tested:** Trend Extrapolation

    **See:** [Projecting the Trend](index.md#projecting-the-trend)

---

#### 10. A teacher estimates that building a full interactive unit takes about 800 minutes of skilled human work. Starting from a 50 percent horizon of 50 minutes and five-month doubling, when would the 50 percent horizon reach that length on the central trend?

<div class="upper-alpha" markdown>

1. About 80 months
2. About 16 months
3. About 20 months
4. About 4 months
</div>

??? question "Show Answer"
    The correct answer is **C**. The target is 800 / 50 = 16 times the starting horizon, which is four doublings, since \( 2^4 = 16 \). Four doublings at five months each is 20 months. The 16-month answer confuses the growth factor with months, the 4-month answer gives the number of doublings, and the 80-month answer multiplies 16 by five. As the chapter shows, a 50 percent horizon still means failure half the time, so a reliable result would come later.

    **Concept Tested:** Three-to-Four-Year Forecast

    **See:** [Worked Example: When Could AI Build a Textbook Chapter?](index.md#worked-example-when-could-ai-build-a-textbook-chapter)
