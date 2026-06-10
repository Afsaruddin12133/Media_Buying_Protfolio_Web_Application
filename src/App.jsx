import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import CaseStudies from './sections/CaseStudies';
import VideoPortfolio from './sections/VideoPortfolio';
import ROICalculator from './components/ROICalculator';
import Testimonials from './sections/Testimonials';
import FAQSection from './sections/FAQSection';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import PageLoader from './components/PageLoader';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start fade-out after 2.8s
    const fadeTimer = setTimeout(() => setIsFadingOut(true), 2800);
    // Fully unmount loader after fade completes (0.6s transition)
    const doneTimer = setTimeout(() => setIsLoading(false), 3400);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <>
      {/* Creative Page Loader */}
      {isLoading && (
        <div
          className="transition-opacity duration-500 ease-in-out"
          style={{ opacity: isFadingOut ? 0 : 1, pointerEvents: isFadingOut ? 'none' : 'auto' }}
        >
          <PageLoader />
        </div>
      )}

      {/* Main App Content */}
      <div
        className="bg-brandBg text-brandText min-h-screen font-sans selection:bg-brandAccent selection:text-brandText relative overflow-hidden transition-opacity duration-700 ease-in-out"
        style={{ opacity: isLoading ? 0 : 1 }}
      >
        {/* Background glowing orbs for premium feel */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brandPurple/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brandCyan/10 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Sticky navigation */}
        <Navbar />

        {/* Hero introduction showreel */}
        <Hero />

        {/* Detailed personal bio and stats grids */}
        <About />

        {/* Ad specializations (Meta, Google, TikTok, Tracking) */}
        <Services />

        {/* Paid traffic case studies show/hide grid */}
        <CaseStudies />

        {/* ROI / ROAS interactive projection widget */}
        <section className="py-24 px-6 md:px-12 bg-brandBg/60 glass border-b border-brandAccent/10 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-brandText">
                Calculate Your <span className="text-gradient drop-shadow-lg">Growth</span>
              </h2>
              <div className="w-16 h-1 bg-brandAccent mx-auto"></div>
              <p className="text-sm text-brandMuted">
                Estimate potential monthly revenue uplift by improving attribution systems and creative ROAS.
              </p>
            </div>
            <ROICalculator />
          </div>
        </section>

        {/* Video creatives showreel */}
        <VideoPortfolio />

        {/* Client citations and comments */}
        <Testimonials />

        {/* Frequently Asked Questions accordion lists */}
        <FAQSection />

        {/* Booking and contact lead details forms */}
        <Contact />

        {/* Bottom quick links and copyrights */}
        <Footer />

        {/* Persistent floating WhatsApp CTA */}
        <WhatsAppButton />
      </div>
    </>
  );
}

export default App;
