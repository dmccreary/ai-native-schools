"""Generate a text-free SVG of two school buildings in cross-section.

Left: the industrial-era "factory" school day. Right: the AI-native school day.
Each building has three floors: the teacher's room (top), the academic morning
(middle) and the afternoon (bottom). The grid overlay zones in data.json are the
interior of each floor; this script prints their percentages from the same
coordinates it draws with. No text, letters or digits anywhere in the image.

Run:  python3 make-factory-day-svg.py   (writes factory-vs-ai-native-day.svg)
"""
import math
import os
import random

W, H = 1600, 800
random.seed(7)

# ── Geometry shared by both buildings ────────────────────────────────────────
LEFT = (30, 770)      # outer walls of the factory school
RIGHT = (830, 1570)   # outer walls of the AI-native school
WALL = 10             # wall thickness
ROOF_Y = 100          # top of the top floor's ceiling slab
FLOORS = {            # interior y ranges (ceiling, floor line)
    "teacher": (112, 288),
    "morning": (300, 508),
    "afternoon": (520, 738),
}
GROUND_Y = 748

SKIN = ["#f2c9a0", "#d9a173", "#a8714a", "#7a4e30", "#e8b98c"]
HAIR = ["#3b2a1e", "#1f1a17", "#6b4423", "#c98b3c", "#2d2d2d"]

out = []


def add(s):
    out.append(s)


# ── Small drawing helpers ────────────────────────────────────────────────────

