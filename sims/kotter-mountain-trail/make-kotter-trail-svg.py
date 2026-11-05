"""Generate a text-free SVG mountain for the Kotter's Eight Steps overlay.

A switchback trail climbs from base to summit through eight camps, one per
Kotter step. Two hazards: a climber sliding down a shortcut gully (skipping
steps) and a half-built cairn on a false summit (declaring victory too soon).
No text anywhere. Run: python3 make-kotter-trail-svg.py kotter-mountain-trail.svg
"""
import math, sys

W, H = 1600, 800

# camp ledges (x, y) = ground point on the trail, in climbing order
CAMPS = [(440, 690), (1020, 640), (575, 545), (1065, 470),
         (690, 395), (1010, 315), (790, 228), (880, 92)]
TRAIL_START = (300, 790)
FALSE_SUMMIT = (1300, 300)
GULLY_TOP, GULLY_BOT = (615, 402), (200, 745)

MOUNTAIN = [(40, 800), (250, 640), (420, 500), (560, 330), (700, 205), (820, 112),
            (880, 80), (940, 112), (1060, 228), (1180, 322), (1250, 312),
            (1300, 296), (1345, 330), (1400, 380), (1480, 540), (1590, 800)]

def pts(p):
    return " ".join(f"{x:.0f},{y:.0f}" for x, y in p)

def person(x, y, color, scale=1.3, extra="", rot=0):
    """Standing figure whose feet sit at (x, y)."""
    return (f'<g transform="translate({x:.1f},{y:.1f}) rotate({rot}) scale({scale})">'
            f'<rect x="-6" y="-30" width="12" height="22" rx="5" fill="{color}"/>'
            f'<rect x="-5" y="-10" width="4" height="10" fill="#3b3b3b"/>'
            f'<rect x="1" y="-10" width="4" height="10" fill="#3b3b3b"/>'
            f'<rect x="-9" y="-29" width="5" height="14" rx="2" fill="#6d4c2f"/>'  # backpack
            f'<circle cx="0" cy="-37" r="7" fill="#f2c9a0"/>'
            f'<path d="M-7,-39 Q0,-49 7,-39 Z" fill="{color}"/>{extra}</g>')

def tent(x, y, color, s=1.0):
    return (f'<g transform="translate({x},{y}) scale({s})">'
            f'<polygon points="-26,0 0,-34 26,0" fill="{color}" stroke="#5a3d22" stroke-width="2"/>'
            f'<polygon points="-7,0 0,-20 7,0" fill="#3d2b1a"/></g>')

def ledge(x, y, w=150):
    return (f'<ellipse cx="{x}" cy="{y + 6}" rx="{w / 2}" ry="12" fill="#8c7a66"/>'
            f'<ellipse cx="{x}" cy="{y + 2}" rx="{w / 2 - 6}" ry="8" fill="#c9b48f"/>')

out = []
out.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">')
out.append(f'''<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe0f5"/><stop offset="1" stop-color="#f1f8fc"/></linearGradient>
<linearGradient id="rock" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9a8a78"/><stop offset="0.55" stop-color="#857563"/><stop offset="1" stop-color="#6d5f50"/></linearGradient>
<linearGradient id="gully" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5b4d40"/><stop offset="1" stop-color="#3e342b"/></linearGradient>
<clipPath id="mtn"><polygon points="{pts(MOUNTAIN)}"/></clipPath>
</defs>''')
out.append(f'<rect width="{W}" height="{H}" fill="url(#sky)"/>')
out.append('<circle cx="1440" cy="100" r="50" fill="#ffd77a"/>')
for cx, cy, s in [(200, 110, 1.0), (470, 70, 0.7), (1130, 120, 0.85)]:
    out.append(f'<g transform="translate({cx},{cy}) scale({s})" fill="#ffffff">'
               '<ellipse cx="0" cy="0" rx="60" ry="22"/><ellipse cx="40" cy="-14" rx="40" ry="24"/>'
               '<ellipse cx="-38" cy="-8" rx="32" ry="18"/></g>')
# distant range
out.append('<polygon points="0,800 0,520 120,430 230,500 330,410 430,520 1150,520 1280,420 '
           '1420,480 1510,400 1600,470 1600,800" fill="#b7c9d8"/>')

# main mountain body with bands
out.append(f'<polygon points="{pts(MOUNTAIN)}" fill="url(#rock)"/>')
out.append('<g clip-path="url(#mtn)">')
# grassy lower slopes (wavy)
out.append('<path d="M0,800 L0,610 Q200,585 400,615 Q600,640 800,612 Q1000,585 1200,615 '
           'Q1400,640 1600,605 L1600,800 Z" fill="#8fbf6a"/>')
