import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, Search, Music, BarChart2, CheckCircle2, Target, PieChart, Video } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const CATEGORIES = ['All', 'Media Buying', 'Video Editing', 'Creative Strategy', 'Analytics'];

const SERVICES_DATA = [
  {
    id: "facebook-ads",
    category: "Media Buying",
    title: "Meta Ads Scaling",
    description: "High-efficiency Meta campaigns from cold traffic acquisition to dynamic product retargeting.",
    icon: Megaphone,
    bullets: ["Dynamic Product Ads (DPA)", "Segmented testing frameworks", "High-LTV lookalike models"]
  },
  {
    id: "google-ads",
    category: "Media Buying",
    title: "Google Search & PMax",
    description: "Dominating search intent and shopping networks using advanced Performance Max structures.",
    icon: Search,
    bullets: ["PMax structure optimization", "High-intent search clusters", "Negative keyword curation"]
  },
  {
    id: "tiktok-reels",
    category: "Video Editing",
    title: "TikTok & Reels Editing",
    description: "Organic-style short-form video creatives engineered to convert Gen Z and Millennials.",
    icon: Music,
    bullets: ["UGC style native scripting", "Fast-paced visual hooks", "Trend & audio hijacking"]
  },
  {
    id: "commercial-video",
    category: "Video Editing",
    title: "Commercial Ad Editing",
    description: "Premium cinematic edits designed for YouTube pre-roll and broad awareness campaigns.",
    icon: Video,
    bullets: ["Cinematic color grading", "Motion graphics integration", "Story-driven structuring"]
  },
  {
    id: "creative-research",
    category: "Creative Strategy",
    title: "Ad Creative Research",
    description: "Deep competitor analysis and hook ideation to find scalable visual angles.",
    icon: Target,
    bullets: ["Competitor ad teardowns", "Hook variant scripting", "Visual angle mapping"]
  },
  {
    id: "conversion-tracking",
    category: "Analytics",
    title: "Advanced Attribution",
    description: "Combating privacy updates via server-side integrations to ensure complete conversion visibility.",
    icon: BarChart2,
    bullets: ["Conversions API (CAPI)", "GTM Server-Side setups", "GA4 custom event mapping"]
  },
  {
    id: "performance-reporting",
    category: "Analytics",
    title: "Performance Tracking",
    description: "Custom dashboard creation to monitor ROAS, LTV, and blended CPA in real-time.",
    icon: PieChart,
    bullets: ["Looker Studio dashboards", "Blended ROAS tracking", "Cohort analysis setup"]
  }
];

export default function Services() {
  const [activeTab, setActiveTab] = useState('All');
  const ref = useScrollReveal();

  useEffect(() => {
    const handleFilter = (e) => {
      const filter = e.detail;
      if (CATEGORIES.includes(filter)) {
        setActiveTab(filter);
      }
    };
    
    window.addEventListener('setServiceFilter', handleFilter);
    return () => window.removeEventListener('setServiceFilter', handleFilter);
  }, []);

  const filteredServices = activeTab === 'All' 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter(service => service.category === activeTab);

  return (
    <section id="services" ref={ref} className="py-32 px-6 md:px-12 relative overflow-hidden bg-brandBg border-b border-black/10">
      
      {/* Stark Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="reveal flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-black font-display text-[#000] tracking-tighter uppercase leading-none">
              End-to-End <br/>
              <span className="text-brandAccent">Solutions.</span>
            </h2>
          </div>
          <p className="text-sm text-brandMuted leading-relaxed max-w-sm pb-2 font-medium">
            From high-converting ad creative to full-funnel media buying and server-side tracking, we provide the architecture needed to scale modern brands.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="reveal flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                activeTab === category 
                  ? 'bg-brandAccent text-white border-brandAccent translate-x-[-2px] translate-y-[-2px] shadow-[4px_4px_0px_#000000]' 
                  : 'bg-transparent text-[#000] border-black/20 hover:border-brandAccent hover:text-brandAccent'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Services Grid with AnimatePresence */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => {
              const IconComponent = service.icon;

              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white border border-black/10 p-8 flex flex-col hover:border-brandAccent hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_var(--color-brandAccent)] transition-all overflow-hidden relative"
                >
                  <div className="space-y-6 flex-1">
                    {/* Icon + Title */}
                    <div className="flex flex-col gap-4">
                      <div className="w-12 h-12 bg-black/5 border border-black/10 flex items-center justify-center group-hover:bg-brandAccent group-hover:border-brandAccent transition-colors duration-300">
                        <IconComponent size={24} className="text-brandAccent group-hover:text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] text-brandAccent uppercase tracking-widest font-bold mb-2">{service.category}</p>
                        <h3 className="text-xl font-bold text-[#000] font-display uppercase tracking-tight leading-none">{service.title}</h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-brandMuted leading-relaxed font-medium">{service.description}</p>
                  </div>

                  {/* Bullets */}
                  <div className="pt-6 mt-6 border-t border-black/10">
                    <ul className="space-y-3">
                      {service.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs text-brandMuted font-medium">
                          <CheckCircle2 size={14} className="text-brandAccent flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
