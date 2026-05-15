import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import BlogListing from './pages/BlogListing';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import Logo from './components/Logo';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function RouteWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800); // Overlay duration
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
          >
            <Logo className="w-20 h-20 animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<RouteWrapper><Home /></RouteWrapper>} />
          <Route path="/blog" element={<RouteWrapper><BlogListing /></RouteWrapper>} />
          <Route path="/privacidad" element={<RouteWrapper><PrivacyPolicy /></RouteWrapper>} />
          <Route path="/terminos" element={<RouteWrapper><TermsOfService /></RouteWrapper>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <CustomCursor />
      <ScrollToTop />
      <AnimatedRoutes />
    </Router>
  );
}
