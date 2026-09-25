/**
 * @file AgreementPanel.tsx
 * @description 《暖念》产品立意、社会价值与用户使用协议声明弹窗组件。
 * 承载：
 * 1. 严肃的产品立意与逝者追思定位（杜绝迷信、以光引思）；
 * 2. 倡导绿色文明低碳祭扫的社会意义；
 * 3. 拒绝过度商业化、彻底杜绝单道具微交易的纯净收费声明；
 * 4. 99元/年与19元/月的长青守护订阅细则（符合 Apple 3.1.2 规范）。
 */
import { useDialogContext } from '../common/dialog';
import React, { useState } from 'react';
import { ShieldCheck, Heart, Sparkles, X, BookOpen, ExternalLink, Leaf, Scale, Lock, Users, ShieldAlert, CheckCircle2, Flower2, Landmark, ScrollText } from 'lucide-react';
import { ChineseCornerOrnaments, ChineseCloudDivider, CinnabarSealBadge } from '../common/ChineseDecorations';
import { sound } from '../../utils/audio';

export interface AgreementPanelProps {
}

export const AgreementPanel: React.FC<AgreementPanelProps> = ({
}) => {
  // 关闭动作由通用弹窗系统注入，本面板只处理自身内容
  const { close } = useDialogContext();
  const [activeSection, setActiveSection] = useState<'all' | 'intent' | 'social' | 'commercial' | 'safety' | 'rules'>('all');
  return (
    <div 
      className="w-full max-w-3xl max-h-[90vh] flex flex-col bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 rounded-3xl border border-amber-500/50 shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-stone-200 overflow-hidden relative ring-1 ring-amber-400/20"
      onClick={(e) => e.stopPropagation()}
    >
      <ChineseCornerOrnaments />

      {/* 关闭按钮：固定于弹窗右上角 */}
      <button
        type="button"
        onClick={close}
        className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-amber-500/30 text-stone-400 hover:text-amber-200 flex items-center justify-center cursor-pointer transition-all active:scale-95"
      >
        <X size={16} />
      </button>

      {/* ── 弹窗顶栏 ── */}
      <div className="flex items-center justify-between px-5 sm:px-6 pt-5 pb-3 border-b border-amber-500/30 shrink-0 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
            <ShieldCheck size={20} />
          </div>
          <div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-amber-100 tracking-wide">
                《暖念》立意、社会价值与服务声明
                <CinnabarSealBadge text="官方公约" className="inline-flex align-middle ml-2" />
              </h3>
              <p className="text-[12px] sm:text-[11px] text-stone-400 mt-0.5">
                版本号：2026-V1.0 ｜ 秉持庄严敬畏 · 坚守透明公约
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/agreement.html"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1 text-[12px] sm:text-[11px] text-amber-400/80 hover:text-amber-300 px-2.5 py-1 rounded-lg bg-stone-900 border border-amber-500/30 hover:border-amber-400/50 transition-colors"
            title="在独立网页标签中打开"
          >
            <ExternalLink size={12} />
            <span>网页版</span>
          </a>
        </div>
      </div>

      {/* ── 快速章节导览过滤 ── */}
      <div className="flex items-center gap-1.5 px-5 sm:px-6 py-2.5 bg-stone-950/60 border-b border-amber-500/20 shrink-0 overflow-x-auto custom-scrollbar text-[13px] sm:text-xs">
        <button
          type="button"
          onClick={() => setActiveSection('all')}
          className={`px-3 py-1 rounded-full cursor-pointer transition-all shrink-0 font-medium ${
            activeSection === 'all'
              ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          全文浏览
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('intent')}
          className={`px-3 py-1 rounded-full cursor-pointer transition-all shrink-0 flex items-center gap-1 ${
            activeSection === 'intent'
              ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Heart size={12} />
          <span>一、立意与初心</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('social')}
          className={`px-3 py-1 rounded-full cursor-pointer transition-all shrink-0 flex items-center gap-1 ${
            activeSection === 'social'
              ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Leaf size={12} />
          <span>二、社会价值</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('commercial')}
          className={`px-3 py-1 rounded-full cursor-pointer transition-all shrink-0 flex items-center gap-1 ${
            activeSection === 'commercial'
              ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Scale size={12} />
          <span>三、收费公约</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('safety')}
          className={`px-3 py-1 rounded-full cursor-pointer transition-all shrink-0 flex items-center gap-1 ${
            activeSection === 'safety'
              ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Lock size={12} />
          <span>四、无公祭·纯私人空间</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('rules')}
          className={`px-3 py-1 rounded-full cursor-pointer transition-all shrink-0 flex items-center gap-1 ${
            activeSection === 'rules'
              ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <BookOpen size={12} />
          <span>五、合规守则</span>
        </button>
      </div>

      {/* ── 正文内容滚动区 ── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-7 space-y-6 text-[15px] sm:text-sm text-stone-300 leading-relaxed">
        
        {/* 一、前言与产品立意 */}
        {(activeSection === 'all' || activeSection === 'intent') && (
          <section className="space-y-3">
            <h4 className="text-[17px] sm:text-base font-serif font-bold text-amber-200 flex items-center gap-2 border-l-2 border-amber-400 pl-2.5">
              一、前言与产品立意：让思念有归处，让爱意恒长温
            </h4>
            <p>
              <strong>《暖念》</strong>是由开发团队怀着对生命的崇高敬畏、对至亲的至诚之念而打造的<strong>数字化思念与东方静心场景模拟平台</strong>。本产品的核心定位与专一使命，是为用户提供一个体面、肃穆、温暖且私密的空间，用于<strong>缅怀已故亲人、追思逝去挚爱、寄托对故人的未尽深情</strong>。
            </p>
            <p>
              我们坚信：<strong>死亡并非生命的真正终点，遗忘才是</strong>。面对至亲离去，传统悼念往往受限于物理时空与快节奏现代生活的重重阻隔。《暖念》依托东方生活造物美学与物理仿真光影算法，在方寸屏幕之间构筑起一座跨越山海、连接心灵的桥梁，让爱与追忆成为照亮生者前行的常明心灯。
            </p>
            <p>
              这座堂轩同时也是一处可亲近的<strong>东方生活美学与文脉道场</strong>。一器一物皆取法有据：梅瓶取宋人小口丰肩瘦底之制，案木尚明式以线不以饰，布色沿用秋香金、靛青、月魄白等传统色名，钟磬音律恪守宫商角徵羽五声。我们不做浮艳的符号堆砌，只做<strong>可考、可讲、可传</strong>的物 —— 愿年轻一代在点一炷香、插一枝花之间，自然习得器物的来历、纹样的源流与礼仪的分寸。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[13px] sm:text-xs">
              <div className="p-3 rounded-xl bg-stone-900/80 border border-amber-500/20 space-y-1">
                <span className="font-bold text-amber-300 flex items-center gap-1">
                  <Flower2 size={13} /> 器以藏礼
                </span>
                <p className="text-stone-400">瓶花、供果、案布皆入谱系，形制不臆造、纹样必有其源，让每一件器物都讲得出来历。</p>
              </div>
              <div className="p-3 rounded-xl bg-stone-900/80 border border-amber-500/20 space-y-1">
                <span className="font-bold text-amber-300 flex items-center gap-1">
                  <Landmark size={13} /> 礼以立心
                </span>
                <p className="text-stone-400">陈设、上香、读祝、静默，以有形之礼安放无形之思；哀而不伤，宁俭勿奢。</p>
              </div>
              <div className="p-3 rounded-xl bg-stone-900/80 border border-amber-500/20 space-y-1">
                <span className="font-bold text-amber-300 flex items-center gap-1">
                  <ScrollText size={13} /> 文以传薪
                </span>
                <p className="text-stone-400">祈愿作祝文、生平作行状、牌位作铭，落笔成文而非随口留言，使思念有体、传承有据。</p>
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-[13px] sm:text-xs text-amber-200/90 leading-relaxed">
              <span className="font-bold text-amber-300 block mb-1">【严正声明：崇尚科学，破除一切封建迷信】</span>
              本平台坚决抵制任何封建迷信、敛财算命、鬼神邪说与违背科学规律的非理性行为。《暖念》所提供之香火、烛光、名花、清供，皆为现代人文哀伤抚慰之象征物与心理仪式载体，旨在抚平生者内心的哀伤创伤，传承中华民族慎终追远的优良传统。
            </div>
          </section>
        )}

        {/* 二、社会价值与倡议 */}
        {(activeSection === 'all' || activeSection === 'social') && (
          <section className="space-y-3">
            <h4 className="text-[17px] sm:text-base font-serif font-bold text-amber-200 flex items-center gap-2 border-l-2 border-amber-400 pl-2.5">
              二、社会价值与绿色倡议：践行文明祭扫，赋能现代殡葬文明
            </h4>
            <p>
              作为一项兼具人文温情与社会效益的数字化公益探索，《暖念》深度契合国家所倡导的“绿色低碳、文明殡葬、生态祭扫”新风尚，具有深远的社会价值：
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13px] sm:text-xs">
              <div className="p-3 rounded-xl bg-stone-900/80 border border-amber-500/20 space-y-1">
                <span className="font-bold text-amber-300 flex items-center gap-1">
                  <Leaf size={13} /> 绿色环保·杜绝火灾隐患
                </span>
                <p className="text-stone-400">彻底告别纸钱冥币燃烧带来的空气污染与山林火灾隐患，以数字长明灯与高保真动态鲜花还原追思内核。</p>
              </div>
              <div className="p-3 rounded-xl bg-stone-900/80 border border-amber-500/20 space-y-1">
                <span className="font-bold text-amber-300 flex items-center gap-1">
                  <Heart size={13} /> 跨越重洋·解游子万里乡愁
                </span>
                <p className="text-stone-400">常年异地奔波的游子、求学的海外学子，即使身在万里之外，亦可在手机端随时随地给长眠故里的长辈敬奉一捧鲜花。</p>
              </div>
            </div>
          </section>
        )}

        {/* 三、商业思想与收费透明声明 */}
        {(activeSection === 'all' || activeSection === 'commercial') && (
          <section className="space-y-3">
            <h4 className="text-[17px] sm:text-base font-serif font-bold text-amber-200 flex items-center gap-2 border-l-2 border-amber-400 pl-2.5">
              三、商业思想与收费透明声明：拒绝过度商业化，坚守公序良俗
            </h4>
            <p>
              由于本软件服务于严肃深沉的逝者悼念场景，<strong>我们极其反感并将“利用逝者大肆敛财、巧立名目层层剥削”视为严重违背道德良知的行为</strong>。为此，我们郑重立下三项商业原则：
            </p>

            <div className="p-3.5 rounded-2xl bg-stone-900 border border-amber-400/40 text-[13px] sm:text-xs space-y-1.5">
              <div className="font-bold text-amber-300 flex items-center gap-1.5 text-[15px] sm:text-sm">
                <Sparkles size={14} className="text-amber-400" />
                <span>核心原则 1：杜绝零碎微交易，绝不对单一道具进行单次收费</span>
              </div>
              <p className="text-stone-300">
                本平台<strong>绝对不推行任何单次小额扣费</strong>（例如：“点一根蜡烛扣2元”、“上一炷香扣1元”、“敬奉一朵花扣3元”等混乱模式）。我们彻底摒弃一切充值代币、虚拟货币及隐形消费陷阱，保证用户账单绝对纯粹、透明、体面。
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <strong className="text-amber-100">核心原则 2：永久保障基础体验免费权（素简存念，真情长在）</strong><br />
                所有用户<strong>无需支付任何费用</strong>，即可永久免费拥有完整的纪念案台。我们开放经典陶木香炉、双对素白烛台、经典传统供花（素菊、百合、牡丹）及平安红富士苹果。<br />
                免费供品遵循大自然“万物生灭自然流转”之规律：香柱按时长燃尽化为轻烟；蜡烛流尽烛泪后自然熄灭；鲜花随时间经历盛开到凋枯，数日后自然融入尘土消失。免费功能虽素简，但仪式尊严绝不打折，平台绝不在祭奠界面插入破坏宁静的商业弹窗广告。
              </p>

              <p>
                <strong className="text-amber-100">核心原则 3：「暖念·长青守护」会员订阅体系（纯净透明一票制）</strong><br />
                若用户希望为故人打造一座<strong>“花木四季长青、香烛长明不灭、器物全席陈设”</strong>的永恒清净道场，可自主选择开通「暖念·长青守护」会员：
              </p>
            </div>

            {/* 资费表格 */}
            <div className="overflow-x-auto rounded-xl border border-amber-500/30 bg-stone-950/80">
              <table className="w-full text-left border-collapse text-[13px] sm:text-xs">
                <thead>
                  <tr className="border-b border-amber-500/30 bg-amber-950/40 text-amber-200">
                    <th className="p-3 font-semibold">方案类型</th>
                    <th className="p-3 font-semibold">官方标准资费</th>
                    <th className="p-3 font-semibold">核心权益与适用场景</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-500/15 text-stone-300">
                  <tr>
                    <td className="p-3 font-medium text-amber-100">月度守护订阅</td>
                    <td className="p-3 font-bold text-amber-300">¥19.00 / 月</td>
                    <td className="p-3 text-stone-400">适用于清明节、中元节、周月祭日等特定节点的短期深度追思陪伴。包含长青不凋与全量道具。</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-amber-100">年度守护订阅 (主推)</td>
                    <td className="p-3 font-bold text-amber-300">¥99.00 / 年<br /><span className="text-[11px] sm:text-[10px] text-stone-400 font-normal">折合约 0.27 元/天</span></td>
                    <td className="p-3 text-stone-400">适用于为至亲故人建立永久长明纪念空间。全年 365 天香火不断、供案花木永恒绽放、全套 15 款名花、12 款名瓷与殿堂背景自由陈设。</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 rounded-xl bg-stone-950/70 border border-amber-500/25 text-[12px] sm:text-[11px] text-stone-400 space-y-1">
              <span className="font-semibold text-amber-300 block">【自动续费与随时退订规范（严格遵循 Apple Guideline 3.1.2）】</span>
              <p>
                • <strong>付款与授权</strong>：由用户通过 Apple App Store (iOS 客户端) 或微信支付官方体系自主确认授权扣款。<br />
                • <strong>随时退订机制</strong>：订阅将在到期前 24 小时内由系统自动发起续费。用户可随时在 iPhone「系统设置」→ 点击顶部「Apple ID」→「订阅」中轻松一键取消；微信端可在「微信支付设置」→「自动扣费」中一键解除。退订后在当前已生效周期结束前，您的全部会员权益依然完好保留。
              </p>
            </div>
          </section>
        )}

        {/* 四、空间私密保护与安全守卫公约 */}
        {(activeSection === 'all' || activeSection === 'safety') && (
          <section className="space-y-3">
            <h4 className="text-[17px] sm:text-base font-serif font-bold text-amber-200 flex items-center gap-2 border-l-2 border-amber-400 pl-2.5">
              四、空间私密属性与安全守卫公约：无公祭，全是面向私人的情感寄托空间
            </h4>
            <p>
              《暖念》严格恪守<strong>“无公祭、非公开、全私域”</strong>的纯私人情感寄托定位。平台不设任何公祭功能，<strong>所有空间 100% 均为面向个人与家庭的私密纪念空间</strong>。为彻底阻断任何形式的公众炒作、群体聚集或不良社会影响，平台确立以下核心守则：
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[13px] sm:text-xs">
              {/* 1. 坚决杜绝公祭 */}
              <div className="p-3.5 rounded-2xl bg-stone-900/90 border border-amber-500/25 space-y-1.5">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Lock size={14} className="text-amber-400 shrink-0" />
                  <span>1. 坚决杜绝公祭（不设公众纪念空间）</span>
                </div>
                <p className="text-stone-300 leading-relaxed text-[12px] sm:text-[11px]">
                  本平台<strong>坚决不提供任何公祭服务，不设立公祭大厅，不开展群体公祭活动</strong>。革命英烈与国家楷模追思属官方严肃公共事业范畴，平台严禁设立公众性质纪念空间，严禁借公祭名义进行网络炒作或集资。
                </p>
              </div>

              {/* 2. 纯受邀私有访问机制 */}
              <div className="p-3.5 rounded-2xl bg-stone-900/90 border border-amber-500/25 space-y-1.5">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Users size={14} className="text-amber-400 shrink-0" />
                  <span>2. 纯受邀私有访问（严格封顶 ≤100 人）</span>
                </div>
                <p className="text-stone-300 leading-relaxed text-[12px] sm:text-[11px]">
                  每一个空间均是面向私人的纯私密情感寄托空间，完全不对外公开。<strong>只有接到创建人定向专属邀请方可访问</strong>；受邀可见人数<strong>严格锁定在 ≤100 人绝对上限</strong>，物理阻断公网传播，严防不良社会影响。
                </p>
              </div>

              {/* 3. 空间私密无感保障 */}
              <div className="p-3.5 rounded-2xl bg-stone-900/90 border border-amber-500/25 space-y-1.5">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-amber-400 shrink-0" />
                  <span>3. 亲属隐私保障（不作侵入式机器审查）</span>
                </div>
                <p className="text-stone-300 leading-relaxed text-[12px] sm:text-[11px]">
                  在受邀闭环与人数硬性封顶机制下，平台高度尊重家属与逝者间的真实私人哀思，<strong>不对私人空间进行侵入式前置机器窥视</strong>，为每位用户保留最神圣安宁的心灵寄托空间。
                </p>
              </div>

              {/* 4. 全员实名制与配额管控 */}
              <div className="p-3.5 rounded-2xl bg-stone-900/90 border border-amber-500/25 space-y-1.5">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                  <span>4. 实名制与配额（每人限创 ≤5 个空间）</span>
                </div>
                <p className="text-stone-300 leading-relaxed text-[12px] sm:text-[11px]">
                  全员实名认证，可溯源有担当。每位实名用户<strong>默认限创不超过 5 个私有空间</strong>，防范恶意批量建档；若因家族直系长辈合规需要申请增创，须提交证明材料并经<strong>人工双人严格审核</strong>。
                </p>
              </div>
            </div>

            {/* 红线与应急机制 */}
            <div className="p-3.5 rounded-2xl bg-red-950/20 border border-red-500/30 text-[13px] sm:text-xs space-y-2">
              <div className="font-bold text-red-300 flex items-center gap-1.5 text-[15px] sm:text-sm">
                <ShieldAlert size={14} className="text-red-400 shrink-0" />
                <span>5. 多重安全红线主动防御（触线即刻熔断并移交司法）</span>
              </div>
              <div className="text-stone-300 space-y-1 text-[12px] sm:text-[11px] leading-relaxed">
                <p>• <strong>健在人士恶意立碑“零容忍”</strong>：严惩为在世人员设立虚假灵堂等网络暴力与名誉侵权行径，一经核实立即永久封号并依法报案；</p>
                <p>• <strong>坚决剔除一切封建迷信与非法集资</strong>：严禁出现算命看相、阴阳风水诈骗、超度敛财或诱导集资打赏；</p>
                <p>• <strong>亲友一键侵权举报与 7×24 小时应急冻结</strong>：每个空间均设有极简举报通道，收到有效投诉第一时间先行冻结空间并介入处置。
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 五、合规守则与隐私安全 */}
        {(activeSection === 'all' || activeSection === 'rules') && (
          <section className="space-y-3">
            <h4 className="text-[17px] sm:text-base font-serif font-bold text-amber-200 flex items-center gap-2 border-l-2 border-amber-400 pl-2.5">
              五、用户行为规范、隐私安全与免责守则
            </h4>
            <ul className="space-y-2 pl-4 list-disc text-stone-300 text-[13px] sm:text-xs leading-relaxed">
              <li>
                <strong className="text-amber-100">严禁恶意侵权与虚假牌位：</strong>
                严禁为未经当事人家属许可的健在人士建立悼念档案，严禁假借公众人物、历史名人或英烈楷模之名恶意立碑或戏谑调侃，平台对违规档案一经核实直接永久封存。
              </li>
              <li>
                <strong className="text-amber-100">严密保护逝者与生者隐私：</strong>
                严格遵循《个人信息保护法》与苹果《App 隐私规范》。本地优先沙盒存储，绝不将用户的逝者生平档案、生卒年或寄语出售给任何第三方商业机构。
              </li>
              <li>
                <strong className="text-amber-100">知识产权归属：</strong>
                《暖念》中所有原创动态矢量花卉模型、瓷器纹理算法、物理风动力学程序及原创编钟音律，其知识产权均归开发团队所有。
              </li>
            </ul>
          </section>
        )}

        {/* 底部署名 */}
        <div className="pt-4 border-t border-amber-500/20 text-center text-[13px] sm:text-xs text-stone-400 space-y-1">
          <p className="text-amber-200/80 font-serif">心有暖念，山海可平 ｜ 慎终追远，长情常在</p>
          <p className="text-[12px] sm:text-[11px] text-stone-500">暖念·东方生活美学与生命关怀团队 ｜ 官方咨询邮箱：support@yugusoft.com</p>
        </div>

      </div>

      {/* ── 弹窗底部操作条 ── */}
      <div className="px-5 py-3 border-t border-amber-500/30 bg-stone-950/80 flex items-center justify-between gap-3 shrink-0">
        <span className="text-[12px] sm:text-[11px] text-stone-400 leading-snug min-w-0">
          阅读并使用即视为完全理解并赞同本声明全部条款
        </span>
        <button
          type="button"
          onClick={() => {
            sound.playWoodPlacement();
            close();
          }}
          className="px-5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-[13px] sm:text-xs cursor-pointer transition-all active:scale-95 shadow-md border border-amber-300 whitespace-nowrap shrink-0"
        >
          我已知晓
        </button>
      </div>

    </div>
  );
};
