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

## Chapter 12: AI Guardrails: Teaching Thinking Without Over-Reliance

- Budget: 18 Tier B + 5 Tier C (23 rows) = about 5,230 to 8,400 words. Actual: about 4,800 prose words plus about 2,600 words of specs (slightly below the floor)
- Corrected the heading from 24 to 23 concepts to match the 23-row table
- Concepts covered: 23 of 23; mascot admonitions: 6 (validator clean)
- MicroSims: 0 reused; 3 newly specified (ai-tutor-design-judge, four-thinking-skills-sorter, mastery-threshold-chooser)
- Notable finding recorded in the chapter: the "4 of the last 5 correct" mastery rule used as the simple example in ch. 8 passes a student who truly knows 70% of the material about 53% of the time. The pass probabilities were computed exactly (binomial) and every sim criterion was checked by script
- The five-guardrail rule and the 120-minute screen cap are this chapter's recommended practice and illustrative design, labeled as such
- External facts to verify: Paul and Elder's six Socratic question types, the Microsoft Research / Carnegie Mellon 2025 survey, AAP family-media-plan guidance, the Turkish study's 17% figure (taken from the book's own appendix), sycophancy as a documented tendency
- mkdocs build --strict: pass

## Chapter 13: Social Learning and Human Skills

- Budget: 7 Tier A + 20 Tier B + 1 Tier C (28 rows) = about 8,620 to 13,450 words. Actual: about 4,450 prose words plus about 2,600 words of specs. BELOW the floor (about half). All 28 concepts are defined; the learning theories, team structure, listening, SEL and creativity each have a worked example, but Tier A concepts (Pro-Social Behavior, Collaboration, Teamwork, Empathy, Creativity) are brief. Candidate for expansion
- Corrected the heading from 29 to 28 concepts to match the 28-row table. Initially wrote a different H1 title from memory; caught and restored the scaffold's original title "Social Learning and Human Skills" before commit (checked all earlier chapter titles against the nav: they match)
- Mascot admonitions: 6 (validator clean after trimming one tip)
- MicroSims: 1 reused (zpd-visualization, score 0.827, live); 3 newly specified (which-learning-theory, why-is-this-team-stuck, listening-responses from a template)
- "Social constructionism" is used in the book's own sense (constructionism done as a team) and the chapter flags the different sociological meaning
- External facts to verify: Piaget, Vygotsky, Wood-Bruner-Ross (1976), Papert (Mindstorms 1980), Dewey (1938), the Dale's Cone debunking, Johnson & Johnson five elements, Slavin's two key features, CASEL five competencies, Durlak et al. 2011 (213 programs, about 11 percentile points), Fisher & Ury (1981), Guilford and Torrance, Bandura, Kelley & Kelley, Walton & Cohen belonging research, Holt-Lunstad, the 2023 Surgeon General loneliness advisory
- mkdocs build --strict: pass

## Chapter 14: The Pro-Social Afternoon

- Budget: 2 Tier A + 23 Tier B + 1 Tier C (26 rows) = about 6,350 to 10,100 words. Actual: about 4,200 prose words plus about 2,750 words of specs. BELOW the floor (about two thirds). All 26 concepts are defined; many of the arts, sports and club concepts share one worked example instead of one each
- Concepts covered: 26 of 26; mascot admonitions: 6 (validator clean after trimming one warning)
- MicroSims: 0 reused; 3 newly specified (afternoon-program-quality-judge, missing-project-element, match-activity-to-skill)
- The chapter is candid that the arts research does not show test-score gains (Sala & Gobet 2020), that El Sistema's evidence is contested, and that "supervised" is not "structured"
- The SAFE rule is from Durlak, Weissberg and Pachan (2010); the four-feature pro-social test, the afternoon week plan, and the 450-hour figure are this chapter's illustrative design
- External facts to verify: Durlak et al. 2010 (68 studies, SAFE), Sala & Gobet 2020, El Sistema (1975, Abreu) and Baker 2014, FIRST (1989, Kamen), PBLWorks seven elements, the Lucas Education Research AP results, Finland's 2016 multidisciplinary-module requirement, High Tech High (2000, lottery), Celio et al. 2011 service-learning meta-analysis (62 studies)
- mkdocs build --strict: pass

## Chapter 15: Technology Adoption and the Diffusion of Innovation

- Budget: 2 Tier A + 16 Tier B + 10 Tier C (28 rows) = about 6,200 to 9,900 words. Actual: about 4,650 prose words plus about 2,750 words of specs (about 75% of the floor)
- Concepts covered: 28 of 28; mascot admonitions: 5 (validator clean)
- MicroSims: 1 reused (technology-adoption from the ethics-course book, score 0.8046; its regions link out to Wikipedia on click); 3 newly specified (choose-chasm-crossing-move, where-on-hype-cycle, which-attribute-is-the-barrier). Two catalog hype-cycle sims returned 404 and were not used
- Self-review corrected a chasm-sim item whose "best move" did not follow from its scenario
- The 5-attribute scores for Level 2 vs Level 4, the Eastside barrier diagnosis, and the hype-cycle placement of generative AI are illustrative readings and are labeled as such. Estonia's AI Leap is presented as a method example with results not yet known (consistent with the appendix)
- External facts to verify: Rogers (1962; 5th ed. 2003), the Ryan and Gross (1943) hybrid-corn study, adopter percentages, Moore (1991), Gartner's hype cycle (mid-1990s) and the academic critique, the 2012 "year of the MOOC" and the 2013 Thrun quote, MOOC completion under 10 percent, LAUSD iPad rollout (2013), Estonia TI-Hupe (2025)
- mkdocs build --strict: pass

## Chapter 16: Organizational Change Models

- Budget: 1 Tier A + 10 Tier B = about 3,000 to 4,750 words. Actual: about 3,500 prose words plus about 1,900 words of specs (within budget)
- Concepts covered: 11 of 11; mascot admonitions: 4 (validator clean)
- This is an overview chapter; Lewin, Bridges, Schein, stages of concern and Kotter's individual steps are named here and developed in Ch. 17 (their concepts are assigned there)
- MicroSims: 0 reused; 2 newly specified (name-that-change-model, is-this-a-normal-dip). The dip rule (low in months 2-4, depth up to 15 percent, recovery by month 8) and all series data are ILLUSTRATIVE and labeled as such; every series value was checked against the rule
- Notes that the often-cited "70 percent of change efforts fail" figure is poorly sourced (citing Hughes 2011)
- External facts to verify: Kotter (1995, 1996), Lewin (1947), Hiatt/Prosci ADKAR (2006), Bridges (1991), Schein, Senge (1990), Fullan and the implementation dip, CBAM (Hall, Hord, Univ. of Texas, 1970s), Deal and Peterson on school culture, Hughes (2011)
- mkdocs build --strict: pass

## Chapter 17: Leading Change: Vision, Culture, and Early-Stage Concerns

- Budget: 20 Tier B + 5 Tier C (25 rows) = about 5,340 to 8,600 words. Actual: about 4,250 prose words plus about 2,300 words of specs (about 80% of the floor)
- Concepts covered: 25 of 25; mascot admonitions: 5 (validator clean)
- Scope split with Ch. 18 follows the learning graph: this chapter covers Lewin's three stages, all eight Kotter steps, shared vision and personal mastery, Bridges' endings and losses, Schein's overview plus norms and rituals, ADKAR Awareness/Desire/Knowledge, and CBAM stages 0-2 (self concerns) and innovation configuration. Ch. 18 owns the later stages
- MicroSims: 0 reused; 3 newly specified (force-field-balance, which-kotter-step, which-self-concern). The force strengths, the loss inventory and the innovation-configuration map are illustrative and labeled
- External facts to verify: Lewin (1947) and force field analysis, Kotter (1996) step names and the majority-convinced point, Senge's compliance vs commitment (enrollment), Bridges (1991) change vs transition and losses, Schein's three levels, ADKAR (Hiatt 2006), CBAM stages of concern 0-6 and the SoCQ (Hall and Hord)
- mkdocs build --strict: pass

## Chapter 18: Sustaining Change: Systems Thinking and National Adoption

- Budget: 25 Tier C concepts = about 3,000 to 5,000 words. Actual: about 4,000 prose words plus about 2,600 words of specs (within budget)
- Concepts covered: 25 of 25; mascot admonitions: 5 (validator clean)
- MicroSims: 0 reused; 3 newly specified (what-level-of-use, artifact-value-or-assumption, reinforcing-or-balancing). Self-review fixed a causal-loop sign error (a minus sign placed on the wrong link in the breach-risk loop) before commit; all six loop sign counts were rechecked
- National AI adoption: Estonia presented as a coherent, capacity-building approach with results still unfolding; South Korea's 2025 AI digital textbooks presented as a rapid mandate that, as reported, met resistance and was reclassified as supplementary material. BOTH are written from memory and hedged ("as reported"); the author should verify the South Korea details before publishing
- External facts to verify: Bridges' neutral zone and four P's, ADKAR Ability/Reinforcement, CBAM levels of use (0 to VI), Tyack and Tobin (1994), Cuban, Abrahamson's "repetitive change syndrome", Fullan and Quinn (2016) coherence framework, Meadows
- mkdocs build --strict: pass
