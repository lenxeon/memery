/**
 * @file audio.ts
 * @description Web Audio API 纯原生算法合成音效与禅意背景音乐引擎（铜磬、木鱼、甘露水滴、微烛与4大禅音背景音乐）。
 */
import { BgmTrackId, BgmTrackInfo } from '../types';

export const BGM_TRACKS: BgmTrackInfo[] = [
  {
    id: 'singing_bowl',
    name: '空灵钵韵',
    poeticName: '528Hz 祈福疗愈',
    instrument: '纯铜颂钵 · 泛音磬钟',
    desc: '528Hz 祈愿频率，深层共鸣钵体余音悠长，令人心神宁静澄澈。',
    icon: '🥣',
  },
  {
    id: 'bamboo_wind',
    name: '幽篁清风',
    poeticName: '修竹甘露 · 禅寺木鱼',
    instrument: '竹林微风 · 清泉水滴 · 静心木鱼',
    desc: '微风轻拂青竹，偶有晨露滴落与沉稳木鱼声，如临山间精舍。',
    icon: '🎋',
  },
  {
    id: 'temple_bell',
    name: '晨钟远山',
    poeticName: '梵音古刹 · 钟声悠扬',
    instrument: '远山大钟 · 沉香梵唱',
    desc: '庄严肃穆的名山古刹晨钟，低回深远，寄托无限怀思。',
    icon: '🔔',
  },
  {
    id: 'pentatonic_zither',
    name: '五音琴韵',
    poeticName: '高山流水 · 宫商角徵羽',
    instrument: '七弦古琴 · 纯净泛音',
    desc: '中国传统五声音阶断续幽微，如山涧流泉、春蚕丝雨。',
    icon: '🪕',
  },
];

