from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import json, math, hashlib

OUT=Path(__file__).resolve().parent
ROOT=OUT.parents[2]
INPUT=json.loads((OUT/'measurements.json').read_text())
LAYOUTS={x['themeId']:x for x in json.loads((OUT/'runtime-layouts.json').read_text())}
FONT='/System/Library/Fonts/Menlo.ttc'
font=ImageFont.truetype(FONT,20)
small=ImageFont.truetype(FONT,17)
title=ImageFont.truetype(FONT,26)
green='#008d62';pink='#ce438e';ink='#25313c';bg='#f3f0eb'
results=[]
comparison=Image.new('RGB',(1200,1650),bg)
top_comparison=Image.new('RGB',(1200,840),bg)

def area(poly):
 return abs(sum(poly[i][0]*poly[(i+1)%4][1]-poly[(i+1)%4][0]*poly[i][1] for i in range(4)))/2

def overlay(draw,poly,color,width=3):
 draw.line(poly+[poly[0]],fill=color,width=width)
 for x,y in poly:draw.ellipse((x-4,y-4,x+4,y+4),fill=color)

for index,sample in enumerate(INPUT['samples']):
 key=sample['themeId'];layout=LAYOUTS[key]
 manifest_path=(OUT/sample['manifestSnapshot']).resolve() if sample.get('manifestSnapshot') else ROOT/'public/themes'/key/'manifest.json'
 manifest=json.loads(manifest_path.read_text());t=manifest['table']
 source=(OUT/sample['assetSnapshot']).resolve() if sample.get('assetSnapshot') else ROOT/'public'/t['asset']
 im=Image.open(source).convert('RGBA');W,H=im.size
 assert (W,H)==(t['geometry']['sourceSize']['width'],t['geometry']['sourceSize']['height'])
 p=sample['corners'];bl,br,fr,fl=p
 back=math.dist(bl,br);front=math.dist(fl,fr);depth=((fr[1]+fl[1])-(bl[1]+br[1]))/2
 scale=layout['scale'];left_angle=math.degrees(math.atan2(depth,bl[0]-fl[0]));right_angle=math.degrees(math.atan2(depth,fr[0]-br[0]))
 q=t['surface']['assetQuad'];jpoly=[[q[k]['x']*W,q[k]['y']*H] for k in ['backLeft','backRight','frontRight','frontLeft']]
 jback=math.dist(jpoly[0],jpoly[1]);jfront=math.dist(jpoly[3],jpoly[2]);jdepth=(jpoly[2][1]+jpoly[3][1]-jpoly[0][1]-jpoly[1][1])/2
 uncertainty=INPUT['cornerUncertaintyPx']
 result={**sample,'asset':t['asset'],'sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'sourceSize':[W,H],
  'measuredPng':{'frontLengthPx':front,'backLengthPx':back,'projectedDepthPx':depth,'backFrontRatio':back/front,'depthFrontRatio':depth/front,'projectedAreaPx2':area(p),'leftDepthEdgeScreenAngleDeg':left_angle,'rightDepthEdgeScreenAngleDeg':right_angle},
  'defaultScreen393x852':{'frontLengthCssPx':front*scale,'backLengthCssPx':back*scale,'projectedDepthCssPx':depth*scale,'projectedAreaCssPx2':area(p)*scale**2,'visibleTableWidthCssPx':layout['tableWidth'],'sourceToScreenScale':scale},
  'uncertainty':{'cornersPlusMinusSourcePx':uncertainty,'depthRatioConservativeRange':[(depth-2*uncertainty)/(front+2*uncertainty),(depth+2*uncertainty)/(front-2*uncertainty)]},
  'jsonDeclared':{'corners':jpoly,'frontLengthPx':jfront,'backLengthPx':jback,'projectedDepthPx':jdepth,'backFrontRatio':jback/jfront,'depthFrontRatio':jdepth/jfront,'geometryDepthPx':(t['geometry']['frontEdgeY']-t['geometry']['backEdgeY'])*H},
  'trueCameraPitchDeg':None,'truePhysicalLengthAndDepth':None}
 results.append(result)
 # Pixel-coordinate evidence: green measured flat top, pink manifest quad.
 evidence=Image.new('RGBA',im.size,(236,239,242,255));evidence.alpha_composite(im);evidence=evidence.convert('RGB');d=ImageDraw.Draw(evidence)
 overlay(d,jpoly,pink,3);overlay(d,p,green,3)
 for label,(x,y) in zip(['BL','BR','FR','FL'],p):
  lx=x+8 if label.endswith('L') else x-145
  d.rectangle((lx,y+5,lx+140,y+28),fill='#f3f0eb');d.text((lx+2,y+6),f'{label} {x},{y}',font=small,fill=green)
 y0=max(0,int(min(min(x[1] for x in p),min(x[1] for x in jpoly)))-50);y1=int(max(max(x[1] for x in p),max(x[1] for x in jpoly))+60)
 evidence=evidence.crop((0,y0,W,min(H,y1)))
 evidence.save(OUT/f'theme-{sample["themeNumber"]}-measured-top.png')
 # Compare at the actual default phone scale, enlarged uniformly 2.5x for reading.
 factor=scale*2.5;bounds=t['geometry']['visibleBounds'];crop_box=(round(bounds['left']*W),round(bounds['top']*H),round(bounds['right']*W),round(bounds['bottom']*H))
 crop=im.crop(crop_box);crop=crop.resize((round(crop.width*factor),round(crop.height*factor)),Image.Resampling.LANCZOS)
 row=index*550;ox=(1200-crop.width)//2;oy=round(row+115-(bl[1]-crop_box[1])*factor)
 comparison.paste(crop,(ox,oy),crop)
 d=ImageDraw.Draw(comparison)
 d.text((30,row+14),f'THEME {sample["themeNumber"]}  /  {key}',font=title,fill=ink)
 d.text((30,row+52),f'Flat top: {front*scale:.1f} x {depth*scale:.1f} CSS px   |   depth/length: {depth/front:.2%}',font=font,fill=green)
 poly=[(ox+(x-crop_box[0])*factor,oy+(y-crop_box[1])*factor) for x,y in p];overlay(d,poly,green,4)
 d.text((30,row+506),f'Back/front: {back/front:.3f}  |  side edge screen angle: {(left_angle+right_angle)/2:.1f} deg (NOT camera pitch)',font=small,fill=ink)
 d.line((20,row+546,1180,row+546),fill='#c9c4bd',width=1)
 # Flat tabletop strip comparison, still at actual common viewport scale.
 top_row=index*280;top_box=(0,max(0,int(min(v[1] for v in p))-28),W,int(max(v[1] for v in p))+35)
 strip=im.crop(top_box);strip=strip.resize((round(strip.width*factor),round(strip.height*factor)),Image.Resampling.LANCZOS)
 sx=(1200-strip.width)//2;sy=top_row+90
 top_comparison.paste(strip,(sx,sy),strip);dt=ImageDraw.Draw(top_comparison)
 dt.text((30,top_row+12),f'THEME {sample["themeNumber"]}  |  L={front*scale:.1f}   D={depth*scale:.1f} CSS px   D/L={depth/front:.2%}',font=font,fill=ink)
 tpoly=[(sx+x*factor,sy+(y-top_box[1])*factor) for x,y in p];overlay(dt,tpoly,green,4)
 dt.line((20,top_row+277,1180,top_row+277),fill='#c9c4bd')

