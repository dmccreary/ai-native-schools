"""Generate a text-free SVG landscape for The EdTech Hype Cycle overlay.

The ground line is the hype-cycle curve: a steep rise to a peak (an
asymmetric bell), a slower fall into a trough, and a logistic climb to a
plateau. Each phase and each technology wave from Chapter 15 sits on its
own stretch of the curve. No text, letters or digits anywhere.

Usage: python3 make-hype-cycle-svg.py edtech-hype-cycle.svg
"""
import math, sys

W, H = 1600, 800
BASE = 660                     # ground level at the far left
PEAK_X, PEAK_A = 430, 500      # peak of inflated expectations
SD_L, SD_R = 115, 165          # steep rise, slower fall
PLAT_A, PLAT_MID, PLAT_K = 230, 1060, 105   # slope of enlightenment -> plateau


def h(x):
    sd = SD_L if x < PEAK_X else SD_R
    peak = PEAK_A * math.exp(-((x - PEAK_X) / sd) ** 2 / 2)
    plat = PLAT_A / (1 + math.exp(-(x - PLAT_MID) / PLAT_K))
    return BASE - peak - plat


def ground_path(x0, x1, step=4):
    pts = [(x, h(x)) for x in range(x0, x1 + 1, step)]
    return (f"M{x0},{H} " + " ".join(f"L{x:.0f},{y:.1f}" for x, y in pts)
            + f" L{x1},{H} Z")


def curve_line(x0, x1, step=4):
    pts = [(x, h(x)) for x in range(x0, x1 + 1, step)]
    return "M" + " L".join(f"{x:.0f},{y:.1f}" for x, y in pts)


TROUGH_X = min(range(560, 1000), key=lambda x: -h(x))  # lowest ground = largest y


def person(x, shirt, y=None, scale=1.6, arms="down", extra=""):
    """A simple standing figure whose feet sit at (x, y)."""
    if y is None:
        y = h(x)
    if arms == "up":
        a = (f'<line x1="-6" y1="-26" x2="-14" y2="-42" stroke="{shirt}" stroke-width="4" stroke-linecap="round"/>'
             f'<line x1="6" y1="-26" x2="14" y2="-42" stroke="{shirt}" stroke-width="4" stroke-linecap="round"/>')
    else:
        a = ''
    return (f'<g transform="translate({x:.1f},{y:.1f}) scale({scale})">{a}'
            f'<rect x="-6" y="-30" width="12" height="22" rx="5" fill="{shirt}"/>'
            f'<rect x="-5" y="-10" width="4" height="10" fill="#3b3b3b"/>'
            f'<rect x="1" y="-10" width="4" height="10" fill="#3b3b3b"/>'
            f'<circle cx="0" cy="-37" r="7" fill="#f2c9a0"/>{extra}</g>')


out = []
out.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">')
out.append('''<defs>
<linearGradient id="sky" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0" stop-color="#f6d6b8"/><stop offset="0.35" stop-color="#d9e6f2"/>
  <stop offset="1" stop-color="#cfe8f7"/></linearGradient>
<linearGradient id="land" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0" stop-color="#b9d98c"/><stop offset="0.27" stop-color="#a6cf7a"/>
  <stop offset="0.52" stop-color="#7f9f7a"/><stop offset="0.75" stop-color="#8fc46b"/>
  <stop offset="1" stop-color="#9cc77a"/></linearGradient>
<radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
  <stop offset="0" stop-color="#b9f0ff" stop-opacity="0.95"/>
  <stop offset="0.55" stop-color="#7fd6f5" stop-opacity="0.45"/>
  <stop offset="1" stop-color="#7fd6f5" stop-opacity="0"/></radialGradient>
<linearGradient id="beam" x1="0" y1="1" x2="1" y2="0">
  <stop offset="0" stop-color="#fff3b0" stop-opacity="0.9"/>
  <stop offset="1" stop-color="#fff3b0" stop-opacity="0"/></linearGradient>
<linearGradient id="flame" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#fff07a"/><stop offset="0.5" stop-color="#ffa531"/>
  <stop offset="1" stop-color="#e8452c" stop-opacity="0.2"/></linearGradient>
</defs>''')
out.append(f'<rect width="{W}" height="{H}" fill="url(#sky)"/>')

