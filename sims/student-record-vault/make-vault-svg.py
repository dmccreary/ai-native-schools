"""Generate a text-free SVG of the Student Record Vault for the callout overlay.

A student's record glows as a folder at the centre of a round vault. Four
concentric walls, each with a gate, decide who may come close: the student and
family (inner), the teacher and school, the district, and the vendors and
researchers (outer). Around the walls: a funnel at the main gate (data
minimization), a small under-13 gate with a height post (COPPA), a gate flying a
ring-of-stars flag (GDPR), a shredder (retention), a crack with papers blowing
out (a breach), a balance scale on a desk (bias auditing), a boarded-up
warehouse (inBloom) and a parent and a school leader at the path (the trust
paradox). No text anywhere.

Run: python3 make-vault-svg.py student-record-vault.svg
"""
import math, sys

W, H = 1600, 800
CX, CY = 800, 410          # centre of the vault
K = 0.62                   # ellipse squash (ry = K * rx) for a 3/4 view
RINGS = [150, 265, 390, 520]  # wall radii (rx), inner to outer
WALL_H = 16                # visible wall height

def ept(angle_deg, rx):
    a = math.radians(angle_deg)
    return CX + rx * math.cos(a), CY + K * rx * math.sin(a)

def pts(p):
    return " ".join(f"{x:.0f},{y:.0f}" for x, y in p)

def person(x, y, color, scale=1.25, extra="", hair="#3b2a1e", skin="#f2c9a0", legs="#3b3b3b"):
    """Standing figure whose feet sit at (x, y)."""
    return (f'<g transform="translate({x:.1f},{y:.1f}) scale({scale})">'
            f'<rect x="-5" y="-10" width="4" height="10" fill="{legs}"/>'
            f'<rect x="1" y="-10" width="4" height="10" fill="{legs}"/>'
            f'<rect x="-7" y="-31" width="14" height="23" rx="6" fill="{color}"/>'
            f'<circle cx="0" cy="-38" r="7" fill="{skin}"/>'
            f'<path d="M-7,-39 Q0,-50 7,-39 Q4,-43 0,-43 Q-4,-43 -7,-39 Z" fill="{hair}"/>{extra}</g>')

def child(x, y, color, extra=""):
    return person(x, y, color, scale=0.9, extra=extra)

def gate(x, y, s=1.0, bar="#34495e", pillar="#7d7f8c", top=""):
    """An upright gate: two stone pillars and an arched iron gate, base at (x, y)."""
    g = [f'<g transform="translate({x:.1f},{y:.1f}) scale({s})">']
    g.append('<path d="M-22,0 L-22,-38 Q0,-62 22,-38 L22,0 Z" fill="#2f3a45" opacity="0.18"/>')
    for bx in range(-18, 20, 6):
        h = 38 + 22 * (1 - (bx / 22) ** 2) * 0.9
        g.append(f'<line x1="{bx}" y1="0" x2="{bx}" y2="{-h:.0f}" stroke="{bar}" stroke-width="2.6"/>')
    g.append(f'<path d="M-22,-38 Q0,-62 22,-38" fill="none" stroke="{bar}" stroke-width="3.5"/>')
    g.append(f'<line x1="-22" y1="-20" x2="22" y2="-20" stroke="{bar}" stroke-width="2.5"/>')
    for px in (-30, 30):
        g.append(f'<rect x="{px - 8}" y="-50" width="16" height="50" fill="{pillar}" stroke="#555763" stroke-width="2"/>')
        g.append(f'<rect x="{px - 10}" y="-56" width="20" height="8" rx="2" fill="#a2a4b0" stroke="#555763" stroke-width="2"/>')
    g.append(top)
    g.append('</g>')
    return "".join(g)

