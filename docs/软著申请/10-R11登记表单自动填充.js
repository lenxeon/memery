/**
 * 中国版权保护中心 R11「软件著作权登记申请」表单 —— 自动填充脚本（v2，兼容沙箱环境）
 * ============================================================
 * 软件名称：暖念纪念场景模拟软件 V1.0
 * 用法：
 *   1. 打开登记申请页（register.ccopyright.com.cn/...r11.html），进入需要填写的步骤；
 *   2. F12 打开控制台，把本文件全部内容粘贴回车（粘贴后自动跑一遍）；
 *   3. 进入新步骤后在控制台执行 window.__r11fill() 再跑一次；
 *      —— 想覆盖已填内容：window.__r11fill(true)
 *   4. 只填充「文本框 / 多行文本框」；下拉框（编程语言等）需手动选择；
 *   5. 填完务必人工核对，尤其是开发完成日期、首次发表日期。
 * 原理：定位标签文本 → 找到同表单项内的输入控件 →
 *      沿原型链取 value 的原生 setter 写值并派发 input/change 事件（兼容 React 受控组件）。
 * v2 修复：不再直接引用 window.HTMLInputElement / HTMLTextAreaElement，
 *      改为从元素实例的原型链动态查找 setter，避免在 iframe / 沙箱页面中报
 *      "Cannot read properties of undefined (reading 'prototype')"。
 */
