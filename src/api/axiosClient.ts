/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    // Add auth token if needed
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default axiosClient;
