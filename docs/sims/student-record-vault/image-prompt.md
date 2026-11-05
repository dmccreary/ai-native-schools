# The Student Record Vault — Image Generation Prompt

Optional. The sim already ships with a hand-built SVG (`student-record-vault.svg`),
which is the working image. Use this prompt only if you want a painted version. Save the
result as `student-record-vault.png`, change `image` in `data.json` and `src` in
`main.html`, then check the markers with `main.html?edit=true`. The positions below
match the SVG, so the existing marker coordinates should need only small nudges.

Please generate a new image.

## Critical Rule

**This image must contain absolutely no text, labels, letters, numbers, arrows, callout
lines or annotation marks of any kind — including a title or any heading.** No writing on
papers, signs, flags, folders, cards or screens: papers carry only gray lines. All labeling
and the title are added by an interactive HTML overlay.

## Image Specifications

- **Format**: PNG
- **Dimensions**: 1600 × 800 px (landscape, 2:1)
- **View**: a high three-quarter view looking down on a round walled vault set in a meadow,
  so the walls appear as concentric ellipses (each ellipse is about 0.62 times as tall as it
  is wide) and the people and objects stand upright.
- **Style**: a warm, painted storybook illustration for an adult education textbook. Soft
  brushwork, gentle light from the upper right, simple rounded figures with no facial detail.
  Calm and trustworthy, not dark or threatening.

## Palette

| Use | Hex |
|---|---|
| Meadow grass | #B9D99A to #93C070 |
| Sky band at the very top | #CFE6F6 |
| Stone walls (top / face) | #B9BBC6 / #8A8C98 |
| Outer ring floor (vendors) | #E3DCF0 lavender |
| Third ring floor (district) | #D6EAD0 pale green |
| Second ring floor (school) | #D4E5F3 pale blue |
| Inner ring floor (family) | #FBEFC6 warm cream |
| Folder and its glow | #F3C862 with a #FFF6B0 halo |
| Iron gates | #34495E |
| Breach crack | #2B2D36 |
| Accent red, orange, purple, teal | #C0392B, #E67E22, #8E44AD, #1ABC9C |

## What to Draw

All positions are percentages of the image: x from the left edge, y from the top edge.

### The vault: four concentric walls
Centered at **x 50%, y 51%**. Low gray stone walls, each about as thick as a garden wall, with
a visible top and front face. Half-widths and half-heights of the four ellipses:

| Wall | Half-width (x) | Half-height (y) | Floor inside it |
|---|---|---|---|
| Inner (student and family) | 9.4% | 11.6% | warm cream |
| Second (teacher and school) | 16.6% | 20.5% | pale blue |
| Third (district) | 24.4% | 30.2% | pale green |
| Outer (vendors and researchers) | 32.5% | 40.3% | lavender |

The outer wall's top edge sits near y 11% and its bottom edge near y 91%.

### 1. Glowing folder (the record)
**Position**: x 50%, y 50%. **Visual**: a gold manila folder with blank papers peeking out and
a small identity card clipped to its front (a gray head-and-shoulders silhouette and two gray
lines, no writing). A soft golden glow surrounds it.

### 2. Student with laptop and click trail
**Position**: student's feet at x 55.4%, y 58%; marker area x 55.5%, y 54.5%. **Visual**: a
child in an orange top holding an open laptop with a blue screen. A trail of five small blue
dots and two tiny white mouse-cursor arrows drifts from the laptop up and left toward the folder.

### 3. Family with a gold key
**Position**: x 42–45%, y 53–58%. **Visual**: two adults, one in teal and one in red; the one in
red holds up a large gold key.

### Inner gate
**Position**: x 50%, y 65% (bottom of the inner wall). A small iron gate between two stone pillars.

### 4. School gate with a bell
**Position**: x 50%, y 29% (top of the second wall). **Visual**: an arched iron gate between two
stone pillars with a small brass bell mounted on top. A teacher in blue holding a red apple stands
just inside, at x 54%, y 38%.

### 7. District office
**Position**: x 29–31%, y 47–54% (left side of the third ring). **Visual**: a small cream building
with columns and a red roof, and a figure in purple holding a clipboard beside it.

### District gate
**Position**: x 62%, y 79% (lower right of the third wall). An iron gate between pillars.

### 9. Shredder
**Position**: x 53%, y 76%, in the third ring just left of the district gate. **Visual**: a gray
office shredder with a blank sheet feeding into its top slot and thin white strips falling below.

### 10. Vendors and a researcher
**Position**: x 60–68%, y 15–24% (upper right of the outer ring). **Visual**: two figures in gray and
navy carrying brown briefcases, a figure in a white coat holding a magnifying glass, and a small dark
server cabinet with green lights.

### 8. Main gate and funnel
**Position**: main gate at x 17.5%, y 53% (left side of the outer wall), where a sandy path arrives
from the left edge (path enters at x 0%, y 65%). Funnel at **x 13.5%, y 46%**: a large metal funnel
with a pile of blank sheets crowding its mouth and a single sheet dropping out of the spout toward the
gate. A few discarded sheets lie on the grass to its left.

### 5. Small low gate with a height post
**Position**: x 29.5%, y 82% (lower left of the outer wall). **Visual**: a noticeably smaller, lower
red iron gate, a child in orange standing beside it, and a yellow height post with tick marks (no
numbers) and a red bar at child height.

### 6. Gate with a ring-of-stars flag
**Position**: x 78%, y 31% (upper right of the outer wall). **Visual**: an iron gate between pillars
with a small blue flag above it bearing a circle of twelve gold stars.

### 11. Breach crack
**Position**: x 81–86%, y 55–66% (right side of the outer wall). **Visual**: a jagged dark break through
the wall with broken stone stumps and rubble. Blank white sheets blow out of it to the right
(x 84–94%, y 54–64%) with soft white wind lines. A single gray key lies on the ground at x 82%, y 70%.

### 13. Desk with a tilted balance scale
**Position**: x 88–94%, y 74–90% (lower right, outside the walls). **Visual**: a wooden desk with a brass
balance scale on it; the beam tilts, with the left pan lower holding three small blue blocks and the
right pan higher holding one orange block. A figure in teal with a magnifying glass stands just left of
the desk at x 84%, y 90%.

### 14. Parent and school leader
**Position**: x 8–13%, y 70–80% (lower left, by the path). **Visual**: a man in dark navy holding a
small stack of papers close to his chest, facing a woman in purple who holds out an open hand.

### 12. Boarded-up warehouse
**Position**: x 2–16%, y 14–31% (upper left). **Visual**: a large gray warehouse with its big doors
boarded over by two crossed planks, a small padlock, boarded windows, and green vines climbing the walls.
It looks abandoned, not ruined.

### Background
A pale sky band across the top 8% with a small sun at the upper right (x 93%, y 4%) and two small clouds.
Meadow everywhere else, with a few round trees along the right edge (x 87–98%) and small grass tufts.

## Layout Notes

Keep every numbered object at least 5% from its neighbors so the overlay markers do not overlap,
especially the folder, the family and the student in the inner ring. Keep the walls continuous except
at the gates and the breach.

**Again: no text, letters, numbers or writing anywhere in the image — not on the papers, the folder,
the card, the flag, the laptop screen or the building.**
