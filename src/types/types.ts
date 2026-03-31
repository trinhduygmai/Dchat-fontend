/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum UserStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  AWAY = 'away',
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: UserStatus;
  bio?: string;
  phone?: string;
  email?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'voice' | 'file' | 'metadata';
  timestamp: string;
  metadata?: {
    dailyVisitors?: string;
    buildingAge?: string;
    currentTemp?: string;
    images?: string[];
    duration?: string;
    fileName?: string;
    fileSize?: string;
  };
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  isGroup?: boolean;
  isCloud?: boolean;
  members?: string[]; // user IDs
}

export interface FriendRequest {
  id: string;
  senderId: string;
  receiverId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  senderName: string;
  senderAvatar: string;
}

export interface ChatMedia {
  images: string[];
  files: { name: string; size: string; type: string }[];
  links: { title: string; url: string }[];
}

export interface UserSettings {
  soundEnabled: boolean;
  darkMode: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginData {
  email: string;
  password?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password?: string;
}
