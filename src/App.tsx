import { useState } from 'react';
import StarfieldCanvas from '@/components/StarfieldCanvas';
import CustomCursor from '@/components/CustomCursor';
import IntroSequence from '@/components/IntroSequence';
import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Gallery from '@/components/sections/Gallery';
import Resume from '@/components/sections/Resume';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/hooks/usePortfolio';

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  useScrollReveal();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#03040b] text-slate-100">
      {/* Fixed cosmic background */}
      <StarfieldCanvas />

      {/* Grid texture overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 grid-bg opacity-20" />

      {/* Vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(3,4,11,0.6) 100%)' }}
      />

      {!introDone && <IntroSequence onComplete={() => setIntroDone(true)} />}

      <CustomCursor />
      <Navigation />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Gallery />
        <Resume />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
