/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Conversation, FriendRequest, UserStatus, LoginData, RegisterData } from '../types/types';
import { dataService } from '../services/dataService';

interface GlobalContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  activeTab: 'home' | 'chat' | 'contacts' | 'settings';
  setActiveTab: (tab: 'home' | 'chat' | 'contacts' | 'settings') => void;
  activeConversation: Conversation | null;
  setActiveConversation: (conv: Conversation | null) => void;
  conversations: Conversation[];
  setConversations: (convs: Conversation[]) => void;
  createGroup: (name: string, members: string[]) => void;
  leaveGroup: (groupId: string) => void;
  changeGroupAdmin: (groupId: string, newAdminId: string) => void;
  friendList: User[];
  setFriendList: (friends: User[]) => void;
  friendRequests: FriendRequest[];
  setFriendRequests: (requests: FriendRequest[]) => void;
  isChatInfoOpen: boolean;
  setIsChatInfoOpen: (open: boolean) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  isCreateGroupModalOpen: boolean;
  setIsCreateGroupModalOpen: (open: boolean) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'contacts' | 'settings'>('chat');
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [friendList, setFriendList] = useState<User[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [isChatInfoOpen, setIsChatInfoOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const initData = async () => {
    try {
      const convs = await dataService.getConversations();
      setConversations(convs);
      const friends = await dataService.getFriendList();
      setFriendList(friends);
      const requests = await dataService.getFriendRequests();
      setFriendRequests(requests);
    } catch (error) {
      console.error('Failed to initialize app data', error);
    }
  };

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const profile = await dataService.getProfile();
        setUser(profile);
        await initData();
      } catch (error) {
        console.error('Failed to initialize app', error);
        localStorage.removeItem('auth-token');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = async (data: LoginData) => {
    setLoading(true);
    try {
      const res = await dataService.login(data);
      setUser(res.user);
      localStorage.setItem('auth-token', res.token);
      await initData();
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setLoading(true);
    try {
      const res = await dataService.register(data);
      setUser(res.user);
      localStorage.setItem('auth-token', res.token);
      await initData();
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await dataService.logout();
      setUser(null);
      localStorage.removeItem('auth-token');
      setActiveConversation(null);
      setConversations([]);
      setFriendList([]);
      setFriendRequests([]);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const createGroup = (name: string, memberIds: string[]) => {
    const newGroup: Conversation = {
      id: `group-${Date.now()}`,
      name,
      avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${name}`,
      lastMessage: 'Nhóm đã được tạo',
      lastMessageTime: 'Vừa xong',
      isGroup: true,
      members: [user?.id || '', ...memberIds],
      adminId: user?.id || '',
    };
    setConversations(prev => [newGroup, ...prev]);
    setActiveConversation(newGroup);
    setActiveTab('chat');
  };

  const leaveGroup = (groupId: string) => {
    setConversations(prev => prev.filter(c => c.id !== groupId));
    if (activeConversation?.id === groupId) {
      setActiveConversation(null);
    }
  };

  const changeGroupAdmin = (groupId: string, newAdminId: string) => {
    setConversations(prev => prev.map(c => 
      c.id === groupId ? { ...c, adminId: newAdminId } : c
    ));
    if (activeConversation?.id === groupId) {
      setActiveConversation(prev => prev ? { ...prev, adminId: newAdminId } : null);
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        activeTab,
        setActiveTab,
        activeConversation,
        setActiveConversation,
        conversations,
        setConversations,
        createGroup,
        leaveGroup,
        changeGroupAdmin,
        friendList,
        setFriendList,
        friendRequests,
        setFriendRequests,
        isChatInfoOpen,
        setIsChatInfoOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
        isCreateGroupModalOpen,
        setIsCreateGroupModalOpen,
        darkMode,
        setDarkMode,
        login,
        register,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};
