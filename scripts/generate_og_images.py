#!/usr/bin/env python3
"""Generate per-post OG images for the subagent/gtm blog.

Reads post metadata from src/data/posts.ts (regex-parsed; structure is
stable enough for this) and writes 1200x630 PNGs to public/og/posts/{slug}.png.

Brand:
- Background: #0A0A0B
- Surface line accents: #1F1F1F
- Slash + accents: #10B981
- Ink (text): #F5F5F4
- Muted: #737373

Layout:
- 80px outer padding
- Top: micro label "{CATEGORY} · {READING_MINUTES} MIN READ" in IBM Plex Mono,
  uppercase, letter-spaced, muted color
- Center: title in Space Grotesk Bold, wrapped, large, ink color
- Bottom-left: "subagent/gtm" wordmark in Space Grotesk Bold, slash in accent
- Bottom-right: "READ →" call-to-action in IBM Plex Mono, accent color

Usage:
  python3 generate_og_images.py
"""

from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path
from typing import List

from PIL import Image, ImageDraw, ImageFont

ROOT = Path("/Users/rome/Documents/websites/services/subagent")
POSTS_FILE = ROOT / "src" / "data" / "posts.ts"
OUTPUT_DIR = ROOT / "public" / "og" / "posts"

FONT_DIR = Path("/tmp/og-fonts")
FONT_TITLE = FONT_DIR / "SpaceGrotesk-Bold.ttf"
FONT_BRAND = FONT_DIR / "SpaceGrotesk-Bold.ttf"
FONT_LABEL = FONT_DIR / "IBMPlexMono-Medium.ttf"

# Brand colors
BG = "#0A0A0B"
LINE = "#1F1F1F"
ACCENT = "#10B981"
INK = "#F5F5F4"
MUTED = "#737373"

# Canvas
W, H = 1200, 630
PAD = 80


def parse_posts(path: Path) -> List[dict]:
    """Parse posts.ts with a simple regex extraction. Adequate for our schema."""
    text = path.read_text()
    # Extract the array contents between `posts: BlogPost[] = [` and `];`
    m = re.search(r"posts:\s*BlogPost\[\]\s*=\s*\[(.*?)\n\];", text, re.DOTALL)
    if not m:
        raise SystemExit("Could not find posts array in posts.ts")
    body = m.group(1)
    posts = []
    # Each post is a {...}, block. Split on the closing brace + comma, careful.
    blocks = re.findall(r"\{([^{}]+(?:\{[^{}]*\}[^{}]*)*)\}", body)
    for blk in blocks:
        post = {}
        for field in ("slug", "title", "category"):
            mf = re.search(rf"{field}:\s*['\"]((?:\\.|[^'\"\\])+)['\"]", blk)
            if mf:
                # Unescape single quotes
                post[field] = mf.group(1).replace("\\'", "'").replace('\\"', '"')
        mr = re.search(r"readingMinutes:\s*(\d+)", blk)
        if mr:
            post["readingMinutes"] = int(mr.group(1))
        if "slug" in post and "title" in post:
            posts.append(post)
    return posts


def wrap_text(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, max_width: int) -> List[str]:
    """Wrap text to fit max_width, using the given font."""
    words = text.split()
    lines: List[str] = []
    current = ""
    for word in words:
        candidate = (current + " " + word).strip()
        bbox = draw.textbbox((0, 0), candidate, font=font)
        if bbox[2] - bbox[0] <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def fit_title_size(draw: ImageDraw.ImageDraw, title: str, max_width: int, max_lines: int = 4) -> tuple:
    """Find the largest title size that fits within max_width and max_lines."""
    for size in (72, 64, 58, 52, 48, 44, 40):
        font = ImageFont.truetype(str(FONT_TITLE), size)
        lines = wrap_text(draw, title, font, max_width)
        if len(lines) <= max_lines:
            return font, lines
    # Last resort
    font = ImageFont.truetype(str(FONT_TITLE), 36)
    return font, wrap_text(draw, title, font, max_width)


def render_image(post: dict, output_path: Path) -> None:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    # Subtle bottom border line at top of footer area
    footer_y = H - PAD - 60
    draw.line([(PAD, footer_y), (W - PAD, footer_y)], fill=LINE, width=1)

    # Top label: "{CATEGORY} · {N} MIN READ"
    label_font = ImageFont.truetype(str(FONT_LABEL), 20)
    category = post.get("category", "").upper()
    minutes = post.get("readingMinutes")
    if minutes:
        label_text = f"{category}  ·  {minutes} MIN READ"
    else:
        label_text = category
    # Letter-spacing: Pillow doesn't support natively; manually space chars
    spaced = " ".join(label_text)  # rough manual letter-spacing
    # Use a single space instead so it doesn't get too wide
    draw.text((PAD, PAD), label_text, fill=MUTED, font=label_font)

    # Accent slash beneath the label, like the brand mark
    bar_y = PAD + 36
    draw.line([(PAD, bar_y), (PAD + 48, bar_y)], fill=ACCENT, width=3)

    # Title (centered vertically in the middle band)
    title_max_width = W - 2 * PAD
    title_font, title_lines = fit_title_size(draw, post["title"], title_max_width, max_lines=4)

    # Compute total title block height
    line_heights = []
    for line in title_lines:
        bbox = draw.textbbox((0, 0), line, font=title_font)
        line_heights.append(bbox[3] - bbox[1])
    line_gap = int(title_font.size * 0.18)
    total_title_h = sum(line_heights) + line_gap * (len(title_lines) - 1)

    # Center between the top bar and the footer line
    title_top = bar_y + 60
    available_h = footer_y - title_top - 40
    title_y = title_top + max(0, (available_h - total_title_h) // 2)

    cur_y = title_y
    for i, line in enumerate(title_lines):
        draw.text((PAD, cur_y), line, fill=INK, font=title_font)
        cur_y += line_heights[i] + line_gap

    # Footer: subagent/gtm wordmark on left, "READ →" on right
    brand_font = ImageFont.truetype(str(FONT_BRAND), 32)
    cta_font = ImageFont.truetype(str(FONT_LABEL), 18)

    # Wordmark with colored slash
    parts = [("subagent", INK), ("/", ACCENT), ("gtm", INK)]
    x = PAD
    y = footer_y + 14
    for text, color in parts:
        draw.text((x, y), text, fill=color, font=brand_font)
        bbox = draw.textbbox((0, 0), text, font=brand_font)
        x += bbox[2] - bbox[0]

    # Right-side CTA "READ →" with accent
    cta = "READ →"
    cta_bbox = draw.textbbox((0, 0), cta, font=cta_font)
    cta_w = cta_bbox[2] - cta_bbox[0]
    draw.text((W - PAD - cta_w, footer_y + 22), cta, fill=ACCENT, font=cta_font)

    img.save(output_path, "PNG", optimize=True)


def main() -> int:
    if not POSTS_FILE.exists():
        print(f"posts.ts not found at {POSTS_FILE}", file=sys.stderr)
        return 1
    if not all(f.exists() for f in [FONT_TITLE, FONT_BRAND, FONT_LABEL]):
        print("Font files missing in /tmp/og-fonts", file=sys.stderr)
        return 1

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    posts = parse_posts(POSTS_FILE)
    print(f"Parsed {len(posts)} posts")

    for post in posts:
        out_path = OUTPUT_DIR / f"{post['slug']}.png"
        render_image(post, out_path)
        print(f"  ✓ {out_path.relative_to(ROOT)}")

    print(f"Wrote {len(posts)} OG images to {OUTPUT_DIR.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
