/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useGlobal } from '../context/GlobalContext';

// Định nghĩa các Interface cho dữ liệu Socket
interface ServerToClientEvents {
  receive_message: (data: MessagePayload) => void;
  user_typing: (data: TypingPayload) => void;
  update_online_users: (users: string[]) => void;
  connect: () => void;
  disconnect: () => void;
}

interface ClientToServerEvents {
  send_message: (data: MessagePayload) => void;
  typing: (data: TypingPayload) => void;
}

interface MessagePayload {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}

interface TypingPayload {
  userId: string;
  isTyping: boolean;
  conversationId: string;
}

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

/**
 * Custom Hook useSocket để quản lý kết nối WebSocket
 * Hook này xử lý việc khởi tạo, lắng nghe sự kiện và dọn dẹp kết nối.
 */
export const useSocket = () => {
  const { user } = useGlobal();
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);

  useEffect(() => {
    // Chỉ khởi tạo socket nếu người dùng đã đăng nhập
    if (!user) return;

    // Khởi tạo kết nối socket
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL, {
      auth: {
        token: localStorage.getItem('auth-token'),
        userId: user.id
      },
      transports: ['websocket'], // Ưu tiên websocket để có hiệu năng tốt nhất
      autoConnect: true,
    });

    socketRef.current = socket;

    // --- Thiết lập các Listeners (Lắng nghe sự kiện) ---

    // Sự kiện kết nối thành công
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      setIsConnected(true);
    });

    // Sự kiện mất kết nối
    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    });

    // Lắng nghe tin nhắn mới
    socket.on('receive_message', (data: MessagePayload) => {
      console.log('New message received:', data);
      // Logic xử lý tin nhắn mới sẽ được thêm vào đây (ví dụ: cập nhật state tin nhắn)
    });

    // Lắng nghe trạng thái đang gõ chữ
    socket.on('user_typing', (data: TypingPayload) => {
      console.log('User typing status:', data);
      // Logic xử lý hiển thị "đang gõ..."
    });

    // Cập nhật danh sách người dùng đang online
    socket.on('update_online_users', (users: string[]) => {
      console.log('Online users updated:', users);
      // Logic cập nhật trạng thái online/offline của bạn bè
    });

    // --- Cleanup: Dọn dẹp khi component unmount ---
    return () => {
      if (socket) {
        console.log('Cleaning up socket connection...');
        socket.off('connect');
        socket.off('disconnect');
        socket.off('receive_message');
        socket.off('user_typing');
        socket.off('update_online_users');
        socket.disconnect();
        socketRef.current = null;
      }
    };
  }, [user]); // Re-run nếu user thay đổi (login/logout)

  return {
    socket: socketRef.current,
    isConnected
  };
};

export default useSocket;
