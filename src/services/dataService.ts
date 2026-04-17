/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { userApi } from '../api/userApi';
import { chatApi } from '../api/chatApi';
import { contactApi } from '../api/contactApi';
import { 
  currentUser, 
  mockConversations, 
  mockMessages, 
  mockFriendRequests, 
  mockUsers, 
  mockChatMedia 
} from '../mocks/mockData';
import { User, Conversation, Message, FriendRequest, ChatMedia, UserSettings, LoginData, RegisterData, AuthResponse, UserStatus } from '../types/types';

const USE_MOCK = true;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const dataService = {
  // Auth
  login: async (data: LoginData): Promise<AuthResponse> => {
    if (USE_MOCK) {
      await delay(1000);
      return { user: currentUser, token: 'mock-token' };
    }
    return userApi.login(data);
  },
  register: async (data: RegisterData): Promise<AuthResponse> => {
    if (USE_MOCK) {
      await delay(1000);
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: data.name,
        phone: data.phone,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`,
        status: UserStatus.ONLINE,
      };
      return { user: newUser, token: 'mock-token' };
    }
    return userApi.register(data);
  },
  logout: async (): Promise<void> => {
    if (USE_MOCK) {
      await delay(500);
      return;
    }
    // Implement real logout if needed
  },

  // User
  getProfile: async (): Promise<User> => {
    if (USE_MOCK) {
      await delay(500);
      return currentUser;
    }
    return userApi.getProfile();
  },
  updateProfile: async (data: Partial<User>): Promise<User> => {
    if (USE_MOCK) {
      await delay(500);
      return { ...currentUser, ...data };
    }
    return userApi.updateProfile(data);
  },
  updateSettings: async (data: Partial<UserSettings>): Promise<UserSettings> => {
    if (USE_MOCK) {
      await delay(500);
      return { soundEnabled: true, darkMode: false, ...data };
    }
    return userApi.updateSettings(data);
  },

  // Chat
  getConversations: async (): Promise<Conversation[]> => {
    if (USE_MOCK) {
      await delay(500);
      return mockConversations;
    }
    return chatApi.getConversations();
  },
  getMessages: async (conversationId: string): Promise<Message[]> => {
    if (USE_MOCK) {
      await delay(500);
      return mockMessages[conversationId] || [];
    }
    return chatApi.getMessages(conversationId);
  },
  sendMessage: async (conversationId: string, content: string): Promise<Message> => {
    if (USE_MOCK) {
      await delay(500);
      const newMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        conversationId,
        senderId: 'me',
        content,
        type: 'text',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      if (!mockMessages[conversationId]) mockMessages[conversationId] = [];
      mockMessages[conversationId].push(newMessage);
      return newMessage;
    }
    return chatApi.sendMessage(conversationId, content);
  },
  getChatMedia: async (conversationId: string): Promise<ChatMedia> => {
    if (USE_MOCK) {
      await delay(500);
      return mockChatMedia[conversationId] || { images: [], files: [], links: [] };
    }
    return chatApi.getChatMedia(conversationId);
  },

  // Contacts
  getFriendList: async (): Promise<User[]> => {
    if (USE_MOCK) {
      await delay(500);
      return mockUsers;
    }
    return contactApi.getFriendList();
  },
  getFriendRequests: async (): Promise<FriendRequest[]> => {
    if (USE_MOCK) {
      await delay(500);
      return mockFriendRequests;
    }
    return contactApi.getFriendRequests();
  },
  acceptFriendRequest: async (requestId: string): Promise<void> => {
    if (USE_MOCK) {
      await delay(500);
      return;
    }
    return contactApi.acceptFriendRequest(requestId);
  },
  rejectFriendRequest: async (requestId: string): Promise<void> => {
    if (USE_MOCK) {
      await delay(500);
      return;
    }
    return contactApi.rejectFriendRequest(requestId);
  },
};
