import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import YoutubeEmbed from './YoutubeEmbed';

export default function PortfolioModal({ isOpen, onClose, item }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 overflow-y-auto pointer-events-none">
            <div className="min-h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-4xl bg-brandBg border border-black/10 shadow-[8px_8px_0px_var(--color-brandAccent)] pointer-events-auto relative flex flex-col max-h-[90vh]"
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-[60] w-10 h-10 bg-white border border-black/10 text-[#000] flex items-center justify-center hover:bg-brandAccent hover:text-white hover:border-brandAccent transition-colors duration-300 shadow-[2px_2px_0px_#000000]"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>

                <div className="overflow-y-auto custom-scrollbar flex flex-col h-full max-h-[85vh]">
                  {item.mediaType === 'image' ? (
                    <div className="w-full bg-gray-100 border-b border-black/10 flex items-center justify-center p-6 shrink-0">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        className="max-h-[40vh] w-auto object-contain shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-video relative bg-gray-900 shrink-0 border-b border-black/10">
                       {item.videoUrl ? (
                         <YoutubeEmbed url={item.videoUrl} title={item.title} />
                       ) : (
                         <div className="absolute inset-0 flex items-center justify-center text-white font-bold uppercase tracking-widest text-sm">No video URL provided</div>
                       )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 md:p-10 bg-brandBg shrink-0">
                    <span className="inline-block px-3 py-1 bg-brandAccent text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-4 w-fit shadow-[2px_2px_0px_#000000]">
                      {item.category || "Video Ad"}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black font-display text-[#000] tracking-tighter uppercase leading-tight mb-4 break-words">
                      {item.title}
                    </h2>
                    <p className="text-brandMuted leading-relaxed font-medium whitespace-pre-wrap break-words">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
