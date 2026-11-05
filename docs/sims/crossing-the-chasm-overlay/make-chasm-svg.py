"""Generate a text-free SVG landscape for the Crossing the Chasm overlay.

The ground line follows a bell curve (mean 900, sd 260) so Rogers' adopter
categories fall at mean +/- 1 and 2 standard deviations. No text anywhere.
"""
import math, sys

W, H = 1600, 800
MU, SD, BASE, AMP = 900, 260, 720, 480
CH_L, CH_R = 605, 705  # canyon edges (the chasm sits at mu - 1 sd = 640)

def h(x):
    return BASE - AMP * math.exp(-((x - MU) / SD) ** 2 / 2)

def ground_path(x0, x1, step=5):
    pts = [(x, h(x)) for x in range(x0, x1 + 1, step)]
    d = f"M{x0},{H} " + " ".join(f"L{x:.0f},{y:.1f}" for x, y in pts) + f" L{x1},{H} Z"
    return d

def person(x, color, dy=0, scale=1.5, extra=""):
    """A simple standing figure whose feet sit on the ground at x."""
    y = h(x) + dy
    s = scale
    return (f'<g transform="translate({x:.1f},{y:.1f}) scale({s})">'
            f'<rect x="-6" y="-30" width="12" height="22" rx="5" fill="{color}"/>'
            f'<rect x="-5" y="-10" width="4" height="10" fill="#3b3b3b"/>'
            f'<rect x="1" y="-10" width="4" height="10" fill="#3b3b3b"/>'
            f'<circle cx="0" cy="-37" r="7" fill="#f2c9a0"/>{extra}</g>')

out = []
out.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">')
out.append('''<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe8f7"/><stop offset="1" stop-color="#f4f9fc"/></linearGradient>
<linearGradient id="rock" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a6a58"/><stop offset="1" stop-color="#3a3029"/></linearGradient>
<clipPath id="land"><path d="''' + ground_path(0, W) + '''"/></clipPath>
</defs>''')
out.append(f'<rect width="{W}" height="{H}" fill="url(#sky)"/>')
out.append('<circle cx="1440" cy="110" r="52" fill="#ffd77a"/>')
# clouds
for cx, cy, s in [(220, 130, 1.0), (560, 90, 0.8), (1150, 150, 0.9)]:
    out.append(f'<g transform="translate({cx},{cy}) scale({s})" fill="#ffffff">'
               '<ellipse cx="0" cy="0" rx="60" ry="22"/><ellipse cx="40" cy="-14" rx="40" ry="24"/>'
               '<ellipse cx="-38" cy="-8" rx="32" ry="18"/></g>')

# ground, tinted in bands by adopter category (mu +/- 1 and 2 sd)
bands = [(0, MU - 2 * SD, "#b9d98c"), (MU - 2 * SD, CH_L, "#a6cf7a"),
         (CH_R, MU, "#8fc46b"), (MU, MU + SD, "#7db65e"),
         (MU + SD, W, "#9cc77a")]
out.append('<g clip-path="url(#land)">')
for a, b, c in bands:
    out.append(f'<rect x="{a}" y="0" width="{b - a}" height="{H}" fill="{c}"/>')
# soil strata
out.append(f'<rect x="0" y="735" width="{W}" height="65" fill="#a9845d" opacity="0.55"/>')
out.append('</g>')
out.append(f'<path d="{ground_path(0, W)}" fill="none" stroke="#5f8f3e" stroke-width="3"/>')

# cracks: innovators/early adopters (mu - 2 sd) and early/late majority (mu)
def crack(x, depth):
    y = h(x)
    return (f'<polygon points="{x - 7},{y - 1} {x + 7},{y - 1} {x + 3},{y + depth * .4} '
            f'{x + 6},{y + depth * .7} {x},{y + depth} {x - 2},{y + depth * .6} {x - 5},{y + depth * .35}" '
            'fill="#4a3b2e"/>')
out.append(crack(MU - 2 * SD, 60))
out.append(crack(MU, 90))

# the canyon
yl, yr = h(CH_L), h(CH_R)
canyon = [(CH_L, yl), (616, 540), (602, 620), (618, 690), (606, H), (712, H),
          (698, 690), (712, 560), (696, 450), (CH_R, yr)]
out.append('<polygon points="' + " ".join(f"{x:.0f},{y:.0f}" for x, y in canyon) +
           '" fill="url(#rock)"/>')
out.append('<polygon points="608,758 707,758 709,800 606,800" fill="#4f9fd6"/>')
out.append('<polygon points="676,759 700,742 708,742 708,760" fill="#e6cf95"/>')  # beach
# landing boat on the beach
out.append('<g transform="translate(652,744) scale(1.5)"><polygon points="0,0 34,0 28,11 6,11" fill="#7b4a26"/>'
           '<rect x="4" y="-6" width="26" height="6" fill="#9c6a3c"/></g>')

# half-built plank bridge from the left rim, sloping up toward the right rim
def lerp(a, b, t):
    return a + (b - a) * t