# sun over the plateau, clouds
out.append('<circle cx="1470" cy="105" r="50" fill="#ffd77a"/>')
for cx, cy, s in [(160, 110, 0.9), (860, 230, 0.8), (1150, 95, 0.85)]:
    out.append(f'<g transform="translate({cx},{cy}) scale({s})" fill="#ffffff" opacity="0.95">'
               '<ellipse cx="0" cy="0" rx="60" ry="22"/><ellipse cx="40" cy="-14" rx="40" ry="24"/>'
               '<ellipse cx="-38" cy="-8" rx="32" ry="18"/></g>')

# distant hills, pale
hills = "M0,640 Q200,560 400,610 T800,590 T1200,560 T1600,580 L1600,800 L0,800 Z"
out.append(f'<path d="{hills}" fill="#c9dcc0" opacity="0.7"/>')

# the land: its skyline IS the hype curve
out.append(f'<path d="{ground_path(0, W)}" fill="url(#land)"/>')
out.append(f'<rect x="0" y="742" width="{W}" height="58" fill="#a9845d" opacity="0.5"/>')
out.append(f'<path d="{curve_line(0, W)}" fill="none" stroke="#e8a33d" stroke-width="7" stroke-linecap="round" opacity="0.9"/>')
out.append(f'<path d="{curve_line(0, W)}" fill="none" stroke="#5f8f3e" stroke-width="2.5"/>')

# ---------------- 1. Innovation trigger: rocket lifting off ----------------
RX = 105
ry = h(RX)
out.append(f'<rect x="{RX - 38}" y="{ry - 6:.0f}" width="76" height="10" rx="3" fill="#6d6d6d"/>')   # pad
for dx, dy, r in [(-34, -8, 18), (30, -6, 16), (-12, -2, 20), (14, 2, 14), (-50, 2, 12), (48, 4, 12)]:
    out.append(f'<circle cx="{RX + dx}" cy="{ry + dy:.0f}" r="{r}" fill="#ececec" opacity="0.95"/>')
out.append(f'<g transform="translate({RX + 6},{ry - 70:.0f}) rotate(18)">'
           '<path d="M-12,42 Q0,95 12,42 Z" fill="url(#flame)"/>'
           '<path d="M-17,40 L-30,52 L-17,20 Z" fill="#c0392b"/>'
           '<path d="M17,40 L30,52 L17,20 Z" fill="#c0392b"/>'
           '<path d="M-17,42 L-17,-20 Q0,-62 17,-20 L17,42 Z" fill="#f4f4f4" stroke="#7f8c8d" stroke-width="2"/>'
           '<path d="M-17,-20 Q0,-62 17,-20 Z" fill="#e74c3c"/>'
           '<circle cx="0" cy="2" r="8" fill="#5dade2" stroke="#7f8c8d" stroke-width="2"/></g>')

# ---------------- 2. Peak: crowd and fireworks ----------------
def burst(cx, cy, r, col):
    s = []
    for k in range(12):
        a = 2 * math.pi * k / 12
        x1, y1 = cx + 0.35 * r * math.cos(a), cy + 0.35 * r * math.sin(a)
        x2, y2 = cx + r * math.cos(a), cy + r * math.sin(a)
        s.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{col}" stroke-width="3.5" stroke-linecap="round"/>')
        s.append(f'<circle cx="{x2:.1f}" cy="{y2:.1f}" r="3.5" fill="{col}"/>')
    return "".join(s)

out.append(burst(372, 72, 38, "#e74c3c"))
out.append(burst(440, 48, 32, "#f39c12"))
out.append(burst(500, 92, 30, "#8e44ad"))
out.append(burst(318, 118, 24, "#3498db"))
for x, c, arms in [(388, "#e67e22", "up"), (410, "#3498db", "down"), (430, "#e74c3c", "up"),
                   (450, "#16a085", "up"), (470, "#9b59b6", "down")]:
    out.append(person(x, c, arms=arms, scale=1.5))
for x, y, c in [(380, 140, "#f1c40f"), (420, 128, "#e74c3c"), (458, 136, "#3498db"), (400, 112, "#2ecc71"), (476, 118, "#f39c12")]:
    out.append(f'<rect x="{x}" y="{y}" width="6" height="6" fill="{c}" transform="rotate(30 {x} {y})"/>')

