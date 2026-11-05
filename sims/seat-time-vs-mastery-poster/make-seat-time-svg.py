"""Generate a text-free SVG for the Seat Time vs. Mastery grid poster.

Two staircases built from the same five concept blocks. Each block is a slab
row: row 1 (the foundation) spans the whole staircase and row 5 is the single
top step, so every later concept rests on the earlier ones.

Left half, seat time: a wall calendar sheds pages, a clock and bell watch the
room, and a conveyor belt carries students along on schedule. The staircase has
a cracked first block and a hole in the second, so the top three blocks sag and
the student on top wobbles.

Right half, mastery: the same five blocks, all whole and each marked with a
green check shape. Students stand at different heights. At the foot of the
stairs a coach hands a stuck student the missing block, and a shared afternoon
table brings students of every height together.

No text anywhere. Run: python3 make-seat-time-svg.py seat-time-vs-mastery-poster.svg
The script prints the zone rectangles (percent of width and height) for data.json.
"""
import sys

W, H = 1600, 800
FLOOR = 720
DIV = 800                      # centre of the divider between the halves
ROW_H, COL_W = 90, 66          # slab height, tread width
COLORS = ["#4f86c6", "#e0a030", "#9b6fc4", "#3fa58e", "#e06a5a"]   # concepts 1..5
DARK = ["#2f5f99", "#a8741a", "#6d4596", "#26735f", "#a8463a"]

L_X0, L_X1 = 455, 785          # left staircase, rises to the right
R_X0, R_X1 = 815, 1145         # right staircase, rises to the left (mirror)


def person(x, y, color, scale=1.8, arms="down", hair="#4a3426", skin="#f2c9a0", rot=0):
    """Figure whose feet sit at (x, y). arms: down | up | out | reach."""
    arm = {
        "down": '<path d="M-6,-27 L-10,-12 M6,-27 L10,-12"/>',
        "up": '<path d="M-6,-27 L-13,-44 M6,-27 L13,-44"/>',
        "out": '<path d="M-6,-26 L-20,-32 M6,-26 L20,-20"/>',
        "reach": '<path d="M-6,-27 L-10,-12 M6,-27 L20,-24"/>',
    }[arms]
    return (f'<g transform="translate({x:.1f},{y:.1f}) rotate({rot}) scale({scale})">'
            f'<g stroke="{color}" stroke-width="4" stroke-linecap="round" fill="none">{arm}</g>'
            f'<rect x="-6" y="-30" width="12" height="22" rx="5" fill="{color}"/>'
            f'<rect x="-5" y="-10" width="4" height="10" fill="#3b3b3b"/>'
            f'<rect x="1" y="-10" width="4" height="10" fill="#3b3b3b"/>'
            f'<circle cx="0" cy="-37" r="7" fill="{skin}"/>'
            f'<path d="M-7,-38 Q0,-48 7,-38 Q3,-41 0,-41 Q-4,-41 -7,-38 Z" fill="{hair}"/></g>')


def slab(x0, x1, row, extra=""):
    y0 = FLOOR - ROW_H * row
    c, d = COLORS[row - 1], DARK[row - 1]
    return (f'<rect x="{x0}" y="{y0}" width="{x1 - x0}" height="{ROW_H}" rx="6" fill="{c}" '
            f'stroke="{d}" stroke-width="3"/>'
            f'<rect x="{x0 + 5}" y="{y0 + 5}" width="{x1 - x0 - 10}" height="10" rx="4" '
            f'fill="#ffffff" opacity="0.25"/>{extra}')


def check(cx, cy, r=21):
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="#2d8a4e" stroke="#ffffff" stroke-width="4"/>'
            f'<path d="M{cx - 10},{cy + 1} L{cx - 3},{cy + 9} L{cx + 11},{cy - 8}" fill="none" '
            f'stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>')


