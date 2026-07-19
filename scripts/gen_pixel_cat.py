#!/usr/bin/env python3
"""
Generate public/pixel-cat.gif
32x32 tabby cat, 4-frame walk cycle, transparent background.
"""

from PIL import Image
import os

W, H = 32, 32

# RGBA palette
T  = (0,   0,   0,   0)    # transparent
DK = (30,  20,  12, 255)   # dark outline
BD = (185, 172, 148, 255)  # body warm tan
BH = (232, 220, 200, 255)  # belly highlight
BS = (115, 103,  83, 255)  # stripe / shadow
EY = (78,  222, 163, 255)  # eye green  ← site secondary #4edea3
NS = (214,  88,  72, 255)  # nose pink
TL = (242, 234, 218, 255)  # tail tip light


def px(img, x, y, c):
    if 0 <= x < W and 0 <= y < H:
        img.putpixel((x, y), c)


def hline(img, x0, x1, y, c):
    for x in range(x0, x1 + 1):
        px(img, x, y, c)


def vline(img, y0, y1, x, c):
    for y in range(y0, y1 + 1):
        px(img, x, y, c)


def fill(img, x0, y0, x1, y1, c):
    for y in range(y0, y1 + 1):
        for x in range(x0, x1 + 1):
            px(img, x, y, c)


def make_frame(phase):
    """
    4-frame walk cycle (side view, cat faces RIGHT).
    phase 0/2: passing (neutral legs)
    phase 1:   contact – front-L + back-R legs down
    phase 3:   contact – front-R + back-L legs down
    """
    img = Image.new("RGBA", (W, H), T)

    # ── TAIL ── starts at left body edge, curves upward
    tail_segs = [
        (7, 17), (6, 16), (5, 15), (4, 14), (3, 13),
        (3, 12), (3, 11), (4, 10), (5,  9), (5,  8), (5, 7),
    ]
    for x, y in tail_segs:
        px(img, x,   y, BD)
        px(img, x+1, y, BD)
    # tail tip
    for x, y in [(5, 6), (6, 6), (6, 5), (6, 4)]:
        px(img, x, y, TL)
    # tail outline (key edge pixels)
    for x, y in [
        (8, 17), (7, 16), (6, 15), (5, 14), (4, 13),
        (4, 12), (4, 11), (5, 10), (6,  9), (6,  8),
        (6,  7), (7,  6), (7,  5), (7,  4), (5,  4),
        (4,  6), (2, 11), (2, 12), (3, 13),
    ]:
        px(img, x, y, DK)

    # ── BODY ── block x7–21, y13–19
    fill(img, 8, 14, 20, 18, BD)
    fill(img, 9, 16, 20, 17, BH)         # belly strip
    for xm in [10, 13, 16, 19]:          # tabby stripes
        px(img, xm, 14, BS)
        px(img, xm, 15, BS)
    hline(img, 7, 21, 13, DK)            # top edge
    hline(img, 7, 21, 19, DK)            # bottom edge
    vline(img, 13, 19,  7, DK)           # left edge
    vline(img, 13, 19, 21, DK)           # right edge

    # ── HEAD ── ellipse centered (26,11) rx=5, ry=5
    for y in range(6, 17):
        for x in range(21, 32):
            dx, dy = x - 26, y - 11
            if dx*dx/25 + dy*dy/20 < 1:
                px(img, x, y, BD)
    # head outline (1-pixel border)
    for y in range(6, 17):
        for x in range(21, 32):
            dx, dy = x - 26, y - 11
            inside_outer = dx*dx/25 + dy*dy/20 < 1
            inside_inner = dx*dx/20 + dy*dy/15 < 1
            if inside_outer and not inside_inner:
                px(img, x, y, DK)

    # ── EARS ──
    for x, y in [(24,6),(25,6),(24,5),(25,5)]:
        px(img, x, y, BD)
    for x, y in [(28,6),(29,6),(28,5),(29,5)]:
        px(img, x, y, BD)
    # ear tips dark
    px(img, 24, 4, DK); px(img, 25, 4, DK)
    px(img, 29, 4, DK); px(img, 30, 4, DK)
    # inner ear pink
    px(img, 24, 5, NS)
    px(img, 29, 5, NS)

    # ── EYES ──
    px(img, 23, 10, EY); px(img, 24, 10, EY)
    px(img, 28, 10, EY); px(img, 29, 10, EY)
    px(img, 23, 11, DK); px(img, 28, 11, DK)   # pupils

    # ── NOSE ──
    px(img, 26, 12, NS); px(img, 27, 12, NS)
    px(img, 26, 13, NS)

    # ── WHISKERS ──
    hline(img, 18, 22, 12, DK)
    hline(img, 18, 22, 13, DK)

    # ── MOUTH ──
    px(img, 24, 14, DK); px(img, 27, 14, DK)

    # ── LEGS ──
    leg_offsets = {
        0: dict(fl=0,  fr=0,  bl=0,  br=0),
        1: dict(fl=1,  fr=-1, bl=-1, br=1),
        2: dict(fl=0,  fr=0,  bl=0,  br=0),
        3: dict(fl=-1, fr=1,  bl=1,  br=-1),
    }[phase]

    def leg(xb, yo):
        y0 = 20 + yo
        fill(img, xb, y0, xb+1, y0+3, BD)
        px(img, xb-1, y0+3, BD); px(img, xb+2, y0+3, BD)  # foot wider
        px(img, xb-1, y0, DK);  px(img, xb+2, y0, DK)      # top outline
        hline(img, xb-1, xb+2, y0+4, DK)                    # bottom outline

    # Front pair (right side of body)
    leg(18, leg_offsets["fl"])
    leg(15, leg_offsets["fr"])
    # Back pair (left side of body)
    leg(11, leg_offsets["bl"])
    leg(8,  leg_offsets["br"])

    return img


