import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed z-[9998] flex items-center justify-center w-12 h-12 bg-white text-[#000] border border-black/10 shadow-[4px_4px_0px_#000000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_var(--color-brandAccent)] hover:border-brandAccent transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      style={{
        bottom: '100px', // Positioning above the WhatsApp button
        right: '28px'
      }}
    >
      <ArrowUp size={24} className="group-hover:text-brandAccent" />
    </button>
  );
}
