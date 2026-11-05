"""Generate a text-free SVG of Schein's culture iceberg for the overlay MicroSim.

An iceberg in cross-section at sea. Above the water: cultural artifacts (school
building, schedule grid, trophy case, pep-rally crowd). At the waterline:
espoused values (framed mission statement, blank banner). Below: norms (closed
doors) in the clearer upper ice, then dark, heavy ice holding basic assumptions
(a lone desk in a small room, a clock fused into the ice) and the grammar of
schooling (rows of desks facing front). A small reform boat steers at the tip
while a wide shelf of hidden ice sits under its path, and a diver with a lamp
explores below (culture assessment). No text anywhere.

Usage: python make-iceberg-svg.py schein-culture-iceberg.svg
"""
import math
import sys

W, H = 1600, 800
SEA = 330  # waterline y

# Marker anchor points (pixel centres of each object); printed as percentages.
ANCHORS = {
    "artifacts (school building)": (527, 110),
    "rituals (pep rally)": (800, 248),
    "espoused values (mission frame)": (440, 328),
    "norms (closed doors)": (315, 412),
    "hidden mass (shelf under boat)": (1105, 405),
    "assumption: works alone (lone desk)": (325, 600),
    "assumption: fixed time (clock)": (560, 690),
    "grammar of schooling (desk rows)": (775, 555),
    "reform boat": (1335, 300),
    "culture assessment (diver)": (1145, 632),
}

o = []
o.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">')
o.append('''<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe1f6"/><stop offset="1" stop-color="#f1f8fc"/></linearGradient>
<linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f9ad6"/><stop offset="0.45" stop-color="#1f5f93"/><stop offset="1" stop-color="#0a2340"/></linearGradient>
<linearGradient id="under" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#b9e2f5"/><stop offset="0.2" stop-color="#8cc4e3"/>
  <stop offset="0.36" stop-color="#557fa8"/><stop offset="1" stop-color="#22385a"/></linearGradient>
<linearGradient id="tip" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d4ecf8"/></linearGradient>
<radialGradient id="beam" cx="1" cy="0.5" r="1"><stop offset="0" stop-color="#fff4b0" stop-opacity="0.85"/><stop offset="1" stop-color="#fff4b0" stop-opacity="0"/></radialGradient>
</defs>''')

# sky, sun, clouds, birds
o.append(f'<rect width="{W}" height="{SEA}" fill="url(#sky)"/>')
o.append('<circle cx="1460" cy="90" r="48" fill="#ffd77a"/>')
for cx, cy, s in [(150, 90, 0.9), (1000, 70, 1.0), (1250, 160, 0.75)]:
    o.append(f'<g transform="translate({cx},{cy}) scale({s})" fill="#ffffff">'
             '<ellipse cx="0" cy="0" rx="60" ry="22"/><ellipse cx="40" cy="-14" rx="40" ry="24"/>'
             '<ellipse cx="-38" cy="-8" rx="32" ry="18"/></g>')
for bx, by in [(880, 110), (910, 95), (940, 120)]:
    o.append(f'<path d="M{bx - 10},{by} q5,-7 10,0 q5,-7 10,0" fill="none" stroke="#4a5a6a" stroke-width="2"/>')

# sea
o.append(f'<rect y="{SEA}" width="{W}" height="{H - SEA}" fill="url(#sea)"/>')

# ---- underwater ice (the hidden mass) ----
under = [(190, SEA), (150, 400), (168, 470), (122, 560), (140, 665), (195, 742), (300, 784),
         (500, 795), (720, 790), (900, 762), (990, 700), (1012, 610), (985, 540), (1045, 500),
         (1160, 478), (1235, 440), (1250, 385), (1232, SEA)]
pts = " ".join(f"{x},{y}" for x, y in under)
o.append(f'<polygon points="{pts}" fill="url(#under)" stroke="#d8f0fb" stroke-width="3" stroke-opacity="0.6"/>')
# faint strata lines in the deep ice
o.append('<clipPath id="ice"><polygon points="' + pts + '"/></clipPath>')
o.append('<g clip-path="url(#ice)" fill="none" stroke="#1b3354" stroke-opacity="0.35" stroke-width="3">')
for y in (480, 640, 740):
    o.append(f'<path d="M100,{y} q200,-18 400,0 t400,0 t400,0"/>')
o.append('</g>')
# light shimmer across the upper ice
o.append('<g clip-path="url(#ice)" fill="#ffffff" opacity="0.18">'
         '<polygon points="200,345 260,345 180,470 150,470"/><polygon points="900,345 940,345 870,430 840,430"/></g>')

