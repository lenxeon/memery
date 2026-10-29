from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import json,hashlib
OUT=Path(__file__).resolve().parent;ROOT=OUT.parents[2]
proof=json.loads((OUT/'verification.json').read_text())
font=ImageFont.truetype('/System/Library/Fonts/Menlo.ttc',19)
small=ImageFont.truetype('/System/Library/Fonts/Menlo.ttc',16)
color='#008d62';bg='#f3f0eb'
old=json.loads((ROOT/'artifacts/scene-theme/table-metrics-1-2-4/results.json').read_text())['results']
old={r['themeNumber']:r for r in old}
review=Image.new('RGB',(1200,660),bg)
full=Image.new('RGB',(1200,1120),bg)
for index,num in enumerate([1,4]):
 result=next(x for x in proof['results'] if x['themeId']==('classic_dawn' if num==1 else 'snow_plum_courtyard'))
 current=json.loads((ROOT/'public/themes'/result['themeId']/'manifest.json').read_text())
 before=json.loads((OUT/('reference/classic-dawn-manifest-before.json' if num==1 else 'reference/snow-plum-manifest-before.json')).read_text())
 sources=[(ROOT/'public'/before['table']['asset'] if num==1 else OUT/'reference/snow-plum-table-before.png',old[num]['corners'],old[num]['defaultScreen393x852']['sourceToScreenScale'],'BEFORE'),(ROOT/'public'/current['table']['asset'],[result['flatTopCorners'][k] for k in ['backLeft','backRight','frontRight','frontLeft']],result['scale'],'AFTER')]
 for col,(source,points,s,label) in enumerate(sources):
  im=Image.open(source).convert('RGBA');pts=points
  assert im.size==(current['table']['geometry']['sourceSize']['width'],current['table']['geometry']['sourceSize']['height']) if col==1 else True
  d=pts[3][1]-pts[0][1];length=pts[2][0]-pts[3][0]
  crop_top=max(0,min(y for x,y in pts)-35);crop_bottom=max(y for x,y in pts)+50
  strip=im.crop((0,crop_top,im.width,crop_bottom));factor=s*1.35
  strip=strip.resize((round(strip.width*factor),round(strip.height*factor)),Image.Resampling.LANCZOS)
  x=col*600+(600-strip.width)//2;y=index*330+120
  review.paste(strip,(x,y),strip);dr=ImageDraw.Draw(review)
  dr.text((col*600+25,index*330+20),f'THEME {num}  {label}',font=font,fill='#24313c')
  dr.text((col*600+25,index*330+52),f'L={length*s:.1f}  D={d*s:.1f} CSS px',font=font,fill=color)
  poly=[(x+px*factor,y+(py-crop_top)*factor) for px,py in pts];dr.line(poly+[poly[0]],fill=color,width=3)
  if col==1:
   a=im.getchannel('A');assert a.getextrema()[0]==0
   assert a.getpixel((im.width//2,im.height//2))<16,'space under apron should be transparent'
   result['assetSha256']=hashlib.sha256(source.read_bytes()).hexdigest();result['alphaRange']=a.getextrema()
   bb=current['table']['geometry']['visibleBounds'];box=(round(bb['left']*im.width),round(bb['top']*im.height),round(bb['right']*im.width),round(bb['bottom']*im.height))
   tile=im.crop(box);f=s*2.5;tile=tile.resize((round(tile.width*f),round(tile.height*f)),Image.Resampling.LANCZOS);tx=(1200-tile.width)//2;ty=index*560+100
   full.paste(tile,(tx,ty),tile);df=ImageDraw.Draw(full)
   df.text((25,index*560+15),f'THEME {num}  |  L={length*s:.1f}  D={d*s:.1f} CSS px',font=font,fill='#24313c')
   poly=[(tx+(px-box[0])*f,ty+(py-box[1])*f) for px,py in pts];df.line(poly+[poly[0]],fill=color,width=3)
 dr=ImageDraw.Draw(review);dr.line((0,index*330+328,1200,index*330+328),fill='#c9c4bd')
review.save(OUT/'before-after-tabletops.png');full.save(OUT/'updated-tables.png')
(OUT/'verification.json').write_text(json.dumps(proof,ensure_ascii=False,indent=2)+'\n')
# Refresh the latest scene4 static assembly from its current manifest.
m=json.loads((ROOT/'public/themes/snow_plum_courtyard/manifest.json').read_text())
canvas=Image.open(ROOT/'public'/m['wall']['wallpaper']['assets']['phone']).convert('RGBA')
for path in [m['wall']['wallpaperOverlays'][0]['asset'],m['wall']['roomOverlay']['asset']]:canvas.alpha_composite(Image.open(ROOT/'public'/path).convert('RGBA'))
def ground(item):
 im=Image.open(ROOT/'public'/item['asset']).convert('RGBA');s=1179*item['widthRatio']/im.width;im=im.resize((round(im.width*s),round(im.height*s)),Image.Resampling.LANCZOS)
 canvas.alpha_composite(im,(round((1179-im.width)/2),round(2556*(1-item['bottomRatio'])-im.height)))
ground(m['ground']['groundMat'])
r=next(x for x in proof['results'] if x['themeId']=='snow_plum_courtyard');im=Image.open(ROOT/'public'/r['asset']).convert('RGBA');s=r['scale']*3;im=im.resize((round(im.width*s),round(im.height*s)),Image.Resampling.LANCZOS);canvas.alpha_composite(im,(round((1179-im.width)/2),round(r['spriteOriginY']*3)))
ground(m['ground']['cushion'])
for side in ['left','right']:canvas.alpha_composite(Image.open(ROOT/'public'/m['foregroundCandidates'][side][m['defaultAssembly']['foreground'][side]['foregroundId']]['asset']).convert('RGBA'))
canvas.save(ROOT/'artifacts/scene-theme/snow_plum_courtyard/scene4-decomposition/static-assembly-preview.png')
canvas.save(OUT/'snow-plum-static-assembly.png')
for name in ['theme1-candidate-top-grid.png','theme4-candidate-top-grid.png','theme1-final-top-grid.png','theme4-final-top-grid.png','theme1-corners.png']:
 p=OUT/name
 if p.exists():p.unlink()
print('PASS: updated source alpha/dimensions; generated before/after, full-table and current scene4 assembly review images.')