def clock(cx, cy, r, h_ang=300, m_ang=60, rim="#2f2f2f"):
    s = [f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="#ffffff" stroke="{rim}" stroke-width="{max(2, r * 0.14):.1f}"/>']
    for k in range(12):
        a = math.radians(k * 30)
        r1, r2 = r * 0.78, r * (0.62 if k % 3 == 0 else 0.7)
        s.append(f'<line x1="{cx + r1 * math.sin(a):.1f}" y1="{cy - r1 * math.cos(a):.1f}" '
                 f'x2="{cx + r2 * math.sin(a):.1f}" y2="{cy - r2 * math.cos(a):.1f}" '
                 f'stroke="#2f2f2f" stroke-width="{max(1.2, r * 0.06):.1f}"/>')
    for ang, ln, wd in [(h_ang, 0.45, 0.1), (m_ang, 0.66, 0.07)]:
        a = math.radians(ang)
        s.append(f'<line x1="{cx}" y1="{cy}" x2="{cx + r * ln * math.sin(a):.1f}" '
                 f'y2="{cy - r * ln * math.cos(a):.1f}" stroke="#2f2f2f" '
                 f'stroke-width="{max(1.5, r * wd):.1f}" stroke-linecap="round"/>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{max(2, r * 0.08):.1f}" fill="#c0392b"/>')
    return "".join(s)


def bell(cx, cy, s=1.0):
    """Wall-mounted school bell: a red dome on a bracket with a clapper."""
    return (f'<g transform="translate({cx},{cy}) scale({s})">'
            '<rect x="-4" y="-26" width="8" height="10" fill="#555"/>'
            '<path d="M-20,8 A20,22 0 0 1 20,8 Z" fill="#d23c2a" stroke="#8e2316" stroke-width="2"/>'
            '<rect x="-22" y="7" width="44" height="4" rx="2" fill="#8e2316"/>'
            '<circle cx="0" cy="15" r="4" fill="#555"/>'
            '<path d="M-28,-6 q-6,6 0,12 M28,-6 q6,6 0,12" fill="none" stroke="#8e2316" stroke-width="2"/>'
            '</g>')


def chalkboard(x, y, w, h, drawing="geo"):
    s = [f'<rect x="{x - 5}" y="{y - 5}" width="{w + 10}" height="{h + 10}" rx="3" fill="#8b5a2b"/>',
         f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="#2f5e4a"/>',
         f'<rect x="{x}" y="{y + h + 2}" width="{w}" height="4" fill="#6b4423"/>']
    c = "#e8efe9"
    if drawing == "geo":      # a triangle and a circle
        s.append(f'<polygon points="{x + w * .15},{y + h * .8} {x + w * .4},{y + h * .2} {x + w * .55},{y + h * .8}" '
                 f'fill="none" stroke="{c}" stroke-width="3"/>')
        s.append(f'<circle cx="{x + w * .77}" cy="{y + h * .5}" r="{h * .28}" fill="none" stroke="{c}" stroke-width="3"/>')
    elif drawing == "map":    # a rough map outline and a globe-ish grid
        s.append(f'<path d="M{x + w * .12},{y + h * .55} q{w * .08},{-h * .4} {w * .2},{-h * .2} '
                 f't{w * .15},{h * .1} t{w * .05},{h * .35} t{-w * .25},{h * .1} z" fill="none" stroke="{c}" stroke-width="3"/>')
        cx, cy, r = x + w * .75, y + h * .5, h * .3
        s.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{c}" stroke-width="3"/>')
        s.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{r * .45}" ry="{r}" fill="none" stroke="{c}" stroke-width="2"/>')
        s.append(f'<line x1="{cx - r}" y1="{cy}" x2="{cx + r}" y2="{cy}" stroke="{c}" stroke-width="2"/>')
    return "".join(s)


def seated(x, floor, shirt, facing=1, s=1.0, skin=None, hair=None, slump=False, laptop=False,
           desk=True, head_down=False, pants="#4a4a5a"):
    """Side-view seated student at a desk. Local units face right (+x)."""
    skin = skin or random.choice(SKIN)
    hair = hair or random.choice(HAIR)
    g = [f'<g transform="translate({x},{floor}) scale({facing * s},{s})">']
    # chair
    g.append('<rect x="-18" y="-60" width="5" height="34" rx="2" fill="#8a6a4a"/>')
    g.append('<rect x="-18" y="-30" width="26" height="5" rx="2" fill="#8a6a4a"/>')
    g.append('<line x1="-15" y1="-26" x2="-15" y2="0" stroke="#6b4f36" stroke-width="3"/>')
    g.append('<line x1="5" y1="-26" x2="5" y2="0" stroke="#6b4f36" stroke-width="3"/>')
    if desk:
        g.append('<rect x="14" y="-46" width="34" height="5" rx="1" fill="#b08455"/>')
        g.append('<line x1="44" y1="-42" x2="44" y2="0" stroke="#7d5b3a" stroke-width="3"/>')
        if laptop:
            g.append('<rect x="20" y="-49" width="20" height="3" rx="1" fill="#4b5563"/>')
            g.append('<polygon points="38,-49 44,-70 47,-69 41,-49" fill="#374151"/>')
            g.append('<polygon points="39,-51 44,-67 45.5,-66.5 40.5,-51" fill="#7dd3fc"/>')
        else:
            g.append('<rect x="20" y="-49" width="16" height="3" fill="#f5f5f0"/>')
    # legs
    g.append(f'<rect x="-8" y="-34" width="24" height="8" rx="3" fill="{pants}"/>')
    g.append(f'<rect x="10" y="-30" width="7" height="30" rx="2" fill="{pants}"/>')
    g.append('<rect x="9" y="-3" width="12" height="4" rx="2" fill="#222"/>')
    # torso and head
    if head_down:
        g.append(f'<rect x="-9" y="-62" width="17" height="32" rx="6" fill="{shirt}" transform="rotate(28 0 -32)"/>')
        g.append(f'<circle cx="20" cy="-56" r="10" fill="{skin}"/>')
        g.append(f'<path d="M12,-62 a10,10 0 0 1 16,-2 l-2,4 a9,9 0 0 0 -13,1 z" fill="{hair}"/>')
        g.append(f'<line x1="2" y1="-52" x2="26" y2="-48" stroke="{shirt}" stroke-width="6" stroke-linecap="round"/>')
    else:
        lean = 8 if slump else 0
        g.append(f'<g transform="rotate({lean} 0 -30)">')
        g.append(f'<rect x="-9" y="-66" width="17" height="38" rx="6" fill="{shirt}"/>')
        g.append(f'<circle cx="1" cy="-77" r="10.5" fill="{skin}"/>')
        g.append(f'<path d="M-10,-78 a11,11 0 0 1 21,-4 l-4,1 a9,9 0 0 0 -13,2 l-2,8 z" fill="{hair}"/>')
        g.append(f'<line x1="0" y1="-58" x2="22" y2="-47" stroke="{shirt}" stroke-width="6" stroke-linecap="round"/>')
        g.append('</g>')
    g.append('</g>')
    return "".join(g)


def standing(x, floor, shirt, facing=1, s=1.0, skin=None, hair=None, pose="neutral",
             pants="#3d3d4a", lanyard=False):
    skin = skin or random.choice(SKIN)
    hair = hair or random.choice(HAIR)
    g = [f'<g transform="translate({x},{floor}) scale({facing * s},{s})">']
    if pose == "walk":
        g.append(f'<line x1="-2" y1="-34" x2="-10" y2="-2" stroke="{pants}" stroke-width="7" stroke-linecap="round"/>')
        g.append(f'<line x1="2" y1="-34" x2="10" y2="-2" stroke="{pants}" stroke-width="7" stroke-linecap="round"/>')
    else:
        g.append(f'<rect x="-7" y="-36" width="6" height="35" rx="2" fill="{pants}"/>')
        g.append(f'<rect x="1" y="-36" width="6" height="35" rx="2" fill="{pants}"/>')
    g.append('<rect x="-9" y="-3" width="10" height="4" rx="2" fill="#222"/><rect x="1" y="-3" width="10" height="4" rx="2" fill="#222"/>')
    g.append(f'<rect x="-10" y="-74" width="20" height="42" rx="7" fill="{shirt}"/>')
    g.append(f'<circle cx="0" cy="-85" r="11.5" fill="{skin}"/>')
    g.append(f'<path d="M-12,-86 a12,12 0 0 1 23,-4 l-4,1 a10,10 0 0 0 -15,2 l-2,9 z" fill="{hair}"/>')
    if lanyard:
        g.append('<path d="M-5,-74 L0,-60 L5,-74" fill="none" stroke="#f4c430" stroke-width="2"/>'
                 '<rect x="-3" y="-60" width="6" height="8" fill="#ffffff" stroke="#f4c430"/>')
    if pose == "point":      # arm raised forward, pointing
        g.append(f'<line x1="4" y1="-68" x2="30" y2="-88" stroke="{shirt}" stroke-width="6" stroke-linecap="round"/>')
        g.append(f'<line x1="-4" y1="-66" x2="-8" y2="-42" stroke="{shirt}" stroke-width="6" stroke-linecap="round"/>')
    elif pose == "stretch":  # both arms straight up
        g.append(f'<line x1="-6" y1="-70" x2="-12" y2="-108" stroke="{shirt}" stroke-width="6" stroke-linecap="round"/>')
        g.append(f'<line x1="6" y1="-70" x2="12" y2="-108" stroke="{shirt}" stroke-width="6" stroke-linecap="round"/>')
    elif pose == "lean":     # leaning in, hand reaching forward and down
        g.append(f'<line x1="4" y1="-66" x2="26" y2="-50" stroke="{shirt}" stroke-width="6" stroke-linecap="round"/>')
        g.append(f'<line x1="-4" y1="-66" x2="-6" y2="-42" stroke="{shirt}" stroke-width="6" stroke-linecap="round"/>')
    elif pose == "sing":     # arms open wide
        g.append(f'<line x1="5" y1="-68" x2="26" y2="-82" stroke="{shirt}" stroke-width="6" stroke-linecap="round"/>')
        g.append(f'<line x1="-5" y1="-68" x2="-26" y2="-82" stroke="{shirt}" stroke-width="6" stroke-linecap="round"/>')
    elif pose == "water":    # holding a watering can forward
        g.append(f'<line x1="4" y1="-66" x2="24" y2="-56" stroke="{shirt}" stroke-width="6" stroke-linecap="round"/>')
        g.append('<rect x="22" y="-64" width="16" height="14" rx="3" fill="#2a9d8f"/>'
                 '<line x1="38" y1="-60" x2="50" y2="-68" stroke="#2a9d8f" stroke-width="4"/>'
                 '<circle cx="54" cy="-60" r="1.6" fill="#7dd3fc"/><circle cx="57" cy="-55" r="1.6" fill="#7dd3fc"/>'
                 '<circle cx="52" cy="-52" r="1.6" fill="#7dd3fc"/>')
    elif pose == "hammer":
        g.append(f'<line x1="4" y1="-66" x2="22" y2="-60" stroke="{shirt}" stroke-width="6" stroke-linecap="round"/>')
        g.append('<line x1="22" y1="-60" x2="30" y2="-78" stroke="#7d5b3a" stroke-width="4"/>'
                 '<rect x="24" y="-84" width="14" height="7" rx="1" fill="#555" transform="rotate(20 31 -80)"/>')
    else:
        g.append(f'<line x1="4" y1="-68" x2="8" y2="-42" stroke="{shirt}" stroke-width="6" stroke-linecap="round"/>')
        g.append(f'<line x1="-4" y1="-68" x2="-8" y2="-42" stroke="{shirt}" stroke-width="6" stroke-linecap="round"/>')
    g.append('</g>')
    return "".join(g)


def window(x, y, w, h, sky="#cfe8f7", frame="#ffffff", extra=""):
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{sky}" stroke="{frame}" stroke-width="5"/>'
            f'{extra}'
            f'<line x1="{x + w / 2}" y1="{y}" x2="{x + w / 2}" y2="{y + h}" stroke="{frame}" stroke-width="4"/>'
            f'<line x1="{x}" y1="{y + h / 2}" x2="{x + w}" y2="{y + h / 2}" stroke="{frame}" stroke-width="4"/>')


