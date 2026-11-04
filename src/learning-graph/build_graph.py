"""Build concept-list.md and learning-graph.csv from concepts.txt.

Usage: python3 build_graph.py concepts.txt docs/learning-graph

IDs are assigned in topological order (ties broken by order in the file),
so every concept's dependencies have smaller IDs.
"""
import csv, sys, heapq
from pathlib import Path

src, outdir = Path(sys.argv[1]), Path(sys.argv[2])
rows = []
for line in src.read_text().splitlines():
    if not line.strip() or line.startswith('#'):
        continue
    tax, label, deps = [p.strip() for p in line.split('|')]
    deps = [d.strip() for d in deps.split(';') if d.strip()]
    if tax in ('+', '='):
        hit = [r for r in rows if r[1] == label]
        if not hit:
            print(f"patch for unknown concept: {label}"); sys.exit(1)
        r = hit[0]
        if tax == '=': r[2][:] = deps
        else: r[2].extend(d for d in deps if d not in r[2])
        continue
    rows.append((tax, label, deps))

labels = [r[1] for r in rows]
errors = []
dupes = {l for l in labels if labels.count(l) > 1}
if dupes: errors.append(f"duplicate labels: {sorted(dupes)}")
for tax, label, deps in rows:
    if len(label) > 32: errors.append(f"too long ({len(label)}): {label}")
    for d in deps:
        if d not in labels: errors.append(f"unknown dependency '{d}' in '{label}'")
        if d == label: errors.append(f"self-dependency: {label}")
if errors:
    print("\n".join(errors)); sys.exit(1)

order = {l: i for i, l in enumerate(labels)}
deps_of = {r[1]: r[2] for r in rows}
indeg = {l: len(set(deps_of[l])) for l in labels}
children = {l: [] for l in labels}
for l in labels:
    for d in set(deps_of[l]):
        children[d].append(l)
heap = [order[l] for l in labels if indeg[l] == 0]
heapq.heapify(heap)
topo = []
while heap:
    l = labels[heapq.heappop(heap)]
    topo.append(l)
    for c in children[l]:
        indeg[c] -= 1
        if indeg[c] == 0:
            heapq.heappush(heap, order[c])
if len(topo) != len(labels):
    print("cycle among:", [l for l in labels if l not in topo]); sys.exit(1)

cid = {l: i + 1 for i, l in enumerate(topo)}
tax_of = {r[1]: r[0] for r in rows}
with open(outdir / 'learning-graph.csv', 'w', newline='') as f:
    w = csv.writer(f)
    w.writerow(['ConceptID', 'ConceptLabel', 'Dependencies', 'TaxonomyID'])
    for l in topo:
        w.writerow([cid[l], l, '|'.join(str(cid[d]) for d in sorted(set(deps_of[l]), key=cid.get)), tax_of[l]])

with open(outdir / 'concept-list.md', 'w') as f:
    f.write("# Concept List\n\nThese are the concepts in the AI-Native Schools learning graph. "
            "Each number is the concept's ConceptID.\n\n")
    for l in topo:
        f.write(f"{cid[l]}. {l}\n")
print(f"{len(topo)} concepts written")