out.append('<path d="M0,800 L0,700 Q300,680 600,705 Q900,725 1200,700 Q1400,685 1600,705 L1600,800 Z" fill="#79ad57"/>')
# rock strata strokes
for x1, y1, x2, y2 in [(470, 470, 560, 455), (1120, 410, 1230, 425), (640, 300, 720, 290),
                       (1100, 560, 1230, 575), (960, 200, 1020, 215)]:
    out.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="#6a5b4c" stroke-width="3" stroke-linecap="round"/>')
# snow cap on the true summit
out.append('<polygon points="700,205 820,112 880,80 940,112 1010,180 975,172 950,195 915,170 '
           '880,190 845,168 805,198 770,178 735,205" fill="#ffffff"/>')
# a little snow on the false summit (lower, smaller)
out.append('<polygon points="1250,312 1300,296 1345,330 1325,330 1305,318 1285,330 1265,320" fill="#f3f7fa"/>')
out.append('</g>')
out.append(f'<polygon points="{pts(MOUNTAIN)}" fill="none" stroke="#5b4d40" stroke-width="3"/>')

# shortcut gully: a dark chute running down the left flank
gx0, gy0 = GULLY_TOP
gx1, gy1 = GULLY_BOT
def gully_c(t):  # centerline with a gentle bow
    bx = (gx1 - gx0) * t + gx0 - 20 * math.sin(math.pi * t)
    by = (gy1 - gy0) * t + gy0
    return bx, by
N = 24
left, right = [], []
for i in range(N + 1):
    t = i / N
    cx, cy = gully_c(t)
    hw = 3 + 30 * t
    left.append((cx - hw, cy)); right.append((cx + hw, cy))
out.append(f'<polygon points="{pts(left + right[::-1])}" fill="url(#gully)"/>')
# scree stones in the gully
for t in [0.15, 0.3, 0.42, 0.58, 0.7, 0.82, 0.93]:
    sx, sy = gully_c(t)
    sx += (8 if int(t * 100) % 2 else -6) * t
    out.append(f'<ellipse cx="{sx:.0f}" cy="{sy:.0f}" rx="6" ry="4" fill="#a39380"/>')
# loose stones piled at the gully foot
for dx, dy in [(-20, 4), (0, 0), (18, 6), (8, -8), (-8, -6)]:
    out.append(f'<ellipse cx="{gx1 + dx}" cy="{gy1 + dy}" rx="9" ry="6" fill="#9a8a78" stroke="#5b4d40"/>')

# trees at the base
for tx in [80, 135, 1420, 1480, 1540, 1260, 1330]:
    ty = 785 if tx < 300 or tx > 1400 else 772
    out.append(f'<g transform="translate({tx},{ty})"><rect x="-4" y="-14" width="8" height="14" fill="#6b4423"/>'
               '<polygon points="-22,-12 0,-62 22,-12" fill="#3f7d3a"/></g>')

# the main trail (switchbacks through every camp)
trail = [TRAIL_START] + CAMPS
out.append(f'<polyline points="{pts(trail)}" fill="none" stroke="#6b5537" stroke-width="12" '
           'stroke-linejoin="round" stroke-linecap="round"/>')
out.append(f'<polyline points="{pts(trail)}" fill="none" stroke="#e8d3a6" stroke-width="7" '
           'stroke-linejoin="round" stroke-linecap="round"/>')
# faint side path from camp 6 to the false summit
c6 = CAMPS[5]
out.append(f'<path d="M{c6[0] + 40},{c6[1]} Q1160,345 {FALSE_SUMMIT[0] - 12},{FALSE_SUMMIT[1] + 4}" '
           'fill="none" stroke="#e8d3a6" stroke-width="5" stroke-dasharray="10 9" stroke-linecap="round"/>')

for i, (x, y) in enumerate(CAMPS[:7]):
    out.append(ledge(x, y, 190 if i == 6 else 150))

# 1 sense of urgency: base camp with a red flare
x, y = CAMPS[0]
out.append(tent(x - 45, y, "#e67e22"))
out.append(f'<line x1="{x + 30}" y1="{y}" x2="{x + 30}" y2="{y - 62}" stroke="#5a3d22" stroke-width="4"/>')
out.append(f'<circle cx="{x + 30}" cy="{y - 70}" r="18" fill="#ff7b5c" opacity="0.45"/>')
out.append(f'<polygon points="{x + 22},{y - 62} {x + 30},{y - 92} {x + 38},{y - 62}" fill="#e74c3c"/>')
out.append(f'<polygon points="{x + 26},{y - 62} {x + 30},{y - 78} {x + 34},{y - 62}" fill="#ffd34d"/>')
for k, (dx, dy, r) in enumerate([(4, -104, 9), (14, -120, 11), (28, -138, 13)]):
    out.append(f'<circle cx="{x + 30 + dx}" cy="{y + dy}" r="{r}" fill="#d98880" opacity="{0.55 - k * 0.12:.2f}"/>')
