#!/usr/bin/env bash
# Regenerate the site icons from scripts/favicon.html.
#
# Headless Chrome rather than an image library, for the same reason the mobile
# app does it this way: it is the only thing on a stock Mac that can set type in
# our actual Poppins Black, which is the face the wordmark in the navbar uses.
#
# Two marks, on purpose, because these files are shown at very different sizes:
#
#   icon.png / apple-icon.png  the full wordmark. Bookmarks, the iOS home
#                              screen, PWA installs, link previews - all big
#                              enough to read six glyphs.
#   favicon.ico                a single S. This file is only ever the browser
#                              tab, which is 16 or 32 px. The wordmark there
#                              renders as a coral smudge; it was checked on
#                              device before being split out.
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

render () { # <text> <font-size> <out>
  sed -e "s|FONT_URL|$font|" -e "s|BG|$BG|" -e "s|FG|$FG|" \
      -e "s|FONT_SIZE|$2|" -e "s|MARK_TEXT|$1|" \
      "$root/scripts/favicon.html" > "$tmp/render.html"
  "$chrome" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --screenshot="$3" --window-size=512,512 "file://$tmp/render.html" 2>/dev/null
}

render "Saydle" "118px" "$tmp/wordmark.png"
render "S"      "380px" "$tmp/letter.png"

# Written RGBA deliberately: Turbopack decodes the ICO at build time and rejects
# RGB payloads outright with "The PNG is not in RGBA format!".
python3 - "$tmp" "$root/app" <<'PY'
import sys, pathlib
from PIL import Image

tmp, app = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
word = Image.open(tmp / "wordmark.png").convert("RGBA")
letter = Image.open(tmp / "letter.png").convert("RGBA")

word.save(app / "icon.png")
word.resize((180, 180), Image.LANCZOS).save(app / "apple-icon.png")
letter.save(app / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
PY

echo "wrote app/icon.png + app/apple-icon.png (wordmark), app/favicon.ico (S)"
