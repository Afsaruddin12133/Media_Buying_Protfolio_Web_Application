import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function CaseStudyCard({ study }) {
  const [isOpen, setIsOpen] = useState(false);
  const { title, image, category, metrics, details, tag } = study;

  return (
    <div className="bg-brandCard border border-gray-800 flex flex-col justify-between p-6 transition-all duration-300 hover:border-brandAccent group">
      <div>
        {/* Category & Badge */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-3xs font-bold uppercase tracking-widest text-brandAccent">
            {category}
          </span>
          <span className="px-2 py-0.5 text-4xs bg-brandAccent/10 border border-brandAccent/20 text-brandAccent font-semibold tracking-wider uppercase">
            {tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-brandText mb-4 leading-snug group-hover:text-brandAccent transition-colors duration-200 min-h-[44px]">
          {title}
        </h3>

        {/* Highlight Image */}
        <div className="w-full h-44 overflow-hidden border border-gray-800 mb-4 bg-brandBg relative">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Metrics Grid */}
        <div className="bg-brandBg border-l-2 border-brandAccent p-4 mb-4 space-y-2.5">
          {Object.entries(metrics).map(([key, val]) => {
            const isHighlight = key.toLowerCase() === 'roas';
            return (
              <div
                key={key}
                className="flex justify-between items-center border-b border-gray-800/60 pb-1.5 last:border-b-0 last:pb-0"
              >
                <span className="text-3xs font-semibold text-brandMuted uppercase tracking-wider">
                  {key}
                </span>
                <strong
                  className={`text-2xs font-semibold ${
                    isHighlight
                      ? 'text-brandSuccess text-sm font-bold font-display'
                      : 'text-brandText'
                  }`}
                >
                  {val}
                </strong>
              </div>
            );
          })}
        </div>

        {/* Expanding Description Section */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-72 opacity-100 mb-4 border border-gray-800 bg-brandDetails/50 p-4' : 'max-h-0 opacity-0 mb-0'
          }`}
        >
          <p className="text-xs text-brandMuted leading-relaxed">
            {details}
          </p>
        </div>
      </div>

      {/* Action Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 border border-brandAccent text-brandAccent text-3xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-brandAccent hover:text-brandText flex items-center justify-center space-x-1"
      >
        <span>{isOpen ? 'Hide Details' : 'Read Full Case Study'}</span>
        {isOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>
    </div>
  );
}
