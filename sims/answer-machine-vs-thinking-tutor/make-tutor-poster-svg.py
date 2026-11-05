"""Generate a text-free SVG for the Answer Machine vs. Thinking Tutor grid poster.

The same homework question (a six-pack of juice and a stack of coins) is handled
two ways. Left: an open AI chatbot on a phone sends one big finished answer, and
the student leans back under an empty thought cloud. Right: a guided AI tutor on
a phone sends a chain of small question and hint bubbles, and the student writes
on paper under a thought cloud holding four thinking-skill icons. Center bottom:
a shield and guard rail ringed by guardrail badges.

No text anywhere. Run:
    python3 make-tutor-poster-svg.py answer-machine-vs-thinking-tutor.svg
"""
import sys

W, H = 1600, 800

# Zone rectangles in SVG pixels (x1, y1, x2, y2). These drive the drawn panels
# and the printed percentages, so the image and data.json always agree.
ZONES = {
    "open-ai-move":     (10, 20, 310, 780),
    "open-ai-result":   (310, 20, 620, 780),
    "same-question":    (620, 20, 980, 390),
    "guardrails":       (620, 400, 980, 780),
    "guided-ai-result": (980, 20, 1290, 780),
    "guided-ai-move":   (1290, 20, 1590, 780),
}
PANEL_FILL = {
    "open-ai-move": "#fde3d3", "open-ai-result": "#fbe9e1",
    "same-question": "#ecebf3", "guardrails": "#ebe4f7",
    "guided-ai-result": "#e1f2ea", "guided-ai-move": "#d9eef3",
}

INK = "#2a2e3a"
out = []
add = out.append


# ── small icon helpers ──────────────────────────────────────────────────────
def qmark(cx, cy, s, color):
    """Question-mark icon drawn as a hook path and a dot (a shape, not a font glyph)."""
    return (f'<g transform="translate({cx},{cy}) scale({s})">'
            f'<path d="M-9,-10 C-9,-24 11,-24 11,-11 C11,-2 1,-1 1,7" fill="none" '
            f'stroke="{color}" stroke-width="6" stroke-linecap="round"/>'
            f'<circle cx="1" cy="17" r="4" fill="{color}"/></g>')


def check(cx, cy, s, color, w=7):
    return (f'<polyline transform="translate({cx},{cy}) scale({s})" points="-12,0 -3,10 14,-11" '
            f'fill="none" stroke="{color}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/>')


def sixpack(cx, cy, s):
    """Six juice bottles in a carton: back row of three, front row of three."""
    g = [f'<g transform="translate({cx},{cy}) scale({s})">']
    for row, (dy, dx0, fill) in enumerate([(-8, -14, "#f0a73a"), (0, -20, "#f7b84b")]):
        for k in range(3):
            x = dx0 + k * 17
            g.append(f'<rect x="{x}" y="{dy - 30}" width="5" height="7" fill="#e85d3c"/>')
            g.append(f'<rect x="{x - 4}" y="{dy - 24}" width="13" height="26" rx="4" fill="{fill}" stroke="#b86f16" stroke-width="1.2"/>')
    g.append('<rect x="-27" y="-6" width="56" height="16" rx="3" fill="#6fae4f" stroke="#3f7a2c" stroke-width="1.5"/>')
    g.append('<rect x="-27" y="0" width="56" height="3" fill="#ffffff" opacity="0.6"/>')
    g.append('</g>')
    return "".join(g)


def coins(cx, cy, s):
    g = [f'<g transform="translate({cx},{cy}) scale({s})">']
    for k in range(4):
        y = -k * 8
        g.append(f'<rect x="-16" y="{y - 4}" width="32" height="8" fill="#d9a520"/>')
        g.append(f'<ellipse cx="0" cy="{y + 4}" rx="16" ry="5" fill="#c08f12"/>')
        g.append(f'<ellipse cx="0" cy="{y - 4}" rx="16" ry="5" fill="#f4c542" stroke="#c08f12" stroke-width="1"/>')
    g.append('</g>')
    return "".join(g)