# ---- fossils in the ice ----
fossil = 'stroke="#d6ecf8" stroke-width="3" fill="none"'
# closed doors (shared norms) in the clear upper ice
for i, dx in enumerate([235, 290, 345]):
    o.append(f'<rect x="{dx}" y="378" width="44" height="72" rx="3" fill="#7a5a3c" stroke="#4e3824" stroke-width="2.5"/>')
    o.append(f'<rect x="{dx + 6}" y="386" width="32" height="24" fill="none" stroke="#4e3824" stroke-width="1.5"/>')
    o.append(f'<rect x="{dx + 6}" y="416" width="32" height="26" fill="none" stroke="#4e3824" stroke-width="1.5"/>')
    o.append(f'<circle cx="{dx + 36}" cy="416" r="3.2" fill="#e8c35a"/>')
# lone desk in a small room ("a good teacher works alone")
o.append(f'<rect x="250" y="540" width="150" height="120" fill="#36557c" stroke="#d6ecf8" stroke-width="3"/>')
o.append('<rect x="372" y="580" width="22" height="80" fill="#2b4466" stroke="#d6ecf8" stroke-width="2"/>')  # closed door
o.append('<circle cx="377" cy="622" r="2.5" fill="#d6ecf8"/>')
o.append(f'<rect x="285" y="608" width="58" height="8" fill="#d6ecf8"/>'
         '<line x1="290" y1="616" x2="290" y2="652" stroke="#d6ecf8" stroke-width="4"/>'
         '<line x1="338" y1="616" x2="338" y2="652" stroke="#d6ecf8" stroke-width="4"/>')
o.append('<path d="M262,652 v-30 M262,630 h18 v22" stroke="#d6ecf8" stroke-width="4" fill="none"/>')  # chair
o.append('<circle cx="271" cy="597" r="7" fill="#d6ecf8"/><rect x="264" y="604" width="14" height="22" rx="5" fill="#d6ecf8"/>')  # seated figure
# clock fused into the ice ("learning takes a fixed time")
cx, cy, r = 560, 690, 44
for a in (20, 140, 250, 320):
    t = math.radians(a)
    x1, y1 = cx + (r + 4) * math.cos(t), cy + (r + 4) * math.sin(t)
    x2, y2 = cx + (r + 34) * math.cos(t + 0.15), cy + (r + 34) * math.sin(t + 0.15)
    o.append(f'<line x1="{x1:.0f}" y1="{y1:.0f}" x2="{x2:.0f}" y2="{y2:.0f}" stroke="#a9cbe4" stroke-width="2.5"/>')
o.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="#e9f4fb" stroke="#1b3354" stroke-width="6"/>')
for k in range(12):
    t = math.radians(k * 30)
    o.append(f'<line x1="{cx + 34 * math.cos(t):.1f}" y1="{cy + 34 * math.sin(t):.1f}" '
             f'x2="{cx + 40 * math.cos(t):.1f}" y2="{cy + 40 * math.sin(t):.1f}" stroke="#1b3354" stroke-width="3"/>')
o.append(f'<line x1="{cx}" y1="{cy}" x2="{cx}" y2="{cy - 28}" stroke="#1b3354" stroke-width="5" stroke-linecap="round"/>')
o.append(f'<line x1="{cx}" y1="{cy}" x2="{cx + 20}" y2="{cy + 8}" stroke="#1b3354" stroke-width="6" stroke-linecap="round"/>')
o.append(f'<circle cx="{cx}" cy="{cy}" r="4" fill="#c0392b"/>')
# rows of desks facing front (grammar of schooling), plan view
o.append('<rect x="660" y="478" width="230" height="160" rx="4" fill="#33507a" stroke="#d6ecf8" stroke-width="3"/>')
o.append('<rect x="700" y="486" width="150" height="10" fill="#1d3a2e" stroke="#d6ecf8" stroke-width="1.5"/>')  # board
o.append('<rect x="752" y="504" width="46" height="14" fill="#d6ecf8"/>')  # teacher desk
for row in range(3):
    for col in range(5):
        x = 678 + col * 42
        y = 534 + row * 34
        o.append(f'<rect x="{x}" y="{y}" width="30" height="12" fill="#d6ecf8"/>'
                 f'<circle cx="{x + 15}" cy="{y + 20}" r="5" fill="#a9cbe4"/>')

