"""Generate a text-free SVG for the Promise and Peril: Five AI-First Cases grid poster.

Five vertical panels, one per case (Alpha School, Unbound Academy, the Turkish
high school study, the Harvard physics AI tutor, Summit Learning). Each panel has
a school scene at the top and three bands below it: green (benefit), red (risk)
and blue (response). A case with no documented response gets an empty blue band
with a dashed border, drawn on purpose, not left out.

No text, letters, digits or glyphs anywhere.
Run: python3 make-promise-peril-svg.py promise-and-peril-cases.svg
The script prints the zone rectangles (percent of width and height) for data.json.
"""
import math, sys

W, H = 1600, 900
M = 16             # outer margin
GAP = 12           # gap between columns
COL_W = (W - 2 * M - 4 * GAP) / 5      # 304
SCENE_Y, SCENE_H = 16, 310
BAND_H = 174
BANDS = {"benefit": 338, "risk": 524, "response": 710}
CASES = ["alpha", "unbound", "turkey", "harvard", "summit"]
EMPTY_RESPONSE = {"alpha", "unbound"}   # no documented response from the school

BAND_STYLE = {
    "benefit":  ("#e3f3e6", "#2D8A4E"),
    "risk":     ("#fbe3e6", "#C7164E"),
    "response": ("#e1ecf8", "#1F6FB2"),
}
SKIN = ["#f2c9a0", "#c68a5a", "#8d5a3b", "#e8b98f", "#a86b45"]
HAIR = ["#3b2a1f", "#1f1f1f", "#7a4a26", "#c99a4a", "#4a2f22"]


def col_x(i):
    return M + i * (COL_W + GAP)


# ---------------------------------------------------------------- figures

def seated(x, y, shirt, skin, hair, s=1.0, laptop=True):
    """Student seen from the front, sitting behind a desk edge at height y.
    Laptop lid faces the student, so the viewer sees its back."""
    g = [f'<g transform="translate({x:.1f},{y:.1f}) scale({s})">']
    g.append(f'<rect x="-13" y="-34" width="26" height="30" rx="9" fill="{shirt}"/>')
    g.append(f'<circle cx="0" cy="-44" r="10" fill="{skin}"/>')
    g.append(f'<path d="M-10,-46 Q0,-60 10,-46 Q6,-52 0,-52 Q-6,-52 -10,-46 Z" fill="{hair}"/>')
    if laptop:
        g.append('<rect x="-15" y="-26" width="30" height="20" rx="2" fill="#9aa5b1"/>')
        g.append('<circle cx="0" cy="-16" r="2.5" fill="#dfe6ec"/>')
    g.append('</g>')
    return "".join(g)


def standing(x, y, shirt, skin, hair, s=1.0, extra=""):
    """Standing adult whose feet are at (x, y)."""
    return (f'<g transform="translate({x:.1f},{y:.1f}) scale({s})">'
            f'<rect x="-6" y="-34" width="5" height="34" rx="2" fill="#3d4652"/>'
            f'<rect x="1" y="-34" width="5" height="34" rx="2" fill="#3d4652"/>'
            f'<rect x="-11" y="-74" width="22" height="44" rx="8" fill="{shirt}"/>'
            f'<circle cx="0" cy="-84" r="10" fill="{skin}"/>'
            f'<path d="M-10,-86 Q0,-100 10,-86 Q5,-92 0,-92 Q-5,-92 -10,-86 Z" fill="{hair}"/>'
            f'{extra}</g>')


def from_behind(x, y, shirt, hair, s=1.0):
    """Student seen from behind (head and shoulders)."""
    return (f'<g transform="translate({x:.1f},{y:.1f}) scale({s})">'
            f'<rect x="-20" y="-30" width="40" height="34" rx="14" fill="{shirt}"/>'
            f'<circle cx="0" cy="-42" r="15" fill="{hair}"/></g>')


def desk(x, y, w, color="#b07a4a"):
    return (f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="10" rx="2" fill="{color}"/>'
            f'<rect x="{x + 4:.1f}" y="{y + 10:.1f}" width="5" height="22" fill="#7d5532"/>'
            f'<rect x="{x + w - 9:.1f}" y="{y + 10:.1f}" width="5" height="22" fill="#7d5532"/>')


def window(x, y, w, h, inner=""):
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="3" fill="#ffffff"/>'
            f'<rect x="{x + 5}" y="{y + 5}" width="{w - 10}" height="{h - 10}" fill="#bfe0f5"/>'
            f'{inner}'
            f'<line x1="{x + w / 2}" y1="{y + 5}" x2="{x + w / 2}" y2="{y + h - 5}" stroke="#ffffff" stroke-width="4"/>'
            f'<line x1="{x + 5}" y1="{y + h / 2}" x2="{x + w - 5}" y2="{y + h / 2}" stroke="#ffffff" stroke-width="4"/>')


def wall_clock(x, y, r=16):
    ticks = "".join(
        f'<line x1="{x + (r - 4) * math.sin(a):.1f}" y1="{y - (r - 4) * math.cos(a):.1f}" '
        f'x2="{x + (r - 1.5) * math.sin(a):.1f}" y2="{y - (r - 1.5) * math.cos(a):.1f}" stroke="#555" stroke-width="1.5"/>'
        for a in [k * math.pi / 6 for k in range(12)])
    return (f'<circle cx="{x}" cy="{y}" r="{r}" fill="#ffffff" stroke="#555" stroke-width="2.5"/>{ticks}'
            f'<line x1="{x}" y1="{y}" x2="{x}" y2="{y - r + 6}" stroke="#333" stroke-width="2"/>'
            f'<line x1="{x}" y1="{y}" x2="{x + r - 8}" y2="{y}" stroke="#333" stroke-width="2"/>')


