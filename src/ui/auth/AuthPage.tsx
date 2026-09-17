/**
 * @file AuthPage.tsx
 * @description 《暖念》独立全屏登录与注册页面。
 * 融合全屏心灯升腾动态背景、东方诗意排版与通透轻盈的毛玻璃卡片，
 * 去除一切繁杂冗余的宣导块与重复按钮，呈现纯净、克制、治愈的登录体验。
 */
import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles,
  QrCode,
  RefreshCw,
  HeartHandshake,
  AlertCircle,
  ChevronDown
} from 'lucide-react';
import { AuthBackground } from './AuthBackground';
import { ChineseCornerOrnaments, CinnabarSealBadge } from '../common/ChineseDecorations';
import { sound } from '../../utils/audio';
import { UserProfile, LoginMethod } from '../../types';

export interface AuthPageProps {
  onBack?: () => void;
  onSuccess: (user: UserProfile) => void;
  onOpenAgreement: () => void;
}

// 微信经典双气泡矢量图标
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

export const AuthPage: React.FC<AuthPageProps> = ({
  onSuccess,
  onOpenAgreement,
}) => {
  // 当前认证通道：phone | wechat | apple
  const [activeTab, setActiveTab] = useState<LoginMethod>('phone');

  // 手机模式：code (验证码) | password (密码)
  const [phoneMode, setPhoneMode] = useState<'code' | 'password'>('code');

  // 手机表单
  const [countryCode, setCountryCode] = useState('+86');
  const [phone, setPhone] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [password, setPassword] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isAgreed, setIsAgreed] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // 微信子模式
  const [wechatMode, setWechatMode] = useState<'one_click' | 'qrcode'>('one_click');

  // 倒计时
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // 发送手机验证码
  const handleSendCode = () => {
    if (!phone || phone.trim().length < 7) {
      setErrorMsg('请先输入正确的手机号码');
      return;
    }
    setErrorMsg('');
    sound.playWoodPlacement();
    setCountdown(60);
    setTimeout(() => {
      setSmsCode('8866');
    }, 1000);
  };

  // 手机登录提交
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed) {
      setErrorMsg('请先阅读并同意《暖念立意与服务声明》');
      return;
    }
    if (!phone || phone.trim().length < 7) {
      setErrorMsg('请输入有效的手机号');
      return;
    }
    if (phoneMode === 'code' && (!smsCode || smsCode.trim().length < 4)) {
      setErrorMsg('请输入短信验证码 (演示码: 8866)');
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
      sound.playBell(528, 2.5);

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
    }, 800);
  };

  // 微信快捷登录
  const handleWechatLogin = () => {
    if (!isAgreed) {
      setErrorMsg('请先阅读并同意《暖念立意与服务声明》');
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
    }, 900);
  };

  // Apple 账号登录
  const handleAppleLogin = () => {
    if (!isAgreed) {
      setErrorMsg('请先阅读并同意《暖念立意与服务声明》');
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
    }, 800);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 overflow-x-hidden text-stone-200 select-none">
      {/* ── 1. 全屏心灯升腾与星芒浮金动态背景 ── */}
      <AuthBackground />

      {/* ── 2. 居中精炼核心交互区 (去除冗余装饰，即刻聚焦登录) ── */}
      <main className="relative z-20 w-full max-w-sm mx-auto my-auto animate-in fade-in zoom-in-95 duration-500">
        {/* 顶部极简品牌徽标与立意诗意（应用名为纯粹的'暖念'，与下方卡片保持舒适呼吸空间） */}
        <div className="text-center mb-6 sm:mb-7">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-400/40 text-amber-300 shadow-[0_0_24px_rgba(245,158,11,0.25)] mb-3">
            <Sparkles size={20} className="text-amber-300 animate-pulse" />
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 tracking-[0.2em] ml-1">
              暖念
            </h1>
            <CinnabarSealBadge text="素心如玉" />
          </div>
          <p className="text-xs sm:text-[13px] text-amber-200/75 font-serif mt-2 tracking-wider">
            将思念温柔珍藏 · 让至真温情跨越山海与时光
          </p>
        </div>

        {/* 轻透毛玻璃认证卡片 (高通透、无压抑，采用指定 oklab 混合色) */}
        <div 
          className="w-full rounded-3xl backdrop-blur-2xl border border-amber-500/40 p-5 sm:p-6 shadow-[0_24px_70px_rgba(0,0,0,0.85)] ring-1 ring-amber-400/20 relative overflow-hidden"
          style={{
            backgroundColor: 'color-mix(in oklab, #1c191763 75%, transparent)'
          }}
        >
          {/* 四角回纹暗金装饰 */}
          <ChineseCornerOrnaments className="text-amber-400/50" />

          {/* 三通道切换 Tab */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-950/70 rounded-xl border border-amber-500/30 mb-4 text-xs">
            <button
              type="button"
              onClick={() => {
                sound.playWoodPlacement();
                setActiveTab('phone');
                setErrorMsg('');
              }}
              className={`py-2 px-1 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${activeTab === 'phone'
                  ? 'bg-amber-600/90 border border-amber-400/70 text-stone-950 font-bold shadow-xs'
                  : 'text-stone-400 hover:text-amber-200'
                }`}
            >
              <Smartphone size={13} />
              <span className="whitespace-nowrap">手机注册</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playWoodPlacement();
                setActiveTab('wechat');
                setErrorMsg('');
              }}
              className={`py-2 px-1 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${activeTab === 'wechat'
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
              className={`py-2 px-1 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${activeTab === 'apple'
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
            <div className="mb-3 flex items-center gap-2 p-2.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-[11px] animate-in fade-in">
              <AlertCircle size={14} className="text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* ── 1. 手机注册与登录 ── */}
          {activeTab === 'phone' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-3 text-xs">
              <div className="flex items-center justify-between px-1 text-[11px] text-stone-400">
                <span className="text-amber-300 font-serif">手机免密注册 / 密码登录</span>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playWoodPlacement();
                      setPhoneMode('code');
                    }}
                    className={`cursor-pointer transition-colors ${phoneMode === 'code' ? 'text-amber-400 font-bold underline underline-offset-4' : 'hover:text-stone-200'
                      }`}
                  >
                    快捷免密
                  </button>
                  <span className="text-stone-600">|</span>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playWoodPlacement();
                      setPhoneMode('password');
                    }}
                    className={`cursor-pointer transition-colors ${phoneMode === 'password' ? 'text-amber-400 font-bold underline underline-offset-4' : 'hover:text-stone-200'
                      }`}
                  >
                    密码登录
                  </button>
                </div>
              </div>

              {/* 手机号输入框 */}
              <div className="flex items-center rounded-xl bg-stone-950/70 border border-amber-500/30 focus-within:border-amber-400 transition-all overflow-hidden">
                {/* 紧凑精致的区号与下拉箭头，杜绝间距过大 */}
                <div className="relative flex items-center shrink-0 border-r border-amber-500/30 bg-stone-900/90 pl-2.5 pr-2 py-2.5 cursor-pointer">
                  <span className="text-amber-200 text-xs font-mono font-medium">{countryCode}</span>
                  <ChevronDown size={12} className="text-amber-400/80 ml-1 shrink-0" />
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code} className="bg-stone-900 text-stone-200">
                        {c.code} {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <input
                  type="tel"
                  placeholder="请输入手机号码"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ''))}
                  className="flex-1 bg-transparent px-3 py-2.5 text-stone-100 placeholder:text-stone-500 text-xs outline-none tracking-wider"
                  maxLength={15}
                />
              </div>

              {/* 短信验证码 / 密码 */}
              {phoneMode === 'code' ? (
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center rounded-xl bg-stone-950/70 border border-amber-500/30 focus-within:border-amber-400 transition-all overflow-hidden">
                    <input
                      type="text"
                      placeholder="4位验证码 (演示: 8866)"
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
                    className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-all shrink-0 whitespace-nowrap cursor-pointer border ${countdown > 0
                        ? 'bg-stone-800/60 border-stone-700 text-stone-500 cursor-not-allowed'
                        : 'bg-amber-950/40 hover:bg-amber-900/50 border-amber-500/40 text-amber-200'
                      }`}
                  >
                    {countdown > 0 ? `${countdown}s 后重发` : '获取验证码'}
                  </button>
                </div>
              ) : (
                <div className="flex items-center rounded-xl bg-stone-950/70 border border-amber-500/30 focus-within:border-amber-400 transition-all overflow-hidden">
                  <input
                    type="password"
                    placeholder="请输入登录密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent px-3 py-2.5 text-stone-100 placeholder:text-stone-500 text-xs outline-none"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 active:scale-[0.99] text-stone-950 font-bold text-xs shadow-lg border border-amber-300/60 transition-all cursor-pointer flex items-center justify-center gap-2 mt-1"
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

          {/* ── 2. 微信登录 ── */}
          {activeTab === 'wechat' && (
            <div className="space-y-3 text-xs animate-in fade-in">
              <div className="flex items-center justify-between px-1 text-[11px] text-stone-400">
                <span className="text-emerald-300 font-serif">微信官方生态授权</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setWechatMode('one_click')}
                    className={`cursor-pointer transition-colors ${wechatMode === 'one_click' ? 'text-emerald-400 font-bold underline underline-offset-4' : 'hover:text-stone-200'
                      }`}
                  >
                    快捷授权
                  </button>
                  <span className="text-stone-600">|</span>
                  <button
                    type="button"
                    onClick={() => setWechatMode('qrcode')}
                    className={`cursor-pointer transition-colors ${wechatMode === 'qrcode' ? 'text-emerald-400 font-bold underline underline-offset-4' : 'hover:text-stone-200'
                      }`}
                  >
                    安全扫码
                  </button>
                </div>
              </div>

              {wechatMode === 'one_click' ? (
                <div className="p-3.5 rounded-2xl bg-gradient-to-b from-emerald-950/20 to-stone-950/70 border border-emerald-500/30 text-center space-y-2.5">
                  <div className="w-11 h-11 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <WeChatIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-serif font-semibold text-emerald-200 text-xs">
                      微信一键安全快捷登录
                    </div>
                    <p className="text-[10.5px] text-stone-400 mt-0.5 leading-relaxed">
                      一键授权同步微信昵称与头像，支持多设备随时寄托思念。
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
                <div className="p-3 rounded-2xl bg-stone-950/70 border border-emerald-500/30 text-center space-y-2">
                  <div className="inline-block p-2 bg-white rounded-xl shadow-lg">
                    <QrCode size={100} className="text-stone-950" />
                  </div>
                  <p className="text-[10.5px] text-stone-300 font-serif">
                    请使用微信【扫一扫】扫描二维码
                  </p>
                  <button
                    type="button"
                    onClick={handleWechatLogin}
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 underline underline-offset-2 cursor-pointer"
                  >
                    [演示] 模拟微信扫码成功
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── 3. iOS / Apple 账户 ── */}
          {activeTab === 'apple' && (
            <div className="space-y-3 text-xs animate-in fade-in">
              <div className="p-3.5 rounded-2xl bg-gradient-to-b from-stone-900/80 to-stone-950/80 border border-stone-700/70 text-center space-y-2.5">
                <div className="w-11 h-11 mx-auto rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  <AppleIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-serif font-semibold text-stone-100 text-xs">
                    使用 Apple 账户登录
                  </div>
                  <p className="text-[10.5px] text-stone-400 mt-0.5 leading-relaxed">
                    专为 iOS 与 Mac 生态打造。支持 Face ID / Touch ID 极速授权。
                  </p>
                </div>

                <div className="text-[10px] text-amber-200/80 bg-amber-500/10 p-2 rounded-xl border border-amber-500/20 text-left flex items-start gap-1.5">
                  <ShieldCheck size={13} className="text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <b>苹果隐私中继</b>：支持【隐藏邮件地址】，绝不向第三方透露真实邮箱。
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
                      <span>通过 Apple 登录</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* 协议与公约勾选 */}
          <div className="flex items-start gap-2 pt-3 border-t border-amber-500/20 text-[10.5px] text-stone-400 leading-snug mt-3">
            <button
              type="button"
              onClick={() => {
                sound.playWoodPlacement();
                setIsAgreed(!isAgreed);
              }}
              className={`w-3.5 h-3.5 rounded mt-0.5 flex items-center justify-center border transition-all cursor-pointer shrink-0 ${isAgreed
                  ? 'bg-amber-600 border-amber-400 text-stone-950'
                  : 'bg-stone-900 border-stone-700 hover:border-amber-400'
                }`}
            >
              {isAgreed && <Check size={11} strokeWidth={3} />}
            </button>

            <div>
              <span>已阅读并同意</span>
              <button
                type="button"
                onClick={() => {
                  sound.playWoodPlacement();
                  onOpenAgreement();
                }}
                className="text-amber-400 hover:text-amber-300 underline underline-offset-2 mx-1 cursor-pointer font-medium"
              >
                《暖念立意与服务声明》
              </button>
              <span>及隐私指引</span>
            </div>
          </div>
        </div>
      </main>

      {/* ── 3. 极简页脚 ── */}
      <footer className="relative z-20 w-full text-center text-[10px] text-stone-500/80 font-serif pt-3 pb-2">
        <span>暖念数字纪念堂 · 官方认证系统</span>
      </footer>
    </div>
  );
};
