import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import ProjectsIndex from './pages/ProjectsIndex';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import CustomCursor from './components/CustomCursor';
import { scrollToHash } from './utils/scrollToSection';
import './App.css';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // If there's a hash, scroll to that section after a small delay
      setTimeout(() => {
        scrollToHash(hash, 80);
      }, 100);
    } else {
      // No hash, scroll to top
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function AppContent() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  return (
    <div className="App">
      <CustomCursor />

      {/* Scroll Progress Bar */}
      <motion.div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <motion.nav
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="navbar-container">
          <Link to="/" className="logo">
            BL<span className="logo-dot">.</span>
          </Link>
          <div className="nav-links">
            {isHomePage ? (
              <>
                <Link to="/about" className="nav-link">About</Link>
                <a href="#skills" className="nav-link">Skills</a>
                <Link to="/projects" className="nav-link">Projects</Link>
                <a href="#pricing" className="nav-link">Pricing</a>
                <a href="#contact" className="nav-link">Contact</a>
              </>
            ) : (
              <>
                <Link to="/about" className="nav-link">About</Link>
                <Link to="/#skills" className="nav-link">Skills</Link>
                <Link to="/projects" className="nav-link">Projects</Link>
                <Link to="/#pricing" className="nav-link">Pricing</Link>
                <Link to="/#contact" className="nav-link">Contact</Link>
              </>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Main Content with Page Transitions */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<ProjectsIndex />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
        </Routes>
      </AnimatePresence>

      {/* Scroll to Top Button */}
      {isScrolled && (
        <motion.button
          className="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ↑
        </motion.button>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