payload={'method':INPUT['method'],'cameraNote':'Screen edge slant is directly measurable. True camera pitch and physical tabletop dimensions cannot be uniquely recovered from these uncalibrated PNGs. No camera-angle assumption was imposed.','referenceCanvas':INPUT['canvas'],'forward':0,'results':results}
(OUT/'results.json').write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n')
comparison.save(OUT/'tables-comparison.png');top_comparison.save(OUT/'tabletops-comparison.png')
headers=['theme','table_front_css_px','table_depth_css_px','back_front_ratio','depth_front_ratio','left_screen_edge_deg','right_screen_edge_deg','png_front_px','png_back_px','png_depth_px','json_front_px','json_depth_px','geometry_depth_px']
rows=[','.join(headers)]
for r in results:
 a=r['measuredPng'];s=r['defaultScreen393x852'];j=r['jsonDeclared']
 vals=[r['themeNumber'],s['frontLengthCssPx'],s['projectedDepthCssPx'],a['backFrontRatio'],a['depthFrontRatio'],a['leftDepthEdgeScreenAngleDeg'],a['rightDepthEdgeScreenAngleDeg'],a['frontLengthPx'],a['backLengthPx'],a['projectedDepthPx'],j['frontLengthPx'],j['projectedDepthPx'],j['geometryDepthPx']]
 rows.append(','.join(str(round(v,5)) if isinstance(v,float) else str(v) for v in vals))
 print(rows[-1])
(OUT/'results.csv').write_text('\n'.join(rows)+'\n')
ref1=results[0]['defaultScreen393x852'];ref2=results[1]['defaultScreen393x852'];current=results[2]['defaultScreen393x852']
print('Theme4 depth vs theme1/theme2:',current['projectedDepthCssPx']/ref1['projectedDepthCssPx'],current['projectedDepthCssPx']/ref2['projectedDepthCssPx'])
print('Theme4 projected area vs theme1/theme2:',current['projectedAreaCssPx2']/ref1['projectedAreaCssPx2'],current['projectedAreaCssPx2']/ref2['projectedAreaCssPx2'])
assert results[2]['uncertainty']['depthRatioConservativeRange'][1] < .05
print('PASS: source dimensions and measured geometry checked; theme4 remains below minimum depth-ratio threshold even at the corner uncertainty bound.')
