import React from 'react';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import MVPSection from '../components/MVPSection';
import Contact from '../components/Contact';
import SEO from '../components/SEO';

const HomePage: React.FC = () => {
  return (
    <>
      <SEO />
      <Hero />
      <Skills />
      <Projects />
      <MVPSection />
      <Contact />
    </>
  );
};

export default HomePage;