# ---- diver with a lamp (culture assessment) ----
o.append('<polygon points="1092,640 1000,585 990,700" fill="url(#beam)"/>')
o.append('<g transform="translate(1125,640) rotate(-12)">'
         '<rect x="-4" y="-14" width="58" height="22" rx="10" fill="#f39c12"/>'          # body (suit)
         '<rect x="10" y="-26" width="30" height="12" rx="5" fill="#7f8c8d"/>'           # air tank
         '<line x1="52" y1="-6" x2="78" y2="-14" stroke="#f39c12" stroke-width="8" stroke-linecap="round"/>'
         '<line x1="52" y1="4" x2="80" y2="10" stroke="#f39c12" stroke-width="8" stroke-linecap="round"/>'
         '<polygon points="78,-20 96,-26 92,-8" fill="#2c3e50"/><polygon points="80,4 98,6 90,20" fill="#2c3e50"/>'
         '<circle cx="-14" cy="-4" r="13" fill="#f2c9a0"/>'
         '<rect x="-27" y="-11" width="16" height="10" rx="3" fill="#85c1e9" stroke="#2c3e50" stroke-width="2"/>'
         '<line x1="0" y1="2" x2="-26" y2="14" stroke="#f39c12" stroke-width="7" stroke-linecap="round"/>'
         '<rect x="-38" y="8" width="16" height="12" rx="3" fill="#f1c40f" stroke="#7d6608" stroke-width="2"/>'
         '</g>')
for bx, by, br in [(1100, 610, 4), (1094, 592, 3), (1102, 575, 5)]:
    o.append(f'<circle cx="{bx}" cy="{by}" r="{br}" fill="none" stroke="#d6f0ff" stroke-width="2"/>')

# ---- above-water tip ----
tip = [(195, SEA), (240, 296), (300, 263), (410, 262), (432, 222), (455, 166), (600, 166),
       (615, 216), (722, 216), (737, 276), (860, 276), (905, SEA)]
o.append('<polygon points="' + " ".join(f"{x},{y}" for x, y in tip) +
         '" fill="url(#tip)" stroke="#9ccbe6" stroke-width="3"/>')
o.append('<polygon points="455,166 500,166 440,262 410,262 432,222" fill="#e6f4fb" opacity="0.8"/>')

# school building with bell tower on the peak
o.append('<rect x="470" y="105" width="115" height="61" fill="#c0504d" stroke="#7b2e2c" stroke-width="2"/>')
o.append('<polygon points="462,107 527,78 593,107" fill="#7b2e2c"/>')
o.append('<rect x="512" y="56" width="30" height="34" fill="#e8d9b5" stroke="#7b2e2c" stroke-width="2"/>')
o.append('<polygon points="506,58 527,32 548,58" fill="#5d6d7e"/>')
o.append('<path d="M520,80 q7,-16 14,0 z" fill="#d4a017"/>')  # bell
o.append('<rect x="516" y="132" width="22" height="34" fill="#5b3a1e"/>')  # door
for wx in (480, 553):
    for wy in (115, 140):
        o.append(f'<rect x="{wx}" y="{wy}" width="22" height="16" fill="#fdf2c4" stroke="#7b2e2c" stroke-width="1.5"/>')
o.append('<line x1="575" y1="105" x2="575" y2="70" stroke="#555" stroke-width="2"/>'
         '<polygon points="575,70 598,76 575,82" fill="#2e86c1"/>')

# schedule / timetable grid on posts (left ledge)
o.append('<line x1="332" y1="262" x2="332" y2="236" stroke="#6b4423" stroke-width="4"/>'
         '<line x1="388" y1="262" x2="388" y2="236" stroke="#6b4423" stroke-width="4"/>')
o.append('<rect x="318" y="192" width="84" height="48" fill="#ffffff" stroke="#34495e" stroke-width="2.5"/>')
colors = ["#f5b041", "#5dade2", "#58d68d", "#ec7063", "#af7ac5"]
for r_ in range(4):
    for c_ in range(5):
        o.append(f'<rect x="{321 + c_ * 16}" y="{195 + r_ * 11}" width="14" height="9" '
                 f'fill="{colors[(r_ + c_) % 5]}"/>')

# trophy case (right ledge)
o.append('<rect x="636" y="160" width="70" height="56" fill="#8e5b34" stroke="#5b3a1e" stroke-width="2"/>')
o.append('<rect x="642" y="165" width="58" height="46" fill="#d6eaf8" opacity="0.9"/>')
o.append('<line x1="642" y1="189" x2="700" y2="189" stroke="#8e5b34" stroke-width="3"/>')
for tx, ty in [(652, 186), (671, 186), (690, 186), (661, 209), (681, 209)]:
    o.append(f'<path d="M{tx - 5},{ty - 14} h10 q0,9 -5,10 q-5,-1 -5,-10 z" fill="#f1c40f"/>'
             f'<rect x="{tx - 1.5}" y="{ty - 4}" width="3" height="2" fill="#b7950b"/>'
             f'<rect x="{tx - 4}" y="{ty - 2}" width="8" height="2" fill="#b7950b"/>')

