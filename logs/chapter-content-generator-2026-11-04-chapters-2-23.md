# Chapter Content Generator Session Log: Chapters 2-23

**Skill Version:** 1.11
**Execution Mode:** Sequential, one chapter at a time; commit, push and gh-deploy after each
**Reading level:** College / professional development (K-12 teachers, administrators, board members, parents)
**cis_max:** 29180. Edge direction validated; 0 chapter-order violations (see chapter 1 log)

## Chapter 2: Evidence, Motivation, and the Stakeholders of Schooling

- Started 2026-11-04 07:4x, finished 2026-11-04 07:56:29
- Budget: 5 Tier A + 16 Tier B concepts = about 6,500 to 10,150 words. Actual: about 8,900 prose words plus about 3,900 words of MicroSim specs
- Concepts covered: 21 of 21
- Mascot: 8 admonitions (welcome, 1 thinking, 2 tip, 2 warning, 1 encourage, 1 celebration); validator clean
- MicroSims: 1 reused (effect-size-visualizer, 0.7557); 2 from templates (prerequisite-chain-diagnosis, school-decision-stakeholder-match); 2 newly specified (evidence-tier-claim-checker, challenge-knowledge-zone-explorer)
- Also fixed chapter 1: bloom-level-task-sorter was labeled Apply with the verb classify; classify is an Understand verb in the book's verb list
- mkdocs build --strict: pass

## Chapter 3: School Structures, Equity, and the Industrial-Era Legacy

- Budget: 9 Tier B + 11 Tier C concepts = about 3,570 to 5,800 words. Actual: about 5,300 prose words plus about 3,700 words of MicroSim specs
- Concepts covered: 20 of 20; mascot admonitions: 5 (validator clean)
- MicroSims: 0 reused; 2 from templates (source-credibility-checker, equal-vs-equitable-tutoring); 2 newly specified (seat-time-vs-mastery, schooling-edtech-timeline)
- mkdocs build --strict: pass

## Chapter 4: Measuring AI Capability: The METR Task-Horizon Studies

- Budget: 19 Tier A concepts = about 9,500 to 14,250 words. Actual: about 5,400 prose words plus about 3,500 words of MicroSim specs. This is BELOW the budget floor. Several Tier A terms (AI benchmark, METR, generative AI) got worked examples but not the full 500 to 750 words. Left unpadded per the anti-padding rule; a candidate for expansion if the author wants more depth
- Concepts covered: 19 of 19; mascot admonitions: 7 (validator clean)
- MicroSims: 0 reused; 3 from templates or catalog hints (ai-terms-classifier, task-horizon-curve-explorer, ai-cost-per-student-calculator); 1 newly specified (metr-measurement-workflow)
- Catalog sim "The METR Task Horizon Timeline" (ai-strategy-for-education) NOT reused: it states a six-month doubling time and uses unsourced data points, which conflict with the book's five-month figure
- Doubling time: chapter uses "about five months" as the book's planning figure and notes the estimate depends on models and period measured. METR's original March 2025 preprint reported a different (longer) figure for the full 2019-2025 period; the author should confirm the citation for five months
- mkdocs build --strict: pass

## Chapter 5: Projecting AI Growth: Doubling Curves, Limits, and Uncertainty

- Budget: 2 Tier A + 9 Tier B + 8 Tier C concepts = about 4,210 to 6,700 words. Actual: about 4,700 prose words plus about 1,500 words of specs
- Concepts covered: 19 of 19; mascot admonitions: 6 (validator clean)
- MicroSims: 1 reused (semilog-linearization from pre-calc, score 0.782; its lesson page is an unfinished scaffold but main.html runs); 1 from template (doubling-time-projection-calculator); 1 newly specified (verify-the-ai-summary)
- Self-review caught and fixed four arithmetic or wording errors before commit (48-month value at a 10-month doubling time, a "one month = factor of eight" overstatement, an energy percentage, a straight-line extrapolation figure)
- Uses an illustrative 4-to-6-month doubling range to show sensitivity; five months remains the stated planning figure
- External figures to verify before publishing: Epoch AI compute growth (4-5x per year), IEA data-center electricity (about 1.5% in 2024, about 415 TWh), Stanford AI Index 2025 token prices, the 2023 Harvard/BCG study figures (ch. 4), the 2023 Mata v. Avianca sanctions
- mkdocs build --strict: pass

## Chapter 6: The Five-Level Model of Intelligent Textbooks

- Budget: 17 Tier A + 17 Tier B = about 12,750 to 19,550 words. Actual: about 6,100 prose words plus about 2,000 words of specs. This is BELOW the budget floor (about half). Every concept is defined and the chapter has worked examples, tables and four sims, but the Tier A foundation concepts (Textbook, Digital Textbook, Classification Framework) are brief. Left unpadded per the anti-padding rule; a candidate for expansion
- Fixed the "33 concepts" heading to 34 to match the 34-row table (the scaffold's heading was one short)
- Concepts covered: 34 of 34; mascot admonitions: 7 (validator clean)
- MicroSims: 2 reused, both the author's own (book-levels 0.8163, sae-comparison 0.7992); 2 newly specified (product-level-classifier, level-specific-safeguard-matcher)
- Judgment calls for the author to confirm against the five-level paper: (1) a product's level is the highest defining capability it actually delivers (not cumulative); (2) the Level 1/Level 2 boundary is "responds to the learner's actions" (bookmarks, search and hyperlinks stay Level 1); (3) Level 3 adaptivity needs no language model; (4) the level-specific safeguard table is this book's recommended practice, not law
- Khanmigo is classified as Level 4 on a Level 3 platform; this is the book's reading and is labeled as such
- mkdocs build --strict: pass
