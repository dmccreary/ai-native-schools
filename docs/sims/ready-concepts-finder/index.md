---
title: "Ready Concepts Finder"
description: "Select exactly the ready concepts in a 16-concept learning graph for six different sets of mastered concepts."
image: /sims/ready-concepts-finder/ready-concepts-finder.png
og:image: /sims/ready-concepts-finder/ready-concepts-finder.png
twitter:image: /sims/ready-concepts-finder/ready-concepts-finder.png
social:
   cards: false
status: built
quality_score: 100
---

# Ready Concepts Finder

<iframe src="main.html" height="724px" width="100%" scrolling="no"></iframe>

[Run the Ready Concepts Finder MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 9: Learning Graphs, Interoperability Standards, and Access at Scale](../../chapters/09-learning-graphs-interoperability/index.md){ .md-button }

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/ready-concepts-finder/main.html"
        height="724px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

A **learning graph** links each concept to the concepts it depends on. A concept is **ready** when it is not mastered and every one of its direct prerequisites is mastered. Adaptive textbooks use this rule to decide what a student can start next.

The graph shows sixteen concepts from this book's learning graph: Five-Month Doubling and everything it depends on. An arrow points from a concept to a prerequisite. For each of six problems, some concepts are mastered (green). Click every concept you judge to be ready, then press **Submit**. After you answer, the ready concepts get a blue border and the prerequisite arrows that make them ready turn blue.

The concepts and dependencies are copied from `docs/learning-graph/learning-graph.json` in this repository.

## How to Use

Nothing moves until you act, and the MicroSim does not store your answers.

- **Concepts in the graph:** click to pick or unpick a concept and see its prerequisites. Mastered concepts cannot be picked.
- **Submit:** commits your set. Two attempts per problem; only the first counts.
- **Clear picks:** removes all your picks.
- **Next:** moves on; after problem 6 it shows your score.
- **Try again:** starts over at problem 1.

A set is correct only when it has every ready concept and nothing else.

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner will **solve** six problems by selecting exactly the set of ready concepts in a 16-concept learning graph for a given set of mastered concepts, correctly answering at least five of six on the first attempt. (Bloom level: Apply.)

### Audience

Teachers, administrators, school board members, education policymakers, and parents.

### Duration

10-15 minutes.

### Prerequisites

- Learning dependency, foundational concept, directed acyclic graph, learning path, and the ready rule, from the section "Learning Graphs: Maps of Concepts" in Chapter 9.

### Activities

1. **Practice the rule (2 min).** Click three concepts and read their prerequisites.
2. **Solve (8 min).** For each problem, check every unmastered concept in turn: are all its prerequisites green?
3. **Discuss (3 min).** The number of ready concepts went 2, 3, 2, 2, 4, then 1. Why does it rise and then fall?

### Assessment

Ask learners to answer without the MicroSim, then check each answer by using it.

1. Nothing is mastered. Which concepts are ready? *(Artificial Intelligence and Exponential Growth, the two with no prerequisites.)*
2. Can a mastered concept be ready? *(No. Ready concepts are not yet mastered.)*
3. Long-Running Task needs Task Horizon and AI Agent. Only AI Agent is mastered. Is it ready? *(No. Every direct prerequisite must be mastered.)*
4. Can more than one concept be ready at once? *(Yes. In problem 5, four are ready.)*

## References

1. [Directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph). Wikipedia. The kind of graph a learning graph is.
2. [Topological sorting](https://en.wikipedia.org/wiki/Topological_sorting). Wikipedia. Ordering concepts so prerequisites come first.
3. [Knowledge space](https://en.wikipedia.org/wiki/Knowledge_space). Wikipedia. The theory behind "ready to learn" in adaptive systems.
4. [vis-network documentation](https://visjs.github.io/vis-network/docs/network/). The library used to draw the graph.