# ---------------- 3. Film projector on the peak's right shoulder ----------------
PX = 535
py = h(PX)
out.append(f'<g transform="translate({PX},{py:.1f})">'
           '<polygon points="10,-55 260,-170 260,-60" fill="url(#beam)" opacity="0.55"/>'
           '<line x1="-22" y1="-18" x2="-34" y2="0" stroke="#4a3b2e" stroke-width="4"/>'
           '<line x1="22" y1="-18" x2="34" y2="0" stroke="#4a3b2e" stroke-width="4"/>'
           '<line x1="0" y1="-18" x2="0" y2="0" stroke="#4a3b2e" stroke-width="4"/>'
           '<rect x="-30" y="-50" width="52" height="32" rx="4" fill="#2c3e50"/>'
           '<rect x="22" y="-42" width="18" height="14" rx="2" fill="#566573"/>'
           '<circle cx="42" cy="-35" r="7" fill="#fff3b0" stroke="#566573" stroke-width="2"/>'
           '<circle cx="-18" cy="-70" r="18" fill="#34495e" stroke="#1b2631" stroke-width="2"/>'
           '<circle cx="-18" cy="-70" r="5" fill="#bdc3c7"/>'
           '<circle cx="14" cy="-70" r="18" fill="#34495e" stroke="#1b2631" stroke-width="2"/>'
           '<circle cx="14" cy="-70" r="5" fill="#bdc3c7"/></g>')

# ---------------- 4. Generative AI: glowing chat bubble sliding down ----------------
BX, BY = 655, 360
out.append(f'<circle cx="{BX}" cy="{BY}" r="80" fill="url(#glow)"/>')
for k, off in enumerate([0, 16, 32]):
    out.append(f'<path d="M{BX - 70 - off},{BY - 40 - off * 0.6} q-14,-10 -28,-10" fill="none" stroke="#7fd6f5" stroke-width="4" stroke-linecap="round" opacity="{0.8 - k * 0.2}"/>')
out.append(f'<g transform="rotate(14 {BX} {BY})">'
           f'<rect x="{BX - 52}" y="{BY - 32}" width="104" height="64" rx="22" fill="#ffffff" stroke="#2e86c1" stroke-width="4"/>'
           f'<path d="M{BX - 10},{BY + 30} L{BX - 26},{BY + 54} L{BX + 10},{BY + 30} Z" fill="#ffffff" stroke="#2e86c1" stroke-width="4" stroke-linejoin="round"/>'
           f'<rect x="{BX - 12}" y="{BY + 26}" width="24" height="7" fill="#ffffff"/>'
           + "".join(f'<circle cx="{BX + dx}" cy="{BY}" r="7" fill="#2e86c1"/>' for dx in (-26, 0, 26))
           + '</g>')

# ---------------- 5. Trough: fog in the valley ----------------
fog_back = []
for cx, dy, rx, ry in [(700, -20, 90, 26), (790, -34, 120, 30), (900, -28, 110, 28), (980, -10, 80, 22), (840, -60, 130, 26)]:
    fog_back.append(f'<ellipse cx="{cx}" cy="{h(cx) + dy:.0f}" rx="{rx}" ry="{ry}" fill="#eef1f4" opacity="0.75"/>')
out.extend(fog_back)

# teaching machine, left behind in the trough (tilted)
TX = 755
ty = h(TX)
out.append(f'<g transform="translate({TX},{ty + 4:.1f}) rotate(-12)">'
           '<rect x="-34" y="-56" width="68" height="56" rx="4" fill="#a0522d" stroke="#5d3317" stroke-width="3"/>'
           '<rect x="-22" y="-46" width="44" height="20" fill="#fdf6e3" stroke="#5d3317" stroke-width="2"/>'
           '<rect x="-24" y="-18" width="48" height="8" fill="#5d3317"/>'
           '<line x1="34" y1="-30" x2="52" y2="-30" stroke="#5d3317" stroke-width="4"/>'
           '<line x1="52" y1="-30" x2="52" y2="-14" stroke="#5d3317" stroke-width="4"/>'
           '<circle cx="52" cy="-12" r="5" fill="#d4ac0d"/>'
           '<rect x="-30" y="-68" width="60" height="12" rx="6" fill="#fdf6e3" stroke="#5d3317" stroke-width="2"/></g>')

