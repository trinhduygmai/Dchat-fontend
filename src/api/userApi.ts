/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import axiosClient from './axiosClient';
import { User, UserSettings, LoginData, RegisterData, AuthResponse } from '../types/types';

export const userApi = {
  login: (data: LoginData): Promise<AuthResponse> => axiosClient.post('/auth/login', data),
  register: (data: RegisterData): Promise<AuthResponse> => axiosClient.post('/auth/register', data),
  getProfile: (): Promise<User> => axiosClient.get('/user/profile'),
  updateProfile: (data: Partial<User>): Promise<User> => axiosClient.put('/user/profile', data),
  updateSettings: (data: Partial<UserSettings>): Promise<UserSettings> => axiosClient.put('/user/settings', data),
};
