/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Video, Phone, Search, Info, Play, Thermometer, ZoomIn, MoreHorizontal, MessageSquare, FileText } from 'lucide-react';
import { useGlobal } from '../../context/GlobalContext';
import { dataService } from '../../services/dataService';
import { Message } from '../../types/types';
import ChatInput from './ChatInput';
import { Attachment } from './AttachmentPreview';
import ImageViewer from '../ui/ImageViewer';

const ChatWindow: React.FC = () => {
  const { activeConversation, isChatInfoOpen, setIsChatInfoOpen } = useGlobal();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewerConfig, setViewerConfig] = useState<{ isOpen: boolean; url: string; alt?: string }>({
    isOpen: false,
    url: '',
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeConversation) {
      const fetchMessages = async () => {
        setLoading(true);
        try {
          const msgs = await dataService.getMessages(activeConversation.id);
          setMessages(msgs);
        } catch (error) {
          console.error('Failed to fetch messages', error);
        } finally {
          setLoading(false);
        }
      };
      fetchMessages();
    }
  }, [activeConversation]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (content: string, attachments?: Attachment[]) => {
    if (!activeConversation) return;
    try {
      // For now, we just send the text content. 
      // In a real app, we would upload attachments first or send them with the message.
      const newMessage = await dataService.sendMessage(activeConversation.id, content);
      
      // Mocking attachment display if any were selected
      if (attachments && attachments.length > 0) {
        const attachmentMsgs: Message[] = attachments.map(att => ({
          id: att.id,
          conversationId: activeConversation.id,
          senderId: 'me',
          content: att.type === 'image' ? '' : att.file.name,
          type: att.type,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          metadata: att.type === 'image' ? { images: [att.previewUrl || ''] } : undefined
        }));
        setMessages((prev) => [...prev, newMessage, ...attachmentMsgs]);
      } else {
        setMessages((prev) => [...prev, newMessage]);
      }
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  const openViewer = (url: string, alt?: string) => {
    setViewerConfig({ isOpen: true, url, alt });
  };

  if (!activeConversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-card rounded-3xl border border-outline-variant/30 shadow-sm">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner border border-slate-100">
            <MessageSquare className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-500 font-medium tracking-tight">Chọn một cuộc trò chuyện để bắt đầu</p>
          <p className="text-slate-400 text-xs">Kết nối với bạn bè và người thân ngay bây giờ</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 flex flex-col bg-card rounded-3xl overflow-hidden border border-outline-variant/30 shadow-sm relative">
      {/* Chat Header */}
      <header className="flex justify-between items-center px-8 h-20 bg-card sticky top-0 z-40 border-b border-outline-variant/30">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              {activeConversation.name}
            </h2>
            {!activeConversation.isCloud && (
              <span className="text-xs font-medium text-green-600 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Online
              </span>
            )}
            {activeConversation.isCloud && (
              <span className="text-xs font-medium text-slate-500">Personal Storage</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!activeConversation.isCloud && (
            <>
              <button className="hover:bg-white p-2.5 rounded-full transition-all text-slate-800">
                <Video className="w-5 h-5" />
              </button>
              <button className="hover:bg-white p-2.5 rounded-full transition-all text-slate-800">
                <Phone className="w-5 h-5" />
              </button>
            </>
          )}
          <button className="hover:bg-white p-2.5 rounded-full transition-all text-slate-800">
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsChatInfoOpen(!isChatInfoOpen)}
            className={`p-2.5 rounded-full transition-all ${
              isChatInfoOpen
                ? 'bg-slate-800 text-white'
                : 'hover:bg-white text-slate-800'
            }`}
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Message Stream */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'items-end gap-4'}`}>
            {msg.senderId !== 'me' && (
              <img
                src={activeConversation.avatar}
                alt={activeConversation.name}
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
            )}
            <div className={`max-w-[70%] ${msg.senderId === 'me' ? 'bg-slate-800 text-white p-5 rounded-2xl rounded-tr-none shadow-md' : 'bg-white border border-slate-200 p-5 rounded-2xl rounded-bl-none text-slate-900 shadow-sm'}`}>
              {msg.type === 'text' && <p className="text-sm leading-relaxed">{msg.content}</p>}
              
              {msg.type === 'voice' && (
                <div className="flex items-center gap-4 min-w-[240px]">
                  <button className="bg-slate-800 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                    <Play className="w-5 h-5 fill-current" />
                  </button>
                  <div className="flex-1 flex items-end gap-[2px] h-6">
                    {[...Array(11)].map((_, i) => (
                      <div key={i} className={`w-1 bg-slate-200 rounded-full`} style={{ height: `${Math.random() * 100}%` }}></div>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-400">{msg.metadata?.duration}</span>
                </div>
              )}

              {msg.type === 'metadata' && (
                <div className="max-w-md w-full bg-slate-50 rounded-lg p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 mb-4 text-slate-800 font-bold">
                    <span className="text-xs uppercase tracking-widest">Property Metadata</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                      <span className="text-[10px] text-slate-400 uppercase tracking-tighter block mb-1">Daily Visitors</span>
                      <span className="text-xl font-extrabold text-slate-900">{msg.metadata?.dailyVisitors}</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                      <span className="text-[10px] text-slate-400 uppercase tracking-tighter block mb-1">Building Age</span>
                      <span className="text-xl font-extrabold text-slate-900">{msg.metadata?.buildingAge}</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm col-span-2 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-tighter block">Current Temp</span>
                        <span className="text-xl font-extrabold text-slate-900">{msg.metadata?.currentTemp}</span>
                      </div>
                      <Thermometer className="text-slate-800 w-8 h-8" />
                    </div>
                  </div>
                </div>
              )}

              {msg.type === 'image' && (
                <div className="grid grid-cols-2 gap-2 max-w-sm">
                  {msg.metadata?.images?.slice(0, 3).map((img, i) => (
                    <div 
                      key={i} 
                      onClick={() => openViewer(img, 'Hình ảnh')}
                      className={`relative group cursor-pointer overflow-hidden rounded-lg ${i === 0 ? 'row-span-2' : ''}`}
                    >
                      <img src={img} alt="Property" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      {i === 2 && msg.metadata?.images && msg.metadata.images.length > 3 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">+{msg.metadata.images.length - 2}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn className="text-white w-6 h-6" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {msg.type === 'file' && (
                <div className="flex items-center gap-3 bg-white border border-slate-200 p-3 rounded-xl shadow-sm">
                  <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{msg.content}</p>
                    <p className="text-[10px] text-slate-500 uppercase">Tài liệu</p>
                  </div>
                </div>
              )}

              <span className={`text-[10px] opacity-60 mt-2 block ${msg.senderId === 'me' ? 'text-right' : 'text-left'} uppercase tracking-widest`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      <ChatInput onSend={handleSendMessage} />

      <ImageViewer 
        isOpen={viewerConfig.isOpen}
        onClose={() => setViewerConfig({ ...viewerConfig, isOpen: false })}
        imageUrl={viewerConfig.url}
        alt={viewerConfig.alt}
      />
    </main>
  );
};

export default ChatWindow;
