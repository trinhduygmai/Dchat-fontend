/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useGlobal } from '../../context/GlobalContext';
import { Conversation } from '../../types/types';

const ConversationList: React.FC = () => {
  const { conversations, activeConversation, setActiveConversation } = useGlobal();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ensure My Cloud is first
  const sortedConversations = [...filteredConversations].sort((a, b) => {
    if (a.isCloud) return -1;
    if (b.isCloud) return 1;
    return 0;
  });

  return (
    <section className="w-full flex flex-col bg-card rounded-xl overflow-hidden h-full shadow-sm">
      <div className="p-6 pb-4">
        <h1 className="text-xl font-extrabold tracking-tight font-headline mb-4">Messages</h1>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg w-4 h-4" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface-container-high border-none rounded-full py-2.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline-variant"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {sortedConversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => setActiveConversation(conv)}
            className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all group ${
              activeConversation?.id === conv.id
                ? 'bg-bubble-dark text-white'
                : 'hover:bg-bubble-dark text-on-surface'
            }`}
          >
            <div className="relative">
              <img
                src={conv.avatar}
                alt={conv.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              {!conv.isCloud && (
                <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 rounded-full ${activeConversation?.id === conv.id ? 'border-bubble-dark' : 'border-card group-hover:border-bubble-dark'}`}></span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className={`font-bold truncate transition-colors ${activeConversation?.id === conv.id ? 'text-white' : 'text-black group-hover:text-white'}`}>
                  {conv.name}
                </h3>
                <span className={`text-[10px] font-medium uppercase tracking-wider transition-colors ${activeConversation?.id === conv.id ? 'text-zinc-400' : 'text-on-surface-variant group-hover:text-zinc-400'}`}>
                  {conv.lastMessageTime}
                </span>
              </div>
              <p className={`text-sm truncate transition-colors ${activeConversation?.id === conv.id ? 'text-zinc-300 font-medium' : 'text-on-surface-variant group-hover:text-zinc-300'}`}>
                {conv.lastMessage}
              </p>
            </div>
            {conv.unreadCount && conv.unreadCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {conv.unreadCount}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ConversationList;
