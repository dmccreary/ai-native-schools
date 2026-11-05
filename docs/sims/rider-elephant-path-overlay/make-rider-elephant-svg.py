"""Generate a text-free SVG scene for the Rider, the Elephant and the Path overlay.

A tired elephant with a small rider stands at the start of a fenced path that
winds up to a school on a far hilltop. Each of the nine Switch moves (Heath and
Heath, 2010) is drawn as one object in the scene. No text anywhere.

Usage: python make-rider-elephant-svg.py rider-elephant-path.svg
Prints the marker coordinates (as percentages) for data.json.
"""
import math, sys

W, H = 1600, 800
out = []


def pct(x, y):
    return f"x={x / W * 100:5.1f}%  y={y / H * 100:5.1f}%"


# ── path: a cubic Bezier centerline with a width that narrows with distance ──
P = [(470, 820), (800, 690), (1180, 560), (1395, 262)]


def bez(t):
    a, b, c, d = (1 - t) ** 3, 3 * (1 - t) ** 2 * t, 3 * (1 - t) * t ** 2, t ** 3
    return (a * P[0][0] + b * P[1][0] + c * P[2][0] + d * P[3][0],
            a * P[0][1] + b * P[1][1] + c * P[2][1] + d * P[3][1])


def normal(t):
    e = 1e-3
    x0, y0 = bez(max(0, t - e))
    x1, y1 = bez(min(1, t + e))
    dx, dy = x1 - x0, y1 - y0
    L = math.hypot(dx, dy)
    return -dy / L, dx / L  # points to the right-hand (lower) side


def width(t):
    return 470 * (1 - t) ** 1.6 + 12


def edge(t, side, frac=0.5):
    x, y = bez(t)
    nx, ny = normal(t)
    w = width(t) * frac * side
    return x + nx * w, y + ny * w


ts = [i / 80 for i in range(81)]

# ── shapes ───────────────────────────────────────────────────────────────────
def elephant(x, y, s, body="#9aa3ad", dark="#7d8690", tired=False, flip=False):
    """Side-view elephant facing right; (x, y) is ground level under its centre."""
    g = [f'<g transform="translate({x:.1f},{y:.1f}) scale({-s if flip else s},{s})">']
    g.append(f'<path d="M-185,-200 Q-215,-185 -212,-140" stroke="{dark}" stroke-width="8" fill="none"/>')
    for lx in (-150, -80, 60, 130):
        g.append(f'<rect x="{lx}" y="-150" width="55" height="150" rx="14" fill="{dark if lx in (-80, 130) else body}"/>')
        g.append(f'<rect x="{lx}" y="-14" width="55" height="14" rx="6" fill="#e3ddd2"/>')
    g.append(f'<ellipse cx="0" cy="-180" rx="190" ry="120" fill="{body}"/>')
    hy = -215 if tired else -240
    # trunk
    if tired:
        g.append(f'<path d="M235,{hy + 5} Q285,{hy + 60} 275,-110 Q272,-82 292,-86" stroke="{body}" stroke-width="34" fill="none" stroke-linecap="round"/>')
    else:
        g.append(f'<path d="M235,{hy} Q300,{hy + 40} 300,-130 Q300,-100 325,-110" stroke="{body}" stroke-width="34" fill="none" stroke-linecap="round"/>')
    g.append(f'<circle cx="190" cy="{hy}" r="85" fill="{body}"/>')
    g.append(f'<path d="M240,{hy + 35} q22,10 30,-6" stroke="#fffaf0" stroke-width="10" fill="none" stroke-linecap="round"/>')
    # ear (droops when tired)
    if tired:
        g.append(f'<path d="M115,{hy - 60} Q60,{hy + 10} 95,{hy + 110} Q140,{hy + 135} 160,{hy + 70} Q170,{hy - 10} 115,{hy - 60} Z" fill="{dark}"/>')
    else:
        g.append(f'<ellipse cx="140" cy="{hy + 5}" rx="55" ry="75" fill="{dark}"/>')
    # eye
    if tired:
        g.append(f'<path d="M205,{hy - 18} q12,9 24,0" stroke="#333" stroke-width="5" fill="none" stroke-linecap="round"/>')
        g.append(f'<path d="M200,{hy - 30} l30,4" stroke="{dark}" stroke-width="5" stroke-linecap="round"/>')
    else:
        g.append(f'<circle cx="215" cy="{hy - 20}" r="7" fill="#333"/>')
    g.append('</g>')
    return "".join(g)


