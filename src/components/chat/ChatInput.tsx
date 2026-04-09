/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { PlusCircle, Smile, Send, Paperclip } from 'lucide-react';
import AttachmentPreview, { Attachment } from './AttachmentPreview';

interface ChatInputProps {
  onSend: (content: string, attachments?: Attachment[]) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim() || attachments.length > 0) {
      onSend(message, attachments);
      setMessage('');
      setAttachments([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments: Attachment[] = Array.from(files).map((file: File) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      type: file.type.startsWith('image/') ? 'image' : 'file',
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }));

    setAttachments(prev => [...prev, ...newAttachments]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => {
      const filtered = prev.filter(a => a.id !== id);
      // Clean up object URLs to avoid memory leaks
      const removed = prev.find(a => a.id === id);
      if (removed?.previewUrl) URL.revokeObjectURL(removed.previewUrl);
      return filtered;
    });
  };

  return (
    <footer className="p-6 pt-0">
      <AttachmentPreview attachments={attachments} onRemove={removeAttachment} />
      
      <div className="bg-surface-container-high rounded-3xl flex items-end px-6 py-3 gap-4 shadow-sm border border-zinc-100/50">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
          className="hidden"
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="text-on-surface-variant hover:text-primary transition-colors mb-1.5"
        >
          <PlusCircle className="w-6 h-6" />
        </button>
        
        <textarea
          placeholder="Viết tin nhắn..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          rows={1}
          className="flex-1 bg-transparent border-none focus:ring-0 text-sm placeholder:text-outline-variant text-zinc-900 py-2 resize-none max-h-32 custom-scrollbar"
          style={{ height: 'auto' }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = `${target.scrollHeight}px`;
          }}
        />

        <div className="flex items-center gap-4 mb-1">
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <Smile className="w-6 h-6" />
          </button>
          <button
            onClick={handleSend}
            disabled={!message.trim() && attachments.length === 0}
            className={`bg-bubble-dark text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${
              (!message.trim() && attachments.length === 0) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default ChatInput;