# pep-rally crowd (ritual) on the lower right ledge
def fan(x, color, arms_up=True, pom=None):
    g = (f'<g transform="translate({x},276) scale(1.25)">'
         f'<rect x="-6" y="-30" width="12" height="22" rx="5" fill="{color}"/>'
         '<rect x="-5" y="-10" width="4" height="10" fill="#3b3b3b"/>'
         '<rect x="1" y="-10" width="4" height="10" fill="#3b3b3b"/>'
         '<circle cx="0" cy="-37" r="7" fill="#f2c9a0"/>')
    if arms_up:
        g += (f'<line x1="-5" y1="-27" x2="-12" y2="-44" stroke="{color}" stroke-width="4"/>'
              f'<line x1="5" y1="-27" x2="12" y2="-44" stroke="{color}" stroke-width="4"/>')
        if pom:
            g += f'<circle cx="-12" cy="-46" r="5" fill="{pom}"/><circle cx="12" cy="-46" r="5" fill="{pom}"/>'
    g += '</g>'
    return g
o.append(fan(752, "#2e86c1", True, "#f1c40f"))
o.append(fan(776, "#c0392b"))
o.append(fan(800, "#2e86c1", True, "#f1c40f"))
o.append(fan(824, "#c0392b"))
o.append(fan(848, "#2e86c1", True, "#f1c40f"))
o.append('<line x1="776" y1="240" x2="790" y2="214" stroke="#555" stroke-width="2"/>'
         '<polygon points="790,214 812,222 794,232" fill="#f1c40f"/>')  # pennant
o.append('<line x1="824" y1="240" x2="836" y2="214" stroke="#555" stroke-width="2"/>'
         '<polygon points="836,214 858,222 840,232" fill="#c0392b"/>')

# ---- waterline: espoused values ----
# framed mission statement with blank lines
o.append('<rect x="400" y="290" width="80" height="76" fill="#6e4b2a" stroke="#4e3824" stroke-width="2"/>')
o.append('<rect x="408" y="298" width="64" height="60" fill="#fffaf0"/>')
for ly in (308, 320, 332, 344):
    o.append(f'<line x1="415" y1="{ly}" x2="{465 if ly != 344 else 445}" y2="{ly}" stroke="#9aa7b4" stroke-width="3"/>')
o.append('<circle cx="458" cy="346" r="6" fill="#c0392b"/>')  # seal
# blank banner between two poles
o.append('<line x1="556" y1="345" x2="556" y2="282" stroke="#6b4423" stroke-width="5"/>'
         '<line x1="724" y1="345" x2="724" y2="282" stroke="#6b4423" stroke-width="5"/>')
o.append('<path d="M556,288 L724,288 L724,318 Q640,330 556,318 Z" fill="#2e86c1" stroke="#1b4f72" stroke-width="2"/>')
o.append('<path d="M566,294 L714,294" stroke="#ffffff" stroke-width="2" opacity="0.6"/>')

# waterline wave band drawn over the base of the tip and the frame
o.append(f'<rect x="0" y="{SEA}" width="{W}" height="16" fill="#7fc3ea" opacity="0.45"/>')
waves = " ".join(f"q10,-6 20,0 q10,6 20,0" for _ in range(40))
o.append(f'<path d="M0,{SEA} {waves}" fill="none" stroke="#ffffff" stroke-width="2.5" opacity="0.8"/>')

# ---- reform boat steering at the tip ----
o.append('<path d="M1420,322 q30,-4 60,4 q30,-4 60,2" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.8"/>')
o.append('<g transform="translate(1335,322)">'
         '<path d="M-70,-14 L70,-14 L56,10 L-56,10 Z" fill="#d35400" stroke="#873600" stroke-width="2"/>'
         '<polygon points="-70,-14 -88,-20 -74,-4" fill="#d35400"/>'
         '<rect x="-20" y="-44" width="52" height="30" fill="#fdfefe" stroke="#7f8c8d" stroke-width="2"/>'
         '<rect x="-12" y="-38" width="12" height="10" fill="#85c1e9"/><rect x="8" y="-38" width="12" height="10" fill="#85c1e9"/>'
         '<rect x="10" y="-66" width="12" height="22" fill="#566573"/>'
         '<circle cx="-40" cy="-30" r="7" fill="#f2c9a0"/><rect x="-46" y="-24" width="12" height="12" rx="4" fill="#1f618d"/>'
         '<line x1="-40" y1="-18" x2="-56" y2="-26" stroke="#1f618d" stroke-width="3"/>'
         '</g>')
o.append('<circle cx="1351" cy="270" r="7" fill="#d5dbdb" opacity="0.8"/><circle cx="1362" cy="256" r="9" fill="#d5dbdb" opacity="0.6"/>')
# dotted course line toward the tip
o.append('<path d="M1240,318 L930,318" stroke="#1b4f72" stroke-width="3" stroke-dasharray="6 9" opacity="0.7"/>')

o.append('</svg>')
open(sys.argv[1], "w").write("\n".join(o))

for name, (x, y) in ANCHORS.items():
    print(f"{name:38s} x={x / W * 100:5.1f}%  y={y / H * 100:5.1f}%")
