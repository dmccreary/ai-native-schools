"""Generate a text-free SVG for the Five Levels: Textbooks and Self-Driving Cars poster.

Two rows on a 6-column grid that rises like a staircase from left to right.
  Top row:    the six SAE J3016 driving levels, 0 to 5 (a car in each column).
  Bottom row: the five textbook levels, 1 to 5, set under car levels 1 to 5,
              plus a "claim versus delivery" cell under car level 0, because the
              textbook model has no level 0.
A dashed amber line at the 50% mark separates levels 2 and 3 in both rows:
the threshold where liability (cars) and privacy (textbooks) questions begin.
No text, letters or digits anywhere.

Run: python3 make-five-levels-svg.py five-levels-textbooks-and-cars.svg
"""
import math
import sys

W, H = 1600, 800
COLS = 6
CW = W / COLS
ROW_SPLIT = 400

# pastel panel tints, one per column (level 0 .. 5)
PANEL = ["#eef0f3", "#e3f1fb", "#e4f5ea", "#fdf3df", "#fbe8e4", "#efe6f8"]
STEP = ["#c9ced6", "#9cc9e8", "#9fd6b0", "#f2cf8a", "#efb0a3", "#c9b2e6"]
BODY = ["#7d8a99", "#2f80c4", "#2f9e57", "#e08a1e", "#f2c230", "#8e5cc9"]
SKIN = "#f2c9a0"
DARK = "#2e3440"


def top_ground(i):
    return 352 - i * 13


def bot_ground(i):
    return 762 - i * 13


def col_cx(i):
    return i * CW + CW / 2


out = []
add = out.append

