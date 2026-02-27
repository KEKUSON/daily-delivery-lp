import { Hero } from './components/Hero';
import { Pain } from './components/Pain';
import { Solution } from './components/Solution';
import { Sample } from './components/Sample';
import { Trust } from './components/Trust';
import { Pricing } from './components/Pricing';
import { CTA } from './components/CTA';

function App() {
  return (
    <main className="bg-bg-primary min-h-screen font-sans text-text">
      <Hero />
      <Pain />
      <Solution />
      <Sample />
      <Trust />
      <Pricing />
      <CTA />
    </main>
  );
}

export default App;