def plant(x, y, s=1.0):
    return (f'<g transform="translate({x},{y}) scale({s})">'
            f'<path d="M0,-10 Q-22,-40 -6,-58 Q-2,-34 0,-10 Z" fill="#4f9a56"/>'
            f'<path d="M0,-10 Q20,-44 8,-62 Q2,-36 0,-10 Z" fill="#62b06a"/>'
            f'<path d="M0,-10 Q-30,-22 -26,-36 Q-10,-24 0,-10 Z" fill="#3f8a48"/>'
            f'<path d="M-12,-12 L12,-12 L8,12 L-8,12 Z" fill="#c8693a"/></g>')


# ---------------------------------------------------------------- scenes
# Each scene draws in panel-local coordinates (0..COL_W, 0..SCENE_H).

def scene_alpha():
    w = COL_W
    o = [f'<rect width="{w}" height="{SCENE_H}" fill="#f6e7c8"/>',
         f'<rect y="232" width="{w}" height="78" fill="#d9b98c"/>',
         window(26, 34, 92, 78, '<circle cx="92" cy="62" r="13" fill="#ffd77a"/>'
                '<ellipse cx="56" cy="104" rx="30" ry="14" fill="#7fbf6a"/>'),
         # wall of student art (colored squares and a painted swirl)
         '<rect x="150" y="40" width="40" height="34" fill="#ffffff" stroke="#c9a46a" stroke-width="3"/>'
         '<circle cx="164" cy="55" r="8" fill="#e5398a"/><rect x="172" y="56" width="12" height="12" fill="#1389a6"/>'
         '<rect x="202" y="40" width="40" height="34" fill="#ffffff" stroke="#c9a46a" stroke-width="3"/>'
         '<polygon points="210,68 222,46 234,68" fill="#e07b39"/>'
         '<rect x="254" y="40" width="34" height="34" fill="#ffffff" stroke="#c9a46a" stroke-width="3"/>'
         '<path d="M260,62 Q270,44 282,60" stroke="#6a3fb5" stroke-width="4" fill="none"/>',
         plant(276, 230, 1.1),
         # shelf with project materials
         '<rect x="150" y="96" width="138" height="8" fill="#9b6b3e"/>'
         '<rect x="156" y="78" width="16" height="18" fill="#2d8a4e"/><rect x="176" y="72" width="12" height="24" fill="#c7164e"/>'
         '<circle cx="206" cy="86" r="10" fill="#f2b33d"/><rect x="224" y="80" width="26" height="16" fill="#1389a6"/>']
    # three students at one table, small group
    for k, (sx, shirt) in enumerate([(66, "#e07b39"), (124, "#1389a6"), (182, "#6a3fb5")]):
        o.append(seated(sx, 214, shirt, SKIN[k], HAIR[k], 1.25))
    o.append(desk(34, 214, 180, "#c08a55"))
    # the adult guide beside them, crouching slightly toward the group
    o.append(standing(244, 292, "#2d8a4e", SKIN[3], HAIR[4], 1.35,
                      '<path d="M-10,-66 Q-26,-58 -34,-46" stroke="#2d8a4e" stroke-width="7" stroke-linecap="round" fill="none"/>'))
    return "".join(o)


def scene_unbound():
    w = COL_W
    o = [f'<rect width="{w}" height="{SCENE_H}" fill="#e4eef4"/>',
         f'<rect y="240" width="{w}" height="70" fill="#c9b08f"/>',
         # rug
         '<ellipse cx="150" cy="282" rx="120" ry="18" fill="#b8c7d9"/>',
         # window with a neighbor's house
         window(18, 30, 84, 74, '<polygon points="38,84 58,62 78,84" fill="#c7164e"/>'
                '<rect x="42" y="84" width="32" height="15" fill="#f4e3c3"/>'),
         # lamp
         '<rect x="268" y="120" width="5" height="120" fill="#555"/>'
         '<path d="M250,124 L290,124 L280,96 L260,96 Z" fill="#f2b33d"/>',
         # bookshelf
         '<rect x="226" y="150" width="34" height="90" fill="#9b6b3e"/>'
         '<rect x="230" y="156" width="6" height="24" fill="#1389a6"/><rect x="238" y="160" width="6" height="20" fill="#e07b39"/>'
         '<rect x="246" y="154" width="7" height="26" fill="#2d8a4e"/><rect x="230" y="192" width="26" height="4" fill="#7d5532"/>'
         '<rect x="232" y="200" width="7" height="30" fill="#6a3fb5"/><rect x="242" y="206" width="6" height="24" fill="#c7164e"/>']
    # big monitor facing the viewer with a grid of tiny classmates (a virtual classroom)
    mx, my, mw, mh = 70, 98, 140, 92
    o.append(f'<rect x="{mx}" y="{my}" width="{mw}" height="{mh}" rx="6" fill="#2a2e3a"/>')
    o.append(f'<rect x="{mx + 6}" y="{my + 6}" width="{mw - 12}" height="{mh - 12}" fill="#dfe9f3"/>')
    tw, th = (mw - 12 - 8) / 3, (mh - 12 - 6) / 2
    k = 0
    for r in range(2):
        for c in range(3):
            tx = mx + 8 + c * (tw + 2)
            ty = my + 8 + r * (th + 2)
            o.append(f'<rect x="{tx:.1f}" y="{ty:.1f}" width="{tw - 2:.1f}" height="{th - 2:.1f}" fill="#9cc3e0"/>')
            o.append(f'<circle cx="{tx + tw / 2 - 1:.1f}" cy="{ty + th / 2 - 4:.1f}" r="7" fill="{SKIN[k % 5]}"/>')
            o.append(f'<rect x="{tx + tw / 2 - 11:.1f}" y="{ty + th / 2 + 4:.1f}" width="20" height="10" rx="4" fill="{["#e07b39", "#2d8a4e", "#6a3fb5", "#1389a6", "#c7164e", "#f2b33d"][k]}"/>')
            k += 1
    o.append(f'<rect x="{mx + mw / 2 - 6}" y="{my + mh}" width="12" height="14" fill="#2a2e3a"/>')
    o.append(desk(40, 204, 200, "#c08a55"))
    # the one student, seen from behind, alone
    o.append(from_behind(140, 266, "#1389a6", "#3b2a1f", 1.3))
    return "".join(o)


