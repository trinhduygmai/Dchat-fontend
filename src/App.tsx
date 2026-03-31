/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GlobalProvider, useGlobal } from './context/GlobalContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/AuthPage/LoginPage';
import RegisterPage from './pages/AuthPage/RegisterPage';
import { Loader2 } from 'lucide-react';

const AppContent = () => {
  const { user, loading } = useGlobal();
  const [authView, setAuthView] = useState<'login' | 'register'>('login');

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-card">
        <Loader2 className="w-10 h-10 animate-spin text-bubble-dark mb-4" />
        <p className="text-zinc-500 font-medium animate-pulse">Đang tải Luminous...</p>
      </div>
    );
  }

  if (!user) {
    return authView === 'login' ? (
      <LoginPage onSwitchToRegister={() => setAuthView('register')} />
    ) : (
      <RegisterPage onSwitchToLogin={() => setAuthView('login')} />
    );
  }

  return <HomePage />;
};

export default function App() {
  return (
    <GlobalProvider>
      <AppContent />
    </GlobalProvider>
  );
}
