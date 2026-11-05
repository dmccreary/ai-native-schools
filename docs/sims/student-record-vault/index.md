---
title: "The Student Record Vault"
description: "An interactive infographic of who may come close to a student's record: a glowing folder inside four walls, for the family, the school, the district and vendors, with 14 callouts for FERPA, COPPA, GDPR, governance practices and the inBloom and PowerSchool cases."
status: built
social:
   cards: false
hide:
    - toc
---

<iframe src="main.html" height="720px" width="100%" scrolling="no"></iframe>

[Run the Student Record Vault MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 10: Student Privacy and Data Governance](../../chapters/10-student-privacy-data-governance/index.md){ .md-button }
[Chapter 8: Tracking Mastery](../../chapters/08-tracking-mastery-xapi-learning-record/index.md){ .md-button }

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/student-record-vault/main.html"
        height="720px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

A Level 3 textbook keeps a detailed record about each student. That record is the benefit, because it lets the textbook adapt, and it is also the risk. This infographic draws the record as a glowing folder at the center of a round vault. Four walls, each with a gate, decide who may come close:

- the innermost ring holds the student and the family, who hold the key
- the second ring holds the teacher and the school, behind the FERPA gate
- the third ring holds the district, where governance lives
- the outer ring holds the vendors and researchers

Around the walls are the protections and the failures. A funnel at the main gate stands for data minimization, a shredder for the retention policy, a balance scale for bias auditing, a crack with papers blowing out for a data breach, and a boarded-up warehouse for inBloom, the central store that families did not trust.

The poster *explains* who may see a record. Two practice sims then *check* it: [Who May See This Record?](../who-may-see-this-record/index.md) (Chapter 8) and [Is This Data Identifying?](../is-this-data-identifying/index.md) (Chapter 10).

The facts about the laws and the two cases were checked against primary and news sources. The audit trail is in [claims.md](claims.md) in this folder, and each checked fact carries a source id such as "(source: S3)". The descriptions are general information, not legal advice.

## How to Use

- **Explore:** hover over a numbered marker or a label to read about that part of the vault. Most callouts include a tip using the chapter's examples.
- **Quiz:** click **Quiz**. The sim names a part of the vault, and you click the marker where it lives. Your score shows next to the buttons.
- **Calibrate (authors):** open [`main.html?edit=true`](./main.html?edit=true) to drag markers, then copy the JSON into `data.json`.

## The 14 Callouts

1. **The student's record**: student data and identifying data, the glowing folder
2. **Behavioral data**: the click trail from the student's laptop
3. **Informed consent**: the family's key in the innermost ring
4. **FERPA**: the school's gate, with a bell
5. **COPPA**: the low gate for children under 13
6. **GDPR**: the gate flying the ring-of-stars flag, for students in the EU
7. **The district ring**: data governance and governance readiness
8. **Data minimization**: the funnel at the main gate
9. **Retention policy**: the shredder
10. **Vendors and researchers**: vendor risk in the outer ring
11. **The breach crack**: the PowerSchool breach
12. **inBloom**: the boarded-up central warehouse
13. **Algorithmic bias auditing**: the tilted scale on a desk
14. **The trust paradox**: a parent holding papers back, a school leader with an open hand

The vault image is a text-free SVG made by `make-vault-svg.py` in this folder; it is the working image. If you prefer a painted look, `image-prompt.md` describes the same scene with the same object positions, so the markers in `data.json` still line up after you swap the image in.

## Lesson Plan

### Learning Objective

The learner will explain who may see a student's record and why, by locating the four rings of access, the three laws (FERPA, COPPA and GDPR) and the governance practices that protect a record, and by connecting the inBloom and PowerSchool cases to the practices that would have helped.

### Audience

School and district leaders, teachers, technology directors and parents.

### Duration

15 minutes.

### Activities

1. **Explore (6 minutes):** hover over all 14 callouts, starting at the folder in the center and working outward ring by ring. Then read the three outside the walls: inBloom, the breach and the scale.
2. **Quiz (4 minutes):** run Quiz mode until you can find every callout without hovering first.
3. **Apply (5 minutes):** pick one tool your school uses with students. Which ring does each party that sees its data stand in? Which law's gate does it pass through? If the vault were breached tonight, what would an attacker walk away with?

### Assessment

The learner finds at least 12 of 14 callouts in Quiz mode and, for one real tool, names the laws that apply and one governance practice the school still lacks.

## References

- [Family Educational Rights and Privacy Act (FERPA)](https://studentprivacy.ed.gov/faq/what-ferpa) - U.S. Department of Education, Student Privacy Policy Office
- [Complying with COPPA: Frequently Asked Questions](https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions) - Federal Trade Commission
- [Legal framework of EU data protection](https://commission.europa.eu/law/law-topic/data-protection/legal-framework-eu-data-protection_en) - European Commission
- [inBloom to Shut Down Amid Growing Data-Privacy Concerns](https://www.edweek.org/technology/inbloom-to-shut-down-amid-growing-data-privacy-concerns/2014/04) - Education Week, April 2014
- [What PowerSchool isn't saying about its massive student data breach](https://techcrunch.com/2025/02/03/what-powerschool-isnt-saying-about-its-massive-student-data-breach) - TechCrunch, February 2025