def paper(x, y, rot, s=1.0):
    return (f'<g transform="translate({x:.0f},{y:.0f}) rotate({rot}) scale({s})">'
            '<rect x="-11" y="-14" width="22" height="28" fill="#ffffff" stroke="#9aa3ad" stroke-width="1.5"/>'
            '<line x1="-6" y1="-7" x2="6" y2="-7" stroke="#b9c2cc" stroke-width="2"/>'
            '<line x1="-6" y1="-1" x2="6" y2="-1" stroke="#b9c2cc" stroke-width="2"/>'
            '<line x1="-6" y1="5" x2="3" y2="5" stroke="#b9c2cc" stroke-width="2"/></g>')

out = []
out.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">')
out.append('''<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe6f6"/><stop offset="1" stop-color="#eef6fb"/></linearGradient>
<linearGradient id="grass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9d99a"/><stop offset="1" stop-color="#93c070"/></linearGradient>
<radialGradient id="glow"><stop offset="0" stop-color="#fff6b0" stop-opacity="1"/><stop offset="0.55" stop-color="#ffe066" stop-opacity="0.65"/><stop offset="1" stop-color="#ffe066" stop-opacity="0"/></radialGradient>
<linearGradient id="crack" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2b2d36"/><stop offset="1" stop-color="#4a4d5a"/></linearGradient>
</defs>''')

# sky and ground
out.append(f'<rect width="{W}" height="{H}" fill="url(#grass)"/>')
out.append(f'<path d="M0,0 H{W} V70 Q1200,58 800,66 Q400,74 0,62 Z" fill="url(#sky)"/>')
out.append('<circle cx="1490" cy="34" r="24" fill="#ffd77a"/>')
for cx, cy, s in [(560, 30, 0.6), (1080, 26, 0.5)]:
    out.append(f'<g transform="translate({cx},{cy}) scale({s})" fill="#ffffff">'
               '<ellipse cx="0" cy="0" rx="60" ry="18"/><ellipse cx="38" cy="-10" rx="36" ry="18"/>'
               '<ellipse cx="-36" cy="-6" rx="30" ry="14"/></g>')
# grass tufts
for gx, gy in [(60, 420), (120, 330), (1380, 140), (1500, 260), (1540, 420), (380, 760), (1180, 770),
               (1350, 360), (60, 760), (1560, 560), (250, 300)]:
    out.append(f'<path d="M{gx - 8},{gy} L{gx - 3},{gy - 12} L{gx},{gy} L{gx + 4},{gy - 14} L{gx + 8},{gy}" '
               'fill="none" stroke="#6f9f4f" stroke-width="2.5" stroke-linecap="round"/>')
# a few trees on the right edge
for tx, ty in [(1440, 200), (1530, 320), (1560, 150), (1385, 790)]:
    out.append(f'<g transform="translate({tx},{ty})"><rect x="-5" y="-16" width="10" height="16" fill="#6b4423"/>'
               '<circle cx="0" cy="-34" r="22" fill="#4f8f45"/><circle cx="-12" cy="-26" r="14" fill="#5c9e50"/></g>')

# the path from the left edge to the main gate
mg = ept(180, RINGS[3])
out.append(f'<path d="M0,520 Q140,470 {mg[0] - 10:.0f},{mg[1] + 8:.0f}" fill="none" stroke="#d9c39a" stroke-width="34" stroke-linecap="round"/>')
out.append(f'<path d="M0,520 Q140,470 {mg[0] - 10:.0f},{mg[1] + 8:.0f}" fill="none" stroke="#e8d7b2" stroke-width="22" stroke-linecap="round"/>')

# ring floors (outer to inner), then walls
FLOORS = ["#e3dcf0", "#d6ead0", "#d4e5f3", "#fbefc6"]  # vendors, district, school, family
for rx, col in zip(RINGS[::-1], FLOORS):
    out.append(f'<ellipse cx="{CX}" cy="{CY}" rx="{rx}" ry="{K * rx:.1f}" fill="{col}"/>')

