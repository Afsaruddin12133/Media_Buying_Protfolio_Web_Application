import React, { useState } from 'react';
import { Play } from 'lucide-react';

/**
 * Extracts the YouTube video ID from a full URL or embed URL.
 */
function getYouTubeId(url) {
  if (!url) return null;
  // Handle embed URLs: https://www.youtube.com/embed/VIDEO_ID
  const embedMatch = url.match(/youtube\.com\/embed\/([^?&/]+)/);
  if (embedMatch) return embedMatch[1];
  // Handle watch URLs: https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) return watchMatch[1];
  // Handle short URLs: https://youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return shortMatch[1];
  return null;
}

export default function YoutubeEmbed({ url, title = 'Video' }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  const videoId = getYouTubeId(url);
  if (!videoId) return null;

  // Try hqdefault as fallback (maxresdefault may 404 for some videos)
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const embedSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1&origin=${window.location.origin}`;

  return (
    <div className="absolute inset-0 bg-[#060913]">
      {/* Thumbnail + Play button — shown before activation */}
      {!isActivated && (
        <div
          className="absolute inset-0 group cursor-pointer"
          onClick={() => setIsActivated(true)}
        >
          {/* Thumbnail */}
          <img
            src={thumbnailUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
            onError={(e) => {
              // Fallback to default thumbnail if hqdefault fails
              e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/default.jpg`;
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060913]/80 via-transparent to-[#060913]/30" />

          {/* Play button — perfectly centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative group-hover:scale-110 transition-transform duration-300">
              {/* Pulsing rings */}
              <div
                className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping"
                style={{ animationDuration: '1.8s' }}
              />
              <div
                className="absolute -inset-3 rounded-full bg-blue-500/10 animate-ping"
                style={{ animationDuration: '2.4s', animationDelay: '0.3s' }}
              />
              {/* Button */}
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.8)]">
                <Play size={26} className="text-white ml-1" fill="white" />
              </div>
            </div>
          </div>

          {/* Title label */}
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-xs text-white/60 font-medium tracking-wide truncate">{title}</p>
          </div>
        </div>
      )}

      {/* Iframe + loading state — injected after click */}
      {isActivated && (
        <>
          {/* Branded loading state while iframe boots */}
          {!isLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#060913] gap-4">
              {/* Gradient arc spinner */}
              <svg
                className="animate-spin w-12 h-12"
                viewBox="0 0 50 50"
                style={{ animationDuration: '1s' }}
              >
                <circle cx="25" cy="25" r="20" fill="none" stroke="#1e293b" strokeWidth="3" />
                <circle
                  cx="25" cy="25" r="20"
                  fill="none"
                  stroke="url(#embedGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="50 200"
                />
                <defs>
                  <linearGradient id="embedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-[10px] text-slate-500 tracking-[0.2em] uppercase">Loading Video</span>
            </div>
          )}

          <iframe
            src={embedSrc}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => setIsLoaded(true)}
            className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </>
      )}
    </div>
  );
}
