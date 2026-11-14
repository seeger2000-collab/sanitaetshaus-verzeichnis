"""Erzeugt die Siegel als SVG mit Text in Pfaden (sieht auf jeder Website gleich aus).
Aufruf: python3 scripts/siegel/make-siegel.py  (braucht fonttools und die Schrift Inter)
Danach: node scripts/siegel/png.mjs  (PNG-Dateien)"""
import math, pathlib
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

FONTDIR = pathlib.Path('/usr/share/fonts/opentype/inter')
OUT = pathlib.Path(__file__).resolve().parents[2] / 'public' / 'siegel'
OUT.mkdir(parents=True, exist_ok=True)
GREEN, MUTED, LIGHT = '#0f6b57', '#55625d', '#e7f3ef'
_fonts = {}
def font(w):
    if w not in _fonts:
        f = TTFont(FONTDIR / f'Inter-{w}.otf')
        _fonts[w] = (f, f.getGlyphSet(), f.getBestCmap(), f['head'].unitsPerEm)
    return _fonts[w]

def width(s, w, size, ls=0):
    f, gs, cmap, upm = font(w)
    return sum(gs[cmap[ord(c)]].width for c in s) * size / upm + ls * (len(s) - 1)

def glyph(c, w, size, x, y, rot=0):
    f, gs, cmap, upm = font(w)
    pen = SVGPathPen(gs, ntos=lambda v: ('%.2f' % v).rstrip('0').rstrip('.'))
    k = size / upm
    a = math.radians(rot)
    ca, sa = math.cos(a), math.sin(a)
    # Schrift-Koordinaten (y nach oben) -> SVG (y nach unten), gedreht um (x, y)
    t = (k * ca, k * sa, k * sa, -k * ca, x, y)
    gs[cmap[ord(c)]].draw(TransformPen(pen, t))
    return pen.getCommands(), gs[cmap[ord(c)]].width * k

def text(s, w, size, x, y, ls=0, anchor='start'):
    if anchor == 'middle': x -= width(s, w, size, ls) / 2
    d = []
    for c in s:
        cmd, adv = glyph(c, w, size, x, y)
        d.append(cmd); x += adv + ls
    return ' '.join(d)

def arc_text(s, w, size, cx, cy, r, top=True, ls=0):
    """Text entlang eines Kreisbogens, mittig oben (top) oder unten."""
    total = width(s, w, size, ls)
    ang = total / r  # Bogenlaenge -> Winkel
    d = []
    pos = -ang / 2
    for c in s:
        _, adv = glyph(c, w, size, 0, 0)
        mid = pos + (adv / 2) / r
        if top:
            th = -math.pi / 2 + mid
            gx = cx + r * math.cos(th) - (adv / 2) * math.cos(mid)
            gy = cy + r * math.sin(th) - (adv / 2) * math.sin(mid)
            cmd, _ = glyph(c, w, size, gx, gy, math.degrees(mid))
        else:
            th = math.pi / 2 - mid
            gx = cx + r * math.cos(th) - (adv / 2) * math.cos(-mid)
            gy = cy + r * math.sin(th) - (adv / 2) * math.sin(-mid)
            cmd, _ = glyph(c, w, size, gx, gy, math.degrees(-mid))
        d.append(cmd)
        pos += (adv + ls) / r
    return ' '.join(d)

LABEL = 'Gelistet auf Sanitätshaus-Suche (sanitaetshaus-suche.de)'
def svg(name, wd, ht, body):
    (OUT / name).write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{wd}" height="{ht}" viewBox="0 0 {wd} {ht}" role="img" aria-label="{LABEL}">'
        f'<title>{LABEL}</title>{body}</svg>\n', encoding='utf-8')

# B: Banner (Standard)
svg('siegel-banner.svg', 256, 64,
    f'<rect x="1" y="1" width="254" height="62" rx="10" fill="#fff" stroke="{GREEN}" stroke-width="2"/>'
    f'<path d="M1 11a10 10 0 0 1 10-10h53v62H11a10 10 0 0 1-10-10z" fill="{GREEN}"/>'
    f'<path d="M27 17h10v10h10v10H37v10H27V37H17V27h10z" fill="#fff"/>'
    f'<path fill="{MUTED}" d="{text("Gelistet auf", "Medium", 11, 76, 23)}"/>'
    f'<path fill="{GREEN}" d="{text("Sanitätshaus-Suche", "ExtraBold", 15.5, 76, 41)}"/>'
    f'<path fill="{MUTED}" d="{text("sanitaetshaus-suche.de", "Regular", 10, 76, 55)}"/>')

# A: rundes Siegel
svg('siegel-rund.svg', 160, 160,
    f'<circle cx="80" cy="80" r="78" fill="{GREEN}"/>'
    f'<circle cx="80" cy="80" r="70" fill="none" stroke="#fff" stroke-width="1.5" opacity=".6"/>'
    f'<circle cx="80" cy="80" r="40" fill="#fff"/>'
    f'<path d="M73 56h14v17h17v14H87v17H73V87H56V73h17z" fill="{GREEN}"/>'
    f'<path fill="#fff" d="{arc_text("GELISTET AUF", "Bold", 13, 80, 80, 51, True, 2.2)}"/>'
    f'<path fill="#fff" d="{arc_text("SANITAETSHAUS-SUCHE.DE", "Bold", 10.5, 80, 80, 59, False, 1)}"/>')

# C: Kompakt-Plakette
svg('siegel-kompakt.svg', 252, 32,
    f'<rect width="252" height="32" rx="16" fill="{LIGHT}"/>'
    f'<path d="M16 0h68v32H16A16 16 0 0 1 16 0z" fill="{GREEN}"/>'
    f'<path d="M17 9h5v5h5v5h-5v5h-5v-5h-5v-5h5z" fill="#fff"/>'
    f'<path fill="#fff" d="{text("Gelistet", "Bold", 12.5, 32, 20.5)}"/>'
    f'<path fill="{GREEN}" d="{text("sanitaetshaus-suche.de", "SemiBold", 12.5, 94, 20.5)}"/>')
print('SVG geschrieben nach', OUT)