def wall(rx, gaps):
    """Draw an elliptical wall as short segments, skipping the gate gaps (angle ranges)."""
    segs = []
    step = 2
    a = 0
    while a < 360:
        mid = a + step / 2
        if not any(g0 <= mid <= g1 for g0, g1 in gaps):
            p0, p1 = ept(a, rx), ept(a + step, rx)
            segs.append((p0, p1))
        a += step
    s = []
    for (x0, y0), (x1, y1) in segs:  # wall face (front-facing darker band)
        s.append(f'<polygon points="{x0:.1f},{y0:.1f} {x1:.1f},{y1:.1f} {x1:.1f},{y1 + WALL_H:.1f} {x0:.1f},{y0 + WALL_H:.1f}" '
                 'fill="#8a8c98" stroke="#8a8c98" stroke-width="0.8"/>')
    for (x0, y0), (x1, y1) in segs:  # wall top
        s.append(f'<line x1="{x0:.1f}" y1="{y0:.1f}" x2="{x1:.1f}" y2="{y1:.1f}" stroke="#b9bbc6" stroke-width="9" stroke-linecap="round"/>')
    return "".join(s)

GATE_ANGLES = {
    0: [(84, 96)],                     # family gate (bottom of the inner wall)
    1: [(264, 276)],                   # school gate, FERPA (top)
    2: [(54, 66)],                     # district gate (lower right)
    3: [(174, 186), (125, 135), (325, 335), (8, 22)],  # main, COPPA, GDPR gates, and the breach gap
}
# draw walls from the back (top) toward the front: outer first is fine, inner floors already painted
for i in (3, 2, 1, 0):
    out.append(wall(RINGS[i], GATE_ANGLES[i]))

# ---------- centre: the glowing record ----------
fx, fy = CX, CY - 6
out.append(f'<ellipse cx="{fx}" cy="{fy}" rx="78" ry="62" fill="url(#glow)"/>')
out.append(f'<g transform="translate({fx},{fy})">'
           '<path d="M-38,-22 L-38,28 L38,28 L38,-22 Z" fill="#e8b84f" stroke="#a87a1f" stroke-width="2.5"/>'
           '<rect x="-30" y="-34" width="52" height="40" fill="#ffffff" stroke="#9aa3ad" stroke-width="1.5" transform="rotate(-6)"/>'
           '<rect x="-24" y="-30" width="52" height="40" fill="#fbfbfb" stroke="#9aa3ad" stroke-width="1.5" transform="rotate(4)"/>'
           '<path d="M-38,-22 L-38,-30 L-12,-30 L-6,-22 Z" fill="#e8b84f" stroke="#a87a1f" stroke-width="2.5"/>'
           '<path d="M-40,-8 L40,-8 L36,30 L-36,30 Z" fill="#f3c862" stroke="#a87a1f" stroke-width="2.5"/>'
           # identity card clipped to the front: photo silhouette and lines
           '<rect x="4" y="-2" width="30" height="22" rx="3" fill="#ffffff" stroke="#5d6d7e" stroke-width="2"/>'
           '<circle cx="12" cy="6" r="4" fill="#7f8c8d"/><path d="M6,16 Q12,8 18,16 Z" fill="#7f8c8d"/>'
           '<line x1="21" y1="5" x2="31" y2="5" stroke="#7f8c8d" stroke-width="2"/>'
           '<line x1="21" y1="11" x2="31" y2="11" stroke="#7f8c8d" stroke-width="2"/>'
           '<rect x="14" y="-6" width="10" height="7" rx="2" fill="#95a5a6"/></g>')

# ---------- inner ring: family with a key (left), student with laptop (right) ----------
famx, famy = CX - 88, CY + 52
key_arm = ('<line x1="6" y1="-26" x2="18" y2="-34" stroke="#c0392b" stroke-width="4" stroke-linecap="round"/>'
           '<g transform="translate(20,-36) rotate(-30)"><circle cx="0" cy="0" r="6" fill="none" stroke="#d4a017" stroke-width="3.5"/>'
           '<line x1="6" y1="0" x2="26" y2="0" stroke="#d4a017" stroke-width="3.5"/>'
           '<line x1="20" y1="0" x2="20" y2="6" stroke="#d4a017" stroke-width="3"/><line x1="25" y1="0" x2="25" y2="6" stroke="#d4a017" stroke-width="3"/></g>')
