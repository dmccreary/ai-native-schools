---
title: "Product Level Classifier"
description: "Judge the real level of eight fictional learning products and label each vendor claim an overclaim, accurate, or an underclaim."
image: /sims/product-level-classifier/product-level-classifier.png
og:image: /sims/product-level-classifier/product-level-classifier.png
twitter:image: /sims/product-level-classifier/product-level-classifier.png
social:
   cards: false
status: built
quality_score: 100
---

# Product Level Classifier

<iframe src="main.html" height="664px" width="100%" scrolling="no"></iframe>

[Run the Product Level Classifier MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 6: The Five-Level Model of Intelligent Textbooks](../../chapters/06-five-level-model-intelligent-textbooks/index.md){ .md-button }

To edit the sketch, paste the contents of `product-level-classifier.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor's p5.js version to 2.x. The learning content is in the `CONFIG` block near the top of the file.

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/product-level-classifier/main.html"
        height="664px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

A product's level is the **highest defining capability it actually delivers** to students, not the words in its marketing. "AI-powered" does not make a product Level 3, and a product with no AI model can still be Level 3 if it adapts from a stored record.

For each of eight fictional products you read the description and the vendor's claimed level, assign the actual level, and press **Submit**. After each product the claim is labeled **Overclaim**, **Accurate**, or **Underclaim**. The results screen counts the three kinds of claim.

The level definitions follow the Chapter 6 section "The Five Levels at a Glance." The products are fictional, written for that chapter.

## How to Use

Nothing moves until you act, and the MicroSim does not store your answers.

- **Level 1 to Level 5:** assign the level of the highest capability the product delivers.
- **Submit:** commits it. Two attempts per product; only the first counts.
- **Next:** moves on; after the eighth it shows your score and the claim summary.
- **Show level definitions:** checkbox that shows the defining capability of each level.
- **Try again:** reshuffles the products and starts over.

Judge the features, not the marketing words. Ask: does it respond, does it store a record, does it converse, does it generate the textbook itself?

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner will **judge** the level of eight fictional learning products by assigning each the highest defining capability it delivers, and will identify whether the vendor's claimed level is an overclaim, accurate, or an underclaim, correctly assigning at least seven of eight levels on the first attempt. (Bloom level: Evaluate.)

### Audience

Teachers, administrators, school board members, education policymakers, and parents.

### Duration

15 minutes.

### Prerequisites

- The five levels and their defining capabilities, vendor level claims, and AI-powered marketing claims, from Chapter 6.

### Activities

1. **Review (2 min).** Read the five definitions. Write the one question that separates each level from the one below it.
2. **Judge (8 min).** Work the eight products. Underline the feature that decides the level before you submit.
3. **Discuss (4 min).** Which three claims overclaim, and which marketing word did each lean on?

### Assessment

Ask learners to answer without the MicroSim, then check each answer by using it.

1. A PDF with search and a hyperlinked glossary is sold as an "AI-powered interactive textbook." Its level? *(Level 1. The content is fixed and does not respond to the learner. The claim is an overclaim.)*
2. A flashcard app stores each user's answers and schedules the next card. Its level? *(Level 3. It adapts from a stored record. Sold as Level 2, it is an underclaim.)*
3. A tutor chat that can also write extra practice problems. Is it Level 5? *(No. The lessons are still the authors' chapters; it is Level 4.)*
4. Does an adaptive textbook need a large language model? *(No. Fixed rules on a stored record are enough for Level 3.)*

## References

1. [Adaptive learning](https://en.wikipedia.org/wiki/Adaptive_learning). Wikipedia. Systems that adjust to each learner.
2. [Intelligent tutoring system](https://en.wikipedia.org/wiki/Intelligent_tutoring_system). Wikipedia. Tutoring software, with and without language models.
3. [Self-driving car: classification](https://en.wikipedia.org/wiki/Self-driving_car). Wikipedia. The SAE levels that inspired level models for textbooks.
