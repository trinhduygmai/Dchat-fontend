/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import ConversationList from '../../components/chat/ConversationList';
import ChatWindow from '../../components/chat/ChatWindow';
import ChatInfoDrawer from '../../components/chat/ChatInfoDrawer';
import ContactMenu from '../../components/contacts/ContactMenu';
import FriendList from '../../components/contacts/FriendList';
import AddFriend from '../../components/contacts/AddFriend';
import GroupList from '../../components/contacts/GroupList';
import ProfileModal from '../../components/ui/ProfileModal';
import CreateGroupModal from '../../components/chat/CreateGroupModal';
import { useGlobal } from '../../context/GlobalContext';

const HomePage: React.FC = () => {
  const { activeTab, loading, activeConversation, user } = useGlobal();
  const [activeContactTab, setActiveContactTab] = useState<'friends' | 'groups' | 'connections'>('friends');

  const currentUserRole = activeConversation?.adminId === user?.id ? 'admin' : 'member';

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background dark:bg-zinc-950">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen p-4 gap-4 overflow-hidden font-manrope">
      <Sidebar />
      
      {activeTab === 'home' && (
        <div className="flex-1 flex gap-4 overflow-hidden">
          <div className="flex-1 h-full flex gap-4">
            <ChatWindow />
            <ChatInfoDrawer currentUserRole={currentUserRole} />
          </div>
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="flex-1 flex gap-4 overflow-hidden">
          <div className="w-[30%] h-full">
            <ConversationList />
          </div>
          <div className="w-[70%] h-full flex gap-4">
            <ChatWindow />
            <ChatInfoDrawer currentUserRole={currentUserRole} />
          </div>
        </div>
      )}

      {activeTab === 'contacts' && (
        <div className="flex-1 flex gap-4 overflow-hidden">
          <ContactMenu activeContactTab={activeContactTab} setActiveContactTab={setActiveContactTab} />
          <div className="flex-1 h-full overflow-hidden">
            {activeContactTab === 'friends' && <FriendList />}
            {activeContactTab === 'connections' && <AddFriend />}
            {activeContactTab === 'groups' && <GroupList />}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="flex-1 flex items-center justify-center bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-sm">
          <p className="text-zinc-500 font-medium">Settings Page (Coming soon)</p>
        </div>
      )}

      <ProfileModal />
      <CreateGroupModal />
    </div>
  );
};

export default HomePage;
