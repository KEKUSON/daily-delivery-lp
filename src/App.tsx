import React from 'react';
import { Hero } from './components/Hero';
import { Pain } from './components/Pain';
import { Solution } from './components/Solution';
import { Sample } from './components/Sample';
import { Trust } from './components/Trust';

function App() {
  return (
    <div className="bg-bg-primary min-h-screen font-sans text-text">
      <Hero />
      <Pain />
      <Solution />
      <Sample />
      <Trust />
      
      {/* Placeholder for Phase 4 sections */}
      <div id="pricing-section" className="min-h-[50vh] flex items-center justify-center bg-bg-secondary">
        <h2 className="text-3xl font-retro text-text-muted">Pricing & CTA Coming Soon...</h2>
      </div>
    </div>
  );
}

export default App;
