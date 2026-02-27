import { useState } from 'react';
import type { FC } from 'react';
import { PixelButton } from './ui/PixelButton';
import { LINKS } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const CTA: FC = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  // Generate light particles moving up
  const [particles] = useState(() => Array.from({ length: 30 }).map((_, i) => {
    const size = Math.random() * 4 + 2;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 2;
    return (
      <div 
        key={i}
        className="absolute bg-accent-gold/40 rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          bottom: '-10%',
          left: `${Math.random() * 100}%`,
          animation: `rise ${duration}s linear ${delay}s infinite`,
        }}
      />
    );
  }));

  return (
    <section className="py-32 px-4 bg-bg-primary relative overflow-hidden flex flex-col items-center justify-center min-h-[70vh]">
      {/* Background Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {particles}
      </div>

      <div className="max-w-3xl w-full text-center relative z-10" ref={ref}>
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-12 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
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
              <span role="img" aria-label="無料">🆓</span> 無料お試しに申し込む
            </PixelButton>
            
            <PixelButton 
              as="a" 
              href={LINKS.xDm} 
              target="_blank" 
              rel="noopener noreferrer" 
              variant="secondary" 
              className="w-full sm:w-auto text-xl py-4 px-8"
            >
              <span role="img" aria-label="チャット">💬</span> まずは気軽に聞く
            </PixelButton>
          </div>
        </div>
      </div>
    </section>
  );
};
