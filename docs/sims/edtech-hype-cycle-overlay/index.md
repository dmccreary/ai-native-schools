---
title: "The EdTech Hype Cycle"
description: "An interactive infographic of the hype cycle drawn as a landscape, with 11 callouts for the five stages and six waves of educational technology, from film in 1913 to generative AI."
status: built
social:
   cards: false
hide:
    - toc
---

<iframe src="main.html" height="720px" width="100%" scrolling="no"></iframe>

[Run the EdTech Hype Cycle MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 15: Technology Adoption and the Diffusion of Innovation](../../chapters/15-technology-adoption-diffusion-innovation/index.md){ .md-button }

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/edtech-hype-cycle-overlay/main.html"
        height="720px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

This infographic draws the hype cycle as a landscape. The skyline is the curve itself: a steep climb from a rocket launch to a crowded summit, a long fall into a foggy valley, and a slow staircase up to a calm plateau. Six waves of educational technology sit on the curve where Chapter 15 places them: film, teaching machines, classroom computers, one-to-one tablets, MOOCs and generative AI.

Each wave went through its own cycle. The poster shows each one at the stage the chapter uses it to illustrate, so you can see the same shape repeat across a century. The placements are a reading of the evidence, not a measurement, and the hype cycle itself is a useful description, not a scientific law.

The poster also carries the book's story balance. The **benefit**: some technologies do reach the plateau. The **risks**: buying at the peak, and abandoning a useful tool at the trough. The **response**: realistic expectations, and staying on the slope of enlightenment, where a small group keeps learning what works.

## How to Use

- **Explore:** hover over a numbered marker or a label to read about that stage or wave. Every callout has a tip at the bottom.
- **Quiz:** click **Quiz**. The sim names a stage or a wave, and you click the marker where it lives. Your score shows next to the buttons.
- **Calibrate (authors):** open [`main.html?edit=true`](./main.html?edit=true) to drag markers, then copy the JSON into `data.json`.

## The 11 Callouts

1. **Innovation trigger**: the rocket lifting off
2. **Peak of inflated expectations**: fireworks over a cheering crowd
3. **Film, 1913**: Edison's prediction that books would be obsolete in schools
4. **Generative AI, 2022**: the glowing chat bubble sliding toward the trough
5. **Teaching machines, 1950s**: a wooden machine left in the fog
6. **Trough of disillusionment**: the fog in the valley
7. **One-to-one tablets, 2013**: the tipped-over tablet cart
8. **Classroom computers, 1980s**: teachers who kept experimenting after the boom
9. **Slope of enlightenment**: the staircase out of the valley
10. **MOOCs, 2012**: the certificate on the plateau
11. **Plateau of productivity**: the calm, working classroom

The landscape is a text-free SVG made by `make-hype-cycle-svg.py` in this folder, so the skyline follows the curve exactly. The SVG is the working image. `image-prompt.md` describes the same scene, with the same object positions, for an optional painted upgrade; the markers in `data.json` will still fit after the swap. The sources for every date and claim are listed in [claims.md](claims.md).

## Lesson Plan

### Learning Objective

The learner will explain the five stages of the hype cycle and, given a wave of educational technology, explain which stage its story illustrates and what a school should do at that stage. (Bloom level: Understand. Bloom verb: explain.)

### Audience

Teachers, school administrators, school board members, education policymakers and parents.

### Duration

10 to 15 minutes.

### Activities

1. **Explore (5 minutes):** hover over all 11 callouts in order along the curve. Notice that the waves come from different decades but show the same shape.
2. **Quiz (3 minutes):** run Quiz mode until you can find every stage and wave without hovering first.
3. **Apply (5 minutes):** pick one technology your school is considering. Where is it on the curve today? Write one thing your school should do at that stage, and one mistake to avoid.

### Assessment

The learner finds at least 9 of 11 callouts in Quiz mode and can answer, without the sim:

1. Why is the peak a risky time to buy? *(Expectations are highest when evidence is thinnest.)*
2. Does the trough mean a technology has failed? *(No. MOOCs and classroom computers both found real uses after it.)*
3. What should a school do during the trough? *(Keep small, cheap pilots running and learn what works.)*

After the poster, the practice sim [Where Is It on the Hype Cycle?](../where-on-hype-cycle/index.md) checks the same idea with eight events.

## References

1. [Gartner hype cycle](https://en.wikipedia.org/wiki/Gartner_hype_cycle). Wikipedia. The five stages, Jackie Fenn's 1995 origin, and criticism of the model.
2. [Quote Origin: Books Will Soon Be Obsolete in the Schools](https://quoteinvestigator.com/2012/02/15/books-obsolete/). Quote Investigator. Edison's 1913 prediction traced to its source.
3. [Massive open online course](https://en.wikipedia.org/wiki/Massive_open_online_course). Wikipedia. The MOOC wave of 2012 and its aftermath.
4. Watters, A. (2021). *Teaching Machines: The History of Personalized Learning*. MIT Press.
5. Bastani, H., et al. (2025). [Generative AI without guardrails can harm learning: Evidence from high school mathematics](https://doi.org/10.1073/pnas.2422633122). *PNAS*, 122(26).