def save_as_gif(frames_rgba, out_path, duration=150):
    """
    Convert RGBA frames to animated GIF with transparency.
    Uses a shared palette built from all frames combined.
    """
    MAGIC = (1, 1, 1)   # near-black used as transparent placeholder

    rgb_imgs = []
    for f in frames_rgba:
        data = list(f.convert("RGBA").getdata())
        rgb_data = [MAGIC if a == 0 else (r, g, b) for r, g, b, a in data]
        ri = Image.new("RGB", (W, H))
        ri.putdata(rgb_data)
        rgb_imgs.append(ri)

    # Stack all frames to build a shared palette
    combined = Image.new("RGB", (W, H * len(rgb_imgs)))
    for i, ri in enumerate(rgb_imgs):
        combined.paste(ri, (0, i * H))
    p_ref = combined.quantize(colors=255, dither=0)

    # Find MAGIC's palette index
    pal = p_ref.getpalette() or []
    n_colors = len(pal) // 3
    trans_idx, best = 0, float("inf")
    for i in range(n_colors):
        r, g, b = pal[i*3], pal[i*3+1], pal[i*3+2]
        d = (r-MAGIC[0])**2 + (g-MAGIC[1])**2 + (b-MAGIC[2])**2
        if d < best:
            best, trans_idx = d, i

    # Quantize each frame to shared palette
    p_frames = [ri.quantize(palette=p_ref, dither=0) for ri in rgb_imgs]

    p_frames[0].save(
        out_path,
        save_all=True,
        append_images=p_frames[1:],
        loop=0,
        duration=duration,
        transparency=trans_idx,
        disposal=2,
        optimize=False,
    )
    print(f"Saved: {out_path}  ({len(p_frames)} frames, transparency index={trans_idx})")


if __name__ == "__main__":
    out = os.path.normpath(
        os.path.join(os.path.dirname(__file__), "..", "public", "pixel-cat.gif")
    )
    frames = [make_frame(i) for i in range(4)]
    save_as_gif(frames, out, duration=150)
