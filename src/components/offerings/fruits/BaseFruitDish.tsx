/**
 * @file BaseFruitDish.tsx
 * @description 供果高足盘基类组件：羊脂白玉描金高足花口供盘。
 * 具备严谨的 2.5D 深度分层（足座 -> 盘体凹面与盘心阴影 -> 盛放果实群组 -> 前盘唇微翘金线），
 * 确保果实稳稳端坐于盘池中心，彻底解决果实被盘身遮挡在外的物理层级错误。
 */
import React from 'react';
import { sound } from '../../../utils/audio';

interface BaseFruitDishProps {
  title: string;
  nextName: string;
  scale?: number;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  defsSlot?: React.ReactNode;
  children: React.ReactNode;
}

export const BaseFruitDish: React.FC<BaseFruitDishProps> = ({
  title,
  nextName,
  scale = 1,
  className = '',
  onClick,
  defsSlot,
  children,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playPorcelainClink();
    onClick?.(e);
  };

  return (
    <div
      onClick={handleClick}
      title={`${title} (点击切换为${nextName})`}
      className={`relative select-none cursor-pointer transition-transform hover:scale-105 active:scale-95 group ${className}`}
      style={{
        width: 108 * scale,
        height: 92 * scale,
      }}
    >
      <svg viewBox="0 0 108 92" className="w-full h-full overflow-visible">
        <defs>
          {/* 1. 羊脂白玉玉质渐变 (温润通透带暖奶白与微阴) */}
          <linearGradient id="jadePorcelainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#cfc8bb" />
            <stop offset="18%" stopColor="#e8e2d5" />
            <stop offset="45%" stopColor="#faf7f0" />
            <stop offset="70%" stopColor="#ffffff" />
            <stop offset="85%" stopColor="#ede7dc" />
            <stop offset="100%" stopColor="#bfb7a7" />
          </linearGradient>

          {/* 2. 盘心深凹内影渐变 (盛果盆底深凹与暗角) */}
          <radialGradient id="dishBasinCavity" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#dcd5c7" />
            <stop offset="65%" stopColor="#eee9de" />
            <stop offset="90%" stopColor="#f7f4ec" />
            <stop offset="100%" stopColor="#e3dcce" />
          </radialGradient>

          {/* 3. 高足托身立体柱状渐变 */}
          <linearGradient id="pedestalStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b5ac9d" />
            <stop offset="25%" stopColor="#dfd8cb" />
            <stop offset="55%" stopColor="#fdfbf7" />
            <stop offset="80%" stopColor="#dcd5c7" />
            <stop offset="100%" stopColor="#a39988" />
          </linearGradient>

          {/* 4. 描金边饰渐变 (泥金温润微光) */}
          <linearGradient id="goldRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b48332" />
            <stop offset="30%" stopColor="#f7dc8c" />
            <stop offset="60%" stopColor="#ffd875" />
            <stop offset="85%" stopColor="#e5ba55" />
            <stop offset="100%" stopColor="#9a6e24" />
          </linearGradient>

          {/* 5. 水果堆在盘内的接触环境光遮蔽阴影 */}
          <radialGradient id="fruitBasinShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a1208" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#3d2a17" stopOpacity="0.25" />
            <stop offset="80%" stopColor="#634c32" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* 专属水果道具纹理与滤镜 */}
          {defsSlot}
        </defs>

        {/* ── 层级 1：案面接触投影 (Ambient Table Shadow) ── */}
        <ellipse cx="54" cy="85" rx="44" ry="5.5" fill="#140c05" opacity="0.36" />
        <ellipse cx="54" cy="85" rx="30" ry="3.8" fill="#000000" opacity="0.25" />

        {/* ── 层级 2：高足底座 (Pedestal Base & Flared Foot) ── */}
        <g id="dishFootGroup">
          {/* 足底大圆足托 */}
          <ellipse cx="54" cy="82" rx="23" ry="4.5" fill="#a89f90" />
          <ellipse cx="54" cy="81" rx="22.5" ry="4" fill="url(#pedestalStemGrad)" stroke="#c4bcad" strokeWidth="0.5" />
          <ellipse cx="54" cy="80.6" rx="21" ry="3.3" fill="none" stroke="url(#goldRimGrad)" strokeWidth="0.8" opacity="0.85" />

          {/* 束腰柱身 (八棱形收腰线条) */}
          <path
            d="M 44 65 Q 49 73 42 80 L 66 80 Q 59 73 64 65 Z"
            fill="url(#pedestalStemGrad)"
            stroke="#b8b0a1"
            strokeWidth="0.6"
          />
          {/* 束腰凸弦金环 */}
          <path d="M 46.5 72.5 Q 54 74 61.5 72.5" stroke="url(#goldRimGrad)" strokeWidth="1.2" fill="none" />
          <path d="M 46 73.2 Q 54 74.8 62 73.2" stroke="#ffffff" strokeWidth="0.5" fill="none" opacity="0.8" />
        </g>

        {/* ── 层级 3：玉盘外腹与盘内凹槽底托 (Dish Basin & Interior) ── */}
        <g id="dishBasinGroup">
          {/* 盘底外壁立体承托弧面 */}
          <path
            d="M 8 59 Q 54 74 100 59 L 98 62 Q 54 77 10 62 Z"
            fill="#b5ac9d"
          />
          {/* 盘体外主轮廓大椭圆 */}
          <ellipse cx="54" cy="58.5" rx="46.5" ry="13" fill="url(#jadePorcelainGrad)" stroke="#b8b0a0" strokeWidth="0.8" />
          
          {/* 盘沿内壁凹池 (果实坐落的深凹区域) */}
          <ellipse cx="54" cy="57.5" rx="43" ry="10.8" fill="url(#dishBasinCavity)" stroke="#d2c9bc" strokeWidth="0.6" />
          
          {/* 盘底内凹中心 (深度感渐进) */}
          <ellipse cx="54" cy="58" rx="35" ry="8" fill="#e2dad0" opacity="0.7" />

          {/* 水果堆在盘底投下的深层接地阴影 (Fruit Nesting Shadow) */}
          <ellipse cx="54" cy="57" rx="36" ry="7.5" fill="url(#fruitBasinShadow)" />
        </g>

        {/* ── 层级 4：水果堆叠金字塔内容插槽 (Fruit Pyramid Slot) ── */}
        {/* 水果稳稳端坐于盘心，底部深入盘池内 */}
        <g id="fruitContentLayer" transform="translate(2, 0)">
          {children}
        </g>

        {/* ── 层级 5：前沿浅盘微翘包边与描金流光 (Front Rim & Gold Lip) ── */}
        {/* 仅勾勒托盘前沿 180° 下半弧的立体唇口与泥金边饰，绝不阻挡果身，让果子温润坐卧其内 */}
        <g id="frontRimLip" pointerEvents="none">
          {/* 盘前唇外沿反光弧线 */}
          <path
            d="M 7.5 58.5 C 16 68.5, 92 68.5, 100.5 58.5"
            fill="none"
            stroke="url(#goldRimGrad)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* 盘前唇微光修边 (羊脂玉质光泽) */}
          <path
            d="M 12 59.5 C 24 67.5, 84 67.5, 96 59.5"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.8"
          />
          {/* 盘口最前端的晶莹聚光 */}
          <path
            d="M 40 65.2 Q 54 66.2 68 65.2"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.95"
          />
        </g>
      </svg>
    </div>
  );
};
