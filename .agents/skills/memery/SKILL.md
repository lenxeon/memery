---
name: memery
description: 虚拟线上祭祀祈福台（Memery）架构开发规范指南。涵盖 5 大领域分层、基于基类与注册表（Base-Registry）的扩展规范、纯 Canvas 游戏化架构（PixiJS 8）、技术改造防篡改 1:1 像素级还原铁律与 Git 提交纪律。
---

# Memery 线上祈福祭祀台架构与开发规范

本项目是一个基于 React 18 + TypeScript + Vite + Tailwind CSS + Lucide Icons 构建的现代唯美、庄重且富有禅意的虚拟线上祭祀祈福平台。

---

## 1. 核心架构与目录分层（5 大领域规范）

项目根组件位于 `src/App.tsx`，所有视觉与交互组件严格组织在 `src/components/` 的 5 大核心领域目录中，严禁平铺或职责混淆：

```
src/
├── components/
│   ├── scene/            # 【场景领域】祭坛宏观空间（供台、地板、遗照像框、背景墙系统）
│   │   ├── AltarTable.tsx        # 核心供桌基座与插槽布局
│   │   ├── FloorPlanks.tsx       # 禅意大理石方砖与沉香实木地板双风格系统
│   │   ├── MemorialPortrait.tsx  # 纪念遗像框与贡香环绕
│   │   └── walls/                # 动态背景墙多风格系统（BaseWall + Registry）
│   ├── offerings/        # 【供品摆件领域】所有供桌摆件与交互物（细分独立目录）
│   │   ├── candle/               # 祈福蜡烛与烛光粒子
│   │   ├── censer/               # 香炉、三炷香与袅袅香烟粒子
│   │   ├── bouquet/              # 献花束展示
│   │   ├── tea_cups/             # 敬茶三杯与茶气
│   │   ├── singing_bowl/         # 颂钵敲击与音波震动
│   │   ├── fruits/               # 水果盘系统（BaseFruitDish + 多果品扩展）
│   │   ├── flowers/              # 左右花瓶系统（BaseVase + 多花卉扩展）
│   │   └── tablecloth/           # 供桌台布系统（BaseTablecloth + 多纹理扩展）
│   ├── effects/          # 【光影环境特效】氛围光与全屏粒子
│   │   ├── VolumetricRays.tsx    # 丁达尔晨曦天光射线
│   │   ├── DustMotes.tsx         # 悬浮尘埃微粒动画
│   │   └── PetalShower.tsx       # 飘落花瓣粒子流
│   ├── settings/         # 【设置与弹窗交互】供品切换与祈福表单
│   │   ├── EnvironmentDrawer.tsx # 环境与风格侧边配置抽屉
│   │   ├── BlessingModal.tsx     # 祈福留言弹窗
│   │   ├── FlowerPickerModal.tsx # 献花与鲜花挑选弹窗
│   │   └── MemorialEditModal.tsx # 纪念对象信息编辑弹窗
│   ├── controls/         # 【控制台与辅助监控】
│   │   ├── BottomDock.tsx        # 底部悬浮快捷交互控制坞
│   │   └── FpsMonitor.tsx        # 渲染帧率监控器
│   └── index.ts          # 全局统一导出入口
├── game/                 # 【游戏引擎/状态领域】实体生命周期、工厂与主循环
│   ├── entities/         # 各摆件对应的实体渲染与交互封装
│   ├── factories/        # 物品抽象工厂
│   ├── lifecycle/        # useWorldLoop 帧循环调度
│   └── types/            # 实体类型定义
├── types.ts              # 全局数据模型（供品类型、时间段、纪念对象等）
└── utils/
    └── audio.ts          # Web Audio API 纯原生合成音效库（颂钵、木鱼、水滴等）
```

---

## 2. 模块扩展规范：Base + Registry 模式

对于所有**支持多风格/多品类切换**的物件（背景墙、桌布、水果、花卉），必须遵循 `Base + Registry` 派生与注册规范，严禁把所有风格写在单个大文件的 switch-case 中。

