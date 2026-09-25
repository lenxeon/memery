/** 唐鲁山窑花釉瓷壶神韵花器：短颈鼓腹、高弓柄与天蓝月白熔斑。 */
import { VaseItemDefinition } from '../types';

export const TangLushanSplashedGlazeVase: VaseItemDefinition = {
  id: 'tang_lushan_splashed_glaze', name: '唐鲁山月斑花釉壶', category: 'sculptural_unique', categoryLabel: '唐风名器',
  sourceLabel: '神似 · 鲁山窑花釉瓷壶', shapeLabel: '短颈鼓腹月斑流釉',
  desc: '深玄褐釉短颈壶上，天蓝与月白花斑沿鼓腹熔流，高弓柄拉出沉雄侧影。',
  tag: '月斑花瓷', iconText: '月', accentColor: '#537f96', borderColor: '#cfdbc9',
  mouthAperture: 'standard', mouthWidth: 17, mouthCenter: { x: 73, y: 111 }, vaseHeight: 84, spreadFactor: 1.0,

  renderMouthBack: () => `
<g id="mouth_back_tang_lushan_splashed_glaze">
  <ellipse cx="73" cy="111" rx="8.5" ry="2.5" fill="#0b0d0c"/>
  <path d="M64.5 111 C65 108.3 81 108.3 81.5 111" stroke="#8e9e9e" stroke-width="1.35" fill="none"/>
</g>`,

  renderBody: () => `
<g id="vase_tang_lushan_splashed_glaze">
  <!-- 高弓柄先置后，强调唐代浇壶的提携结构 -->
  <path d="M84 125 C105 123 111 142 106 159 C102 172 94 178 87 181" fill="none" stroke="#171817" stroke-width="8" stroke-linecap="round"/>
  <path d="M84 125 C100 127 104 141 101 156 C99 166 93 171 88 174" fill="none" stroke="#526f78" stroke-width="2.2" stroke-linecap="round" opacity="0.78"/>
  <clipPath id="clipTangLushanSplash"><path d="M64.5 111 Q73 113.8 81.5 111 L82 126 C94 133 100 145 99 160 C98 178 91 188 85 191 L89 195 L57 195 L61 191 C55 188 48 178 47 160 C46 145 52 133 64 126 Z"/></clipPath>
  <path d="M64.5 111 Q73 113.8 81.5 111 L82 126 C94 133 100 145 99 160 C98 178 91 188 85 191 L89 195 L57 195 L61 191 C55 188 48 178 47 160 C46 145 52 133 64 126 Z" fill="url(#tangLushanDarkGlazeGrad)" stroke="#0e100f" stroke-width="1.7"/>
  <g clip-path="url(#clipTangLushanSplash)">
    <!-- 花斑边缘必须柔化，像熔入底釉而非贴上去的圆点 -->
    <ellipse cx="62" cy="142" rx="17" ry="13" fill="url(#tangLushanBlueSplashGrad)" transform="rotate(-19 62 142)" opacity="0.96"/>
    <ellipse cx="86" cy="158" rx="18" ry="24" fill="url(#tangLushanBlueSplashGrad)" transform="rotate(23 86 158)" opacity="0.82"/>
    <ellipse cx="61" cy="181" rx="12" ry="9" fill="url(#tangLushanBlueSplashGrad)" transform="rotate(11 61 181)" opacity="0.72"/>
    <path d="M42 191 C53 165 69 139 104 119 L107 139 C82 154 70 179 66 199 Z" fill="url(#tangLushanSheenGrad)" opacity="0.72"/>
    <path d="M57 128 C59 120 64 115 70 114" stroke="#fff5d1" stroke-width="1.45" opacity="0.66" fill="none" stroke-linecap="round"/>
    <path d="M53 153 C59 159 66 159 72 154 M77 176 C84 181 91 179 96 173" stroke="#c8edf2" stroke-width="0.85" opacity="0.58" fill="none"/>
  </g>
  <path d="M56 190 Q73 194 90 190 L91 195 Q73 198 55 195 Z" fill="#202421" stroke="#0e100f" stroke-width="1.2"/>
  <path d="M64.5 111 Q73 114 81.5 111 C81 114.3 65 114.3 64.5 111 Z" fill="#3b4441" stroke="#0e100f" stroke-width="1.15"/>
  <path d="M66 111.2 Q73 113.2 80 111.2" stroke="#d9e6dc" stroke-width="0.85" opacity="0.82" fill="none"/>
</g>`,
};
