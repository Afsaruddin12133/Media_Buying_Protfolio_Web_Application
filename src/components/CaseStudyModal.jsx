import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Lightbulb, BarChart2 } from 'lucide-react';

export default function CaseStudyModal({ isOpen, onClose, study }) {
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

  if (!study) return null;

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
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white border border-black/10 text-[#000] flex items-center justify-center hover:bg-brandAccent hover:text-white hover:border-brandAccent transition-colors duration-300 shadow-[2px_2px_0px_#000000]"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>

                {/* Header Section (Moved text out of image for clarity) */}
                <div className="p-6 md:p-10 pb-0 bg-brandBg shrink-0">
                  <span className="inline-block px-3 py-1 bg-brandAccent text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-4 w-fit shadow-[2px_2px_0px_#000000]">
                    {study.industry || study.category || study.tag}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black font-display text-[#000] tracking-tighter uppercase leading-tight pr-12 break-words">
                    {study.title}
                  </h2>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto p-6 md:p-10 space-y-10 bg-brandBg custom-scrollbar flex-1 overflow-x-hidden">
                  
                  {/* Image Area - Clearly Visible */}
                  {(study.featuredImage || study.image) && (
                    <div className="w-full bg-gray-100 border border-black/10 shadow-[4px_4px_0px_var(--color-brandAccent)] p-2">
                      <img
                        src={study.featuredImage || study.image}
                        alt={study.title}
                        className="w-full h-auto max-h-[60vh] object-contain"
                      />
                    </div>
                  )}

                  {/* Executive Summary */}
                  <div>
                    <h3 className="text-xl font-display font-black text-[#000] mb-4 tracking-tighter uppercase">Executive Summary</h3>
                    <p className="text-brandMuted leading-relaxed font-medium whitespace-pre-wrap break-words">{study.details || study.description}</p>
                  </div>

                  {/* Highlights / Metrics */}
                  {study.metrics && Object.keys(study.metrics).length > 0 && (
                    <div className="bg-white p-6 border border-black/10 shadow-[4px_4px_0px_var(--color-brandAccent)]">
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-brandAccent mb-6">Performance Metrics</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {Object.entries(study.metrics).map(([key, val]) => (
                          <div key={key} className="border-l-2 border-brandAccent pl-4">
                            <p className="text-[10px] text-brandMuted uppercase tracking-widest font-bold mb-1">{key}</p>
                            <p className="text-2xl font-display font-black text-[#000] truncate" title={val}>{val}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Deep Dive Grid */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Target className="text-brandAccent" size={24} />
                        <h4 className="text-xl font-display font-black text-[#000] uppercase tracking-tighter mt-1">The Challenge</h4>
                      </div>
                      <p className="text-sm text-brandMuted leading-relaxed font-medium whitespace-pre-wrap break-words">
                        {study.challenge || "Our client faced severe scaling issues and needed a complete overhaul of their ad structure and tracking setup."}
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Lightbulb className="text-brandAccent" size={24} />
                        <h4 className="text-xl font-display font-black text-[#000] uppercase tracking-tighter mt-1">The Solution</h4>
                      </div>
                      <p className="text-sm text-brandMuted leading-relaxed font-medium whitespace-pre-wrap break-words">
                        {study.strategy || study.solution || "We implemented a full-funnel approach using advanced tracking and creative testing to ensure maximum ROI."}
                      </p>
                    </div>
                  </div>

                  {/* Results & CTA */}
                  <div className="border-t border-black/10 pt-10">
                    <div className="flex items-center gap-3 mb-6">
                      <BarChart2 className="text-brandAccent" size={24} />
                      <h3 className="text-xl font-display font-black text-[#000] uppercase tracking-tighter mt-1">Results & Impact</h3>
                    </div>
                    <div className="space-y-4 mb-10">
                      {Array.isArray(study.results) ? (
                        <ul className="space-y-3">
                          {study.results.map((r, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-brandAccent mt-0.5">■</span>
                              <span className="text-sm text-brandMuted font-medium whitespace-pre-wrap break-words">{r}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-brandMuted leading-relaxed font-medium whitespace-pre-wrap break-words">
                          {study.results || "Successfully scaled the account to new highs while maintaining target CPA/ROAS targets."}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-center">
                      <a 
                        href="/#contact" 
                        onClick={onClose} 
                        className="px-10 py-4 border border-brandAccent bg-brandAccent text-white text-xs font-bold uppercase tracking-widest hover:bg-transparent hover:text-brandAccent hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_var(--color-brandAccent)] transition-all duration-300"
                      >
                        Want Similar Results?
                      </a>
                    </div>
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