def scene_turkey():
    w = COL_W
    o = [f'<rect width="{w}" height="{SCENE_H}" fill="#f1ead8"/>',
         f'<rect y="236" width="{w}" height="74" fill="#cfc2a8"/>',
         # floor tiles
         ''.join(f'<line x1="{x}" y1="236" x2="{x - 30}" y2="310" stroke="#b9ab90" stroke-width="2"/>' for x in range(30, 340, 44)),
         # chalkboard with shapes only (no math symbols or digits)
         '<rect x="62" y="12" width="180" height="70" rx="4" fill="#8a5a32"/>'
         '<rect x="69" y="19" width="166" height="56" fill="#2f5d4a"/>'
         '<polygon points="88,68 108,30 128,68" fill="none" stroke="#e8f0e8" stroke-width="3"/>'
         '<circle cx="162" cy="48" r="19" fill="none" stroke="#e8f0e8" stroke-width="3"/>'
         '<line x1="143" y1="48" x2="181" y2="48" stroke="#e8f0e8" stroke-width="2"/>'
         '<rect x="196" y="30" width="26" height="36" fill="none" stroke="#e8f0e8" stroke-width="3"/>',
         # dividing line between the two groups
         f'<line x1="{w / 2}" y1="92" x2="{w / 2}" y2="306" stroke="#a89878" stroke-width="3" stroke-dasharray="8 6"/>']
    # left group: open chatbot, screens show a finished answer (a filled check badge)
    for k, sx in enumerate([42, 102]):
        o.append(f'<rect x="{sx - 20}" y="96" width="40" height="30" rx="3" fill="#2a2e3a"/>'
                 f'<rect x="{sx - 17}" y="99" width="34" height="24" fill="#ffffff"/>'
                 f'<circle cx="{sx}" cy="111" r="9" fill="#f2b33d"/>'
                 f'<path d="M{sx - 5},{111} l4,4 l7,-8" stroke="#ffffff" stroke-width="2.5" fill="none"/>')
        o.append(seated(sx, 214, ["#e07b39", "#c7164e"][k], SKIN[k + 1], HAIR[k], 1.2, laptop=True))
    o.append(desk(14, 214, 124, "#c08a55"))
    # right group: guarded tutor, screens show a lightbulb hint
    for k, sx in enumerate([200, 260]):
        o.append(f'<rect x="{sx - 20}" y="96" width="40" height="30" rx="3" fill="#2a2e3a"/>'
                 f'<rect x="{sx - 17}" y="99" width="34" height="24" fill="#ffffff"/>'
                 f'<circle cx="{sx}" cy="108" r="7" fill="#ffd54a"/>'
                 f'<rect x="{sx - 3.5}" y="114" width="7" height="5" fill="#8a8a8a"/>')
        o.append(seated(sx, 214, ["#1389a6", "#2d8a4e"][k], SKIN[k + 2], HAIR[k + 2], 1.2, laptop=True))
    o.append(desk(166, 214, 124, "#c08a55"))
    return "".join(o)


def scene_harvard():
    w = COL_W
    o = [f'<rect width="{w}" height="{SCENE_H}" fill="#e9dcc6"/>',
         # wood paneling stripes
         ''.join(f'<rect x="{x}" y="0" width="3" height="{SCENE_H}" fill="#dccbb0"/>' for x in range(20, 304, 40)),
         # large front screen with a step-by-step staircase and a chat bubble
         '<rect x="62" y="16" width="180" height="96" rx="4" fill="#2a2e3a"/>'
         '<rect x="68" y="22" width="168" height="84" fill="#eef4fa"/>'
         '<path d="M84,94 L84,82 L104,82 L104,68 L124,68 L124,54 L144,54 L144,40 L164,40 L164,94 Z" fill="#1389a6"/>'
         '<circle cx="164" cy="34" r="6" fill="#2d8a4e"/>'
         '<rect x="178" y="36" width="48" height="26" rx="8" fill="#ffffff" stroke="#6a3fb5" stroke-width="2.5"/>'
         '<polygon points="186,62 194,62 184,72" fill="#6a3fb5"/>'
         '<circle cx="192" cy="49" r="3" fill="#6a3fb5"/><circle cx="202" cy="49" r="3" fill="#6a3fb5"/><circle cx="212" cy="49" r="3" fill="#6a3fb5"/>']
    # three tiers of curved lecture desks, rising toward the viewer
    tiers = [(150, 0.95, 5), (205, 1.1, 4), (264, 1.25, 4)]
    shirts = ["#c7164e", "#1389a6", "#e07b39", "#2d8a4e", "#6a3fb5", "#f2b33d"]
    k = 0
    for ty, s, n in tiers:
        span = 250
        x0 = (w - span) / 2
        for j in range(n):
            sx = x0 + span * (j + 0.5) / n
            o.append(seated(sx, ty, shirts[k % 6], SKIN[k % 5], HAIR[(k + 2) % 5], s))
            k += 1
        o.append(f'<path d="M{x0 - 14},{ty} Q{w / 2},{ty + 12} {x0 + span + 14},{ty} L{x0 + span + 14},{ty + 10} '
                 f'Q{w / 2},{ty + 22} {x0 - 14},{ty + 10} Z" fill="#8f5f36"/>')
    return "".join(o)


