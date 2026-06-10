import React from 'react';
import { Star, Quote } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Testimonials() {
  const reviews = portfolioData.reviews;
  const ref = useScrollReveal();

  return (
    <section id="reviews" ref={ref} className="py-28 px-6 md:px-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="reveal text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-blue-400">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-black font-display text-white">
            What My <span className="text-gradient">Clients Say</span>
          </h2>
          <div className="section-divider w-24 mx-auto" />
          <p className="text-sm text-slate-400 leading-relaxed">
            Hear from founders, growth directors, and marketing managers who scaled with me.
          </p>
        </div>

        {/* Cards grid */}
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="group relative glass-card rounded-2xl p-7 flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-400 border border-white/5 hover:border-blue-500/30"
            >
              {/* Decorative quote icon */}
              <Quote className="absolute top-5 right-5 text-blue-500/10 group-hover:text-blue-500/20 transition-colors duration-300" size={44} />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-slate-300 leading-relaxed italic flex-1 mb-6">
                "{review.text}"
              </p>

              {/* Profile */}
              <div className="flex items-center gap-3 pt-5 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white font-black text-xs flex-shrink-0">
                  {review.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{review.name}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