def heart(cx, cy, r):
    return (f'<path d="M{cx},{cy + r} C{cx - 1.8 * r},{cy - 0.1 * r} {cx - 1.0 * r},{cy - 1.4 * r} {cx},{cy - 0.55 * r} '
            f'C{cx + 1.0 * r},{cy - 1.4 * r} {cx + 1.8 * r},{cy - 0.1 * r} {cx},{cy + r} Z" '
            'fill="#e8505b" stroke="#b83240" stroke-width="3"/>')


# ── build the SVG ────────────────────────────────────────────────────────────
out.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">')
out.append('''<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe0f5"/><stop offset="1" stop-color="#f3f9fc"/></linearGradient>
<radialGradient id="glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fff6b0"/><stop offset="0.55" stop-color="#ffe066" stop-opacity="0.85"/><stop offset="1" stop-color="#ffe066" stop-opacity="0"/></radialGradient>
<linearGradient id="dirt" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#d8b98a"/><stop offset="1" stop-color="#ead7b4"/></linearGradient>
</defs>''')
out.append(f'<rect width="{W}" height="{H}" fill="url(#sky)"/>')
out.append('<circle cx="190" cy="105" r="50" fill="#ffd77a"/>')
for cx, cy, s in [(470, 95, 0.9), (900, 140, 0.8), (1150, 80, 0.7)]:
    out.append(f'<g transform="translate({cx},{cy}) scale({s})" fill="#ffffff">'
               '<ellipse cx="0" cy="0" rx="60" ry="22"/><ellipse cx="40" cy="-14" rx="40" ry="24"/>'
               '<ellipse cx="-38" cy="-8" rx="32" ry="18"/></g>')

# far hill with the school (destination)
out.append('<path d="M1120,800 L1120,360 Q1260,250 1395,245 Q1530,250 1640,330 L1640,800 Z" fill="#a9cf8a"/>')
# rolling middle hills
out.append('<path d="M0,800 L0,330 Q200,280 420,320 Q640,360 860,315 Q1000,288 1180,345 L1180,800 Z" fill="#b7d897"/>')
out.append('<path d="M0,800 L0,420 Q300,370 600,410 Q900,450 1200,400 Q1400,370 1600,420 L1600,800 Z" fill="#94c46f"/>')

# bright spot: a glowing sunlit patch on the middle hill
BS = (870, 322)
out.append(f'<ellipse cx="{BS[0]}" cy="{BS[1]}" rx="120" ry="44" fill="url(#glow)"/>')
for dx, dy, c in [(-40, 4, "#ff9f43"), (-12, -6, "#ffffff"), (18, 6, "#ff6b81"), (44, -2, "#ffffff"), (2, 12, "#feca57")]:
    out.append(f'<circle cx="{BS[0] + dx}" cy="{BS[1] + dy}" r="5" fill="{c}"/>')
for a in range(0, 360, 30):
    r1, r2 = 30, 46
    ca, sa = math.cos(math.radians(a)), math.sin(math.radians(a)) * 0.45
    out.append(f'<line x1="{BS[0] + ca * r1 * 2.2:.0f}" y1="{BS[1] - 20 + sa * r1:.0f}" x2="{BS[0] + ca * r2 * 2.2:.0f}" '
               f'y2="{BS[1] - 20 + sa * r2:.0f}" stroke="#ffd43b" stroke-width="3" stroke-linecap="round" opacity="0.8"/>')

