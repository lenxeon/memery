/**
 * @file main.tsx
 * @description 应用程序入口文件，挂载 React 根节点并导入全局样式。
 */
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
