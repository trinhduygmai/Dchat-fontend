/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PlusCircle, Smile, Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (content: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <footer className="p-6 pt-0">
      <div className="bg-surface-container-high rounded-full flex items-center px-6 py-3 gap-4 shadow-sm">
        <button className="text-on-surface-variant hover:text-primary transition-colors">
          <PlusCircle className="w-5 h-5" />
        </button>
        <input
          type="text"
          placeholder="Write your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-transparent border-none focus:ring-0 text-sm placeholder:text-outline-variant text-zinc-900"
        />
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <Smile className="w-5 h-5" />
          </button>
          <button
            onClick={handleSend}
            className="bg-bubble-dark text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default ChatInput;
