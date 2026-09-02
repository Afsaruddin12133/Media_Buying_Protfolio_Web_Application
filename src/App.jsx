import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTopButton from './components/ScrollToTopButton';
import WhatsAppButton from './components/WhatsAppButton';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import PortfolioDetail from './pages/PortfolioDetail';
import Footer from './sections/Footer';

function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Hide global elements like Navbar and Footer on admin routes
  const hideNavigation = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/login');

  return (
    <div className="bg-brandBg text-brandText min-h-screen font-sans selection:bg-brandAccent selection:text-white relative overflow-x-hidden">
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
  );
}

export default App;
