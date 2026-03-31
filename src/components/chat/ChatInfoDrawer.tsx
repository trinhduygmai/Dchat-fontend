/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Users, Image, FileText, Link, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useGlobal } from '../../context/GlobalContext';
import { dataService } from '../../services/dataService';
import { ChatMedia } from '../../types/types';

const ChatInfoDrawer: React.FC = () => {
  const { isChatInfoOpen, setIsChatInfoOpen, activeConversation } = useGlobal();
  const [media, setMedia] = useState<ChatMedia | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    members: true,
    media: true,
    files: true,
    links: true,
  });

  useEffect(() => {
    if (isChatInfoOpen && activeConversation) {
      const fetchMedia = async () => {
        const data = await dataService.getChatMedia(activeConversation.id);
        setMedia(data);
      };
      fetchMedia();
    }
  }, [isChatInfoOpen, activeConversation]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <AnimatePresence>
      {isChatInfoOpen && (
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-80 h-full bg-card border-l border-zinc-200/50 flex flex-col z-50 shadow-xl"
        >
          <header className="p-6 border-b border-zinc-200/50 flex justify-between items-center">
            <h3 className="font-bold text-lg">Chat Info</h3>
            <button
              onClick={() => setIsChatInfoOpen(false)}
              className="p-2 hover:bg-zinc-100 rounded-full transition-all text-zinc-500"
            >
              <X className="w-5 h-5" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <img
                src={activeConversation?.avatar}
                alt={activeConversation?.name}
                className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white"
              />
              <h4 className="font-bold text-xl">{activeConversation?.name}</h4>
              {!activeConversation?.isCloud && (
                <span className="text-sm text-green-500 font-medium">Online</span>
              )}
            </div>

            <div className="space-y-4">
              {/* Members Section */}
              {activeConversation?.isGroup && (
                <div className="space-y-2">
                  <button
                    onClick={() => toggleSection('members')}
                    className="w-full flex justify-between items-center font-bold text-sm text-zinc-500 uppercase tracking-widest"
                  >
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Members
                    </div>
                    {expandedSections.members ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  {expandedSections.members && (
                    <div className="pl-6 space-y-2">
                      {/* Mock members */}
                      <p className="text-sm">Member 1</p>
                      <p className="text-sm">Member 2</p>
                    </div>
                  )}
                </div>
              )}

              {/* Media Section */}
              <div className="space-y-2">
                <button
                  onClick={() => toggleSection('media')}
                  className="w-full flex justify-between items-center font-bold text-sm text-zinc-500 uppercase tracking-widest"
                >
                  <div className="flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    Photos & Videos
                  </div>
                  {expandedSections.media ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                {expandedSections.media && (
                  <div className="grid grid-cols-3 gap-2 pl-6">
                    {media?.images.map((img, i) => (
                      <img key={i} src={img} alt="Media" className="w-full aspect-square object-cover rounded-md cursor-pointer hover:opacity-80 transition-all shadow-sm" />
                    ))}
                  </div>
                )}
              </div>

              {/* Files Section */}
              <div className="space-y-2">
                <button
                  onClick={() => toggleSection('files')}
                  className="w-full flex justify-between items-center font-bold text-sm text-zinc-500 uppercase tracking-widest"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Files
                  </div>
                  {expandedSections.files ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                {expandedSections.files && (
                  <div className="pl-6 space-y-3">
                    {media?.files.map((file, i) => (
                      <div key={i} className="flex items-center gap-3 cursor-pointer group">
                        <div className="p-2 bg-zinc-100 rounded-lg text-zinc-500 group-hover:text-primary transition-all">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-zinc-500">{file.size}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Links Section */}
              <div className="space-y-2">
                <button
                  onClick={() => toggleSection('links')}
                  className="w-full flex justify-between items-center font-bold text-sm text-zinc-500 uppercase tracking-widest"
                >
                  <div className="flex items-center gap-2">
                    <Link className="w-4 h-4" />
                    Links
                  </div>
                  {expandedSections.links ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                {expandedSections.links && (
                  <div className="pl-6 space-y-3">
                    {media?.links.map((link, i) => (
                      <a key={i} href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
                        <div className="p-2 bg-zinc-100 rounded-lg text-zinc-500 group-hover:text-primary transition-all">
                          <Link className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{link.title}</p>
                          <p className="text-xs text-zinc-500 truncate">{link.url}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default ChatInfoDrawer;
