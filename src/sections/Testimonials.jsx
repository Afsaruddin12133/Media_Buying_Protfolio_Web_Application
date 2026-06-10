import React from 'react';
import { Quote } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Testimonials() {
  const reviews = portfolioData.reviews;

  return (
    <section id="reviews" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-gray-800">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold font-display text-brandText">
          What My <span className="text-brandAccent">Clients Say</span>
        </h2>
        <div className="w-16 h-1 bg-brandAccent mx-auto"></div>
        <p className="text-sm text-brandMuted">
          Hear from founders, growth directors, and marketing managers who have scaled with me.
        </p>
      </div>

      {/* Grid containing testimonial items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-brandCard border border-gray-800 p-8 flex flex-col justify-between relative group hover:border-gray-750 transition-all duration-300"
          >
            {/* Background Decorative Quote */}
            <Quote className="absolute top-6 right-8 text-brandAccent/10 group-hover:text-brandAccent/20 transition-colors duration-300 pointer-events-none" size={40} />
            
            <div className="space-y-6 flex flex-col justify-between h-full">
              <p className="text-xs md:text-sm text-brandMuted italic leading-relaxed mb-4">
                "{review.text}"
              </p>
              
              {/* Profile Card Footer */}
              <div className="flex items-center space-x-4">
                <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center bg-brandAccent/10 border border-brandAccent/30 text-brandAccent font-bold text-xs uppercase rounded-none">
                  {review.initials}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brandText font-display">
                    {review.name}
                  </h4>
                  <p className="text-4xs text-brandMuted uppercase tracking-wider mt-0.5 font-medium">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
