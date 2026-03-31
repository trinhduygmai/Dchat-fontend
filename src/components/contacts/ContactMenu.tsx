/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { UserPlus, Users, UserCheck } from 'lucide-react';
import { useGlobal } from '../../context/GlobalContext';

interface ContactMenuProps {
  activeContactTab: 'friends' | 'requests' | 'groups';
  setActiveContactTab: (tab: 'friends' | 'requests' | 'groups') => void;
}

const ContactMenu: React.FC<ContactMenuProps> = ({ activeContactTab, setActiveContactTab }) => {
  const { friendList, friendRequests } = useGlobal();

  const menuItems = [
    { id: 'friends', icon: UserCheck, label: 'Danh sách bạn bè', count: friendList.length },
    { id: 'requests', icon: UserPlus, label: 'Lời mời kết bạn', count: friendRequests.length, badge: true },
    { id: 'groups', icon: Users, label: 'Danh sách nhóm', count: 0 },
  ];

  return (
    <section className="w-80 flex flex-col bg-card rounded-xl overflow-hidden h-full shadow-sm">
      <div className="p-6 pb-4">
        <h1 className="text-xl font-extrabold tracking-tight font-headline mb-4">Danh bạ</h1>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveContactTab(item.id as any)}
            className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${
              activeContactTab === item.id
                ? 'bg-zinc-200 text-zinc-900 font-bold'
                : 'hover:bg-zinc-100 text-zinc-600'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </div>
            {item.count > 0 && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${item.badge ? 'bg-red-500 text-white' : 'bg-zinc-300 text-zinc-700'}`}>
                {item.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </section>
  );
};

export default ContactMenu;