out.append(person(famx - 22, famy, "#16a085", hair="#1f1f1f"))
out.append(person(famx + 4, famy + 4, "#c0392b", extra=key_arm, hair="#7b4a24"))

stx, sty = CX + 86, CY + 56
laptop = ('<g transform="translate(10,-24)"><rect x="-2" y="-14" width="22" height="14" rx="2" fill="#2c3e50"/>'
          '<rect x="0" y="-12" width="18" height="10" fill="#5dade2"/>'
          '<rect x="-4" y="0" width="26" height="4" rx="1" fill="#566573"/></g>'
          '<line x1="5" y1="-24" x2="10" y2="-22" stroke="#f2c9a0" stroke-width="3"/>')
out.append(child(stx, sty, "#f39c12", extra=laptop))
# clickstream: small dots and cursor arrows flowing from the laptop to the folder
for k, (dx, dy) in enumerate([(-6, -52), (-18, -62), (-30, -70), (-42, -74), (-54, -76)]):
    out.append(f'<circle cx="{stx + dx}" cy="{sty + dy}" r="{3.5 - k * 0.3:.1f}" fill="#2e86c1" opacity="{0.95 - k * 0.12:.2f}"/>')
for dx, dy in [(-12, -84), (-40, -90)]:
    x, y = stx + dx, sty + dy
    out.append(f'<path d="M{x},{y} L{x},{y + 12} L{x + 3},{y + 9} L{x + 6},{y + 14} L{x + 8},{y + 13} L{x + 5},{y + 8} L{x + 9},{y + 8} Z" '
               'fill="#ffffff" stroke="#2c3e50" stroke-width="1.3"/>')

# inner (family) gate at the bottom of the inner wall
g0 = ept(90, RINGS[0])
out.append(gate(g0[0], g0[1] + WALL_H, 0.7))

# ---------- school ring: FERPA gate at the top with a bell, teacher beside it ----------
gf = ept(270, RINGS[1])
bell = ('<path d="M-8,-58 Q0,-78 8,-58 Z" fill="#d4a017" stroke="#8a6d0b" stroke-width="2"/>'
        '<circle cx="0" cy="-56" r="3" fill="#8a6d0b"/><line x1="0" y1="-78" x2="0" y2="-84" stroke="#555" stroke-width="2"/>')
out.append(gate(gf[0], gf[1] + WALL_H, 1.0, top=bell))
apple = ('<circle cx="10" cy="-24" r="5" fill="#e74c3c"/>'
         '<line x1="10" y1="-29" x2="12" y2="-33" stroke="#5a3d22" stroke-width="1.5"/>')
out.append(person(gf[0] + 70, gf[1] + 58, "#2e86c1", extra=apple))

# ---------- district ring: an office with an inventory clipboard (left) ----------
dx_, dy_ = ept(180, 328)
out.append(f'<g transform="translate({dx_ - 10:.0f},{dy_ + 26:.0f})">'
           '<rect x="-40" y="-50" width="80" height="50" fill="#f4ecd8" stroke="#7a6a4f" stroke-width="2"/>'
           '<polygon points="-48,-50 0,-76 48,-50" fill="#b55a3c" stroke="#7a3b26" stroke-width="2"/>'
           '<rect x="-30" y="-42" width="6" height="42" fill="#dcd1b6"/><rect x="-12" y="-42" width="6" height="42" fill="#dcd1b6"/>'
           '<rect x="6" y="-42" width="6" height="42" fill="#dcd1b6"/><rect x="24" y="-42" width="6" height="42" fill="#dcd1b6"/>'
           '<rect x="-8" y="-20" width="16" height="20" fill="#7a5a3a"/></g>')