out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">']
out.append('''<defs>
<linearGradient id="wallL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7ecdc"/><stop offset="1" stop-color="#efdcc2"/></linearGradient>
<linearGradient id="wallR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8f5ea"/><stop offset="1" stop-color="#d4ebd8"/></linearGradient>
</defs>''')

# ---- walls and floors ----------------------------------------------------
out.append(f'<rect x="0" y="0" width="{DIV}" height="{H}" fill="url(#wallL)"/>')
out.append(f'<rect x="{DIV}" y="0" width="{W - DIV}" height="{H}" fill="url(#wallR)"/>')
out.append(f'<rect x="0" y="{FLOOR}" width="{DIV}" height="{H - FLOOR}" fill="#c9a77c"/>')
out.append(f'<rect x="{DIV}" y="{FLOOR}" width="{W - DIV}" height="{H - FLOOR}" fill="#a7c796"/>')
for x in range(0, DIV, 80):
    out.append(f'<line x1="{x}" y1="{FLOOR}" x2="{x - 30}" y2="{H}" stroke="#b08d63" stroke-width="2"/>')
for x in range(DIV + 40, W, 80):
    out.append(f'<line x1="{x}" y1="{FLOOR}" x2="{x + 30}" y2="{H}" stroke="#8fb47e" stroke-width="2"/>')
out.append(f'<rect x="0" y="{FLOOR - 4}" width="{W}" height="6" fill="#7d6a55" opacity="0.5"/>')
# divider
out.append(f'<rect x="{DIV - 6}" y="0" width="12" height="{H}" fill="#5a6270"/>')

# ======================= LEFT HALF: SEAT TIME =============================
# wall calendar with a red header and two rings; grid of days, most crossed off
cx0, cy0, cw, ch = 70, 120, 210, 250
out.append(f'<rect x="{cx0 + 6}" y="{cy0 + 8}" width="{cw}" height="{ch}" rx="8" fill="#000" opacity="0.12"/>')
out.append(f'<rect x="{cx0}" y="{cy0}" width="{cw}" height="{ch}" rx="8" fill="#ffffff" stroke="#8a7a66" stroke-width="3"/>')
out.append(f'<rect x="{cx0}" y="{cy0}" width="{cw}" height="56" rx="8" fill="#d9534f"/>')
out.append(f'<rect x="{cx0}" y="{cy0 + 40}" width="{cw}" height="16" fill="#d9534f"/>')
for rx in (cx0 + 55, cx0 + cw - 55):
    out.append(f'<rect x="{rx - 6}" y="{cy0 - 16}" width="12" height="30" rx="6" fill="#7a7a7a"/>')
gx, gy, cell = cx0 + 15, cy0 + 70, 36
for r in range(4):
    for c in range(5):
        x, y = gx + c * cell, gy + r * 42
        out.append(f'<rect x="{x}" y="{y}" width="{cell - 6}" height="34" rx="3" fill="#f3f3f3" stroke="#cfcfcf" stroke-width="2"/>')
        if r * 5 + c < 17:   # days already gone
            out.append(f'<path d="M{x + 6},{y + 6} L{x + cell - 12},{y + 28} M{x + cell - 12},{y + 6} L{x + 6},{y + 28}" '
                       f'stroke="#d9534f" stroke-width="3" stroke-linecap="round"/>')
# torn pages flying off toward the stairs
for px, py, rot, s in [(318, 150, 18, 0.55), (372, 232, 34, 0.45), (300, 300, -12, 0.5)]:
    out.append(f'<g transform="translate({px},{py}) rotate({rot}) scale({s})">'
               f'<rect x="-60" y="-70" width="120" height="140" rx="6" fill="#ffffff" stroke="#8a7a66" stroke-width="4"/>'
               f'<rect x="-60" y="-70" width="120" height="34" rx="6" fill="#d9534f"/></g>')
# motion streaks behind the pages
for x1, y1, x2, y2 in [(262, 140, 290, 145), (330, 222, 350, 228), (262, 296, 280, 300)]:
    out.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="#b9a68c" stroke-width="4" stroke-linecap="round"/>')
