import React, { useState, useEffect } from 'react';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Services from '../sections/Services';
import CaseStudies from '../sections/CaseStudies';
import VideoPortfolio from '../sections/VideoPortfolio';
import Testimonials from '../sections/Testimonials';
import FAQSection from '../sections/FAQSection';
import Contact from '../sections/Contact';

function Home() {
  return (
    <div className="w-full">
      {/* Hero introduction showreel */}
      <Hero />

      {/* Detailed personal bio and stats grids */}
      <About />

      {/* Ad specializations (Meta, Google, TikTok, Tracking) */}
      <Services />

      {/* Paid traffic case studies show/hide grid */}
      <CaseStudies />

      {/* Video creatives showreel */}
      <VideoPortfolio />

      {/* Client citations and comments */}
      <Testimonials />

      {/* Frequently Asked Questions accordion lists */}
      <FAQSection />

      {/* Booking and contact lead details forms */}
      <Contact />
    </div>
  );
}

export default Home;