clip = ('<rect x="6" y="-34" width="14" height="18" rx="1" fill="#f5f5f5" stroke="#7a5a3a" stroke-width="2"/>'
        '<line x1="9" y1="-28" x2="17" y2="-28" stroke="#95a5a6" stroke-width="1.5"/>'
        '<line x1="9" y1="-24" x2="17" y2="-24" stroke="#95a5a6" stroke-width="1.5"/>'
        '<line x1="9" y1="-20" x2="15" y2="-20" stroke="#95a5a6" stroke-width="1.5"/>')
out.append(person(dx_ + 52, dy_ + 34, "#8e44ad", extra=clip))

# district gate (lower right) and the shredder beside it
gd = ept(60, RINGS[2])
out.append(gate(gd[0], gd[1] + WALL_H, 0.9))
shx, shy = ept(80, 330)
shx -= 10
out.append(f'<g transform="translate({shx:.0f},{shy:.0f})">'
           '<rect x="-24" y="-8" width="48" height="34" rx="3" fill="#7f8c8d" stroke="#4d5656" stroke-width="2"/>'
           '<rect x="-28" y="-20" width="56" height="14" rx="3" fill="#566573" stroke="#2c3e50" stroke-width="2"/>'
           '<rect x="-18" y="-15" width="36" height="4" fill="#1c2833"/>'
           '<rect x="-10" y="-40" width="20" height="24" fill="#ffffff" stroke="#9aa3ad" stroke-width="1.5"/>'
           + "".join(f'<line x1="{sx}" y1="-6" x2="{sx + (2 if sx % 2 else -2)}" y2="12" stroke="#ffffff" stroke-width="2.5"/>'
                     for sx in range(-14, 16, 5)) +
           '<circle cx="16" cy="18" r="3" fill="#2ecc71"/></g>')

# ---------- outer ring: vendors and a researcher (upper right) ----------
vx, vy = ept(298, 455)
case = '<rect x="6" y="-16" width="14" height="11" rx="2" fill="#6e4b2a" stroke="#3e2a17" stroke-width="1.5"/>'
out.append(person(vx - 36, vy + 26, "#5d6d7e", extra=case, hair="#1f1f1f"))
out.append(person(vx - 6, vy + 30, "#34495e", extra=case, hair="#a0522d"))
lens = ('<line x1="6" y1="-26" x2="16" y2="-34" stroke="#ecf0f1" stroke-width="3"/>'
        '<circle cx="20" cy="-38" r="6" fill="#d6eaf8" stroke="#2c3e50" stroke-width="2.5"/>')
out.append(person(vx + 30, vy + 28, "#ecf0f1", extra=lens, hair="#7f7f7f"))
# a small server cabinet the vendors keep a copy in
out.append(f'<g transform="translate({vx + 76:.0f},{vy + 30:.0f})">'
           '<rect x="-14" y="-44" width="28" height="44" rx="2" fill="#2c3e50"/>'
           + "".join(f'<rect x="-10" y="{-40 + r * 10}" width="20" height="6" fill="#566573"/><circle cx="7" cy="{-37 + r * 10}" r="1.5" fill="#2ecc71"/>'
                     for r in range(4)) + '</g>')

# ---------- outer gates ----------
# main gate (left) with the data-minimization funnel outside it
out.append(gate(mg[0], mg[1] + WALL_H, 1.05))
fnx, fny = mg[0] - 64, mg[1] - 10
out.append(f'<g transform="translate({fnx:.0f},{fny:.0f})">'
           '<polygon points="-34,-38 34,-38 7,-4 7,14 -7,14 -7,-4" fill="#bdc3c7" stroke="#5d6d7e" stroke-width="2.5"/>'
           '<ellipse cx="0" cy="-38" rx="34" ry="8" fill="#95a5a6" stroke="#5d6d7e" stroke-width="2.5"/>'
           '<line x1="0" y1="14" x2="0" y2="30" stroke="#5d6d7e" stroke-width="3"/>'
           '<polygon points="-12,30 12,30 0,42" fill="#5d6d7e"/></g>')
for k, (px_, py_, rot) in enumerate([(-46, -64, -20), (-22, -72, 12), (6, -66, -8), (30, -74, 18),
                                      (-34, -88, 30), (-6, -94, -14), (22, -92, 6), (-20, -110, -25)]):
    out.append(paper(fnx + px_ * 0.9, fny + py_ * 0.9 + 4, rot, 0.75))
