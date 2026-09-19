/**
 * @file App.tsx
 * @description 应用外壳（App Shell）：只负责视图路由、登录态持久化与全局弹窗宿主。
 *
 * 具体业务页面（馆空间）位于 src/pages/hall，登录页位于 src/ui/auth，
 * 本文件不承载任何场景陈设、摆件或弹窗内容。
 */
import React, { useEffect, useState } from 'react';
import { AuthPage } from './ui/auth';
import { HallSpacePage } from './pages/hall/HallSpacePage';
import { openAgreement } from './features/agreement';
import { useViewRouter } from './app/viewRouter';
import type { UserProfile } from './types';

const USER_STORAGE_KEY = 'memery_current_user';

const readStoredUser = (): UserProfile | null => {
  try {
    const saved = localStorage.getItem(USER_STORAGE_KEY);
    return saved ? (JSON.parse(saved) as UserProfile) : null;
  } catch {
    return null;
  }
};

const App: React.FC = () => {
  const { view, navigate } = useViewRouter();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(readStoredUser);

  // 登录态持久化集中在外壳，页面不直接接触存储
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (err) {
      console.error(err);
    }
  }, [currentUser]);

  if (view === 'auth') {
    return (
      <div className="relative w-full min-h-screen bg-[#0c0a09]">
        <AuthPage
          onBack={() => navigate('hall')}
          onSuccess={(user) => {
            setCurrentUser(user);
            navigate('hall');
          }}
          onOpenAgreement={openAgreement}
        />
      </div>
    );
  }

  return (
    <HallSpacePage
      currentUser={currentUser}
      onRequestAuth={() => navigate('auth')}
      onUserChange={setCurrentUser}
    />
  );
};

export default App;
