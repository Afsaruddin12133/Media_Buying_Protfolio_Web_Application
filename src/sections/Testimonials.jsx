import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ref = useScrollReveal();
  
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        const data = [];
        snap.forEach(d => data.push({ id: d.id, ...d.data() }));
        setReviews(data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (!scrollContainerRef.current) return;
      const container = scrollContainerRef.current;
      const cardWidth = container.firstElementChild?.offsetWidth || 1;
      const gap = 32;
      // Calculate how many full (or mostly full) cards fit in the container
      const visible = Math.max(1, Math.round(container.clientWidth / (cardWidth + gap)));
      setVisibleCount(visible);
    };

    // Small timeout to allow DOM to render fully
    const timer = setTimeout(updateVisibleCount, 100);
    window.addEventListener('resize', updateVisibleCount);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateVisibleCount);
    };
  }, [reviews]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    // Get the width of the first card + gap
    const cardWidth = scrollContainerRef.current.firstElementChild?.offsetWidth || 1;
    const gap = 32; 
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(index);
  };

  const scrollTo = (index) => {
    if (!scrollContainerRef.current) return;
    const cardWidth = scrollContainerRef.current.firstElementChild?.offsetWidth || 1;
    const gap = 32;
    scrollContainerRef.current.scrollTo({
      left: (cardWidth + gap) * index,
      behavior: 'smooth'
    });
    setActiveIndex(index);
  };

  const ReviewCard = ({ review }) => {
    const initials = review.name ? review.name.substring(0, 2).toUpperCase() : 'C';
    
    return (
      <div className="group relative bg-white border border-black/10 p-8 flex flex-col justify-between hover:border-brandAccent transition-all duration-300 w-[85vw] md:w-[calc((100%-4rem)/3)] shrink-0 snap-center">
        {/* Decorative quote icon */}
        <Quote className="absolute top-6 right-6 text-black/5 group-hover:text-brandAccent/20 transition-colors duration-300" size={48} />

        {/* Stars */}
        <div className="flex gap-1 mb-6 relative z-10">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="text-brandAccent fill-brandAccent drop-shadow-[0_0_2px_var(--color-brandAccentGlow)]" />
          ))}
        </div>

        {/* Image / Text */}
        <div className="flex-1 flex flex-col mb-8 relative z-10">
          {review.image && (
            <img src={review.image} alt={`${review.name} Review`} className="w-full h-auto max-h-[300px] object-cover mb-4 border border-black/10" />
          )}
          {review.text && (
            <p className="text-base text-[#000] leading-relaxed font-medium">
              "{review.text}"
            </p>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-4 pt-6 border-t border-black/10 relative z-10 mt-auto">
          <div className="w-12 h-12 bg-brandAccent flex items-center justify-center text-white font-black font-display text-lg shadow-[2px_2px_0px_#000000] flex-shrink-0">
            {initials}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-[#000] uppercase tracking-wider truncate">{review.name}</p>
            <p className="text-[10px] text-brandAccent uppercase tracking-[0.2em] font-bold mt-1 truncate">{review.role}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="reviews" ref={ref} className="py-32 relative overflow-hidden bg-brandBg border-b border-black/10">
      
      {/* Stark Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 px-6 md:px-12">
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
      </div>

      {/* Cards Container */}
      <div className="reveal max-w-7xl mx-auto relative z-10 w-full overflow-hidden pb-4">
        {loading ? (
          <div className="text-brandAccent font-bold uppercase tracking-widest text-sm text-center py-12">Loading Testimonials...</div>
        ) : error ? (
          <div className="text-red-500 font-bold uppercase tracking-widest text-sm text-center py-12 bg-red-50 border border-red-200 mx-6 md:mx-12">
            Error loading testimonials: {error}
            <br/><br/>
            <span className="text-xs text-black">If this says missing permissions, check your Firestore rules to ensure `allow read: if true;` is set.</span>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-brandMuted font-bold uppercase tracking-widest text-sm text-center py-12">No testimonials yet. Add some from your dashboard!</div>
        ) : (
          <div className="relative group">
            {/* Scrollable Container */}
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex gap-8 overflow-x-auto snap-x snap-mandatory px-6 md:px-12 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            >
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>

            {/* Pagination Dots */}
            {reviews.length > 1 && (
              <div className="flex justify-center items-center gap-2 mt-2">
                {reviews.map((_, i) => {
                  const isActive = i >= activeIndex && i < activeIndex + visibleCount;
                  return (
                    <button
                      key={i}
                      onClick={() => scrollTo(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${isActive ? 'bg-brandAccent w-6' : 'bg-black/20 hover:bg-brandAccent/50 w-2'}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

    </section>
  );
}
