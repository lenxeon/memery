/**
 * @file AuthModal.tsx
 * @description 《暖念》用户注册与登录弹窗组件，承载手机号、微信、iOS / Apple 三合一认证流程。
 * 遵循温暖庄重、东方禅意的人文设计规范，联动服务公约与用户档案。
 */
import React, { useState, useEffect } from 'react';
import { 
  X, 
  Smartphone, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Sparkles, 
  QrCode, 
  RefreshCw, 
  HeartHandshake,
  AlertCircle
} from 'lucide-react';
import { ChineseCornerOrnaments, ChineseCloudDivider, CinnabarSealBadge } from '../common/ChineseDecorations';
import { sound } from '../../utils/audio';
import { UserProfile, LoginMethod } from '../../types';

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
  onOpenAgreement: () => void;
}

// 微信官方经典双气泡 SVG 图标
const WeChatIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.5 3C4.36 3 1 5.91 1 9.5c0 2.05 1.1 3.88 2.81 5.08-.12.63-.48 1.94-1.39 2.92 1.34-.14 2.82-.77 3.73-1.45.75.24 1.54.37 2.35.37.24 0 .48-.01.71-.04-.14-.52-.21-1.07-.21-1.63 0-3.73 3.58-6.75 8-6.75.25 0 .5.01.75.03C17.07 4.79 13.14 3 8.5 3zm10 6.5c-3.87 0-7 2.69-7 6s3.13 6 7 6c.71 0 1.39-.1 2.03-.29.74.56 1.96 1.07 3.06 1.18-.74-.8-1.04-1.87-1.14-2.39C23.59 18.82 24.5 17.26 24.5 15.5c0-3.31-3.13-6-7-6zm-2.25 4.25c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4.5 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
  </svg>
);

// Apple 官方白黑纯色矢量 Logo
const AppleIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.64-.78 1.08-1.86.96-2.95-1 .04-2.17.65-2.85 1.45-.58.68-1.1 1.76-.96 2.82 1.11.08 2.21-.54 2.85-1.32z" />
  </svg>
);

