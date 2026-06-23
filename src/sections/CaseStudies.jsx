import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import CaseStudyModal from '../components/CaseStudyModal';
import useScrollReveal from '../hooks/useScrollReveal';

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState(portfolioData.caseStudies);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [filter, setFilter] = useState("All");
  const ref = useScrollReveal();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/case-studies');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setCaseStudies(data);
          }
        }
      } catch (err) {
        console.log("Using static case studies data as backend is unreachable.");
      }
    };
    fetchData();
  }, []);

  const categories = ["All", ...new Set(caseStudies.map(item => item.category || item.industry))];

  useEffect(() => {
    const handleFilter = (e) => {
      const newFilter = e.detail;
      if (categories.includes(newFilter)) {
        setFilter(newFilter);
      }
    };
    
    window.addEventListener('setCaseStudyFilter', handleFilter);
    return () => window.removeEventListener('setCaseStudyFilter', handleFilter);
  }, [categories]);
  const filteredStudies = filter === "All" 
    ? caseStudies 
    : caseStudies.filter(study => (study.category || study.industry) === filter);

  return (
    <section id="case-studies" ref={ref} className="py-32 px-6 md:px-12 relative overflow-hidden bg-brandBg border-b border-black/10">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="reveal flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-black font-display text-[#000] tracking-tighter uppercase leading-none">
              Client <br/>
              <span className="text-brandAccent">Case Studies.</span>
            </h2>
          </div>
          <p className="text-sm text-brandMuted leading-relaxed max-w-sm pb-2 font-medium">
            Explore detailed campaign breakdowns, strategy formulations, and the exact metrics we achieved for our partners.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="reveal flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                filter === cat
                  ? "bg-brandAccent text-white border-brandAccent shadow-[2px_2px_0px_#000000]"
                  : "bg-white text-[#000] border-black/20 hover:border-brandAccent hover:text-brandAccent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredStudies.map((study, index) => (
              <motion.div
                layout
                key={study.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group bg-white border border-black/10 hover:border-brandAccent hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_var(--color-brandAccent)] transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="w-full h-56 overflow-hidden relative bg-gray-100 border-b border-black/10">
                  <img
                    src={study.featuredImage || study.image}
                    alt={study.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-[9px] font-bold tracking-widest uppercase text-white bg-brandAccent shadow-[2px_2px_0px_#000000]">
                      {study.industry || study.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-display font-black text-[#000] mb-6 leading-none group-hover:text-brandAccent transition-colors uppercase tracking-tight">
                    {study.title}
                  </h3>
                  
                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6 pt-6 border-t border-black/10">
                    {study.metrics && Object.entries(study.metrics).slice(0, 4).map(([key, val]) => (
                      <div key={key}>
                        <p className="text-[10px] text-brandMuted uppercase tracking-widest font-bold">{key}</p>
                        <p className="text-xl font-display font-black text-[#000] mt-1">{val}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-4">
                    <button
                      onClick={() => setSelectedStudy(study)}
                      className="w-full py-4 border border-black/20 text-[#000] text-[11px] font-bold uppercase tracking-widest hover:bg-brandAccent hover:text-white hover:border-brandAccent transition-colors duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <CaseStudyModal
        isOpen={!!selectedStudy}
        onClose={() => setSelectedStudy(null)}
        study={selectedStudy}
      />
    </section>
  );
}
