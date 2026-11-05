---
title: "Anatomy of a Learning Record"
description: "An interactive infographic that follows one click from a MicroSim to a teacher's dashboard: the xAPI statement and its actor, verb, object and result, the Learning Record Store, the learning graph's next concept, and the key that keeps the record under student control."
status: built
social:
   cards: false
hide:
    - toc
---

<iframe src="main.html" height="720px" width="100%" scrolling="no"></iframe>

[Run the Anatomy of a Learning Record MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 8: Tracking Mastery: xAPI, Learning Record Stores, and MicroSims](../../chapters/08-tracking-mastery-xapi-learning-record/index.md){ .md-button }

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/anatomy-of-a-learning-record/main.html"
        height="720px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

Parents and teachers often ask of an adaptive textbook, "How does it know?" This infographic answers with one picture. A student moves a slider in a MicroSim. The page sends a short **xAPI statement**, drawn as an envelope holding three linked tiles: the **actor**, the **verb** and the **object**, with the **result** pinned to the corner. The envelope travels to a filing-cabinet server, the **Learning Record Store**, which keeps each student's **learning record**.

From the cabinet, two things happen. A teacher's dashboard shows **learning analytics** across the class, and a **learning graph** lights up the next concept the student is ready for. No live AI model is involved: the choice is a lookup in a stored record, using a stated rule and a map.

The scene also shows both sides of the story. The open drawer full of folders is the risk: a detailed history of a child's learning is sensitive data. The key on the student's lanyard is the school's response: collect the minimum, and keep the record under the student's and family's control.

## How to Use

- **Explore:** hover over a numbered marker or a label to read about that part of the scene. Several callouts include a tip at the bottom.
- **Quiz:** click **Quiz**. The sim names a part of the scene, and you click the marker where it lives. Your score shows next to the buttons.
- **Calibrate (authors):** open [`main.html?edit=true`](./main.html?edit=true) to drag markers, then copy the JSON into `data.json`.

## The 11 Callouts

1. **MicroSim in the browser**: the laptop screen with a slider
2. **xAPI statement**: the glowing envelope
3. **Actor**: who did it, recorded as a code, not a name
4. **Verb**: what they did, such as answered or experienced
5. **Object**: the question or simulation they acted on
6. **Result**: the optional outcome, such as a score of 0.8
7. **Learning Record Store**: the filing-cabinet server
8. **Learning record**: the open drawer, a sensitive history
9. **Teacher dashboard**: learning analytics across the class
10. **Learning graph**: the next ready concept lights up
11. **Student-controlled data**: the key on the lanyard

The scene is a text-free SVG made by `make-learning-record-svg.py` in this folder. The script prints the marker positions used in `data.json`.

## Lesson Plan

### Learning Objective

The learner will trace one student action from a MicroSim to a teacher's dashboard, naming the parts of an xAPI statement and the role of the Learning Record Store, and explain how the record is kept under student control.

### Audience

Teachers, school leaders and parents.

### Duration

10 minutes.

### Activities

1. **Explore (5 minutes):** hover over all 11 callouts in number order, following the click from the laptop to the dashboard and the learning graph.
2. **Quiz (3 minutes):** run Quiz mode until you can find every callout without hovering first.
3. **Apply (2 minutes):** write the statement for one action in your own class as a sentence: who, did what, to what, with what result. Then name one item you would *not* record, and why.

### Assessment

The learner finds at least 9 of 11 callouts in Quiz mode and can explain to a parent, in two sentences, what is recorded and who controls it.

## References

- [xAPI Specification](https://github.com/adlnet/xAPI-Spec) - Advanced Distributed Learning (ADL) Initiative, GitHub
- [Experience API](https://en.wikipedia.org/wiki/Experience_API) - Wikipedia
- [What is Learning Analytics?](https://www.solaresearch.org/about/what-is-learning-analytics/) - Society for Learning Analytics Research
- [Chapter 8: Tracking Mastery](../../chapters/08-tracking-mastery-xapi-learning-record/index.md) - source of the Maya worked examples and the five student-control principles
