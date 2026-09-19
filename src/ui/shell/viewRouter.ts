/**
 * @file viewRouter.ts
 * @description 轻量视图路由：把「当前显示哪个页面」的判定与 URL 约定封闭在一处。
 *
 * 目前基于 hash / query 的登录深链约定（#/login、#login、?login、?page=login）。
 * 后续若要替换为 react-router-dom，只需改写本模块，页面组件不受影响。
 */
import { useCallback, useEffect, useState } from 'react';

export type ViewName = 'hall' | 'auth';

/** 判断当前 URL 是否指向登录页 */
const isAuthLocation = (): boolean => {
  if (typeof window === 'undefined') return false;
  const hash = window.location.hash;
  const params = new URLSearchParams(window.location.search);
  return (
    hash === '#/login' ||
    hash === '#login' ||
    params.get('page') === 'login' ||
    params.has('login') ||
    params.has('auth')
  );
};

export const parseView = (): ViewName => (isAuthLocation() ? 'auth' : 'hall');

/** 切换视图并同步 URL（登录页带 #/login，回到馆空间清除该 hash） */
export const navigateToView = (view: ViewName): void => {
  if (typeof window === 'undefined') return;
  const { pathname, search } = window.location;
  if (view === 'auth') {
    if (window.location.hash !== '#/login') window.location.hash = '#/login';
    return;
  }
  if (window.location.hash === '#/login' || window.location.hash === '#login') {
    window.history.pushState('', document.title, pathname + search);
  }
};

export interface ViewRouter {
  view: ViewName;
  navigate: (view: ViewName) => void;
}

/** 订阅 URL 变化的视图路由 hook */
export const useViewRouter = (): ViewRouter => {
  const [view, setView] = useState<ViewName>(() => parseView());

  useEffect(() => {
    const sync = () => setView(parseView());
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);

  const navigate = useCallback((next: ViewName) => {
    navigateToView(next);
    setView(next);
  }, []);

  return { view, navigate };
};