# wall clock
clx, cly = 175, 490
out.append(f'<circle cx="{clx}" cy="{cly}" r="62" fill="#ffffff" stroke="#3d4452" stroke-width="9"/>')
for i in range(12):
    import math
    a = math.radians(i * 30)
    x1, y1 = clx + 48 * math.sin(a), cly - 48 * math.cos(a)
    x2, y2 = clx + 54 * math.sin(a), cly - 54 * math.cos(a)
    out.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="#3d4452" stroke-width="4"/>')
out.append(f'<line x1="{clx}" y1="{cly}" x2="{clx}" y2="{cly - 40}" stroke="#3d4452" stroke-width="6" stroke-linecap="round"/>')
out.append(f'<line x1="{clx}" y1="{cly}" x2="{clx + 26}" y2="{cly + 12}" stroke="#3d4452" stroke-width="6" stroke-linecap="round"/>')
out.append(f'<circle cx="{clx}" cy="{cly}" r="6" fill="#d9534f"/>')
# school bell on the wall, ringing
bx, by = 360, 430
out.append(f'<rect x="{bx - 8}" y="{by - 50}" width="16" height="22" fill="#6b5a45"/>')
out.append(f'<path d="M{bx - 40},{by + 12} Q{bx - 40},{by - 32} {bx},{by - 32} Q{bx + 40},{by - 32} {bx + 40},{by + 12} Z" fill="#e5b33b" stroke="#a7801e" stroke-width="3"/>')
out.append(f'<rect x="{bx - 46}" y="{by + 10}" width="92" height="10" rx="4" fill="#c9962a"/>')
out.append(f'<circle cx="{bx}" cy="{by + 26}" r="8" fill="#a7801e"/>')
for s in (1, -1):
    out.append(f'<path d="M{bx + s * 56},{by - 22} Q{bx + s * 68},{by - 2} {bx + s * 56},{by + 18}" fill="none" stroke="#a7801e" stroke-width="4" stroke-linecap="round"/>')
    out.append(f'<path d="M{bx + s * 70},{by - 32} Q{bx + s * 86},{by - 2} {bx + s * 70},{by + 28}" fill="none" stroke="#a7801e" stroke-width="4" stroke-linecap="round"/>')
# conveyor belt carrying students on schedule
out.append(f'<rect x="40" y="672" width="400" height="26" rx="13" fill="#4a505c"/>')
for x in range(56, 440, 32):
    out.append(f'<circle cx="{x}" cy="685" r="8" fill="#8d95a3"/>')
out.append('<rect x="70" y="698" width="12" height="22" fill="#4a505c"/><rect x="400" y="698" width="12" height="22" fill="#4a505c"/>')
for y in (612, 632, 652):
    out.append(f'<line x1="52" y1="{y}" x2="96" y2="{y}" stroke="#b9a68c" stroke-width="4" stroke-linecap="round"/>')
out.append(person(170, 672, "#d9534f", arms="down"))
out.append(person(270, 672, "#4f86c6", arms="down", hair="#2b2b2b", skin="#c68e5f"))
out.append(person(370, 672, "#7a9e3d", arms="down", hair="#a0522d"))

# left staircase (seat time): row r spans x from L_X0 + COL_W*(r-1) to L_X1
row1 = slab(L_X0, L_X1, 1)
# crack in the foundation
row1 += (f'<path d="M560,632 L572,655 L563,672 L578,694 L570,718" fill="none" stroke="#1e3a5f" '
         f'stroke-width="4" stroke-linejoin="round"/>')
out.append(row1)
y2 = FLOOR - 2 * ROW_H
row2 = slab(L_X0 + COL_W, L_X1, 2)
# a hole punched through the second block
row2 += (f'<polygon points="612,{y2 + 4} 676,{y2 + 4} 690,{y2 + 40} 668,{y2 + 86} 624,{y2 + 86} 604,{y2 + 46}" '
         f'fill="#3a2f26"/>')
