import React, { useState, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';
import VideoCard from '../components/VideoCard';

export default function VideoPortfolio() {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);
  const videos = portfolioData.videoPortfolio;

  // Show only 3 videos initially
  const visibleVideos = showAll ? videos : videos.slice(0, 3);

  const handleToggle = () => {
    if (showAll) {
      setShowAll(false);
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setShowAll(true);
    }
  };

  return (
    <section
      id="video-editing"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 bg-[#0f172a] border-t border-b border-gray-800 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-brandText">
            Video Creative <span className="text-brandAccent">Portfolio</span>
          </h2>
          <div className="w-16 h-1 bg-brandAccent mx-auto"></div>
          <p className="text-sm text-brandMuted">
            Performance ad creatives and high-retention video styling tailored to grab attention.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {/* Action Toggle Button */}
        {videos.length > 3 && (
          <div className="text-center mt-12">
            <button
              onClick={handleToggle}
              className="px-10 py-3.5 bg-transparent border-2 border-brandAccent text-brandText hover:bg-brandAccent text-xs font-bold uppercase tracking-widest transition-all duration-300"
            >
              {showAll ? 'See Less' : 'See More'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
