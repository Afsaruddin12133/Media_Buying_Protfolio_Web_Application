import React from 'react';
import YoutubeEmbed from './YoutubeEmbed';

export default function VideoCard({ video }) {
  const { title, description, videoUrl } = video;

  return (
    <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-[#0f1829] to-[#080d1a] border border-white/5 hover:border-blue-500/30 transition-all duration-400 group hover:-translate-y-2 hover:shadow-[0_8px_40px_rgba(59,130,246,0.18)] flex flex-col">
      {/* 16:9 video embed */}
      <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-t-2xl bg-[#060913]">
        <YoutubeEmbed url={videoUrl} title={title} />
      </div>

      {/* Text */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-200 leading-snug">
            {title}
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            {description}
          </p>
        </div>
        {/* Bottom accent bar */}
        <div className="mt-4 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-500 ease-out" />
      </div>
    </div>
  );
}