def scene_summit():
    w = COL_W
    o = [f'<rect width="{w}" height="{SCENE_H}" fill="#e6ecef"/>',
         f'<rect y="210" width="{w}" height="100" fill="#b9c4c9"/>',
         # ceiling lights
         ''.join(f'<rect x="{x}" y="8" width="56" height="7" rx="3" fill="#ffffff" stroke="#c5cfd4"/>' for x in (24, 124, 224)),
         wall_clock(268, 46, 17),
         # long whiteboard left mostly blank
         '<rect x="24" y="28" width="210" height="58" rx="3" fill="#ffffff" stroke="#9aa5b1" stroke-width="3"/>']
    # a large class: three rows of students, all on laptops
    shirts = ["#c7164e", "#1389a6", "#e07b39", "#2d8a4e", "#6a3fb5", "#f2b33d"]
    k = 0
    for ry, s, n in [(150, 0.85, 6), (200, 1.0, 5), (258, 1.15, 4)]:
        span = 262
        x0 = 8 + (w - 16 - span) / 2
        for j in range(n):
            sx = x0 + span * (j + 0.5) / n
            o.append(seated(sx, ry, shirts[k % 6], SKIN[k % 5], HAIR[k % 5], s))
            k += 1
        o.append(f'<rect x="{x0}" y="{ry}" width="{span}" height="{8 * s:.1f}" rx="2" fill="#a9825a"/>')
    # mentor walking the aisle with a clipboard
    o.append(standing(286, 300, "#6a3fb5", SKIN[1], HAIR[1], 1.2,
                      '<rect x="-24" y="-66" width="14" height="18" rx="2" fill="#c08a55"/>'
                      '<rect x="-22" y="-62" width="10" height="12" fill="#ffffff"/>'))
    return "".join(o)


SCENES = {"alpha": scene_alpha, "unbound": scene_unbound, "turkey": scene_turkey,
          "harvard": scene_harvard, "summit": scene_summit}

# ---------------------------------------------------------------- band symbols
# Each draws centered at (cx, cy) in absolute coordinates.

def sym_alpha_benefit(cx, cy):
    # a clock face with a small shaded morning wedge, plus a paintbrush and a ball for the freed afternoon
    r = 46
    x, y = cx - 50, cy
    a0, a1 = -math.pi / 2, -math.pi / 2 + 2 * math.pi / 6   # a short wedge of the day
    wedge = (f'<path d="M{x},{y} L{x + r * math.cos(a0):.1f},{y + r * math.sin(a0):.1f} '
             f'A{r},{r} 0 0 1 {x + r * math.cos(a1):.1f},{y + r * math.sin(a1):.1f} Z" fill="#9fd3ab"/>')
    rest = (f'<path d="M{x},{y} L{x + r * math.cos(a1):.1f},{y + r * math.sin(a1):.1f} '
            f'A{r},{r} 0 1 1 {x + r * math.cos(a0):.1f},{y + r * math.sin(a0):.1f} Z" fill="#fff6dc"/>')
    ticks = "".join(
        f'<line x1="{x + (r - 7) * math.cos(t):.1f}" y1="{y + (r - 7) * math.sin(t):.1f}" '
        f'x2="{x + (r - 2) * math.cos(t):.1f}" y2="{y + (r - 2) * math.sin(t):.1f}" stroke="#2d8a4e" stroke-width="2.5"/>'
        for t in [k * math.pi / 6 for k in range(12)])
    return (f'<circle cx="{x}" cy="{y}" r="{r}" fill="#ffffff"/>{rest}{wedge}'
            f'<circle cx="{x}" cy="{y}" r="{r}" fill="none" stroke="#2d8a4e" stroke-width="4"/>{ticks}'
            f'<circle cx="{x}" cy="{y}" r="4" fill="#2d8a4e"/>'
            # paintbrush
            f'<g transform="translate({cx + 30},{cy + 4}) rotate(35)">'
            f'<rect x="-4" y="-40" width="8" height="46" rx="3" fill="#c08a55"/>'
            f'<rect x="-5" y="2" width="10" height="9" fill="#9aa5b1"/>'
            f'<path d="M-6,11 Q0,30 6,11 Z" fill="#e5398a"/></g>'
            # ball
            f'<circle cx="{cx + 76}" cy="{cy + 22}" r="20" fill="#f2b33d"/>'
            f'<path d="M{cx + 56},{cy + 22} Q{cx + 76},{cy + 10} {cx + 96},{cy + 22}" stroke="#c97d14" stroke-width="3" fill="none"/>'
            f'<path d="M{cx + 76},{cy + 2} Q{cx + 66},{cy + 22} {cx + 76},{cy + 42}" stroke="#c97d14" stroke-width="3" fill="none"/>')


