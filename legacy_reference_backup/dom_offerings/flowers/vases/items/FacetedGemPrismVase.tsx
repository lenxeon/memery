/**
 * @file FacetedGemPrismVase.tsx
 * @description 10. 钻石晶体多面切角瓶 (现代器型)
 * 形制：现代 Low-Poly 晶体切角，多边形面光影折光，晶体多面体美学。
 */
import React from 'react';
import { VaseItemDefinition } from '../types';

export const FacetedGemPrismVase: VaseItemDefinition = {
  id: 'faceted_gem_prism',
  name: '钻石晶体切角瓶',
  category: 'designer_modern',
  categoryLabel: '现代设计',
  sourceLabel: '参考图4之2 晶体多边形',
  shapeLabel: '多面切角棱晶',
  desc: '精准几何多面切角带来钻石般的空间折射光影，Low-Poly雕塑质感，未来感十足。',
  tag: '晶体切角',
  iconText: '💎',
  accentColor: '#0284c7',
  borderColor: '#bae6fd',

  mouthAperture: 'standard',
  mouthWidth: 20,
  mouthCenter: { x: 75, y: 109 },
  vaseHeight: 86,
  spreadFactor: 1.0,

  renderMouthBack: () => (
    <g id="mouth_back_faceted_gem">
      <polygon
        points="65,109 75,109 85,109 82,106.5 75,106 67,106.5"
        fill="#140d07"
        stroke="#2a1e14"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </g>
  ),

  renderBody: () => (
    <g id="vase_faceted_gem_prism">
      <polygon points="65,109 75,109 70,140 62,136" fill="url(#crystalFacetA)" stroke="#2a1e14" strokeWidth="1.4" strokeLinejoin="round" />
      <polygon points="75,109 85,109 88,136 78,140" fill="#ffffff" stroke="#2a1e14" strokeWidth="1.4" strokeLinejoin="round" />
      <polygon points="75,109 78,140 75,152 70,140" fill="url(#crystalFacetB)" stroke="#2a1e14" strokeWidth="1.3" strokeLinejoin="round" />

      <polygon points="62,136 70,140 67,168 56,166" fill="url(#crystalFacetC)" stroke="#2a1e14" strokeWidth="1.4" strokeLinejoin="round" />
      <polygon points="70,140 75,152 78,140 82,168 74,172 67,168" fill="url(#crystalFacetA)" stroke="#2a1e14" strokeWidth="1.4" strokeLinejoin="round" />
      <polygon points="78,140 88,136 94,166 82,168" fill="url(#crystalFacetB)" stroke="#2a1e14" strokeWidth="1.4" strokeLinejoin="round" />

      <polygon points="56,166 67,168 68,192 59,192" fill="url(#crystalFacetC)" stroke="#2a1e14" strokeWidth="1.4" strokeLinejoin="round" />
      <polygon points="67,168 74,172 82,168 83,192 68,192" fill="#ffffff" stroke="#2a1e14" strokeWidth="1.4" strokeLinejoin="round" />
      <polygon points="82,168 94,166 91,192 83,192" fill="url(#crystalFacetB)" stroke="#2a1e14" strokeWidth="1.4" strokeLinejoin="round" />

      <line x1="75" y1="109" x2="70" y2="140" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="70" y1="140" x2="67" y2="168" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="74" y1="172" x2="68" y2="192" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />

      <polygon points="59,192 91,192 90,195 60,195" fill="#dfd5c5" stroke="#2a1e14" strokeWidth="1.5" />

      <polygon
        points="65,109 75,109 85,109 82,112.5 75,113 67,112.5"
        fill="#ffffff"
        stroke="#2a1e14"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </g>
  ),
};