# tablet cart tipped over, tablets spilled
CX = 905
cy = h(CX)
out.append(f'<g transform="translate({CX},{cy + 2:.1f}) rotate(-24)">'
           '<rect x="-48" y="-50" width="80" height="44" rx="5" fill="#95a5a6" stroke="#566573" stroke-width="3"/>'
           '<line x1="-36" y1="-46" x2="-36" y2="-10" stroke="#566573" stroke-width="2"/>'
           '<line x1="-18" y1="-46" x2="-18" y2="-10" stroke="#566573" stroke-width="2"/>'
           '<line x1="0" y1="-46" x2="0" y2="-10" stroke="#566573" stroke-width="2"/>'
           '<line x1="18" y1="-46" x2="18" y2="-10" stroke="#566573" stroke-width="2"/>'
           '<circle cx="-38" cy="0" r="7" fill="#2c3e50"/><circle cx="22" cy="0" r="7" fill="#2c3e50"/></g>')
for dx, rot in [(-62, 8), (48, -14), (70, 20)]:
    x = CX + dx
    y = h(x)
    out.append(f'<g transform="translate({x},{y - 5:.1f}) rotate({rot})">'
               '<rect x="-18" y="-12" width="36" height="24" rx="4" fill="#2c3e50"/>'
               '<rect x="-14" y="-8" width="28" height="16" rx="2" fill="#aed6f1"/></g>')
# a crack across the first spilled tablet
x = CX - 62
y = h(x) - 5
out.append(f'<polyline points="{x - 12},{y - 6:.0f} {x - 3},{y:.0f} {x + 2},{y - 5:.0f} {x + 11},{y + 5:.0f}" fill="none" stroke="#ffffff" stroke-width="2"/>')

# front fog layer, thin
for cx, dy, rx, ry in [(730, -6, 70, 14), (870, -8, 90, 14)]:
    out.append(f'<ellipse cx="{cx}" cy="{h(cx) + dy:.0f}" rx="{rx}" ry="{ry}" fill="#ffffff" opacity="0.35"/>')

# ---------------- 6. Slope of enlightenment: a gentle staircase ----------------
steps = []
x = 1075
while x < 1300:
    w = 34
    top = h(x + w)  # each step's tread is level with the ground at its right end
    steps.append((x, top, w))
    x += w
for x0, top, w in steps:
    bottom = h(x0) + 12
    out.append(f'<rect x="{x0}" y="{top:.1f}" width="{w}" height="{bottom - top:.1f}" fill="#d5c4a1" stroke="#8d7b5a" stroke-width="2"/>')
# climbers on the stairs, one helping another up
for i, c in [(1, "#16a085"), (3, "#2e86c1"), (4, "#e67e22")]:
    x0, top, w = steps[i]
    out.append(person(x0 + w / 2, c, y=top, scale=1.45))

# ---------------- 7. Classroom computer on the slope ----------------
KX = 1000
ky = h(KX + 48) - 2
comp_g = (f'<g transform="translate({KX},{ky:.1f})">'
           '<rect x="-40" y="-40" width="80" height="6" fill="#8d6e4a"/>'
           '<rect x="-36" y="-34" width="5" height="34" fill="#8d6e4a"/><rect x="31" y="-34" width="5" height="34" fill="#8d6e4a"/>'
           '<rect x="-30" y="-56" width="60" height="16" rx="2" fill="#e8dcc0" stroke="#8a7f66" stroke-width="2"/>'
           '<rect x="-26" y="-100" width="52" height="44" rx="4" fill="#e8dcc0" stroke="#8a7f66" stroke-width="2"/>'
           '<rect x="-19" y="-94" width="38" height="30" rx="3" fill="#1e8449"/>'
           '<rect x="-14" y="-88" width="14" height="4" fill="#82e0aa"/><rect x="-14" y="-80" width="22" height="4" fill="#82e0aa"/>'
           '</g>')
out.append(comp_g)
# a level terrace cut into the slope so the table stands flat
out.insert(out.index(comp_g), f'<rect x="{KX - 50}" y="{ky:.1f}" width="100" height="{h(KX - 50) - ky + 6:.1f}" fill="#b4a17a" stroke="#8d7b5a" stroke-width="2"/>')
out.append(person(KX - 30, "#c0392b", y=ky, scale=1.45))   # teacher
out.append(person(KX + 30, "#f1c40f", y=ky, scale=1.2))  # student