def sym_alpha_risk(cx, cy):
    # tall coin stacks behind a closed gate; a child stands outside the gate
    o = []
    for k, (dx, n) in enumerate([(-70, 5), (-44, 8), (-18, 11)]):
        for j in range(n):
            o.append(f'<ellipse cx="{cx + dx}" cy="{cy + 50 - j * 9}" rx="14" ry="5" fill="#f2b33d" stroke="#b07a14" stroke-width="1.5"/>')
    # gate
    gx = cx + 14
    o.append(f'<rect x="{gx}" y="{cy - 40}" width="6" height="96" fill="#7a2030"/>')
    o.append(f'<rect x="{gx + 70}" y="{cy - 40}" width="6" height="96" fill="#7a2030"/>')
    for j in range(1, 7):
        o.append(f'<rect x="{gx + j * 10 + 1}" y="{cy - 26}" width="3" height="80" fill="#a8344a"/>')
    o.append(f'<rect x="{gx}" y="{cy - 28}" width="76" height="5" fill="#7a2030"/>')
    o.append(f'<rect x="{gx}" y="{cy + 40}" width="76" height="5" fill="#7a2030"/>')
    o.append(f'<rect x="{gx + 34}" y="{cy + 2}" width="10" height="12" rx="2" fill="#555"/>')
    o.append(f'<path d="M{gx + 35},{cy + 3} v-5 a4,4 0 0 1 8,0 v5" stroke="#555" stroke-width="2.5" fill="none"/>')
    # child outside
    o.append(standing(cx + 112, cy + 58, "#1389a6", SKIN[2], HAIR[1], 0.8))
    return "".join(o)


def sym_unbound_benefit(cx, cy):
    # a house with an open door and a laptop on the step; a coin with a slash (no fee)
    hx = cx - 40
    o = [f'<polygon points="{hx - 56},{cy - 6} {hx},{cy - 54} {hx + 56},{cy - 6}" fill="#2d8a4e"/>',
         f'<rect x="{hx - 44}" y="{cy - 6}" width="88" height="62" fill="#fff6dc" stroke="#2d8a4e" stroke-width="3"/>',
         f'<rect x="{hx - 14}" y="{cy + 12}" width="28" height="44" fill="#6b4a2b"/>',
         f'<polygon points="{hx + 14},{cy + 12} {hx + 30},{cy + 18} {hx + 30},{cy + 62} {hx + 14},{cy + 56}" fill="#a87a4e"/>',
         f'<rect x="{hx - 38}" y="{cy + 6}" width="18" height="16" fill="#bfe0f5" stroke="#2d8a4e" stroke-width="2"/>',
         # coin with a slash
         f'<circle cx="{cx + 78}" cy="{cy + 4}" r="34" fill="#f2b33d" stroke="#b07a14" stroke-width="3"/>',
         f'<circle cx="{cx + 78}" cy="{cy + 4}" r="22" fill="none" stroke="#d9a02a" stroke-width="3"/>',
         f'<circle cx="{cx + 78}" cy="{cy + 4}" r="44" fill="none" stroke="#2d8a4e" stroke-width="7"/>',
         f'<line x1="{cx + 47}" y1="{cy - 27}" x2="{cx + 109}" y2="{cy + 35}" stroke="#2d8a4e" stroke-width="7"/>']
    return "".join(o)


def sym_unbound_risk(cx, cy):
    # a bar chart whose short bars stop well under a high dashed target line
    x0, base = cx - 92, cy + 56
    o = [f'<line x1="{x0}" y1="{base}" x2="{x0 + 150}" y2="{base}" stroke="#7a2030" stroke-width="4"/>',
         f'<line x1="{x0}" y1="{base}" x2="{x0}" y2="{cy - 62}" stroke="#7a2030" stroke-width="4"/>',
         f'<line x1="{x0}" y1="{cy - 46}" x2="{x0 + 150}" y2="{cy - 46}" stroke="#2d8a4e" stroke-width="4" stroke-dasharray="10 7"/>',
         f'<polygon points="{x0 + 150},{cy - 54} {x0 + 166},{cy - 46} {x0 + 150},{cy - 38}" fill="#2d8a4e"/>']
    for k, hgt in enumerate([22, 48]):
        bx = x0 + 22 + k * 62
        o.append(f'<rect x="{bx}" y="{base - hgt}" width="42" height="{hgt}" fill="#C7164E"/>')
    # a lone student icon beside the chart
    o.append(seated(cx + 104, cy + 40, "#1389a6", SKIN[0], HAIR[0], 1.1))
    return "".join(o)


def sym_turkey_benefit(cx, cy):
    # a practice worksheet full of green checks, with an upward arrow
    px, py = cx - 80, cy - 58
    o = [f'<rect x="{px}" y="{py}" width="96" height="118" rx="5" fill="#ffffff" stroke="#2d8a4e" stroke-width="3"/>']
    for j in range(4):
        ly = py + 22 + j * 25
        o.append(f'<rect x="{px + 12}" y="{ly - 3}" width="44" height="6" rx="3" fill="#c9d6cc"/>')
        o.append(f'<path d="M{px + 64},{ly} l7,7 l13,-14" stroke="#2d8a4e" stroke-width="4.5" fill="none" stroke-linecap="round"/>')
    o.append(f'<path d="M{cx + 60},{cy + 50} L{cx + 60},{cy - 30}" stroke="#2d8a4e" stroke-width="12" stroke-linecap="round"/>')
    o.append(f'<polygon points="{cx + 36},{cy - 22} {cx + 60},{cy - 58} {cx + 84},{cy - 22}" fill="#2d8a4e"/>')
    return "".join(o)


