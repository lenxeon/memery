"""Package selected image_gen outputs; no repainting or runtime warping."""
from pathlib import Path
import hashlib
import json
import shutil
from PIL import Image, ImageOps

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
THEME = ROOT / 'public/themes/celestial_realm'
CANVAS = (1179, 2556)
PATHS = {
    'wallpaper': 'wallpapers/phone/heavenly-palaces.png',
    'roomOverlay': 'interior/phone/jade-hall-ground.png',
    'table': 'table/jade-gold-altar.png',
    'groundMat': 'mats/celadon-cloud-mat.png',
    'cushion': 'cushions/ivory-gold-brocade.png',
}


def save(im, destination):
    destination.parent.mkdir(parents=True, exist_ok=True)
    im.save(destination, compress_level=6)


def main():
    production = json.loads((HERE / 'production-inputs.json').read_text())
    measurements = []
    for record in production['assets']:
        slot = record['slot']
        source = Path(record['source'])
        im = Image.open(source)
        native_size = im.size
        full_canvas = slot in ('wallpaper', 'roomOverlay') or slot not in PATHS
        crop = None
        if full_canvas:
            im = ImageOps.fit(im, CANVAS, Image.Resampling.LANCZOS, centering=(.5, .5))
        else:
            bounds = im.getchannel('A').point(lambda a: 255 if a > 24 else 0).getbbox()
            crop = (max(0, bounds[0] - 24), max(0, bounds[1] - 24),
                    min(im.width, bounds[2] + 24), min(im.height, bounds[3] + 24))
            im = im.crop(crop)
        if slot in PATHS:
            relative = PATHS[slot]
        else:
            set_id, side = slot.rsplit('_', 1)
            relative = f'foregrounds/{set_id}/{side}.png'
        destination = THEME / relative
        save(im, destination)
        alpha = im.convert('RGBA').getchannel('A')
        visible = alpha.point(lambda a: 255 if a > 24 else 0).getbbox()
        histogram = alpha.histogram()
        measurement = {
            'slot': slot, 'path': str(destination.relative_to(ROOT / 'public')),
            'source': str(source), 'sourceSHA256': hashlib.sha256(source.read_bytes()).hexdigest(),
            'nativeSize': list(native_size), 'exportSize': list(im.size), 'exportCrop': crop,
            'mode': im.mode, 'visibleBoundsAlpha24': visible,
            'visibleHeightRatio': (visible[3] - visible[1]) / im.height,
            'alphaRange': alpha.getextrema(), 'transparentPixels': histogram[0],
            'totalPixels': im.width * im.height,
        }
        if slot not in PATHS:
            measurement['centralAlphaMax'] = alpha.crop((round(im.width*.47), 0, round(im.width*.53), im.height)).getextrema()[1]
        measurements.append(measurement)
    original = Path(production.get('sourceOriginalReference', production['reference']))
    effect_preview = Path(production.get('effectPreview', production['reference']))
    effect = ImageOps.fit(Image.open(effect_preview), CANVAS, Image.Resampling.LANCZOS)
    save(effect, THEME / 'reference/scene7-effect.png')
    shutil.copy2(original, THEME / 'reference/source-original.png')
    for source, target in [
        (THEME / 'reference/scene7-effect.png', ROOT / 'ui/场景7效果图.png'),
        (THEME / PATHS['wallpaper'], ROOT / 'ui/场景7墙纸.png'),
        (THEME / PATHS['roomOverlay'], ROOT / 'ui/场景7场景图.png'),
    ]:
        shutil.copy2(source, target)
    (HERE / 'asset-measurements.json').write_text(json.dumps({
        'referenceCanvas': list(CANVAS),
        'referenceSHA256': hashlib.sha256(original.read_bytes()).hexdigest(),
        'assets': measurements,
    }, ensure_ascii=False, indent=2) + '\n')
    for asset in measurements:
        print(asset['slot'], asset['exportSize'], asset['visibleBoundsAlpha24'],
              round(asset['visibleHeightRatio'], 4), asset.get('centralAlphaMax', ''))


if __name__ == '__main__':
    main()