def plant(x, y, s=1.0, pot="#c2703d", leaf="#4f9a4a"):
    return (f'<g transform="translate({x},{y}) scale({s})">'
            f'<ellipse cx="-8" cy="-30" rx="7" ry="14" fill="{leaf}" transform="rotate(-25 -8 -30)"/>'
            f'<ellipse cx="8" cy="-30" rx="7" ry="14" fill="{leaf}" transform="rotate(25 8 -30)"/>'
            f'<ellipse cx="0" cy="-36" rx="7" ry="16" fill="#5fb35a"/>'
            f'<polygon points="-12,-16 12,-16 9,0 -9,0" fill="{pot}"/></g>')


def tree(x, y, s=1.0, bare=False):
    if bare:
        return (f'<g transform="translate({x},{y}) scale({s})"><rect x="-4" y="-60" width="8" height="60" fill="#6b4f36"/>'
                '<line x1="0" y1="-40" x2="-18" y2="-62" stroke="#6b4f36" stroke-width="4"/>'
                '<line x1="0" y1="-48" x2="16" y2="-70" stroke="#6b4f36" stroke-width="4"/></g>')
    return (f'<g transform="translate({x},{y}) scale({s})"><rect x="-5" y="-50" width="10" height="50" fill="#6b4f36"/>'
            '<circle cx="0" cy="-70" r="28" fill="#4f9a4a"/><circle cx="-18" cy="-58" r="18" fill="#5fb35a"/>'
            '<circle cx="18" cy="-60" r="20" fill="#5fb35a"/></g>')


