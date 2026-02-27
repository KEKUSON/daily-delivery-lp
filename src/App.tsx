import React from 'react';
import { Hero } from './components/Hero';

function App() {
  return (
    <div className="bg-bg-primary min-h-screen">
      <Hero />
      {/* Placeholder for next section to test smooth scroll */}
      <div id="pain-section" className="min-h-screen flex items-center justify-center">
        <h2 className="text-3xl font-retro text-text-muted">Next Section...</h2>
      </div>
    </div>
  );
}

export default App;
