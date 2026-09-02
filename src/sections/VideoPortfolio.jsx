import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import PortfolioModal from '../components/PortfolioModal';
import { getYouTubeId } from '../components/YoutubeEmbed';
import { db } from '../firebase';
import useScrollReveal from '../hooks/useScrollReveal';

const INITIAL_LIMIT = 6;

export default function VideoPortfolio() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState(null);
  const ref = useScrollReveal();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'videoPortfolio'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        
        if (data.length > 0) {
          setPortfolioItems(data);
        }
      } catch (err) {
        console.error("Using static portfolio data as Firestore fetch failed:", err);
      }
    };
    fetchData();
  }, []);

  const categories = ["All", ...new Set(portfolioItems.map(item => item.category || "Video Ad"))];

  useEffect(() => {
    const handleFilter = (e) => {
      const newFilter = e.detail;
      if (categories.includes(newFilter)) {
        setFilter(newFilter);
      }
    };
    
    window.addEventListener('setPortfolioFilter', handleFilter);
    return () => window.removeEventListener('setPortfolioFilter', handleFilter);
  }, [categories]);

  // Reset expansion when category filter changes
  useEffect(() => {
    setShowAll(false);
  }, [filter]);

  const filteredItems = filter === "All"
    ? portfolioItems
    : portfolioItems.filter(item => (item.category || "Video Ad") === filter);

  const displayedItems = showAll ? filteredItems : filteredItems.slice(0, INITIAL_LIMIT);

  return (
    <section id="portfolio" ref={ref} className="py-32 px-6 md:px-12 relative overflow-hidden bg-brandBg border-b border-black/10">
      {/* Stark Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="reveal flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-black font-display text-[#000] tracking-tighter uppercase leading-none">
              Selected <br/>
              <span className="text-brandAccent">Works.</span>
            </h2>
          </div>
          <p className="text-sm text-brandMuted leading-relaxed max-w-sm pb-2 font-medium">
            High-converting video creatives, editing breakdowns, and full-funnel visual assets engineered for scale.
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

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {displayedItems.map((item) => {
              const isImage = item.mediaType === 'image';
              const yId = (!isImage && !item.thumbnail && item.videoUrl) ? getYouTubeId(item.videoUrl) : null;
              const displayImg = item.thumbnail || (yId ? `https://img.youtube.com/vi/${yId}/hqdefault.jpg` : `https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80&auto=format&fit=crop&sig=${item.id}`);

              return (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative border border-black/10 overflow-hidden bg-white hover:border-brandAccent hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_var(--color-brandAccent)] transition-all duration-300 flex flex-col cursor-pointer"
                onClick={() => setSelectedPortfolioItem(item)}
              >
                <div className="aspect-[4/5] overflow-hidden relative bg-gray-100 border-b border-black/10">
                  <img
                    src={displayImg}
                    alt={item.title}
                    loading="lazy"
                    onError={(e) => {
                      if (yId && e.currentTarget.src.includes('hqdefault')) {
                        e.currentTarget.src = `https://img.youtube.com/vi/${yId}/0.jpg`;
                      }
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {!isImage && (
                      <div className="w-16 h-16 bg-brandAccent/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
                        <Play className="text-white ml-1 fill-current" size={24} />
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <span className="px-3 py-1 text-[9px] font-bold tracking-widest uppercase text-white bg-brandAccent shadow-[2px_2px_0px_#000000]">
                      {item.category || "Video Ad"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-xl font-display font-black text-[#000] mb-3 leading-tight group-hover:text-brandAccent transition-colors uppercase tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-brandMuted line-clamp-2 mb-6 font-medium">
                    {item.description || item.shortDescription}
                  </p>

                  <div className="mt-auto pt-4 border-t border-black/10">
                    <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-brandAccent hover:text-[#000] transition-colors">
                      {isImage ? "View Details" : "Watch Video"} &rarr;
                    </span>
                  </div>
                </div>
              </motion.div>
            )})}
          </AnimatePresence>
        </motion.div>

        {/* Show More / Show Less Button */}
        {filteredItems.length > INITIAL_LIMIT && (
          <div className="flex justify-end mt-12">
            <button
              onClick={() => {
                if (showAll) {
                  setShowAll(false);
                  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setShowAll(true);
                }
              }}
              className="flex items-center gap-3 px-10 py-5 bg-brandAccent text-white hover:bg-black text-xs font-bold uppercase tracking-widest shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_var(--color-brandAccent)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-black"
            >
              <span>{showAll ? "Show Less" : `Show More Works (+${filteredItems.length - INITIAL_LIMIT})`}</span>
              <ChevronDown size={18} className={`transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>

      <PortfolioModal 
        isOpen={!!selectedPortfolioItem} 
        onClose={() => setSelectedPortfolioItem(null)} 
        item={selectedPortfolioItem} 
      />
    </section>
  );
}
