/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Cloud, MessageSquare, Users, Settings, Sparkles, LogOut } from 'lucide-react';
import { useGlobal } from '../../context/GlobalContext';

const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, user, setIsProfileModalOpen, logout, conversations, setActiveConversation } = useGlobal();

  const navItems = [
    { id: 'home', icon: Cloud, label: 'My Cloud' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'contacts', icon: Users, label: 'Contacts' },
    { id: 'settings', icon: Settings, label: 'Settings' },
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
    <aside className="h-full flex flex-col justify-between bg-card w-20 items-center py-8 rounded-xl shadow-sm font-manrope text-sm antialiased text-zinc-700">
      <div className="flex flex-col items-center gap-8">
        <div className="text-zinc-900 font-bold text-xl">
          <Sparkles className="w-8 h-8" />
        </div>
        <nav className="flex flex-col gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`p-3 transition-all scale-95 active:scale-90 duration-200 rounded-full ${
                activeTab === item.id
                  ? 'bg-zinc-200 text-zinc-900'
                  : 'text-zinc-500 hover:text-zinc-800'
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
          className="p-3 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
          title="Đăng xuất"
        >
          <LogOut className="w-6 h-6" />
        </button>
        <button
          onClick={() => setIsProfileModalOpen(true)}
          className="w-12 h-12 rounded-full overflow-hidden border-2 border-surface-container shadow-sm hover:ring-2 hover:ring-primary/20 transition-all"
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
