---
title: "Is This Data Identifying?"
description: "Classify eight data fields as a direct identifier, identifying in combination, or not identifying."
image: /sims/is-this-data-identifying/is-this-data-identifying.png
og:image: /sims/is-this-data-identifying/is-this-data-identifying.png
twitter:image: /sims/is-this-data-identifying/is-this-data-identifying.png
social:
   cards: false
status: built
quality_score: 100
---

# Is This Data Identifying?

<iframe src="main.html" height="642px" width="100%" scrolling="no"></iframe>

[Run the Is This Data Identifying? MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 10: Student Privacy and Data Governance](../../chapters/10-student-privacy-data-governance/index.md){ .md-button }

To edit the sketch, paste the contents of `is-this-data-identifying.js` into the [p5.js editor](https://editor.p5js.org/) and set the editor's p5.js version to 2.x. The learning content is in the `CONFIG` block at the top of the file.

## About This MicroSim

Removing a student's name does not make data anonymous. Some fields name a student on their own. Others are ordinary facts that point to one student once they are combined, or once the group is small enough. This MicroSim asks you to sort eight fields into three categories:

- **Direct identifier**: identifies a specific student on its own.
- **Identifies in combination**: not identifying alone, but identifies a student when combined with other facts or because the group is very small.
- **Not identifying**: describes a large group or carries no link to any individual.

The birth date, ZIP code, and gender example comes from Latanya Sweeney's research, which found that about 87 percent of Americans can be singled out by those three facts. The other fields are illustrative examples written for this chapter.

## How to Use

Read the data field on the card, then choose one of the three categories below it. The category definitions are always shown on the right. A wrong first answer gives a hint and lets you choose again, but only the first answer counts toward **First-try correct**. Each answered field drops a numbered chip into its correct category. After eight fields, the results screen shows your score and the fields you misplaced.

### Controls

- **Choice buttons:** commit an answer. A wrong first answer gives a hint and lets you choose again; only the first answer counts.
- **Show definitions:** opens or closes the reference table. Reading it is exploration, not evidence.
- **Next:** moves to the next item after feedback. On the results screen, Previous missed and Next missed step through what you missed.
- **Play again:** starts a practice run with the items reshuffled. Practice runs do not change the first-run score.

Nothing moves until you act, and the MicroSim does not store your answers.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/is-this-data-identifying/main.html"
        height="642px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

After using this MicroSim, the learner can **classify** eight data fields as direct identifiers, identifiers in combination, or not identifying, correctly placing at least seven of eight on the first attempt. (Bloom level: Understand.)

### Audience

Teachers, administrators, school board members, policymakers, and parents.

### Duration

10 minutes

### Prerequisites

- Student data, personally identifiable data, direct identifier, indirect identifier, and small-group identification, from the section "What Counts as Student Data" in Chapter 10

### Activities

1. **Classify (6 min).** Sort the eight fields. Before you choose, ask: could this field, alone or with one other fact, point to one student?
2. **Notice (2 min).** Look at the chips in the middle category. Neither field contains a name. What makes each one identifying?
3. **Apply (4 min).** List three fields your own school shares with a vendor. Classify each one.

### Assessment

Mastery is 7 of 8 correct on the first try. Only the first answer to each field on the first run counts. Then ask learners to answer these without the MicroSim:

1. A report shows the average reading score for one class of 28 students. Which category? *(Not identifying, as long as no subgroup in it is very small.)*
2. A spreadsheet has no names but lists birth date, ZIP code, and gender. Is it anonymous? *(No. Together these three facts identify most people.)*
3. Can group data ever identify a person? *(Yes. When the group has one member, the group's facts describe that student.)*

## References

1. [Personal data](https://en.wikipedia.org/wiki/Personal_data). Wikipedia. What counts as personally identifiable information.
2. [Quasi-identifier](https://en.wikipedia.org/wiki/Quasi-identifier). Wikipedia. Fields that identify a person only in combination.
3. [Latanya Sweeney](https://en.wikipedia.org/wiki/Latanya_Sweeney). Wikipedia. The researcher behind the birth date, ZIP code, and gender finding.
4. [De-identification](https://en.wikipedia.org/wiki/De-identification). Wikipedia. Methods for removing identifying information, and their limits.