### 2.1 新增背景墙风格
1. **基类定义**：继承 `src/components/scene/walls/BaseWall.tsx`，利用其注入的通用景深渐变、晨昏光晕和统一阴影。
2. **编写子类**：在 `src/components/scene/walls/styles/` 下新建 `[Name]Wall.tsx`，实现特定壁饰、花格窗、卷轴或浮雕。
3. **注册挂载**：在 `src/components/scene/walls/registry.tsx` 中导入并在 `WALL_REGISTRY` 映射中注册。
4. **扩展枚举**：若需新类型，在 `src/types.ts` 中更新 `WallStyle` 联合类型。

### 2.2 新增水果品类
1. **基类定义**：继承 `src/components/offerings/fruits/BaseFruitDish.tsx`，统一使用青花瓷/铜盘基座、高光反射和阴影。
2. **编写子类**：在 `src/components/offerings/fruits/items/` 下新建 `[Fruit]Fruit.tsx`，编写对应 SVG 几何形体与堆叠逻辑。
3. **注册挂载**：在 `src/components/offerings/fruits/registry.ts` 的 `FRUIT_REGISTRY` 中注册该水果组件及中文名称。

### 2.3 新增花卉/花瓶样式
1. **基类定义**：继承 `src/components/offerings/flowers/BaseVase.tsx`，获得自适应花瓶瓶身、阴影与叶片衬底。
2. **编写子类**：在 `src/components/offerings/flowers/items/` 下新建 `[Flower]Flower.tsx`，绘制花瓣与绽放状态。
3. **注册挂载**：在 `src/components/offerings/flowers/registry.tsx` 的 `FLOWER_REGISTRY` 中注册。

### 2.4 新增供桌桌布风格
1. **基类定义**：继承 `src/components/offerings/tablecloth/BaseTablecloth.tsx`，统一垂褶、流苏与阴影比例。
2. **编写子类**：在 `src/components/offerings/tablecloth/styles/` 下新建 `[Style]Tablecloth.tsx`。
3. **注册挂载**：在 `src/components/offerings/tablecloth/registry.tsx` 的 `TABLECLOTH_REGISTRY` 中注册。

---

## 3. 音效与禅意背景音乐规范 (`src/utils/audio.ts`)

- **纯原生算法合成**：全部音效与长效背景音乐均通过浏览器原生 `Web Audio API`（`AudioContext`）算法合成，不依赖任何外部音频资产网络请求，确保 100% 离线可用、无版权争议、无卡顿加载延迟。
- **4 大禅意背景音乐乐章 (BGM)**：
  - `singing_bowl`：《空灵钵韵 · 528Hz》—— 528Hz 疗愈泛音和声声底与周期性空灵磬钟余音。
  - `bamboo_wind`：《幽篁清风 · 甘露竹影》—— 竹林微风沙沙、清泉甘露水滴、悠远沉稳木鱼（绝配【古朴苍然】风格）。
  - `temple_bell`：《晨钟暮鼓 · 远山梵音》—— 名山古刹深远大钟、低频庄严共鸣。
  - `pentatonic_zither`：《五音琴韵 · 高山流水》—— 中国传统五声音阶（宫商角徵羽）古琴算法弹奏。
- **交互离散音效**：
  - `playSingingBowl()`：528Hz 铜磬击打与余音震颤。
  - `playBell()`：空灵清音泛音点触。
  - `playPorcelainClink()`：敬茶瓷器碰杯清脆声。
  - `playMatchStrike()` / `playExtinguish()`：点烛火柴与微风吹熄。
  - `playWoodPlacement()`：置物沉实木质声。

---

## 4. 文件注释与见名知意规范

本项目所有源码文件必须在首部添加规范 JSDoc 说明，格式统一如下：

```typescript
/**
 * @file [文件名及后缀]
 * @description [一句话清晰简述该模块的职责与用处，注明其所属领域]
 */
```

示例：
```typescript
/**
 * @file AltarTable.tsx
 * @description 供桌核心舞台容器，负责管理案台插槽网格、物品摆放布局及木纹底座渲染。
 */
```

---

## 5. 全场景纯 Canvas 游戏化架构规范（PixiJS 8 管线）

