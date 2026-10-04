#!/usr/bin/env bash
# Kostenloser Backlink-Check über den Common-Crawl-Webgraph (Domain-Ebene).
# Liefert für jede Zieldomain die verweisenden Domains plus deren Stärke (Harmonic Centrality, PageRank).
# Aufruf: scripts/seo/backlinks.sh sanimio.de joviva.de ...
# Ergebnis: reports/backlinks/<graph>/links.tsv (ziel, quelle) und ranks.tsv
# Dauer: ca. 15-30 Min., lädt ~12 GB per Stream (nichts wird gespeichert außer den Treffern).
set -euo pipefail
GRAPH="${GRAPH:-cc-main-2026-jul-aug-sep}"
BASE="https://data.commoncrawl.org/projects/hyperlinkgraph/$GRAPH/domain"
OUT="reports/backlinks/$GRAPH"
mkdir -p "$OUT"
[ $# -gt 0 ] || { echo "Domains angeben"; exit 1; }

# Domains in umgekehrter Schreibweise wie im Graph (sanimio.de -> de.sanimio)
rev() { echo "$1" | awk -F. '{for(i=NF;i>1;i--) printf "%s.", $i; print $1}'; }
: > "$OUT/targets.rev"
for d in "$@"; do rev "$d" >> "$OUT/targets.rev"; done

echo "1/4 IDs der Zieldomains suchen …"
curl -sS --retry 4 "$BASE/$GRAPH-domain-vertices.txt.gz" | gunzip -c \
  | awk -F'\t' 'NR==FNR{t[$1]=1; next} ($2 in t){print $1"\t"$2}' "$OUT/targets.rev" - > "$OUT/target-ids.tsv"
cat "$OUT/target-ids.tsv"

echo "2/4 Kanten durchsuchen (8 GB) …"
curl -sS --retry 4 "$BASE/$GRAPH-domain-edges.txt.gz" | gunzip -c \
  | awk -F'\t' 'NR==FNR{t[$1]=1; next} ($2 in t){print $1"\t"$2}' "$OUT/target-ids.tsv" - > "$OUT/edges.tsv"
wc -l < "$OUT/edges.tsv"

echo "3/4 Namen der verweisenden Domains auflösen …"
curl -sS --retry 4 "$BASE/$GRAPH-domain-vertices.txt.gz" | gunzip -c \
  | awk -F'\t' 'NR==FNR{s[$1]=1; next} ($1 in s){print $1"\t"$2}' <(cut -f1 "$OUT/edges.tsv" | sort -u) - > "$OUT/source-ids.tsv"
awk -F'\t' 'FILENAME==ARGV[1]{n[$1]=$2; next} FILENAME==ARGV[2]{t[$1]=$2; next} {print t[$2]"\t"n[$1]}' \
  "$OUT/source-ids.tsv" "$OUT/target-ids.tsv" "$OUT/edges.tsv" > "$OUT/links.tsv"

echo "4/4 Stärke (Harmonic Centrality, PageRank) laden …"
curl -sS --retry 4 "$BASE/$GRAPH-domain-ranks.txt.gz" | gunzip -c \
  | awk -F'\t' 'NR==FNR{s[$2]=1; next} ($5 in s){print $5"\t"$1"\t"$3}' <(cat "$OUT/source-ids.tsv" "$OUT/target-ids.tsv") - > "$OUT/ranks.tsv"

rm -f "$OUT/edges.tsv"
echo "Fertig: $OUT/links.tsv ($(wc -l < "$OUT/links.tsv") Links), $OUT/ranks.tsv"
