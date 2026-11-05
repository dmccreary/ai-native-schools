# FAQ Quality Report

Generated: 2026-11-04

## Overall Statistics

- **Total Questions:** 105
- **Overall Quality Score:** 90/100
- **Content Completeness Score:** 85/100
- **Concept Coverage:** 64% (338/532 concepts)

### Content Completeness

| Input | Status | Points |
|---|---|---|
| Course description | Complete, quality score 97 | 25/25 |
| Learning graph | 532 concepts, 961 dependencies, valid DAG | 25/25 |
| Glossary | Not yet generated (`docs/glossary.md` missing) | 0/15 |
| Word count | About 211,000 words across 23 chapters | 20/20 |
| Concept coverage in chapters | Every concept is assigned to a chapter | 15/15 |

The FAQ was generated without a glossary, at the author's direction. Terminology was taken from the chapters' own definitions instead. When the glossary is generated, recheck the FAQ's term usage against it.

## Category Breakdown

### Getting Started

- Questions: 12
- Bloom's levels: Remember 6, Understand 5, Apply 1
- Avg word count: 135

### Core Concept

- Questions: 36
- Bloom's levels: Understand 17, Remember 10, Apply 5, Analyze 4
- Avg word count: 150

### Technical Detail

- Questions: 23
- Bloom's levels: Apply 9, Understand 8, Remember 4, Analyze 2
- Avg word count: 147

### Common Challenge

- Questions: 12
- Bloom's levels: Analyze 5, Evaluate 3, Understand 3, Apply 1
- Avg word count: 144

### Best Practice

- Questions: 14
- Bloom's levels: Apply 7, Create 2, Understand 2, Analyze 2, Evaluate 1
- Avg word count: 148

### Advanced Topic

- Questions: 8
- Bloom's levels: Evaluate 4, Create 2, Apply 1, Analyze 1
- Avg word count: 156

## Bloom's Taxonomy Distribution

| Level | Actual | Target | Deviation |
|---|---|---|---|
| Remember | 19% (20) | 20% | -1% ✓ |
| Understand | 33% (35) | 30% | +3% ✓ |
| Apply | 23% (24) | 25% | -2% ✓ |
| Analyze | 13% (14) | 15% | -2% ✓ |
| Evaluate | 8% (8) | 7% | +1% ✓ |
| Create | 4% (4) | 3% | +1% ✓ |

Total absolute deviation: 10%. Bloom's score: 25/25. Apply is the most under-represented level.

## Answer Quality Analysis

- **Examples:** 65/105 (62%) — target 40%+ ✓
- **Links:** 104/105 (99%) — target 60%+ ✓
- **Avg length:** 147 words — target 100-300 ✓
- **Complete answers:** 105/105 (100%) ✓
- **Anchor links:** 0 ✓
- **Broken links:** 0 ✓

An answer counts as having an example when it includes a worked example, a numeric illustration, or a named real or composite case (such as the Turkish study or Lincoln Middle School). Under a stricter rule that counts only explicit "for example" passages, the share is lower, about a third.

Answer quality score: 25/25

## Concept Coverage

The FAQ mentions 338 of 532 concepts. Coverage is limited by design: a 92-question FAQ cannot name every concept in a 532-concept graph, and most uncovered concepts are low-impact leaf concepts. See [FAQ Coverage Gaps](faq-coverage-gaps.md) for the ranked list.

Coverage score: 20/30

## Organization Quality

- Logical categorization: ✓ (six categories in learning order)
- Progressive difficulty: ✓ (Getting Started is mostly Remember/Understand; Advanced is mostly Evaluate/Create)
- No duplicates: ✓
- Clear questions: ✓ (every question is a full question ending in "?")

Organization score: 20/20

## Overall Quality Score: 90/100

- Coverage: 20/30
- Bloom's Distribution: 25/25
- Answer Quality: 25/25
- Organization: 20/20

## Recommendations

### High Priority

1. Generate the glossary, then check FAQ terminology against it.
2. Add questions for the highest-impact uncovered concepts: Prior Knowledge.

### Medium Priority

1. Add four or five Apply-level questions ("How do I...") to move the Bloom's distribution closer to target.
2. Add questions on MicroSim-specific practice as more MicroSims move from specified to built.

### Low Priority

1. Revisit case-study answers (Alpha School, Unbound Academy, LA Unified, Estonia) when new results are published, since these stories are still developing.