def bulb(cx, cy, s):
    g = [f'<g transform="translate({cx},{cy}) scale({s})">']
    for ang in range(-150, -20, 32):
        g.append(f'<line x1="0" y1="-26" x2="0" y2="-36" transform="rotate({ang + 90} 0 -6)" '
                 f'stroke="#f4b400" stroke-width="3" stroke-linecap="round"/>')
    g.append('<circle cx="0" cy="-6" r="14" fill="#ffd54a" stroke="#d99a00" stroke-width="2"/>')
    g.append('<rect x="-7" y="7" width="14" height="5" rx="1" fill="#9aa0a6"/>')
    g.append('<rect x="-6" y="12" width="12" height="4" rx="1" fill="#7c8288"/>')
    g.append('</g>')
    return "".join(g)


def pencil(cx, cy, s, rot=-35):
    return (f'<g transform="translate({cx},{cy}) rotate({rot}) scale({s})">'
            '<rect x="-20" y="-4" width="32" height="8" fill="#f4c542" stroke="#b8860b" stroke-width="1"/>'
            '<rect x="-25" y="-4" width="6" height="8" fill="#e98a9a"/>'
            '<polygon points="12,-4 22,0 12,4" fill="#f2d7b0"/>'
            '<polygon points="19,-1.2 22,0 19,1.2" fill="#333"/></g>')


def scribble(x, y, w, color="#7a8794"):
    return (f'<path d="M{x},{y} q{w*0.12},-8 {w*0.25},0 t{w*0.25},0 t{w*0.25},0 t{w*0.25},0" '
            f'fill="none" stroke="{color}" stroke-width="3" stroke-linecap="round"/>')


def bubble(x1, y1, x2, y2, fill, side, stroke="none"):
    """Chat bubble with a small tail on the left (AI) or right (student) bottom corner."""
    if side == "left":
        tail = f'<polygon points="{x1 + 6},{y2 - 16} {x1 - 8},{y2 + 4} {x1 + 22},{y2 - 2}" fill="{fill}"/>'
    else:
        tail = f'<polygon points="{x2 - 6},{y2 - 16} {x2 + 8},{y2 + 4} {x2 - 22},{y2 - 2}" fill="{fill}"/>'
    return (tail + f'<rect x="{x1}" y="{y1}" width="{x2 - x1}" height="{y2 - y1}" rx="16" '
            f'fill="{fill}" stroke="{stroke}" stroke-width="2"/>')


def phone(x1, y1, x2, y2, case):
    return (f'<rect x="{x1 + 6}" y="{y1 + 8}" width="{x2 - x1}" height="{y2 - y1}" rx="34" fill="#000" opacity="0.12"/>'
            f'<rect x="{x1}" y="{y1}" width="{x2 - x1}" height="{y2 - y1}" rx="34" fill="{case}"/>'
            f'<rect x="{x1 + 12}" y="{y1 + 30}" width="{x2 - x1 - 24}" height="{y2 - y1 - 50}" rx="18" fill="#fbfcfe"/>'
            f'<rect x="{(x1 + x2) / 2 - 30}" y="{y1 + 11}" width="60" height="10" rx="5" fill="#111"/>')


def cloud(cx, cy, sx, sy, fill, stroke, dash=""):
    parts = [(-0.55, 0.15, 0.42, 0.55), (-0.2, -0.3, 0.45, 0.6), (0.25, -0.28, 0.45, 0.6),
             (0.58, 0.12, 0.4, 0.55), (0.05, 0.3, 0.7, 0.5)]
    d = f' stroke-dasharray="{dash}"' if dash else ""
    outline = "".join(f'<ellipse cx="{cx + px * sx}" cy="{cy + py * sy}" rx="{rx * sx}" ry="{ry * sy}" '
                      f'fill="{fill}" stroke="{stroke}" stroke-width="5"{d}/>' for px, py, rx, ry in parts)
    fillonly = "".join(f'<ellipse cx="{cx + px * sx}" cy="{cy + py * sy}" rx="{rx * sx - 2.5}" ry="{ry * sy - 2.5}" '
                       f'fill="{fill}"/>' for px, py, rx, ry in parts)
    return outline + fillonly


def limb(x1, y1, x2, y2, color, w=18):
    return (f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" '
            f'stroke-width="{w}" stroke-linecap="round"/>')


