import React from 'react';
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

function App() {
  return (
    <div className="bg-brandBg text-brandText min-h-screen font-sans selection:bg-brandAccent selection:text-brandText">
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
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-brandBg to-[#0a0d16] border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-brandText">
              Calculate Your <span className="text-brandAccent">Growth</span>
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
    </div>
  );
}

export default App;
