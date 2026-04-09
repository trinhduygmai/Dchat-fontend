/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { UserPlus, Users, UserCheck } from 'lucide-react';
import { useGlobal } from '../../context/GlobalContext';

interface ContactMenuProps {
  activeContactTab: 'friends' | 'groups' | 'connections';
  setActiveContactTab: (tab: 'friends' | 'groups' | 'connections') => void;
}

const ContactMenu: React.FC<ContactMenuProps> = ({ activeContactTab, setActiveContactTab }) => {
  const { friendList, friendRequests, conversations } = useGlobal();

  const groupCount = conversations.filter(c => c.isGroup).length;

  const menuItems = [
    { id: 'friends', icon: UserCheck, label: 'Danh sách bạn bè', count: friendList.length },
    { id: 'connections', icon: UserPlus, label: 'Thêm bạn & Lời mời', count: friendRequests.length, badge: true },
    { id: 'groups', icon: Users, label: 'Danh sách nhóm', count: groupCount },
  ];

  return (
    <section className="w-80 flex flex-col bg-surface-container-high border border-outline-variant/30 rounded-3xl overflow-hidden h-full">
      <div className="p-6 pb-4">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight font-headline mb-4">Danh bạ</h1>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveContactTab(item.id as any)}
            className={`w-full flex items-center justify-between p-4 transition-all ${
              activeContactTab === item.id
                ? 'border border-slate-800 text-slate-900 bg-white rounded-xl font-medium'
                : 'border border-transparent text-slate-500 hover:bg-white hover:text-slate-800 rounded-xl'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </div>
            {item.count > 0 && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${item.badge ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-700'}`}>
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
