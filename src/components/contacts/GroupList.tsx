/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Search, Users, MessageCircle, MoreVertical, LogOut, Crown, ChevronRight } from 'lucide-react';
import { useGlobal } from '../../context/GlobalContext';
import { motion, AnimatePresence } from 'motion/react';

const GroupList: React.FC = () => {
  const { conversations, setActiveConversation, setActiveTab, user, leaveGroup, changeGroupAdmin, friendList } = useGlobal();
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectingAdminFor, setSelectingAdminFor] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
        setSelectingAdminFor(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const groupConversations = conversations.filter(
    (conv) => conv.isGroup && conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenChat = (group: any) => {
    setActiveConversation(group);
    setActiveTab('chat');
  };

  const handleLeaveGroup = (groupId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn rời khỏi nhóm này?')) {
      leaveGroup(groupId);
      setOpenMenuId(null);
    }
  };

  const handleChangeAdmin = (groupId: string, newAdminId: string) => {
    changeGroupAdmin(groupId, newAdminId);
    setSelectingAdminFor(null);
    setOpenMenuId(null);
  };

  return (
    <div className="h-full flex flex-col bg-card border border-outline-variant/30 rounded-3xl overflow-hidden">
      <header className="p-6 border-b border-outline-variant/30 bg-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-slate-800" />
            Danh sách nhóm
          </h2>
          <span className="bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-bold">
            {groupConversations.length} Nhóm
          </span>
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm kiếm nhóm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-slate-300 focus:outline-none placeholder:text-slate-400 transition-all"
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {groupConversations.map((group) => {
              const isAdmin = group.adminId === user?.id;
              const members = group.members?.map(id => {
                if (id === user?.id) return user;
                return friendList.find(f => f.id === id);
              }).filter(Boolean) || [];

              return (
                <motion.div
                  key={group.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border border-slate-200 shadow-sm p-4 rounded-2xl hover:shadow-md transition-all group relative"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={group.avatar}
                        alt={group.name}
                        className="w-12 h-12 rounded-2xl object-cover shadow-sm"
                      />
                      <div>
                        <h3 className="font-bold text-slate-900 truncate max-w-[120px]">
                          {group.name}
                        </h3>
                        <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                          {group.members?.length || 0} Thành viên
                        </p>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <button 
                        onClick={() => setOpenMenuId(openMenuId === group.id ? null : group.id)}
                        className={`p-1.5 rounded-lg text-slate-400 transition-all ${openMenuId === group.id ? 'bg-slate-100 text-slate-900' : 'hover:bg-white'}`}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {openMenuId === group.id && (
                        <div 
                          ref={menuRef}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 animate-in fade-in zoom-in duration-200"
                        >
                          {isAdmin && (
                            <button 
                              onClick={() => setSelectingAdminFor(group.id)}
                              className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-all"
                            >
                              <div className="flex items-center gap-2">
                                <Crown className="w-4 h-4 text-amber-500" />
                                <span>Chọn trưởng nhóm</span>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                            </button>
                          )}
                          <button 
                            onClick={() => handleLeaveGroup(group.id)}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-all"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Rời nhóm</span>
                          </button>

                          {selectingAdminFor === group.id && (
                            <div className="absolute top-0 right-full mr-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 animate-in slide-in-from-right-2 duration-200">
                              <div className="px-4 py-2 border-b border-slate-50">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Chọn admin mới</span>
                              </div>
                              <div className="max-h-48 overflow-y-auto py-1">
                                {members.filter(m => m.id !== user?.id).map(member => (
                                  <button
                                    key={member.id}
                                    onClick={() => handleChangeAdmin(group.id, member.id)}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-all"
                                  >
                                    <img src={member.avatar} alt="" className="w-5 h-5 rounded-full" />
                                    <span className="truncate">{member.name}</span>
                                  </button>
                                ))}
                                {members.length <= 1 && (
                                  <div className="px-4 py-2 text-xs text-slate-400 italic">Không có thành viên khác</div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenChat(group)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-800 text-white rounded-xl text-xs font-medium hover:bg-slate-700 transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Nhắn tin
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {groupConversations.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-zinc-300" />
            </div>
            <p className="text-zinc-500 font-medium">Chưa có nhóm nào</p>
            <p className="text-xs text-zinc-400 mt-1">Hãy tạo nhóm mới để bắt đầu trò chuyện</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupList;