class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  // ── 背景音乐（BGM）引擎控制 ──
  public bgmPlaying: boolean = false;
  public currentTrackId: BgmTrackId = 'singing_bowl';
  public bgmVolume: number = 0.55;
  private bgmGain: GainNode | null = null;
  private bgmIntervalId: number | null = null;
  private bgmNodes: (AudioNode | OscillatorNode)[] = [];
  private bgmListeners: Array<(state: { isPlaying: boolean; trackId: BgmTrackId; volume: number }) => void> = [];

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // 订阅 BGM 播放状态更新
  public subscribeBgm(listener: (state: { isPlaying: boolean; trackId: BgmTrackId; volume: number }) => void) {
    this.bgmListeners.push(listener);
    listener({ isPlaying: this.bgmPlaying, trackId: this.currentTrackId, volume: this.bgmVolume });
    return () => {
      this.bgmListeners = this.bgmListeners.filter((l) => l !== listener);
    };
  }

  private notifyBgmListeners() {
    this.bgmListeners.forEach((fn) =>
      fn({ isPlaying: this.bgmPlaying, trackId: this.currentTrackId, volume: this.bgmVolume })
    );
  }

  // 设置 BGM 整体音量
  public setBgmVolume(val: number) {
    this.bgmVolume = Math.max(0, Math.min(1, val));
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(this.bgmVolume, this.ctx.currentTime);
    }
    this.notifyBgmListeners();
  }

  // 切换播放/暂停
  public toggleBgm() {
    if (this.bgmPlaying) {
      this.stopBgm();
    } else {
      this.playBgm(this.currentTrackId);
    }
  }

  // 切换到下一首曲目
  public nextBgmTrack() {
    const idx = BGM_TRACKS.findIndex((t) => t.id === this.currentTrackId);
    const nextIdx = (idx + 1) % BGM_TRACKS.length;
    this.playBgm(BGM_TRACKS[nextIdx].id);
  }

  // 播放指定曲目
  public playBgm(trackId: BgmTrackId = this.currentTrackId) {
    this.init();
    if (!this.ctx) return;

    this.stopBgm(false);
    this.currentTrackId = trackId;
    this.bgmPlaying = true;

    // 建立总主控音量节点
    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.bgmGain.gain.linearRampToValueAtTime(this.bgmVolume, this.ctx.currentTime + 1.2);
    this.bgmGain.connect(this.ctx.destination);

    // 根据选定的禅音曲目启动原生合成声景
    switch (trackId) {
      case 'singing_bowl':
        this.startSingingBowlAmbient();
        break;
      case 'bamboo_wind':
        this.startBambooWindAmbient();
        break;
      case 'temple_bell':
        this.startTempleBellAmbient();
        break;
      case 'pentatonic_zither':
        this.startPentatonicZitherAmbient();
        break;
      default:
        this.startSingingBowlAmbient();
    }

    this.notifyBgmListeners();
  }

  // 停止播放 BGM
  public stopBgm(notify: boolean = true) {
    if (this.bgmIntervalId !== null) {
      window.clearInterval(this.bgmIntervalId);
      this.bgmIntervalId = null;
    }

    if (this.bgmGain && this.ctx) {
      try {
        this.bgmGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
      } catch {
        // ignore
      }
    }

    // 延时关闭并断开所有节点
    setTimeout(() => {
      this.bgmNodes.forEach((node) => {
        try {
          if ('stop' in node && typeof (node as OscillatorNode).stop === 'function') {
            (node as OscillatorNode).stop();
          }
          node.disconnect();
        } catch {
          // ignore
        }
      });
      this.bgmNodes = [];
    }, 550);

    this.bgmPlaying = false;
    if (notify) {
      this.notifyBgmListeners();
    }
  }

  // ── 1. 《空灵钵韵 · 528Hz》环境合成器 ──
  private startSingingBowlAmbient() {
    if (!this.ctx || !this.bgmGain) return;
    const now = this.ctx.currentTime;

    // 528Hz 治愈温润持续声底 (Drone)
    const droneFreq = 132; // 528Hz 的次倍频基底
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainDrone = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(droneFreq, now);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(droneFreq * 1.5, now); // 纯五度泛音

    // 慢速呼吸 LFO 调制
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.08, now); // 约 12 秒一个起伏呼吸周期
    lfoGain.gain.setValueAtTime(0.06, now);
    lfo.connect(lfoGain);

    gainDrone.gain.setValueAtTime(0.12, now);
    lfoGain.connect(gainDrone.gain);

    osc1.connect(gainDrone);
    osc2.connect(gainDrone);
    gainDrone.connect(this.bgmGain);

    osc1.start(now);
    osc2.start(now);
    lfo.start(now);

    this.bgmNodes.push(osc1, osc2, lfo, gainDrone, lfoGain);

    // 周期性轻磬敲击（每隔 8~10 秒发出轻柔的空灵余音）
    const triggerBowl = () => {
      if (!this.ctx || !this.bgmPlaying || !this.bgmGain) return;
      const t = this.ctx.currentTime;
      const bowlFreq = 528;
      const bOsc = this.ctx.createOscillator();
      const bGain = this.ctx.createGain();
      bOsc.type = 'sine';
      bOsc.frequency.setValueAtTime(bowlFreq, t);

      bGain.gain.setValueAtTime(0, t);
      bGain.gain.linearRampToValueAtTime(0.2, t + 0.05);
      bGain.gain.exponentialRampToValueAtTime(0.0001, t + 7.5);

      bOsc.connect(bGain);
      bGain.connect(this.bgmGain);
      bOsc.start(t);
      bOsc.stop(t + 7.5);
    };

    triggerBowl();
    this.bgmIntervalId = window.setInterval(triggerBowl, 8500);
  }

  // ── 2. 《幽篁清风 · 甘露竹影》环境合成器 ──
  private startBambooWindAmbient() {
    if (!this.ctx || !this.bgmGain) return;

    // 竹林微风沙沙背景 (Filtered Pink/White Noise)
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.12;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.setValueAtTime(450, this.ctx.currentTime);

    // 风声强弱呼吸调制
    const windLfo = this.ctx.createOscillator();
    windLfo.frequency.setValueAtTime(0.12, this.ctx.currentTime);
    const windLfoGain = this.ctx.createGain();
    windLfoGain.gain.setValueAtTime(250, this.ctx.currentTime);
    windLfo.connect(windLfoGain);
    windLfoGain.connect(windFilter.frequency);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.15, this.ctx.currentTime);

    noiseSource.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(this.bgmGain);

    noiseSource.start();
    windLfo.start();

    this.bgmNodes.push(noiseSource, windFilter, windGain, windLfo, windLfoGain);

    // 随机清脆水滴声 (Dew Drip on Lotus / Pond)
    const triggerDrip = () => {
      if (!this.ctx || !this.bgmPlaying || !this.bgmGain) return;
      const t = this.ctx.currentTime;
      const dropFreq = 1600 + Math.random() * 800;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(dropFreq, t);
      osc.frequency.exponentialRampToValueAtTime(dropFreq * 1.8, t + 0.04);

      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

      osc.connect(gain);
      gain.connect(this.bgmGain);
      osc.start(t);
      osc.stop(t + 0.18);
    };

    // 偶尔一声悠扬轻木鱼
    const triggerWoodChime = () => {
      if (!this.ctx || !this.bgmPlaying || !this.bgmGain) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.exponentialRampToValueAtTime(80, t + 0.08);
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      osc.connect(gain);
      gain.connect(this.bgmGain);
      osc.start(t);
      osc.stop(t + 0.1);
    };

    this.bgmIntervalId = window.setInterval(() => {
      if (Math.random() > 0.4) triggerDrip();
      if (Math.random() > 0.7) triggerWoodChime();
    }, 2800);
  }

  // ── 3. 《晨钟暮鼓 · 远山梵音》环境合成器 ──
  private startTempleBellAmbient() {
    if (!this.ctx || !this.bgmGain) return;
    const now = this.ctx.currentTime;

    // 低频深邃大殿共振底噪
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(72, now); // 浑厚低音
    gain.gain.setValueAtTime(0.08, now);
    osc.connect(gain);
    gain.connect(this.bgmGain);
    osc.start(now);
    this.bgmNodes.push(osc, gain);

    // 周期性宏大远山古刹钟声 (Temple Bell Strike)
    const triggerBell = () => {
      if (!this.ctx || !this.bgmPlaying || !this.bgmGain) return;
      const t = this.ctx.currentTime;
      const baseFreq = 216; // 庄严钟声

      // 基频 + 3 个金属泛音
      [baseFreq, baseFreq * 1.62, baseFreq * 2.38, baseFreq * 3.4].forEach((freq, i) => {
        if (!this.ctx || !this.bgmGain) return;
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(freq, t);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.18 / (i + 1), t + 0.04);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 9.5);
        o.connect(g);
        g.connect(this.bgmGain);
        o.start(t);
        o.stop(t + 9.5);
      });
    };

    triggerBell();
    this.bgmIntervalId = window.setInterval(triggerBell, 10500);
  }

  // ── 4. 《五音琴韵 · 高山流水》中国古典五声音阶演算法 ──
  private startPentatonicZitherAmbient() {
    if (!this.ctx || !this.bgmGain) return;

    // 中国传统五声音阶（宫 C4, 商 D4, 角 E4, 徵 G4, 羽 A4 及高八度 C5, D5, E5）
    const pentatonicScale = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];

    const playZitherNote = (freq: number) => {
      if (!this.ctx || !this.bgmPlaying || !this.bgmGain) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle'; // 类似琴弦拨动明澈微泛音
      osc.frequency.setValueAtTime(freq, t);

      // 快速触弦与绵长泛音衰减
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.16, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 3.8);

      osc.connect(gain);
      gain.connect(this.bgmGain);
      osc.start(t);
      osc.stop(t + 3.8);
    };

    let step = 0;
    const melodyPattern = [0, 2, 4, 3, 5, 2, 0, 4, 3, 1, 2, 4];

    this.bgmIntervalId = window.setInterval(() => {
      const noteIdx = melodyPattern[step % melodyPattern.length];
      const freq = pentatonicScale[noteIdx];
      playZitherNote(freq);
      // 偶有双手和弦泛音
      if (step % 3 === 0) {
        setTimeout(() => playZitherNote(freq * 1.5), 180);
      }
      step++;
    }, 2200);
  }

  // ── 交互离散音效 ──

  // 轻音铜磬/钟磬
  playBell(freq: number = 432, duration: number = 3.5) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2.76, now);

      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.3, now + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(0.1, now + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

      osc1.connect(gain1);
      osc2.connect(gain2);
      gain1.connect(this.ctx.destination);
      gain2.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);
    } catch {
      // ignore
    }
  }

  // 敲击铜磬 (528Hz 纯正泛音)
  playSingingBowl(freq: number = 528, duration: number = 5.5) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // 触击声
      const oscStrike = this.ctx.createOscillator();
      const gainStrike = this.ctx.createGain();
      oscStrike.type = 'triangle';
      oscStrike.frequency.setValueAtTime(freq * 3.4, now);
      gainStrike.gain.setValueAtTime(0.18, now);
      gainStrike.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      oscStrike.connect(gainStrike);
      gainStrike.connect(this.ctx.destination);
      oscStrike.start(now);
      oscStrike.stop(now + 0.08);

      // 主基频
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      // 泛音
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2.76, now);

      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.38, now + 0.03);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(0.16, now + 0.03);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.75);

      osc1.connect(gain1);
      osc2.connect(gain2);
      gain1.connect(this.ctx.destination);
      gain2.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);
    } catch {
      // ignore
    }
  }

  // 瓷器碰杯
  playPorcelainClink() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2400, now);
      osc.frequency.exponentialRampToValueAtTime(1800, now + 0.08);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch {
      // ignore
    }
  }

  // 点火火柴
  playMatchStrike() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.15);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1800, now);
      filter.Q.setValueAtTime(3, now);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
    } catch {
      // ignore
    }
  }

  // 摆木放置
  playWoodPlacement() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.08);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // ignore
    }
  }

  // 熄灭吹气
  playExtinguish() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.12);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
    } catch {
      // ignore
    }
  }
}

export const sound = new SoundEngine();