out.append(paper(fnx + 18, fny + 40, 6, 0.6))  # the one sheet that gets through
# a heap of unneeded sheets set aside on the grass
for px_, py_, rot in [(-100, 34, 10), (-86, 40, -14), (-112, 44, 30)]:
    out.append(paper(fnx + px_, fny + py_, rot, 0.6))

# COPPA gate: a small, low gate with a height post beside it
gc = ept(130, RINGS[3])
out.append(gate(gc[0], gc[1] + WALL_H, 0.62, bar="#c0392b"))
hpx, hpy = gc[0] + 32, gc[1] + WALL_H
out.append(f'<rect x="{hpx - 4:.0f}" y="{hpy - 62:.0f}" width="8" height="62" fill="#f7dc6f" stroke="#9a7d0a" stroke-width="2"/>')
for t in range(6):
    out.append(f'<line x1="{hpx - 4:.0f}" y1="{hpy - 8 - t * 10:.0f}" x2="{hpx + (4 if t % 2 else 1):.0f}" y2="{hpy - 8 - t * 10:.0f}" stroke="#7d6608" stroke-width="2"/>')
out.append(f'<rect x="{hpx - 2:.0f}" y="{hpy - 40:.0f}" width="22" height="5" rx="2" fill="#c0392b"/>')
out.append(child(gc[0] - 34, gc[1] + WALL_H + 6, "#e67e22"))

# GDPR gate (upper right) flying a blue flag with a ring of gold stars
gg = ept(330, RINGS[3])
stars = ""
for i in range(12):
    a = math.radians(i * 30)
    sx_, sy_ = 22 + 9 * math.cos(a), -84 + 9 * math.sin(a)
    stars += f'<circle cx="{sx_:.1f}" cy="{sy_:.1f}" r="1.6" fill="#ffd700"/>'
flag = ('<line x1="0" y1="-56" x2="0" y2="-100" stroke="#555" stroke-width="2.5"/>'
        '<rect x="2" y="-100" width="40" height="30" fill="#1f4fa8"/>' + stars)
out.append(gate(gg[0], gg[1] + WALL_H, 0.95, top=flag))

# ---------- the breach: a crack in the outer wall with papers blowing out ----------
bx, by = ept(15, RINGS[3])
out.append(f'<polygon points="{bx - 10:.0f},{by - 46:.0f} {bx + 6:.0f},{by - 30:.0f} {bx - 4:.0f},{by - 16:.0f} {bx + 10:.0f},{by:.0f} '
           f'{bx + 2:.0f},{by + 18:.0f} {bx + 14:.0f},{by + 34:.0f} {bx + 34:.0f},{by + 30:.0f} {bx + 22:.0f},{by + 12:.0f} '
           f'{bx + 30:.0f},{by - 4:.0f} {bx + 18:.0f},{by - 24:.0f} {bx + 26:.0f},{by - 44:.0f}" fill="url(#crack)"/>')
# broken wall stumps on either side of the gap
for sx_, sy_ in [(bx - 22, by - 34), (bx + 40, by + 30)]:
    out.append(f'<polygon points="{sx_ - 10:.0f},{sy_ + 10:.0f} {sx_ - 6:.0f},{sy_ - 14:.0f} {sx_ + 4:.0f},{sy_ - 6:.0f} {sx_ + 10:.0f},{sy_ - 18:.0f} {sx_ + 12:.0f},{sy_ + 10:.0f}" '
               'fill="#8a8c98" stroke="#5f616c" stroke-width="2"/>')
for rx_, ry_, r in [(bx + 52, by + 44, 7), (bx + 64, by + 36, 5), (bx + 46, by + 54, 5), (bx - 4, by + 44, 6)]:
    out.append(f'<ellipse cx="{rx_:.0f}" cy="{ry_:.0f}" rx="{r}" ry="{r * 0.7:.1f}" fill="#a2a4b0" stroke="#5f616c" stroke-width="1.5"/>')
