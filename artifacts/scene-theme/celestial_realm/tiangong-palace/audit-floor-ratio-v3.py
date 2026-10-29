"""Annotate a measured estimate and the fixed target without altering the source."""
from pathlib import Path
import hashlib
import json
from PIL import Image, ImageDraw, ImageFont, ImageChops

HERE = Path(__file__).resolve().parent
source = HERE / 'concept-v3.png'
original_bytes = source.read_bytes()
original = Image.open(source).convert('RGB')
W, H = original.size
assert (W, H) == (1179, 2556)

# Visual estimate from the bilateral column plinth/floor transition; the rear
# center is occluded by altar furniture and a stepped platform. Not segmentation.
observed_y = 1820
uncertainty = 15
target_y = 1870
observed_floor = H - observed_y
target_floor = H - target_y
ratio = observed_floor / H
target_ratio = target_floor / H
range_pct = [(H - (observed_y + uncertainty)) / H * 100,
             (H - (observed_y - uncertainty)) / H * 100]

overlay = Image.new('RGBA', original.size)
draw = ImageDraw.Draw(overlay)
font = ImageFont.truetype('/System/Library/Fonts/PingFang.ttc', 30)
orange = (255, 150, 20, 255)
red = (255, 35, 35, 255)
draw.rectangle((0, observed_y - uncertainty, W - 1, observed_y + uncertainty), fill=(255, 150, 20, 38))
for x in range(0, W, 30):
    draw.line((x, observed_y, min(x + 19, W - 1), observed_y), fill=orange, width=5)
draw.line((0, target_y, W - 1, target_y), fill=red, width=5)


def label(text, x, y, color):
    bounds = draw.textbbox((x, y), text, font=font)
    draw.rounded_rectangle((bounds[0] - 12, bounds[1] - 7, bounds[2] + 12, bounds[3] + 8), radius=8, fill=(255, 255, 255, 238))
    draw.text((x, y), text, font=font, fill=color)


label(f'估算落地线 y≈{observed_y}±{uncertainty} · 地面约{ratio:.1%}', 30, observed_y - 66, (171, 86, 0, 255))
label(f'目标分界 y={target_y} · 地面{target_ratio:.2%}', 30, target_y + 10, (209, 25, 25, 255))

audit = Image.alpha_composite(original.convert('RGBA'), overlay).convert('RGB')
target = HERE / 'floor-ratio-audit-v3.png'
audit.save(target)
saved = Image.open(target).convert('RGB')
assert saved.size == original.size
assert all(saved.getpixel((x, target_y)) == red[:3] for x in range(W))
assert source.read_bytes() == original_bytes
outside = ImageChops.difference(original, saved)
outside.paste((0, 0, 0), (0, 0), overlay.getchannel('A').point(lambda a: 255 if a else 0))
assert outside.getbbox() is None

report = {
    'source': str(source), 'sourceSHA256': hashlib.sha256(original_bytes).hexdigest(),
    'canvas': {'width': W, 'height': H},
    'measurementMeaning': 'Vertical composition allocation from a rear floor boundary to image bottom, including regions occluded by furniture; not visible-floor pixel segmentation.',
    'method': 'Visual estimate of bilateral column-plinth/floor transition from full source and coordinate-grid crop. Center is occluded by altar and a stepped rear platform. The front of a column plinth and rear platform may differ in depth; estimate is not a unique recovered camera boundary.',
    'observed': {'approximateBoundaryY': observed_y, 'uncertaintyPx': uncertainty,
                 'floorHeightPx': observed_floor, 'floorHeightPercent': ratio * 100,
                 'approximateFloorHeightPercentRange': range_pct},
    'target': {'boundaryY': target_y, 'floorHeightPx': target_floor,
               'floorHeightPercent': target_ratio * 100,
               'lineColor': '#FF2323', 'lineCenterRow': target_y,
               'lineRows': [target_y - 2, target_y + 2]},
    'difference': {'approximateExcessPercentagePoints': (ratio - target_ratio) * 100,
                   'suggestedBoundaryDownwardShiftPx': target_y - observed_y,
                   'approximateCssShiftAt393x852': (target_y - observed_y) / 3,
                   'relativeExtraFloorHeightPercent': (observed_floor / target_floor - 1) * 100},
    'auditPath': str(target), 'status': 'slightly_more_floor_than_target; estimate, not approved',
    'verification': {'sameDimensions': True, 'redTargetLineFullWidth': True,
                     'sourceByteIdentical': True, 'outsideAnnotationsUnchanged': True},
}
(HERE / 'floor-ratio-audit-v3.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({'observedFloorPercent': ratio * 100,
                  'estimatedRangePercent': range_pct,
                  'targetFloorPercent': target_ratio * 100,
                  'excessPercentagePoints': (ratio - target_ratio) * 100,
                  'boundaryShiftPx': target_y - observed_y,
                  'verifiedTargetRow': target_y}, ensure_ascii=False))
