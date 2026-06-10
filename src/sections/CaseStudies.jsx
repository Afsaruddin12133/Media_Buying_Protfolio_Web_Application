import React, { useState, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';
import CaseStudyCard from '../components/CaseStudyCard';

export default function CaseStudies() {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);
  const caseStudies = portfolioData.caseStudies;

  // Show only 3 items initially, or all items if toggled
  const visibleStudies = showAll ? caseStudies : caseStudies.slice(0, 3);

  const handleToggle = () => {
    if (showAll) {
      setShowAll(false);
      // Smooth scroll back to section header
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setShowAll(true);
    }
  };

  return (
    <section id="media-buying" ref={sectionRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-gray-800 scroll-mt-20">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold font-display text-brandText">
          Paid Traffic <span className="text-brandAccent">Case Studies</span>
        </h2>
        <div className="w-16 h-1 bg-brandAccent mx-auto"></div>
        <p className="text-sm text-brandMuted">
          Real client results, spent metrics, and detailed campaign execution breakdowns.
        </p>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleStudies.map((study) => (
          <CaseStudyCard key={study.id} study={study} />
        ))}
      </div>

      {/* See More Actions */}
      {caseStudies.length > 3 && (
        <div className="text-center mt-12">
          <button
            onClick={handleToggle}
            className="px-10 py-3.5 bg-transparent border-2 border-brandAccent text-brandText hover:bg-brandAccent text-xs font-bold uppercase tracking-widest transition-all duration-300"
          >
            {showAll ? 'See Less' : 'See More'}
          </button>
        </div>
      )}
    </section>
  );
}