# ── Canvas, sky and ground ───────────────────────────────────────────────────
add(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">')
add('''<defs>
<linearGradient id="skyL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9ccd1"/><stop offset="1" stop-color="#e9e7e2"/></linearGradient>
<linearGradient id="skyR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe3f6"/><stop offset="1" stop-color="#f3faf6"/></linearGradient>
<pattern id="brick" width="40" height="20" patternUnits="userSpaceOnUse">
  <rect width="40" height="20" fill="#a9503a"/>
  <path d="M0,0 H40 M0,10 H40 M20,0 V10 M0,10 V20 M40,10 V20" stroke="#8a3d2b" stroke-width="2"/>
</pattern>
</defs>''')
add(f'<rect x="0" y="0" width="{W // 2}" height="{H}" fill="url(#skyL)"/>')
add(f'<rect x="{W // 2}" y="0" width="{W // 2}" height="{H}" fill="url(#skyR)"/>')
# clouds on the right, haze on the left
for cx, cy, sc in [(1010, 50, 0.7), (1450, 34, 0.6)]:
    add(f'<g transform="translate({cx},{cy}) scale({sc})" fill="#ffffff"><ellipse cx="0" cy="0" rx="60" ry="20"/>'
        '<ellipse cx="38" cy="-12" rx="38" ry="20"/><ellipse cx="-36" cy="-6" rx="30" ry="16"/></g>')
# ground: asphalt under the factory school, grass under the AI-native school
add(f'<rect x="0" y="{GROUND_Y}" width="{W // 2}" height="{H - GROUND_Y}" fill="#8d8b86"/>')
add(f'<rect x="{W // 2}" y="{GROUND_Y}" width="{W // 2}" height="{H - GROUND_Y}" fill="#7db65e"/>')
add(f'<rect x="{W // 2}" y="{GROUND_Y}" width="{W // 2}" height="6" fill="#5f8f3e"/>')
add(f'<rect x="0" y="{GROUND_Y}" width="{W // 2}" height="6" fill="#6f6d68"/>')

# ── The gap between buildings: sun positions mark morning and afternoon ─────
gx = (LEFT[1] + RIGHT[0]) / 2
add(f'<line x1="{gx}" y1="{FLOORS["morning"][0]}" x2="{gx}" y2="{FLOORS["afternoon"][1]}" '
    'stroke="#ffffff" stroke-width="3" stroke-dasharray="4 8" opacity="0.9"/>')
# morning sun: low, rising, pale orange with rays
mx, my = gx, (FLOORS["morning"][0] + FLOORS["morning"][1]) / 2
for k in range(8):
    a = math.radians(k * 45)
    add(f'<line x1="{mx + 17 * math.cos(a):.1f}" y1="{my + 17 * math.sin(a):.1f}" x2="{mx + 25 * math.cos(a):.1f}" '
        f'y2="{my + 25 * math.sin(a):.1f}" stroke="#f6b73c" stroke-width="3" stroke-linecap="round"/>')
add(f'<circle cx="{mx}" cy="{my}" r="13" fill="#ffd166"/>')
# afternoon sun: deeper gold, lower and warmer
ax, ay = gx, (FLOORS["afternoon"][0] + FLOORS["afternoon"][1]) / 2
for k in range(8):
    a = math.radians(k * 45 + 22.5)
    add(f'<line x1="{ax + 17 * math.cos(a):.1f}" y1="{ay + 17 * math.sin(a):.1f}" x2="{ax + 25 * math.cos(a):.1f}" '
        f'y2="{ay + 25 * math.sin(a):.1f}" stroke="#e76f51" stroke-width="3" stroke-linecap="round"/>')
add(f'<circle cx="{ax}" cy="{ay}" r="13" fill="#f4a261"/>')
# teacher level: a small apple
tx, ty = gx, (FLOORS["teacher"][0] + FLOORS["teacher"][1]) / 2
add(f'<circle cx="{tx - 6}" cy="{ty}" r="11" fill="#d62828"/><circle cx="{tx + 6}" cy="{ty}" r="11" fill="#d62828"/>'
    f'<line x1="{tx}" y1="{ty - 10}" x2="{tx + 2}" y2="{ty - 20}" stroke="#6b4423" stroke-width="3"/>'
    f'<ellipse cx="{tx + 9}" cy="{ty - 17}" rx="7" ry="3.5" fill="#4f9a4a" transform="rotate(-25 {tx + 9} {ty - 17})"/>')


# ── Building shells ──────────────────────────────────────────────────────────
def shell(x0, x1, outer, slab):
    s = [f'<rect x="{x0}" y="{ROOF_Y}" width="{x1 - x0}" height="{GROUND_Y - ROOF_Y}" fill="{outer}"/>']
    for name, (top, bot) in FLOORS.items():
        s.append(f'<rect x="{x0 + WALL}" y="{bot}" width="{x1 - x0 - 2 * WALL}" height="{12 if bot < 738 else GROUND_Y - bot}" fill="{slab}"/>')
    return "".join(s)


# Factory school: brick, sawtooth roof, smokestack
x0, x1 = LEFT
add(shell(x0, x1, "url(#brick)", "#6d6a66"))
teeth = 6
tw = (x1 - x0) / teeth
pts = [f"{x0},{ROOF_Y}"]
for k in range(teeth):
    a = x0 + k * tw
    pts += [f"{a:.0f},{ROOF_Y - 52}", f"{a + tw:.0f},{ROOF_Y}"]
add(f'<polygon points="{" ".join(pts)}" fill="#7b7d80" stroke="#5c5e61" stroke-width="3"/>')
for k in range(teeth):   # glazing on the steep face of each tooth
    a = x0 + k * tw
    add(f'<polygon points="{a + 4:.0f},{ROOF_Y - 44} {a + 10:.0f},{ROOF_Y - 44} {a + 10:.0f},{ROOF_Y - 4} {a + 4:.0f},{ROOF_Y - 4}" fill="#b9c2c9"/>')
add('<rect x="650" y="18" width="40" height="82" fill="#8a3d2b"/><rect x="644" y="12" width="52" height="10" fill="#6d2f20"/>')
for k, (sx, sy, r) in enumerate([(676, -2, 16), (700, -14, 20), (730, -22, 24)]):
    add(f'<circle cx="{sx}" cy="{sy + 10}" r="{r}" fill="#9a9a9a" opacity="{0.75 - k * 0.15:.2f}"/>')

# AI-native school: warm cream walls, flat roof with solar panels and a rooftop garden
x0, x1 = RIGHT
add(shell(x0, x1, "#e9d8b4", "#b89f78"))
add(f'<rect x="{x0 - 8}" y="{ROOF_Y - 10}" width="{x1 - x0 + 16}" height="12" fill="#2a9d8f"/>')
for k in range(5):
    px = x0 + 30 + k * 70
    add(f'<polygon points="{px},{ROOF_Y - 10} {px + 56},{ROOF_Y - 10} {px + 48},{ROOF_Y - 44} {px + 8},{ROOF_Y - 44}" '
        'fill="#264b73" stroke="#9fb8d1" stroke-width="2"/>')
    add(f'<line x1="{px + 28}" y1="{ROOF_Y - 10}" x2="{px + 28}" y2="{ROOF_Y - 44}" stroke="#9fb8d1" stroke-width="1.5"/>')
add(f'<rect x="1240" y="{ROOF_Y - 24}" width="300" height="14" rx="3" fill="#8a6a4a"/>')
for k in range(9):
    add(f'<ellipse cx="{1258 + k * 33}" cy="{ROOF_Y - 30}" rx="15" ry="11" fill="{"#5fb35a" if k % 2 else "#4f9a4a"}"/>')
add(tree(1300, ROOF_Y - 22, 0.65))
add(tree(1500, ROOF_Y - 22, 0.55))
add(tree(1590, GROUND_Y, 0.8))


def interior(x0, x1, top, bot, wall, floorc, base_h=14):
    xi0, xi1 = x0 + WALL, x1 - WALL
    return (f'<rect x="{xi0}" y="{top}" width="{xi1 - xi0}" height="{bot - top}" fill="{wall}"/>'
            f'<rect x="{xi0}" y="{bot - base_h}" width="{xi1 - xi0}" height="{base_h}" fill="{floorc}"/>')


# ═════════════════════ FACTORY SCHOOL INTERIORS ══════════════════════════════
fx0, fx1 = LEFT
FW, FF = "#d8d3c9", "#9c9284"     # dull wall, floor

# Top floor: the teacher as lecturer and grader, working late
top, bot = FLOORS["teacher"]
add(interior(fx0, fx1, top, bot, FW, FF))
fl = bot - 14
add(chalkboard(70, 150, 190, 80, "geo"))
add('<rect x="285" y="214" width="34" height="44" fill="#7d5b3a"/><polygon points="279,214 325,214 320,204 284,204" fill="#94704b"/>')
add('<line x1="250" y1="236" x2="286" y2="206" stroke="#c9a46a" stroke-width="3"/>')  # pointer leaning on lectern
add(window(395, 140, 70, 70, sky="#1d2b4a",
           extra='<circle cx="445" cy="160" r="10" fill="#f5f0c8"/><circle cx="450" cy="156" r="9" fill="#1d2b4a"/>'
                 '<circle cx="410" cy="190" r="1.5" fill="#fff"/><circle cx="425" cy="152" r="1.5" fill="#fff"/>'))
add(clock(720, 150, 26, h_ang=330, m_ang=240))
# desk piled with paper, slumped teacher, lamp, mug
add('<rect x="520" y="226" width="170" height="8" fill="#8b5a2b"/>'
    '<rect x="528" y="234" width="8" height="40" fill="#6b4423"/><rect x="674" y="234" width="8" height="40" fill="#6b4423"/>')
for k, (px, n) in enumerate([(538, 9), (572, 13), (606, 7), (640, 11)]):
    for j in range(n):
        add(f'<rect x="{px + random.uniform(-2, 2):.1f}" y="{226 - 6 * (j + 1)}" width="28" height="5" '
            f'fill="{"#ffffff" if j % 2 else "#f1eee4"}" stroke="#c9c3b4" stroke-width="1"/>')
add('<rect x="672" y="212" width="12" height="14" rx="2" fill="#e9c46a"/>')  # mug
add('<line x1="690" y1="226" x2="700" y2="190" stroke="#444" stroke-width="3"/><polygon points="688,182 712,182 706,196 694,196" fill="#3a6ea5"/>')
add(seated(500, fl, "#7a8794", facing=1, s=1.2, skin=SKIN[0], hair="#8a8a8a", slump=True, desk=False))

# Middle floor: the factory morning — rows of identical desks facing one board
top, bot = FLOORS["morning"]
add(interior(fx0, fx1, top, bot, FW, FF))
fl = bot - 14
add(chalkboard(62, 330, 120, 74, "geo"))
add(clock(255, 345, 30, h_ang=270, m_ang=0))
add(bell(330, 340, 0.9))
add(window(600, 322, 60, 56, sky="#dfe3e6"))
add(window(680, 322, 60, 56, sky="#dfe3e6"))
add(standing(105, fl, "#5b6b7a", facing=1, s=1.05, skin=SKIN[2], hair=HAIR[1], pose="point"))
UNIFORM = "#8094a8"
for row, (yy, sc) in enumerate([(fl - 42, 0.82), (fl, 0.95)]):
    for c in range(7):
        xx = 186 + c * 74 + (37 if row == 0 else 0)
        add(seated(xx + 50, yy, UNIFORM, facing=-1, s=sc))

# Bottom floor: the factory afternoon — same rows, a new subject, tired students
top, bot = FLOORS["afternoon"]
add(interior(fx0, fx1, top, bot, FW, FF))
fl = bot - 14
add(chalkboard(62, 552, 120, 74, "map"))
add(clock(255, 567, 30, h_ang=60, m_ang=0))
add(bell(330, 562, 0.9))
add(window(600, 544, 60, 56, sky="#e7d9bf"))
add(window(680, 544, 60, 56, sky="#e7d9bf"))
add(standing(105, fl, "#6d5a7a", facing=1, s=1.05, skin=SKIN[4], hair=HAIR[2], pose="neutral"))
for row, (yy, sc) in enumerate([(fl - 42, 0.82), (fl, 0.95)]):
    for c in range(7):
        xx = 186 + c * 74 + (37 if row == 0 else 0)
        down = (row, c) in [(0, 2), (1, 4), (0, 5), (1, 1)]
        add(seated(xx + 50, yy, UNIFORM, facing=-1, s=sc, head_down=down))


# ═════════════════════ AI-NATIVE SCHOOL INTERIORS ════════════════════════════
ax0, ax1 = RIGHT
AW, AF = "#fbf3e2", "#c9a97c"     # warm wall, wood floor

# Top floor: the teacher as coach and mentor
top, bot = FLOORS["teacher"]
add(interior(ax0, ax1, top, bot, AW, AF))
fl = bot - 14
add(window(860, 140, 110, 90, sky="#cdeefc"))
# planning board with colored sticky notes (facilitator)
add('<rect x="1010" y="142" width="190" height="96" rx="4" fill="#ffffff" stroke="#9aa5b1" stroke-width="4"/>')
notes = ["#ffd166", "#ef8fa8", "#8ecae6", "#95d5b2", "#ffd166", "#cdb4db", "#8ecae6", "#ef8fa8", "#95d5b2"]
for k, col in enumerate(notes):
    add(f'<rect x="{1024 + (k % 5) * 34}" y="{154 + (k // 5) * 38}" width="26" height="26" fill="{col}"/>')
add('<path d="M1172,206 q8,-14 16,0" fill="none" stroke="#2a9d8f" stroke-width="3"/>')
# two armchairs, mentor and student facing each other
for cx, col in [(1300, "#2a9d8f"), (1440, "#e76f51")]:
    add(f'<rect x="{cx - 28}" y="{fl - 34}" width="56" height="20" rx="8" fill="{col}"/>'
        f'<rect x="{cx - 24}" y="{fl - 14}" width="6" height="14" fill="#6b4f36"/><rect x="{cx + 18}" y="{fl - 14}" width="6" height="14" fill="#6b4f36"/>')
add('<rect x="1238" y="210" width="12" height="54" rx="5" fill="#2a9d8f"/>')
add('<rect x="1490" y="210" width="12" height="54" rx="5" fill="#e76f51"/>')
add(seated(1268, fl - 0, "#2a9d8f", facing=1, s=1.1, skin=SKIN[3], hair=HAIR[1], desk=False, pants="#34495e"))
add(seated(1472, fl - 0, "#f4a261", facing=-1, s=0.95, skin=SKIN[0], hair=HAIR[3], desk=False))
# low table with a tablet showing a simple bar chart (dashboard)
add('<rect x="1340" y="240" width="60" height="6" rx="2" fill="#8b5a2b"/><rect x="1366" y="246" width="8" height="28" fill="#6b4423"/>')
add('<rect x="1350" y="226" width="40" height="14" rx="2" fill="#374151"/>'
    '<rect x="1355" y="234" width="5" height="4" fill="#95d5b2"/><rect x="1363" y="231" width="5" height="7" fill="#95d5b2"/>'
    '<rect x="1371" y="229" width="5" height="9" fill="#ffd166"/><rect x="1379" y="232" width="5" height="6" fill="#95d5b2"/>')
add(plant(1535, fl, 1.0))
add(clock(1520, 150, 16, h_ang=0, m_ang=180))

# Middle floor: the compressed academic morning
top, bot = FLOORS["morning"]
add(interior(ax0, ax1, top, bot, AW, AF))
fl = bot - 14
# winding learning path on the back wall, with each student's flag at a different point
path_d = "M860,372 C930,320 990,410 1060,360 S1190,320 1250,366 S1380,404 1440,350 S1530,330 1550,346"
add(f'<path d="{path_d}" fill="none" stroke="#e9c46a" stroke-width="16" stroke-linecap="round"/>')
add(f'<path d="{path_d}" fill="none" stroke="#fff6dc" stroke-width="4" stroke-dasharray="2 14" stroke-linecap="round"/>')
flags = [(900, 349, "#e76f51"), (1010, 383, "#2a9d8f"), (1105, 344, "#6a4c93"), (1215, 347, "#f4a261"),
         (1330, 384, "#3a86ff"), (1470, 337, "#e5398a")]
for fx, fy, col in flags:
    add(f'<line x1="{fx}" y1="{fy}" x2="{fx}" y2="{fy - 28}" stroke="#5c4a32" stroke-width="3"/>'
        f'<polygon points="{fx},{fy - 28} {fx + 18},{fy - 22} {fx},{fy - 16}" fill="{col}"/>')
add(clock(1540, 410, 14, h_ang=290, m_ang=120))
# table clusters with laptops (students in the flag colors)
add(seated(890, fl, "#e76f51", facing=1, s=0.9, laptop=True))
add(seated(985, fl, "#2a9d8f", facing=-1, s=0.82, laptop=True))
add(seated(1080, fl, "#6a4c93", facing=1, s=0.95, laptop=True))
# a student on a break: standing, stretching, away from the screen
add(standing(1160, fl, "#f4a261", facing=1, s=0.85, pose="stretch"))
# off-screen small group with the coach at a round table with paper
add('<ellipse cx="1290" cy="452" rx="58" ry="8" fill="#b08455"/><rect x="1286" y="452" width="8" height="42" fill="#7d5b3a"/>')
add('<rect x="1270" y="444" width="16" height="4" fill="#ffffff"/><rect x="1296" y="444" width="16" height="4" fill="#ffffff"/>')
add(seated(1240, fl, "#3a86ff", facing=1, s=0.85, desk=False))
add(seated(1342, fl, "#8ecae6", facing=-1, s=0.8, desk=False))
add(standing(1290, fl, "#2a9d8f", facing=1, s=1.0, skin=SKIN[3], hair=HAIR[1], pose="lean", pants="#34495e",
             lanyard=True))
# one student working alone in the corner (the isolation risk) and her laptop
add(seated(1470, fl, "#e5398a", facing=1, s=0.88, laptop=True, slump=True))

# Bottom floor: the pro-social afternoon — project table, stage, workshop, garden
top, bot = FLOORS["afternoon"]
add(interior(ax0, ax1, top, bot, AW, AF))
fl = bot - 14
# project table with a robot and a team around it, a facilitator watching
add('<rect x="880" y="664" width="150" height="8" rx="2" fill="#b08455"/>'
    '<rect x="890" y="672" width="7" height="52" fill="#7d5b3a"/><rect x="1013" y="672" width="7" height="52" fill="#7d5b3a"/>')
add('<rect x="935" y="640" width="36" height="20" rx="4" fill="#9aa5b1"/><circle cx="941" cy="662" r="5" fill="#333"/>'
    '<circle cx="965" cy="662" r="5" fill="#333"/><line x1="953" y1="640" x2="953" y2="628" stroke="#555" stroke-width="2"/>'
    '<circle cx="953" cy="626" r="3.5" fill="#e63946"/><circle cx="946" cy="649" r="3" fill="#7dd3fc"/><circle cx="960" cy="649" r="3" fill="#7dd3fc"/>')
add(standing(870, fl, "#6a4c93", facing=1, s=0.82, pose="point"))
add(standing(905, fl, "#3a86ff", facing=1, s=0.78, pose="lean"))
add(standing(1004, fl, "#e76f51", facing=-1, s=0.8, pose="lean"))
add(standing(1040, fl, "#ffd166", facing=-1, s=0.85, pose="neutral"))
add(standing(1075, fl, "#2a9d8f", facing=-1, s=1.0, skin=SKIN[1], hair=HAIR[0], pose="neutral", pants="#34495e",
             lanyard=True))
# stage with curtains and two performers
add('<rect x="1110" y="676" width="160" height="48" fill="#8b5a2b"/><rect x="1110" y="672" width="160" height="6" fill="#a0703f"/>')
add('<path d="M1106,546 h168 v14 h-168 z" fill="#9b2335"/>'
    '<path d="M1106,546 q16,70 -2,128 h26 q-8,-70 4,-114 z" fill="#b5283f"/>'
    '<path d="M1274,546 q-16,70 2,128 h-26 q8,-70 -4,-114 z" fill="#b5283f"/>')
add(standing(1170, 672, "#e5398a", facing=1, s=0.82, pose="sing"))
add(standing(1215, 672, "#95d5b2", facing=-1, s=0.82, pose="sing"))
add('<ellipse cx="1190" cy="568" rx="40" ry="6" fill="#fff4b8" opacity="0.7"/>')
# workshop bench with tools on a pegboard
add('<rect x="1300" y="560" width="110" height="64" fill="#d9c7a3" stroke="#b89f78" stroke-width="3"/>')
for k in range(6):
    for j in range(3):
        add(f'<circle cx="{1312 + k * 18}" cy="{572 + j * 20}" r="1.6" fill="#8a7458"/>')
add('<rect x="1316" y="576" width="34" height="8" rx="2" fill="#6b7280"/><polygon points="1350,576 1372,580 1350,584" fill="#9ca3af"/>'
    '<line x1="1380" y1="572" x2="1380" y2="606" stroke="#7d5b3a" stroke-width="4"/><rect x="1372" y="568" width="16" height="8" fill="#555"/>'
    '<path d="M1324,598 a8,8 0 1 1 0,16" fill="none" stroke="#6b7280" stroke-width="4"/>')
add('<rect x="1296" y="660" width="120" height="8" fill="#8b5a2b"/><rect x="1302" y="668" width="8" height="56" fill="#6b4423"/>'
    '<rect x="1402" y="668" width="8" height="56" fill="#6b4423"/><rect x="1330" y="648" width="40" height="12" fill="#e9c46a"/>')
add(standing(1352, fl, "#3a86ff", facing=1, s=0.8, pose="hammer"))
# garden: large glass wall to the outside, raised beds, a student watering
add(f'<rect x="1430" y="{top + 4}" width="120" height="{bot - top - 22}" fill="#d8f0fb" stroke="#ffffff" stroke-width="5"/>')
add('<line x1="1490" y1="524" x2="1490" y2="716" stroke="#ffffff" stroke-width="4"/>')
add('<rect x="1436" y="690" width="110" height="34" fill="#8b5a2b"/><rect x="1436" y="684" width="110" height="10" fill="#5c3d22"/>')
TOMATO = '<circle cx="0" cy="-20" r="4" fill="#e63946"/>'
for k in range(6):
    add(f'<g transform="translate({1448 + k * 18},688)"><ellipse cx="-4" cy="-10" rx="4" ry="9" fill="#4f9a4a" transform="rotate(-20 -4 -10)"/>'
        f'<ellipse cx="4" cy="-10" rx="4" ry="9" fill="#5fb35a" transform="rotate(20 4 -10)"/>'
        + (TOMATO if k % 2 == 0 else "") + '</g>')
add(standing(1452, 684, "#f4a261", facing=1, s=0.75, pose="water"))

add('</svg>')

here = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(here, "factory-vs-ai-native-day.svg"), "w") as f:
    f.write("\n".join(out))


# ── Zone percentages from the same coordinates ──────────────────────────────
def pct(v, total):
    return round(100 * v / total, 1)


print("Grid zones (x1, y1, x2, y2 in % of 1600 x 800):")
for side, (bx0, bx1) in [("factory", LEFT), ("ai-native", RIGHT)]:
    for name, (top, bot) in FLOORS.items():
        print(f"  {side}-{name:9s}: x1={pct(bx0 + WALL, W)} y1={pct(top, H)} "
              f"x2={pct(bx1 - WALL, W)} y2={pct(bot, H)}")
