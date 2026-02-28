import { useMemo } from 'react';
import type { FC } from 'react';
import { PixelButton } from './ui/PixelButton';
import { LINKS } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const CTA: FC = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  // Generate light particles data moving up
  const particlesData = useMemo(() => Array.from({ length: 30 }).map(() => ({
    size: Math.random() * 4 + 2,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
    left: Math.random() * 100,
  })), []);

  return (
    <section className="relative py-32 px-4 bg-bg-primary overflow-hidden flex flex-col items-center justify-center min-h-[70vh]">
      {/* Gradient Transition from Pricing */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-secondary to-transparent z-20 pointer-events-none" />

      {/* Background Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {particlesData.map((p, i) => (
          <div 
            key={i}
            className="absolute bg-accent-gold/40 rounded-full"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              bottom: '-10%',
              left: `${p.left}%`,
              animation: `rise ${p.duration}s linear ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="max-w-3xl w-full text-center relative z-10" ref={ref}>
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <h2 className="text-5xl md:text-6xl lg:text-7xl text-white mb-12 drop-shadow-[4px_4px_0px_#E40058]">
            冒険に出よう！
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <PixelButton 
              as="a" 
              href={LINKS.form} 
              target="_blank" 
              rel="noopener noreferrer" 
              pulse={true} 
              className="w-full sm:w-auto text-xl py-4 px-8"
            >
              <span aria-hidden="true">▶</span> 無料お試しに申し込む
            </PixelButton>
            
            <PixelButton 
              as="a" 
              href={LINKS.xDm} 
              target="_blank" 
              rel="noopener noreferrer" 
              variant="secondary" 
              className="w-full sm:w-auto text-xl py-4 px-8"
            >
              <span aria-hidden="true">✉</span> まずは気軽に聞く
            </PixelButton>
          </div>
        </div>
      </div>
    </section>
  );
};
