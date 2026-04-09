/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, FileText, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface Attachment {
  id: string;
  file: File;
  previewUrl?: string;
  type: 'image' | 'file';
}

interface AttachmentPreviewProps {
  attachments: Attachment[];
  onRemove: (id: string) => void;
}

const AttachmentPreview: React.FC<AttachmentPreviewProps> = ({ attachments, onRemove }) => {
  if (attachments.length === 0) return null;

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 px-2 custom-scrollbar">
      <AnimatePresence mode="popLayout">
        {attachments.map((attachment) => (
          <motion.div
            key={attachment.id}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="relative flex-shrink-0 group"
          >
            {attachment.type === 'image' ? (
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-sm bg-zinc-100">
                <img
                  src={attachment.previewUrl}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col items-center justify-center p-2 shadow-sm">
                <FileText className="w-8 h-8 text-zinc-400 mb-1" />
                <span className="text-[10px] text-zinc-500 font-medium truncate w-full text-center px-1">
                  {attachment.file.name}
                </span>
              </div>
            )}
            
            <button
              onClick={() => onRemove(attachment.id)}
              className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-white shadow-md rounded-full flex items-center justify-center text-zinc-500 hover:text-red-500 hover:scale-110 transition-all z-10 border border-zinc-100"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AttachmentPreview;
