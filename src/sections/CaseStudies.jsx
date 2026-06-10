import React, { useState, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';
import CaseStudyCard from '../components/CaseStudyCard';
import useScrollReveal from '../hooks/useScrollReveal';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function CaseStudies() {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);
  const revealRef = useScrollReveal();
  const caseStudies = portfolioData.caseStudies;
  const visibleStudies = showAll ? caseStudies : caseStudies.slice(0, 3);

  const handleToggle = () => {
    if (showAll) {
      setShowAll(false);
      setTimeout(() => sectionRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      setShowAll(true);
    }
  };

  return (
    <section id="media-buying" ref={sectionRef} className="py-28 px-6 md:px-12 relative overflow-hidden border-t border-white/5">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-500/4 rounded-full blur-[100px] pointer-events-none" />

      <div ref={revealRef} className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="reveal text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-blue-400">Proven Results</p>
          <h2 className="text-3xl md:text-4xl font-black font-display text-white">
            Paid Traffic <span className="text-gradient">Case Studies</span>
          </h2>
          <div className="section-divider w-24 mx-auto" />
          <p className="text-sm text-slate-400 leading-relaxed">
            Real client results, spent metrics, and detailed campaign execution breakdowns.
          </p>
        </div>

        {/* Grid */}
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {visibleStudies.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>

        {/* Toggle */}
        {caseStudies.length > 3 && (
          <div className="reveal text-center mt-12">
            <button
              onClick={handleToggle}
              className="cursor-pointer inline-flex items-center gap-2 px-10 py-3.5 border-2 border-blue-500/50 hover:border-blue-500 text-blue-400 hover:text-white hover:bg-blue-500 text-xs font-bold uppercase tracking-widest rounded-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:-translate-y-0.5"
            >
              {showAll ? <><ChevronUp size={14} /> See Less</> : <><ChevronDown size={14} /> See All Case Studies</>}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
