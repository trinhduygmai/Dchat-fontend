/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, Bell, Palette, Shield, UserCircle, Moon, Volume2, Globe, Search, Info, HelpCircle } from 'lucide-react';
import { useGlobal } from '../../context/GlobalContext';

type SettingsSection = 'account' | 'appearance' | 'notifications' | 'privacy';

const SettingsPanel: React.FC = () => {
  const { user, darkMode, setDarkMode } = useGlobal();
  const [activeSection, setActiveSection] = useState<SettingsSection>('account');
  
  // States for toggles
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const menuItems = [
    { id: 'account', label: 'Tài khoản', icon: UserCircle },
    { id: 'appearance', label: 'Giao diện', icon: Palette },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'privacy', label: 'Quyền riêng tư', icon: Shield },
  ];

  const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button 
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        enabled ? 'bg-indigo-500' : 'bg-zinc-300'
      }`}
    >
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm`}
      />
    </button>
  );

  const renderAccount = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-1">Thông tin cá nhân</h3>
        <p className="text-sm text-slate-500">Cập nhật thông tin tài khoản của bạn tại đây.</p>
      </div>
      
      <div className="space-y-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-500 ml-1">Tên hiển thị</label>
          <input 
            type="text" 
            defaultValue={user?.name}
            placeholder="Nhập tên của bạn"
            className="w-full px-4 py-2.5 bg-white border border-slate-300 text-slate-900 rounded-xl focus:ring-2 focus:ring-slate-300 focus:outline-none placeholder:text-slate-400 transition-all"
          />
        </div>
        
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-500 ml-1">Email</label>
          <input 
            type="email" 
            defaultValue={user?.email}
            placeholder="example@gmail.com"
            className="w-full px-4 py-2.5 bg-white border border-slate-300 text-slate-900 rounded-xl focus:ring-2 focus:ring-slate-300 focus:outline-none placeholder:text-slate-400 transition-all"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-500 ml-1">Tiểu sử</label>
          <textarea 
            rows={3}
            placeholder="Viết gì đó về bản thân..."
            className="w-full px-4 py-2.5 bg-white border border-slate-300 text-slate-900 rounded-xl focus:ring-2 focus:ring-slate-300 focus:outline-none placeholder:text-slate-400 transition-all resize-none"
          />
        </div>
      </div>

      <div className="pt-4">
        <button className="px-6 py-2.5 bg-slate-800 text-white hover:bg-slate-700 rounded-xl font-medium transition-colors shadow-sm">
          Lưu thay đổi
        </button>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h3 className="text-xl font-bold text-slate-900 ml-1">Giao diện</h3>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-white shadow-inner">
            <Moon size={24} fill="currentColor" />
          </div>
          <div>
            <p className="font-bold text-slate-900">Chế độ tối</p>
            <p className="text-sm text-slate-500 leading-tight">Chuyển đổi giữa giao diện sáng và tối.</p>
          </div>
        </div>
        <Toggle enabled={darkMode} onToggle={() => setDarkMode(!darkMode)} />
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-1">Thông báo</h3>
        <p className="text-sm text-slate-500">Quản lý cách bạn nhận thông báo từ ứng dụng.</p>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-800">
              <Bell size={20} />
            </div>
            <div>
              <p className="font-bold text-slate-900">Thông báo đẩy</p>
              <p className="text-xs text-slate-500">Nhận thông báo khi có tin nhắn mới.</p>
            </div>
          </div>
          <Toggle enabled={notificationsEnabled} onToggle={() => setNotificationsEnabled(!notificationsEnabled)} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-800">
              <Volume2 size={20} />
            </div>
            <div>
              <p className="font-bold text-slate-900">Âm thanh</p>
              <p className="text-xs text-slate-500">Phát âm thanh khi có thông báo.</p>
            </div>
          </div>
          <Toggle enabled={soundEnabled} onToggle={() => setSoundEnabled(!soundEnabled)} />
        </div>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-1">Quyền riêng tư</h3>
        <p className="text-sm text-slate-500">Kiểm soát ai có thể thấy thông tin của bạn.</p>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-800">
              <Globe size={20} />
            </div>
            <div>
              <p className="font-bold text-slate-900">Trạng thái hoạt động</p>
              <p className="text-xs text-slate-500">Cho phép người khác thấy bạn đang online.</p>
            </div>
          </div>
          <Toggle enabled={true} onToggle={() => {}} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col bg-card rounded-3xl overflow-hidden font-manrope">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-outline-variant/30">
        <h2 className="text-2xl font-bold text-slate-900">Cài đặt</h2>
        <div className="flex items-center gap-4 text-slate-500">
          <button className="hover:text-slate-800 transition-colors"><Search size={22} /></button>
          <button className="hover:text-slate-800 transition-colors"><Info size={22} /></button>
          <button className="hover:text-zinc-800 transition-colors"><HelpCircle size={22} /></button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 px-6 py-6 flex flex-col gap-1 border-r border-outline-variant/30 bg-surface-container-high">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as SettingsSection)}
              className={`flex items-center px-4 py-2.5 transition-all duration-200 ${
                activeSection === item.id 
                  ? 'border border-slate-800 text-slate-900 bg-white rounded-xl font-medium' 
                  : 'border border-transparent text-slate-500 hover:bg-white hover:text-slate-800 rounded-xl'
              }`}
            >
              <span className="text-[15px]">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 px-12 py-10 overflow-y-auto bg-card">
          <div className="max-w-3xl">
            {activeSection === 'account' && renderAccount()}
            {activeSection === 'appearance' && renderAppearance()}
            {activeSection === 'notifications' && renderNotifications()}
            {activeSection === 'privacy' && renderPrivacy()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
