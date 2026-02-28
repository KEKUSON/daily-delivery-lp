import { Hero } from './components/Hero';
import { Pain } from './components/Pain';
import { Solution } from './components/Solution';
import { ComparisonTable } from './components/ComparisonTable';
import { DeveloperStory } from './components/DeveloperStory';
import { Sample } from './components/Sample';
import { Trust } from './components/Trust';
import { Pricing } from './components/Pricing';
import { FaqAccordion } from './components/FaqAccordion';
import { CTA } from './components/CTA';

function App() {
  return (
    <main className="bg-bg-primary min-h-screen font-sans text-text">
      <Hero />
      <Pain />
      <Solution />
      <ComparisonTable />
      <Sample />
      <DeveloperStory />
      <Trust />
      <Pricing />
      <FaqAccordion />
      <CTA />
    </main>
  );
}

export default App;
