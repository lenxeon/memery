/**
 * @file main.tsx
 * @description 应用程序入口文件，挂载 React 根节点并导入全局样式。
 */
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import { loadSceneThemes } from './pixi/scene/themes';

const mountApplication = async (): Promise<void> => {
  const root = createRoot(document.getElementById('root')!);
  try {
    // Theme consumers use the JSON-backed registry during module initialization.
    await loadSceneThemes();
    const [{ default: App }, { DialogHost }] = await Promise.all([
      import('./App.tsx'),
      import('./ui/common/dialog'),
    ]);
    root.render(
      <StrictMode>
        <App />
        {/* 通用弹窗宿主：全应用唯一挂载点，承载所有弹窗的生命周期 */}
        <DialogHost />
      </StrictMode>,
    );
  } catch (error) {
    console.error('Failed to load scene themes:', error);
    const detail = error instanceof Error ? error.message : typeof error === 'string' ? error : '设备未返回具体错误';
    root.render(
      <main role="alert" className="space-y-4 p-6 text-red-900">
        <p className="whitespace-pre-wrap break-all">应用启动遇到问题：{detail}</p>
        <button type="button" className="rounded-lg bg-red-900 px-4 py-2 text-white" onClick={() => window.location.reload()}>
          重新加载
        </button>
      </main>,
    );
  }
};

void mountApplication();