# school on the hilltop
SX, SY = 1395, 245
out.append(f'<g transform="translate({SX},{SY})">'
           '<rect x="-62" y="-52" width="124" height="52" fill="#d9734a"/>'
           '<polygon points="-72,-50 0,-88 72,-50" fill="#8c3b2a"/>'
           '<rect x="-12" y="-118" width="24" height="34" fill="#e5e0d5"/>'
           '<polygon points="-16,-116 0,-134 16,-116" fill="#8c3b2a"/>'
           '<line x1="0" y1="-134" x2="0" y2="-160" stroke="#555" stroke-width="2.5"/>'
           '<polygon points="0,-160 22,-153 0,-146" fill="#3498db"/>'
           '<rect x="-10" y="-26" width="20" height="26" fill="#6b3a24"/>'
           + "".join(f'<rect x="{wx}" y="-42" width="16" height="14" fill="#fff4c2" stroke="#8c3b2a" stroke-width="1.5"/>'
                     for wx in (-50, -30, 14, 34)) +
           '</g>')

# meadow foreground
out.append('<path d="M0,800 L0,520 Q400,470 800,505 Q1200,540 1600,480 L1600,800 Z" fill="#7fb85a"/>')

# the path
left = [edge(t, -1) for t in ts]
right = [edge(t, +1) for t in ts]
poly = left + right[::-1]
out.append('<polygon points="' + " ".join(f"{x:.1f},{y:.1f}" for x, y in poly) + '" fill="url(#dirt)" stroke="#c7a676" stroke-width="2"/>')
# worn groove: two smooth, darker ruts along the centre
for f in (-0.16, 0.16):
    pts = [edge(t, 1, f * 2) for t in ts if 0.12 <= t <= 0.97]
    out.append('<polyline points="' + " ".join(f"{x:.1f},{y:.1f}" for x, y in pts) +
               '" fill="none" stroke="#a8875a" stroke-width="' + "10" + '" stroke-linecap="round" opacity="0.9"/>')
# fences on both sides of the path's middle stretch
for side in (-1, 1):
    posts = [edge(t, side, 0.55) for t in [0.30 + i * 0.05 for i in range(11)]]
    for i, (x, y) in enumerate(posts):
        hgt = 46 * (1 - 0.65 * i / 10)
        out.append(f'<rect x="{x - 4:.1f}" y="{y - hgt:.1f}" width="8" height="{hgt:.1f}" fill="#8b5a2b"/>')
    for k in (0.45, 0.8):
        rail = [(x, y - 46 * (1 - 0.65 * i / 10) * k) for i, (x, y) in enumerate(posts)]
        out.append('<polyline points="' + " ".join(f"{x:.1f},{y:.1f}" for x, y in rail) +
                   '" fill="none" stroke="#a0693a" stroke-width="4"/>')

# herd of elephants walking ahead along the path
herd = []
for t, s in [(0.66, 0.23), (0.76, 0.18), (0.86, 0.14)]:
    x, y = bez(t)
    out.append(elephant(x, y + 2, s, body="#a7afb8", dark="#8a939d"))
    herd.append((x, y - 190 * s))

# signpost with blank arrow boards beside the path
SPX, SPY = edge(0.50, 1, 1.12)
out.append(f'<g transform="translate({SPX:.1f},{SPY:.1f})">'
           '<rect x="-6" y="-120" width="12" height="120" fill="#7a4a24"/>'
           '<polygon points="-34,-112 40,-112 60,-98 40,-84 -34,-84" fill="#e2b46a" stroke="#7a4a24" stroke-width="3"/>'
           '<polygon points="-30,-74 34,-74 50,-62 34,-50 -30,-50" fill="#e2b46a" stroke="#7a4a24" stroke-width="3" transform="rotate(-14 0 -62)"/>'
           '</g>')
SIGN = (SPX + 10, SPY - 92)

