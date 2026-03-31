/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import axiosClient from './axiosClient';
import { Conversation, Message, ChatMedia } from '../types/types';

export const chatApi = {
  getConversations: (): Promise<Conversation[]> => axiosClient.get('/conversations'),
  getMessages: (conversationId: string): Promise<Message[]> => axiosClient.get(`/conversations/${conversationId}/messages`),
  sendMessage: (conversationId: string, content: string): Promise<Message> => axiosClient.post(`/conversations/${conversationId}/messages`, { content }),
  getChatMedia: (conversationId: string): Promise<ChatMedia> => axiosClient.get(`/conversations/${conversationId}/media`),
};