row2 += (f'<path d="M690,{y2 + 40} L716,{y2 + 30} L740,{y2 + 52} M604,{y2 + 46} L580,{y2 + 62} L560,{y2 + 56}" '
         f'fill="none" stroke="#6b4a12" stroke-width="4" stroke-linejoin="round"/>')
out.append(row2)
# rubble from the hole, lying on the first step
for rx, ry, rr in [(478, 624, 9), (497, 627, 6), (510, 625, 7)]:
    out.append(f'<polygon points="{rx - rr},{ry + 6} {rx},{ry - rr} {rx + rr},{ry + 6}" fill="#e0a030" stroke="#a8741a" stroke-width="2"/>')
# rows 3-5 sag into the hole: tilt them about the right end of row 2
upper = [slab(L_X0 + COL_W * (r - 1), L_X1, r) for r in (3, 4, 5)]
top_y = FLOOR - 5 * ROW_H
tread_x = (L_X0 + COL_W * 4 + L_X1) / 2
upper.append(person(tread_x - 4, top_y, "#4f86c6", arms="out", rot=-12))
# sweat drops
upper.append(f'<path d="M{tread_x + 26},{top_y - 82} q5,9 0,13 q-5,-4 0,-13 Z" fill="#5fb0e0"/>'
             f'<path d="M{tread_x + 36},{top_y - 66} q4,7 0,10 q-4,-3 0,-10 Z" fill="#5fb0e0"/>')
out.append(f'<g transform="rotate(-4 {L_X1} {FLOOR - 2 * ROW_H})">' + "".join(upper) + '</g>')
# wobble marks beside the tilting top
for k, (dx, dy) in enumerate([(0, 0), (14, 10)]):
    out.append(f'<path d="M{L_X1 - 150 - dx},{top_y + 20 + dy} q-14,18 0,36 q14,18 0,36" fill="none" '
               f'stroke="#8a6a4a" stroke-width="4" stroke-linecap="round"/>')

# ======================= RIGHT HALF: MASTERY ==============================
# right staircase (mirror): row r spans x from R_X0 to R_X1 - COL_W*(r-1)
for r in range(1, 6):
    x1 = R_X1 - COL_W * (r - 1)
    cx = x1 - COL_W / 2
    out.append(slab(R_X0, x1, r, check(cx, FLOOR - ROW_H * r + ROW_H / 2)))
# student on the top step, arms raised (finished early)
out.append(person(R_X0 + COL_W / 2, FLOOR - 5 * ROW_H, "#e06a5a", arms="up", hair="#2b2b2b", skin="#c68e5f"))
# student partway up, on step 3
out.append(person(R_X1 - COL_W * 2.5, FLOOR - 3 * ROW_H, "#9b6fc4", arms="down", hair="#a0522d"))
# student on step 1
out.append(person(R_X1 - COL_W * 0.5, FLOOR - 1 * ROW_H, "#3fa58e", arms="down"))

# coach handing the stuck student a missing amber block (gap filling)
sx = 1225
out.append(person(sx, FLOOR, "#7a9e3d", arms="reach", hair="#4a3426", rot=0))
out.append(person(sx + 85, FLOOR, "#3d6fa8", scale=2.4, arms="down", hair="#9a9a9a", skin="#e0b48a"))
out.append(f'<g transform="translate({sx + 50},{FLOOR - 66})">'
           '<rect x="-22" y="-14" width="44" height="28" rx="4" fill="#e0a030" stroke="#a8741a" stroke-width="3"/></g>')