# main elephant (tired), standing at the start of the path
EX, EY, ES = 470, 712, 1.0
out.append(f'<ellipse cx="{EX + 20}" cy="{EY + 4}" rx="260" ry="22" fill="#5c8f3c" opacity="0.35"/>')
out.append(elephant(EX, EY, ES, tired=True))
# saddle blanket and harness strap
out.append(f'<path d="M455,404 Q540,392 610,418 L604,470 Q530,448 460,458 Z" fill="#c0392b"/>')
out.append(f'<path d="M455,404 Q540,392 610,418" stroke="#f1c40f" stroke-width="5" fill="none"/>')
out.append('<polygon points="488,452 514,450 520,640 494,642" fill="#6d4c2f"/>')
BADGE = (505, 540)
bx, by = BADGE
out.append(f'<polygon points="{bx - 14},{by + 10} {bx - 22},{by + 46} {bx - 8},{by + 38} {bx - 2},{by + 52} {bx + 2},{by + 12}" fill="#2e86de"/>')
out.append(f'<polygon points="{bx + 14},{by + 10} {bx + 22},{by + 46} {bx + 8},{by + 38} {bx + 2},{by + 52} {bx - 2},{by + 12}" fill="#2e86de"/>')
out.append(f'<circle cx="{bx}" cy="{by}" r="24" fill="#f6c343" stroke="#b9871c" stroke-width="4"/>')
star = []
for i in range(10):
    r = 15 if i % 2 == 0 else 6.5
    a = math.radians(-90 + i * 36)
    star.append(f"{bx + r * math.cos(a):.1f},{by + r * math.sin(a):.1f}")
out.append(f'<polygon points="{" ".join(star)}" fill="#ffffff"/>')
# sweat drops near the tired head
for dx, dy in [(745, 405), (760, 432)]:
    out.append(f'<path d="M{dx},{dy - 12} Q{dx + 8},{dy} {dx},{dy + 4} Q{dx - 8},{dy} {dx},{dy - 12} Z" fill="#74b9ff"/>')

# step-sized stone just in front of the front foot
STONE = (676, 694)
out.append(f'<ellipse cx="{STONE[0]}" cy="{STONE[1] + 8}" rx="32" ry="7" fill="#5c8f3c" opacity="0.4"/>')
out.append(f'<path d="M{STONE[0] - 30},{STONE[1] + 8} Q{STONE[0] - 28},{STONE[1] - 16} {STONE[0]},{STONE[1] - 18} '
           f'Q{STONE[0] + 30},{STONE[1] - 16} {STONE[0] + 30},{STONE[1] + 8} Z" fill="#b2aba2" stroke="#7f776d" stroke-width="3"/>')

# heart floating near the elephant
HEART = (330, 330)
out.append(heart(HEART[0], HEART[1], 34))
for dx, dy in [(-58, -30), (52, -40), (60, 18)]:
    out.append(f'<circle cx="{HEART[0] + dx}" cy="{HEART[1] + dy}" r="4" fill="#ff9aa2"/>')

# rider sitting on the neck
RX, RY = 598, 432
out.append(f'<g transform="translate({RX},{RY})">'
           '<rect x="-14" y="-12" width="12" height="40" rx="5" fill="#34495e" transform="rotate(15 -8 -12)"/>'
           '<rect x="-10" y="-74" width="28" height="64" rx="10" fill="#27ae60"/>'
           # back arm raised, holding the scroll
           '<line x1="-2" y1="-62" x2="-46" y2="-92" stroke="#27ae60" stroke-width="11" stroke-linecap="round"/>'
           # front arm reaching forward, holding the map
           '<line x1="12" y1="-62" x2="64" y2="-92" stroke="#27ae60" stroke-width="11" stroke-linecap="round"/>'
           '<circle cx="4" cy="-92" r="17" fill="#f2c9a0"/>'
           '<path d="M-14,-98 Q4,-122 22,-98 Z" fill="#6b4226"/>'
           '<circle cx="12" cy="-94" r="2.5" fill="#333"/>'
           '</g>')