为了彻底保护平台美术资产不被竞品爬虫抄袭，同时提供 60FPS+ 的高刷新率粒子与光影表现，纪念馆主舞台全面推行**纯 Canvas 游戏化架构**：

1. **主舞台 100% Canvas 闭环，严禁裸露 DOM SVG**：
   - 纪念馆主场景（背景墙、地板踢脚线、供桌案台、织锦桌布与围幔、全部供品摆件、香烟粒子、烛火动效、晨曦丁达尔光线、飘落花瓣等）**全部在 Canvas 内部完成 GPU 渲染**。
   - 网页 DOM 树中禁止残留任何可被竞品直接抓取或复制的明文 SVG 道具代码。
2. **React 与 Canvas 职责边界**：
   - **React (TSX)**：严格限定用于主舞台外部的 HUD 交互系统（顶部标题栏、底部悬浮操作坞 BottomDock、环境配置抽屉 EnvironmentDrawer、献花/换果/编辑弹窗 Modal、用户鉴权等）。
   - **PixiJS (Canvas / WebGL)**：接管主视口内的全部场景空间、实体对象渲染、光影着色与物理微动效。

---

## 6. 技术改造与资产迁移铁律（防止篡改与 1:1 像素级还原规范）

在将组件从 DOM/SVG 架构迁移或重构至 Canvas/PixiJS 渲染管线时，必须严格遵守以下铁律：

### 6.1 铁律一：技术重构（Refactoring）定义与红线
* **定义**：技术改造的本质是**“在保持原有视觉呈现、艺术质感与交互体验 100% 不变的前提下，重构内部实现机制与渲染引擎”**。
* **绝对红线**：严禁借“技术重构”之名，擅自修改美术设定、造型比例或色彩搭配。严禁开发人员凭借主观“脑补”或“想象”重新手写设计资产！

### 6.2 铁律二：原版组件为唯一真理源（Single Source of Truth）
* 所有进入 Canvas 贴图管线（`TexturePipeline`）的矢量几何与渐变色标，**必须 100% 提取自 `src/components/offerings/` 与 `src/components/scene/` 下经过反复调优的原版组件代码**：
  - **蜡烛**：必须严格继承 `CandleItem.tsx` 的温润象牙白蜡身（`#d5cebd` ~ `#fff7e0` ~ `#ded5be`）、流淌烛泪与内凹融蜡油池。**绝对严禁私自改为大红蜡烛，严禁擅自添加青铜底座**。
  - **香炉**：必须严格复刻 `CenserItem.tsx` 的素雅青瓷釉色（`censerGlazeG` `#d2cdc3` ~ `#f4efe6` ~ `#beb5a6`）与平整底足。**绝对严禁擅自画成青铜三足兽耳鼎**。
  - **茶盅**：必须严格复刻 `TeaCupsItem.tsx` 的紫檀雕花金边托盘（`rosewoodTrayGrad`）与三盏描金白瓷清茶。**绝对严禁擅自改为青瓷盖碗**。
  - **供桌与桌布**：必须严格采用 `AltarTableSvg.tsx` 与各款 `Tablecloth` 主题的万字回纹、金丝流苏与雕花案面。

### 6.3 铁律三：动态粒子与物理母体的数学吸附对齐
* 粒子动效（烛火、香烟、茶盅热气等）从组件中抽离至独立图层渲染时，**必须与物理母体的真实几何锚点实现数学级严密绑定**：
  - 烛火底部的幽蓝燃烧基底必须 0 误差吸附在蜡烛棉芯顶端，随健康度/高度融化自适应下沉，**严禁添加任意魔法偏移量导致火头脱壳、悬空漂浮**。
  - 香烟必须严格从香柱燃点（微红香火星）升起，随风力产生拉格朗日流体质点飘散。

---

## 7. 交付与 Git 提交红线纪律

* **未获认可前严禁提交 Git**：在技术改造或架构重构过程中，**在没有跑通一个与原版 100% 严丝合缝、完全达到视觉预期的初始结果，并获得用户明确验收认可之前，绝对不要向 Git 提交任何 commit 或 push**。
* **自检核验流程**：每次渲染重构必须比对原版截图，核验物件形态、颜色、光影、阴影及动态对齐，确保不退化、不走样、不擅改。
