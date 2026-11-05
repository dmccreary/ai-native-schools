# FAQ Generator Session Log

- **Date:** 2026-11-04
- **Skill:** faq-generator v1.0
- **Model:** Claude Opus 5.5

## Inputs

| Input | Status |
|---|---|
| `docs/course-description.md` | Complete (quality score 97) |
| `docs/learning-graph/learning-graph.csv` / `.json` | 532 concepts, 961 dependencies, valid DAG |
| `docs/glossary.md` | **Missing.** The author chose to generate the FAQ before the glossary |
| Chapters | All 23 written, about 211,000 words in `docs/**/*.md` |
| `docs/appendices/ai-first-stories.md` | Used for case-study facts |
| Existing `docs/faq.md` | None; no manual questions to preserve |

Content completeness score: 85/100 (lost 15 points for the missing glossary).

## Method

1. Built a digest of every chapter's summary, section headings, and Key Takeaways, and read the AI-First Stories appendix in full.
2. Spot-checked specific facts in the chapters before using them (five guardrails, product-level checklist, SAFE practices, grade-band models, contract red flags, inference-cost arithmetic, hype-cycle reading, Five-Month Doubling prerequisites).
3. Wrote 92 questions, ran the analysis script, then added 13 questions targeting the highest-CIS uncovered concepts (Bloom's Taxonomy, learning gap, OER and 5R permissions, AI benchmarks, hype cycle, per-pupil spending, inference cost, learning analytics, personally identifiable data, evidence-based practice, publisher disruption, formative/spaced/retrieval practice, SEL in projects) and wove exact concept names into existing answers.
4. Followed the book's fixed facts: METR doubling "about every five months"; Alpha tuition about \$40,000 (Austin) to about \$65,000 (newer campuses); every story shows a benefit, a risk, and a response.
5. No mascot admonitions in the FAQ (the placement rules are per chapter, and none would carry a message the answers do not already give).

## Outputs

| File | Notes |
|---|---|
| `docs/faq.md` | 105 questions in 6 categories |
| `docs/learning-graph/faq-chatbot-training.json` | RAG export, one record per question |
| `docs/learning-graph/faq-quality-report.md` | Scores and recommendations |
| `docs/learning-graph/faq-coverage-gaps.md` | 194 uncovered concepts ranked by CIS |
| `mkdocs.yml` | Added `FAQ: faq.md` and the two reports under Learning Graph |

## Results

- Questions: 105 (Getting Started 12, Core Concepts 36, Technical Detail 23, Common Challenges 12, Best Practice 14, Advanced Topics 8)
- Bloom's: Remember 20, Understand 35, Apply 24, Analyze 14, Evaluate 8, Create 4 (total deviation from target about 10%)
- Concept coverage: 338/532 (64%), by label matching
- Answers with links: 104/105; anchor links: 0; broken links: 0
- Average answer length: 147 words
- Overall quality score: 90/100

## Validation

- `mkdocs build --strict` exits 0. The only notice is the pre-existing INFO that `img/mascot/character-sheet.md` is not in nav.
- JSON parses; all `source_links` resolve to existing files.
- No duplicate questions.
- Rendered HTML checked: dollar signs display correctly and the two inline formulas render through arithmatex.

## Caveats

- "Has example" counts worked examples, numeric illustrations, and named real or composite cases. Under a stricter "for example" rule the share is about a third, below the 40% target.
- Concept coverage uses literal label matching, so it undercounts concepts discussed under other names.
- Reading level (Flesch-Kincaid) was not computed.
- Recheck terminology against the glossary once it is generated.