def sym_turkey_risk(cx, cy):
    # a crutch leaning on an exam sheet, with a downward arrow
    px, py = cx - 30, cy - 58
    o = [f'<rect x="{px}" y="{py}" width="92" height="116" rx="5" fill="#ffffff" stroke="#C7164E" stroke-width="3"/>']
    for j in range(4):
        ly = py + 22 + j * 25
        o.append(f'<rect x="{px + 12}" y="{ly - 3}" width="66" height="6" rx="3" fill="#ecd0d5"/>')
    # crutch
    o.append(f'<g transform="translate({cx - 66},{cy + 4}) rotate(-14)">'
             f'<rect x="-3" y="-66" width="6" height="122" rx="3" fill="#9aa5b1"/>'
             f'<rect x="-16" y="-70" width="32" height="9" rx="4" fill="#7a2030"/>'
             f'<rect x="-11" y="-6" width="22" height="6" rx="3" fill="#7a2030"/>'
             f'<ellipse cx="0" cy="58" rx="7" ry="4" fill="#3b3b3b"/></g>')
    # down arrow
    o.append(f'<path d="M{cx + 100},{cy - 50} L{cx + 100},{cy + 26}" stroke="#C7164E" stroke-width="12" stroke-linecap="round"/>')
    o.append(f'<polygon points="{cx + 76},{cy + 20} {cx + 100},{cy + 56} {cx + 124},{cy + 20}" fill="#C7164E"/>')
    return "".join(o)


def sym_turkey_response(cx, cy):
    # a road guardrail with a lightbulb hint above it
    o = []
    y0 = cy + 30
    for px in (cx - 110, cx - 36, cx + 38, cx + 112):
        o.append(f'<rect x="{px - 5}" y="{y0 - 22}" width="10" height="56" fill="#55606b"/>')
    o.append(f'<path d="M{cx - 124},{y0 - 26} L{cx + 126},{y0 - 26} L{cx + 126},{y0 + 2} L{cx - 124},{y0 + 2} Z" fill="#c9d3dc" stroke="#1F6FB2" stroke-width="3"/>')
    o.append(f'<line x1="{cx - 124}" y1="{y0 - 12}" x2="{cx + 126}" y2="{y0 - 12}" stroke="#1F6FB2" stroke-width="3"/>')
    # lightbulb
    o.append(f'<circle cx="{cx}" cy="{cy - 34}" r="24" fill="#ffd54a" stroke="#c99a14" stroke-width="2.5"/>')
    o.append(f'<rect x="{cx - 10}" y="{cy - 12}" width="20" height="12" rx="2" fill="#8a8a8a"/>')
    for a in range(-60, 61, 30):
        t = math.radians(a - 90)
        o.append(f'<line x1="{cx + 30 * math.cos(t):.1f}" y1="{cy - 34 + 30 * math.sin(t):.1f}" '
                 f'x2="{cx + 42 * math.cos(t):.1f}" y2="{cy - 34 + 42 * math.sin(t):.1f}" stroke="#f2b33d" stroke-width="4" stroke-linecap="round"/>')
    return "".join(o)


def sym_harvard_benefit(cx, cy):
    # a stopwatch (less time) beside a tall bar next to a short bar (more learning)
    x, y = cx - 60, cy + 6
    o = [f'<rect x="{x - 7}" y="{y - 62}" width="14" height="12" rx="3" fill="#2d8a4e"/>',
         f'<circle cx="{x}" cy="{y}" r="48" fill="#ffffff" stroke="#2d8a4e" stroke-width="5"/>',
         f'<path d="M{x},{y} L{x},{y - 40} A40,40 0 0 1 {x + 34.6:.1f},{y - 20} Z" fill="#9fd3ab"/>',
         f'<line x1="{x}" y1="{y}" x2="{x + 34.6:.1f}" y2="{y - 20}" stroke="#1f5e35" stroke-width="4" stroke-linecap="round"/>',
         f'<circle cx="{x}" cy="{y}" r="5" fill="#1f5e35"/>']
    base = cy + 58
    o.append(f'<line x1="{cx + 14}" y1="{base}" x2="{cx + 130}" y2="{base}" stroke="#1f5e35" stroke-width="4"/>')
    o.append(f'<rect x="{cx + 26}" y="{base - 46}" width="40" height="46" fill="#9aa5b1"/>')
    o.append(f'<rect x="{cx + 78}" y="{base - 108}" width="40" height="108" fill="#2D8A4E"/>')
    return "".join(o)


def sym_harvard_risk(cx, cy):
    # one small campus building alone on a tiny island, far from a distant crowd of schools shown as faint outlines
    o = [f'<ellipse cx="{cx - 40}" cy="{cy + 46}" rx="82" ry="16" fill="#e8b3bd"/>']
    bx, by = cx - 40, cy + 40
    # a red-brick college hall with a small bell tower
    o.append(f'<rect x="{bx - 50}" y="{by - 50}" width="100" height="50" fill="#b5523b" stroke="#7a2030" stroke-width="3"/>')
    o.append(f'<rect x="{bx - 14}" y="{by - 84}" width="28" height="36" fill="#b5523b" stroke="#7a2030" stroke-width="3"/>')
    o.append(f'<polygon points="{bx - 18},{by - 84} {bx},{by - 104} {bx + 18},{by - 84}" fill="#2a2e3a"/>')
    o.append(f'<circle cx="{bx}" cy="{by - 68}" r="6" fill="#ffffff"/>')
    for k in range(4):
        o.append(f'<rect x="{bx - 40 + k * 22}" y="{by - 40}" width="12" height="16" rx="5" fill="#fff6dc"/>')
    o.append(f'<rect x="{bx - 8}" y="{by - 20}" width="16" height="20" fill="#5a3a22"/>')
    # faint outlines of many other schools, untested
    for k, (dx, dy, s) in enumerate([(70, -30, 0.55), (108, -4, 0.5), (72, 28, 0.5), (112, 48, 0.45)]):
        sx, sy = cx + dx, cy + dy
        o.append(f'<g transform="translate({sx},{sy}) scale({s})" fill="none" stroke="#C7164E" stroke-width="4" stroke-dasharray="7 6">'
                 f'<rect x="-30" y="-20" width="60" height="40"/><polygon points="-36,-20 0,-44 36,-20"/></g>')
    return "".join(o)


