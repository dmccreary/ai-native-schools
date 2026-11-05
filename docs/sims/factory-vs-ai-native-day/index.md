---
title: "The Factory Day vs. the AI-Native Day"
description: "An interactive poster of two school buildings in cross-section: the industrial-era factory day on the left and the AI-native day on the right, with six zones for the teacher's role, the morning and the afternoon in each school."
status: built
social:
   cards: false
hide:
    - toc
---

<iframe src="main.html" height="720px" width="100%" scrolling="no"></iframe>

[Run The Factory Day vs. the AI-Native Day MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Chapter 3: School Structures, Equity, and the Industrial-Era Legacy](../../chapters/03-school-structures-equity-industrial-era/index.md){ .md-button }
[Chapter 20: Designing the AI-Native School Day](../../chapters/20-designing-ai-native-school-day/index.md){ .md-button }

You can add this MicroSim to any web page with this `iframe`:

```html
<iframe src="https://dmccreary.github.io/ai-native-schools/sims/factory-vs-ai-native-day/main.html"
        height="720px"
        width="100%"
        scrolling="no"></iframe>
```

## About This MicroSim

The whole argument of this book is a comparison between two school days. This poster puts them side by side as two buildings cut open so you can see every floor.

The **factory school** on the left has a sawtooth roof and a smokestack. In its morning and afternoon classrooms, students of one age sit in identical rows facing one board, under a large clock and a bell. Upstairs, the teacher sits late at night behind stacks of ungraded paper.

The **AI-native school** on the right has the same three floors used differently. In the morning, students work at their own pace along a winding learning path while a coach moves between them, and one student takes a stretch break away from the screen. In the afternoon, the rooms open into a project table with a robot, a stage, a workshop and a garden. Upstairs, the teacher meets one student as a mentor.

The poster also shows the risks. One student in the AI-native morning works alone, hunched over a laptop, which is the isolation risk that screen-time limits and small-group coaching answer. The facts for each floor name the risk and the school's response.

## How to Use

- **Explore:** hover over a floor to see its name, then click it to read a summary and facts from the chapters.
- **Quiz Me:** the sim describes part of a school day, and you click the floor where it happens. Your score shows next to the buttons.
- **Calibrate (authors):** open [`main.html?edit=true`](./main.html?edit=true) to drag zone corners, then copy the JSON into `data.json`.

## The Six Zones

1. **Factory teacher: lecturer and grader**: one adult lectures and grades for every student, working long weeks
2. **Factory morning: one lesson, one pace**: the bell schedule, age-based grade levels, seat time and the Carnegie unit
3. **Factory afternoon: more of the same**: the same rows and the same bell, one subject at a time
4. **AI-native teacher: coach and mentor**: the changing teacher role, with about the same number of adults doing different work
5. **AI-native morning: compressed and self-paced**: about two to three hours of mastery learning at each student's own pace, with screen-time limits
6. **AI-native afternoon: pro-social**: projects, arts, making and service, structured so the time does not drift

Every number in the zones comes from the book's chapters, and each fact names its chapter. The length of the compressed morning, "about two to three hours", is the book's own phrase from Chapter 11.

The background is a text-free SVG made by `make-factory-day-svg.py` in this folder. That script also prints the zone percentages used in `data.json`. The SVG is the working image. `image-prompt.md` describes the same scene for an optional painted version, with every object placed so the same zones still fit.

## Lesson Plan

### Learning Objective

The learner will compare the industrial-era school day with the AI-native school day, explaining for the morning, the afternoon and the teacher's role what changes, why it changes, and which risk each change brings and how a school responds. (Bloom level: Analyze; verb: compare.)

### Audience

School and district leaders, teachers, school board members and parents.

### Duration

15 minutes.

### Activities

1. **Explore (6 minutes):** click all six floors. For each AI-native floor, find the factory floor directly across from it and note one difference.
2. **Quiz (4 minutes):** run Quiz Me until you can place every description on the right floor.
3. **Apply (5 minutes):** sketch your own school's day as a building with three floors. Which floor looks most like the factory school? Name one risk of changing it and how you would respond to that risk.

### Assessment

The learner scores at least 8 of 9 in Quiz Me and can name, for each of the three floors, one change from the factory day to the AI-native day together with its risk and the school's response.

## References

- Chapter 3: [School Structures, Equity, and the Industrial-Era Legacy](../../chapters/03-school-structures-equity-industrial-era/index.md)
- Chapter 11: [Mastery Learning and the Case for a Compressed Morning](../../chapters/11-mastery-learning-case-compressed-morning/index.md)
- Chapter 14: [The Pro-Social Afternoon](../../chapters/14-pro-social-afternoon/index.md)
- Chapter 20: [Designing the AI-Native School Day](../../chapters/20-designing-ai-native-school-day/index.md)
- Tyack, D., & Cuban, L. (1995). *Tinkering Toward Utopia: A Century of Public School Reform*. Harvard University Press.
- [Carnegie Unit](https://en.wikipedia.org/wiki/Carnegie_Unit_and_Student_Hour) - Wikipedia
