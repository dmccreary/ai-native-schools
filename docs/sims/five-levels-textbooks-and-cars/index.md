---
title: "Five Levels: Textbooks and Self-Driving Cars"
description: "An interactive grid poster that sets the six SAE J3016 levels of driving automation above the five levels of intelligent textbooks, with the shared Level 3 threshold and the rule for testing a vendor's level claim."
status: built
social:
   cards: false
hide:
    - toc
---

<iframe src="main.html" height="720px" width="100%" scrolling="no"></iframe>

[Run the Five Levels: Textbooks and Self-Driving Cars MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 6: The Five-Level Model of Intelligent Textbooks](../../chapters/06-five-level-model-intelligent-textbooks/index.md){ .md-button }

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/five-levels-textbooks-and-cars/main.html"
        height="720px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

This poster puts the two ladders from Chapter 6 side by side. The top row shows the six levels of driving automation from the SAE J3016 standard, from a driver with both hands on the wheel to a pod with no steering wheel at all. The bottom row shows the five levels of intelligent textbooks, from a closed print book to a laptop that writes pages on the fly. Both rows rise like a staircase from left to right, because higher levels shift more of the work from the human to the system.

The two ladders do not match one to one, and the poster does not pretend they do. SAE J3016 has six levels, numbered 0 to 5. The textbook model has five, numbered 1 to 5, and starts at static content instead of a human doing everything. So the textbook levels sit under car levels 1 to 5 by number only, and car Level 0 has no textbook partner. The chapter's own claim about the two ladders is narrower: in both, the rules change at **Level 3**. For cars, that is where the system takes primary control and liability questions arise. For textbooks, it is where the system starts keeping a record about each student and privacy questions arise. The dashed amber line marks that threshold in both rows.

The empty cell under car Level 0 holds the story-balance zone. Each level adds power, and each also adds cost, data and things that can go wrong. Vendors often claim a higher level than they deliver: the glossy brochure shows five bars, and the magnifying glass finds two. The chapter's response is the rule that a product's level is the highest defining capability it *actually delivers to students in use*.

## How to Use

- **Explore:** hover over a column to see its label, then click it to read the summary and facts below the poster.
- **Quiz Me:** click **Quiz Me**. The sim describes a car or a textbook, and you click the cell where it belongs. Your score shows next to the buttons.
- **Calibrate (authors):** open [`main.html?edit=true`](./main.html?edit=true) to drag zone corners, then copy the JSON into `data.json`.

## The 12 Zones

Top row, the SAE J3016 levels of driving automation:

1. **SAE 0: No driving automation**: a driver with both hands on the wheel; the car only beeps a warning
2. **SAE 1: Driver assistance**: radar waves keep a set distance from the car ahead
3. **SAE 2: Partial automation**: the car keeps its lane, but an eye shows the human must watch
4. **SAE 3: Conditional automation**: the driver reads in a traffic jam until the bell asks for a takeover
5. **SAE 4: High automation**: a driverless taxi inside the posts of a mapped city
6. **SAE 5: Full automation**: a pod with no steering wheel on a mountain road

Bottom row, the five-level textbook model:

7. **Claimed vs. delivered level**: a glossy brochure claims five bars; the magnifying glass finds two
8. **Level 1: Static**: a closed print book and a PDF page
9. **Level 2: Interactive**: a laptop with a slider, a graph and a checked quiz card
10. **Level 3: Adaptive**: a branching path and a locked student record
11. **Level 4: Chatbot**: a tutoring conversation in chat bubbles
12. **Level 5: Autonomous**: pages generated on the fly, with a teacher checking one through a magnifying glass

The image is a text-free SVG made by `make-five-levels-svg.py` in this folder. The script also prints the zone positions used in `data.json`.

For practice placing real products on the ladder, try the [Product Level Classifier](../product-level-classifier/index.md) MicroSim.

## Lesson Plan

### Learning Objective

The learner will compare the six SAE J3016 levels of driving automation with the five levels of intelligent textbooks, and explain why both frameworks put their key threshold at Level 3.

### Audience

School and district leaders, teachers, curriculum coordinators and anyone who buys or reviews instructional products.

### Duration

10 minutes.

### Activities

1. **Explore (5 minutes):** click the top row from left to right, then the bottom row. For each textbook level, note what it needs to know about the student.
2. **Find the threshold (2 minutes):** look at the dashed line. Say in one sentence what new question each row raises on the right side of it.
3. **Quiz (3 minutes):** run Quiz Me until you can place every description without hovering first.

### Assessment

The learner places at least 9 of 10 quiz descriptions correctly and can explain, using Ms. Okafor's three vendor emails, why a product's level is set by what it delivers rather than what its brochure claims.

## References

- Chapter 6, [The Five-Level Model of Intelligent Textbooks](../../chapters/06-five-level-model-intelligent-textbooks/index.md): the SAE level table, "The Five Levels at a Glance", the five-level summary table and the level-specific safeguards. Every label and fact in this poster comes from that chapter.
- SAE International. *SAE J3016*, the standard that defines the levels of driving automation (first published 2014), as cited in Chapter 6.
- McCreary, D. (2025, December). *A Five-Level Classification Framework for Intelligent Textbooks: Lessons from Autonomous Vehicle Standards*. Preprint, as cited in Chapter 6.
