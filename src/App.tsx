import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import HomePage from './pages/HomePage';
import ProjectsIndex from './pages/ProjectsIndex';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import ServicesPage from './pages/ServicesPage';
import ServiceDetail from './pages/ServiceDetail';
import ServiceRegion from './pages/ServiceRegion';
import BlogIndex from './pages/BlogIndex';
import BlogDetail from './pages/BlogDetail';
import ContactPage from './pages/ContactPage';
import AppDevelopmentCardiff from './pages/AppDevelopmentCardiff';
import Footer from './components/Footer';
import Logo from './components/Logo';
import { scrollToHash } from './utils/scrollToSection';
import './App.css';

type Theme = 'light' | 'dark';

const THEME_COLORS: Record<Theme, string> = {
  light: '#ffffff',
  dark: '#0A1120',
};

// public/index.html sets data-theme before first paint, so start from whatever it chose
const getInitialTheme = (): Theme =>
  document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        scrollToHash(hash, 80);
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function AppContent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('theme', nextTheme);
    } catch {
      // Storage can be blocked (e.g. private browsing); the theme still applies for this visit
    }
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <Link to="/" className="logo">
            <Logo />
          </Link>

          <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/projects" className="nav-link">Projects</Link>
            <Link to="/blog" className="nav-link">Blog</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link nav-link-cta">Get in Touch</Link>
          </div>

          <div className="nav-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
        <Route path="/services/:serviceSlug/:regionSlug" element={<ServiceRegion />} />
        <Route path="/projects" element={<ProjectsIndex />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/app-development-cardiff" element={<AppDevelopmentCardiff />} />
      </Routes>

      <Footer />

      {/* Scroll to Top */}
      {isScrolled && (
        <button
          className="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          ↑
        </button>
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