const COUNTRY_CODES = [
  { code: '+86', name: '中国大陆' },
  { code: '+852', name: '中国香港' },
  { code: '+853', name: '中国澳门' },
  { code: '+886', name: '中国台湾' },
  { code: '+1', name: '美国/加拿大' },
  { code: '+65', name: '新加坡' },
  { code: '+60', name: '马来西亚' },
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onOpenAgreement,
}) => {
  // 当前主要认证通道：phone | wechat | apple
  const [activeTab, setActiveTab] = useState<LoginMethod>('phone');

  // 手机登录模式：code (验证码免密) | password (密码)
  const [phoneMode, setPhoneMode] = useState<'code' | 'password'>('code');

  // 手机表单状态
  const [countryCode, setCountryCode] = useState('+86');
  const [phone, setPhone] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [password, setPassword] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isAgreed, setIsAgreed] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // 微信登录状态：one_click | qrcode
  const [wechatMode, setWechatMode] = useState<'one_click' | 'qrcode'>('one_click');

  // 倒计时计时器
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  if (!isOpen) return null;

  // 发送手机验证码
  const handleSendCode = () => {
    if (!phone || phone.trim().length < 7) {
      setErrorMsg('请先输入正确的手机号码');
      return;
    }
    setErrorMsg('');
    sound.playWoodPlacement();
    setCountdown(60);
    // 模拟自动填写推荐验证码方便体验测试
    setTimeout(() => {
      setSmsCode('8866');
    }, 1200);
  };

  // 手机登录/注册提交
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed) {
      setErrorMsg('请先阅读并勾选《暖念立意、社会价值与服务声明》');
      return;
    }
    if (!phone || phone.trim().length < 7) {
      setErrorMsg('请输入有效的手机号');
      return;
    }
    if (phoneMode === 'code' && (!smsCode || smsCode.trim().length < 4)) {
      setErrorMsg('请输入4位短信验证码 (演示码: 8866)');
      return;
    }
    if (phoneMode === 'password' && (!password || password.length < 6)) {
      setErrorMsg('密码长度不能少于6位');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    sound.playWoodPlacement();

    setTimeout(() => {
      setLoading(false);
      sound.playBell(528, 2.2);

      const phoneTail = phone.slice(-4) || '8866';
      const user: UserProfile = {
        id: `user_phone_${Date.now()}`,
        name: `素心居士 (尾号${phoneTail})`,
        loginType: 'phone',
        phoneNumber: `${countryCode} ${phone}`,
        isSubscribed: true,
        guardianDays: 136,
        blessingCount: 18,
        createdAt: Date.now() - 136 * 86400000,
      };

      try {
        localStorage.setItem('memery_current_user', JSON.stringify(user));
      } catch (err) {
        console.error(err);
      }

      onSuccess(user);
      onClose();
    }, 800);
  };

  // 微信快捷登录
  const handleWechatLogin = () => {
    if (!isAgreed) {
      setErrorMsg('请先阅读并勾选《暖念立意、社会价值与服务声明》');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    sound.playWoodPlacement();

    setTimeout(() => {
      setLoading(false);
      sound.playBell(528, 2.5);

      const user: UserProfile = {
        id: `user_wechat_${Date.now()}`,
        name: '清心若雪 (微信授权)',
        avatar: '🪷',
        loginType: 'wechat',
        isSubscribed: true,
        guardianDays: 98,
        blessingCount: 26,
        createdAt: Date.now() - 98 * 86400000,
      };

      try {
        localStorage.setItem('memery_current_user', JSON.stringify(user));
      } catch (err) {
        console.error(err);
      }

      onSuccess(user);
      onClose();
    }, 900);
  };

  // Apple 账号登录
  const handleAppleLogin = () => {
    if (!isAgreed) {
      setErrorMsg('请先阅读并勾选《暖念立意、社会价值与服务声明》');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    sound.playWoodPlacement();

    setTimeout(() => {
      setLoading(false);
      sound.playBell(528, 2.5);

      const user: UserProfile = {
        id: `user_apple_${Date.now()}`,
        name: 'Apple 寄思者 (已启用隐私中继)',
        avatar: '🍎',
        loginType: 'apple',
        isSubscribed: true,
        guardianDays: 210,
        blessingCount: 42,
        createdAt: Date.now() - 210 * 86400000,
      };

      try {
        localStorage.setItem('memery_current_user', JSON.stringify(user));
      } catch (err) {
        console.error(err);
      }

      onSuccess(user);
      onClose();
    }, 800);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md max-h-[92vh] flex flex-col bg-gradient-to-b from-[#241f1c] via-[#1c1917] to-[#141210] rounded-3xl border border-amber-500/50 shadow-[0_24px_70px_rgba(0,0,0,0.92)] text-stone-200 overflow-hidden relative ring-1 ring-amber-400/25"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 古风回纹角花 */}
        <ChineseCornerOrnaments className="text-amber-400/60" />

        {/* ── 顶栏与人文寄语 ── */}
        <div className="relative pt-6 px-6 pb-4 shrink-0 text-center border-b border-amber-500/20 bg-[#1c1917]/80">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-amber-500/30 text-stone-400 hover:text-amber-200 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X size={15} />
          </button>

          {/* 典雅徽记与暖念立意 */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-950/40 border border-amber-400/40 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.25)] mb-2.5">
            <Sparkles size={22} className="animate-pulse" />
          </div>

          <div className="flex items-center justify-center gap-2">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-amber-100 tracking-wider">
              一盏心灯 · 温暖长伴
            </h2>
            <CinnabarSealBadge text="暖念认证" />
          </div>

          <p className="text-[11px] text-amber-200/70 font-serif mt-1">
            将思念温柔珍藏，让至真温情跨越山海与时光
          </p>
        </div>

        {/* ── 核心内容区 (可滚动) ── */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-4 text-xs">
          {/* 三合一认证通道切换 Tab */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-950/70 rounded-xl border border-amber-500/30">
            <button
              type="button"
              onClick={() => {
                sound.playWoodPlacement();
                setActiveTab('phone');
                setErrorMsg('');
              }}
              className={`py-2 px-1 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'phone'
                  ? 'bg-amber-600/90 border border-amber-400/70 text-stone-950 font-bold shadow-xs'
                  : 'text-stone-400 hover:text-amber-200'
              }`}
            >
              <Smartphone size={14} />
              <span className="whitespace-nowrap">手机注册</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playWoodPlacement();
                setActiveTab('wechat');
                setErrorMsg('');
              }}
              className={`py-2 px-1 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'wechat'
                  ? 'bg-emerald-600 border border-emerald-400/70 text-stone-950 font-bold shadow-xs'
                  : 'text-stone-400 hover:text-emerald-300'
              }`}
            >
              <WeChatIcon className="w-3.5 h-3.5" />
              <span className="whitespace-nowrap">微信登录</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playWoodPlacement();
                setActiveTab('apple');
                setErrorMsg('');
              }}
              className={`py-2 px-1 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'apple'
                  ? 'bg-stone-100 border border-white text-stone-950 font-bold shadow-xs'
                  : 'text-stone-400 hover:text-stone-100'
              }`}
            >
              <AppleIcon className="w-3.5 h-3.5" />
              <span className="whitespace-nowrap">iOS 账号</span>
            </button>
          </div>

          {/* 错误提示横幅 */}
          {errorMsg && (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-[11px] animate-in fade-in">
              <AlertCircle size={14} className="text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* ────────────────────────────────────────────────────────
              1. 手机号注册 / 登录
             ──────────────────────────────────────────────────────── */}
          {activeTab === 'phone' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-3.5 animate-in fade-in">
              {/* 手机登录方式子切换：验证码 vs 密码 */}
              <div className="flex items-center justify-between px-1 text-[11px] text-stone-400">
                <span className="text-amber-300 font-serif">手机免密注册 / 密码登录</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playWoodPlacement();
                      setPhoneMode('code');
                    }}
                    className={`cursor-pointer transition-colors ${
                      phoneMode === 'code' ? 'text-amber-400 font-bold underline underline-offset-4' : 'hover:text-stone-200'
                    }`}
                  >
                    快捷免密
                  </button>
                  <span className="text-stone-700">|</span>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playWoodPlacement();
                      setPhoneMode('password');
                    }}
                    className={`cursor-pointer transition-colors ${
                      phoneMode === 'password' ? 'text-amber-400 font-bold underline underline-offset-4' : 'hover:text-stone-200'
                    }`}
                  >
                    密码登录
                  </button>
                </div>
              </div>

              {/* 手机号码输入框 */}
              <div className="flex items-center rounded-xl bg-stone-950/80 border border-amber-500/30 focus-within:border-amber-400 transition-all overflow-hidden">
                {/* 国际区号选择 */}
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="bg-stone-900 text-amber-200 text-xs px-2.5 py-2.5 border-r border-amber-500/30 outline-none cursor-pointer"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code} className="bg-stone-900 text-stone-200">
                      {c.code} {c.name}
                    </option>
                  ))}
                </select>

                <input
                  type="tel"
                  placeholder="请输入手机号码"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ''))}
                  className="flex-1 bg-transparent px-3 py-2.5 text-stone-100 placeholder:text-stone-500 text-xs outline-none tracking-wider"
                  maxLength={15}
                />

                {phone && (
                  <button
                    type="button"
                    onClick={() => setPhone('')}
                    className="p-2 text-stone-500 hover:text-stone-300 cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* 模式 A：短信验证码 */}
              {phoneMode === 'code' ? (
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center rounded-xl bg-stone-950/80 border border-amber-500/30 focus-within:border-amber-400 transition-all overflow-hidden">
                    <input
                      type="text"
                      placeholder="请输入4位验证码"
                      value={smsCode}
                      onChange={(e) => setSmsCode(e.target.value.slice(0, 6))}
                      className="w-full bg-transparent px-3 py-2.5 text-stone-100 placeholder:text-stone-500 text-xs outline-none tracking-widest font-mono"
                      maxLength={6}
                    />
                  </div>
                  <button
                    type="button"
                    disabled={countdown > 0}
                    onClick={handleSendCode}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all shrink-0 whitespace-nowrap cursor-pointer border ${
                      countdown > 0
                        ? 'bg-stone-800 border-stone-700 text-stone-500 cursor-not-allowed'
                        : 'bg-amber-950/50 hover:bg-amber-900/50 border-amber-500/50 text-amber-200'
                    }`}
                  >
                    {countdown > 0 ? `${countdown}s 后重发` : '获取验证码'}
                  </button>
                </div>
              ) : (
                /* 模式 B：密码登录 */
                <div className="flex items-center rounded-xl bg-stone-950/80 border border-amber-500/30 focus-within:border-amber-400 transition-all overflow-hidden">
                  <input
                    type="password"
                    placeholder="请输入账号密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent px-3 py-2.5 text-stone-100 placeholder:text-stone-500 text-xs outline-none"
                  />
                </div>
              )}

              {/* 提示说明 */}
              <div className="text-[10px] text-stone-400 flex items-center gap-1.5 leading-relaxed bg-amber-950/20 p-2.5 rounded-xl border border-amber-500/20">
                <HeartHandshake size={14} className="text-amber-400 shrink-0" />
                <span>
                  未注册手机号通过验证后，系统将自动创建您的专属【暖念档案】，免去额外繁复步骤，让思念瞬息通达。
                </span>
              </div>

              {/* 提交主按钮 */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 active:scale-[0.99] text-stone-950 font-bold text-xs shadow-lg border border-amber-300/60 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  <>
                    <span>一键验证 · 开启温暖守护</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* ────────────────────────────────────────────────────────
              2. 微信一键登录 / 扫码登录
             ──────────────────────────────────────────────────────── */}
          {activeTab === 'wechat' && (
            <div className="space-y-3.5 animate-in fade-in">
              <div className="flex items-center justify-between px-1 text-[11px] text-stone-400">
                <span className="text-emerald-300 font-serif">微信官方生态互联</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setWechatMode('one_click')}
                    className={`cursor-pointer transition-colors ${
                      wechatMode === 'one_click' ? 'text-emerald-400 font-bold underline underline-offset-4' : 'hover:text-stone-200'
                    }`}
                  >
                    快捷授权
                  </button>
                  <span className="text-stone-700">|</span>
                  <button
                    type="button"
                    onClick={() => setWechatMode('qrcode')}
                    className={`cursor-pointer transition-colors ${
                      wechatMode === 'qrcode' ? 'text-emerald-400 font-bold underline underline-offset-4' : 'hover:text-stone-200'
                    }`}
                  >
                    扫码登录
                  </button>
                </div>
              </div>

              {wechatMode === 'one_click' ? (
                <div className="p-4 rounded-2xl bg-gradient-to-b from-emerald-950/20 to-stone-950/80 border border-emerald-500/30 text-center space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.2)]">
                    <WeChatIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="font-serif font-semibold text-emerald-200 text-sm">
                      微信安全一键快捷登录
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1 max-w-xs mx-auto leading-relaxed">
                      将为您安全授权同步微信昵称与头像，支持多设备随时随地查看亲友追思堂与祈愿记录。
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleWechatLogin}
                    disabled={loading}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.99] text-stone-950 font-bold text-xs shadow-lg border border-emerald-400/60 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <RefreshCw size={14} className="animate-spin" />
                    ) : (
                      <>
                        <WeChatIcon className="w-4 h-4" />
                        <span>微信账号授权一键登录</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                /* 微信二维码扫码登录模拟 */
                <div className="p-4 rounded-2xl bg-stone-950/80 border border-emerald-500/30 text-center space-y-3">
                  <div className="inline-block p-3 bg-white rounded-xl shadow-lg relative group">
                    <QrCode size={130} className="text-stone-950" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <span className="text-white text-[10px] font-medium flex items-center gap-1">
                        <RefreshCw size={11} /> 点击刷新
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] text-stone-300 font-serif">
                      请使用微信【扫一扫】扫描上方二维码
                    </p>
                    <p className="text-[10px] text-stone-500">
                      安全加密通道 · 扫码后在手机微信端轻触【确认登录】
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleWechatLogin}
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 underline underline-offset-2 cursor-pointer"
                  >
                    [演示] 模拟微信已扫码确认
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ────────────────────────────────────────────────────────
              3. iOS / Apple 账户登录 (Sign in with Apple)
             ──────────────────────────────────────────────────────── */}
          {activeTab === 'apple' && (
            <div className="space-y-3.5 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-gradient-to-b from-stone-900/90 to-stone-950 border border-stone-700/80 text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-[0_0_16px_rgba(255,255,255,0.1)]">
                  <AppleIcon className="w-7 h-7" />
                </div>
                <div>
                  <div className="font-serif font-semibold text-stone-100 text-sm">
                    使用 Apple 账户登录
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1 max-w-xs mx-auto leading-relaxed">
                    专为 iOS 与 Mac 生态打造。支持 Face ID / Touch ID 秒级授权，全面保护个人隐私。
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="text-[10px] text-amber-200/80 bg-amber-500/10 p-2 rounded-xl border border-amber-500/20 text-left flex items-start gap-2">
                    <ShieldCheck size={14} className="text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <b>苹果官方隐私保护</b>：可选择【隐藏邮件地址】，使用专属随机构建的中继邮箱，绝不向第三方透露任何个人隐私。
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleAppleLogin}
                    disabled={loading}
                    className="w-full py-2.5 rounded-xl bg-white hover:bg-stone-200 active:scale-[0.99] text-stone-950 font-semibold text-xs shadow-lg border border-white/60 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <RefreshCw size={14} className="animate-spin text-stone-950" />
                    ) : (
                      <>
                        <AppleIcon className="w-4 h-4" />
                        <span>通过 Apple 登录 (Sign in with Apple)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 祥云分割线 */}
          <ChineseCloudDivider title="素心如玉 · 庄重守护" className="my-2" />

          {/* ── 公约与隐私勾选协议 ── */}
          <div className="flex items-start gap-2 pt-1 text-[11px] text-stone-400 leading-snug">
            <button
              type="button"
              onClick={() => {
                sound.playWoodPlacement();
                setIsAgreed(!isAgreed);
              }}
              className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition-all cursor-pointer shrink-0 ${
                isAgreed
                  ? 'bg-amber-600 border-amber-400 text-stone-950'
                  : 'bg-stone-900 border-stone-700 hover:border-amber-400'
              }`}
            >
              {isAgreed && <Check size={12} strokeWidth={3} />}
            </button>

            <div>
              <span>我已仔细阅读并充分理解</span>
              <button
                type="button"
                onClick={() => {
                  sound.playWoodPlacement();
                  onOpenAgreement();
                }}
                className="text-amber-400 hover:text-amber-300 underline underline-offset-2 mx-1 cursor-pointer font-medium"
              >
                《暖念立意、社会价值与服务声明》
              </button>
              <span>及</span>
              <button
                type="button"
                onClick={() => {
                  sound.playWoodPlacement();
                  onOpenAgreement();
                }}
                className="text-amber-400 hover:text-amber-300 underline underline-offset-2 ml-1 cursor-pointer font-medium"
              >
                《隐私保护指引》
              </button>
              <div className="text-[10px] text-stone-500 mt-0.5">
                严守官方公约 · 坚决抵制任何迷信活动 · 拒绝过度商业化
              </div>
            </div>
          </div>
        </div>

        {/* ── 底部状态微光条 ── */}
        <div className="px-5 py-2.5 bg-[#141210] border-t border-amber-500/20 text-[10px] text-stone-500 flex items-center justify-between shrink-0 font-serif">
          <span>暖念数字纪念堂 · 官方认证系统</span>
          <span className="text-amber-400/80">心有所念 · 必有回响</span>
        </div>
      </div>
    </div>
  );
};