for k, (dx, dy, rot, s) in enumerate([(40, -10, 20, 0.8), (78, -34, -25, 0.85), (112, -8, 40, 0.75),
                                       (146, -50, -10, 0.8), (182, -22, 30, 0.7), (60, 14, -35, 0.7)]):
    out.append(paper(bx + dx, by + dy, rot, s))
for k in range(3):  # wind lines
    out.append(f'<path d="M{bx + 40 + k * 30:.0f},{by - 66 + k * 18:.0f} q30,-10 60,0" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.85"/>')
# a stolen key lying by the gap (a single credential)
kx, ky = bx + 6, by + 64
out.append(f'<g transform="translate({kx:.0f},{ky:.0f}) rotate(-15)"><circle cx="0" cy="0" r="6" fill="none" stroke="#7f8c8d" stroke-width="3.5"/>'
           '<line x1="6" y1="0" x2="26" y2="0" stroke="#7f8c8d" stroke-width="3.5"/>'
           '<line x1="20" y1="0" x2="20" y2="6" stroke="#7f8c8d" stroke-width="3"/><line x1="25" y1="0" x2="25" y2="6" stroke="#7f8c8d" stroke-width="3"/></g>')

# ---------- bias audit: a desk with a tilted balance scale (lower right) ----------
dkx, dky = 1450, 700
out.append(f'<g transform="translate({dkx},{dky})">'
           '<rect x="-70" y="-30" width="140" height="12" rx="3" fill="#a0522d" stroke="#6e3b1f" stroke-width="2"/>'
           '<rect x="-62" y="-18" width="10" height="44" fill="#8b4513"/><rect x="52" y="-18" width="10" height="44" fill="#8b4513"/>'
           '<rect x="-14" y="-38" width="28" height="8" rx="2" fill="#7d6608"/>'
           '<line x1="0" y1="-38" x2="0" y2="-104" stroke="#9a7d0a" stroke-width="5"/>'
           '<g transform="translate(0,-104) rotate(-12)">'
           '<line x1="-52" y1="0" x2="52" y2="0" stroke="#9a7d0a" stroke-width="5" stroke-linecap="round"/>'
           '</g><circle cx="0" cy="-104" r="5" fill="#d4ac0d"/></g>')
# pans hang vertically from the tilted beam ends
a = math.radians(-12)
for side, blocks in ((-1, ["#3498db", "#3498db", "#3498db"]), (1, ["#e67e22"])):
    ex = dkx + side * 48 * math.cos(a)
    ey = dky - 104 + side * 48 * math.sin(a)
    for sx2 in (-14, 14):
        out.append(f'<line x1="{ex:.0f}" y1="{ey:.0f}" x2="{ex + sx2:.0f}" y2="{ey + 34:.0f}" stroke="#7d6608" stroke-width="1.5"/>')
    out.append(f'<path d="M{ex - 16:.0f},{ey + 34:.0f} Q{ex:.0f},{ey + 46:.0f} {ex + 16:.0f},{ey + 34:.0f} Z" fill="#d4ac0d" stroke="#7d6608" stroke-width="2"/>')
    for j, col in enumerate(blocks):
        out.append(f'<rect x="{ex - 12 + j * 9:.0f}" y="{ey + 25:.0f}" width="8" height="8" fill="{col}" stroke="#1c2833" stroke-width="1"/>')
# the auditor with a magnifying glass beside the desk
out.append(person(dkx - 104, dky + 24, "#1abc9c", extra=lens, hair="#2c1a10"))

# ---------- trust paradox: a parent holding papers back, a school leader's open hand ----------
tpx, tpy = 165, 640
held = ('<g transform="translate(-14,-30) rotate(-12)"><rect x="-6" y="-8" width="14" height="18" fill="#ffffff" stroke="#9aa3ad" stroke-width="1.5"/>'
        '<rect x="-4" y="-6" width="14" height="18" fill="#ffffff" stroke="#9aa3ad" stroke-width="1.5"/></g>'
        '<line x1="-6" y1="-26" x2="-12" y2="-22" stroke="#2c3e50" stroke-width="4"/>')
