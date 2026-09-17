#!/usr/bin/env bash
# Regenerate the site icons from scripts/favicon.html.
#
# Headless Chrome rather than an image library, for the same reason the mobile
# app does it this way: it is the only thing on a stock Mac that can set type in
# our actual Poppins Black, which is the face the wordmark in the navbar uses.
# An "S" drawn in a lookalike sans is the kind of thing nobody reports and
# everybody registers.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$chrome" ] || { echo "Google Chrome not found at $chrome" >&2; exit 1; }
python3 -c "import PIL" 2>/dev/null || { echo "Pillow required: pip3 install Pillow" >&2; exit 1; }

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

font="file://$root/app/fonts/Poppins/Poppins-Black.ttf"
BG="#FF6F61"   # primary.20 - the coral the CTA uses
FG="#FFFFFF"

sed -e "s|FONT_URL|$font|" -e "s|BG|$BG|" -e "s|FG|$FG|" \
    "$root/scripts/favicon.html" > "$tmp/render.html"

"$chrome" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --screenshot="$tmp/icon.png" --window-size=512,512 "file://$tmp/render.html" 2>/dev/null

# icon.png and apple-icon.png are App Router conventions: Next emits the
# <link rel="icon"> and <link rel="apple-touch-icon"> tags from those filenames.
# favicon.ico is here too because /favicon.ico is still fetched directly by
# crawlers and older clients that never read those tags.
#
# Everything is written RGBA on purpose. Turbopack decodes the ICO at build time
# and rejects RGB payloads outright with "The PNG is not in RGBA format!", which
# is what sips produces when it resizes.
python3 - "$tmp/icon.png" "$root/app" <<'PY'
import sys, pathlib
from PIL import Image

src, app = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
base = Image.open(src).convert("RGBA")

base.save(app / "icon.png")
base.resize((180, 180), Image.LANCZOS).save(app / "apple-icon.png")
base.save(app / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
PY

echo "wrote app/icon.png (512), app/apple-icon.png (180), app/favicon.ico (16/32/48)"
