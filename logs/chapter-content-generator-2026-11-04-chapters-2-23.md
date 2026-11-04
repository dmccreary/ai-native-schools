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

## Chapter 7: Content Economics and Open Educational Resources

- Budget: 19 Tier A + 5 Tier B + 3 Tier C = about 11,110 to 16,850 words. Actual: about 5,200 prose words plus about 1,100 words of specs. This is BELOW the budget floor (under half). All 27 concepts are defined with worked examples and tables, but Tier A concepts such as Open Educational Resource and Creative Commons License are brief. Left unpadded per the anti-padding rule; a candidate for expansion
- Corrected the heading from 26 to 27 concepts to match the 27-row table
- OpenBook QR Score is taken from the author's own OER Evaluator book (10 metrics x 10 points, Q and R halves out of 50, score bands, 5R permissions), not invented. The learning graph's "subscore" is noted as the OER Evaluator's "subtotal"
- MicroSims: 2 reused from the author's OER Evaluator book (five-r-permissions, total-score-calculator; both live and marked built); 1 specified from a template (cost-per-student-by-level)
- All per-level costs (\$5.80, \$12.80, \$23.00 per student; \$75 device share; print \$53.33) and the chapter-production hours are ILLUSTRATIVE assumptions, labeled as such in the chapter and in the sim spec. The author should replace them with sourced figures if a data source exists
- Self-review fixed three small errors (device share range, a "one dollar in N" figure, a reused book title)
- External figures to verify: College Board \$1,300 books and supplies; Chegg's May 2023 share drop; UNESCO 2002/2012/2019 OER milestones; OpenStax launch 2012
- mkdocs build --strict: pass

## Chapter 8: Tracking Mastery: xAPI, Learning Record Stores, and MicroSims

- Budget: 1 Tier A + 14 Tier B = about 4,000 to 6,350 words. Actual: about 4,070 prose words plus about 1,200 words of specs (at the floor of the budget)
- Concepts covered: 15 of 15; mascot admonitions: 5 (validator clean)
- MicroSims: 3 reused from the author's learning-record-store book (xapi-statement-triple, lms-vs-lrs-architecture, class-mastery-heatmap; all live, pages marked instrumented or implemented); 1 newly specified (who-may-see-this-record)
- Grounded in the author's own LRS project (xAPI producer contract, LRS-Lite draft design). LRS-Lite is described as a draft plan, not a finished product. The "about a kilobyte per statement" and "few dollars a month" figures come from that draft
- External facts to verify: xAPI timeline (ADL, version 1.0 in 2013, IEEE adoption), SoLAR definition of learning analytics, GDPR portability, FERPA inspection right
- mkdocs build --strict: pass

## Chapter 9: Learning Graphs, Interoperability Standards, and Access at Scale

- Budget: 14 Tier B + 1 Tier C = about 3,490 to 5,600 words. Actual: about 4,100 prose words plus about 1,700 words of specs (within budget)
- Concepts covered: 15 of 15; mascot admonitions: 5 (validator clean)
- Worked examples use real data from this book's own learning graph (532 concepts, 961 dependencies, 14 foundational, 28 terminal, longest chain 26, Five-Month Doubling = 15 prerequisites in 7 layers), computed from learning-graph.json
- MicroSims: 1 reused (this book's own graph-viewer, via relative iframe); 2 newly specified (ready-concepts-finder, generate-once-vs-live-cost), the first from a template
- Illustrative assumptions (labeled): 3 MB page size, 1.5 Mbps connection, \$22,400 production cost (from ch. 7), \$2.00 per million tokens
- External facts to verify: 1EdTech/IMS Global standards list and 2022 rename, IEEE xAPI and LOM, Pew 2018 homework-gap figure, Emergency Connectivity Fund, GitHub Pages limits
- mkdocs build --strict: pass

## Chapter 10: Student Privacy and Data Governance

- Budget: 3 Tier A + 20 Tier B + 3 Tier C = about 6,600 to 10,450 words. Actual: about 5,000 prose words plus about 2,300 words of specs. BELOW the floor (about 75% of it); every concept has a definition and most have worked examples or tables
- Concepts covered: 26 of 26; mascot admonitions: 6 (validator clean)
- MicroSims: 0 reused; 3 newly specified (is-this-data-identifying, four-fifths-bias-audit-calculator from a template, governance-readiness-judge)
- The six must-have / four should-have governance readiness rule is this chapter's recommended practice (labeled as such), not a legal standard
- Legal content is labeled general information, not legal advice. External facts to verify before publishing: Sweeney 87% identifiability, FERPA school-official exception and Gonzaga (2002), COPPA 2025 rule update and FTC school-consent guidance, GDPR fine ceiling, California SOPIPA (2014), UK 2020 A-level algorithm, The Markup 2023 Wisconsin DEWS investigation, Stanford 2023 AI-detector study, GAO 2022 ransomware report, the PowerSchool credentials/MFA reporting, inBloom \$100M and 2014 closure (matches the book's appendix)
- mkdocs build --strict: pass

## Chapter 11: Mastery Learning and the Case for a Compressed Morning

- Budget: 13 Tier A + 3 Tier B = about 7,250 to 10,950 words. Actual: about 4,850 prose words plus about 2,700 words of specs. BELOW the floor (about two thirds of it)
- Concepts covered: 16 of 16; mascot admonitions: 6 (validator clean after trimming the celebration to 3 sentences)
- MicroSims: 0 reused; 3 newly specified (judging-evidence-for-shorter-morning, morning-time-budget, tutor-reply-hint-levels)
- The chapter is deliberately even-handed: it states that the compressed-morning package is "plausible and unproven," that Alpha's results are self-reported, and that Unbound's early results lack a baseline, consistent with the AI-First Stories appendix
- The 100-minutes-freed (300 hours, about 46 days) figure is an ILLUSTRATIVE scenario built on the ch. 2 schedule and is labeled as such, with the required 1.67x speedup stated
- The appendix itself says several stories are "written from memory and not yet checked online." External figures to verify before publishing: Bloom 1984 two sigma; Kulik, Kulik and Bangert-Drowns 1990 (about 0.52); Nickow, Oreopoulos and Quan 2020 (0.37, 96 RCTs); VanLehn 2011 (0.76-0.79); RAND Cognitive Tutor (about 0.2 in year 2); Nigeria pilot (about 0.3 SD; the chapter treats it as randomized); Harvard physics randomized study; Turkey study (17%); high-dosage tutoring cost (\$1,000-\$2,500); MIT Media Lab EEG preprint
- mkdocs build --strict: pass
