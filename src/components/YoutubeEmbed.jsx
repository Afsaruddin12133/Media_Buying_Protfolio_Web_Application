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
    <div className="absolute inset-0 bg-gray-100">
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
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            onError={(e) => {
              // Fallback to default thumbnail if hqdefault fails
              e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/default.jpg`;
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Play button — perfectly centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative group-hover:scale-110 transition-transform duration-300">
              {/* Button */}
              <div className="relative w-16 h-16 bg-brandAccent flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
                <Play size={26} className="text-white ml-1" fill="white" />
              </div>
            </div>
          </div>

          {/* Title label */}
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-xs text-white font-medium tracking-wide truncate drop-shadow-md">{title}</p>
          </div>
        </div>
      )}

      {/* Iframe + loading state — injected after click */}
      {isActivated && (
        <>
          {/* Branded loading state while iframe boots */}
          {!isLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 gap-4">
              <div className="w-12 h-12 border-4 border-brandAccent border-t-transparent animate-spin"></div>
              <span className="text-[10px] text-[#000] font-bold tracking-[0.2em] uppercase">Loading Video</span>
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
