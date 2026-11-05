"""Generate a text-free SVG scene for the Anatomy of a Learning Record overlay.

Left to right: a student at a laptop running a slider MicroSim, a glowing
envelope (the xAPI statement) holding three linked tiles (actor, verb, object)
and a result badge, a dashed path to a filing-cabinet server (the Learning
Record Store), which feeds a teacher's dashboard and a learning graph whose
next node lights up. A key on a lanyard hangs from the student.

No text, letters or numbers anywhere in the image.
Usage: python make-learning-record-svg.py anatomy-of-a-learning-record.svg
"""
import sys

W, H = 1600, 800
SKIN = "#f2c9a0"
INK = "#3b3b3b"

out = []
add = out.append
add(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">')
add('''<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d6ebf8"/><stop offset="1" stop-color="#f7fbfd"/></linearGradient>
<radialGradient id="glow"><stop offset="0" stop-color="#fff3b0" stop-opacity="0.95"/><stop offset="0.6" stop-color="#ffe680" stop-opacity="0.45"/><stop offset="1" stop-color="#ffe680" stop-opacity="0"/></radialGradient>
<radialGradient id="nodeglow"><stop offset="0" stop-color="#ffd84d" stop-opacity="0.9"/><stop offset="1" stop-color="#ffd84d" stop-opacity="0"/></radialGradient>
<marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#5d6d7e"/></marker>
<marker id="garrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#7f8c8d"/></marker>
</defs>''')

# background: sky, floor, soft decorative shapes
add(f'<rect width="{W}" height="{H}" fill="url(#sky)"/>')
add(f'<rect x="0" y="640" width="{W}" height="160" fill="#efe3cf"/>')
add(f'<rect x="0" y="636" width="{W}" height="6" fill="#d9c7a8"/>')
for cx, cy, s in [(160, 110, 0.9), (1000, 90, 0.7)]:
    add(f'<g transform="translate({cx},{cy}) scale({s})" fill="#ffffff">'
        '<ellipse cx="0" cy="0" rx="60" ry="22"/><ellipse cx="40" cy="-14" rx="40" ry="24"/>'
        '<ellipse cx="-38" cy="-8" rx="32" ry="18"/></g>')

# ---------------------------------------------------------------- student
# chair
add('<rect x="88" y="350" width="18" height="160" rx="8" fill="#8e6e53"/>')
add('<rect x="88" y="480" width="135" height="20" rx="8" fill="#a5805f"/>')
add('<rect x="100" y="500" width="12" height="140" fill="#8e6e53"/><rect x="200" y="500" width="12" height="140" fill="#8e6e53"/>')
# desk
add('<rect x="215" y="518" width="225" height="18" rx="6" fill="#c69c6d"/>')
add('<rect x="228" y="536" width="14" height="104" fill="#a5805f"/><rect x="414" y="536" width="14" height="104" fill="#a5805f"/>')
# legs (thigh then shin), shoes
add('<rect x="135" y="465" width="105" height="34" rx="16" fill="#34495e"/>')
add('<rect x="214" y="480" width="30" height="150" rx="13" fill="#34495e"/>')
add('<ellipse cx="240" cy="634" rx="26" ry="10" fill="#2c2c2c"/>')
# torso
add('<rect x="118" y="345" width="84" height="135" rx="30" fill="#3fa7d6"/>')
# lanyard and key (student-controlled data)
KEY = (160, 466)
add('<path d="M138,352 L160,440 L182,352" fill="none" stroke="#e74c3c" stroke-width="5" stroke-linejoin="round"/>')
add(f'<g transform="translate({KEY[0]},{KEY[1]})">'
    '<circle cx="0" cy="-16" r="13" fill="#f4c430" stroke="#b8860b" stroke-width="3"/>'
    '<circle cx="0" cy="-16" r="5" fill="#3fa7d6"/>'
    '<rect x="-4" y="-4" width="8" height="34" fill="#f4c430" stroke="#b8860b" stroke-width="2"/>'
    '<rect x="4" y="16" width="10" height="6" fill="#f4c430" stroke="#b8860b" stroke-width="2"/>'
    '<rect x="4" y="25" width="7" height="5" fill="#f4c430" stroke="#b8860b" stroke-width="2"/></g>')
# head and hair
add('<circle cx="162" cy="308" r="34" fill="' + SKIN + '"/>')
add('<path d="M128,304 A34,34 0 0 1 196,300 L190,292 Q160,262 132,290 Z" fill="#4a2f1d"/>')
add('<path d="M128,302 Q124,330 134,342 L138,306 Z" fill="#4a2f1d"/>')
add('<circle cx="180" cy="308" r="3.5" fill="' + INK + '"/>')
add('<path d="M176,324 Q184,328 190,322" fill="none" stroke="' + INK + '" stroke-width="2.5" stroke-linecap="round"/>')
# arm reaching to the laptop
add('<path d="M185,372 L232,440 L268,502" fill="none" stroke="#3fa7d6" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>')
add('<circle cx="272" cy="505" r="11" fill="' + SKIN + '"/>')

# ---------------------------------------------------------------- laptop + MicroSim
add('<rect x="244" y="368" width="156" height="140" rx="10" fill="#2f3640"/>')
add('<rect x="254" y="378" width="136" height="118" rx="4" fill="#fdfdfd"/>')
# simulation area: a curve and a ball
add('<path d="M264,452 Q292,392 320,430 T380,410" fill="none" stroke="#3498db" stroke-width="4"/>')
add('<circle cx="320" cy="430" r="7" fill="#e67e22"/>')
# slider control
add('<rect x="268" y="474" width="108" height="6" rx="3" fill="#bdc3c7"/>')
add('<rect x="268" y="474" width="58" height="6" rx="3" fill="#3498db"/>')
add('<circle cx="326" cy="477" r="10" fill="#ffffff" stroke="#3498db" stroke-width="4"/>')
add('<path d="M226,508 L420,508 L432,520 L214,520 Z" fill="#7f8c9a"/>')
MICROSIM = (322, 437)

# ---------------------------------------------------------------- dashed path to the envelope and on to the cabinet
add('<path d="M402,400 C430,330 420,300 448,292" fill="none" stroke="#e0a800" stroke-width="5" stroke-dasharray="12 10" stroke-linecap="round"/>')
add('<path d="M760,282 C820,262 880,250 912,300" fill="none" stroke="#e0a800" stroke-width="5" stroke-dasharray="12 10" stroke-linecap="round" marker-end="url(#arrow)"/>')

# ---------------------------------------------------------------- envelope (xAPI statement)
add('<ellipse cx="600" cy="280" rx="230" ry="160" fill="url(#glow)"/>')
add('<polygon points="440,212 600,128 760,212" fill="#fbe7b0" stroke="#d4a017" stroke-width="4" stroke-linejoin="round"/>')
add('<rect x="440" y="210" width="320" height="160" rx="16" fill="#fff6dc" stroke="#d4a017" stroke-width="4"/>')
add('<path d="M444,214 L600,250 L756,214" fill="none" stroke="#e8c870" stroke-width="3"/>')
STATEMENT = (640, 178)
# motion lines behind the envelope
for y, x0 in [(255, 392), (290, 380), (325, 392)]:
    add(f'<line x1="{x0}" y1="{y}" x2="{x0 + 34}" y2="{y}" stroke="#e0a800" stroke-width="4" stroke-linecap="round" opacity="0.6"/>')

TILE_Y, TILE = 296, 78
tiles = {"actor": 510, "verb": 600, "object": 690}
tcol = {"actor": "#8e44ad", "verb": "#e67e22", "object": "#16a085"}
# chain links between tiles
for xa, xb in [(510, 600), (600, 690)]:
    m = (xa + xb) / 2
    add(f'<rect x="{m - 14}" y="{TILE_Y - 8}" width="28" height="16" rx="8" fill="none" stroke="#7f8c8d" stroke-width="4"/>')
for name, cx in tiles.items():
    add(f'<rect x="{cx - TILE / 2}" y="{TILE_Y - TILE / 2}" width="{TILE}" height="{TILE}" rx="14" '
        f'fill="#ffffff" stroke="{tcol[name]}" stroke-width="5"/>')
cx = tiles["actor"]
add(f'<circle cx="{cx}" cy="{TILE_Y - 14}" r="12" fill="{tcol["actor"]}"/>'
    f'<path d="M{cx - 22},{TILE_Y + 28} Q{cx - 22},{TILE_Y + 2} {cx},{TILE_Y + 2} Q{cx + 22},{TILE_Y + 2} {cx + 22},{TILE_Y + 28} Z" fill="{tcol["actor"]}"/>')
cx = tiles["verb"]  # a cursor arrow clicking, with burst lines
add(f'<g transform="translate({cx - 6},{TILE_Y - 18})">'
    f'<path d="M0,0 L0,38 L10,28 L17,44 L24,41 L17,25 L30,25 Z" fill="{tcol["verb"]}" stroke="#a04d0c" stroke-width="2" stroke-linejoin="round"/>'
    f'<line x1="-8" y1="-4" x2="-16" y2="-12" stroke="{tcol["verb"]}" stroke-width="4" stroke-linecap="round"/>'
    f'<line x1="2" y1="-9" x2="2" y2="-19" stroke="{tcol["verb"]}" stroke-width="4" stroke-linecap="round"/>'
    f'<line x1="-10" y1="8" x2="-20" y2="8" stroke="{tcol["verb"]}" stroke-width="4" stroke-linecap="round"/></g>')
cx = tiles["object"]  # a cube
c = tcol["object"]
add(f'<g transform="translate({cx},{TILE_Y + 2})">'
    f'<polygon points="0,-26 24,-13 0,0 -24,-13" fill="#48c9b0"/>'
    f'<polygon points="-24,-13 0,0 0,28 -24,15" fill="{c}"/>'
    f'<polygon points="24,-13 0,0 0,28 24,15" fill="#0e6655"/></g>')
# result badge: a rosette with ribbons and a check mark, pinned to the corner
RESULT = (752, 386)
bx, by = RESULT
add(f'<polygon points="{bx - 22},{by + 16} {bx - 34},{by + 62} {bx - 18},{by + 54} {bx - 8},{by + 68} {bx - 2},{by + 22}" fill="#c0392b"/>')
add(f'<polygon points="{bx + 22},{by + 16} {bx + 34},{by + 62} {bx + 18},{by + 54} {bx + 8},{by + 68} {bx + 2},{by + 22}" fill="#c0392b"/>')
add(f'<circle cx="{bx}" cy="{by}" r="38" fill="#27ae60" stroke="#ffffff" stroke-width="5"/>')
add(f'<circle cx="{bx}" cy="{by}" r="30" fill="none" stroke="#a9dfbf" stroke-width="3"/>')
add(f'<path d="M{bx - 16},{by + 1} L{bx - 5},{by + 13} L{bx + 17},{by - 12}" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>')

# ---------------------------------------------------------------- filing-cabinet server (LRS)
CX0, CX1 = 840, 1010
add(f'<rect x="{CX0 + 12}" y="645" width="{CX1 - CX0 - 24}" height="12" rx="4" fill="#c9b79a"/>')
add(f'<rect x="{CX0}" y="300" width="{CX1 - CX0}" height="345" rx="14" fill="#7f8fa6" stroke="#4b5a6e" stroke-width="4"/>')
add(f'<rect x="{CX0 + 40}" y="292" width="{CX1 - CX0 - 80}" height="10" rx="5" fill="#4b5a6e"/>')  # intake slot
drawers = [(316, 386), (398, 468), (560, 632)]
for y0, y1 in drawers:
    add(f'<rect x="{CX0 + 14}" y="{y0}" width="{CX1 - CX0 - 28}" height="{y1 - y0}" rx="8" fill="#a4b0be" stroke="#4b5a6e" stroke-width="3"/>')
    my = (y0 + y1) / 2
    add(f'<rect x="{(CX0 + CX1) / 2 - 26}" y="{my - 6}" width="52" height="12" rx="6" fill="#4b5a6e"/>')
    add(f'<circle cx="{CX1 - 30}" cy="{y0 + 14}" r="6" fill="#2ecc71"/>')
LRS = (925, 351)
# the open drawer (the learning record): dark interior with folder tabs, drawer pulled forward
add(f'<rect x="{CX0 + 14}" y="480" width="{CX1 - CX0 - 28}" height="68" rx="6" fill="#3d4756"/>')
folder_cols = ["#f5b041", "#5dade2", "#f5b041", "#58d68d", "#ec7063", "#5dade2", "#f5b041", "#af7ac5"]
for i, fc in enumerate(folder_cols):
    fx = CX0 + 24 + i * 18
    top = 470 + (i % 3) * 6
    add(f'<rect x="{fx}" y="{top}" width="16" height="{540 - top}" rx="3" fill="{fc}" stroke="#2c3e50" stroke-width="1.5"/>')
add(f'<rect x="{CX0 - 8}" y="530" width="{CX1 - CX0 + 16}" height="58" rx="8" fill="#b6c2cf" stroke="#4b5a6e" stroke-width="4"/>')
add(f'<rect x="{(CX0 + CX1) / 2 - 26}" y="553" width="52" height="12" rx="6" fill="#4b5a6e"/>')
RECORD = (925, 505)

# feeds from the cabinet
add('<path d="M1016,350 C1060,330 1070,250 1102,220" fill="none" stroke="#5d6d7e" stroke-width="5" stroke-dasharray="12 10" marker-end="url(#arrow)"/>')

# ---------------------------------------------------------------- teacher dashboard
add('<rect x="1110" y="60" width="330" height="240" rx="14" fill="#2f3640"/>')
add('<rect x="1124" y="74" width="302" height="212" rx="6" fill="#fdfdfd"/>')
add('<rect x="1262" y="300" width="26" height="42" fill="#4b5563"/><rect x="1225" y="340" width="100" height="12" rx="6" fill="#4b5563"/>')
add('<line x1="1146" y1="264" x2="1406" y2="264" stroke="#95a5a6" stroke-width="3"/>')
add('<line x1="1146" y1="96" x2="1146" y2="264" stroke="#95a5a6" stroke-width="3"/>')
bars = [(150, "#3498db"), (118, "#3498db"), (60, "#e74c3c"), (136, "#3498db"), (98, "#3498db"), (142, "#3498db")]
for i, (bh, bc) in enumerate(bars):
    x = 1164 + i * 40
    add(f'<rect x="{x}" y="{264 - bh}" width="28" height="{bh}" rx="3" fill="{bc}"/>')
DASH = (1275, 180)
# teacher standing, pointing at the dashboard
tx = 1515
add(f'<rect x="{tx - 18}" y="380" width="14" height="50" fill="#34495e"/><rect x="{tx + 4}" y="380" width="14" height="50" fill="#34495e"/>')
add(f'<ellipse cx="{tx - 12}" cy="432" rx="14" ry="7" fill="#2c2c2c"/><ellipse cx="{tx + 12}" cy="432" rx="14" ry="7" fill="#2c2c2c"/>')
add(f'<path d="M{tx - 30},392 L{tx - 24},300 Q{tx},286 {tx + 24},300 L{tx + 30},392 Z" fill="#9b59b6"/>')
add(f'<path d="M{tx - 16},306 L{tx - 50},262 L{tx - 74},248" fill="none" stroke="#9b59b6" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>')
add(f'<circle cx="{tx - 78}" cy="246" r="8" fill="{SKIN}"/>')
add(f'<path d="M{tx + 20},306 L{tx + 30},360" stroke="#9b59b6" stroke-width="16" stroke-linecap="round"/>')
add(f'<circle cx="{tx}" cy="262" r="26" fill="{SKIN}"/>')
add(f'<path d="M{tx - 26},258 A26,26 0 0 1 {tx + 26},258 Q{tx},244 {tx - 26},258 Z" fill="#6e2c00"/>')
add(f'<circle cx="{tx + 8}" cy="232" r="11" fill="#6e2c00"/>')
add(f'<circle cx="{tx - 10}" cy="264" r="3" fill="{INK}"/>')

# ---------------------------------------------------------------- learning graph
add('<rect x="1092" y="450" width="490" height="330" rx="22" fill="#ffffff" stroke="#d5dbe1" stroke-width="3" opacity="0.92"/>')
nodes = {1: (1160, 520), 2: (1160, 690), 3: (1292, 605), 4: (1420, 515),
         5: (1292, 735), 6: (1420, 650), 7: (1530, 720), 8: (1530, 560)}
edges = [(3, 1), (3, 2), (4, 3), (6, 3), (7, 5), (7, 6), (8, 7)]  # concept -> prerequisite
R = 28
for a, b in edges:
    (x1, y1), (x2, y2) = nodes[a], nodes[b]
    dx, dy = x2 - x1, y2 - y1
    d = (dx * dx + dy * dy) ** 0.5
    sx, sy = x1 + dx / d * R, y1 + dy / d * R
    ex, ey = x2 - dx / d * (R + 4), y2 - dy / d * (R + 4)
    add(f'<line x1="{sx:.0f}" y1="{sy:.0f}" x2="{ex:.0f}" y2="{ey:.0f}" stroke="#7f8c8d" stroke-width="4" marker-end="url(#garrow)"/>')
mastered, ready = {1, 2, 5}, 3
nx, ny = nodes[ready]
add(f'<circle cx="{nx}" cy="{ny}" r="62" fill="url(#nodeglow)"/>')
for k, (x, y) in nodes.items():
    if k in mastered:
        add(f'<circle cx="{x}" cy="{y}" r="{R}" fill="#58b368" stroke="#2e7d32" stroke-width="4"/>')
    elif k == ready:
        add(f'<circle cx="{x}" cy="{y}" r="{R + 4}" fill="#ffd23f" stroke="#e67e22" stroke-width="5"/>')
        for ang in range(0, 360, 45):
            import math
            r0, r1 = R + 14, R + 26
            a = math.radians(ang + 22.5)
            add(f'<line x1="{x + r0 * math.cos(a):.0f}" y1="{y + r0 * math.sin(a):.0f}" x2="{x + r1 * math.cos(a):.0f}" '
                f'y2="{y + r1 * math.sin(a):.0f}" stroke="#f5b041" stroke-width="4" stroke-linecap="round"/>')
    else:
        add(f'<circle cx="{x}" cy="{y}" r="{R}" fill="#d5dbe1" stroke="#95a5a6" stroke-width="4"/>')
NEXT = nodes[ready]
# feed from the cabinet into the graph card (drawn after the card so it stays visible)
add('<path d="M1016,470 C1050,500 1060,575 1084,598" fill="none" stroke="#5d6d7e" stroke-width="5" stroke-dasharray="12 10" marker-end="url(#arrow)"/>')

add('</svg>')
open(sys.argv[1] if len(sys.argv) > 1 else "anatomy-of-a-learning-record.svg", "w").write("\n".join(out))

for name, (x, y) in [("microsim", MICROSIM), ("key", KEY), ("statement", STATEMENT),
                     ("actor", (tiles["actor"], TILE_Y)), ("verb", (tiles["verb"], TILE_Y)),
                     ("object", (tiles["object"], TILE_Y)), ("result", RESULT), ("lrs", LRS),
                     ("record", RECORD), ("dashboard", DASH), ("next", NEXT)]:
    print(f"{name:10s} x={x / W * 100:5.1f}%  y={y / H * 100:5.1f}%")