# ---------------- 8. MOOC certificate on an easel, on the plateau ----------------
MX = 1312
my = h(MX)
out.append(f'<g transform="translate({MX},{my:.1f})">'
           '<line x1="-26" y1="0" x2="-8" y2="-96" stroke="#6b4423" stroke-width="5"/>'
           '<line x1="26" y1="0" x2="8" y2="-96" stroke="#6b4423" stroke-width="5"/>'
           '<line x1="0" y1="0" x2="0" y2="-80" stroke="#6b4423" stroke-width="4"/>'
           '<rect x="-46" y="-104" width="92" height="64" fill="#fdf2d0" stroke="#b7950b" stroke-width="4"/>'
           '<rect x="-38" y="-96" width="76" height="48" fill="none" stroke="#d4ac0d" stroke-width="2"/>'
           '<path d="M18,-50 L12,-28 L20,-33 L26,-26 L28,-50 Z" fill="#c0392b"/>'
           '<circle cx="23" cy="-54" r="11" fill="#d4ac0d" stroke="#9a7d0a" stroke-width="2"/></g>')

# ---------------- 9. Plateau: a calm, working classroom pavilion ----------------
GX = 1482
gy = h(GX)
out.append(f'<g transform="translate({GX},{gy:.1f})">'
           '<rect x="-95" y="-4" width="190" height="8" fill="#b4a17a"/>'
           '<polygon points="-110,-118 0,-168 110,-118" fill="#c0392b"/>'
           '<rect x="-95" y="-118" width="8" height="114" fill="#8d6e4a"/><rect x="87" y="-118" width="8" height="114" fill="#8d6e4a"/>'
           '<rect x="-72" y="-104" width="58" height="36" fill="#1e5631" stroke="#6b4423" stroke-width="3"/>'
           '</g>')
out.append(person(GX - 2, "#2e86c1", y=gy - 4, scale=1.45))   # teacher at the board
for dx, c in [(30, "#e67e22"), (62, "#16a085")]:
    out.append(person(GX + dx, c, y=gy - 4, scale=1.15))
    out.append(f'<rect x="{GX + dx - 14}" y="{gy - 26:.1f}" width="28" height="5" fill="#8d6e4a"/>')
    out.append(f'<rect x="{GX + dx - 9}" y="{gy - 34:.1f}" width="18" height="8" rx="1" fill="#5d6d7e"/>')
for dx, c in [(-60, "#9b59b6"), (-30, "#e74c3c")]:
    out.append(person(GX + dx, c, y=gy - 4, scale=1.15))
    out.append(f'<rect x="{GX + dx - 14}" y="{gy - 26:.1f}" width="28" height="5" fill="#8d6e4a"/>')
# a garden bed beside the pavilion
for dx in (-128, -116, 112, 124):
    x0 = GX + dx
    out.append(f'<circle cx="{x0}" cy="{h(x0) - 10:.0f}" r="10" fill="#27ae60"/>')
    out.append(f'<circle cx="{x0}" cy="{h(x0) - 18:.0f}" r="4" fill="#f5b041"/>')

out.append('</svg>')
open(sys.argv[1], "w").write("\n".join(out))

# print marker positions from the real coordinates
marks = [
    ("trigger rocket", RX + 10, h(RX) - 70),
    ("peak fireworks", 420, 70),
    ("film projector", PX, h(PX) - 55),
    ("AI chat bubble", BX, BY),
    ("teaching machine", TX, h(TX) - 30),
    ("trough fog", 840, h(840) - 60),
    ("tablet cart", CX, h(CX) - 25),
    ("computer", KX, ky - 78),
    ("slope stairs", steps[5][0] + 17, steps[5][1] - 10),
    ("MOOC certificate", MX, h(MX) - 72),
    ("plateau classroom", GX + 15, h(GX) - 60),
]
print(f"trough lowest at x={TROUGH_X} ({TROUGH_X / W * 100:.1f}%), y={h(TROUGH_X):.0f} ({h(TROUGH_X) / H * 100:.1f}%)")
print(f"peak at x={PEAK_X} ({PEAK_X / W * 100:.1f}%), y={h(PEAK_X):.0f} ({h(PEAK_X) / H * 100:.1f}%)")
print(f"plateau ground y at x=1500: {h(1500):.0f} ({h(1500) / H * 100:.1f}%)")
for name, x, y in marks:
    print(f"{name:18s} x={x:6.0f} {x / W * 100:5.1f}%   y={y:5.0f} {y / H * 100:5.1f}%")
