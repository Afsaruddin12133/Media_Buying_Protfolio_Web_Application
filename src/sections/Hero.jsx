import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const TITLES = [
  "Architect.",
  "Media -Buyer.",
  "Strategist.",
];

export default function Hero() {
  const { bio, whatsappUrl } = portfolioData.personalInfo;
  const allStats = portfolioData.stats;

  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Using the exact YouTube video requested, configured to auto-play, loop, and mute
  // controls=0 and disablekb=1 remove UI. pointer-events-none ensures no hover overlays.
  const ytSrc = "https://www.youtube.com/embed/rBe3J2aGgGk?autoplay=1&mute=1&loop=1&playlist=rBe3J2aGgGk&controls=0&showinfo=0&rel=0&modestbranding=1&disablekb=1&playsinline=1";

  return (
    <section className="relative flex flex-col justify-start overflow-hidden bg-brandBg pt-28 md:pt-36 lg:pt-40 pb-2">

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full flex-grow flex flex-col">

        {/* Adjusted grid for larger video and shifted alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start lg:items-center w-full">

          {/* Left Column: Text & Buttons (Takes 5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-8 z-10 lg:-translate-y-6 mt-[-93px]">
            <div className="flex flex-col items-start w-full">
              <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-7xl lg:text-[5.5rem] font-black font-display text-[#000] leading-[1.1] tracking-tighter uppercase m-0">
                Performance
              </h1>
              <div className="relative h-[48px] sm:h-[60px] md:h-[90px] w-[700px] flex justify-start items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={titleIndex}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute text-[2.5rem] sm:text-[3.5rem] md:text-7xl lg:text-[5.5rem] font-black font-display text-brandAccent leading-[1.1] tracking-tighter uppercase whitespace-nowrap"
                  >
                    {TITLES[titleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <div className="relative max-w-md w-full">
              <div className="relative bg-white/40 backdrop-blur-2xl border border-white/60 p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 overflow-hidden group">
                {/* Decorative soft glow */}
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-brandAccent/10 rounded-full blur-2xl group-hover:bg-brandAccent/20 transition-all duration-500"></div>
                <p className="relative z-10 text-base md:text-[1.05rem] text-[#333] leading-[1.8] font-medium">
                  {bio}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto mt-[-15px]">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-brandAccent text-white bg-brandAccent text-xs font-bold uppercase tracking-widest hover:bg-transparent hover:text-brandAccent hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_var(--color-brandAccent)] transition-all w-full sm:w-auto text-center"
              >
                Start A Project
              </a>
              <button
                onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border border-black text-[#000] bg-white text-xs font-bold uppercase tracking-widest hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_#000000] transition-all w-full sm:w-auto text-center"
              >
                View Our Work
              </button>
            </div>
          </div>

          {/* Right Column: YouTube Video & Floating Stats */}
          <div className="lg:col-span-7 relative mt-8 lg:mt-[-5rem] w-full max-w-[500px] mr-[35px] lg:ml-auto z-10">

            {/* Ambient background glow for the video */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brandAccent/10 blur-[80px] rounded-full z-0 pointer-events-none"></div>

            {/* Video Container */}
            <div className="relative aspect-video bg-black border-[3px] border-black shadow-[4px_4px_0px_#000000] group z-10 overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={ytSrc}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-[110%] h-[110%] -left-[5%] -top-[5%] object-cover z-10 pointer-events-none scale-[1.02]"
              ></iframe>
            </div>

            {/* Floating Animated Stats */}
            {allStats.map((stat, i) => {
              // Custom positions to spread the badges around the video creatively
              const positions = [
                "top-[-20px] left-[-20px] md:top-[-130px] md:left-[80px]", // 0: Top Left
                "bottom-[-20px] left-[-20px] md:bottom-[40px] md:left-[-180px]", // 1: Bottom Left
                "bottom-[-10px] right-[-10px] md:bottom-[110px] md:right-[-120px]", // 2: Bottom Right
                "top-[-10px] right-[-10px] md:top-[-130px] md:right-[-50px]"  // 3: Top Right
              ];

              // Custom dramatic rotations for each badge
              const initialRotations = [15, -55, -90, 10];
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5, rotate: initialRotations[i] }}
                  animate={{ opacity: 1, scale: 1, rotate: initialRotations[i] }}
                  whileHover={{ scale: 1.15, rotate: 0, zIndex: 50 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                  className={`absolute z-20 hidden md:block ${positions[i]}`}
                >
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ repeat: Infinity, duration: 4 + (i * 0.5), ease: "easeInOut", delay: i * 0.3 }}
                    className="bg-white/80 backdrop-blur-xl border border-white/60 px-4 py-2 md:px-6 md:py-3 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center whitespace-nowrap cursor-pointer group"
                  >
                    <div className="text-xl md:text-3xl font-black font-display text-[#000] tracking-tighter group-hover:text-brandAccent transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-[8px] md:text-[10px] text-brandMuted uppercase tracking-[0.2em] font-bold mt-0.5 md:mt-1 group-hover:text-[#000] transition-colors">
                      {stat.label}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>


    </section>
  );
}
