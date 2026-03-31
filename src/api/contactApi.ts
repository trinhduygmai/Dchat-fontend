/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import axiosClient from './axiosClient';
import { User, FriendRequest } from '../types/types';

export const contactApi = {
  getFriendList: (): Promise<User[]> => axiosClient.get('/contacts/friends'),
  getFriendRequests: (): Promise<FriendRequest[]> => axiosClient.get('/contacts/requests'),
  acceptFriendRequest: (requestId: string): Promise<void> => axiosClient.post(`/contacts/requests/${requestId}/accept`),
  rejectFriendRequest: (requestId: string): Promise<void> => axiosClient.post(`/contacts/requests/${requestId}/reject`),
};
