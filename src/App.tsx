import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Pain } from './components/Pain';
import { Solution } from './components/Solution';
import { HowItWorks } from './components/HowItWorks';
import { MidCTA } from './components/MidCTA';
import { ComparisonTable } from './components/ComparisonTable';
import { Sample } from './components/Sample';
import { DeveloperStory } from './components/DeveloperStory';
import { Trust } from './components/Trust';
import { Pricing } from './components/Pricing';
import { FaqAccordion } from './components/FaqAccordion';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';

function App() {
  return (
    <main className="bg-bg-primary min-h-screen font-sans text-text">
      <Navbar />
      <Hero />
      <Pain />
      <Solution />
      <HowItWorks />
      <MidCTA />
      <ComparisonTable />
      <Sample />
      <DeveloperStory />
      <Trust />
      <Pricing />
      <FaqAccordion />
      <CTA />
      <Footer />
    </main>
  );
}

export default App;
