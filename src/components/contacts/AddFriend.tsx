/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, UserPlus, Check, X, UserCheck, UserX, Clock, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useGlobal } from '../../context/GlobalContext';
import { User } from '../../types/types';
import { dataService } from '../../services/dataService';

const AddFriend: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const { friendList, friendRequests, setFriendRequests } = useGlobal();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    // Mock search logic
    setTimeout(() => {
      const results: User[] = [
        {
          id: 'user_search_1',
          name: 'Nguyễn Văn A',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=A',
          status: 'online' as any,
        },
        {
          id: 'user_search_2',
          name: 'Trần Thị B',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=B',
          status: 'offline' as any,
        },
      ].filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()));
      
      setSearchResults(results);
      setIsSearching(false);
    }, 800);
  };

  const isAlreadyFriend = (userId: string) => {
    return friendList.some(f => f.id === userId);
  };

  const handleAccept = async (requestId: string) => {
    try {
      await dataService.acceptFriendRequest(requestId);
      setFriendRequests((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error('Failed to accept request', error);
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      await dataService.rejectFriendRequest(requestId);
      setFriendRequests((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error('Failed to reject request', error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full flex flex-col bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-sm overflow-hidden"
    >
      <div className="p-8 border-b border-zinc-200/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black tracking-tight">Kết nối bạn bè</h2>
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            Luminous
          </div>
        </div>
        
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white/60 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          />
          <button 
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-zinc-800 transition-all"
          >
            Tìm kiếm
          </button>
        </form>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-10">
        {/* Friend Requests Section */}
        {friendRequests.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Lời mời kết bạn ({friendRequests.length})</p>
              <div className="h-[1px] flex-1 bg-zinc-200/50 ml-4"></div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <AnimatePresence>
                {friendRequests.map((req) => (
                  <motion.div 
                    key={req.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white/60 p-5 rounded-2xl border border-zinc-100 flex items-center justify-between hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <img src={req.senderAvatar} alt={req.senderName} className="w-14 h-14 rounded-full object-cover shadow-sm" />
                      <div className="space-y-1">
                        <h4 className="font-bold text-zinc-900">{req.senderName}</h4>
                        <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-medium uppercase tracking-tighter">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(req.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAccept(req.id)}
                        className="flex items-center gap-2 bg-zinc-900 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-zinc-800 transition-all active:scale-95"
                      >
                        <UserCheck className="w-4 h-4" />
                        Đồng ý
                      </button>
                      <button
                        onClick={() => handleReject(req.id)}
                        className="flex items-center gap-2 bg-zinc-100 text-zinc-500 px-5 py-2 rounded-xl text-xs font-bold hover:bg-red-50 hover:text-red-500 transition-all active:scale-95"
                      >
                        <UserX className="w-4 h-4" />
                        Từ chối
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Search Results Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
              {isSearching ? 'Đang tìm kiếm...' : searchResults.length > 0 ? 'Kết quả tìm kiếm' : 'Gợi ý kết nối'}
            </p>
            <div className="h-[1px] flex-1 bg-zinc-200/50 ml-4"></div>
          </div>

          {isSearching ? (
            <div className="flex flex-col items-center justify-center h-40 space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
              <p className="text-zinc-500 text-sm">Đang tìm kiếm...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map((result) => (
                <div key={result.id} className="flex items-center justify-between p-5 bg-white/60 rounded-2xl border border-zinc-100 hover:border-zinc-200 transition-all group">
                  <div className="flex items-center gap-4">
                    <img src={result.avatar} alt={result.name} className="w-14 h-14 rounded-full object-cover shadow-sm" />
                    <div>
                      <h3 className="font-bold text-zinc-900">{result.name}</h3>
                      <p className="text-xs text-zinc-500">{result.status === 'online' ? 'Đang hoạt động' : 'Ngoại tuyến'}</p>
                    </div>
                  </div>
                  
                  {isAlreadyFriend(result.id) ? (
                    <div className="flex items-center gap-1 text-green-600 bg-green-50 px-4 py-2 rounded-xl text-xs font-bold">
                      <Check className="w-4 h-4" />
                      Đã là bạn bè
                    </div>
                  ) : (
                    <button className="flex items-center gap-2 bg-zinc-900 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-zinc-800 transition-all active:scale-95">
                      <UserPlus className="w-4 h-4" />
                      Kết bạn
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : searchQuery && !isSearching ? (
            <div className="flex flex-col items-center justify-center h-40 text-center space-y-2">
              <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mb-2">
                <X className="w-6 h-6 text-zinc-400" />
              </div>
              <p className="text-zinc-500 font-medium">Không tìm thấy kết quả</p>
              <p className="text-zinc-400 text-xs">Hãy thử tìm kiếm với từ khóa khác</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-center space-y-4 opacity-60">
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-2">
                <UserPlus className="w-8 h-8 text-zinc-300" />
              </div>
              <div className="max-w-xs">
                <p className="text-zinc-500 font-bold">Tìm kiếm bạn mới</p>
                <p className="text-zinc-400 text-xs mt-1">Nhập tên hoặc email để tìm kiếm và kết nối với mọi người.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AddFriend;
