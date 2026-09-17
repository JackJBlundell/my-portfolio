import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useParams,
  Link,
} from 'react-router-dom';
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

// Scrolling down past this point starts hiding the navbar
const NAV_HIDE_AFTER_PX = 120;

const THEME_COLORS: Record<Theme, string> = {
  light: '#ffffff',
  dark: '#0A1120',
};

// public/index.html sets data-theme before first paint, so start from whatever it chose
const getInitialTheme = (): Theme =>
  document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

// /blog/<slug> -> /articles/<slug>
function LegacyBlogRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/articles/${slug}`} replace />;
}

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
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const location = useLocation();

  // The navbar gets out of the way going down the page and comes back on the way up,
  // so a full-height section like the project showcase reads as full screen.
  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 10);
      if (y > lastY && y > NAV_HIDE_AFTER_PX) {
        setIsNavHidden(true);
      } else if (y < lastY) {
        setIsNavHidden(false);
      }
      lastY = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Never leave the navbar hidden behind an open menu
  useEffect(() => {
    if (mobileMenuOpen) setIsNavHidden(false);
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setIsNavHidden(false);
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
    <div className={`App ${isNavHidden ? 'nav-hidden' : ''}`}>
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isNavHidden ? 'hidden' : ''}`}>
        <div className="navbar-container">
          <Link to="/" className="logo">
            <Logo />
          </Link>

          <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/projects" className="nav-link">Projects</Link>
            <Link to="/articles" className="nav-link">Articles</Link>
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
        <Route path="/articles" element={<BlogIndex />} />
        <Route path="/articles/:slug" element={<BlogDetail />} />
        {/* The section used to live at /blog; keep those links working */}
        <Route path="/blog" element={<Navigate to="/articles" replace />} />
        <Route path="/blog/:slug" element={<LegacyBlogRedirect />} />
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
