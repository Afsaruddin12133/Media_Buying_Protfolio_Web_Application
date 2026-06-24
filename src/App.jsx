import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './sections/Footer';
import PageLoader from './components/PageLoader';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTopButton from './components/ScrollToTopButton';
import Home from './pages/Home';
import PortfolioDetail from './pages/PortfolioDetail';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const location = useLocation();

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

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Hide global elements like Navbar and Footer on admin routes
  const hideNavigation = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/login');

  return (
    <>
      {/* Creative Page Loader */}
      {isLoading && (
        <div
          className="transition-opacity duration-500 ease-in-out fixed inset-0 z-50 flex items-center justify-center bg-brandBg"
          style={{ opacity: isFadingOut ? 0 : 1, pointerEvents: isFadingOut ? 'none' : 'auto' }}
        >
          <PageLoader />
        </div>
      )}

      {/* Main App Content */}
      <div
        className="bg-brandBg text-brandText min-h-screen font-sans selection:bg-brandAccent selection:text-white relative overflow-x-hidden transition-opacity duration-700 ease-in-out"
        style={{ opacity: isLoading ? 0 : 1 }}
      >
        {/* Background glowing orbs for premium feel */}
        <div className="fixed top-[-10vw] left-[-10vw] w-[40vw] h-[40vw] bg-brandAccent/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="fixed bottom-[-10vw] right-[-10vw] w-[40vw] h-[40vw] bg-black/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

        {/* Sticky navigation */}
        {!hideNavigation && <Navbar />}

        {/* Routes */}
        <main className={`min-h-screen ${!hideNavigation ? 'pt-20' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        {/* Bottom quick links and copyrights */}
        {!hideNavigation && <Footer />}

        {/* Persistent floating buttons */}
        {!hideNavigation && (
          <>
            <ScrollToTopButton />
            <WhatsAppButton />
          </>
        )}
      </div>
    </>
  );
}

export default App;
