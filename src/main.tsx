/**
 * @file main.tsx
 * @description 应用程序入口文件，挂载 React 根节点并导入全局样式。
 */
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {DialogHost} from './ui/common/dialog';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* 通用弹窗宿主：全应用唯一挂载点，承载所有弹窗的生命周期 */}
    <DialogHost />
  </StrictMode>,
);
