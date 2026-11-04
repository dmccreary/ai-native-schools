# Learning Graph Generator Session Log

- **Skill:** learning-graph-generator v1.07
- **Date:** 2026-11-03
- **Book:** AI-Native Schools: Mornings with AI, Afternoons with Each Other
- **Requested size:** up to 600 concepts

## Python programs used

| Program | Version |
|---------|---------|
| csv-to-json.py | 1.05 |
| analyze-graph.py | not versioned |
| taxonomy-distribution.py | not versioned |
| validate-learning-graph.py | not versioned |
| src/learning-graph/build_graph.py | written for this book (builds the CSV and concept list) |

## Steps

1. **Course description check:** `quality_score: 97` found in `docs/course-description.md`, above 85, so the assessment step was skipped.
2. **Concepts:** 532 concepts written to `src/learning-graph/concepts.txt`, each with a taxonomy and its dependencies listed by label. `build_graph.py` checks for duplicate labels, labels over 32 characters, unknown dependencies, and cycles, then assigns ConceptIDs in topological order so every dependency has a smaller ID.
3. **First pass:** valid DAG, but 40% terminal nodes and 1.47 dependencies per concept. Added cross-links between related concepts.
4. **Second pass:** 1.7% terminal nodes, below the 5% healthy floor. Removed weaker links, mostly from case studies, so that case studies stay as examples at the ends of paths.
5. **Final graph:** 532 concepts, 14 foundational concepts, 28 terminal nodes (5.3%), 1.86 dependencies per concept, longest chain 26, one connected component, no cycles.
6. **Taxonomy:** 14 categories, largest is FOUND at 62 concepts (11.7%).
7. **JSON:** `learning-graph.json` generated with Concept Impact Scores and validated against the schema (532 nodes, 961 edges). The top CIS concepts are Education, Artificial Intelligence, Curriculum, and Textbook, which confirms the edges point the right way.

## To change the graph

Edit `src/learning-graph/concepts.txt`, then from `docs/learning-graph` run:

```bash
python3 ../../src/learning-graph/build_graph.py ../../src/learning-graph/concepts.txt .
python3 analyze-graph.py learning-graph.csv quality-metrics.md
python3 csv-to-json.py learning-graph.csv learning-graph.json color-config.json metadata.json taxonomy-names.json
python3 taxonomy-distribution.py learning-graph.csv taxonomy-distribution.md taxonomy-names.json
```