out.append(person(tpx - 30, tpy, "#2c3e50", scale=1.45, extra=held, hair="#111111"))
open_hand = ('<line x1="6" y1="-26" x2="-18" y2="-26" stroke="#8e44ad" stroke-width="4" stroke-linecap="round"/>'
             '<ellipse cx="-20" cy="-27" rx="4" ry="3" fill="#8d5a3b"/>')
out.append(person(tpx + 40, tpy, "#8e44ad", scale=1.45, extra=open_hand, skin="#8d5a3b", hair="#1a1a1a"))

# ---------- inBloom: a large boarded-up warehouse, overgrown (upper left) ----------
ibx, iby = 140, 236
out.append(f'<g transform="translate({ibx},{iby})">'
           '<rect x="-104" y="-80" width="208" height="92" fill="#b3b6bd" stroke="#5f6370" stroke-width="2.5"/>'
           '<polygon points="-114,-80 0,-128 114,-80" fill="#7f8590" stroke="#5f6370" stroke-width="2.5"/>'
           '<rect x="-36" y="-50" width="72" height="62" fill="#5f6370"/>'
           '<line x1="-40" y1="-46" x2="40" y2="8" stroke="#a0522d" stroke-width="9"/>'
           '<line x1="40" y1="-46" x2="-40" y2="8" stroke="#a0522d" stroke-width="9"/>'
           '<rect x="-88" y="-62" width="34" height="22" fill="#8e939c"/><rect x="54" y="-62" width="34" height="22" fill="#8e939c"/>'
           '<line x1="-88" y1="-51" x2="-54" y2="-51" stroke="#a0522d" stroke-width="5"/>'
           '<line x1="54" y1="-51" x2="88" y2="-51" stroke="#a0522d" stroke-width="5"/>'
           '<path d="M-104,12 Q-96,-30 -84,-54 M-84,-54 q6,4 2,12 M-100,-20 q-8,0 -6,8 M98,12 Q90,-20 102,-46 M102,-46 q-6,2 -4,10" '
           'fill="none" stroke="#4f8f45" stroke-width="4" stroke-linecap="round"/>'
           '<circle cx="-84" cy="-54" r="5" fill="#5c9e50"/><circle cx="102" cy="-46" r="5" fill="#5c9e50"/>'
           '<g transform="translate(0,-14)"><rect x="-8" y="-4" width="16" height="13" rx="2" fill="#d4ac0d" stroke="#7d6608" stroke-width="1.5"/>'
           '<path d="M-5,-4 V-9 Q0,-15 5,-9 V-4" fill="none" stroke="#7d6608" stroke-width="2"/></g></g>')

out.append('</svg>')
open(sys.argv[1], "w").write("\n".join(out))

# marker positions (visual centre of each object), as data.json percentages
MARKERS = [
    ("record (glowing folder)", fx, fy),
    ("behavioral data (laptop clicks)", stx + 2, sty - 30),
    ("informed consent (family key)", famx - 6, famy - 34),
    ("FERPA gate (bell)", gf[0], gf[1] - 10),
    ("governance (district office)", dx_ + 10, dy_ - 6),
    ("retention shredder", shx, shy - 6),
    ("data minimization funnel", fnx, fny - 30),
    ("COPPA low gate", gc[0] + 6, gc[1] - 4),
    ("GDPR gate (stars flag)", gg[0] + 8, gg[1] - 34),
    ("vendors and researcher", vx + 4, vy - 10),
    ("breach crack", bx + 40, by - 10),
    ("bias audit scale", dkx, dky - 74),
    ("trust paradox (two figures)", tpx + 5, tpy - 40),
    ("inBloom warehouse", ibx, iby - 40),
]
for name, x, y in MARKERS:
    print(f"{name:34s} x={x / W * 100:5.1f}  y={y / H * 100:5.1f}")
