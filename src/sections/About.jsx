import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { Target, TrendingUp, Shield, Zap } from 'lucide-react';
import myImage from '../assets/myimage.jpeg';

export default function About() {
  const ref = useScrollReveal();

  const HIGHLIGHTS = [
    { icon: TrendingUp, label: 'Data-Driven' },
    { icon: Zap, label: 'Fast Setup' },
    { icon: Shield, label: 'Privacy-Ready' },
    { icon: Target, label: 'Scale-Focused' },
  ];

  const stats = [
    { value: "$5M+", label: "Ad Spend Managed" },
    { value: "3.5x", label: "Average ROAS" },
    { value: "50+", label: "Brands Scaled" },
    { value: "24/7", label: "Performance Tracking" }
  ];

  return (
    <section id="about" ref={ref} className="py-24 lg:py-32 px-6 md:px-12 relative overflow-hidden bg-brandBg border-b border-black/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch relative z-10">

        {/* LEFT — Narrative */}
        <div className="lg:col-span-7 flex flex-col justify-between reveal-left order-2 lg:order-1">
          <div>
            <h2 className="text-4xl md:text-6xl font-black font-display text-[#000] leading-none uppercase tracking-tighter">
              My Journey
              <span className="text-brandAccent">.</span>
            </h2>

            <div className="space-y-8 mt-6">
              <p className="text-lg md:text-xl lg:text-2xl text-[#111] font-semibold leading-[1.6]">
                I am a Certified Media Buying Specialist and Content Strategist helping businesses generate more leads, sales, and revenue through data-driven advertising and high-converting video creatives.
              </p>
              <div className="pl-6 border-l-[3px] border-brandAccent/60">
                <p className="text-base md:text-lg text-[#444] font-medium leading-relaxed">
                  I specialize in planning, launching, and optimizing performance marketing campaigns across Meta (Facebook & Instagram), Google, and TikTok. By implementing advanced tracking systems and conversion measurement frameworks, I ensure every important customer action is captured accurately, allowing businesses to make smarter decisions and scale with confidence.
                </p>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="pt-8 mt-8 space-y-4 border-t border-black/10">
              {[
                'Meta Certified Media Buyer',
                'Google Ads certified',
                'Server-Side GTM & Conversions API specialist',
                'Conversion Tracking & Analytics',
                'Ad Account Audit & Performance Reporting',
                'Video Creative Strategy & Performance Content',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-brandAccent flex-shrink-0 shadow-[0_0_8px_var(--color-brandAccentGlow)]" />
                  <span className="text-sm text-[#000] font-bold uppercase tracking-wider">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-10 flex flex-col sm:flex-row gap-6 mt-8">
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="cursor-pointer px-8 py-4 border border-brandAccent bg-brandAccent text-white text-xs font-bold uppercase tracking-widest hover:bg-transparent hover:text-brandAccent hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_var(--color-brandAccent)] transition-all duration-300 text-center"
            >
              Work With Me
            </button>
            <button
              onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
              className="cursor-pointer px-8 py-4 border border-black/20 text-[#000] text-xs font-bold uppercase tracking-widest hover:border-[#000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000000] bg-white transition-all duration-300 text-center"
            >
              View Services
            </button>
          </div>
        </div>

        {/* RIGHT — Visual / Stats */}
        <div className="lg:col-span-5 flex flex-col h-full reveal-right order-1 lg:order-2">
          
          <div className="relative w-full flex-grow min-h-[350px] lg:min-h-[450px] border border-black/10 bg-gray-100 overflow-hidden group mb-6">
            <img
              src={myImage}
              alt="Hafiz — Performance Marketer"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-top opacity-80 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/50 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6">
              <p className="text-[#000] font-black text-4xl font-display uppercase tracking-tighter">Hafiz.</p>
              <p className="text-brandAccent text-[10px] font-bold tracking-[0.2em] uppercase mt-1">Performance Marketer</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 flex-shrink-0">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white border border-black/10 p-6 text-center hover:border-brandAccent transition-colors duration-300"
              >
                <div className="text-3xl font-black font-display text-[#000] mb-2 tracking-tighter">
                  {stat.value}
                </div>
                <p className="text-[9px] font-bold text-brandAccent uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