# coach's arm holding the block
out.append(f'<path d="M{sx + 75},{FLOOR - 62} L{sx + 62},{FLOOR - 64}" stroke="#3d6fa8" stroke-width="9" stroke-linecap="round"/>')
# a little sparkle at the hand-off
for ang in range(0, 360, 60):
    import math
    a = math.radians(ang)
    out.append(f'<line x1="{sx + 50 + 26 * math.cos(a):.1f}" y1="{FLOOR - 66 + 26 * math.sin(a):.1f}" '
               f'x2="{sx + 50 + 34 * math.cos(a):.1f}" y2="{FLOOR - 66 + 34 * math.sin(a):.1f}" '
               f'stroke="#f2c14e" stroke-width="3" stroke-linecap="round"/>')

# shared afternoon project table: students of every height together
tx, ty = 1490, 668
# two students behind the workbench (drawn first so its front panel hides their legs)
out.append(person(tx + 10, FLOOR, "#4f86c6", scale=2.5, arms="up", hair="#a0522d"))
out.append(person(tx + 68, FLOOR, "#9b6fc4", scale=2.2, arms="down", hair="#4a3426"))
out.append(f'<rect x="{tx - 100}" y="{ty}" width="200" height="{FLOOR - ty}" rx="6" fill="#a8743f" stroke="#7a5228" stroke-width="3"/>')
out.append(f'<rect x="{tx - 100}" y="{ty}" width="200" height="14" rx="6" fill="#c08a52" stroke="#7a5228" stroke-width="3"/>')
out.append(f'<line x1="{tx - 30}" y1="{ty + 14}" x2="{tx - 30}" y2="{FLOOR}" stroke="#7a5228" stroke-width="3"/>')
out.append(f'<line x1="{tx + 40}" y1="{ty + 14}" x2="{tx + 40}" y2="{FLOOR}" stroke="#7a5228" stroke-width="3"/>')
# a student at the left end of the bench, reaching in to help build
out.append(person(tx - 122, FLOOR, "#e06a5a", arms="reach", hair="#2b2b2b", skin="#c68e5f"))
# project on the bench: a small model house
out.append(f'<rect x="{tx - 72}" y="{ty - 44}" width="56" height="44" fill="#f2d7a6" stroke="#a8743f" stroke-width="3"/>'
           f'<polygon points="{tx - 80},{ty - 44} {tx - 44},{ty - 74} {tx - 8},{ty - 44}" fill="#d9534f" stroke="#a8463a" stroke-width="3"/>'
           f'<rect x="{tx - 50}" y="{ty - 26}" width="14" height="26" fill="#7a5228"/>')
# afternoon sun through a window on the wall
out.append('<rect x="1350" y="140" width="210" height="170" rx="10" fill="#cfe8f7" stroke="#8fb47e" stroke-width="8"/>'
           '<line x1="1455" y1="140" x2="1455" y2="310" stroke="#8fb47e" stroke-width="6"/>'
           '<line x1="1350" y1="225" x2="1560" y2="225" stroke="#8fb47e" stroke-width="6"/>'
           '<circle cx="1510" cy="270" r="26" fill="#ffd77a"/>')

out.append('</svg>')

dest = sys.argv[1] if len(sys.argv) > 1 else "seat-time-vs-mastery-poster.svg"
with open(dest, "w") as f:
    f.write("\n".join(out))

# ---- zone rectangles for data.json (percent of W and H) -------------------
def pct(v, total):
    return round(100 * v / total, 1)

ROW2_TOP = FLOOR - 2 * ROW_H
zones = {
    "seat-calendar":        (8, 64, 448, 752),
    "seat-wobbling-top":    (448, 64, DIV - 8, ROW2_TOP),
    "seat-cracked-blocks":  (448, ROW2_TOP, DIV - 8, 752),
    "mastery-spread":       (DIV + 8, 64, 1152, ROW2_TOP),
    "mastery-solid-blocks": (DIV + 8, ROW2_TOP, 1152, 752),
    "mastery-response":     (1152, 64, W - 8, 752),
}
for zid, (x1, y1, x2, y2) in zones.items():
    print(f"{zid:22s} x1={pct(x1, W)} y1={pct(y1, H)} x2={pct(x2, W)} y2={pct(y2, H)}")