# ── document and panels ─────────────────────────────────────────────────────
add(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">')
add(f'<rect width="{W}" height="{H}" fill="#f7f5f0"/>')
for zid, (x1, y1, x2, y2) in ZONES.items():
    add(f'<rect x="{x1 + 5}" y="{y1 + 4}" width="{x2 - x1 - 10}" height="{y2 - y1 - 8}" rx="22" fill="{PANEL_FILL[zid]}"/>')
# floor strips in the two student panels
for zid in ("open-ai-result", "guided-ai-result"):
    x1, y1, x2, y2 = ZONES[zid]
    add(f'<rect x="{x1 + 5}" y="{y2 - 46}" width="{x2 - x1 - 10}" height="42" rx="0" fill="#000" opacity="0.06"/>')

# ── LEFT PHONE: open AI, one big finished answer ────────────────────────────
add(phone(42, 115, 278, 765, "#d1643a"))
add(bubble(146, 170, 254, 242, "#4a8fd8", "right"))
add(sixpack(182, 212, 0.95))
add(qmark(230, 204, 1.0, "#ffffff"))
# big AI answer bubble
add(bubble(66, 266, 254, 640, "#ffffff", "left", stroke="#d5d9e0"))
add('<rect x="88" y="290" width="144" height="250" rx="6" fill="#fffdf6" stroke="#c9ced6" stroke-width="2"/>')
for k in range(8):
    w = 110 if k % 3 else 96
    add(f'<rect x="102" y="{310 + k * 22}" width="{w}" height="7" rx="3" fill="#b9c0ca"/>')
add('<rect x="98" y="496" width="124" height="30" rx="6" fill="#bfe7c8" stroke="#2d8a4e" stroke-width="2"/>')
add('<rect x="108" y="507" width="70" height="8" rx="3" fill="#2d8a4e"/>')
add('<circle cx="205" cy="580" r="36" fill="#2d8a4e"/>')
add(check(205, 580, 1.55, "#ffffff", w=6))
# lightning bolt: instant
add('<polygon points="96,560 118,560 108,580 126,580 92,622 104,592 88,592" fill="#f4b400" stroke="#c98f00" stroke-width="1.5"/>')
# empty typing bar
add('<rect x="66" y="690" width="188" height="30" rx="15" fill="#eef1f5" stroke="#d5d9e0" stroke-width="2"/>')

# ── RIGHT PHONE: guided AI, a chain of small hints ──────────────────────────
add(phone(1322, 115, 1558, 765, "#16809c"))
AIL, AIR = 1348, 1432
STL, STR = 1448, 1534
rows = [168, 246, 324, 402, 480, 558, 636]
add(bubble(1424, rows[0], STR, rows[0] + 62, "#4a8fd8", "right"))
add(sixpack(1460, rows[0] + 41, 0.9))
add(qmark(1508, rows[0] + 33, 0.95, "#ffffff"))
add(bubble(AIL, rows[1], AIR, rows[1] + 62, "#e7ecf2", "left"))
add(qmark(1390, rows[1] + 31, 1.1, "#16809c"))
add(bubble(STL, rows[2], STR, rows[2] + 62, "#4a8fd8", "right"))
add(pencil(1474, rows[2] + 34, 0.9))
add(scribble(1492, rows[2] + 36, 32, "#ffffff"))
add(bubble(AIL, rows[3], AIR, rows[3] + 62, "#e7ecf2", "left"))
add(bulb(1390, rows[3] + 34, 1.05))
add(bubble(STL, rows[4], STR, rows[4] + 62, "#4a8fd8", "right"))
add(pencil(1474, rows[4] + 34, 0.9))
add(scribble(1492, rows[4] + 26, 32, "#ffffff"))
add(scribble(1492, rows[4] + 42, 24, "#ffffff"))
add(bubble(AIL, rows[5], 1416, rows[5] + 62, "#e7ecf2", "left"))
add(qmark(1382, rows[5] + 33, 0.75, "#16809c"))
add(bubble(STL, rows[6], STR, rows[6] + 62, "#2d8a4e", "right"))
add(check(1491, rows[6] + 31, 1.3, "#ffffff", w=6))
add('<rect x="1346" y="708" width="188" height="24" rx="12" fill="#eef1f5" stroke="#d5d9e0" stroke-width="2"/>')

# ── LEFT STUDENT: leaning back, empty thought cloud ─────────────────────────
SHIRT_L, SKIN_L, HAIR_L, PANTS = "#e07b39", "#f2c9a0", "#4a3222", "#3d4a63"
# side table with a blank sheet and an unused pencil
add('<rect x="330" y="570" width="96" height="14" rx="4" fill="#a0764e"/>')
add('<rect x="340" y="584" width="10" height="150" fill="#86613f"/><rect x="406" y="584" width="10" height="150" fill="#86613f"/>')
add('<polygon points="342,568 404,568 412,560 350,560" fill="#ffffff" stroke="#c9ced6" stroke-width="1.5"/>')
add(pencil(392, 552, 1.0, rot=0))
# reclined chair
add(limb(470, 640, 470, 735, "#6b7280", 8))
add(limb(560, 640, 572, 735, "#6b7280", 8))
add('<rect x="455" y="622" width="120" height="20" rx="8" fill="#8e9aaf"/>')
add(limb(570, 630, 612, 470, "#8e9aaf", 22))
# legs: stretched out toward the table
add(limb(500, 615, 425, 640, PANTS, 26))
add(limb(425, 640, 440, 728, PANTS, 22))
add('<ellipse cx="430" cy="734" rx="22" ry="9" fill="#2b2b2b"/>')
# torso leaning back
add(f'<line x1="515" y1="610" x2="565" y2="500" stroke="{SHIRT_L}" stroke-width="58" stroke-linecap="round"/>')
# head
add(f'<circle cx="582" cy="452" r="32" fill="{SKIN_L}"/>')
add(f'<path d="M552,446 Q556,412 590,416 Q614,420 612,446 Q600,428 578,432 Q562,434 552,446 Z" fill="{HAIR_L}"/>')
# arms folded behind the head
add(limb(545, 500, 520, 440, SHIRT_L, 18))
add(limb(520, 440, 566, 428, SHIRT_L, 16))
add(limb(588, 498, 616, 448, SHIRT_L, 18))
# relaxed closed eyes and smile
add('<path d="M566,456 q5,4 10,0" fill="none" stroke="#3b2a1e" stroke-width="2.5" stroke-linecap="round"/>')
add('<path d="M588,456 q5,4 10,0" fill="none" stroke="#3b2a1e" stroke-width="2.5" stroke-linecap="round"/>')
add('<path d="M572,470 q9,7 18,0" fill="none" stroke="#a2513a" stroke-width="2.5" stroke-linecap="round"/>')
# phone in lap glowing with the answer
add('<rect x="488" y="560" width="30" height="46" rx="6" fill="#d1643a" transform="rotate(-20 503 583)"/>')
# empty, dashed thought cloud
add(cloud(472, 262, 142, 110, "#ffffff", "#c2a49a", dash="12 9"))
add('<circle cx="540" cy="372" r="10" fill="#ffffff" stroke="#c2a49a" stroke-width="3" stroke-dasharray="5 4"/>')
add('<circle cx="560" cy="398" r="6" fill="#ffffff" stroke="#c2a49a" stroke-width="3"/>')

# ── RIGHT STUDENT: leaning in, writing, full thought cloud ──────────────────
SHIRT_R, SKIN_R, HAIR_R = "#1389a6", "#8d5a3b", "#1f1a17"
# desk with worked paper
add('<polygon points="1120,560 1282,560 1282,584 1104,584" fill="#b08458"/>')
add('<rect x="1104" y="584" width="178" height="12" fill="#8a6440"/>')
add('<rect x="1120" y="596" width="11" height="150" fill="#8a6440"/><rect x="1262" y="596" width="11" height="150" fill="#8a6440"/>')
add('<polygon points="1150,566 1250,566 1262,552 1166,552" fill="#ffffff" stroke="#c9ced6" stroke-width="1.5"/>')
for k, w in enumerate([60, 48, 66]):
    add(f'<line x1="{1172 + k * 2}" y1="{556 + k * 4}" x2="{1172 + k * 2 + w}" y2="{556 + k * 4}" stroke="#7a8794" stroke-width="2"/>')
# chair, upright
add(limb(1010, 640, 1006, 740, "#6b7280", 8))
add(limb(1078, 640, 1082, 740, "#6b7280", 8))
add('<rect x="995" y="622" width="100" height="20" rx="8" fill="#8e9aaf"/>')
add(limb(1002, 632, 994, 500, "#8e9aaf", 20))
# legs under the desk
add(limb(1050, 615, 1128, 622, PANTS, 26))
add(limb(1128, 622, 1134, 730, PANTS, 22))
add('<ellipse cx="1146" cy="736" rx="22" ry="9" fill="#2b2b2b"/>')
# torso leaning forward
add(f'<line x1="1040" y1="608" x2="1092" y2="500" stroke="{SHIRT_R}" stroke-width="58" stroke-linecap="round"/>')
# head tilted toward the paper
add(f'<circle cx="1122" cy="456" r="32" fill="{SKIN_R}"/>')
add(f'<path d="M1092,452 Q1090,418 1122,418 Q1152,420 1154,446 Q1140,430 1118,434 Q1100,438 1092,452 Z" fill="{HAIR_R}"/>')
add('<circle cx="1134" cy="460" r="3.5" fill="#1d1410"/><circle cx="1114" cy="460" r="3.5" fill="#1d1410"/>')
add('<path d="M1116,476 q8,3 16,0" fill="none" stroke="#3a2016" stroke-width="2.5" stroke-linecap="round"/>')
# arms: one writes, one steadies the paper
add(limb(1088, 512, 1136, 548, SHIRT_R, 18))
add(limb(1136, 548, 1188, 556, SKIN_R, 13))
add(limb(1072, 520, 1120, 560, SHIRT_R, 18))
add(limb(1120, 560, 1158, 560, SKIN_R, 13))
add(pencil(1200, 548, 1.1, rot=-55))
# thought cloud holding four thinking-skill icons
add(cloud(1136, 262, 140, 124, "#ffffff", "#7fbfb1"))
add('<circle cx="1116" cy="384" r="10" fill="#ffffff" stroke="#7fbfb1" stroke-width="3"/>')
add('<circle cx="1118" cy="408" r="6" fill="#ffffff" stroke="#7fbfb1" stroke-width="3"/>')
# decomposition: two puzzle pieces pulled apart
add('<g transform="translate(1088,226)">'
    '<rect x="-34" y="-18" width="30" height="36" rx="3" fill="#e07b39"/>'
    '<circle cx="-3" cy="0" r="8" fill="#e07b39"/>'
    '<rect x="10" y="-18" width="30" height="36" rx="3" fill="#6a3fb5"/>'
    '<circle cx="11" cy="0" r="8" fill="#ffffff"/></g>')
# pattern recognition: a repeating row of shapes
add('<g transform="translate(1186,226)">'
    '<circle cx="-36" cy="0" r="9" fill="#1389a6"/><polygon points="-20,9 -10,-9 0,9" fill="#e07b39"/>'
    '<circle cx="14" cy="0" r="9" fill="#1389a6"/><polygon points="30,9 40,-9 50,9" fill="#e07b39"/></g>')
# abstraction: a subway-map style graph, stations and straight links only
add('<g transform="translate(1088,300)">'
    '<polyline points="-30,12 -6,-12 22,-12 34,10" fill="none" stroke="#2d8a4e" stroke-width="5" stroke-linejoin="round"/>'
    '<line x1="-6" y1="-12" x2="-6" y2="16" stroke="#c7164e" stroke-width="5"/>'
    + "".join(f'<circle cx="{x}" cy="{y}" r="6" fill="#ffffff" stroke="#2a2e3a" stroke-width="3"/>'
              for x, y in [(-30, 12), (-6, -12), (22, -12), (34, 10), (-6, 16)]) + '</g>')
# algorithmic thinking: three steps in a flow, each block leading to the next
add('<g transform="translate(1186,300)">'
    '<rect x="-38" y="-20" width="22" height="16" rx="4" fill="#6a3fb5"/>'
    '<rect x="-11" y="-8" width="22" height="16" rx="4" fill="#6a3fb5"/>'
    '<rect x="16" y="4" width="22" height="16" rx="4" fill="#6a3fb5"/>'
    '<polyline points="-16,-12 -13,-12 -13,-8" fill="none" stroke="#2a2e3a" stroke-width="3"/>'
    '<polyline points="11,0 14,0 14,4" fill="none" stroke="#2a2e3a" stroke-width="3"/></g>')

# ── CENTER TOP: the same homework question ─────────────────────────────────
add('<polygon points="760,354 800,354 770,382" fill="#ffffff"/>')
add('<rect x="652" y="112" width="296" height="246" rx="28" fill="#ffffff" stroke="#c9c4dc" stroke-width="3"/>')
add('<polygon points="762,356 798,356 770,380" fill="#ffffff"/>')
add('<polyline points="760,357 770,381 800,357" fill="none" stroke="#c9c4dc" stroke-width="3"/>')
add(sixpack(726, 268, 2.0))
add(coins(822, 280, 1.3))
add(qmark(898, 236, 2.3, "#2a2e3a"))

# ── CENTER BOTTOM: guardrails ──────────────────────────────────────────────
# road guard rail behind the shield
for px in (652, 712, 888, 948):
    add(f'<rect x="{px - 5}" y="596" width="10" height="56" fill="#7c8590"/>')
add('<rect x="640" y="600" width="320" height="22" rx="8" fill="#b9c2cc" stroke="#7c8590" stroke-width="2"/>')
add('<rect x="640" y="608" width="320" height="5" fill="#e3e8ee"/>')
# shield
add('<path d="M800,486 L872,512 C872,590 846,640 800,672 C754,640 728,590 728,512 Z" fill="#6a3fb5" stroke="#4b2a8a" stroke-width="4"/>')
add('<path d="M800,502 L858,523 C858,588 836,628 800,654 Z" fill="#7e57c2"/>')
add(bulb(800, 590, 1.9))


def badge(cx, cy, inner):
    return (f'<circle cx="{cx}" cy="{cy}" r="36" fill="#ffffff" stroke="#6a3fb5" stroke-width="4"/>' + inner)


# grounding: an open book
add(badge(686, 520, '<g transform="translate(686,522)">'
      '<path d="M0,-12 C-8,-18 -18,-18 -24,-14 V14 C-18,10 -8,10 0,16 Z" fill="#1389a6"/>'
      '<path d="M0,-12 C8,-18 18,-18 24,-14 V14 C18,10 8,10 0,16 Z" fill="#33a5c2"/></g>'))
# tool checks: a calculator
add(badge(914, 520, '<g transform="translate(914,520)">'
      '<rect x="-15" y="-20" width="30" height="40" rx="4" fill="#2a2e3a"/>'
      '<rect x="-10" y="-15" width="20" height="9" rx="1" fill="#bfe7c8"/>'
      + "".join(f'<rect x="{-10 + c * 7.5}" y="{-2 + r * 7}" width="5" height="5" fill="#f4c542"/>'
                for r in range(3) for c in range(3)) + '</g>'))
# teacher-visible logs: an eye over a log sheet
add(badge(686, 690, '<g transform="translate(686,692)">'
      '<rect x="-14" y="-6" width="28" height="22" rx="2" fill="#ffffff" stroke="#7a8794" stroke-width="2"/>'
      '<line x1="-9" y1="2" x2="9" y2="2" stroke="#7a8794" stroke-width="2"/>'
      '<line x1="-9" y1="9" x2="6" y2="9" stroke="#7a8794" stroke-width="2"/>'
      '<path d="M-20,-14 Q0,-32 20,-14 Q0,4 -20,-14 Z" fill="#ffffff" stroke="#2a2e3a" stroke-width="2.5"/>'
      '<circle cx="0" cy="-14" r="6" fill="#2d8a4e"/><circle cx="0" cy="-14" r="2.5" fill="#111"/></g>'))
# time limits: an hourglass
add(badge(914, 690, '<g transform="translate(914,690)">'
      '<rect x="-14" y="-22" width="28" height="5" rx="2" fill="#8a6440"/>'
      '<rect x="-14" y="17" width="28" height="5" rx="2" fill="#8a6440"/>'
      '<path d="M-11,-17 H11 L2,0 L11,17 H-11 L-2,0 Z" fill="#e8f1fb" stroke="#2a2e3a" stroke-width="2"/>'
      '<path d="M-6,-10 H6 L1,-2 H-1 Z" fill="#f4c542"/><path d="M-8,15 H8 L0,7 Z" fill="#f4c542"/></g>'))
# topic and age limits: a padlock
add(badge(800, 728, '<g transform="translate(800,730)">'
      '<path d="M-10,-4 V-12 A10,10 0 0 1 10,-12 V-4" fill="none" stroke="#2a2e3a" stroke-width="5"/>'
      '<rect x="-15" y="-4" width="30" height="22" rx="4" fill="#c7164e"/>'
      '<circle cx="0" cy="6" r="3.5" fill="#ffffff"/></g>'))

add('</svg>')

path = sys.argv[1] if len(sys.argv) > 1 else "answer-machine-vs-thinking-tutor.svg"
with open(path, "w") as f:
    f.write("\n".join(out))

print(f"wrote {path}")
print("zone percentages for data.json (x1, y1, x2, y2):")
for zid, (x1, y1, x2, y2) in ZONES.items():
    print(f"  {zid:18s} x1={100 * x1 / W:.1f} y1={100 * y1 / H:.1f} "
          f"x2={100 * x2 / W:.1f} y2={100 * y2 / H:.1f}")
