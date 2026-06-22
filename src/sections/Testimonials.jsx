import React from 'react';
import { Star, Quote } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Testimonials() {
  const reviews = portfolioData.reviews;
  const ref = useScrollReveal();

  return (
    <section id="reviews" ref={ref} className="py-32 px-6 md:px-12 relative overflow-hidden bg-brandBg border-b border-black/10">
      
      {/* Stark Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="reveal flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-black font-display text-[#000] tracking-tighter uppercase leading-none">
              What They <br/>
              <span className="text-brandAccent">Say.</span>
            </h2>
          </div>
          <p className="text-sm text-brandMuted leading-relaxed max-w-sm pb-2 font-medium">
            Hear from founders, growth directors, and marketing managers who trusted our systems to scale.
          </p>
        </div>

        {/* Cards grid */}
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="group relative bg-white border border-black/10 p-8 flex flex-col justify-between hover:border-brandAccent hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_var(--color-brandAccent)] transition-all duration-300"
            >
              {/* Decorative quote icon */}
              <Quote className="absolute top-6 right-6 text-black/5 group-hover:text-brandAccent/20 transition-colors duration-300" size={48} />

              {/* Stars */}
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-brandAccent fill-brandAccent drop-shadow-[0_0_2px_var(--color-brandAccentGlow)]" />
                ))}
              </div>

              {/* Text */}
              <p className="text-base text-[#000] leading-relaxed font-medium flex-1 mb-8 relative z-10">
                "{review.text}"
              </p>

              {/* Profile */}
              <div className="flex items-center gap-4 pt-6 border-t border-black/10 relative z-10">
                <div className="w-12 h-12 bg-brandAccent flex items-center justify-center text-white font-black font-display text-lg shadow-[2px_2px_0px_#000000]">
                  {review.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#000] uppercase tracking-wider">{review.name}</p>
                  <p className="text-[10px] text-brandAccent uppercase tracking-[0.2em] font-bold mt-1">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
