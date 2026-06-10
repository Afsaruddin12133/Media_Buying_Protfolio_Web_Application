import React, { useState, useEffect } from 'react';

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0=connecting, 1=loading, 2=optimizing

  const phases = [
    'Connecting to ad networks...',
    'Loading campaign data...',
    'Optimizing for performance...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 4 + 1;
      });
    }, 60);

    const phaseInterval = setInterval(() => {
      setPhase((prev) => (prev < 2 ? prev + 1 : prev));
    }, 900);

    return () => {
      clearInterval(interval);
      clearInterval(phaseInterval);
    };
  }, []);

  const clampedProgress = Math.min(progress, 100);

  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#060913] overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '1.5s' }} />

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center space-y-10 w-full max-w-xs px-8">

        {/* Animated logo mark */}
        <div className="relative flex items-center justify-center">
          {/* Outer rotating ring */}
          <svg className="absolute w-28 h-28 animate-spin" style={{ animationDuration: '3s' }} viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="46"
              fill="none"
              stroke="url(#ringGrad)"
              strokeWidth="1.5"
              strokeDasharray="60 230"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          {/* Inner counter-rotating ring */}
          <svg className="absolute w-20 h-20 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="46"
              fill="none"
              stroke="url(#ringGrad2)"
              strokeWidth="1"
              strokeDasharray="30 280"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="ringGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          {/* Logo text in center */}
          <div className="w-14 h-14 flex items-center justify-center">
            <span className="text-xl font-black font-display tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-blue-500 to-purple-500">
              H
            </span>
          </div>
        </div>

        {/* Brand name */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-black font-display tracking-[0.3em] text-white">
            HAFIZ<span className="text-blue-500">.</span>
          </h1>
          <p className="text-xs text-blue-400/70 tracking-widest uppercase font-medium">
            Performance Marketer
          </p>
        </div>

        {/* Progress bar section */}
        <div className="w-full space-y-3">
          {/* Track */}
          <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-100 ease-out"
              style={{
                width: `${clampedProgress}%`,
                background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                boxShadow: '0 0 10px rgba(59,130,246,0.8)',
              }}
            />
          </div>

          {/* Phase text */}
          <div className="flex items-center justify-between">
            <p className="text-2xs text-slate-500 tracking-wider animate-fadeIn font-medium" key={phase}>
              {phases[phase]}
            </p>
            <span className="text-2xs font-mono text-blue-500/80">
              {Math.round(clampedProgress)}%
            </span>
          </div>
        </div>

        {/* Animated dots */}
        <div className="flex items-center space-x-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full bg-blue-500/60"
              style={{
                animation: `pulseSlow 1.2s ease-in-out infinite`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
