/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, MessageSquare, UserMinus } from 'lucide-react';
import { useGlobal } from '../../context/GlobalContext';

const FriendList: React.FC = () => {
  const { friendList, setActiveTab, setActiveConversation, conversations } = useGlobal();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFriends = friendList.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMessage = (friendId: string) => {
    const conv = conversations.find((c) => c.id === friendId);
    if (conv) {
      setActiveConversation(conv);
      setActiveTab('chat');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-card rounded-xl overflow-hidden shadow-sm h-full">
      <header className="px-8 h-20 bg-white/40 backdrop-blur-xl flex items-center border-b border-zinc-200/50">
        <h2 className="font-headline text-lg font-black text-zinc-900 tracking-tight">Danh sách bạn bè ({friendList.length})</h2>
      </header>
      <div className="p-6 pb-4">
        <div className="relative group max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm kiếm bạn bè..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface-container-high border-none rounded-full py-2.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline-variant"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFriends.map((friend) => (
          <div key={friend.id} className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex flex-col items-center text-center space-y-4 hover:shadow-md transition-all">
            <div className="relative">
              <img src={friend.avatar} alt={friend.name} className="w-20 h-20 rounded-full object-cover" />
              <span className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${friend.status === 'online' ? 'bg-green-500' : 'bg-zinc-400'}`}></span>
            </div>
            <h4 className="font-bold text-lg">{friend.name}</h4>
            <div className="flex gap-2 w-full">
              <button
                onClick={() => handleMessage(friend.id)}
                className="flex-1 flex items-center justify-center gap-2 bg-bubble-dark text-white py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                Nhắn tin
              </button>
              <button className="p-2.5 bg-zinc-100 text-zinc-500 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all">
                <UserMinus className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendList;
