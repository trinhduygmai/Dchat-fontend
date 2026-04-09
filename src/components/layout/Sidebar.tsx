/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Cloud, MessageSquare, Users, Settings, Sparkles, LogOut, Contact } from 'lucide-react';
import { useGlobal } from '../../context/GlobalContext';

const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, user, setIsProfileModalOpen, logout, conversations, setActiveConversation } = useGlobal();

  const navItems = [
    { id: 'home', icon: Cloud, label: 'My Cloud' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'contacts', icon: Contact, label: 'Danh bạ' },
    { id: 'settings', icon: Settings, label: 'Cài đặt' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id as any);
    if (id === 'home') {
      const cloudConv = conversations.find(c => c.id === 'my-cloud');
      if (cloudConv) {
        setActiveConversation(cloudConv);
      }
    }
  };

  return (
    <aside className="h-full flex flex-col justify-between bg-surface-container-high w-20 items-center py-8 rounded-3xl border border-outline-variant/30 shadow-sm font-manrope text-sm antialiased text-slate-700">
      <div className="flex flex-col items-center gap-8">
        <div className="text-slate-900 font-bold text-xl">
          <Sparkles className="w-8 h-8" />
        </div>
        <nav className="flex flex-col gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`p-3 transition-all scale-95 active:scale-90 duration-200 rounded-full ${
                activeTab === item.id
                  ? 'bg-slate-800 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-white'
              }`}
            >
              <item.icon className="w-6 h-6" />
            </button>
          ))}
        </nav>
      </div>
      <div className="flex flex-col items-center gap-6">
        <button
          onClick={() => logout()}
          className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
          title="Đăng xuất"
        >
          <LogOut className="w-6 h-6" />
        </button>
        <button
          onClick={() => setIsProfileModalOpen(true)}
          className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm hover:ring-2 hover:ring-slate-300 transition-all"
        >
          <img
            src={user?.avatar}
            alt="User profile avatar"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
