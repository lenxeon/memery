import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getSceneCompositionWidth } from '../../../src/pixi/scene/SceneViewportLayout.ts';
import { getSceneThemeAltarTableMetrics } from '../../../src/pixi/layers/table/MingAltarTableSpec.ts';
const dir=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(dir,'../../..');
const result=[];
for(const number of [1,4]){
 const measured=JSON.parse(await readFile(path.join(dir,`theme${number}-measurement.json`),'utf8'));
 const manifest=JSON.parse(await readFile(path.join(root,'public/themes',measured.themeId,'manifest.json'),'utf8'));
 const t=manifest.table;
 const width=getSceneCompositionWidth(393,852)*t.position.widthRatio;
 const metrics=getSceneThemeAltarTableMetrics(t,width);
 const scale=metrics.spriteWidth/t.geometry.sourceSize.width;
 assert.ok(Math.abs(scale-metrics.spriteHeight/t.geometry.sourceSize.height)<1e-10,'uniform scale');
 const q=t.surface.assetQuad;
 assert.equal(q.frontLeft.y,t.geometry.frontEdgeY);
 assert.equal(q.frontRight.y,t.geometry.frontEdgeY);
 assert.equal(q.backLeft.y,t.geometry.backEdgeY);
 assert.equal(q.backRight.y,t.geometry.backEdgeY);
 const sourceLength=(q.frontRight.x-q.frontLeft.x)*t.geometry.sourceSize.width;
 const sourceBack=(q.backRight.x-q.backLeft.x)*t.geometry.sourceSize.width;
 const sourceDepth=(q.frontLeft.y-q.backLeft.y)*t.geometry.sourceSize.height;
 const length=sourceLength*scale, depth=sourceDepth*scale;
 assert.ok(Math.abs(depth-31.4)<0.001,`${number}: depth ${depth}`);
 if(number===1)assert.ok(Math.abs(length-329.8)<=2,`theme1 length ${length}`);
 assert.ok(Math.abs(sourceDepth/sourceLength-.0952)<=.003,'depth ratio vs target');
 assert.ok(Math.abs(sourceBack/sourceLength-.856)<=.015,'back/front ratio');
 for(const [key,point] of Object.entries(q)){
  assert.ok(Math.abs(point.x*t.geometry.sourceSize.width-measured.flatTopCorners[key][0])<1e-8);
  assert.ok(Math.abs(point.y*t.geometry.sourceSize.height-measured.flatTopCorners[key][1])<1e-8);
 }
 for(const offering of Object.values(manifest.defaultAssembly.offerings)){
  const {u,v}=offering.position,a=t.surface.usableArea;
  assert.ok(u>=a.uMin&&u<=a.uMax&&v>=a.vMin&&v<=a.vMax);
 }
 const originY=852*(1-t.position.bottomRatio)-t.geometry.footBottomY*t.geometry.sourceSize.height*scale;
 result.push({...measured,actualDefaultLengthCssPx:length,actualDefaultBackLengthCssPx:sourceBack*scale,actualDefaultDepthCssPx:depth,depthLengthRatio:sourceDepth/sourceLength,backFrontRatio:sourceBack/sourceLength,scale,tableWidth:width,spriteOriginY:originY,metrics});
}
const lotus=JSON.parse(await readFile(path.join(root,'public/themes/lotus_serenity/manifest.json'),'utf8'));
const before=JSON.parse(await readFile(path.join(dir,'reference/classic-dawn-manifest-before.json'),'utf8'));
assert.deepEqual(lotus.table,before.table,'theme3 must retain its original table definition');
await writeFile(path.join(dir,'verification.json'),JSON.stringify({referenceCanvas:{width:393,height:852},forward:0,results:result,theme3TableUnchanged:true},null,2)+'\n');
console.log('PASS: themes1/4 measured source quads and runtime geometry agree; both depths31.4; theme1 length within2px; plane ratios and offering bounds valid; theme3 table unchanged.');
