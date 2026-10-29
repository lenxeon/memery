"""Static composition from actual runtime metrics, without browser automation."""
from pathlib import Path
import json
from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
PUBLIC = ROOT / 'public'
manifest = json.loads((PUBLIC / 'themes/celestial_realm/manifest.json').read_text())
validation = json.loads((HERE / 'runtime-validation.json').read_text())
production = json.loads((HERE / 'production-inputs.json').read_text())
layout = validation['layouts'][0]
W, H = 1179, 2556


def load(relative):
    return Image.open(PUBLIC / relative).convert('RGBA')


def put_ground(canvas, asset):
    sprite = load(asset['asset'])
    scale = W * asset['widthRatio'] / sprite.width
    sprite = sprite.resize((round(sprite.width * scale), round(sprite.height * scale)), Image.Resampling.LANCZOS)
    canvas.alpha_composite(sprite, (round((W - sprite.width) / 2), round(H * (1 - asset['bottomRatio']) - sprite.height)))


environment = load(manifest['wall']['wallpaper']['assets']['phone'])
environment.alpha_composite(load(manifest['wall']['roomOverlay']['asset']))
environment.save(HERE / 'environment-composite.png')
base = environment.copy()
put_ground(base, manifest['ground']['groundMat'])
table = load(manifest['table']['asset'])
table_scale = layout['scale'] * 3
table = table.resize((round(table.width * table_scale), round(table.height * table_scale)), Image.Resampling.LANCZOS)
base.alpha_composite(table, (round((W - table.width) / 2), round(layout['spriteTop'] * 3)))
put_ground(base, manifest['ground']['cushion'])

guide = environment.copy()
draw = ImageDraw.Draw(guide)
p = layout['portrait']
x, y, r = p['x'] * 3, p['y'] * 3, p['diameter'] * 1.5
draw.ellipse((x-r, y-r, x+r, y+r), outline=(10, 150, 220, 255), width=2)
guide.crop((440, 1090, 740, 1390)).resize((600, 600), Image.Resampling.NEAREST).save(HERE / 'portrait-opening-fit-guide.png')

sheet = Image.new('RGB', (1179, 1780), '#f6f1e9')
font = ImageFont.truetype('/System/Library/Fonts/PingFang.ttc', 22)
for index, candidate_set in enumerate(production['sets']):
    assembled = base.copy()
    for side in ('left', 'right'):
        candidate = manifest['foregroundCandidates'][side][f"celestial_{candidate_set['id']}_{side}"]
        assembled.alpha_composite(load(candidate['asset']))
    if index == 0:
        assembled.save(HERE / 'assembly-preview.png')
    # All six full scenes are reviewed at the same 393x852 display scale.
    thumb = assembled.convert('RGB').resize((393, 852), Image.Resampling.LANCZOS)
    x0, y0 = (index % 3) * 393, (index // 3) * 890
    sheet.paste(thumb, (x0, y0))
    label = candidate_set['name'] + (' · 默认' if index == 0 else '')
    ImageDraw.Draw(sheet).text((x0+15, y0+855), label, fill='#695441', font=font)
sheet.save(HERE / 'foreground-set-review.png')
print('Saved environment, default assembly, portrait-opening guide and full-scene review for all 6 foreground sets. Dynamic user photo, text and offerings are not painted into the static preview.')