x0, y0 = CH_L - 6, yl
x1, y1 = CH_R + 6, yr
ang = math.degrees(math.atan2(y1 - y0, x1 - x0))
built = 0.6
bx, by = lerp(x0, x1, built), lerp(y0, y1, built)
# rope rails and deck beam
out.append(f'<line x1="{x0}" y1="{y0 - 26:.1f}" x2="{bx:.1f}" y2="{by - 26:.1f}" stroke="#6b4423" stroke-width="3"/>')
out.append(f'<line x1="{x0}" y1="{y0:.1f}" x2="{bx:.1f}" y2="{by:.1f}" stroke="#6b4423" stroke-width="5"/>')
n = 9
for i in range(n):
    t = built * i / (n - 1)
    px, py = lerp(x0, x1, t), lerp(y0, y1, t)
    out.append(f'<rect x="{px - 4:.1f}" y="{py - 4:.1f}" width="9" height="10" fill="#c48a52" stroke="#6b4423" '
               f'stroke-width="1.5" transform="rotate({ang:.1f} {px:.1f} {py:.1f})"/>')
    out.append(f'<line x1="{px:.1f}" y1="{py - 26:.1f}" x2="{px:.1f}" y2="{py:.1f}" stroke="#6b4423" stroke-width="1.5"/>')
# stacked planks waiting on the left rim
for k in range(5):
    out.append(f'<rect x="{548 + k * 2}" y="{h(565) - 7 - k * 7:.0f}" width="40" height="7" fill="#c48a52" stroke="#6b4423"/>')

# figure leaping off the end of the bridge (crossing by hope)
lx, ly = bx + 14, by + 22
out.append(f'<g transform="translate({lx:.1f},{ly:.1f}) rotate(25) scale(1.5)">'
           '<rect x="-6" y="-30" width="12" height="22" rx="5" fill="#d9534f"/>'
           '<line x1="-2" y1="-10" x2="-12" y2="2" stroke="#3b3b3b" stroke-width="4"/>'
           '<line x1="2" y1="-10" x2="12" y2="-2" stroke="#3b3b3b" stroke-width="4"/>'
           '<line x1="-6" y1="-26" x2="-16" y2="-40" stroke="#d9534f" stroke-width="4"/>'
           '<line x1="6" y1="-26" x2="16" y2="-40" stroke="#d9534f" stroke-width="4"/>'
           '<circle cx="0" cy="-37" r="7" fill="#f2c9a0"/></g>')

# bowling pins on the near right rim
for i, x in enumerate([726, 744, 762, 780]):
    y = h(x)
    out.append(f'<g transform="translate({x},{y:.1f}) scale(1.4)"><ellipse cx="0" cy="-9" rx="5" ry="9" fill="#ffffff" stroke="#888"/>'
               '<circle cx="0" cy="-21" r="3.5" fill="#ffffff" stroke="#888"/>'
               '<rect x="-3.5" y="-17" width="7" height="2" fill="#d9534f"/></g>')

# people
lantern = '<line x1="6" y1="-22" x2="14" y2="-22" stroke="#3b3b3b" stroke-width="2"/><circle cx="15" cy="-17" r="4" fill="#ffd34d" stroke="#b8860b"/>'
scope = '<line x1="4" y1="-36" x2="22" y2="-46" stroke="#3b3b3b" stroke-width="4"/>'
clip = '<rect x="-14" y="-26" width="8" height="10" fill="#ffffff" stroke="#555"/>'
for x in [215, 285]:
    out.append(person(x, "#8e44ad", extra=lantern))
for x in [445, 495, 540]:
    out.append(person(x, "#e67e22", extra=scope))
# early majority crowd (two in conversation near the summit = references)
for x in [800, 868, 890]:
    out.append(person(x, "#2e86c1", extra=clip))
out.append(person(822, "#1f618d").replace('<circle', '<circle', 1))
out.append(person(842, "#1f618d", extra='<rect x="-2" y="-30" width="0" height="0"/>'))
# speech bubbles (shapes only, no text)
out.append(f'<ellipse cx="812" cy="{h(822) - 84:.0f}" rx="17" ry="11" fill="#ffffff" stroke="#888"/>')
out.append(f'<ellipse cx="852" cy="{h(842) - 88:.0f}" rx="17" ry="11" fill="#ffffff" stroke="#888"/>')
for x in [945, 985, 1025, 1065, 1105, 1145]:
    out.append(person(x, "#16a085"))
for x in [1270, 1330, 1400]:
    out.append(person(x, "#7f8c8d"))
out.append('</svg>')

open(sys.argv[1], "w").write("\n".join(out))
for name, x in [("innov", 250), ("crack1", 380), ("ea", 510), ("left rim", CH_L), ("right rim", CH_R),
                ("pins", 756), ("refs", 832), ("peak", 900), ("lm", 1045), ("lag", 1330)]:
    print(f"{name:10s} x={x:5} {x / W * 100:5.1f}%  ground y={h(x):5.0f} {h(x) / H * 100:5.1f}%")
