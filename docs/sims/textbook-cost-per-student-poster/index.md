---
title: "What a Textbook Costs per Student"
description: "An interactive poster that answers a finance director's question with four stacks of cost blocks, print and Levels 2 to 4, drawn to scale, with the faded laptop a school may also have to buy standing behind them."
status: built
social:
   cards: false
hide:
    - toc
---

<iframe src="main.html" height="720px" width="100%" scrolling="no"></iframe>

[Run the What a Textbook Costs per Student MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 7: Content Economics and Open Educational Resources](../../chapters/07-content-economics-open-educational/index.md){ .md-button }

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/textbook-cost-per-student-poster/main.html"
        height="720px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

At the district budget meeting in Chapter 7, the finance director, Mr. Patel, asks what a textbook will cost per student, per year, all in. This poster answers with a picture. Four stacks stand on a table: a pile of print textbooks and the Level 2, Level 3 and Level 4 digital textbooks. Each block is one cost item, and each item has the same color in every stack.

The heights are to scale. One dollar is the same height everywhere, so the print pile (about \$53.33) stands more than nine times taller than the Level 2 stack (\$5.80). The Level 3 stack is \$12.80 and the Level 4 stack is \$23.00, with the glowing chat-bubble block for AI inference on top.

Behind the stacks stands a faded laptop. It is not part of any stack, because the chapter's totals assume the school already owns its devices. Its height above the table is drawn on the same scale: \$75 a year for a \$300 laptop over four years. That one picture carries the poster's three-part story. The benefit is that content costs collapse. The risk is the hidden costs, the device, training and governance, that a software price leaves out. The response is a total-cost-of-ownership model with stated assumptions.

**All figures are illustrative.** They come from the comparison table in the Chapter 7 section "Putting a Cost on Each Level", and a district should replace them with its own quotes.

## How to Use

- **Explore:** click a stack or the faded laptop. The panel shows its cost per student per year and how the blocks add up.
- **Quiz Me:** the poster names a cost or a total, and you click the stack or the laptop it belongs to. Your score shows next to the buttons.
- **Calibrate (authors):** open [`main.html?edit=true`](./main.html?edit=true) to drag zone corners, then copy the JSON into `data.json`.

## The 5 Zones

1. **Print baseline**: one tall pile of closed books, about \$53.33 (an \$80 book, six years, four core subjects)
2. **Level 2**: content and hosting \$1.80 (blue) plus training \$4.00 (gold), \$5.80
3. **Level 3**: adds a records platform \$3.00 (purple) and privacy governance \$2.00 (green); training \$6.00; \$12.80
4. **Level 4**: adds guardrail log review \$1.00 (thin red), training \$8.00 and AI inference \$7.20 (glowing orange with a chat bubble); \$23.00
5. **The device (faded)**: a laptop behind the stacks, \$75 a year, not included in any stack

Block colors, bottom to top: blue content and hosting, purple records platform, green privacy governance, red guardrail log review, gold teacher training, orange AI inference.

The image is a text-free SVG made by `make-cost-stacks-svg.py` in this folder. The script computes every block height from the chapter's figures at about 7.87 pixels per dollar and prints the stack heights and zone positions used in `data.json`.

To practice the arithmetic behind these stacks, try the [Cost per Student by Level](../cost-per-student-by-level/index.md) MicroSim, which follows this poster in the chapter.

## Lesson Plan

### Learning Objective

The learner will compare the yearly cost per student of print and of Level 2, 3 and 4 digital textbooks, name the cost items that each level adds, and explain why the cost of a device can outweigh every software item.

Bloom level: Analyze (verb: compare).

### Audience

School board members, district finance and technology staff, school leaders and teachers.

### Duration

10 minutes.

### Activities

1. **Explore (4 minutes):** click the four stacks from left to right. For each digital level, name the blocks it adds to the level before it.
2. **Compare (3 minutes):** click the faded laptop. Why is it drawn behind the stacks and not on top of them? What happens to the gap between print and Level 4 when a district has to buy devices?
3. **Quiz (3 minutes):** run Quiz Me until you can place all five costs without exploring first.

### Assessment

The learner places at least 4 of 5 costs in Quiz Me mode and can explain, in one or two sentences, why Mr. Patel's question cannot be answered by comparing software prices alone.

## References

1. Chapter 7, "Putting a Cost on Each Level": the source of every figure on this poster. All values are illustrative.
2. [Total cost of ownership](https://en.wikipedia.org/wiki/Total_cost_of_ownership). Wikipedia. Counting every cost over the life of a purchase.
3. [Open educational resources](https://en.wikipedia.org/wiki/Open_educational_resources). Wikipedia. Free-to-use content that still has running costs.
