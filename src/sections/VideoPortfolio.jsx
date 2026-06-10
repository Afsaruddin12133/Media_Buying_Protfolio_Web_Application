import React, { useState, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';
import VideoCard from '../components/VideoCard';
import useScrollReveal from '../hooks/useScrollReveal';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function VideoPortfolio() {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);
  const revealRef = useScrollReveal();
  const videos = portfolioData.videoPortfolio;
  const visibleVideos = showAll ? videos : videos.slice(0, 3);

  const handleToggle = () => {
    if (showAll) {
      setShowAll(false);
      setTimeout(() => sectionRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      setShowAll(true);
    }
  };

  return (
    <section id="video-editing" ref={sectionRef} className="py-28 px-6 md:px-12 relative overflow-hidden border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/3 to-transparent pointer-events-none" />

      <div ref={revealRef} className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="reveal text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-blue-400">Creative Work</p>
          <h2 className="text-3xl md:text-4xl font-black font-display text-white">
            Video Creative <span className="text-gradient">Portfolio</span>
          </h2>
          <div className="section-divider w-24 mx-auto" />
          <p className="text-sm text-slate-400 leading-relaxed">
            Performance ad creatives and high-retention video styling designed to grab attention and drive conversions.
          </p>
        </div>

        {/* Video Grid */}
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {/* Toggle Button */}
        {videos.length > 3 && (
          <div className="reveal text-center mt-12">
            <button
              onClick={handleToggle}
              className="cursor-pointer inline-flex items-center gap-2 px-8 py-3.5 border-2 border-blue-500/50 hover:border-blue-500 text-blue-400 hover:text-white hover:bg-blue-500 text-xs font-bold uppercase tracking-widest rounded-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]"
            >
              {showAll ? (
                <><ChevronUp size={14} /> See Less</>
              ) : (
                <><ChevronDown size={14} /> Load More Videos</>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