out.append(person(x + 5, y, "#c0392b"))

# 2 guiding coalition: a rope team of four climbers
x, y = CAMPS[1]
team = [x - 54, x - 18, x + 18, x + 54]
colors = ["#2e86c1", "#16a085", "#8e44ad", "#d35400"]
for tx, col in zip(team, colors):
    out.append(person(tx, y, col))
rope = f"M{team[0]},{y - 22} " + " ".join(f"Q{(a + b) / 2},{y - 8} {b},{y - 22}" for a, b in zip(team, team[1:]))
out.append(f'<path d="{rope}" fill="none" stroke="#f1c40f" stroke-width="3"/>')

# 3 change vision: climber with a telescope aimed at the summit
x, y = CAMPS[2]
sx, sy = CAMPS[7]
ang = math.degrees(math.atan2(sy - (y - 48), sx - (x + 6)))
out.append(person(x - 8, y, "#e67e22"))
out.append(f'<g transform="translate({x - 2},{y - 50}) rotate({ang:.1f})">'
           '<rect x="0" y="-5" width="46" height="10" rx="3" fill="#34495e"/>'
           '<rect x="40" y="-7" width="10" height="14" rx="2" fill="#2c3e50"/></g>')
# tripod
out.append(f'<line x1="{x + 10}" y1="{y - 40}" x2="{x}" y2="{y}" stroke="#555" stroke-width="2.5"/>'
           f'<line x1="{x + 10}" y1="{y - 40}" x2="{x + 22}" y2="{y}" stroke="#555" stroke-width="2.5"/>')

# 4 communicating the vision: signal-flag station
x, y = CAMPS[3]
px = x + 40
out.append(f'<line x1="{px}" y1="{y}" x2="{px}" y2="{y - 110}" stroke="#5a3d22" stroke-width="5"/>')
for k, col in enumerate(["#e74c3c", "#f1c40f", "#3498db", "#2ecc71"]):
    fy = y - 108 + k * 24
    out.append(f'<polygon points="{px + 2},{fy} {px + 34},{fy + 9} {px + 2},{fy + 18}" fill="{col}"/>')
# semaphore signaller with two square flags, arms raised in a V
arms = (f'<line x1="-5" y1="-27" x2="-20" y2="-50" stroke="#2e86c1" stroke-width="4"/>'
        f'<line x1="5" y1="-27" x2="20" y2="-50" stroke="#2e86c1" stroke-width="4"/>'
        f'<rect x="-34" y="-64" width="14" height="14" fill="#e74c3c"/><rect x="-30" y="-64" width="7" height="7" fill="#f1c40f"/>'
        f'<rect x="20" y="-64" width="14" height="14" fill="#e74c3c"/><rect x="27" y="-64" width="7" height="7" fill="#f1c40f"/>')
out.append(person(x - 25, y, "#2e86c1", extra=arms))

# 5 removing obstacles: fallen logs across the trail, one being rolled aside
x, y = CAMPS[4]
for k, (dx, dy, rot) in enumerate([(-30, -6, -8), (-25, -18, 6)]):
    out.append(f'<g transform="translate({x + dx},{y + dy}) rotate({rot})">'
               '<rect x="-48" y="-7" width="96" height="14" rx="7" fill="#8b5a2b" stroke="#5a3d22" stroke-width="2"/>'
               '<ellipse cx="48" cy="0" rx="5" ry="7" fill="#d9a066" stroke="#5a3d22"/></g>')
# a log already pushed off the ledge edge
out.append(f'<g transform="translate({x - 35},{y + 48}) rotate(18)">'
           '<rect x="-34" y="-6" width="68" height="12" rx="6" fill="#8b5a2b" stroke="#5a3d22" stroke-width="2"/></g>')
pushing = '<line x1="-4" y1="-24" x2="-18" y2="-16" stroke="#27ae60" stroke-width="4"/>'
out.append(person(x + 50, y, "#27ae60", extra=pushing, rot=-8))

# 6 short-term wins: small flag planted on a jutting ledge
x, y = CAMPS[5]
out.append(f'<line x1="{x + 30}" y1="{y}" x2="{x + 30}" y2="{y - 58}" stroke="#5a3d22" stroke-width="3"/>')
out.append(f'<polygon points="{x + 31},{y - 58} {x + 62},{y - 48} {x + 31},{y - 38}" fill="#2ecc71"/>')
cheer = ('<line x1="-5" y1="-27" x2="-13" y2="-46" stroke="#f39c12" stroke-width="4"/>'
         '<line x1="5" y1="-27" x2="13" y2="-46" stroke="#f39c12" stroke-width="4"/>')
