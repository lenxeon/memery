"""Static assembly from verified runtime coordinates; not a browser screenshot."""
from pathlib import Path
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[4]
HERE = Path(__file__).resolve().parent
PUBLIC = ROOT / 'public'
manifest = json.loads((PUBLIC / 'themes/high_mountain_outdoors/manifest.json').read_text())
validation = json.loads((HERE / 'runtime-validation.json').read_text())
layout = validation['layouts'][0]
W, H = 1179, 2556


def load(relative):
    return Image.open(PUBLIC / relative).convert('RGBA')


def put_at_bottom(canvas, asset, width_ratio, bottom_ratio):
    source = load(asset)
    scale = W * width_ratio / source.width
    sprite = source.resize((round(source.width * scale), round(source.height * scale)), Image.Resampling.LANCZOS)
    canvas.alpha_composite(sprite, (round((W - sprite.width) / 2), round(H * (1 - bottom_ratio) - sprite.height)))


canvas = load(manifest['wall']['wallpaper']['assets']['phone'])
canvas.alpha_composite(load(manifest['wall']['roomOverlay']['asset']))
canvas.save(HERE / 'environment-composite.png')
mat = manifest['ground']['groundMat']
put_at_bottom(canvas, mat['asset'], mat['widthRatio'], mat['bottomRatio'])
table = load(manifest['table']['asset'])
table_scale = layout['scale'] * 3
table = table.resize((round(table.width * table_scale), round(table.height * table_scale)), Image.Resampling.LANCZOS)
canvas.alpha_composite(table, (round((W - table.width) / 2), round(layout['spriteTop'] * 3)))
cushion = manifest['ground']['cushion']
put_at_bottom(canvas, cushion['asset'], cushion['widthRatio'], cushion['bottomRatio'])
for side in ('left', 'right'):
    candidate = next(iter(manifest['foregroundCandidates'][side].values()))
    canvas.alpha_composite(load(candidate['asset']))
canvas.save(HERE / 'assembly-preview.png')
print('Saved 1179x2556 static environment and assembly previews; dynamic portrait and offerings remain runtime components.')