add(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">')
add('''<defs>
<linearGradient id="gloss" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff7ab6"/><stop offset="1" stop-color="#ffb347"/></linearGradient>
<linearGradient id="screen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#eef4fa"/></linearGradient>
</defs>''')
add(f'<rect width="{W}" height="{H}" fill="#ffffff"/>')

# ── panels and staircase steps ────────────────────────────────────────────────
for i in range(COLS):
    x0 = i * CW
    add(f'<rect x="{x0:.1f}" y="0" width="{CW:.1f}" height="{ROW_SPLIT}" fill="{PANEL[i]}"/>')
    add(f'<rect x="{x0:.1f}" y="{ROW_SPLIT}" width="{CW:.1f}" height="{H - ROW_SPLIT}" fill="{PANEL[i]}"/>')
    # top row: a road step
    g = top_ground(i)
    add(f'<rect x="{x0:.1f}" y="{g}" width="{CW:.1f}" height="{ROW_SPLIT - g}" fill="{STEP[i]}"/>')
    add(f'<rect x="{x0:.1f}" y="{g}" width="{CW:.1f}" height="22" fill="#5b6270"/>')
    for k in range(5):
        dx = x0 + 14 + k * 54
        add(f'<rect x="{dx:.1f}" y="{g + 10}" width="28" height="3" fill="#f5f5f5"/>')
    # bottom row: a desk step
    b = bot_ground(i)
    add(f'<rect x="{x0:.1f}" y="{b}" width="{CW:.1f}" height="{H - b}" fill="{STEP[i]}"/>')
    add(f'<rect x="{x0:.1f}" y="{b}" width="{CW:.1f}" height="12" fill="#b98b5e"/>')
    add(f'<rect x="{x0:.1f}" y="{b + 12}" width="{CW:.1f}" height="4" fill="#94683f"/>')

# column gutters and row divider
for i in range(1, COLS):
    x = i * CW
    add(f'<rect x="{x - 2:.1f}" y="0" width="4" height="{H}" fill="#ffffff"/>')
add(f'<rect x="0" y="{ROW_SPLIT - 3}" width="{W}" height="6" fill="#ffffff"/>')


# ── helpers ──────────────────────────────────────────────────────────────────
def bubble(cx, cy, inner, r=34):
    """Round thought-bubble icon holder above an object."""
    return (f'<g transform="translate({cx:.1f},{cy:.1f})">'
            f'<circle r="{r}" fill="#ffffff" stroke="#9aa3b0" stroke-width="2.5"/>'
            f'<circle cx="-{r * 0.55:.1f}" cy="{r + 8}" r="5" fill="#ffffff" stroke="#9aa3b0" stroke-width="2"/>'
            f'{inner}</g>')


def wheel_icon(hands=True):
    s = ('<circle r="17" fill="none" stroke="#3b4252" stroke-width="5"/>'
         '<circle r="4" fill="#3b4252"/>'
         '<rect x="-17" y="-2" width="34" height="4" fill="#3b4252"/>'
         '<rect x="-2" y="0" width="4" height="16" fill="#3b4252"/>')
    if hands:
        s += (f'<circle cx="-16" cy="-6" r="6" fill="{SKIN}" stroke="#c99a70" stroke-width="1.5"/>'
              f'<circle cx="16" cy="-6" r="6" fill="{SKIN}" stroke="#c99a70" stroke-width="1.5"/>')
    return s


def car(cx, gy, color, scale=1.0, driver="hands", wheel=True, passenger=False,
        lidar=False, camera=False, pod=False, flip=False):
    """Side-view car facing right; (cx, gy) is the ground point under its centre."""
    sx = -scale if flip else scale
    p = [f'<g transform="translate({cx:.1f},{gy:.1f}) scale({sx},{scale})">']
    p.append('<ellipse cx="0" cy="-2" rx="96" ry="6" fill="#000000" opacity="0.18"/>')
    if pod:
        p.append(f'<path d="M-98,-22 L-98,-60 Q-96,-112 -20,-116 L30,-116 Q96,-112 98,-60 L98,-22 Z" fill="{color}"/>')
        p.append('<path d="M-82,-62 Q-80,-102 -20,-104 L30,-104 Q82,-102 84,-62 Z" fill="#cfe9f7"/>')
    else:
        p.append(f'<rect x="-100" y="-60" width="200" height="42" rx="13" fill="{color}"/>')
        p.append(f'<polygon points="-70,-58 -48,-102 38,-102 70,-58" fill="{color}"/>')
        p.append('<polygon points="-61,-62 -43,-95 33,-95 58,-62" fill="#cfe9f7"/>')
        p.append(f'<rect x="-8" y="-98" width="7" height="38" fill="{color}"/>')
    p.append('<circle cx="94" cy="-44" r="6" fill="#ffe27a"/>')
    p.append('<rect x="-100" y="-46" width="8" height="8" rx="2" fill="#e05050"/>')
    if pod:
        # two passengers facing each other, no steering wheel
        p.append(f'<circle cx="-36" cy="-82" r="11" fill="{SKIN}"/><rect x="-46" y="-72" width="20" height="14" rx="5" fill="#5e81ac"/>')
        p.append(f'<circle cx="36" cy="-82" r="11" fill="{SKIN}"/><rect x="26" y="-72" width="20" height="14" rx="5" fill="#bf616a"/>')
        p.append('<rect x="-8" y="-72" width="16" height="6" rx="2" fill="#a3be8c"/>')
    else:
        if wheel:
            p.append('<ellipse cx="44" cy="-74" rx="4" ry="13" fill="none" stroke="#3b4252" stroke-width="4"/>')
        if driver == "hands":
            p.append(f'<rect x="8" y="-74" width="20" height="16" rx="5" fill="#4c566a"/>'
                     f'<circle cx="18" cy="-83" r="11" fill="{SKIN}"/>'
                     f'<path d="M7,-86 Q18,-98 29,-86 Z" fill="#5a3d2b"/>'
                     f'<rect x="22" y="-74" width="20" height="5" rx="2" fill="{SKIN}"/>'
                     f'<circle cx="42" cy="-77" r="4" fill="{SKIN}"/><circle cx="42" cy="-68" r="4" fill="{SKIN}"/>')
        elif driver == "reading":
            p.append(f'<rect x="4" y="-74" width="20" height="16" rx="5" fill="#4c566a"/>'
                     f'<circle cx="12" cy="-83" r="11" fill="{SKIN}"/>'
                     f'<path d="M1,-86 Q12,-98 23,-86 Z" fill="#5a3d2b"/>'
                     # open book held up, hands off the wheel
                     f'<polygon points="22,-90 34,-86 34,-70 22,-74" fill="#ffffff" stroke="#c0392b" stroke-width="2"/>'
                     f'<polygon points="34,-86 44,-92 44,-76 34,-70" fill="#ffffff" stroke="#c0392b" stroke-width="2"/>'
                     f'<circle cx="24" cy="-72" r="4" fill="{SKIN}"/>')
        if passenger:
            p.append(f'<circle cx="-36" cy="-82" r="11" fill="{SKIN}"/>'
                     f'<path d="M-47,-85 Q-36,-97 -25,-85 Z" fill="#2e2e2e"/>'
                     f'<rect x="-46" y="-72" width="20" height="14" rx="5" fill="#88c0d0"/>')
    # wheels
    for wx in (-60, 60):
        p.append(f'<circle cx="{wx}" cy="-18" r="19" fill="#2b2b2b"/><circle cx="{wx}" cy="-18" r="8" fill="#c9ced6"/>')
    if lidar:
        p.append('<rect x="-16" y="-126" width="32" height="10" rx="3" fill="#4c566a"/>'
                 '<rect x="-11" y="-140" width="22" height="16" rx="5" fill="#2e3440"/>'
                 '<rect x="-11" y="-135" width="22" height="4" fill="#88c0d0"/>')
    if camera:
        p.append('<rect x="18" y="-110" width="18" height="9" rx="3" fill="#2e3440"/>'
                 '<circle cx="34" cy="-105" r="3" fill="#88c0d0"/>')
    p.append('</g>')
    return "".join(p)


def radar(x, y, n=3, color="#2f9e57", spread=28):
    s = ""
    for k in range(n):
        r = 14 + k * 13
        a = math.radians(spread)
        x1, y1 = x + r * math.cos(-a), y + r * math.sin(-a)
        x2, y2 = x + r * math.cos(a), y + r * math.sin(a)
        s += (f'<path d="M{x1:.1f},{y1:.1f} A{r},{r} 0 0 1 {x2:.1f},{y2:.1f}" fill="none" '
              f'stroke="{color}" stroke-width="4" stroke-linecap="round" opacity="{1 - k * 0.22:.2f}"/>')
    return s


def laptop(cx, gy, w=190, h=124):
    """Open laptop standing on the desk at (cx, gy). Returns svg and screen box."""
    sx0, sy0 = cx - w / 2 + 10, gy - 14 - h + 10
    sw, sh = w - 20, h - 20
    s = (f'<ellipse cx="{cx}" cy="{gy}" rx="{w / 2 + 16}" ry="6" fill="#000" opacity="0.15"/>'
         f'<polygon points="{cx - w / 2 - 14},{gy} {cx + w / 2 + 14},{gy} {cx + w / 2},{gy - 14} {cx - w / 2},{gy - 14}" fill="#aab2bd"/>'
         f'<rect x="{cx - 24}" y="{gy - 9}" width="48" height="5" rx="2" fill="#8a929d"/>'
         f'<rect x="{cx - w / 2}" y="{gy - 14 - h}" width="{w}" height="{h}" rx="8" fill="#3b4252"/>'
         f'<rect x="{sx0}" y="{sy0}" width="{sw}" height="{sh}" rx="3" fill="url(#screen)"/>')
    return s, (sx0, sy0, sw, sh)


def text_lines(x, y, w, n, gap=9, color="#c7cdd6", thick=4):
    """Grey bars that suggest lines of text without being text."""
    s = ""
    for k in range(n):
        lw = w * (0.92 if k % 3 != 2 else 0.6)
        s += f'<rect x="{x:.1f}" y="{y + k * gap:.1f}" width="{lw:.1f}" height="{thick}" rx="2" fill="{color}"/>'
    return s


def person(x, y, color, s=1.0, extra=""):
    return (f'<g transform="translate({x:.1f},{y:.1f}) scale({s})">'
            f'<rect x="-9" y="-44" width="18" height="30" rx="7" fill="{color}"/>'
            f'<rect x="-8" y="-16" width="6" height="16" fill="#3b4252"/><rect x="2" y="-16" width="6" height="16" fill="#3b4252"/>'
            f'<circle cx="0" cy="-54" r="10" fill="{SKIN}"/>'
            f'<path d="M-10,-56 Q0,-68 10,-56 Z" fill="#2e2e2e"/>{extra}</g>')


# ── TOP ROW: six SAE driving levels ──────────────────────────────────────────
# Level 0: human does everything; the car can only beep a warning
i = 0; cx = col_cx(i); g = top_ground(i)
add(car(cx - 10, g, BODY[0], 0.95))
for k in range(3):  # warning beep arcs from the front corner
    r = 10 + k * 9
    add(f'<path d="M{cx + 92},{g - 70 - r} A{r},{r} 0 0 1 {cx + 92},{g - 70 + r}" fill="none" stroke="#e0a030" stroke-width="3.5" stroke-linecap="round"/>')
add(bubble(cx - 30, g - 175, wheel_icon(True)))

# Level 1: driver steers; the system manages speed behind a car ahead
i = 1; cx = col_cx(i); g = top_ground(i)
add(car(cx - 38, g, BODY[1], 0.8))
add(car(cx + 100, g, "#b0b8c4", 0.42, driver="none"))
add(radar(cx + 42, g - 38, 3, "#2f80c4"))
gauge = ('<path d="M-18,6 A18,18 0 0 1 18,6" fill="none" stroke="#3b4252" stroke-width="5"/>'
         '<line x1="0" y1="6" x2="11" y2="-9" stroke="#2f80c4" stroke-width="4" stroke-linecap="round"/>'
         '<circle cx="0" cy="6" r="4" fill="#3b4252"/>')
add(bubble(cx - 48, g - 160, f'<g transform="translate(-9,-2) scale(0.7)">{wheel_icon(True)}</g><g transform="translate(14,4) scale(0.7)">{gauge}</g>'))

# Level 2: system steers and manages speed; the human must watch at all times
i = 2; cx = col_cx(i); g = top_ground(i)
add(f'<rect x="{i * CW:.1f}" y="{g + 2}" width="{CW:.1f}" height="3" fill="#f2d24b"/>')
add(f'<rect x="{i * CW:.1f}" y="{g + 18}" width="{CW:.1f}" height="3" fill="#f2d24b"/>')
add(car(cx - 14, g, BODY[2], 0.85, camera=True))
add(radar(cx + 72, g - 38, 3, "#2f9e57"))
eye = ('<path d="M-22,0 Q0,-18 22,0 Q0,18 -22,0 Z" fill="#ffffff" stroke="#3b4252" stroke-width="3.5"/>'
       '<circle r="8" fill="#2f80c4"/><circle r="3.5" fill="#1b1b1b"/>')
add(bubble(cx - 40, g - 168, eye))

# Level 3: system drives in a traffic jam; the human reads but must take over when asked
i = 3; cx = col_cx(i); g = top_ground(i)
add(car(cx + 92, g, "#b0b8c4", 0.36, driver="none"))
add(car(cx - 22, g, BODY[3], 0.78, driver="reading"))
bell = ('<path d="M-13,8 Q-13,-16 0,-17 Q13,-16 13,8 L17,12 L-17,12 Z" fill="#f0a020" stroke="#9a5b00" stroke-width="2"/>'
        '<circle cx="0" cy="16" r="4" fill="#9a5b00"/>'
        '<path d="M-22,-10 Q-26,0 -22,10" fill="none" stroke="#f0a020" stroke-width="3" stroke-linecap="round"/>'
        '<path d="M22,-10 Q26,0 22,10" fill="none" stroke="#f0a020" stroke-width="3" stroke-linecap="round"/>')
add(bubble(cx - 50, g - 160, bell))

# Level 4: driverless taxi inside a mapped area of a city
i = 4; cx = col_cx(i); g = top_ground(i)
x0 = i * CW
for bx, bw, bh in [(x0 + 12, 46, 120), (x0 + 64, 38, 160), (x0 + 108, 52, 100), (x0 + 166, 40, 140), (x0 + 212, 44, 112)]:
    add(f'<rect x="{bx}" y="{g - bh}" width="{bw}" height="{bh}" fill="#e3c3bb"/>')
    for wy in range(int(g - bh + 12), int(g - 14), 22):
        for wx in range(int(bx + 7), int(bx + bw - 10), 14):
            add(f'<rect x="{wx}" y="{wy}" width="7" height="9" fill="#fbe8e4"/>')
for px in (x0 + 10, x0 + CW - 14):  # boundary posts of the mapped zone
    add(f'<rect x="{px:.1f}" y="{g - 46}" width="5" height="46" fill="#c0392b"/>'
        f'<rect x="{px - 2:.1f}" y="{g - 50}" width="9" height="8" rx="2" fill="#ffffff" stroke="#c0392b" stroke-width="2"/>')
add(car(cx + 6, g, BODY[4], 0.85, driver="none", passenger=True, lidar=True))
pin = ('<rect x="-22" y="-16" width="44" height="32" rx="4" fill="#e4f5ea" stroke="#9aa3b0" stroke-width="2" stroke-dasharray="5,3"/>'
       '<path d="M0,10 C-11,-2 -9,-14 0,-14 C9,-14 11,-2 0,10 Z" fill="#c0392b"/><circle cx="0" cy="-6" r="3.5" fill="#ffffff"/>')
add(bubble(cx - 70, g - 188, pin))

# Level 5: a pod with no steering wheel, on any road (mountain pass)
i = 5; cx = col_cx(i); g = top_ground(i)
x0 = i * CW
add(f'<polygon points="{x0:.1f},{g} {x0 + 70:.1f},{g - 150} {x0 + 140:.1f},{g} " fill="#b9a6d3"/>')
add(f'<polygon points="{x0 + 50:.1f},{g - 107} {x0 + 70:.1f},{g - 150} {x0 + 90:.1f},{g - 107} {x0 + 80:.1f},{g - 112} {x0 + 70:.1f},{g - 104} {x0 + 60:.1f},{g - 112}" fill="#ffffff"/>')
add(f'<polygon points="{x0 + 100:.1f},{g} {x0 + 190:.1f},{g - 190} {x0 + CW:.1f},{g - 60} {x0 + CW:.1f},{g}" fill="#a58fc7"/>')
add(f'<polygon points="{x0 + 166:.1f},{g - 140} {x0 + 190:.1f},{g - 190} {x0 + 214:.1f},{g - 140} {x0 + 202:.1f},{g - 146} {x0 + 190:.1f},{g - 136} {x0 + 178:.1f},{g - 146}" fill="#ffffff"/>')
for tx in (x0 + 24, x0 + 236):
    add(f'<rect x="{tx - 3}" y="{g - 20}" width="6" height="20" fill="#6d4c2f"/>'
        f'<polygon points="{tx - 16},{g - 18} {tx},{g - 60} {tx + 16},{g - 18}" fill="#3f8f5a"/>')
add(car(cx + 4, g, BODY[5], 0.85, pod=True))
globe = ('<circle r="18" fill="#88c0d0" stroke="#3b4252" stroke-width="3"/>'
         '<path d="M-10,-12 Q-2,-6 -8,2 Q-14,8 -6,14" fill="#7fbf7f" stroke="none"/>'
         '<path d="M4,-16 Q14,-8 8,0 Q4,6 12,10" fill="#7fbf7f" stroke="none"/>'
         '<ellipse rx="18" ry="7" fill="none" stroke="#3b4252" stroke-width="1.5"/>'
         '<ellipse rx="7" ry="18" fill="none" stroke="#3b4252" stroke-width="1.5"/>')
add(bubble(cx - 70, g - 185, globe))

# ── BOTTOM ROW ──────────────────────────────────────────────────────────────
# Column 0: claim versus delivery: a glossy brochure claims five full bars,
# the magnifying glass finds only two.
i = 0; cx = col_cx(i); b = bot_ground(i)
add(f'<g transform="translate({cx - 52},{b - 92}) rotate(-8)">'
    f'<rect x="-52" y="-78" width="104" height="150" rx="6" fill="url(#gloss)" stroke="#c2306e" stroke-width="2.5"/>')
star = []
for k in range(16):
    r = 30 if k % 2 == 0 else 18
    a = math.pi / 8 * k - math.pi / 2
    star.append(f"{r * math.cos(a):.1f},{-38 + r * math.sin(a):.1f}")
add(f'<polygon points="{" ".join(star)}" fill="#fff36b" stroke="#e0a020" stroke-width="2"/>')
for k in range(5):
    bh = 10 + k * 9
    add(f'<rect x="{-40 + k * 17}" y="{62 - bh}" width="13" height="{bh}" rx="2" fill="#ffffff"/>')
add('</g>')
for sx, sy in [(cx - 110, b - 190), (cx + 2, b - 205), (cx - 6, b - 140)]:
    add(f'<path d="M{sx},{sy - 9} L{sx + 3},{sy - 3} L{sx + 9},{sy} L{sx + 3},{sy + 3} L{sx},{sy + 9} L{sx - 3},{sy + 3} L{sx - 9},{sy} L{sx - 3},{sy - 3} Z" fill="#ffd23f"/>')
# magnifying glass with the true level inside
mx, my = cx + 58, b - 118
add(f'<line x1="{mx + 36}" y1="{my + 36}" x2="{mx + 72}" y2="{my + 84}" stroke="#6d4c2f" stroke-width="13" stroke-linecap="round"/>')
add(f'<circle cx="{mx}" cy="{my}" r="50" fill="#ffffff" stroke="#3b4252" stroke-width="8"/>')
for k in range(5):
    bh = 8 + k * 8
    fill = "#2f80c4" if k < 2 else "none"
    add(f'<rect x="{mx - 34 + k * 14}" y="{my + 26 - bh}" width="11" height="{bh}" rx="2" fill="{fill}" stroke="#9aa3b0" stroke-width="1.8"/>')

# Level 1: static: a closed print book and a PDF page
i = 1; cx = col_cx(i); b = bot_ground(i)
add(f'<ellipse cx="{cx}" cy="{b}" rx="105" ry="6" fill="#000" opacity="0.15"/>')
add(f'<rect x="{cx - 98}" y="{b - 40}" width="120" height="20" rx="3" fill="#7d8a99"/>'
    f'<rect x="{cx - 94}" y="{b - 36}" width="112" height="3" fill="#f5f0e1"/>'
    f'<rect x="{cx - 94}" y="{b - 30}" width="112" height="3" fill="#f5f0e1"/>'
    f'<rect x="{cx - 104}" y="{b - 20}" width="130" height="20" rx="3" fill="#2f80c4"/>'
    f'<rect x="{cx - 100}" y="{b - 15}" width="122" height="3" fill="#f5f0e1"/>')
# standing closed hardcover
add(f'<rect x="{cx - 80}" y="{b - 190}" width="100" height="150" rx="5" fill="#1f5f99"/>'
    f'<rect x="{cx - 80}" y="{b - 190}" width="14" height="150" rx="3" fill="#174a78"/>'
    f'<rect x="{cx - 54}" y="{b - 160}" width="58" height="34" rx="3" fill="#e9eef5"/>'
    f'<rect x="{cx - 54}" y="{b - 104}" width="58" height="4" fill="#e9eef5"/>')
# PDF page with a folded corner
px0, py0 = cx + 34, b - 170
add(f'<polygon points="{px0},{py0} {px0 + 62},{py0} {px0 + 80},{py0 + 18} {px0 + 80},{py0 + 130} {px0},{py0 + 130}" fill="#ffffff" stroke="#9aa3b0" stroke-width="2"/>'
    f'<polygon points="{px0 + 62},{py0} {px0 + 62},{py0 + 18} {px0 + 80},{py0 + 18}" fill="#dfe3e8"/>'
    f'<rect x="{px0 + 8}" y="{py0 + 26}" width="64" height="30" fill="#e7cfcf"/>')
add(text_lines(px0 + 8, py0 + 66, 64, 6))

# Level 2: interactive: a laptop with a slider and a graph, and a checked quiz card
i = 2; cx = col_cx(i); b = bot_ground(i)
s, (sx0, sy0, sw, sh) = laptop(cx - 10, b)
add(s)
gx0, gy0 = sx0 + 12, sy0 + 10
add(f'<line x1="{gx0}" y1="{gy0}" x2="{gx0}" y2="{gy0 + 56}" stroke="#9aa3b0" stroke-width="2"/>'
    f'<line x1="{gx0}" y1="{gy0 + 56}" x2="{gx0 + 140}" y2="{gy0 + 56}" stroke="#9aa3b0" stroke-width="2"/>'
    f'<polyline points="{gx0},{gy0 + 52} {gx0 + 30},{gy0 + 44} {gx0 + 60},{gy0 + 34} {gx0 + 90},{gy0 + 22} {gx0 + 130},{gy0 + 4}" fill="none" stroke="#2f9e57" stroke-width="4" stroke-linejoin="round"/>'
    f'<circle cx="{gx0 + 90}" cy="{gy0 + 22}" r="5" fill="#2f9e57"/>')
sly = sy0 + sh - 18
add(f'<rect x="{sx0 + 16}" y="{sly}" width="{sw - 32}" height="6" rx="3" fill="#c7cdd6"/>'
    f'<rect x="{sx0 + 16}" y="{sly}" width="{(sw - 32) * 0.62:.1f}" height="6" rx="3" fill="#2f9e57"/>'
    f'<circle cx="{sx0 + 16 + (sw - 32) * 0.62:.1f}" cy="{sly + 3}" r="9" fill="#ffffff" stroke="#2f9e57" stroke-width="3"/>')
# hand on the slider knob (the learner acts)
hx, hy = sx0 + 16 + (sw - 32) * 0.62, sly + 14
add(f'<path d="M{hx - 4:.1f},{hy} l0,-10 q4,-4 8,0 l0,10 q8,2 10,10 l-4,18 l-18,0 l-6,-16 q-2,-6 4,-6 z" fill="{SKIN}" stroke="#c99a70" stroke-width="1.5"/>')
qx, qy = cx + 88, b - 110
add(f'<rect x="{qx}" y="{qy}" width="40" height="52" rx="4" fill="#ffffff" stroke="#9aa3b0" stroke-width="2"/>'
    f'<circle cx="{qx + 20}" cy="{qy + 20}" r="13" fill="#2f9e57"/>'
    f'<path d="M{qx + 13},{qy + 20} l5,6 l10,-12" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>')
add(text_lines(qx + 6, qy + 38, 28, 2, gap=7, thick=3))

# Level 3: adaptive: a branching path on screen and a locked student record
i = 3; cx = col_cx(i); b = bot_ground(i)
s, (sx0, sy0, sw, sh) = laptop(cx - 22, b)
add(s)
nodes = {"a": (sx0 + 18, sy0 + sh / 2), "b": (sx0 + 66, sy0 + 22), "c": (sx0 + 66, sy0 + sh - 22),
         "d": (sx0 + 116, sy0 + 14), "e": (sx0 + 116, sy0 + sh / 2), "f": (sx0 + 152, sy0 + sh - 18)}
edges = [("a", "b", False), ("a", "c", True), ("b", "d", False), ("b", "e", False), ("c", "e", True), ("c", "f", False)]
for u, v, hot in edges:
    (x1, y1), (x2, y2) = nodes[u], nodes[v]
    add(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{"#e08a1e" if hot else "#c7cdd6"}" stroke-width="{5 if hot else 3}" stroke-linecap="round"/>')
for k, (x, y) in nodes.items():
    hot = k in ("a", "c", "e")
    add(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{9 if hot else 7}" fill="{"#e08a1e" if hot else "#ffffff"}" stroke="{"#9a5b00" if hot else "#9aa3b0"}" stroke-width="2.5"/>')
# student record folder with a padlock
fx, fy = cx + 78, b - 120
add(f'<path d="M{fx},{fy} l18,0 l6,-8 l26,0 l0,8 l4,0 l0,110 l-54,0 z" fill="#f2cf8a" stroke="#9a5b00" stroke-width="2"/>'
    f'<circle cx="{fx + 27}" cy="{fy + 24}" r="10" fill="{SKIN}"/>'
    f'<path d="M{fx + 12},{fy + 52} q15,-22 30,0 z" fill="#5e81ac"/>')
add(text_lines(fx + 8, fy + 62, 38, 3, gap=8, color="#c79a4a", thick=3))
lx, ly = fx + 46, fy + 92
add(f'<path d="M{lx - 9},{ly} l0,-8 a9,9 0 0 1 18,0 l0,8" fill="none" stroke="#3b4252" stroke-width="4"/>'
    f'<rect x="{lx - 14}" y="{ly}" width="28" height="22" rx="4" fill="#3b4252"/>'
    f'<circle cx="{lx}" cy="{ly + 10}" r="3.5" fill="#f2cf8a"/>')

# Level 4: chatbot: a laptop with a tutoring conversation
i = 4; cx = col_cx(i); b = bot_ground(i)
s, (sx0, sy0, sw, sh) = laptop(cx, b, w=200)
add(s)
add(f'<rect x="{sx0 + 10}" y="{sy0 + 10}" width="96" height="24" rx="12" fill="#e5e9f0"/>')
add(text_lines(sx0 + 22, sy0 + 17, 70, 2, gap=7, color="#9aa3b0", thick=3))
add(f'<rect x="{sx0 + sw - 106}" y="{sy0 + 42}" width="96" height="24" rx="12" fill="#5e81ac"/>')
add(text_lines(sx0 + sw - 94, sy0 + 49, 70, 2, gap=7, color="#d8e2ef", thick=3))
add(f'<rect x="{sx0 + 10}" y="{sy0 + 74}" width="62" height="22" rx="11" fill="#e5e9f0"/>')
for k in range(3):
    add(f'<circle cx="{sx0 + 26 + k * 15}" cy="{sy0 + 85}" r="4" fill="#7d8a99"/>')
# big speech bubble rising from the laptop
add(f'<path d="M{cx + 46},{b - 222} h68 a16,16 0 0 1 16,16 v26 a16,16 0 0 1 -16,16 h-40 l-16,16 l2,-16 h-14 a16,16 0 0 1 -16,-16 v-26 a16,16 0 0 1 16,-16 z" fill="#ffffff" stroke="#bf616a" stroke-width="3"/>')
for k in range(3):
    add(f'<circle cx="{cx + 62 + k * 18}" cy="{b - 193}" r="5" fill="#bf616a"/>')
# a student leaning in
add(person(cx - 104, b, "#88c0d0", 1.0))

# Level 5: autonomous: pages generated on the fly, with a reviewer checking one
i = 5; cx = col_cx(i); b = bot_ground(i)
s, (sx0, sy0, sw, sh) = laptop(cx - 30, b, w=170, h=112)
add(s)
for k in range(4):  # sparkle burst on the screen
    a = math.pi / 2 * k
    add(f'<line x1="{sx0 + sw / 2 + 10 * math.cos(a):.1f}" y1="{sy0 + sh / 2 + 10 * math.sin(a):.1f}" '
        f'x2="{sx0 + sw / 2 + 30 * math.cos(a):.1f}" y2="{sy0 + sh / 2 + 30 * math.sin(a):.1f}" stroke="#8e5cc9" stroke-width="5" stroke-linecap="round"/>')
add(f'<circle cx="{sx0 + sw / 2:.1f}" cy="{sy0 + sh / 2:.1f}" r="8" fill="#8e5cc9"/>')
pages = [(cx - 76, b - 190, -18), (cx - 10, b - 220, -4), (cx + 56, b - 196, 12)]
for k, (px, py, rot) in enumerate(pages):
    add(f'<g transform="translate({px},{py}) rotate({rot})">'
        f'<rect x="-22" y="-28" width="44" height="56" rx="3" fill="#ffffff" stroke="#8e5cc9" stroke-width="2.5"/>'
        f'<rect x="-15" y="-20" width="30" height="14" fill="#e6dcf3"/>'
        + text_lines(-15, 0, 30, 3, gap=7, thick=3) + '</g>')
# curved motion trails from the screen to the pages
for px, py, _ in pages:
    add(f'<path d="M{sx0 + sw / 2:.1f},{sy0 + 4:.1f} Q{(sx0 + sw / 2 + px) / 2:.1f},{py + 10} {px},{py + 30}" fill="none" stroke="#c9b2e6" stroke-width="3" stroke-dasharray="6,5"/>')
# a teacher with a magnifying glass reviews a generated page
tx, ty = cx + 104, b
add(person(tx, ty, "#2f9e57", 1.3))
add(f'<line x1="{tx - 8}" y1="{ty - 44}" x2="{tx - 26}" y2="{ty - 118}" stroke="{SKIN}" stroke-width="7" stroke-linecap="round"/>'
    f'<line x1="{tx - 26}" y1="{ty - 118}" x2="{tx - 32}" y2="{ty - 138}" stroke="#6d4c2f" stroke-width="5" stroke-linecap="round"/>'
    f'<circle cx="{tx - 38}" cy="{ty - 154}" r="17" fill="#ffffff" fill-opacity="0.55" stroke="#3b4252" stroke-width="4"/>')

# ── threshold line between level 2 and level 3, both rows ────────────────────
TX = 3 * CW
add(f'<line x1="{TX}" y1="6" x2="{TX}" y2="{H - 6}" stroke="#e08a1e" stroke-width="6" stroke-dasharray="16,10" stroke-linecap="round"/>')
for yy in (ROW_SPLIT,):
    add(f'<circle cx="{TX}" cy="{yy}" r="14" fill="#e08a1e" stroke="#ffffff" stroke-width="3"/>')

add('</svg>')

path = sys.argv[1] if len(sys.argv) > 1 else "five-levels-textbooks-and-cars.svg"
with open(path, "w") as f:
    f.write("\n".join(out))

# ── zone percentages from the real grid coordinates ─────────────────────────
pad = 0.4
names_top = ["sae-0", "sae-1", "sae-2", "sae-3", "sae-4", "sae-5"]
names_bot = ["claim-vs-delivery", "book-1", "book-2", "book-3", "book-4", "book-5"]
print(f"wrote {path} ({W}x{H})")
for row, names, (ya, yb) in [("top", names_top, (0, ROW_SPLIT)), ("bottom", names_bot, (ROW_SPLIT, H))]:
    for i, n in enumerate(names):
        x1 = i * CW / W * 100 + pad
        x2 = (i + 1) * CW / W * 100 - pad
        y1 = ya / H * 100 + pad * 1.5
        y2 = yb / H * 100 - pad * 1.5
        print(f"{n:20s} x1={x1:5.1f} y1={y1:5.1f} x2={x2:5.1f} y2={y2:5.1f}")
print(f"threshold line x = {TX / W * 100:.1f}%")
