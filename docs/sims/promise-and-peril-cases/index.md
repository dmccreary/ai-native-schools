---
title: "Promise and Peril: Five AI-First Cases"
description: "An interactive grid poster that reads five AI-first cases (Alpha School, Unbound Academy, the Turkish high school study, the Harvard physics AI tutor and Summit Learning) as a benefit, a risk and a response, with an empty band where no response was found."
status: built
social:
   cards: false
hide:
    - toc
---

<iframe src="main.html" height="720px" width="100%" scrolling="no"></iframe>

[Run the Promise and Peril: Five AI-First Cases MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 22: AI-First Case Studies I: Promise and Peril](../../chapters/22-ai-first-case-studies-i-promise-peril/index.md){ .md-button }

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/promise-and-peril-cases/main.html"
        height="720px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

This poster fills in Chapter 22's risk-and-response framework for all five cases at once. Each column is one case, with a school scene at the top: a small private school, a student at home in a virtual class, a math classroom split into two groups, a university lecture hall, and a large public-school classroom. Under each scene, a green band shows the case's benefit, a red band its risk, and a blue band the response to that risk.

Two of the blue bands are empty. For Alpha School and Unbound Academy, the sources checked for this poster show no response from the school to the risk, so the bands are left blank with a dashed border instead of being filled with a guess. Their zone notes give the book's proposed response and say plainly that it is the book's, not the school's. The Summit response is real, but it came from protest, not design. Only the two research studies show a response that was designed in from the start, and in both it was the design of the tutor.

Every number on the poster was checked against at least one outside source, usually two, and each fact names its source, such as "(source: S13)". The full list of sources and the claims they support is in [claims.md](claims.md) in this folder. Several of these stories are still unfolding, so check figures against the sources before you quote them.

## How to Use

- **Explore:** click any band to read its benefit, risk or response in the panel below the poster. Each note starts with what the picture shows.
- **Quiz Me:** the sim asks about a benefit, risk or response, and you click the band where it lives. Your score shows next to the buttons.
- **Calibrate (authors):** open [`main.html?edit=true`](./main.html?edit=true) to drag zone corners, then copy the JSON into `data.json`.

## The 15 Zones

| Case | Benefit (green) | Risk (red) | Response (blue) |
|---|---|---|---|
| 1. Alpha School | A short academic morning frees the day for people and projects | Cost and equity; self-reported results | **Empty:** none found |
| 2. Unbound Academy | Free to families | Early results far below the school's own targets | **Empty:** none found |
| 3. Turkish high school study | Practice scores rose with AI help | Exam scores fell after open-chatbot use | A hint-first tutor with guardrails |
| 4. Harvard physics AI tutor | More learning in less time | One course at one university | A tutor designed step by step |
| 5. Summit Learning | Personalized pacing, widely adopted | Screen time and too little teacher contact | Protest, then schools pulled back |

The poster image is a text-free SVG made by `make-promise-peril-svg.py` in this folder. The script also prints the zone rectangles used in `data.json`. The SVG is the working image. `image-prompt.md` holds a prompt for an optional painted version of the same five panels, laid out so the same zone coordinates still fit.

For practice, try [Which Benefit or Risk?](../which-benefit-or-risk/index.md) to sort statements from AI-first stories, and [Alpha or Unbound?](../alpha-or-unbound/index.md) to compare the first two cases fact by fact.

## Lesson Plan

### Learning Objective

The learner will analyze five AI-first cases by naming the benefit, the risk and the response each one shows, and will explain why two of the cases have no documented response. (Bloom level: Analyze. Verb: analyze.)

### Audience

Teachers, school administrators, school board members, education policymakers and parents.

### Duration

15 minutes.

### Activities

1. **Explore (6 minutes):** read the three bands of each case, column by column. Note which responses were designed and which came after the harm.
2. **Quiz (4 minutes):** run Quiz Me until you can find all ten answers without exploring first.
3. **Discuss (5 minutes):** look at the two empty blue bands. What response would you ask Alpha or Unbound for? What evidence would show it worked?

### Assessment

The learner scores at least 9 of 10 in Quiz Me, and can say in one sentence why the Turkish and Harvard studies have designed responses while Summit's response came from protest.

## References

- Bastani, H., Bastani, O., Sungu, A., Ge, H., Kabakçı, Ö., & Mariman, R. (2025). Generative AI without guardrails can harm learning: Evidence from high school mathematics. *Proceedings of the National Academy of Sciences*, 122(26), e2422633122.
- Kestin, G., Miller, K., et al. (2025). AI tutoring outperforms in-class active learning: an RCT introducing a novel research-based design in an authentic educational setting. *Scientific Reports*, 15, 17458. [PMC full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC12179260/)
- [Without Guardrails, Generative AI Can Harm Education](https://knowledge.wharton.upenn.edu/article/without-guardrails-generative-ai-can-harm-education/) - Knowledge at Wharton
- [Alpha School](https://en.wikipedia.org/wiki/Alpha_School) - Wikipedia
- [Pennsylvania denies AI cyber charter school application](https://www.chalkbeat.org/philadelphia/2025/01/29/pennsylvania-rejects-ai-cyber-charter-school-unbound-academy-application/) - Chalkbeat
- [Dear Mr. Zuckerberg: Students Take Summit Learning Protests Directly to Facebook Chief](https://www.edsurge.com/news/2018-11-15-dear-mr-zuckerberg-students-take-summit-learning-protests-directly-to-facebook-chief) - EdSurge
