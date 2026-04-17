/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, User, Settings, Moon, Sun, Volume2, Lock, Camera, Check, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useGlobal } from '../../context/GlobalContext';
import { dataService } from '../../services/dataService';

const ProfileModal: React.FC = () => {
  const { isProfileModalOpen, setIsProfileModalOpen, user, setUser, darkMode, setDarkMode, logout } = useGlobal();
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpdateProfile = async () => {
    setUpdating(true);
    try {
      const updated = await dataService.updateProfile({ name, phone, bio });
      setUser(updated);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      console.error('Failed to update profile', error);
    } finally {
      setUpdating(false);
    }
  };

  if (!isProfileModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[600px]"
      >
        <header className="p-6 border-b border-zinc-100 flex justify-between items-center">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                activeTab === 'profile' ? 'bg-bubble-dark text-white' : 'text-zinc-500 hover:bg-zinc-100'
              }`}
            >
              <User className="w-4 h-4" />
              Hồ sơ
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                activeTab === 'settings' ? 'bg-bubble-dark text-white' : 'text-zinc-500 hover:bg-zinc-100'
              }`}
            >
              <Settings className="w-4 h-4" />
              Cài đặt
            </button>
          </div>
          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="p-2 hover:bg-zinc-100 rounded-full transition-all text-zinc-500"
          >
            <X className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'profile' ? (
            <div className="space-y-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  <img src={user?.avatar} alt={user?.name} className="w-32 h-32 rounded-full object-cover shadow-xl border-4 border-white" />
                  <button className="absolute bottom-0 right-0 p-2 bg-bubble-dark text-white rounded-full shadow-lg hover:scale-110 transition-all">
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-xl">{user?.name}</h3>
                  <p className="text-sm text-zinc-500">{user?.phone}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Tên hiển thị</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Số điện thoại</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full bg-zinc-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all h-24 resize-none"
                  />
                </div>
              </div>

              <button
                onClick={handleUpdateProfile}
                disabled={updating}
                className="w-full bg-bubble-dark text-white py-4 rounded-2xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                {updating ? 'Đang cập nhật...' : success ? <><Check className="w-5 h-5" /> Đã cập nhật</> : 'Cập nhật hồ sơ'}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-zinc-50 p-6 rounded-3xl space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-2xl text-zinc-500">
                      {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-bold">Chế độ tối</p>
                      <p className="text-xs text-zinc-500">Chuyển đổi giao diện Sáng/Tối</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-12 h-6 rounded-full transition-all relative ${darkMode ? 'bg-green-500' : 'bg-zinc-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${darkMode ? 'left-7' : 'left-1'}`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-2xl text-zinc-500">
                      <Volume2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold">Âm thanh</p>
                      <p className="text-xs text-zinc-500">Bật/Tắt âm thanh thông báo</p>
                    </div>
                  </div>
                  <button className="w-12 h-6 bg-green-500 rounded-full relative">
                    <div className="absolute top-1 left-7 w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
              </div>

              <button className="w-full flex items-center justify-between p-6 bg-zinc-50 rounded-3xl hover:bg-zinc-100 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-2xl text-zinc-500">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold">Đổi mật khẩu</p>
                    <p className="text-xs text-zinc-500">Thay đổi mật khẩu đăng nhập</p>
                  </div>
                </div>
                <X className="w-5 h-5 rotate-45 text-zinc-400" />
              </button>

              <button 
                onClick={() => {
                  logout();
                  setIsProfileModalOpen(false);
                }}
                className="w-full flex items-center justify-between p-6 bg-red-50 rounded-3xl hover:bg-red-100 transition-all text-red-600"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-2xl text-red-500">
                    <LogOut className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold">Đăng xuất</p>
                    <p className="text-xs text-red-400">Thoát khỏi tài khoản hiện tại</p>
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileModal;