def sym_harvard_response(cx, cy):
    # a blueprint (designed tutor) with a staircase of steps and a guiding hand-rail
    x0, y0 = cx - 104, cy - 58
    o = [f'<rect x="{x0}" y="{y0}" width="208" height="118" rx="6" fill="#1F6FB2"/>']
    for gx in range(int(x0) + 16, int(x0) + 208, 24):
        o.append(f'<line x1="{gx}" y1="{y0 + 6}" x2="{gx}" y2="{y0 + 112}" stroke="#4b8fce" stroke-width="1"/>')
    for gy in range(int(y0) + 14, int(y0) + 118, 24):
        o.append(f'<line x1="{x0 + 6}" y1="{gy}" x2="{x0 + 202}" y2="{gy}" stroke="#4b8fce" stroke-width="1"/>')
    steps = f'M{x0 + 24},{y0 + 100} '
    for k in range(5):
        steps += f'L{x0 + 24 + k * 32},{y0 + 100 - (k + 1) * 16} L{x0 + 24 + (k + 1) * 32},{y0 + 100 - (k + 1) * 16} '
    o.append(f'<path d="{steps}" stroke="#ffffff" stroke-width="5" fill="none" stroke-linejoin="round"/>')
    o.append(f'<line x1="{x0 + 24}" y1="{y0 + 70}" x2="{x0 + 184}" y2="{y0 - 10 + 30}" stroke="#ffd54a" stroke-width="4"/>')
    for k in range(5):
        o.append(f'<circle cx="{x0 + 40 + k * 32}" cy="{y0 + 92 - (k + 1) * 16}" r="5" fill="#ffd54a"/>')
    return "".join(o)


def sym_summit_benefit(cx, cy):
    # a winding path of stepping stones, each a different student pace, with a flag at the end
    pts = [(-110, 44), (-74, 22), (-40, 36), (-6, 10), (28, 24), (62, -4), (96, -20)]
    o = [f'<path d="M{cx - 120},{cy + 52} Q{cx - 60},{cy - 6} {cx},{cy + 20} T{cx + 104},{cy - 26}" stroke="#bfe3c7" stroke-width="26" fill="none" stroke-linecap="round"/>']
    for k, (dx, dy) in enumerate(pts):
        o.append(f'<ellipse cx="{cx + dx}" cy="{cy + dy}" rx="13" ry="8" fill="#2D8A4E"/>')
    o.append(f'<rect x="{cx + 110}" y="{cy - 70}" width="5" height="52" fill="#555"/>')
    o.append(f'<polygon points="{cx + 115},{cy - 70} {cx + 145},{cy - 60} {cx + 115},{cy - 50}" fill="#f2b33d"/>')
    o.append(standing(cx - 74, cy + 16, "#e07b39", SKIN[0], HAIR[3], 0.62))
    o.append(standing(cx + 28, cy + 18, "#6a3fb5", SKIN[2], HAIR[1], 0.62))
    return "".join(o)


def sym_summit_risk(cx, cy):
    # a wall of glowing screens and students walking out through a door
    o = []
    for r in range(2):
        for c in range(3):
            sx, sy = cx - 120 + c * 46, cy - 52 + r * 46
            o.append(f'<rect x="{sx}" y="{sy}" width="40" height="30" rx="3" fill="#2a2e3a"/>'
                     f'<rect x="{sx + 3}" y="{sy + 3}" width="34" height="24" fill="#9cc3e0"/>')
    # door
    dx = cx + 34
    o.append(f'<rect x="{dx}" y="{cy - 58}" width="54" height="116" fill="#7a2030"/>')
    o.append(f'<polygon points="{dx},{cy - 58} {dx - 20},{cy - 48} {dx - 20},{cy + 66} {dx},{cy + 58}" fill="#a8344a"/>')
    o.append(f'<rect x="{dx + 4}" y="{cy - 54}" width="46" height="112" fill="#fbe3e6"/>')
    # students walking out, one with a raised blank sign
    o.append(standing(cx + 70, cy + 58, "#1389a6", SKIN[1], HAIR[0], 0.82,
                      '<rect x="8" y="-112" width="4" height="40" fill="#7d5532"/>'
                      '<rect x="-4" y="-132" width="34" height="24" rx="2" fill="#ffffff" stroke="#C7164E" stroke-width="3"/>'))
    o.append(standing(cx + 116, cy + 58, "#e07b39", SKIN[3], HAIR[2], 0.82))
    return "".join(o)


