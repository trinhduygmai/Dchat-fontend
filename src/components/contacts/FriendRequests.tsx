/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { UserCheck, UserX, Clock, UserPlus } from 'lucide-react';
import { useGlobal } from '../../context/GlobalContext';
import { dataService } from '../../services/dataService';

const FriendRequests: React.FC = () => {
  const { friendRequests, setFriendRequests } = useGlobal();

  const handleAccept = async (requestId: string) => {
    try {
      await dataService.acceptFriendRequest(requestId);
      setFriendRequests((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error('Failed to accept request', error);
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      await dataService.rejectFriendRequest(requestId);
      setFriendRequests((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error('Failed to reject request', error);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-card rounded-xl overflow-hidden shadow-sm h-full">
      <header className="px-8 h-20 bg-white/40 backdrop-blur-xl flex items-center border-b border-zinc-200/50">
        <h2 className="font-headline text-lg font-black text-zinc-900 tracking-tight">Lời mời kết bạn ({friendRequests.length})</h2>
      </header>
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {friendRequests.map((req) => (
          <div key={req.id} className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex items-center justify-between hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <img src={req.senderAvatar} alt={req.senderName} className="w-16 h-16 rounded-full object-cover" />
              <div className="space-y-1">
                <h4 className="font-bold text-lg">{req.senderName}</h4>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(req.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAccept(req.id)}
                className="flex items-center gap-2 bg-bubble-dark text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all"
              >
                <UserCheck className="w-4 h-4" />
                Đồng ý
              </button>
              <button
                onClick={() => handleReject(req.id)}
                className="flex items-center gap-2 bg-zinc-100 text-zinc-500 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-red-50 hover:text-red-500 transition-all"
              >
                <UserX className="w-4 h-4" />
                Từ chối
              </button>
            </div>
          </div>
        ))}
        {friendRequests.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500 space-y-4">
            <UserPlus className="w-16 h-16 opacity-20" />
            <p>Không có lời mời kết bạn nào</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendRequests;