out.append(person(x - 15, y, "#f39c12", extra=cheer))

# 7 building on change: a wide camp with many tents
x, y = CAMPS[6]
for dx, col, s in [(-70, "#e67e22", 0.85), (-30, "#3498db", 0.95), (12, "#2ecc71", 0.9),
                   (52, "#9b59b6", 0.85), (85, "#e74c3c", 0.75)]:
    out.append(tent(x + dx, y, col, s))

# 8 anchoring in culture: a finished stone cairn on the summit
x, y = CAMPS[7]
stones = [(0, -6, 26, 9), (0, -20, 22, 8), (0, -33, 17, 7), (0, -44, 12, 6), (0, -53, 8, 5)]
for dx, dy, rx, ry in stones:
    out.append(f'<ellipse cx="{x + dx}" cy="{y + dy}" rx="{rx}" ry="{ry}" fill="#8e8e8e" stroke="#4d4d4d" stroke-width="2"/>')

# hazard 1: climber tumbling down the shortcut gully
hx, hy = (round(v) for v in gully_c(0.5))
out.append(f'<g transform="translate({hx},{hy}) rotate(-120) scale(1.3)">'
           '<rect x="-6" y="-30" width="12" height="22" rx="5" fill="#d9534f"/>'
           '<line x1="-2" y1="-10" x2="-10" y2="2" stroke="#3b3b3b" stroke-width="4"/>'
           '<line x1="2" y1="-10" x2="12" y2="-4" stroke="#3b3b3b" stroke-width="4"/>'
           '<line x1="-6" y1="-26" x2="-16" y2="-40" stroke="#d9534f" stroke-width="4"/>'
           '<line x1="6" y1="-26" x2="16" y2="-40" stroke="#d9534f" stroke-width="4"/>'
           '<circle cx="0" cy="-37" r="7" fill="#f2c9a0"/></g>')
for k in range(3):  # motion streaks above the slider
    out.append(f'<line x1="{hx + 40 + k * 10}" y1="{hy - 62 + k * 12}" x2="{hx + 72 + k * 10}" y2="{hy - 108 + k * 12}" '
               'stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.8"/>')

# hazard 2: half-built cairn on the false summit, with a celebrating climber
fx, fy = FALSE_SUMMIT
for dx, dy, rx, ry in [(0, -6, 24, 8), (2, -19, 18, 7)]:
    out.append(f'<ellipse cx="{fx + dx}" cy="{fy + dy}" rx="{rx}" ry="{ry}" fill="#8e8e8e" stroke="#4d4d4d" stroke-width="2"/>')
for dx, dy in [(34, 8), (46, 16), (-34, 10)]:  # unused stones lying nearby
    out.append(f'<ellipse cx="{fx + dx}" cy="{fy + dy}" rx="9" ry="6" fill="#a0a0a0" stroke="#4d4d4d" stroke-width="1.5"/>')
out.append(person(fx - 40, fy + 10, "#f1c40f", extra=cheer.replace("#f39c12", "#f1c40f")))

out.append('</svg>')
open(sys.argv[1], "w").write("\n".join(out))

# marker positions (visual centre of each object), as data.json percentages
MARKERS = [
    (1, "sense of urgency (flare)", CAMPS[0][0] + 30, CAMPS[0][1] - 75),
    (2, "guiding coalition (rope team)", CAMPS[1][0], CAMPS[1][1] - 30),
    (3, "change vision (telescope)", CAMPS[2][0] + 5, CAMPS[2][1] - 45),
    (4, "communicating (signal flags)", CAMPS[3][0] - 5, CAMPS[3][1] - 50),
    (5, "removing obstacles (logs)", CAMPS[4][0] - 25, CAMPS[4][1] - 15),
    (6, "short-term win (flag)", CAMPS[5][0] + 40, CAMPS[5][1] - 35),
    (7, "building on change (tents)", CAMPS[6][0], CAMPS[6][1] - 16),
    (8, "anchoring (summit cairn)", CAMPS[7][0], CAMPS[7][1] - 30),
    (9, "skipping steps (gully)", hx - 33, hy + 14),
    (10, "victory too soon (half cairn)", FALSE_SUMMIT[0], FALSE_SUMMIT[1] - 15),
]
for i, name, x, y in MARKERS:
    print(f"{i:2d} {name:32s} x={x / W * 100:5.1f}  y={y / H * 100:5.1f}")