def sym_summit_response(cx, cy):
    # a laptop being closed and an unplugged cord, with a raised hand for the families who spoke up
    lx, ly = cx - 60, cy + 30
    o = [f'<rect x="{lx - 64}" y="{ly}" width="128" height="14" rx="4" fill="#55606b"/>',
         f'<polygon points="{lx - 56},{ly} {lx + 56},{ly} {lx + 40},{ly - 62} {lx - 40},{ly - 62}" fill="#9aa5b1" stroke="#1F6FB2" stroke-width="3"/>',
         f'<polygon points="{lx - 44},{ly - 6} {lx + 44},{ly - 6} {lx + 32},{ly - 54} {lx - 32},{ly - 54}" fill="#4b5560"/>',
         # unplugged cord
         f'<path d="M{lx + 64},{ly + 8} Q{lx + 92},{ly + 30} {lx + 112},{ly + 16}" stroke="#2a2e3a" stroke-width="5" fill="none"/>',
         f'<rect x="{lx + 110}" y="{ly + 6}" width="18" height="18" rx="3" fill="#2a2e3a"/>',
         f'<rect x="{lx + 128}" y="{ly + 9}" width="9" height="4" fill="#9aa5b1"/><rect x="{lx + 128}" y="{ly + 17}" width="9" height="4" fill="#9aa5b1"/>',
         f'<rect x="{lx + 150}" y="{ly + 2}" width="26" height="26" rx="4" fill="#ffffff" stroke="#1F6FB2" stroke-width="3"/>',
         f'<rect x="{lx + 157}" y="{ly + 10}" width="3" height="10" fill="#2a2e3a"/><rect x="{lx + 166}" y="{ly + 10}" width="3" height="10" fill="#2a2e3a"/>']
    # raised hand
    hx, hy = cx + 82, cy - 14
    o.append(f'<g transform="translate({hx},{hy})" fill="{SKIN[1]}" stroke="#1F6FB2" stroke-width="2.5">'
             f'<rect x="-14" y="-6" width="28" height="34" rx="9"/>'
             f'<rect x="-14" y="-34" width="7" height="32" rx="3.5"/>'
             f'<rect x="-6" y="-42" width="7" height="40" rx="3.5"/>'
             f'<rect x="2" y="-38" width="7" height="36" rx="3.5"/>'
             f'<rect x="10" y="-30" width="6" height="28" rx="3"/>'
             f'<rect x="-24" y="2" width="14" height="7" rx="3.5" transform="rotate(-30 -17 5)"/>'
             f'<rect x="-8" y="28" width="16" height="22" fill="#1F6FB2"/></g>')
    return "".join(o)


SYMBOLS = {
    ("alpha", "benefit"): sym_alpha_benefit, ("alpha", "risk"): sym_alpha_risk,
    ("unbound", "benefit"): sym_unbound_benefit, ("unbound", "risk"): sym_unbound_risk,
    ("turkey", "benefit"): sym_turkey_benefit, ("turkey", "risk"): sym_turkey_risk,
    ("turkey", "response"): sym_turkey_response,
    ("harvard", "benefit"): sym_harvard_benefit, ("harvard", "risk"): sym_harvard_risk,
    ("harvard", "response"): sym_harvard_response,
    ("summit", "benefit"): sym_summit_benefit, ("summit", "risk"): sym_summit_risk,
    ("summit", "response"): sym_summit_response,
}

# ---------------------------------------------------------------- assemble

out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">',
       f'<rect width="{W}" height="{H}" fill="#f7f4ee"/>']
zones = []
for i, case in enumerate(CASES):
    x = col_x(i)
    # scene, clipped to a rounded frame
    out.append(f'<clipPath id="clip-{case}"><rect x="{x:.1f}" y="{SCENE_Y}" width="{COL_W:.1f}" height="{SCENE_H}" rx="14"/></clipPath>')
    out.append(f'<g clip-path="url(#clip-{case})"><g transform="translate({x:.1f},{SCENE_Y})">{SCENES[case]()}</g></g>')
    out.append(f'<rect x="{x:.1f}" y="{SCENE_Y}" width="{COL_W:.1f}" height="{SCENE_H}" rx="14" fill="none" stroke="#5b6670" stroke-width="3"/>')
    for row, by in BANDS.items():
        fill, stroke = BAND_STYLE[row]
        empty = row == "response" and case in EMPTY_RESPONSE
        if empty:
            # an honest gap: pale band, dashed border, nothing inside
            out.append(f'<rect x="{x + 1.5:.1f}" y="{by + 1.5}" width="{COL_W - 3:.1f}" height="{BAND_H - 3}" rx="12" '
                       f'fill="#f3f7fc" stroke="{stroke}" stroke-width="3" stroke-dasharray="12 9"/>')
        else:
            out.append(f'<rect x="{x + 1.5:.1f}" y="{by + 1.5}" width="{COL_W - 3:.1f}" height="{BAND_H - 3}" rx="12" '
                       f'fill="{fill}" stroke="{stroke}" stroke-width="3"/>')
            out.append(f'<rect x="{x + 1.5:.1f}" y="{by + 1.5}" width="12" height="{BAND_H - 3}" rx="6" fill="{stroke}"/>')
            cx, cy = x + COL_W / 2 + 4, by + BAND_H / 2 + 6
            out.append(SYMBOLS[(case, row)](cx, cy))
        zones.append((case, row, x, by, x + COL_W, by + BAND_H))
out.append('</svg>')

path = sys.argv[1] if len(sys.argv) > 1 else "promise-and-peril-cases.svg"
with open(path, "w") as f:
    f.write("\n".join(out))

print(f"wrote {path} ({W}x{H})")
for case, row, x1, y1, x2, y2 in zones:
    print(f"{case:8s} {row:9s} x1={100 * x1 / W:6.2f} y1={100 * y1 / H:6.2f} "
          f"x2={100 * x2 / W:6.2f} y2={100 * y2 / H:6.2f}")
