"""Generate a text-free SVG for the "What a Textbook Costs per Student" grid poster.

Four stacks of cost blocks stand on a table: a print textbook baseline and the
Level 2, Level 3 and Level 4 digital textbooks. Every block height is
proportional to its cost per student per year in the comparison table of
Chapter 7 ("Putting a Cost on Each Level"). All figures are illustrative.

A large faded laptop stands BEHIND the three digital stacks. It is not part of
any stack: it is the device a school may have to buy. Its height, measured from
the table top, is drawn on the same scale as the blocks ($75 a year).

No text, letters or digits anywhere in the image. Zone chips come from data.json.
Run: python3 make-cost-stacks-svg.py textbook-cost-per-student.svg
"""
import sys

W, H = 1600, 800
TABLE_Y = 700                    # table top: every stack and the laptop stand here
DEVICE = 75.00                   # $300 laptop over four years
PX = (TABLE_Y - 110) / DEVICE    # pixels per dollar: the $75 device reaches y = 110

# One color per cost item, the same in every column.
COLORS = {
    "content":  ("#4a7fc1", "#3a679f"),   # content and hosting
    "records":  ("#7b5cc4", "#6247a3"),   # records platform (learning record store)
    "privacy":  ("#3e9e6b", "#2f7d54"),   # privacy governance
    "logs":     ("#d9534f", "#b03e3a"),   # guardrail log review
    "training": ("#e8b33a", "#c39226"),   # teacher training
    "infer":    ("#f28c28", "#d0711a"),   # AI inference (glowing, chat bubble)
}

# Illustrative cost per student per year (Chapter 7 table), bottom to top.
PRINT = [("content", 80 / 6 * 4)]                       # about $53.33
LEVEL2 = [("content", 1.80), ("training", 4.00)]          # $5.80
LEVEL3 = [("content", 1.80), ("records", 3.00), ("privacy", 2.00),
          ("training", 6.00)]                             # $12.80
LEVEL4 = [("content", 1.80), ("records", 3.00), ("privacy", 2.00),
          ("logs", 1.00), ("training", 8.00), ("infer", 3.6 * 2.00)]  # $23.00

COL_CX = [215, 605, 995, 1385]   # stack centers
BW = 230                         # stack width
DEPTH = 18                       # 3-D top face offset

