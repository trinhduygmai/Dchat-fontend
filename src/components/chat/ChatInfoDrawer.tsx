/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Users, Image, FileText, Link, ChevronDown, ChevronRight, UserPlus, UserMinus, LogOut, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useGlobal } from '../../context/GlobalContext';
import { dataService } from '../../services/dataService';
import { ChatMedia } from '../../types/types';

interface ChatInfoDrawerProps {
  isGroup?: boolean;
  currentUserRole?: 'admin' | 'member';
}

const ChatInfoDrawer: React.FC<ChatInfoDrawerProps> = ({ 
  isGroup: propsIsGroup, 
  currentUserRole = 'member' 
}) => {
  const { isChatInfoOpen, setIsChatInfoOpen, activeConversation, friendList, user, leaveGroup, changeGroupAdmin } = useGlobal();
  const [media, setMedia] = useState<ChatMedia | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    members: true,
    media: true,
    files: true,
    links: true,
  });

  const isGroup = propsIsGroup ?? activeConversation?.isGroup;

  useEffect(() => {
    if (isChatInfoOpen && activeConversation) {
      const fetchMedia = async () => {
        const data = await dataService.getChatMedia(activeConversation.id);
        setMedia(data);
      };
      fetchMedia();
    }
  }, [isChatInfoOpen, activeConversation]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <AnimatePresence>
      {isChatInfoOpen && (
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-80 h-full bg-surface-container-high border-l border-outline-variant/30 flex flex-col z-50 shadow-xl"
        >
          <header className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
            <h3 className="font-bold text-lg text-slate-900">Thông tin hội thoại</h3>
            <button
              onClick={() => setIsChatInfoOpen(false)}
              className="p-2 hover:bg-white rounded-full transition-all text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <img
                src={activeConversation?.avatar}
                alt={activeConversation?.name}
                className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white"
              />
              <h4 className="font-bold text-xl text-slate-900">{activeConversation?.name}</h4>
              {!isGroup && !activeConversation?.isCloud && (
                <span className="text-sm text-green-500 font-medium">Online</span>
              )}
              {isGroup && (
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Nhóm • {activeConversation?.members?.length || 0} thành viên
                </span>
              )}
            </div>

            <div className="space-y-4">
              {/* Members Section */}
              {isGroup && (
                <div className="space-y-3">
                  <button
                    onClick={() => toggleSection('members')}
                    className="w-full flex justify-between items-center font-bold text-xs text-slate-400 uppercase tracking-widest"
                  >
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Thành viên
                    </div>
                    {expandedSections.members ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  
                  {expandedSections.members && (
                    <div className="space-y-3">
                      <button className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 transition-all text-slate-600 group">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-white transition-all">
                          <UserPlus className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold">Thêm thành viên</span>
                      </button>

                      <div className="space-y-2">
                        {/* Render actual members if available, otherwise fallback to mock */}
                        {(activeConversation?.members?.map(id => {
                          if (id === user?.id) return user;
                          return friendList.find(f => f.id === id);
                        }).filter(Boolean) as any[]).map((member) => (
                          <div key={member.id} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                              <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full object-cover" />
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-900">{member.name}</span>
                                {member.id === activeConversation?.adminId && (
                                  <span className="text-[10px] font-bold text-slate-800 uppercase">Trưởng nhóm</span>
                                )}
                              </div>
                            </div>
                            {currentUserRole === 'admin' && member.id !== user?.id && (
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                <button 
                                  onClick={() => {
                                    if (window.confirm(`Bạn có chắc muốn chuyển quyền trưởng nhóm cho ${member.name}?`)) {
                                      changeGroupAdmin(activeConversation!.id, member.id);
                                    }
                                  }}
                                  className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-all"
                                  title="Chỉ định trưởng nhóm"
                                >
                                  <Crown className="w-4 h-4" />
                                </button>
                                <button 
                                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                  title="Xóa khỏi nhóm"
                                >
                                  <UserMinus className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Media Section */}
              <div className="space-y-2">
                <button
                  onClick={() => toggleSection('media')}
                  className="w-full flex justify-between items-center font-bold text-sm text-slate-500 uppercase tracking-widest"
                >
                  <div className="flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    Photos & Videos
                  </div>
                  {expandedSections.media ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                {expandedSections.media && (
                  <div className="grid grid-cols-3 gap-2 pl-6">
                    {media?.images.map((img, i) => (
                      <img key={i} src={img} alt="Media" className="w-full aspect-square object-cover rounded-md cursor-pointer hover:opacity-80 transition-all shadow-sm border border-slate-100" />
                    ))}
                  </div>
                )}
              </div>

              {/* Files Section */}
              <div className="space-y-2">
                <button
                  onClick={() => toggleSection('files')}
                  className="w-full flex justify-between items-center font-bold text-sm text-slate-500 uppercase tracking-widest"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Files
                  </div>
                  {expandedSections.files ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                {expandedSections.files && (
                  <div className="pl-6 space-y-3">
                    {media?.files.map((file, i) => (
                      <div key={i} className="flex items-center gap-3 cursor-pointer group">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-500 group-hover:text-slate-800 transition-all">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                          <p className="text-xs text-slate-500">{file.size}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Links Section */}
              <div className="space-y-2">
                <button
                  onClick={() => toggleSection('links')}
                  className="w-full flex justify-between items-center font-bold text-sm text-slate-500 uppercase tracking-widest"
                >
                  <div className="flex items-center gap-2">
                    <Link className="w-4 h-4" />
                    Links
                  </div>
                  {expandedSections.links ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                {expandedSections.links && (
                  <div className="pl-6 space-y-3">
                    {media?.links.map((link, i) => (
                      <a key={i} href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-500 group-hover:text-slate-800 transition-all">
                          <Link className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">{link.title}</p>
                          <p className="text-xs text-slate-500 truncate">{link.url}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {isGroup && (
            <div className="p-6 border-t border-slate-100">
              <button 
                onClick={() => {
                  if (window.confirm('Bạn có chắc chắn muốn rời khỏi nhóm này?')) {
                    leaveGroup(activeConversation!.id);
                    setIsChatInfoOpen(false);
                  }
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Rời nhóm
              </button>
            </div>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default ChatInfoDrawer;