# map (folded, route drawn as a dashed line) and a pointing finger beyond it
MAP = (RX + 82, RY - 104)
mx, my = MAP
out.append(f'<polygon points="{mx - 24},{my - 18} {mx - 8},{my - 14} {mx + 8},{my - 20} {mx + 24},{my - 16} '
           f'{mx + 24},{my + 16} {mx + 8},{my + 12} {mx - 8},{my + 18} {mx - 24},{my + 14}" fill="#fdf3d6" stroke="#9b7b4b" stroke-width="2.5"/>')
out.append(f'<line x1="{mx - 8}" y1="{my - 14}" x2="{mx - 8}" y2="{my + 18}" stroke="#d2bb8c" stroke-width="2"/>')
out.append(f'<line x1="{mx + 8}" y1="{my - 20}" x2="{mx + 8}" y2="{my + 12}" stroke="#d2bb8c" stroke-width="2"/>')
out.append(f'<path d="M{mx - 18},{my + 8} Q{mx - 4},{my - 8} {mx + 6},{my + 2} T{mx + 18},{my - 8}" stroke="#e74c3c" stroke-width="2.5" stroke-dasharray="4 3" fill="none"/>')
out.append(f'<circle cx="{mx + 18}" cy="{my - 8}" r="3.5" fill="#e74c3c"/>')
out.append(f'<circle cx="{RX + 64}" cy="{RY - 92}" r="7" fill="#f2c9a0"/>')
out.append(f'<circle cx="{mx + 25}" cy="{my - 12}" r="7" fill="#f2c9a0"/>')
out.append(f'<line x1="{mx + 25}" y1="{my - 12}" x2="{mx + 48}" y2="{my - 26}" stroke="#f2c9a0" stroke-width="5.5" stroke-linecap="round"/>')
# scroll in the other hand
SCROLL = (RX - 56, RY - 102)
sx, sy = SCROLL
out.append(f'<g transform="rotate(-20 {sx} {sy})">'
           f'<rect x="{sx - 20}" y="{sy - 12}" width="40" height="24" fill="#fbeec1" stroke="#9b7b4b" stroke-width="2.5"/>'
           f'<rect x="{sx - 26}" y="{sy - 15}" width="9" height="30" rx="4" fill="#e3c88a" stroke="#9b7b4b" stroke-width="2.5"/>'
           f'<rect x="{sx + 17}" y="{sy - 15}" width="9" height="30" rx="4" fill="#e3c88a" stroke="#9b7b4b" stroke-width="2.5"/>'
           + "".join(f'<line x1="{sx - 12}" y1="{sy + d}" x2="{sx + 12}" y2="{sy + d}" stroke="#b8a070" stroke-width="2"/>' for d in (-5, 0, 5)) +
           '</g>')
out.append(f'<circle cx="{RX - 46}" cy="{RY - 92}" r="7" fill="#f2c9a0"/>')

# a few tufts of grass in the foreground
for gx, gy in [(80, 640), (180, 760), (1000, 760), (1450, 700), (1540, 610), (150, 540)]:
    out.append(f'<path d="M{gx},{gy} l-8,-20 M{gx},{gy} l0,-24 M{gx},{gy} l8,-20" stroke="#4f8a33" stroke-width="4" stroke-linecap="round"/>')

out.append('</svg>')
open(sys.argv[1], "w").write("\n".join(out))

# ── marker coordinates for data.json ────────────────────────────────────────
GROOVE = edge(0.40, -1, 0.32)
marks = [
    ("overall (elephant body)", (EX - 90, EY - 170)),
    ("bright spot", BS),
    ("script (scroll)", SCROLL),
    ("destination (school)", (SX, SY - 40)),
    ("map / rider", MAP),
    ("heart", HEART),
    ("stone", STONE),
    ("badge", BADGE),
    ("signpost", SIGN),
    ("groove", GROOVE),
    ("herd (middle)", herd[1]),
]
for name, (x, y) in marks:
    print(f"{name:24s} ({x:6.1f},{y:6.1f})  {pct(x, y)}")