out = []
add = out.append
add(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">')
add('''<defs>
<linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7f2e8"/><stop offset="1" stop-color="#efe6d6"/></linearGradient>
<linearGradient id="wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfa77b"/><stop offset="1" stop-color="#b98d60"/></linearGradient>
<linearGradient id="screen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e3ecf5"/><stop offset="1" stop-color="#c9d6e4"/></linearGradient>
<filter id="glow" x="-40%" y="-80%" width="180%" height="260%"><feGaussianBlur stdDeviation="9" result="b"/>
<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>''')
add(f'<rect width="{W}" height="{H}" fill="url(#wall)"/>')
# faint wainscot line on the wall
add(f'<rect x="0" y="{TABLE_Y - 40}" width="{W}" height="40" fill="#e9dfcc"/>')

# ---- faded laptop behind the digital stacks (not stacked) ----
LX1, LX2 = 470, 1540
SCREEN_TOP = TABLE_Y - DEVICE * PX          # = 110
BASE_TOP = TABLE_Y - 48
add('<g opacity="0.38">')
add(f'<rect x="{LX1}" y="{SCREEN_TOP:.1f}" width="{LX2 - LX1}" height="{BASE_TOP - SCREEN_TOP:.1f}" rx="26" fill="#5d6b7a"/>')
add(f'<rect x="{LX1 + 26}" y="{SCREEN_TOP + 26:.1f}" width="{LX2 - LX1 - 52}" height="{BASE_TOP - SCREEN_TOP - 52:.1f}" rx="8" fill="url(#screen)"/>')
add(f'<circle cx="{(LX1 + LX2) / 2}" cy="{SCREEN_TOP + 13:.1f}" r="5" fill="#2e3742"/>')   # camera
# keyboard base (a shallow trapezoid on the table)
add(f'<polygon points="{LX1 - 40},{TABLE_Y} {LX2 + 40},{TABLE_Y} {LX2},{BASE_TOP} {LX1},{BASE_TOP}" fill="#7d8a98"/>')
for r in range(3):
    ky = BASE_TOP + 9 + r * 12
    inset = 18 - r * 10
    x = LX1 + inset
    while x < LX2 - inset - 30:
        add(f'<rect x="{x:.0f}" y="{ky:.0f}" width="26" height="8" rx="2" fill="#4c5763"/>')
        x += 34
add('</g>')

# ---- table ----
add(f'<rect x="0" y="{TABLE_Y}" width="{W}" height="22" fill="url(#wood)"/>')
add(f'<rect x="0" y="{TABLE_Y + 22}" width="{W}" height="78" fill="#a8794c"/>')
add(f'<rect x="0" y="{TABLE_Y + 22}" width="{W}" height="5" fill="#8f6640"/>')


def stack(cx, items, books=False):
    """Draw one stack of blocks standing on the table; return its top y."""
    x = cx - BW / 2
    y = TABLE_Y
    add(f'<ellipse cx="{cx + 8}" cy="{TABLE_Y + 6}" rx="{BW / 2 + 22}" ry="9" fill="#7a5532" opacity="0.35"/>')
    for key, dollars in items:
        h = dollars * PX
        face, side = COLORS[key]
        top = y - h
        # right-hand side face for depth
        add(f'<polygon points="{x + BW},{y} {x + BW + DEPTH},{y - DEPTH * 0.6} '
            f'{x + BW + DEPTH},{top - DEPTH * 0.6} {x + BW},{top}" fill="{side}"/>')
        if key == "infer":
            add(f'<rect x="{x}" y="{top:.2f}" width="{BW}" height="{h:.2f}" fill="{face}" filter="url(#glow)"/>')
        else:
            add(f'<rect x="{x}" y="{top:.2f}" width="{BW}" height="{h:.2f}" fill="{face}"/>')
        if books:
            # print stack: a pile of closed textbooks, cream page edges on the front
            n = 8
            bh = h / n
            for i in range(n):
                by = top + i * bh
                add(f'<rect x="{x}" y="{by:.2f}" width="{BW}" height="{bh:.2f}" fill="{face if i % 2 == 0 else "#558bcc"}"/>')
                add(f'<rect x="{x + 14}" y="{by + bh * 0.22:.2f}" width="{BW - 14}" height="{bh * 0.56:.2f}" fill="#f6efdc"/>')
                for k in range(1, 4):
                    ly = by + bh * 0.22 + bh * 0.56 * k / 4
                    add(f'<line x1="{x + 18}" y1="{ly:.2f}" x2="{x + BW}" y2="{ly:.2f}" stroke="#d9cfb6" stroke-width="1.2"/>')
        else:
            # coin-like ridges on the front face
            for k in range(1, int(h // 12) + 1):
                ry = y - k * 12
                if ry > top + 3:
                    add(f'<line x1="{x}" y1="{ry:.2f}" x2="{x + BW}" y2="{ry:.2f}" stroke="#ffffff" stroke-opacity="0.18" stroke-width="1.5"/>')
        if key == "infer":
            # a chat bubble with three dots on the glowing block (no text)
            bx, byc = cx, top + h / 2
            add(f'<g transform="translate({bx},{byc:.1f})">'
                f'<rect x="-46" y="-20" width="92" height="36" rx="16" fill="#ffffff"/>'
                f'<polygon points="-24,14 -34,26 -10,15" fill="#ffffff"/>'
                f'<circle cx="-22" cy="-2" r="6" fill="{side}"/><circle cx="0" cy="-2" r="6" fill="{side}"/>'
                f'<circle cx="22" cy="-2" r="6" fill="{side}"/></g>')
        # seam line between blocks
        add(f'<line x1="{x}" y1="{top:.2f}" x2="{x + BW}" y2="{top:.2f}" stroke="#ffffff" stroke-width="1.5" stroke-opacity="0.9"/>')
        y = top
    # top face of the whole stack
    face = COLORS[items[-1][0]][0]
    add(f'<polygon points="{x},{y:.2f} {x + BW},{y:.2f} {x + BW + DEPTH},{y - DEPTH * 0.6:.2f} '
        f'{x + DEPTH},{y - DEPTH * 0.6:.2f}" fill="{face}" opacity="0.75"/>')
    add(f'<polygon points="{x},{y:.2f} {x + BW},{y:.2f} {x + BW + DEPTH},{y - DEPTH * 0.6:.2f} '
        f'{x + DEPTH},{y - DEPTH * 0.6:.2f}" fill="#ffffff" opacity="0.35"/>')
    return y


tops = []
for cx, items, books in [(COL_CX[0], PRINT, True), (COL_CX[1], LEVEL2, False),
                         (COL_CX[2], LEVEL3, False), (COL_CX[3], LEVEL4, False)]:
    tops.append(stack(cx, items, books))

add('</svg>')
with open(sys.argv[1] if len(sys.argv) > 1 else "textbook-cost-per-student.svg", "w") as f:
    f.write("\n".join(out))

# ---- report scale and zone geometry from the real coordinates ----
print(f"scale: {PX:.4f} px per dollar; device top y={SCREEN_TOP:.1f} ({SCREEN_TOP / H * 100:.1f}%)")
for name, items, top in zip(["print", "level-2", "level-3", "level-4"],
                            [PRINT, LEVEL2, LEVEL3, LEVEL4], tops):
    total = sum(d for _, d in items)
    print(f"{name:8s} total ${total:6.2f}  height {TABLE_Y - top:6.1f}px  top y={top:.1f} ({top / H * 100:.1f}%)")
for cx in COL_CX:
    print(f"stack x {cx - BW / 2:.0f}-{cx + BW / 2 + DEPTH:.0f}  ({(cx - BW / 2) / W * 100:.1f}% - {(cx + BW / 2 + DEPTH) / W * 100:.1f}%)")
print(f"laptop x {LX1}-{LX2} ({LX1 / W * 100:.1f}% - {LX2 / W * 100:.1f}%), table top {TABLE_Y / H * 100:.1f}%")
