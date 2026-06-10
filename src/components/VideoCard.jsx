import React from 'react';

export default function VideoCard({ video }) {
  const { title, description, videoUrl } = video;

  return (
    <div className="bg-brandCard border border-gray-800 flex flex-col justify-between overflow-hidden group hover:border-gray-750 transition-all duration-300">
      <div>
        {/* Iframe wrapper forcing 16:9 aspect ratio */}
        <div className="relative pb-[56.25%] h-0 border-b border-gray-800 overflow-hidden bg-brandBg">
          <iframe
            src={videoUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
        
        {/* Text descriptions */}
        <div className="p-5">
          <h4 className="text-sm font-bold text-brandText mb-2 group-hover:text-brandAccent transition-colors duration-200">
            {title}
          </h4>
          <p className="text-2xs text-brandMuted leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
