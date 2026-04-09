/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Toaster } from 'react-hot-toast';

/**
 * ToastNotification component that configures react-hot-toast 
 * to match the application's modern, soft-rounded, and pastel/slate theme.
 */
const ToastNotification: React.FC = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        // Global style for all toasts
        className: 'font-manrope text-sm font-medium',
        duration: 4000,
        style: {
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          color: '#0F0F0F',
          borderRadius: '16px',
          padding: '12px 20px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          maxWidth: '400px',
        },
        // Custom style for success toasts
        success: {
          iconTheme: {
            primary: '#10B981', // Emerald 500
            secondary: '#FFFFFF',
          },
          style: {
            background: 'rgba(236, 253, 245, 0.9)', // Emerald 50
            border: '1px solid rgba(16, 185, 129, 0.2)',
          },
        },
        // Custom style for error toasts
        error: {
          iconTheme: {
            primary: '#EF4444', // Red 500
            secondary: '#FFFFFF',
          },
          style: {
            background: 'rgba(254, 242, 242, 0.9)', // Red 50
            border: '1px solid rgba(239, 68, 68, 0.2)',
          },
        },
      }}
    />
  );
};

export default ToastNotification;