(function () {
  'use strict';

  /* ---------- 申请表内容（与 docs/软著申请/00 填表说明一致，可按需修改） ---------- */

  var FIELDS = [
    {
      label: /开发的?硬件环境|开发硬件环境/,
      value: '通用PC或Mac（Intel x86_64 / Apple M 系列均可，iOS 端打包需 macOS 及 Xcode），内存 8GB 及以上，硬盘可用空间 10GB 及以上，显示适配器支持 WebGL 2.0；联网环境用于安装依赖与拉取资源。',
    },
    {
      label: /运行的?硬件环境|运行硬件环境/,
      value: '以 iOS、Android 智能手机与平板为主（支持 WebGL 的移动端浏览器或 App 内 WebView），建议内存 4GB 及以上；同时兼容通用 PC、Mac 桌面设备。',
    },
    {
      /* 「该软件的运行平台 / 操作系统」（上限50字） */
      label: /运行平台/,
      value: 'iOS 15 及以上、Android 10 及以上为主，兼容 Windows、macOS 桌面浏览器',
    },
    {
      /* 「软件运行支撑环境 / 支持软件」（上限50字） */
      label: /支撑环境|支持软件/,
      value: 'iOS Safari、Android Chrome 及 App 内 WebView 运行环境',
    },
    {
      label: /开发.{0,3}该软件.{0,3}操作系统|开发的操作系统|开发操作系统/,
      value: 'macOS 12 及以上（移动端打包）、Windows 10 及以上',
    },
    {
      label: /软件开发环境|开发工具/,
      value: 'Visual Studio Code（代码编辑）；Node.js 18 及以上（运行时）；Vite 6.2（构建与开发服务）；TypeScript 5.8（类型开发语言）；React 19（界面框架）；PixiJS 8.20（WebGL 渲染引擎）；Tailwind CSS 4（样式工具链）；Git（版本管理）；Chrome / Edge（调试）。',
    },
    {
      label: /源程序量|代码量|源代码量/,
      value: '28388',
    },
    {
      /* 「开发目的」（上限50字） */
      label: /开发目的/,
      value: '为公众提供便捷、庄重的线上纪念追思与祈福服务工具',
    },
    {
      /* 「面向领域 / 行业」（上限50字） */
      label: /面向领域|行业/,
      value: '互联网信息服务、数字纪念与文化服务',
    },
    {
      label: /主要功能|功能介绍|软件功能/,
      value:
        '本软件为面向纪念、追思与祈福场景的交互式虚拟空间模拟软件，以 iOS、Android 移动端为主并兼容桌面浏览器，无需专用硬件。软件以中式堂轩与供案为空间原型，构建可进入、可操作的2.5D纪念场景，主要功能包括：一、空间与陈设，提供6式壁景、6种地坪、4种案木与6式桌布的组合配置，供案、遗像牌位、花器、果盘、香炉、烛台、茶杯、颂钵等器物可在案上自由拖摆放位，支持触摸拖拽、长按查看与一键复位；二、供奉交互，支持15种花卉敬献与一键布设、18样果品供盘、蜡烛点燃与熄灭、香炉上香、祝文祈愿提交、颂钵击响，并可按「现实/演示/极速」流速模拟花开花谢与香烛燃尽的生命过程；三、光影造境，提供日照总闸、白昼/黄昏/夜色三时辰切换与系统时钟跟随，丁达尔光束浓度与入射倾角调节，微风吹拂强度调节，浮尘与落瓣粒子效果；四、名录与纪念，支持堂轩筹建、堂轩名录切换、遗像与纪念寄语编辑、守护天数与祈福计数；五、器物典故，内置58条花、果、器、纹样文化档案，长按器物即可查阅；六、声律，内置4支五声音阶环境曲与7种法音音效，可独立开关与音量调节；七、场景设置，提供画质、音效、粒子浓度、时间流速与视角偏好的统一配置；八、数据与隐私，场景配置默认本地保存并支持清空重置，肖像与寄语等敏感内容默认不出本机。九、状态可视，花器、果盘、香烛的剩余状态在案面与面板上同步呈现，便于随时查看与更换；十、引导与容错，首次进入提供布设指引与器物说明，配置异常时回退至默认堂轩，避免空白场景。软件运行期无服务端交互，离线亦可正常使用。',
    },
    {
      label: /技术特点|特点介绍/,
      value:
        '一、渲染架构采用UI与渲染二分：React19负责交互与面板，PixiJS8.20（WebGL）负责场景绘制，二者仅通过统一数据契约通信，杜绝渲染层与业务层耦合。二、真2.5D视差：建立背景、遗像、地坪、供案、器物、烟尘、灯光七层容器，各层按不同系数逐帧阻尼插值，产生指针或触摸跟随的进深视差。三、透视地坪使用主题自带的完整透视PNG，透视已烘焙在图像中；Pixi将其作为普通精灵等比摆放并裁切以适配手机地坪画幅，不使用网格投影或UV映射，配合ColorMatrixFilter实现昼夜色温与明暗氛围。四、矢量纹理管线：器物、花卉、果品与供案均以参数化SVG描述，经离屏Canvas超采样（2.0—2.5倍）光栅化为GPU纹理并全局缓存，一次生成、多处复用，显著降低移动端首屏开销。五、光照与粒子：丁达尔光束以几何形态一次烘焙成贴图、运行时仅做加色混合与相位变换；浮尘、落瓣、青烟、烛焰均为对象池化粒子，配合BlurFilter与add混合实现柔光与光雾。六、生命仿真：统一世界时钟推进含苞—盛开—微凋—枯萎—撤下的生命周期，并按流速节流提交，避免高频重排。七、音频以Web Audio实时合成五声音阶环境曲与法音，无音频文件依赖，便于移动端首包瘦身。八、移动端适配：视口与设备像素比自适应，触摸与鼠标事件归一，安全区留白与竖屏布局优化，保证小屏可用性。九、矢量模板嵌入几何隐写数字水印，可校验溯源。十、性能闭环：贴图与粒子池化、脏标记重绘、按需生成与缓存淘汰，目标60FPS，并可按设置降低粒子浓度与超采样倍率。',
    },
  ];

  /* ---------- 工具函数 ---------- */

  /** 从元素实例的原型链上找 value 的原生 setter（不依赖任何全局构造函数） */
  function findValueSetter(el) {
    var proto = Object.getPrototypeOf(el);
    while (proto) {
      var desc = Object.getOwnPropertyDescriptor(proto, 'value');
      if (desc && typeof desc.set === 'function') return desc.set;
      proto = Object.getPrototypeOf(proto);
    }
    return null;
  }

  function dispatch(el, type) {
    var ev = null;
    try {
      ev = new Event(type, { bubbles: true, cancelable: true });
    } catch (e) {
      try {
        ev = document.createEvent('Event');
        ev.initEvent(type, true, true);
      } catch (e2) {
        return;
      }
    }
    el.dispatchEvent(ev);
  }

  function setValue(el, value) {
    var setter = findValueSetter(el);
    if (setter) {
      setter.call(el, value);
    } else {
      el.value = value;
    }
    dispatch(el, 'input');
    dispatch(el, 'change');
    dispatch(el, 'blur');
  }

  function norm(s) {
    return (s || '').replace(/[*：:\s]/g, '');
  }

  /** 在标签元素附近找输入控件 */
  function findFieldIn(labelEl) {
    var root =
      (labelEl.closest &&
        labelEl.closest(
          '[class*="form-item"],[class*="FormItem"],[class*="field"],.el-form-item,.ant-form-item,li,tr'
        )) ||
      labelEl.parentElement ||
      labelEl;
    var guard = 0;
    while (root && guard++ < 6) {
      var el = root.querySelector('textarea, input[type="text"], input:not([type])');
      if (el) return el;
      root = root.parentElement;
    }
    return null;
  }

  function collectLabelNodes() {
    var nodes = [];
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, {
      acceptNode: function (n) {
        var tag = n.tagName;
        if (
          tag === 'LABEL' ||
          tag === 'DT' ||
          tag === 'TH' ||
          tag === 'SPAN' ||
          tag === 'DIV' ||
          tag === 'P' ||
          tag === 'TD'
        ) {
          var t = norm(n.textContent);
          if (t && t.length <= 20 && n.children.length <= 3) return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_SKIP;
      },
    });
    while (walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
  }

  /* ---------- 编程语言标签点选 ---------- */

  /** 点击「展开更多」后，选中 TypeScript / JavaScript / HTML 语言标签 */
  function selectLanguages() {
    var clicked = [];
    // 1) 展开全部语言标签
    document.querySelectorAll('button, a, div, span').forEach(function (el) {
      if (/^\s*展\s*开\s*更\s*多\s*$/.test(el.textContent || '') && el.children.length <= 2) {
        el.click();
      }
    });
    // 2) 点选目标语言标签（用 pointer 事件兼容 React）
    var want = /TypeScript|JavaScript|HTML/i;
    document.querySelectorAll('button, [role="button"], label, div, span').forEach(function (el) {
      var t = (el.textContent || '').trim();
      if (t && t.length <= 20 && want.test(t) && el.children.length <= 2) {
        // 已处于选中态的标签不重复点击，避免被取消
        var cls = typeof el.className === 'string' ? el.className : '';
        if (/active|selected|checked|primary|blue/i.test(cls)) {
          clicked.push(t + '（已选中，跳过）');
          return;
        }
        var evType = window.PointerEvent ? 'pointerdown' : 'mousedown';
        try {
          el.dispatchEvent(
            new (window.PointerEvent || window.MouseEvent)(evType, { bubbles: true })
          );
          el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
        } catch (e) {
          /* ignore */
        }
        el.click();
        clicked.push(t);
      }
    });
    // 3) 若没点到 TypeScript 标签，把 TypeScript 写进「其他编程语言」
    var hasTs = clicked.some(function (t) {
      return /TypeScript/i.test(t);
    });
    if (!hasTs) {
      var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode: function (n) {
          return /其他编程语言/.test(n.nodeValue || '')
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
        },
      });
      var hit = walker.nextNode();
      if (hit && hit.parentElement) {
        var box =
          hit.parentElement.closest('[class*="form-item"],[class*="FormItem"],.ant-form-item') ||
          hit.parentElement.parentElement;
        var ta = box && box.querySelector('textarea');
        if (ta && !(ta.value || '').trim()) setValue(ta, 'TypeScript');
      }
    }
    return clicked;
  }

  /* ---------- 主流程 ---------- */

  function fillAll(overwrite) {
    var filled = [];
    var done = [];
    function seen(o) {
      return done.indexOf(o) !== -1;
    }

    collectLabelNodes().forEach(function (node) {
      var text = norm(node.textContent);
      if (!text || seen(node)) return;
      for (var i = 0; i < FIELDS.length; i++) {
        if (!FIELDS[i].label.test(text)) continue;
        var field = findFieldIn(node);
        if (field && !seen(field)) {
          var cur = (field.value || '').trim();
          if (overwrite || !cur) {
            try {
              setValue(field, FIELDS[i].value);
              done.push(field);
              filled.push(text);
            } catch (e) {
              console.warn('[R11] 写入失败：' + text, e);
            }
          }
        }
        break;
      }
    });

    if (filled.length) {
      console.log('%c[R11 自动填充] 已填 ' + filled.length + ' 项：', 'color:#0a7;font-weight:bold');
      filled.forEach(function (t) {
        console.log('  ✓ ' + t);
      });
    } else {
      console.log('%c[R11 自动填充] 本页没有匹配到可填字段（可能已填过、或当前步骤无文本项）', 'color:#c60');
      console.log('  → 可试 window.__r11fill(true) 强制覆盖');
    }
    var langs = selectLanguages();
    if (langs.length) {
      console.log('%c[R11 自动填充] 编程语言标签已点选：', 'color:#0a7;font-weight:bold');
      console.log('  ✓ ' + langs.join('、'));
      console.log('  → 请在页面上确认选中态无误（重复执行不会取消已选项）');
    }
    console.log('提示：下拉框（编程语言等）需手动选择；填完请人工核对。');
    return filled;
  }

  window.__r11fill = fillAll;
  fillAll(false);
})();
