/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Camera, Check, Users, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useGlobal } from '../../context/GlobalContext';

const CreateGroupModal: React.FC = () => {
  const { isCreateGroupModalOpen, setIsCreateGroupModalOpen, friendList, createGroup } = useGlobal();
  const [groupName, setGroupName] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [creating, setCreating] = useState(false);

  const toggleFriend = (friendId: string) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    );
  };

  const handleCreateGroup = async () => {
    if (!groupName || selectedFriends.length === 0) return;
    setCreating(true);
    try {
      // Real creation logic via context
      await new Promise((resolve) => setTimeout(resolve, 800)); // Short delay for UX
      createGroup(groupName, selectedFriends);
      setIsCreateGroupModalOpen(false);
      setGroupName('');
      setSelectedFriends([]);
    } catch (error) {
      console.error('Failed to create group', error);
    } finally {
      setCreating(false);
    }
  };

  const filteredFriends = friendList.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isCreateGroupModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[650px]"
      >
        <header className="p-6 border-b border-zinc-100 flex justify-between items-center">
          <h2 className="font-bold text-xl flex items-center gap-2">
            <Users className="w-6 h-6 text-zinc-900" />
            Tạo nhóm mới
          </h2>
          <button
            onClick={() => setIsCreateGroupModalOpen(false)}
            className="p-2 hover:bg-zinc-100 rounded-full transition-all text-zinc-500"
          >
            <X className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Group Info Section */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-zinc-100 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                <Users className="w-10 h-10 text-zinc-300" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-bubble-dark text-white rounded-full shadow-lg hover:scale-110 transition-all">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            <div className="w-full space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Tên nhóm</label>
              <input
                type="text"
                placeholder="Nhập tên nhóm..."
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full bg-zinc-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          {/* Friend Selection Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                Chọn thành viên ({selectedFriends.length})
              </label>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Tìm kiếm bạn bè..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="space-y-1 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {filteredFriends.map((friend) => (
                <button
                  key={friend.id}
                  onClick={() => toggleFriend(friend.id)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-zinc-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full object-cover shadow-sm" />
                    <span className="font-medium text-sm text-zinc-900">{friend.name}</span>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedFriends.includes(friend.id) 
                      ? 'bg-bubble-dark border-bubble-dark text-white' 
                      : 'border-zinc-200 group-hover:border-zinc-300'
                  }`}>
                    {selectedFriends.includes(friend.id) && <Check className="w-4 h-4" />}
                  </div>
                </button>
              ))}
              {filteredFriends.length === 0 && (
                <p className="text-center py-8 text-zinc-400 text-sm">Không tìm thấy bạn bè</p>
              )}
            </div>
          </div>
        </div>

        <footer className="p-6 border-t border-zinc-100 flex gap-4">
          <button
            onClick={() => setIsCreateGroupModalOpen(false)}
            className="flex-1 py-3.5 rounded-2xl font-bold text-zinc-500 hover:bg-zinc-100 transition-all"
          >
            Hủy
          </button>
          <button
            onClick={handleCreateGroup}
            disabled={creating || !groupName || selectedFriends.length === 0}
            className={`flex-1 py-3.5 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
              !groupName || selectedFriends.length === 0
                ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                : 'bg-bubble-dark text-white hover:opacity-90 shadow-lg shadow-zinc-200'
            }`}
          >
            {creating ? 'Đang tạo...' : 'Tạo nhóm'}
          </button>
        </footer>
      </motion.div>
    </div>
  );
};

export default CreateGroupModal;
