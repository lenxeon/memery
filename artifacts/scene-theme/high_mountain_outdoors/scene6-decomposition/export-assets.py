"""Export image_gen outputs without repainting or changing scene composition.

Full canvases use uniform cover and subpixel center crop. Independent props only
trim transparent export margins; their geometry and alpha remain unchanged.
"""
from pathlib import Path
import hashlib
import json
import shutil

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[4]
HERE = Path(__file__).resolve().parent
THEME = ROOT / 'public/themes/high_mountain_outdoors'
GENERATED = Path('/Users/lenxeon/.codex/generated_images/01a185a9-e66a-7ec1-acaf-01fb951998fa')
SOURCE = Path('/var/folders/fn/txjkk8m53yqbw3r_325f784r0000gn/T/codex-clipboard-12ca415d-1dc6-4dae-8858-004a4ebb9d62.png')
CANVAS = (1179, 2556)
EXPORTS = [
    ('wallpaper', 'exec-a5e0d19e-a0f7-4647-b7e6-474ee16843b2.png', 'wallpapers/phone/sunrise-cloud-sea.png', True),
    ('roomOverlay', 'exec-3e92f881-b1b0-4beb-87cd-7d22e6f018f5.png', 'interior/phone/pine-terrace.png', True),
    ('table', 'exec-2336e531-2162-4211-9da8-9d94ddb929d8.png', 'table/carved-stone-trestle.png', False),
    ('groundMat', 'exec-426ed4db-680b-4644-8602-26f6e6381f23.png', 'mats/indigo-mountain-mat.png', False),
    ('cushion', 'exec-16019b25-e8e9-4935-bec1-6bf5a0cfc6ad.png', 'cushions/ivory-brocade.png', False),
    ('foregroundLeft', 'exec-fc67412c-21c1-443a-837c-55cf52838893.png', 'foregrounds/left.png', True),
    ('foregroundRight', 'exec-7aae5343-6978-452a-803b-05ef640e9140.png', 'foregrounds/right.png', True),
]


def save(im, target):
    target.parent.mkdir(parents=True, exist_ok=True)
    im.save(target, optimize=True)


def main():
    report = []
    raw = HERE / 'generated-sources'
    raw.mkdir(exist_ok=True)
    for slot, name, relative, full_canvas in EXPORTS:
        source = GENERATED / name
        shutil.copy2(source, raw / f'{slot}.png')
        im = Image.open(source)
        source_size = im.size
        crop = None
        if full_canvas:
            im = ImageOps.fit(im, CANVAS, Image.Resampling.LANCZOS, centering=(0.5, 0.5))
        else:
            # Ignore invisible alpha specks only when measuring the export margin.
            bounds = im.getchannel('A').point(lambda a: 255 if a > 24 else 0).getbbox()
            crop = (max(0, bounds[0] - 24), max(0, bounds[1] - 24),
                    min(im.width, bounds[2] + 24), min(im.height, bounds[3] + 24))
            im = im.crop(crop)
        target = THEME / relative
        save(im, target)
        alpha = im.convert('RGBA').getchannel('A')
        hist = alpha.histogram()
        visible = alpha.point(lambda a: 255 if a > 24 else 0).getbbox()
        report.append({
            'slot': slot, 'path': str(target.relative_to(ROOT / 'public')),
            'generatedSource': name, 'sourceSize': list(source_size),
            'exportSize': list(im.size), 'exportCrop': crop, 'mode': im.mode,
            'visibleBoundsAlpha24': visible,
            'visibleHeightRatio': (visible[3] - visible[1]) / im.height,
            'alphaRange': alpha.getextrema(), 'transparentPixels': hist[0],
            'solidPixels': hist[255], 'totalPixels': im.width * im.height,
        })
    original = THEME / 'reference/source-original.png'
    original.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(SOURCE, original)
    effect = ImageOps.fit(Image.open(SOURCE), CANVAS, Image.Resampling.LANCZOS)
    save(effect, THEME / 'reference/scene6-effect.png')
    for source, target in [
        (THEME / 'reference/scene6-effect.png', ROOT / 'ui/场景6效果图.png'),
        (THEME / 'wallpapers/phone/sunrise-cloud-sea.png', ROOT / 'ui/场景6墙纸.png'),
        (THEME / 'interior/phone/pine-terrace.png', ROOT / 'ui/场景6场景图.png'),
    ]:
        shutil.copy2(source, target)
    (HERE / 'asset-measurements.json').write_text(json.dumps({
        'referenceCanvas': list(CANVAS),
        'sourceSha256': hashlib.sha256(SOURCE.read_bytes()).hexdigest(),
        'assets': report,
    }, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
